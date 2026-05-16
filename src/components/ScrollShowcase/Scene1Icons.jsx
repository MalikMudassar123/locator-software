'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const W = 540, H = 580;
const PHONE_X = 140, PHONE_Y = 38, PHONE_W = 260, PHONE_H = 500, PHONE_R = 32;
const PX2 = PHONE_X + PHONE_W, PY2 = PHONE_Y + PHONE_H;
const PHONE_PERIM = 1465;

const PHONE_PATH =
  `M${PHONE_X+PHONE_R} ${PHONE_Y} H${PX2-PHONE_R}` +
  ` Q${PX2} ${PHONE_Y} ${PX2} ${PHONE_Y+PHONE_R}` +
  ` V${PY2-PHONE_R} Q${PX2} ${PY2} ${PX2-PHONE_R} ${PY2}` +
  ` H${PHONE_X+PHONE_R} Q${PHONE_X} ${PY2} ${PHONE_X} ${PY2-PHONE_R}` +
  ` V${PHONE_Y+PHONE_R} Q${PHONE_X} ${PHONE_Y} ${PHONE_X+PHONE_R} ${PHONE_Y} Z`;

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

const WIRE = [
  rp(PHONE_X+6,  PHONE_Y+6,   PHONE_W-12, 46, 26),
  rp(PHONE_X+10, PHONE_Y+58,  PHONE_W-20, 156, 8),
  rp(PHONE_X+10, PHONE_Y+224, 40, 40, 20),
  rp(PHONE_X+56, PHONE_Y+232, 126, 10, 4),
  rp(PHONE_X+56, PHONE_Y+250, 82, 8, 4),
  rp(PHONE_X+10, PHONE_Y+274, 58, 7, 3),
  rp(PHONE_X+76, PHONE_Y+274, 136, 7, 3),
  rp(PHONE_X+10, PHONE_Y+289, 58, 7, 3),
  rp(PHONE_X+76, PHONE_Y+289, 86, 7, 3),
  rp(PHONE_X+10, PHONE_Y+304, 58, 7, 3),
  rp(PHONE_X+76, PHONE_Y+304, 50, 7, 3),
  rp(PHONE_X+10, PHONE_Y+324, PHONE_W-20, 56, 8),
  rp(PHONE_X+62, PHONE_Y+398, PHONE_W-124, 26, 13),
];

