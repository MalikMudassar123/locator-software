'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// ─── Browser-frame geometry ──────────────────────────────────────────────────
const W = 540, H = 490;
const FX = 48, FY = 22, FW = 428, FH = 448, FR = 12;
const FX2 = FX + FW, FY2 = FY + FH;
const FRAME_PERIM = Math.round(2 * (FW - FR * 2) + 2 * (FH - FR * 2) + 2 * Math.PI * FR);

const FRAME_PATH =
  `M${FX+FR} ${FY} H${FX2-FR} Q${FX2} ${FY} ${FX2} ${FY+FR}` +
  ` V${FY2-FR} Q${FX2} ${FY2} ${FX2-FR} ${FY2}` +
  ` H${FX+FR} Q${FX} ${FY2} ${FX} ${FY2-FR}` +
  ` V${FY+FR} Q${FX} ${FY} ${FX+FR} ${FY} Z`;

const SBW = 136; // sidebar width
const CY  = FY + 33;
const CW  = FX2 - (FX + SBW);
const CH  = FY2 - CY;

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

// Wireframe skeleton: header + sidebar + 4 KPI cards + chart area
const WIRE = [
  rp(FX+1,       FY+1,          FW-2, 31, FR-1),              // title bar
  rp(FX+1,       CY,            SBW-2, CH, 0),                 // sidebar block
  ...[0,1,2,3].map(j => rp(FX+3, CY+4+j*26, SBW-6, 18, 3)),  // sidebar nav items
  // 4 KPI cards
  ...Array.from({ length: 4 }, (_, k) => rp(FX+SBW+4+k*(Math.floor((CW-12)/4)+3), CY+4, Math.floor((CW-12)/4), 46, 4)),
  rp(FX+SBW+4, CY+58, CW-8, CH-64, 5),                        // chart area
];

// ─── Floating icon positions ──────────────────────────────────────────────────
const ICONS = [
  { id: 'analytics', left: 0,   top: 58,  size: 66, layer: 'outer'  }, // 0
  { id: 'car',       left: 0,   top: 238, size: 66, layer: 'outer'  }, // 1
  { id: 'bell',      left: 472, top: 46,  size: 66, layer: 'outer'  }, // 2
  { id: 'grid',      left: 78,  top: 92,  size: 62, layer: 'center' }, // 3
  { id: 'pie',       left: 312, top: 222, size: 62, layer: 'center' }, // 4
];

const CONNECTIONS = [
  'M 33 58 C 33 36 491 36 505 79',
  'M 33 124 L 33 271',
  'M 66 271 L 312 271 C 343 271 343 255 343 253',
];
const PAIRS = [[0,2],[0,1],[1,4]];

