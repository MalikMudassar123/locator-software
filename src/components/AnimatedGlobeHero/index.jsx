"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_STATS = [
  { value: "10+", label: "Years of industry experience", side: "left", row: "top" },
  { value: "20,000+", label: "Devices actively tracked", side: "left", row: "bottom" },
  { value: "1000+", label: "Happy customers across", side: "right", row: "top" },
  { value: "1M+", label: "Data points processed daily", side: "right", row: "bottom" },
];

const CX = 640;
const CY = 270;
const R = 180;

const CONNECTIONS = [
  { d: "M 490,180 Q 580,100 720,120 T 830,250", end: [830, 250], dur: 4.5, delay: 0 },
  { d: "M 830,250 Q 850,360 740,420 T 560,400", end: [560, 400], dur: 4.5, delay: 1.5 },
  { d: "M 560,400 Q 460,380 450,290 T 490,180", end: [490, 180], dur: 4.5, delay: 3.0 },
  { d: "M 490,180 Q 590,220 640,270 T 760,340", end: [760, 340], dur: 4.5, delay: 4.5 },
  { d: "M 760,340 Q 700,420 590,420 T 490,310", end: [490, 310], dur: 4.5, delay: 6.0 },
  { d: "M 490,310 Q 520,210 620,150 T 790,210", end: [790, 210], dur: 4.5, delay: 7.5 },
];

const STRAIGHT_LINES = [
  { d: "M 380,140 L 920,400", dur: 3.5, delay: 0.5 },
  { d: "M 920,150 L 380,400", dur: 3.5, delay: 2.0 },
  { d: "M 470,90 L 810,460", dur: 3.5, delay: 3.5 },
  { d: "M 810,90 L 470,460", dur: 3.5, delay: 5.0 },
];

const STATIC_ARCS = [
  "M 490,180 Q 580,100 720,120 T 830,250",
  "M 830,250 Q 850,360 740,420 T 560,400",
  "M 560,400 Q 460,380 450,290 T 490,180",
  "M 490,180 Q 590,220 640,270 T 760,340",
  "M 760,340 Q 700,420 590,420 T 490,310",
  "M 490,310 Q 520,210 620,150 T 790,210",
  "M 440,260 Q 640,90 850,260 Q 790,440 600,450 Q 430,410 440,260",
];

const CONSTELLATIONS = [
  [[560, 235], [580, 245], [600, 250], [620, 245]],
  [[700, 280], [715, 290], [730, 285]],
  [[600, 350], [620, 360], [640, 358]],
];

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

