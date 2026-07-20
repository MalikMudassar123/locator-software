'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const STATS = [
  { target: 10, suffix: '+', label: 'Years of Industry Experience', desc: 'Delivering trusted fleet telematics and IoT solutions.' },
  { target: 1000, suffix: '+', label: 'Businesses Empowered', desc: 'Helping organizations optimize fleet operations across the UAE.' },
  { target: 20000, suffix: '+', label: 'Connected Vehicles & Assets', desc: 'Monitored through our intelligent GPS and IoT platform.' },
  { target: 1, suffix: 'M+', label: 'Data Points Processed Daily', desc: 'Turning real-time operational data into actionable insights.' },
]

function formatValue(n: number, target: number) {
  if (target >= 1000) return Math.round(n).toLocaleString('en-US')
  return String(Math.round(n))
}

function StatCard({ stat, start, index }: { stat: typeof STATS[number]; start: boolean; index: number }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(stat.target); return }
    let raf = 0
    const dur = 1600
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setVal(stat.target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, stat.target])

  return (
    <div className="wwn-item" style={{ transitionDelay: `${index * 90}ms` }}>
      <span className="wwn-rule" aria-hidden="true" />
      <div className="wwn-value">
        {formatValue(val, stat.target)}<span className="wwn-suffix">{stat.suffix}</span>
      </div>
      <div className="wwn-label">{stat.label}</div>
      <p className="wwn-desc">{stat.desc}</p>
    </div>
  )
}

export default function WhoWeAreNumbers() {
  const ref = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStart(true); io.disconnect() } },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* Dark slab inside the white page — the same surface language as the
           industry panels, so the two sections read as one system. */
        .wwn-slab {
          max-width: 1180px; margin: 0 auto;
          background: #0d1426;
          border-radius: clamp(20px,2.4vw,30px);
          padding: clamp(36px,4.6vw,68px) clamp(24px,3.4vw,56px);
          box-shadow: 0 50px 100px -46px rgba(13,20,38,.6);
        }

        .wwn-head { text-align: center; max-width: 720px; margin: 0 auto clamp(36px,4.4vw,56px); }
        .wwn-eyebrow {
          display: block;
          font-size: clamp(22px,2.8vw,32px); font-weight: 800; letter-spacing: .04em;
          color: #6ea2ff; text-transform: uppercase; margin-bottom: 16px;
        }
        /* Single rule above the label — flanking rules break on wrap. */
        .wwn-eyebrow::before {
          content: ''; display: block; width: 34px; height: 3px;
          background: rgba(110,162,255,.55); border-radius: 2px;
          margin: 0 auto 12px;
        }
        .wwn-h2 {
          margin: 0; font-size: clamp(19px,2.2vw,26px); font-weight: 800;
          line-height: 1.25; letter-spacing: -.02em; color: #fff; text-wrap: balance;
        }

        /* Hairline-divided columns, no cards. */
        .wwn-grid { display: grid; grid-template-columns: repeat(4,1fr); }
        @media (max-width: 900px) { .wwn-grid { grid-template-columns: repeat(2,1fr); row-gap: 34px; } }
        @media (max-width: 520px) { .wwn-grid { grid-template-columns: 1fr; row-gap: 30px; } }

        .wwn-item {
          position: relative;
          padding: 0 clamp(16px,2vw,28px);
          border-left: 1px solid rgba(255,255,255,.1);
          opacity: 0; transform: translateY(16px);
          transition: opacity .6s ${EASE}, transform .6s ${EASE};
        }
        .wwn-grid[data-in="true"] .wwn-item { opacity: 1; transform: none; }
        .wwn-item:first-child { border-left: 0; padding-left: 0; }
        @media (max-width: 900px) {
          .wwn-item:nth-child(odd) { border-left: 0; padding-left: 0; }
        }
        @media (max-width: 520px) {
          .wwn-item { border-left: 0; padding-left: 0; }
        }

        /* Accent tick that draws in above each figure. */
        .wwn-rule {
          display: block; width: 26px; height: 2px; border-radius: 2px;
          background: #1360ee; margin-bottom: clamp(16px,1.8vw,22px);
          transform: scaleX(0); transform-origin: left;
          transition: transform .7s ${EASE} .2s;
        }
        .wwn-grid[data-in="true"] .wwn-rule { transform: scaleX(1); }

        .wwn-value {
          font-size: clamp(36px,4.4vw,58px); font-weight: 800; line-height: 1;
          letter-spacing: -.04em; font-variant-numeric: tabular-nums;
          color: #fff; margin-bottom: 14px;
        }
        .wwn-suffix { color: #4d8cff; }
        .wwn-label {
          font-size: clamp(14px,1.25vw,15.5px); font-weight: 700;
          color: #fff; letter-spacing: -.01em; line-height: 1.3; margin-bottom: 9px;
        }
        .wwn-desc { margin: 0; font-size: 13px; line-height: 1.65; color: rgba(255,255,255,.55); }

        @media (prefers-reduced-motion: reduce) {
          .wwn-item, .wwn-rule { transition: none; opacity: 1; transform: none; }
        }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#fff' }}>
        <div className="wwn-slab" data-reveal>
          <div className="wwn-head">
            <span className="wwn-eyebrow">LOCATOR in Numbers</span>
            <h2 className="wwn-h2">Trusted at scale across the UAE</h2>
          </div>

          <div className="wwn-grid" ref={ref} data-in={start}>
            {STATS.map((s, i) => <StatCard key={s.label} stat={s} start={start} index={i} />)}
          </div>
        </div>
      </section>
    </>
  )
}
