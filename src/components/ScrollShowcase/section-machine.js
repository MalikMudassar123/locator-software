'use client';

import { lockScroll, unlockScroll, forceUnlockScroll } from './scroll-lock';

// ── One section, one state, one owner ────────────────────────────────────────
//
// Both showcase scenes run the same machine with a different number of states, so
// it lives here once rather than twice. What a scene supplies is only what is
// genuinely its own: how to ANIMATE between two adjacent states, and how to place
// itself on any state OUTRIGHT.
//
// The invariant everything below is built on — and the one that was missing:
//
//     THE SCROLL POSITION IS THE TRUTH; THE ANIMATION FOLLOWS IT.
//     THE ANIMATION NEVER MOVES THE PAGE TO SUIT ITSELF.
//
// The previous version broke that both ways round, and each break was a glitch the
// user could see:
//
//   · every state change first SCROLLED THE PAGE to the middle of the incoming
//     state's band. Scroll past a section fast enough and the section it belonged to
//     would drag the page back into itself and freeze it there for the length of an
//     animation — while the section the user had actually reached was already
//     pinned and updating. Two sections driving at once is what "sections overlap"
//     and "the next section starts too early" both were.
//
//   · a transition ran wherever the machine happened to be, including on a section
//     the user had long since scrolled past, because nothing consulted whether the
//     pin was still holding anything.
//
// So there are now exactly two ways a state can change, and which one applies is
// decided by whether the section can still legitimately hold the user:
//
//   ANIMATE   the pin is active and the page is under our control. Play one step,
//             freeze the page for its duration, then re-evaluate. Unchanged from
//             before, and this is the path a normal reader is on essentially always.
//
//   RESOLVE   anything else — the pin has been left behind, the scrollbar is being
//             dragged, the page was remeasured, the user skipped. Place the scene on
//             the frame the CURRENT position implies, instantly, in one move, without
//             touching the scroll position and without holding a lock.
//
// RESOLVE is what makes aggressive scrolling safe. A section flown past does not
// animate, does not grab the page and does not fight the next one — it simply ends
// up on the frame it would have ended up on, and the section the user actually
// landed on is the only one running. That is section isolation, enforced by the one
// thing that cannot disagree with itself: where the page is.

// How quiet the page must be after the lock yielded before animated transitions are
// allowed to resume. Long enough that a scrollbar drag stays in RESOLVE for its
// whole duration (so we never re-lock into a fight the user can see), short enough
// that letting go of the thumb feels like an immediate hand-back.
const IDLE_MS = 220;

/**
 * @param states        how many discrete states the scene has (>= 2)
 * @param forward       forward[i] = progress at or above which state i-1 advances
 *                      to state i. Index 0 unused.
 * @param backward      backward[i] = progress at or below which state i+1 retreats
 *                      to state i. Last index unused. Per-direction thresholds ARE
 *                      the hysteresis: no single point exists where a few pixels of
 *                      jitter can flap a state in and out.
 * @param bands         bands[i] = where in the pin a wheel step parks state i — the
 *                      middle of that state's band, furthest from both its edges.
 * @param runTransition (from, to, done) animate one adjacent step; must call done().
 * @param applyState    (state) place the scene on that state's frame outright, with
 *                      no animation. Must also clear any completion callback a
 *                      previous runTransition attached — a run being abandoned must
 *                      not report a landing the machine has already moved past.
 */