const CSS = `@keyframes fsdb_shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
      <defs>
        <linearGradient id="fsdb_analytics" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
        <linearGradient id="fsdb_car"       x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6d28d9"/><stop offset="100%" stopColor="#a855f7"/></linearGradient>
        <linearGradient id="fsdb_bell"      x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#c084fc"/></linearGradient>
        <linearGradient id="fsdb_grid"      x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient>
        <linearGradient id="fsdb_pie"       x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a855f7"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient>
        <linearGradient id="fsdb_l0" x1="33" y1="58" x2="505" y2="79" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#c084fc"/></linearGradient>
        <linearGradient id="fsdb_l1" x1="33" y1="124" x2="33" y2="271" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#6d28d9"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
        <linearGradient id="fsdb_l2" x1="66" y1="271" x2="343" y2="253" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#a855f7"/></linearGradient>
        <linearGradient id="fsdb_ph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#a855f7"/></linearGradient>
        <linearGradient id="fsdb_bar" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6"/></linearGradient>
        <linearGradient id="fsdb_line" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#c084fc"/></linearGradient>
      </defs>
    </svg>
  );
}

function Sk({ w, h, br = 5, delay = 0, style = {} }) {
  return <div style={{
    width: w, height: h, borderRadius: br, flexShrink: 0,
    background: 'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)',
    backgroundSize: '200%',
    animation: `fsdb_shimmer 1.6s ease-in-out ${delay}s infinite`,
    ...style,
  }}/>;
}

function InactiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.50);
  const c = '#c8d0dc';
  const shapes = {
    analytics: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    car:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 11l1.5-4h11l1.5 4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="11" width="18" height="7" rx="2" stroke={c} strokeWidth="1.5"/><circle cx="7.5" cy="18" r="2" stroke={c} strokeWidth="1.2"/><circle cx="16.5" cy="18" r="2" stroke={c} strokeWidth="1.2"/></svg>,
    bell:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    grid:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/></svg>,
    pie:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21.21 15.89A10 10 0 118 2.83" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M22 12A10 10 0 0012 2v10z" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
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
    analytics: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="url(#fsdb_analytics)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    car:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 11l1.5-4h11l1.5 4" stroke="url(#fsdb_car)" strokeWidth="1.4" strokeLinecap="round"/><rect x="3" y="11" width="18" height="7" rx="2" fill="url(#fsdb_car)"/><circle cx="7.5" cy="18" r="2" fill="white"/><circle cx="16.5" cy="18" r="2" fill="white"/></svg>,
    bell:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" fill="url(#fsdb_bell)"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="url(#fsdb_bell)" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    grid:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#f87171"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#a855f7"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fb923c"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="url(#fsdb_grid)"/></svg>,
    pie:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21.21 15.89A10 10 0 118 2.83" fill="url(#fsdb_pie)" opacity="0.6"/><path d="M22 12A10 10 0 0012 2v10z" fill="url(#fsdb_pie)"/></svg>,
  };
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: '#fff', boxShadow: '0 6px 24px rgba(124,58,237,0.18), 0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {inner[id]}
    </div>
  );
}

// ─── Analytics dashboard data ──────────────────────────────────────────────────
const kpis = [
  { label: 'Total Vehicles', value: '24', sub: '+2 this month', color: '#7c3aed' },
  { label: 'Moving',         value: '18', sub: '75% of fleet',  color: '#22c55e' },
  { label: 'Idle',           value: '4',  sub: '2 hrs avg',     color: '#f59e0b' },
  { label: 'Stopped',        value: '2',  sub: 'Since 14:30',   color: '#ef4444' },
];

const bars = [62, 88, 45, 75, 92, 58, 80]; // bar heights %
const navItems = ['Dashboard', 'Live Map', 'Vehicles', 'Reports', 'Alerts', 'Settings'];

export default forwardRef(function SceneDashboard(_props, ref) {
  const activeRefs   = useRef([]);
  const lineRefs     = useRef([]);
  const frameOutRef  = useRef(null);
  const wireRefs     = useRef([]);
  const wireGrpRef   = useRef(null);
  const maskRef      = useRef(null);
  const shellRef     = useRef(null);
  const skelRef      = useRef(null);
  const realRef      = useRef(null);
  const kpiRefs      = useRef([]);
  const allTweens    = useRef([]);
  const hoverTl      = useRef(null);
  const isHovered    = useRef(false);

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
    gsap.set(kpiRefs.current.filter(Boolean), { opacity: 0, y: 8 });
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
      tl.to(p, { opacity: 1, strokeDashoffset: 0, duration: 0.16, ease: 'power1.out' }, wireAt + 0.06 + i * 0.04);
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
    tl.to(kpiRefs.current.filter(Boolean), { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', stagger: 0.07 }, shellAt + 0.82);

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

  let kIdx = 0;

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
            stroke={`url(#fsdb_l${i})`} strokeWidth="1.7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
        ))}
      </svg>

      {/* z=2 — frame outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'visible' }}>
        <defs>
          <filter id="fsdb_pgl" x="-5%" y="-4%" width="110%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fsdb_bgl" x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={frameOutRef} d={FRAME_PATH}
          stroke="url(#fsdb_ph)" strokeWidth="1.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={FRAME_PERIM} strokeDashoffset={FRAME_PERIM}
          filter="url(#fsdb_pgl)" opacity="0"/>
        <g ref={wireGrpRef} opacity="0">
          {WIRE.map((d, i) => (
            <path key={i} ref={r => (wireRefs.current[i] = r)} d={d}
              stroke="url(#fsdb_ph)" strokeWidth="0.7" fill="rgba(124,58,237,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#fsdb_bgl)"/>
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
            <span style={{ fontSize: 8.5, color: '#9ca3af' }}>pro.mylocatorplus.com/dashboard</span>
          </div>
        </div>

        {/* Skeleton loading */}
        <div ref={skelRef} style={{ position: 'absolute', inset: '33px 0 0 0', display: 'flex', opacity: 0 }}>
          <div style={{ width: SBW, background: '#f9fafb', borderRight: '1px solid #f3f4f6', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {navItems.map((_,j) => <Sk key={j} w="85%" h={8} br={4} delay={j * 0.06}/>)}
          </div>
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
              {[0,1,2,3].map(j => <Sk key={j} w="100%" h={44} br={5} delay={j * 0.08}/>)}
            </div>
            <Sk w="100%" h={CH - 62} br={5} style={{ flex: 1 }} delay={0.3}/>
          </div>
        </div>

        {/* Real dashboard UI */}
        <div ref={realRef} style={{ position: 'absolute', inset: '33px 0 0 0', display: 'flex', opacity: 0 }}>
          {/* Sidebar */}
          <div style={{ width: SBW, background: '#fafafa', borderRight: '1px solid #f3f4f6', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 7.5, fontWeight: 800, color: '#7c3aed', marginBottom: 8, padding: '0 4px' }}>FleetView</div>
            {navItems.map((label, j) => (
              <div key={label} style={{
                padding: '5px 8px', borderRadius: 5, fontSize: 8,
                color: j === 0 ? '#7c3aed' : '#6b7280',
                background: j === 0 ? '#ede9fe' : 'transparent',
                fontWeight: j === 0 ? 700 : 400,
              }}>
                {label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, background: '#f8fafc', padding: '10px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
              {kpis.map((kpi, k) => (
                <div key={k} ref={el => (kpiRefs.current[kIdx++] = el)}
                  style={{ background: '#fff', borderRadius: 6, border: '1px solid #f1f5f9', padding: '7px 8px', opacity: 0, willChange: 'opacity,transform' }}>
                  <div style={{ fontSize: 6.5, color: '#94a3b8', marginBottom: 3 }}>{kpi.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</div>
                  <div style={{ fontSize: 6, color: '#9ca3af', marginTop: 3 }}>{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 7, border: '1px solid #f1f5f9', padding: '10px 12px', overflow: 'hidden' }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Daily Distance (km)</div>
              {/* Bar chart SVG */}
              <svg width="100%" height="120" viewBox="0 0 330 120" style={{ display: 'block' }}>
                {/* Horizontal grid */}
                {[0,30,60,90,120].map(y => (
                  <line key={y} x1="0" y1={120-y} x2="330" y2={120-y} stroke="#f1f5f9" strokeWidth="1"/>
                ))}
                {/* Y-axis labels */}
                {[0,50,100,150,200].map((v,i) => (
                  <text key={v} x="0" y={120-i*30+4} fontSize="7" fill="#9ca3af" fontFamily="sans-serif">{v}</text>
                ))}
                {/* Bars */}
                {bars.map((h, i) => {
                  const bw = 32, gap = 14, x = 20 + i * (bw + gap);
                  const barH = Math.round(h * 1.1);
                  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
                  return (
                    <g key={i}>
                      <rect x={x} y={120-barH} width={bw} height={barH} rx="3" fill="url(#fsdb_bar)" opacity="0.85"/>
                      <text x={x + bw/2} y="118" textAnchor="middle" fontSize="7" fill="#9ca3af" fontFamily="sans-serif">{days[i]}</text>
                    </g>
                  );
                })}
                {/* Trend line */}
                <polyline
                  points={bars.map((h, i) => `${20+(i*(32+14))+(32/2)},${120-Math.round(h*1.1)}`).join(' ')}
                  fill="none" stroke="url(#fsdb_line)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
