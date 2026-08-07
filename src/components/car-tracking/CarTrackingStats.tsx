'use client'

import { useEffect, useRef, useState } from 'react'
import { STATS } from './data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

/**
 * The three headline figures, on the site's dark band.
 *
 * Same construction as BenefitsImpact: counters that only run once the strip is
 * actually on screen, an easeOutCubic so each lands on its figure rather than
 * stopping at it, and tabular figures so the row does not jitter sideways while
 * the digits change width.
 */
function Counter({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!run) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      // Reduced motion lands on the figure outright — routed through the same
      // rAF as the count so the value is never written synchronously in render.
      if (reduce) { setN(to); return }
      const p = Math.min((now - t0) / 1600, 1)
      setN(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])

  return (
    <>
      {Math.round(n).toLocaleString('en-US')}
      <span className="cst-suffix">{suffix}</span>
    </>
  )
}

export default function CarTrackingStats() {
  const ref = useRef<HTMLElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setRun(true)
        io.disconnect()
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .cst { position: relative; overflow: hidden; background: #0f1117; color: #fff; padding: clamp(56px,7vw,92px) 28px; }
        .cst::before {
          content: ''; position: absolute; pointer-events: none;
          width: min(760px,70vw); height: min(600px,56vw); top: -34%; left: 50%; transform: translateX(-50%);
          background: radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.24), transparent 70%);
        }
        .cst-inner {
          position: relative; max-width: var(--w-1120); margin: 0 auto;
          display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(28px,4vw,56px);
        }
        @media (max-width: 780px) { .cst-inner { grid-template-columns: 1fr; gap: 34px; } }

        .cst-item { position: relative; padding-top: 22px; }
        .cst-item::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: rgba(255,255,255,.16);
          transform: scaleX(0); transform-origin: left center;
          transition: transform .9s ${EASE} var(--d, 0ms);
        }
        .cst.is-in .cst-item::before { transform: scaleX(1); }

        .cst-value {
          font-size: max(clamp(42px,5.6vw,70px), min(4.861vw, 101.5px)); font-weight: 800;
          line-height: 1; letter-spacing: -.04em; font-variant-numeric: tabular-nums;
        }
        .cst-suffix { color: #4d9dff; margin-left: 2px; }
        .cst-label {
          margin: 16px 0 0; max-width: 26ch;
          font-size: var(--f-15); line-height: 1.65; color: rgba(255,255,255,.56);
        }

        @media (prefers-reduced-motion: reduce) {
          .cst-item::before { transform: scaleX(1); transition: none; }
        }
      `}</style>

      <section className={`cst${run ? ' is-in' : ''}`} ref={ref} aria-label="LOCATOR by the numbers">
        <div className="cst-inner">
          {STATS.map((st, i) => (
            <div key={st.label} className="cst-item" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
              <div className="cst-value">
                <Counter to={st.value} suffix={st.suffix} run={run} />
              </div>
              <p className="cst-label">{st.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
