'use client'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function CarGpsHero() {
  return (
    <>
      <style>{`
        @keyframes cghRise { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes cghFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        .cgh-hero { position: relative; overflow: hidden; background: #ffffff; }
        .cgh-grid {
          position: relative; z-index: 1; max-width: 1200px; margin: 0 auto;
          padding: clamp(32px,6vh,64px) 28px clamp(64px,9vh,96px);
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(28px,5vw,56px); align-items: center;
        }
        @media (max-width: 900px) {
          .cgh-grid { grid-template-columns: 1fr; text-align: center; }
          .cgh-copy-align { align-items: center !important; }
          .cgh-btns { justify-content: center !important; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .cgh-copy { animation: cghRise .85s ${EASE} .05s both; }
          .cgh-viz  { animation: cghRise .9s ${EASE} .15s both; }
          .cgh-float { animation: cghFloat 5.5s ease-in-out infinite; }
        }
        .cgh-btn {
          font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
          padding: 13px 24px; border-radius: 999px; border: none; transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; text-decoration: none;
        }
        .cgh-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 26px rgba(19,96,238,.28); }
        .cgh-btn-primary:hover { background: #0d4fd4; transform: translateY(-2px); box-shadow: 0 14px 32px rgba(19,96,238,.36); }
        .cgh-btn-ghost { background: #fff; color: #1360ee; border: 1.5px solid #dbe3f5; }
        .cgh-btn-ghost:hover { border-color: #1360ee; transform: translateY(-2px); }
      `}</style>

      <section className="cgh-hero">
        <SoftwareNavbar />

        <div className="cgh-grid">
          {/* Copy */}
          <div className="cgh-copy cgh-copy-align" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1 style={{ margin: 0, fontSize: 'clamp(28px,3.8vw,42px)', fontWeight: 800, lineHeight: 1.22, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '16ch' }}>
              The best <span style={{ color: '#1360ee' }}>Car GPS Tracker</span> for maximum visibility
            </h1>
            <p style={{ margin: '18px 0 0', fontSize: 'clamp(14px,1.35vw,16.5px)', color: '#8a93a2', fontWeight: 600 }}>
              A perfect solution to monitor your vehicles
            </p>

            <div className="cgh-btns" style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <Link href="/get-a-quote" className="cgh-btn cgh-btn-primary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M8 11l2.5 2.5L16 8" /></svg>
                Get a free quote
              </Link>
              <Link href="/contact" className="cgh-btn cgh-btn-ghost">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21" /></svg>
                Get a free demo
              </Link>
            </div>
          </div>

          {/* Visual — a map card staged like a phone screen, floating on a soft blue field */}
          <div className="cgh-viz" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 'min(100%, 400px)', aspectRatio: '1 / 1', display: 'grid', placeItems: 'center' }}>
              {/* Soft blue blob backdrop */}
              <div aria-hidden="true" style={{ position: 'absolute', inset: '-4%', borderRadius: '46% 54% 58% 42% / 48% 44% 56% 52%', background: 'radial-gradient(circle at 40% 32%, #dbe9fd, #c7ddfb 70%)', zIndex: 0 }} />

              {/* Phone-style map card */}
              <div className="cgh-float" style={{
                position: 'relative', zIndex: 1, width: '68%', aspectRatio: '0.62 / 1',
                borderRadius: '26px', overflow: 'hidden', background: '#fff',
                border: '6px solid #fff', boxShadow: '0 40px 70px -26px rgba(19,96,238,.34), 0 4px 14px rgba(20,40,90,.08)',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,#dce8f4,#e8f2fb)' }} />
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
                  {[16, 34, 52, 70, 88].map(p => (<line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="rgba(255,255,255,.6)" strokeWidth="4" />))}
                  {[20, 40, 60, 80].map(p => (<line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="rgba(255,255,255,.6)" strokeWidth="4" />))}
                  <polyline points="18%,72% 34%,52% 52%,60% 70%,30%" stroke="#1360ee" strokeWidth="2.4" fill="none" strokeDasharray="7,4" strokeOpacity=".8" />
                </svg>
                {[
                  { l: '34%', t: '52%', c: '#1360ee', big: true },
                  { l: '70%', t: '30%', c: '#1fbf5b', big: false },
                  { l: '18%', t: '72%', c: '#6e6e73', big: false },
                ].map((p, i) => (
                  <div key={i} style={{ position: 'absolute', left: p.l, top: p.t, transform: 'translate(-50%,-100%)', zIndex: 2 }}>
                    <svg width={p.big ? 26 : 18} height={p.big ? 26 : 18} viewBox="0 0 24 24" fill={p.c}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                  </div>
                ))}
              </div>

              {/* Floating accent icons */}
              <div className="cgh-float" style={{ position: 'absolute', zIndex: 2, right: '2%', top: '10%', width: '48px', height: '48px', borderRadius: '14px', background: '#fff', boxShadow: '0 14px 28px rgba(15,23,42,.16)', display: 'grid', placeItems: 'center', animationDelay: '-1.5s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1360ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              </div>
              <div className="cgh-float" style={{ position: 'absolute', zIndex: 2, left: '0%', bottom: '6%', width: '48px', height: '48px', borderRadius: '14px', background: '#fff', boxShadow: '0 14px 28px rgba(15,23,42,.16)', display: 'grid', placeItems: 'center', animationDelay: '-3s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1360ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
