'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import BrowserChrome from './BrowserChrome';

const W = 540, H = 580;

// Phone (mobile phase)
const PHONE_X = 140, PHONE_Y = 38, PHONE_W = 260, PHONE_H = 500, PHONE_R = 32;
const PX2 = PHONE_X + PHONE_W, PY2 = PHONE_Y + PHONE_H;
const PHONE_PERIM = 1465;

// Desktop (browser-style frame)
const DT_W = 500, DT_H = 340, DT_R = 14;
const DT_X = (W - DT_W) / 2;             // 20
const DT_Y = (H - DT_H) / 2;             // 120
const DTX2 = DT_X + DT_W, DTY2 = DT_Y + DT_H;
const DT_PERIM = 2 * (DT_W + DT_H);      // ~1680

const PHONE_PATH =
  `M${PHONE_X+PHONE_R} ${PHONE_Y} H${PX2-PHONE_R}` +
  ` Q${PX2} ${PHONE_Y} ${PX2} ${PHONE_Y+PHONE_R}` +
  ` V${PY2-PHONE_R} Q${PX2} ${PY2} ${PX2-PHONE_R} ${PY2}` +
  ` H${PHONE_X+PHONE_R} Q${PHONE_X} ${PY2} ${PHONE_X} ${PY2-PHONE_R}` +
  ` V${PHONE_Y+PHONE_R} Q${PHONE_X} ${PHONE_Y} ${PHONE_X+PHONE_R} ${PHONE_Y} Z`;

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

// Desktop browser-chrome wireframe (header bar + sidebar + content blocks)
const DT_WIRE = [
  // top chrome bar
  rp(DT_X+8, DT_Y+8, DT_W-16, 22, 4),
  // sidebar
  rp(DT_X+8, DT_Y+38, 90, DT_H-46, 6),
  // main content card row
  rp(DT_X+108, DT_Y+38, DT_W-118, 70, 6),
  // stats blocks
  rp(DT_X+108, DT_Y+116, (DT_W-130)/3, 60, 6),
  rp(DT_X+108 + (DT_W-130)/3 + 7, DT_Y+116, (DT_W-130)/3, 60, 6),
  rp(DT_X+108 + 2*((DT_W-130)/3 + 7), DT_Y+116, (DT_W-130)/3, 60, 6),
  // bottom card
  rp(DT_X+108, DT_Y+184, DT_W-118, DT_H-200, 6),
];

const ICONS = [
  { id:'pin',    left:22,  top:68,  size:70, layer:'outer'  },
  { id:'bell',   left:183, top:143, size:64, layer:'center' },
  { id:'route',  left:412, top:44,  size:64, layer:'outer'  },
  { id:'moon',   left:22,  top:278, size:64, layer:'outer'  },
  { id:'grid',   left:300, top:248, size:64, layer:'center' },
  { id:'wrench', left:300, top:382, size:64, layer:'center' },
];

const CONNECTIONS = [
  'M 92 103 V 88 Q 92 76 104 76 H 412',
  'M 92 124 H 203 Q 215 124 215 136 V 143',
  'M 86 310 H 288 Q 300 310 300 298 V 280',
  'M 332 312 V 382',
  'M 444 108 V 163 Q 444 175 432 175 H 247',
  'M 54 342 V 402 Q 54 414 66 414 H 300',
];

