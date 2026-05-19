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
 * City nodes spread across the visible hemisphere using polar coordinates.
 * Each is placed at a normalized radius (0–1) from globe center at a given
 * angle (degrees, 0 = right, going clockwise). Radii are kept under 0.92
 * so nodes sit comfortably inside the rim, not on the edge.
 */
const CITY_POLAR = [
  { angle: 215, radius: 0.62, name: "north-america" },  // upper-left
  { angle: 270, radius: 0.78, name: "europe-north" },   // top
  { angle: 305, radius: 0.55, name: "europe-east" },    // upper-right inner
  { angle: 340, radius: 0.85, name: "asia-east" },      // right-top
  { angle: 20,  radius: 0.78, name: "asia-south" },     // right
  { angle: 60,  radius: 0.72, name: "oceania" },        // lower-right
  { angle: 105, radius: 0.82, name: "south-pacific" },  // bottom
  { angle: 150, radius: 0.68, name: "south-america" },  // lower-left
  { angle: 185, radius: 0.80, name: "atlantic" },       // left
  { angle: 250, radius: 0.40, name: "central" },        // inner-upper
  { angle: 30,  radius: 0.35, name: "core" },           // inner-right
  { angle: 130, radius: 0.45, name: "africa" },         // inner-lower-left
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
 * Connection arcs: cinematic curves between two city nodes.
 * Each arc lifts up off the globe surface, peaks above, then lands.
 * The `d` path is a quadratic curve with a control point above the midpoint.
 */
const ARC_CONNECTIONS = buildArcs([
  [0, 4,  5.8, 0.0],   // NA -> Asia South (long diagonal across)
  [1, 5,  6.2, 1.0],   // Europe N -> Oceania (top to bottom-right)
  [8, 3,  5.5, 2.2],   // Atlantic -> Asia East (left to right)
  [7, 2,  6.0, 3.4],   // SA -> Europe East (lower-left to upper-right)
  [6, 0,  5.5, 4.6],   // South Pacific -> NA (bottom to top-left)
  [4, 8,  5.8, 5.8],   // Asia South -> Atlantic (right to left)
  [11, 3, 5.2, 7.0],   // Africa -> Asia East
  [5, 0,  6.0, 8.2],   // Oceania -> NA (long diagonal)
  [1, 7,  5.5, 9.4],   // Europe N -> SA (top to bottom-left)
]);

function buildArcs(spec) {
  return spec.map(([fromIdx, toIdx, dur, delay], i) => {
    const a = CITY_NODES[fromIdx];
    const b = CITY_NODES[toIdx];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    // Lift control point AWAY from the globe center along the perpendicular
    // of the chord — this makes each arc bulge outward (over the surface)
    // instead of all pulling up to the same point above the globe.
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    // Perpendicular vector (rotate 90°)
    let px = -dy;
    let py = dx;
    const pLen = Math.hypot(px, py) || 1;
    px /= pLen;
    py /= pLen;
    // Always push perpendicular AWAY from globe center
    const toCenterX = mx - CX;
    const toCenterY = my - CY;
    const sign = px * toCenterX + py * toCenterY > 0 ? 1 : -1;
    const lift = Math.min(180, 70 + dist * 0.35);
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
 * COMPONENT
 * ========================================================================== */

export default function AnimatedGlobeHero({
  stats = DEFAULT_STATS,
  showStats = true,
  className = "",
}) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  // Activate animations only when scrolled into view (perf + nicer entrance)
  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
              Tuned to match the reference: cool deep blue at top-left,
              soft cyan mid, warm cream-amber at the horizon bottom.
              ============================================================ */}
          <linearGradient id="bgSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a6fa8" />
            <stop offset="30%" stopColor="#4ba0cf" />
            <stop offset="60%" stopColor="#9ed1e8" />
            <stop offset="100%" stopColor="#e8eef0" />
          </linearGradient>
          <radialGradient id="bgDeepBlue" cx="10%" cy="15%" r="75%">
            <stop offset="0%" stopColor="#0f5a92" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#0f5a92" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0f5a92" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bgHorizonGlow" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#ffd89a" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#ffe2b3" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#fff0d4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#fff0d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bgRightWarm" cx="90%" cy="65%" r="50%">
            <stop offset="0%" stopColor="#ffe0b8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffe0b8" stopOpacity="0" />
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

          {/* Ocean base — light sky-cyan to match background gradient */}
          <radialGradient id="oceanBase" cx="42%" cy="35%" r="68%">
            <stop offset="0%" stopColor="#a8d9ec" />
            <stop offset="45%" stopColor="#7fc6e3" />
            <stop offset="80%" stopColor="#4ba0cf" />
            <stop offset="100%" stopColor="#3a8db8" />
          </radialGradient>

          {/* Spherical shading — top-left highlight, bottom-right shadow */}
          <radialGradient id="sphereLight" cx="32%" cy="22%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sphereShade" cx="70%" cy="78%" r="65%">
            <stop offset="0%" stopColor="#1a5680" stopOpacity="0" />
            <stop offset="65%" stopColor="#1a5680" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1a5680" stopOpacity="0.35" />
          </radialGradient>

          {/* Terminator — warm rim at bottom where horizon glow meets globe */}
          <radialGradient id="terminatorWarm" cx="50%" cy="95%" r="55%">
            <stop offset="0%" stopColor="#ffc68a" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#ffd89a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffd89a" stopOpacity="0" />
          </radialGradient>

          {/* Atmospheric halo — soft white ring around the globe */}
          <radialGradient id="atmoHalo" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="78%" stopColor="#cce8f8" stopOpacity="0.18" />
            <stop offset="92%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="atmoHaloOuter" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="88%" stopColor="#e8f4fc" stopOpacity="0.22" />
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
            <rect width={R * 2} height={R * 2} fill="#7fc6e3" />
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
        <rect width={VB_W} height={VB_H} fill="url(#bgRightWarm)" />
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

          {/* Crisp rim light */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.7"
          />
          {/* Inner edge darkening for sphere depth */}
          <circle
            cx={CX}
            cy={CY}
            r={R - 0.5}
            fill="none"
            stroke="#2e7ba8"
            strokeWidth="1.5"
            opacity="0.25"
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
          {CITY_NODES.map((node, i) => (
            <g
              key={node.name}
              style={{
                animation: `cityPulse ${3.2 + (i % 4) * 0.4}s ease-in-out ${i * 0.35}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            >
              <circle cx={node.x} cy={node.y} r="6" fill="#ffffff" opacity="0.15" filter="url(#brightGlow)" />
              <circle cx={node.x} cy={node.y} r="2" fill="#ffffff" filter="url(#softGlow)" />
              <circle cx={node.x} cy={node.y} r="0.9" fill="#ffffff" />
            </g>
          ))}
        </g>

        {/* ====================================================================
            CONNECTION ARCS — cinematic city-to-city travel paths
            Each arc has:
              - A faint static guide line (very subtle)
              - An animated stroke that draws along the path
              - A bright comet head following the same offset-path
            ==================================================================== */}
        <g className="arcs">
          {ARC_CONNECTIONS.map((arc, i) => (
            <g key={i}>
              {/* Faint guide line so arcs are visible even between travels */}
              <path
                d={arc.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
                strokeOpacity="0.1"
                strokeLinecap="round"
              />
              {/* Animated arc trail */}
              <path
                d={arc.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeOpacity="0"
                filter="url(#softGlow)"
                style={{
                  animation: `arcDraw ${arc.dur}s cubic-bezier(0.45, 0, 0.25, 1) ${arc.delay}s infinite`,
                }}
              />
              {/* Comet head */}
              <circle
                r="2.8"
                fill="#ffffff"
                opacity="0"
                filter="url(#cometGlow)"
                style={{
                  offsetPath: `path('${arc.d}')`,
                  animation: `arcComet ${arc.dur}s cubic-bezier(0.45, 0, 0.25, 1) ${arc.delay}s infinite`,
                }}
              />
              {/* Bright core of comet */}
              <circle
                r="1.4"
                fill="#ffffff"
                opacity="0"
                style={{
                  offsetPath: `path('${arc.d}')`,
                  animation: `arcComet ${arc.dur}s cubic-bezier(0.45, 0, 0.25, 1) ${arc.delay}s infinite`,
                }}
              />
              {/* Landing pulse at destination */}
              <circle
                cx={arc.to.x}
                cy={arc.to.y}
                r="3"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                opacity="0"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `arcLand ${arc.dur}s ease-out ${arc.delay}s infinite`,
                }}
              />
            </g>
          ))}
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
                <div className="stat-card__value">{stat.value}</div>
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
          background: #1a6fa8;
        }
        .globe-hero__svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ----- Entrance gating ----- */
        .globe-hero :global(.globe-group),
        .globe-hero :global(.city-nodes),
        .globe-hero :global(.arcs),
        .globe-hero :global(.stars),
        .globe-hero :global(.horizon-pulse),
        .globe-hero :global(.halo-inner),
        .globe-hero :global(.halo-outer),
        .globe-hero :global(.earth-rotate),
        .globe-hero :global(.cloud-rotate),
        .globe-hero :global(.satellite),
        .globe-hero :global(.orbit-ring) {
          animation-play-state: paused !important;
        }
        .globe-hero :global(.globe-group),
        .globe-hero :global(.city-nodes),
        .globe-hero :global(.arcs) {
          opacity: 0;
        }

        .globe-hero.is-active :global(.globe-group),
        .globe-hero.is-active :global(.city-nodes),
        .globe-hero.is-active :global(.arcs),
        .globe-hero.is-active :global(.stars),
        .globe-hero.is-active :global(.horizon-pulse),
        .globe-hero.is-active :global(.halo-inner),
        .globe-hero.is-active :global(.halo-outer),
        .globe-hero.is-active :global(.earth-rotate),
        .globe-hero.is-active :global(.cloud-rotate),
        .globe-hero.is-active :global(.satellite),
        .globe-hero.is-active :global(.orbit-ring) {
          animation-play-state: running !important;
        }

        .globe-hero.is-active :global(.globe-group) {
          animation: globeReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          transform-box: fill-box;
          transform-origin: ${CX}px ${CY}px;
        }
        .globe-hero.is-active :global(.city-nodes) {
          animation: fadeIn 1s ease-out 1.3s forwards;
        }
        .globe-hero.is-active :global(.arcs) {
          animation: fadeIn 0.8s ease-out 1.5s forwards;
        }

        @keyframes globeReveal {
          0% { opacity: 0; transform: scale(0.85); filter: blur(6px); }
          60% { filter: blur(0); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes fadeIn { to { opacity: 1; } }

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
        @keyframes earthSpin {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${R * 2}px); }
        }
        @keyframes cloudSpin {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${R * 2}px); }
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
        @keyframes haloBreatheIn {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.03); }
        }
        @keyframes haloBreatheOut {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 0.95; transform: scale(1.05); }
        }

        .globe-hero :global(.horizon-pulse) {
          animation: horizonBreathe 10s ease-in-out infinite;
        }
        @keyframes horizonBreathe {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }

        /* ----- Orbital rings + satellites ----- */
        .globe-hero :global(.orbital-layer) {
          opacity: 0;
        }
        .globe-hero.is-active :global(.orbital-layer) {
          animation: fadeIn 1.2s ease-out 1s forwards;
        }
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
        @keyframes satOrbit {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        @keyframes ringPulse {
          0%, 100% { stroke-opacity: 0.65; }
          50%      { stroke-opacity: 1; }
        }

        /* ----- Arc animations ----- */
        @keyframes arcDraw {
          0%   { stroke-dasharray: 0 600; stroke-dashoffset: 0; stroke-opacity: 0; }
          15%  { stroke-opacity: 0.95; }
          50%  { stroke-dasharray: 220 600; stroke-dashoffset: -50; stroke-opacity: 0.95; }
          80%  { stroke-dasharray: 80 600; stroke-dashoffset: -380; stroke-opacity: 0.5; }
          100% { stroke-dasharray: 0 600; stroke-dashoffset: -600; stroke-opacity: 0; }
        }
        @keyframes arcComet {
          0%   { offset-distance: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes arcLand {
          0%, 88% { opacity: 0; transform: scale(0.5); }
          92%     { opacity: 0.9; transform: scale(1); }
          100%    { opacity: 0; transform: scale(3.2); }
        }

        /* ----- City node pulse ----- */
        @keyframes cityPulse {
          0%, 100% { opacity: 0.55; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.15); }
        }

        /* ----- Star twinkle ----- */
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50%      { opacity: 1;   transform: scale(1.2); }
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
          background: rgba(255, 255, 255, 0.09);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 14px;
          color: #ffffff;
          box-shadow:
            0 8px 28px rgba(15, 70, 120, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
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
            rgba(255, 255, 255, 0.14) 50%,
            transparent 65%
          );
          transform: translateX(-100%);
          pointer-events: none;
          z-index: 1;
        }
        .globe-hero.is-active .stat-card__shimmer {
          animation: shimmerSweep 9s ease-in-out calc(var(--enter-delay) + 2s) infinite;
        }

        /* Positioning — closer to globe, tighter to center */
        .stat-card--left  { left: clamp(8%, 14vw, 20%); }
        .stat-card--right { right: clamp(8%, 14vw, 20%); }
        .stat-card--top.stat-card--left     { top: 40%; }
        .stat-card--bottom.stat-card--left  { top: 71%; }
        .stat-card--top.stat-card--right    { top: 26%; }
        .stat-card--bottom.stat-card--right { top: 57%; }

        @keyframes cardEnter {
          0%   { opacity: 0; transform: translateY(20px) scale(0.96); filter: blur(6px); }
          55%  { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%); }
          45%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

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
          .globe-hero :global(.arcs) { opacity: 1 !important; }
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