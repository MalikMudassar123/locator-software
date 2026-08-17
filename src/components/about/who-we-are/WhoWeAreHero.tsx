import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const SECTORS = ['Logistics', 'Transportation', 'Construction', 'Government', 'Education', 'Healthcare', 'Commercial']

/**
 * Who We Are — hero.
 *
 * THE CONCEPT: coverage. A signal originates from a single point above the
 * headline and propagates outward as evenly-spaced arcs, passing down through
 * the copy and coming to rest on a horizon line that the sector chips sit on.
 * One origin, one platform, reaching every sector — which is exactly what the
 * copy claims. Everything is built on the same centre axis as the type, so the
 * graphic and the content share one composition rather than the art being
 * scattered around the words.
 *
 * Three rules keep it feeling drawn rather than generated:
 *
 *   1. The geometry stays true. The arc plate uses
 *      preserveAspectRatio="xMidYMin slice", so circles remain CIRCLES at every
 *      viewport instead of being stretched into ellipses. Stretched geometry is
 *      the single clearest tell of decoration-by-accident.
 *   2. Radii follow one rhythm — a constant 130-unit step — so the rings read as
 *      a measured system. Opacity falls off on the same curve.
 *   3. Nothing crosses the type. Every layer is masked so it dissolves before it
 *      reaches the headline, which is why the copy sits on near-clean white.
 *
 * All of it is CSS and inline SVG on a SERVER component — no client JS, no
 * hydration cost, and it is fully painted in the first server response.
 */
