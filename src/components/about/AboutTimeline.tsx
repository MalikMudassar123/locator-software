'use client'

import { useEffect, useRef } from 'react'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const PILLARS = [
  {
    num: '01',
    label: 'Purpose',
    title: 'Our Purpose',
    body: 'We exist to help businesses transform underutilized vehicles, assets, and field teams into engines of intelligent growth. Through AI-powered IoT technology, we bring greater control, efficiency, safety, and transparency to operations — reducing costs, improving profitability, and enabling businesses to grow with purpose.',
    accent: '#1360ee',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Vision',
    title: 'Our Vision',
    body: 'By 2035, we envision a globally connected world where one million IoT devices enable smarter mobility, safer assets, and more intelligent operations — positioning us as a trusted global leader in AI-powered IoT innovation.',
    accent: '#7c3aed',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Mission',
    title: 'Our Mission',
    body: 'Our mission is to empower businesses worldwide with AI-powered IoT solutions that create safer, smarter, and more efficient operations — turning complexity into clarity and growth.',
    accent: '#13923f',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 6.9H22l-6 4.4 2.3 6.9-6.3-4.4-6.3 4.4L8 13.3 2 8.9h7.6z" />
      </svg>
    ),
  },
]

export default function AboutTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const fill = fillRef.current
    if (!wrap || !fill) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.height = '100%'
      return
    }

    let raf = 0
    const apply = () => {
      raf = 0
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(Math.max((vh * 0.78 - rect.top) / (rect.height - vh * 0.25), 0), 1)
      fill.style.height = `${progress * 100}%`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <style>{`
        .tl-section { position: relative; padding: clamp(56px,7vw,96px) 28px; background: #f7f9fc; overflow: hidden; }
        .tl-head { text-align: center; max-width: 640px; margin: 0 auto clamp(44px,6vw,72px); }

        .tl-wrap { position: relative; max-width: 1120px; margin: 0 auto; }

        /* central spine */
        .tl-spine {
          position: absolute; top: 8px; bottom: 8px; left: 50%;
          width: 3px; transform: translateX(-50%);
          background: #e2e8f4; border-radius: 3px; z-index: 0;
        }
        .tl-fill {
          position: relative; width: 100%; height: 0;
          background: linear-gradient(180deg, #1360ee 0%, #7c3aed 52%, #13923f 100%);
          border-radius: 3px;
          transition: height .15s linear;
        }
        /* glowing comet at the leading edge */
        .tl-comet {
          position: absolute; left: 50%; bottom: 0; width: 15px; height: 15px;
          transform: translate(-50%, 50%); border-radius: 50%; background: #fff;
          box-shadow: 0 0 14px 3px rgba(19,96,238,.55), 0 0 0 5px rgba(19,96,238,.14);
        }

        .tl-row {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 88px 1fr;
          align-items: center;
          margin-bottom: clamp(24px,3.5vw,52px);
        }
        .tl-row:last-child { margin-bottom: 0; }
        .tl-empty { position: relative; display: grid; place-items: center; min-height: 100%; }

        /* giant ghost number on the opposite side */
        .tl-ghost {
          font-family: ui-monospace, 'Cascadia Code', monospace;
          font-size: clamp(90px,12vw,190px); font-weight: 800; line-height: .9;
          letter-spacing: -.04em; opacity: .09; user-select: none;
        }

        .tl-node-cell { display: grid; place-items: center; }
        .tl-node {
          position: relative; width: 64px; height: 64px; border-radius: 50%;
          display: grid; place-items: center; color: #fff;
          box-shadow: 0 14px 30px -10px var(--tl-accent);
        }
        .tl-node::after {
          content: ''; position: absolute; inset: -7px; border-radius: 50%;
          border: 1.5px solid var(--tl-accent); opacity: .3;
        }
        @keyframes tlPulse { 0% { box-shadow: 0 0 0 0 var(--tl-ring); } 70% { box-shadow: 0 0 0 16px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
        @media (prefers-reduced-motion: no-preference) { .tl-node { animation: tlPulse 3.4s ${EASE} infinite; } }

        .tl-card {
          position: relative; background: #fff;
          border: 1px solid #e8ecf4; border-radius: 22px;
          padding: clamp(24px,2.8vw,36px);
          box-shadow: 0 2px 16px rgba(20,40,90,.05);
          transition: transform .28s ${EASE}, box-shadow .28s ${EASE};
        }
        .tl-card:hover { transform: translateY(-5px); box-shadow: 0 26px 50px -22px rgba(20,40,90,.32); }
        /* pointer toward the spine */
        .tl-card::before {
          content: ''; position: absolute; top: 50%; width: 15px; height: 15px;
          background: #fff; transform: translateY(-50%) rotate(45deg);
        }
        .tl-row[data-side="left"] .tl-card::before { right: -8px; border-top: 1px solid #e8ecf4; border-right: 1px solid #e8ecf4; }
        .tl-row[data-side="right"] .tl-card::before { left: -8px; border-bottom: 1px solid #e8ecf4; border-left: 1px solid #e8ecf4; }
        /* connector hairline from node to card */
        .tl-card::after {
          content: ''; position: absolute; top: 50%; width: clamp(20px,3vw,40px); height: 2px;
          transform: translateY(-50%); background: var(--tl-accent); opacity: .4;
        }
        .tl-row[data-side="left"] .tl-card::after { right: calc(-1 * clamp(20px,3vw,40px)); }
        .tl-row[data-side="right"] .tl-card::after { left: calc(-1 * clamp(20px,3vw,40px)); }

        .tl-kicker {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: 14px;
        }
        .tl-kicker-line { width: 26px; height: 2px; border-radius: 2px; }

        @media (max-width: 768px) {
          .tl-spine { left: 27px; }
          .tl-row { display: flex; align-items: flex-start; gap: 18px; grid-template-columns: none; }
          .tl-empty { display: none; }
          .tl-node-cell { order: 0; flex: 0 0 56px; }
          .tl-node { width: 54px; height: 54px; }
          .tl-card-cell { order: 1; flex: 1; min-width: 0; }
          .tl-card::before, .tl-card::after { display: none; }
        }
      `}</style>

      <section className="tl-section">
        <div className="tl-head" data-reveal>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
            Our North Star
          </span>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.4vw,42px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.025em', color: '#1d1d1f' }}>
            What drives everything we build
          </h2>
          <p style={{ margin: '16px auto 0', fontSize: 'clamp(14px,1.35vw,16px)', color: '#6e6e73', lineHeight: 1.6 }}>
            Purpose, vision, and mission — the three pillars that guide how we help businesses operate smarter every day.
          </p>
        </div>

        <div className="tl-wrap" ref={wrapRef}>
          <div className="tl-spine" aria-hidden="true">
            <div className="tl-fill" ref={fillRef}><span className="tl-comet" /></div>
          </div>

          {PILLARS.map((p, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            const card = (
              <div className="tl-card-cell">
                <div
                  className="tl-card"
                  data-reveal={side === 'left' ? 'left' : 'right'}
                  style={{ '--tl-accent': p.accent } as React.CSSProperties}
                >
                  <span className="tl-kicker" style={{ color: p.accent }}>
                    <span className="tl-kicker-line" style={{ background: p.accent }} />
                    {p.label}
                  </span>
                  <h3 style={{ margin: '0 0 12px', fontSize: 'clamp(20px,2.1vw,26px)', fontWeight: 800, letterSpacing: '-.02em', color: '#1d1d1f' }}>
                    {p.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#52525e' }}>
                    {p.body}
                  </p>
                </div>
              </div>
            )
            const ghost = (
              <div className="tl-empty" aria-hidden="true">
                <span className="tl-ghost" style={{ color: p.accent }}>{p.num}</span>
              </div>
            )
            const node = (
              <div className="tl-node-cell">
                <div
                  className="tl-node"
                  data-reveal="zoom"
                  style={{ background: p.accent, '--tl-accent': p.accent, '--tl-ring': `${p.accent}55` } as React.CSSProperties}
                >
                  {p.icon}
                </div>
              </div>
            )
            return (
              <div className="tl-row" data-side={side} key={p.num}>
                {side === 'left' ? card : ghost}
                {node}
                {side === 'right' ? card : ghost}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
