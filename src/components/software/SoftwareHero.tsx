'use client'
// Pinned hero: the mobile device fan shows first, then cross-fades in place to
// the web dashboard view as the user scrolls (smooth, scroll-driven) — mirroring
// the Locator-websites hero. Fully responsive; mobile shows a single device each.
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const PHONES = [
  { src: '/hero/mobile-graphical-report.png', alt: 'Locator app — graphical report', cls: 'sw-ph-2' },
  { src: '/hero/mobile-notifications.png',    alt: 'Locator app — notifications',     cls: 'sw-ph-1' },
  { src: '/hero/mobile-dashboard.png',        alt: 'Locator app — live dashboard',    cls: 'sw-ph-0' },
  { src: '/hero/mobile-summary.png',          alt: 'Locator app — vehicle summary',   cls: 'sw-ph-1 sw-ph-r' },
  { src: '/hero/mobile-map-view.png',         alt: 'Locator app — live map view',     cls: 'sw-ph-2 sw-ph-r' },
]

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b)

export default function SoftwareHero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const webRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const mob = mobileRef.current
    const web = webRef.current
    if (!wrap || !mob || !web) return

    let raf = 0
    const apply = () => {
      raf = 0
      const dist = wrap.offsetHeight - window.innerHeight
      const scrolled = clamp(-wrap.getBoundingClientRect().top, 0, dist || 1)
      const p = dist > 0 ? scrolled / dist : 0

      // Mirrored cross-fade over p∈[0.2, 0.6] so the two layers' opacities always
      // sum to ~1 — a clean swap with no blank moment in the middle.
      const t = clamp((p - 0.2) / 0.4)
      const mOp = 1 - t
      mob.style.opacity = String(mOp)
      mob.style.transform = `translateY(${-t * 34}px) scale(${1 - t * 0.06})`
      mob.style.pointerEvents = mOp < 0.5 ? 'none' : 'auto'

      const wOp = t
      web.style.opacity = String(wOp)
      web.style.transform = `translateY(${(1 - wOp) * 44}px) scale(${0.94 + wOp * 0.06})`
      web.style.pointerEvents = wOp > 0.5 ? 'auto' : 'none'
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
        @keyframes heroRise { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:none; } }
        @keyframes swGlow { 0%,100% { opacity:.55; } 50% { opacity:.9; } }

        /* Tall wrapper provides the scroll distance for the transition */
        .sw-pin-wrap { position: relative; height: 185vh; background: #ffffff; }

        .sw-pin {
          position: sticky; top: 0;
          height: 100svh;
          display: flex; flex-direction: column;
          overflow: hidden; isolation: isolate;
          background: #ffffff;
        }

        .sw-hero-body {
          flex: 1 1 auto; min-height: 0;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(10px, 1.6vh, 24px);
          padding: clamp(10px, 2vh, 30px) 24px clamp(16px, 3vh, 40px);
        }
        .sw-copy { text-align: center; max-width: 1120px; width: 100%; }
        @media (prefers-reduced-motion: no-preference) {
          .sw-copy { animation: heroRise .9s cubic-bezier(.22,.61,.36,1) .05s both; }
        }

        .sw-btn {
          font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
          padding: 12px 24px; border-radius: 999px; border: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; text-decoration: none;
        }
        .sw-btn-primary { background: #1360ee; color: #fff; }
        .sw-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); }
        .sw-btn-ghost { background: transparent; color: #1360ee; padding: 12px 6px; }
        .sw-btn-ghost:hover { color: #0d4fd4; transform: translateY(-1px); }

        /* ── Stage holds both cross-fading layers ── */
        .sw-stage {
          position: relative; flex: 1 1 auto; min-height: 0;
          width: 100%; max-width: 1240px; margin: 0 auto;
        }
        .sw-glow {
          position: absolute; left: 50%; bottom: 6%; width: min(74%, 840px); height: 60%;
          transform: translateX(-50%);
          background: radial-gradient(60% 60% at 50% 60%, rgba(19,96,238,.18), transparent 72%);
          filter: blur(26px); z-index: 0;
        }
        @media (prefers-reduced-motion: no-preference) { .sw-glow { animation: swGlow 7s ease-in-out infinite; } }

        .sw-layer {
          position: absolute; inset: 0; z-index: 1;
          display: flex; justify-content: center;
          will-change: opacity, transform;
        }
        /* no per-layer padding → max-height:100% caps exactly to the stage,
           so a device can never grow up over the copy */
        .sw-layer-mobile { align-items: flex-end; }
        .sw-layer-web { align-items: flex-end; }

        /* ── Mobile device fan ── */
        .sw-phone {
          position: relative; height: clamp(260px, 50vh, 540px);
          max-height: 100%;                 /* never taller than the stage → never covers the copy */
          aspect-ratio: 466 / 1000; width: auto; flex: 0 0 auto;
          border-radius: 14% / 6.6%;
          filter: drop-shadow(0 26px 42px rgba(20,40,90,.22));
          transform-origin: bottom center;
        }
        .sw-phone img { object-fit: contain; }
        .sw-ph-0 { z-index: 5; margin: 0 -2.5%; }
        .sw-ph-1 { z-index: 4; transform: rotate(-8deg)  scale(.88); margin: 0 -2.5%; }
        .sw-ph-2 { z-index: 3; transform: rotate(-16deg) scale(.74); margin: 0 -2.5%; }
        .sw-ph-1.sw-ph-r { transform: rotate(8deg)  scale(.88); }
        .sw-ph-2.sw-ph-r { transform: rotate(16deg) scale(.74); }

        /* ── Web browser fan ── */
        .sw-web-fan { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; }
        .sw-wb {
          position: relative; aspect-ratio: 1092 / 1000; flex: 0 0 auto;
          border-radius: 12px; overflow: hidden; background: #fff;
          border: 1px solid #e7ebf3;
          box-shadow: 0 36px 70px -34px rgba(20,40,90,.42), 0 2px 8px rgba(20,40,90,.08);
        }
        .sw-wb img { object-fit: cover; }
        /* sized by HEIGHT (capped to the stage) so the browser fan also can't
           overflow upward into the headline */
        .sw-wb-c { height: clamp(220px, 44vh, 480px); max-height: 100%; width: auto; z-index: 3; }
        .sw-wb-l { height: clamp(180px, 35vh, 390px); max-height: 88%; width: auto; z-index: 2; margin-right: -7%; transform: translateY(4%) rotate(-2.5deg); }
        .sw-wb-r { height: clamp(180px, 35vh, 390px); max-height: 88%; width: auto; z-index: 2; margin-left: -7%;  transform: translateY(4%) rotate(2.5deg); }

        @media (max-width: 820px) {
          .sw-ph-2 { display: none; }
          .sw-ph-1 { transform: rotate(-9deg) scale(.85); margin: 0 -5%; }
          .sw-ph-1.sw-ph-r { transform: rotate(9deg) scale(.85); }
          .sw-wb-l, .sw-wb-r { display: none; }
          .sw-wb-c { height: auto; width: min(92vw, 540px); }
        }
        @media (max-width: 520px) {
          .sw-ph-1, .sw-ph-2 { display: none; }
          .sw-ph-0 { margin: 0; }
        }
      `}</style>

      <div className="sw-pin-wrap" ref={wrapRef}>
        <div className="sw-pin">
          <SoftwareNavbar />

          <div className="sw-hero-body">
            <div className="sw-copy">
              <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.01em', color: '#1360ee', marginBottom: 'clamp(8px,1.4vh,14px)' }}>
                Locator Fleet Telematics
              </p>
              <h1 style={{ fontSize: 'clamp(26px, 3.4vw, 46px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-.025em', color: '#1d1d1f', maxWidth: '20ch', margin: '0 auto' }}>
                One Platform for Complete Fleet Visibility
              </h1>
              <p style={{ maxWidth: '560px', margin: 'clamp(8px,1.4vh,14px) auto 0', fontSize: 'clamp(13px, 1.35vw, 16px)', lineHeight: 1.5, color: '#3a3a3c' }}>
                GPS tracking, telematics, tasks, expenses, inspections, maintenance and AI dashcams for your whole fleet, on web and mobile.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: 'clamp(14px, 2.2vh, 24px)', flexWrap: 'wrap' }}>
                <button className="sw-btn sw-btn-primary">Get a quote</button>
                <button className="sw-btn sw-btn-ghost">Get a demo →</button>
              </div>
              <p style={{ marginTop: 'clamp(8px,1.4vh,14px)' }}>
                <Link href="#dashcam" style={{ color: '#1360ee', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
                  Watch how it works ›
                </Link>
              </p>
            </div>

            <div className="sw-stage">
              <div className="sw-glow" aria-hidden="true" />

              {/* Layer 1 — mobile fan (default) */}
              <div className="sw-layer sw-layer-mobile" ref={mobileRef}>
                {PHONES.map((p, i) => (
                  <div key={p.src} className={`sw-phone ${p.cls}`}>
                    <Image src={p.src} alt={p.alt} fill sizes="(max-width: 520px) 72vw, (max-width: 820px) 42vw, 24vw" priority={i === 2} />
                  </div>
                ))}
              </div>

              {/* Layer 2 — web browser fan (revealed on scroll) */}
              <div className="sw-layer sw-layer-web" ref={webRef} style={{ opacity: 0 }}>
                <div className="sw-web-fan">
                  <div className="sw-wb sw-wb-l">
                    <Image src="/hero/web-graphical-report.png" alt="Locator web — graphical reports" fill sizes="(max-width: 820px) 0px, 30vw" />
                  </div>
                  <div className="sw-wb sw-wb-c">
                    <Image src="/hero/web-live-map.png" alt="Locator web — live fleet map with alerts" fill sizes="(max-width: 820px) 92vw, 42vw" />
                  </div>
                  <div className="sw-wb sw-wb-r">
                    <Image src="/hero/web-route-playback.png" alt="Locator web — route playback" fill sizes="(max-width: 820px) 0px, 30vw" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
