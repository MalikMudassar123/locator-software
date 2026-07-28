'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { REGULATORY_PRODUCTS } from '@/components/regulatory/data'
import { ABOUT_PAGES } from '@/components/about/data'
import { SERVICE_PAGES } from '@/components/service/data'
import { SOFTWARE_MODULES } from '@/components/software/modules-data'
import { INDUSTRY_NAV_ITEMS } from '@/components/industries/industries-nav'

const QUOTE_HREF = '/get-a-quote'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/software', label: 'Software' },
  { href: '/service', label: 'Service' },
  { href: '/industries', label: 'Industries' },
  { href: '/regulatory', label: 'Regulatory GPS Certifications' },
  { href: '/contact', label: 'Contact' },
]

// Nav items that open the shutter mega-menu instead of navigating directly.
type NavDropdownItem = { slug: string; name: string; tagline: string; accent: string; icon: React.ReactNode }
const NAV_DROPDOWNS: Record<string, { items: NavDropdownItem[]; base: string; label: string; blurb: string; hash?: boolean; navigable?: boolean }> = {
  '/regulatory': { items: REGULATORY_PRODUCTS, base: '',        label: 'Regulatory GPS Certifications', blurb: 'Certified GPS & OBU solutions built to meet UAE regulatory requirements.' },
  '/about':      { items: ABOUT_PAGES,         base: '/about',  label: 'About Locator',                 blurb: 'Who we are, where we’re headed, and the people behind the platform.' },
  '/software':   { items: SOFTWARE_MODULES,    base: '/software', label: 'Software Platform',           blurb: 'Jump straight to any module of the Locator fleet platform.', hash: true, navigable: true },
  '/service':    { items: SERVICE_PAGES,       base: '/service', label: 'Locator Services',              blurb: 'End-to-end fleet, video, and IoT services for every operation.' },
  // navigable: the label stays a real link to /industries (like /software), so the
  // overview page is still reachable by click while hover opens the menu.
  '/industries': { items: INDUSTRY_NAV_ITEMS,  base: '/industries', label: 'Industries We Serve',       blurb: 'Telematics built around how your sector actually operates.', navigable: true },
}

const itemHref = (dd: { base: string; hash?: boolean }, slug: string) =>
  dd.hash ? `${dd.base}#${slug}` : `${dd.base}/${slug}`

