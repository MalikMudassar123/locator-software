'use client';
import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const SLIDES = [
  {
    id: 'task',
    eyebrow: 'Task Manager',
    cardTitle: 'Task Manager Module',
    cardDesc: 'LOCATOR Task Manager digitizes field and road operations by dispatching tasks to staff via mobile app, with real-time CRM/ERP integration to eliminate duplicate work and improve efficiency.',
  },
  {
    id: 'expense',
    eyebrow: 'Expense Manager',
    cardTitle: 'Expense Manager Module',
    cardDesc: 'The Expense Manager simplifies field expense tracking with instant bill uploads, quick approvals, and AI-powered reports for better cost control.',
  },
  {
    id: 'inspection',
    eyebrow: 'Inspection',
    cardTitle: 'Inspection Module',
    cardDesc: 'LOCATOR Inspection enables digital vehicle and equipment checks with photos and customizable fields, ensuring accountability, compliance, and condition tracking across fleets.',
  },
  {
    id: 'fleet',
    eyebrow: 'Fleet Manager',
    cardTitle: 'Fleet Manager Module',
    cardDesc: 'Fleet Manager lets teams log services via mobile app with real-time updates and automated maintenance reminders to reduce breakdowns and improve vehicle uptime.',
  },
];

// ─── SVG wireframe helpers ────────────────────────────────────────────────────
const vb = { w: 620, h: 440 };
const r  = (x,y,w,h) => `M${x},${y} L${x+w},${y} L${x+w},${y+h} L${x},${y+h} Z`;
const l  = (x1,y1,x2,y2) => `M${x1},${y1} L${x2},${y2}`;
const ci = (cx,cy,rad) => {
  const k = rad * 0.5523;
  return `M${cx},${cy-rad} C${cx+k},${cy-rad} ${cx+rad},${cy-k} ${cx+rad},${cy} C${cx+rad},${cy+k} ${cx+k},${cy+rad} ${cx},${cy+rad} C${cx-k},${cy+rad} ${cx-rad},${cy+k} ${cx-rad},${cy} C${cx-rad},${cy-k} ${cx-k},${cy-rad} ${cx},${cy-rad} Z`;
};

function W({ d, s = '#8b5cf6', sw = 1, o = 1 }) {
  return <path data-w="1" d={d} fill="none" stroke={s} strokeWidth={sw} opacity={o} strokeLinecap="round" strokeLinejoin="round"/>;
}

// ─── Wireframe SVGs ───────────────────────────────────────────────────────────

function WireTask() {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet"
      style={{ position:'absolute', inset:0 }}>
      <rect width={vb.w} height={vb.h} fill="#fafbff"/>
      <W d={r(3,3,564,384)} s="#7c3aed" sw={1.4} o={0.7}/>
      <W d={l(3,34,567,34)} s="#a78bfa" sw={0.9} o={0.6}/>
      <W d={ci(18,18,5)} s="#f87171" sw={0.9} o={0.65}/>
      <W d={ci(30,18,5)} s="#fbbf24" sw={0.9} o={0.65}/>
      <W d={ci(42,18,5)} s="#34d399" sw={0.9} o={0.65}/>
      <W d={r(60,10,430,18)} s="#c4b5fd" sw={0.8} o={0.45}/>
      <W d={l(3,60,567,60)} s="#a78bfa" sw={0.7} o={0.5}/>
      {[0,1,2,3].map(i=><W key={i} d={r(10+i*110,38,100,20)} s={i===0?'#7c3aed':'#c4b5fd'} sw={0.8} o={i===0?0.7:0.35}/>)}
      <W d={l(168,60,168,387)} s="#a78bfa" sw={0.8} o={0.45}/>
      <W d={r(6,68,154,16)} s="#7c3aed" sw={0.9} o={0.6}/>
      {Array.from({length:9},(_,i)=>(
        <g key={i}>
          <W d={ci(18,98+i*30,8)} s="#8b5cf6" sw={0.7} o={0.5}/>
          <W d={r(32,92+i*30,128,7)} s="#a78bfa" sw={0.6} o={0.4}/>
          <W d={r(32,103+i*30,88,5)} s="#c4b5fd" sw={0.5} o={0.3}/>
        </g>
      ))}
      <W d={r(176,68,382,18)} s="#8b5cf6" sw={0.9} o={0.6}/>
      {[176,278,358,438,510].map((x,i)=>(
        <W key={i} d={r(x,94,i<4?96:52,12)} s="#a78bfa" sw={0.7} o={0.45}/>
      ))}
      {[278,358,438,510].map(x=>(
        <W key={x} d={l(x,90,x,387)} s="#c4b5fd" sw={0.5} o={0.25}/>
      ))}
      {Array.from({length:8},(_,i)=>(
        <g key={i}>
          <W d={l(176,114+i*34,562,114+i*34)} s="#c4b5fd" sw={0.5} o={0.25}/>
          <W d={r(182,117+i*34,84,8)} s="#8b5cf6" sw={0.6} o={0.45}/>
          <W d={r(288,117+i*34,58,8)} s="#c4b5fd" sw={0.5} o={0.35}/>
          <W d={r(366,116+i*34,56,10)} s="#a78bfa" sw={0.6} o={0.4}/>
          <W d={r(448,116+i*34,48,10)} s={i%3===0?'#7c3aed':'#c4b5fd'} sw={0.6} o={i%3===0?0.6:0.35}/>
        </g>
      ))}
      <W d={l(3,372,567,372)} s="#a78bfa" sw={0.7} o={0.4}/>
      {[0,1,2].map(i=><W key={i} d={r(180+i*130,375,110,10)} s="#8b5cf6" sw={0.6} o={0.45}/>)}
    </svg>
  );
}