export function createSectionMachine({
  states,
  forward,
  backward,
  bands,
  runTransition,
  applyState,
}) {
  let trigger  = null;   // the section's ScrollTrigger, once created
  let pinned   = false;  // desktop branch: the row is pinned and may hold the page
  let state    = 0;      // last COMMITTED state
  let busy     = false;  // an animated transition is in flight
  let progress = 0;      // most recent trigger progress
  let locked   = false;  // this section is holding the scroll lock
  let skipping = false;  // the Skip button owns the scroll position
  let coasting = false;  // the lock yielded; stay in RESOLVE until the page is quiet
  let idle     = null;
  let dead     = false;

  // ── Absolute mapping, used only by RESOLVE ──────────────────────────────────
  // Reads the FORWARD thresholds in both directions on purpose. Hysteresis exists
  // to stop a state flapping while the user hovers on a boundary; a resolve is not
  // hovering, it is a jump, and the only property that matters there is that one
  // position always maps to one state no matter how it was reached.
  const stateAt = (p) => {
    let s = 0;
    for (let i = 1; i < states; i++) if (p >= forward[i]) s = i;
    return s;
  };

  // ── Adjacent mapping, used only by ANIMATE ──────────────────────────────────
  // One step at a time, so a long scroll plays icons → desktop → mobile in order
  // rather than jumping straight to the end. Fast, slow and normal scrolling all
  // produce the same ordered sequence; they differ only in the wait between steps.
  const nextState = () => {
    if (state < states - 1 && progress >= forward[state + 1]) return state + 1;
    if (state > 0 && progress <= backward[state - 1]) return state - 1;
    return state;
  };

  const armIdle = () => {
    clearTimeout(idle);
    idle = setTimeout(() => {
      idle = null;
      coasting = false;
      settle();
    }, IDLE_MS);
  };

  // The lock yielded to something it could not cancel — a scrollbar drag, or a jump
  // the browser made on its own. Our lock is already gone (see scroll-lock), so this
  // must not release it again. Everything in flight is abandoned and the scene lands
  // on the frame the new position implies; further animation stands down until the
  // page settles, so we never re-lock straight back into the same fight.
  const onLockBroken = () => {
    if (dead) return;
    locked = false;
    if (skipping) return;     // the skip already owns where this is going
    coasting = true;
    armIdle();
    if (trigger) progress = trigger.progress;
    resolve(stateAt(progress));
  };

  const releaseLock = () => {
    if (!locked) return;
    locked = false;
    unlockScroll(onLockBroken);
  };

  // RESOLVE. Abandons anything in flight — applyState clears the pending completion
  // callbacks — and places the scene on `target` in one move. Never touches the
  // scroll position: that is the whole point.
  const resolve = (target) => {
    if (dead) return;
    releaseLock();
    busy  = false;
    state = target;
    applyState(target);
  };

  // ANIMATE is only legitimate while this section still holds the user. Off the pin
  // it would be animating something nobody is looking at, and — because it takes the
  // scroll lock — freezing the page over a section that has already scrolled away.
  //
  // The unpinned (mobile) branch has no lock to take and nothing to hold still, so
  // it animates whenever its trigger is updating and relies on onLeave/onLeaveBack
  // to resolve it once the section is genuinely gone.
  const canAnimate = () => !coasting && (!pinned || !!trigger?.isActive);

  // Called on every scroll update and whenever a transition lands. Idempotent: if the
  // state already matches the position, or something is already running, it does
  // nothing.
  const settle = () => {
    if (dead || skipping || busy || !trigger) return;

    if (!canAnimate()) {
      const target = stateAt(progress);
      if (target !== state) resolve(target);
      return;
    }

    const from = state;
    const to   = nextState();
    if (to === from) return;

    busy = true;
    // Freeze the page for the whole transition. The pin holds the SECTION still but
    // does nothing to stop the page moving under it — without this the pin runs out
    // of range mid-animation and releases, which is the section sliding upward while
    // its state is still changing.
    if (pinned) { lockScroll(onLockBroken); locked = true; }
    runTransition(from, to, () => finish(to));
  };

  const finish = (to) => {
    if (dead) return;
    const wasLocked = locked;
    locked = false;
    state  = to;
    busy   = false;
    // Re-evaluate against wherever the user has scrolled to in the meantime. This is
    // what replays a long scroll as an ordered run of single steps rather than
    // dropping the ones that were locked out.
    settle();
    // Released AFTER settle, not before. If settle starts the next transition it takes
    // its own lock first, so the refcount never reaches zero between the two and the
    // page is not briefly free to jump during the hand-over.
    if (wasLocked) unlockScroll(onLockBroken);
  };

  return {
    setTrigger(t) { trigger = t; },

    // Crossing the breakpoint tears the pinned branch down. Any lock still held has
    // to go with it, or the page stays frozen with nothing left running to unfreeze it.
    setPinned(v) {
      pinned = v;
      if (!v) releaseLock();
    },

    onScroll(self) {
      progress = self.progress;
      // Every event during a drag pushes the hand-back out, so RESOLVE covers the
      // whole gesture rather than the first 220ms of it.
      if (coasting) armIdle();
      settle();
    },

    // A refresh is a MEASUREMENT event, not a gesture, and resolving is the only safe
    // answer to it. Starting a four-second animation — and freezing the page for it —
    // because the window was resized or an image finished loading is never what the
    // user asked for, and the progress a refresh reports mid-scroll is not a position
    // they chose either.
    onRefresh(self) {
      progress = self.progress;
      const target = stateAt(progress);
      if (busy || target !== state) resolve(target);
    },

    // Scrolled clean past the section, in either direction. This is the case a fast
    // drag produces, and the only correct response is the finished frame for the edge
    // it left by: the section is on screen for a few more frames as it slides away and
    // must look settled, not caught mid-dissolve — and it must not be running when the
    // next section starts.
    onLeave()     { progress = 1; resolve(states - 1); },
    onLeaveBack() { progress = 0; resolve(0); },

    // ── One wheel gesture, one state ──────────────────────────────────────────
    // The ONLY thing left that moves the scroll position, and the one place where
    // doing so is legitimate: the row is pinned and active, so the page does not
    // visibly move, and stepping keeps the position and the committed state telling
    // the same story. Setting the state alone would leave them disagreeing, and the
    // next real scroll event would read that disagreement as a reason to change back.
    step(dir) {
      if (dead || busy || skipping || coasting) return;
      if (!pinned || !trigger?.isActive) return;
      const to = state + dir;
      // Already at an end: nothing to step to, so the gesture is left to the page and
      // scrolls on out of the section, which is what should happen there.
      if (to < 0 || to > states - 1) return;
      const span = trigger.end - trigger.start;
      if (!(span > 0)) return;
      progress = bands[to];
      const y = trigger.start + bands[to] * span;
      if (typeof trigger.scroll === 'function') trigger.scroll(y); else window.scrollTo(0, y);
      // Run the machine now rather than waiting for the trigger's own update: the
      // transition should start on the gesture, not a frame or two after it.
      settle();
    },

    // ── Skip ──────────────────────────────────────────────────────────────────
    // Called just BEFORE the page starts moving. The scene is placed on the frame
    // belonging to the edge the user is leaving by, and the machine stands down for
    // the duration — a skip owns the scroll position outright, and a transition
    // starting during it would take the lock and strand the page between sections.
    skip(direction) {
      if (dead || skipping) return;
      skipping = true;
      resolve(direction === 'up' ? 0 : states - 1);
    },

    // Once the skip's scroll has come to rest. Re-evaluating against the landing
    // position is what lets the user turn round and come straight back in, and have
    // the section run normally rather than be stuck on the frame the skip left.
    endSkip() {
      if (!skipping) return;
      skipping = false;
      if (trigger) progress = trigger.progress;
      settle();
    },

    getState()   { return state; },
    isBusy()     { return busy; },
    isSkipping() { return skipping; },

    destroy() {
      dead = true;
      clearTimeout(idle);
      // forceUnlockScroll rather than a counted release: leaving the user on an
      // unscrollable page is far worse than dropping a refcount nothing else holds.
      if (locked) { locked = false; forceUnlockScroll(); }
    },
  };
}
