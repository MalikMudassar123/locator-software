/**
 * Dev-only preview. Rasterises the .nav-cta-shine band at several points in its
 * sweep, clipped to the pill exactly as the button's overflow:hidden does, so the
 * strength and colour can be judged without a browser.
 *   node scripts/preview-sheen.cjs <outDir>
 * Gradient stops and geometry are parsed out of globals.css, so this cannot drift.
 * Not imported by the app; safe to delete.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const out = process.argv[2] || require('os').tmpdir()
const css = fs.readFileSync(path.join(__dirname, '..', 'src/app/globals.css'), 'utf8')

const block = css.match(/\.nav-cta-shine\s*\{([\s\S]*?)\n\}/)
if (!block) throw new Error('.nav-cta-shine block not found')
const grad = block[1].match(/background:\s*(linear-gradient\([\s\S]*?\));/)
const width = block[1].match(/width:\s*([\d.]+)%/)
if (!grad || !width) throw new Error('could not parse gradient/width')

// linear-gradient(100deg, …) -> SVG gradient vector. CSS angles run clockwise
// from "to top"; SVG x1/y1->x2/y2 is a plain vector, so convert.
const deg = parseFloat(grad[1].match(/^linear-gradient\(\s*([\d.]+)deg/)[1])
const rad = ((deg - 90) * Math.PI) / 180
const stops = [...grad[1].matchAll(/(rgba?\([^)]*\))\s+([\d.]+)%/g)].map(([, c, o]) => ({ c, o: +o / 100 }))

const BW = 152, BH = 44, SKEW = -18
const bandW = (parseFloat(width[1]) / 100) * BW

const svg = (tx, label, y) => {
  // The band is skewed about its own centre, then translated, then clipped.
  const dx = (Math.cos(rad) * bandW) / 2
  const dy = (Math.sin(rad) * BH) / 2
  const stopTags = stops
    .map((s) => `<stop offset="${s.o}" stop-color="${s.c.replace(/rgba?\(([^,]+),([^,]+),([^,)]+)(,[^)]*)?\)/, 'rgb($1,$2,$3)')}" stop-opacity="${(s.c.match(/,\s*([\d.]+)\s*\)$/) || [, 1])[1]}"/>`)
    .join('')
  return `<g transform="translate(0 ${y})">
    <clipPath id="p${y}"><rect x="0" y="0" width="${BW}" height="${BH}" rx="${BH / 2}"/></clipPath>
    <g clip-path="url(#p${y})">
      <rect width="${BW}" height="${BH}" fill="url(#face)"/>
      <defs><linearGradient id="g${y}" x1="${bandW / 2 - dx}" y1="${BH / 2 + dy}" x2="${bandW / 2 + dx}" y2="${BH / 2 - dy}" gradientUnits="userSpaceOnUse">${stopTags}</linearGradient></defs>
      <g transform="translate(${(tx / 100) * bandW} 0) skewX(${SKEW})">
        <rect x="0" y="0" width="${bandW}" height="${BH}" fill="url(#g${y})"/>
      </g>
    </g>
    <text x="${BW / 2}" y="${BH / 2 + 6}" font-family="Arial" font-size="18" font-weight="bold" fill="#0a89dd" text-anchor="middle">Get a Quote</text>
    <text x="${BW + 12}" y="${BH / 2 + 4}" font-family="Arial" font-size="9" fill="#94a3b8">${label}</text>
  </g>`
}

const frames = [-170, -40, 40, 120, 240, 430]
const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${frames.length * 60 + 20}" viewBox="0 0 320 ${frames.length * 60 + 20}">
  <defs><linearGradient id="face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f4f8fd"/></linearGradient></defs>
  <rect width="320" height="${frames.length * 60 + 20}" fill="#1878e8"/>
  ${frames.map((t, i) => svg(t, `translateX(${t}%)`, 14 + i * 60)).join('')}
</svg>`

sharp(Buffer.from(doc)).png().toFile(path.join(out, 'sheen.png')).then(() => console.log('wrote sheen.png'))
