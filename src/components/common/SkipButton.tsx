'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  SKIP_HOST_ATTR,
  skipDestination,
  smoothScrollTo,
  type SkipDirection,
} from '@/lib/skip-scroll'

type Placement = 'bottom-right' | 'bottom-center'

type Props = {
  /** Visible text. Kept to one short word — this is a control, not a call to action. */
  label?: string
  /** Which edge of the host section the button sits against. */
  placement?: Placement
  /**
   * Land the section's animation on the frame that belongs to `direction` — its
   * finished one going down, its arrival one going up — and stand down anything
   * that would otherwise react to the scroll this is about to perform.
   * Runs BEFORE the page starts moving.
   */
  onBeforeSkip?: (direction: SkipDirection) => void
  /** Runs once the page has come to rest — the point to resume normal behaviour. */
  onAfterSkip?: () => void
}

// Below this, a scroll event is not a deliberate gesture. It filters out both
// ordinary jitter and the position the scroll lock snaps back to while a
// transition is running, either of which would otherwise flip the direction the
// button is offering while the user is sitting still.
const DIRECTION_THRESHOLD = 12

/**
 * A skip control for an animated section.
 *
 * It always skips in the direction the user is already travelling: down to the
 * next section, up to the previous one. A pinned row holds the page for the same
 * distance whichever way you cross it, so a one-way skip would be dead weight to
 * anyone scrolling back up through it.
 *
 * LAYOUT CONTRACT. This renders one absolutely-positioned element and nothing
 * else, so it is out of flow: it cannot change the height of its section, move
 * a sibling, or alter any spacing. It relies on the nearest ancestor carrying
 * `data-skip-host` also being a positioned box.
 *
 * It reveals itself only while its section is on screen, so it is absent from
 * the page everywhere except the stretch where skipping is actually on offer.
 */
export default function SkipButton({
  label = 'Skip',
  placement = 'bottom-right',
  onBeforeSkip,
  onAfterSkip,
}: Props) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const inFlight = useRef(false)
  const [visible, setVisible] = useState(false)
  const [direction, setDirection] = useState<SkipDirection>('down')
  // Read at click time, so a click always acts on the direction that is current
  // rather than on whatever React had last committed.
  const directionRef = useRef<SkipDirection>('down')

  useEffect(() => {
    const host = btnRef.current?.closest(`[${SKIP_HOST_ATTR}]`)
    if (!host || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    // The inset margin holds the button back until the section is genuinely the
    // thing being looked at, rather than flashing it in as an edge clips the
    // viewport. A pinned section stays intersecting for its whole pinned range,
    // which is exactly the window where skipping is worth offering.
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '-12% 0px -12% 0px' },
    )
    obs.observe(host)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - last
      // `last` advances on every event, not only on the ones that clear the
      // threshold — otherwise a slow drift would never register at all.
      last = y
      // The skip's own scroll must not re-aim the button mid-flight: it travels
      // in the direction that was chosen, and reading it back would flip the
      // chevron the moment the page started moving.
      if (inFlight.current || Math.abs(delta) < DIRECTION_THRESHOLD) return
      const next: SkipDirection = delta > 0 ? 'down' : 'up'
      if (next === directionRef.current) return
      directionRef.current = next
      setDirection(next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const skip = useCallback(() => {
    // A second click while the page is already travelling would re-run
    // onBeforeSkip and re-aim the scroll from a moving position.
    if (inFlight.current) return
    const host = btnRef.current?.closest(`[${SKIP_HOST_ATTR}]`) as HTMLElement | null
    if (!host) return

    const dir = directionRef.current
    inFlight.current = true
    onBeforeSkip?.(dir)

    smoothScrollTo(skipDestination(host, dir), () => {
      inFlight.current = false
      onAfterSkip?.()
    })
  }, [onBeforeSkip, onAfterSkip])

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={skip}
      aria-label={
        direction === 'up'
          ? `${label} this animation and go back to the previous section`
          : `${label} this animation and continue to the next section`
      }
      className={[
        'skip-btn',
        `skip-btn--${placement}`,
        direction === 'up' ? 'skip-btn--up' : '',
        visible ? 'is-visible' : '',
      ].join(' ')}
    >
      <span className="skip-btn__label">{label}</span>
      <svg
        className="skip-btn__chevron"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
