import Link from 'next/link'
import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function SecurepathPremiumHero() {
  return (
    <>
      <style>{`
        .spp-hero { position: relative; background: #ffffff; padding: clamp(16px,2vw,28px) 28px clamp(56px,7vw,80px); overflow: hidden; }
        .spp-glow { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; z-index: 0; }

        .spp-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6e6e73; font-size: 13px; font-weight: 600;
          text-decoration: none; margin-bottom: 18px;
          transition: color .18s ease, gap .18s ease;
        }
        .spp-back:hover { color: #1360ee; gap: 9px; }

        .spp-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.15fr 0.85fr; gap: clamp(32px,5vw,64px);
          align-items: center; max-width: 1200px; margin: 0 auto;
        }
        @media (max-width: 940px) {
          .spp-grid { grid-template-columns: 1fr; }
          .spp-grid > div:first-child { text-align: center; }
          .spp-hero-cta-row { justify-content: center; }
        }

        .spp-btn {
          font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
          padding: 14px 26px; border-radius: 999px; border: none;
          transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; text-decoration: none;
        }
        .spp-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.3); }
        .spp-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 28px rgba(19,96,238,.4); }
        .spp-btn-ghost { background: #fff; color: #1d1d1f; border: 1.5px solid #e3e3e6; }
        .spp-btn-ghost:hover { border-color: #1360ee; color: #1360ee; transform: translateY(-1px); }

        .spp-phone-link {
          display: inline-flex; align-items: center; gap: 8px;
          color: #52525e; font-size: 13.5px; font-weight: 600;
          text-decoration: none; transition: color .18s ease;
        }
        .spp-phone-link:hover { color: #1360ee; }

        .spp-phone-frame {
          position: relative; max-width: 280px; margin: 0 auto;
          filter: drop-shadow(0 30px 50px rgba(20,40,90,.3));
        }
        .spp-badge {
          position: absolute; display: inline-flex; align-items: center; gap: 6px;
          background: #fff; border: 1px solid #e4e4e8; border-radius: 999px;
          padding: 9px 16px; font-size: 12.5px; font-weight: 700; color: #1d1d1f;
          box-shadow: 0 10px 26px rgba(0,0,0,.12); white-space: nowrap; z-index: 2;
        }
        .spp-badge-cert { top: 10px; right: -30px; color: #13923f; }
        .spp-badge-stat { bottom: 60px; left: -30px; color: #1360ee; }
        @media (max-width: 560px) {
          .spp-badge { font-size: 11px; padding: 7px 12px; }
          .spp-badge-cert { right: -10px; }
          .spp-badge-stat { left: -10px; }
        }
      `}</style>

      <section className="spp-hero">
        <div className="spp-glow" style={{ width: 520, height: 420, top: 40, right: '6%', background: 'radial-gradient(60% 60% at 50% 50%, rgba(19,96,238,.09), transparent 72%)' }} />

        <SoftwareNavbar />

        <div className="spp-grid">
          {/* Left: copy */}
          <div data-reveal="left">
            <Link href="/regulatory" className="spp-back">
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
              <span style={{ color: '#1360ee' }}>SecurePath Premium:</span> Your Hassle-Free and Reliable GPS Solution Provider in Dubai
            </h1>

            <p style={{ margin: '18px 0 0', maxWidth: '480px', fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.65, color: '#52525e' }}>
              A mandatory SIRA registration for selected Dubai businesses — fully managed GPS tracker installation, certification, and real-time fleet monitoring.
            </p>

            <div className="spp-hero-cta-row" style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="spp-btn spp-btn-primary">Get a Free Quote</Link>
              <Link href="/contact" className="spp-btn spp-btn-ghost">Get Registration Advice</Link>
            </div>

            <a href="tel:+971508746688" className="spp-phone-link" style={{ marginTop: '22px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call us: 050 874 66 88
            </a>
          </div>

          {/* Right: visual */}
          <div data-reveal="right" style={{ position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="spp-phone-frame">
              <Image
                src="/hero/mobile-dashboard.png"
                alt="Locator mobile dashboard — SecurePath Premium GPS tracking"
                width={700}
                height={1504}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '32px' }}
                priority
              />
              <span className="spp-badge spp-badge-cert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                SIRA Approved
              </span>
              <span className="spp-badge spp-badge-stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="8" width="12" height="12" rx="2" />
                  <path d="M11 8V4M17 8V4M11 24v-4M17 24v-4M8 11H4M8 17H4M24 11h-4M24 17h-4" />
                </svg>
                FMC150 Certified
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
