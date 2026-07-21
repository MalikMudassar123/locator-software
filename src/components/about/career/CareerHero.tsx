import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

export default function CareerHero() {
  return (
    <>
      <style>{`
        .ch-hero { position: relative; overflow: hidden; min-height: clamp(520px,68vh,740px); display: flex; flex-direction: column; }
        .ch-bg { position: absolute; inset: 0; z-index: 0; }
        .ch-bg img { object-fit: cover; object-position: center 55%; transform: scale(1.04); }
        /* Layered scrim: a directional wash for text legibility, plus a
           bottom-up fade so the photo still reads clearly on the right. */
        .ch-scrim {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(100deg, rgba(5,9,18,.96) 0%, rgba(5,9,18,.86) 30%, rgba(5,9,18,.42) 62%, rgba(5,9,18,.12) 100%),
            linear-gradient(0deg, rgba(5,9,18,.55) 0%, transparent 32%);
        }
        /* Faint blue brand glow bottom-left, tying the photo back to the site. */
        .ch-glow {
          position: absolute; z-index: 1; left: -10%; bottom: -20%; width: 60%; aspect-ratio: 1;
          background: radial-gradient(closest-side, rgba(19,96,238,.35), transparent 70%);
          filter: blur(10px); pointer-events: none;
        }

        .ch-body { position: relative; z-index: 2; flex: 1; display: flex; align-items: center; padding: clamp(28px,5vw,60px) 28px clamp(48px,6vw,72px); }
        .ch-inner { max-width: 1180px; width: 100%; margin: 0 auto; }
        /* Wide enough that the headline wraps on its own words instead of
           being squeezed into a narrow column. */
        .ch-content { max-width: min(900px, 92vw); }

        /* Eyebrow sized to match the rest of the site — a real display label,
           not a small caption — with the accent rule on its own line above
           so it can never sit stranded beside a wrapped label. */
        .ch-eyebrow {
          display: block;
          font-size: clamp(22px,2.8vw,32px); font-weight: 800; letter-spacing: .04em;
          text-transform: uppercase; color: #6ea2ff; margin-bottom: 18px;
        }
        .ch-eyebrow-rule { display: block; margin-bottom: 12px; }
        .ch-eyebrow-rule span { display: inline-block; width: 34px; height: 3px; background: #6ea2ff; border-radius: 2px; }

        .ch-title {
          margin: 0; font-size: clamp(32px,5.4vw,68px); font-weight: 800;
          text-transform: uppercase; line-height: 1.08; letter-spacing: -.015em;
          color: #fff; max-width: 16ch;
          text-shadow: 0 4px 30px rgba(0,0,0,.35);
        }

        .ch-lead { margin: 22px 0 0; max-width: 48ch; font-size: clamp(15px,1.4vw,17.5px); line-height: 1.75; color: rgba(255,255,255,.78); }

        .ch-cta-row { display: flex; gap: 14px; margin-top: clamp(30px,3.8vw,42px); flex-wrap: wrap; }
        .ch-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px; border-radius: 12px;
          font-size: 13.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
          text-decoration: none; transition: background .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .ch-cta-primary { background: #1360ee; color: #fff; border: 1.5px solid #1360ee; box-shadow: 0 14px 32px -10px rgba(19,96,238,.65); }
        .ch-cta-primary:hover { background: #0d4fd4; border-color: #0d4fd4; transform: translateY(-2px); box-shadow: 0 18px 38px -10px rgba(19,96,238,.75); }
        .ch-cta-ghost { background: rgba(255,255,255,.06); color: #fff; border: 1.5px solid rgba(255,255,255,.4); backdrop-filter: blur(6px); }
        .ch-cta-ghost:hover { background: rgba(255,255,255,.14); border-color: #fff; transform: translateY(-2px); }
        .ch-cta svg { transition: transform .2s ease; }
        .ch-cta:hover svg { transform: translateY(3px); }
      `}</style>

      <section className="ch-hero">
        <div className="ch-bg">
          <Image src="/service_page/Transport  Logistics 2.webp" alt="" fill priority sizes="100vw" />
        </div>
        <div className="ch-scrim" />
        <div className="ch-glow" aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 3 }}>
          <SoftwareNavbar />
        </div>

        <div className="ch-body">
          <div className="ch-inner">
            <div className="ch-content" data-reveal>
              <span className="ch-eyebrow">
                <span className="ch-eyebrow-rule"><span /></span>
                Careers
              </span>
              <h1 className="ch-title">Become a builder of the connected fleet</h1>
              <p className="ch-lead">
                Join the team behind LOCATOR&rsquo;s GPS tracking, video telematics, and IoT platform —
                and help businesses across the UAE move safer, smarter, and more efficiently.
              </p>
              <div className="ch-cta-row">
                <a href="#open-positions" className="ch-cta ch-cta-primary">
                  See all positions
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </a>
                <a href="mailto:info@locator.ae" className="ch-cta ch-cta-ghost">Send us your CV</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
