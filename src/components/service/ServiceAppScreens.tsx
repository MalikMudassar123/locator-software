import Image from 'next/image'
import ServiceAppCarousel, { type AppScreen } from './ServiceAppCarousel'

type ServiceAppScreensProps = {
  eyebrow?: string
  heading?: string
  lead?: string
  /** Pass phone screenshots to render them as a rotating device carousel instead of the single hero image. */
  screens?: AppScreen[]
}

export default function ServiceAppScreens({
  eyebrow = 'The App In Action',
  heading = 'See screenshots of our GPS tracker app in action',
  lead = 'Real screens from the LOCATOR mobile app — live vehicle view, trip summaries, and detailed graphical reports, all tailored to your fleet.',
  screens,
}: ServiceAppScreensProps) {
  return (
    <>
      <style>{`
        .sas-glow { position: absolute; width: 640px; height: 640px; top: 50%; left: 50%; transform: translate(-50%,-50%); border-radius: 50%; background: radial-gradient(circle, rgba(19,96,238,.10), transparent 68%); pointer-events: none; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px clamp(24px,4vw,40px)', background: '#fff' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto clamp(32px,4vw,44px)' }}>
            <span style={{ fontSize: 'max(clamp(22px,2.8vw,32px), min(2.222vw, 46.4px))', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              {eyebrow}
            </span>
            <h2 style={{ margin: 0, fontSize: 'max(clamp(19px,2.2vw,26px), min(1.806vw, 37.7px))', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              {heading}
            </h2>
            <p style={{ margin: '16px auto 0', fontSize: 'max(clamp(14px,1.35vw,16px), min(1.111vw, 23.2px))', color: '#6e6e73', lineHeight: 1.6 }}>
              {lead}
            </p>
          </div>

          <div data-reveal="zoom" style={{ position: 'relative' }}>
            <div className="sas-glow" aria-hidden="true" />
            {screens?.length ? (
              <ServiceAppCarousel screens={screens} />
            ) : (
              <Image
                src="/services/app-hero.png"
                alt="LOCATOR mobile app — graphical report, live view, and summary screens"
                width={1600}
                height={1244}
                style={{ position: 'relative', width: '100%', maxWidth: '880px', height: 'auto', display: 'block', margin: '0 auto' }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
