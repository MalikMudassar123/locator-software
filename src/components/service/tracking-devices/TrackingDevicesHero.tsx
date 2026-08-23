import Link from 'next/link'
import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function TrackingDevicesHero() {
  return (
    <>
      <style>{`
        /*
         * Hero layout mirrors SmartIotHero exactly:
         *   - section: position:relative, flex column, explicit min-height
         *   - .td-photo: position:absolute; inset:0  → true full-bleed bg
         *   - .td-scrim: inset:0 gradient → text legibility
         *   - .td-navwrap z-index:3 / .td-body z-index:2 / .td-photo z-index:0
         *
         * Image is landscape (~16:5). Using object-position: left top so the
         * important top-left of the image is never cropped. Only the far
         * bottom-right gets trimmed on short viewports — that area is empty
         * studio floor, so the trim is invisible.
         */
        .td-hero {
          position: relative;
          overflow: hidden;
          /* #dde8f0 matches the image's own pale blue-grey studio background
             so if contain leaves any edge gap it's completely invisible */
          background: #dde8f0;
          display: flex;
          flex-direction: column;
          /* Drive height from viewport width at the image's own ~3:1 ratio.
             This means the section is always exactly as tall as the image
             at full width — no zoom, no crop, ever. */
          min-height: clamp(480px, 34vw, 660px);
        }

        .td-photo { position: absolute; inset: 0; z-index: 0; }
        .td-photo img {
          object-fit: contain;
          object-position: center;
          filter: saturate(0.95) contrast(1.02);
        }

        /* Subtle glass/whitening scrim so the background stays visible without overpowering text */
        .td-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(90deg,
            rgba(255,255,255,.72) 0%,
            rgba(255,255,255,.48) 28%,
            rgba(255,255,255,.18) 52%,
            rgba(255,255,255,0)   72%
          );
        }

        .td-navwrap { position: relative; z-index: 3; }

        .td-body {
          position: relative; z-index: 2; flex: 1;
          display: flex; align-items: center;
          padding: clamp(20px,3vw,36px) 28px clamp(40px,5vw,60px);
        }
        .td-inner { max-width: var(--w-1280); width: 100%; margin: 0 auto; }
        /* Content column — same width as SmartIotHero's .si-content */
        .td-content { max-width: min(560px, 100%); }

        @keyframes tdRise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .td-anim { opacity: 0; animation: tdRise .8s ${EASE} forwards; } }

        /* Back breadcrumb */
        .td-back {
          display: inline-flex; align-items: center; gap: 6px; margin-bottom: 20px;
          color: #5a6478; font-size: var(--f-13); font-weight: 600;
          text-decoration: none; transition: color .18s ease, gap .18s ease;
        }
        .td-back:hover { color: #1360ee; gap: 9px; }

        /* Eyebrow */
        .td-eyebrow {
          display: block;
          font-size: max(clamp(22px,2.8vw,32px), min(2.222vw, 46.4px));
          font-weight: 800; letter-spacing: .04em;
          color: #1360ee; text-transform: uppercase; margin-bottom: 16px;
        }
        .td-eyebrow-bar {
          display: block; width: 34px; height: 3px;
          background: #1360ee; border-radius: 2px; margin-bottom: 12px;
        }

        /* Heading — dark text, image is light */
        .td-h1 {
          margin: 0;
          font-size: clamp(28px, calc(2.5vw + 16px), 46px);
          font-weight: 800; line-height: 1.14; letter-spacing: -.024em;
          color: #0b1220;
        }
        .td-h1 em { font-style: normal; color: #1360ee; }

        /* Lead */
        .td-lead {
          margin: clamp(14px,1.6vw,18px) 0 0; max-width: 48ch;
          font-size: clamp(15px, 1.05vw, 17px);
          line-height: 1.72; color: #3a4459;
        }

        /* CTAs */
        .td-cta-row { display: flex; gap: 14px; margin-top: clamp(22px,2.6vw,32px); flex-wrap: wrap; }
        .td-btn {
          font-family: inherit; font-size: var(--f-14); font-weight: 700; cursor: pointer;
          padding: 14px 24px; border-radius: 11px; border: 1.5px solid transparent;
          transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 9px; text-decoration: none;
        }
        .td-btn svg { transition: transform .18s ${EASE}; flex-shrink: 0; }
        .td-btn:hover svg { transform: translateX(3px); }
        .td-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.28); }
        .td-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 30px rgba(19,96,238,.4); }
        .td-btn-ghost {
          background: rgba(255,255,255,.78); color: #0b1220;
          border-color: rgba(19,96,238,.25);
          -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
        }
        .td-btn-ghost:hover { border-color: #1360ee; color: #1360ee; transform: translateY(-1px); background: rgba(255,255,255,.92); }

        /* Tablet */
        @media (max-width: 1024px) {
          .td-scrim { background: linear-gradient(90deg,
            rgba(255,255,255,.92) 0%,
            rgba(255,255,255,.80) 34%,
            rgba(255,255,255,.18) 62%,
            rgba(255,255,255,0)   78%
          ); }
          .td-content { max-width: min(480px, 100%); }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .td-hero { min-height: clamp(360px, 50vw, 480px); }
          .td-body { padding-bottom: clamp(44px,9vw,60px); }
          .td-scrim { background: linear-gradient(90deg,
            rgba(255,255,255,.96) 0%,
            rgba(255,255,255,.90) 48%,
            rgba(255,255,255,.38) 80%,
            rgba(255,255,255,0)  100%
          ); }
          .td-content { max-width: 100%; }
          .td-btn { padding: 13px 20px; }
        }

        @media (max-width: 420px) {
          .td-h1 { font-size: clamp(24px, 7.2vw, 30px); }
          .td-cta-row { flex-direction: column; }
          .td-btn { justify-content: center; }
        }

        /* Keep the stat row visually part of the hero image instead of a detached gray block */
        .td-stats-band {
          background: transparent;
          border-top: none;
        }
        .td-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          max-width: var(--w-1280); margin: 0 auto; padding: 0 28px 18px;
          background: transparent;
        }
        @media (max-width: 700px) { .td-stats { grid-template-columns: 1fr; } }
        .td-stat {
          padding: clamp(24px,3vw,34px) clamp(20px,2.4vw,32px);
          border-left: 1px solid rgba(18, 35, 58, 0.06);
          background: rgba(255,255,255,0.08);
        }
        .td-stat:first-child { border-left: none; padding-left: 0; }
        @media (max-width: 700px) {
          .td-stat { border-left: none; border-top: 1px solid rgba(18, 35, 58, 0.06); padding-left: 0; }
          .td-stat:first-child { border-top: none; }
        }
        .td-stat-n { font-size: max(clamp(26px,3vw,38px), min(2.639vw,55.1px)); font-weight: 800; letter-spacing: -.03em; color: #1d1d1f; line-height: 1; }
        .td-stat-l { margin-top: 10px; font-size: var(--f-13); line-height: 1.5; color: #6e6e73; font-weight: 600; max-width: 26ch; }
      `}</style>

      <section className="td-hero">

        {/* Full-bleed background — positioned to show complete view */}
        <div className="td-photo" aria-hidden="true">
          <Image
            src="/service_page/devices second banner.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="td-scrim" aria-hidden="true" />

        {/* Navbar — on top of everything */}
        <div className="td-navwrap">
          <SoftwareNavbar />
        </div>

        {/* Copy — left-aligned, same structure as SmartIotHero */}
        <div className="td-body">
          <div className="td-inner">
            <div className="td-content">

              <Link href="/service" className="td-back td-anim" style={{ animationDelay: '0s' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Services
              </Link>

              <span className="td-eyebrow td-anim" style={{ animationDelay: '.04s' }}>
                <span className="td-eyebrow-bar" />
                GPS Tracking Devices
              </span>

              <h1 className="td-h1 td-anim" style={{ animationDelay: '.1s' }}>
                The hardware behind<br />
                every <em>Locator</em> install.
              </h1>

              <p className="td-lead td-anim" style={{ animationDelay: '.18s' }}>
                A great platform always needs great hardware. Certified GPS terminals, driver-ID readers, and sensors — supplied, installed, and configured by our own engineers.
              </p>

              <div className="td-cta-row td-anim" style={{ animationDelay: '.26s' }}>
                <Link href="/contact" className="td-btn td-btn-primary">
                  Request device pricing
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link href="/contact" className="td-btn td-btn-ghost">
                  Talk to an engineer
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  )
}