// Every mega-menu icon chip uses this one colour, deliberately overriding each item's
// own `accent`. The per-item accents still drive the destination PAGES (RegulatoryGrid,
// AboutPillarNav, ServiceProcess, SmartIotFeatures and others read the same field), and
// they are right there — a page gets to own its identity colour. In a dropdown they are
// wrong: five items in five hues turn a navigation list into a colour chart and make
// items look categorically different when they are just siblings. Overriding here rather
// than flattening the data keeps both behaviours.
const MENU_ICON_ACCENT = '#1360ee'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ctaHover, setCtaHover] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null) // open shutter mega-menu
  const [renderMenu, setRenderMenu] = useState<string | null>(null) // kept during close anim
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const CTA_LINE_HEIGHT = 22

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => { if (activeMenu) setRenderMenu(activeMenu) }, [activeMenu])
  useEffect(() => { setActiveMenu(null); setOpen(false) }, [pathname])

  const openMega = (href: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setActiveMenu(href)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActiveMenu(null), 130)
  }
  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }
  const activeDD = renderMenu ? NAV_DROPDOWNS[renderMenu] : null

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
        .hn-chev { transition: transform .3s cubic-bezier(.22,.61,.36,1); flex-shrink: 0; }

        /* ── Shutter mega-menu (drops from the top, full width) ─────────────── */
        .hn-backdrop {
          position: fixed; inset: 80px 0 0 0; z-index: 1000;
          background: rgba(6,20,60,0.22);
          opacity: 0; pointer-events: none;
          transition: opacity .32s ease;
        }
        .hn-backdrop.open { opacity: 1; pointer-events: auto; }

        .hn-mega {
          position: fixed; top: 80px; left: 0; right: 0; z-index: 1001;
          background: #ffffff;
          border-bottom: 1px solid #ececf1;
          box-shadow: 0 40px 60px -34px rgba(15,23,42,.32);
          display: grid; grid-template-rows: 0fr;
          opacity: 0; pointer-events: none;
          transition: grid-template-rows .52s cubic-bezier(.16,1,.3,1),
                      opacity .34s ease;
          will-change: grid-template-rows;
        }
        .hn-mega.open { grid-template-rows: 1fr; opacity: 1; pointer-events: auto; }
        .hn-mega-clip { overflow: hidden; min-height: 0; }
        .hn-mega-inner {
          max-width: 1200px; margin: 0 auto;
          padding: clamp(26px,3vw,40px) clamp(20px,4vw,48px) clamp(32px,3.4vw,46px);
          opacity: 0; transform: translateY(-10px);
          transition: opacity .4s ease .04s, transform .55s cubic-bezier(.16,1,.3,1) .04s;
        }
        .hn-mega.open .hn-mega-inner { opacity: 1; transform: none; }
        .hn-mega-head { margin-bottom: 22px; }
        .hn-mega-label { font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #1360ee; }
        .hn-mega-blurb { margin: 6px 0 0; font-size: 14px; color: #6e6e73; max-width: 560px; line-height: 1.5; }

        .hn-mega-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; }
        @media (max-width: 1160px) { .hn-mega-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
        @media (max-width: 1000px) { .hn-mega-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }

        .hn-mega-card {
          display: flex; align-items: center; gap: 13px;
          padding: 13px 14px; border-radius: 14px;
          text-decoration: none; border: 1px solid transparent;
          transition: background .2s cubic-bezier(.22,.61,.36,1), border-color .2s ease, transform .2s cubic-bezier(.22,.61,.36,1), box-shadow .2s ease;
        }
        .hn-mega-card:hover { background: #f6f8fd; border-color: #e6ebf5; transform: translateY(-2px); box-shadow: 0 12px 26px -14px rgba(20,40,90,.3); }
        .hn-mega-ic {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          display: grid; place-items: center;
          transition: transform .22s cubic-bezier(.34,1.3,.64,1);
        }
        .hn-mega-card:hover .hn-mega-ic { transform: scale(1.08) rotate(-3deg); }
        .hn-mega-ic svg { width: 21px; height: 21px; }
        .hn-mega-name { display: block; font-size: 14.5px; font-weight: 700; color: #1d1d1f; line-height: 1.25; }
        .hn-mega-tag { display: block; font-size: 12px; color: #8e8e93; line-height: 1.35; margin-top: 2px; }
        .hn-mega-go { margin-left: auto; color: #cfd3dc; flex-shrink: 0; opacity: 0; transform: translateX(-4px); transition: transform .2s ease, color .2s ease, opacity .2s ease; }
        .hn-mega-card:hover .hn-mega-go { color: #1360ee; transform: translateX(0); opacity: 1; }

        @keyframes hnCardIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .hn-mega.open .hn-mega-card { animation: hnCardIn .5s cubic-bezier(.16,1,.3,1) both; }
        .hn-mega.open .hn-mega-card:nth-child(1) { animation-delay: .06s; }
        .hn-mega.open .hn-mega-card:nth-child(2) { animation-delay: .10s; }
        .hn-mega.open .hn-mega-card:nth-child(3) { animation-delay: .14s; }
        .hn-mega.open .hn-mega-card:nth-child(4) { animation-delay: .18s; }
        .hn-mega.open .hn-mega-card:nth-child(5) { animation-delay: .22s; }
        .hn-mega.open .hn-mega-card:nth-child(6) { animation-delay: .26s; }
        .hn-mega.open .hn-mega-card:nth-child(7) { animation-delay: .30s; }
        .hn-mega.open .hn-mega-card:nth-child(8) { animation-delay: .34s; }
        @media (prefers-reduced-motion: reduce) {
          .hn-mega { transition: opacity .2s ease; }
          .hn-mega-inner { transition: opacity .2s ease; transform: none; }
          .hn-mega.open .hn-mega-card { animation: none; }
        }
      `}</style>

      <nav
        className="absolute top-0 left-0 right-0 z-10 h-16 md:h-20"
        style={{ paddingLeft: 'clamp(20px, 4vw, 50px)', paddingRight: 'clamp(20px, 4vw, 50px)' }}
        onMouseLeave={scheduleClose}
      >
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" onMouseEnter={() => setActiveMenu(null)}>
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
            {navLinks.map(l => {
              const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              const dd = NAV_DROPDOWNS[l.href]
              const isCurrent = activeMenu === l.href
              return (
                <li key={l.href}>
                  {dd && dd.navigable ? (
                    <Link
                      href={l.href}
                      aria-haspopup="menu"
                      aria-expanded={isCurrent}
                      onMouseEnter={() => openMega(l.href)}
                      onClick={() => setActiveMenu(null)}
                      className="text-white text-sm transition-all whitespace-nowrap"
                      style={{
                        fontWeight: isActive ? 800 : 600,
                        opacity: isActive || isCurrent ? 1 : 0.82,
                        borderBottom: isActive ? '2px solid rgba(255,255,255,0.85)' : '2px solid transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        paddingBottom: '2px',
                      }}
                    >
                      {l.label}
                      <svg className="hn-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: isCurrent ? 'rotate(180deg)' : 'none' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </Link>
                  ) : dd ? (
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isCurrent}
                      onMouseEnter={() => openMega(l.href)}
                      onClick={() => (isCurrent ? setActiveMenu(null) : openMega(l.href))}
                      className="text-white text-sm transition-all whitespace-nowrap"
                      style={{
                        fontWeight: isActive ? 800 : 600,
                        opacity: isActive || isCurrent ? 1 : 0.82,
                        borderBottom: isActive ? '2px solid rgba(255,255,255,0.85)' : '2px solid transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderTop: 'none',
                        paddingTop: 0,
                        paddingBottom: '2px',
                        paddingLeft: 0,
                        paddingRight: 0,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {l.label}
                      <svg className="hn-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: isCurrent ? 'rotate(180deg)' : 'none' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={l.href}
                      onMouseEnter={() => setActiveMenu(null)}
                      className="text-white text-sm transition-all whitespace-nowrap"
                      style={{
                        fontWeight: isActive ? 800 : 600,
                        opacity: isActive ? 1 : 0.82,
                        borderBottom: isActive ? '2px solid rgba(255,255,255,0.85)' : '2px solid transparent',
                        paddingBottom: '2px',
                      }}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3" onMouseEnter={() => setActiveMenu(null)}>
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
                onClick={() => router.push(QUOTE_HREF)}
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

      {/* Shutter mega-menu — portaled to <body> so it overlays the hero cleanly */}
      {mounted && createPortal(
        <>
          <div className={`hn-backdrop${activeMenu ? ' open' : ''}`} onMouseEnter={scheduleClose} onClick={() => setActiveMenu(null)} aria-hidden="true" />
          <div
            className={`hn-mega${activeMenu ? ' open' : ''}`}
            role="menu"
            aria-label={activeDD?.label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="hn-mega-clip">
              {activeDD && (
                <div className="hn-mega-inner">
                  <div className="hn-mega-head">
                    <span className="hn-mega-label">{activeDD.label}</span>
                    <p className="hn-mega-blurb">{activeDD.blurb}</p>
                  </div>
                  <div className="hn-mega-grid">
                    {activeDD.items.map(p => (
                      <Link key={p.slug} href={itemHref(activeDD, p.slug)} className="hn-mega-card" role="menuitem" onClick={() => setActiveMenu(null)}>
                        <span className="hn-mega-ic" style={{ background: `${MENU_ICON_ACCENT}14`, color: MENU_ICON_ACCENT }}>{p.icon}</span>
                        <span style={{ minWidth: 0 }}>
                          <span className="hn-mega-name">{p.name}</span>
                          <span className="hn-mega-tag">{p.tagline}</span>
                        </span>
                        <svg className="hn-mega-go" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body
      )}

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
            {navLinks.map((l, i) => {
              const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              const dd = NAV_DROPDOWNS[l.href]
              const isDropdown = !!dd
              return (
              <li
                key={l.href}
                className="mobile-drawer-item"
                style={{ animationDelay: `${0.05 + i * 0.06}s` }}
              >
                {isDropdown ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'rgba(255,255,255,0.82)',
                      fontWeight: 600,
                      padding: '16px 8px 16px 12px',
                      fontSize: '17px',
                      letterSpacing: '0.01em',
                      borderBottom: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <span>{l.label}</span>
                  </div>
                ) : (
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.82)',
                      fontWeight: isActive ? 800 : 600,
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
                )}
                {dd && (
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0 8px 22px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                    {dd.items.map(p => (
                      <Link
                        key={p.slug}
                        href={itemHref(dd, p.slug)}
                        onClick={() => setOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '11px 4px', fontSize: '15px', fontWeight: 600,
                          color: 'rgba(255,255,255,0.78)', textDecoration: 'none',
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', flexShrink: 0 }} />
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              )
            })}
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
              onClick={() => { setOpen(false); router.push(QUOTE_HREF) }}
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
