import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function NewsroomHero() {
  return (
    <>
      <style href="nr-newsroomhero" precedence="medium">{`
        .nrh { position: relative; overflow: hidden; background: #fff; }
        /* Faint city skyline wash behind the artwork, echoing the rest of the
           site's light sections without competing with the headline. */
        .nrh::before {
          content: ''; position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(1200px 420px at 78% 30%, rgba(19,96,238,.10), transparent 70%),
            linear-gradient(180deg, #fbfcff 0%, #ffffff 60%);
        }
        .nrh-grid-lines {
          position: absolute; inset: 0; z-index: 0; opacity: .5;
          background-image:
            linear-gradient(to right, rgba(19,96,238,.055) 1px, transparent 1px);
          background-size: 68px 100%;
          mask-image: linear-gradient(to bottom, transparent, #000 25%, #000 70%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, #000 25%, #000 70%, transparent);
        }

        .nrh-body { position: relative; z-index: 2; max-width: 1240px; margin: 0 auto; padding: clamp(30px,4.5vw,58px) 28px clamp(34px,4vw,52px); }
        .nrh-cols { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.06fr); gap: clamp(24px,4vw,52px); align-items: center; }
        @media (max-width: 940px) { .nrh-cols { grid-template-columns: 1fr; } }

        .nrh-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 11.5px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
          color: #1360ee; margin-bottom: 18px;
        }
        .nrh-eyebrow i { display: block; width: 26px; height: 2px; background: #1360ee; border-radius: 2px; }

        .nrh-title {
          margin: 0; font-size: clamp(30px,4.6vw,54px); font-weight: 800;
          line-height: 1.08; letter-spacing: -.028em; color: #0b1220; max-width: 14ch;
        }
        .nrh-title span { color: #1360ee; }

        .nrh-lead { margin: 20px 0 0; max-width: 50ch; font-size: clamp(14.5px,1.25vw,16.5px); line-height: 1.72; color: #5b6474; }

        .nrh-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: clamp(24px,3vw,34px); }
        .nrh-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 22px; border-radius: 11px; text-decoration: none;
          font-size: 13.5px; font-weight: 700; letter-spacing: .01em;
          transition: transform .18s ${EASE}, background .18s ${EASE}, box-shadow .18s ${EASE}, border-color .18s ${EASE};
        }
        .nrh-btn-primary { background: #1360ee; color: #fff; border: 1.5px solid #1360ee; box-shadow: 0 12px 26px -10px rgba(19,96,238,.7); }
        .nrh-btn-primary:hover { background: #0d4fd4; transform: translateY(-2px); box-shadow: 0 16px 32px -10px rgba(19,96,238,.8); }
        .nrh-btn-ghost { background: #fff; color: #16233a; border: 1.5px solid #dbe2ee; }
        .nrh-btn-ghost:hover { border-color: #1360ee; color: #1360ee; transform: translateY(-2px); }

        .nrh-art { position: relative; }
        .nrh-art-frame {
          position: relative; border-radius: 18px; overflow: hidden;
          box-shadow: 0 30px 70px -26px rgba(11,18,32,.32);
          border: 1px solid #e7ecf6; background: #fff; aspect-ratio: 16 / 10;
        }
        .nrh-art-frame img { object-fit: cover; }
        /* Small floating pin marker, a nod to the tracking product itself. */
        .nrh-pin {
          position: absolute; right: 6%; bottom: 8%; z-index: 3;
          width: 44px; height: 44px; border-radius: 50%;
          display: grid; place-items: center; color: #fff;
          background: #1360ee; box-shadow: 0 12px 26px -8px rgba(19,96,238,.85);
          animation: nrh-float 3.4s ${EASE} infinite;
        }
        @keyframes nrh-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @media (prefers-reduced-motion: reduce) { .nrh-pin { animation: none; } }
      `}</style>

      <section className="nrh">
        <div className="nrh-grid-lines" aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 3 }}>
          <SoftwareNavbar />
        </div>

        <div className="nrh-body">
          <div className="nrh-cols">
            <div data-reveal>
              <span className="nrh-eyebrow">
                <i />
                Newsroom
              </span>
              <h1 className="nrh-title">
                Stay updated with everything <span>Locator.</span>
              </h1>
              <p className="nrh-lead">
                Discover the latest product updates, company news, customer stories, events,
                videos, and live updates from Locator — all in one place.
              </p>
              <div className="nrh-ctas">
                <a href="#newsroom-feed" className="nrh-btn nrh-btn-primary">
                  Latest Release: v4.6
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="#newsroom-subscribe" className="nrh-btn nrh-btn-ghost">
                  Subscribe for Updates
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="nrh-art" data-reveal>
              <div className="nrh-art-frame">
                <Image
                  src="/live-showcase.png"
                  alt="Locator fleet intelligence dashboard"
                  fill
                  priority
                  sizes="(max-width: 940px) 100vw, 620px"
                />
              </div>
              <div className="nrh-pin" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
