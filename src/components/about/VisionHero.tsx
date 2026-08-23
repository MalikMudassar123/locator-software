import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

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
          min-height: clamp(520px, 60vw, 780px);
        }

        /* Full-bleed image anchored to the section root — covers ALL four edges,
           no bounded box, no seam, no split-panel appearance */
        .vsh-photo { position: absolute; inset: 0; z-index: 0; }
        .vsh-photo img { object-fit: cover; object-position: center top; }

        /* Left-to-right scrim — solid section colour over the copy zone only,
           fades fully transparent well before the right edge so there is no
           visible colour boundary anywhere in the middle */
        .vsh-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(248,249,251,.96) 0%,
            rgba(248,249,251,.80) 28%,
            rgba(248,249,251,.20) 52%,
            rgba(248,249,251,0)   66%
          );
        }

        .vsh-navwrap { position: relative; z-index: 3; }

        .vsh-body {
          position: relative; z-index: 2;
          display: flex; align-items: flex-start;
          padding: clamp(20px,2.5vw,32px) 28px clamp(40px,5vw,60px);
        }
        .vsh-inner { max-width: var(--w-1280); width: 100%; margin: 0 auto; }
        .vsh-content { max-width: min(580px, 100%); }

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
          font-size: clamp(15px, 1.05vw, 17px);
          font-weight: 400; line-height: 1.72;
          color: #3a4459; max-width: 46ch;
        }
        .vsh-tagline em { font-style: normal; color: #1360ee; }

        /* Tablet */
        @media (max-width: 1024px) {
          .vsh-scrim {
            background: linear-gradient(
              90deg,
              rgba(248,249,251,.97) 0%,
              rgba(248,249,251,.84) 34%,
              rgba(248,249,251,.20) 60%,
              rgba(248,249,251,0)   74%
            );
          }
          .vsh-content { max-width: min(520px, 100%); }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .vsh-hero { min-height: clamp(420px, 80vw, 560px); }
          .vsh-body { padding-bottom: clamp(40px,9vw,56px); }
          .vsh-scrim {
            background: linear-gradient(
              90deg,
              rgba(248,249,251,.98) 0%,
              rgba(248,249,251,.92) 52%,
              rgba(248,249,251,.40) 78%,
              rgba(248,249,251,0)  100%
            );
          }
          .vsh-content { max-width: 100%; }
        }

        @media (max-width: 420px) {
          .vsh-title { font-size: clamp(30px, 9.6vw, 36px); }
        }
      `}</style>

      <section className="vsh-hero">

        {/* Full-bleed background — anchored to section root, covers every edge */}
        <div className="vsh-photo" aria-hidden="true">
          <Image
            src="/About_us/vision/vision second hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="vsh-scrim" aria-hidden="true" />

        <div className="vsh-navwrap">
          <SoftwareNavbar />
        </div>

        <div className="vsh-body">
          <div className="vsh-inner">
            <div className="vsh-content">

              <span className="vsh-kicker vsh-anim" style={{ animationDelay: '0s' }} aria-hidden="true">
                <span />
              </span>

              <h1 className="vsh-title vsh-anim" style={{ animationDelay: '.06s' }}>
                <span style={{ WebkitTextFillColor: '#0b1220', color: '#0b1220' }}>Our</span>{' '}
                Vision
              </h1>

              <div className="vsh-divider vsh-anim" style={{ animationDelay: '.14s' }} />

              <p className="vsh-tagline vsh-anim" style={{ animationDelay: '.2s' }}>
                LOCATOR envisions a <em>smarter, more connected future</em> where intelligent IoT technology brings vehicles, assets, and operations together, transforming real-time data into meaningful insights, safer mobility, and more efficient businesses.
              </p>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
