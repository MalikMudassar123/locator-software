import Link from 'next/link'
import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function SecurepathHero() {
  return (
    <>
      <style>{`
        .sph-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #1360ee 0%, #1a5ff0 60%, #0d4fd4 100%);
          padding: clamp(16px,2vw,28px) 28px clamp(72px,9vw,110px);
        }
        .sph-hero-wave { position: absolute; left: 0; right: 0; bottom: -1px; line-height: 0; }

        .sph-topbar { display: flex; justify-content: flex-end; padding: 0 4px 8px; max-width: 1280px; margin: 0 auto; }
        .sph-phone-top {
          display: inline-flex; align-items: center; gap: 8px;
          color: #fff; font-size: 16px; font-weight: 800;
          text-decoration: none;
        }

        .sph-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(24px,4vw,48px);
          align-items: center; max-width: 1280px; margin: 0 auto;
        }
        @media (max-width: 940px) {
          .sph-grid { grid-template-columns: 1fr; }
          .sph-grid > div:first-child { text-align: center; }
          .sph-hero-cta-row { justify-content: center; margin-left: auto !important; margin-right: auto !important; }
        }

        .sph-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,.8); font-size: 13px; font-weight: 600;
          text-decoration: none; margin-bottom: 18px;
          transition: color .18s ease, gap .18s ease;
        }
        .sph-back:hover { color: #fff; gap: 9px; }

        .sph-btn {
          font-family: inherit; font-weight: 700; cursor: pointer;
          padding: clamp(14px,1.6vw,18px) clamp(20px,2.4vw,28px); border-radius: 12px; border: none;
          transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 12px; white-space: nowrap;
          text-decoration: none; background: #fff; color: #1d1d1f;
        }
        .sph-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(0,0,0,.18); }
        .sph-btn-icon {
          width: clamp(30px,3.2vw,36px); height: clamp(30px,3.2vw,36px); border-radius: 10px; flex-shrink: 0;
          display: grid; place-items: center; background: rgba(19,96,238,.12); color: #1360ee;
        }
        .sph-btn-icon svg { width: 15px; height: 15px; }
        .sph-btn-text { font-size: clamp(14px,1.2vw,16px); }
        @media (max-width: 640px) {
          .sph-hero-cta-row { flex-direction: column; align-items: stretch; }
          .sph-btn { justify-content: center; }
        }
      `}</style>

      <section className="sph-hero">
        <SoftwareNavbar />

        <div className="sph-topbar">
          <a href="tel:+971508746688" className="sph-phone-top">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            050 874 66 88
          </a>
        </div>

        <div className="sph-grid">
          <div data-reveal="left">
            <Link href="/regulatory" className="sph-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Regulatory GPS Certifications
            </Link>

            <h1 style={{ margin: 0, maxWidth: '620px', fontSize: 'clamp(32px,4.4vw,58px)', fontWeight: 700, lineHeight: 1.14, color: '#fff' }}>
              <span style={{ color: '#f15a24', fontWeight: 800 }}>SecurePath:</span> Your Trusted and Approved Vendor for Reliable GPS Solutions
            </h1>

            <p style={{ margin: '20px 0 0', maxWidth: '460px', fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.6, color: 'rgba(255,255,255,.82)' }}>
              Try Out SecurePath GPS System from LOCATOR Today
            </p>

            <div className="sph-hero-cta-row" style={{ display: 'flex', gap: '14px', marginTop: '32px' }}>
              <Link href="/contact" className="sph-btn">
                <span className="sph-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" />
                  </svg>
                </span>
                <span className="sph-btn-text">Get a Free Quote</span>
              </Link>
              <Link href="/contact" className="sph-btn">
                <span className="sph-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                <span className="sph-btn-text">Get a Free Demo</span>
              </Link>
            </div>
          </div>

          <div data-reveal="right">
            <Image
              src="/regulatory/securepath/vehicle tracker.png"
              alt="SecurePath GPS tracking — Dubai fleet monitoring illustration"
              width={1839}
              height={1086}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </div>

        <div className="sph-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
            <path d="M0,50 C280,100 420,0 720,20 C1020,40 1180,90 1440,40 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>
    </>
  )
}
