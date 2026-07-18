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
          .spp-hero-cta-row { justify-content: center; margin-left: auto !important; margin-right: auto !important; }
        }

        .spp-btn {
          font-family: inherit; font-weight: 700; cursor: pointer;
          padding: clamp(14px,1.6vw,18px) clamp(16px,2vw,22px); border-radius: 12px; border: none;
          transition: .18s ${EASE};
          display: flex; align-items: center; gap: 12px; text-decoration: none;
          flex: 1 1 0; min-width: 0;
        }
        .spp-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.28); }
        .spp-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 28px rgba(19,96,238,.38); }
        .spp-btn-secondary { background: #fff; color: #1360ee; border: 1.5px solid #dbe4fb; box-shadow: 0 2px 10px rgba(0,0,0,.04); }
        .spp-btn-secondary:hover { border-color: #1360ee; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(19,96,238,.15); }
        .spp-btn-icon {
          width: clamp(30px,3.2vw,36px); height: clamp(30px,3.2vw,36px); border-radius: 10px; flex-shrink: 0;
          display: grid; place-items: center;
        }
        .spp-btn-primary .spp-btn-icon { background: rgba(255,255,255,.22); color: #fff; }
        .spp-btn-secondary .spp-btn-icon { background: rgba(19,96,238,.1); color: #1360ee; }
        .spp-btn-icon svg { width: 15px; height: 15px; }
        .spp-btn-text { font-size: clamp(13.5px,1.15vw,15px); line-height: 1.35; text-align: left; }
        @media (max-width: 640px) {
          .spp-hero-cta-row { flex-direction: column; }
          .spp-btn { flex: none; width: 100%; }
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

            <h1 style={{ margin: 0, maxWidth: '620px', fontSize: 'clamp(32px,4.4vw,58px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              <span style={{ color: '#1360ee' }}>SecurePath Premium:</span> Your Hassle-Free and Reliable GPS Solution Provider in Dubai
            </h1>

            <div className="spp-hero-cta-row" style={{ display: 'flex', gap: '14px', marginTop: '32px', maxWidth: '620px' }}>
              <Link href="/contact" className="spp-btn spp-btn-primary">
                <span className="spp-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" />
                  </svg>
                </span>
                <span className="spp-btn-text">Get a Free Quote for SecurePath Premium Implementation</span>
              </Link>
              <Link href="/contact" className="spp-btn spp-btn-secondary">
                <span className="spp-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                <span className="spp-btn-text">Get an Advice on SecurePath Premium Registration</span>
              </Link>
            </div>
          </div>

          {/* Right: illustration */}
          <div data-reveal="right" style={{ position: 'relative' }}>
            <Image
              src="/regulatory/Secure_path_preimume/SecurePath-Premium.webp"
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
