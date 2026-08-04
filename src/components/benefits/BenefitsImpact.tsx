'use client'

import { useEffect, useRef, useState } from 'react'
import { IMPACT } from './data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

// One dark band on an otherwise white page. It is the page's spine: it separates
// the opening argument from the eleven-point index below it, and it is where the
// three numbers that matter get room to be large. #0f1117 is the same ink the
// site's CTA band uses, so this reads as part of the system rather than as a
// one-off.
function Counter({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!run) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      // Reduced motion lands on the figure outright. Routed through the same rAF
      // as the count rather than set here in the effect body, so the value is
      // never written synchronously during render.
      if (reduce) { setN(to); return }
      const p = Math.min((now - t0) / 1500, 1)
      // easeOutCubic: fast off the mark, long settle — a count that decelerates
      // reads as landing on a figure rather than as stopping at one.
      setN(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])

  return (
    <>
      {Math.round(n)}
      <span className="bgi-suffix">{suffix}</span>
    </>
  )
}

export default function BenefitsImpact() {
  const ref = useRef<HTMLDivElement>(null)
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
        .bgi { background: #0f1117; color: #fff; padding: clamp(56px,7vw,92px) 28px; }
        .bgi-inner {
          max-width: 1120px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px,4vw,56px);
        }
        @media (max-width: 780px) { .bgi-inner { grid-template-columns: 1fr; gap: 34px; } }

        .bgi-item { position: relative; padding-top: 22px; }
        /* A hairline over each figure instead of a card around it. The rule draws
           itself in when the band arrives, which is enough motion for a strip that
           is already animating three counters. */
        .bgi-item::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: rgba(255,255,255,.16);
          transform: scaleX(0); transform-origin: left center;
          transition: transform .9s ${EASE} var(--d, 0ms);
        }
        .bgi.is-in .bgi-item::before { transform: scaleX(1); }

        .bgi-value {
          font-size: clamp(46px,6vw,76px); font-weight: 800;
          line-height: 1; letter-spacing: -.04em;
          /* Tabular figures: without them the width of each digit changes as the
             counter runs and the whole row jitters sideways while it counts. */
          font-variant-numeric: tabular-nums;
        }
        .bgi-suffix { color: #0a89dd; margin-left: 2px; }

        .bgi-label {
          margin: 16px 0 0; max-width: 26ch;
          font-size: clamp(13.5px,1.2vw,15px); line-height: 1.65;
          color: rgba(255,255,255,.56);
        }

        @media (prefers-reduced-motion: reduce) {
          .bgi-item::before { transform: scaleX(1); transition: none; }
        }
      `}</style>

      <section className={`bgi${run ? ' is-in' : ''}`} ref={ref}>
        <div className="bgi-inner">
          {IMPACT.map((s, i) => (
            <div key={s.label} className="bgi-item" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
              <div className="bgi-value">
                <Counter to={s.value} suffix={s.suffix} run={run} />
              </div>
              <p className="bgi-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