// Icon definitions — outer = stays visible over phone, center = hidden by phone mask
const ICONS = [
  { id:'pin',    left:22,  top:68,  size:70, layer:'outer'  }, // 0
  { id:'bell',   left:183, top:143, size:64, layer:'center' }, // 1
  { id:'route',  left:412, top:44,  size:64, layer:'outer'  }, // 2
  { id:'moon',   left:22,  top:278, size:64, layer:'outer'  }, // 3
  { id:'grid',   left:300, top:248, size:64, layer:'center' }, // 4
  { id:'wrench', left:300, top:382, size:64, layer:'center' }, // 5
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Clean L-shaped connectors with smooth 12px rounded corners (premium SaaS style)
const CONNECTIONS = [
  'M 92 103 V 88 Q 92 76 104 76 H 412',                          // 0: pin → route (up, then right)
  'M 92 124 H 203 Q 215 124 215 136 V 143',                       // 1: pin → bell (right, then down)
  'M 86 310 H 288 Q 300 310 300 298 V 280',                       // 2: moon → grid (right, then up)
  'M 332 312 V 382',                                              // 3: grid → wrench (clean vertical)
  'M 444 108 V 163 Q 444 175 432 175 H 247',                      // 4: route → bell (down, then left)
  'M 54 342 V 402 Q 54 414 66 414 H 300',                         // 5: moon → wrench (down, then right)
];

// Icon pairs for each connection
const PAIRS = [[0,2],[0,1],[3,4],[4,5],[2,1],[3,5]];

// Activation groups — each entry is a set of connection indices that fire simultaneously
const GROUPS = [
  [0, 4],  // pin→route + route→bell  (route as hub, 2 lines at once)
  [1],     // pin→bell (solo)
  [2, 3],  // moon→grid + grid→wrench (grid as hub, 2 lines at once)
  [5],     // moon→wrench (long jump)
  [0, 2],  // pin→route + moon→grid   (parallel, left+right)
];

const CSS = `
  @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
  @keyframes pulseRing{0%,100%{opacity:0.25;transform:scale(1)}50%{opacity:0.6;transform:scale(1.1)}}
`;

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute', overflow:'hidden' }}>
      <defs>
        <linearGradient id="ig_pin"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
        <linearGradient id="ig_bell"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        <linearGradient id="ig_route"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="ig_moon"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3730a3"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient>
        <linearGradient id="ig_wrench" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        {/* Per-connection gradients — aligned with new L-shape paths */}
        <linearGradient id="s1lg0" x1="92" y1="103" x2="412" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s1lg1" x1="92" y1="124" x2="215" y2="143" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="s1lg2" x1="86" y1="310" x2="300" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s1lg3" x1="332" y1="312" x2="332" y2="382" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#60a5fa"/>
        </linearGradient>
        <linearGradient id="s1lg4" x1="444" y1="108" x2="247" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s1lg5" x1="54" y1="342" x2="300" y2="414" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s1pg_w" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function Sk({ w, h, br = 5, delay = 0, style = {} }) {
  return <div style={{ width:w, height:h, borderRadius:br, flexShrink:0, background:'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)', backgroundSize:'200%', animation:`shimmer 1.6s ease-in-out ${delay}s infinite`, ...style }}/>;
}

// Inactive placeholder — stroke-only outline, always visible
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

// Active filled card — shown when connection is live
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
  const activeRefs  = useRef([]);  // active filled card overlays
  const lineRefs    = useRef([]);
  const phoneOutRef = useRef(null);
  const wireRefs    = useRef([]);
  const wireGrpRef  = useRef(null);
  const maskRef     = useRef(null);
  const shellRef    = useRef(null);
  const skelRef     = useRef(null);
  const realRef     = useRef(null);
  const allTweens   = useRef([]);
  const hoverTl     = useRef(null);
  const isHovered   = useRef(false);
  const hasRevealed = useRef(false);
  const linesRef    = useRef(null);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  const stop = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
    hoverTl.current?.kill();
    hoverTl.current = null;
    hasRevealed.current = false;
    if (linesRef.current) gsap.set(linesRef.current, { zIndex: 0 });
  };

  // Premium easing curves — smooth, refined motion
  const EASE_IN  = 'power3.inOut';
  const EASE_OUT = 'power3.out';
  const EASE_OFF = 'power2.in';

  const resetIconsAndLines = () => {
    gsap.set(activeRefs.current.filter(Boolean), { opacity: 0 });
    lineRefs.current.filter(Boolean).forEach(p => {
      const len = (() => { try { return p.getTotalLength(); } catch { return 400; } })();
      gsap.set(p, {
        opacity: 0,
        strokeDasharray: `${len} ${len + 1}`,
        strokeDashoffset: len,
      });
    });
  };

  const playConnections = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
    resetIconsAndLines();
    if (linesRef.current) gsap.set(linesRef.current, { zIndex: 0 });
    const tl = gsap.timeline();
    allTweens.current.push(tl);
    const CYCLE = 1.2;
    const shuffled = shuffle(GROUPS);
    let t = 0;
    shuffled.forEach((group, gi) => {
      const iconIndices = [...new Set(group.flatMap(ci => PAIRS[ci]))];
      const nextGroup = shuffled[gi + 1] || [];
      const nextIconSet = new Set(nextGroup.flatMap(ci => PAIRS[ci]));
      const offAt = t + CYCLE - 0.26;
      iconIndices.forEach(idx => {
        const el = activeRefs.current[idx];
        if (el) tl.to(el, { opacity:1, duration:0.32, ease:EASE_OUT }, t);
      });
      group.forEach(ci => {
        const line = lineRefs.current[ci];
        if (!line) return;
        const len = (() => { try { return line.getTotalLength(); } catch { return 400; } })();
        tl.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, t + 0.16);
        tl.to(line, { strokeDashoffset:0, duration:0.55, ease:EASE_IN }, t + 0.16);
      });
      group.forEach(ci => {
        const line = lineRefs.current[ci];
        if (line) tl.to(line, { opacity:0, duration:0.30, ease:EASE_OFF }, offAt);
      });
      iconIndices.forEach(idx => {
        if (!nextIconSet.has(idx)) {
          const el = activeRefs.current[idx];
          if (el) tl.to(el, { opacity:0, duration:0.28, ease:EASE_OFF }, offAt);
        }
      });
      t += CYCLE;
    });
    tl.add(() => { if (!isHovered.current) playConnections(); }, t + 0.5);
  };

  const play = () => {
    stop();
    resetIconsAndLines();
    if (linesRef.current) gsap.set(linesRef.current, { zIndex: 0 });
    gsap.set(maskRef.current,     { opacity: 0 });
    gsap.set(wireGrpRef.current,  { opacity: 0 });
    gsap.set(phoneOutRef.current, { opacity: 0, strokeDashoffset: PHONE_PERIM });
    gsap.set(shellRef.current,    { opacity: 0 });
    gsap.set(skelRef.current,     { opacity: 0 });
    gsap.set(realRef.current,     { opacity: 0 });
    wireRefs.current.forEach(p => {
      if (!p) return;
      const len = (() => { try { return p.getTotalLength(); } catch { return 400; } })();
      gsap.set(p, { strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len, opacity:0 });
    });

    const tl = gsap.timeline();
    allTweens.current.push(tl);

    // 3 lightweight sequential connections — step by step, feel progressive
    // ci=0 pin→route: arcs above phone     (starts t=0.00)
    // ci=2 moon→grid: crosses phone body   (starts t=0.65)
    // ci=4 route→bell: crosses phone top   (starts t=1.05)
    [
      { ci:0, at:0.00 },
      { ci:2, at:0.65 },
      { ci:4, at:1.05 },
    ].forEach(({ ci, at }) => {
      const [ia, ib] = PAIRS[ci];
      const elA = activeRefs.current[ia];
      const elB = activeRefs.current[ib];
      const line = lineRefs.current[ci];
      if (elA) tl.to(elA, { opacity:1, duration:0.28, ease:EASE_OUT }, at);
      if (elB) tl.to(elB, { opacity:1, duration:0.28, ease:EASE_OUT }, at);
      if (line) {
        const len = (() => { try { return line.getTotalLength(); } catch { return 400; } })();
        tl.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, at + 0.14);
        tl.to(line, { strokeDashoffset:0, duration:0.58, ease:EASE_IN }, at + 0.14);
      }
    });

    // Phone outline starts at 0.38s — first connection is still crossing over it
    const phoneAt = 0.38;
    tl.to(phoneOutRef.current, { opacity:1, duration:0.10 }, phoneAt);
    tl.to(phoneOutRef.current, { strokeDashoffset:0, duration:1.05, ease:'power2.inOut' }, phoneAt + 0.12);

    // Wireframe after phone draw (~1.63s)
    const wireAt = phoneAt + 0.12 + 1.05 + 0.06;
    tl.to(wireGrpRef.current, { opacity:1, duration:0.08 }, wireAt);
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.14, ease:'power1.out' }, wireAt + 0.04 + i * 0.04);
    });

    // Shell phase — connections fade out just before real UI crossfades in
    const shellAt = wireAt + 0.72;
    tl.to(lineRefs.current.filter(Boolean),   { opacity:0, duration:0.26 }, shellAt - 0.08);
    tl.to(activeRefs.current.filter(Boolean), { opacity:0, duration:0.22 }, shellAt - 0.08);
    tl.to(maskRef.current,     { opacity:1, duration:0.30, ease:'power2.out' }, shellAt);
    tl.to(shellRef.current,    { opacity:1, duration:0.38                    }, shellAt - 0.05);
    tl.to(skelRef.current,     { opacity:1, duration:0.24                    }, shellAt + 0.06);
    tl.to(wireGrpRef.current,  { opacity:0, duration:0.26                    }, shellAt + 0.08);
    tl.to(phoneOutRef.current, { opacity:0, duration:0.28                    }, shellAt + 0.10);
    tl.to(skelRef.current,     { opacity:0, duration:0.32                    }, shellAt + 0.70);
    tl.to(realRef.current,     { opacity:1, duration:0.36                    }, shellAt + 0.72);

    // Mark revealed; keep frame visible and loop connections over it
    tl.add(() => { hasRevealed.current = true; }, shellAt + 0.72);
    const loopAt = shellAt + 0.72 + 0.36 + 2.0;
    tl.add(() => { if (!isHovered.current) playConnections(); }, loopAt);
  };

  // Hover: pause auto-play, highlight ALL connections for the hovered icon
  const handleHover = (iconIdx) => {
    if (isHovered.current) return;
    isHovered.current = true;
    allTweens.current.forEach(t => t?.pause?.());
    resetIconsAndLines();
    const connIndices = PAIRS.reduce((acc, pair, i) => pair.includes(iconIdx) ? [...acc, i] : acc, []);
    if (connIndices.length === 0) return;
    const iconIndices = [...new Set(connIndices.flatMap(ci => PAIRS[ci]))];
    hoverTl.current = gsap.timeline();
    iconIndices.forEach(idx => {
      const el = activeRefs.current[idx];
      if (el) hoverTl.current.to(el, { opacity:1, duration:0.28, ease:EASE_OUT }, 0);
    });
    connIndices.forEach(ci => {
      const line = lineRefs.current[ci];
      if (!line) return;
      const len = (() => { try { return line.getTotalLength(); } catch { return 400; } })();
      hoverTl.current.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, 0.10);
      hoverTl.current.to(line, { strokeDashoffset:0, duration:0.55, ease:EASE_IN }, 0.10);
    });
  };

  const handleHoverLeave = () => {
    if (!isHovered.current) return;
    isHovered.current = false;
    hoverTl.current?.kill();
    hoverTl.current = null;
    if (hasRevealed.current) {
      playConnections();
    } else {
      play();
    }
  };

  return (
    <div
      ref={el => {
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position:'relative', width:W, maxWidth:'100%', height:H }}
    >
      <style>{CSS}</style>
      <GlobalDefs/>

      {/* z=0 — connection lines (clean L-shape, premium glow) */}
      <svg ref={linesRef} width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s1line_glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el => (lineRefs.current[i] = el)} d={d}
            stroke={`url(#s1lg${i})`} strokeWidth="1.6" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"
            filter="url(#s1line_glow)"/>
        ))}
      </svg>

      {/* z=2 — phone outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s1pgl" x="-5%" y="-4%" width="110%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="s1bgl" x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={phoneOutRef} d={PHONE_PATH}
          stroke="url(#s1pg_w)" strokeWidth="1.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={PHONE_PERIM} strokeDashoffset={PHONE_PERIM}
          filter="url(#s1pgl)" opacity="0"/>
        <g ref={wireGrpRef} opacity="0">
          {WIRE.map((d, i) => (
            <path key={i} ref={r => (wireRefs.current[i] = r)} d={d}
              stroke="url(#s1pg_w)" strokeWidth="0.7" fill="rgba(59,130,246,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s1bgl)"/>
          ))}
        </g>
      </svg>

      {/* Icon positions — InactiveCard always visible, ActiveCard overlay (GSAP-controlled) */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          style={{
            position:'absolute', left:ic.left, top:ic.top,
            width:ic.size, height:ic.size,
            zIndex: ic.layer === 'center' ? 4 : 7,
            cursor:'pointer',
          }}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleHoverLeave}
        >
          {/* Always-visible outline placeholder */}
          <InactiveCard id={ic.id} size={ic.size}/>
          {/* Active filled card — opacity driven by GSAP */}
          <div ref={el => (activeRefs.current[i] = el)}
            style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}

      {/* z=5 mask */}
      <div ref={maskRef} style={{
        position:'absolute', left:PHONE_X, top:PHONE_Y,
        width:PHONE_W, height:PHONE_H, borderRadius:PHONE_R,
        background:'#f5f7fa', zIndex:5, opacity:0, pointerEvents:'none',
      }}/>

      {/* z=6 phone shell */}
      <div ref={shellRef} style={{
        position:'absolute', left:PHONE_X, top:PHONE_Y,
        width:PHONE_W, height:PHONE_H, borderRadius:PHONE_R,
        background:'#fff', overflow:'hidden', opacity:0, zIndex:6,
        boxShadow:'0 8px 36px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {/* Skeleton */}
        <div ref={skelRef} style={{ position:'absolute', inset:0, opacity:0, background:'#f8fafc' }}>
          <div style={{ height:56, background:'linear-gradient(90deg,#1a73e8,#1558c0)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <div style={{ width:120, height:10, borderRadius:5, background:'rgba(255,255,255,0.28)' }}/>
            <div style={{ width:48,  height:8,  borderRadius:3, background:'rgba(255,255,255,0.16)' }}/>
          </div>
          <div style={{ height:198, background:'#dbeafe', position:'relative', overflow:'hidden' }}>
            <svg width="100%" height="198" viewBox={`0 0 ${PHONE_W} 198`} style={{ position:'absolute', inset:0 }}>
              <rect width={PHONE_W} height="198" fill="#dbeafe"/>
              {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2={PHONE_W} y2={y} stroke="#bfdbfe" strokeWidth="1"/>)}
              {[65,130,195].map(x => <line key={x} x1={x} y1="0" x2={x} y2="198" stroke="#bfdbfe" strokeWidth="1"/>)}
              <circle cx={PHONE_W/2} cy="96" r="5" fill="#3b82f6" opacity="0.85"/>
            </svg>
          </div>
          <div style={{ padding:'12px 14px', display:'flex', flexDirection:'column', gap:9 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <Sk w={42} h={42} br={21}/>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7 }}>
                <Sk w="70%" h={9} br={5}/><Sk w="44%" h={7} br={4} delay={0.1}/>
              </div>
            </div>
            {[0,1,2,3,4].map(j => (
              <div key={j} style={{ display:'flex', gap:8 }}>
                <Sk w={58} h={6} br={3} delay={j*0.07}/>
                <Sk w="62%" h={6} br={3} delay={j*0.07+0.04}/>
              </div>
            ))}
            <Sk w={100} h={22} br={11} style={{ alignSelf:'center' }} delay={0.4}/>
          </div>
        </div>

        {/* Real UI */}
        <div ref={realRef} style={{ position:'absolute', inset:0, opacity:0, display:'flex', flexDirection:'column', background:'#fff' }}>
          {/* Status bar */}
          <div style={{ background:'#1565c0', padding:'3px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
            <span style={{ color:'rgba(255,255,255,0.9)', fontSize:7.5, fontWeight:500 }}>9:41</span>
            <div style={{ display:'flex', gap:4, alignItems:'center' }}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <rect x="0" y="5" width="2" height="3" rx="0.5" fill="white"/>
                <rect x="3" y="3" width="2" height="5" rx="0.5" fill="white"/>
                <rect x="6" y="1" width="2" height="7" rx="0.5" fill="white"/>
                <rect x="9" y="0" width="2" height="8" rx="0.5" fill="white" opacity="0.4"/>
              </svg>
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M1 3C2.5 1.2 7.5 1.2 9 3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M2.5 4.5C3.5 3.5 6.5 3.5 7.5 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="5" cy="6.2" r="0.9" fill="white"/>
              </svg>
              <div style={{ display:'flex', alignItems:'center', gap:1 }}>
                <div style={{ width:14, height:6, border:'1px solid rgba(255,255,255,0.8)', borderRadius:1.5, padding:'1px', display:'flex' }}>
                  <div style={{ width:'90%', height:'100%', background:'#4ade80', borderRadius:0.5 }}/>
                </div>
                <div style={{ width:1.5, height:3, background:'rgba(255,255,255,0.7)', borderRadius:1 }}/>
              </div>
            </div>
          </div>
          {/* App header */}
          <div style={{ background:'#1a73e8', padding:'7px 10px 5px', flexShrink:0 }}>
            <div style={{ textAlign:'center', marginBottom:5 }}>
              <span style={{ color:'#fff', fontSize:11.5, fontWeight:600 }}>Vehicles - Live View</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:3 }}>
              <div style={{ fontSize:8, background:'rgba(255,255,255,0.95)', borderRadius:4, padding:'2.5px 9px', color:'#1a73e8', fontWeight:700 }}>Map</div>
              <div style={{ fontSize:8, background:'rgba(255,255,255,0.15)', borderRadius:4, padding:'2.5px 8px', color:'rgba(255,255,255,0.85)' }}>Satellite</div>
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:3, background:'rgba(255,255,255,0.12)', borderRadius:4, padding:'2.5px 7px' }}>
                <span style={{ fontSize:7.5, color:'rgba(255,255,255,0.9)' }}>Traffic</span>
                <div style={{ width:14, height:7.5, borderRadius:4, background:'#4ade80', display:'flex', alignItems:'center', justifyContent:'flex-end', padding:'0 1.5px' }}>
                  <div style={{ width:5.5, height:5.5, borderRadius:'50%', background:'white' }}/>
                </div>
              </div>
            </div>
          </div>
          {/* Map */}
          <div style={{ flex:'0 0 185px', position:'relative', overflow:'hidden' }}>
            <svg width="100%" height="185" viewBox={`0 0 ${PHONE_W} 185`} style={{ display:'block' }}>
              <rect width={PHONE_W} height="185" fill="#ebe4d8"/>
              <rect x="152" y="0" width="108" height="88" fill="#d4e9cc" stroke="#c0dab4" strokeWidth="0.4"/>
              <rect x="62" y="90" width="95" height="65" fill="#e2dbd0" stroke="#cfc8bc" strokeWidth="0.3"/>
              <rect x="0" y="0" width="148" height="50" fill="#f2ede4"/>
              <rect x="165" y="135" width="95" height="50" fill="#cce4f6" opacity="0.55"/>
              <rect x="0" y="82" width={PHONE_W} height="13" fill="#f6f0e6"/>
              <line x1="0" y1="88.5" x2={PHONE_W} y2="88.5" stroke="#e0d8c8" strokeWidth="0.6" strokeDasharray="7 3.5"/>
              <rect x="60" y="0" width="5" height="185" fill="#f0ebe0"/>
              <rect x="150" y="0" width="4" height="185" fill="#f0ebe0"/>
              <rect x="215" y="0" width="4" height="185" fill="#f0ebe0"/>
              <rect x="0" y="28" width={PHONE_W} height="3.5" fill="#ede7dc"/>
              <rect x="0" y="52" width={PHONE_W} height="3" fill="#ede7dc"/>
              <rect x="0" y="125" width={PHONE_W} height="3.5" fill="#ede7dc"/>
              <rect x="0" y="162" width={PHONE_W} height="3" fill="#ede7dc"/>
              <path d="M 8 88 Q 35 76 62 66 Q 88 55 118 48 Q 150 42 188 54 Q 210 62 240 85" stroke="#22c55e" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.9"/>
              <circle cx="112" cy="62" r="8.5" fill="#fff3f3" stroke="#fca5a5" strokeWidth="1"/>
              <text x="112" y="66" textAnchor="middle" fontSize="8.5" fill="#dc2626" fontWeight="bold" fontFamily="sans-serif">H</text>
              <circle cx="76" cy="104" r="13" fill="rgba(239,68,68,0.14)"/>
              <circle cx="76" cy="104" r="8" fill="#ef4444" stroke="white" strokeWidth="1.8"/>
              <rect x="84" y="96" width="42" height="13" rx="3" fill="white" stroke="#e5e7eb" strokeWidth="0.7"/>
              <text x="105" y="106" fontSize="5.8" fill="#374151" textAnchor="middle" fontFamily="sans-serif">Steve Joh...</text>
              <text x="198" y="20" textAnchor="middle" fontSize="6" fill="#4a7045" fontWeight="600" fontFamily="sans-serif">Sheikh Shakhbout</text>
              <text x="198" y="29" textAnchor="middle" fontSize="5.2" fill="#5a8055" fontFamily="sans-serif">Medical City (SSMC)</text>
              <text x="198" y="37" textAnchor="middle" fontSize="4.5" fill="#6a9065" fontFamily="sans-serif">مدينة الشيخ شخبوط الطبية</text>
              <text x="36" y="17" textAnchor="middle" fontSize="5.5" fill="#7a7060" fontFamily="sans-serif">Bawabat Al Sharq Mall</text>
              <text x="36" y="25" textAnchor="middle" fontSize="4.5" fill="#8a8070" fontFamily="sans-serif">بوابات الشرق مول</text>
              <text x="110" y="118" textAnchor="middle" fontSize="5.5" fill="#888070" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.4">MAFRAQ</text>
              <text x="110" y="126" textAnchor="middle" fontSize="4.5" fill="#888070" fontFamily="sans-serif" letterSpacing="0.3">INDUSTRIAL AREA</text>
              <text x="228" y="152" textAnchor="middle" fontSize="5.5" fill="#7a8090" fontFamily="sans-serif">BANIYAS W</text>
              <rect x="232" y="163" width="20" height="20" rx="10" fill="white" stroke="#e0e0e0" strokeWidth="0.8"/>
              <circle cx="242" cy="170" r="3.5" fill="none" stroke="#3b82f6" strokeWidth="1.2"/>
              <circle cx="242" cy="170" r="1.2" fill="#3b82f6"/>
              <line x1="242" y1="173.5" x2="242" y2="177" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Driver panel */}
          <div style={{ flex:1, overflow:'hidden', padding:'8px 12px 6px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7, paddingBottom:7, borderBottom:'1px solid #f3f4f6' }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M7 2L4 5.5L7 9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(145deg,#94a3b8,#64748b)', flexShrink:0, overflow:'hidden', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
                <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
                  <circle cx="16" cy="11" r="7" fill="rgba(255,255,255,0.88)"/>
                  <path d="M9 11 Q9 18 16 18 Q23 18 23 11" fill="rgba(80,50,20,0.22)"/>
                  <path d="M2 36c0-7.73 6.27-14 14-14s14 6.27 14 14" fill="rgba(255,255,255,0.78)"/>
                </svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#111827', lineHeight:1.2 }}>Steve Johns 7895</div>
                <div style={{ fontSize:8.5, color:'#6b7280', marginTop:1 }}>Driver</div>
              </div>
              <div style={{ width:26, height:26, borderRadius:'50%', background:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            {[['Status','Stopped - from 10 minutes a...'],['Driver','Steve Johns'],['Phone','050'],['Geozone','Not in Geozone'],['Last Update','14:56 11/06/2025']].map(([l,v]) => (
              <div key={l} style={{ display:'flex', gap:6, marginBottom:4.5 }}>
                <span style={{ fontSize:8.5, color:'#9ca3af', minWidth:68, flexShrink:0 }}>{l}</span>
                <span style={{ fontSize:8.5, color:'#374151', lineHeight:1.3 }}>{v}</span>
              </div>
            ))}
            <div style={{ fontSize:7.5, color:'#9ca3af', marginBottom:7, lineHeight:1.4 }}>Jarn Yafour, Abu Dhabi, Abu Dhabi Emirate, 20...</div>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <div style={{ background:'#f3f4f6', borderRadius:999, padding:'4px 16px', display:'inline-flex', alignItems:'center', gap:5 }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#10b981" strokeWidth="1.4"/><path d="M6.5 3.8v2.7l1.6 0.9" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize:11.5, fontWeight:700, color:'#374151' }}>79523 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
