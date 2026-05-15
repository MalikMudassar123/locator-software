'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const W = 540, H = 490;
const FX = 48, FY = 22, FW = 428, FH = 448, FR = 12;
const FX2 = FX + FW, FY2 = FY + FH;
const FRAME_PERIM = Math.round(2*(FW-FR*2) + 2*(FH-FR*2) + 2*Math.PI*FR);

const FRAME_PATH =
  `M${FX+FR} ${FY} H${FX2-FR} Q${FX2} ${FY} ${FX2} ${FY+FR}` +
  ` V${FY2-FR} Q${FX2} ${FY2} ${FX2-FR} ${FY2}` +
  ` H${FX+FR} Q${FX} ${FY2} ${FX} ${FY2-FR}` +
  ` V${FY+FR} Q${FX} ${FY} ${FX+FR} ${FY} Z`;

function rp(x,y,w,h,r=0) {
  if(!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

const WIRE = [
  rp(FX+1, FY+1, FW-2, 33, FR-1),
  rp(FX+1, FY+34, 173, FH-35, 0),
  ...[0,1,2,3,4].map(i => rp(FX+8, FY+50+i*66, 160, 58, 4)),
  rp(FX+8, FY+FH-32, 160, 22, 4),
  rp(FX+176, FY+34, FW-177, FH-35, 0),
  ...[1,2,3].map(i => rp(FX+178, FY+34+i*100, FW-180, 1, 0)),
  rp(FX+220, FY+80,  10, 10, 5),
  rp(FX+350, FY+120, 10, 10, 5),
  rp(FX+280, FY+220, 10, 10, 5),
  rp(FX+400, FY+300, 10, 10, 5),
];

const ICONS = [
  { id:'map',    left:0,   top:58,  size:66, layer:'outer'  }, // 0
  { id:'car',    left:0,   top:238, size:66, layer:'outer'  }, // 1
  { id:'filter', left:472, top:46,  size:66, layer:'outer'  }, // 2
  { id:'dash',   left:78,  top:92,  size:62, layer:'center' }, // 3
  { id:'grid',   left:312, top:222, size:62, layer:'center' }, // 4
];

const CONNECTIONS = [
  'M 33 58 C 33 36 491 36 505 79',                    // 0: map-top → filter (UP then RIGHT)
  'M 33 124 L 33 271',                                 // 1: map-bottom → car (straight DOWN)
  'M 66 271 L 312 271 C 343 271 343 255 343 253',     // 2: car-right → grid (RIGHT then UP)
];

const PAIRS = [[0,2],[0,1],[1,4]];

const CSS = `@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute', overflow:'hidden' }}>
      <defs>
        <linearGradient id="s2ig_map"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s2ig_car"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s2ig_filter" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s2ig_dash"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s2ig_grid"   x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s2lg0" x1="33" y1="58" x2="505" y2="79" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s2lg1" x1="33" y1="124" x2="33" y2="271" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="s2lg2" x1="66" y1="271" x2="343" y2="253" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s2pg_w" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function Sk({ w, h, br=5, delay=0, style={} }) {
  return <div style={{ width:w, height:h, borderRadius:br, flexShrink:0, background:'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)', backgroundSize:'200%', animation:`shimmer 1.6s ease-in-out ${delay}s infinite`, ...style }}/>;
}

function InactiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.50);
  const c = '#c8d0dc';
  const shapes = {
    map:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.2" fill="none"/></svg>,
    car:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 11l1.5-4h11l1.5 4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="11" width="18" height="7" rx="2" stroke={c} strokeWidth="1.5"/><circle cx="7.5" cy="18" r="2" stroke={c} strokeWidth="1.2"/><circle cx="16.5" cy="18" r="2" stroke={c} strokeWidth="1.2"/></svg>,
    filter: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="2.5" rx="1.25" stroke={c} strokeWidth="1.2"/><rect x="6" y="11" width="12" height="2.5" rx="1.25" stroke={c} strokeWidth="1.2"/><rect x="9" y="17" width="6" height="2.5" rx="1.25" stroke={c} strokeWidth="1.2"/></svg>,
    dash:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.2"/></svg>,
    grid:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" stroke={c} strokeWidth="1.2"/><rect x="9" y="7" width="4" height="14" rx="1" stroke={c} strokeWidth="1.2"/><rect x="15" y="3" width="4" height="18" rx="1" stroke={c} strokeWidth="1.2"/></svg>,
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
    map:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#s2ig_map)"/><circle cx="12" cy="9" r="2.7" fill="white" opacity="0.9"/></svg>,
    car:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 11l1.5-4h11l1.5 4" stroke="url(#s2ig_car)" strokeWidth="1.4" strokeLinecap="round"/><rect x="3" y="11" width="18" height="7" rx="2" fill="url(#s2ig_car)"/><circle cx="7.5" cy="18" r="2" fill="white"/><circle cx="16.5" cy="18" r="2" fill="white"/></svg>,
    filter: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="2.5" rx="1.25" fill="url(#s2ig_filter)"/><rect x="6" y="11" width="12" height="2.5" rx="1.25" fill="url(#s2ig_filter)"/><rect x="9" y="17" width="6" height="2.5" rx="1.25" fill="url(#s2ig_filter)"/></svg>,
    dash:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#f87171"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#2dd4bf"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fb923c"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="url(#s2ig_dash)"/></svg>,
    grid:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" fill="url(#s2ig_grid)" opacity="0.7"/><rect x="9" y="7" width="4" height="14" rx="1" fill="url(#s2ig_grid)"/><rect x="15" y="3" width="4" height="18" rx="1" fill="url(#s2ig_grid)"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#fff', boxShadow:'0 6px 24px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {inner[id]}
    </div>
  );
}

const vehicles = [
  { id:'Ibrahim Sales 31280', time:'09/01/2026 18:15:48', speed:'Moving - 95.00 KM/H', dot:'#22c55e' },
  { id:'George 00056',        time:'08/31/2026 13:28:43', speed:'Idle',                dot:'#f59e0b' },
  { id:'Ahmed Tech 49876',    time:'08/31/2026 18:30:54', speed:'Moving - 55.00 KM/H', dot:'#22c55e' },
  { id:'Jamal Tech 49876',    time:'08/31/2026 13:38:11', speed:'Moving - 36.00 KM/H', dot:'#22c55e' },
  { id:'David Oman 20378',    time:'08/31/2026 13:58:55', speed:'Stopped',             dot:'#ef4444' },
  { id:'Thanmal 66621',       time:'08/31/2026 13:58:08', speed:'Stopped',             dot:'#ef4444' },
];

export default forwardRef(function Scene2Wireframe(_props, ref) {
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
    gsap.set(activeRefs.current.filter(Boolean), { opacity:0 });
    gsap.set(lineRefs.current.filter(Boolean),   { opacity:0 });
  };

  const play = () => {
    stop();
    resetIconsAndLines();
    gsap.set(maskRef.current,     { opacity:0 });
    gsap.set(wireGrpRef.current,  { opacity:0 });
    gsap.set(frameOutRef.current, { opacity:0, strokeDashoffset:FRAME_PERIM });
    gsap.set(shellRef.current,    { opacity:0 });
    gsap.set(skelRef.current,     { opacity:0 });
    gsap.set(realRef.current,     { opacity:0 });
    gsap.set(rowRefs.current.filter(Boolean), { opacity:0, x:-6 });
    wireRefs.current.forEach(p => {
      if (!p) return;
      const len = (() => { try { return p.getTotalLength(); } catch { return 400; } })();
      gsap.set(p, { strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len, opacity:0 });
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
    tl.to(frameOutRef.current, { opacity:1, duration:0.10 }, frameAt + 0.05);
    tl.to(frameOutRef.current, { strokeDashoffset:0, duration:1.10, ease:'power2.inOut' }, frameAt + 0.12);

    const wireAt = frameAt + 1.15;
    tl.to(wireGrpRef.current, { opacity:1, duration:0.08 }, wireAt);
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.16, ease:'power1.out' }, wireAt + 0.06 + i * 0.04);
    });

    const shellAt = wireAt + 0.90;
    tl.to(maskRef.current,     { opacity:0, duration:0.30, ease:'power2.in'  }, shellAt);
    tl.to(shellRef.current,    { opacity:1, duration:0.38                    }, shellAt - 0.05);
    tl.to(skelRef.current,     { opacity:1, duration:0.24                    }, shellAt + 0.06);
    tl.to(wireGrpRef.current,  { opacity:0, duration:0.26                    }, shellAt + 0.08);
    tl.to(frameOutRef.current, { opacity:0, duration:0.28                    }, shellAt + 0.10);
    tl.to(lineRefs.current.filter(Boolean), { opacity:0, duration:0.24       }, shellAt);
    tl.to(skelRef.current,     { opacity:0, duration:0.32                    }, shellAt + 0.70);
    tl.to(realRef.current,     { opacity:1, duration:0.36                    }, shellAt + 0.72);
    tl.to(rowRefs.current.filter(Boolean), { opacity:1, x:0, duration:0.30, ease:'power2.out', stagger:0.05 }, shellAt + 0.82);

    const loopAt = shellAt + 0.82 + 0.60 + 2.0;
    tl.to(shellRef.current,                   { opacity:0, duration:0.45, ease:'power2.in' }, loopAt);
    tl.to(realRef.current,                    { opacity:0, duration:0.35, ease:'power2.in' }, loopAt + 0.05);
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

  let rowIdx = 0;

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
            stroke={`url(#s2lg${i})`} strokeWidth="1.7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
        ))}
      </svg>

      {/* z=2 — frame outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s2pgl" x="-5%" y="-4%" width="110%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="s2bgl" x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={frameOutRef} d={FRAME_PATH}
          stroke="url(#s2pg_w)" strokeWidth="1.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={FRAME_PERIM} strokeDashoffset={FRAME_PERIM}
          filter="url(#s2pgl)" opacity="0"/>
        <g ref={wireGrpRef} opacity="0">
          {WIRE.map((d, i) => (
            <path key={i} ref={r=>(wireRefs.current[i]=r)} d={d}
              stroke="url(#s2pg_w)" strokeWidth="0.7" fill="rgba(59,130,246,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s2bgl)"/>
          ))}
        </g>
      </svg>

      {/* Icons — InactiveCard always visible, ActiveCard GSAP-controlled */}
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

      {/* z=6 shell */}
      <div ref={shellRef} style={{
        position:'absolute', left:FX, top:FY, width:FW, height:FH, borderRadius:FR,
        background:'#ffffff', overflow:'hidden', opacity:0, zIndex:6,
        boxShadow:'0 6px 28px rgba(0,0,0,0.08)',
      }}>
        <div ref={skelRef} style={{ position:'absolute', inset:0, opacity:0 }}>
          <div style={{ height:33, background:'#f9fafb', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', padding:'0 12px', gap:6 }}>
            {[0,1,2].map(i=><div key={i} style={{ width:9, height:9, borderRadius:'50%', background:['#f87171','#fbbf24','#4ade80'][i] }}/>)}
            <div style={{ flex:1, height:18, borderRadius:4, background:'#f3f4f6', margin:'0 10px' }}/>
          </div>
          <div style={{ display:'flex', height:FH-34 }}>
            <div style={{ width:173, borderRight:'1px solid #f3f4f6', padding:8, display:'flex', flexDirection:'column', gap:6 }}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{ display:'flex', flexDirection:'column', gap:4, paddingBottom:6, borderBottom:'1px solid #f9fafb' }}>
                  <Sk w="85%" h={7} br={3} delay={i*0.07}/><Sk w="60%" h={6} br={3} delay={i*0.07+0.04}/><Sk w="95%" h={6} br={3} delay={i*0.07+0.08}/>
                </div>
              ))}
            </div>
            <div style={{ flex:1, background:'#a8d4f0' }}>
              <svg width="100%" height="100%" viewBox="0 0 255 414" style={{ display:'block' }}>
                <rect width="255" height="414" fill="#a8d4f0"/>
                <path d="M0 95 Q50 88 120 98 Q175 106 255 92 L255 0 L0 0 Z" fill="#d8e8c8"/>
                {[[82,48,'#22c55e'],[168,38,'#22c55e'],[50,75,'#f59e0b'],[200,62,'#22c55e'],[114,148,'#22c55e']].map(([cx,cy,col],i)=>(
                  <g key={i}><circle cx={cx} cy={cy} r="8" fill={col} opacity="0.2"/><circle cx={cx} cy={cy} r="5" fill={col} stroke="white" strokeWidth="1.5"/></g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div ref={realRef} style={{ position:'absolute', inset:0, opacity:0, display:'flex', flexDirection:'column' }}>
          <div style={{ height:33, background:'#f9fafb', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', padding:'0 12px', gap:6 }}>
            {[0,1,2].map(i=><div key={i} style={{ width:9, height:9, borderRadius:'50%', background:['#f87171','#fbbf24','#4ade80'][i] }}/>)}
            <div style={{ flex:1, height:18, borderRadius:4, background:'#f3f4f6', margin:'0 10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:8.5, color:'#9ca3af' }}>https://pro.mylocatorplus.com/</span>
            </div>
          </div>
          <div style={{ flex:1, display:'flex' }}>
            <div style={{ width:173, borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb', padding:'5px 6px 0', gap:2 }}>
                {[['13','All',true],['2','Moving'],['1','Idle'],['1','Park'],['0','None']].map(([n,l,a])=>(
                  <div key={n} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'3px 2px 5px', borderBottom:`2px solid ${a?'#3b82f6':'transparent'}` }}>
                    <span style={{ fontSize:8.5, fontWeight:700, color:a?'#3b82f6':'#9ca3af' }}>{n}</span>
                    <span style={{ fontSize:6, color:a?'#3b82f6':'#9ca3af', textAlign:'center' }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ flex:1, overflow:'hidden' }}>
                {vehicles.map(v=>(
                  <div key={v.id} ref={el=>(rowRefs.current[rowIdx++]=el)}
                    style={{ padding:'6px 8px', borderBottom:'1px solid #f9fafb', opacity:0, willChange:'opacity,transform' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:2 }}>
                      <div style={{ width:7, height:7, borderRadius:'50%', background:v.dot, flexShrink:0 }}/>
                      <span style={{ fontSize:7.5, fontWeight:700, color:'#111827', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>{v.id}</span>
                    </div>
                    <span style={{ fontSize:6.5, color:'#6b7280', paddingLeft:11, display:'block' }}>{v.time}</span>
                    <span style={{ fontSize:6.5, color:'#374151', paddingLeft:11, display:'block' }}>{v.speed}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding:'5px 8px', borderTop:'1px solid #e5e7eb' }}>
                <div style={{ height:20, borderRadius:4, border:'1px solid #e5e7eb', display:'flex', alignItems:'center', padding:'0 6px', gap:4 }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="3.5" cy="3.5" r="2.5" stroke="#9ca3af" strokeWidth="1"/><path d="M5.5 5.5l1.5 1.5" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round"/></svg>
                  <span style={{ fontSize:7.5, color:'#d1d5db' }}>Search...</span>
                </div>
              </div>
            </div>
            <div style={{ flex:1, background:'#a8d4f0', position:'relative', overflow:'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 255 414" style={{ position:'absolute', inset:0 }}>
                <rect width="255" height="414" fill="#a8d4f0"/>
                <path d="M0 95 Q50 88 120 98 Q175 106 255 92 L255 0 L0 0 Z" fill="#d8e8c8"/>
                {[[82,48,'#22c55e'],[168,38,'#22c55e'],[50,75,'#f59e0b'],[200,62,'#22c55e'],[114,148,'#22c55e']].map(([cx,cy,col],i)=>(
                  <g key={i}><circle cx={cx} cy={cy} r="8" fill={col} opacity="0.2"/><circle cx={cx} cy={cy} r="5" fill={col} stroke="white" strokeWidth="1.5"/></g>
                ))}
                <rect x="18" y="86" width="110" height="26" rx="3" fill="rgba(255,255,255,0.92)"/>
                <circle cx="30" cy="99" r="4" fill="#22c55e"/>
                <text x="37" y="95" fontSize="6" fill="#374151" fontWeight="700">Ibrahim Sales 31280</text>
                <text x="37" y="103" fontSize="5.5" fill="#6b7280">Moving - 95.00 KM/hr</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
