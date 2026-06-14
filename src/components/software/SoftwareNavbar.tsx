'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About us' },
  { href: '/software',   label: 'Software' },
  { href: '/service',    label: 'Service' },
  { href: '/industries', label: 'Industries' },
  { href: '/regulatory', label: 'Regulatory GPS Certificate' },
  { href: '/contact',    label: 'Contact' },
]

export default function SoftwareNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [mounted, setMounted]   = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  return (
    <>
      <style>{`
        .sw-nav {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          width: calc(100% - 36px);
          max-width: 1240px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 10px 12px 10px 20px;
          border-radius: 10px;
          background: linear-gradient(180deg, rgba(255,255,255,.6), rgba(255,255,255,.38));
          backdrop-filter: blur(24px) saturate(185%);
          -webkit-backdrop-filter: blur(24px) saturate(185%);
          border: 1px solid rgba(255,255,255,.835);
          box-shadow:
            0 10px 34px -10px rgba(20,40,90,.22),
            0 2px 8px -2px rgba(20,40,90,.10),
            inset 0 1px 0 rgba(255,255,255,.9),
            inset 0 -1px 1px rgba(255,255,255,.35);
          transition: box-shadow .3s cubic-bezier(.22,.61,.36,1), background .3s cubic-bezier(.22,.61,.36,1);
        }
        .sw-nav::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background:
            radial-gradient(120% 160% at 0% -40%, rgba(255,255,255,.7), rgba(255,255,255,0) 42%),
            linear-gradient(115deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 26%);
        }
        .sw-nav > * { position: relative; z-index: 1; }
        .sw-nav.scrolled {
          background: linear-gradient(180deg, rgba(255,255,255,.72), rgba(255,255,255,.5));
          box-shadow:
            0 14px 40px -12px rgba(20,40,90,.30),
            inset 0 1px 0 rgba(255,255,255,.95),
            inset 0 -1px 1px rgba(255,255,255,.4);
        }
        .sw-pill {
          font-size: 13.5px;
          font-weight: 600;
          color: #6e6e73;
          white-space: nowrap;
          padding: 8px 13px;
          border-radius: 999px;
          text-decoration: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          display: inline-block;
        }
        .sw-pill:hover { color: #1d1d1f; background: rgba(255,255,255,.6); }
        .sw-pill.active { color: #0a84ff; background: rgba(10,132,255,.12); font-weight: 700; }
        .sw-cta-btn {
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          padding: 9px 18px;
          border-radius: 999px;
          border: none;
          background: #0a84ff;
          color: #fff;
          font-family: inherit;
          white-space: nowrap;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .sw-cta-btn:hover { background: #0066d6; transform: translateY(-1px); }
        @media (max-width: 880px) { .sw-pills { display: none !important; } }
      `}</style>

      <nav className={`sw-nav${scrolled ? ' scrolled' : ''}`}>
        {/* Brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', flexShrink: 0, textDecoration: 'none' }}>
          <Image src="/logo.png" alt="Locator" width={86} height={28} style={{ width: '86px', height: 'auto', objectFit: 'cover' }} priority />
        </Link>

        {/* Pills */}
        <div className="sw-pills" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          {NAV_LINKS.map(l => {
            const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} className={`sw-pill${isActive ? ' active' : ''}`}>
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Right: flag + CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {/* UAE flag */}
          <span role="img" aria-label="United Arab Emirates" style={{ flexShrink: 0, borderRadius: '50%', display: 'inline-flex', lineHeight: 0 }}>
            <Image src="/uae-flag.svg" alt="UAE" width={26} height={26} style={{ borderRadius: '50%', display: 'block' }} />
          </span>

          {/* CTA */}
          <button className="sw-cta-btn">Get a quote</button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1d1d1f',
            }}
            className="sw-hamburger"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && mounted && createPortal(
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #e3e3e6' }}>
            <Image src="/logo.png" alt="Locator" width={86} height={28} style={{ width: '86px', height: 'auto' }} />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #e3e3e6', background: '#f5f5f7', cursor: 'pointer', display: 'grid', placeItems: 'center', color: '#1d1d1f' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <ul style={{ listStyle: 'none', margin: 0, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 0, overflowY: 'auto' }}>
            {NAV_LINKS.map(l => {
              const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px 4px',
                      borderBottom: '1px solid #e3e3e6',
                      fontSize: '17px',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? '#0a84ff' : '#1d1d1f',
                      textDecoration: 'none',
                    }}
                  >
                    <span>{l.label}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div style={{ padding: '20px 24px' }}>
            <button style={{ width: '100%', padding: '14px', borderRadius: '999px', border: 'none', background: '#0a84ff', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Get a quote
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
