'use client';
import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

const SLIDES = [
  { id: 'service', cardTitle: 'Fleet Manager Module', cardDesc: 'Fleet Manager lets teams log services via mobile app with real-time updates and automated maintenance reminders to reduce breakdowns and improve vehicle uptime.' },
  { id: 'gps',     cardTitle: 'GPS Live Tracking',    cardDesc: 'Real-time GPS tracking with live vehicle positions, speed monitoring, and automated route history. Keep your entire fleet visible from one central screen.' },
  { id: 'video',   cardTitle: 'Video Telematics',     cardDesc: 'Stream live HD footage from dual-facing cameras. AI detects driver drowsiness, phone usage, and harsh braking — alerting managers before incidents happen.' },
];

// SVG path helpers — all return path strings so getTotalLength() works
const vb = { w: 570, h: 390 };
const r  = (x,y,w,h) => `M${x},${y} L${x+w},${y} L${x+w},${y+h} L${x},${y+h} Z`;
const l  = (x1,y1,x2,y2) => `M${x1},${y1} L${x2},${y2}`;
const ci = (cx,cy,rad) => {
  const k = rad * 0.5523;
  return `M${cx},${cy-rad} C${cx+k},${cy-rad} ${cx+rad},${cy-k} ${cx+rad},${cy} C${cx+rad},${cy+k} ${cx+k},${cy+rad} ${cx},${cy+rad} C${cx-k},${cy+rad} ${cx-rad},${cy+k} ${cx-rad},${cy} C${cx-rad},${cy-k} ${cx-k},${cy-rad} ${cx},${cy-rad} Z`;
};

// Thin wireframe path element
function W({ d, s='#8b5cf6', sw=1, o=1 }) {
  return <path data-w="1" d={d} fill="none" stroke={s} strokeWidth={sw} opacity={o} strokeLinecap="round" strokeLinejoin="round"/>;
}

// ─── Wireframe SVGs ──────────────────────────────────────────────────────────

function WireService() {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet"
         style={{ position:'absolute',inset:0, filter:'drop-shadow(0 0 5px rgba(124,58,237,0.18))' }}>
      <rect width={vb.w} height={vb.h} fill="#fafbff"/>
      {/* Browser chrome */}
      <W d={r(3,3,564,384)}       s="#7c3aed" sw={1.4} o={0.7}/>
      <W d={l(3,34,567,34)}        s="#a78bfa" sw={0.9} o={0.6}/>
      <W d={ci(18,18,5)}           s="#f87171" sw={0.9} o={0.65}/>
      <W d={ci(30,18,5)}           s="#fbbf24" sw={0.9} o={0.65}/>
      <W d={ci(42,18,5)}           s="#34d399" sw={0.9} o={0.65}/>
      <W d={r(60,10,430,18)}       s="#c4b5fd" sw={0.8} o={0.45}/>
      {/* App nav */}
      <W d={l(3,60,567,60)}        s="#a78bfa" sw={0.7} o={0.5}/>
      <W d={r(8,36,82,22)}         s="#7c3aed" sw={1}   o={0.7}/>
      <W d={r(98,36,100,22)}       s="#c4b5fd" sw={0.7} o={0.4}/>
      {/* Sidebar divider */}
      <W d={l(152,60,152,387)}     s="#a78bfa" sw={0.8} o={0.45}/>
      {/* Sidebar items x11 */}
      {Array.from({length:11},(_,i)=>(
        <g key={i}>
          <W d={ci(20,78+i*28,9)}  s="#7c3aed" sw={0.7} o={0.5}/>
          <W d={r(36,72+i*28,106,7)} s="#a78bfa" sw={0.6} o={0.4}/>
          <W d={r(36,83+i*28,68,5)}  s="#c4b5fd" sw={0.5} o={0.3}/>
        </g>
      ))}
      {/* Content header */}
      <W d={r(162,68,220,14)}      s="#8b5cf6" sw={0.9} o={0.6}/>
      {/* Sub-tabs */}
      <W d={r(162,90,120,20)}      s="#7c3aed" sw={1}   o={0.7}/>
      <W d={r(288,90,120,20)}      s="#c4b5fd" sw={0.7} o={0.35}/>
      {/* Summary cards */}
      {[0,1,2].map(i=>(
        <W key={i} d={r(162+i*106,118,98,36)} s="#a78bfa" sw={0.8} o={0.45}/>
      ))}
      {/* Table header */}
      <W d={r(162,162,400,22)}     s="#8b5cf6" sw={0.8} o={0.55}/>
      {/* Column separators */}
      {[280,360,430,500].map(x=>(
        <W key={x} d={l(x,162,x,387)} s="#c4b5fd" sw={0.5} o={0.3}/>
      ))}
      {/* Table rows */}
      {Array.from({length:7},(_,i)=>(
        <g key={i}>
          <W d={l(162,188+i*28,562,188+i*28)} s="#c4b5fd" sw={0.5} o={0.3}/>
          <W d={r(170,170+i*28,100,9)}        s="#8b5cf6" sw={0.6} o={0.45}/>
          <W d={r(290,170+i*28,55,9)}         s="#c4b5fd" sw={0.5} o={0.35}/>
          <W d={r(440,168+i*28,48,13)}        s="#a78bfa" sw={0.6} o={0.4}/>
        </g>
      ))}
    </svg>
  );
}

