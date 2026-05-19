'use client'

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
        overflow: 'hidden',
        clipPath: 'inset(0)',
        isolation: 'isolate',
        background: '#0174cb',
      }}
    >
      {/* ─────────── GRADIENT BACKDROP ─────────── */}

      {/* L0 — Light airy blue base (lighter sky, soft pastel tones) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, #1a6fb0 0%, #2d83c2 18%, #4a9bd4 38%, #6bb1de 58%, #93c8e6 76%, #bcdcec 90%, #dfeef2 100%)',
        }}
      />

      {/* L0b — Very gentle top tint (subtle depth, no heavy navy) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(20, 90, 150, 0.22) 0%, rgba(20, 90, 150, 0.08) 20%, rgba(20, 90, 150, 0) 40%)',
        }}
      />

      {/* L3 — Bright white-gold sunrise core behind the Burj (kept low, near skyline base) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'radial-gradient(32% 22% at 48% 90%, rgba(255, 250, 225, 1) 0%, rgba(255, 232, 165, 0.95) 18%, rgba(255, 210, 115, 0.78) 38%, rgba(255, 188, 85, 0.48) 60%, rgba(255, 180, 80, 0.20) 80%, rgba(255, 190, 100, 0) 96%)',
          filter: 'blur(28px)',
        }}
      />

      {/* L4 — Small golden bloom just above the core (subtle lift, stays low) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'radial-gradient(24% 14% at 48% 78%, rgba(255, 230, 170, 0.55) 0%, rgba(255, 215, 140, 0.28) 50%, rgba(255, 210, 140, 0) 92%)',
          filter: 'blur(38px)',
        }}
      />

      {/* ─────────── ANIMATED LAYERS (subtle, screen-blend only) ─────────── */}

      {/* Animated colour blobs — drifting cloud blooms */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 5,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      >
        <div
          className="hero-blob hero-blob-a"
          style={{ background: 'rgba(22, 131, 210, 0.35)' }}
        />
        <div
          className="hero-blob hero-blob-b"
          style={{ background: 'rgba(255, 200, 110, 0.28)' }}
        />
        <div
          className="hero-blob hero-blob-c"
          style={{ background: 'rgba(46, 149, 216, 0.38)' }}
        />
        <div
          className="hero-blob hero-blob-d"
          style={{ background: 'rgba(10, 101, 179, 0.40)' }}
        />
        <div
          className="hero-blob hero-blob-e"
          style={{ background: 'rgba(118, 175, 219, 0.25)' }}
        />
      </div>


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
            'radial-gradient(50% 60% at 50% 75%, rgba(255, 248, 215, 0.95) 0%, rgba(255, 230, 160, 0.75) 25%, rgba(255, 210, 115, 0.48) 50%, rgba(255, 195, 95, 0.22) 72%, rgba(255, 200, 115, 0) 94%)',
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
            'radial-gradient(50% 50% at 50% 60%, rgba(255, 240, 190, 0.45) 0%, rgba(255, 225, 160, 0.20) 50%, rgba(255, 220, 155, 0) 90%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Two smooth diagonal wave bands — top descends, bottom ascends */}
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
        {/* Top wave — slides down through the hero */}
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

        {/* Bottom wave — slides up through the hero */}
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

      {/* Animated ribbon sweep — flowing light ribbon across the sky */}
      <div
        className="hero-ribbon-sweep"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 6,
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />

      {/* ─────────── FOREGROUND CONTENT (unchanged) ─────────── */}

      {/* Dubai Skyline */}
      <div
        className="hero-building-wrap"
        style={{
          position: 'absolute',
          bottom: 'clamp(-40px, -6vw, -80px)',
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

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 9 }}>
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
          We help you to manage your <span style={{ fontWeight: 600 }}>Vehiclessss</span> & <span style={{ fontWeight: 600 }}>Team</span>
        </h1>
      </div>
    </section>
  )
}
