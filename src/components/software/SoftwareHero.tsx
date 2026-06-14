// Server component — same Navbar as landing page, CSS-only animations
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function SoftwareHero() {
  return (
    <>
      <style>{`
        @keyframes heroRise {
          from { opacity:0; transform:translateY(46px) scale(.965); }
          to   { opacity:1; transform:none; }
        }
        @keyframes glowPulse {
          0%,100% { opacity:.7; }
          50%      { opacity:1; }
        }
        @keyframes loopFadeA {
          0%,40%  { opacity:1; }
          48%,92% { opacity:0; }
          100%    { opacity:1; }
        }
        @keyframes loopFadeB {
          0%,40%  { opacity:0; }
          48%,92% { opacity:1; }
          100%    { opacity:0; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .sw-hero-shot  { animation: heroRise 1.15s cubic-bezier(.22,.61,.36,1) .15s both; }
          .sw-hero-glow  { animation: glowPulse 6s ease-in-out 1.3s infinite; }
          .sw-loop-a     { animation: loopFadeA 9s ease-in-out infinite; }
          .sw-loop-b     { animation: loopFadeB 9s ease-in-out infinite; }
        }

        .sw-btn {
          font-family: inherit; font-size: 14px; font-weight: 700;
          cursor: pointer; padding: 12px 22px; border-radius: 999px; border: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          display: inline-flex; align-items: center; gap: 7px; white-space: nowrap;
        }
        .sw-btn-primary { background: #ffffff; color: #1360ee; }
        .sw-btn-primary:hover { background: #f0f4ff; transform: translateY(-1px); }
        .sw-btn-ghost {
          background: rgba(255,255,255,.14); color: #ffffff;
          border: 1px solid rgba(255,255,255,.32);
          backdrop-filter: blur(8px);
        }
        .sw-btn-ghost:hover { background: rgba(255,255,255,.22); transform: translateY(-1px); }
      `}</style>

      <section
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          isolation: 'isolate',
          /* Same teal→blue gradient as the site footer */
          background: 'linear-gradient(180deg, #97def1 0%, #3abede 22%, #0a84e3 55%, #1360ee 82%, #062a8a 100%)',
          paddingBottom: '0',
        }}
      >
        {/* === Landing-page gradient layers (exact match) === */}
        {/* L1 — right-side lightening */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.08) 100%)' }} />
        {/* L1a — top-right #6d99e4 zone */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(34% 28% at 96% 6%, rgba(109,153,228,0.7) 0%, rgba(109,153,228,0.35) 40%, rgba(109,153,228,0.1) 70%, rgba(109,153,228,0) 90%)' }} />
        {/* L1b — upper-mid right */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(28% 22% at 82% 20%, rgba(49,131,228,0.45) 0%, rgba(49,131,228,0.18) 50%, rgba(49,131,228,0) 88%)' }} />
        {/* L2 — mid-right pale highlight */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(32% 38% at 94% 42%, rgba(209,216,221,0.7) 0%, rgba(151,222,241,0.4) 40%, rgba(151,222,241,0.14) 70%, rgba(151,222,241,0) 92%)' }} />
        {/* L2b — pale bottom-left wash */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(40% 30% at 6% 96%, rgba(194,209,221,0.55) 0%, rgba(100,174,221,0.28) 45%, rgba(100,174,221,0) 85%)' }} />
        {/* L2c — bottom-right cyan */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(32% 26% at 96% 96%, rgba(121,223,250,0.6) 0%, rgba(121,223,250,0.28) 45%, rgba(121,223,250,0.08) 75%, rgba(121,223,250,0) 92%)' }} />

        {/* Navbar — same component as landing page */}
        <div style={{ position: 'relative', zIndex: 50 }}>
          <Navbar />
        </div>

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: 'clamp(40px,5vw,72px) 28px 0',
            maxWidth: '1120px',
            margin: '0 auto',
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <span style={{ display: 'inline-block', width: '24px', height: '1.5px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />
            Locator Fleet Telematics
            <span style={{ display: 'inline-block', width: '24px', height: '1.5px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />
          </p>

          {/* H1 */}
          <h1
            style={{
              fontSize: 'clamp(28px,4.4vw,52px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-.025em',
              color: '#ffffff',
              maxWidth: '22ch',
              margin: '0 auto',
            }}
          >
            One Platform for Complete Fleet Visibility
          </h1>

          {/* Sub */}
          <p
            style={{
              maxWidth: '560px',
              margin: '18px auto 0',
              fontSize: 'clamp(14px,1.45vw,16px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.82)',
              fontWeight: 400,
            }}
          >
            GPS tracking, telematics, tasks, expenses, inspections, maintenance and AI dashcams for your whole fleet, on web and mobile.
          </p>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
            <button className="sw-btn sw-btn-primary">Get a quote</button>
            <button className="sw-btn sw-btn-ghost">Get a demo →</button>
          </div>

          {/* Watch link */}
          <p style={{ marginTop: '22px' }}>
            <Link
              href="#dashcam"
              style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              Watch how it works ›
            </Link>
          </p>

          {/* Looping image showcase */}
          <div
            className="sw-hero-shot"
            style={{ position: 'relative', margin: '52px auto 0', maxWidth: '860px', padding: '0 12px' }}
          >
            {/* Blue glow behind images */}
            <div
              className="sw-hero-glow"
              aria-hidden="true"
              style={{
                position: 'absolute', left: '50%', top: '18%', width: '78%', height: '80%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,.12), transparent 70%)',
                filter: 'blur(10px)', zIndex: 0,
              }}
            />

            {/* Loop shot */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '1800 / 1399',
                maxWidth: '707px',
                margin: '0 auto',
              }}
            >
              <Image
                className="sw-loop-a"
                src="/app-hero.png"
                alt="Locator app — graphical report, live dashboard and vehicle summary screens"
                fill
                style={{
                  objectFit: 'contain', zIndex: 1,
                  filter: 'drop-shadow(0 36px 60px rgba(20,40,90,.28))',
                  position: 'absolute',
                }}
                priority
              />
              <Image
                className="sw-loop-b"
                src="/live-showcase.png"
                alt="Locator live tracking dashboard — fleet map with vehicle status"
                fill
                style={{
                  objectFit: 'contain', zIndex: 1,
                  filter: 'drop-shadow(0 36px 60px rgba(20,40,90,.28))',
                  position: 'absolute',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