function WireGPS() {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet"
         style={{ position:'absolute',inset:0, filter:'drop-shadow(0 0 5px rgba(124,58,237,0.18))' }}>
      <rect width={vb.w} height={vb.h} fill="#fafbff"/>
      <W d={r(3,3,564,384)}       s="#7c3aed" sw={1.4} o={0.7}/>
      <W d={l(3,34,567,34)}        s="#a78bfa" sw={0.9} o={0.6}/>
      <W d={ci(18,18,5)}           s="#f87171" sw={0.9} o={0.65}/>
      <W d={ci(30,18,5)}           s="#fbbf24" sw={0.9} o={0.65}/>
      <W d={ci(42,18,5)}           s="#34d399" sw={0.9} o={0.65}/>
      <W d={r(60,10,430,18)}       s="#c4b5fd" sw={0.8} o={0.45}/>
      {/* Sidebar */}
      <W d={l(152,34,152,387)}     s="#a78bfa" sw={0.8} o={0.45}/>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <W d={r(8,42+i*84,136,76)} s={i===0?'#7c3aed':'#c4b5fd'} sw={0.8} o={i===0?0.65:0.38}/>
          <W d={ci(26,70+i*84,10)}   s="#8b5cf6" sw={0.7} o={0.5}/>
          <W d={r(42,62+i*84,88,8)}  s="#a78bfa" sw={0.6} o={0.42}/>
          <W d={r(42,74+i*84,60,6)}  s="#c4b5fd" sw={0.5} o={0.32}/>
          <W d={r(42,84+i*84,76,6)}  s="#c4b5fd" sw={0.5} o={0.28}/>
        </g>
      ))}
      {/* Map grid */}
      {[0,1,2,3,4].map(i=>(
        <W key={`h${i}`} d={l(160,34+i*70,567,34+i*70)} s="#c4b5fd" sw={0.5} o={0.22}/>
      ))}
      {[0,1,2,3,4].map(i=>(
        <W key={`v${i}`} d={l(160+i*80,34,160+i*80,387)} s="#c4b5fd" sw={0.5} o={0.22}/>
      ))}
      {/* Roads */}
      <W d={l(160,200,567,200)}    s="#a78bfa" sw={2}   o={0.4}/>
      <W d={l(320,34,320,387)}     s="#a78bfa" sw={1.5} o={0.35}/>
      {/* Vehicle markers */}
      {[{cx:240,cy:162,c:'#22c55e'},{cx:392,cy:218,c:'#f59e0b'},{cx:460,cy:132,c:'#22c55e'},{cx:202,cy:278,c:'#94a3b8'}].map((v,i)=>(
        <g key={i}>
          <W d={ci(v.cx,v.cy,14)} s={v.c} sw={0.8} o={0.35}/>
          <W d={ci(v.cx,v.cy,7)}  s={v.c} sw={1.3} o={0.8}/>
        </g>
      ))}
      {/* Stats box */}
      <W d={r(430,44,128,64)}     s="#7c3aed" sw={0.9} o={0.6}/>
      {[0,1,2].map(i=>(
        <W key={i} d={r(442+i*38,58,28,16)} s="#a78bfa" sw={0.6} o={0.4}/>
      ))}
    </svg>
  );
}

