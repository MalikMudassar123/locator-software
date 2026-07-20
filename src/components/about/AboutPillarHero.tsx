import Link from 'next/link'
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

        .apx-tabs {
          position: relative; z-index: 1;
          display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;
          max-width: 900px; margin: 0 auto clamp(32px,5vw,52px);
        }
        .apx-tab {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 700; color: #6e6e73;
          padding: 9px 16px 9px 10px; border-radius: 999px;
          border: 1px solid #e8ecf4; background: #fff; text-decoration: none;
          transition: .2s ${EASE};
        }
        .apx-tab:hover { border-color: var(--tab-accent); color: var(--tab-accent); transform: translateY(-1px); }
        .apx-tab-dot { width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; background: rgba(0,0,0,.05); color: #a0a0a8; transition: .2s ${EASE}; }
        .apx-tab-dot svg { width: 11px; height: 11px; }
        .apx-tab.active { border-color: var(--tab-accent); background: var(--tab-accent-tint); color: var(--tab-accent); }
        .apx-tab.active .apx-tab-dot { background: var(--tab-accent); color: #fff; }

        .apx-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; text-align: center; }

        @keyframes apxRise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) { .apx-anim { opacity: 0; animation: apxRise .75s ${EASE} forwards; } }

        .apx-icon {
          width: 64px; height: 64px; border-radius: 18px;
          display: grid; place-items: center; margin: 0 auto 22px;
          box-shadow: 0 16px 32px -12px var(--tab-accent);
        }
      `}</style>

      <section className="apx-hero">
        <div className="apx-aurora" style={{ width: 480, height: 380, top: -60, left: '50%', marginLeft: -240, background: `radial-gradient(50% 50% at 50% 50%, ${active.accent}22, transparent 72%)` }} />

        <SoftwareNavbar />

        <nav className="apx-tabs" aria-label="About Locator sections">
          {ABOUT_PAGES.map(p => (
            <Link
              key={p.slug}
              href={`/about/${p.slug}`}
              className={`apx-tab${p.slug === slug ? ' active' : ''}`}
              style={{ '--tab-accent': p.accent, '--tab-accent-tint': `${p.accent}12` } as React.CSSProperties}
            >
              <span className="apx-tab-dot">{p.icon}</span>
              {p.name}
            </Link>
          ))}
        </nav>

        <div className="apx-inner">
          <div
            className="apx-icon apx-anim"
            style={{ background: active.accent, color: '#fff', '--tab-accent': active.accent } as React.CSSProperties}
          >
            {active.icon}
          </div>

          <span className="apx-anim" style={{ animationDelay: '.08s', display: 'block', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: active.accent, textTransform: 'uppercase', marginBottom: '16px' }}>
            <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: active.accent, borderRadius: '2px' }} /></span>
            About Locator — {active.tagline}
          </span>

          <h1 className="apx-anim" style={{ animationDelay: '.14s', margin: 0, fontSize: 'clamp(21px,2.5vw,28px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
            {title}
          </h1>

          <p className="apx-anim" style={{ animationDelay: '.22s', margin: '20px auto 0', maxWidth: '600px', fontSize: 'clamp(15px,1.5vw,17.5px)', lineHeight: 1.7, color: '#52525e' }}>
            {lead}
          </p>
        </div>
      </section>
    </>
  )
}
