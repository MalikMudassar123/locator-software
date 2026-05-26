"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * AnimatedGlobeHero
 * ----------------------------------------------------------------------------
 * A cinematic, premium globe hero section featuring:
 *  - A photorealistic, procedurally textured Earth (no bitmap dependencies)
 *  - Smooth continuous 360° rotation via a clipped texture pan
 *  - Cinematic curved connection arcs that lift, travel, and land between cities
 *  - Layered atmospheric glow tuned to match a warm-horizon sky gradient
 *  - Minimal glass-morphism stat cards with subtle float + shimmer
 *
 * Notes on implementation:
 *  - Earth surface is built from layered <feTurbulence> noise filters, giving
 *    organic continent / cloud / terminator detail without external assets.
 *  - The "rotation" is a wide texture strip clipped to the globe sphere; it
 *    pans horizontally on loop, which reads as a true 360° spin and avoids
 *    the stretched look of rotating a circular mask.
 *  - Arcs use SVG offset-path for the comet head + a synchronized stroke
 *    reveal for the trail — both share the same cubic-bezier curve so the
 *    head sits perfectly on the trail's leading edge.
 */

/* ============================================================================
 * CONSTANTS
 * ========================================================================== */

const VB_W = 1280;
const VB_H = 540;
const CX = 640;
const CY = 270;
const R = 175; // Globe radius

const DEFAULT_STATS = [
  { value: "10+", label: "Years of industry experience", side: "left", row: "top" },
  { value: "20,000+", label: "Devices actively tracked", side: "left", row: "bottom" },
  { value: "1000+", label: "Happy customers across", side: "right", row: "top" },
  { value: "1M+", label: "Data points processed daily", side: "right", row: "bottom" },
];

/**
 * City nodes anchored close to the globe rim — arcs span across
 * the full globe like flight paths / satellite orbits.
 */
const CITY_POLAR = [
  { angle: 268, radius: 0.86, name: "n01" },  // top
  { angle: 315, radius: 0.82, name: "n02" },  // upper-right
  { angle: 8,   radius: 0.86, name: "n03" },  // right-upper
  { angle: 55,  radius: 0.82, name: "n04" },  // right-lower
  { angle: 100, radius: 0.86, name: "n05" },  // lower-right
  { angle: 148, radius: 0.82, name: "n06" },  // bottom
  { angle: 195, radius: 0.86, name: "n07" },  // bottom-left
  { angle: 242, radius: 0.82, name: "n08" },  // left
];

const CITY_NODES = CITY_POLAR.map(({ angle, radius, name }) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * R * radius,
    y: CY + Math.sin(rad) * R * radius,
    name,
  };
});

/**
 * Connections — dense network mesh spanning the globe like flight routes.
 * 12 arcs distributed so the animation keeps a continuous flow of pulses.
 */
const ARC_CONNECTIONS = buildArcs([
  [0, 4, 6.0, 0.0],   // top → lower-right (diameter)
  [1, 5, 6.0, 0.5],   // upper-right → bottom
  [2, 6, 6.0, 1.0],   // right-upper → bottom-left
  [3, 7, 6.0, 1.5],   // right-lower → left (diameter)
  [0, 5, 6.0, 2.0],   // top → bottom
  [1, 6, 6.0, 2.5],   // upper-right → bottom-left (diameter)
  [2, 7, 6.0, 3.0],   // right-upper → left
  [0, 3, 6.0, 3.5],   // top → right-lower
  [4, 7, 6.0, 4.0],   // lower-right → left
  [5, 2, 6.0, 4.5],   // bottom → right-upper
  [6, 1, 6.0, 5.0],   // bottom-left → upper-right
  [0, 6, 6.0, 5.5],   // top → bottom-left
]);

function buildArcs(spec) {
  return spec.map(([fromIdx, toIdx, dur, delay], i) => {
    const a = CITY_NODES[fromIdx];
    const b = CITY_NODES[toIdx];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    // Perpendicular to the chord, normalized
    const px = -dy / dist;
    const py = dx / dist;
    // Pick the perpendicular direction that goes AWAY from globe center
    // so every arc bows outward like an orbital path. For chords passing
    // through the center, alternate the bow side so the network has variety.
    const toCenterX = CX - mx;
    const toCenterY = CY - my;
    const dot = px * toCenterX + py * toCenterY;
    const sign = dot === 0 ? (i % 2 === 0 ? 1 : -1) : (dot > 0 ? -1 : 1);
    const lift = 32 + dist * 0.22;
    const cx = mx + px * sign * lift;
    const cy = my + py * sign * lift;
    return {
      d: `M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`,
      from: a,
      to: b,
      dur,
      delay,
    };
  });
}

