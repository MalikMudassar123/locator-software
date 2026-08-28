/**
 * Bakes real world landmass data into a compact bitmask module.
 *
 *   node scripts/build-land-mask.cjs
 *   -> src/components/AnimatedGlobeHero/land-mask.js
 *
 * Why bake rather than read at runtime: world-atlas + topojson-client are
 * ~700KB of dependency to answer one question — "is this lat/lon on land?".
 * Rasterising once to a bitmask makes that a single array lookup, ships ~8KB
 * instead, and means the globe has NO runtime dependency and no network
 * request. world-atlas and topojson-client stay as devDependencies, used only
 * by this script.
 *
 * Resolution: 512x256 equirectangular. At the particle densities the globe
 * uses (~6k surface points) that is finer than the eye can resolve on the
 * sphere, so a higher grid would only add bytes.
 *
 * Output format: one bit per cell, packed 8 cells per byte, base64. Decoding
 * is a couple of lines and costs nothing.
 *
 * Not imported by the app at build time — run it by hand if the source data is
 * ever updated. Safe to delete along with the two devDependencies if the globe
 * stops needing landmasses.
 */
const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');
const topo = require('world-atlas/land-110m.json');

const W = 512;
const H = 256;

const land = topojson.feature(topo, topo.objects.land);

/* Ray-casting point-in-polygon. Runs W*H times against every ring, so it is
   written flat: no allocation, no closures inside the loop. */
function pointInRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// MultiPolygon -> flat list of { outer, holes, bbox }. The bbox lets the hot
// loop reject the vast majority of polygons with four comparisons.
const polys = [];
for (const poly of land.features[0].geometry.coordinates) {
  const outer = poly[0];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of outer) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  polys.push({ outer, holes: poly.slice(1), minX, minY, maxX, maxY });
}

const bytes = new Uint8Array((W * H) / 8);
let landCells = 0;

for (let iy = 0; iy < H; iy++) {
  // Sample at cell CENTRES, so coastlines land half a cell more accurately
  // than sampling at corners.
  const lat = 90 - ((iy + 0.5) / H) * 180;
  for (let ix = 0; ix < W; ix++) {
    const lon = ((ix + 0.5) / W) * 360 - 180;
    let isLand = false;
    for (let p = 0; p < polys.length && !isLand; p++) {
      const q = polys[p];
      if (lon < q.minX || lon > q.maxX || lat < q.minY || lat > q.maxY) continue;
      if (!pointInRing(lon, lat, q.outer)) continue;
      let inHole = false;
      for (let h = 0; h < q.holes.length && !inHole; h++) {
        if (pointInRing(lon, lat, q.holes[h])) inHole = true;
      }
      if (!inHole) isLand = true;
    }
    if (isLand) {
      const bit = iy * W + ix;
      bytes[bit >> 3] |= 128 >> (bit & 7);
      landCells++;
    }
  }
}

const b64 = Buffer.from(bytes).toString('base64');
const pct = ((landCells / (W * H)) * 100).toFixed(1);

const out = `/**
 * Land/sea bitmask — GENERATED, do not edit by hand.
 *
 * Produced by scripts/build-land-mask.cjs from world-atlas land-110m
 * (Natural Earth, public domain). ${W}x${H} equirectangular, one bit per cell,
 * packed 8 per byte, base64. ${pct}% of cells are land, which is the right
 * ballpark for Earth's real land fraction (~29%).
 *
 * Re-generate with:  node scripts/build-land-mask.cjs
 */
export const LAND_W = ${W};
export const LAND_H = ${H};

const PACKED =
  "${b64}";

/** Unpacked once on first use, then cached. Uint8Array of 0/1 per cell. */
let cache = null;
export function getLandMask() {
  if (cache) return cache;
  const bin = typeof atob === "function"
    ? atob(PACKED)
    : Buffer.from(PACKED, "base64").toString("binary");
  const out = new Uint8Array(LAND_W * LAND_H);
  for (let i = 0; i < out.length; i++) {
    out[i] = (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
  }
  cache = out;
  return cache;
}

/** lat in [-90,90], lon in [-180,180] -> 1 land, 0 ocean. */
export function isLand(lat, lon) {
  const m = getLandMask();
  let ix = Math.floor(((lon + 180) / 360) * LAND_W);
  let iy = Math.floor(((90 - lat) / 180) * LAND_H);
  if (ix < 0) ix = 0; else if (ix >= LAND_W) ix = LAND_W - 1;
  if (iy < 0) iy = 0; else if (iy >= LAND_H) iy = LAND_H - 1;
  return m[iy * LAND_W + ix];
}
`;

const dest = path.join(__dirname, '..', 'src', 'components', 'AnimatedGlobeHero', 'land-mask.js');
fs.writeFileSync(dest, out, 'utf8');
console.log(`land mask: ${W}x${H}, ${landCells} land cells (${pct}%), ${bytes.length} bytes -> ${b64.length} base64 chars`);
console.log('written ->', dest);
