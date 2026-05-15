'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const W = 540, H = 490;
const FX = 22, FY = 18, FW = 490, FH = 450, FR = 13;
const FX2 = FX + FW, FY2 = FY + FH;
const SBW = 170;
const FRAME_PERIM = Math.round(2*(FW-FR*2) + 2*(FH-FR*2) + 2*Math.PI*FR);
const FRAME_PATH = `M${FX+FR} ${FY}H${FX2-FR}Q${FX2} ${FY} ${FX2} ${FY+FR}V${FY2-FR}Q${FX2} ${FY2} ${FX2-FR} ${FY2}H${FX+FR}Q${FX} ${FY2} ${FX} ${FY2-FR}V${FY+FR}Q${FX} ${FY} ${FX+FR} ${FY}Z`;

const CY = FY + 34;
const CW = FX2 - (FX + SBW);
const CH = FY2 - CY;
const CellW = Math.floor((CW - 6) / 2);
const CellH = Math.floor((CH - 6) / 2);

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

const WIRE = [
  rp(FX+1, CY, SBW-2, FY2-CY, 0),
  rp(FX+3, CY+2, SBW-6, 27, 3),
  rp(FX+3, CY+31, SBW-6, 52, 2),
  rp(FX+3, CY+85, SBW-6, 52, 2),
  rp(FX+3, CY+139, SBW-6, 52, 2),
  rp(FX+3, CY+193, SBW-6, 52, 2),
  rp(FX+3, CY+247, SBW-6, 52, 2),
  rp(FX+3, FY2-30, SBW-6, 24, 4),
  rp(FX+SBW+2, CY+2, CellW, CellH, 5),
  rp(FX+SBW+2+CellW+4, CY+2, CellW, CellH, 5),
  rp(FX+SBW+2, CY+2+CellH+4, CellW, CellH, 5),
  rp(FX+SBW+2+CellW+4, CY+2+CellH+4, CellW, CellH, 5),
];

const ICONS = [
  { id:'cam',    left:0,   top:62,  size:68, layer:'outer'  }, // 0
  { id:'shield', left:0,   top:280, size:68, layer:'outer'  }, // 1
  { id:'ai',     left:464, top:50,  size:68, layer:'outer'  }, // 2
  { id:'play',   left:78,  top:158, size:62, layer:'center' }, // 3
  { id:'alert',  left:290, top:268, size:62, layer:'center' }, // 4
];

const CONNECTIONS = [
  'M 34 62 C 34 36 484 36 498 84',                    // 0: cam-top → ai (UP then RIGHT)
  'M 34 130 L 34 280',                                 // 1: cam-bottom → shield (straight DOWN)
  'M 68 314 L 290 314 C 321 314 321 301 321 299',     // 2: shield-right → alert (RIGHT then UP)
];

const PAIRS = [[0,2],[0,1],[1,4]];

