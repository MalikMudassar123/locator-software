'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b)

// Toggle to re-enable the hero dashboard cards + scroll cross-fade.
const SHOW_CARDS = false as boolean

// ── Layer 1: Live fleet map card ─────────────────────────────────────────────

function LiveMapCard() {
  return (
    <div style={{
      width: 'min(94vw, 980px)',
      maxWidth: '100%',
      height: 'clamp(240px, 40vh, 440px)',
      maxHeight: '100%',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 36px 70px -34px rgba(20,40,90,.42), 0 2px 8px rgba(20,40,90,.08)',
      background: '#fff',
      border: '1px solid #e7ebf3',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Chrome bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '9px 14px', borderBottom: '1px solid #e8e8eb', flexShrink: 0 }}>
        {(['#ff5f57', '#febc2e', '#28c840'] as const).map(c => (
          <span key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'inline-block' }} />
        ))}
        <span style={{ fontSize: '11px', color: '#6e6e73', marginLeft: '8px', fontWeight: 600 }}>
          locator.ae — Live Fleet Map · 47 vehicles
        </span>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Vehicle sidebar */}
        <div style={{ width: '165px', borderRight: '1px solid #e8e8eb', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
          {[
            { v: 'VAN-204', s: '62 km/h', c: '#1fbf5b' },
            { v: 'TRK-118', s: 'Idle',    c: '#ff9f0a' },
            { v: 'VAN-211', s: '48 km/h', c: '#1fbf5b' },
            { v: 'BUS-007', s: '55 km/h', c: '#1fbf5b' },
            { v: 'TRK-090', s: 'Stopped', c: '#6e6e73' },
          ].map((v, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 8px', borderRadius: '7px',
              background: i === 0 ? '#f0f4ff' : 'transparent',
              border: i === 0 ? '1px solid #dde7ff' : '1px solid transparent',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: v.c, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d1d1f' }}>{v.v}</div>
                <div style={{ fontSize: '9.5px', color: '#6e6e73' }}>{v.s}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '5px 8px', background: '#f5f5f7', borderRadius: '7px', fontSize: '10px', textAlign: 'center', color: '#6e6e73' }}>
            +42 more
          </div>
        </div>

        {/* Map area */}
        <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(145deg,#dce8f4,#e8f2fb)', overflow: 'hidden' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
            {[18, 36, 54, 72].map(p => (
              <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="rgba(255,255,255,.55)" strokeWidth="7" />
            ))}
            {[25, 50, 75].map(p => (
              <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="rgba(255,255,255,.55)" strokeWidth="5" />
            ))}
            <polyline points="10%,68% 28%,48% 44%,32% 60%,24% 76%,36%"
              stroke="#1360ee" strokeWidth="2.5" fill="none" strokeDasharray="8,4" strokeOpacity=".7" />
          </svg>

          {/* Vehicle markers */}
          {[
            { l: '28%', t: '48%', c: '#1fbf5b' },
            { l: '60%', t: '24%', c: '#ff9f0a' },
            { l: '76%', t: '36%', c: '#1fbf5b' },
            { l: '44%', t: '68%', c: '#1fbf5b' },
            { l: '88%', t: '56%', c: '#6e6e73' },
          ].map((v, i) => (
            <div key={i} style={{
              position: 'absolute', left: v.l, top: v.t,
              transform: 'translate(-50%,-50%)', zIndex: 3,
            }}>
              <div style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: v.c, border: '2.5px solid #fff',
                boxShadow: `0 0 0 4px ${v.c}38`,
              }} />
            </div>
          ))}

          {/* Active vehicle popup */}
          <div style={{
            position: 'absolute', left: '28%', top: '12%',
            background: '#fff', borderRadius: '10px', padding: '9px 12px',
            boxShadow: '0 4px 18px rgba(0,0,0,.13)', fontSize: '10.5px',
            minWidth: '136px', transform: 'translateX(-10%)', zIndex: 10,
          }}>
            <div style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '3px' }}>VAN-204</div>
            <div style={{ color: '#6e6e73', marginBottom: '2px' }}>62 km/h · Moving</div>
            <div style={{ color: '#6e6e73', marginBottom: '5px' }}>Jebel Ali, Dubai</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1fbf5b', fontWeight: 700, fontSize: '10px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1fbf5b', display: 'inline-block' }} />
              Live · GPS Active
            </div>
          </div>

          {/* Status strip */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(0,0,0,.06)',
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            padding: '7px 12px',
          }}>
            {[
              { l: 'Active',  v: '32', c: '#1fbf5b' },
              { l: 'Idle',    v: '8',  c: '#ff9f0a' },
              { l: 'Stopped', v: '6',  c: '#6e6e73' },
              { l: 'Offline', v: '1',  c: '#ff5f57' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: '9px', color: '#6e6e73', fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Layer 2: Fleet dashboard card ────────────────────────────────────────────

function FleetDashCard() {
  const bars = [55, 72, 65, 80, 90, 78, 95]

  return (
    <div style={{
      width: 'min(94vw, 980px)',
      maxWidth: '100%',
      height: 'clamp(240px, 40vh, 440px)',
      maxHeight: '100%',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 36px 70px -34px rgba(20,40,90,.42), 0 2px 8px rgba(20,40,90,.08)',
      background: '#fff',
      border: '1px solid #e7ebf3',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Chrome bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '9px 14px', borderBottom: '1px solid #e8e8eb', flexShrink: 0 }}>
        {(['#ff5f57', '#febc2e', '#28c840'] as const).map(c => (
          <span key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'inline-block' }} />
        ))}
        <span style={{ fontSize: '11px', color: '#6e6e73', marginLeft: '8px', fontWeight: 600 }}>
          locator.ae — Fleet Service Dashboard
        </span>
      </div>

      <div style={{ flex: 1, padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', overflow: 'hidden' }}>
        {/* Left — KPI cards + chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
            {[
              { l: 'Total Trips',  v: '148',      sub: '+12% vs yesterday', c: '#1360ee' },
              { l: 'Distance',     v: '3,240 km', sub: 'Fleet total today',  c: '#13923f' },
              { l: 'Fuel Saved',   v: '18 L',     sub: 'vs manual routing',  c: '#7c3aed' },
              { l: 'Open Alerts',  v: '3',         sub: 'Needs attention',    c: '#c2740a' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#f5f5f7', borderRadius: '10px', padding: '11px' }}>
                <div style={{ fontSize: '9.5px', color: '#6e6e73', fontWeight: 600, marginBottom: '4px' }}>{s.l}</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: '9px', color: '#a1a1a6', marginTop: '2px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, background: '#f5f5f7', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px', minHeight: '50px' }}>
            <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#6e6e73' }}>Trips per day — this week</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', flex: 1 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', background: i === 6 ? '#1360ee' : '#dde3f0', height: `${h}%` }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '8.5px', color: i === 6 ? '#1360ee' : '#a1a1a6', fontWeight: 700 }}>{d}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — service alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#1d1d1f', marginBottom: '2px' }}>Service Alerts</div>
          {[
            { icon: '⚠️', t: 'Oil change due',           v: 'TRK-118 · 320 km',     bg: '#fff3e3', c: '#c2740a' },
            { icon: '✅', t: 'VAN-204 entered HQ zone',  v: '09:12 AM today',        bg: '#edfff4', c: '#13923f' },
            { icon: '🌙', t: 'After-hours movement',      v: 'TRK-090 · 11:42 PM',   bg: '#f3f0ff', c: '#7c3aed' },
            { icon: '📍', t: 'Geofence exit detected',   v: 'VAN-211 · Depot zone',  bg: '#fff0f2', c: '#c0384d' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: a.bg, borderRadius: '9px' }}>
              <span style={{ fontSize: '14px' }}>{a.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d1d1f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.t}</div>
                <div style={{ fontSize: '9.5px', color: a.c }}>{a.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main hero ────────────────────────────────────────────────────────────────

export default function ServiceHero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const l1Ref   = useRef<HTMLDivElement>(null)
  const l2Ref   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const l1   = l1Ref.current
    const l2   = l2Ref.current
    if (!wrap || !l1 || !l2) return

    let raf = 0
    const apply = () => {
      raf = 0
      const dist    = wrap.offsetHeight - window.innerHeight
      const scrolled = clamp(-wrap.getBoundingClientRect().top, 0, dist || 1)
      const p = dist > 0 ? scrolled / dist : 0
      const t = clamp((p - 0.2) / 0.4)

      l1.style.opacity      = String(1 - t)
      l1.style.transform    = `translateY(${-t * 34}px) scale(${1 - t * 0.06})`
      l1.style.pointerEvents = t > 0.5 ? 'none' : 'auto'

      l2.style.opacity      = String(t)
      l2.style.transform    = `translateY(${(1 - t) * 44}px) scale(${0.94 + t * 0.06})`
      l2.style.pointerEvents = t > 0.5 ? 'auto' : 'none'
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
        @keyframes srvHeroRise {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes srvGlow {
          0%,100% { opacity: .55; }
          50%      { opacity: .9; }
        }

        /* Cards disabled → no extra scroll distance needed; hero is one screen. */
        .srv-pin-wrap { position: relative; min-height: 100svh; background: #ffffff; }
        .srv-pin {
          position: relative; min-height: 100svh;
          display: flex; flex-direction: column;
          overflow: hidden; isolation: isolate; background: #ffffff;
        }
        .srv-hero-body {
          flex: 1 1 auto; min-height: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: clamp(10px, 1.6vh, 24px);
          padding: clamp(24px, 5vh, 56px) 24px clamp(40px, 8vh, 80px);
        }
        .srv-copy { text-align: center; max-width: 1120px; width: 100%; }
        @media (prefers-reduced-motion: no-preference) {
          .srv-copy { animation: srvHeroRise .9s cubic-bezier(.22,.61,.36,1) .05s both; }
        }
        .srv-btn {
          font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
          padding: 12px 24px; border-radius: 999px; border: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          display: inline-flex; align-items: center; gap: 7px;
          white-space: nowrap; text-decoration: none;
        }
        .srv-btn-primary { background: #1360ee; color: #fff; }
        .srv-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); }
        .srv-btn-ghost   { background: transparent; color: #1360ee; padding: 12px 6px; }
        .srv-btn-ghost:hover { color: #0d4fd4; transform: translateY(-1px); }

        .srv-stage {
          position: relative; flex: 1 1 auto; min-height: 0;
          width: 100%; max-width: 1240px; margin: 0 auto;
        }
        .srv-glow {
          position: absolute; left: 50%; bottom: 6%;
          width: min(74%, 840px); height: 60%;
          transform: translateX(-50%);
          background: radial-gradient(60% 60% at 50% 60%, rgba(19,96,238,.18), transparent 72%);
          filter: blur(26px); z-index: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .srv-glow { animation: srvGlow 7s ease-in-out infinite; }
        }
        .srv-layer {
          position: absolute; inset: 0; z-index: 1;
          display: flex; justify-content: center; align-items: flex-end;
          will-change: opacity, transform;
        }
      `}</style>

      <div className="srv-pin-wrap" ref={wrapRef}>
        <div className="srv-pin">
          <SoftwareNavbar />

          <div className="srv-hero-body">
            <div className="srv-copy">
              <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.01em', color: '#1360ee', marginBottom: 'clamp(8px,1.4vh,14px)' }}>
                Locator Fleet Services
              </p>
              <h1 style={{ fontSize: 'clamp(26px,3.4vw,46px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-.025em', color: '#1d1d1f', maxWidth: '22ch', margin: '0 auto' }}>
                Improve Fleet Operations with GPS Tracking &amp; Telematics
              </h1>
              <p style={{ maxWidth: '560px', margin: 'clamp(8px,1.4vh,14px) auto 0', fontSize: 'clamp(13px,1.35vw,16px)', lineHeight: 1.5, color: '#3a3a3c' }}>
                Real-time GPS tracking to manage drivers, routes, and road operations with ease.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: 'clamp(14px,2.2vh,24px)', flexWrap: 'wrap' }}>
                <button className="srv-btn srv-btn-primary">Get a quote</button>
                <button className="srv-btn srv-btn-ghost">Get a demo →</button>
              </div>
              <p style={{ marginTop: 'clamp(8px,1.4vh,14px)' }}>
                <Link href="#benefits" style={{ color: '#1360ee', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
                  See all features ›
                </Link>
              </p>
            </div>

            {/* Dashboard visuals temporarily disabled. Flip SHOW_CARDS to true to
                restore the scroll-driven map → dashboard cross-fade. */}
            {SHOW_CARDS && (
              <div className="srv-stage">
                <div className="srv-glow" aria-hidden="true" />
                <div className="srv-layer" ref={l1Ref}><LiveMapCard /></div>
                <div className="srv-layer" ref={l2Ref} style={{ opacity: 0 }}><FleetDashCard /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
