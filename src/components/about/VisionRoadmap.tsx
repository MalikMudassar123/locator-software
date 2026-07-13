const MILESTONES = [
  { year: 'Today', title: 'A trusted UAE fleet-tech partner', desc: 'Serving businesses across the Emirates with AI-powered IoT tracking and compliance.' },
  { year: '2030', title: 'Regional scale', desc: 'Expanding our connected device network across the region, deepening AI-driven insight.' },
  { year: '2035', title: 'A global leader', desc: 'One million IoT devices enabling smarter mobility, safer assets, and more intelligent operations worldwide.' },
]

export default function VisionRoadmap() {
  return (
    <>
      <style>{`
        .vr-stat-wrap {
          position: relative; overflow: hidden; border-radius: 28px;
          background: #0f1117; color: #fff;
          padding: clamp(40px,5vw,64px) clamp(24px,4vw,56px);
          text-align: center; isolation: isolate;
        }
        @keyframes vrRing { 0%,100% { opacity: .07; transform: scale(1) rotate(0deg); } 50% { opacity: .13; transform: scale(1.05) rotate(180deg); } }
        .vr-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,.14); pointer-events: none; animation: vrRing 14s linear infinite; }

        .vr-num {
          position: relative; z-index: 1;
          font-size: clamp(56px,9vw,112px); font-weight: 800; line-height: 1;
          letter-spacing: -.03em;
          background: linear-gradient(135deg, #fff 0%, #cfe0ff 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .vr-timeline { position: relative; max-width: 940px; margin: clamp(48px,6vw,72px) auto 0; }
        .vr-line { position: absolute; top: 22px; left: 6%; right: 6%; height: 2px; background: linear-gradient(90deg, #1360ee, #7c3aed, #13923f); border-radius: 2px; z-index: 0; }
        .vr-track { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(20px,3vw,32px); }
        @media (max-width: 720px) { .vr-line { display: none; } .vr-track { grid-template-columns: 1fr; } }

        .vr-dot { width: 12px; height: 12px; border-radius: 50%; background: #1360ee; margin: 0 auto 18px; box-shadow: 0 0 0 5px rgba(19,96,238,.15); }
        .vr-milestone:nth-child(2) .vr-dot { background: #7c3aed; box-shadow: 0 0 0 5px rgba(124,58,237,.15); }
        .vr-milestone:nth-child(3) .vr-dot { background: #13923f; box-shadow: 0 0 0 5px rgba(19,146,63,.15); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="vr-stat-wrap" data-reveal="zoom">
            <div className="vr-ring" style={{ width: 420, height: 420, left: -140, top: -140 }} />
            <div className="vr-ring" style={{ width: 320, height: 320, right: -100, bottom: -120, animationDelay: '-6s' }} />
            <span style={{ position: 'relative', zIndex: 1, display: 'inline-block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.08em', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', marginBottom: '18px' }}>
              By 2035
            </span>
            <div className="vr-num">1,000,000+</div>
            <p style={{ position: 'relative', zIndex: 1, margin: '14px auto 0', maxWidth: '480px', fontSize: 'clamp(14px,1.4vw,16px)', color: 'rgba(255,255,255,.75)', lineHeight: 1.65 }}>
              Connected IoT devices enabling smarter mobility, safer assets, and more intelligent operations — worldwide.
            </p>
          </div>

          <div className="vr-timeline" data-reveal>
            <div className="vr-line" aria-hidden="true" />
            <div className="vr-track">
              {MILESTONES.map((m, i) => (
                <div className="vr-milestone" key={m.year} data-reveal data-reveal-delay={String(i * 90)} style={{ textAlign: 'center' }}>
                  <div className="vr-dot" />
                  <span style={{ display: 'block', fontSize: '12px', fontWeight: 800, letterSpacing: '.06em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: '8px' }}>{m.year}</span>
                  <h3 style={{ margin: '0 0 8px', fontSize: 'clamp(15px,1.5vw,17px)', fontWeight: 800, color: '#1d1d1f' }}>{m.title}</h3>
                  <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.65, color: '#6e6e73' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
