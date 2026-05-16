'use client'

const LINE_COUNT = 22

// Each line is a full-width bezier spanning the whole hero (x: -100 → 1100)
// Lines are spread evenly top-to-bottom across the 600px viewBox height
function linePath(i: number): string {
  const offset = (i - (LINE_COUNT - 1) / 2) * 28
  const sy  = 400 + offset
  const c1y = 290 + offset
  const c2y = 190 + offset
  const ey  = 100 + offset
  return `M -100,${sy} C 260,${c1y} 740,${c2y} 1100,${ey}`
}

function lineColor(i: number): string {
  const t = i / (LINE_COUNT - 1)
  // Centre lines brightest, edges fade
  const mid = 1 - Math.abs(t - 0.5) * 2
  const r = Math.round(12 + t * 40)
  const g = Math.round(200 + t * 28)
  const b = Math.round(218 + t * 18)
  const a = (0.22 + mid * 0.50).toFixed(2)
  return `rgba(${r},${g},${b},${a})`
}

export default function HeroRibbonWave() {
  const lines = Array.from({ length: LINE_COUNT }, (_, i) => ({
    d:     linePath(i),
    color: lineColor(i),
    sw:    i >= 8 && i <= 13 ? 1.4 : 0.85,
    glow:  i >= 6 && i <= 15,
  }))

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="hrw-line-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 22 full-width parallel teal lines — span the entire hero */}
      <g className="hrw-teal">
        {lines.map(({ d, color, sw, glow }, i) => (
          <path
            key={i}
            d={d}
            stroke={color}
            strokeWidth={sw}
            fill="none"
            filter={glow ? 'url(#hrw-line-glow)' : undefined}
            className="hrw-teal-line"
            style={{ animationDelay: `${-(i * 0.36).toFixed(2)}s` }}
          />
        ))}
      </g>
    </svg>
  )
}
