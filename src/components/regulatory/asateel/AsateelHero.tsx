import Link from 'next/link'
import Image from 'next/image'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function AsateelHero() {
  return (
    <>
      <style>{`
        .asa-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #1360ee 0%, #1a5ff0 60%, #0d4fd4 100%);
          padding: clamp(16px,2vw,28px) 28px clamp(72px,9vw,110px);
        }
        .asa-hero-wave { position: absolute; left: 0; right: 0; bottom: -1px; line-height: 0; }

        .asa-topbar { display: flex; justify-content: flex-end; padding: 0 4px 8px; max-width: var(--w-1280); margin: 0 auto; }
        .asa-phone-top {
          display: inline-flex; align-items: center; gap: 8px;
          color: #fff; font-size: var(--f-16); font-weight: 800;
          text-decoration: none;
        }

        .asa-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(24px,4vw,48px);
          align-items: center; max-width: var(--w-1280); margin: 0 auto;
        }
        @media (max-width: 940px) {
          .asa-grid { grid-template-columns: 1fr; }
          .asa-grid > div:first-child { text-align: center; }
          .asa-hero-cta-row { justify-content: center; margin-left: auto !important; margin-right: auto !important; }
        }

        .asa-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,.8); font-size: var(--f-13); font-weight: 600;
          text-decoration: none; margin-bottom: 18px;
          transition: color .18s ease, gap .18s ease;
        }
        .asa-back:hover { color: #fff; gap: 9px; }

        .asa-btn {
          font-family: inherit; font-weight: 700; cursor: pointer;
          padding: clamp(14px,1.6vw,18px) clamp(16px,2vw,22px); border-radius: 12px; border: none;
          transition: .18s ${EASE};
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; background: #fff; color: #1d1d1f;
          flex: 1 1 0; min-width: 0;
        }
        .asa-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(0,0,0,.18); }
        .asa-btn-icon {
          width: clamp(30px,3.2vw,36px); height: clamp(30px,3.2vw,36px); border-radius: 10px; flex-shrink: 0;
          display: grid; place-items: center; background: rgba(19,96,238,.12); color: #1360ee;
        }
        .asa-btn-icon svg { width: 15px; height: 15px; }
        .asa-btn-text { font-size: max(clamp(13.5px,1.15vw,15px), min(1.042vw, 21.75px)); line-height: 1.35; text-align: left; }
        @media (max-width: 640px) {
          .asa-hero-cta-row { flex-direction: column; }
          .asa-btn { flex: none; width: 100%; }
        }
      `}</style>

      <section className="asa-hero">
        <SoftwareNavbar />

        <div className="asa-topbar">
          <a href="tel:+971508746688" className="asa-phone-top">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            050 874 66 88
          </a>
        </div>

        <div className="asa-grid">
          <div data-reveal="left">
            <Link href="/regulatory" className="asa-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Regulatory GPS Certifications
            </Link>

            <h1 style={{ margin: 0, fontSize: 'max(clamp(28px,3.8vw,44px), min(3.056vw, 63.8px))', fontWeight: 700, lineHeight: 1.14, color: '#fff' }}>
              A Reliable <span style={{ color: '#fff', fontWeight: 800 }}>ASATEEL</span> Certified OBU Installation Company
            </h1>

            <div className="asa-hero-cta-row" style={{ display: 'flex', gap: '14px', marginTop: '32px', maxWidth: '620px' }}>
              <Link href="/contact" className="asa-btn">
                <span className="asa-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" />
                  </svg>
                </span>
                <span className="asa-btn-text">Get a Free Quote for ASATEEL Certified OBU</span>
              </Link>
              <Link href="/contact" className="asa-btn">
                <span className="asa-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                <span className="asa-btn-text">Get an Advice on ASATEEL Account Creation</span>
              </Link>
            </div>
          </div>

          <div data-reveal="right">
            <Image
              src="/regulatory/asateel-certified/ITC-ASATEEL.svg"
              alt="ASATEEL certified fleet tracking — Abu Dhabi city illustration"
              width={1855}
              height={1206}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </div>

        <div className="asa-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
            <path d="M0,50 C280,100 420,0 720,20 C1020,40 1180,90 1440,40 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>
    </>
  )
}
