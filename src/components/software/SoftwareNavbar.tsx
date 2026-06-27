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
          position: fixed;
          top: clamp(3px, 0.8vw, 9px);
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
          padding: 0 clamp(12px, 4vw, 40px);
        }
        /* Reserves the navbar's space in the hero flow, since the bar itself is
           portaled to <body> as a fixed element (so backdrop-filter can blur
           the real page — the hero's .sw-pin clips/isolates it otherwise). */
        .swn-spacer {
          height: calc(58px + clamp(6px, 1.6vw, 18px));
        }
        .swn-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 36px);
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          /* Frosted glass built into the panel (the ancestor .sw-pin's
             overflow:hidden + isolation defeats backdrop-filter sampling, so a
             plain translucent fill reads as flat white). A faint cool tint +
             diagonal sheen make it read as real glass even over a white page,
             while the blur still frosts content where it works. */
          background:
            linear-gradient(135deg,
              rgba(255, 255, 255, 0.62) 0%,
              rgba(238, 242, 252, 0.42) 48%,
              rgba(255, 255, 255, 0.55) 100%);
          -webkit-backdrop-filter: blur(20px) saturate(185%);
          backdrop-filter: blur(20px) saturate(185%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: clamp(14px, 1.6vw, 22px);
          /* Soft floating shadow + glossy top highlight + faint inner depth. */
          box-shadow:
            0 12px 40px rgba(15, 23, 42, 0.14),
            0 1px 2px rgba(15, 23, 42, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -8px 18px rgba(15, 23, 42, 0.03);
          /* Own compositing layer — avoids the black-backdrop glitch caused by
             the ancestor (overflow:hidden + isolation on .sw-pin). */
          transform: translateZ(0);
        }
        /* Browsers without backdrop-filter get a clean opaque-white bar. */
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .swn-inner { background: rgba(255, 255, 255, 0.9); }
        }
        @media (max-width: 600px) {
          .swn-root { padding-left: 10px; padding-right: 10px; }
          .swn-inner { border-radius: 14px; }
        }
        /* Classy entrance: the whole bar eases down on load */
        @media (prefers-reduced-motion: no-preference) {
          .swn-root { animation: swnDrop .7s cubic-bezier(.22,.61,.36,1) both; }
        }
        @keyframes swnDrop {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: none; }
        }

        .swn-link {
          position: relative;
          font-size: 13.5px;
          font-weight: 600;
          color: #52525e;
          white-space: nowrap;
          padding: 7px 14px;
          border-radius: 999px;
          text-decoration: none;
          transition: color .2s ease, background .2s ease;
        }
        /* Animated underline that grows from the centre */
        .swn-link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 2px;
          width: 0;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #1f6dff, #0d4fd4);
          transform: translateX(-50%);
          transition: width .28s cubic-bezier(.22,.61,.36,1);
        }
        .swn-link:hover { color: #1d1d1f; background: rgba(19,96,238,.06); }
        .swn-link:hover::after { width: 55%; }
        .swn-link.active {
          color: #1360ee;
          background: rgba(19,96,238,.10);
          font-weight: 700;
        }
        .swn-link.active::after { width: 55%; }

        /* Logo + flag micro-interactions */
        .swn-logo { transition: transform .25s cubic-bezier(.22,.61,.36,1); }
        .swn-logo:hover { transform: scale(1.05); }
        .swn-flag {
          transition: transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .25s ease;
          cursor: pointer;
        }
        .swn-flag:hover {
          transform: scale(1.12) rotate(4deg);
          box-shadow: 0 3px 10px rgba(15, 23, 42, 0.2);
        }
        .swn-cta {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          padding: 10px 22px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #1f6dff 0%, #1360ee 55%, #0d4fd4 100%);
          color: #fff;
          font-family: inherit;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(19, 96, 238, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .25s ease;
        }
        /* Glossy light sweep that glides across on hover */
        .swn-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.45) 50%, transparent 80%);
          transform: translateX(-130%);
          transition: transform .6s cubic-bezier(.22,.61,.36,1);
        }
        .swn-cta:hover {
          animation: none;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(19, 96, 238, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35);
        }
        .swn-cta:hover::before { transform: translateX(130%); }
        .swn-cta:active { transform: translateY(0) scale(.97); }
        @media (prefers-reduced-motion: no-preference) {
          .swn-cta {
            animation: swnCtaGlow 2.8s ease-in-out infinite;
          }
        }
        @keyframes swnCtaGlow {
          0%, 100% { box-shadow: 0 4px 14px rgba(19, 96, 238, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25); }
          50%      { box-shadow: 0 6px 20px rgba(19, 96, 238, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.3); }
        }
        @media (max-width: 900px) { .swn-pills { display: none !important; } .swn-hamburger { display: flex !important; } }
      `}</style>

      {/* Keeps the hero layout intact; the real bar is portaled out of flow. */}
      <div className="swn-spacer" aria-hidden="true" />

      {mounted && createPortal(
      <nav className="swn-root">
        <div className="swn-inner">
          {/* Logo */}
          <Link href="/" className="swn-logo" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
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
            <Image src="/uae-flag.svg" alt="UAE" width={28} height={28} className="swn-flag" style={{ borderRadius: '50%', display: 'block' }} />
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
      </nav>,
        document.body
      )}

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
