'use client'

import { useEffect, useRef } from 'react'

/* Liquid-glass CTA pill: a canvas of drifting light blobs behind a glass face,
   with a gloss arc across the top and a curved bounce reflection inside the
   bottom edge.

   The styles live in globals.css (.glass-btn*) rather than in a CSS module —
   nothing else in this codebase uses modules, and the nav CTA's outer layers
   (.nav-cta-tilt / .nav-cta-wrap / .nav-cta-ring) are already global, so a
   module here would mean two style systems inside one control.

   Sizing deliberately matches the white pill it replaced — same padding tokens,
   same --nav-link font size, same 999px radius — so the navbar row does not
   reflow and the lit ring around it still fits the face exactly. */

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  /** Period of the gloss breathe, e.g. '3.5s'. */
  speed?: string
  /** Period of the specular sweep — travel plus the idle gap before it repeats. */
  sheenSpeed?: string
  /** 0.5–1.5. Scales the gloss, the sheen, the reflection and the blob alpha. */
  intensity?: number
  /** Dark-slate palette, for placing the button on a light/white background. */
  inverted?: boolean
}

type Blob = { x: number; y: number; r: number; vx: number; vy: number; alpha: number }

export default function GlassButton({
  children = 'Get a Quote',
  className = '',
  speed = '3.5s',
  sheenSpeed = '5.6s',
  intensity = 1.0,
  inverted = false,
  ...props
}: GlassButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resizing the bitmap reallocates it and wipes the transform, so it is guarded
    // on an actual box change rather than run per frame. Drawing then happens in
    // CSS pixels — the DPR scale is baked into the context transform, which is what
    // keeps the blobs the same physical size (and unblurred) on a retina panel.
    let cssW = 0
    let cssH = 0
    const fit = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (w === cssW && h === cssH) return
      cssW = w
      cssH = h
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Seeded against the measured box rather than a hardcoded 240×48, so the
    // fluid padding above cannot leave half the blobs parked outside the pill.
    let blobs: Blob[] = []
    const seed = () => {
      blobs = Array.from({ length: 14 }, () => ({
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        r: 18 + Math.random() * 24,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: (0.12 + Math.random() * 0.3) * intensity,
      }))
    }

    // Two palettes, one draw path. Inverted is the dark-slate glass for white
    // backgrounds, with cyan blobs; the default is brand blue glass lit by white.
    const base = inverted
      ? ['rgba(15, 23, 42, 0.85)', 'rgba(30, 41, 59, 0.88)', 'rgba(51, 65, 85, 0.9)']
      : ['rgba(37, 99, 235, 0.45)', 'rgba(59, 130, 246, 0.55)', 'rgba(147, 197, 253, 0.65)']
    const blobCore = inverted ? '56, 189, 248' : '255, 255, 255'
    const blobMid = inverted ? '14, 165, 233' : '224, 242, 254'
    const blobEdge = inverted ? 'rgba(15, 23, 42, 0)' : 'rgba(255, 255, 255, 0)'

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, cssW, cssH)

      const grad = ctx.createLinearGradient(0, 0, cssW, cssH)
      grad.addColorStop(0, base[0])
      grad.addColorStop(0.5, base[1])
      grad.addColorStop(1, base[2])
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, cssW, cssH)

      blobs.forEach((p, i) => {
        // Linear drift plus a per-blob phase offset: pure vx/vy reads as fourteen
        // things sliding, the sine term is what makes it read as smoke turning over.
        p.x += p.vx + Math.sin(time + i) * 0.25
        p.y += p.vy + Math.cos(time + i) * 0.2

        if (p.x < -30) p.x = cssW + 30
        if (p.x > cssW + 30) p.x = -30
        if (p.y < -30) p.y = cssH + 30
        if (p.y > cssH + 30) p.y = -30

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        g.addColorStop(0, `rgba(${blobCore}, ${p.alpha * 0.9})`)
        g.addColorStop(0.5, `rgba(${blobMid}, ${p.alpha * 0.45})`)
        g.addColorStop(1, blobEdge)

        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // The rest of this control kills every loop under prefers-reduced-motion
    // (see the query at the end of the nav CTA block in globals.css). A canvas
    // animating on rAF would sail straight through that, so it is handled here:
    // one static frame, no loop, and the listener picks up a mid-session change.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animId = 0

    const frame = () => {
      time += 0.012
      fit()
      if (!blobs.length) seed()
      draw()
      animId = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (animId) cancelAnimationFrame(animId)
      animId = 0
    }
    const start = () => {
      if (reduce.matches) {
        fit()
        if (!blobs.length) seed()
        draw()
        return
      }
      if (!animId) animId = requestAnimationFrame(frame)
    }
    const onPrefChange = () => { stop(); start() }

    reduce.addEventListener('change', onPrefChange)
    start()

    return () => {
      stop()
      reduce.removeEventListener('change', onPrefChange)
    }
  }, [inverted, intensity])

  return (
    <button
      className={`glass-btn${inverted ? ' glass-btn--inverted' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ai-pulse-speed': speed,
        '--ai-sheen-speed': sheenSpeed,
        '--ai-intensity': intensity,
      } as React.CSSProperties}
      {...props}
    >
      <canvas ref={canvasRef} className="glass-btn__canvas" aria-hidden="true" />
      <span className="glass-btn__gloss" aria-hidden="true" />
      <span className="glass-btn__reflection" aria-hidden="true" />
      {/* Mounted after the two static glass layers so it sweeps over them, and
          before the label so it passes under the type — a gleam that crosses the
          words themselves is the thing that makes a button look like a skeleton
          loader rather than a lit surface. */}
      <span className="glass-btn__sheen" aria-hidden="true" />
      <span className="glass-btn__text">{children}</span>
    </button>
  )
}

export { GlassButton }
