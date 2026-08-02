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
// HOW. preventDefault on the input events is what actually stops it. The scroll
// listener is a backstop for movement that cannot be prevented — dragging the
// scrollbar, and momentum already handed to the compositor on some trackpads — and
// snaps the position back to where the lock was taken.
//
// Refcounted, because finishTransition may start the next transition before
// releasing its own lock; that hand-over must not leave the page briefly free.

let depth = 0;
let lockedY = 0;

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
  if (window.scrollY !== lockedY) window.scrollTo(0, lockedY);
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
  // never observes the excursion at all. Capture ordering is guaranteed by the DOM, not
  // by which module happened to register first, which is what makes this reliable
  // rather than a lucky import order.
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

export function lockScroll() {
  if (typeof window === 'undefined') return;
  // Stamped on EVERY acquisition, not only on 0→1. The two showcase scenes share this
  // module, so a scroll fast enough to carry from one row into the next while the first
  // is still mid-transition has both of them holding the lock at once. Stamping only on
  // the first acquisition left the second scene's lock pointing at the FIRST scene's
  // position, and snapBack then hauled the page back a whole section while the second
  // scene played — both state machines running, two sections fighting over the frame.
  //
  // The intra-scene hand-over this refcount exists for (finishTransition → settle →
  // lock → unlock) is unaffected: the page is frozen across it, so scrollY has not
  // moved and the re-stamp writes back the same value.
  lockedY = window.scrollY;
  if (depth++ > 0) return;
  bind();
}

export function unlockScroll() {
  if (typeof window === 'undefined' || depth === 0) return;
  if (--depth > 0) return;
  unbind();
}

// Unmounting mid-transition must never leave the page frozen with no one left to
// release it. Callers use this in cleanup rather than a plain unlockScroll(), so a
// miscounted depth cannot strand the user on an unscrollable page.
export function forceUnlockScroll() {
  if (typeof window === 'undefined' || depth === 0) return;
  depth = 0;
  unbind();
}
