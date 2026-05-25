// Server component: pure markup, inline styles and CSS-only animations.
// Only the interactive <Navbar> (its own 'use client' boundary) ships JS.
import Image from 'next/image'
import Navbar from './Navbar'

export default function HeroSection() {
  return (
    <section
      className="hero-section-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        height: '67.5vh',
        minHeight: 'clamp(380px, 67.5vh, 800px)',
        overflow: 'visible',
        isolation: 'isolate',
        background: '#1360ee',
      }}
    >
      {/* ─────────── GRADIENT BACKDROP (matched to reference palette) ─────────── */}

      {/* L0 — Main vertical ramp: deep electric blue → cyan → pale near-white
          Stops sampled from reference: #1360ee → #1266ed → #0d73e3 → #0a84e3 →
          #106dea → #06a4e2 → #0e9ee2 → #08b2e0 → #3abede → #85bad3 → #97def1 → #d1d8dd */}
      <div
        aria-hidden="true"
        className="hero-gradient-flow"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* L1 — Subtle right-side lightening (left 50% untouched → top-left stays #1360ee) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.08) 100%)',
        }}
      />

      {/* L1a — Top-right #6d99e4 zone */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(34% 28% at 96% 6%, rgba(109, 153, 228, 0.7) 0%, rgba(109, 153, 228, 0.35) 40%, rgba(109, 153, 228, 0.1) 70%, rgba(109, 153, 228, 0) 90%)',
        }}
      />

      {/* L1b — Upper-mid right #3183e4 / #1f74e8 zone */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(28% 22% at 82% 20%, rgba(49, 131, 228, 0.45) 0%, rgba(49, 131, 228, 0.18) 50%, rgba(49, 131, 228, 0) 88%)',
        }}
      />

      {/* L2 — Mid-right pale highlight (#d1d8dd / #97def1 zone) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(32% 38% at 94% 42%, rgba(209, 216, 221, 0.7) 0%, rgba(151, 222, 241, 0.4) 40%, rgba(151, 222, 241, 0.14) 70%, rgba(151, 222, 241, 0) 92%)',
        }}
      />

      {/* L2b — Pale bottom-left wash (#c2d1dd / #64aedd zone) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(40% 30% at 6% 96%, rgba(194, 209, 221, 0.55) 0%, rgba(100, 174, 221, 0.28) 45%, rgba(100, 174, 221, 0) 85%)',
        }}
      />

      {/* L2c — Bottom-right cyan #79dffa zone */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(32% 26% at 96% 96%, rgba(121, 223, 250, 0.6) 0%, rgba(121, 223, 250, 0.28) 45%, rgba(121, 223, 250, 0.08) 75%, rgba(121, 223, 250, 0) 92%)',
        }}
      />

      {/* L3 — Warm cream sunrise core behind the Burj (#fbeabc from reference) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'radial-gradient(32% 22% at 50% 90%, rgba(251, 234, 188, 0.98) 0%, rgba(251, 234, 188, 0.78) 22%, rgba(251, 234, 188, 0.5) 45%, rgba(251, 234, 188, 0.24) 70%, rgba(251, 234, 188, 0.08) 88%, rgba(251, 234, 188, 0) 98%)',
          filter: 'blur(26px)',
        }}
      />

      {/* L4 — Small warm bloom just above the core */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'radial-gradient(24% 14% at 50% 78%, rgba(251, 234, 188, 0.5) 0%, rgba(251, 234, 188, 0.22) 50%, rgba(251, 234, 188, 0) 92%)',
          filter: 'blur(36px)',
        }}
      />

      {/* ─────────── DRIFTING PATCHES — bounce diagonally inside the sky ─────────── */}
      {/* Patch A — TOP-LEFT ↔ BOTTOM-RIGHT (deep navy, stays in bounds) */}
      <div
        aria-hidden="true"
        className="hero-blue-orb-a"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '48%',
          height: '68%',
          borderRadius: '50%',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.8,
          background:
            'radial-gradient(closest-side at 50% 50%, rgba(13, 47, 165, 0.9) 0%, rgba(13, 47, 165, 0.62) 32%, rgba(13, 47, 165, 0.32) 58%, rgba(13, 47, 165, 0.1) 80%, rgba(13, 47, 165, 0) 96%)',
          filter: 'blur(22px)',
        }}
      />


      {/* Bright white-gold halo behind the Burj — primary visible glow (low, near horizon) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '0%',
          left: '48%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '38%',
          zIndex: 7,
          pointerEvents: 'none',
          background:
            'radial-gradient(50% 60% at 50% 75%, rgba(251, 234, 188, 0.95) 0%, rgba(251, 234, 188, 0.72) 25%, rgba(251, 234, 188, 0.45) 50%, rgba(251, 234, 188, 0.2) 72%, rgba(251, 234, 188, 0) 94%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Tiny soft highlight just above the core — subtle, doesn't extend high */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '48%',
          transform: 'translateX(-50%)',
          width: '38%',
          height: '22%',
          zIndex: 7,
          pointerEvents: 'none',
          background:
            'radial-gradient(50% 50% at 50% 60%, rgba(251, 234, 188, 0.45) 0%, rgba(251, 234, 188, 0.2) 50%, rgba(251, 234, 188, 0) 90%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* ─────────── DIAGONAL WAVES — top descends, bottom ascends ─────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 6,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      >
        <svg
          className="hero-diag-wave hero-diag-wave-top"
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroDiagWaveTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"  stopColor="rgba(255,255,255,0)" />
              <stop offset="25%" stopColor="rgba(255,255,255,0.14)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.48)" />
              <stop offset="60%" stopColor="rgba(190,232,255,0.38)" />
              <stop offset="80%" stopColor="rgba(140,205,250,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path
            d="M 0,105 C 300,40 600,190 900,115 S 1200,60 1200,115 L 1200,160 C 900,220 600,105 300,180 S 0,220 0,155 Z"
            fill="url(#heroDiagWaveTopGrad)"
          />
        </svg>

        <svg
          className="hero-diag-wave hero-diag-wave-bottom"
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroDiagWaveBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"  stopColor="rgba(255,255,255,0)" />
              <stop offset="22%" stopColor="rgba(140,205,250,0.15)" />
              <stop offset="45%" stopColor="rgba(190,232,255,0.38)" />
              <stop offset="62%" stopColor="rgba(255,255,255,0.48)" />
              <stop offset="80%" stopColor="rgba(255,255,255,0.14)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path
            d="M 0,105 C 300,40 600,190 900,115 S 1200,60 1200,115 L 1200,160 C 900,220 600,105 300,180 S 0,220 0,155 Z"
            fill="url(#heroDiagWaveBottomGrad)"
          />
        </svg>
      </div>

      {/* ─────────── SKY IMAGE — LEFT OF BUILDING ─────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '2%',
          width: 'clamp(180px, 28vw, 420px)',
          zIndex: 7,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/skky.png"
          alt=""
          width={420}
          height={320}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom',
            opacity: 0.72,
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* ─────────── SKY IMAGE — TOP RIGHT (inset) ─────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          right: '4%',
          width: 'clamp(160px, 24vw, 380px)',
          zIndex: 7,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/skky.png"
          alt=""
          width={380}
          height={280}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            opacity: 0.75,
            mixBlendMode: 'screen',
            transform: 'scaleX(-1)',
          }}
        />
      </div>

      {/* Patch B — TOP-RIGHT ↔ BOTTOM-LEFT (rendered AFTER sky images so it shows over them) */}
      <div
        aria-hidden="true"
        className="hero-blue-orb-b"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '42%',
          height: '60%',
          borderRadius: '50%',
          zIndex: 7,
          pointerEvents: 'none',
          opacity: 0.75,
          background:
            'radial-gradient(closest-side at 50% 50%, rgba(13, 47, 165, 0.85) 0%, rgba(13, 47, 165, 0.58) 34%, rgba(13, 47, 165, 0.3) 60%, rgba(13, 47, 165, 0.09) 82%, rgba(13, 47, 165, 0) 96%)',
          filter: 'blur(24px)',
        }}
      />

      {/* ─────────── FOREGROUND CONTENT (unchanged) ─────────── */}

      {/* Dubai Skyline */}
      <div
        className="hero-building-wrap"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '98%',
          maxWidth: 'clamp(280px, 70vw, 590px)',
          zIndex: 8,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/building image.png"
          alt="Dubai Skyline"
          width={590}
          height={334}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom',
          }}
          priority
        />
      </div>

      {/* Cloud — hidden on mobile via .hero-cloud-wrap CSS class */}
      <div className="hero-cloud-wrap">
        <Image
          src="/cloud.svg"
          alt="Cloud"
          width={400}
          height={267}
          style={{ opacity: 0.7, width: 'clamp(180px, 30vw, 400px)', height: 'auto' }}
        />
      </div>

      {/* Navbar — high z so its mobile drawer overlays everything else */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar />
      </div>

      {/* Headline */}
      <div
        className="hero-headline-wrap"
        style={{
          position: 'absolute',
          top: '28%',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          padding: '0 1rem',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(17px, 3.5vw, 30px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.58)',
            lineHeight: 1.45,
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          We help you to manage your <span style={{ fontWeight: 600 }}>Vehicles</span> & <span style={{ fontWeight: 600 }}>Team</span>
        </h1>
      </div>
    </section>
  )
}
