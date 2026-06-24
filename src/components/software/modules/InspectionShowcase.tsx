'use client'
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
// Inspection Module — interactive wireframe showcase (Web + Mobile).
// Ported from Locator-websites im-data/im-web/im-mobile.
import { useState } from 'react'
import { ModuleTabs, StatusBar, BottomNav } from './TaskManagerShowcase'

const IM_MANDATORY = ['Registration Card', 'Insurance', 'Fuel', 'Wiper', 'Tyre', 'First Aid', 'AC', 'Engine', 'Service due', 'Fire Extinguisher Expiry']
const IM_OPTIONAL = ['Spare tyre', 'Fire extinguisher']
const IM_CHECKLIST_CURRENT: Record<string, boolean> = { 'Registration Card': true, Insurance: true, Fuel: true, Wiper: true, Tyre: true, 'First Aid': true, AC: true, Engine: true, 'Service due': true, 'Fire Extinguisher Expiry': true, 'Spare tyre': true, 'Fire extinguisher': true }
const IM_CHECKLIST_PREV: Record<string, boolean> = { 'Registration Card': true, Insurance: true, Fuel: true, Wiper: false, Tyre: true, 'First Aid': true, AC: true, Engine: true, 'Service due': true, 'Fire Extinguisher Expiry': true, 'Spare tyre': true, 'Fire extinguisher': true }
const IM_LOGS = [
  { date: '28/05/2026, 1:48:13 pm', inspector: 'FARMAN ALI', score: 83 },
  { date: '26/05/2026, 10:45:58 am', inspector: 'FAIZUL HASSAN', score: 75 },
  { date: '25/05/2026, 9:16:49 am', inspector: 'FAIZUL HASSAN', score: 66 },
  { date: '23/05/2026, 6:19:06 pm', inspector: 'FARMAN ALI', score: 83 },
  { date: '23/05/2026, 9:04:56 am', inspector: 'FAIZUL HASSAN', score: 75 },
  { date: '21/05/2026, 1:54:21 pm', inspector: 'VIJO DEVASSY', score: 66 },
  { date: '21/05/2026, 11:29:26 am', inspector: 'ABDUL RAHIM', score: 83 },
  { date: '20/05/2026, 7:43:07 am', inspector: 'ABDUL RAHIM', score: 83 },
  { date: '19/05/2026, 5:01:47 pm', inspector: 'FARMAN ALI', score: 83 },
  { date: '19/05/2026, 3:09:32 pm', inspector: 'FAIZUL HASSAN', score: 75 },
  { date: '19/05/2026, 1:34:28 pm', inspector: 'ABDUL RAHIM', score: 83 },
  { date: '17/05/2026, 4:41:58 pm', inspector: 'SHAHUL HAMEED', score: 66 },
  { date: '15/05/2026, 12:51:54 pm', inspector: 'SUHAIL', score: 58 },
  { date: '14/05/2026, 7:39:17 pm', inspector: 'NOOR GHULAM', score: 83 },
]
const IM_MOBILE_RECORDS = [
  { date: "19 Jun '26, 09:58 AM", inspector: 'Ijaz', score: 83 },
  { date: "18 Jun '26, 09:31 AM", inspector: 'Aziz Rehman', score: 83 },
  { date: "16 Jun '26, 07:54 AM", inspector: 'Aziz Rehman', score: 83 },
  { date: "15 Jun '26, 08:22 AM", inspector: 'Ijaz', score: 83 },
  { date: "14 Jun '26, 09:11 AM", inspector: 'Ijaz', score: 83 },
  { date: "12 Jun '26, 07:42 AM", inspector: 'Aziz Rehman', score: 83 },
  { date: "11 Jun '26, 07:32 AM", inspector: 'Aziz Rehman', score: 83 },
]
const IM_SCRATCHES = [{ type: 'Scratch', desc: 'No Description', location: 'Front' }, { type: 'Scratch', desc: 'No Description', location: 'Left' }]
const IM_CAR_VIEWS = ['top', 'front', 'rear', 'left', 'right']

function IMCarViewIcon({ view, active, onClick }: { view: string; active: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ width: 42, height: 42, borderRadius: '50%', border: active ? '2px solid #1e293b' : '2px solid #e2e8f0', background: active ? '#f1f5f9' : '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', overflow: 'hidden', padding: 4 }}>
      <img src={`/cars/car-${view}.svg`} alt={view} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: active ? 1 : 0.5 }} />
    </div>
  )
}

function IMCheck({ checked, color }: { checked: boolean; color?: string }) {
  if (checked) return (
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: color || '#22c55e', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
    </div>
  )
  return (
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#94a3b8', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </div>
  )
}

