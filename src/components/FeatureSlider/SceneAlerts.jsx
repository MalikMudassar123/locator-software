'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// ─── Browser-frame geometry (same outer size, different sidebar) ───────────────
const W = 540, H = 490;
const FX = 48, FY = 22, FW = 428, FH = 448, FR = 12;
const FX2 = FX + FW, FY2 = FY + FH;
const FRAME_PERIM = Math.round(2 * (FW - FR * 2) + 2 * (FH - FR * 2) + 2 * Math.PI * FR);

const FRAME_PATH =
  `M${FX+FR} ${FY} H${FX2-FR} Q${FX2} ${FY} ${FX2} ${FY+FR}` +
  ` V${FY2-FR} Q${FX2} ${FY2} ${FX2-FR} ${FY2}` +
  ` H${FX+FR} Q${FX} ${FY2} ${FX} ${FY2-FR}` +
  ` V${FY+FR} Q${FX} ${FY} ${FX+FR} ${FY} Z`;

const SBW = 120; // narrow category sidebar
const CY  = FY + 33;
const CW  = FX2 - (FX + SBW);

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

const WIRE = [
  rp(FX+1,   FY+1,    FW-2, 31, FR-1),               // title bar
  rp(FX+1,   CY,      SBW-2, FY2-CY, 0),             // sidebar block
  ...[0,1,2,3,4].map(j => rp(FX+3, CY+4+j*26, SBW-6, 18, 3)), // sidebar items
  ...[0,1,2,3,4,5].map(j => rp(FX+SBW+4, CY+4+j*55, CW-8, 46, 4)), // alert rows
];

// ─── Floating icon positions ──────────────────────────────────────────────────
const ICONS = [
  { id: 'bell',     left: 0,   top: 58,  size: 66, layer: 'outer'  }, // 0
  { id: 'warning',  left: 0,   top: 238, size: 66, layer: 'outer'  }, // 1
  { id: 'calendar', left: 472, top: 46,  size: 66, layer: 'outer'  }, // 2
  { id: 'list',     left: 78,  top: 92,  size: 62, layer: 'center' }, // 3
  { id: 'clock',    left: 312, top: 222, size: 62, layer: 'center' }, // 4
];

const CONNECTIONS = [
  'M 33 58 C 33 36 491 36 505 79',
  'M 33 124 L 33 271',
  'M 66 271 L 312 271 C 343 271 343 255 343 253',
];
const PAIRS = [[0,2],[0,1],[1,4]];

