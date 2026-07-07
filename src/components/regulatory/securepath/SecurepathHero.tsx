import Link from 'next/link'
import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function SecurepathHero() {
  return (
    <>
      <style>{`
        .sp-hero { position: relative; background: #ffffff; padding: clamp(16px,2vw,28px) 28px clamp(56px,7vw,80px); overflow: hidden; }
        .sp-glow { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; z-index: 0; }

        .sp-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6e6e73; font-size: 13px; font-weight: 600;
          text-decoration: none; margin-bottom: 18px;
          transition: color .18s ease, gap .18s ease;
        }
        .sp-back:hover { color: #1360ee; gap: 9px; }

        .sp-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(32px,5vw,64px);
          align-items: center; max-width: 1200px; margin: 0 auto;
        }
        @media (max-width: 940px) {
          .sp-grid { grid-template-columns: 1fr; }
          .sp-grid > div:first-child { text-align: center; }
          .sp-hero-cta-row { justify-content: center; }
        }

        .sp-btn {
          font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
          padding: 14px 26px; border-radius: 999px; border: none;
          transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; text-decoration: none;
        }
        .sp-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.3); }
        .sp-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 28px rgba(19,96,238,.4); }
        .sp-btn-ghost { background: #fff; color: #1d1d1f; border: 1.5px solid #e3e3e6; }
        .sp-btn-ghost:hover { border-color: #1360ee; color: #1360ee; transform: translateY(-1px); }

        .sp-phone-link {
          display: inline-flex; align-items: center; gap: 8px;
          color: #52525e; font-size: 13.5px; font-weight: 600;
          text-decoration: none; transition: color .18s ease;
        }
        .sp-phone-link:hover { color: #1360ee; }

        .sp-frame {
          position: relative; border-radius: 20px; overflow: hidden;
          border: 1px solid #e7ebf3; background: #fff;
          box-shadow: 0 40px 80px -30px rgba(20,40,90,.35), 0 4px 16px rgba(20,40,90,.08);
        }
        .sp-badge {
          position: absolute; display: inline-flex; align-items: center; gap: 6px;
          background: #fff; border: 1px solid #e4e4e8; border-radius: 999px;
          padding: 9px 16px; font-size: 12.5px; font-weight: 700; color: #1d1d1f;
          box-shadow: 0 10px 26px rgba(0,0,0,.12); white-space: nowrap;
        }
        .sp-badge-cert { top: -16px; right: 20px; color: #13923f; }
        .sp-badge-stat { bottom: -16px; left: 20px; color: #1360ee; }
        @media (max-width: 560px) {
          .sp-badge { font-size: 11px; padding: 7px 12px; }
        }
      `}</style>

      <section className="sp-hero">
        <div className="sp-glow" style={{ width: 520, height: 420, top: 40, right: '6%', background: 'radial-gradient(60% 60% at 50% 50%, rgba(19,96,238,.09), transparent 72%)' }} />

        <SoftwareNavbar />

        <div className="sp-grid">
          {/* Left: copy */}
          <div data-reveal="left">
            <Link href="/regulatory" className="sp-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Regulatory GPS Certifications
            </Link>

            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '.09em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              display: 'block', marginBottom: '14px',
            }}>
              Regulatory GPS Certification
            </span>

            <h1 style={{ margin: 0, fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              <span style={{ color: '#1360ee' }}>SecurePath:</span> Your Trusted and Approved Vendor for Reliable GPS Solutions
            </h1>

            <p style={{ margin: '18px 0 0', maxWidth: '480px', fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.65, color: '#52525e' }}>
              Try the SecurePath GPS system from LOCATOR today — SIRA-compliant tracking, geofencing, and reporting for rental and security-related vehicles.
            </p>

            <div className="sp-hero-cta-row" style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="sp-btn sp-btn-primary">Get a Free Quote</Link>
              <Link href="/contact" className="sp-btn sp-btn-ghost">Get a Free Demo</Link>
            </div>

            <a href="tel:+971508746688" className="sp-phone-link" style={{ marginTop: '22px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call us: 050 874 66 88
            </a>
          </div>

          {/* Right: visual */}
          <div data-reveal="right" style={{ position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="sp-frame">
              <Image
                src="/hero/web-route-playback.png"
                alt="Locator route playback — SecurePath-compliant GPS tracking"
                width={1400}
                height={1284}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
            <span className="sp-badge sp-badge-cert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              SecurePath Approved
            </span>
            <span className="sp-badge sp-badge-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Real-Time Geofencing
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
