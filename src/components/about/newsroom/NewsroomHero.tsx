import Image from 'next/image'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function NewsroomHero() {
  return (
    <>
      <style href="nr-newsroomhero" precedence="medium">{`
        .nrh { background: #fff; }

        /* ── Breadcrumb strip — plain white bar above the photo ── */
        .nrh-crumbs-bar { border-bottom: 1px solid #eef1f7; }
        .nrh-crumbs {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          max-width: var(--w-1280); margin: 0 auto; padding: 16px 28px;
          font-size: var(--f-14); color: #6e6e73;
        }
        .nrh-crumbs a { color: #1d1d1f; font-weight: 600; text-decoration: none; transition: color .18s ease; }
        .nrh-crumbs a:hover { color: #1360ee; }
        .nrh-crumbs svg { color: #b8bcc4; flex-shrink: 0; }
        .nrh-crumbs .cur { color: #8e8e93; }

        /* ── Photo band ──
           object-fit: contain (not cover) so the banner is always shown in
           full — cover would crop it to fill the band, which loses part of
           the globe on wide screens and most of it on tall/narrow ones. The
           background is sampled from the image's own corner colour, so
           wherever contain letterboxes it reads as part of the artwork
           rather than a visible bar. */
        .nrh-photo { position: relative; overflow: hidden; height: clamp(300px, 38vw, 460px); background: #000b23; }
        .nrh-photo img { object-fit: contain; }
        /* Layered scrim: strong bottom-up fade so the headline sits on dark
           pixels, plus a left-side wash so text stays legible on bright areas. */
        .nrh-scrim {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(0deg, rgba(4,8,18,.52) 0%, rgba(4,8,18,.4) 32%, rgba(4,8,18,.26) 58%, rgba(4,8,18,.13) 80%, rgba(4,8,18,.04) 100%),
            linear-gradient(90deg, rgba(4,8,18,.38) 0%, rgba(4,8,18,.16) 40%, transparent 78%);
        }

        .nrh-photo-body {
          position: relative; z-index: 2; height: 100%;
          display: flex; align-items: flex-end;
          max-width: var(--w-1280); margin: 0 auto; padding: 0 28px clamp(26px,4vw,46px);
        }
        .nrh-content { max-width: min(760px, 90vw); }

        .nrh-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: max(clamp(13px,1.15vw,15px), min(1.042vw, 21.75px)); font-weight: 800; letter-spacing: .14em; text-transform: uppercase;
          color: #9ec2ff; margin-bottom: 16px;
          text-shadow: 0 2px 12px rgba(0,0,0,.35);
        }
        .nrh-eyebrow i { display: block; width: 34px; height: 3px; background: #9ec2ff; border-radius: 2px; }

        .nrh-title {
          margin: 0; font-size: max(clamp(30px,4.6vw,56px), min(3.889vw, 81.2px)); font-weight: 800;
          line-height: 1.08; letter-spacing: -.02em; color: #fff; max-width: 20ch;
          text-shadow: 0 2px 4px rgba(0,0,0,.45), 0 8px 34px rgba(0,0,0,.4);
        }

        .nrh-lead { margin: 16px 0 0; max-width: 60ch; font-size: max(clamp(14px,1.25vw,16.5px), min(1.146vw, 23.93px)); line-height: 1.72; color: rgba(255,255,255,.86); }

        .nrh-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: clamp(22px,3vw,30px); }
        .nrh-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 22px; border-radius: 11px; text-decoration: none;
          font-size: var(--f-13-5); font-weight: 700; letter-spacing: .01em;
          transition: transform .18s ${EASE}, background .18s ${EASE}, box-shadow .18s ${EASE}, border-color .18s ${EASE};
        }
        .nrh-btn-primary { background: #1360ee; color: #fff; border: 1.5px solid #1360ee; box-shadow: 0 12px 26px -10px rgba(19,96,238,.7); }
        .nrh-btn-primary:hover { background: #0d4fd4; transform: translateY(-2px); box-shadow: 0 16px 32px -10px rgba(19,96,238,.8); }
        .nrh-btn-ghost { background: rgba(255,255,255,.08); color: #fff; border: 1.5px solid rgba(255,255,255,.4); backdrop-filter: blur(6px); }
        .nrh-btn-ghost:hover { background: rgba(255,255,255,.16); border-color: #fff; transform: translateY(-2px); }

        /* The band's fixed height plus overflow:hidden clips the copy on a
           phone, where the stacked title/lead/buttons are taller than the
           300px floor and are anchored to the bottom. Letting the band grow
           to its content keeps the whole block visible. */
        @media (max-width: 768px) {
          .nrh-photo { height: auto; min-height: clamp(300px, 38vw, 460px); }
          .nrh-photo-body {
            height: auto;
            padding-top: clamp(28px, 7vw, 44px);
            padding-bottom: clamp(28px, 7vw, 44px);
          }
        }
      `}</style>

      <section className="nrh">
        <SoftwareNavbar />

        <div className="nrh-crumbs-bar">
          <nav className="nrh-crumbs" aria-label="Breadcrumb">
            <Link href="/">Homepage</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
            <span className="cur">Newsroom</span>
          </nav>
        </div>

        <div className="nrh-photo" data-reveal>
          <Image
            src="/newsroom/newsroom-hero-banner.webp"
            alt="Illuminated global network map centred on the UAE and the Middle East, representing Locator's connected fleet intelligence"
            fill
            priority
            sizes="100vw"
          />
          <div className="nrh-scrim" />
          <div className="nrh-photo-body">
            <div className="nrh-content">
              <span className="nrh-eyebrow"><i />Newsroom</span>
              <h1 className="nrh-title">Stay updated with everything Locator</h1>
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
          </div>
        </div>
      </section>
    </>
  )
}
