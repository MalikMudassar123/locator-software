import SoftwareNavbar from '@/components/software/SoftwareNavbar'
import { ABOUT_PAGES } from '@/components/about/data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

/**
 * Shared hero for the About pillar pages — Vision, Mission, Core Values.
 *
 * Same concept as the Who We Are hero (WhoWeAreHero.tsx), deliberately: these
 * four pages are siblings and a visitor moves between them through the
 * "Explore more about" grid, so they need to read as one system rather than
 * four separately-decorated pages. A signal originates from a point above the
 * headline and propagates outward as evenly-spaced arcs, everything built on
 * the same centre axis as the type.
 *
 * The rules that keep it drawn rather than scattered are the same three:
 *   1. preserveAspectRatio="xMidYMin slice" so circles stay CIRCLES at every
 *      viewport instead of stretching into ellipses.
 *   2. Radii on one constant 130-unit rhythm, opacity falling off with them.
 *   3. Everything masked so it dissolves before it reaches the type.
 *
 * What differs from Who We Are is what the composition resolves TO: there the
 * signal lands on a horizon carrying the sector chips, here it lands on the
 * full-bleed lead band, which is this layout's own anchor. The page icon sits
 * at the origin of the arcs, so each pillar's mark is literally the source of
 * its signal.
 *
 * Server component — pure CSS and inline SVG, no client JS.
 */
