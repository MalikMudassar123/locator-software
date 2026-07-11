import SoftwareNavbar from '@/components/software/SoftwareNavbar'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function AboutHero() {
  return (
    <>
      <style>{`
        .ab-hero {
          position: relative; overflow: hidden;
          background: radial-gradient(120% 90% at 50% -20%, #eef3ff 0%, #ffffff 60%);
          padding: clamp(16px,2vw,28px) 28px clamp(36px,5vw,56px);
        }
        .ab-aurora { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
        @keyframes abDrift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,18px) scale(1.06); } }
        @media (prefers-reduced-motion: no-preference) { .ab-aurora { animation: abDrift 18s ease-in-out infinite; } }

        .ab-hero-inner {
          position: relative; z-index: 1;
          max-width: 1240px; margin: 0 auto; text-align: center;
          padding-top: clamp(20px,4vw,44px);
        }

        @keyframes abRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .ab-anim { opacity: 0; animation: abRise .8s ${EASE} forwards; } }

        .ab-title { white-space: nowrap; }
        @media (max-width: 720px) { .ab-title { white-space: normal; } }

        @keyframes abLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .ab-underline {
          display: block; height: 4px; width: 96px; margin: 24px auto 0;
          border-radius: 999px; background: linear-gradient(90deg, #1360ee, #7c3aed);
          transform-origin: center;
        }
        @media (prefers-reduced-motion: no-preference) { .ab-underline { transform: scaleX(0); animation: abLine .7s ${EASE} .5s forwards; } }
      `}</style>

      <section className="ab-hero">
        <div className="ab-aurora" style={{ width: 520, height: 420, top: -60, left: '50%', marginLeft: -260, background: 'radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.16), transparent 72%)' }} />

        <SoftwareNavbar />

        <div className="ab-hero-inner">
          <h1 className="ab-anim ab-title" style={{ margin: 0, fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.03em', color: '#1d1d1f' }}>
            Transforming operations into <span style={{ color: '#1360ee' }}>intelligent growth</span>
          </h1>
          <span className="ab-underline" aria-hidden="true" />
        </div>
      </section>
    </>
  )
}
