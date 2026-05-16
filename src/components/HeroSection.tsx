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
        overflow: 'visible',
        background: 'linear-gradient(175deg, #052240 0%, #093868 25%, #126090 55%, #1a84b8 100%)',
        isolation: 'isolate',
      }}
    >
      {/* Layer 0 — SVG blob background (left-side shape only) */}
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
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 1 — colour blobs */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-blob hero-blob-a" />
        <div className="hero-blob hero-blob-b" />
        <div className="hero-blob hero-blob-c" />
        <div className="hero-blob hero-blob-d" />
        <div className="hero-blob hero-blob-e" />
      </div>

      {/* Layer 2 — silk wave sheets on top of blobs */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-wave hero-wave-1" />
        <div className="hero-wave hero-wave-2" />
      </div>

      {/* Pink Aurora Wave Layer — flowing silk-wave energy behind cinematic layers */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-pink-aurora" />
        <div className="hero-pink-aurora-secondary" />
      </div>

      {/* Layer 3 — Cinematic flowing light effect (top-right to center-left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-cinematic-light" />
      </div>

      {/* Layer 4 — Stripe-style diagonal atmospheric beam */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-stripe-beam" />
      </div>

      {/* Layer 4b — Dark glow ribbon sweeping right to left */}
      <div
        className="hero-ribbon-sweep"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 5 — Silk-ribbon flow (sky-blue/white right to gold left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-silk-right" />
      </div>

      {/* Layer 6 — Warm sunrise / golden-hour glow behind buildings */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '88%',
          height: '72%',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-sunrise-glow" />
      </div>

      {/* LAYER 8 — Dubai Skyline building — with foggy sky blue effect */}
      <div
        style={{
          position: 'absolute',
          bottom: '-45px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '98%',
          maxWidth: '590px',
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

      {/* Cloud on the left side of building */}
      <div
        style={{
          position: 'absolute',
          bottom: '40%',
          left: '5%',
          zIndex: 7,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/cloud.svg"
          alt="Cloud"
          width={400}
          height={267}
          style={{
            opacity: 0.7,
          }}
        />
      </div>

      {/* LAYER 9 — Navbar */}
      <div style={{ position: 'relative', zIndex: 9 }}>
        <Navbar />
      </div>

      {/* LAYER 10 — Headline */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          padding: '0 1rem',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(20px, 2.2vw, 30px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.58)',
            lineHeight: 1.45,
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          Locator live tracking apps and services
        </h1>
        <p
          style={{
            fontSize: 'clamp(20px, 2.2vw, 30px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.58)',
            lineHeight: 1.45,
            letterSpacing: '0.02em',
            margin: '6px 0 0',
          }}
        >
          enable real - time
        </p>
      </div>
    </section>
  )
}
