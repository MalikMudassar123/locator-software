'use client'

import { useId } from 'react'

/**
 * Two hands that reach out from the top corners of a CTA and wave at the visitor.
 *
 * Drop it inside any positioned element and it places itself — the hands are
 * absolutely positioned against the parent's padding box and take no part in
 * layout, so nothing shifts when they mount.
 *
 * The host needs `position: relative` (or anything else that establishes a
 * containing block). Everything tunable — size, corner anchor, lean, outline
 * colour, and the three animation periods — is a custom property on `.cta-hand`,
 * so a second CTA only needs a class overriding the handful it cares about.
 * See the `.cta-hand` block in globals.css.
 */
type WavingHandsProps = {
  /** Applied to both hands. The hook for per-CTA custom-property overrides. */
  className?: string
}

export default function WavingHands({ className }: WavingHandsProps) {
  // Gradients have to be referenced by id, and there are two hands on the page —
  // so each gets its own suffix rather than two <defs> claiming the same id.
  const uid = useId().replace(/:/g, '')
  const cls = (side: string) => ['cta-hand', `cta-hand--${side}`, className].filter(Boolean).join(' ')
  return (
    <>
      <span className={cls('left')} aria-hidden="true">
        <Hand uid={`${uid}l`} />
      </span>
      <span className={cls('right')} aria-hidden="true">
        <Hand uid={`${uid}r`} />
      </span>
    </>
  )
}

/**
 * The hand. Human proportions, drawn flat: the palm is widest at the knuckles
 * and tapers into the wrist, the fingers taper toward rounded tips and each is a
 * different length — middle longest, index and ring near-matched, pinky both
 * shortest and set lowest on the palm — and they fan a few degrees about their
 * own knuckles rather than sitting parallel. The thumb comes off the heel low
 * and swings out at ~40°, which is where a real one sits; put it any higher and
 * the hand instantly reads as a mitten.
 *
 * Every finger is two mirrored cubics into a semicircular tip, and the geometry
 * matters: both curves leave the knuckle and arrive at the tip on a VERTICAL
 * tangent, which is the same tangent the semicircle has at its endpoints. That
 * is what makes the join invisible. Tapering with straight sides instead — the
 * obvious way to draw this — puts a slanted line into a cap whose tangent is
 * vertical, and the few degrees of mismatch show up as a visible kink just below
 * each fingertip: the finger looks bent, and the longer the finger the worse it
 * reads. Any retune has to keep the two control points directly above/below
 * their endpoints, and the arc's chord at exactly twice its radius.
 *
 * Spacing is the other half of it. The gaps between fingers are 3.4 units
 * against a 1.8 stroke, so ~1.6 units of gap survive the outline pass; tighten
 * either number and the outline closes the gaps and the four fingers fuse into
 * one paddle.
 *
 * viewBox is 48×64 with the wrist at (24, 54): that point is the transform
 * origin for the wave and for the whole placement system in CSS, so every shape
 * below is positioned relative to it.
 */
function Hand({ uid }: { uid: string }) {
  const skin = `hand-skin-${uid}`
  const cuff = `hand-cuff-${uid}`
  // Rendered twice — once stroked and filled in the outline colour, then again
  // filled on top. That two-pass trick gives a clean rim around the whole
  // silhouette with no seams where the shapes overlap; `paint-order: stroke fill`
  // cannot do it, being per-element, so each shape's stroke would still land on
  // top of its neighbour's fill.
  const shapes = (
    <>
      <g className="cta-hand__fingers">
        <path
          d="M11.6 36 C11.6 27 12 24.3 12 18 A2.25 2.25 0 0 1 16.5 18 C16.5 24.3 16.9 27 16.9 36 Z"
          transform="rotate(-7 14.25 34)"
        />
        <path
          d="M20.1 36 C20.1 25.5 20.5 22.35 20.5 15 A2.3 2.3 0 0 1 25.1 15 C25.1 22.35 25.5 25.5 25.5 36 Z"
          transform="rotate(-2 22.8 34)"
        />
        <path
          d="M28.7 36 C28.7 26.75 29.1 24 29.1 17.5 A2.2 2.2 0 0 1 33.5 17.5 C33.5 24 33.9 26.75 33.9 36 Z"
          transform="rotate(4 31.3 34)"
        />
        <path
          d="M37.1 36 C37.1 29.5 37.45 27.55 37.45 23 A1.95 1.95 0 0 1 41.35 23 C41.35 27.55 41.7 29.5 41.7 36 Z"
          transform="rotate(11 39.4 34)"
        />
      </g>
      {/* Thumb — same construction, thicker than a finger and set at 42° off the
          heel. Length is the whole balance here: draw it at finger length and the
          hand becomes a starfish, draw it much shorter and it reads as a stub
          growing out of the palm. Roughly two-thirds of the middle finger is
          where it stops looking like either. */}
      <path
        d="M14.9 47.5 C14.9 40 15.4 37.8 15.4 32.5 A3.1 3.1 0 0 1 21.6 32.5 C21.6 37.8 22.1 40 22.1 47.5 Z"
        transform="rotate(-46 18.5 47.5)"
      />
      {/* Palm, last so it covers the fingers' open bases. Every edge is a curve:
          a shallow arch across the knuckles, sides that swell slightly before
          drawing in, and a rounded heel. Straight sides and a flat knuckle line
          are exactly what read as a mitten — the palm is the shape doing most of
          the work in deciding whether this looks like a hand at all. */}
      <path d="M12 35 C12 31.4 13.8 29.6 16.6 29.4 C22.6 28.8 31 28.8 37 29.4 C39.8 29.6 41.6 31.4 41.6 35 C41.6 39 41.2 42.4 40.4 45.4 C39.2 50.4 36 54 31.4 54 L22.6 54 C17.6 54 14.2 50.4 13.2 45.4 C12.4 42.4 12 39 12 35 Z" />
    </>
  )
  return (
    <svg className="cta-hand__pose" viewBox="0 0 48 64" focusable="false" aria-hidden="true">
      <defs>
        {/* The hero's own blend, top-lit: near-white at the fingertips falling
            through the hero's pale band into its mid blue at the wrist. Vertical
            in the hand's own space, so the light source stays put as the hand
            waves. The top stop stays off pure white — carrying a little blue all
            the way up is what ties the hand to the hero wash, and it is also the
            only thing keeping the fingertips visible against the white bar. */}
        <linearGradient id={skin} x1="0" y1="8" x2="0" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f7fcff" />
          <stop offset="0.45" stopColor="#d3e9fa" />
          <stop offset="1" stopColor="#9fcdf0" />
        </linearGradient>
        {/* Sleeve, straight off the hero's deep end. */}
        <linearGradient id={cuff} x1="0" y1="48" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0a84e3" />
          <stop offset="1" stopColor="#1360ee" />
        </linearGradient>
      </defs>
      {/* Sleeve, under everything so the palm overlaps its top edge. This is the
          part the pill swallows, which sells "reaching out from behind". */}
      <rect className="cta-hand__cuff" x="14" y="52" width="20" height="12" rx="6" fill={`url(#${cuff})`} />
      <g className="cta-hand__outline">{shapes}</g>
      <g fill={`url(#${skin})`}>{shapes}</g>
    </svg>
  )
}