function WireExpense() {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet"
      style={{ position:'absolute', inset:0 }}>
      <rect width={vb.w} height={vb.h} fill="#fafbff"/>
      <W d={r(3,3,564,384)} s="#7c3aed" sw={1.4} o={0.7}/>
      <W d={l(3,34,567,34)} s="#a78bfa" sw={0.9} o={0.6}/>
      <W d={ci(18,18,5)} s="#f87171" sw={0.9} o={0.65}/>
      <W d={ci(30,18,5)} s="#fbbf24" sw={0.9} o={0.65}/>
      <W d={ci(42,18,5)} s="#34d399" sw={0.9} o={0.65}/>
      <W d={r(60,10,430,18)} s="#c4b5fd" sw={0.8} o={0.45}/>
      <W d={l(3,60,567,60)} s="#a78bfa" sw={0.7} o={0.5}/>
      {[0,1,2].map(i=><W key={i} d={r(10+i*115,38,105,20)} s={i===0?'#7c3aed':'#c4b5fd'} sw={0.8} o={i===0?0.7:0.35}/>)}
      <W d={l(162,60,162,387)} s="#a78bfa" sw={0.8} o={0.45}/>
      <W d={r(6,68,148,16)} s="#7c3aed" sw={0.9} o={0.6}/>
      {Array.from({length:8},(_,i)=>(
        <g key={i}>
          <W d={ci(20,96+i*36,9)} s="#8b5cf6" sw={0.7} o={0.5}/>
          <W d={r(36,90+i*36,118,8)} s="#a78bfa" sw={0.6} o={0.4}/>
          <W d={r(36,102+i*36,78,6)} s="#c4b5fd" sw={0.5} o={0.3}/>
        </g>
      ))}
      <W d={r(170,68,390,20)} s="#8b5cf6" sw={0.9} o={0.6}/>
      {[170,247,322,402,482].map((x,i)=>(
        <W key={i} d={r(x,96,i<4?70:76,12)} s="#a78bfa" sw={0.7} o={0.45}/>
      ))}
      {[247,322,402,482].map(x=>(
        <W key={x} d={l(x,92,x,387)} s="#c4b5fd" sw={0.5} o={0.25}/>
      ))}
      {Array.from({length:9},(_,i)=>(
        <g key={i}>
          <W d={l(170,116+i*30,558,116+i*30)} s="#c4b5fd" sw={0.5} o={0.22}/>
          <W d={r(176,119+i*30,62,7)} s="#8b5cf6" sw={0.6} o={0.45}/>
          <W d={r(256,119+i*30,55,7)} s="#c4b5fd" sw={0.5} o={0.35}/>
          <W d={r(332,118+i*30,56,9)} s="#a78bfa" sw={0.6} o={0.4}/>
          <W d={r(410,118+i*30,60,9)} s={i%4===0?'#10b981':'#f87171'} sw={0.7} o={0.55}/>
        </g>
      ))}
      <W d={r(390,232,162,148)} s="#7c3aed" sw={1.2} o={0.55}/>
      <W d={r(398,242,146,20)} s="#a78bfa" sw={0.8} o={0.5}/>
      {Array.from({length:4},(_,i)=>(
        <W key={i} d={r(398,270+i*26,146,18)} s="#c4b5fd" sw={0.6} o={0.4}/>
      ))}
    </svg>
  );
}

function WireInspection() {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet"
      style={{ position:'absolute', inset:0 }}>
      <rect width={vb.w} height={vb.h} fill="#fafbff"/>
      <W d={r(3,3,564,384)} s="#7c3aed" sw={1.4} o={0.7}/>
      <W d={l(3,34,567,34)} s="#a78bfa" sw={0.9} o={0.6}/>
      <W d={ci(18,18,5)} s="#f87171" sw={0.9} o={0.65}/>
      <W d={ci(30,18,5)} s="#fbbf24" sw={0.9} o={0.65}/>
      <W d={ci(42,18,5)} s="#34d399" sw={0.9} o={0.65}/>
      <W d={r(60,10,430,18)} s="#c4b5fd" sw={0.8} o={0.45}/>
      <W d={l(3,60,567,60)} s="#a78bfa" sw={0.8} o={0.5}/>
      <W d={r(8,38,160,20)} s="#8b5cf6" sw={0.7} o={0.55}/>
      <W d={l(222,60,222,387)} s="#a78bfa" sw={0.8} o={0.45}/>
      <W d={r(8,68,206,18)} s="#7c3aed" sw={0.9} o={0.6}/>
      {Array.from({length:7},(_,i)=>(
        <g key={i}>
          <W d={r(8,92+i*40,206,34)} s={i===0?'#7c3aed':'#c4b5fd'} sw={0.8} o={i===0?0.65:0.38}/>
          <W d={r(14,96+i*40,142,8)} s="#8b5cf6" sw={0.6} o={0.5}/>
          <W d={r(14,108+i*40,102,6)} s="#c4b5fd" sw={0.5} o={0.3}/>
        </g>
      ))}
      <W d={r(230,68,330,132)} s="#8b5cf6" sw={0.9} o={0.5}/>
      <W d="M282,102 Q312,84 362,90 Q402,92 422,106 Q437,116 440,132 Q440,150 420,154 Q360,157 282,154 Q262,150 264,132 Q264,116 282,102 Z" s="#7c3aed" sw={1.2} o={0.55}/>
      <W d={ci(297,154,13)} s="#8b5cf6" sw={1} o={0.5}/>
      <W d={ci(412,154,13)} s="#8b5cf6" sw={1} o={0.5}/>
      <W d={ci(322,110,6)} s="#f87171" sw={1.2} o={0.7}/>
      <W d={ci(390,102,5)} s="#f87171" sw={1.2} o={0.7}/>
      <W d={r(230,208,330,170)} s="#a78bfa" sw={0.8} o={0.45}/>
      {Array.from({length:6},(_,i)=>(
        <g key={i}>
          <W d={r(238,216+i*28,12,12)} s={i<3?'#34d399':'#c4b5fd'} sw={0.8} o={i<3?0.7:0.4}/>
          <W d={r(258,219+i*28,220,7)} s="#8b5cf6" sw={0.6} o={0.45}/>
          <W d={r(258,229+i*28,162,5)} s="#c4b5fd" sw={0.5} o={0.3}/>
        </g>
      ))}
      <W d={r(14,252,138,128)} s="#7c3aed" sw={1.1} o={0.55}/>
      <W d={r(22,260,122,16)} s="#a78bfa" sw={0.8} o={0.5}/>
      <W d={r(22,282,122,90)} s="#c4b5fd" sw={0.7} o={0.4}/>
      {Array.from({length:3},(_,i)=>(
        <W key={i} d={r(28,286+i*28,42,22)} s="#8b5cf6" sw={0.6} o={0.45}/>
      ))}
    </svg>
  );
}

