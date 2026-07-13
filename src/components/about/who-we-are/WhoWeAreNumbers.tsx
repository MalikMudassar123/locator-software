'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const STATS = [
  { target: 10, suffix: '+', label: 'Years of Industry Experience', desc: 'Delivering trusted fleet telematics and IoT solutions.', accent: '#1360ee' },
  { target: 1000, suffix: '+', label: 'Businesses Empowered', desc: 'Helping organizations optimize fleet operations across the UAE.', accent: '#13923f' },
  { target: 20000, suffix: '+', label: 'Connected Vehicles & Assets', desc: 'Monitored through our intelligent GPS and IoT platform.', accent: '#7c3aed' },
  { target: 1, suffix: 'M+', label: 'Data Points Processed Daily', desc: 'Turning real-time operational data into actionable insights.', accent: '#c2740a' },
]

function formatValue(n: number, target: number) {
  if (target >= 1000) return Math.round(n).toLocaleString('en-US')
  return String(Math.round(n))
}

function StatCard({ stat, start }: { stat: typeof STATS[number]; start: boolean }) {
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
    <div className="wwn-card" style={{ '--wwn-accent': stat.accent } as React.CSSProperties}>
      <div className="wwn-value" style={{ color: stat.accent }}>
        {formatValue(val, stat.target)}{stat.suffix}
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
        .wwn-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(16px,2vw,22px); }
        @media (max-width: 900px) { .wwn-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 520px) { .wwn-grid { grid-template-columns: 1fr; } }

        .wwn-card {
          position: relative; overflow: hidden;
          background: #fff; border: 1px solid #e8ecf4; border-radius: 20px;
          padding: clamp(24px,2.8vw,32px);
          box-shadow: 0 2px 14px rgba(20,40,90,.05);
          transition: transform .26s ${EASE}, box-shadow .26s ${EASE};
        }
        .wwn-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--wwn-accent);
        }
        .wwn-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px -22px rgba(20,40,90,.28); }
        .wwn-value {
          font-size: clamp(34px,4vw,52px); font-weight: 800; line-height: 1;
          letter-spacing: -.03em; font-variant-numeric: tabular-nums;
          margin-bottom: 12px;
        }
        .wwn-label { font-size: clamp(14px,1.3vw,16px); font-weight: 800; color: #1d1d1f; letter-spacing: -.01em; margin-bottom: 8px; }
        .wwn-desc { margin: 0; font-size: 13px; line-height: 1.6; color: #6e6e73; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto clamp(40px,5vw,56px)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
              LOCATOR in Numbers
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.4vw,40px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              Trusted at scale across the UAE
            </h2>
          </div>

          <div className="wwn-grid" ref={ref} data-reveal>
            {STATS.map(s => <StatCard key={s.label} stat={s} start={start} />)}
          </div>
        </div>
      </section>
    </>
  )
}
