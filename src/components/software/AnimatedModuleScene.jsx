'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'

// rounded-rect path helper (same as Scene1Icons / Scene4Pricing)
function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`
  return `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}` +
         `Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}` +
         `V${y + r}Q${x} ${y} ${x + r} ${y}Z`
}

// radius per element type (99 = pill → clamped to h/2)
const RAD = {
  dot: 99, htitle: 3, icon: 10, title: 3, sub: 3,
  badge: 99, amount: 3, photo: 10, check: 7,
}

export default function AnimatedModuleScene({ type, children }) {
  const cardRef  = useRef(null)
  const svgRef   = useRef(null)
  const wireGRef = useRef(null)
  const wireRefs = useRef([])
  const tweens   = useRef([])
  const [model, setModel] = useState({ w: 0, h: 0, paths: [], sig: '' })

  // Measure the real card + every [data-wire] child → build wireframe geometry
  const measure = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    const cr = card.getBoundingClientRect()
    const W = Math.round(cr.width)
    const H = Math.round(cr.height)
    if (!W || !H) return

    const items = []
    // outer frame first
    items.push({ y: -1, x: -1, d: rp(1, 1, W - 2, H - 2, 23), frame: true })

    card.querySelectorAll('[data-wire]').forEach(el => {
      const r = el.getBoundingClientRect()
      const x = r.left - cr.left
      const y = r.top  - cr.top
      const w = r.width
      const h = r.height
      if (w < 1 || h < 1) return
      const t = el.dataset.wire

      if (t === 'header') {
        // draw a divider line at the header's bottom edge (full width)
        const yb = Math.round(y + h)
        items.push({ y: yb, x: 0, d: `M0 ${yb} H${W}` })
        return
      }
      let rad = RAD[t] ?? 3
      if (rad === 99) rad = h / 2
      items.push({ y, x, d: rp(x, y, w, h, rad) })
    })

    // build order: frame, then top→bottom, left→right
    items.sort((a, b) => (a.frame ? -1 : b.frame ? 1 : (a.y - b.y) || (a.x - b.x)))

    const paths = items.map(it => ({ d: it.d, frame: !!it.frame }))
    const sig = `${W}x${H}|${paths.map(p => p.d).join('|')}`
    setModel(m => (m.sig === sig ? m : { w: W, h: H, paths, sig }))
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(card)
    // re-measure once after fonts/layout settle
    const t = setTimeout(measure, 120)
    return () => { ro.disconnect(); clearTimeout(t) }
  }, [measure])

  // Animation
  useEffect(() => {
    const { w: W, h: H, paths } = model
    if (!W || !H || !paths.length) return

    if (svgRef.current) {
      svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`)
      svgRef.current.setAttribute('width', W)
      svgRef.current.setAttribute('height', H)
    }

    const kill = () => { tweens.current.forEach(t => t?.kill()); tweens.current = [] }
    const getLen = el => { try { return el.getTotalLength() } catch { return 300 } }

    const reset = () => {
      gsap.set(cardRef.current, { opacity: 0 })
      gsap.set(wireGRef.current, { opacity: 0 })
      wireRefs.current.filter(Boolean).forEach(el => {
        const len = getLen(el)
        gsap.set(el, { opacity: 0, strokeDasharray: `${len} ${len + 1}`, strokeDashoffset: len })
      })
    }

    const play = () => {
      kill()
      reset()
      const tl = gsap.timeline({ onComplete: () => play() })
      tweens.current.push(tl)

      // ── PHASE 1: wireframe draws in, stroke by stroke (top → bottom) ──
      const wireAt = 0.1
      const stagger = 0.036
      tl.to(wireGRef.current, { opacity: 1, duration: 0.2 }, wireAt)
      wireRefs.current.forEach((el, i) => {
        if (!el) return
        tl.to(el, { opacity: 1, strokeDashoffset: 0, duration: 0.34, ease: 'power2.out' }, wireAt + 0.05 + i * stagger)
      })
      const wireFullAt = wireAt + 0.05 + wireRefs.current.length * stagger + 0.34

      // ── PHASE 2: real card fades in, wireframe fades out ──
      const cardAt = wireFullAt + 0.16
      tl.to(cardRef.current,  { opacity: 1, duration: 0.75, ease: 'power2.out' }, cardAt)
      tl.to(wireGRef.current, { opacity: 0, duration: 0.55, ease: 'power2.in'  }, cardAt + 0.16)

      // ── PHASE 3: hold, then fade out and loop ──
      const loopAt = cardAt + 0.75 + 4.2
      tl.to(cardRef.current, { opacity: 0, duration: 0.55, ease: 'power2.in' }, loopAt)
    }

    // Keep everything blank until the card scrolls into view, then build
    // the wireframe from scratch — so the user always sees the full sequence.
    reset()

    let started = false
    let startTimer
    const target = cardRef.current

    const begin = () => {
      if (started) return
      started = true
      startTimer = setTimeout(play, 60)
    }

    let io
    if (target && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              begin()
              obs.disconnect()
            }
          }
        },
        { threshold: 0.18 },
      )
      io.observe(target)
    } else {
      begin()
    }

    return () => { io?.disconnect(); clearTimeout(startTimer); kill() }
  }, [model, type])

  const { w, paths } = model

  return (
    <div style={{ position: 'relative' }}>

      {/* wireframe overlay — sits exactly on top of the card */}
      {w > 0 && (
        <svg
          ref={svgRef}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 4 }}
        >
          <defs>
            <linearGradient id={`amw_${type}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id={`amg_${type}`} x="-8%" y="-8%" width="116%" height="116%">
              <feGaussianBlur stdDeviation="0.9" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g ref={wireGRef} opacity="0">
            {paths.map((p, i) => (
              <path
                key={i}
                ref={el => (wireRefs.current[i] = el)}
                d={p.d}
                stroke={`url(#amw_${type})`}
                strokeWidth={p.frame ? 0.7 : 0.55}
                fill="rgba(59,130,246,0.02)"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0"
                filter={`url(#amg_${type})`}
              />
            ))}
          </g>
        </svg>
      )}

      {/* real card — opacity animated by GSAP */}
      <div ref={cardRef} style={{ opacity: 0, willChange: 'opacity', position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}
