'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/partners', label: 'Partners' },
  { href: '/why-locator', label: 'Why Locator' },
  { href: '/blog', label: 'Blog' },
]

const serviceLinks = [
  { href: '/gps-tracker', label: 'GPS Tracker' },
  { href: '/car-tracker', label: 'Car Tracker' },
  { href: '/gps-tracking-system', label: 'GPS Tracking System' },
  { href: '/car-gps-tracker', label: 'Car GPS Tracker' },
  { href: '/car-tracking-system', label: 'Car Tracking System' },
  { href: '/vehicle-tracking-system', label: 'Vehicle Tracking System' },
  { href: '/securepath', label: 'Securepath' },
  { href: '/asateel-certified-obu', label: 'Asateel Certified OBU' },
]

const supportLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/benefits-of-gps-tracking', label: 'Benefits Of GPS Tracking' },
]

const socialLinks = [
  {
    href: 'https://facebook.com', label: 'Facebook',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    href: 'https://instagram.com', label: 'Instagram',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
  {
    href: 'https://twitter.com', label: 'Twitter',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>,
  },
  {
    href: 'https://plus.google.com', label: 'Google+',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" /></svg>,
  },
]

const INPUT_BASE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.09)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: '8px',
  padding: '8px 11px',
  color: '#ffffff',
  fontSize: '12px',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
  transition: 'border-color 0.18s, background 0.18s',
}

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(79,195,247,0.55)'
    e.currentTarget.style.background  = 'rgba(255,255,255,0.13)'
  }
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
    e.currentTarget.style.background  = 'rgba(255,255,255,0.09)'
  }

  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      /* HERO PALETTE — pixel-matched to .hero-gradient-flow base ramp */
      background: 'linear-gradient(180deg, #1360ee 0%, #0a84e3 45%, #3abede 75%, #97def1 100%)',
    }}>

      {/* ── Ambient glow layer ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Top-left orb — hero deep navy patch (rgba 13,47,165) */}
        <div style={{ position: 'absolute', width: '480px', height: '480px', top: '-120px', left: '-80px', background: 'radial-gradient(circle, rgba(13,47,165,0.32) 0%, transparent 65%)', borderRadius: '50%' }} />
        {/* Bottom-right orb — hero sky-cyan patch (rgba 58,190,222) */}
        <div style={{ position: 'absolute', width: '420px', height: '420px', bottom: '-60px', right: '-60px', background: 'radial-gradient(circle, rgba(58,190,222,0.22) 0%, transparent 65%)', borderRadius: '50%' }} />
        {/* Centre ambient — hero pale-ice patch (rgba 193,235,247) */}
        <div style={{ position: 'absolute', width: '600px', height: '300px', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse, rgba(193,235,247,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        {/* Top glow line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.5) 35%, rgba(255,255,255,0.3) 50%, rgba(79,195,247,0.5) 65%, transparent)' }} />
        {/* Subtle dot-grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      {/* ── Wave cap ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: '100%', height: '40px', display: 'block' }}>
          <path d="M0,20 C360,40 720,0 1080,20 C1260,32 1380,10 1440,20 L1440,0 L0,0 Z" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>

      {/* ════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '44px clamp(16px,3.5vw,48px) 0' }}>

        {/* ── 5-column grid: [form] [company] [services] [support] [connect] ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(200px,22%,280px) repeat(3, 1fr) clamp(180px,20%,240px)',
          gap: 'clamp(20px,2.5vw,36px)',
          alignItems: 'start',
        }}
          className="footer-main-grid"
        >

          {/* ── Quick Contact ── */}
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 6px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.09)',
          }}>
            <h3 style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4fc3f7', boxShadow: '0 0 7px rgba(79,195,247,0.9)', display: 'inline-block', flexShrink: 0 }} />
              Quick Contact
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Name + Phone side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input placeholder="Name" type="text" value={form.name} onChange={set('name')} style={INPUT_BASE} onFocus={focusIn} onBlur={focusOut} />
                <input placeholder="Phone" type="tel" value={form.phone} onChange={set('phone')} style={INPUT_BASE} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <input placeholder="Email Address" type="email" value={form.email} onChange={set('email')} style={INPUT_BASE} onFocus={focusIn} onBlur={focusOut} />
              <textarea
                placeholder="Your message…"
                rows={2}
                value={form.message}
                onChange={set('message')}
                style={{ ...INPUT_BASE, resize: 'none', lineHeight: 1.5 }}
                onFocus={focusIn}
                onBlur={focusOut}
              />
              <button
                style={{
                  background: 'linear-gradient(135deg, #1a8fe0 0%, #1060b0 100%)',
                  border: '1px solid rgba(79,195,247,0.28)',
                  borderRadius: '8px',
                  padding: '9px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  letterSpacing: '0.05em',
                  width: '100%',
                  boxShadow: '0 3px 14px rgba(26,143,224,0.38)',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,143,224,0.52)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 14px rgba(26,143,224,0.38)' }}
              >
                Send Message
              </button>
            </div>
            <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.32)', fontSize: '9.5px', lineHeight: 1.5 }}>
              We use cookies to give you the best experience on our website.
            </p>
          </div>

          {/* ── Company ── */}
          <FooterCol title="Company" links={companyLinks} />

          {/* ── Services ── */}
          <FooterCol title="Services" links={serviceLinks} />

          {/* ── Support ── */}
          <FooterCol title="Support" links={supportLinks} />

          {/* ── Connect ── */}
          <div>
            <ColHeading>Connect</ColHeading>

            {/* Compact map + overlay */}
            <a
              href="https://maps.google.com/?q=City+Tower+2+Sheikh+Zayed+Road+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.14)',
                marginBottom: '12px',
                position: 'relative',
                boxShadow: '0 4px 16px rgba(0,0,0,0.28)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.38)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.28)' }}
            >
              <iframe
                title="Locator Dubai"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1788!2d55.27076!3d25.20484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1cbe99!2sCity%20Tower%202!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100"
                style={{ border: 0, display: 'block', pointerEvents: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Subtle tinted overlay so map blends with dark theme */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,40,80,0.22)', pointerEvents: 'none' }} />
              {/* "View map" pill */}
              <div style={{ position: 'absolute', bottom: '7px', right: '7px', background: 'rgba(12,63,107,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(79,195,247,0.3)', borderRadius: '20px', padding: '3px 9px', color: '#fff', fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', pointerEvents: 'none' }}>
                VIEW MAP
              </div>
            </a>

            {/* Address + phone stacked compactly */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(79,195,247,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '1px', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: '11.5px', lineHeight: 1.5 }}>
                  City Tower 2, Sheikh Zayed Road, Dubai, UAE
                </span>
              </div>
              <a
                href="tel:+971508746688"
                style={{ display: 'flex', gap: '7px', alignItems: 'center', color: '#ffffff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#4fc3f7'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(79,195,247,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                050 874 66 88
              </a>
            </div>

            <a
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '7px',
                padding: '8px 14px',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                backdropFilter: 'blur(8px)',
                width: '100%',
                transition: 'background 0.18s, border-color 0.18s, transform 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,195,247,0.18)'; e.currentTarget.style.borderColor = 'rgba(79,195,247,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Get a Quote
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ margin: '32px 0 0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.3) 25%, rgba(255,255,255,0.15) 50%, rgba(79,195,247,0.3) 75%, transparent)' }} />

        {/* ── Bottom bar ── */}
        <div style={{ padding: '16px 0 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Locator" width={100} height={32} style={{ width: 'auto', height: '30px', opacity: 0.9 }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '32px', height: '32px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: '7px',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'background 0.18s, color 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,143,224,0.28)'; e.currentTarget.style.borderColor = 'rgba(79,195,247,0.45)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,143,224,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px' }}>
              Copyright 2026{' '}
              <a href="https://aryzetech.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.62)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                Synosys
              </a>
              {' '}| All Rights Reserved
            </span>
            <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '11px' }}>|</span>
            <Link
              href="/sitemap"
              style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', textDecoration: 'none', transition: 'color 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive grid override via style tag */}
      <style>{`
        @media (max-width: 1100px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
        @media (max-width: 720px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .footer-main-grid input::placeholder,
        .footer-main-grid textarea::placeholder {
          color: rgba(255,255,255,0.38);
        }
      `}</style>
    </footer>
  )
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={{
      color: 'rgba(255,255,255,0.58)',
      fontSize: '10.5px',
      fontWeight: 700,
      letterSpacing: '0.13em',
      textTransform: 'uppercase',
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
    }}>
      <span style={{ display: 'inline-block', width: '14px', height: '1.5px', background: 'linear-gradient(90deg, #4fc3f7, transparent)', borderRadius: '2px' }} />
      {children}
    </h4>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <ColHeading>{title}</ColHeading>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.18s, gap 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.gap = '9px' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.gap = '6px' }}
            >
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(79,195,247,0.65)', flexShrink: 0, display: 'inline-block' }} />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
