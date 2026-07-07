import Link from 'next/link'

export default function AsateelCTA() {
  return (
    <>
      <style>{`
        .asa-cta-wrap {
          position: relative;
          border-radius: 34px;
          overflow: hidden;
          isolation: isolate;
          background: #0f1117;
          padding: clamp(56px,7vw,88px) 32px;
          text-align: center;
          color: #fff;
        }

        @keyframes asaCtaRing {
          0%,100% { opacity:.07; transform:scale(1) rotate(0deg); }
          50%      { opacity:.13; transform:scale(1.05) rotate(180deg); }
        }
        .asa-cta-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.12);
          pointer-events: none;
          animation: asaCtaRing 12s linear infinite;
        }

        .asa-cta-btn {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: inherit; font-size: 14px; font-weight: 700;
          padding: 13px 26px; border-radius: 999px;
          text-decoration: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          white-space: nowrap;
        }
        .asa-cta-btn-primary { background: #fff; color: #1360ee; }
        .asa-cta-btn-primary:hover { background: #f0f4ff; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .asa-cta-btn-ghost { background: rgba(255,255,255,.08); color: #fff; border: 1px solid rgba(255,255,255,.2); }
        .asa-cta-btn-ghost:hover { background: rgba(255,255,255,.14); transform: translateY(-1px); }
      `}</style>

      <section style={{ padding: 'clamp(40px,5vw,56px) 28px clamp(56px,7vw,80px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="asa-cta-wrap">

            <div className="asa-cta-ring" style={{ width: '480px', height: '480px', left: '-160px', top: '-160px', animationDelay: '0s' }} />
            <div className="asa-cta-ring" style={{ width: '320px', height: '320px', left: '-80px', top: '-80px', animationDuration: '9s', animationDelay: '-4s' }} />
            <div className="asa-cta-ring" style={{ width: '420px', height: '420px', right: '-120px', bottom: '-140px', animationDelay: '-6s' }} />
            <div className="asa-cta-ring" style={{ width: '260px', height: '260px', right: '-60px', bottom: '-60px', animationDuration: '8s', animationDelay: '-2s' }} />

            <div data-reveal="zoom" style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.06em', color: 'rgba(255,255,255,.6)', marginBottom: '20px', textTransform: 'uppercase', background: 'rgba(255,255,255,.08)', borderRadius: '999px', padding: '5px 16px', border: '1px solid rgba(255,255,255,.14)' }}>
                Get Certified
              </span>

              <h2 style={{ fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, letterSpacing: '-.025em', color: '#fff', lineHeight: 1.1, maxWidth: '22ch', margin: '0 auto 16px' }}>
                Hire a Reliable ASATEEL Certified OBU Installer
              </h2>

              <p style={{ margin: '0 auto', maxWidth: '480px', fontSize: 'clamp(14px,1.45vw,16px)', color: 'rgba(255,255,255,.76)', lineHeight: 1.65 }}>
                Competitive pricing, exceptional support, and seamless software integrations — everything you need to stay compliant with ASATEEL regulations.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="asa-cta-btn asa-cta-btn-primary">
                  Get a Free Quote
                </Link>
                <a href="tel:+971508746688" className="asa-cta-btn asa-cta-btn-ghost">
                  Call 050 874 66 88
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
