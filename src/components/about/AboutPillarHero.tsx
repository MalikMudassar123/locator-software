import SoftwareNavbar from '@/components/software/SoftwareNavbar'
import { ABOUT_PAGES } from '@/components/about/data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function AboutPillarHero({
  slug,
  title,
  lead,
}: {
  slug: string
  title: string
  lead: string
}) {
  const active = ABOUT_PAGES.find(p => p.slug === slug)!

  return (
    <>
      <style>{`
        .apx-hero { position: relative; overflow: hidden; background: #fff; padding: clamp(16px,2vw,28px) 28px clamp(48px,6vw,72px); }
        .apx-aurora { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }

        .apx-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; text-align: center; padding-top: clamp(20px,4vw,44px); }

        @keyframes apxRise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .apx-anim { opacity: 0; animation: apxRise .75s ${EASE} forwards; } }

        .apx-icon {
          width: 64px; height: 64px; border-radius: 18px;
          display: grid; place-items: center; margin: 0 auto 22px;
          box-shadow: 0 16px 32px -12px var(--tab-accent);
        }

        /* Title: solid section accent — bold and clean, no gradient. */
        .apx-title {
          margin: 0; font-size: max(clamp(32px,4.6vw,58px), min(4.028vw, 84.1px)); font-weight: 800;
          line-height: 1.06; letter-spacing: -.03em; color: var(--tab-accent);
        }

        /* Lead sits in a full-bleed tinted band that spans the section. */
        .apx-lead-band {
          margin-top: clamp(28px,3.5vw,44px);
          margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);
          width: 100vw; background: #f4f6fa; border-top: 1px solid #eef1f7; border-bottom: 1px solid #eef1f7;
          padding: clamp(28px,4vw,52px) 28px;
        }
        .apx-lead {
          margin: 0 auto; max-width: 820px;
          font-size: max(clamp(16px,1.7vw,20px), min(1.389vw, 29px)); line-height: 1.7;
          font-weight: 500; color: #1d1d1f; text-align: center;
        }
      `}</style>

      <section className="apx-hero">
        <div className="apx-aurora" style={{ width: 480, height: 380, top: -60, left: '50%', marginLeft: -240, background: `radial-gradient(50% 50% at 50% 50%, ${active.accent}22, transparent 72%)` }} />

        <SoftwareNavbar />

        <div className="apx-inner" style={{ '--tab-accent': active.accent } as React.CSSProperties}>
          <div
            className="apx-icon apx-anim"
            style={{ background: active.accent, color: '#fff', '--tab-accent': active.accent } as React.CSSProperties}
          >
            {active.icon}
          </div>

          <span className="apx-anim" style={{ animationDelay: '.08s', display: 'block', fontSize: 'max(clamp(13px,1.15vw,15px), min(1.042vw, 21.75px))', fontWeight: 700, letterSpacing: '.13em', color: active.accent, textTransform: 'uppercase', marginBottom: '16px' }}>
            <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: active.accent, borderRadius: '2px' }} /></span>
            {active.tagline}
          </span>

          <h1 className="apx-anim apx-title" style={{ animationDelay: '.14s' }}>
            {title}
          </h1>

          <div className="apx-anim apx-lead-band" style={{ animationDelay: '.22s' }}>
            <p className="apx-lead">{lead}</p>
          </div>
        </div>
      </section>
    </>
  )
}
