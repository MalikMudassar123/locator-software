/**
 * Dev-only preview. Rasterises the WavingHands glyph at the exact placement the
 * CSS computes, so the geometry can be eyeballed without a browser.
 *   node scripts/preview-hands.cjs <outDir>
 * Writes hands.png (both hands on the pill, on the hero and on the white bar)
 * and hand-zoom.png (one hand at 12x, for checking the fingertip joins).
 *
 * The shapes are parsed straight out of WavingHands.tsx rather than copied, so
 * this cannot drift from what ships. The placement constants below DO have to be
 * kept in step with the .cta-hand block in globals.css by hand.
 * Not imported by the app; safe to delete.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const out = process.argv[2] || require('os').tmpdir()
const root = path.join(__dirname, '..')
const src = fs.readFileSync(path.join(root, 'src/components/common/WavingHands.tsx'), 'utf8')

const LINE = '#0d73e3'
const SW = 1.8

// Every <path d=… transform=…> in source order, plus the cuff <rect>.
const paths = [...src.matchAll(/<path\s+d="([^"]+)"(?:\s+transform="([^"]+)")?/g)].map(
  ([, d, t]) => `<path d="${d}"${t ? ` transform="${t}"` : ''}/>`,
)
const [cuffRect] = [...src.matchAll(/<rect[^>]*x="(\d[\d.]*)"\s+y="(\d[\d.]*)"\s+width="(\d[\d.]*)"\s+height="(\d[\d.]*)"\s+rx="(\d[\d.]*)"/g)]
const stops = [...src.matchAll(/stopColor="(#[0-9a-f]{6})"/gi)].map((m) => m[1])
if (paths.length !== 6 || !cuffRect || stops.length !== 5) {
  throw new Error(`parse failed: ${paths.length} paths, ${stops.length} stops`)
}
const [, cx, cy_, cw, ch, crx] = cuffRect
const SHAPES = `<g>${paths.slice(0, 4).join('')}</g>${paths.slice(4).join('')}`

const defs = (k) => `<defs>
  <linearGradient id="s${k}" x1="0" y1="8" x2="0" y2="56" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${stops[0]}"/><stop offset="0.45" stop-color="${stops[1]}"/><stop offset="1" stop-color="${stops[2]}"/>
  </linearGradient>
  <linearGradient id="c${k}" x1="0" y1="48" x2="0" y2="64" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${stops[3]}"/><stop offset="1" stop-color="${stops[4]}"/>
  </linearGradient></defs>`

const glyph = (k) => `${defs(k)}
  <rect x="${cx}" y="${cy_}" width="${cw}" height="${ch}" rx="${crx}" fill="url(#c${k})" stroke="${LINE}" stroke-width="${SW}"/>
  <g fill="${LINE}" stroke="${LINE}" stroke-width="${SW}" stroke-linejoin="round">${SHAPES}</g>
  <g fill="url(#s${k})">${SHAPES}</g>`

// Mirrors the .cta-hand custom properties in globals.css.
const H = 40, W = (H * 48) / 64
const INSET = H * 0.24, DROP = H * -0.40, LEAN = 45
// Pill geometry at the desktop navbar size.
const BX = 74, BY = 44, BW = 152, BH = 44
const pivotY = BY + BH / 2 + DROP

const hand = (side, wave) => {
  const px = side === 'left' ? BX + INSET : BX + BW - INSET
  const lean = side === 'left' ? -LEAN : LEAN
  const turn = side === 'left' ? wave : -wave
  return `<g transform="translate(${px} ${pivotY}) rotate(${lean + turn}) translate(${-W / 2} ${-H * 0.84}) scale(${W / 48} ${H / 64})">
    <g ${side === 'right' ? 'transform="translate(48,0) scale(-1,1)"' : ''}>${glyph(side)}</g>
  </g>`
}

const flagCx = BX - 12 - 16
const stage = (label, bg, l, r) => `
  <rect width="300" height="128" fill="${bg}"/>
  <circle cx="${flagCx}" cy="${BY + BH / 2}" r="16" fill="#eee" stroke="#fff" stroke-width="2"/>
  ${hand('left', l)}${hand('right', r)}
  <rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="22" fill="#fff"/>
  <text x="${BX + BW / 2}" y="${BY + BH / 2 + 6}" font-family="Arial" font-size="18" font-weight="bold" fill="#0a89dd" text-anchor="middle">Get a Quote</text>
  <text x="8" y="14" font-family="Arial" font-size="8" fill="#94a3b8">${label}</text>`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="768" viewBox="0 0 300 256">
  <g>${stage('hero — wave out (-13deg)', '#1878e8', -13, -13)}</g>
  <g transform="translate(0 128)">${stage('white bar — wave in (+10deg)', '#ffffff', 10, 10)}</g>
</svg>`

const zoom = `<svg xmlns="http://www.w3.org/2000/svg" width="576" height="768" viewBox="0 0 48 64">
  <rect width="48" height="64" fill="#1878e8"/>${glyph('z')}</svg>`

fs.writeFileSync(path.join(out, 'hands.svg'), svg)
Promise.all([
  sharp(Buffer.from(svg)).png().toFile(path.join(out, 'hands.png')),
  sharp(Buffer.from(zoom)).png().toFile(path.join(out, 'hand-zoom.png')),
]).then(() => console.log('wrote hands.png + hand-zoom.png'))