const CSS = `@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute', overflow:'hidden' }}>
      <defs>
        <linearGradient id="s4ig_cam"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s4ig_shield" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s4ig_ai"     x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s4ig_play"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s4ig_alert"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
        <linearGradient id="s4lg0" x1="34" y1="62" x2="498" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s4lg1" x1="34" y1="130" x2="34" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="s4lg2" x1="68" y1="314" x2="321" y2="299" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s4pg_w" x1="0" y1="0" x2="1" y2="1">
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
    cam:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M17 9l5-3v12l-5-3V9z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    shield: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    ai:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M17 9l5-3v12l-5-3V9z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><circle cx="9.5" cy="12" r="2.5" stroke={c} strokeWidth="1.2"/></svg>,
    alert:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
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
    cam:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" fill="url(#s4ig_cam)"/><path d="M17 9l5-3v12l-5-3V9z" fill="url(#s4ig_cam)"/></svg>,
    shield: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#s4ig_shield)"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    ai:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="url(#s4ig_ai)"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="url(#s4ig_ai)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" fill="url(#s4ig_play)"/><path d="M17 9l5-3v12l-5-3V9z" fill="url(#s4ig_play)"/><circle cx="9.5" cy="12" r="2.5" fill="white"/></svg>,
    alert:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="url(#s4ig_alert)"/><path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#fff', boxShadow:'0 6px 24px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {inner[id]}
    </div>
  );
}

function RoadCam({ sky = '#87ceeb', style = {} }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 80" style={{ display:'block', ...style }}>
      <rect width="120" height="80" fill={sky}/>
      <path d="M0 45 Q30 36 60 42 Q90 48 120 38 L120 80 L0 80 Z" fill="#a3c47a" opacity="0.5"/>
      <rect x="0" y="52" width="120" height="28" fill="#7b8fa1"/>
      <path d="M28 80 L50 46 L70 46 L92 80 Z" fill="#64748b"/>
      <line x1="60" y1="80" x2="57" y2="58" stroke="white" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  );
}

function CabinCam({ variant = 1, style = {} }) {
  if (variant === 2) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 120 80" style={{ display:'block', ...style }}>
        <rect width="120" height="80" fill="#1a2535"/>
        <path d="M10 30 L30 12 L90 12 L110 30 L110 58 L10 58 Z" fill="#243248" opacity="0.7"/>
        <ellipse cx="60" cy="72" rx="19" ry="10" fill="#0d1520"/>
        <circle cx="60" cy="61" r="9" fill="#1a2535"/>
        <rect x="42" y="58" width="36" height="7" rx="3" fill="#2d3f55"/>
      </svg>
    );
  }
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 80" style={{ display:'block', ...style }}>
      <rect width="120" height="80" fill="#1e293b"/>
      <path d="M0 52 Q60 32 120 52 L120 80 L0 80 Z" fill="#0f172a"/>
      <ellipse cx="40" cy="73" rx="15" ry="9" fill="#0f172a"/>
      <circle cx="40" cy="63" r="7" fill="#1e293b"/>
      <ellipse cx="80" cy="73" rx="15" ry="9" fill="#0f172a"/>
      <circle cx="80" cy="63" r="7" fill="#1e293b"/>
    </svg>
  );
}

const drivers = [
  { name:'Driver 1', speed:'Moving - 55.00 KM/Hr', time:'06/01/2026 18:15:48', active:true },
  { name:'Driver 2', speed:'Moving - 55.00 KM/hr', time:'06/06/2026 18:18:48' },
  { name:'Driver 3', speed:'Moving - 55.00 KM/hr', time:'06/06/2026 18:18:48' },
  { name:'Driver 4', speed:'Moving - 55.00 KM/hr', time:'06/06/2026 18:15:48' },
  { name:'Driver 5', speed:'Moving - 90.00 KM/hr', time:'06/06/2026 15:01:08' },
];

export default forwardRef(function Scene4Pricing(_props, ref) {
  const activeRefs   = useRef([]);
  const lineRefs     = useRef([]);
  const framePathRef = useRef(null);
  const wireRefs     = useRef([]);
  const maskRef      = useRef(null);
  const shellRef     = useRef(null);
  const skelRef      = useRef(null);
  const revealRef    = useRef(null);
  const rowRefs      = useRef([]);
  const camRefs      = useRef([]);
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
    gsap.set(activeRefs.current.filter(Boolean), { opacity:0 });
    gsap.set(lineRefs.current.filter(Boolean),   { opacity:0 });
  };

  const play = () => {
    stop();
    resetIconsAndLines();
    gsap.set(maskRef.current,      { opacity:0 });
    gsap.set(framePathRef.current, { opacity:0, strokeDashoffset:FRAME_PERIM });
    gsap.set(shellRef.current,     { opacity:0 });
    gsap.set(skelRef.current,      { opacity:0 });
    gsap.set(revealRef.current,    { opacity:0 });
    gsap.set(rowRefs.current.filter(Boolean), { opacity:0, x:-6 });
    gsap.set(camRefs.current.filter(Boolean), { opacity:0, scale:0.92 });
    wireRefs.current.forEach(el => {
      if (!el) return;
      const len = (() => { try { return el.getTotalLength(); } catch { return 400; } })();
      gsap.set(el, { strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len, opacity:0 });
    });

    const tl = gsap.timeline();
    allTweens.current.push(tl);

    const CYCLE = 1.0;
    CONNECTIONS.forEach((_, i) => {
      const at = i * CYCLE;
      const [ia, ib] = PAIRS[i];
      const elA = activeRefs.current[ia];
      const elB = activeRefs.current[ib];
      const line = lineRefs.current[i];
      const offAt = at + CYCLE - 0.20;
      const nextPair = PAIRS[i + 1] || [];

      if (elA) tl.to(elA, { opacity:1, duration:0.18, ease:'power2.out' }, at);
      if (elB) tl.to(elB, { opacity:1, duration:0.18, ease:'power2.out' }, at);
      if (line) tl.to(line, { opacity:1, duration:0.22, ease:'power2.out' }, at + 0.14);
      if (line) tl.to(line, { opacity:0, duration:0.20, ease:'power1.in' }, offAt);
      if (elA && !nextPair.includes(ia)) tl.to(elA, { opacity:0, duration:0.18 }, offAt);
      if (elB && !nextPair.includes(ib)) tl.to(elB, { opacity:0, duration:0.18 }, offAt);
    });

    const frameAt = CONNECTIONS.length * CYCLE + 0.10;

    tl.to(maskRef.current, { opacity:1, duration:0.32, ease:'power2.out' }, frameAt);
    const centerEls = ICONS.map((ic, i) => ic.layer === 'center' ? activeRefs.current[i] : null).filter(Boolean);
    if (centerEls.length) tl.to(centerEls, { opacity:0, duration:0.28 }, frameAt);
    tl.to(framePathRef.current, { opacity:1, duration:0.10 }, frameAt + 0.05);
    tl.to(framePathRef.current, { strokeDashoffset:0, duration:1.10, ease:'power2.inOut' }, frameAt + 0.12);

    const wireAt = frameAt + 1.15;
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.16, ease:'power1.out' }, wireAt + 0.06 + i * 0.04);
    });

    const shellAt = wireAt + 0.90;
    tl.to(maskRef.current,                       { opacity:0, duration:0.30, ease:'power2.in'  }, shellAt);
    tl.to(shellRef.current,                      { opacity:1, duration:0.38                    }, shellAt - 0.05);
    tl.to(skelRef.current,                       { opacity:1, duration:0.24                    }, shellAt + 0.06);
    wireRefs.current.forEach(el => el && tl.to(el, { opacity:0, duration:0.26 }, shellAt + 0.08));
    tl.to(framePathRef.current,                  { opacity:0, duration:0.28                    }, shellAt + 0.10);
    tl.to(lineRefs.current.filter(Boolean),      { opacity:0, duration:0.24                    }, shellAt);
    tl.to(skelRef.current,                       { opacity:0, duration:0.32                    }, shellAt + 0.70);
    tl.to(revealRef.current,                     { opacity:1, duration:0.36                    }, shellAt + 0.72);
    tl.to(rowRefs.current.filter(Boolean), { opacity:1, x:0, duration:0.30, ease:'power2.out', stagger:0.05 }, shellAt + 0.82);
    tl.to(camRefs.current.filter(Boolean), { opacity:1, scale:1, duration:0.38, ease:'power2.out', stagger:0.09 }, shellAt + 1.0);

    const loopAt = shellAt + 1.0 + 0.38 + 0.27 + 2.0;
    tl.to(shellRef.current,                   { opacity:0, duration:0.45, ease:'power2.in' }, loopAt);
    tl.to(revealRef.current,                  { opacity:0, duration:0.35, ease:'power2.in' }, loopAt + 0.05);
    tl.to(activeRefs.current.filter(Boolean), { opacity:0, duration:0.30, ease:'power2.in' }, loopAt + 0.10);
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
      if (el) hoverTl.current.to(el, { opacity:1, duration:0.20, ease:'power2.out' }, 0);
    });
    const line = lineRefs.current[connIdx];
    if (line) hoverTl.current.to(line, { opacity:1, duration:0.22, ease:'power2.out' }, 0.10);
  };

  const handleHoverLeave = () => {
    if (!isHovered.current) return;
    isHovered.current = false;
    hoverTl.current?.kill();
    hoverTl.current = null;
    play();
  };

  let rIdx = 0, cIdx = 0;

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

      {/* z=0 — connection lines */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'visible' }}>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el=>(lineRefs.current[i]=el)} d={d}
            stroke={`url(#s4lg${i})`} strokeWidth="1.7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
        ))}
      </svg>

      {/* z=2 — frame outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s4pgl" x="-5%" y="-4%" width="110%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="s4bgl" x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={framePathRef} d={FRAME_PATH}
          stroke="url(#s4pg_w)" strokeWidth="1.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={FRAME_PERIM} strokeDashoffset={FRAME_PERIM}
          filter="url(#s4pgl)" opacity="0"/>
        {WIRE.map((d, i) => (
          <path key={i} ref={r=>(wireRefs.current[i]=r)} d={d}
            stroke="url(#s4pg_w)" strokeWidth="0.7" fill="rgba(59,130,246,0.02)"
            strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s4bgl)"/>
        ))}
      </svg>

      {/* Icons */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          style={{ position:'absolute', left:ic.left, top:ic.top, width:ic.size, height:ic.size,
            zIndex:ic.layer === 'center' ? 4 : 7, cursor:'pointer' }}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleHoverLeave}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el=>(activeRefs.current[i]=el)}
            style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}

      {/* z=5 mask */}
      <div ref={maskRef} style={{
        position:'absolute', left:FX, top:FY, width:FW, height:FH, borderRadius:FR,
        background:'#f5f7fa', zIndex:5, opacity:0, pointerEvents:'none',
      }}/>

      {/* z=6 shell — light theme */}
      <div ref={shellRef} style={{
        position:'absolute', left:FX, top:FY, width:FW, height:FH, borderRadius:FR,
        background:'#ffffff', boxShadow:'0 6px 28px rgba(0,0,0,0.08)',
        overflow:'hidden', opacity:0, zIndex:6,
      }}>
        <div style={{ height:34, background:'#f9fafb', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', padding:'0 12px', gap:6 }}>
          {[0,1,2].map(i=><div key={i} style={{ width:9, height:9, borderRadius:'50%', background:['#f87171','#fbbf24','#4ade80'][i] }}/>)}
          <div style={{ flex:1, height:19, borderRadius:4, background:'#f3f4f6', margin:'0 10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:8.5, color:'#9ca3af' }}>https://pro.mylocatorplus.com/</span>
          </div>
        </div>

        <div ref={skelRef} style={{ position:'absolute', inset:'34px 0 0 0', display:'flex', background:'#f8fafc', opacity:0 }}>
          <div style={{ width:SBW, borderRight:'1px solid #e5e7eb', padding:8, display:'flex', flexDirection:'column', gap:7 }}>
            {[0,1,2,3,4].map(j=>(
              <div key={j} style={{ display:'flex', flexDirection:'column', gap:4, paddingBottom:7, borderBottom:'1px solid #f3f4f6' }}>
                <div style={{ height:7, borderRadius:3, backgroundSize:'200%', animation:`shimmer 1.4s ease-in-out ${j*0.09}s infinite`, background:'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)' }}/>
                <div style={{ height:6, width:'60%', borderRadius:3, backgroundSize:'200%', animation:`shimmer 1.4s ease-in-out ${j*0.09+0.05}s infinite`, background:'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)' }}/>
              </div>
            ))}
          </div>
          <div style={{ flex:1, padding:5, display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr', gap:5 }}>
            {[0,1,2,3].map(j=>(
              <div key={j} style={{ borderRadius:5, background:'#e5e7eb' }}>
                <div style={{ padding:'5px 7px', fontSize:7, color:'#9ca3af' }}>Camera Channel-{j+1}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={revealRef} style={{ position:'absolute', inset:'34px 0 0 0', display:'flex', opacity:0 }}>
          <div style={{ width:SBW, borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column', background:'#fafafa' }}>
            <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb', padding:'5px 4px 0', gap:1 }}>
              {[{l:'13',s:'All',a:true},{l:'2',s:'Moving'},{l:'1',s:'Idle'},{l:'1',s:'Park'},{l:'0',s:'None'}].map(tab=>(
                <div key={tab.l} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'3px 1px 5px', borderBottom:tab.a?'2px solid #3b82f6':'2px solid transparent' }}>
                  <span style={{ fontSize:8.5, fontWeight:700, color:tab.a?'#3b82f6':'#9ca3af' }}>{tab.l}</span>
                  <span style={{ fontSize:5.5, color:tab.a?'#60a5fa':'#d1d5db', textAlign:'center' }}>{tab.s}</span>
                </div>
              ))}
            </div>
            <div style={{ flex:1, overflow:'hidden' }}>
              {drivers.map(d=>(
                <div key={d.name} ref={el=>(rowRefs.current[rIdx++]=el)}
                  style={{ padding:'6px 8px', borderBottom:'1px solid #f3f4f6', background:d.active?'#eff6ff':'transparent', opacity:0, willChange:'opacity,transform' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:2 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', flexShrink:0 }}/>
                    <span style={{ fontSize:8, fontWeight:700, color:d.active?'#1d4ed8':'#374151' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize:6.5, color:'#6b7280', display:'block', paddingLeft:10 }}>{d.speed}</span>
                  <span style={{ fontSize:6, color:'#9ca3af', display:'block', paddingLeft:10 }}>{d.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:1, background:'#f8fafc', padding:5, display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr', gap:5 }}>
            {[
              { label:'Camera Channel-1', type:'road', sky:'#87b4d8', v:1 },
              { label:'Camera Channel-2', type:'road', sky:'#a0c8e8', v:1 },
              { label:'Camera Channel-3', type:'cabin', v:2 },
              { label:'Camera Channel-4', type:'cabin', v:1 },
            ].map((cam, i)=>(
              <div key={i} ref={el=>(camRefs.current[cIdx++]=el)}
                style={{ borderRadius:5, background:cam.type==='road'?'#e2f0d9':'#1e293b', overflow:'hidden', position:'relative', border:'1px solid #e5e7eb', opacity:0, willChange:'opacity,transform' }}>
                <div style={{ position:'absolute', top:4, left:6, right:6, display:'flex', justifyContent:'space-between', zIndex:2 }}>
                  <span style={{ fontSize:6, color:cam.type==='road'?'rgba(0,0,0,0.5)':'rgba(255,255,255,0.6)', fontWeight:500 }}>{cam.label}</span>
                  <div style={{ display:'flex', gap:3 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:'#ef4444' }}/>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:'#d1d5db' }}/>
                  </div>
                </div>
                {cam.type==='road' && <RoadCam sky={cam.sky} style={{ position:'absolute', inset:0 }}/>}
                {cam.type==='cabin' && <CabinCam variant={cam.v} style={{ position:'absolute', inset:0 }}/>}
                <div style={{ position:'absolute', bottom:3, left:5, fontSize:5.5, color:cam.type==='road'?'rgba(0,0,0,0.4)':'rgba(255,255,255,0.45)' }}>07/01/2026 18:15:48</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
