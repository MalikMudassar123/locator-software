import Image from 'next/image'

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
        <rect x="2" y="5" width="15" height="14" rx="2" /><path d="M17 9l5-3v12l-5-3V9z" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Live HD Video',
    desc: 'Stream real-time HD road and driver footage to improve driver behavior, retrieve video on-demand, and enforce safer driving across your fleet.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Collision Prevention',
    desc: 'Analyze incidents with video evidence and deploy AI audible alerts to warn drivers instantly, reducing future collision risks.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" />
      </svg>
    ),
    title: 'Operational Efficiency',
    desc: 'AI driver monitoring detects drowsiness and distraction (yawning, eye closure, phone use, looking away), helping managers take proactive safety actions.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Cost Savings',
    desc: 'Cut costs from accidents, insurance claims, vehicle damage, and fraud disputes with undeniable recorded proof that protects your business.',
  },
]

export default function VideoTelematicsShowcase() {
  return (
    <>
      <style>{`
        .vts-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(32px,5vw,64px); align-items: center; }
        @media (max-width: 900px) { .vts-grid { grid-template-columns: 1fr; } }
        @media (max-width: 900px) { .vts-grid > div:last-child { order: -1; } }
        .vts-feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 560px) { .vts-feature-grid { grid-template-columns: 1fr; } }
        .vts-fcard {
          background: #ffffff; border: 1px solid #e8edf3; border-radius: 16px;
          padding: 14px; display: flex; align-items: center; gap: 10px;
        }
        .vts-fcard-icon { flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
        .vts-browser {
          border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;
          box-shadow: 0 30px 60px -24px rgba(20,40,90,.3);
        }
        .vts-browser-bar { height: 34px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; padding: 0 12px; gap: 6px; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#f5f7fa' }}>
        <div className="vts-grid" style={{ maxWidth: '1180px', margin: '0 auto' }}>

          <div data-reveal="left">
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1360ee', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '18px', display: 'block' }}>
              Video Telematics
            </span>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.15, color: '#1d1d1f', margin: '0 0 16px' }}>
              Enhance Fleet Visibility with Video Telematics
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: '#6e6e73', margin: '0 0 28px', maxWidth: 440 }}>
              Live HD video insights to monitor drivers, road conditions, and on-road operations with ease.
            </p>

            <h3 style={{ fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 10px' }}>
              AI-Powered Fleet Dash Cameras &amp; MDVR Safety
            </h3>
            <p style={{ fontSize: 'clamp(12px,1.1vw,14px)', lineHeight: 1.6, color: '#6e6e73', margin: '0 0 24px', maxWidth: 440 }}>
              Real-time driver monitoring, cargo surveillance, and multi-camera recording for trucks, taxis, buses, and commercial fleets.
            </p>

            <div className="vts-feature-grid">
              {FEATURES.map(f => (
                <div key={f.title} className="vts-fcard">
                  <span className="vts-fcard-icon">{f.icon}</span>
                  <span>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1d1d1f' }}>{f.title}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal="right">
            <div className="vts-browser">
              <div className="vts-browser-bar">
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />
                ))}
                <span style={{ marginLeft: 8, fontSize: 11, color: '#94a3b8' }}>pro.mylocatorplus.com/video</span>
              </div>
              <Image
                src="/block 1/video teleframe.png"
                alt="Live multi-camera fleet dashcam feeds — road and cabin views"
                width={1598}
                height={984}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
