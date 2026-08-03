'use client';

// Freezes page scrolling outright, for use while a pinned scene is mid-transition.
//
// WHY THIS IS NEEDED. ScrollTrigger's `pin` holds the SECTION still for a fixed
// scroll distance — it does not stop the page from scrolling underneath it. So the
// pin's progress keeps advancing while an animation plays, and if it reaches the end
// of its range mid-transition the section is released and slides up the screen with
// the animation still running. No amount of retuning the pin length fixes that: the
// animation takes wall-clock time and the pin is measured in pixels, so any scroll
// fast enough will always outrun it.
//
// Holding the scroll position instead makes the two commensurate. While a transition
// runs the page cannot move at all, so the pin cannot reach its end, so the section
// cannot be released early. The user's next scroll gesture then advances the next
// state — which is also what makes "one scroll, one state" literally true.
//
// HOW. preventDefault on the input events is what actually stops it — wheel, touch
// and the scrolling keys are all cancellable, and between them they are every
// gesture a user makes deliberately.
//
// WHAT THIS LOCK DELIBERATELY DOES NOT DO IS FIGHT. A scrollbar drag is not
// cancellable: the only defence available against it is to write the position back
// on every scroll event, and against a pointer that is still holding the thumb that
// is a tug-of-war, once per frame, for as long as the user cares to hold it. The
// page visibly judders, and ScrollTrigger — which updates in between — reads an
// oscillating position and desynchronises. That was the "dragging the scrollbar
// breaks the animation state" failure outright.
//
// So movement is answered by SIZE, not by reflex. Below BREAK_PX it is rounding,
// scroll anchoring or a few pixels of compositor momentum: correct it, which costs
// one comparison. Above it, the user is unmistakably driving the page somewhere,
// and the lock yields — it releases completely and tells its holders, who resolve
// their scenes against the position the user actually chose. Yielding is what makes
// aggressive scrolling deterministic instead of merely resisted.
//
// Refcounted, because a scene may start its next transition before releasing the
// lock for the last one; that hand-over must not leave the page briefly free.

let depth = 0;
let lockedY = 0;

// Holder → how many locks that holder currently has outstanding. A Map rather than
// a Set because of the hand-over above: a scene can legitimately hold two at once
// (finish → settle → lock → unlock), and the second release must not evict a holder
// that is still relying on being told when the lock breaks.
const breakers = new Map();

let watchdog = null;

// How far the page may move under a lock before we stop correcting it and yield.
// Sized to sit well above the few pixels an anchor adjustment or a rounded
// device-pixel ratio produces, and well below the hundreds a scrollbar drag moves
// on its very first event.
const BREAK_PX = 140;

// A transition whose completion callback never fires must not freeze the page for
// good. Comfortably longer than the longest scene transition (~4.5s), short enough
// that a user who hits the bug is inconvenienced rather than stranded.
const MAX_LOCK_MS = 9000;

const stop = (e) => e.preventDefault();

// Keys that scroll. Everything else must still reach the page — locking scroll is
// not a reason to break tabbing or typing.
const SCROLL_KEYS = new Set([
  ' ', 'Spacebar', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End',
]);
const stopKeys = (e) => {
  // Never swallow keys aimed at a field — a form on the page must stay usable.
  const t = e.target;
  const tag = t && t.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
  if (SCROLL_KEYS.has(e.key)) e.preventDefault();
};

// Guarded against its own scrollTo: setting the position fires another scroll event,
// which then finds the position already correct and stops. Without the comparison
// this would recurse every frame.
const snapBack = () => {
  if (!depth) return;
  const drift = window.scrollY - lockedY;
  if (!drift) return;
  if (Math.abs(drift) > BREAK_PX) { breakLock(); return; }
  window.scrollTo(0, lockedY);
};

