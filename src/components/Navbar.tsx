'use client'

import { useState } from 'react'
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
  const CTA_LINE_HEIGHT = 22

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

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col lg:hidden"
          style={{
            background: 'linear-gradient(175deg, #052240 0%, #093868 35%, #126090 70%, #1a84b8 100%)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <Image
              src="/logo.png"
              alt="Locator"
              width={100}
              height={35}
              style={{ width: 'auto', height: '35px' }}
            />
            <button
              onClick={() => setOpen(false)}
              className="text-white p-2"
              aria-label="Close navigation"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <ul className="flex flex-col flex-1 overflow-y-auto list-none m-0 px-5 py-4 gap-0">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-4 text-white font-semibold text-base border-b border-white/10 hover:opacity-75 transition-opacity"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="px-5 py-6">
            <button
              style={{
                background: '#ffffff',
                color: '#1a6e9a',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </>
  )
}