function WireFleet() {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet"
      style={{ position:'absolute', inset:0 }}>
      <rect width={vb.w} height={vb.h} fill="#fafbff"/>
      <W d={r(3,3,564,384)} s="#7c3aed" sw={1.4} o={0.7}/>
      <W d={l(3,34,567,34)} s="#a78bfa" sw={0.9} o={0.6}/>
      <W d={ci(18,18,5)} s="#f87171" sw={0.9} o={0.65}/>
      <W d={ci(30,18,5)} s="#fbbf24" sw={0.9} o={0.65}/>
      <W d={ci(42,18,5)} s="#34d399" sw={0.9} o={0.65}/>
      <W d={r(60,10,430,18)} s="#c4b5fd" sw={0.8} o={0.45}/>
      <W d={l(3,60,567,60)} s="#a78bfa" sw={0.7} o={0.5}/>
      <W d={r(8,38,82,20)} s="#7c3aed" sw={1} o={0.7}/>
      <W d={r(98,38,100,20)} s="#c4b5fd" sw={0.7} o={0.4}/>
      <W d={l(153,60,153,387)} s="#a78bfa" sw={0.8} o={0.45}/>
      {Array.from({length:11},(_,i)=>(
        <g key={i}>
          <W d={ci(20,78+i*28,9)} s="#7c3aed" sw={0.7} o={0.5}/>
          <W d={r(36,72+i*28,108,7)} s="#a78bfa" sw={0.6} o={0.4}/>
          <W d={r(36,83+i*28,70,5)} s="#c4b5fd" sw={0.5} o={0.3}/>
        </g>
      ))}
      <W d={r(162,68,218,14)} s="#8b5cf6" sw={0.9} o={0.6}/>
      <W d={r(162,90,120,20)} s="#7c3aed" sw={1} o={0.7}/>
      <W d={r(288,90,120,20)} s="#c4b5fd" sw={0.7} o={0.35}/>
      {[0,1,2].map(i=><W key={i} d={r(162+i*108,118,100,36)} s="#a78bfa" sw={0.8} o={0.45}/>)}
      <W d={r(162,162,396,22)} s="#8b5cf6" sw={0.8} o={0.55}/>
      {[280,360,430,500].map(x=>(
        <W key={x} d={l(x,162,x,387)} s="#c4b5fd" sw={0.5} o={0.28}/>
      ))}
      {Array.from({length:7},(_,i)=>(
        <g key={i}>
          <W d={l(162,188+i*28,558,188+i*28)} s="#c4b5fd" sw={0.5} o={0.28}/>
          <W d={r(170,170+i*28,100,9)} s="#8b5cf6" sw={0.6} o={0.45}/>
          <W d={r(290,170+i*28,55,9)} s="#c4b5fd" sw={0.5} o={0.35}/>
          <W d={r(440,168+i*28,48,13)} s={i<2?'#f87171':'#a78bfa'} sw={0.6} o={i<2?0.6:0.4}/>
        </g>
      ))}
    </svg>
  );
}

// ─── Browser bar (shared) ─────────────────────────────────────────────────────