function IMPhotoPlaceholder({ size }: { size?: number | string }) {
  const s = size || 100
  return (
    <div style={{ width: s, height: typeof s === 'number' ? s : 100, borderRadius: 8, background: '#e2e8f0', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><circle cx="8.5" cy="11" r="2.5" /><path d="M14 10l3.5 3.5L22 9v11H2V17l4-4 4 4" /></svg>
    </div>
  )
}

function IMWebDashboard() {
  const [carView, setCarView] = useState('front')
  const [selLogIdx, setSelLogIdx] = useState(0)
  return (
    <div className="ms-web-min" style={{ border: '1px solid #dce1e8', borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 6px 32px -8px rgba(30,41,59,.1),0 1px 2px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', height: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ display: 'flex', gap: 6 }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#e0e0e3' }} />)}</div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#94a3b8', marginLeft: 6 }}>Inspection — Vehicle Detail</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5"><rect x="4" y="12" width="16" height="6" rx="2" /><circle cx="7.5" cy="18" r="2" /><circle cx="16.5" cy="18" r="2" /><path d="M6 12l2-5h8l2 5" /></svg>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#1e293b' }}>SKMC Camry 26635</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
            MOVE TO SERVICING
          </button>
          <button style={{ width: 34, height: 34, borderRadius: 8, background: '#2563eb', border: 'none', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT */}
        <div style={{ width: '45%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
            <div style={{ position: 'relative', width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc', borderRadius: 12, marginBottom: 12 }}>
              <button onClick={() => { const idx = IM_CAR_VIEWS.indexOf(carView); setCarView(IM_CAR_VIEWS[(idx - 1 + 5) % 5]) }} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', border: '2px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', zIndex: 5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <img src={`/cars/car-${carView}.png`} alt={carView} style={{ maxWidth: '80%', maxHeight: '85%', objectFit: 'contain' }} />
              {carView === 'front' && (
                <>
                  <div style={{ position: 'absolute', left: '18%', top: '30%', width: 70, height: 70, borderRadius: '50%', border: '2px solid #ef4444', opacity: 0.5 }} />
                  <div style={{ position: 'absolute', right: '22%', top: '35%', width: 60, height: 60, borderRadius: '50%', border: '2px solid #ef4444', opacity: 0.5 }} />
                </>
              )}
              <button onClick={() => { const idx = IM_CAR_VIEWS.indexOf(carView); setCarView(IM_CAR_VIEWS[(idx + 1) % 5]) }} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', border: '2px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', zIndex: 5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {IM_CAR_VIEWS.map(v => <IMCarViewIcon key={v} view={v} active={carView === v} onClick={() => setCarView(v)} />)}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Inspection Logs</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {IM_LOGS.map((log, i) => (
                <div key={i} onClick={() => setSelLogIdx(i)} style={{ display: 'flex', alignItems: 'center', padding: '9px 14px', cursor: 'pointer', background: selLogIdx === i ? '#dbeafe' : i % 2 === 0 ? '#fff' : '#fafbfc', borderBottom: '1px solid #f5f5f5', borderLeft: selLogIdx === i ? '3px solid #2563eb' : '3px solid transparent' }}>
                  <span style={{ fontSize: 11.5, color: '#475569', width: '52%', whiteSpace: 'nowrap' }}>{log.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600, color: '#1e293b', width: '35%' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg>
                    {log.inspector}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', width: '13%', textAlign: 'right' }}>{log.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div style={{ width: '55%', overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#1360EF' }}>Inspection Report</span>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            </button>
          </div>
          {[{ title: 'Mandatory', items: IM_MANDATORY, empties: 2 }, { title: 'Optional', items: IM_OPTIONAL, empties: 0 }].map(sec => (
            <div key={sec.title} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', flex: 1 }}>{sec.title}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', width: 60, textAlign: 'center' }}>Prev</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', width: 60, textAlign: 'center' }}>Current</span>
              </div>
              {sec.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ fontSize: 12.5, color: '#475569', flex: 1 }}>{item}</span>
                  <div style={{ width: 60, display: 'flex', justifyContent: 'center' }}><IMCheck checked={IM_CHECKLIST_PREV[item]} color="#94a3b8" /></div>
                  <div style={{ width: 60, display: 'flex', justifyContent: 'center' }}><IMCheck checked={IM_CHECKLIST_CURRENT[item]} color="#22c55e" /></div>
                </div>
              ))}
              {Array.from({ length: sec.empties }).map((_, i) => (
                <div key={'e' + i} style={{ display: 'flex', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ flex: 1 }} />
                  <div style={{ width: 60, textAlign: 'center', fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>— —</div>
                  <div style={{ width: 60, textAlign: 'center', fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>— —</div>
                </div>
              ))}
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Scratches/Dents</div>
            {IM_SCRATCHES.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#f8fafc', borderRadius: 10, marginBottom: 6, border: '1px solid #f0f0f0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#e2e8f0', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5"><rect x="4" y="12" width="16" height="6" rx="2" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" /><path d="M6 12l2-5h8l2 5" /></svg>
                </div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{s.type}</div><div style={{ fontSize: 11, color: '#94a3b8' }}>{s.desc}</div></div>
                <span style={{ padding: '4px 12px', borderRadius: 6, background: '#2563eb', color: '#fff', fontSize: 11, fontWeight: 700 }}>{s.location}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Photos</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[0, 1, 2, 3, 4, 5].map(i => <IMPhotoPlaceholder key={i} size={'100%'} />)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Driver Details</div>
            <div style={{ padding: 14, background: '#f8fafc', borderRadius: 10, border: '1px solid #f0f0f0' }}>
              <svg width="140" height="50" viewBox="0 0 140 50" style={{ display: 'block', margin: '0 auto 6px' }}>
                <path d="M15 40 Q25 15 40 30 Q55 45 70 20 Q85 5 100 25 Q110 35 125 15" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>FEROZ KHEL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Mobile ───────────────────────────────────────────────────────
function IMSignatureSVG() {
  return (
    <svg width="160" height="60" viewBox="0 0 160 60" style={{ display: 'block', margin: '8px auto' }}>
      <path d="M10 45 Q20 10 35 30 Q50 50 65 20 Q75 5 90 30 Q100 45 115 15 Q125 5 145 25" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 35 Q90 50 110 30 Q120 20 135 35" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IMCollapsible({ title, items, mode, checked, onToggle }: { title: string; items: string[]; mode: 'view' | 'form'; checked?: Record<string, boolean>; onToggle?: (item: string) => void }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ background: '#fff', borderRadius: 14, marginBottom: 12, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', cursor: 'pointer' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" style={{ transform: open ? 'rotate(0)' : 'rotate(180deg)', transition: 'transform 0.2s' }}><path d="M18 15l-6-6-6 6" /></svg>
        <span style={{ fontSize: 15, fontWeight: 800, color: '#1e293b' }}>{title}</span>
      </div>
      {open && (
        <div style={{ padding: '0 16px 12px' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: i > 0 ? '1px solid #f5f5f5' : 'none' }}>
              <span style={{ fontSize: 13.5, color: '#1e293b' }}>{item}</span>
              {mode === 'view' ? (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#22c55e', display: 'grid', placeItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                </div>
              ) : (
                <div onClick={() => onToggle && onToggle(item)} style={{ width: 26, height: 26, borderRadius: 6, border: checked && checked[item] ? 'none' : '2px solid #cbd5e1', background: checked && checked[item] ? '#22c55e' : '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                  {checked && checked[item] && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function IMDetailScreen({ onRecords }: { onRecords: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F4F7' }}>
      <div style={{ margin: 14, background: '#fff', borderRadius: 16, padding: 16, position: 'relative', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
        <img src="/cars/car-top.png" alt="car top" style={{ width: '100%', maxHeight: 160, objectFit: 'contain' }} />
        <div style={{ position: 'absolute', top: 12, right: 12, width: 52, height: 52, borderRadius: '50%', background: '#22c55e', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 20, fontWeight: 800, boxShadow: '0 2px 8px rgba(34,197,94,.4)' }}>83</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
        {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i === 0 ? '#2563eb' : '#c7d2fe' }} />)}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#1e293b' }}>AA WC Van 58542</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>Inspected On 19/06/2026</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Next Inspection On 19/06/2026</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
        <button onClick={onRecords} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>Records
        </button>
        <button style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
        </button>
      </div>
      <div style={{ padding: '0 14px 14px' }}>
        <IMCollapsible title="Mandatory" items={IM_MANDATORY} mode="view" />
        <IMCollapsible title="Optional" items={IM_OPTIONAL} mode="view" />
      </div>
    </div>
  )
}

function IMRecordsModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div style={{ position: 'relative', marginTop: 'auto', background: '#fff', borderRadius: '20px 20px 0 0', maxHeight: '75%', display: 'flex', flexDirection: 'column', animation: 'emSlideUp 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: '#2563eb', borderRadius: '20px 20px 0 0' }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Inspection Records</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', color: '#fff', fontSize: 16, display: 'grid', placeItems: 'center' }}>✕</button>
        </div>
        <div style={{ display: 'flex', padding: '10px 18px', borderBottom: '1px solid #e2e8f0' }}>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#64748b', fontStyle: 'italic' }}>Date</span>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#64748b', fontStyle: 'italic' }}>Inspected By</span>
          <span style={{ width: 50, fontSize: 12, fontWeight: 700, color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>Score</span>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {IM_MOBILE_RECORDS.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid #f5f5f5' }}>
              <span style={{ flex: 1, fontSize: 12.5, color: '#475569' }}>{r.date}</span>
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: '#1e293b' }}>{r.inspector}</span>
              <span style={{ width: 50, fontSize: 13, fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>{r.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IMNewInspectionForm({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [formChecked, setFormChecked] = useState<Record<string, boolean>>({})
  const toggleCheck = (item: string) => setFormChecked(prev => ({ ...prev, [item]: !prev[item] }))
  const signBtn = (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>Sign
      </button>
    </div>
  )
  return (
    <>
      <div style={{ background: '#1360EF', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>←</button>
        <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>AA WC Van 58542</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#F0F4F7' }}>
        <IMCollapsible title="Mandatory" items={IM_MANDATORY} mode="form" checked={formChecked} onToggle={toggleCheck} />
        <IMCollapsible title="Optional" items={IM_OPTIONAL} mode="form" checked={formChecked} onToggle={toggleCheck} />
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, position: 'relative', border: '1px solid #f0f0f0' }}>
          <img src="/cars/car-left.png" alt="car side" style={{ width: '100%', maxHeight: 140, objectFit: 'contain' }} />
          <button style={{ position: 'absolute', bottom: 12, right: 12, width: 40, height: 40, borderRadius: 8, background: '#2563eb', border: 'none', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: '0 2px 8px rgba(37,99,235,.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
          </button>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#1e293b' }}>Scratches / Dents</span><span style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>0</span>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 14, fontWeight: 800, color: '#1e293b' }}>Photos</span><span style={{ fontSize: 14, fontWeight: 600, color: '#2563eb' }}>0</span></div>
          <button style={{ width: 34, height: 34, borderRadius: 8, background: '#2563eb', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 700, display: 'grid', placeItems: 'center' }}>+</button>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Remarks</div>
          <textarea placeholder="Add details..." style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 10, padding: '11px 14px', fontSize: 13, fontFamily: 'inherit', minHeight: 80, resize: 'vertical', outline: 'none', boxSizing: 'border-box', color: '#1e293b' }} />
        </div>
        {['Inspector Signature', 'Driver Signature'].map(lbl => (
          <div key={lbl} style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>{lbl}</div>
            <input placeholder="Ijaz" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 10, padding: '11px 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', color: '#1e293b', marginBottom: 8 }} />
            {signBtn}
          </div>
        ))}
        <button onClick={onSave} style={{ width: '100%', padding: '14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 12 }}>Save</button>
      </div>
    </>
  )
}

function IMCompletedScreen({ onBack }: { onBack: () => void }) {
  return (
    <>
      <div style={{ background: '#1360EF', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>←</button>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>Inspection</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#F0F4F7' }}>
        <IMCollapsible title="Optional" items={IM_OPTIONAL} mode="view" />
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>Remarks</div><div style={{ fontSize: 13, color: '#475569' }}>good</div>
        </div>
        {['Driver Signature', 'Inspector Signature'].map(lbl => (
          <div key={lbl} style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>{lbl}</div>
            <IMSignatureSVG /><div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginTop: 4 }}>Ijaz</div>
          </div>
        ))}
      </div>
    </>
  )
}

function IMMobileApp() {
  const [screen, setScreen] = useState<'detail' | 'form' | 'completed'>('detail')
  const [showRecords, setShowRecords] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
      <div className="tm-phone">
        <div className="tm-phone-screen">
          <StatusBar time="3:41" />
          {screen === 'detail' && (
            <>
              <div style={{ background: '#1360EF', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#fff', fontSize: 17, cursor: 'pointer' }}>←</span>
                  <span style={{ color: '#fff', fontSize: 17, fontWeight: 800 }}>Inspection</span>
                </div>
                <button onClick={() => setScreen('form')} style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
                </button>
              </div>
              <IMDetailScreen onRecords={() => setShowRecords(true)} />
              <BottomNav active="Home" />
              {showRecords && <IMRecordsModal onClose={() => setShowRecords(false)} />}
            </>
          )}
          {screen === 'form' && <IMNewInspectionForm onBack={() => setScreen('detail')} onSave={() => setScreen('completed')} />}
          {screen === 'completed' && (
            <>
              <IMCompletedScreen onBack={() => setScreen('detail')} />
              <BottomNav active="Home" />
            </>
          )}
          <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 120, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.2)' }} />
        </div>
      </div>
    </div>
  )
}

export default function InspectionShowcase() {
  const [tab, setTab] = useState<'web' | 'mobile'>('web')
  return (
    <div className="ms-embed">
      <ModuleTabs tab={tab} setTab={setTab} />
      <div key={tab} style={{ animation: 'msFadeIn 0.3s ease' }}>
        {tab === 'web' ? <div className="ms-web-scroll"><IMWebDashboard /></div> : <IMMobileApp />}
      </div>
    </div>
  )
}