export default function AnimatedGlobeHero({
  stats = DEFAULT_STATS,
  showStats = true,
  className = "",
}) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stars = useMemo(() => {
    const seeded = mulberry32(20250517);
    return Array.from({ length: 70 }, () => ({
      cx: seeded() * 1280,
      cy: seeded() * 540,
      r: 0.3 + seeded() * 1.1,
      delay: seeded() * 6,
      duration: 2.5 + seeded() * 3,
      opacity: 0.25 + seeded() * 0.55,
    }));
  }, []);

  const cityNodes = useMemo(
    () => [
      [490, 180], [830, 250], [560, 400], [760, 340], [490, 310], [790, 210],
      [640, 100], [640, 440], [560, 230], [720, 230], [640, 270],
    ],
    []
  );

  const bigBursts = useMemo(
    () => [
      { cx: 830, cy: 250, delay: 0 },
      { cx: 490, cy: 180, delay: 1.8 },
      { cx: 760, cy: 340, delay: 3.6 },
      { cx: 560, cy: 400, delay: 5.4 },
      { cx: 790, cy: 210, delay: 7.2 },
    ],
    []
  );

  return (
    <div
      ref={sectionRef}
      className={`globe-hero ${active ? "is-active" : ""} ${className}`}
      role="img"
      aria-label="Animated globe with global network connections"
    >
      <svg
        viewBox="0 0 1280 540"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="globe-hero__svg"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a9cd6" />
            <stop offset="35%" stopColor="#7fc6e3" />
            <stop offset="70%" stopColor="#b8dae8" />
            <stop offset="100%" stopColor="#e0e8eb" />
          </linearGradient>
          <radialGradient id="leftWash" cx="0%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#1e7fc4" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#1e7fc4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e7fc4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rightWarm" cx="100%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#fde6c0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fde6c0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sunGlow" cx="50%" cy="92%" r="32%">
            <stop offset="0%" stopColor="#ffd089" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#ffd9a0" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#ffe5c2" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffe5c2" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="globeGrad" cx="48%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#5fb8d8" />
            <stop offset="40%" stopColor="#2e8fbf" />
            <stop offset="75%" stopColor="#1a6da0" />
            <stop offset="100%" stopColor="#0d4a78" />
          </radialGradient>
          <radialGradient id="globeBottomGlow" cx="50%" cy="95%" r="55%">
            <stop offset="0%" stopColor="#ffd89a" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#ffd89a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffd89a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="globeHighlight" cx="38%" cy="22%" r="38%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
            <stop offset="62%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="80%" stopColor="#cae8f8" stopOpacity="0.4" />
            <stop offset="90%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rayGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="megaGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <clipPath id="globeClip">
            <circle cx={CX} cy={CY} r={R + 1} />
          </clipPath>
        </defs>

        <rect width="1280" height="540" fill="url(#bgGrad)" />
        <rect width="1280" height="540" fill="url(#leftWash)" />
        <rect width="1280" height="540" fill="url(#rightWarm)" />
        <rect width="1280" height="540" fill="url(#sunGlow)" className="sun-pulse" />

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
                transformOrigin: `${s.cx}px ${s.cy}px`,
              }}
            />
          ))}
        </g>

        <g className="globe-group">
          <circle cx={CX} cy={CY} r={R + 48} fill="url(#haloGlow)" className="halo-pulse" />
          <circle cx={CX} cy={CY} r={R} fill="url(#globeGrad)" opacity="0.95" />

          <g clipPath="url(#globeClip)" className="globe-rotate">
            <g opacity="0.65">
              <path d="M 540,200 Q 580,185 630,195 Q 680,205 700,230 Q 690,260 645,265 Q 590,255 560,240 Q 540,225 540,200 Z" fill="#8fd8ee" opacity="0.55" />
              <path d="M 590,305 Q 640,295 695,310 Q 720,335 700,365 Q 650,375 600,360 Q 575,335 590,305 Z" fill="#6ec8e0" opacity="0.5" />
              <path d="M 490,245 Q 515,230 540,250 Q 550,275 530,295 Q 495,295 490,265 Z" fill="#8fd8ee" opacity="0.45" />
              <path d="M 735,260 Q 770,250 790,280 Q 780,305 750,310 Q 725,290 735,260 Z" fill="#8fd8ee" opacity="0.45" />
              <ellipse cx="600" cy="195" rx="75" ry="14" fill="#ffffff" opacity="0.22" transform="rotate(-8 600 195)" />
              <ellipse cx="690" cy="225" rx="55" ry="10" fill="#ffffff" opacity="0.18" transform="rotate(5 690 225)" />
              <ellipse cx="570" cy="280" rx="80" ry="12" fill="#ffffff" opacity="0.24" transform="rotate(-3 570 280)" />
              <ellipse cx="700" cy="320" rx="60" ry="10" fill="#ffffff" opacity="0.2" transform="rotate(7 700 320)" />
              <ellipse cx="580" cy="360" rx="70" ry="11" fill="#ffffff" opacity="0.22" transform="rotate(-5 580 360)" />
              <ellipse cx="650" cy="155" rx="45" ry="7" fill="#ffffff" opacity="0.17" />
            </g>
          </g>

          <g clipPath="url(#globeClip)" className="constellations">
            {CONSTELLATIONS.map((cluster, ci) => (
              <g key={ci} style={{ animation: `twinkle ${3 + ci}s ease-in-out ${ci * 0.7}s infinite` }}>
                {cluster.map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="1.4" fill="#ffffff" opacity="0.9" />
                ))}
              </g>
            ))}
          </g>

          <g clipPath="url(#globeClip)" className="globe-sparkles">
            {[
              [560, 180], [640, 215], [700, 200], [580, 270], [680, 310],
              [620, 350], [560, 320], [720, 270], [600, 400], [660, 380],
              [510, 260], [740, 320], [620, 160], [680, 410], [540, 380],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="1.3"
                fill="#ffffff"
                style={{
                  animation: `twinkle ${2 + (i % 4)}s ease-in-out ${i * 0.25}s infinite`,
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              />
            ))}
          </g>

          <circle cx={CX} cy={CY} r={R} fill="url(#globeBottomGlow)" clipPath="url(#globeClip)" />
          <circle cx={CX} cy={CY} r={R} fill="url(#globeHighlight)" />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.95" filter="url(#softGlow)" />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.55" />
        </g>

        <g className="static-arcs">
          {STATIC_ARCS.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.22" strokeLinecap="round" />
          ))}
        </g>

        <g className="city-nodes">
          {cityNodes.map(([cx, cy], i) => (
            <g
              key={i}
              style={{
                animation: `cityPulse ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            >
              <circle cx={cx} cy={cy} r="5" fill="#ffffff" opacity="0.18" filter="url(#strongGlow)" />
              <circle cx={cx} cy={cy} r="2" fill="#ffffff" filter="url(#softGlow)" />
              <circle cx={cx} cy={cy} r="1" fill="#ffffff" />
            </g>
          ))}
        </g>

        <g className="straight-lines" filter="url(#softGlow)">
          {STRAIGHT_LINES.map((line, i) => (
            <g key={i}>
              <path
                d={line.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeOpacity="0"
                style={{
                  strokeDasharray: "0 1500",
                  animation: `travelLineLong ${line.dur}s linear ${line.delay}s infinite`,
                }}
              />
              <circle
                r="2.5"
                fill="#ffffff"
                opacity="0"
                filter="url(#strongGlow)"
                style={{
                  offsetPath: `path('${line.d}')`,
                  animation: `travelDot ${line.dur}s linear ${line.delay}s infinite`,
                }}
              />
            </g>
          ))}
        </g>

        <g className="connections" filter="url(#softGlow)">
          {CONNECTIONS.map((conn, i) => (
            <g key={i}>
              <path
                d={conn.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeOpacity="0"
                style={{
                  strokeDasharray: "0 1500",
                  animation: `travelLine ${conn.dur}s cubic-bezier(0.55, 0, 0.4, 1) ${conn.delay}s infinite`,
                }}
              />
              <circle
                r="3"
                fill="#ffffff"
                opacity="0"
                filter="url(#strongGlow)"
                style={{
                  offsetPath: `path('${conn.d}')`,
                  animation: `travelDot ${conn.dur}s cubic-bezier(0.55, 0, 0.4, 1) ${conn.delay}s infinite`,
                }}
              />
            </g>
          ))}
        </g>

        <g className="starbursts">
          {bigBursts.map((b, i) => (
            <g
              key={i}
              style={{
                animation: `starburst 9s ease-out ${b.delay}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "center",
                opacity: 0,
              }}
            >
              <circle cx={b.cx} cy={b.cy} r="8" fill="#ffffff" filter="url(#megaGlow)" opacity="0.9" />
              <circle cx={b.cx} cy={b.cy} r="3" fill="#ffffff" filter="url(#softGlow)" />
              <g stroke="url(#rayGrad)" strokeWidth="1.5" strokeLinecap="round" filter="url(#softGlow)">
                <line x1={b.cx - 32} y1={b.cy} x2={b.cx + 32} y2={b.cy} />
                <line x1={b.cx} y1={b.cy - 32} x2={b.cx} y2={b.cy + 32} />
              </g>
              <g stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" filter="url(#softGlow)">
                <line x1={b.cx - 14} y1={b.cy - 14} x2={b.cx + 14} y2={b.cy + 14} />
                <line x1={b.cx - 14} y1={b.cy + 14} x2={b.cx + 14} y2={b.cy - 14} />
              </g>
              <circle
                cx={b.cx}
                cy={b.cy}
                r="3"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.7"
                style={{
                  animation: `ringExpand 9s ease-out ${b.delay}s infinite`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            </g>
          ))}
        </g>
      </svg>

      {showStats && (
        <div className="globe-hero__stats">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`stat-card stat-card--${stat.side} stat-card--${stat.row}`}
              style={{ "--enter-delay": `${1.6 + i * 0.18}s`, "--float-delay": `${i * 0.7}s` }}
            >
              <div className="stat-card__inner">
                <div className="stat-card__value">{stat.value}</div>
                <div className="stat-card__label">{stat.label}</div>
              </div>
              <span className="stat-card__shimmer" />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .globe-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 1280 / 540;
          overflow: hidden;
          isolation: isolate;
        }
        .globe-hero__svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .globe-hero :global(.globe-group),
        .globe-hero :global(.static-arcs),
        .globe-hero :global(.city-nodes),
        .globe-hero :global(.connections),
        .globe-hero :global(.straight-lines),
        .globe-hero :global(.starbursts),
        .globe-hero :global(.constellations),
        .globe-hero :global(.globe-sparkles),
        .globe-hero :global(.stars),
        .globe-hero :global(.sun-pulse),
        .globe-hero :global(.halo-pulse),
        .globe-hero :global(.globe-rotate) {
          animation-play-state: paused !important;
        }
        .globe-hero :global(.globe-group),
        .globe-hero :global(.static-arcs),
        .globe-hero :global(.city-nodes),
        .globe-hero :global(.connections),
        .globe-hero :global(.straight-lines),
        .globe-hero :global(.starbursts) {
          opacity: 0;
        }

        .globe-hero.is-active :global(.globe-group),
        .globe-hero.is-active :global(.static-arcs),
        .globe-hero.is-active :global(.city-nodes),
        .globe-hero.is-active :global(.connections),
        .globe-hero.is-active :global(.straight-lines),
        .globe-hero.is-active :global(.starbursts),
        .globe-hero.is-active :global(.constellations),
        .globe-hero.is-active :global(.globe-sparkles),
        .globe-hero.is-active :global(.stars),
        .globe-hero.is-active :global(.sun-pulse),
        .globe-hero.is-active :global(.halo-pulse),
        .globe-hero.is-active :global(.globe-rotate),
        .globe-hero.is-active :global(.starbursts > g > circle:last-child) {
          animation-play-state: running !important;
        }

        .globe-hero.is-active :global(.globe-group) {
          animation: globeReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          transform-box: fill-box;
          transform-origin: ${CX}px ${CY}px;
        }
        .globe-hero.is-active :global(.static-arcs),
        .globe-hero.is-active :global(.city-nodes) {
          animation: fadeIn 0.9s ease-out 1.1s forwards;
        }
        .globe-hero.is-active :global(.connections),
        .globe-hero.is-active :global(.straight-lines),
        .globe-hero.is-active :global(.starbursts) {
          animation: fadeIn 0.7s ease-out 1.3s forwards;
        }

        @keyframes globeReveal {
          0% { opacity: 0; transform: scale(0.88); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn { to { opacity: 1; } }

        :global(.globe-rotate) {
          transform-origin: ${CX}px ${CY}px;
          animation: globeSpin 90s linear infinite;
        }
        @keyframes globeSpin { to { transform: rotate(360deg); } }

        :global(.halo-pulse) {
          transform-origin: ${CX}px ${CY}px;
          transform-box: fill-box;
          animation: haloBreathe 7s ease-in-out infinite;
        }
        @keyframes haloBreathe {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        :global(.sun-pulse) { animation: sunBreathe 8s ease-in-out infinite; }
        @keyframes sunBreathe {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 1; }
        }

        @keyframes travelLine {
          0% { stroke-dashoffset: 0; stroke-dasharray: 0 1500; stroke-opacity: 0; }
          10% { stroke-opacity: 1; }
          45% { stroke-dasharray: 600 1500; stroke-dashoffset: 0; stroke-opacity: 1; }
          80% { stroke-dasharray: 150 1500; stroke-dashoffset: -700; stroke-opacity: 0.6; }
          100% { stroke-dasharray: 0 1500; stroke-dashoffset: -1500; stroke-opacity: 0; }
        }

        @keyframes travelLineLong {
          0% { stroke-dashoffset: 0; stroke-dasharray: 0 1500; stroke-opacity: 0; }
          10% { stroke-opacity: 0.8; }
          50% { stroke-dasharray: 400 1500; stroke-dashoffset: 0; stroke-opacity: 0.8; }
          80% { stroke-dasharray: 100 1500; stroke-dashoffset: -500; stroke-opacity: 0.5; }
          100% { stroke-dasharray: 0 1500; stroke-dashoffset: -1500; stroke-opacity: 0; }
        }

        @keyframes travelDot {
          0% { offset-distance: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        @keyframes starburst {
          0% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          4% { opacity: 1; transform: scale(1.1) rotate(15deg); }
          12% { opacity: 0.9; transform: scale(1) rotate(20deg); }
          25% { opacity: 0; transform: scale(0.9) rotate(30deg); }
          100% { opacity: 0; transform: scale(0.9) rotate(30deg); }
        }

        @keyframes ringExpand {
          0% { opacity: 0; transform: scale(0.5); }
          5% { opacity: 0.8; transform: scale(1); }
          18% { opacity: 0; transform: scale(4); }
          100% { opacity: 0; transform: scale(4); }
        }

        @keyframes cityPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .globe-hero__stats {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .stat-card {
          position: absolute;
          padding: clamp(11px, 1.3vw, 18px) clamp(15px, 1.7vw, 26px);
          min-width: clamp(140px, 16vw, 220px);
          background: rgba(255, 255, 255, 0.13);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          color: #ffffff;
          box-shadow:
            0 12px 40px rgba(20, 90, 150, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.35);
          opacity: 0;
          transform: translateY(24px) scale(0.96);
          filter: blur(8px);
          pointer-events: auto;
          overflow: hidden;
        }
        .globe-hero.is-active .stat-card {
          animation:
            cardEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) var(--enter-delay) forwards,
            cardFloat 6s ease-in-out calc(var(--enter-delay) + 1.4s) infinite,
            cardShimmer 8s ease-in-out calc(var(--enter-delay) + 2s) infinite;
        }
        .stat-card__inner {
          position: relative;
          z-index: 2;
        }
        .stat-card__value {
          font-size: clamp(20px, 2.4vw, 34px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.015em;
          text-shadow: 0 2px 14px rgba(0, 50, 110, 0.3);
        }
        .stat-card__label {
          font-size: clamp(10px, 0.9vw, 13px);
          font-weight: 400;
          opacity: 0.94;
          margin-top: 5px;
          letter-spacing: 0.01em;
        }
        .stat-card__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 255, 255, 0.18) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          pointer-events: none;
          z-index: 1;
        }
        .globe-hero.is-active .stat-card__shimmer {
          animation: shimmerSweep 8s ease-in-out calc(var(--enter-delay) + 2s) infinite;
        }

        .stat-card--left { left: clamp(2%, 4vw, 6%); }
        .stat-card--right { right: clamp(2%, 4vw, 6%); }
        .stat-card--top.stat-card--left { top: 22%; }
        .stat-card--bottom.stat-card--left { top: 60%; }
        .stat-card--top.stat-card--right { top: 18%; }
        .stat-card--bottom.stat-card--right { top: 54%; }

        @keyframes cardEnter {
          0% { opacity: 0; transform: translateY(24px) scale(0.96); filter: blur(8px); }
          50% { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes cardShimmer {
          0%, 100% { box-shadow: 0 12px 40px rgba(20, 90, 150, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35); }
          50% { box-shadow: 0 14px 44px rgba(30, 120, 190, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.45); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%); }
          40% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 1024px) {
          .stat-card { min-width: 130px; padding: 10px 14px; border-radius: 13px; }
          .stat-card--top.stat-card--left { top: 18%; }
          .stat-card--bottom.stat-card--left { top: 62%; }
          .stat-card--top.stat-card--right { top: 14%; }
          .stat-card--bottom.stat-card--right { top: 54%; }
        }
        @media (max-width: 768px) {
          .globe-hero { aspect-ratio: 4 / 3; }
          .stat-card { min-width: 115px; padding: 8px 12px; border-radius: 11px; }
          .stat-card__value { font-size: 17px; }
          .stat-card__label { font-size: 10px; }
          .stat-card--top.stat-card--left { top: 6%; left: 3%; }
          .stat-card--bottom.stat-card--left { top: 78%; left: 3%; }
          .stat-card--top.stat-card--right { top: 6%; right: 3%; }
          .stat-card--bottom.stat-card--right { top: 78%; right: 3%; }
        }
        @media (max-width: 480px) {
          .globe-hero { aspect-ratio: 3 / 4; }
          .stat-card { min-width: 100px; padding: 7px 10px; }
          .stat-card__value { font-size: 15px; }
          .stat-card__label { font-size: 9px; }
          .stat-card--top.stat-card--left { top: 4%; }
          .stat-card--bottom.stat-card--left { top: 82%; }
          .stat-card--top.stat-card--right { top: 4%; }
          .stat-card--bottom.stat-card--right { top: 82%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .globe-hero :global(*) { animation: none !important; }
          .globe-hero :global(.globe-group),
          .globe-hero :global(.static-arcs),
          .globe-hero :global(.city-nodes),
          .globe-hero :global(.connections),
          .globe-hero :global(.straight-lines),
          .globe-hero :global(.starbursts) { opacity: 1 !important; }
          .stat-card { opacity: 1 !important; transform: none !important; filter: none !important; }
        }
      `}</style>
    </div>
  );
}