/* ============================================================================
 * STARFIELD (seeded for SSR-safe stability)
 * ========================================================================== */

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ============================================================================
 * STAT COUNTER
 * ----------------------------------------------------------------------------
 * Parses a display string like "10+", "20,000+", "1000+", "1M+" into a target
 * number plus its surrounding formatting (prefix / thousands grouping /
 * magnitude letter / suffix), then smoothly counts up to it once the section
 * scrolls into view.
 *
 * Start value is chosen relative to the target so the motion always feels
 * natural and quick:
 *   - magnitude values (1M+)  -> start ~85% of target (e.g. 0.9M -> 1M)
 *   - small values   (<= 50)  -> start ~50% of target (e.g. 20 -> 12 -> 20)
 *   - large values            -> start ~88-94% of target (no long crawl from 0)
 * ========================================================================== */

const MAGNITUDE = { k: 1e3, m: 1e6, b: 1e9 };

function parseStat(raw) {
  const str = String(raw).trim();
  // prefix | number (digits, commas, dot) | magnitude letter | trailing suffix
  const m = str.match(/^(\D*?)([\d.,]+)\s*([KkMmBb])?(.*)$/);
  if (!m) return null;
  const base = parseFloat(m[2].replace(/,/g, ""));
  if (!isFinite(base)) return null;
  const mag = m[3] ? MAGNITUDE[m[3].toLowerCase()] : 1;
  return {
    raw: str,
    target: base * mag, // real numeric target (1M -> 1,000,000)
  };
}

function getStartValue(target) {
  // Small numbers can count from ~half; big ones start close so there's
  // no long crawl. Either way the motion stays short and natural.
  if (target <= 50) return Math.round(target * 0.5);
  return Math.round(target * 0.85);
}

function AnimatedNumber({ value, active, delay = 0, duration = 1600 }) {
  const info = useMemo(() => parseStat(value), [value]);
  const startValue = info ? getStartValue(info.target) : 0;

  const [display, setDisplay] = useState(() =>
    info ? startValue.toLocaleString("en-US") : String(value)
  );
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || !info || startedRef.current) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(info.raw);
      return;
    }

    startedRef.current = true;
    let rafId;
    let timeoutId;
    let startTs = null;

    // easeOutCubic — smooth, steady glide that settles gently
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (ts) => {
      if (startTs === null) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      if (t >= 1) {
        setDisplay(info.raw); // snap to the exact source string (e.g. "1M+")
        return;
      }
      const current = startValue + (info.target - startValue) * ease(t);
      setDisplay(Math.round(current).toLocaleString("en-US"));
      rafId = requestAnimationFrame(tick);
    };

    timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [active, info, startValue, delay, duration]);

  if (!info) return <>{value}</>;
  return <>{display}</>;
}

/* ============================================================================
 * COMPONENT
 * ========================================================================== */