export default function WhoWeAreHero() {
  return (
    <>
      <style>{`
        .wwa-hero {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(140% 100% at 50% -18%, #eaf1ff 0%, #f6f9ff 34%, #ffffff 68%);
          padding: clamp(16px,2vw,28px) 28px clamp(64px,8vw,104px);
        }

        /* ── 1. The beam ──────────────────────────────────────────────────
           A cone of light widening down from the signal origin. Its only job
           is to put the brightest part of the section exactly where the
           headline is, so the eye lands on the statement first. Sized as a
           trapezoid via clip-path, then blurred so no edge is ever visible. */
        /* TWO elements, and it has to be two. CSS applies filter BEFORE
           clip-path, so blurring the cone directly does nothing to its
           diagonals — the clip re-cuts the blurred pixels with a hard edge and
           you get a crisp grey triangle sitting on the page. Blur has to happen
           to something already clipped, which means the clip goes on the child
           and the blur on the parent. */
        .wwa-beam {
          position: absolute; z-index: 0; pointer-events: none;
          top: -18%; left: 50%; transform: translateX(-50%);
          width: min(1320px, 104%); height: 96%;
          filter: blur(76px);
          /* Feathers the sides so even the softened boundary stays well outside
             the readable column. */
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 24%, #000 76%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 24%, #000 76%, transparent 100%);
        }
        .wwa-beam::before {
          content: ''; position: absolute; inset: 0;
          clip-path: polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(180deg,
            rgba(19,96,238,.17) 0%,
            rgba(19,96,238,.08) 40%,
            rgba(6,164,226,.035) 68%,
            transparent 90%);
        }
        @keyframes wwaBeam { 0%,100% { opacity: .85; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: no-preference) {
          .wwa-beam { animation: wwaBeam 9s ease-in-out infinite; }
        }

        /* ── 2. The coverage arcs ────────────────────────────────────────
           slice + xMidYMin is what preserves true circles and pins the origin
           to the top centre at any width. The CSS mask is what turns hard
           outlines into light: each ring is brightest directly under the
           origin and dissolves toward the sides, so they read as propagation
           rather than as drawn circles. */
        .wwa-arcs {
          position: absolute; inset: 0; z-index: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          -webkit-mask-image: radial-gradient(ellipse 68% 72% at 50% 2%, #000 12%, rgba(0,0,0,.55) 46%, transparent 80%);
          mask-image: radial-gradient(ellipse 68% 72% at 50% 2%, #000 12%, rgba(0,0,0,.55) 46%, transparent 80%);
        }
        /* One wave, travelling. Each ring runs the same animation on the same
           period, offset by an equal share of it, so what you see is a single
           pulse moving outward — not five rings blinking. */
        @keyframes wwaProp {
          0%   { opacity: 0;   transform: scale(.94); }
          18%  { opacity: 1; }
          70%  { opacity: .55; }
          100% { opacity: 0;   transform: scale(1.07); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .wwa-arc {
            transform-origin: 800px 90px;
            animation: wwaProp 12s ${EASE} infinite;
          }
          .wwa-arc--2 { animation-delay: -2.4s; }
          .wwa-arc--3 { animation-delay: -4.8s; }
          .wwa-arc--4 { animation-delay: -7.2s; }
          .wwa-arc--5 { animation-delay: -9.6s; }
        }

        /* ── 3. The horizon ──────────────────────────────────────────────
           Where the signal lands. A single hairline the sector row sits on,
           fading out well before either edge so it reads as a horizon rather
           than a border. This is the composition's baseline — it is what stops
           the section from just trailing off at the bottom. */
        .wwa-horizon {
          position: relative; z-index: 1;
          margin: clamp(38px,5vw,56px) auto 0;
          max-width: 760px; height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(19,96,238,.16) 18%,
            rgba(19,96,238,.42) 50%,
            rgba(19,96,238,.16) 82%,
            transparent 100%);
        }
        /* The point the beam resolves to, sitting on the horizon dead centre.
           Two rings so it has a core and a halo rather than being a flat dot. */
        .wwa-horizon::after {
          content: ''; position: absolute; left: 50%; top: 50%;
          width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px;
          border-radius: 50%; background: #1360ee;
          box-shadow: 0 0 0 4px rgba(19,96,238,.12), 0 0 16px 2px rgba(19,96,238,.45);
        }

        .wwa-inner { position: relative; z-index: 1; max-width: 880px; margin: 0 auto; text-align: center; padding-top: clamp(28px,5vw,60px); }

        @keyframes wwaRise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .wwa-anim { opacity: 0; animation: wwaRise .8s ${EASE} forwards; } }

        /* ── Type ────────────────────────────────────────────────────────
           The eyebrow used to resolve LARGER than the h1 at every desktop
           width (32px vs 28px at 1440, 42.7 vs 37.3 at 1920) — the headline
           was losing to its own kicker. It is now a true eyebrow: small, wide
           tracking, quiet; and the h1 is given the room a hero headline should
           have. That inversion, more than any graphic, is what made the
           section read as unfinished. */
        /* Sized against the headline rather than in the abstract. The first
           pass here over-corrected: coming off an eyebrow that was LARGER than
           the h1, 11-13px swung too far the other way and the kicker stopped
           registering at all. 13-18px puts it at roughly a quarter of the
           headline on desktop (16.6 against 68 at 1440), which is the range
           where it reads as a deliberate label — present, clearly subordinate,
           not timid. */
        .wwa-eyebrow {
          display: inline-flex; align-items: center; gap: 13px;
          font-size: clamp(13px, 1.15vw, 18px);
          font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
          color: #1360ee;
        }
        .wwa-eyebrow i {
          display: block; width: clamp(28px, 2.4vw, 40px); height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, transparent, #1360ee);
        }
        .wwa-eyebrow i:last-child { background: linear-gradient(90deg, #1360ee, transparent); }

        /* An affine ramp, not a bare vw coefficient. clamp(33px, 5.1vw, 68px)
           pinned to its 33px FLOOR on every phone — 5.1vw is only 20px at
           390px wide — and 33px is too big for the column that is left after
           the section's 28px side padding, so the headline ran into the edge.
           3.81vw + 13.1px is solved to pass through 28px at 390 and 68px at
           1440, so both ends are deliberate and everything between is a smooth
           line rather than a flat floor followed by a sudden climb. */
        .wwa-title {
          margin: clamp(18px,2vw,26px) auto 0; max-width: 17ch;
          font-size: clamp(28px, calc(3.81vw + 13.1px), 68px);
          font-weight: 800; line-height: 1.06; letter-spacing: -.028em;
          color: #0b1220;
          /* Belt and braces for the narrowest phones: a long word can still
             break rather than push the line past the viewport. */
          overflow-wrap: break-word;
        }
        @media (max-width: 420px) {
          /* ch is measured on the "0" glyph; at display weights the real
             letters run wider, so the cap needs to come in on small screens. */
          .wwa-title { max-width: 14ch; letter-spacing: -.02em; }
        }
        /* Gradient on the emphasis, not a flat colour swap — it picks up the
           same blue-to-cyan the arcs and beam are built from, which is what
           ties the type to the graphic instead of them merely sharing a hue. */
        .wwa-title em {
          font-style: normal;
          background: linear-gradient(105deg, #1360ee 0%, #0d73e3 46%, #06a4e2 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }

        .wwa-lead {
          margin: clamp(18px,2vw,24px) auto 0; max-width: 60ch;
          font-size: clamp(15px, 1.18vw, 18.5px);
          line-height: 1.72; color: #55607a;
        }

        .wwa-btn {
          font-family: inherit; font-size: var(--f-14); font-weight: 700; cursor: pointer;
          padding: 14px 28px; border-radius: 999px; border: none;
          transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .wwa-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.3); }
        .wwa-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 30px rgba(19,96,238,.42); }
        .wwa-btn-ghost { background: rgba(255,255,255,.72); color: #1d1d1f; border: 1.5px solid #e3e7ef; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
        .wwa-btn-ghost:hover { border-color: #1360ee; color: #1360ee; transform: translateY(-1px); }

        .wwa-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: var(--f-12-5); font-weight: 700; color: #52525e;
          background: rgba(255,255,255,.8); border: 1px solid #e6e9f0; border-radius: 999px;
          padding: 7px 15px; box-shadow: 0 2px 10px rgba(20,40,90,.05);
          -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
        }

        /* Sector row — the far end of the signal. Sits under the horizon, so
           the chips read as the things being reached, not as loose tags. */
        .wwa-sectors {
          position: relative; z-index: 1;
          display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;
          max-width: 820px; margin: clamp(22px,3vw,30px) auto 0;
        }
        .wwa-chip {
          font-size: var(--f-12-5); font-weight: 600; color: #46536e;
          background: rgba(255,255,255,.78);
          border: 1px solid rgba(19,96,238,.16);
          border-radius: 999px; padding: 7px 15px;
          -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
          box-shadow: 0 1px 2px rgba(20,40,90,.04);
          transition: color .2s ${EASE}, border-color .2s ${EASE}, transform .2s ${EASE}, box-shadow .2s ${EASE};
        }
        .wwa-chip:hover {
          color: #1360ee; border-color: rgba(19,96,238,.42);
          transform: translateY(-2px);
          box-shadow: 0 8px 18px -8px rgba(19,96,238,.4);
        }
      `}</style>

      <section className="wwa-hero">
        <div className="wwa-beam" aria-hidden="true" />

        <svg
          className="wwa-arcs"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMin slice"
          aria-hidden="true"
          focusable="false"
        >
          {/* Origin at the top centre, on the same axis as the headline.
              Radii step by a constant 130 so the spacing is a system; stroke
              opacity steps down with them so the wave visibly loses energy as
              it travels, which is what makes it read as propagation. */}
          <g fill="none" stroke="#1360ee" strokeWidth="1.1">
            <circle className="wwa-arc wwa-arc--1" cx="800" cy="90" r="300" strokeOpacity=".42" />
            <circle className="wwa-arc wwa-arc--2" cx="800" cy="90" r="430" strokeOpacity=".35" />
            <circle className="wwa-arc wwa-arc--3" cx="800" cy="90" r="560" strokeOpacity=".28" />
            <circle className="wwa-arc wwa-arc--4" cx="800" cy="90" r="690" strokeOpacity=".21" />
            <circle className="wwa-arc wwa-arc--5" cx="800" cy="90" r="820" strokeOpacity=".14" />
          </g>
        </svg>

        <SoftwareNavbar />

        <div className="wwa-inner">
          <span className="wwa-eyebrow wwa-anim" style={{ animationDelay: '.05s' }}>
            <i /> Who We Are <i />
          </span>

          <h1 className="wwa-title wwa-anim" style={{ animationDelay: '.12s' }}>
            Shaping the future of <em>connected mobility</em>
          </h1>

          <p className="wwa-lead wwa-anim" style={{ animationDelay: '.2s' }}>
            LOCATOR is more than a GPS tracking provider — we&apos;re a technology company building intelligent fleet telematics and IoT solutions that connect vehicles and assets, and turn real-time data into actionable business intelligence.
          </p>

          <div className="wwa-anim" style={{ animationDelay: '.28s', marginTop: '24px' }}>
            <span className="wwa-badge">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1360ee' }} />
              Part of Synosys
            </span>
          </div>

          <div className="wwa-anim" style={{ animationDelay: '.36s', display: 'flex', gap: '14px', justifyContent: 'center', marginTop: 'clamp(26px,3vw,34px)', flexWrap: 'wrap' }}>
            <Link href="/contact" className="wwa-btn wwa-btn-primary">Talk to our team</Link>
            <Link href="/software" className="wwa-btn wwa-btn-ghost">Explore the platform</Link>
          </div>

          {/* Where the signal lands, and what it reaches. */}
          <div className="wwa-horizon wwa-anim" style={{ animationDelay: '.44s' }} aria-hidden="true" />

          <div className="wwa-sectors wwa-anim" style={{ animationDelay: '.5s' }}>
            {SECTORS.map(s => <span key={s} className="wwa-chip">{s}</span>)}
          </div>
        </div>
      </section>
    </>
  )
}
