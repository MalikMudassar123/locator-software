import Link from 'next/link'
import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function SecurepathPremiumHero() {
  return (
    <>
      <style>{`
        .spp-hero { position: relative; background: #ffffff; padding: clamp(16px,2vw,28px) 28px clamp(56px,7vw,80px); overflow: hidden; }

        .spp-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6e6e73; font-size: 13px; font-weight: 600;
          text-decoration: none; margin-bottom: 18px;
          transition: color .18s ease, gap .18s ease;
        }
        .spp-back:hover { color: #1360ee; gap: 9px; }

        .spp-topbar { display: flex; justify-content: flex-end; padding: 0 4px 8px; max-width: 1200px; margin: 0 auto; }
        .spp-phone-top {
          display: inline-flex; align-items: center; gap: 8px;
          color: #1360ee; font-size: 16px; font-weight: 800;
          text-decoration: none;
        }

        .spp-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(24px,4vw,48px);
          align-items: center; max-width: 1280px; margin: 0 auto;
        }
        @media (max-width: 940px) {
          .spp-grid { grid-template-columns: 1fr; }
          .spp-grid > div:first-child { text-align: center; }
          .spp-hero-cta-row { justify-content: center; }
        }

        .spp-btn {
          font-family: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer;
          padding: 13px 18px; border-radius: 10px; border: none;
          transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 9px; white-space: nowrap; text-decoration: none;
        }
        .spp-btn-primary { background: #f15a24; color: #fff; box-shadow: 0 10px 24px rgba(241,90,36,.28); }
        .spp-btn-primary:hover { background: #d94a17; transform: translateY(-1px); box-shadow: 0 12px 28px rgba(241,90,36,.38); }
        .spp-btn-secondary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.28); }
        .spp-btn-secondary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 28px rgba(19,96,238,.38); }
        .spp-btn-icon {
          width: 22px; height: 22px; border-radius: 5px; flex-shrink: 0;
          display: grid; place-items: center; background: rgba(255,255,255,.22);
        }
      `}</style>

      <section className="spp-hero">
        <SoftwareNavbar />

        <div className="spp-topbar">
          <a href="tel:+971508746688" className="spp-phone-top">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            050 874 66 88
          </a>
        </div>

        <div className="spp-grid">
          {/* Left: copy */}
          <div data-reveal="left">
            <Link href="/regulatory" className="spp-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Regulatory GPS Certifications
            </Link>

            <h1 style={{ margin: 0, fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              <span style={{ color: '#f15a24' }}>SecurePath Premium:</span> Your Hassle-Free and Reliable GPS Solution Provider in Dubai
            </h1>

            <div className="spp-hero-cta-row" style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="spp-btn spp-btn-primary">
                <span className="spp-btn-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" />
                  </svg>
                </span>
                Get a Free Quote for SecurePath Premium Implementation
              </Link>
              <Link href="/contact" className="spp-btn spp-btn-secondary">
                <span className="spp-btn-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                Get an Advice on SecurePath Premium Registration
              </Link>
            </div>
          </div>

          {/* Right: illustration */}
          <div data-reveal="right" style={{ position: 'relative' }}>
            <Image
              src="/regulatory/Secure_path_preimume/SecurePath-Premium.png"
              alt="SecurePath Premium GPS tracking — commercial fleet illustration"
              width={1344}
              height={959}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </div>
      </section>
    </>
  )
}
