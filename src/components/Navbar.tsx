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
  const megaInnerRef = useRef<HTMLDivElement>(null)
  const [megaH, setMegaH] = useState(0)
  const pathname = usePathname()
  const router = useRouter()
  // Roll height for the hover text swap. In em (not px) so the two label copies
  // track the button's fluid font-size and the pill keeps the same height as the
  // software navbar's CTA, whose line box is the font's normal ~1.2.
  const CTA_LINE_HEIGHT = '1.2em'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => { if (activeMenu) setRenderMenu(activeMenu) }, [activeMenu])
  useEffect(() => { setActiveMenu(null); setOpen(false) }, [pathname])

  // Measured height of the shutter's contents, published to CSS as --mega-h.
  //
  // The panel used to open by transitioning grid-template-rows 0fr → 1fr. That
  // technique animates an intrinsic size, so the browser re-resolves layout every
  // frame — and it has no defined value to interpolate *between* when the content
  // swaps, which is why moving from one menu to another snapped instead of easing.
  // A measured pixel height fixes both: the transition has real endpoints, so
  // switching menus glides from the old height to the new one.
  //
  // ResizeObserver rather than a one-shot measure — it catches the grid dropping
  // from four columns to three at a breakpoint, and fonts loading in late, both of
  // which change the height after the initial read.
  useEffect(() => {
    const el = megaInnerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setMegaH(el.offsetHeight))
    ro.observe(el)
    setMegaH(el.offsetHeight)
    return () => ro.disconnect()
  }, [renderMenu, mounted])

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
  // Navbar flips to a white bar with the blue wordmark whenever the mega-menu
  // shutter or the mobile drawer is showing — matches the white panel beneath it
  // instead of leaving a blue bar floating above a white one.
  const isPanelOpen = open || !!activeMenu
  const navTextColor = isPanelOpen ? '#1d1d1f' : '#ffffff'
  const navUnderline = isPanelOpen ? '#1360ee' : 'rgba(255,255,255,0.85)'

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

        /* ── Mobile drawer sizing ─────────────────────────────────────────────
           100vh on mobile is the viewport WITH the URL bar retracted, so on first
           paint the drawer is taller than what is actually visible and the bottom
           CTA sits below the fold — unreachable until the user scrolls the page
           behind it. dvh tracks the visible viewport; the vh line stays as the
           fallback for browsers that don't know dvh.
           inset instead of width:100vw: 100vw counts the scrollbar gutter on
           desktop, which pushed the drawer a few px wider than the viewport. */
        .hn-drawer {
          position: fixed;
          inset: 0;
          height: 100vh;
          height: 100dvh;
        }

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
          /* Measured px height (see --mega-h) rather than grid-template-rows 0fr→1fr.
             The fr trick animates an intrinsic size — no defined endpoints — so it
             cannot interpolate when the content swaps, and it re-resolves layout
             every frame. */
          /* Clipping happens on .hn-mega-clip, one level down, not here — the shadow
             strip below is a child, and a parent with overflow:hidden would cut the
             very shadow it is meant to cast. */
          height: 0;
          opacity: 0; pointer-events: none;
          /* Closing. Declared on the base rule, so it is the direction that plays
             when .open is removed: the panel is gone in .2s while the height eases
             out slightly slower, which reads as it being pulled up rather than
             deflating. Content leaves first — see .hn-mega-inner. */
          transition: height .32s cubic-bezier(.36,0,.28,1), opacity .19s ease;
          /* Own compositor layer. Without it the height change repaints the panel
             into whatever layer the hero occupies, and every frame drags the page
             behind it through paint as well. */
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: height;
        }
        /* The drop shadow lives on a pseudo-element pinned to the bottom edge rather
           than on .hn-mega itself. A 60px-blur shadow on a box whose height changes
           every frame has to be re-rasterised every frame, and on a full-width panel
           that is the single most expensive thing in the whole animation. Here it is
           a fixed-size strip that the panel simply carries down with it. */
        .hn-mega::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0;
          height: 60px; pointer-events: none;
          box-shadow: 0 40px 60px -34px rgba(15,23,42,.32);
        }
        .hn-mega.open {
          height: var(--mega-h, 0px); opacity: 1; pointer-events: auto;
          /* Opening. Longer, and on a decelerating curve so it arrives softly.
             Asymmetry is what makes a drawer feel weighted — the same curve both
             ways always feels mechanical. */
          /* easeOutQuint-ish: ~70% of the distance is covered in the first third, then
             a long tail. That front-loading is what makes a drawer feel responsive to
             the hover while still settling gently instead of stopping dead. */
          transition: height .52s cubic-bezier(.19,1,.22,1), opacity .16s ease;
        }
        .hn-mega-clip { height: 100%; overflow: hidden; min-height: 0; }
        .hn-mega-inner {
          max-width: 1200px; margin: 0 auto;
          padding: clamp(26px,3vw,40px) clamp(20px,4vw,48px) clamp(32px,3.4vw,46px);
          /* Seals this subtree off from the parent's height animation. Without it the
             browser has to consider re-laying-out every card, icon and line of text
             on each frame of the open; with it the panel's height is proven not to
             affect anything inside, so the frames cost a clip and nothing more. This
             is the difference between smooth and butter on a slow machine. */
          contain: layout style;
          /* Closed state doubles as the close transition: fast fade, no delay, so the
             text is gone before the panel has collapsed far enough to crop it. */
          opacity: 0; transform: translateY(-8px);
          transition: opacity .16s ease, transform .2s ease;
          will-change: transform, opacity;
        }
        .hn-mega.open .hn-mega-inner {
          opacity: 1; transform: none;
          /* Shorter than the panel's .52s and started immediately, so the content
             finishes settling before the panel does. Content that lands last always
             looks like it is catching up with the drawer. */
          transition: opacity .3s ease .02s, transform .44s cubic-bezier(.19,1,.22,1) .02s;
        }
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

        /* Stagger tightened from 40ms to 26ms steps. The last of eight cards used to
           finish at ~0.84s — long after the panel itself had settled, which is what
           made the open read as laggy even though the drawer was quick. */
        @keyframes hnCardIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .hn-mega.open .hn-mega-card { animation: hnCardIn .42s cubic-bezier(.16,1,.3,1) both; }
        .hn-mega.open .hn-mega-card:nth-child(1) { animation-delay: .05s; }
        .hn-mega.open .hn-mega-card:nth-child(2) { animation-delay: .076s; }
        .hn-mega.open .hn-mega-card:nth-child(3) { animation-delay: .102s; }
        .hn-mega.open .hn-mega-card:nth-child(4) { animation-delay: .128s; }
        .hn-mega.open .hn-mega-card:nth-child(5) { animation-delay: .154s; }
        .hn-mega.open .hn-mega-card:nth-child(6) { animation-delay: .18s; }
        .hn-mega.open .hn-mega-card:nth-child(7) { animation-delay: .206s; }
        .hn-mega.open .hn-mega-card:nth-child(8) { animation-delay: .232s; }
        @media (prefers-reduced-motion: reduce) {
          .hn-mega, .hn-mega.open { transition: opacity .2s ease; }
          .hn-mega-inner, .hn-mega.open .hn-mega-inner { transition: opacity .2s ease; transform: none; }
          .hn-mega.open .hn-mega-card { animation: none; }
        }
      `}</style>

      <nav
        className="absolute top-0 left-0 right-0 z-10 h-16 md:h-20"
        style={{
          paddingLeft: 'clamp(20px, 4vw, var(--nav-pad))',
          paddingRight: 'clamp(20px, 4vw, var(--nav-pad))',
          background: isPanelOpen ? '#ffffff' : 'transparent',
          boxShadow: isPanelOpen ? '0 1px 0 rgba(15,23,42,0.08)' : 'none',
          transition: 'background .3s ease, box-shadow .3s ease',
        }}
        onMouseLeave={scheduleClose}
      >
        <div className="h-full flex items-center justify-between">
          {/* Logo — cross-fades to the blue wordmark (same file the footer uses) once the bar
              goes white. Fixed-size box + two stacked images so the swap never changes the
              logo's rendered width — a src swap between differently-proportioned files would
              otherwise nudge the nav links sideways every time the bar toggles. */}
          <Link
            href="/"
            className="flex items-center"
            onMouseEnter={() => setActiveMenu(null)}
            style={{ position: 'relative', width: 'calc(var(--nav-logo-h) * 3)', height: 'var(--nav-logo-h)', flexShrink: 0 }}
          >
            <span className="sr-only">Locator</span>
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="120px"
              style={{ objectFit: 'contain', objectPosition: 'left center', opacity: isPanelOpen ? 0 : 1, transition: 'opacity .3s ease' }}
              priority
            />
            <Image
              src="/logo-blue.png"
              alt=""
              fill
              sizes="120px"
              style={{ objectFit: 'contain', objectPosition: 'left center', opacity: isPanelOpen ? 1 : 0, transition: 'opacity .3s ease' }}
            />
          </Link>

          {/* Nav Links — desktop only */}
          <ul className="hn-navlinks hidden lg:flex items-center gap-6 list-none m-0 p-0">
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
                      className="text-sm transition-all whitespace-nowrap"
                      style={{
                        color: navTextColor,
                        fontWeight: isActive ? 800 : 600,
                        opacity: isActive || isCurrent ? 1 : 0.82,
                        borderBottom: isActive ? `2px solid ${navUnderline}` : '2px solid transparent',
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
                      className="text-sm transition-all whitespace-nowrap"
                      style={{
                        color: navTextColor,
                        fontWeight: isActive ? 800 : 600,
                        opacity: isActive || isCurrent ? 1 : 0.82,
                        borderBottom: isActive ? `2px solid ${navUnderline}` : '2px solid transparent',
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
                      className="text-sm transition-all whitespace-nowrap"
                      style={{
                        color: navTextColor,
                        fontWeight: isActive ? 800 : 600,
                        opacity: isActive ? 1 : 0.82,
                        borderBottom: isActive ? `2px solid ${navUnderline}` : '2px solid transparent',
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
              className="hn-flag rounded-full hidden sm:block"
              style={{ border: isPanelOpen ? '2px solid #e2e7f0' : '2px solid rgba(255,255,255,0.3)' }}
            />

            {/* Get a Quote — desktop. A single blade of light travels around the pill's
                rim: a conic gradient rotated via a registered @property angle, masked
                down to the border band, with a blurred copy underneath for the halo.
                See .nav-cta-ring / .nav-cta-wrap::before in globals.css. */}
            {/* Pointer layer. Owns the tilt, the magnetic pull and the position of the
                cursor light; the wrap inside owns the looping breathe. They have to be
                separate elements because a CSS animation on `transform` wins over any
                declared transform, so tilt and breathe on one element cannot coexist.
                Vars are written straight onto the node rather than through state — this
                fires on every mousemove, and a re-render per frame would be absurd. */}
            <div
              className="hidden sm:inline-flex nav-cta-tilt"
              onMouseMove={(e) => {
                const el = e.currentTarget
                const r = el.getBoundingClientRect()
                const x = (e.clientX - r.left) / r.width
                const y = (e.clientY - r.top) / r.height
                el.style.setProperty('--mx', `${x * 100}%`)
                el.style.setProperty('--my', `${y * 100}%`)
                // Rotate away from the cursor on the vertical axis, toward it on the
                // horizontal — the combination reads as a solid object being looked at
                // from an angle rather than a card flopping about.
                el.style.setProperty('--ty', `${(x - 0.5) * 15}deg`)
                el.style.setProperty('--tx', `${(0.5 - y) * 11}deg`)
                el.style.setProperty('--pull-x', `${(x - 0.5) * 7}px`)
                el.style.setProperty('--pull-y', `${(y - 0.5) * 5}px`)
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.setProperty('--tx', '0deg')
                el.style.setProperty('--ty', '0deg')
                el.style.setProperty('--pull-x', '0px')
                el.style.setProperty('--pull-y', '0px')
                el.style.setProperty('--mx', '50%')
                el.style.setProperty('--my', '50%')
              }}
            >
            <div
              className="inline-flex items-center justify-center nav-cta-wrap"
              style={{
                // One tone, not a spectrum. Multi-hue gradients are the thing that dates
                // a control fastest; a single blade of light travelling a fine rim is the
                // current premium read, and it costs the brand nothing because the only
                // colour on the hero is the light itself. --cta-light is the head of the
                // blade, --cta-dim the tail it fades out through.
                //
                // Over the blue hero the light is pure white — maximum value contrast
                // against the backdrop without introducing a second hue. Over the white
                // bar white would be invisible, so it becomes the brand blue.
                '--cta-light': isPanelOpen ? '#1360ee' : '#ffffff',
                '--cta-dim': isPanelOpen ? 'rgba(19,96,238,0.28)' : 'rgba(255,255,255,0.32)',
                // Bloom around the filament, same hue as the light so the glow reads as
                // the light spilling rather than as a separate coloured shadow.
                '--cta-glow': isPanelOpen ? 'rgba(19,120,255,0.7)' : 'rgba(255,255,255,0.92)',
                // The unlit rim. Glass, not metal: a low-alpha tone of the backdrop's own
                // colour, so between passes the pill reads as a quiet frosted edge instead
                // of an outline drawn round it. All the drama comes from the light moving
                // over it, which is what keeps the resting state calm and the motion loud.
                '--cta-track': isPanelOpen ? 'rgba(15,23,42,0.10)' : 'rgba(255,255,255,0.30)',
                // Glass shaping on that rim — a lit top edge and a containing hairline.
                // Cheap to add and it is what stops the resting state looking like a
                // plain translucent band between passes of the light.
                '--cta-edge': isPanelOpen ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.75)',
                '--cta-hairline': isPanelOpen ? 'rgba(15,23,42,0.10)' : 'rgba(255,255,255,0.22)',
              } as React.CSSProperties}
            >
              <span className="nav-cta-ring" aria-hidden="true" />
              <button
                className="nav-cta-pulse"
                style={{
                  // Barely-there vertical gradient rather than flat #fff — it catches the
                  // eye as a lit surface instead of a paper cut-out. No transform here:
                  // the wrap owns the hover lift, and a static offset on the button would
                  // push it off-centre inside the ring and make the band uneven.
                  background: 'linear-gradient(180deg, #ffffff 0%, #f4f8fd 100%)',
                  color: '#0a89dd',
                  border: 'none',
                  // Size + shape matched to the software navbar's .swn-cta pill.
                  borderRadius: '999px',
                  padding: 'var(--nav-cta-py) max(22px, min(0.66vw + 11.7px, 29px))',
                  fontSize: 'var(--nav-link)',
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.015em',
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
                    height: CTA_LINE_HEIGHT,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      transition: 'transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)',
                      transform: ctaHover ? `translateY(-${CTA_LINE_HEIGHT})` : 'translateY(0)',
                      willChange: 'transform',
                    }}
                  >
                    <span style={{ display: 'block', height: CTA_LINE_HEIGHT, lineHeight: CTA_LINE_HEIGHT }}>
                      Get a Quote
                    </span>
                    <span style={{ display: 'block', height: CTA_LINE_HEIGHT, lineHeight: CTA_LINE_HEIGHT }}>
                      Get a Quote
                    </span>
                  </span>
                </span>
                <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                  Get a Quote
                </span>
              </button>

              {/* Sparks. Two four-point glints that pop on the flare beat, the second
                  offset so they fire in sequence rather than together — a single
                  synchronised pair reads as decoration, a staggered one reads as an
                  event happening. Drawn as SVG rather than CSS shapes because a true
                  concave star needs curves, and a gradient-built one always reads as
                  a plus sign. */}
              <span className="nav-cta-spark nav-cta-spark--a" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c.6 6.6 4.8 10.8 12 12-7.2 1.2-11.4 5.4-12 12-.6-6.6-4.8-10.8-12-12C7.2 10.8 11.4 6.6 12 0Z" />
                </svg>
              </span>
              <span className="nav-cta-spark nav-cta-spark--b" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c.6 6.6 4.8 10.8 12 12-7.2 1.2-11.4 5.4-12 12-.6-6.6-4.8-10.8-12-12C7.2 10.8 11.4 6.6 12 0Z" />
                </svg>
              </span>
            </div>
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
            style={{ '--mega-h': `${megaH}px` } as React.CSSProperties}
          >
            <div className="hn-mega-clip">
              {activeDD && (
                <div className="hn-mega-inner" ref={megaInnerRef}>
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
          className="mobile-drawer-enter hn-drawer"
          style={{
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
