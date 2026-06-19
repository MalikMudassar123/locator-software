// Server component — same Navbar as landing page, CSS-only animations
import Image from 'next/image'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

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
        .sw-btn-primary { background: #1360ee; color: #ffffff; }
        .sw-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); }
        .sw-btn-ghost {
          background: transparent; color: #1360ee;
          border: none; padding-left: 4px; padding-right: 4px;
        }
        .sw-btn-ghost:hover { color: #0d4fd4; transform: translateY(-1px); }
      `}</style>

      <section
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          isolation: 'isolate',
          background: '#ffffff',
          paddingBottom: '0',
        }}
      >

        <SoftwareNavbar />

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
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '.01em',
              color: '#1360ee',
              marginBottom: '16px',
            }}
          >
            Locator Fleet Telematics
          </p>

          {/* H1 */}
          <h1
            style={{
              fontSize: 'clamp(28px,4.4vw,52px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-.025em',
              color: '#1d1d1f',
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
              color: '#3a3a3c',
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
              style={{ color: '#1360ee', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
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