function BrowserBar() {
  return (
    <div style={{ height:32, background:'linear-gradient(180deg,#f3f5f9,#e6eaf2)', borderBottom:'1px solid rgba(15,23,42,0.06)', display:'flex', alignItems:'center', padding:'0 12px', gap:10, flexShrink:0 }}>
      <div style={{ display:'flex', gap:6 }}>
        {['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{ width:11,height:11,borderRadius:'50%',background:c }}/>)}
      </div>
      <div style={{ flex:1, height:18, background:'#fff', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', maxWidth:'62%', margin:'0 auto' }}>
        <span style={{ fontSize:9, color:'#f59e0b', fontWeight:600 }}>https://pro.mylocatorplus.com/</span>
      </div>
    </div>
  );
}

function FullImage({ src, alt }) {
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', background:'#fff' }}>
      <BrowserBar/>
      <div style={{ position:'relative', flex:1 }}>
        <Image src={src} alt={alt} fill style={{ objectFit:'cover', objectPosition:'left top' }} sizes="700px"/>
      </div>
    </div>
  );
}

// ─── Task Manager icon-network scene ─────────────────────────────────────────

const TM_CW = 560, TM_CH = 420;

// Layout (centered, well inside 560×420 canvas — no edge clipping):
//
//   [0:task]────────────────────────[1:crm]
//      │                               │
//      │                          [2:mobile]
//      │                               │
//   [3:team]──[4:clock]──────────[5:done]
//
// icon center = left + size/2
const TM_ICONS = [
  { id:'task',   left:  48, top:  38, size: 64 },  // 0  center=(80,  70)
  { id:'crm',    left: 408, top:  38, size: 64 },  // 1  center=(440, 70)
  { id:'mobile', left: 272, top: 160, size: 64 },  // 2  center=(304, 192)
  { id:'team',   left:  50, top: 298, size: 60 },  // 3  center=(80,  328)
  { id:'clock',  left: 186, top: 298, size: 60 },  // 4  center=(216, 328)
  { id:'done',   left: 340, top: 298, size: 60 },  // 5  center=(370, 328)
];

// Smooth Q-curve paths derived exactly from icon edge midpoints above
const TM_CONNECTIONS = [
  // 0  task(right=112,70) → crm(left=408,70)   straight horizontal
  'M 112 70 H 408',
  // 1  crm(bottom=440,102) → mobile(right=336,192)  down then left, rounded corner
  'M 440 102 V 174 Q 440 192 422 192 H 336',
  // 2  task(bottom=80,102) → team(top=80,298)   straight vertical
  'M 80 102 V 298',
  // 3  team(right=110,328) → clock(left=186,328)  straight horizontal
  'M 110 328 H 186',
  // 4  clock(right=246,328) → done(left=340,328)  straight horizontal
  'M 246 328 H 340',
  // 5  mobile(bottom=304,224) → done(top=370,298)  down then right, rounded corner
  'M 304 224 V 310 Q 304 328 322 328 H 340',
];

// Gradient colours per connection
const TM_GRADS = [
  { id:'tg0', c1:'#f472b6', c2:'#818cf8', x1:'112', y1:'70',  x2:'408', y2:'70'  },
  { id:'tg1', c1:'#818cf8', c2:'#06b6d4', x1:'440', y1:'102', x2:'336', y2:'192' },
  { id:'tg2', c1:'#8b5cf6', c2:'#4c1d95', x1:'80',  y1:'102', x2:'80',  y2:'298' },
  { id:'tg3', c1:'#4c1d95', c2:'#6366f1', x1:'110', y1:'328', x2:'186', y2:'328' },
  { id:'tg4', c1:'#6366f1', c2:'#60a5fa', x1:'246', y1:'328', x2:'340', y2:'328' },
  { id:'tg5', c1:'#06b6d4', c2:'#10b981', x1:'304', y1:'224', x2:'340', y2:'328' },
];

// Desktop wireframe overlay
function rp(x, y, w, h, rr = 0) {
  if (!rr) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+rr} ${y}H${x+w-rr}Q${x+w} ${y} ${x+w} ${y+rr}V${y+h-rr}Q${x+w} ${y+h} ${x+w-rr} ${y+h}H${x+rr}Q${x} ${y+h} ${x} ${y+h-rr}V${y+rr}Q${x} ${y} ${x+rr} ${y}Z`;
}
const DT_X = 14, DT_Y = 28, DT_W = 532, DT_H = 360, DT_R = 12;
const DT_WIRE = [
  rp(DT_X+6,   DT_Y+6,   DT_W-12, 22, 4),
  rp(DT_X+6,   DT_Y+34,  88, DT_H-42, 6),
  rp(DT_X+102, DT_Y+34,  DT_W-110, 60, 6),
  rp(DT_X+102, DT_Y+102, (DT_W-118)/3, 56, 5),
  rp(DT_X+102 + (DT_W-118)/3 + 6, DT_Y+102, (DT_W-118)/3, 56, 5),
  rp(DT_X+102 + 2*((DT_W-118)/3+6), DT_Y+102, (DT_W-118)/3, 56, 5),
  rp(DT_X+102, DT_Y+166, DT_W-110, DT_H-178, 5),
];

// ── Icon card components ──────────────────────────────────────────────────────

function TmInactive({ id, size }) {
  const s = Math.round(size * 0.52);
  const c = '#b0bec5';   // slightly darker grey — more visible
  const rr = Math.round(size * 0.24);
  const shapes = {
    task: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* clipboard body */}
        <rect x="4" y="4" width="16" height="18" rx="2" stroke={c} strokeWidth="1.5"/>
        {/* clip at top */}
        <rect x="8" y="2" width="8" height="4" rx="1.5" stroke={c} strokeWidth="1.5" fill="none"/>
        {/* task lines */}
        <line x1="8" y1="11" x2="16" y2="11" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="8" y1="15" x2="14" y2="15" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="8" y1="19" x2="12" y2="19" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    crm: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* network hub icon */}
        <circle cx="12" cy="5"  r="2.5" stroke={c} strokeWidth="1.4"/>
        <circle cx="5"  cy="19" r="2.5" stroke={c} strokeWidth="1.4"/>
        <circle cx="19" cy="19" r="2.5" stroke={c} strokeWidth="1.4"/>
        <line x1="12" y1="7.5"  x2="6"  y2="16.8" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="12" y1="7.5"  x2="18" y2="16.8" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="7.2" y1="19"  x2="16.8" y2="19" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    mobile: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* phone outline */}
        <rect x="5" y="2" width="14" height="20" rx="3" stroke={c} strokeWidth="1.5"/>
        {/* screen area */}
        <rect x="7.5" y="5.5" width="9" height="11" rx="1" stroke={c} strokeWidth="1" opacity="0.7"/>
        {/* screen content lines */}
        <line x1="9"  y1="8"  x2="15" y2="8"  stroke={c} strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
        <line x1="9"  y1="10" x2="13" y2="10" stroke={c} strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
        {/* home button */}
        <circle cx="12" cy="19" r="1.2" stroke={c} strokeWidth="1.1"/>
      </svg>
    ),
    team: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* front person */}
        <circle cx="9"  cy="7"  r="3"   stroke={c} strokeWidth="1.4"/>
        <path d="M3 21v-1a6 6 0 016-6h1" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
        {/* back person */}
        <circle cx="16" cy="6"  r="2.5" stroke={c} strokeWidth="1.3"/>
        <path d="M14 21v-1a5 5 0 015-5h1" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="10" y1="21" x2="21" y2="21" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    clock: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9"   stroke={c} strokeWidth="1.5"/>
        {/* clock hands */}
        <line x1="12" y1="12" x2="12" y2="7"  stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="12" y1="12" x2="16" y2="15" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
        {/* tick marks */}
        <line x1="12" y1="3.5" x2="12" y2="5"   stroke={c} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="12" y1="19"  x2="12" y2="20.5" stroke={c} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="3.5" y1="12" x2="5"   y2="12"  stroke={c} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="19"  y1="12" x2="20.5" y2="12" stroke={c} strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    done: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* full circle */}
        <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5"/>
        {/* checkmark — bold, clean */}
        <polyline points="7.5 12 10.5 15.5 16.5 8.5"
          stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return (
    <div style={{ width:size, height:size, borderRadius:rr, background:'#f4f6fa', border:'1.5px solid #dde3ec', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
      {shapes[id]}
    </div>
  );
}

function TmActive({ id, size }) {
  const s  = Math.round(size * 0.54);
  const rr = Math.round(size * 0.24);
  const gmap = {
    task:   ['#f59e0b','#ef4444'],
    crm:    ['#06b6d4','#6366f1'],
    mobile: ['#3b82f6','#8b5cf6'],
    team:   ['#4c1d95','#8b5cf6'],
    clock:  ['#6366f1','#3b82f6'],
    done:   ['#10b981','#34d399'],
  };
  const [c1, c2] = gmap[id];
  const gid = `tma_${id}`;
  const G = (
    <defs>
      <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor={c1}/>
        <stop offset="100%" stopColor={c2}/>
      </linearGradient>
    </defs>
  );
  const shapes = {
    task: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">{G}
        <rect x="4" y="4" width="16" height="18" rx="2" fill={`url(#${gid})`}/>
        <rect x="8" y="2" width="8" height="4" rx="1.5" fill={`url(#${gid})`} opacity="0.8"/>
        <line x1="8" y1="11" x2="16" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="15" x2="14" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="19" x2="12" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    crm: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">{G}
        <circle cx="12" cy="5"  r="3"  fill={`url(#${gid})`}/>
        <circle cx="5"  cy="19" r="3"  fill={`url(#${gid})`}/>
        <circle cx="19" cy="19" r="3"  fill={`url(#${gid})`}/>
        <line x1="12" y1="8"    x2="6"  y2="16.5" stroke={c1} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="8"    x2="18" y2="16.5" stroke={c2} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7.5" y1="19"  x2="16.5" y2="19" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    mobile: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">{G}
        <rect x="5" y="2" width="14" height="20" rx="3" fill={`url(#${gid})`}/>
        <rect x="7.5" y="5.5" width="9" height="11" rx="1" fill="white" opacity="0.18"/>
        <line x1="9"  y1="8"  x2="15" y2="8"  stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.85"/>
        <line x1="9"  y1="10" x2="13" y2="10" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.85"/>
        <circle cx="12" cy="19" r="1.2" fill="white" opacity="0.8"/>
      </svg>
    ),
    team: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">{G}
        <circle cx="9"  cy="7"  r="3.5" fill={`url(#${gid})`}/>
        <path d="M2 21v-1a7 7 0 017-7h2a7 7 0 017 7v1" fill={`url(#${gid})`} opacity="0.85"/>
        <circle cx="17" cy="6"  r="2.8" stroke={c2} strokeWidth="1.3" fill="none"/>
        <path d="M20 21v-0.5a4.5 4.5 0 00-3-4.25" stroke={c2} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    clock: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">{G}
        <circle cx="12" cy="12" r="10" fill={`url(#${gid})`}/>
        <line x1="12" y1="12" x2="12" y2="6.5" stroke="white" strokeWidth="2"   strokeLinecap="round"/>
        <line x1="12" y1="12" x2="16.5" y2="15" stroke="white" strokeWidth="2"  strokeLinecap="round"/>
        <circle cx="12" cy="12" r="1.5" fill="white"/>
      </svg>
    ),
    done: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">{G}
        <circle cx="12" cy="12" r="10" fill={`url(#${gid})`}/>
        <polyline points="7 12.5 10.5 16 17 8.5"
          stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return (
    <div style={{ width:size, height:size, borderRadius:rr, background:'#fff', boxShadow:'0 8px 28px rgba(99,102,241,0.24), 0 2px 8px rgba(0,0,0,0.07)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {shapes[id]}
    </div>
  );
}

const SceneTaskManager = forwardRef(function SceneTaskManager(_, ref) {
  const iconRefs   = useRef([]);
  const activeRefs = useRef([]);
  const lineRefs   = useRef([]);
  const dtWireGrp  = useRef(null);
  const dtWireRefs = useRef([]);
  const dtImgRef   = useRef(null);
  const tweens     = useRef([]);

  const stop = () => { tweens.current.forEach(t => t?.kill()); tweens.current = []; };
  const getLen = p => { try { return p.getTotalLength(); } catch { return 300; } };

  const resetAll = () => {
    gsap.set(iconRefs.current.filter(Boolean),   { opacity: 1 });
    // start active icons at scale 0.75 so the `to` animation pops them in
    gsap.set(activeRefs.current.filter(Boolean), { opacity: 0, scale: 0.75, transformOrigin: '50% 50%' });
    lineRefs.current.forEach(p => {
      if (!p) return;
      const L = getLen(p);
      gsap.set(p, { opacity: 0, strokeDasharray: `${L} ${L + 2}`, strokeDashoffset: L });
    });
    gsap.set(dtWireGrp.current, { opacity: 0 });
    gsap.set(dtImgRef.current,  { opacity: 0 });
    dtWireRefs.current.forEach(p => {
      if (!p) return;
      const L = getLen(p);
      gsap.set(p, { strokeDasharray: `${L} ${L + 2}`, strokeDashoffset: L, opacity: 0 });
    });
  };

  const play = () => {
    stop();
    resetAll();

    const IE = 'power3.out', LE = 'power2.inOut', FE = 'power2.in';

    // pop an icon's active layer in — resetAll already set scale:0.75 opacity:0
    const showIcon = (tl, i, at) => {
      const el = activeRefs.current[i];
      if (!el) return;
      tl.to(el, { opacity: 1, scale: 1, duration: 0.42, ease: 'back.out(1.7)' }, at);
    };

    const drawLine = (tl, ci, at, dur) => {
      const p = lineRefs.current[ci];
      if (!p) return;
      const L = getLen(p);
      tl.set(p, { strokeDasharray: `${L} ${L + 2}`, strokeDashoffset: L, opacity: 1 }, at);
      tl.to(p, { strokeDashoffset: 0, duration: dur, ease: LE }, at);
    };

    const tl = gsap.timeline({ onComplete: () => play() });
    tweens.current.push(tl);

    // ── Phase 1: all 6 icons + all 6 connections build over ~4.5 s ───────────
    //
    //   [0:task]───────────────────────[1:crm]
    //      │                               │
    //      │                          [2:mobile]
    //      │                               │
    //   [3:team]──[4:clock]──────────[5:done]
    //
    // Each beat: source icon pops → target icon pops → line draws
    // ~0.75 s between beats → full network at ~4.6 s

    // Beat 1 — task & crm light up, horizontal top line draws
    showIcon(tl, 0, 0.10);
    showIcon(tl, 1, 0.32);
    drawLine(tl, 0, 0.50, 0.70);   // done ≈ 1.20

    // Beat 2 — mobile pops, crm→mobile L-curve draws
    showIcon(tl, 2, 1.25);
    drawLine(tl, 1, 1.48, 0.68);   // done ≈ 2.16

    // Beat 3 — team pops, vertical left spine draws
    showIcon(tl, 3, 2.22);
    drawLine(tl, 2, 2.45, 0.65);   // done ≈ 3.10

    // Beat 4 — clock pops, team→clock short horizontal draws
    showIcon(tl, 4, 3.15);
    drawLine(tl, 3, 3.38, 0.42);   // done ≈ 3.80

    // Beat 5 — done pops, clock→done short horizontal draws
    showIcon(tl, 5, 3.85);
    drawLine(tl, 4, 4.08, 0.42);   // done ≈ 4.50

    // Beat 6 — mobile→done L-curve closes the network loop
    drawLine(tl, 5, 4.55, 0.60);   // done ≈ 5.15

    // ── Hold: all 6 icons + 6 lines fully visible (~1 s) ─────────────────────
    const PHASE1_END = 5.15;

    // ── Fade everything out ───────────────────────────────────────────────────
    const FADE_START = PHASE1_END + 0.95;
    tl.to(lineRefs.current.filter(Boolean),   { opacity: 0, duration: 0.52, ease: FE }, FADE_START);
    tl.to(activeRefs.current.filter(Boolean), { opacity: 0, scale: 0.75, duration: 0.46, ease: FE }, FADE_START + 0.08);
    tl.to(iconRefs.current.filter(Boolean),   { opacity: 0, duration: 0.55, ease: FE }, FADE_START + 0.16);

    // ── Phase 2: desktop wireframe draws in ───────────────────────────────────
    const WIRE_AT = FADE_START + 1.00;
    tl.to(dtWireGrp.current, { opacity: 1, duration: 0.22 }, WIRE_AT);
    dtWireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity: 1, strokeDashoffset: 0, duration: 0.38, ease: 'power2.out' }, WIRE_AT + 0.05 + i * 0.065);
    });

    // ── Phase 3: image fades in, wireframe fades out ──────────────────────────
    const IMG_AT = WIRE_AT + 0.05 + DT_WIRE.length * 0.065 + 0.38 + 0.18;
    tl.to(dtImgRef.current,  { opacity: 1, duration: 0.82, ease: 'power2.out' }, IMG_AT);
    tl.to(dtWireGrp.current, { opacity: 0, duration: 0.62, ease: FE },           IMG_AT + 0.22);

    // ── Hold image then loop ───────────────────────────────────────────────────
    const HOLD_END = IMG_AT + 0.85 + 4.5;
    tl.to(dtImgRef.current, { opacity: 0, duration: 0.55, ease: FE }, HOLD_END);
  };

  useImperativeHandle(ref, () => ({
    play()  { play(); },
    reset() { stop(); resetAll(); },
  }));

  return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'#fafbff' }}>
      <div style={{ position:'relative', width:TM_CW, height:TM_CH }}>

        {/* SVG gradient + filter definitions */}
        <svg width="0" height="0" style={{ position:'absolute', overflow:'hidden' }}>
          <defs>
            {TM_GRADS.map(g => (
              <linearGradient key={g.id} id={g.id}
                x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}
                gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor={g.c1}/>
                <stop offset="100%" stopColor={g.c2}/>
              </linearGradient>
            ))}
            <linearGradient id="tmdwg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#06b6d4"/>
            </linearGradient>
            <filter id="tmglow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
        </svg>

        {/* z=0 — connection lines */}
        <svg width={TM_CW} height={TM_CH} viewBox={`0 0 ${TM_CW} ${TM_CH}`}
          style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'visible' }}>
          {TM_CONNECTIONS.map((d, i) => (
            <path key={i} ref={el => (lineRefs.current[i] = el)} d={d}
              stroke={`url(#${TM_GRADS[i].id})`} strokeWidth="1.8" fill="none"
              strokeLinecap="round" strokeLinejoin="round"
              opacity="0" filter="url(#tmglow)"/>
          ))}
        </svg>

        {/* z=3 — desktop wireframe SVG */}
        <svg width={TM_CW} height={TM_CH} viewBox={`0 0 ${TM_CW} ${TM_CH}`}
          style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none' }}>
          <g ref={dtWireGrp} opacity="0">
            {DT_WIRE.map((d, i) => (
              <path key={i} ref={el => (dtWireRefs.current[i] = el)} d={d}
                stroke="url(#tmdwg)" strokeWidth="0.7" fill="rgba(59,130,246,0.025)"
                strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
            ))}
          </g>
        </svg>

        {/* z=6 — desktop screenshot */}
        <div ref={dtImgRef} style={{
          position:'absolute', left:DT_X, top:DT_Y,
          width:DT_W, height:DT_H, borderRadius:DT_R,
          overflow:'hidden', opacity:0, zIndex:6, pointerEvents:'none',
          willChange:'opacity',
          boxShadow:'0 20px 52px rgba(15,23,42,0.18), 0 4px 14px rgba(15,23,42,0.08)',
          background:'#fff', display:'flex', flexDirection:'column',
        }}>
          <BrowserBar/>
          <div style={{ position:'relative', flex:1 }}>
            <Image src="/software images/software images/Task Manager/jkliului.png"
              alt="Task Manager" fill sizes={`${DT_W}px`}
              style={{ objectFit:'cover', objectPosition:'left top' }}/>
          </div>
        </div>

        {/* z=7 — icon cards */}
        {TM_ICONS.map((ic, i) => (
          <div key={ic.id} ref={el => (iconRefs.current[i] = el)}
            style={{ position:'absolute', left:ic.left, top:ic.top, width:ic.size, height:ic.size, zIndex:7, pointerEvents:'none', willChange:'opacity' }}>
            <TmInactive id={ic.id} size={ic.size}/>
            <div ref={el => (activeRefs.current[i] = el)}
              style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity,transform' }}>
              <TmActive id={ic.id} size={ic.size}/>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
});

// ─── Simple wireframe → image scene factory ───────────────────────────────────

function makeScene(WireComp, imgSrc, imgAlt) {
  return forwardRef(function Scene(_, ref) {
    const wireRef = useRef(null);
    const fullRef = useRef(null);
    const tlRef   = useRef(null);

    useImperativeHandle(ref, () => ({
      play() {
        tlRef.current?.kill();
        if (!wireRef.current || !fullRef.current) return;
        const paths = [...wireRef.current.querySelectorAll('[data-w]')];
        gsap.set(wireRef.current, { opacity: 1 });
        gsap.set(fullRef.current, { opacity: 0 });
        paths.forEach(p => {
          try { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); }
          catch { gsap.set(p, { strokeDasharray: 300, strokeDashoffset: 300 }); }
        });
        const tl = gsap.timeline();
        tlRef.current = tl;
        tl.to(paths, { strokeDashoffset: 0, duration: 0.85, stagger:{ amount: 0.45, from:'start' }, ease:'power2.out' });
        tl.to(fullRef.current, { opacity: 1, duration: 0.55, ease:'power2.out' }, '-=0.38');
        tl.to(wireRef.current, { opacity: 0, duration: 0.30, ease:'power2.in'  }, '-=0.28');
      },
      reset() {
        tlRef.current?.kill();
        if (wireRef.current) gsap.set(wireRef.current, { opacity: 0 });
        if (fullRef.current) gsap.set(fullRef.current, { opacity: 0 });
      },
    }));

    return (
      <div style={{ position:'absolute', inset:0 }}>
        <div ref={wireRef} style={{ position:'absolute', inset:0, opacity:0 }}><WireComp/></div>
        <div ref={fullRef} style={{ position:'absolute', inset:0, opacity:0 }}>
          <FullImage src={imgSrc} alt={imgAlt}/>
        </div>
      </div>
    );
  });
}

