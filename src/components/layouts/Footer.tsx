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

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

const INPUT_BASE: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e2e7f0',
  borderRadius: '8px',
  padding: '8px 11px',
  color: '#1d1d1f',
  fontSize: '12px',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
  transition: `border-color 280ms ${EASE}, background 280ms ${EASE}, box-shadow 280ms ${EASE}`,
}

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#1360ee'
    e.currentTarget.style.boxShadow  = '0 0 0 3px rgba(19,96,238,0.10)'
  }
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#e2e7f0'
    e.currentTarget.style.boxShadow  = 'none'
  }

  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #f9fafc 0%, #f5f7fb 100%)',
    }}>

      {/* ── Faded top hairline (softer than a flat border) ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #dde3ee 20%, #dde3ee 80%, transparent)' }} />

      {/* ── Ambient depth — barely-there radial highlight, not a heavy gradient ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: '620px', height: '620px', top: '-320px', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(19,96,238,0.045) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* ════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '48px clamp(16px,3.5vw,48px) 0' }}>

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
          <div className="footer-contact-card" style={{
            background: '#ffffff',
            border: '1px solid #e7ebf3',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 6px 24px rgba(19,96,238,0.06)',
            transition: `box-shadow 320ms ${EASE}, transform 320ms ${EASE}`,
          }}>
            <h3 style={{ color: '#1360ee', fontSize: '13px', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1360ee', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 3px rgba(19,96,238,0.14)' }} />
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
              <button className="footer-btn-primary">
                Send Message
              </button>
            </div>
            <p style={{ marginTop: '10px', color: '#9aa3b2', fontSize: '9.5px', lineHeight: 1.5 }}>
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
              className="footer-map"
              style={{
                display: 'block',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #e7ebf3',
                marginBottom: '12px',
                position: 'relative',
                boxShadow: '0 4px 14px rgba(19,96,238,0.08)',
              }}
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
              {/* "View map" pill */}
              <div className="footer-map-pill" style={{ position: 'absolute', bottom: '7px', right: '7px', background: '#1360ee', borderRadius: '20px', padding: '3px 9px', color: '#fff', fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', pointerEvents: 'none', boxShadow: '0 2px 8px rgba(19,96,238,0.35)' }}>
                VIEW MAP
              </div>
            </a>

            {/* Address + phone stacked compactly */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1360ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '1px', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ color: '#5a6472', fontSize: '11.5px', lineHeight: 1.5 }}>
                  City Tower 2, Sheikh Zayed Road, Dubai, UAE
                </span>
              </div>
              <a href="tel:+971508746688" className="footer-phone">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1360ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.67 3.43 2 2 0 0 1 3.66 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 5.91 5.91l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                050 874 66 88
              </a>
            </div>

            <a href="/contact" className="footer-btn-outline">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Get a Quote
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ margin: '32px 0 0', height: '1px', background: 'linear-gradient(90deg, transparent, #e2e7f0 15%, #e2e7f0 85%, transparent)' }} />

        {/* ── Bottom bar ── */}
        <div style={{ padding: '18px 0 22px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <Link href="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Locator" width={100} height={32} style={{ width: 'auto', height: '30px' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ color: '#8a93a2', fontSize: '11px' }}>
              Copyright 2026{' '}
              <a href="https://aryzetech.com" target="_blank" rel="noopener noreferrer" className="footer-textlink">
                Synosys
              </a>
              {' '}| All Rights Reserved
            </span>
            <span style={{ color: '#d5dae3', fontSize: '11px' }}>|</span>
            <Link href="/sitemap" className="footer-textlink">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Interaction & responsive styles */}
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
          color: #9aa3b2;
        }

        .footer-contact-card:hover {
          box-shadow: 0 10px 32px rgba(19,96,238,0.10);
          transform: translateY(-2px);
        }

        /* Nav links — color glide + sliding underline */
        .footer-link {
          position: relative;
          color: #5a6472;
          font-size: 13px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 280ms ${EASE}, gap 280ms ${EASE};
        }
        .footer-link-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #1360ee;
          flex-shrink: 0;
          display: inline-block;
          transition: transform 280ms ${EASE};
        }
        .footer-link-text {
          position: relative;
        }
        .footer-link-text::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -3px;
          height: 1px;
          background: #1360ee;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 300ms ${EASE};
        }
        .footer-link:hover {
          color: #1360ee;
          gap: 9px;
        }
        .footer-link:hover .footer-link-dot {
          transform: scale(1.7);
        }
        .footer-link:hover .footer-link-text::after {
          transform: scaleX(1);
        }

        /* Primary CTA button */
        .footer-btn-primary {
          background: linear-gradient(135deg, #1360ee 0%, #0d4fd4 100%);
          border: none;
          border-radius: 8px;
          padding: 9px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.05em;
          width: 100%;
          box-shadow: 0 3px 14px rgba(19,96,238,0.28);
          transition: transform 280ms ${EASE}, box-shadow 280ms ${EASE}, filter 280ms ${EASE};
        }
        .footer-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(19,96,238,0.40);
          filter: brightness(1.06);
        }
        .footer-btn-primary:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 3px 10px rgba(19,96,238,0.30);
        }

        /* Outline CTA (Get a Quote) */
        .footer-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: #ffffff;
          border: 1px solid #1360ee;
          border-radius: 7px;
          padding: 8px 14px;
          color: #1360ee;
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.04em;
          width: 100%;
          transition: background 280ms ${EASE}, color 280ms ${EASE}, transform 280ms ${EASE}, box-shadow 280ms ${EASE};
        }
        .footer-btn-outline:hover {
          background: #1360ee;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(19,96,238,0.30);
        }
        .footer-btn-outline:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 4px 10px rgba(19,96,238,0.24);
        }

        /* Map tile */
        .footer-map {
          transition: transform 300ms ${EASE}, box-shadow 300ms ${EASE};
        }
        .footer-map:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(19,96,238,0.16);
        }
        .footer-map-pill {
          transition: transform 280ms ${EASE};
        }
        .footer-map:hover .footer-map-pill {
          transform: scale(1.05);
        }

        /* Phone link */
        .footer-phone {
          display: flex;
          gap: 7px;
          align-items: center;
          color: #1d1d1f;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: color 280ms ${EASE}, transform 280ms ${EASE};
        }
        .footer-phone:hover {
          color: #1360ee;
          transform: translateX(2px);
        }

        /* Logo */
        .footer-logo {
          transition: opacity 280ms ${EASE}, transform 280ms ${EASE};
        }
        .footer-logo:hover {
          opacity: 0.82;
          transform: translateY(-1px);
        }

        /* Social icons */
        .footer-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: #eef1f7;
          border: 1px solid #e7ebf3;
          border-radius: 8px;
          color: #5a6472;
          text-decoration: none;
          transition: background 300ms ${EASE}, color 300ms ${EASE}, border-color 300ms ${EASE}, transform 300ms ${EASE}, box-shadow 300ms ${EASE};
        }
        .footer-social:hover {
          background: #1360ee;
          border-color: #1360ee;
          color: #fff;
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 10px 22px rgba(19,96,238,0.32), 0 0 0 4px rgba(19,96,238,0.08);
        }
        .footer-social:active {
          transform: translateY(-1px) scale(1.02);
        }

        /* Bottom-bar text links */
        .footer-textlink {
          color: #8a93a2;
          text-decoration: none;
          transition: color 280ms ${EASE};
        }
        .footer-textlink:hover {
          color: #1360ee;
        }
      `}</style>
    </footer>
  )
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={{
      color: '#1360ee',
      fontSize: '10.5px',
      fontWeight: 700,
      letterSpacing: '0.13em',
      textTransform: 'uppercase',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
    }}>
      <span style={{ display: 'inline-block', width: '14px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
      {children}
    </h4>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <ColHeading>{title}</ColHeading>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="footer-link">
              <span className="footer-link-dot" />
              <span className="footer-link-text">{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
