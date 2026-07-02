'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

// Single brand accent — matches the Software page (no per-industry colours).
const BLUE = '#1360ee'

// ── Industry data (all 12 from servicepage.md) ───────────────────────────────

interface Industry {
  id: string
  num: string
  title: string
  desc: string
  vehicles: string[]
  count: number
  image?: string   // real screenshot; falls back to the built-in map card
}

const INDUSTRIES: Industry[] = [
  {
    id: 'fmcg',
    num: '01',
    title: 'FMCG Fleet\nTelematics',
    desc: 'GPS fleet telematics helps vans, pickups, mini-trucks, delivery bikes track distributors and supermarket deliveries live. It reduces fuel loss, improves route planning, automates maintenance, monitors drivers, and prevents delivery delays, giving FMCG companies in UAE full control over sales teams and daily stock movement.',
    vehicles: ['Delivery vans', 'Pickups', 'Mini-trucks', 'Delivery bikes'],
    count: 8,
    image: '/service_page/FMCG D1.png',
  },
  {
    id: 'transport',
    num: '02',
    title: 'Transport &\nLogistics Telematics',
    desc: 'LOCATOR GPS fleet systems support cars, vans, trucks, buses, bikes, yachts used for cargo, courier, and staff transport. It enables live trip tracking, driver behavior alerts, geofencing, and route history, helping UAE logistics companies reduce accidents, optimize delivery schedules, improve dispatch, and resolve claims faster with data proof.',
    vehicles: ['Cars', 'Vans', 'Trucks', 'Buses', 'Bikes', 'Yachts'],
    count: 12,
  },
  {
    id: 'construction',
    num: '03',
    title: 'Construction Site\nFleet Intelligence',
    desc: 'Fleet telematics tracks site cars, pickups, trucks, generators, forklifts, bulldozers, boom loaders, JCBs and loaders. It improves machine utilization, validates site activity, prevents unauthorized use, sends service reminders, and optimizes routes, helping UAE construction firms reduce equipment damage, delays, and fuel waste.',
    vehicles: ['Trucks', 'Generators', 'Forklifts', 'Bulldozers', 'Boom loaders', 'JCBs'],
    count: 10,
  },
  {
    id: 'facility',
    num: '04',
    title: 'Facility Management\nFleet Control',
    desc: 'GPS telematics gives real-time oversight on service vans, cars, pickup trucks, forklifts, generators, boom loaders and field machines. It improves task dispatch, idle control, geofence alerts, expense logging, and maintenance planning, helping UAE facility companies solve road team chaos, reduce response time, and validate service completion instantly.',
    vehicles: ['Service vans', 'Cars', 'Pickup trucks', 'Forklifts', 'Generators', 'Boom loaders'],
    count: 9,
  },
  {
    id: 'healthcare',
    num: '05',
    title: 'Healthcare Fleet\nMonitoring',
    desc: 'For ambulances, cars, vans, pickup trucks, delivery bikes, and mobile medical units, GPS telematics ensures live tracking, driver safety alerts, geofence hospitals, and automate service schedules. It improves emergency dispatch, reduces fleet downtime, and provides accurate trip logs, helping UAE healthcare providers deliver faster and safer medical support.',
    vehicles: ['Ambulances', 'Cars', 'Vans', 'Delivery bikes', 'Mobile medical units'],
    count: 6,
  },
  {
    id: 'travel',
    num: '06',
    title: 'Travel & Tourism\nFleet Telematics',
    desc: 'GPS fleet systems track tourist cars, vans, buses, bikes, yachts, and boats operating on UAE roads and waters. It improves guest transport scheduling, geofencing attractions, tracking trips, and monitoring drivers, helping tourism companies reduce delays, ensure safety, improve driver training, and provide better customer experience.',
    vehicles: ['Tourist cars', 'Vans', 'Buses', 'Bikes', 'Yachts', 'Boats'],
    count: 7,
  },
  {
    id: 'rental',
    num: '07',
    title: 'Rental & Leasing\nFleet Management',
    desc: 'Fleet telematics supports leased cars, vans, buses, bikes, trucks and boats. It tracks vehicle usage, monitors unauthorized trips, sends service alerts, and retrieves incident logs instantly. Rental companies in UAE benefit from reduced fraud, better asset utilization, improved maintenance scheduling, and faster claims resolution.',
    vehicles: ['Cars', 'Vans', 'Buses', 'Bikes', 'Trucks', 'Boats'],
    count: 15,
  },
  {
    id: 'petroleum',
    num: '08',
    title: 'Petroleum & Energy\nFleet Intelligence',
    desc: 'For tankers, trucks, pickups, cars, generator units, cranes, bulldozers, forklifts, boats and energy assets, GPS telematics tracks fuel transport, field teams, and machines live. It reduces fuel theft, monitors driver safety, geofences depots, and automates maintenance, helping UAE energy companies improve compliance and prevent asset misuse.',
    vehicles: ['Tankers', 'Trucks', 'Cranes', 'Bulldozers', 'Forklifts', 'Boats'],
    count: 11,
  },
  {
    id: 'vet',
    num: '09',
    title: 'Veterinary & Pet Care\nFleet Monitoring',
    desc: 'Fleet telematics tracks cars, service vans, bikes, pickup trucks, boats and mobile pet-care units used for rescue and home services. It improves dispatch, monitors drivers, geofences clinics, and retrieves trip logs, helping UAE pet-care providers reduce delays, improve training, validate service, and enhance customer trust.',
    vehicles: ['Cars', 'Service vans', 'Bikes', 'Pickup trucks', 'Boats'],
    count: 4,
  },
  {
    id: 'government',
    num: '10',
    title: 'Public & Government\nFleet Telematics',
    desc: 'For cars, pickup trucks, vans, buses, patrol boats, bikes, forklifts, loaders, generators and government machines, GPS telematics ensures live asset tracking, route audit, geofencing, and automated service reminders. It improves road-team coordination, enforces compliance, reduces downtime, and helps UAE public services operate faster and transparently.',
    vehicles: ['Cars', 'Vans', 'Buses', 'Patrol boats', 'Forklifts', 'Generators'],
    count: 14,
  },
  {
    id: 'waste',
    num: '11',
    title: 'Waste Management\nFleet Visibility',
    desc: 'GPS fleet systems track garbage trucks, pickup fleets, vans, forklifts, loaders, generators and depot machines. It monitors trips, idle time, driver behavior, and geofences yards, helping UAE waste companies improve driver training, resolve complaints faster, reduce vehicle damage, prevent fraud, and enhance daily collection operations.',
    vehicles: ['Garbage trucks', 'Pickup fleets', 'Vans', 'Forklifts', 'Loaders', 'Generators'],
    count: 8,
  },
  {
    id: 'school',
    num: '12',
    title: 'School & Educational\nFleet Monitoring',
    desc: 'Fleet telematics tracks school buses, vans, cars, bikes, boats and campus machines like generators and forklifts. It monitors student pickup trips, stop-arm violations, driver behavior, and geofence campuses, helping UAE schools improve safety, reduce road incidents, enforce compliance, and retrieve video or trip evidence quickly.',
    vehicles: ['School buses', 'Vans', 'Cars', 'Bikes', 'Boats', 'Generators'],
    count: 6,
  },
]

