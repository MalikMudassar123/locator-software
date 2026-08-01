// Scrolling primitives for the Skip control (see components/common/SkipButton).
//
// Kept out of the button itself because the pinned showcase rows need the same
// "where does this section actually end" answer that the button does, and a
// second implementation of it would drift.

/** Marks the element a Skip button treats as "its section". */
export const SKIP_HOST_ATTR = 'data-skip-host';

/**
 * Which way the user is travelling. A skip always means "past this section, the
 * way I was already going" — a pinned row holds the page for the same distance
 * in both directions, so a skip that only ever goes down is no use to someone
 * scrolling back up through it.
 */
export type SkipDirection = 'down' | 'up';

// A pinned ScrollTrigger moves the pinned element into a generated `.pin-spacer`
// wrapper and switches it to position:fixed while it is held. So the pinned row
// has no next sibling of its own — the element that follows it in the page is the
// spacer's sibling. Walking UP until a sibling exists handles that without having
// to know whether a given section happens to be pinned right now.
function laidOutSibling(node: Element, direction: SkipDirection): HTMLElement | null {
  const step = (n: Element) =>
    (direction === 'down' ? n.nextElementSibling : n.previousElementSibling) as HTMLElement | null;

  let sib = step(node);
  // Skip over anything with no box — script/style tags, and wrappers that have
  // collapsed to nothing — so we never scroll to a zero-height element.
  while (sib && sib.getBoundingClientRect().height <= 1) sib = step(sib);
  return sib;
}

/**
 * The block a skip from `from` should land on: the next thing in the page after
 * the section that contains it, or the previous one when travelling up.
 */
export function resolveSkipTarget(
  from: HTMLElement,
  direction: SkipDirection,
): HTMLElement | null {
  let node: HTMLElement | null = from;
  while (node && node !== document.body) {
    const sib = laidOutSibling(node, direction);
    if (sib) return sib;
    node = node.parentElement;
  }
  return null;
}

/** Absolute document Y of an element's top edge. */
export function documentTopOf(el: HTMLElement): number {
  return Math.max(0, Math.round(window.scrollY + el.getBoundingClientRect().top));
}

/**
 * Where a skip should put the page.
 *
 * The two directions are mirror images of the same rule — leave the skipped
 * section entirely behind, in the direction of travel — but they anchor on
 * opposite edges to get there. Going DOWN, the next block's top goes to the top
 * of the viewport. Going UP, the previous block's bottom goes to the bottom of
 * the viewport, which for a pinned row lands it exactly on its finished frame,
 * filling the screen. Aligning tops in both directions would instead throw the
 * user a whole section further up than they asked to go.
 */
export function skipDestination(host: HTMLElement, direction: SkipDirection): number {
  const target = resolveSkipTarget(host, direction);

  if (direction === 'up') {
    // Nothing above (already the first block) — the top of the page is the only
    // sensible answer.
    if (!target) return 0;
    const bottom = window.scrollY + target.getBoundingClientRect().bottom;
    return Math.max(0, Math.round(bottom - window.innerHeight));
  }

  // Nothing below — fall back to the host's own bottom edge so the button still
  // does something sensible.
  return target
    ? documentTopOf(target)
    : Math.round(window.scrollY + host.getBoundingClientRect().bottom);
}

/**
 * Smooth-scroll the page to `top` and call `onSettled` once it has come to rest.
 *
 * The callback is the point of this over a bare `window.scrollTo`. A section that
 * suppressed its own scroll-driven state machine for the duration of a skip needs
 * to know when to start listening again, and "when the scroll stops" is not
 * something the platform reports — so it is inferred from a gap in scroll events,
 * with a hard timeout as the backstop for the case where none ever fire (already
 * at the target, or a browser that ignores smooth behaviour).
 */
export function smoothScrollTo(top: number, onSettled?: () => void): void {
  if (typeof window === 'undefined') return;

  const target = Math.max(0, Math.round(top));
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    window.scrollTo(0, target);
    // One frame of slack so ScrollTrigger has re-read the new position before the
    // caller re-enables anything that reacts to it.
    requestAnimationFrame(() => onSettled?.());
    return;
  }

  let idle: ReturnType<typeof setTimeout>;
  let hardStop: ReturnType<typeof setTimeout>;

  const finish = () => {
    window.removeEventListener('scroll', bump);
    clearTimeout(idle);
    clearTimeout(hardStop);
    onSettled?.();
  };

  const bump = () => {
    clearTimeout(idle);
    idle = setTimeout(finish, 140);
  };

  window.addEventListener('scroll', bump, { passive: true });
  bump();                                  // covers "no scroll events at all"
  hardStop = setTimeout(finish, 2600);     // covers "scrolling never stops"

  window.scrollTo({ top: target, behavior: 'smooth' });
}