const CSS = `@keyframes fsalt_shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
      <defs>
        <linearGradient id="fsalt_bell"     x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#10b981"/></linearGradient>
        <linearGradient id="fsalt_warning"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d97706"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient>
        <linearGradient id="fsalt_calendar" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#34d399"/></linearGradient>
        <linearGradient id="fsalt_list"     x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#047857"/><stop offset="100%" stopColor="#059669"/></linearGradient>
        <linearGradient id="fsalt_clock"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#34d399"/></linearGradient>
        <linearGradient id="fsalt_l0" x1="33" y1="58" x2="505" y2="79" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#34d399"/></linearGradient>
        <linearGradient id="fsalt_l1" x1="33" y1="124" x2="33" y2="271" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#047857"/><stop offset="100%" stopColor="#10b981"/></linearGradient>
        <linearGradient id="fsalt_l2" x1="66" y1="271" x2="343" y2="253" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#d97706"/><stop offset="100%" stopColor="#059669"/></linearGradient>
        <linearGradient id="fsalt_ph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#10b981"/></linearGradient>
      </defs>
    </svg>
  );
}

function Sk({ w, h, br = 5, delay = 0, style = {} }) {
  return <div style={{
    width: w, height: h, borderRadius: br, flexShrink: 0,
    background: 'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)',
    backgroundSize: '200%',
    animation: `fsalt_shimmer 1.6s ease-in-out ${delay}s infinite`,
    ...style,
  }}/>;
}

function InactiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.50);
  const c = '#c8d0dc';
  const shapes = {
    bell:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    warning:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    calendar: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5"/><line x1="16" y1="2" x2="16" y2="6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke={c} strokeWidth="1.5"/></svg>,
    list:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><line x1="8" y1="6" x2="21" y2="6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="12" x2="21" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="18" x2="21" y2="18" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="6" x2="3.01" y2="6" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="12" x2="3.01" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="3.01" y2="18" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
    clock:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5"/><polyline points="12 6 12 12 16 14" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: '#f8fafc', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {shapes[id]}
    </div>
  );
}

function ActiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.52);
  const inner = {
    bell:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" fill="url(#fsalt_bell)"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="url(#fsalt_bell)" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    warning:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="url(#fsalt_warning)"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
    calendar: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" fill="url(#fsalt_calendar)" opacity="0.8"/><line x1="16" y1="2" x2="16" y2="6" stroke="url(#fsalt_calendar)" strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="url(#fsalt_calendar)" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="1.5" opacity="0.8"/></svg>,
    list:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><line x1="8" y1="6" x2="21" y2="6" stroke="url(#fsalt_list)" strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="12" x2="21" y2="12" stroke="url(#fsalt_list)" strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="18" x2="21" y2="18" stroke="url(#fsalt_list)" strokeWidth="1.8" strokeLinecap="round"/><circle cx="3" cy="6" r="1.5" fill="url(#fsalt_list)"/><circle cx="3" cy="12" r="1.5" fill="url(#fsalt_list)"/><circle cx="3" cy="18" r="1.5" fill="url(#fsalt_list)"/></svg>,
    clock:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="url(#fsalt_clock)" opacity="0.15" stroke="url(#fsalt_clock)" strokeWidth="1.5"/><polyline points="12 6 12 12 16 14" stroke="url(#fsalt_clock)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: '#fff', boxShadow: '0 6px 24px rgba(5,150,105,0.18), 0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {inner[id]}
    </div>
  );
}

// ─── Alert data ────────────────────────────────────────────────────────────────
const alerts = [
  { type: 'Speeding',     vehicle: 'Ibrahim Sales 31280', msg: 'Exceeded 120 KM/H on Sheikh Zayed Rd',   time: '18:15', color: '#ef4444', dot: '#fef2f2', badge: '#fee2e2' },
  { type: 'Idle',         vehicle: 'George 00056',        msg: 'Vehicle idle for 45 minutes',             time: '18:02', color: '#f59e0b', dot: '#fffbeb', badge: '#fef3c7' },
  { type: 'Geofence',     vehicle: 'Ahmed Tech 49876',    msg: 'Left Zone: Abu Dhabi Industrial Area',    time: '17:48', color: '#3b82f6', dot: '#eff6ff', badge: '#dbeafe' },
  { type: 'Maintenance',  vehicle: 'Jamal Fleet 77421',   msg: 'Oil change due in 200 KM',               time: '17:30', color: '#8b5cf6', dot: '#f5f3ff', badge: '#ede9fe' },
  { type: 'After-Hours',  vehicle: 'David Oman 20378',    msg: 'Vehicle moving outside working hours',    time: '17:12', color: '#059669', dot: '#f0fdf4', badge: '#dcfce7' },
];

const categories = [
  { label: 'All Alerts',   count: 12, active: true  },
  { label: 'Speeding',     count: 3,  active: false },
  { label: 'Idle',         count: 4,  active: false },
  { label: 'Geofence',     count: 2,  active: false },
  { label: 'Maintenance',  count: 2,  active: false },
  { label: 'After-Hours',  count: 1,  active: false },
];

export default forwardRef(function SceneAlerts(_props, ref) {
  const activeRefs  = useRef([]);
  const lineRefs    = useRef([]);
  const frameOutRef = useRef(null);
  const wireRefs    = useRef([]);
  const wireGrpRef  = useRef(null);
  const maskRef     = useRef(null);
  const shellRef    = useRef(null);
  const skelRef     = useRef(null);
  const realRef     = useRef(null);
  const rowRefs     = useRef([]);
  const allTweens   = useRef([]);
  const hoverTl     = useRef(null);
  const isHovered   = useRef(false);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  const stop = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
    hoverTl.current?.kill();
    hoverTl.current = null;
  };

  const resetIconsAndLines = () => {
    gsap.set(activeRefs.current.filter(Boolean), { opacity: 0 });
    gsap.set(lineRefs.current.filter(Boolean),   { opacity: 0 });
  };

  const play = () => {
    stop();
    resetIconsAndLines();
    gsap.set(maskRef.current,     { opacity: 0 });
    gsap.set(wireGrpRef.current,  { opacity: 0 });
    gsap.set(frameOutRef.current, { opacity: 0, strokeDashoffset: FRAME_PERIM });
    gsap.set(shellRef.current,    { opacity: 0 });
    gsap.set(skelRef.current,     { opacity: 0 });
    gsap.set(realRef.current,     { opacity: 0 });
    gsap.set(rowRefs.current.filter(Boolean), { opacity: 0, x: -8 });
    wireRefs.current.forEach(p => {
      if (!p) return;
      const len = (() => { try { return p.getTotalLength(); } catch { return 400; } })();
      gsap.set(p, { strokeDasharray: `${len} ${len + 1}`, strokeDashoffset: len, opacity: 0 });
    });

    const tl = gsap.timeline();
    allTweens.current.push(tl);

    const CYCLE = 1.0;
    CONNECTIONS.forEach((_, i) => {
      const at   = i * CYCLE;
      const [ia, ib] = PAIRS[i];
      const elA  = activeRefs.current[ia];
      const elB  = activeRefs.current[ib];
      const line = lineRefs.current[i];
      const offAt = at + CYCLE - 0.20;
      const nextPair = PAIRS[i + 1] || [];

      if (elA) tl.to(elA, { opacity: 1, duration: 0.18, ease: 'power2.out' }, at);
      if (elB) tl.to(elB, { opacity: 1, duration: 0.18, ease: 'power2.out' }, at);
      if (line) tl.to(line, { opacity: 1, duration: 0.22, ease: 'power2.out' }, at + 0.14);
      if (line) tl.to(line, { opacity: 0, duration: 0.20, ease: 'power1.in' }, offAt);
      if (elA && !nextPair.includes(ia)) tl.to(elA, { opacity: 0, duration: 0.18 }, offAt);
      if (elB && !nextPair.includes(ib)) tl.to(elB, { opacity: 0, duration: 0.18 }, offAt);
    });

    const frameAt = CONNECTIONS.length * CYCLE + 0.10;

    tl.to(maskRef.current, { opacity: 1, duration: 0.32, ease: 'power2.out' }, frameAt);
    const centerEls = ICONS.map((ic, i) => ic.layer === 'center' ? activeRefs.current[i] : null).filter(Boolean);
    if (centerEls.length) tl.to(centerEls, { opacity: 0, duration: 0.28 }, frameAt);
    tl.to(frameOutRef.current, { opacity: 1, duration: 0.10 }, frameAt + 0.05);
    tl.to(frameOutRef.current, { strokeDashoffset: 0, duration: 1.10, ease: 'power2.inOut' }, frameAt + 0.12);

    const wireAt = frameAt + 1.15;
    tl.to(wireGrpRef.current, { opacity: 1, duration: 0.08 }, wireAt);
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity: 1, strokeDashoffset: 0, duration: 0.16, ease: 'power1.out' }, wireAt + 0.06 + i * 0.035);
    });

    const shellAt = wireAt + 0.90;
    tl.to(maskRef.current,     { opacity: 0, duration: 0.30, ease: 'power2.in'  }, shellAt);
    tl.to(shellRef.current,    { opacity: 1, duration: 0.38                    }, shellAt - 0.05);
    tl.to(skelRef.current,     { opacity: 1, duration: 0.24                    }, shellAt + 0.06);
    tl.to(wireGrpRef.current,  { opacity: 0, duration: 0.26                    }, shellAt + 0.08);
    tl.to(frameOutRef.current, { opacity: 0, duration: 0.28                    }, shellAt + 0.10);
    tl.to(lineRefs.current.filter(Boolean), { opacity: 0, duration: 0.24       }, shellAt);
    tl.to(skelRef.current,     { opacity: 0, duration: 0.32                    }, shellAt + 0.70);
    tl.to(realRef.current,     { opacity: 1, duration: 0.36                    }, shellAt + 0.72);
    tl.to(rowRefs.current.filter(Boolean), { opacity: 1, x: 0, duration: 0.30, ease: 'power2.out', stagger: 0.07 }, shellAt + 0.82);

    const loopAt = shellAt + 0.82 + 0.60 + 2.0;
    tl.to(shellRef.current,                   { opacity: 0, duration: 0.45, ease: 'power2.in' }, loopAt);
    tl.to(realRef.current,                    { opacity: 0, duration: 0.35, ease: 'power2.in' }, loopAt + 0.05);
    tl.to(activeRefs.current.filter(Boolean), { opacity: 0, duration: 0.30                    }, loopAt + 0.10);
    tl.add(() => { if (!isHovered.current) play(); }, loopAt + 0.55);
  };

  const handleHover = (iconIdx) => {
    if (isHovered.current) return;
    isHovered.current = true;
    allTweens.current.forEach(t => t?.pause?.());
    resetIconsAndLines();
    const connIdx = PAIRS.findIndex(p => p.includes(iconIdx));
    if (connIdx < 0) return;
    hoverTl.current = gsap.timeline();
    PAIRS[connIdx].forEach(idx => {
      const el = activeRefs.current[idx];
      if (el) hoverTl.current.to(el, { opacity: 1, duration: 0.20, ease: 'power2.out' }, 0);
    });
    const line = lineRefs.current[connIdx];
    if (line) hoverTl.current.to(line, { opacity: 1, duration: 0.22, ease: 'power2.out' }, 0.10);
  };

  const handleHoverLeave = () => {
    if (!isHovered.current) return;
    isHovered.current = false;
    hoverTl.current?.kill();
    hoverTl.current = null;
    play();
  };

  let rIdx = 0;

  return (
    <div
      ref={el => {
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position: 'relative', width: W, maxWidth: '100%', height: H }}
    >
      <style>{CSS}</style>
      <GlobalDefs/>

      {/* z=0 — connection lines */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el => (lineRefs.current[i] = el)} d={d}
            stroke={`url(#fsalt_l${i})`} strokeWidth="1.7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
        ))}
      </svg>

      {/* z=2 — frame outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'visible' }}>
        <defs>
          <filter id="fsalt_pgl" x="-5%" y="-4%" width="110%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fsalt_bgl" x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={frameOutRef} d={FRAME_PATH}
          stroke="url(#fsalt_ph)" strokeWidth="1.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={FRAME_PERIM} strokeDashoffset={FRAME_PERIM}
          filter="url(#fsalt_pgl)" opacity="0"/>
        <g ref={wireGrpRef} opacity="0">
          {WIRE.map((d, i) => (
            <path key={i} ref={r => (wireRefs.current[i] = r)} d={d}
              stroke="url(#fsalt_ph)" strokeWidth="0.7" fill="rgba(5,150,105,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#fsalt_bgl)"/>
          ))}
        </g>
      </svg>

      {/* Icon tiles */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          style={{
            position: 'absolute', left: ic.left, top: ic.top,
            width: ic.size, height: ic.size,
            zIndex: ic.layer === 'center' ? 4 : 7,
            cursor: 'pointer',
          }}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleHoverLeave}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el => (activeRefs.current[i] = el)}
            style={{ position: 'absolute', inset: 0, opacity: 0, willChange: 'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}

      {/* z=5 mask */}
      <div ref={maskRef} style={{
        position: 'absolute', left: FX, top: FY, width: FW, height: FH, borderRadius: FR,
        background: '#f5f7fa', zIndex: 5, opacity: 0, pointerEvents: 'none',
      }}/>

      {/* z=6 browser shell */}
      <div ref={shellRef} style={{
        position: 'absolute', left: FX, top: FY, width: FW, height: FH, borderRadius: FR,
        background: '#ffffff', overflow: 'hidden', opacity: 0, zIndex: 6,
        boxShadow: '0 6px 28px rgba(0,0,0,0.09)',
      }}>
        {/* Browser chrome */}
        <div style={{ height: 33, background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: ['#f87171','#fbbf24','#4ade80'][i] }}/>)}
          <div style={{ flex: 1, height: 18, borderRadius: 4, background: '#f3f4f6', margin: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 8.5, color: '#9ca3af' }}>pro.mylocatorplus.com/alerts</span>
          </div>
        </div>

        {/* Skeleton */}
        <div ref={skelRef} style={{ position: 'absolute', inset: '33px 0 0 0', display: 'flex', opacity: 0 }}>
          <div style={{ width: SBW, background: '#f9fafb', borderRight: '1px solid #f3f4f6', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[0,1,2,3,4,5].map(j => <Sk key={j} w="85%" h={8} br={4} delay={j * 0.06}/>)}
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[0,1,2,3,4].map(j => <Sk key={j} w="100%" h={44} br={5} delay={j * 0.07}/>)}
          </div>
        </div>

        {/* Real alerts UI */}
        <div ref={realRef} style={{ position: 'absolute', inset: '33px 0 0 0', display: 'flex', opacity: 0 }}>
          {/* Category sidebar */}
          <div style={{ width: SBW, background: '#fafafa', borderRight: '1px solid #f3f4f6', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, padding: '0 4px' }}>
              Categories
            </div>
            {categories.map((cat, k) => (
              <div key={cat.label} style={{
                padding: '5px 8px', borderRadius: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: cat.active ? '#f0fdf4' : 'transparent',
              }}>
                <span style={{ fontSize: 7.5, color: cat.active ? '#059669' : '#6b7280', fontWeight: cat.active ? 700 : 400 }}>{cat.label}</span>
                <span style={{ fontSize: 7, color: cat.active ? '#059669' : '#9ca3af', fontWeight: 700 }}>{cat.count}</span>
              </div>
            ))}
          </div>

          {/* Alert list */}
          <div style={{ flex: 1, background: '#f8fafc', padding: '8px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
            {/* Header row */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 2 }}>
              {['All','Unread','Critical'].map((label, k) => (
                <div key={label} style={{
                  fontSize: 7.5, padding: '3px 8px', borderRadius: 4,
                  background: k === 0 ? '#059669' : '#f1f5f9',
                  color: k === 0 ? '#fff' : '#6b7280',
                  fontWeight: k === 0 ? 700 : 400,
                }}>
                  {label}
                </div>
              ))}
            </div>

            {/* Alert rows */}
            {alerts.map((alert, k) => (
              <div key={k} ref={el => (rowRefs.current[rIdx++] = el)}
                style={{
                  background: '#fff', borderRadius: 6, padding: '7px 10px',
                  border: '1px solid #f1f5f9',
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  opacity: 0, willChange: 'opacity,transform',
                }}>
                {/* Type badge */}
                <div style={{
                  padding: '2px 7px', borderRadius: 4, fontSize: 6.5, fontWeight: 700,
                  background: alert.badge, color: alert.color,
                  flexShrink: 0, marginTop: 2, whiteSpace: 'nowrap',
                }}>
                  {alert.type}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#111827', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {alert.vehicle}
                  </div>
                  <div style={{ fontSize: 7.5, color: '#6b7280', lineHeight: 1.4 }}>
                    {alert.msg}
                  </div>
                </div>
                <span style={{ fontSize: 7, color: '#9ca3af', flexShrink: 0, marginTop: 2 }}>{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
