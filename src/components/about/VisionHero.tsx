import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

/**
 * Our Vision — hero.
 *
 * Same technique as the Who We Are hero: the illustration (a fleet of
 * miniature IoT devices and vehicles forming the numeral "1") sits in a
 * bounded, right-anchored box rather than stretched full-bleed, fading to
 * white on the left under a scrim so the copy stays legible without any
 * hazy overlay band.
 *
 * "Our Vision" is the actual page title — set large or it fights everything
 * else for attention — with the "One Million IoT Devices / One Connected
 * World" line living underneath it as a bold standalone statement rather
 * than a paragraph.
 */
export default function VisionHero() {
  return (
    <>
      <style>{`
        .vsh-hero {
          position: relative;
          overflow: hidden;
          background: #f8f9fb;
          display: flex;
          flex-direction: column;
          min-height: clamp(440px, 50vh, 580px);
        }

        /* The photo lives inside .vsh-body, not the section, on purpose: the
           navbar is position:fixed and paints a translucent bar over the top
           64px of whatever sits beneath it. The "1" in this illustration
           nearly touches the top edge of the source file, so anchoring the
           photo at the section's top:0 pushed its head under that bar and
           clipped it. Bounding it to the body keeps the whole figure below
           the navbar. */
        .vsh-photo { position: absolute; top: 0; right: 0; bottom: 0; width: min(1200px, 62%); z-index: 0; }
        /* contain, not cover — cover would crop the figure again as soon as
           the box is proportionally wider than the source. The letterboxing
           contain leaves is invisible because the section background is
           matched to the photo's own off-white. */
        .vsh-photo img { object-fit: contain; object-position: 100% center; }

        /* The photo's own background isn't pure white (it samples closer to
           #e9ebf2 in the corners) — matching the section and scrim to that
           same tone, instead of #fff, keeps the box's edges from reading as
           a visible seam against a whiter page background. */
        .vsh-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(90deg, #f8f9fb 0%, #f8f9fb 36%, rgba(248,249,251,0) 62%);
        }

        .vsh-navwrap { position: relative; z-index: 3; }

        .vsh-body { position: relative; flex: 1; display: flex; align-items: center; padding: clamp(20px,3vw,36px) 28px clamp(40px,5vw,60px); }
        .vsh-inner { position: relative; z-index: 2; max-width: var(--w-1280); width: 100%; margin: 0 auto; }
        .vsh-content { max-width: min(680px, 100%); }

        @keyframes vshRise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .vsh-anim { opacity: 0; animation: vshRise .8s ${EASE} forwards; } }

        .vsh-kicker { display: block; margin-bottom: 18px; }
        .vsh-kicker span { display: inline-block; width: 38px; height: 3px; border-radius: 2px; background: linear-gradient(90deg,#1360ee,#06a4e2); }

        .vsh-title {
          margin: 0;
          font-size: clamp(34px, calc(2.6vw + 18px), 58px);
          font-weight: 800; line-height: 1.08; letter-spacing: -.026em;
          background: linear-gradient(105deg, #1360ee 0%, #0d73e3 46%, #06a4e2 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }

        .vsh-divider { margin: clamp(18px,2vw,24px) 0; height: 4px; width: 76px; border-radius: 999px; background: linear-gradient(90deg,#1360ee,#06a4e2); }

        .vsh-tagline {
          margin: 0;
          font-size: clamp(21px, calc(1.1vw + 12px), 32px);
          font-weight: 700; line-height: 1.32; letter-spacing: -.012em;
          color: #232a3b;
        }
        .vsh-tagline em { font-style: normal; color: #1360ee; }

        @media (max-width: 1024px) {
          .vsh-photo { width: min(760px, 56%); }
          .vsh-scrim { background: linear-gradient(90deg, #f8f9fb 0%, #f8f9fb 44%, rgba(248,249,251,0) 70%); }
          .vsh-content { max-width: min(560px, 100%); }
        }

        @media (max-width: 768px) {
          .vsh-hero { min-height: 0; }
          .vsh-body { padding-bottom: clamp(40px,9vw,56px); }
          .vsh-photo { width: min(420px, 68%); opacity: .9; }
          .vsh-scrim { background: linear-gradient(90deg, #f8f9fb 0%, #f8f9fb 60%, rgba(248,249,251,0) 90%); }
          .vsh-content { max-width: 100%; }
        }

        @media (max-width: 420px) {
          .vsh-title { font-size: clamp(30px, 9.6vw, 36px); }
          .vsh-tagline { font-size: clamp(18px, 6vw, 22px); }
        }
      `}</style>

      <section className="vsh-hero">
        <div className="vsh-navwrap">
          <SoftwareNavbar />
        </div>

        <div className="vsh-body">
          <div className="vsh-photo" aria-hidden="true">
            <Image
              src="/About_us/vision/vision-hero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 68vw, (max-width: 1024px) 56vw, 1200px"
            />
          </div>
          <div className="vsh-scrim" aria-hidden="true" />

          <div className="vsh-inner">
            <div className="vsh-content">
              <span className="vsh-kicker vsh-anim" style={{ animationDelay: '0s' }} aria-hidden="true">
                <span />
              </span>

              <h1 className="vsh-title vsh-anim" style={{ animationDelay: '.06s' }}>
                Our Vision
              </h1>

              <div className="vsh-divider vsh-anim" style={{ animationDelay: '.14s' }} />

              <p className="vsh-tagline vsh-anim" style={{ animationDelay: '.2s' }}>
                One Million IoT Devices<br />
                <em>One Connected World.</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