const SceneExpense    = makeScene(WireExpense,    '/software images/software images/Expense Manager/jikljoikiujk.png', 'Expense Manager');
const SceneInspection = makeScene(WireInspection, '/software images/software images/Inspection/kjiuguy.png',           'Inspection');
const SceneFleet      = makeScene(WireFleet,      '/software images/software images/Fleet Manager/hyuiuyku.png',       'Fleet Manager');

const SCENES = [SceneTaskManager, SceneExpense, SceneInspection, SceneFleet];

// ─── Main component ───────────────────────────────────────────────────────────

export default function FeatureSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const isAnimRef    = useRef(false);
  const activeIdxRef = useRef(0);
  const cardRef      = useRef(null);
  const sceneRefs    = useRef([null, null, null, null]);
  const containerRef = useRef([null, null, null, null]);

  useEffect(() => { sceneRefs.current[0]?.play(); }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      opacity: 1, x: 0, duration: 0.38, ease: 'power3.out',
      onComplete: () => { isAnimRef.current = false; },
    });
  }, [activeIdx]);

  const goTo = useCallback((toIdx) => {
    if (isAnimRef.current || toIdx === activeIdxRef.current) return;
    isAnimRef.current = true;
    const fromIdx = activeIdxRef.current;
    const dir = toIdx > fromIdx ? 1 : -1;
    activeIdxRef.current = toIdx;
    sceneRefs.current[toIdx]?.reset();

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0, x: dir * -18, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          setActiveIdx(toIdx);
          if (cardRef.current) gsap.set(cardRef.current, { x: dir * 18 });
        },
      });
    } else { setActiveIdx(toIdx); }

    const fromEl = containerRef.current[fromIdx];
    const toEl   = containerRef.current[toIdx];
    if (fromEl) {
      gsap.to(fromEl, {
        opacity: 0, duration: 0.28, ease: 'power2.in', overwrite: true,
        onComplete: () => {
          sceneRefs.current[fromIdx]?.reset();
          if (toEl) gsap.set(toEl, { opacity: 1 });
          sceneRefs.current[toIdx]?.play();
        },
      });
    } else {
      if (toEl) gsap.set(toEl, { opacity: 1 });
      sceneRefs.current[toIdx]?.play();
    }
  }, []);

  const prev = () => goTo((activeIdxRef.current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((activeIdxRef.current + 1) % SLIDES.length);

  const slide = SLIDES[activeIdx];

  return (
    <section style={{ background:'#fff', width:'100%', padding:'88px 0', position:'relative', overflow:'hidden' }}>
      <div style={{
        position:'absolute', top:0, left:0, width:'55%', height:'100%', pointerEvents:'none',
        background:'radial-gradient(ellipse at 20% 60%, rgba(199,210,254,0.38) 0%, rgba(224,231,255,0.18) 40%, transparent 70%)',
      }}/>

      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 60px', display:'flex', alignItems:'center', gap:72, position:'relative' }}>

        {/* ── LEFT panel ── */}
        <div style={{ flex:'0 0 420px', minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#2563eb', letterSpacing:'0.01em', marginBottom:18 }}>
            {slide.eyebrow}
          </div>
          <h2 style={{ fontSize:38, fontWeight:800, lineHeight:1.18, color:'#111827', margin:'0 0 14px' }}>
            Run Your Road Team Smarter<br/>
            <span style={{ fontWeight:700 }}>Empowering field teams,</span>
          </h2>
          <p style={{ fontSize:15.5, color:'#6b7280', lineHeight:1.68, margin:'0 0 40px' }}>
            Manage, track, and optimize your field workforce in real time<span style={{ color:'#9ca3af' }}>fleets</span>
          </p>

          {/* Carousel card */}
          <div style={{
            borderRadius:20,
            background:'linear-gradient(145deg, rgba(219,227,255,0.55) 0%, rgba(237,242,255,0.42) 50%, rgba(229,236,255,0.38) 100%)',
            padding:'36px 0 28px',
          }}>
            <div style={{ display:'flex', alignItems:'center' }}>
              <button onClick={prev}
                style={{ background:'none', border:'none', cursor:'pointer', padding:'0 20px', fontSize:26, color:'#9ca3af', lineHeight:1, flexShrink:0, transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#6b7280'}
                onMouseLeave={e=>e.currentTarget.style.color='#9ca3af'}>‹</button>

              <div ref={cardRef} style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:17.5, fontWeight:700, color:'#111827', marginBottom:12, lineHeight:1.3 }}>
                  {slide.cardTitle}
                </div>
                <p style={{ fontSize:14, color:'#6b7ab8', lineHeight:1.72, margin:0 }}>
                  {slide.cardDesc}
                </p>
              </div>

              <button onClick={next}
                style={{ background:'none', border:'none', cursor:'pointer', padding:'0 20px', fontSize:26, color:'#9ca3af', lineHeight:1, flexShrink:0, transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#6b7280'}
                onMouseLeave={e=>e.currentTarget.style.color='#9ca3af'}>›</button>
            </div>

            <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:28 }}>
              {SLIDES.map((_,i) => (
                <button key={i} onClick={()=>goTo(i)} style={{
                  width:8, height:8, borderRadius:'50%', border:'none', cursor:'pointer', padding:0,
                  background: i===activeIdx ? '#6b7280' : '#c9d2e8',
                  transition:'background 0.3s ease',
                }}/>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT panel — no border, no corner icons ── */}
        <div style={{ flex:1, minWidth:0, position:'relative' }}>
          <div style={{
            borderRadius:16,
            overflow:'hidden',
            height:500,
            position:'relative',
            background:'#fafbff',
            boxShadow:'0 2px 24px rgba(0,0,0,0.05)',
          }}>
            {SCENES.map((SceneComp, i) => (
              <div key={i}
                ref={el => { containerRef.current[i] = el; }}
                style={{ position:'absolute', inset:0, opacity: i === 0 ? 1 : 0 }}>
                <SceneComp ref={el => { sceneRefs.current[i] = el; }}/>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
