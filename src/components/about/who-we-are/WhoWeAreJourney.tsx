import Image from 'next/image'

export default function WhoWeAreJourney() {
  return (
    <>
      <style>{`
        .wwj-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: clamp(32px,5vw,72px); align-items: center; max-width: var(--w-1120); margin: 0 auto; }
        @media (max-width: 860px) { .wwj-grid { grid-template-columns: 1fr; gap: 28px; } }

        .wwj-media {
          position: relative; width: 100%; aspect-ratio: 6 / 5;
          border-radius: 20px; overflow: hidden;
          background: #fff; border: 1px solid #e8ecf4;
          box-shadow: 0 20px 46px -28px rgba(20,40,90,.22);
        }
        .wwj-media img { object-fit: cover; object-position: 62% 56%; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
        <div className="wwj-grid">
          <div data-reveal="left">
            <span style={{ display: 'block', fontSize: 'max(clamp(22px,2.8vw,32px), min(2.222vw, 46.4px))', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Our Journey
            </span>
            <h2 style={{ margin: 0, fontSize: 'max(clamp(19px,2.2vw,26px), min(1.806vw, 37.7px))', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              From GPS tracking to a<br />
              <span style={{ color: '#1360ee' }}>connected mobility ecosystem</span>
            </h2>
            <div style={{ margin: '22px 0 24px', height: '4px', width: '72px', borderRadius: '999px', background: 'linear-gradient(90deg,#1360ee,#06a4e2)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ margin: 0, fontSize: 'max(clamp(14.5px,1.35vw,16.5px), min(1.146vw, 23.93px))', lineHeight: 1.8, color: '#52525e' }}>
                Since our inception, LOCATOR has remained committed to redefining fleet management through innovation and technology. What began as a provider of GPS vehicle tracking solutions has evolved into a comprehensive fleet telematics and IoT platform trusted by businesses across the United Arab Emirates.
              </p>
              <p style={{ margin: 0, fontSize: 'max(clamp(14.5px,1.35vw,16.5px), min(1.146vw, 23.93px))', lineHeight: 1.8, color: '#52525e' }}>
                As industries continue to embrace digital transformation, LOCATOR has expanded its capabilities beyond traditional vehicle tracking by integrating Artificial Intelligence, cloud technologies, IoT connectivity, and intelligent analytics into one unified ecosystem. Today, we continue to innovate — helping organizations improve operational efficiency, strengthen safety, reduce costs, and prepare for the future of connected mobility.
              </p>
            </div>
          </div>

          <div data-reveal="right" className="wwj-media">
            <Image
              src="/About_us/who-we-are/journey-road.png"
              alt="A highway leading into a connected smart city skyline, symbolizing LOCATOR's journey from GPS tracking to a full mobility ecosystem"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  )
}
