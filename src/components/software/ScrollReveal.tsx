'use client'

import { useEffect } from 'react'

/**
 * Lightweight, SEO-safe scroll-reveal.
 *
 * - Content is fully visible by default (no JS / crawlers see everything).
 * - On mount we add `.js-reveal` to <html>, which arms the hidden state,
 *   then an IntersectionObserver reveals each `[data-reveal]` element once.
 * - Pure CSS opacity/transform (GPU-friendly) — no layout thrash.
 * - Honors prefers-reduced-motion.
 *
 * Usage: add to any element:
 *   data-reveal            → fade + rise (default)
 *   data-reveal="left"     → slide in from left
 *   data-reveal="right"    → slide in from right
 *   data-reveal="zoom"     → scale up
 *   data-reveal="fade"     → opacity only
 *   data-reveal-delay="120" → stagger (ms)
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js-reveal')

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (els.length === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('reveal-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const delay = el.dataset.revealDelay
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.classList.add('reveal-in')
          obs.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <style>{`
      .js-reveal [data-reveal] {
        opacity: 0;
        transform: translateY(30px);
        transition:
          opacity .75s cubic-bezier(.22,.61,.36,1),
          transform .75s cubic-bezier(.22,.61,.36,1);
      }
      .js-reveal [data-reveal="fade"]  { transform: none; }
      .js-reveal [data-reveal="left"]  { transform: translateX(-36px); }
      .js-reveal [data-reveal="right"] { transform: translateX(36px); }
      .js-reveal [data-reveal="zoom"]  { transform: scale(.94); }
      .js-reveal [data-reveal].reveal-in {
        opacity: 1;
        transform: none;
      }
      @media (prefers-reduced-motion: reduce) {
        .js-reveal [data-reveal] {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `}</style>
  )
}
