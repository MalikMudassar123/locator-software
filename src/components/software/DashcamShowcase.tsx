const CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.871v6.258a1 1 0 0 1-1.447.894L15 14"/>
        <rect x="2" y="7" width="13" height="10" rx="2"/>
      </svg>
    ),
    title: 'LIVE HD Video',
    desc: 'Stream real-time HD road and driver footage to improve driver behaviour, retrieve video on-demand, and enforce safer driving across your fleet.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'Collision Prevention',
    desc: 'Analyse incidents with video evidence and deploy AI audible alerts to warn drivers instantly, reducing future collision risks.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 5V3M12 21v-2M5 12H3M21 12h-2"/>
      </svg>
    ),
    title: 'Operational Efficiency',
    desc: 'AI driver monitoring detects drowsiness and distraction — yawning, eye closure, phone use, looking away — helping managers take proactive safety actions.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
        <path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
    title: 'Cost Savings',
    desc: 'Cut costs from accidents, insurance claims, vehicle damage, and fraud disputes with undeniable recorded proof that protects your business.',
  },
]

export default function DashcamShowcase() {
  return (
    <>
      <style>{`
        .dc-wrap {
          position: relative;
          border-radius: 34px;
          overflow: hidden;
          isolation: isolate;
          /* Same teal→blue gradient as the site footer */
          background: linear-gradient(180deg, #97def1 0%, #3abede 22%, #0a84e3 55%, #1360ee 82%, #062a8a 100%);
          padding: clamp(52px,6vw,76px) clamp(28px,5vw,56px);
          color: #fff;
        }
        /* Radial accent stack matching the footer's glow patches */
        .dc-wrap::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(38% 34% at 6% 4%, rgba(193,235,247,0.55) 0%, rgba(193,235,247,0) 65%),
            radial-gradient(34% 30% at 96% 6%, rgba(58,190,222,0.4) 0%, rgba(58,190,222,0) 65%),
            radial-gradient(46% 42% at 4% 96%, rgba(13,47,165,0.4) 0%, rgba(13,47,165,0) 65%),
            radial-gradient(38% 34% at 96% 96%, rgba(13,47,165,0.3) 0%, rgba(13,47,165,0) 65%);
        }
        /* Fine dot texture (matches footer grid) */
        .dc-wrap::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        @keyframes dcRingPulse {
          0%,100% { opacity: .15; transform: scale(1); }
          50%      { opacity: .28; transform: scale(1.04); }
        }
        .dc-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.22);
          pointer-events: none;
          animation: dcRingPulse 6s ease-in-out infinite;
        }

        /* horizontal card rows */
        .dc-card-row {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,.1);
        }
        .dc-card-row:first-child { padding-top: 0; }
        .dc-card-row:last-child  { border-bottom: none; padding-bottom: 0; }

        .dc-card-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          border-radius: 13px;
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.22);
          display: grid; place-items: center;
          font-size: 20px;
        }

        @media (max-width: 880px) {
          .dc-outer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section id="dashcam" style={{ padding: 'clamp(40px,5vw,56px) 28px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="dc-wrap">

            {/* Rings */}
            <div className="dc-ring" style={{ width: '420px', height: '420px', top: '-140px', right: '-100px', animationDelay: '0s' }} />
            <div className="dc-ring" style={{ width: '280px', height: '280px', top: '-60px', right: '-20px', animationDelay: '-3s' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                className="dc-outer-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1.45fr', gap: '56px', alignItems: 'center' }}
              >

                {/* ── Left: heading + stats ── */}
                <div>
                  <span style={{
                    display: 'inline-block', fontSize: '11.5px', fontWeight: 700,
                    letterSpacing: '.06em', color: 'rgba(255,255,255,.78)',
                    marginBottom: '16px', textTransform: 'uppercase' as const,
                    background: 'rgba(255,255,255,.15)', borderRadius: '999px',
                    padding: '5px 14px', border: '1px solid rgba(255,255,255,.22)',
                  }}>
                    AI Video Telematics
                  </span>

                  <h2 style={{ fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.08, color: '#fff', margin: '0 0 18px' }}>
                    AI-Powered Dash Cameras &amp; MDVR
                  </h2>

                  <p style={{ fontSize: 'clamp(14px,1.45vw,16px)', lineHeight: 1.65, color: 'rgba(255,255,255,.78)', margin: '0 0 12px' }}>
                    Improve fleet safety with real-time driver monitoring, cargo surveillance, and multi-camera recording for trucks, taxis, buses, delivery vehicles, and commercial fleets.
                  </p>
                  <p style={{ fontSize: 'clamp(14px,1.45vw,16px)', lineHeight: 1.65, color: 'rgba(255,255,255,.6)', margin: 0 }}>
                    Monitor vehicles on the road, drivers en-route, cargo areas, loading operations, parking yards, depots, and customer delivery points.
                  </p>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '20px', marginTop: '32px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,.16)' }}>
                    {[
                      { v: '4K', l: 'Camera resolution' },
                      { v: '24/7', l: 'Live monitoring' },
                      { v: 'AI', l: 'Driver detection' },
                    ].map((s, i) => (
                      <div key={i} style={{ borderLeft: '2px solid rgba(255,255,255,.3)', paddingLeft: '14px' }}>
                        <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '-.02em' }}>{s.v}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)', marginTop: '2px', fontWeight: 500 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right: vertical card rows ── */}
                <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: '22px', border: '1px solid rgba(255,255,255,.14)', padding: '8px 24px 8px' }}>
                  {CARDS.map((c, i) => (
                    <div key={i} className="dc-card-row">
                      <div className="dc-card-icon">{c.icon}</div>
                      <div>
                        <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#fff', marginBottom: '5px', letterSpacing: '-.01em' }}>
                          {c.title}
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,.65)' }}>
                          {c.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
