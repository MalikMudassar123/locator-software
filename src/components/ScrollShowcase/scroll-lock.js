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
  window.addEventListener('scroll', snapBack, { passive: true });
};

const unbind = () => {
  window.removeEventListener('wheel', stop);
  window.removeEventListener('touchmove', stop);
  window.removeEventListener('keydown', stopKeys);
  window.removeEventListener('scroll', snapBack);
};

export function lockScroll() {
  if (typeof window === 'undefined') return;
  if (depth++ > 0) return;
  lockedY = window.scrollY;
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