const bind = () => {
  window.addEventListener('wheel', stop, { passive: false });
  window.addEventListener('touchmove', stop, { passive: false });
  window.addEventListener('keydown', stopKeys, { passive: false });
  // The same idempotent handler is registered twice, for two different reasons.
  //
  // WINDOW, CAPTURE PHASE — this is the one that fixes fast scrolling. A page scroll
  // event is dispatched AT `document`, and `window` sits above it in the propagation
  // path, so a CAPTURE listener here runs before every listener on document — including
  // ScrollTrigger's, which runs its entire update synchronously inside that handler.
  //
  // That ordering is the whole point. Previously the position was corrected AFTER
  // ScrollTrigger had already read the moved value and updated: for one frame the pin
  // saw a scroll position it was never supposed to see, advanced its progress, and
  // could run out of range and release the row while its animation was still playing.
  // Correcting in the capture phase means ScrollTrigger reads the restored position and
  // never observes the excursion at all. It is also what lets a BREAK be clean: the
  // lock is torn down and its holders told before ScrollTrigger updates, so the very
  // first update after a break already runs under the new, unlocked rules.
  window.addEventListener('scroll', snapBack, { capture: true, passive: true });
  // DOCUMENT — backstop only. GSAP notes in ScrollTrigger's own setup that some
  // browsers stop dispatching scroll on the window when scrolling very fast while the
  // document keeps firing. snapBack compares before it writes, so being called twice in
  // a frame costs one comparison and nothing else.
  document.addEventListener('scroll', snapBack, { passive: true });
};

const unbind = () => {
  window.removeEventListener('wheel', stop);
  window.removeEventListener('touchmove', stop);
  window.removeEventListener('keydown', stopKeys);
  // The capture flag is part of a listener's identity — removing without it would
  // leave the capture-phase listener attached and the page permanently snapping back
  // to a stale position.
  window.removeEventListener('scroll', snapBack, { capture: true });
  document.removeEventListener('scroll', snapBack);
};

// Tear the lock down completely and tell everyone who was holding it. Holders must
// treat this as "your lock is already gone" — they do NOT call unlockScroll after
// being notified, or they would decrement a refcount that has already been zeroed.
function breakLock() {
  if (!depth) return;
  const held = [...breakers.keys()];
  depth = 0;
  breakers.clear();
  clearTimeout(watchdog);
  watchdog = null;
  unbind();
  // After unbind, so a holder is free to scroll, seek or lock again from inside its
  // own callback without meeting the listeners it is being released from.
  held.forEach((fn) => { try { fn(); } catch { /* a broken holder must not block the rest */ } });
}

/**
 * Take the lock.
 *
 * @param onBreak called if the lock yields to an uncancellable scroll (or times
 *                out) rather than being released normally. The caller's lock is
 *                already gone by then — it must not call unlockScroll for it.
 */
export function lockScroll(onBreak) {
  if (typeof window === 'undefined') return;
  // Stamped on EVERY acquisition, not only on 0→1. The two showcase scenes share this
  // module, so a hand-over that crosses from one to the other must re-anchor rather
  // than leave the second scene's lock pointing at the first scene's position —
  // snapBack would then haul the page back a whole section while the second scene
  // played, with both state machines running.
  //
  // The intra-scene hand-over this refcount exists for (finish → settle → lock →
  // unlock) is unaffected: the page is frozen across it, so scrollY has not moved and
  // the re-stamp writes back the same value.
  lockedY = window.scrollY;
  if (onBreak) breakers.set(onBreak, (breakers.get(onBreak) || 0) + 1);
  clearTimeout(watchdog);
  watchdog = setTimeout(breakLock, MAX_LOCK_MS);
  if (depth++ > 0) return;
  bind();
}

export function unlockScroll(onBreak) {
  if (typeof window === 'undefined' || depth === 0) return;
  if (onBreak) {
    const held = (breakers.get(onBreak) || 0) - 1;
    if (held > 0) breakers.set(onBreak, held);
    else breakers.delete(onBreak);
  }
  if (--depth > 0) return;
  clearTimeout(watchdog);
  watchdog = null;
  unbind();
}

// Unmounting mid-transition must never leave the page frozen with no one left to
// release it. Callers use this in cleanup rather than a plain unlockScroll(), so a
// miscounted depth cannot strand the user on an unscrollable page.
export function forceUnlockScroll() {
  if (typeof window === 'undefined' || depth === 0) return;
  depth = 0;
  breakers.clear();
  clearTimeout(watchdog);
  watchdog = null;
  unbind();
}