export default function AboutPillarHero({
  slug,
  title,
  lead,
}: {
  slug: string
  title: string
  lead: string
}) {
  const active = ABOUT_PAGES.find(p => p.slug === slug)!

  return (
    <>
      <style>{`
        /* A mesh rather than one wash. The single near-white radial that was
           here left the section 95% flat white, which is the other half of why
           it read as empty — there was nothing for the eye to land on between
           the mark and the band. Three overlapping fields give the plate actual
           depth while still resolving to white behind the type. */
        .apx-hero {
          position: relative; overflow: hidden; isolation: isolate;
          background:
            radial-gradient(52% 42% at 18% 8%, rgba(6,164,226,.10) 0%, transparent 70%),
            radial-gradient(48% 40% at 84% 14%, rgba(19,96,238,.11) 0%, transparent 72%),
            radial-gradient(150% 105% at 50% -18%, #e6eeff 0%, #f3f7ff 30%, #ffffff 64%);
          padding: clamp(16px,2vw,28px) 28px 0;
        }

        /* Beam. The clip lives on the ::before and the blur on the parent —
           CSS applies filter BEFORE clip-path, so blurring a clipped element
           directly leaves the diagonals crisp and the whole thing reads as a
           grey triangle rather than as light. */
        .apx-beam {
          position: absolute; z-index: 0; pointer-events: none;
          top: -20%; left: 50%; transform: translateX(-50%);
          width: min(1280px, 104%); height: 92%;
          filter: blur(74px);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 24%, #000 76%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 24%, #000 76%, transparent 100%);
        }
        .apx-beam::before {
          content: ''; position: absolute; inset: 0;
          clip-path: polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(180deg,
            rgba(19,96,238,.17) 0%,
            rgba(19,96,238,.08) 42%,
            rgba(6,164,226,.035) 70%,
            transparent 92%);
        }

        .apx-arcs {
          position: absolute; inset: 0; z-index: 0;
          width: 100%; height: 100%; pointer-events: none;
          -webkit-mask-image: radial-gradient(ellipse 66% 70% at 50% 2%, #000 12%, rgba(0,0,0,.55) 46%, transparent 80%);
          mask-image: radial-gradient(ellipse 66% 70% at 50% 2%, #000 12%, rgba(0,0,0,.55) 46%, transparent 80%);
        }
        @keyframes apxProp {
          0%   { opacity: 0;   transform: scale(.94); }
          18%  { opacity: 1; }
          70%  { opacity: .55; }
          100% { opacity: 0;   transform: scale(1.07); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .apx-arc { transform-origin: 800px 90px; animation: apxProp 12s ${EASE} infinite; }
          .apx-arc--2 { animation-delay: -2.4s; }
          .apx-arc--3 { animation-delay: -4.8s; }
          .apx-arc--4 { animation-delay: -7.2s; }
          .apx-arc--5 { animation-delay: -9.6s; }
        }
        @media (prefers-reduced-motion: reduce) { .apx-arc { opacity: .5; } }

        /* Tighter than before. The old rhythm left the mark, the eyebrow and
           the title floating apart with no relationship; they now read as one
           stacked unit with the dial as its base. */
        .apx-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; text-align: center; padding-top: clamp(14px,2.4vw,30px); }

        @keyframes apxRise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .apx-anim { opacity: 0; animation: apxRise .75s ${EASE} forwards; } }

        /* ── The instrument ──────────────────────────────────────────────
           The real reason this section read as thin was structural, not
           decorative: an icon, one line of small caps and a title left roughly
           500px of empty white that no amount of faint background arcs was
           ever going to fill. It needed an actual focal object.

           So the page mark now sits at the centre of a drawn instrument — a
           graduated dial of 60 ticks with every fifth one extended, three
           concentric rings, and a soft core glow. It is the same idea the rest
           of the hero already carries (a signal, radiating from this page's
           mark) but built at a size and density that can actually hold the
           composition together.

           It is drawn rather than decorative because the geometry is regular:
           60 divisions at exactly 6 degrees, rings on a fixed rhythm, every
           fifth tick longer. Precision instruments look designed because they
           ARE measured, and that is what separates this from scattered lines. */
        .apx-core {
          position: relative;
          width: clamp(230px, 27vw, 330px);
          aspect-ratio: 1;
          margin: 0 auto;
          display: grid; place-items: center;
        }
        .apx-core svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        /* The dial turns, slowly enough to read as an instrument settling
           rather than as something spinning. */
        @keyframes apxDial { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: no-preference) {
          .apx-dial { transform-origin: 200px 200px; animation: apxDial 90s linear infinite; }
        }
        /* Core glow behind the mark, so the centre reads as lit rather than as
           a chip sitting on a diagram. */
        .apx-core::before {
          content: ''; position: absolute; inset: 22%;
          border-radius: 50%;
          background: radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.20) 0%, rgba(6,164,226,.10) 45%, transparent 72%);
          filter: blur(14px);
        }

        .apx-icon {
          position: relative; z-index: 1;
          width: 74px; height: 74px; border-radius: 21px;
          display: grid; place-items: center;
          background: linear-gradient(150deg, #1360ee 0%, #0d73e3 100%);
          color: #fff;
          box-shadow:
            0 18px 38px -12px rgba(19,96,238,.55),
            0 0 0 1px rgba(19,96,238,.16),
            0 0 0 10px rgba(255,255,255,.72),
            0 0 0 11px rgba(19,96,238,.10);
        }

        /* A true eyebrow: small, wide-tracked, flanked by rules that fade out.
           Sized against the headline — roughly a quarter of it on desktop — so
           it labels the page without competing with it. */
        .apx-eyebrow {
          display: inline-flex; align-items: center; gap: 13px;
          margin-top: clamp(-6px, -.6vw, 0px);
          font-size: clamp(13px, 1.15vw, 18px);
          font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
          color: #1360ee;
        }
        .apx-eyebrow i {
          display: block; width: clamp(28px, 2.4vw, 40px); height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, transparent, #1360ee);
        }
        .apx-eyebrow i:last-child { background: linear-gradient(90deg, #1360ee, transparent); }

        /* Affine ramp rather than a bare vw coefficient, solved to pass through
           30px at 390 and 72px at 1440 — so the small end fits the column left
           after the section's 28px padding instead of sitting on a floor that
           overflows it. */
        .apx-title {
          margin: clamp(16px,1.8vw,22px) auto 0; max-width: 16ch;
          font-size: clamp(30px, calc(4vw + 14.4px), 72px);
          font-weight: 800; line-height: 1.05; letter-spacing: -.03em;
          background: linear-gradient(105deg, #1360ee 0%, #0d73e3 46%, #06a4e2 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          overflow-wrap: break-word;
        }
        @media (max-width: 420px) { .apx-title { max-width: 13ch; letter-spacing: -.022em; } }

        /* Where the signal lands. Full-bleed band, unchanged in role — it is
           this layout's anchor, the counterpart to the sector horizon on the
           Who We Are hero. */
        .apx-lead-band {
          position: relative; z-index: 1;
          margin-top: clamp(30px,3.8vw,48px);
          margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);
          width: 100vw;
          background: linear-gradient(180deg, #f6f8fc 0%, #f2f5fa 100%);
          border-top: 1px solid #e9edf6; border-bottom: 1px solid #e9edf6;
          padding: clamp(28px,4vw,52px) 28px;
        }
        .apx-lead {
          margin: 0 auto; max-width: 820px;
          font-size: max(clamp(16px,1.7vw,20px), min(1.389vw, 29px)); line-height: 1.7;
          font-weight: 500; color: #2b3446; text-align: center;
        }
      `}</style>

      <section className="apx-hero">
        <div className="apx-beam" aria-hidden="true" />

        <svg
          className="apx-arcs"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMin slice"
          aria-hidden="true"
          focusable="false"
        >
          {/* Radii step by a constant 130; stroke opacity steps down with them,
              so the wave visibly loses energy as it travels outward. */}
          <g fill="none" stroke="#1360ee" strokeWidth="1.1">
            <circle className="apx-arc apx-arc--1" cx="800" cy="90" r="300" strokeOpacity=".42" />
            <circle className="apx-arc apx-arc--2" cx="800" cy="90" r="430" strokeOpacity=".35" />
            <circle className="apx-arc apx-arc--3" cx="800" cy="90" r="560" strokeOpacity=".28" />
            <circle className="apx-arc apx-arc--4" cx="800" cy="90" r="690" strokeOpacity=".21" />
            <circle className="apx-arc apx-arc--5" cx="800" cy="90" r="820" strokeOpacity=".14" />
          </g>
        </svg>

        <SoftwareNavbar />

        <div className="apx-inner">
          <div className="apx-core apx-anim">
            <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">
              {/* Three rings on a fixed rhythm. The outermost carries the
                  graduations, the inner two give the dial depth. */}
              <g fill="none" stroke="#1360ee">
                <circle cx="200" cy="200" r="196" strokeOpacity=".30" />
                <circle cx="200" cy="200" r="150" strokeOpacity=".22" strokeDasharray="2 7" />
                <circle cx="200" cy="200" r="104" strokeOpacity=".16" />
              </g>

              {/* 60 divisions at exactly 6°, every fifth extended. Generated
                  rather than hand-placed so the spacing is genuinely uniform —
                  eyeballed tick marks are what make a dial look fake. */}
              <g className="apx-dial" stroke="#1360ee" strokeLinecap="round">
                {Array.from({ length: 60 }, (_, i) => {
                  const major = i % 5 === 0
                  const a = (i * 6 * Math.PI) / 180
                  const outer = 196
                  const inner = major ? 178 : 187
                  return (
                    <line
                      key={i}
                      x1={200 + Math.sin(a) * inner}
                      y1={200 - Math.cos(a) * inner}
                      x2={200 + Math.sin(a) * outer}
                      y2={200 - Math.cos(a) * outer}
                      strokeWidth={major ? 1.8 : 1}
                      strokeOpacity={major ? 0.55 : 0.28}
                    />
                  )
                })}
              </g>
            </svg>

            <div className="apx-icon">{active.icon}</div>
          </div>

          <span className="apx-eyebrow apx-anim" style={{ animationDelay: '.08s' }}>
            <i /> {active.tagline} <i />
          </span>

          <h1 className="apx-anim apx-title" style={{ animationDelay: '.14s' }}>
            {title}
          </h1>

          <div className="apx-anim apx-lead-band" style={{ animationDelay: '.22s' }}>
            <p className="apx-lead">{lead}</p>
          </div>
        </div>
      </section>
    </>
  )
}
