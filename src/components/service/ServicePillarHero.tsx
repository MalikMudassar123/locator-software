import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'
import { SERVICE_PAGES } from '@/components/service/data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function ServicePillarHero({
  slug,
  title,
  lead,
}: {
  slug: string
  title: string
  lead: string
}) {
  const active = SERVICE_PAGES.find(p => p.slug === slug)!

  return (
    <>
      <style>{`
        .spx-hero { position: relative; overflow: hidden; background: #fff; padding: clamp(16px,2vw,28px) 28px clamp(48px,6vw,72px); }
        .spx-aurora { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }

        .spx-tabs {
          position: relative; z-index: 1;
          display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;
          max-width: 960px; margin: 0 auto clamp(32px,5vw,52px);
        }
        .spx-tab {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 700; color: #6e6e73;
          padding: 9px 16px 9px 10px; border-radius: 999px;
          border: 1px solid #e8ecf4; background: #fff; text-decoration: none;
          transition: .2s ${EASE};
        }
        .spx-tab:hover { border-color: var(--tab-accent); color: var(--tab-accent); transform: translateY(-1px); }
        .spx-tab-dot { width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; background: rgba(0,0,0,.05); color: #a0a0a8; transition: .2s ${EASE}; }
        .spx-tab-dot svg { width: 11px; height: 11px; }
        .spx-tab.active { border-color: var(--tab-accent); background: var(--tab-accent-tint); color: var(--tab-accent); }
        .spx-tab.active .spx-tab-dot { background: var(--tab-accent); color: #fff; }

        .spx-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; text-align: center; }

        @keyframes spxRise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .spx-anim { opacity: 0; animation: spxRise .75s ${EASE} forwards; } }

        .spx-icon {
          width: 64px; height: 64px; border-radius: 18px;
          display: grid; place-items: center; margin: 0 auto 22px;
          box-shadow: 0 16px 32px -12px var(--tab-accent);
        }
      `}</style>

      <section className="spx-hero">
        <div className="spx-aurora" style={{ width: 480, height: 380, top: -60, left: '50%', marginLeft: -240, background: `radial-gradient(50% 50% at 50% 50%, ${active.accent}22, transparent 72%)` }} />

        <SoftwareNavbar />

        <nav className="spx-tabs" aria-label="Locator services">
          {SERVICE_PAGES.map(p => (
            <Link
              key={p.slug}
              href={`/service/${p.slug}`}
              className={`spx-tab${p.slug === slug ? ' active' : ''}`}
              style={{ '--tab-accent': p.accent, '--tab-accent-tint': `${p.accent}12` } as React.CSSProperties}
            >
              <span className="spx-tab-dot">{p.icon}</span>
              {p.name}
            </Link>
          ))}
        </nav>

        <div className="spx-inner">
          <div
            className="spx-icon spx-anim"
            style={{ background: active.accent, color: '#fff', '--tab-accent': active.accent } as React.CSSProperties}
          >
            {active.icon}
          </div>

          <span className="spx-anim" style={{ animationDelay: '.08s', display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: active.accent, textTransform: 'uppercase', marginBottom: '14px' }}>
            Locator Services — {active.tagline}
          </span>

          <h1 className="spx-anim" style={{ animationDelay: '.14s', margin: 0, fontSize: 'clamp(30px,4vw,50px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.03em', color: '#1d1d1f' }}>
            {title}
          </h1>

          <p className="spx-anim" style={{ animationDelay: '.22s', margin: '20px auto 0', maxWidth: '600px', fontSize: 'clamp(15px,1.5vw,17.5px)', lineHeight: 1.7, color: '#52525e' }}>
            {lead}
          </p>
        </div>
      </section>
    </>
  )
}
