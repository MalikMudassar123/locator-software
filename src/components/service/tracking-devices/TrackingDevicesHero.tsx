import Link from 'next/link'
import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'
import { DEVICES } from './devices-data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

// Four representative products for the hero montage.
const MONTAGE = ['fmb120', 'ibutton-reader-tag', 'lv-can200', 'bluetooth-temperature-humidity']
  .map((slug) => DEVICES.find((d) => d.slug === slug))
  .filter((d): d is NonNullable<typeof d> => Boolean(d))

const STATS = [
  { n: '9', l: 'Devices & accessories in the catalog' },
  { n: 'IP67', l: 'Waterproof options for exposed assets' },
  { n: '1-Wire', l: 'Driver ID & temperature sensor support' },
]

export default function TrackingDevicesHero() {
  return (
    <>
      <style>{`
        .td-hero { position: relative; background: #ffffff; padding: clamp(16px,2vw,28px) 28px 0; overflow: hidden; }

        .td-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6e6e73; font-size: 13px; font-weight: 600;
          text-decoration: none; margin-bottom: 18px;
          transition: color .18s ease, gap .18s ease;
        }
        .td-back:hover { color: #1360ee; gap: 9px; }

        .td-topbar { display: flex; justify-content: flex-end; padding: 0 4px 8px; max-width: 1200px; margin: 0 auto; }
        .td-phone-top { display: inline-flex; align-items: center; gap: 8px; color: #1360ee; font-size: 16px; font-weight: 800; text-decoration: none; }

        .td-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.05fr .95fr; gap: clamp(28px,4vw,64px);
          align-items: center; max-width: 1280px; margin: 0 auto;
          padding-bottom: clamp(40px,5vw,64px);
        }
        @media (max-width: 940px) { .td-grid { grid-template-columns: 1fr; gap: 36px; } }

        .td-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: .09em;
          color: #1360ee; text-transform: uppercase; margin-bottom: 16px;
        }
        .td-eyebrow::before { content: ''; width: 20px; height: 2px; background: #1360ee; border-radius: 2px; }

        .td-h1 {
          margin: 0; font-size: clamp(30px,4.2vw,52px); font-weight: 800;
          line-height: 1.08; letter-spacing: -.028em; color: #1d1d1f;
        }
        .td-lead {
          margin: 20px 0 0; max-width: 50ch;
          font-size: clamp(14px,1.3vw,16.5px); line-height: 1.7; color: #52525e;
        }

        .td-cta-row { display: flex; gap: 14px; margin-top: 30px; }
        .td-btn {
          font-family: inherit; font-weight: 700; cursor: pointer;
          padding: clamp(14px,1.6vw,17px) clamp(18px,2vw,24px); border-radius: 12px; border: none;
          transition: .18s ${EASE}; display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none; font-size: clamp(13.5px,1.15vw,15px);
        }
        .td-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.28); }
        .td-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 28px rgba(19,96,238,.38); }
        .td-btn-primary svg { transition: transform .2s ${EASE}; }
        .td-btn-primary:hover svg { transform: translateX(3px); }
        .td-btn-secondary { background: #fff; color: #1360ee; border: 1.5px solid #dbe4fb; }
        .td-btn-secondary:hover { border-color: #1360ee; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(19,96,238,.15); }
        @media (max-width: 560px) { .td-cta-row { flex-direction: column; } .td-btn { justify-content: center; } }

        /* ── Montage: staggered product tiles fill the right column ── */
        .td-montage { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(12px,1.6vw,20px); }
        .td-tile {
          position: relative; aspect-ratio: 1 / 1; border-radius: 20px;
          background: #f7f9fd; border: 1px solid #e7ebf3;
          display: grid; place-items: center; padding: clamp(14px,2vw,26px);
          transition: transform .4s ${EASE}, box-shadow .4s ${EASE}, border-color .4s ${EASE};
        }
        /* Offset the second column to break the flat grid. */
        .td-tile:nth-child(2), .td-tile:nth-child(4) { transform: translateY(clamp(18px,2.6vw,34px)); }
        .td-tile:hover { border-color: #c9d8f8; box-shadow: 0 26px 50px -26px rgba(20,40,90,.34); }
        .td-tile:nth-child(2):hover, .td-tile:nth-child(4):hover { transform: translateY(clamp(14px,2.2vw,28px)); }
        .td-tile:nth-child(1):hover, .td-tile:nth-child(3):hover { transform: translateY(-4px); }
        .td-tile img { width: 100%; height: 100%; object-fit: contain; }

        /* ── Stat band, full width under the hero ── */
        .td-stats-band { border-top: 1px solid #e7ebf3; background: #fff; }
        .td-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          max-width: 1280px; margin: 0 auto; padding: 0 28px;
        }
        @media (max-width: 700px) { .td-stats { grid-template-columns: 1fr; } }
        .td-stat { padding: clamp(24px,3vw,34px) clamp(20px,2.4vw,32px); border-left: 1px solid #e7ebf3; }
        .td-stat:first-child { border-left: none; padding-left: 0; }
        @media (max-width: 700px) {
          .td-stat { border-left: none; border-top: 1px solid #e7ebf3; padding-left: 0; }
          .td-stat:first-child { border-top: none; }
        }
        .td-stat-n { font-size: clamp(26px,3vw,38px); font-weight: 800; letter-spacing: -.03em; color: #1d1d1f; line-height: 1; }
        .td-stat-l { margin-top: 10px; font-size: 13px; line-height: 1.5; color: #6e6e73; font-weight: 600; max-width: 26ch; }
      `}</style>

      <section className="td-hero">
        <SoftwareNavbar />

        <div className="td-topbar">
          <a href="tel:+971508746688" className="td-phone-top">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            050 874 66 88
          </a>
        </div>

        <div className="td-grid">
          <div data-reveal="left">
            <Link href="/service" className="td-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Service
            </Link>

            <span className="td-eyebrow">Tracking Devices &amp; Accessories</span>

            <h1 className="td-h1">The hardware behind every Locator install.</h1>

            <p className="td-lead">
              A great platform always needs a great set of hardware to work with. Certified GPS terminals,
              driver-ID readers, and sensors — supplied, installed, and configured by our own engineers.
            </p>

            <div className="td-cta-row">
              <Link href="/contact" className="td-btn td-btn-primary">
                Request device pricing
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/contact" className="td-btn td-btn-secondary">Talk to an engineer</Link>
            </div>
          </div>

          <div className="td-montage" data-reveal="right">
            {MONTAGE.map((d) => (
              <div key={d.slug} className="td-tile">
                {d.image && (
                  <Image
                    src={d.image}
                    alt={d.name}
                    width={d.imageW ?? 600}
                    height={d.imageH ?? 600}
                    priority
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="td-stats-band">
        <div className="td-stats">
          {STATS.map((s) => (
            <div key={s.n} className="td-stat" data-reveal>
              <div className="td-stat-n">{s.n}</div>
              <div className="td-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
