'use client'

import Image from 'next/image'
import Navbar from './Navbar'

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '67.5vh',
        minHeight: 'clamp(380px, 67.5vh, 800px)',
        overflow: 'hidden',
        isolation: 'isolate',
        background: '#0174cb',
      }}
    >
      {/* ─────────── GRADIENT BACKDROP ─────────── */}

      {/* L0 — Premium vibrant blue base (rich saturated blue across, deeper top half) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, #04376d 0%, #074a8c 12%, #0a5ba8 26%, #0a6dbe 42%, #0174cb 58%, #1380d0 76%, #2e93d6 92%, #4ba6dd 100%)',
        }}
      />

      {/* L0b — Subtle premium navy tint at the very top (depth, not muddy) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(4, 36, 78, 0.55) 0%, rgba(4, 50, 100, 0.28) 12%, rgba(4, 60, 120, 0.10) 25%, rgba(4, 60, 120, 0) 38%)',
        }}
      />

      {/* L0c — Rich saturated blue wash across the headline band */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(3, 50, 100, 0.78) 0%, rgba(6, 68, 130, 0.62) 18%, rgba(10, 90, 165, 0.42) 35%, rgba(10, 90, 165, 0.18) 50%, rgba(10, 90, 165, 0) 62%)',
        }}
      />

      {/* L0d — Top-left & top-right corner deepening (frames the headline) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(65% 60% at 0% 0%, rgba(3, 48, 96, 0.62) 0%, rgba(3, 48, 96, 0) 65%), radial-gradient(65% 60% at 100% 0%, rgba(3, 48, 96, 0.62) 0%, rgba(3, 48, 96, 0) 65%)',
        }}
      />

      {/* L1 — Edge vignette: gentle deepening of the corners */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(120% 90% at 50% 50%, rgba(4, 60, 120, 0) 35%, rgba(4, 60, 120, 0.30) 75%, rgba(4, 50, 100, 0.55) 100%)',
        }}
      />

      {/* L2 — Soft vibrant blue bloom (adds richness, premium look) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'radial-gradient(60% 45% at 50% 55%, rgba(22, 131, 210, 0.32) 0%, rgba(22, 131, 210, 0.12) 50%, rgba(22, 131, 210, 0) 85%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* L3 — Golden-hour sun glow (tighter, softer amber behind the skyline) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'radial-gradient(24% 22% at 50% 96%, rgba(255, 215, 130, 0.70) 0%, rgba(255, 190, 85, 0.45) 28%, rgba(255, 170, 50, 0.22) 55%, rgba(255, 160, 30, 0.08) 75%, rgba(255, 160, 30, 0) 90%)',
          filter: 'blur(45px)',
        }}
      />

      {/* L4 — Narrow warm horizon line (kept subtle so blue dominates) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'radial-gradient(45% 12% at 50% 100%, rgba(255, 200, 120, 0.40) 0%, rgba(255, 190, 100, 0.16) 50%, rgba(255, 180, 90, 0) 85%)',
          filter: 'blur(50px)',
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

      {/* Silk wave sheets — soft motion across the sky */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 6,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: 0.55,
        }}
      >
        <div className="hero-wave hero-wave-1" />
        <div className="hero-wave hero-wave-2" />
      </div>

      {/* SVG blob — slow drift accent on the right */}
      <img
        src="/blob-scene-haikei.svg"
        alt=""
        aria-hidden="true"
        className="hero-svg-blob"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 6,
          pointerEvents: 'none',
          opacity: 0.18,
          mixBlendMode: 'screen',
        }}
      />

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

      {/* Soft white cloud diffusion on the right side of the skyline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '0%',
          right: '-10%',
          width: '75%',
          height: '78%',
          zIndex: 7,
          pointerEvents: 'none',
          background:
            'radial-gradient(65% 60% at 62% 70%, rgba(255, 255, 255, 0.85) 0%, rgba(245, 251, 254, 0.55) 25%, rgba(225, 240, 248, 0.30) 50%, rgba(210, 232, 244, 0.12) 70%, rgba(210, 232, 244, 0) 88%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Secondary white haze — extends the cloud diffusion higher up on the right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '-5%',
          width: '55%',
          height: '55%',
          zIndex: 7,
          pointerEvents: 'none',
          background:
            'radial-gradient(55% 50% at 65% 60%, rgba(255, 255, 255, 0.45) 0%, rgba(240, 248, 252, 0.22) 40%, rgba(220, 238, 248, 0) 80%)',
          filter: 'blur(55px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Warm sunrise glow — animated golden core behind the buildings */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '88%',
          height: '78%',
          zIndex: 7,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-sunrise-glow" />
      </div>

      {/* ─────────── FOREGROUND CONTENT (unchanged) ─────────── */}

      {/* Dubai Skyline */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(-20px, -3vw, -45px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '98%',
          maxWidth: 'clamp(300px, 60vw, 590px)',
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
            filter: 'brightness(0.85) saturate(0.8) hue-rotate(5deg) blur(0.3px)',
            opacity: 0.88,
            mixBlendMode: 'luminosity',
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
            fontSize: 'clamp(16px, 3.5vw, 30px)',
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
