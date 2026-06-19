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
  const [open, setOpen]       = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

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
        .swn-root {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 60;
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e8e8eb;
          box-shadow: 0 1px 6px rgba(0,0,0,.06);
        }
        .swn-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .swn-link {
          font-size: 13.5px;
          font-weight: 600;
          color: #52525e;
          white-space: nowrap;
          padding: 7px 14px;
          border-radius: 999px;
          text-decoration: none;
          transition: color .15s, background .15s;
        }
        .swn-link:hover { color: #1d1d1f; background: #f2f2f5; }
        .swn-link.active {
          color: #1360ee;
          background: rgba(19,96,238,.10);
          font-weight: 700;
        }
        .swn-cta {
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          padding: 10px 22px;
          border-radius: 999px;
          border: none;
          background: #1360ee;
          color: #fff;
          font-family: inherit;
          white-space: nowrap;
          transition: background .15s, transform .15s;
        }
        .swn-cta:hover { background: #0d4fd4; transform: translateY(-1px); }
        @media (max-width: 900px) { .swn-pills { display: none !important; } .swn-hamburger { display: flex !important; } }
      `}</style>

      <nav className="swn-root">
        <div className="swn-inner">
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
            <Image src="/logo.png" alt="Locator" width={100} height={32} style={{ width: 'auto', height: '32px', objectFit: 'contain' }} priority />
          </Link>

          {/* Nav links */}
          <div className="swn-pills" style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>
            {NAV_LINKS.map(l => {
              const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              return (
                <Link key={l.href} href={l.href} className={`swn-link${isActive ? ' active' : ''}`}>
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Right: flag + CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Image src="/uae-flag.svg" alt="UAE" width={28} height={28} style={{ borderRadius: '50%', display: 'block' }} />
            <button className="swn-cta">Get a quote</button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="swn-hamburger"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#1d1d1f',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && mounted && createPortal(
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #e3e3e6' }}>
            <Image src="/logo.png" alt="Locator" width={96} height={30} style={{ width: 'auto', height: '30px' }} />
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
                      color: isActive ? '#1360ee' : '#1d1d1f',
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
            <button style={{ width: '100%', padding: '14px', borderRadius: '999px', border: 'none', background: '#1360ee', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Get a quote
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
