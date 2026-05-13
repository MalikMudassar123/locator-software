'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-20" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-white font-bold text-2xl">LOCATOR</span>
      </Link>

      {/* Nav Links */}
      <ul className="flex items-center gap-7 list-none m-0 p-0">
        <li>
          <Link href="/" className="text-white font-semibold text-sm hover:opacity-80 transition-opacity">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-white font-semibold text-sm hover:opacity-80 transition-opacity">
            About us
          </Link>
        </li>
        <li>
          <Link href="/software" className="text-white font-semibold text-sm hover:opacity-80 transition-opacity">
            Software
          </Link>
        </li>
        <li>
          <Link href="/service" className="text-white font-semibold text-sm hover:opacity-80 transition-opacity">
            Service
          </Link>
        </li>
        <li>
          <Link href="/industries" className="text-white font-semibold text-sm hover:opacity-80 transition-opacity">
            Industries
          </Link>
        </li>
        <li>
          <Link href="/regulatory" className="text-white font-semibold text-sm hover:opacity-80 transition-opacity">
            Regulatory GPS Certificate
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-white font-semibold text-sm hover:opacity-80 transition-opacity">
            Contact
          </Link>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Image 
          src="/uae-flag.svg" 
          alt="UAE" 
          width={36} 
          height={36} 
          className="rounded-full border-2 border-white/30" 
        />
        <div style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Soft white mist cloud — large diffused glow extending to the right side */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-35%, -50%)',
            width: '500px',
            height: '220px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 25% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.32) 30%, rgba(255,255,255,0.14) 55%, rgba(255,255,255,0.04) 72%, transparent 85%)',
            filter: 'blur(12px)',
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'all 0.25s ease',
          }} />
          {/* Button */}
          <button style={{
            position: 'relative',
            zIndex: 1,
            background: '#ffffff',
            color: '#1a6e9a',
            border: 'none',
            borderRadius: '10px',
            padding: '11px 26px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: '0.01em',
            boxShadow: '0 2px 12px rgba(255,255,255,0.40), 0 1px 4px rgba(180,220,245,0.20)',
            transition: 'transform 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            const mist = e.currentTarget.previousElementSibling as HTMLElement
            if (mist) {
              mist.style.width = '540px'
              mist.style.height = '240px'
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0px)'
            const mist = e.currentTarget.previousElementSibling as HTMLElement
            if (mist) {
              mist.style.width = '500px'
              mist.style.height = '220px'
            }
          }}>
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  )
}