const N = INDUSTRIES.length
// Each industry occupies one full viewport of scroll; a hidden snap anchor per
// slide (scroll-snap-stop: always) makes the browser stop on every one, so a
// single gesture advances exactly one industry — no skipping on a hard flick.

// ── Easing helpers ───────────────────────────────────────────────────────────

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

// ── Fleet map visual card ─────────────────────────────────────────────────────

function FleetMapCard({ count }: { count: number }) {
  const active = Math.max(count - 3, 1)

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      border: '1px solid #e4e4e8',
      boxShadow: '0 30px 70px -28px rgba(20,40,90,.24), 0 4px 14px rgba(20,40,90,.06)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: 'clamp(300px, 44vh, 500px)',
    }}>
      {/* Chrome bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '9px 14px', borderBottom: '1px solid #e8e8eb', flexShrink: 0, background: '#fafafa' }}>
        {(['#ff5f57', '#febc2e', '#28c840'] as const).map(c => (
          <span key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'inline-block' }} />
        ))}
        <span style={{ fontSize: '11px', color: '#6e6e73', marginLeft: '8px', fontWeight: 600 }}>
          Live Fleet Map &mdash; {count} vehicles tracked
        </span>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(145deg,#d8e8f6,#e4eff8)', overflow: 'hidden' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
          {[14, 28, 42, 56, 70, 84].map(p => (
            <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="rgba(255,255,255,.65)" strokeWidth="7" />
          ))}
          {[16, 33, 50, 67, 84].map(p => (
            <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="rgba(255,255,255,.65)" strokeWidth="5" />
          ))}
          <polyline
            points="15%,68% 28%,50% 44%,32% 62%,22% 78%,40%"
            stroke={BLUE} strokeWidth="2.5" fill="none"
            strokeDasharray="9,5" strokeOpacity=".8"
          />
        </svg>

        {/* Vehicle dots */}
        {[
          { l: '28%', t: '50%', c: '#1fbf5b' },
          { l: '44%', t: '32%', c: BLUE       },
          { l: '62%', t: '22%', c: '#1fbf5b' },
          { l: '78%', t: '40%', c: '#ff9f0a' },
          { l: '15%', t: '68%', c: BLUE       },
        ].map((d, i) => (
          <div key={i} style={{
            position: 'absolute', left: d.l, top: d.t,
            transform: 'translate(-50%,-50%)', zIndex: 3,
          }}>
            <div style={{
              width: '13px', height: '13px', borderRadius: '50%',
              background: d.c, border: '2.5px solid #fff',
              boxShadow: `0 0 0 5px ${d.c}28`,
            }} />
          </div>
        ))}

        {/* Active vehicle popup */}
        <div style={{
          position: 'absolute', left: '28%', top: '22%',
          background: '#fff', borderRadius: '11px',
          padding: '9px 13px',
          boxShadow: '0 4px 22px rgba(0,0,0,.14)',
          fontSize: '10.5px', minWidth: '140px',
          transform: 'translateX(6%)', zIndex: 10,
          borderLeft: `3px solid ${BLUE}`,
        }}>
          <div style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '3px' }}>VAN-204</div>
          <div style={{ color: '#6e6e73', marginBottom: '2px' }}>62 km/h · Moving</div>
          <div style={{ color: '#6e6e73', marginBottom: '5px' }}>Jebel Ali, Dubai</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1fbf5b', fontWeight: 700, fontSize: '10px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1fbf5b', display: 'inline-block' }} />
            Live · GPS Active
          </div>
        </div>
      </div>

      {/* Status strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        padding: '10px 14px', borderTop: '1px solid #e8e8eb', flexShrink: 0,
        background: '#fafafa',
      }}>
        {[
          { l: 'Active',  v: String(active), c: '#1fbf5b' },
          { l: 'Idle',    v: '2',            c: '#ff9f0a' },
          { l: 'Stopped', v: '1',            c: '#6e6e73' },
          { l: 'Uptime',  v: '99.9%',        c: BLUE      },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: '9.5px', color: '#6e6e73', fontWeight: 600, marginTop: '2px' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main scroll-driven component ──────────────────────────────────────────────

export default function ServiceIndustries() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const numRef   = useRef<HTMLDivElement>(null)   // bg number — continuous parallax
  const mapPxRef = useRef<HTMLDivElement>(null)   // map inner — continuous parallax
  const fillRef  = useRef<HTMLDivElement>(null)   // progress fill — transform only

  const [displayIdx, setDisplayIdx] = useState(0)   // industry currently shown
  const [dirDown,    setDirDown]    = useState(true) // last scroll direction

  const idxRef   = useRef(0)
  const dirRef   = useRef<1 | -1>(1)
  const lastYRef = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    lastYRef.current = window.scrollY

    // Enable scroll snapping only while this section is mounted. Combined with
    // the per-slide anchors (scroll-snap-stop: always) the browser is *forced*
    // to stop on every industry, so one gesture = one slide — even a hard flick
    // or trackpad inertia cannot skip ahead. This is native, so momentum works
    // correctly on every device (no preventDefault fighting the browser).
    const html = document.documentElement
    const prevSnap = html.style.scrollSnapType
    html.style.scrollSnapType = 'y proximity'

    let raf = 0
    const apply = () => {
      raf = 0
      const rect  = wrap.getBoundingClientRect()
      const vh    = window.innerHeight
      const range = (N - 1) * vh                        // scroll distance across slides
      const scrolled = Math.min(Math.max(-rect.top, 0), range)
      const p = range > 0 ? scrolled / range : 0        // 0 → 1 across the section
      const f = scrolled / vh                            // fractional slide position
      const idx = Math.min(Math.max(Math.round(f), 0), N - 1)
      const t = clamp01(f - Math.floor(f))               // 0 → 1 within the slide

      // Transform-only parallax (never touches opacity → never disappears).
      if (numRef.current)   numRef.current.style.transform   = `translateY(calc(-58% + ${(t - 0.5) * -38}px))`
      if (mapPxRef.current) mapPxRef.current.style.transform = `translateY(${(t - 0.5) * -26}px)`
      if (fillRef.current)  fillRef.current.style.transform  = `scaleX(${p.toFixed(4)})`

      if (idx !== idxRef.current) { idxRef.current = idx; setDisplayIdx(idx) }
    }

    const onScroll = () => {
      const y = window.scrollY
      const nd = y > lastYRef.current ? 1 : -1
      if (y !== lastYRef.current && nd !== dirRef.current) {
        dirRef.current = nd
        setDirDown(nd === 1)
      }
      lastYRef.current = y
      if (!raf) raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      html.style.scrollSnapType = prevSnap
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const ind = INDUSTRIES[displayIdx]

  // Skip past the whole section in the direction the user is travelling.
  const handleSkip = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    const absTop = wrap.getBoundingClientRect().top + window.scrollY
    const target = dirRef.current < 0
      ? absTop - window.innerHeight - 2   // up → previous section
      : absTop + wrap.offsetHeight + 2    // down → next section
    window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .ind-strip { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .ind-strip::-webkit-scrollbar { display: none; }

        /* Hidden scroll-snap anchors — one full-viewport stop per industry.
           scroll-snap-stop: always forces the browser to halt on every one. */
        .ind-anchors { position: relative; z-index: 0; margin-top: -100vh; }
        .ind-anchor  { height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; }

        /* Skip control */
        .ind-skip {
          position: absolute; z-index: 6;
          right: clamp(16px, 4vw, 40px);
          bottom: clamp(18px, 3vh, 30px);
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 999px;
          font-family: inherit; font-size: 12.5px; font-weight: 700;
          color: #52525e; cursor: pointer;
          background: rgba(255,255,255,.82);
          border: 1px solid rgba(15,23,42,.1);
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
          box-shadow: 0 6px 20px rgba(15,23,42,.1);
          transition: color .2s ${EASE}, border-color .2s ${EASE},
                      background .2s ${EASE}, transform .2s ${EASE}, box-shadow .2s ${EASE};
        }
        .ind-skip:hover {
          color: ${BLUE}; border-color: ${BLUE};
          background: #fff; transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(19,96,238,.2);
        }
        .ind-skip svg { transition: transform .2s ${EASE}; }
        .ind-skip:hover svg { transform: translateY(2px); }
        @media (max-width: 520px) {
          .ind-skip { right: 50%; transform: translateX(50%); }
          .ind-skip:hover { transform: translateX(50%) translateY(-1px); }
        }

        /* Each slide re-mounts on index change (keyed) and plays these once,
           always settling at opacity:1 — robust against scroll pauses. */
        @keyframes indTextIn {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes indVizIn {
          from { opacity: 0; transform: translateY(30px) scale(.975); }
          to   { opacity: 1; transform: none; }
        }
        .ind-text-in { animation: indTextIn .62s ${EASE} both; }
        .ind-viz-in  { animation: indVizIn  .68s ${EASE} both; }

        /* Stagger the inner blocks for a premium, layered reveal. */
        .ind-stagger > * { animation: indTextIn .55s ${EASE} both; }
        .ind-stagger > *:nth-child(1) { animation-delay: .02s; }
        .ind-stagger > *:nth-child(2) { animation-delay: .07s; }
        .ind-stagger > *:nth-child(3) { animation-delay: .12s; }
        .ind-stagger > *:nth-child(4) { animation-delay: .17s; }
        .ind-stagger > *:nth-child(5) { animation-delay: .22s; }
        .ind-stagger > *:nth-child(6) { animation-delay: .27s; }

        .ind-vehicle-tag {
          font-size: 12.5px; font-weight: 600; color: #3a3a3c;
          background: rgba(255,255,255,.8);
          border: 1px solid rgba(0,0,0,.1);
          padding: 6px 14px; border-radius: 999px;
          backdrop-filter: blur(4px);
          transition: background .18s ${EASE}, border-color .18s ${EASE}, transform .18s ${EASE};
        }
        .ind-vehicle-tag:hover {
          background: #fff; border-color: ${BLUE}; color: ${BLUE};
          transform: translateY(-1px);
        }

        @media (prefers-reduced-motion: reduce) {
          .ind-text-in, .ind-viz-in, .ind-stagger > * {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        @media (max-width: 800px) {
          .ind-right-col { display: none !important; }
          .ind-left-col  { width: 100% !important; max-width: 640px !important; }
        }
        @media (max-width: 520px) {
          .ind-main-body { padding: 0 22px !important; }
        }
      `}</style>

      {/* Section height comes from the snap anchors below (N × 100vh) */}
      <section
        ref={wrapRef}
        id="industries"
        aria-label="Industries we serve"
        style={{ position: 'relative' }}
      >
        {/* Sticky panel fills the viewport while the anchors scroll past */}
        <div style={{
          position: 'sticky', top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #ffffff 0%, #f5f8fd 26%, #eef4fc 60%, #f6f9fd 84%, #ffffff 100%)',
          display: 'flex',
          flexDirection: 'column',
          isolation: 'isolate',
          zIndex: 1,
        }}>

          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 clamp(24px,5vw,64px)',
            height: '54px', flexShrink: 0,
            borderBottom: '1px solid rgba(0,0,0,.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                fontSize: '10.5px', fontWeight: 700, letterSpacing: '.1em',
                color: BLUE, textTransform: 'uppercase',
              }}>
                Industries
              </span>
              <div className="ind-strip" style={{ display: 'flex', gap: '5px', maxWidth: '210px' }}>
                {INDUSTRIES.map((_, i) => (
                  <div key={i} style={{
                    width: i === displayIdx ? '16px' : '5px',
                    height: '5px', borderRadius: '999px', flexShrink: 0,
                    background: i <= displayIdx ? BLUE : 'rgba(15,23,42,.14)',
                    transition: `width .4s ${EASE}, background .4s ${EASE}`,
                  }} />
                ))}
              </div>
            </div>

            <div style={{
              fontSize: '13px', fontWeight: 700,
              color: '#a1a1a6', letterSpacing: '.04em',
              fontVariantNumeric: 'tabular-nums',
            }}>
              <span style={{ color: BLUE, fontSize: '15px' }}>{ind.num}</span>
              <span style={{ margin: '0 4px' }}>/</span>
              {String(N).padStart(2, '0')}
            </div>
          </div>

          {/* Body */}
          <div
            className="ind-main-body"
            style={{
              flex: 1, minHeight: 0,
              display: 'flex', alignItems: 'center',
              padding: '0 clamp(24px,5vw,64px)',
              gap: 'clamp(28px,5vw,80px)',
            }}
          >
            {/* Left — text */}
            <div className="ind-left-col" style={{ flex: '0 0 auto', width: 'min(50%, 540px)', position: 'relative' }}>
              {/* Background number (persistent, continuous parallax) */}
              <div
                ref={numRef}
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '50%', left: '-10px',
                  transform: 'translateY(-58%)',
                  fontSize: 'clamp(100px,14vw,180px)', fontWeight: 900,
                  color: BLUE, opacity: .06, lineHeight: 1,
                  letterSpacing: '-.06em', userSelect: 'none',
                  pointerEvents: 'none', zIndex: 0,
                  willChange: 'transform',
                }}
              >
                {ind.num}
              </div>

              {/* Foreground content — keyed so it re-animates in on each change */}
              <div
                key={displayIdx}
                className="ind-stagger"
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  fontSize: '10.5px', fontWeight: 700, letterSpacing: '.08em',
                  color: BLUE, textTransform: 'uppercase', marginBottom: '14px',
                }}>
                  <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: BLUE, borderRadius: '2px' }} />
                  GPS Fleet Services
                </div>

                <h2 style={{
                  margin: '0 0 18px',
                  fontSize: 'clamp(30px,3.8vw,52px)',
                  fontWeight: 800, lineHeight: 1.06,
                  letterSpacing: '-.03em', color: '#1d1d1f',
                }}>
                  {ind.title.split('\n').map((line, i) => (
                    <span key={i} style={{ display: 'block' }}>{line}</span>
                  ))}
                </h2>

                <div style={{ width: '44px', height: '3px', borderRadius: '2px', background: BLUE, marginBottom: '20px' }} />

                <p style={{
                  margin: '0 0 26px',
                  fontSize: 'clamp(13.5px,1.3vw,15.5px)',
                  lineHeight: 1.72, color: '#52525e', maxWidth: '48ch',
                }}>
                  {ind.desc}
                </p>

                <div>
                  <p style={{
                    margin: '0 0 10px',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '.09em', color: '#1d1d1f', textTransform: 'uppercase',
                  }}>
                    Tracked assets
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {ind.vehicles.map(v => (
                      <span key={v} className="ind-vehicle-tag">{v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — visual (keyed enter animation + inner parallax) */}
            <div key={displayIdx} className="ind-viz-in ind-right-col" style={{ flex: 1, minWidth: 0 }}>
              <div ref={mapPxRef} style={{ willChange: 'transform' }}>
                {ind.image ? (
                  <div style={{
                    position: 'relative',
                    height: 'clamp(340px, 52vh, 580px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #e4e4e8',
                    boxShadow: '0 30px 70px -28px rgba(20,40,90,.24), 0 4px 14px rgba(20,40,90,.06)',
                    background: '#eef3fb',
                  }}>
                    <Image
                      src={ind.image}
                      alt={`${ind.title.replace('\n', ' ')} dashboard`}
                      fill
                      sizes="(max-width: 800px) 0px, 46vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <FleetMapCard count={ind.count} />
                )}
              </div>
            </div>
          </div>

          {/* Skip — jump past the pinned section (direction-aware) */}
          <button className="ind-skip" onClick={handleSkip} aria-label={dirDown ? 'Skip to next section' : 'Skip to previous section'}>
            Skip section
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points={dirDown ? '6 9 12 15 18 9' : '6 15 12 9 18 15'} />
            </svg>
          </button>

          {/* Slim neutral scroll progress (theme grey → blue fill, not a rainbow bar) */}
          <div style={{ height: '3px', flexShrink: 0, background: 'rgba(15,23,42,.06)' }}>
            <div
              ref={fillRef}
              style={{
                height: '100%', width: '100%',
                background: BLUE, opacity: .5,
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
              }}
            />
          </div>

        </div>

        {/* Snap anchors (behind the panel): one per industry, pulled up under it
            so each defines a full-viewport scroll stop. */}
        <div className="ind-anchors" aria-hidden="true">
          {INDUSTRIES.map((_, i) => (
            <div key={i} className="ind-anchor" />
          ))}
        </div>
      </section>
    </>
  )
}
