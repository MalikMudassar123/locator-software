import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

/**
 * The opening. Two columns rather than the centred stack the rest of the service
 * pages use: this page has a product to show, and a live-map panel beside the
 * headline says what the product is faster than another paragraph would.
 *
 * The panel is drawn, not photographed. A screenshot at this size is unreadable
 * and dates the moment the UI changes; a diagram of the same idea stays legible
 * at any width and weighs nothing.
 */
export default function CarTrackingHero() {
  return (
    <>
      <style>{`
        .cts-hero {
          position: relative; overflow: hidden; background: #fff;
          padding: clamp(16px,2vw,28px) 28px clamp(56px,7vw,92px);
        }
        /* One soft wash of brand blue behind the panel side, so the white page
           has a light source rather than a coloured block. */
        .cts-hero::before {
          content: ''; position: absolute; z-index: 0; pointer-events: none;
          width: min(860px, 78vw); height: min(680px, 62vw);
          top: -18%; right: -14%;
          background: radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.13), transparent 70%);
        }
        .cts-hero::after {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle at 1px 1px, rgba(15,17,23,.09) 1px, transparent 0);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(ellipse 62% 58% at 22% 8%, #000 0%, transparent 74%);
          mask-image: radial-gradient(ellipse 62% 58% at 22% 8%, #000 0%, transparent 74%);
        }

        .cts-hero-inner {
          position: relative; z-index: 1;
          max-width: var(--w-1180); margin: 0 auto;
          padding-top: clamp(24px,4vw,48px);
          display: grid; grid-template-columns: 1.02fr .98fr;
          gap: clamp(32px,5vw,72px); align-items: center;
        }
        @media (max-width: 940px) {
          .cts-hero-inner { grid-template-columns: 1fr; gap: clamp(38px,6vw,52px); }
        }

        @keyframes ctsRise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) {
          .cts-anim { opacity: 0; animation: ctsRise .8s ${EASE} var(--d, 0ms) forwards; }
        }

        .cts-crumb {
          display: flex; align-items: center; gap: 9px; flex-wrap: wrap;
          font-size: var(--f-13); font-weight: 500; color: #9aa1ad;
          margin-bottom: clamp(20px,3vw,30px);
        }
        .cts-crumb a { color: #6e6e73; text-decoration: none; transition: color .2s ${EASE}; }
        .cts-crumb a:hover { color: #0a89dd; }
        .cts-crumb span[aria-current] { color: #1d1d1f; font-weight: 600; }

        .cts-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: var(--f-12); font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #0a89dd; margin-bottom: 20px;
        }
        .cts-eyebrow::before { content: ''; width: 30px; height: 2px; background: #0a89dd; border-radius: 2px; }

        .cts-title {
          margin: 0; max-width: 17ch;
          font-size: max(clamp(34px,5vw,60px), min(4.167vw, 87px)); font-weight: 800;
          line-height: 1.05; letter-spacing: -.034em; color: #1d1d1f;
        }
        .cts-title em { font-style: normal; color: #1360ee; }

        .cts-lead {
          margin: clamp(20px,2.6vw,26px) 0 0; max-width: 52ch;
          font-size: max(clamp(15.5px,1.5vw,18px), min(1.250vw, 26.1px)); line-height: 1.7; color: #6e6e73;
        }

        .cts-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: clamp(28px,3.6vw,38px); }
        .cts-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 26px; border-radius: 999px; text-decoration: none;
          font-size: var(--f-14-5); font-weight: 700; letter-spacing: .01em;
          transition: transform .28s ${EASE}, box-shadow .28s ${EASE}, border-color .28s ${EASE}, color .28s ${EASE};
        }
        .cts-btn svg { width: 16px; height: 16px; }
        .cts-btn--primary {
          background: #1360ee; color: #fff;
          box-shadow: 0 12px 26px -10px rgba(19,96,238,.68);
        }
        .cts-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 20px 38px -12px rgba(19,96,238,.72); }
        .cts-btn--ghost { background: #fff; color: #1d1d1f; border: 1px solid #e2e8f2; }
        .cts-btn--ghost:hover { transform: translateY(-2px); border-color: #1360ee; color: #1360ee; box-shadow: 0 14px 28px -16px rgba(20,40,90,.4); }

        /* Trust strip — three plain facts under the buttons. Cheaper and more
           credible than a row of logos, and it fills the column's last line
           instead of leaving the buttons floating on white. */
        .cts-trust {
          display: flex; flex-wrap: wrap; gap: clamp(14px,2.4vw,30px);
          margin: clamp(30px,4vw,42px) 0 0; padding-top: clamp(20px,2.6vw,26px);
          border-top: 1px solid #eef1f7; list-style: none;
        }
        .cts-trust li {
          display: flex; align-items: center; gap: 8px;
          font-size: var(--f-13); font-weight: 600; color: #6e6e73;
        }
        .cts-trust svg { width: 15px; height: 15px; color: #1fbf5b; flex-shrink: 0; }

        /* ── Panel ───────────────────────────────────────────────────────────── */
        .cts-panel {
          position: relative; border-radius: 20px; background: #fff;
          border: 1px solid #e7ebf3; overflow: hidden;
          box-shadow: 0 40px 80px -40px rgba(20,40,90,.44), 0 2px 8px rgba(20,40,90,.06);
        }
        .cts-panel-bar {
          display: flex; align-items: center; gap: 6px;
          padding: 11px 15px; border-bottom: 1px solid #eef1f7;
        }
        .cts-panel-bar b {
          font-size: var(--f-11); color: #6e6e73; font-weight: 600; margin-left: 8px;
        }
        .cts-panel-map {
          position: relative; height: clamp(240px,30vw,320px);
          background: linear-gradient(150deg,#e6eefa,#f2f7fd);
        }
        .cts-road { stroke: #fff; stroke-linecap: round; }
        /* The tracked car. Draws its own trail, then the marker rides it — the
           dash offset and the motion path run on one duration so the dot always
           sits at the head of the line it has drawn. */
        @keyframes ctsTrail { from { stroke-dashoffset: 320; } to { stroke-dashoffset: 0; } }
        @keyframes ctsPing { 0% { r: 5; opacity: .55; } 100% { r: 15; opacity: 0; } }
        @media (prefers-reduced-motion: no-preference) {
          .cts-trail { stroke-dasharray: 320; animation: ctsTrail 4.6s ${EASE} infinite alternate; }
          .cts-ping { animation: ctsPing 2.1s ${EASE} infinite; }
        }

        .cts-chip {
          position: absolute; display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.94); backdrop-filter: blur(8px);
          border: 1px solid rgba(20,40,90,.07); border-radius: 12px;
          padding: 9px 12px; box-shadow: 0 10px 26px -14px rgba(20,40,90,.55);
        }
        .cts-chip b { display: block; font-size: var(--f-11-5); font-weight: 700; color: #1d1d1f; line-height: 1.3; }
        .cts-chip span { display: block; font-size: var(--f-10); color: #6e6e73; line-height: 1.4; }
        .cts-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        .cts-panel-foot {
          display: grid; grid-template-columns: repeat(4,1fr);
          border-top: 1px solid #eef1f7;
        }
        .cts-panel-foot div { padding: 12px 8px; text-align: center; }
        .cts-panel-foot div + div { border-left: 1px solid #f2f4f9; }
        .cts-panel-foot b { display: block; font-size: var(--f-16); font-weight: 800; letter-spacing: -.02em; }
        .cts-panel-foot span { display: block; font-size: var(--f-10); color: #6e6e73; font-weight: 600; margin-top: 2px; }

        @media (max-width: 520px) {
          .cts-actions .cts-btn { flex: 1 1 100%; justify-content: center; }
        }
      `}</style>

      <section className="cts-hero">
        <SoftwareNavbar />

        <div className="cts-hero-inner">
          {/* ── Copy ── */}
          <div>
            <nav className="cts-crumb cts-anim" style={{ '--d': '0ms' } as React.CSSProperties} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/service/fleet-telematics">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Car Tracking System</span>
            </nav>

            <p className="cts-eyebrow cts-anim" style={{ '--d': '70ms' } as React.CSSProperties}>
              Car tracking · United Arab Emirates
            </p>

            <h1 className="cts-title cts-anim" style={{ '--d': '140ms' } as React.CSSProperties}>
              Unrestricted access to your <em>car tracking system</em>
            </h1>

            <p className="cts-lead cts-anim" style={{ '--d': '210ms' } as React.CSSProperties}>
              Be in control of every vehicle you own. LOCATOR puts your whole fleet on one live
              map — wherever it is working, and whatever it is working on.
            </p>

            <div className="cts-actions cts-anim" style={{ '--d': '280ms' } as React.CSSProperties}>
              <Link href="/get-a-quote" className="cts-btn cts-btn--primary">
                Get a free quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/get-a-free-demo" className="cts-btn cts-btn--ghost">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" />
                </svg>
                Get a free demo
              </Link>
            </div>

            <ul className="cts-trust cts-anim" style={{ '--d': '350ms' } as React.CSSProperties}>
              {['No long-term lock-in', 'Installed across the UAE', '24/7 local support'].map(t => (
                <li key={t}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Live map panel ── */}
          <div className="cts-panel cts-anim" style={{ '--d': '260ms' } as React.CSSProperties} aria-hidden="true">
            <div className="cts-panel-bar">
              {(['#ff5f57', '#febc2e', '#28c840'] as const).map(c => (
                <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
              ))}
              <b>locator.ae — live fleet map</b>
            </div>

            <div className="cts-panel-map">
              <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                {[22, 44, 66, 86].map(p => (
                  <line key={`h${p}`} className="cts-road" x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} strokeWidth="8" />
                ))}
                {[20, 46, 72].map(p => (
                  <line key={`v${p}`} className="cts-road" x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" strokeWidth="6" />
                ))}
              </svg>

              <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                <path
                  className="cts-trail"
                  d="M40 250 L110 250 L110 140 L200 140 L200 70 L330 70"
                  fill="none" stroke="#1360ee" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" opacity=".85"
                />
                <circle className="cts-ping" cx="330" cy="70" r="5" fill="none" stroke="#1360ee" strokeWidth="2" />
              </svg>

              <div className="cts-chip" style={{ left: '8%', top: '12%' }}>
                <span className="cts-dot" style={{ background: '#1fbf5b' }} />
                <div>
                  <b>VAN-204 · 62 km/h</b>
                  <span>Jebel Ali, Dubai · moving</span>
                </div>
              </div>
              <div className="cts-chip" style={{ right: '7%', bottom: '11%' }}>
                <span className="cts-dot" style={{ background: '#ff9f0a' }} />
                <div>
                  <b>TRK-118 · idle 14 min</b>
                  <span>Engine on · alert sent</span>
                </div>
              </div>
            </div>

            <div className="cts-panel-foot">
              {[
                { v: '32', l: 'Active', c: '#1fbf5b' },
                { v: '8', l: 'Idle', c: '#ff9f0a' },
                { v: '6', l: 'Stopped', c: '#6e6e73' },
                { v: '1', l: 'Offline', c: '#ff5f57' },
              ].map(x => (
                <div key={x.l}>
                  <b style={{ color: x.c }}>{x.v}</b>
                  <span>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
