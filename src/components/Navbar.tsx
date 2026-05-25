'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/software', label: 'Software' },
  { href: '/service', label: 'Service' },
  { href: '/industries', label: 'Industries' },
  { href: '/regulatory', label: 'Regulatory GPS Certificate' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ctaHover, setCtaHover] = useState(false)
  const [mounted, setMounted] = useState(false)
  const CTA_LINE_HEIGHT = 22

  useEffect(() => {
    setMounted(true)
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
      <nav
        className="absolute top-0 left-0 right-0 z-10 h-16 md:h-20"
        style={{ paddingLeft: 'clamp(20px, 4vw, 50px)', paddingRight: 'clamp(20px, 4vw, 50px)' }}
      >
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Locator"
              width={120}
              height={40}
              style={{ width: 'auto', height: '40px' }}
              priority
            />
          </Link>

          {/* Nav Links — desktop only */}
          <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white font-semibold text-sm hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Image
              src="/uae-flag.svg"
              alt="UAE"
              width={32}
              height={32}
              className="rounded-full border-2 border-white/30 hidden sm:block"
            />

            {/* Get a Quote — desktop */}
            <div className="hidden sm:inline-flex items-center justify-center">
              <button
                className="nav-cta-pulse"
                style={{
                  background: '#ffffff',
                  color: '#0a89dd',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 26px',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                  transition: 'transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)',
                  transform: 'translateY(-1.5px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: 'block',
                    height: `${CTA_LINE_HEIGHT}px`,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      transition: 'transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)',
                      transform: ctaHover ? `translateY(-${CTA_LINE_HEIGHT}px)` : 'translateY(0)',
                      willChange: 'transform',
                    }}
                  >
                    <span style={{ display: 'block', height: `${CTA_LINE_HEIGHT}px`, lineHeight: `${CTA_LINE_HEIGHT}px` }}>
                      Get a Quote
                    </span>
                    <span style={{ display: 'block', height: `${CTA_LINE_HEIGHT}px`, lineHeight: `${CTA_LINE_HEIGHT}px` }}>
                      Get a Quote
                    </span>
                  </span>
                </span>
                <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                  Get a Quote
                </span>
              </button>
            </div>

            {/* Hamburger — visible below lg */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 text-white"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
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

      {/* Mobile drawer — rendered via portal to escape any ancestor containing block */}
      {open && mounted && createPortal(
        <div
          className="mobile-drawer-enter"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            background:
              'linear-gradient(165deg, #1360ee 0%, #0a84e3 38%, #08b2e0 72%, #3abede 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Soft warm sunrise glow at bottom — echoes the hero */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '32%',
              background:
                'radial-gradient(60% 100% at 50% 100%, rgba(251, 234, 188, 0.32) 0%, rgba(251, 234, 188, 0.12) 45%, rgba(251, 234, 188, 0) 90%)',
              pointerEvents: 'none',
            }}
          />

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              paddingRight: '72px',
              borderBottom: '1px solid rgba(255,255,255,0.14)',
              position: 'relative',
              zIndex: 2,
              boxSizing: 'border-box',
            }}
          >
            <Image
              src="/logo.png"
              alt="Locator"
              width={110}
              height={38}
              style={{ width: 'auto', height: '38px' }}
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              type="button"
              style={{
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#ffffff',
                border: 'none',
                color: '#0a89dd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                zIndex: 10,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflowY: 'auto',
              listStyle: 'none',
              margin: 0,
              padding: '20px 24px 16px',
              gap: 0,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {navLinks.map((l, i) => (
              <li
                key={l.href}
                className="mobile-drawer-item"
                style={{ animationDelay: `${0.05 + i * 0.06}s` }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#ffffff',
                    fontWeight: 600,
                    padding: '16px 8px 16px 12px',
                    fontSize: '17px',
                    letterSpacing: '0.01em',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    textDecoration: 'none',
                  }}
                >
                  <span>{l.label}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom region — flag + CTA */}
          <div
            style={{
              padding: '16px 24px 24px',
              position: 'relative',
              zIndex: 2,
              borderTop: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Image
                src="/uae-flag.svg"
                alt="UAE"
                width={28}
                height={28}
                className="rounded-full border-2 border-white/30"
              />
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 500 }}>
                United Arab Emirates
              </span>
            </div>
            <button
              style={{
                background: '#ffffff',
                color: '#0a89dd',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
                letterSpacing: '0.01em',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
              }}
            >
              Get a Quote
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
