'use client';
import { forwardRef, useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import BrowserChrome from './BrowserChrome';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const W = 580, H = 580;

// Composition: the browser window sits back-left, the phone overlaps it front-right
// and hangs below its bottom edge — both are on screen at the same time.

// Desktop (browser-style frame) — back layer
const DT_X = 4, DT_Y = 108, DT_W = 460, DT_H = 330, DT_R = 14;
const DTX2 = DT_X + DT_W, DTY2 = DT_Y + DT_H;
const DT_PERIM = 2 * (DT_W + DT_H);

// Phone — front layer, clipping only the browser's right edge (~19% of its width)
// so the dashboard's sidebar and map stay readable behind it.
// 168×370 is the native aspect of /block 1/mobile.webp (1535×3378 → 0.454). Matching
// it exactly means objectFit:cover shows the WHOLE screenshot with nothing cropped —
// any other ratio silently cuts the bottom rows off. Change width and height together.
const PHONE_X = 396, PHONE_Y = 125, PHONE_W = 168, PHONE_H = 370, PHONE_R = 24;

// The wireframe rects below were hand-calibrated against the source screenshots at
// the original frame sizes (phone 260×500, browser 550×380). Rather than re-measure
// every rect for the new composition, scale the calibrated coordinates.
const PSX = PHONE_W / 260, PSY = PHONE_H / 500;
const DSX = DT_W / 550,    DSY = DT_H / 380;

const DT_PATH =
  `M${DT_X+DT_R} ${DT_Y} H${DTX2-DT_R}` +
  ` Q${DTX2} ${DT_Y} ${DTX2} ${DT_Y+DT_R}` +
  ` V${DTY2-DT_R} Q${DTX2} ${DTY2} ${DTX2-DT_R} ${DTY2}` +
  ` H${DT_X+DT_R} Q${DT_X} ${DTY2} ${DT_X} ${DTY2-DT_R}` +
  ` V${DT_Y+DT_R} Q${DT_X} ${DT_Y} ${DT_X+DT_R} ${DT_Y} Z`;

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

// Wireframe rect in the browser's calibrated 550×380 space.
// Only the browser has a wireframe stage — the phone simply fades in.
function dw(dx, dy, w, h, r = 0) {
  return rp(DT_X + dx * DSX, DT_Y + dy * DSY, w * DSX, h * DSY, r);
}

// Desktop wireframe — matches pro.mylocatorplus.com layout
// calibrated at 550×380: sidebar≈170px, map≈362px
const DT_WIRE = [
  // 1. Browser chrome / URL bar (full width)
  dw(8,   8,  534, 26, 5),

  // 2. Left sidebar container (full content height)
  dw(8,   42, 168, 330, 6),

  // 3. Right map container (full content height)
  dw(182, 42, 360, 330, 6),

  // Sidebar — tab pills: Vehicles | Drivers | Alerts
  dw(14,  50, 52, 18, 9),
  dw(72,  50, 44, 18, 9),
  dw(122, 50, 44, 18, 9),

  // Sidebar — stats row: 13 Vehicles | 3 Moving | 1 Idling | 8 Parking | 1 No Signal
  dw(14,  76, 28, 26, 4),
  dw(47,  76, 28, 26, 4),
  dw(80,  76, 28, 26, 4),
  dw(113, 76, 28, 26, 4),
  dw(146, 76, 20, 26, 4),

  // Sidebar — search bar
  dw(14,  110, 152, 14, 7),

  // Sidebar — vehicle list items (4 rows, each with icon + text lines)
  dw(14,  132, 152, 38, 4),
  dw(14,  178, 152, 38, 4),
  dw(14,  224, 152, 38, 4),
  dw(14,  270, 152, 38, 4),

  // Map — top toolbar (Zone / POI / Traffic filters)
  dw(188, 48, 350, 18, 4),

  // Map — bottom popup card ("Moinu Tech 68280")
  dw(188, 308, 130, 26, 6),
];

// Three columns on a UNIFORM grid, matching the reference composition:
//   · every card is the same size — no per-icon sizes
//   · the gap between column lefts and the gap between stacked cards are the SAME
//     pitch; that squareness is what makes the arrangement read as a lattice
//   · the centre column is dropped by OFFSET (≈0.45 of a pitch) against the outer
//     columns, which is what breaks the lattice into a network
//
// Cards are placed by CENTRE (cx/cy), not by top-left, so ICON_SIZE can change
// without dragging every card off the grid — left/top are derived below.
//
//   col x:  98              289             480          (pitch 191)
//   pin   cy  56             ·               ·
//          ·         bell   cy 143    route cy 143
//   moon  cy 247      grid   cy 334
//                    wrench cy 525
//
//   outer columns: cy 56, 247        centre column: cy 143, 334, 525
//   both step by the same 191 pitch; the centre column is offset by 87.
//
// label/tip drive the hover tooltip. Labels mirror the feature card titles in the
// text panel so hovering an icon names the same capability the copy describes.
// `flip` hangs the tooltip to the LEFT of the card — needed for any icon close
// enough to the right edge that a right-hanging tooltip would run off the scene.
const ICON_SIZE = 76;
const ICONS = [
  { id:'pin',    cx:98,  cy:56,  layer:'outer',  label:'Live GPS Tracking',          tip:'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)' },
  { id:'bell',   cx:289, cy:143, layer:'center', label:'Instant Idle Alerts',        tip:'linear-gradient(90deg, #14b8a6 0%, #6366f1 100%)' },
  { id:'route',  cx:480, cy:143, layer:'outer',  label:'Daily Route History',        tip:'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)', flip:true },
  { id:'moon',   cx:98,  cy:247, layer:'outer',  label:'After-Hours Vehicle Alerts', tip:'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)' },
  { id:'grid',   cx:289, cy:334, layer:'center', label:'Dynamic Fleet Dashboard',    tip:'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)' },
  { id:'wrench', cx:289, cy:525, layer:'center', label:'Fleet Service Reminders',    tip:'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)' },
].map(ic => ({
  ...ic,
  size: ICON_SIZE,
  left: ic.cx - ICON_SIZE / 2,
  top:  ic.cy - ICON_SIZE / 2,
}));

// Card edges, DERIVED from ICONS. Every connection endpoint is read from here, so
// the lines track any change to a position or to ICON_SIZE and always land flush on
// the card they point at. These used to be hand-typed coordinates, which silently
// drifted out of sync each time the layout moved — that drift is what left visible
// gaps between a line's end and the icon it was supposed to touch.
const E = Object.fromEntries(ICONS.map(ic => [ic.id, {
  cx: ic.cx,   cy: ic.cy,
  l:  ic.left, r:  ic.left + ic.size,
  t:  ic.top,  b:  ic.top  + ic.size,
}]));

const R = 12; // corner radius shared by every elbow

// Three elbow shapes, named for the axis order they travel. Each takes two points
// that already sit ON a card edge and routes between them with rounded corners.
// A leaves a vertical (left/right) edge, B enters a vertical edge.
const hvh = (ax, ay, bx, by) => {
  const dx = Math.sign(bx - ax), dy = Math.sign(by - ay);
  const bend = bx - dx * R;
  return `M ${ax} ${ay} H ${bend - dx * R} Q ${bend} ${ay} ${bend} ${ay + dy * R}`
       + ` V ${by - dy * R} Q ${bend} ${by} ${bx} ${by}`;
};
// A leaves a horizontal (top/bottom) edge, B enters a vertical edge.
const vhv = (ax, ay, bx, by) => {
  const dx = Math.sign(bx - ax), dy = Math.sign(by - ay);
  const bend = by - dy * R;
  return `M ${ax} ${ay} V ${bend - dy * R} Q ${ax} ${bend} ${ax + dx * R} ${bend}`
       + ` H ${bx - dx * R} Q ${bx} ${bend} ${bx} ${by}`;
};
// A leaves a vertical edge, B enters a horizontal edge.
const hv = (ax, ay, bx, by) => {
  const dx = Math.sign(bx - ax), dy = Math.sign(by - ay);
  return `M ${ax} ${ay} H ${bx - dx * R} Q ${bx} ${ay} ${bx} ${ay + dy * R} V ${by}`;
};

const CONNECTIONS = [
  hvh(E.pin.r,   E.pin.cy,  E.route.l,  E.route.cy),  // 0 — pin → route, over the top
  vhv(E.pin.cx,  E.pin.b,   E.bell.l,   E.bell.cy),   // 1 — pin → bell
  hvh(E.moon.r,  E.moon.cy, E.grid.l,   E.grid.cy),   // 2 — moon → grid
  `M ${E.grid.cx} ${E.grid.b} V ${E.wrench.t}`,       // 3 — grid → wrench, straight drop
  `M ${E.route.l} ${E.route.cy} H ${E.bell.r}`,       // 4 — route → bell, straight across
  vhv(E.moon.cx, E.moon.b,  E.wrench.l, E.wrench.cy), // 5 — moon → wrench
  hv (E.bell.l,  E.bell.cy, E.moon.cx,  E.moon.t),    // 6 — bell → moon
];

const PAIRS = [[0,2],[0,1],[3,4],[4,5],[2,1],[3,5],[1,3]];

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute' }}>
      <defs>
        <linearGradient id="ig_pin"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
        <linearGradient id="ig_bell"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        <linearGradient id="ig_route"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="ig_moon"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3730a3"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient>
        <linearGradient id="ig_wrench" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        {/* One gradient per connection, in userSpaceOnUse — the coordinates are the
            first and last point of the matching path in CONNECTIONS, so each line
            fades between the two icons it actually joins. Move a path, move these. */}
        {/* One gradient per connection, anchored to the SAME derived edge points the
            matching path in CONNECTIONS uses — so a layout change moves the colour
            ramp with the line instead of leaving it stranded on old geometry. */}
        <linearGradient id="s1lg0" x1={E.pin.r} y1={E.pin.cy} x2={E.route.l} y2={E.route.cy} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s1lg1" x1={E.pin.cx} y1={E.pin.b} x2={E.bell.l} y2={E.bell.cy} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="s1lg2" x1={E.moon.r} y1={E.moon.cy} x2={E.grid.l} y2={E.grid.cy} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s1lg3" x1={E.grid.cx} y1={E.grid.b} x2={E.wrench.cx} y2={E.wrench.t} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#60a5fa"/>
        </linearGradient>
        <linearGradient id="s1lg4" x1={E.route.l} y1={E.route.cy} x2={E.bell.r} y2={E.bell.cy} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s1lg5" x1={E.moon.cx} y1={E.moon.b} x2={E.wrench.l} y2={E.wrench.cy} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s1lg6" x1={E.bell.l} y1={E.bell.cy} x2={E.moon.cx} y2={E.moon.t} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#6d28d9"/>
        </linearGradient>
        <linearGradient id="s1pg_w" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        {/* Shared by BOTH wireframes (phone + browser), so it lives here rather than
            in either one's local defs — deleting the owner SVG would strip the other. */}
        <filter id="s1bgl" x="-6%" y="-6%" width="112%" height="112%">
          <feGaussianBlur stdDeviation="0.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function InactiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.50);
  const c = '#c8d0dc';
  const shapes = {
    pin: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.2" fill="none"/></svg>,
    bell: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={c} strokeWidth="1.5" fill="none" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>,
    route: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="17" cy="5" r="2.5" stroke={c} strokeWidth="1.3" fill="none"/><circle cx="7" cy="19" r="2.5" stroke={c} strokeWidth="1.3" fill="none"/><path d="M7 16.5c0-3 3-3.5 5-5.5s5-2.5 5-6" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    moon: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={c} strokeWidth="1.5" fill="none"/></svg>,
    grid: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/><rect x="12.5" y="3" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/><rect x="3" y="12.5" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/><rect x="12.5" y="12.5" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/></svg>,
    wrench: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#f8fafc', border:'1.5px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {shapes[id]}
    </div>
  );
}

function ActiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.52);
  const inner = {
    pin:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#ig_pin)"/><circle cx="12" cy="9" r="2.7" fill="white" opacity="0.9"/></svg>,
    bell:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" fill="url(#ig_bell)"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="url(#ig_bell)" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
    route:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="17" cy="5" r="2.8" fill="url(#ig_route)"/><circle cx="7" cy="19" r="2.8" fill="url(#ig_route)"/><path d="M7 16.5c0-3 3-3.5 5-5.5s5-2.5 5-6" stroke="url(#ig_route)" strokeWidth="2.1" strokeLinecap="round" fill="none"/></svg>,
    moon:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#ig_moon)"/></svg>,
    grid:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8.5" height="8.5" rx="1.5" fill="#f87171"/><rect x="12.5" y="3" width="8.5" height="8.5" rx="1.5" fill="#2dd4bf"/><rect x="3" y="12.5" width="8.5" height="8.5" rx="1.5" fill="#fb923c"/><rect x="12.5" y="12.5" width="8.5" height="8.5" rx="1.5" fill="#a78bfa"/></svg>,
    wrench: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" fill="url(#ig_wrench)"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#fff', boxShadow:'0 6px 24px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {inner[id]}
    </div>
  );
}

export default forwardRef(function Scene1Icons(_props, ref) {
  const activeRefs   = useRef([]);
  const iconRefs     = useRef([]);
  const lineRefs     = useRef([]);
  const dotRefs      = useRef([]); // NEW: refs for animated dots
  const hoverRefs    = useRef([]);
  const tipRefs      = useRef([]);
  const mobileRef    = useRef(null);
  const desktopFrameRef = useRef(null);
  const desktopWireRefs = useRef([]);
  const desktopWireGrpRef = useRef(null);
  const desktopImgRef = useRef(null);
  const desktopPopupRef = useRef(null);
  const mobilePopupRef = useRef(null);
  const allTweens    = useRef([]);
  const linesRef     = useRef(null);
  const outerRef     = useRef(null);
  const playedRef    = useRef(false);
  const [scale, setScale] = useState(1);

  // ── Three scroll-gated stages ─────────────────────────────────────────────
  // The scene is a story the user advances, not one that runs itself:
  //
  //   STAGE 0  arrive        icons + connection lines, LOOPING. Nothing else is on
  //                          screen. This holds forever if the user never scrolls.
  //   STAGE 1  scroll        icons dissolve → browser wireframe draws → dashboard.
  //   STAGE 2  scroll again  phone rises over the dashboard.
  //
  // Each gate is measured in scroll pixels travelled since the PREVIOUS stage
  // finished, never since the section was entered. That distinction is the whole
  // trick: entering the section is what starts stage 0, so any gate anchored there
  // is already satisfied by the time stage 0 is done, and the later stages would
  // fire themselves with no input from the user.
  const iconsTlRef   = useRef(null);
  const desktopTlRef = useRef(null);
  const phoneTlRef   = useRef(null);

  const desktopStartedRef   = useRef(false);
  const desktopDoneRef      = useRef(false);
  const scrollAtDesktopEndRef = useRef(0);
  const cycleDoneRef        = useRef(false);
  const scrollAtCycleEndRef = useRef(0);

  // Stage 1 gate: scroll required AFTER the first full icon cycle has played.
  const DESKTOP_IN_PX = 120;

  // Stage 2 gate. Two thresholds, not one — a single boundary would sit right where
  // the phone flips state, so a few pixels of scroll jitter would flap it in and
  // out. The gap between them is a dead band where nothing changes.
  //   IN  — "scroll a little": responsive, but past any wheel inertia left over
  //         from the desktop build, so it can't trip itself.
  //   OUT — scrolling back below this reverses the reveal.
  const PHONE_IN_PX  = 140;
  const PHONE_OUT_PX = 80;

  // Runs on every scroll update while the section is in range. Safe to call
  // repeatedly: play() on a finished timeline and reverse() on one already at 0
  // are both no-ops, so this only ever steers direction.
  const checkScroll = () => {
    // Stage 1 — needs a completed icon cycle AND fresh scroll measured from the end
    // of it. Anchoring to the section's entry instead did not work: scrolling INTO
    // the section is what starts the icons, so that gate was already satisfied
    // before they had played and the dashboard appeared immediately.
    if (!desktopStartedRef.current) {
      if (cycleDoneRef.current &&
          window.scrollY - scrollAtCycleEndRef.current >= DESKTOP_IN_PX) {
        startDesktop();
      }
      return; // stage 2 cannot be evaluated until stage 1 has at least begun
    }

    // Stage 2 — measured from where the page was when the dashboard finished, so
    // the scene genuinely holds on the completed desktop until the user moves on.
    const tl = phoneTlRef.current;
    if (!tl || !desktopDoneRef.current) return;
    const travelled = window.scrollY - scrollAtDesktopEndRef.current;
    if (travelled >= PHONE_IN_PX) tl.play();
    else if (travelled <= PHONE_OUT_PX) tl.reverse();
  };

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (!w) return;
      // Allow modest upscaling so the scene fills a wide sticky panel instead of
      // sitting in dead space; capped so it never overflows the viewport height.
      setScale(Math.min(1.18, w / W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  // The scene resizes itself after mount (see the ResizeObserver above), which moves
  // the pin start/end. Without this the trigger keeps stale measurements and the pin
  // engages a few pixels off, which shows up as a jump when it latches.
  useEffect(() => { ScrollTrigger.refresh(); }, [scale]);

  // ── Pinned phone reveal ───────────────────────────────────────────────────
  // The desktop dashboard lands via the intro timeline and stays. Scrolling into the
  // section then pins the whole row and plays the phone in over the top of it.
  //
  // Trigger is the parent .ss-row, not this element: the row is what actually travels
  // through the viewport, and it is the box that needs pinning.
  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const row = el.closest('.ss-row');
    if (!row) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // The phone starts hidden in BOTH branches. It is never shown outright —
      // it always waits for the intro to finish (see checkPhoneScroll).
      const buildPhoneTl = () => {
        gsap.set(mobileRef.current, { opacity: 0, yPercent: 4 });
        gsap.set(mobilePopupRef.current, { opacity: 0, x: -10 });

        // Deliberately NOT scrubbed. A scrubbed timeline is bound to scroll position,
        // so it stutters with every wheel delta and freezes the moment the user stops
        // moving. Scroll only decides which DIRECTION this runs; once pointed it plays
        // on its own clock, which is what makes both the reveal and the reverse smooth.
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
        tl.to(mobileRef.current, { opacity: 1, yPercent: 0, duration: 0.9 }, 0);
        tl.to(mobilePopupRef.current,
          { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.6)' }, 0.65);
        phoneTlRef.current = tl;
      };

      // Desktop: pin the whole row so nothing moves while the phone is revealed.
      mm.add('(min-width: 1024px)', () => {
        buildPhoneTl();

        ScrollTrigger.create({
          trigger: row,
          start: 'top top',
          // Pin the entire row — text and mockups both hold still — for this much
          // scroll distance, then release to the next section. The runway has to
          // absorb the mandatory first icon cycle (~5.4s, during which a scrolling
          // user is still burning runway) plus both gates and the two builds. Too
          // short and a moderate scroller unpins before the sequence finishes.
          end: () => '+=' + window.innerHeight * 1.8,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: checkScroll,
          // Safety net for a fast scroller: if they blow through before the stages
          // fire, snap to the finished end state so the section doesn't scroll away
          // half-built (and reads correctly when they come back to it).
          onLeave: settleToEnd,
          // Leaving upward means the whole section is behind the user — wind the
          // phone back so the reveal is armed again next time they come down.
          onLeaveBack: () => phoneTlRef.current?.reverse(),
        });
      });

      // Below 1024px nothing is pinned, but the gates are measured in raw scroll
      // pixels rather than pin progress, so the same check works untouched — this
      // trigger exists only to deliver scroll updates while the row is in view.
      // start is 'top 70%' rather than 'top bottom' so stage 1's distance is
      // measured from the row being genuinely on screen, not a viewport early.
      mm.add('(max-width: 1023px)', () => {
        buildPhoneTl();

        ScrollTrigger.create({
          trigger: row,
          start: 'top 70%',
          end: 'bottom top',
          onUpdate: checkScroll,
          onLeave: settleToEnd,
          onLeaveBack: () => phoneTlRef.current?.reverse(),
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // The intro is a one-shot that must be allowed to finish: killing it half-way
  // (which the IntersectionObserver used to do on every scroll-out) left the
  // dashboard stuck part-drawn. Cleanup happens on unmount instead.
  const stop = () => {};

  // Premium cinematic easing. All three are deliberately gentle curves: sine has the
  // softest acceleration of the standard eases, which keeps the line draw reading as
  // one continuous glide rather than a snap. power3/power2.in were noticeably punchier
  // at the ends and made the same motion look abrupt.
  const LINE_EASE = 'sine.inOut';
  const ICON_EASE = 'power2.out';
  const FADE_EASE = 'sine.inOut';

  const getLen = (p) => { try { return p.getTotalLength(); } catch { return 400; } };

  // ── Icon hover ────────────────────────────────────────────────────────────
  // Colours the card and slides its tooltip out. Only meaningful during stage 0 —
  // once the desktop build starts the icons are on their way out, so hovering a
  // dissolving card would fight the fade.
  const hoverIcon = (i, on) => {
    const card = iconRefs.current[i];
    if (!card || desktopStartedRef.current) return;

    // Lift the hovered card so its tooltip can cross over neighbouring icons,
    // which sit on their own z-layers. Restored to the resting layer on exit.
    card.style.zIndex = on ? 20 : (ICONS[i].layer === 'center' ? 4 : 7);

    gsap.to(hoverRefs.current[i], { opacity: on ? 1 : 0, duration: 0.28, ease: 'power2.out' });
    gsap.to(tipRefs.current[i], {
      opacity: on ? 1 : 0,
      y: on ? 0 : 5,
      duration: 0.28,
      ease: on ? 'back.out(1.8)' : 'power2.in',
    });
  };

  const resetAll = () => {
    gsap.set(iconRefs.current.filter(Boolean),   { opacity: 1, pointerEvents: 'auto' });
    gsap.set(activeRefs.current.filter(Boolean), { opacity: 0 });
    gsap.set(hoverRefs.current.filter(Boolean),  { opacity: 0 });
    gsap.set(tipRefs.current.filter(Boolean),    { opacity: 0, y: 5 });
    lineRefs.current.filter(Boolean).forEach(p => {
      const len = getLen(p);
      gsap.set(p, { opacity: 0, strokeDasharray: `${len} ${len + 1}`, strokeDashoffset: len });
    });
    // Reset animated dots
    dotRefs.current.filter(Boolean).forEach(dot => {
      gsap.set(dot, { opacity: 0 });
    });
    // NOTE: the phone (mobileRef / mobilePopupRef) is deliberately not reset here —
    // it is owned entirely by the pinned scroll timeline, and resetting it would
    // fight ScrollTrigger for the same properties.
    gsap.set(desktopFrameRef.current, { opacity: 0, strokeDashoffset: DT_PERIM });
    gsap.set(desktopWireGrpRef.current, { opacity: 0 });
    gsap.set(desktopImgRef.current, { opacity: 0 });
    gsap.set(desktopPopupRef.current, { opacity: 0, x: -12, scale: 0.96 });
    desktopWireRefs.current.forEach(p => {
      if (!p) return;
      const len = getLen(p);
      gsap.set(p, { strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len, opacity:0 });
    });
  };

  // ── STAGE 0 ───────────────────────────────────────────────────────────────
  // Icons and their connections, looping. This is all the user sees on arrival and
  // it repeats indefinitely — the desktop is not part of this timeline and cannot
  // appear until they scroll (see startDesktop).
  const play = () => {
    // Guarded: the row re-enters the viewport every time the user scrolls back up,
    // and restarting would yank the scene back to stage 0 from wherever it had got to.
    if (playedRef.current) return;
    playedRef.current = true;

    resetAll();

    // repeatDelay lands on an empty board — every beat clears itself, so the cycle
    // ends clean and the pause reads as a breath rather than a stall.
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.6,
      // Fires at the end of every cycle; only the first is meaningful. This is what
      // arms the desktop gate — until one complete pass of the icons has been shown,
      // no amount of scrolling can advance the scene.
      onRepeat: () => {
        if (cycleDoneRef.current) return;
        cycleDoneRef.current = true;
        scrollAtCycleEndRef.current = window.scrollY;
      },
    });
    iconsTlRef.current = tl;
    allTweens.current.push(tl);

    // ── PHASE 1: ICON LINES ONLY — no wireframe visible
    // One beat per connection, and each beat CLEARS ITSELF before the next begins:
    // light the two icons the line joins → draw the line → hold → drop all three back
    // to inactive. Beats never overlap (STEP ≥ the work inside a beat), so exactly two
    // icons are ever lit at once — previously they accumulated until the phase ended.
    const CONN_START = 0.06;
    const ACT_DUR    = 0.28;  // icon grey → colour
    const LINE_LEAD  = 0.14;  // line starts just after the first icon lights
    const CONN_DUR   = 1.2;   // line draw — INCREASED for smoother animation
    const HOLD       = 0.4;   // pair sits complete — INCREASED for better viewing
    const CLEAR_DUR  = 0.50;  // pair + line back to inactive
    const BEAT       = LINE_LEAD + CONN_DUR + HOLD + CLEAR_DUR; // now ~2.24
    // Slightly longer than BEAT so there is a breath of empty board between beats,
    // rather than the next pair lighting the instant the last one finishes fading.
    const STEP       = 2.4;

    // Three beats covering all six icons exactly once each, so every feature gets a
    // moment: pin+route, then bell+moon, then grid+wrench.
    const SEQ = [0, 6, 3];

    SEQ.forEach((ci, idx) => {
      const at = CONN_START + idx * STEP;
      const [ia, ib] = PAIRS[ci];
      const elA = activeRefs.current[ia];
      const elB = activeRefs.current[ib];
      const line = lineRefs.current[ci];
      const dot = dotRefs.current[ci];

      if (elA) tl.to(elA, { opacity:1, duration:ACT_DUR, ease:ICON_EASE }, at);
      if (elB) tl.to(elB, { opacity:1, duration:ACT_DUR, ease:ICON_EASE }, at + 0.06);
      if (line && dot) {
        const len = getLen(line);
        
        // Draw the line with dash offset
        tl.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, at + LINE_LEAD);
        tl.to(line, { strokeDashoffset:0, duration:CONN_DUR, ease:LINE_EASE }, at + LINE_LEAD);
        
        // Animate dot along the line synchronized with the drawing
        tl.set(dot, { opacity: 1 }, at + LINE_LEAD);
        tl.to(dot, {
          onUpdate: function() {
            try {
              const progress = this.progress();
              const point = line.getPointAtLength(len * progress);
              gsap.set(dot, { attr: { cx: point.x, cy: point.y } });
            } catch (e) {
              // Silently handle any errors
            }
          },
          duration: CONN_DUR,
          ease: LINE_EASE,
        }, at + LINE_LEAD);
      } else if (line) {
        const len = getLen(line);
        tl.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, at + LINE_LEAD);
        tl.to(line, { strokeDashoffset:0, duration:CONN_DUR, ease:LINE_EASE }, at + LINE_LEAD);
      }

      // Hand back to grey so the next pair starts from a clean board.
      const clearAt = at + LINE_LEAD + CONN_DUR + HOLD;
      if (line) tl.to(line, { opacity:0, duration:CLEAR_DUR, ease:FADE_EASE }, clearAt);
      if (dot) tl.to(dot, { opacity:0, duration:CLEAR_DUR, ease:FADE_EASE }, clearAt);
      if (elA)  tl.to(elA,  { opacity:0, duration:CLEAR_DUR, ease:FADE_EASE }, clearAt);
      if (elB)  tl.to(elB,  { opacity:0, duration:CLEAR_DUR, ease:FADE_EASE }, clearAt);
    });

    // The last beat's clear tween ends at exactly CONN_START + 2*STEP + BEAT, so the
    // timeline already measures the full cycle and repeats from an empty board — no
    // padding or reset call needed.
    // NOTE: the grey outline cards are deliberately NOT faded at the end of a cycle.
    // They belong to the scene, not to one pass; fading them would blink the whole
    // board on every repeat. startDesktop owns their exit.
  };

  // ── STAGE 1 ───────────────────────────────────────────────────────────────
  // Scroll brought the user past DESKTOP_IN_PX. Dissolve the icon board — from
  // wherever the loop happens to be — then draw the wireframe and land the real
  // dashboard. Runs once; scrolling back does not rebuild it.
  const startDesktop = () => {
    if (desktopStartedRef.current) return;
    desktopStartedRef.current = true;

    // Kill the loop rather than letting it finish its cycle: waiting would stall
    // the response to the user's scroll by up to a full cycle. Killing leaves every
    // element at its current opacity, and the fades below take over from there, so
    // the handover is continuous no matter which frame we interrupted.
    iconsTlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        // Stamp where the page was when the dashboard finished. Stage 2 measures
        // its scroll requirement from here, so the scene holds on the completed
        // desktop until the user scrolls onward from this exact point.
        desktopDoneRef.current = true;
        scrollAtDesktopEndRef.current = window.scrollY;
      },
    });
    desktopTlRef.current = tl;
    allTweens.current.push(tl);

    // Clear whatever the loop left lit, plus any tooltip the user was hovering,
    // then the grey cards behind it all.
    tl.to(lineRefs.current.filter(Boolean),   { opacity:0, duration:0.45, ease:FADE_EASE }, 0);
    tl.to(dotRefs.current.filter(Boolean),    { opacity:0, duration:0.45, ease:FADE_EASE }, 0);
    tl.to(activeRefs.current.filter(Boolean), { opacity:0, duration:0.45, ease:FADE_EASE }, 0);
    tl.to(hoverRefs.current.filter(Boolean),  { opacity:0, duration:0.30, ease:FADE_EASE }, 0);
    tl.to(tipRefs.current.filter(Boolean),    { opacity:0, y:5, duration:0.30, ease:FADE_EASE }, 0);
    tl.to(iconRefs.current.filter(Boolean),   { opacity:0, duration:0.55, ease:FADE_EASE }, 0.12);
    // Stop hit-testing once they are invisible, or the cards keep intercepting the
    // pointer over the dashboard that replaces them.
    tl.set(iconRefs.current.filter(Boolean),  { pointerEvents:'none' }, 0.70);

    // Gap must clear the icon-outline fade above (starts +0.12, runs 0.55) or the
    // wireframe starts drawing while grey cards are still dissolving over it.
    const wireAt = 0.80;

    tl.to(desktopWireGrpRef.current, { opacity:1, duration:0.25 }, wireAt);
    desktopWireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.34, ease:'power2.out' }, wireAt + 0.04 + i * 0.035);
    });
    const wireFullAt = wireAt + 0.04 + DT_WIRE.length * 0.035 + 0.34;

    const revealAt = wireFullAt + 0.15;
    tl.to(desktopImgRef.current, { opacity:1, duration:0.80, ease:'power2.out' }, revealAt);
    tl.to(desktopWireGrpRef.current, { opacity:0, duration:0.60, ease:FADE_EASE }, revealAt + 0.20);
    tl.to(desktopPopupRef.current, {
      opacity: 1, x: 0, scale: 1,
      duration: 0.55, ease: 'back.out(1.6)',
    }, revealAt + 0.40);
  };

  // Fast-scroll safety net: jump straight to the finished state so the section is
  // never left mid-build behind the user. progress(1) fires the onComplete above,
  // which is what unlocks the phone.
  const settleToEnd = () => {
    startDesktop();
    desktopTlRef.current?.progress(1);
    phoneTlRef.current?.play();
  };

  return (
    <div
      ref={el => {
        outerRef.current = el;
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position:'relative', width:'100%', height: H * scale, overflow:'visible', display:'flex', justifyContent:'center', alignItems:'flex-start' }}
    >
      <div style={{
        position:'relative',
        width: W * scale, height: H * scale,
        flexShrink: 0,
      }}>
      <div style={{
        position:'absolute', top:0, left:0,
        width:W, height:H,
        transform:`scale(${scale})`, transformOrigin:'top left',
      }}>
      <GlobalDefs/>

      {/* z=0 — connection lines */}
      <svg ref={linesRef} width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          {/* filterUnits MUST be userSpaceOnUse. The default (objectBoundingBox)
              sizes the filter region from the path's own bbox, and a perfectly
              vertical or horizontal line has a ZERO-width/height bbox — the region
              collapses to zero area and the browser renders nothing at all. That is
              why the straight grid→wrench drop and route→bell run were invisible
              while every elbowed line drew fine. */}
          <filter id="s1line_glow" filterUnits="userSpaceOnUse"
            x={-40} y={-40} width={W + 80} height={H + 80}>
            <feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Strong glow filter for animated dots */}
          <filter id="s1dot_glow" filterUnits="userSpaceOnUse"
            x={-40} y={-40} width={W + 80} height={H + 80}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
            <feComponentTransfer in="blur" result="brightBlur">
              <feFuncA type="linear" slope="1.5"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="brightBlur"/>
              <feMergeNode in="brightBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Radial gradient for dots - bright center to glowing edge */}
          <radialGradient id="dotGradient">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="40%" stopColor="#93c5fd" stopOpacity="1"/>
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8"/>
          </radialGradient>
        </defs>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el => (lineRefs.current[i] = el)} d={d}
            stroke={`url(#s1lg${i})`} strokeWidth="1.8" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"
            filter="url(#s1line_glow)"/>
        ))}
        {/* Animated traveling dots */}
        {CONNECTIONS.map((d, i) => (
          <circle key={`dot-${i}`} ref={el => (dotRefs.current[i] = el)}
            cx="0" cy="0" r="8" fill="url(#dotGradient)" opacity="0"
            filter="url(#s1dot_glow)"/>
        ))}
      </svg>

      {/* z=2 — desktop outline + wireframe (back layer, the only wireframe in the scene) */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'visible' }}>
        <path ref={desktopFrameRef} d={DT_PATH}
          stroke="none" fill="none" opacity="0"/>
        <g ref={desktopWireGrpRef} opacity="0">
          {DT_WIRE.map((d, i) => (
            <path key={i} ref={r => (desktopWireRefs.current[i] = r)} d={d}
              stroke="url(#s1pg_w)" strokeWidth="0.7" fill="rgba(59,130,246,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s1bgl)"/>
          ))}
        </g>
      </svg>

      {/* z=6 — phone, front layer. White bezel + deeper shadow lift it off the browser. */}
      <div
        ref={mobileRef}
        style={{
          position:'absolute',
          left:PHONE_X, top:PHONE_Y,
          width:PHONE_W, height:PHONE_H,
          borderRadius:PHONE_R,
          overflow:'hidden',
          opacity:0,
          zIndex:6,
          pointerEvents:'none',
          willChange:'opacity',
          border:'5px solid #fff',
          boxShadow:'0 22px 50px rgba(15,23,42,0.22), 0 6px 16px rgba(15,23,42,0.12)',
          background:'#fff',
        }}
      >
        <Image
          src="/block 1/mobile.webp"
          alt="Mobile app interface"
          fill
          sizes={`${PHONE_W}px`}
          priority
          style={{ objectFit:'cover', objectPosition:'center top' }}
        />
      </div>

      {/* z=5 — desktop browser window (Mac chrome + image), back layer */}
      <div
        ref={desktopImgRef}
        style={{
          position:'absolute',
          left:DT_X, top:DT_Y,
          width:DT_W, height:DT_H,
          borderRadius:DT_R,
          overflow:'hidden',
          opacity:0,
          zIndex:5,
          pointerEvents:'none',
          willChange:'opacity',
          boxShadow:'0 18px 50px rgba(15,23,42,0.18), 0 4px 14px rgba(15,23,42,0.08)',
          background:'#fff',
          display:'flex',
          flexDirection:'column',
        }}
      >
        <BrowserChrome />
        <div style={{ position:'relative', flex:1, background:'#fff' }}>
          <Image
            src="/block 1/werertrttr.webp"
            alt="Desktop dashboard interface"
            fill
            sizes={`${DT_W}px`}
            style={{ objectFit:'contain', objectPosition:'left top' }}
          />
        </div>
      </div>

      {/* z=7 — hover popup card over desktop sidebar empty area */}
      <div
        ref={desktopPopupRef}
        onMouseEnter={() => gsap.to(desktopPopupRef.current, { scale: 1.12, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        onMouseLeave={() => gsap.to(desktopPopupRef.current, { scale: 1, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        style={{
          position:'absolute',
          left: Math.max(0, DT_X - 10),
          top: DT_Y + 130 * DSY,
          width: 250 * DSX,
          height: 54 * DSY,
          opacity: 0,
          zIndex: 7,
          pointerEvents: 'auto',
          cursor: 'pointer',
          willChange: 'opacity, transform',
          transformOrigin: 'left center',
        }}
      >
        <Image
          src="/block 1/fdghgyhjhk.webp"
          alt="Vehicle hover popup"
          fill
          sizes="250px"
          style={{ objectFit:'contain', objectPosition:'left top' }}
        />
      </div>

      {/* z=50 — hover Map/Satellite bar over mobile top-left empty area */}
      <div
        ref={mobilePopupRef}
        onMouseEnter={() => gsap.to(mobilePopupRef.current, { scale: 1.18, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        onMouseLeave={() => gsap.to(mobilePopupRef.current, { scale: 1, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        style={{
          position:'absolute',
          left: PHONE_X - 22,
          top: PHONE_Y + 68 * PSY,
          width: 250 * PSX,
          height: 44 * PSY,
          opacity: 0,
          zIndex: 8,
          pointerEvents: 'auto',
          cursor: 'pointer',
          willChange: 'opacity, transform',
          transformOrigin: 'left center',
        }}
      >
        <Image
          src="/block 1/map bar.png"
          alt="Map/Satellite toggle"
          fill
          sizes="110px"
          style={{ objectFit:'contain', objectPosition:'left top' }}
        />
      </div>

      {/* Icons — outline always visible, active overlay GSAP-driven */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          ref={el => (iconRefs.current[i] = el)}
          onMouseEnter={() => hoverIcon(i, true)}
          onMouseLeave={() => hoverIcon(i, false)}
          style={{
            position:'absolute', left:ic.left, top:ic.top,
            width:ic.size, height:ic.size,
            zIndex: ic.layer === 'center' ? 4 : 7,
            // Hover needs hit-testing. startDesktop switches this back to 'none'
            // once the icons have faded, so invisible cards can't swallow pointer
            // events over the dashboard underneath them.
            pointerEvents:'auto',
            willChange:'opacity',
          }}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el => (activeRefs.current[i] = el)}
            style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>

          {/* Hover colour is a SECOND active layer rather than a reuse of the one
              above: the looping timeline owns that element's opacity, and driving
              the same property from two places makes them fight mid-beat. */}
          <div ref={el => (hoverRefs.current[i] = el)}
            style={{ position:'absolute', inset:0, opacity:0, pointerEvents:'none', willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>

          <div ref={el => (tipRefs.current[i] = el)}
            style={{
              position:'absolute',
              // Hangs off the card's bottom corner, overlapping it slightly so the
              // label reads as attached to the icon rather than floating near it.
              top: ic.size - 12,
              ...(ic.flip
                ? { right: Math.round(ic.size * 0.45) }
                : { left:  Math.round(ic.size * 0.45) }),
              padding:'8px 18px',
              borderRadius:30,
              background: ic.tip,
              color:'#ffffff',
              fontSize:12,
              fontWeight:700,
              lineHeight:1.3,
              whiteSpace:'nowrap',
              boxShadow:'0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
              opacity:0,
              transform:'translateY(5px)',
              pointerEvents:'none',
              willChange:'opacity, transform',
            }}
          >
            {ic.label}
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
});
