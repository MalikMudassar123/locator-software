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
          /* Same teal→blue gradient as the site footer */
          background: linear-gradient(180deg, #97def1 0%, #3abede 22%, #0a84e3 55%, #1360ee 82%, #062a8a 100%);
          padding: clamp(56px,7vw,88px) 32px;
          text-align: center;
          color: #fff;
        }
        /* Radial accent stack matching the footer's glow patches */
        .cta-wrap::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(38% 34% at 6% 4%, rgba(193,235,247,0.55) 0%, rgba(193,235,247,0) 65%),
            radial-gradient(34% 30% at 96% 6%, rgba(58,190,222,0.4) 0%, rgba(58,190,222,0) 65%),
            radial-gradient(46% 42% at 4% 96%, rgba(13,47,165,0.4) 0%, rgba(13,47,165,0) 65%),
            radial-gradient(38% 34% at 96% 96%, rgba(13,47,165,0.3) 0%, rgba(13,47,165,0) 65%);
        }
        /* Fine dot texture (matches footer grid) */
        .cta-wrap::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Orbital ring decorations */
        @keyframes ctaRing {
          0%,100% { opacity:.12; transform:scale(1) rotate(0deg); }
          50%      { opacity:.22; transform:scale(1.05) rotate(180deg); }
        }
        .cta-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.2);
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
          background: rgba(255,255,255,.12);
          color: #fff;
          border: 1px solid rgba(255,255,255,.3);
          backdrop-filter: blur(8px);
        }
        .cta-btn-ghost:hover { background: rgba(255,255,255,.2); transform: translateY(-1px); }
      `}</style>

      <section style={{ padding: 'clamp(40px,5vw,56px) 28px clamp(56px,7vw,80px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="cta-wrap">

            {/* Decorative rings */}
            <div className="cta-ring" style={{ width: '480px', height: '480px', left: '-160px', top: '-160px', animationDelay: '0s' }} />
            <div className="cta-ring" style={{ width: '320px', height: '320px', left: '-80px', top: '-80px', animationDuration: '9s', animationDelay: '-4s' }} />
            <div className="cta-ring" style={{ width: '420px', height: '420px', right: '-120px', bottom: '-140px', animationDelay: '-6s' }} />
            <div className="cta-ring" style={{ width: '260px', height: '260px', right: '-60px', bottom: '-60px', animationDuration: '8s', animationDelay: '-2s' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Tag */}
              <span style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.06em', color: 'rgba(255,255,255,.78)', marginBottom: '20px', textTransform: 'uppercase', background: 'rgba(255,255,255,.15)', borderRadius: '999px', padding: '5px 16px', border: '1px solid rgba(255,255,255,.24)' }}>
                Get Started Today
              </span>

              <h2 style={{ fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, letterSpacing: '-.025em', color: '#fff', lineHeight: 1.08, maxWidth: '18ch', margin: '0 auto 16px' }}>
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