function WireVideo() {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet"
         style={{ position:'absolute',inset:0, filter:'drop-shadow(0 0 5px rgba(124,58,237,0.18))' }}>
      <rect width={vb.w} height={vb.h} fill="#fafbff"/>
      <W d={r(3,3,564,384)}       s="#7c3aed" sw={1.4} o={0.7}/>
      <W d={l(3,34,567,34)}        s="#a78bfa" sw={0.9} o={0.6}/>
      <W d={ci(18,18,5)}           s="#f87171" sw={0.9} o={0.65}/>
      <W d={ci(30,18,5)}           s="#fbbf24" sw={0.9} o={0.65}/>
      <W d={ci(42,18,5)}           s="#34d399" sw={0.9} o={0.65}/>
      <W d={r(60,10,430,18)}       s="#c4b5fd" sw={0.8} o={0.45}/>
      {/* App header */}
      <W d={l(3,62,567,62)}        s="#a78bfa" sw={0.8} o={0.5}/>
      <W d={r(10,40,200,20)}       s="#8b5cf6" sw={0.7} o={0.55}/>
      {/* Grid dividers */}
      <W d={l(286,62,286,387)}     s="#a78bfa" sw={0.8} o={0.45}/>
      <W d={l(3,224,567,224)}      s="#a78bfa" sw={0.8} o={0.45}/>
      {/* 4 camera cells */}
      {[{x:8,y:68},{x:292,y:68},{x:8,y:230},{x:292,y:230}].map((pos,i)=>(
        <g key={i}>
          <W d={r(pos.x,pos.y,272,150)} s={i>=2?'#ef4444':'#7c3aed'} sw={0.9} o={i>=2?0.65:0.6}/>
          {i>=2 && <W d={r(pos.x+156,pos.y+8,106,16)} s="#ef4444" sw={0.8} o={0.7}/>}
          {i%2===0 ? (
            <>
              <W d={l(pos.x+60,pos.y+150,pos.x+136,pos.y+68)} s="#a78bfa" sw={0.6} o={0.32}/>
              <W d={l(pos.x+212,pos.y+150,pos.x+136,pos.y+68)} s="#a78bfa" sw={0.6} o={0.32}/>
            </>
          ) : (
            <>
              <W d={r(pos.x+18,pos.y+20,88,96)} s="#c4b5fd" sw={0.6} o={0.28}/>
              <W d={r(pos.x+166,pos.y+20,88,96)} s="#c4b5fd" sw={0.6} o={0.28}/>
            </>
          )}
        </g>
      ))}
      {/* Bottom bar */}
      <W d={l(3,368,567,368)}      s="#a78bfa" sw={0.7} o={0.45}/>
      <W d={r(8,372,148,14)}       s="#ef4444" sw={0.8} o={0.6}/>
      <W d={r(164,372,148,14)}     s="#ef4444" sw={0.8} o={0.6}/>
    </svg>
  );
}

// ─── Full content components ─────────────────────────────────────────────────

