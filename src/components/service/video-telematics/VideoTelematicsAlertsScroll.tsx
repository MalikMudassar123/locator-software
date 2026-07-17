'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'
const BLUE = '#1360ee'

// ── AI driver-monitoring alerts — one heading + one image per slide ──────────

interface Alert {
  id: string
  num: string
  title: string
  desc: string
  signals: string[]
  image: string
  imageW: number
  imageH: number
}

const ALERTS: Alert[] = [
  {
    id: 'yawning',
    num: '01',
    title: 'Frequent\nYawning',
    desc: 'The driver-facing AI camera detects repeated yawning as an early warning sign of fatigue, alerting the driver in-cab and flagging the event for the fleet manager before tiredness turns into a road incident.',
    signals: ['In-cab audio alert', 'Fatigue event log', 'Manager notified'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
  {
    id: 'seatbelt',
    num: '02',
    title: 'Not Wearing\nSeatbelt',
    desc: 'AI recognises when the seatbelt is not fastened while the vehicle is in motion and triggers an immediate audible reminder, with the violation recorded as video evidence for safety compliance and driver coaching.',
    signals: ['Instant reminder', 'Video evidence', 'Compliance record'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
  {
    id: 'smoking',
    num: '03',
    title: 'Smoking\nin the Cabin',
    desc: 'Smoking inside the vehicle is detected and logged with timestamped footage, helping companies enforce in-cab safety policies, protect vehicle condition, and maintain standards across the whole fleet.',
    signals: ['Policy enforcement', 'Timestamped clip', 'Driver report'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
  {
    id: 'nodding',
    num: '04',
    title: 'Nodding\nOff',
    desc: 'Micro-sleep and head-nodding are identified the moment they begin, waking the driver with an instant audible alert — one of the highest-risk behaviours AI dashcams are built to prevent on long UAE routes.',
    signals: ['Critical alert', 'Micro-sleep detection', 'Priority escalation'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
  {
    id: 'droopy-eyes',
    num: '05',
    title: 'Droopy\nEyes',
    desc: 'Continuous eye-closure tracking measures drowsiness in real time, warning the driver early and giving managers the data to adjust shifts, rest breaks, and route planning before fatigue becomes dangerous.',
    signals: ['Eye-closure tracking', 'Early warning', 'Shift insights'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
  {
    id: 'talking',
    num: '06',
    title: 'Talking\n& Distraction',
    desc: 'Distracted conversation behind the wheel is identified and logged, giving fleet managers objective, data-backed evidence to coach safer, more focused driving habits across the team.',
    signals: ['Distraction event', 'Coaching data', 'Trend reporting'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
  {
    id: 'texting',
    num: '07',
    title: 'Texting on\na Phone',
    desc: 'Phone handling and texting while driving are detected instantly, triggering a real-time alert and capturing undeniable recorded proof that protects the business in disputes and insurance claims.',
    signals: ['Real-time alert', 'Recorded proof', 'Claim protection'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
  {
    id: 'looking-away',
    num: '08',
    title: 'Looking\nAway',
    desc: 'The AI notices the moment a driver’s attention leaves the road ahead and issues an immediate distraction alert, reducing collision risk across deliveries, loading hubs, and daily commercial routes.',
    signals: ['Attention tracking', 'Collision prevention', 'Instant alert'],
    image: '/block 1/video teleframe.png',
    imageW: 1598,
    imageH: 984,
  },
]

const N = ALERTS.length
const IMAGE_LIST = Array.from(new Set(ALERTS.map(a => a.image)))
const IMG_SIZES = '(max-width: 800px) 0px, 46vw'

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

export default function VideoTelematicsAlertsScroll() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const numRef   = useRef<HTMLDivElement>(null)
  const vizPxRef = useRef<HTMLDivElement>(null)
  const fillRef  = useRef<HTMLDivElement>(null)

  const [displayIdx, setDisplayIdx] = useState(0)
  const [dirDown,    setDirDown]    = useState(true)
  const [loaded,     setLoaded]     = useState<Record<string, boolean>>({})
  const markLoaded = (src: string) => setLoaded(l => (l[src] ? l : { ...l, [src]: true }))

  const idxRef   = useRef(0)
  const dirRef   = useRef<1 | -1>(1)
  const lastYRef = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    lastYRef.current = window.scrollY

    const html = document.documentElement
    const prevSnap = html.style.scrollSnapType
    html.style.scrollSnapType = 'y proximity'

    let raf = 0
    const apply = () => {
      raf = 0
      const rect  = wrap.getBoundingClientRect()
      const vh    = window.innerHeight
      const range = (N - 1) * vh
      const scrolled = Math.min(Math.max(-rect.top, 0), range)
      const p = range > 0 ? scrolled / range : 0
      const f = scrolled / vh
      const idx = Math.min(Math.max(Math.round(f), 0), N - 1)
      const t = clamp01(f - Math.floor(f))

      if (numRef.current)   numRef.current.style.transform   = `translateY(calc(-58% + ${(t - 0.5) * -38}px))`
      if (vizPxRef.current) vizPxRef.current.style.transform = `translateY(${(t - 0.5) * -26}px)`
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

  const alert = ALERTS[displayIdx]

  const handleSkip = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    const absTop = wrap.getBoundingClientRect().top + window.scrollY
    const target = dirRef.current < 0
      ? absTop - window.innerHeight - 2
      : absTop + wrap.offsetHeight + 2
    window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .vta-strip { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .vta-strip::-webkit-scrollbar { display: none; }

        .vta-anchors { position: relative; z-index: 0; margin-top: -100vh; }
        .vta-anchor  { height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; }

        @keyframes vtaShimmer { 0% { background-position: -160% 0; } 100% { background-position: 160% 0; } }
        .vta-skeleton {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(100deg, #e7edf6 30%, #f4f8fd 50%, #e7edf6 70%);
          background-size: 200% 100%;
          animation: vtaShimmer 1.4s ${EASE} infinite;
        }

        .vta-skip {
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
        .vta-skip:hover {
          color: ${BLUE}; border-color: ${BLUE};
          background: #fff; transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(19,96,238,.2);
        }
        .vta-skip svg { transition: transform .2s ${EASE}; }
        .vta-skip:hover svg { transform: translateY(2px); }
        @media (max-width: 520px) {
          .vta-skip { right: 50%; transform: translateX(50%); }
          .vta-skip:hover { transform: translateX(50%) translateY(-1px); }
        }

        @keyframes vtaTextIn { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
        @keyframes vtaVizIn  { from { opacity: 0; transform: translateY(30px) scale(.975); } to { opacity: 1; transform: none; } }
        .vta-text-in { animation: vtaTextIn .62s ${EASE} both; }
        .vta-viz-in  { animation: vtaVizIn  .68s ${EASE} both; }

        .vta-stagger > * { animation: vtaTextIn .55s ${EASE} both; }
        .vta-stagger > *:nth-child(1) { animation-delay: .02s; }
        .vta-stagger > *:nth-child(2) { animation-delay: .07s; }
        .vta-stagger > *:nth-child(3) { animation-delay: .12s; }
        .vta-stagger > *:nth-child(4) { animation-delay: .17s; }
        .vta-stagger > *:nth-child(5) { animation-delay: .22s; }

        .vta-signal {
          font-size: 12.5px; font-weight: 600; color: #3a3a3c;
          background: rgba(255,255,255,.8);
          border: 1px solid rgba(0,0,0,.1);
          padding: 6px 14px; border-radius: 999px;
          backdrop-filter: blur(4px);
          transition: background .18s ${EASE}, border-color .18s ${EASE}, transform .18s ${EASE};
        }
        .vta-signal:hover { background: #fff; border-color: ${BLUE}; color: ${BLUE}; transform: translateY(-1px); }

        @media (prefers-reduced-motion: reduce) {
          .vta-text-in, .vta-viz-in, .vta-stagger > * {
            animation: none !important; opacity: 1 !important; transform: none !important;
          }
        }

        @media (max-width: 800px) {
          .vta-right-col { display: none !important; }
          .vta-left-col  { width: 100% !important; max-width: 640px !important; }
        }
        @media (max-width: 520px) { .vta-main-body { padding: 0 22px !important; } }
      `}</style>

      <section ref={wrapRef} id="ai-alerts" aria-label="Prevent road incidents with AI-powered dashcam alerts" style={{ position: 'relative' }}>
        {/* Preload every slide image so each appears instantly */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none', top: 0, left: -9999 }}>
          {IMAGE_LIST.map(src => (
            <Image key={src} src={src} alt="" width={880} height={560} sizes={IMG_SIZES} loading="eager" onLoad={() => markLoaded(src)} />
          ))}
        </div>

        <div style={{
          position: 'sticky', top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #ffffff 0%, #f5f8fd 26%, #eef4fc 60%, #f6f9fd 84%, #ffffff 100%)',
          display: 'flex', flexDirection: 'column',
          isolation: 'isolate', zIndex: 1,
        }}>

          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 clamp(24px,5vw,64px)',
            height: '54px', flexShrink: 0,
            borderBottom: '1px solid rgba(0,0,0,.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '.1em', color: BLUE, textTransform: 'uppercase' }}>
                AI Dashcam Alerts
              </span>
              <div className="vta-strip" style={{ display: 'flex', gap: '5px', maxWidth: '210px' }}>
                {ALERTS.map((_, i) => (
                  <div key={i} style={{
                    width: i === displayIdx ? '16px' : '5px',
                    height: '5px', borderRadius: '999px', flexShrink: 0,
                    background: i <= displayIdx ? BLUE : 'rgba(15,23,42,.14)',
                    transition: `width .4s ${EASE}, background .4s ${EASE}`,
                  }} />
                ))}
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 700, color: '#a1a1a6', letterSpacing: '.04em', fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ color: BLUE, fontSize: '15px' }}>{alert.num}</span>
              <span style={{ margin: '0 4px' }}>/</span>
              {String(N).padStart(2, '0')}
            </div>
          </div>

          {/* Body */}
          <div className="vta-main-body" style={{
            flex: 1, minHeight: 0,
            display: 'flex', alignItems: 'center',
            padding: '0 clamp(24px,5vw,64px)',
            gap: 'clamp(28px,5vw,80px)',
          }}>
            {/* Left — text */}
            <div className="vta-left-col" style={{ flex: '0 0 auto', width: 'min(50%, 540px)', position: 'relative' }}>
              <div
                ref={numRef}
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '50%', left: '-10px',
                  transform: 'translateY(-58%)',
                  fontSize: 'clamp(100px,14vw,180px)', fontWeight: 900,
                  color: BLUE, opacity: .06, lineHeight: 1,
                  letterSpacing: '-.06em', userSelect: 'none',
                  pointerEvents: 'none', zIndex: 0, willChange: 'transform',
                }}
              >
                {alert.num}
              </div>

              <div key={displayIdx} className="vta-stagger" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  fontSize: '10.5px', fontWeight: 700, letterSpacing: '.08em',
                  color: BLUE, textTransform: 'uppercase', marginBottom: '14px',
                }}>
                  <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: BLUE, borderRadius: '2px' }} />
                  Prevent Road Incidents
                </div>

                <h2 style={{
                  margin: '0 0 18px',
                  fontSize: 'clamp(30px,3.8vw,52px)',
                  fontWeight: 800, lineHeight: 1.06,
                  letterSpacing: '-.03em', color: '#1d1d1f',
                }}>
                  {alert.title.split('\n').map((line, i) => (
                    <span key={i} style={{ display: 'block' }}>{line}</span>
                  ))}
                </h2>

                <div style={{ width: '44px', height: '3px', borderRadius: '2px', background: BLUE, marginBottom: '20px' }} />

                <p style={{
                  margin: '0 0 26px',
                  fontSize: 'clamp(13.5px,1.3vw,15.5px)',
                  lineHeight: 1.72, color: '#52525e', maxWidth: '48ch',
                }}>
                  {alert.desc}
                </p>

                <div>
                  <p style={{
                    margin: '0 0 10px',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '.09em', color: '#1d1d1f', textTransform: 'uppercase',
                  }}>
                    What LOCATOR does
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {alert.signals.map(s => (
                      <span key={s} className="vta-signal">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — image */}
            <div key={displayIdx} className="vta-viz-in vta-right-col" style={{ flex: 1, minWidth: 0 }}>
              <div ref={vizPxRef} style={{ willChange: 'transform' }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #e4e4e8',
                  boxShadow: '0 30px 70px -28px rgba(20,40,90,.24), 0 4px 14px rgba(20,40,90,.06)',
                  background: '#eef3fb',
                }}>
                  {!loaded[alert.image] && <div className="vta-skeleton" aria-hidden="true" />}
                  <Image
                    src={alert.image}
                    alt={`${alert.title.replace('\n', ' ')} — AI dashcam driver monitoring`}
                    width={alert.imageW}
                    height={alert.imageH}
                    sizes={IMG_SIZES}
                    onLoad={() => markLoaded(alert.image)}
                    style={{
                      width: '100%', height: 'auto', display: 'block',
                      opacity: loaded[alert.image] ? 1 : 0,
                      transition: 'opacity .4s ' + EASE,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Skip */}
          <button className="vta-skip" onClick={handleSkip} aria-label={dirDown ? 'Skip to next section' : 'Skip to previous section'}>
            Skip section
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points={dirDown ? '6 9 12 15 18 9' : '6 15 12 9 18 15'} />
            </svg>
          </button>

          {/* Progress */}
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

        {/* Snap anchors — one full viewport per alert */}
        <div className="vta-anchors" aria-hidden="true">
          {ALERTS.map((_, i) => (
            <div key={i} className="vta-anchor" />
          ))}
        </div>
      </section>
    </>
  )
}
