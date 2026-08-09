'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

/* The "Get a Quote" pill.
 *
 * Built to a supplied reference image, not to taste. Three things carry the
 * look and all three are read off that reference:
 *
 *   1. a hard blue → cyan gradient across the pill, darkest at the top-left
 *   2. a white specular hairline on the upper-left shoulder that burns out
 *      before the middle of the top edge — a reflection, not a border
 *   3. a cyan filament on the lower-right that blooms off the edge, brightest
 *      on the right-hand cap
 *
 * All of it lives in .glass-btn* in globals.css. No hooks, no canvas, no
 * measuring — the whole thing is paint.
 *
 * 'use client' is here even though nothing in this file needs it. The props are
 * event handlers, so the only legal caller is a client component anyway, and
 * the module lands in the client bundle either way. Declaring the boundary
 * makes that contract explicit rather than inherited from whoever imports it.
 */

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  /** Period of the specular sweep — travel plus the idle gap before it repeats. */
  sheenSpeed?: string
  /** Seconds for one lap of the light travelling the rim. */
  traceSpeed?: string
  /** Period of one full pulse, contraction and release. */
  beatSpeed?: string
  /** 0.5–1.5. Scales the sweep's peak and the outward bloom together. */
  intensity?: number
}

export default function GlassButton({
  children = 'Get a Quote',
  className = '',
  sheenSpeed = '5.6s',
  traceSpeed = '4.8s',
  beatSpeed = '2.4s',
  intensity = 1,
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={`glass-btn${className ? ` ${className}` : ''}`}
      style={{
        '--ai-sheen-speed': sheenSpeed,
        '--ai-trace-speed': traceSpeed,
        '--ai-beat-speed': beatSpeed,
        '--ai-intensity': intensity,
      } as React.CSSProperties}
      {...props}
    >
      {/* Under the label deliberately — a gleam that crosses the type itself is
          what makes a button read as a skeleton loader. The two rim hairlines
          are the button's own ::before/::after and sit above this. */}
      <span className="glass-btn__sheen" aria-hidden="true" />
      {/* Light travelling the rim. A real element rather than a third pseudo:
          ::before is the top-left specular and ::after is the cyan filament,
          both already spoken for. The span carries the band mask; the child is
          the streak that runs round inside it, and stays display:none unless
          offset-path is supported (see globals.css). */}
      <span className="glass-btn__trace" aria-hidden="true">
        <span className="glass-btn__trace-head" />
      </span>
      <span className="glass-btn__text">{children}</span>
    </button>
  )
}

export { GlassButton }
