import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const SECTORS = ['Logistics', 'Transportation', 'Construction', 'Government', 'Education', 'Healthcare', 'Commercial']

export default function WhoWeAreHero() {
  return (
    <>
      <style>{`
        .wwa-hero { position: relative; overflow: hidden; background: radial-gradient(120% 90% at 50% -10%, #eef3ff 0%, #ffffff 58%); padding: clamp(16px,2vw,28px) 28px clamp(56px,7vw,84px); }
        .wwa-aurora { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
        @keyframes wwaDrift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(28px,18px) scale(1.06); } }
        @media (prefers-reduced-motion: no-preference) { .wwa-aurora { animation: wwaDrift 18s ease-in-out infinite; } }

        .wwa-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; text-align: center; padding-top: clamp(20px,4vw,44px); }

        @keyframes wwaRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .wwa-anim { opacity: 0; animation: wwaRise .8s ${EASE} forwards; } }

        /* Rule sits on its own line above the label, so a wrapping label can
           never leave it stranded beside the middle of a two-line block. */
        .wwa-eyebrow {
          display: block;
          font-size: clamp(22px,2.8vw,32px); font-weight: 800; letter-spacing: .04em;
          color: #1360ee; text-transform: uppercase;
        }
        .wwa-eyebrow span {
          display: block; width: 34px; height: 3px;
          background: #1360ee; border-radius: 2px;
          margin: 0 auto 12px;
        }

        .wwa-btn {
          font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
          padding: 14px 28px; border-radius: 999px; border: none;
          transition: .18s ${EASE};
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .wwa-btn-primary { background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.3); }
        .wwa-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 30px rgba(19,96,238,.42); }
        .wwa-btn-ghost { background: #fff; color: #1d1d1f; border: 1.5px solid #e3e3e6; }
        .wwa-btn-ghost:hover { border-color: #1360ee; color: #1360ee; transform: translateY(-1px); }

        .wwa-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12.5px; font-weight: 700; color: #52525e;
          background: #fff; border: 1px solid #e6e9f0; border-radius: 999px;
          padding: 7px 15px; box-shadow: 0 2px 10px rgba(20,40,90,.05);
        }
        .wwa-chip { font-size: 12.5px; font-weight: 600; color: #52525e; background: rgba(19,96,238,.06); border: 1px solid rgba(19,96,238,.14); border-radius: 999px; padding: 6px 14px; }
      `}</style>

      <section className="wwa-hero">
        <div className="wwa-aurora" style={{ width: 520, height: 420, top: -60, left: '50%', marginLeft: -260, background: 'radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.16), transparent 72%)' }} />

        <SoftwareNavbar />

        <div className="wwa-inner">
          <span className="wwa-eyebrow wwa-anim" style={{ animationDelay: '.05s' }}>
            <span /> Who We Are
          </span>

          <h1 className="wwa-anim" style={{ animationDelay: '.12s', margin: '18px auto 0', maxWidth: '26ch', fontSize: 'clamp(21px,2.5vw,28px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
            Shaping the future of <span style={{ color: '#1360ee' }}>connected mobility</span>
          </h1>

          <p className="wwa-anim" style={{ animationDelay: '.2s', margin: '20px auto 0', maxWidth: '620px', fontSize: 'clamp(15px,1.5vw,17.5px)', lineHeight: 1.7, color: '#52525e' }}>
            LOCATOR is more than a GPS tracking provider — we&apos;re a technology company building intelligent fleet telematics and IoT solutions that connect vehicles and assets, and turn real-time data into actionable business intelligence.
          </p>

          <div className="wwa-anim" style={{ animationDelay: '.28s', marginTop: '22px' }}>
            <span className="wwa-badge">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1360ee' }} />
              Part of Synosys
            </span>
          </div>

          <div className="wwa-anim" style={{ animationDelay: '.36s', display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="wwa-btn wwa-btn-primary">Talk to our team</Link>
            <Link href="/software" className="wwa-btn wwa-btn-ghost">Explore the platform</Link>
          </div>

          <div className="wwa-anim" style={{ animationDelay: '.44s', display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '34px', flexWrap: 'wrap' }}>
            {SECTORS.map(s => <span key={s} className="wwa-chip">{s}</span>)}
          </div>
        </div>
      </section>
    </>
  )
}
