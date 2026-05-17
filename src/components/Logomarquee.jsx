"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LogoMarquee
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium infinite scrolling logo carousel.
 *
 * Features:
 *  • Two rows scrolling in OPPOSITE directions (premium SaaS pattern)
 *  • Pure CSS animation — buttery smooth, no JS per-frame work
 *  • Seamless infinite loop (logos duplicated and translated by exactly -50%)
 *  • Pauses on hover for accessibility
 *  • Edge fade gradients on left/right (logos fade out at the edges)
 *  • Soft cream background matching the reference
 *  • Top row: vibrant logos. Bottom row: subtle/grayscale logos.
 *  • Scroll-triggered fade-in entrance
 *  • Fully responsive — logo sizes & spacing scale on mobile
 *
 * Usage:
 *   import LogoMarquee from "@/components/LogoMarquee";
 *   <LogoMarquee />
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Demo brand names — text-only display (replace with image src when ready) ── */
const DEFAULT_ROW_1 = [
  { name: "Samsung" },
  { name: "Microsoft" },
  { name: "Google" },
  { name: "IBM" },
  { name: "Oracle" },
  { name: "Cisco" },
  { name: "Intel" },
  { name: "HP" },
];

const DEFAULT_ROW_2 = [
  { name: "DHL" },
  { name: "FedEx" },
  { name: "UPS" },
  { name: "Maersk" },
  { name: "DB Schenker" },
  { name: "Volvo" },
  { name: "Caterpillar" },
  { name: "Bosch" },
];

export default function LogoMarquee({
  row1 = DEFAULT_ROW_1,
  row2 = DEFAULT_ROW_2,
  speed1 = 40, // seconds for one full loop (lower = faster)
  speed2 = 45,
}) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") { setActive(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`lm ${active ? "lm--active" : ""}`}>
      <div className="lm__inner">

        {/* ROW 1 — scrolling LEFT (logos move from right to left) */}
        <div className="lm__row lm__row--1">
          <div className="lm__track lm__track--left" style={{ "--dur": `${speed1}s` }}>
            {/* Duplicate the array exactly twice so the -50% translate loops seamlessly */}
            {[...row1, ...row1].map((logo, i) => (
              <LogoItem key={`r1-${i}`} logo={logo} variant="vibrant" />
            ))}
          </div>
        </div>

        {/* ROW 2 — scrolling RIGHT (opposite direction) */}
        <div className="lm__row lm__row--2">
          <div className="lm__track lm__track--right" style={{ "--dur": `${speed2}s` }}>
            {[...row2, ...row2].map((logo, i) => (
              <LogoItem key={`r2-${i}`} logo={logo} variant="muted" />
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .lm {
          --bg-top:    #f6f4ed;
          --bg-bottom: #efece2;
          --gap: clamp(40px, 5vw, 80px);
          --row-height: clamp(60px, 8vw, 100px);
          --logo-max-h: clamp(28px, 3.6vw, 48px);

          position: relative;
          width: 100%;
          background: linear-gradient(180deg, var(--bg-top) 0%, var(--bg-bottom) 100%);
          padding: clamp(40px, 5vw, 64px) 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lm--active {
          opacity: 1;
          transform: translateY(0);
        }

        .lm__inner {
          position: relative;
          width: 100%;
          /* Soft edge fade — logos disappear at edges */
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 8%,
            #000 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 8%,
            #000 92%,
            transparent 100%
          );
        }

        .lm__row {
          display: flex;
          overflow: hidden;
          padding: clamp(8px, 1.2vw, 16px) 0;
        }
        .lm__row + .lm__row {
          margin-top: clamp(8px, 1.2vw, 18px);
        }

        .lm__track {
          display: flex;
          flex-shrink: 0;
          gap: var(--gap);
          padding-right: var(--gap);
          /* Width auto-grows with content */
          width: max-content;
          will-change: transform;
        }
        /* The animation translates the doubled list by exactly -50% (one full original-list width).
           When the second copy reaches the position of the first, it loops back to 0 — seamless. */
        .lm__track--left {
          animation: scrollLeft var(--dur) linear infinite;
        }
        .lm__track--right {
          animation: scrollRight var(--dur) linear infinite;
        }

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Pause on hover (anywhere on section) */
        .lm:hover .lm__track {
          animation-play-state: paused;
        }

        /* Reduced motion: stop the marquee */
        @media (prefers-reduced-motion: reduce) {
          .lm__track {
            animation: none !important;
          }
          .lm {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Logo Item — text-only brand name (premium typography)                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function LogoItem({ logo, variant = "vibrant" }) {
  return (
    <div className={`lmi lmi--${variant}`}>
      <span className="lmi__name">{logo.name}</span>

      <style jsx>{`
        .lmi {
          flex-shrink: 0;
          height: var(--row-height);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 clamp(8px, 1vw, 16px);
          transition: filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease, color 0.4s ease;
          user-select: none;
        }

        .lmi__name {
          font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 700;
          font-size: clamp(18px, 2vw, 28px);
          letter-spacing: -0.015em;
          white-space: nowrap;
          line-height: 1;
        }

        /* Top row — bold, dark, vibrant */
        .lmi--vibrant .lmi__name {
          color: #2d3748;
          opacity: 0.85;
        }
        .lmi--vibrant:hover .lmi__name {
          opacity: 1;
          color: #1a202c;
        }
        .lmi--vibrant:hover {
          transform: scale(1.06);
        }

        /* Bottom row — muted, softer gray */
        .lmi--muted .lmi__name {
          color: #94a3b8;
          opacity: 0.7;
          font-weight: 600;
        }
        .lmi--muted:hover .lmi__name {
          opacity: 1;
          color: #475569;
        }
        .lmi--muted:hover {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}