function FullService() {
  const vehicles = [
    'Sarah Support 98785','Michael Sales 23758','Emily Tech 67890',
    'David Support 54321','Jessica Tech 1010','Robert Sales 24630',
    'Anna Tech 13879','Kevin Support 88420','Laura Tech 89999',
    'Thomas Sales 1023','Olivia Support 77777',
  ];
  const rows = [
    { name:'Engine Oil Change',     amt:'62,000.0', km:'16,200 KM', km2:'62,000.0', over:true  },
    { name:'Oil Filter Replacement',amt:'62,000.0', km:'16,200 KM', km2:'62,000.0', over:true  },
    { name:'Air Filter Change',     amt:'45,000.0', km:'18,400 KM', km2:'62,000.0', over:false },
    { name:'Brake Inspection',      amt:'55,000.0', km:'16,200 KM', km2:'62,000.0', over:false },
    { name:'Tire Rotation',         amt:'50,000.0', km:'18,400 KM', km2:'62,000.0', over:false },
    { name:'Battery Health Check',  amt:'45,000.0', km:'25,000 KM', km2:'50,000.0', over:false },
  ];
  return (
    <div style={{ width:'100%',height:'100%',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#fff',overflow:'hidden' }}>
      {/* Browser chrome */}
      <div style={{ height:32,background:'#f8fafc',borderBottom:'1px solid #e2e8f0',display:'flex',alignItems:'center',gap:8,padding:'0 10px',flexShrink:0 }}>
        <div style={{ display:'flex',gap:4 }}>
          {['#fc5c65','#fed330','#26de81'].map(c=><div key={c} style={{ width:9,height:9,borderRadius:'50%',background:c }}/>)}
        </div>
        <div style={{ flex:1,height:17,borderRadius:4,background:'#fff',border:'1px solid #e2e8f0',display:'flex',alignItems:'center',padding:'0 7px' }}>
          <span style={{ fontSize:7.5,color:'#94a3b8' }}>https://www.yourwebsite.com</span>
        </div>
      </div>
      {/* App nav */}
      <div style={{ height:24,background:'#f8fafc',borderBottom:'1px solid #e2e8f0',display:'flex',alignItems:'center',gap:2,padding:'0 8px',flexShrink:0 }}>
        {['Reminders','Fleet Expenditure','Documents','Damage'].map((t,i)=>(
          <div key={t} style={{ padding:'2px 10px',borderRadius:3,fontSize:7.5,fontWeight:i===0?600:400,color:i===0?'#1e293b':'#94a3b8',background:i===0?'#fff':'transparent',border:i===0?'1px solid #e2e8f0':'none' }}>{t}</div>
        ))}
      </div>
      {/* Content layout */}
      <div style={{ flex:1,display:'flex',overflow:'hidden',minHeight:0 }}>
        {/* Sidebar */}
        <div style={{ width:144,borderRight:'1px solid #e2e8f0',background:'#fafcff',flexShrink:0,overflow:'hidden' }}>
          <div style={{ display:'flex',gap:2,padding:'6px 6px 4px',borderBottom:'1px solid #e2e8f0' }}>
            <div style={{ flex:1,textAlign:'center',padding:'3px 0',background:'#3b82f6',borderRadius:4,fontSize:7.5,color:'#fff',fontWeight:600 }}>SERVICE REMINDER</div>
          </div>
          {vehicles.map((v,i)=>(
            <div key={i} style={{ padding:'5px 7px',borderBottom:'1px solid #f1f5f9',background:i===0?'#eff6ff':'transparent',display:'flex',alignItems:'center',gap:5 }}>
              <div style={{ width:6,height:6,borderRadius:'50%',background:'#94a3b8',flexShrink:0 }}/>
              <div style={{ fontSize:7.5,color:i===0?'#1e40af':'#475569',fontWeight:i===0?600:400,lineHeight:1.2 }}>{v}</div>
            </div>
          ))}
          <div style={{ padding:'6px 8px',borderTop:'1px solid #e2e8f0',marginTop:'auto' }}>
            <input placeholder="Search..." style={{ width:'100%',border:'1px solid #e2e8f0',borderRadius:4,fontSize:7.5,padding:'3px 6px',outline:'none',color:'#475569' }}/>
          </div>
        </div>
        {/* Main content */}
        <div style={{ flex:1,overflow:'hidden',minWidth:0 }}>
          {/* Header */}
          <div style={{ padding:'6px 10px',borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <div>
              <div style={{ fontSize:9,fontWeight:700,color:'#0f172a' }}>Service Reminder</div>
              <div style={{ display:'flex',gap:6,marginTop:2,alignItems:'center' }}>
                <div style={{ width:22,height:22,borderRadius:'50%',background:'#3b82f6',fontSize:7,color:'#fff',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center' }}>SS</div>
                <span style={{ fontSize:7.5,fontWeight:600,color:'#1e40af' }}>Sarah Support 98785</span>
              </div>
            </div>
            <div style={{ display:'flex',gap:4 }}>
              {['Summary','Add Item','History'].map(a=>(
                <div key={a} style={{ padding:'2px 7px',borderRadius:4,border:'1px solid #e2e8f0',fontSize:7,color:'#64748b' }}>{a}</div>
              ))}
            </div>
          </div>
          {/* Stat boxes */}
          <div style={{ display:'flex',gap:6,padding:'6px 10px',borderBottom:'1px solid #e2e8f0' }}>
            {[{label:'Due',val:'$',c:'#3b82f6'},{label:'0–500 KM',val:'$',c:'#3b82f6'},{label:'500–1000 KM',val:'$',c:'#3b82f6'}].map(s=>(
              <div key={s.label} style={{ flex:1,border:'1px solid #e2e8f0',borderRadius:6,padding:'5px 8px' }}>
                <div style={{ fontSize:7,color:'#94a3b8' }}>{s.label}</div>
                <div style={{ fontSize:13,fontWeight:700,color:s.c }}>{s.val}</div>
              </div>
            ))}
          </div>
          {/* Table */}
          <div style={{ overflow:'auto',maxHeight:'calc(100% - 110px)' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:8 }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Preventative Maintenance','Standard Service Amount','Completed Service Amount','Due Date','Actions'].map(h=>(
                    <th key={h} style={{ padding:'5px 8px',textAlign:'left',fontWeight:600,color:'#64748b',borderBottom:'1px solid #e2e8f0',fontSize:7,whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row,i)=>(
                  <tr key={i} style={{ background:row.over?'#fff5f5':'#fff',borderBottom:'1px solid #f1f5f9' }}>
                    <td style={{ padding:'5px 8px',color:row.over?'#dc2626':'#1e293b',fontWeight:row.over?600:400 }}>{row.name}<br/><span style={{ fontSize:6.5,color:'#94a3b8' }}>Comments</span></td>
                    <td style={{ padding:'5px 8px',color:'#475569' }}>{row.amt}</td>
                    <td style={{ padding:'5px 8px',color:row.over?'#dc2626':'#475569',fontWeight:row.over?600:400 }}>{row.km}</td>
                    <td style={{ padding:'5px 8px',color:'#475569' }}>{row.km2}</td>
                    <td style={{ padding:'5px 8px' }}>
                      <div style={{ display:'flex',gap:3 }}>
                        {['Service','Edit','History'].map(a=>(
                          <span key={a} style={{ fontSize:6.5,color:'#3b82f6',cursor:'pointer' }}>{a}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FullGPS() {
  const vehicles = [
    { name:'John Smith',   id:'V001', speed:'62 mph', color:'#22c55e', active:true  },
    { name:'Emma Davis',   id:'V002', speed:'0 mph',  color:'#f59e0b', active:false },
    { name:'Mike Johnson', id:'V003', speed:'45 mph', color:'#22c55e', active:false },
    { name:'Sara Wilson',  id:'V004', speed:'—',      color:'#94a3b8', active:false },
  ];
  return (
    <div style={{ width:'100%',height:'100%',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#fff',overflow:'hidden' }}>
      <div style={{ height:32,background:'#f8fafc',borderBottom:'1px solid #e2e8f0',display:'flex',alignItems:'center',gap:8,padding:'0 10px',flexShrink:0 }}>
        <div style={{ display:'flex',gap:4 }}>
          {['#fc5c65','#fed330','#26de81'].map(c=><div key={c} style={{ width:9,height:9,borderRadius:'50%',background:c }}/>)}
        </div>
        <div style={{ flex:1,height:17,borderRadius:4,background:'#fff',border:'1px solid #e2e8f0',display:'flex',alignItems:'center',padding:'0 7px' }}>
          <span style={{ fontSize:7.5,color:'#94a3b8' }}>https://www.yourwebsite.com</span>
        </div>
      </div>
      <div style={{ flex:1,display:'flex',overflow:'hidden',minHeight:0 }}>
        <div style={{ width:148,borderRight:'1px solid #e2e8f0',background:'#f8fafc',flexShrink:0,padding:'8px 6px',overflow:'hidden' }}>
          <div style={{ fontSize:8,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8 }}>Live Fleet</div>
          {vehicles.map((v,i)=>(
            <div key={i} style={{ padding:'6px 7px',borderRadius:7,background:v.active?'#f0fdf4':'#fff',border:`1px solid ${v.active?'#bbf7d0':'#e2e8f0'}`,marginBottom:4 }}>
              <div style={{ display:'flex',alignItems:'center',gap:5 }}>
                <div style={{ width:7,height:7,borderRadius:'50%',background:v.color,flexShrink:0 }}/>
                <div style={{ fontSize:8.5,fontWeight:600,color:'#1e293b',lineHeight:1.2 }}>{v.name}</div>
              </div>
              <div style={{ display:'flex',justifyContent:'space-between',marginTop:2 }}>
                <div style={{ fontSize:7.5,color:'#94a3b8' }}>{v.id}</div>
                <div style={{ fontSize:7.5,color:v.color,fontWeight:600 }}>{v.speed}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex:1,position:'relative',overflow:'hidden',minWidth:0 }}>
          <svg width="100%" height="100%" style={{ position:'absolute',inset:0,display:'block' }}>
            <rect width="100%" height="100%" fill="#eef2f7"/>
            {Array.from({length:8},(_,i)=>(
              <line key={`h${i}`} x1="0" y1={`${i*14.28}%`} x2="100%" y2={`${i*14.28}%`} stroke="#dde3ed" strokeWidth="0.6"/>
            ))}
            {Array.from({length:8},(_,i)=>(
              <line key={`v${i}`} x1={`${i*14.28}%`} y1="0" x2={`${i*14.28}%`} y2="100%" stroke="#dde3ed" strokeWidth="0.6"/>
            ))}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#c8d3e0" strokeWidth="5"/>
            <line x1="32%" y1="0" x2="32%" y2="100%" stroke="#c8d3e0" strokeWidth="4"/>
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#c8d3e0" strokeWidth="3"/>
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#fff" strokeWidth="1" strokeDasharray="10,8" opacity="0.7"/>
            <circle cx="38%" cy="44%" r="10" fill="#22c55e" opacity="0.15"/>
            <circle cx="38%" cy="44%" r="7" fill="#22c55e" opacity="0.9"/>
            <text x="38%" y="44%" textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fill="white" fontWeight="bold">V1</text>
            <circle cx="65%" cy="56%" r="7" fill="#f59e0b" opacity="0.9"/>
            <text x="65%" y="56%" textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fill="white" fontWeight="bold">V2</text>
            <circle cx="72%" cy="33%" r="7" fill="#22c55e" opacity="0.9"/>
            <text x="72%" y="33%" textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fill="white" fontWeight="bold">V3</text>
            <circle cx="24%" cy="68%" r="7" fill="#94a3b8" opacity="0.9"/>
            <text x="24%" y="68%" textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fill="white" fontWeight="bold">V4</text>
          </svg>
          <div style={{ position:'absolute',top:10,right:10,background:'rgba(255,255,255,0.96)',borderRadius:8,padding:'8px 12px',boxShadow:'0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize:7.5,color:'#64748b',marginBottom:6,fontWeight:600 }}>Fleet Overview</div>
            <div style={{ display:'flex',gap:12 }}>
              {[{n:2,label:'Moving',c:'#22c55e'},{n:1,label:'Idle',c:'#f59e0b'},{n:1,label:'Offline',c:'#94a3b8'}].map(s=>(
                <div key={s.label} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:16,fontWeight:700,color:s.c,lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontSize:7,color:'#94a3b8',marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FullVideo() {
  const cameras = [
    { label:'Front — V001', event:null       },
    { label:'Interior — V001', event:null    },
    { label:'Front — V003', event:'Harsh Braking' },
    { label:'Interior — V002', event:'Phone Use'  },
  ];
  return (
    <div style={{ width:'100%',height:'100%',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#0c1929',overflow:'hidden' }}>
      <div style={{ height:32,background:'#f8fafc',borderBottom:'1px solid #e2e8f0',display:'flex',alignItems:'center',gap:8,padding:'0 10px',flexShrink:0 }}>
        <div style={{ display:'flex',gap:4 }}>
          {['#fc5c65','#fed330','#26de81'].map(c=><div key={c} style={{ width:9,height:9,borderRadius:'50%',background:c }}/>)}
        </div>
        <div style={{ flex:1,height:17,borderRadius:4,background:'#fff',border:'1px solid #e2e8f0',display:'flex',alignItems:'center',padding:'0 7px' }}>
          <span style={{ fontSize:7.5,color:'#94a3b8' }}>https://www.yourwebsite.com</span>
        </div>
      </div>
      <div style={{ padding:'7px 12px',borderBottom:'1px solid #1e293b',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0 }}>
        <div style={{ fontSize:9.5,fontWeight:600,color:'#e2e8f0' }}>Video Telematics — Live</div>
        <div style={{ display:'flex',gap:6,alignItems:'center' }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e' }}/>
          <span style={{ fontSize:7.5,color:'#94a3b8' }}>4 Active</span>
        </div>
      </div>
      <div style={{ flex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr',gap:3,padding:6 }}>
        {cameras.map((cam,i)=>(
          <div key={i} style={{ position:'relative',borderRadius:6,overflow:'hidden',background:i%2===0?'#1a2744':'#12202e',border:`1px solid ${cam.event?'#ef4444':'#1e3a5f'}` }}>
            {i%2===0 ? (
              <svg width="100%" height="100%" viewBox="0 0 140 90" preserveAspectRatio="xMidYMid slice">
                <rect width="140" height="90" fill="#0d1e38"/>
                <rect width="140" height="45" fill="#071225"/>
                <polygon points="20,90 120,90 82,45 58,45" fill="#162235"/>
                <line x1="70" y1="45" x2="70" y2="90" stroke="#eab308" strokeWidth="1.2" strokeDasharray="5,5" opacity="0.5"/>
                <rect x="38" y="76" width="64" height="16" fill="#071225" rx="2"/>
              </svg>
            ) : (
              <svg width="100%" height="100%" viewBox="0 0 140 90" preserveAspectRatio="xMidYMid slice">
                <rect width="140" height="90" fill="#0a1a2e"/>
                <rect x="8" y="20" width="52" height="60" rx="5" fill="#162235" stroke="#1e3a5f" strokeWidth="0.7"/>
                <rect x="80" y="20" width="52" height="60" rx="5" fill="#162235" stroke="#1e3a5f" strokeWidth="0.7"/>
                <rect x="0" y="0" width="140" height="18" fill="#071225"/>
                <rect x="18" y="4" width="42" height="10" rx="2" fill="#1e3a5f"/>
              </svg>
            )}
            <div style={{ position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(0,0,0,0.75))',padding:'10px 6px 4px' }}>
              <div style={{ fontSize:7,color:'#94a3b8' }}>{cam.label}</div>
            </div>
            {cam.event && (
              <div style={{ position:'absolute',top:4,right:4,background:'#ef4444',borderRadius:4,padding:'2px 5px',fontSize:6.5,color:'#fff',fontWeight:700 }}>
                ⚠ {cam.event}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding:'5px 8px',borderTop:'1px solid #1e293b',display:'flex',gap:6,flexShrink:0 }}>
        {['Harsh Braking — V003','Phone Use — V002'].map(a=>(
          <div key={a} style={{ padding:'2px 7px',borderRadius:5,background:'#450a0a',border:'1px solid #991b1b',fontSize:7,color:'#fca5a5',fontWeight:600 }}>⚠ {a}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Scene wrappers (forwardRef with play/reset) ──────────────────────────────

function makeScene(WireComp, FullComp) {
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
          try {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          } catch {
            gsap.set(p, { strokeDasharray: 300, strokeDashoffset: 300 });
          }
        });
        const tl = gsap.timeline();
        tlRef.current = tl;
        tl.to(paths, { strokeDashoffset: 0, duration: 0.85, stagger: { amount: 0.45, from: 'start' }, ease: 'power2.out' });
        tl.to(fullRef.current,  { opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.38');
        tl.to(wireRef.current,  { opacity: 0, duration: 0.3,  ease: 'power2.in'  }, '-=0.28');
      },
      reset() {
        tlRef.current?.kill();
        if (wireRef.current) gsap.set(wireRef.current, { opacity: 0 });
        if (fullRef.current) gsap.set(fullRef.current, { opacity: 0 });
      },
    }));

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <div ref={wireRef} style={{ position: 'absolute', inset: 0, opacity: 0 }}><WireComp/></div>
        <div ref={fullRef} style={{ position: 'absolute', inset: 0, opacity: 0 }}><FullComp/></div>
      </div>
    );
  });
}

const SceneService = makeScene(WireService, FullService);
const SceneGPS     = makeScene(WireGPS,     FullGPS);
const SceneVideo   = makeScene(WireVideo,   FullVideo);
const SCENES = [SceneService, SceneGPS, SceneVideo];

// ─── Corner icons (matching reference image 4) ────────────────────────────────

const CORNERS = [
  {
    pos: { top: -24, left: -24 },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    pos: { top: -24, right: -24 },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    pos: { bottom: -24, left: -24 },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="3" width="15" height="13" rx="2" stroke="#94a3b8" strokeWidth="2"/>
        <path d="M16 8h4l3 5v3h-7V8z" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="5.5" cy="18.5" r="2.5" stroke="#94a3b8" strokeWidth="2"/>
        <circle cx="18.5" cy="18.5" r="2.5" stroke="#94a3b8" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    pos: { bottom: -24, right: -24 },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="#94a3b8" strokeWidth="2"/>
      </svg>
    ),
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function FeatureSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const isAnimRef    = useRef(false);
  const activeIdxRef = useRef(0);
  const cardRef      = useRef(null);
  const sceneRefs    = useRef([null, null, null]);
  const containerRef = useRef([null, null, null]);

  // Mount: play first scene
  useEffect(() => {
    sceneRefs.current[0]?.play();
  }, []);

  // After activeIdx state update: slide card text in
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

    // Pre-reset destination scene
    sceneRefs.current[toIdx]?.reset();

    // Slide card text out
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0, x: dir * -18, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          setActiveIdx(toIdx);
          if (cardRef.current) gsap.set(cardRef.current, { x: dir * 18 });
        },
      });
    } else {
      setActiveIdx(toIdx);
    }

    // Fade out old scene container → play new
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
    <section style={{ background: '#fff', width: '100%', padding: '88px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Soft blue radial gradient on left — matches reference */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '55%', height: '100%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 60%, rgba(199,210,254,0.38) 0%, rgba(224,231,255,0.18) 40%, transparent 70%)',
      }}/>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 60px', display: 'flex', alignItems: 'center', gap: 72, position: 'relative' }}>

        {/* ── LEFT ── */}
        <div style={{ flex: '0 0 420px', minWidth: 0 }}>

          {/* Eyebrow */}
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2563eb', letterSpacing: '0.01em', marginBottom: 18 }}>
            Fleet Manager
          </div>

          {/* Headline */}
          <h2 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.18, color: '#111827', margin: '0 0 14px' }}>
            Run Your Road Team Smarter<br/>
            <span style={{ fontWeight: 700 }}>Empowering field teams,</span>
          </h2>

          {/* Subtitle */}
          <p style={{ fontSize: 15.5, color: '#6b7280', lineHeight: 1.68, margin: '0 0 40px' }}>
            Manage, track, and optimize your field workforce in real time<span style={{ color: '#9ca3af' }}>fleets</span>
          </p>

          {/* Carousel card */}
          <div style={{
            borderRadius: 20,
            background: 'linear-gradient(145deg, rgba(219,227,255,0.55) 0%, rgba(237,242,255,0.42) 50%, rgba(229,236,255,0.38) 100%)',
            padding: '36px 0 28px',
          }}>
            {/* Arrows + content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>

              {/* Left arrow */}
              <button
                onClick={prev}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 20px', fontSize: 26, color: '#9ca3af', lineHeight: 1, flexShrink: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#6b7280'}
                onMouseLeave={e => e.currentTarget.style.color='#9ca3af'}
              >
                ‹
              </button>

              {/* Animated text block */}
              <div ref={cardRef} style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 17.5, fontWeight: 700, color: '#111827', marginBottom: 12, lineHeight: 1.3 }}>
                  {slide.cardTitle}
                </div>
                <p style={{ fontSize: 14, color: '#6b7ab8', lineHeight: 1.72, margin: 0 }}>
                  {slide.cardDesc}
                </p>
              </div>

              {/* Right arrow */}
              <button
                onClick={next}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 20px', fontSize: 26, color: '#9ca3af', lineHeight: 1, flexShrink: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#6b7280'}
                onMouseLeave={e => e.currentTarget.style.color='#9ca3af'}
              >
                ›
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                    background: i === activeIdx ? '#6b7280' : '#c9d2e8',
                    transition: 'background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>

          {/* Purple-bordered container */}
          <div style={{
            border: '2px solid #7c3aed',
            borderRadius: 18,
            overflow: 'hidden',
            height: 440,
            position: 'relative',
            background: '#fafbff',
            margin: '28px',
          }}>
            {SCENES.map((SceneComp, i) => (
              <div
                key={i}
                ref={el => { containerRef.current[i] = el; }}
                style={{ position: 'absolute', inset: 0, opacity: i === 0 ? 1 : 0 }}
              >
                <SceneComp ref={el => { sceneRefs.current[i] = el; }} />
              </div>
            ))}
          </div>

          {/* 4 corner icon boxes — positioned relative to the bordered container */}
          {CORNERS.map((corner, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                // offset by 28px (margin) then fine-position at corners
                top:    corner.pos.top    != null ? corner.pos.top    + 28 : undefined,
                bottom: corner.pos.bottom != null ? corner.pos.bottom + 28 : undefined,
                left:   corner.pos.left   != null ? corner.pos.left   + 28 : undefined,
                right:  corner.pos.right  != null ? corner.pos.right  + 28 : undefined,
                width: 48, height: 48, borderRadius: 12,
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
              }}
            >
              {corner.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