export default function AnimatedGlobeHero({
  stats = DEFAULT_STATS,
  showStats = true,
  className = "",
}) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  // Activate when the section scrolls into view: globe reveals first,
  // then cards animate in (their CSS uses staggered --enter-delay).
  // Fallback timer guarantees the section becomes visible even if
  // IntersectionObserver doesn't fire (some hydration paths skip it).
  useEffect(() => {
    if (active) return;
    const fallback = setTimeout(() => setActive(true), 4000);

    if (!sectionRef.current || typeof IntersectionObserver === "undefined") {
      setActive(true);
      clearTimeout(fallback);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
            clearTimeout(fallback);
            break;
          }
        }
      },
      // threshold 0 fires the moment ANY pixel enters the viewport,
      // so short sections (or sections revealed by quick scrolls) still trigger.
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [active]);

  // Stable starfield
  const stars = useMemo(() => {
    const rnd = mulberry32(20260518);
    return Array.from({ length: 90 }, () => ({
      cx: rnd() * VB_W,
      cy: rnd() * VB_H * 0.7, // Keep stars in upper portion
      r: 0.3 + rnd() * 1.1,
      delay: rnd() * 6,
      duration: 2.5 + rnd() * 3,
      opacity: 0.25 + rnd() * 0.55,
    }));
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`globe-hero ${active ? "is-active" : ""} ${className}`}
      role="img"
      aria-label="Animated globe with global network connections"
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="globe-hero__svg"
      >
        <defs>
          {/* ============================================================
              BACKGROUND GRADIENTS
              HERO PALETTE — pixel-matched to .hero-gradient-flow:
                base ramp #1360ee → #0a84e3 → #3abede → #97def1
                patches  rgba(13,47,165) / (10,132,227) / (8,178,224)
                         (58,190,222) / (170,225,245) / (193,235,247)
              No warm/amber tones — pure blue→cyan→ice family.
              ============================================================ */}
          <linearGradient id="bgSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#1360ee" />
            <stop offset="45%"  stopColor="#0a84e3" />
            <stop offset="75%"  stopColor="#3abede" />
            <stop offset="100%" stopColor="#97def1" />
          </linearGradient>
          <radialGradient id="bgDeepBlue" cx="18%" cy="12%" r="70%">
            <stop offset="0%"   stopColor="#0d2fa5" stopOpacity="0.6" />
            <stop offset="55%"  stopColor="#0d2fa5" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#0d2fa5" stopOpacity="0" />
          </radialGradient>
          {/* Horizon glow — re-tuned from warm amber to pale-ice cyan */}
          <radialGradient id="bgHorizonGlow" cx="45%" cy="108%" r="70%">
            <stop offset="0%"   stopColor="#c1ebf7" stopOpacity="0.85" />
            <stop offset="25%"  stopColor="#aae1f5" stopOpacity="0.55" />
            <stop offset="55%"  stopColor="#97def1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#97def1" stopOpacity="0" />
          </radialGradient>
          {/* Right wash — re-tuned to sky-cyan */}
          <radialGradient id="bgRightWarm" cx="95%" cy="55%" r="55%">
            <stop offset="0%"   stopColor="#3abede" stopOpacity="0.45" />
            <stop offset="50%"  stopColor="#08b2e0" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#08b2e0" stopOpacity="0" />
          </radialGradient>
          {/* Bottom-left wash — re-tuned to pale-ice cyan */}
          <radialGradient id="bgBottomLeftWarm" cx="15%" cy="95%" r="45%">
            <stop offset="0%"   stopColor="#c1ebf7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c1ebf7" stopOpacity="0" />
          </radialGradient>

          {/* Deep-blue cloud patch — hero deep-navy + electric blue */}
          <radialGradient id="darkCloudPatch" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0d2fa5" stopOpacity="1" />
            <stop offset="40%"  stopColor="#0a84e3" stopOpacity="0.62" />
            <stop offset="65%"  stopColor="#0a84e3" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0a84e3" stopOpacity="0" />
          </radialGradient>
          {/* Watery cyan patch — hero sky-cyan + pale cyan */}
          <radialGradient id="wateryBluePatch" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#08b2e0" stopOpacity="0.85" />
            <stop offset="45%"  stopColor="#3abede" stopOpacity="0.45" />
            <stop offset="75%"  stopColor="#aae1f5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#aae1f5" stopOpacity="0" />
          </radialGradient>

          {/* ============================================================
              EARTH SURFACE — procedural texture via turbulence
              Layer 1: low-frequency noise = continent shapes
              Layer 2: higher-frequency = terrain detail / coastlines
              Layer 3: very high frequency = cloud streaks
              ============================================================ */}
          <filter id="continentNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.014"
              numOctaves="4"
              seed="7"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.45
                      0 0 0 0 0.72
                      0 0 0 0 0.88
                      0 0 0 4 -1.6"
            />
          </filter>
          <filter id="terrainNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              seed="13"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.55
                      0 0 0 0 0.78
                      0 0 0 0 0.92
                      0 0 0 1.5 -0.6"
            />
          </filter>
          <filter id="cloudNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.045"
              numOctaves="3"
              seed="22"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 2.2 -0.9"
            />
          </filter>

          {/* Ocean base — matched to hero sky gradient
              (#1360ee → #0a84e3 → #3abede → #97def1) so the globe reads
              as part of the surrounding sky, not a paler disc on top. */}
          <radialGradient id="oceanBase" cx="42%" cy="32%" r="72%">
            <stop offset="0%"   stopColor="#1f6ff0" />
            <stop offset="40%"  stopColor="#0a84e3" />
            <stop offset="75%"  stopColor="#3abede" />
            <stop offset="100%" stopColor="#97def1" />
          </radialGradient>

          {/* Spherical shading — top-left highlight, bottom-right shadow */}
          <radialGradient id="sphereLight" cx="32%" cy="22%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sphereShade" cx="70%" cy="78%" r="65%">
            <stop offset="0%" stopColor="#0d2fa5" stopOpacity="0" />
            <stop offset="65%" stopColor="#0d2fa5" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0d2fa5" stopOpacity="0.28" />
          </radialGradient>

          {/* Terminator — re-tuned to pale-ice cyan rim (matches hero palette) */}
          <radialGradient id="terminatorWarm" cx="50%" cy="95%" r="55%">
            <stop offset="0%"   stopColor="#c1ebf7" stopOpacity="0.75" />
            <stop offset="50%"  stopColor="#97def1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#97def1" stopOpacity="0" />
          </radialGradient>

          {/* Atmospheric halo — soft white ring around the globe */}
          <radialGradient id="atmoHalo" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="78%" stopColor="#cce8f8" stopOpacity="0.03" />
            <stop offset="92%" stopColor="#ffffff" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="atmoHaloOuter" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="88%" stopColor="#e8f4fc" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Arc trail gradient — fades from transparent to bright white tip */}
          <linearGradient id="arcTrail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="brightGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="cometGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sphere clip path */}
          <clipPath id="globeClip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>

          {/* ============================================================
              Earth texture symbol — one self-contained tile, exactly
              the width of the globe diameter. We render TWO copies of
              this symbol side-by-side and translate the parent group
              horizontally. When the leading copy has moved exactly one
              tile-width, the trailing copy is now in the leading
              copy's original position — so the loop is seamless.

              This is the standard trick for endless scrolling textures.
              Crucially, the noise is BAKED into the symbol once, so the
              two copies render identical pixels — no procedural mismatch.
              ============================================================ */}
          <symbol
            id="earthTile"
            width={R * 2}
            height={R * 2}
            viewBox={`0 0 ${R * 2} ${R * 2}`}
          >
            <rect width={R * 2} height={R * 2} fill="#0a84e3" />
            <rect
              width={R * 2}
              height={R * 2}
              fill="white"
              filter="url(#continentNoise)"
              opacity="0.78"
            />
            <rect
              width={R * 2}
              height={R * 2}
              fill="white"
              filter="url(#terrainNoise)"
              opacity="0.16"
              style={{ mixBlendMode: "screen" }}
            />
          </symbol>

          <symbol
            id="cloudTile"
            width={R * 2}
            height={R * 2}
            viewBox={`0 0 ${R * 2} ${R * 2}`}
          >
            <rect
              width={R * 2}
              height={R * 2}
              fill="white"
              filter="url(#cloudNoise)"
              opacity="0.6"
            />
          </symbol>
        </defs>

        {/* ====================================================================
            BACKGROUND LAYERS
            ==================================================================== */}
        <rect width={VB_W} height={VB_H} fill="url(#bgSky)" />
        <rect width={VB_W} height={VB_H} fill="url(#bgDeepBlue)" />

        {/* Uneven cool-blue cloud patches — top + sides only.
            Keep clear of the bottom where the warm horizon glow lives,
            so blue and gold never muddy each other. */}
        <g className="cloud-patches">
          {/* Top band */}
          <ellipse cx="128"  cy="32"  rx="742" ry="238" fill="url(#darkCloudPatch)" opacity="0.62" />
          <ellipse cx="1178" cy="16"  rx="666" ry="205" fill="url(#darkCloudPatch)" opacity="0.60" />
          <ellipse cx="666"  cy="54"  rx="435" ry="108" fill="url(#darkCloudPatch)" opacity="0.52" />
          <ellipse cx="870"  cy="32"  rx="384" ry="86"  fill="url(#darkCloudPatch)" opacity="0.50" />
          {/* Mid band */}
          <ellipse cx="205"  cy="172" rx="538" ry="151" fill="url(#darkCloudPatch)" opacity="0.44" />
          <ellipse cx="1024" cy="138" rx="589" ry="173" fill="url(#darkCloudPatch)" opacity="0.42" />
          {/* Side patches hugging the globe (kept above the warm horizon) */}
          <ellipse cx="60"   cy="260" rx="320" ry="180" fill="url(#darkCloudPatch)" opacity="0.36" />
          <ellipse cx="1230" cy="240" rx="320" ry="180" fill="url(#darkCloudPatch)" opacity="0.34" />
          <ellipse cx="180"  cy="360" rx="240" ry="150" fill="url(#darkCloudPatch)" opacity="0.26" />
          <ellipse cx="1110" cy="340" rx="240" ry="150" fill="url(#darkCloudPatch)" opacity="0.24" />
          {/* Cool watery blue around the 1M+ card area (right-mid / lower-right) */}
          <ellipse cx="1150" cy="320" rx="280" ry="170" fill="url(#wateryBluePatch)" opacity="0.55" />
          <ellipse cx="1230" cy="395" rx="220" ry="135" fill="url(#wateryBluePatch)" opacity="0.42" />
        </g>

        <rect width={VB_W} height={VB_H} fill="url(#bgRightWarm)" />
        <rect width={VB_W} height={VB_H} fill="url(#bgBottomLeftWarm)" />
        <rect width={VB_W} height={VB_H} fill="url(#bgHorizonGlow)" className="horizon-pulse" />

        {/* Starfield */}
        <g className="stars">
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="#ffffff"
              opacity={s.opacity}
              style={{
                animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
          ))}
        </g>

        {/* ====================================================================
            GLOBE
            ==================================================================== */}
        <g className="globe-group">
          {/* Outer soft atmosphere */}
          <circle
            cx={CX}
            cy={CY}
            r={R + 60}
            fill="url(#atmoHaloOuter)"
            className="halo-outer"
          />
          {/* Inner crisp atmosphere */}
          <circle
            cx={CX}
            cy={CY}
            r={R + 28}
            fill="url(#atmoHalo)"
            className="halo-inner"
          />

          {/* Ocean base sphere */}
          <circle cx={CX} cy={CY} r={R} fill="url(#oceanBase)" />

          {/* Rotating Earth texture — two identical copies of the texture
              tile placed side-by-side, translated as a group. When the
              group has shifted left by exactly one tile-width, the second
              copy is in the first copy's original spot — so when the
              animation loops back to 0, there's no visible jump. This is
              what makes the surface VISIBLY rotate (the noise is baked
              into a symbol, so it moves with the geometry). */}
          <g clipPath="url(#globeClip)">
            <g className="earth-rotate">
              <use
                href="#earthTile"
                x={CX - R}
                y={CY - R}
                width={R * 2}
                height={R * 2}
              />
              <use
                href="#earthTile"
                x={CX - R + R * 2}
                y={CY - R}
                width={R * 2}
                height={R * 2}
              />
            </g>
          </g>

          {/* Cloud layer — same two-copy technique, slower drift */}
          <g clipPath="url(#globeClip)" style={{ mixBlendMode: "screen" }}>
            <g className="cloud-rotate" opacity="0.55">
              <use
                href="#cloudTile"
                x={CX - R}
                y={CY - R}
                width={R * 2}
                height={R * 2}
              />
              <use
                href="#cloudTile"
                x={CX - R + R * 2}
                y={CY - R}
                width={R * 2}
                height={R * 2}
              />
            </g>
          </g>

          {/* Spherical shading — applied after texture for proper 3D feel */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="url(#sphereLight)"
            clipPath="url(#globeClip)"
          />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="url(#sphereShade)"
            clipPath="url(#globeClip)"
          />

          {/* Warm terminator glow at bottom */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="url(#terminatorWarm)"
            clipPath="url(#globeClip)"
          />

          {/* Glowing white ring — outer bloom layer */}
          <circle
            cx={CX}
            cy={CY}
            r={R + 6}
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            opacity="0.10"
            filter="url(#ringGlow)"
          />
          {/* Glowing white ring — crisp bright stroke */}
          <circle
            cx={CX}
            cy={CY}
            r={R + 2}
            fill="none"
            stroke="#ffffff"
            strokeWidth="4.5"
            opacity="0.92"
            filter="url(#ringGlow)"
          />
          {/* Inner edge darkening for sphere depth */}
          <circle
            cx={CX}
            cy={CY}
            r={R - 0.5}
            fill="none"
            stroke="#0d2fa5"
            strokeWidth="1.5"
            opacity="0.22"
          />
        </g>

        {/* ====================================================================
            ORBITAL RINGS + SATELLITES — premium 3D orbital ring system.
            Three elliptical rings at different tilts encircle the globe,
            with satellite dots traveling along each path via CSS offset-path
            (GPU-accelerated, no layout cost). Gives a cinematic high-end
            SaaS "global network" feel without breaking the existing layout.
            ==================================================================== */}
        <g className="orbital-layer">
          {/* Outer orbit — broadest, gentle tilt left */}
          <ellipse
            cx={CX} cy={CY}
            rx={R * 1.48} ry={R * 0.46}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.7"
            transform={`rotate(-16 ${CX} ${CY})`}
            className="orbit-ring orbit-ring--outer"
            filter="url(#softGlow)"
          />
          {/* Middle orbit — opposite tilt, dashed */}
          <ellipse
            cx={CX} cy={CY}
            rx={R * 1.32} ry={R * 0.34}
            fill="none"
            stroke="rgba(190,225,255,0.28)"
            strokeWidth="0.6"
            strokeDasharray="3 2.5"
            transform={`rotate(22 ${CX} ${CY})`}
            className="orbit-ring orbit-ring--middle"
          />
          {/* Inner orbit — subtle, just outside atmosphere */}
          <ellipse
            cx={CX} cy={CY}
            rx={R * 1.18} ry={R * 0.27}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.5"
            transform={`rotate(-6 ${CX} ${CY})`}
            className="orbit-ring orbit-ring--inner"
          />

          {/* Orbiting satellites — native SVG animateMotion along each ring path */}
          <circle r="2.8" fill="#ffffff" filter="url(#cometGlow)" className="satellite">
            <animateMotion dur="18s" repeatCount="indefinite" rotate="auto"
              path={`M ${CX - R * 1.48} ${CY} A ${R * 1.48} ${R * 0.46} -16 1 1 ${CX + R * 1.48} ${CY} A ${R * 1.48} ${R * 0.46} -16 1 1 ${CX - R * 1.48} ${CY}`}
            />
          </circle>
          <circle r="1.7" fill="#cfeaff" filter="url(#softGlow)" className="satellite">
            <animateMotion dur="13s" repeatCount="indefinite" rotate="auto" begin="-4s"
              path={`M ${CX - R * 1.32} ${CY} A ${R * 1.32} ${R * 0.34} 22 1 0 ${CX + R * 1.32} ${CY} A ${R * 1.32} ${R * 0.34} 22 1 0 ${CX - R * 1.32} ${CY}`}
            />
          </circle>
          <circle r="2.0" fill="#ffffff" filter="url(#softGlow)" className="satellite">
            <animateMotion dur="22s" repeatCount="indefinite" rotate="auto" begin="-10s"
              path={`M ${CX - R * 1.18} ${CY} A ${R * 1.18} ${R * 0.27} -6 1 1 ${CX + R * 1.18} ${CY} A ${R * 1.18} ${R * 0.27} -6 1 1 ${CX - R * 1.18} ${CY}`}
            />
          </circle>
          {/* Counter-orbital small particle for extra life */}
          <circle r="1.3" fill="#ffe7b8" filter="url(#softGlow)" className="satellite">
            <animateMotion dur="26s" repeatCount="indefinite" rotate="auto" begin="-16s"
              path={`M ${CX + R * 1.48} ${CY} A ${R * 1.48} ${R * 0.46} -16 1 0 ${CX - R * 1.48} ${CY} A ${R * 1.48} ${R * 0.46} -16 1 0 ${CX + R * 1.48} ${CY}`}
            />
          </circle>
        </g>

        {/* ====================================================================
            CITY NODES — pulsing markers anchored to the visible hemisphere
            ==================================================================== */}
        <g className="city-nodes">
          {CITY_NODES.map((node, i) => {
            const dur = 3.2 + (i % 4) * 0.4;
            const begin = `${i * 0.35}s`;
            return (
              <g key={node.name}>
                <circle cx={node.x} cy={node.y} r="6" fill="#ffffff" opacity="0.15" filter="url(#brightGlow)">
                  <animate attributeName="opacity" values="0.07;0.22;0.07" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="r" values="5;7.5;5" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                </circle>
                <circle cx={node.x} cy={node.y} r="2" fill="#ffffff" filter="url(#softGlow)">
                  <animate attributeName="opacity" values="0.55;1;0.55" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="r" values="1.7;2.4;1.7" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                </circle>
                <circle cx={node.x} cy={node.y} r="0.9" fill="#ffffff">
                  <animate attributeName="opacity" values="0.55;1;0.55" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </g>

        {/* ====================================================================
            CONNECTION ARCS — cinematic city-to-city travel paths
            Each arc has:
              - A faint static guide line (very subtle)
              - An animated stroke that draws along the path
              - A bright comet head following the same offset-path
            ==================================================================== */}
        <g className="arcs">
          {ARC_CONNECTIONS.map((arc, i) => {
            const dur = `${arc.dur}s`;
            const begin = `${arc.delay}s`;
            return (
            <g key={i}>
              {/* Static network route — always visible thin white line */}
              <path
                d={arc.d}
                pathLength="100"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeOpacity="0.45"
                strokeLinecap="round"
              />
              {/* Animated bright pulse traveling the full path
                  Uses SVG SMIL <animate> so it works on SVG without
                  needing CSS keyframe resolution. */}
              <path
                d={arc.d}
                pathLength="100"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0"
                strokeDasharray="0 100"
                filter="url(#softGlow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 100; 30 100; 8 100; 0 100"
                  keyTimes="0; 0.5; 0.85; 1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0; -25; -92; -100"
                  keyTimes="0; 0.5; 0.85; 1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0; 0.95; 0.95; 0.5; 0"
                  keyTimes="0; 0.1; 0.5; 0.85; 1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </path>
              {/* Traveling comet head — outer glow (animateMotion) */}
              <circle r="3" fill="#ffffff" opacity="0" filter="url(#cometGlow)">
                <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={arc.d} />
                <animate
                  attributeName="opacity"
                  values="0; 1; 1; 0"
                  keyTimes="0; 0.08; 0.92; 1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Traveling comet head — bright core */}
              <circle r="1.5" fill="#ffffff" opacity="0">
                <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={arc.d} />
                <animate
                  attributeName="opacity"
                  values="0; 1; 1; 0"
                  keyTimes="0; 0.08; 0.92; 1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Landing pulse at destination */}
              <circle
                cx={arc.to.x}
                cy={arc.to.y}
                r="1.5"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0; 0; 0.9; 0"
                  keyTimes="0; 0.88; 0.92; 1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="1.5; 1.5; 3; 9.6"
                  keyTimes="0; 0.88; 0.92; 1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            );
          })}
        </g>
      </svg>

      {/* ======================================================================
          FLOATING STAT CARDS — minimal glass-morphism
          ====================================================================== */}
      {showStats && (
        <div className="globe-hero__stats">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`stat-card stat-card--${stat.side} stat-card--${stat.row}`}
              style={{
                "--enter-delay": `${1.4 + i * 0.15}s`,
                "--float-delay": `${i * 0.6}s`,
              }}
            >
              <div className="stat-card__inner">
                <div className="stat-card__value">
                  <AnimatedNumber
                    value={stat.value}
                    active={active}
                    delay={(1.4 + i * 0.15) * 1000}
                  />
                </div>
                <div className="stat-card__label">{stat.label}</div>
              </div>
              <span className="stat-card__shimmer" aria-hidden="true" />
            </div>
          ))}
        </div>
      )}

      {/* ======================================================================
          STYLES
          ====================================================================== */}
      <style jsx global>{`
        .globe-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 1280 / 540;
          overflow: hidden;
          isolation: isolate;
          /* HERO PALETTE — fallback before SVG paints */
          background: #1360ee;
        }
        .globe-hero__svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Entrance gating — hidden until the section scrolls into view
           (or the fallback timer fires). Globe reveals first, then ~1.3s
           later the city nodes appear, then the arcs at 1.5s. Stat cards
           animate in via their own staggered --enter-delay timing. */
        .globe-hero :global(.globe-group),
        .globe-hero :global(.city-nodes),
        .globe-hero :global(.arcs),
        .globe-hero :global(.orbital-layer) {
          opacity: 0;
        }

        .globe-hero.is-active :global(.globe-group) {
          animation: globeReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          transform-box: fill-box;
          transform-origin: ${CX}px ${CY}px;
        }
        .globe-hero.is-active :global(.city-nodes) {
          animation: globeFadeIn 1s ease-out 1.3s forwards;
        }
        .globe-hero.is-active :global(.arcs) {
          animation: globeFadeIn 0.8s ease-out 1.5s forwards;
        }
        .globe-hero.is-active :global(.orbital-layer) {
          animation: globeFadeIn 1.2s ease-out 1s forwards;
        }
        /* Keyframes (globeReveal, globeFadeIn, earthSpin, cloudSpin,
           haloBreatheIn, haloBreatheOut, horizonBreathe, ringPulse,
           arcDraw, arcComet, arcLand, cityPulse, twinkle, cardEnter,
           cardFloat, shimmerSweep) live in src/app/globals.css so the
           inline style={{ animation: '...' }} on SVG children can
           resolve them — styled-jsx scoping was preventing that. */

        /* ----- Earth rotation: two-copy seamless slide.
                 The .earth-rotate group contains two identical tiles
                 side-by-side. Translating by exactly -tileWidth puts
                 the second tile where the first started, so the loop
                 back to 0 is invisible. This is what makes the surface
                 VISIBLY rotate. ----- */
        .globe-hero :global(.earth-rotate) {
          animation: earthSpin 32s linear infinite;
          will-change: transform;
        }
        .globe-hero :global(.cloud-rotate) {
          animation: cloudSpin 58s linear infinite;
          will-change: transform;
        }

        /* ----- Atmospheric halo breathing ----- */
        .globe-hero :global(.halo-inner) {
          transform-box: fill-box;
          transform-origin: center;
          animation: haloBreatheIn 7s ease-in-out infinite;
        }
        .globe-hero :global(.halo-outer) {
          transform-box: fill-box;
          transform-origin: center;
          animation: haloBreatheOut 9s ease-in-out infinite;
        }

        .globe-hero :global(.horizon-pulse) {
          animation: horizonBreathe 10s ease-in-out infinite;
        }

        /* ----- Orbital rings + satellites ----- */
        .globe-hero :global(.orbit-ring) {
          transform-box: fill-box;
          transform-origin: center;
        }
        .globe-hero :global(.orbit-ring--outer) {
          animation: ringPulse 6s ease-in-out infinite;
        }
        .globe-hero :global(.orbit-ring--middle) {
          animation: ringPulse 7.5s ease-in-out -2s infinite;
        }
        .globe-hero :global(.orbit-ring--inner) {
          animation: ringPulse 5.2s ease-in-out -3s infinite;
        }
        .globe-hero :global(.satellite) {
          will-change: transform, offset-distance;
          offset-rotate: 0deg;
        }

        /* ====================================================================
           STAT CARDS — minimal, tighter to globe, more premium glass
           ==================================================================== */
        .globe-hero__stats {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .stat-card {
          position: absolute;
          padding: clamp(9px, 1vw, 14px) clamp(13px, 1.4vw, 20px);
          min-width: clamp(118px, 13vw, 175px);
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(5px) saturate(110%);
          -webkit-backdrop-filter: blur(5px) saturate(110%);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          color: #ffffff;
          box-shadow:
            0 2px 8px rgba(15, 70, 120, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          opacity: 0;
          transform: translateY(20px) scale(0.96);
          filter: blur(6px);
          pointer-events: auto;
          overflow: hidden;
        }
        .globe-hero.is-active .stat-card {
          animation:
            cardEnter 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--enter-delay) forwards,
            cardFloat 6s ease-in-out calc(var(--enter-delay) + 1.3s) infinite;
        }
        .stat-card__inner {
          position: relative;
          z-index: 2;
        }
        .stat-card__value {
          font-size: clamp(17px, 1.9vw, 26px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 12px rgba(0, 40, 90, 0.25);
        }
        .stat-card__label {
          font-size: clamp(9px, 0.78vw, 11.5px);
          font-weight: 400;
          opacity: 0.92;
          margin-top: 4px;
          letter-spacing: 0.01em;
        }
        .stat-card__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(255, 255, 255, 0.07) 50%,
            transparent 65%
          );
          transform: translateX(-100%);
          pointer-events: none;
          z-index: 1;
        }
        .globe-hero.is-active .stat-card__shimmer {
          animation: shimmerSweep 9s ease-in-out calc(var(--enter-delay) + 2s) infinite;
        }
        /* cardEnter / cardFloat / shimmerSweep keyframes live in globals.css */

        /* Positioning — closer to globe, tighter to center */
        .stat-card--left  { left: clamp(8%, 14vw, 20%); }
        .stat-card--right { right: clamp(8%, 14vw, 20%); }
        .stat-card--top.stat-card--left     { top: 40%; }
        .stat-card--bottom.stat-card--left  { top: 71%; }
        .stat-card--top.stat-card--right    { top: 26%; }
        .stat-card--bottom.stat-card--right { top: 57%; }

        /* ----- Responsive ----- */
        @media (max-width: 1024px) {
          .stat-card { min-width: 112px; padding: 8px 12px; border-radius: 12px; }
          .stat-card--left  { left: clamp(6%, 10vw, 15%); }
          .stat-card--right { right: clamp(6%, 10vw, 15%); }
          .stat-card--top.stat-card--left     { top: 37%; }
          .stat-card--bottom.stat-card--left  { top: 68%; }
          .stat-card--top.stat-card--right    { top: 22%; }
          .stat-card--bottom.stat-card--right { top: 58%; }
        }
        @media (max-width: 768px) {
          .globe-hero { aspect-ratio: 4 / 3; }
          .stat-card { min-width: 100px; padding: 7px 10px; border-radius: 10px; }
          .stat-card__value { font-size: 15px; }
          .stat-card__label { font-size: 9.5px; }
          .stat-card--top.stat-card--left     { top: 8%;  left: 3%; }
          .stat-card--bottom.stat-card--left  { top: 76%; left: 3%; }
          .stat-card--top.stat-card--right    { top: 8%;  right: 3%; }
          .stat-card--bottom.stat-card--right { top: 76%; right: 3%; }
        }
        @media (max-width: 480px) {
          .globe-hero { aspect-ratio: 3 / 4; }
          .stat-card { min-width: 88px; padding: 6px 9px; }
          .stat-card__value { font-size: 13px; }
          .stat-card__label { font-size: 8.5px; }
          .stat-card--top.stat-card--left     { top: 5%; }
          .stat-card--bottom.stat-card--left  { top: 80%; }
          .stat-card--top.stat-card--right    { top: 5%; }
          .stat-card--bottom.stat-card--right { top: 80%; }
        }

        /* ----- Accessibility ----- */
        @media (prefers-reduced-motion: reduce) {
          .globe-hero :global(*) { animation: none !important; }
          .globe-hero :global(.globe-group),
          .globe-hero :global(.city-nodes),
          .globe-hero :global(.arcs),
          .globe-hero :global(.orbital-layer) { opacity: 1 !important; }
          .stat-card {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </div>
  );
}