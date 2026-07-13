export default function VideoTelematicsDescription() {
  return (
    <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
      <div className="vtd-grid" style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <style>{`
          .vtd-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px,5vw,64px); align-items: center; }
          @media (max-width: 900px) { .vtd-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div data-reveal="left">
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            display: 'grid', placeItems: 'center', marginBottom: '20px',
            background: 'rgba(19,96,238,.10)', color: '#1360ee',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="6" width="15" height="12" rx="2" /><path d="M17.5 10l5-3v10l-5-3v-4z" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
              LOCATOR provides advanced <strong style={{ color: '#1d1d1f' }}>Dashboard Cameras, Multi-Camera Dash Cams, and MDVR Recording Systems (Mobile Digital Video Recorders)</strong> designed specifically for fleet safety, cargo protection, and commercial vehicle monitoring.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
              These systems help businesses monitor vehicles on the road, drivers en-route, cargo areas, loading operations, and parking yards or vehicle depots — offering full visibility for logistics companies, transport fleets, trucks, taxis, buses, and delivery vehicles.
            </p>
          </div>
        </div>

        <div data-reveal="right">
          <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 800, letterSpacing: '-.02em', color: '#1d1d1f' }}>
            Prevent Road Incidents with AI-Powered Dashcam Alerts
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Frequent yawning', 'Not wearing seatbelt', 'Smoking', 'Nodding off',
              'Droopy eyes', 'Talking', 'Texting on a phone', 'Looking away',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '6px', flexShrink: 0,
                  background: 'rgba(19,96,238,.12)', color: '#1360ee',
                  display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 800,
                }}>✓</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