const PAIRS = [[0,2],[0,1],[3,4],[4,5],[2,1],[3,5]];

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute' }}>
      <defs>
        <linearGradient id="ig_pin"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
        <linearGradient id="ig_bell"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        <linearGradient id="ig_route"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="ig_moon"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3730a3"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient>
        <linearGradient id="ig_wrench" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
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
  const phoneOutRef  = useRef(null);
  const wireRefs     = useRef([]);
  const wireGrpRef   = useRef(null);
  const mobileRef    = useRef(null);
  const desktopFrameRef = useRef(null);
  const desktopWireRefs = useRef([]);
  const desktopWireGrpRef = useRef(null);
  const desktopImgRef = useRef(null);
  const allTweens    = useRef([]);
  const linesRef     = useRef(null);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  const stop = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
  };

  // Premium cinematic easing
  const LINE_EASE = 'power2.inOut';
  const ICON_EASE = 'power3.out';
  const FADE_EASE = 'power2.in';

  const getLen = (p) => { try { return p.getTotalLength(); } catch { return 400; } };

  const resetAll = () => {
    gsap.set(iconRefs.current.filter(Boolean),   { opacity: 1 });
    gsap.set(activeRefs.current.filter(Boolean), { opacity: 0 });
    lineRefs.current.filter(Boolean).forEach(p => {
      const len = getLen(p);
      gsap.set(p, { opacity: 0, strokeDasharray: `${len} ${len + 1}`, strokeDashoffset: len });
    });
    gsap.set(wireGrpRef.current, { opacity: 0 });
    gsap.set(phoneOutRef.current, { opacity: 0, strokeDashoffset: PHONE_PERIM });
    gsap.set(mobileRef.current, { opacity: 0 });
    gsap.set(desktopFrameRef.current, { opacity: 0, strokeDashoffset: DT_PERIM });
    gsap.set(desktopWireGrpRef.current, { opacity: 0 });
    gsap.set(desktopImgRef.current, { opacity: 0 });
    wireRefs.current.forEach(p => {
      if (!p) return;
      const len = getLen(p);
      gsap.set(p, { strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len, opacity:0 });
    });
    desktopWireRefs.current.forEach(p => {
      if (!p) return;
      const len = getLen(p);
      gsap.set(p, { strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len, opacity:0 });
    });
  };

  const play = () => {
    stop();
    resetAll();

    const tl = gsap.timeline({ onComplete: () => play() });
    allTweens.current.push(tl);

    // ── PHASE 1: ICON LINES ONLY — no wireframe visible (~3.4s)
    const CONN_START = 0.20;
    const CONN_DUR   = 1.35;
    const STAGGER    = 0.80;
    const SEQ = [{ ci:0 }, { ci:2 }, { ci:4 }];

    SEQ.forEach(({ ci }, idx) => {
      const at = CONN_START + idx * STAGGER;
      const [ia, ib] = PAIRS[ci];
      const elA = activeRefs.current[ia];
      const elB = activeRefs.current[ib];
      const line = lineRefs.current[ci];
      if (elA) tl.to(elA, { opacity:1, duration:0.42, ease:ICON_EASE }, at);
      if (elB) tl.to(elB, { opacity:1, duration:0.42, ease:ICON_EASE }, at + 0.22);
      if (line) {
        const len = getLen(line);
        tl.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, at + 0.12);
        tl.to(line, { strokeDashoffset:0, duration:CONN_DUR, ease:LINE_EASE }, at + 0.12);
      }
    });

    // Phase 1 ends at: 0.20 + 2*0.80 + 0.12 + 1.35 = 3.27s
    const phase1End = CONN_START + (SEQ.length - 1) * STAGGER + 0.12 + CONN_DUR;

    // Lines + active icons + icon outlines fade out COMPLETELY before wireframe starts
    tl.to(lineRefs.current.filter(Boolean),   { opacity:0, duration:0.50, ease:FADE_EASE }, phase1End + 0.15);
    tl.to(activeRefs.current.filter(Boolean), { opacity:0, duration:0.45, ease:FADE_EASE }, phase1End + 0.20);
    tl.to(iconRefs.current.filter(Boolean),   { opacity:0, duration:0.55, ease:FADE_EASE }, phase1End + 0.25);

    // ── PHASE 2: WIREFRAME builds (only after lines fully gone) → mobile PNG
    const wireAt = phase1End + 0.80; // safe gap after fade-out completes
    tl.to(wireGrpRef.current, { opacity:1, duration:0.25 }, wireAt);
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.38, ease:'power2.out' }, wireAt + 0.04 + i * 0.045);
    });

    const wireFullAt = wireAt + 0.04 + WIRE.length * 0.045 + 0.38;
    const mobileAt = wireFullAt + 0.15;
    tl.to(mobileRef.current, { opacity:1, duration:0.85, ease:'power2.out' }, mobileAt);

    // Phone wireframe fades out as mobile PNG takes over
    tl.to(wireGrpRef.current, { opacity:0, duration:0.65, ease:FADE_EASE }, mobileAt + 0.20);

    const mobileEnd = mobileAt + 0.85 + 4.0;

    // ── PHASE 3: mobile fades out → desktop wireframe builds → desktop PNG
    tl.to(mobileRef.current, { opacity:0, duration:0.55, ease:FADE_EASE }, mobileEnd);

    const dtWireAt = mobileEnd + 0.70;
    tl.to(desktopWireGrpRef.current, { opacity:1, duration:0.25 }, dtWireAt);
    desktopWireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.38, ease:'power2.out' }, dtWireAt + 0.04 + i * 0.06);
    });

    const dtFullAt = dtWireAt + 0.04 + DT_WIRE.length * 0.06 + 0.38;
    const dtPngAt = dtFullAt + 0.15;
    tl.to(desktopImgRef.current, { opacity:1, duration:0.85, ease:'power2.out' }, dtPngAt);

    // Desktop wireframe fades out as desktop PNG takes over
    tl.to(desktopWireGrpRef.current, { opacity:0, duration:0.65, ease:FADE_EASE }, dtPngAt + 0.20);

    const dtEnd = dtPngAt + 0.85 + 4.0;
    tl.to(desktopImgRef.current, { opacity:0, duration:0.60, ease:FADE_EASE }, dtEnd);
  };

  return (
    <div
      ref={el => {
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position:'relative', width:W, maxWidth:'100%', height:H }}
    >
      <GlobalDefs/>

      {/* z=0 — connection lines */}
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
            stroke={`url(#s1lg${i})`} strokeWidth="1.8" fill="none"
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
          stroke="none" fill="none" opacity="0"/>
        <g ref={wireGrpRef} opacity="0">
          {WIRE.map((d, i) => (
            <path key={i} ref={r => (wireRefs.current[i] = r)} d={d}
              stroke="url(#s1pg_w)" strokeWidth="0.7" fill="rgba(59,130,246,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s1bgl)"/>
          ))}
        </g>
      </svg>

      {/* z=3 — desktop outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none', overflow:'visible' }}>
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

      {/* z=5 — mobile PNG overlay (on top of phone wireframe) */}
      <div
        ref={mobileRef}
        style={{
          position:'absolute',
          left:PHONE_X, top:PHONE_Y,
          width:PHONE_W, height:PHONE_H,
          borderRadius:PHONE_R,
          overflow:'hidden',
          opacity:0,
          zIndex:5,
          pointerEvents:'none',
          willChange:'opacity',
          boxShadow:'0 8px 36px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
          background:'#fff',
        }}
      >
        <Image
          src="/block 1/mobile.png"
          alt="Mobile app interface"
          fill
          sizes={`${PHONE_W}px`}
          priority
          style={{ objectFit:'cover', objectPosition:'center top' }}
        />
      </div>

      {/* z=6 — desktop browser window (Mac chrome + image) */}
      <div
        ref={desktopImgRef}
        style={{
          position:'absolute',
          left:DT_X, top:DT_Y,
          width:DT_W, height:DT_H,
          borderRadius:DT_R,
          overflow:'hidden',
          opacity:0,
          zIndex:6,
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
            src="/block 1/werertrttr.png"
            alt="Desktop dashboard interface"
            fill
            sizes={`${DT_W}px`}
            style={{ objectFit:'cover', objectPosition:'center top' }}
          />
        </div>
      </div>

      {/* Icons — outline always visible, active overlay GSAP-driven */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          ref={el => (iconRefs.current[i] = el)}
          style={{
            position:'absolute', left:ic.left, top:ic.top,
            width:ic.size, height:ic.size,
            zIndex: ic.layer === 'center' ? 4 : 7,
            pointerEvents:'none',
            willChange:'opacity',
          }}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el => (activeRefs.current[i] = el)}
            style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}
    </div>
  );
});
