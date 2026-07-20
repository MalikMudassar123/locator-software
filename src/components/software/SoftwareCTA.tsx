import Link from 'next/link'

export default function SoftwareCTA() {
  return (
    <>
      <style>{`
        .cta-wrap {
          position: relative;
          border-radius: 34px;
          overflow: hidden;
          isolation: isolate;
          background: #0f1117;
          padding: clamp(56px,7vw,88px) 32px;
          text-align: center;
          color: #fff;
        }
        .cta-wrap::before { content: none; }
        .cta-wrap::after { content: none; }

        /* Orbital ring decorations */
        @keyframes ctaRing {
          0%,100% { opacity:.07; transform:scale(1) rotate(0deg); }
          50%      { opacity:.13; transform:scale(1.05) rotate(180deg); }
        }
        .cta-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.12);
          pointer-events: none;
          animation: ctaRing 12s linear infinite;
        }

        /* Buttons */
        .cta-btn {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: inherit; font-size: 14px; font-weight: 700;
          padding: 13px 26px; border-radius: 999px;
          text-decoration: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          white-space: nowrap;
        }
        .cta-btn-primary {
          background: #fff; color: #1360ee;
        }
        .cta-btn-primary:hover { background: #f0f4ff; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .cta-btn-ghost {
          background: rgba(255,255,255,.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,.2);
        }
        .cta-btn-ghost:hover { background: rgba(255,255,255,.14); transform: translateY(-1px); }
      `}</style>

      <section style={{ padding: 'clamp(40px,5vw,56px) 28px clamp(56px,7vw,80px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="cta-wrap">

            {/* Decorative rings */}
            <div className="cta-ring" style={{ width: '480px', height: '480px', left: '-160px', top: '-160px', animationDelay: '0s' }} />
            <div className="cta-ring" style={{ width: '320px', height: '320px', left: '-80px', top: '-80px', animationDuration: '9s', animationDelay: '-4s' }} />
            <div className="cta-ring" style={{ width: '420px', height: '420px', right: '-120px', bottom: '-140px', animationDelay: '-6s' }} />
            <div className="cta-ring" style={{ width: '260px', height: '260px', right: '-60px', bottom: '-60px', animationDuration: '8s', animationDelay: '-2s' }} />

            <div data-reveal="zoom" style={{ position: 'relative', zIndex: 1 }}>
              {/* Tag */}
              <span style={{ display: 'block', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: 'rgba(255,255,255,.85)', marginBottom: '16px', textTransform: 'uppercase' }}>
                <span style={{ display: 'block', marginBottom: '12px' }}>
                  <span style={{ display: 'inline-block', width: '34px', height: '3px', background: 'rgba(255,255,255,.5)', borderRadius: '2px' }} />
                </span>
                Get Started Today
              </span>

              <h2 style={{ fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, letterSpacing: '-.015em', color: '#fff', lineHeight: 1.25, maxWidth: '26ch', margin: '0 auto 16px' }}>
                Put your whole fleet on one platform.
              </h2>

              <p style={{ margin: '0 auto', maxWidth: '480px', fontSize: 'clamp(14px,1.45vw,16px)', color: 'rgba(255,255,255,.76)', lineHeight: 1.65 }}>
                Get a quote, book a live demo, and see Locator running on your own vehicles within days.
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="cta-btn cta-btn-primary">
                  Get a quote
                </Link>
                <Link href="/contact" className="cta-btn cta-btn-ghost">
                  Book a live demo →
                </Link>
              </div>

              {/* Trust row */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '36px', flexWrap: 'wrap' }}>
                {[
                  { icon: '✓', text: 'No long-term contract' },
                  { icon: '✓', text: 'Setup within 48 hours' },
                  { icon: '✓', text: 'Dedicated support team' },
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', color: 'rgba(255,255,255,.72)', fontWeight: 500 }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 800, flexShrink: 0, color: '#fff' }}>{t.icon}</span>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
