import Link from 'next/link'

export default function SecurepathPremiumCTA() {
  return (
    <>
      <style>{`
        .sppc-wrap {
          position: relative;
          border-radius: 34px;
          overflow: hidden;
          isolation: isolate;
          background: #0f1117;
          padding: clamp(56px,7vw,88px) 32px;
          text-align: center;
          color: #fff;
        }

        @keyframes sppcRing {
          0%,100% { opacity:.07; transform:scale(1) rotate(0deg); }
          50%      { opacity:.13; transform:scale(1.05) rotate(180deg); }
        }
        .sppc-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.12);
          pointer-events: none;
          animation: sppcRing 12s linear infinite;
        }

        .sppc-btn {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: inherit; font-size: 14px; font-weight: 700;
          padding: 13px 26px; border-radius: 999px;
          text-decoration: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          white-space: nowrap;
        }
        .sppc-btn-primary { background: #fff; color: #1360ee; }
        .sppc-btn-primary:hover { background: #f0f4ff; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .sppc-btn-ghost { background: rgba(255,255,255,.08); color: #fff; border: 1px solid rgba(255,255,255,.2); }
        .sppc-btn-ghost:hover { background: rgba(255,255,255,.14); transform: translateY(-1px); }
      `}</style>

      <section style={{ padding: 'clamp(40px,5vw,56px) 28px clamp(56px,7vw,80px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="sppc-wrap">

            <div className="sppc-ring" style={{ width: '480px', height: '480px', left: '-160px', top: '-160px', animationDelay: '0s' }} />
            <div className="sppc-ring" style={{ width: '320px', height: '320px', left: '-80px', top: '-80px', animationDuration: '9s', animationDelay: '-4s' }} />
            <div className="sppc-ring" style={{ width: '420px', height: '420px', right: '-120px', bottom: '-140px', animationDelay: '-6s' }} />
            <div className="sppc-ring" style={{ width: '260px', height: '260px', right: '-60px', bottom: '-60px', animationDuration: '8s', animationDelay: '-2s' }} />

            <div data-reveal="zoom" style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.06em', color: 'rgba(255,255,255,.6)', marginBottom: '20px', textTransform: 'uppercase', background: 'rgba(255,255,255,.08)', borderRadius: '999px', padding: '5px 16px', border: '1px solid rgba(255,255,255,.14)' }}>
                Conclusion
              </span>

              <h2 style={{ fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, letterSpacing: '-.025em', color: '#fff', lineHeight: 1.1, maxWidth: '22ch', margin: '0 auto 16px' }}>
                Get Your SecurePath Premium Certification, Hassle-Free
              </h2>

              <p style={{ margin: '0 auto', maxWidth: '520px', fontSize: 'clamp(14px,1.45vw,16px)', color: 'rgba(255,255,255,.76)', lineHeight: 1.65 }}>
                SecurePath Premium offers a GPS tracking solution approved by SIRA in Dubai. With strict installation requirements from approved vendors, it ensures your business stays aligned with government regulations — our dedicated team is here to help.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="sppc-btn sppc-btn-primary">
                  Get a Free Quote
                </Link>
                <a href="tel:+971508746688" className="sppc-btn sppc-btn-ghost">
                  Call 050 874 66 88
                </a>
              </div>

              <p style={{ margin: '24px 0 0', fontSize: '13px', color: 'rgba(255,255,255,.5)' }}>
                Or reach us anytime at{' '}
                <a href="tel:+97143547766" style={{ color: 'rgba(255,255,255,.85)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  04 354 7766
                </a>
                {' '}or{' '}
                <a href="mailto:info@locator.ae" style={{ color: 'rgba(255,255,255,.85)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  info@locator.ae
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
