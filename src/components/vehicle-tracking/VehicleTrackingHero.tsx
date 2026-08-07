import Image from 'next/image'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

/**
 * Four real client marks under the fold line. The reference put a logo strip
 * here and it is the right instinct — the first thing a fleet operator wants is
 * proof someone like them already bought this. These are pulled from the same
 * set the homepage marquee uses, so nothing is invented, and they are rendered
 * greyscale at rest so fourteen competing brand palettes cannot pull focus off
 * the headline.
 */
const PROOF = [
  { name: 'DB Schenker', src: '/client Logo/DB-SCHENKER.png' },
  { name: 'GMG', src: '/client Logo/GMG.png' },
  { name: 'Al Ghazal Transport', src: '/client Logo/al-ghazal-transport.png' },
  { name: 'Access Hire Middle East', src: '/client Logo/access-hire-middle-east-logo.png' },
]

/**
 * The opening.
 *
 * A wide isometric city panel sits opposite the headline — the reference used an
 * illustration of a tracked city, and the idea is right: it says "everything on
 * one map" before a single line of copy is read. Ours is drawn rather than a
 * stock raster, so it stays crisp at any width, weighs nothing, and can animate.
 */
export default function VehicleTrackingHero() {
  return (
    <>
      <style>{`
        .vth {
          position: relative; overflow: hidden; background: #fff;
          padding: clamp(16px,2vw,28px) 28px clamp(48px,6vw,80px);
        }
        .vth::before {
          content: ''; position: absolute; z-index: 0; pointer-events: none;
          width: min(900px,80vw); height: min(700px,64vw); top: -20%; right: -16%;
          background: radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.14), transparent 70%);
        }
        /* No dot-grid texture here. The illustration is already a detailed object
           and a pattern scattered behind it only competes with it — the soft wash
           above is the whole background treatment. */

        .vth-inner {
          position: relative; z-index: 1; max-width: var(--w-1180); margin: 0 auto;
          padding-top: clamp(24px,4vw,48px);
          display: grid; grid-template-columns: .94fr 1.06fr;
          gap: clamp(32px,5vw,68px); align-items: center;
        }
        @media (max-width: 960px) { .vth-inner { grid-template-columns: 1fr; gap: clamp(36px,6vw,48px); } }

        @keyframes vthRise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) {
          .vth-anim { opacity: 0; animation: vthRise .8s ${EASE} var(--d, 0ms) forwards; }
        }

        .vth-crumb {
          display: flex; align-items: center; gap: 9px; flex-wrap: wrap;
          font-size: var(--f-13); font-weight: 500; color: #9aa1ad; margin-bottom: clamp(20px,3vw,30px);
        }
        .vth-crumb a { color: #6e6e73; text-decoration: none; transition: color .2s ${EASE}; }
        .vth-crumb a:hover { color: #0a89dd; }
        .vth-crumb span[aria-current] { color: #1d1d1f; font-weight: 600; }

        .vth-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: var(--f-12); font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #0a89dd; margin: 0 0 20px;
        }
        .vth-eyebrow::before { content: ''; width: 30px; height: 2px; background: #0a89dd; border-radius: 2px; }

        .vth-title {
          margin: 0; max-width: 15ch;
          font-size: max(clamp(36px,5.2vw,64px), min(4.444vw, 92.8px)); font-weight: 800;
          line-height: 1.03; letter-spacing: -.036em; color: #1d1d1f;
        }
        .vth-title em { font-style: normal; color: #1360ee; }

        .vth-lead {
          margin: clamp(20px,2.6vw,26px) 0 0; max-width: 48ch;
          font-size: max(clamp(16px,1.55vw,19px), min(1.319vw, 27.55px)); line-height: 1.68; color: #6e6e73;
        }

        .vth-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: clamp(28px,3.6vw,38px); }
        .vth-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 28px; border-radius: 999px; text-decoration: none;
          font-size: var(--f-14-5); font-weight: 700; letter-spacing: .01em;
          transition: transform .28s ${EASE}, box-shadow .28s ${EASE}, border-color .28s ${EASE}, color .28s ${EASE};
        }
        .vth-btn svg { width: 16px; height: 16px; }
        .vth-btn--primary { background: #1360ee; color: #fff; box-shadow: 0 14px 28px -11px rgba(19,96,238,.7); }
        .vth-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 22px 40px -13px rgba(19,96,238,.74); }
        .vth-btn--ghost { background: #fff; color: #1d1d1f; border: 1px solid #e2e8f2; }
        .vth-btn--ghost:hover { transform: translateY(-2px); border-color: #1360ee; color: #1360ee; box-shadow: 0 14px 28px -16px rgba(20,40,90,.4); }
        @media (max-width: 520px) { .vth-actions .vth-btn { flex: 1 1 100%; justify-content: center; } }

        /* ── Proof strip ── */
        .vth-proof { margin: clamp(34px,4.4vw,48px) 0 0; padding-top: clamp(20px,2.6vw,26px); border-top: 1px solid #eef1f7; }
        .vth-proof-label {
          margin: 0 0 16px; font-size: var(--f-11-5); font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase; color: #a8b0be;
        }
        .vth-proof-row {
          display: flex; align-items: center; flex-wrap: wrap;
          gap: clamp(20px,3.4vw,40px);
        }
        .vth-proof-row img {
          height: clamp(26px,2.6vw,34px); width: auto; object-fit: contain;
          /* Greyscale at rest so the strip reads as one row rather than four
             competing brand palettes; colour returns on hover. */
          filter: grayscale(1); opacity: .5;
          transition: filter .3s ${EASE}, opacity .3s ${EASE};
        }
        .vth-proof-row img:hover { filter: none; opacity: 1; }

        /* ── Isometric city panel ── */
        /* Optically raised. The copy column is far taller than the artwork, so
           centring the row leaves the illustration sitting well below the
           headline it belongs to — it reads as having slipped down the page.
           Pulling it up aligns it with the title block instead of with the
           column's midpoint. Desktop only: once the layout stacks there is no
           second column to align against, and a negative margin would collide
           with the copy above it. */
        .vth-art { position: relative; }
        .vth-art svg { display: block; width: 100%; height: auto; overflow: visible; }
        @media (min-width: 961px) {
          .vth-art { margin-top: clamp(-96px, -6.5vw, -40px); }
        }

        /* Pins drop in, then hold a slow float. Each sets its own --d so the four
           land in sequence rather than together. */
        @keyframes vthDrop { 0% { opacity: 0; transform: translateY(-16px) scale(.7); } 60% { opacity: 1; } 100% { opacity: 1; transform: none; } }
        @keyframes vthFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @media (prefers-reduced-motion: no-preference) {
          .vth-pin { opacity: 0; transform-box: fill-box; transform-origin: 50% 100%;
            animation: vthDrop .7s ${EASE} var(--d,0ms) forwards, vthFloat 4.2s ease-in-out var(--fd,0ms) infinite; }
          .vth-dash { stroke-dasharray: 6 7; animation: vthDash 2.4s linear infinite; }
          @keyframes vthDash { to { stroke-dashoffset: -26; } }
        }

        /* 24%, not 40%: this is a percentage of the art box, and the box lost its
           empty top when the viewBox was tightened. 24% of the new box lands on
           the same point of the drawing that 40% of the old one did. */
        .vth-card {
          position: absolute; left: 4%; top: 24%;
          display: flex; align-items: center; gap: 11px;
          background: #fff; border: 1px solid #e7ebf3; border-radius: 14px;
          padding: 11px 15px; box-shadow: 0 20px 40px -20px rgba(20,40,90,.5);
        }
        .vth-card b { display: block; font-size: var(--f-12); font-weight: 800; color: #1d1d1f; line-height: 1.3; }
        .vth-card span { display: block; font-size: var(--f-10-5); color: #6e6e73; margin-top: 2px; }
        .vth-card i {
          width: 8px; height: 8px; border-radius: 50%; background: #1fbf5b; flex-shrink: 0;
          box-shadow: 0 0 0 4px rgba(31,191,91,.18);
        }
        @media (max-width: 560px) { .vth-card { display: none; } }
      `}</style>

      <section className="vth">
        <SoftwareNavbar />

        <div className="vth-inner">
          {/* ── Copy ── */}
          <div>
            <nav className="vth-crumb vth-anim" style={{ '--d': '0ms' } as React.CSSProperties} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/service/fleet-telematics">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Vehicle Tracking System</span>
            </nav>

            <p className="vth-eyebrow vth-anim" style={{ '--d': '70ms' } as React.CSSProperties}>
              Vehicle tracking · United Arab Emirates
            </p>

            <h1 className="vth-title vth-anim" style={{ '--d': '140ms' } as React.CSSProperties}>
              The best <em>vehicle tracking system</em> in the UAE
            </h1>

            <p className="vth-lead vth-anim" style={{ '--d': '210ms' } as React.CSSProperties}>
              Manage your vehicles with one click today. Every car, van, truck and
              asset you own — live on a single screen, from Dubai to every other Emirate.
            </p>

            <div className="vth-actions vth-anim" style={{ '--d': '280ms' } as React.CSSProperties}>
              <Link href="/get-a-quote" className="vth-btn vth-btn--primary">
                Get a free quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/get-a-free-demo" className="vth-btn vth-btn--ghost">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" />
                </svg>
                Get a free demo
              </Link>
            </div>

            <div className="vth-proof vth-anim" style={{ '--d': '350ms' } as React.CSSProperties}>
              <p className="vth-proof-label">Trusted by fleets across the Emirates</p>
              <div className="vth-proof-row">
                {PROOF.map(p => (
                  <Image key={p.name} src={p.src} alt={p.name} width={160} height={60} sizes="160px" />
                ))}
              </div>
            </div>
          </div>

          {/* ── Isometric city ── */}
          <div className="vth-art vth-anim" style={{ '--d': '240ms' } as React.CSSProperties}>
            {/* viewBox starts at y=100, not 0. The topmost drawn thing is a pin
                cap at y≈110, so the first fifth of a 0-based box was dead space —
                and because the box is what the grid centres, that emptiness was
                pushing the whole illustration down the page. 10 units of headroom
                are left for the pins' float. */}
            <svg viewBox="0 100 620 372" role="img" aria-label="Illustration of a city with tracked vehicles and location pins on a live map">
              <defs>
                <linearGradient id="vthSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#eef5ff" /><stop offset="1" stopColor="#f8fbff" />
                </linearGradient>
                <linearGradient id="vthPin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3b82f6" /><stop offset="1" stopColor="#1360ee" />
                </linearGradient>
                <linearGradient id="vthTower" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#dbe8fb" /><stop offset="1" stopColor="#c3d8f6" />
                </linearGradient>
              </defs>

              {/* Ground plane */}
              <ellipse cx="310" cy="330" rx="300" ry="132" fill="url(#vthSky)" />

              {/* Roads, drawn as two crossing isometric bands */}
              <path d="M40 300 L300 168 L580 300 L320 432 Z" fill="#e6eefa" />
              <path d="M120 300 L300 210 L500 300 L320 390 Z" fill="#f4f8ff" />
              <path className="vth-dash" d="M110 300 L300 205 L510 300" fill="none" stroke="#1360ee" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />

              {/* Towers */}
              {[
                { x: 352, y: 172, w: 44, h: 96 },
                { x: 404, y: 146, w: 38, h: 122 },
                { x: 450, y: 190, w: 34, h: 78 },
              ].map(t => (
                <g key={t.x}>
                  <path d={`M${t.x} ${t.y + t.h} L${t.x} ${t.y} L${t.x + t.w / 2} ${t.y - 18} L${t.x + t.w / 2} ${t.y + t.h - 18} Z`} fill="url(#vthTower)" />
                  <path d={`M${t.x + t.w / 2} ${t.y - 18} L${t.x + t.w} ${t.y} L${t.x + t.w} ${t.y + t.h} L${t.x + t.w / 2} ${t.y + t.h - 18} Z`} fill="#aec9ef" />
                  {[0, 1, 2, 3].map(r => (
                    <rect key={r} x={t.x + 8} y={t.y + 14 + r * 22} width={t.w / 2 - 16} height="9" rx="2" fill="#fff" opacity=".8" />
                  ))}
                </g>
              ))}

              {/* Vehicles — simple isometric blocks, enough to read at a glance */}
              {[
                { x: 168, y: 258, c: '#1360ee', w: 54 },
                { x: 262, y: 300, c: '#f97316', w: 66 },
                { x: 356, y: 268, c: '#0a89dd', w: 48 },
              ].map(v => (
                <g key={v.x}>
                  <path d={`M${v.x} ${v.y} l${v.w} -26 l26 13 l-${v.w} 26 z`} fill={v.c} opacity=".92" />
                  <path d={`M${v.x} ${v.y} l26 13 l0 15 l-26 -13 z`} fill={v.c} opacity=".7" />
                  <path d={`M${v.x + v.w} ${v.y - 26} l26 13 l0 15 l-26 -13 z`} fill={v.c} opacity=".55" />
                </g>
              ))}

              {/* Location pins */}
              {[
                { x: 150, y: 190, d: 500, f: 0 },
                { x: 268, y: 150, d: 640, f: 400 },
                { x: 396, y: 118, d: 780, f: 800 },
                { x: 486, y: 226, d: 920, f: 1200 },
              ].map(p => (
                <g key={p.x} className="vth-pin" style={{ '--d': `${p.d}ms`, '--fd': `${p.f}ms` } as React.CSSProperties}>
                  <path
                    d={`M${p.x} ${p.y + 44} c0 0 -18 -22 -18 -34 a18 18 0 0 1 36 0 c0 12 -18 34 -18 34 z`}
                    fill="url(#vthPin)"
                  />
                  <circle cx={p.x} cy={p.y + 10} r="6.4" fill="#fff" />
                </g>
              ))}

              <ellipse cx="310" cy="420" rx="180" ry="14" fill="#1360ee" opacity=".07" />
            </svg>

            <div className="vth-card">
              <i />
              <div>
                <b>Pickup 88746</b>
                <span>En route · Sheikh Zayed Rd</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
