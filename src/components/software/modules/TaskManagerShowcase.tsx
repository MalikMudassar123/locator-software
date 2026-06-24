'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
// Task Manager — interactive wireframe showcase (Web dashboard + Mobile app).
// Ported from Locator-websites tm-data/tm-web/tm-mobile.
import {
  createContext, useContext, useState, useRef, useEffect, useCallback, useMemo,
  type ReactNode,
} from 'react'

const TM_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Assigned:      { bg: '#EBF0FF', text: '#1360EF', border: '#c7d2fe' },
  'In Progress': { bg: '#FFF5E6', text: '#D97706', border: '#fcd34d' },
  Completed:     { bg: '#E8FAF0', text: '#16A34A', border: '#86efac' },
}

function tmNow() {
  const d = new Date(); const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
}

const INIT_STAFF: any[] = [
  { id: 1, name: 'Shilender', vehicle: 'MAHBOOB-75626', initials: 'SH', color: '#1360EF', shift: '08:00 - 18:00',
    tasks: [
      { id: 13, desc: 'Store to Richmond warehouse', personnel: 'Anjal', window: '11:42-11:52', loc: 'Branch A', code: 'BRANCH A (0543)', status: 'Completed', assigned: '19/06/2026 08:17', started: '19/06/2026 11:42', completed: '19/06/2026 15:19', by: 'BERANCH - R', est: '-', type: 'Store delivery' },
      { id: 14, desc: 'R BR to M9 Store delivery', personnel: 'Ravi PR', window: '11:43-11:53', loc: 'Branch M9 Store', code: 'BRANCH M9 Store (0543)', status: 'Completed', assigned: '19/06/2026 08:17', started: '19/06/2026 11:43', completed: '19/06/2026 15:19', by: 'BERANCH - R', est: '-', type: 'Branch transfer' },
      { id: 15, desc: 'M9 Store to Excel warehouse', personnel: 'Ravi PR', window: '11:44-11:54', loc: 'Excel warehouse', code: 'EXCEL ()', status: 'Completed', assigned: '19/06/2026 08:17', started: '19/06/2026 11:44', completed: '19/06/2026 15:19', by: 'BERANCH - R', est: '-', type: 'Store transfer' },
      { id: 16, desc: 'M9 Store to Speedex depot', personnel: 'Ravi PR', window: '11:52-12:02', loc: 'Speedex Auto Workshop', code: 'SPEEDEX AUTO WORKSHOP ()', status: 'In Progress', assigned: '19/06/2026 08:17', started: '19/06/2026 15:20', completed: null, by: 'BERANCH - R', est: '-', type: 'Depot delivery' },
      { id: 17, desc: 'M9 Store to F Branch', personnel: 'Ravi PR', window: '15:18-15:28', loc: 'F Branch', code: 'F BRANCH ()', status: 'Assigned', assigned: '19/06/2026 08:17', started: null, completed: null, by: 'BERANCH - R', est: '-', type: 'Branch delivery' },
    ] },
  { id: 2, name: 'Ahmed Khan', vehicle: 'Toyota-54921', initials: 'AK', color: '#1fbf5b', shift: '07:30 - 17:30',
    tasks: [
      { id: 21, desc: 'Deliver electronics order #E-4821', personnel: 'Anjal', window: '09:00-10:30', loc: 'Marina Mall, Dubai', code: 'MARINA MALL (DXB-042)', status: 'Completed', assigned: '19/06/2026 07:45', started: '19/06/2026 09:02', completed: '19/06/2026 10:18', by: 'Admin - Fleet Ops', est: '1h 30m', type: 'Last-mile delivery' },
      { id: 22, desc: 'Warehouse pickup — electronics batch', personnel: 'Ravi PR', window: '10:45-12:00', loc: 'Jebel Ali Free Zone', code: 'JAFZA WAREHOUSE (JBL-019)', status: 'In Progress', assigned: '19/06/2026 07:50', started: '19/06/2026 10:50', completed: null, by: 'Admin - Fleet Ops', est: '1h 15m', type: 'Warehouse pickup' },
      { id: 23, desc: 'Express delivery — fragile items', personnel: 'Anjal', window: '12:30-13:30', loc: 'Downtown Dubai', code: 'DOWNTOWN (DXB-088)', status: 'Assigned', assigned: '19/06/2026 08:25', started: null, completed: null, by: 'Dispatch - Sarah M.', est: '1h', type: 'Express delivery' },
      { id: 24, desc: 'Customer return pickup', personnel: 'Ravi PR', window: '14:00-15:00', loc: 'Al Barsha, MOE Area', code: 'AL BARSHA (DXB-034)', status: 'Completed', assigned: '19/06/2026 08:30', started: '19/06/2026 14:05', completed: '19/06/2026 14:42', by: 'Admin - Fleet Ops', est: '1h', type: 'Return pickup' },
    ] },
  { id: 3, name: 'Ravi Patel', vehicle: 'Isuzu-49262', initials: 'RP', color: '#ff9f0a', shift: '08:00 - 18:00',
    tasks: [
      { id: 31, desc: 'FMCG restock — supermarket route', personnel: 'Priya S.', window: '08:00-10:00', loc: 'Carrefour, City Centre', code: 'DEIRA CC (DXB-011)', status: 'Completed', assigned: '19/06/2026 07:45', started: '19/06/2026 08:02', completed: '19/06/2026 09:48', by: 'Admin - Fleet Ops', est: '2h', type: 'FMCG restock' },
      { id: 32, desc: 'Frozen goods — cold chain delivery', personnel: 'Priya S.', window: '10:30-12:00', loc: 'LuLu Hypermarket', code: 'AL BARSHA LULU (DXB-027)', status: 'Completed', assigned: '19/06/2026 07:50', started: '19/06/2026 10:35', completed: '19/06/2026 11:42', by: 'Dispatch - Sarah M.', est: '1h 30m', type: 'Cold chain delivery' },
      { id: 33, desc: 'Pickup empty crates from outlet', personnel: 'Anjal', window: '12:30-13:30', loc: 'Spinneys, The Greens', code: 'GREENS (DXB-063)', status: 'In Progress', assigned: '19/06/2026 08:00', started: '19/06/2026 12:35', completed: null, by: 'Admin - Fleet Ops', est: '1h', type: 'Crate pickup' },
      { id: 34, desc: 'Deliver promotional displays', personnel: 'Priya S.', window: '14:00-15:30', loc: 'Nesto, Al Nahda', code: 'AL NAHDA (DXB-071)', status: 'Assigned', assigned: '19/06/2026 08:10', started: null, completed: null, by: 'Admin - Fleet Ops', est: '1h 30m', type: 'Display delivery' },
    ] },
  { id: 4, name: 'Sami Khalil', vehicle: 'Van-75626', initials: 'SK', color: '#7a5ae0', shift: '09:00 - 19:00',
    tasks: [
      { id: 41, desc: 'Courier pickup — Speedex depot', personnel: 'Ravi PR', window: '09:30-10:30', loc: 'Speedex, Musaffah', code: 'SPEEDEX (AUH-015)', status: 'Completed', assigned: '19/06/2026 08:45', started: '19/06/2026 09:32', completed: '19/06/2026 10:15', by: 'Admin - Fleet Ops', est: '1h', type: 'Courier pickup' },
      { id: 42, desc: 'Last-mile delivery — customer doorstep', personnel: 'Ravi PR', window: '11:00-12:00', loc: 'Khalifa City, Abu Dhabi', code: 'KHALIFA CITY (AUH-033)', status: 'Completed', assigned: '19/06/2026 08:50', started: '19/06/2026 11:05', completed: '19/06/2026 11:48', by: 'Dispatch - Omar A.', est: '1h', type: 'Last-mile delivery' },
      { id: 43, desc: 'Cash-on-delivery collection', personnel: 'Anjal', window: '12:30-13:30', loc: 'Musaffah Industrial', code: 'MUSAFFAH (AUH-041)', status: 'Assigned', assigned: '19/06/2026 09:00', started: null, completed: null, by: 'Admin - Fleet Ops', est: '1h', type: 'COD collection' },
    ] },
  { id: 5, name: 'Priya Sharma', vehicle: 'Pulsar-67602', initials: 'PS', color: '#e85d75', shift: '07:00 - 17:00',
    tasks: [
      { id: 51, desc: 'Medical supplies delivery — urgent', personnel: 'Anjal', window: '07:30-08:30', loc: 'Mediclinic, City Walk', code: 'CITY WALK (DXB-095)', status: 'Completed', assigned: '19/06/2026 07:15', started: '19/06/2026 07:32', completed: '19/06/2026 08:18', by: 'Admin - Fleet Ops', est: '1h', type: 'Medical delivery' },
      { id: 52, desc: 'Pharmacy restock — cold chain', personnel: 'Ravi PR', window: '09:00-10:30', loc: 'Aster Pharmacy, Karama', code: 'KARAMA (DXB-044)', status: 'In Progress', assigned: '19/06/2026 07:20', started: '19/06/2026 09:05', completed: null, by: 'Dispatch - Omar A.', est: '1h 30m', type: 'Pharmacy restock' },
      { id: 53, desc: 'Lab sample pickup', personnel: 'Anjal', window: '11:00-12:00', loc: 'Al Noor Hospital', code: 'AL NOOR (AUH-008)', status: 'Assigned', assigned: '19/06/2026 07:25', started: null, completed: null, by: 'Admin - Fleet Ops', est: '1h', type: 'Sample pickup' },
    ] },
  { id: 6, name: 'Omar Ali', vehicle: 'Corolla-66982', initials: 'OA', color: '#00b4d8', shift: '08:30 - 18:30',
    tasks: [
      { id: 61, desc: 'Client visit — product demo setup', personnel: 'Priya S.', window: '09:00-11:00', loc: 'DIFC, Gate Village', code: 'DIFC GATE (DXB-091)', status: 'Assigned', assigned: '19/06/2026 08:30', started: null, completed: null, by: 'Admin - Fleet Ops', est: '2h', type: 'Client visit' },
      { id: 62, desc: 'Contract document collection', personnel: 'Anjal', window: '11:30-12:30', loc: 'JLT, Cluster D', code: 'JLT (DXB-078)', status: 'Assigned', assigned: '19/06/2026 08:35', started: null, completed: null, by: 'Dispatch - Sarah M.', est: '1h', type: 'Document collection' },
    ] },
  { id: 7, name: 'Faruk Driver', vehicle: 'Isuzu-49262', initials: 'FD', color: '#94a3b8', shift: '08:00 - 18:00', tasks: [] },
  { id: 8, name: 'Prashanth', vehicle: 'Toyota-62387', initials: 'PR', color: '#2dd4bf', shift: '07:00 - 17:00',
    tasks: [
      { id: 81, desc: 'FMCG bulk delivery — 15 outlets', personnel: 'Anjal', window: '07:00-12:00', loc: 'Multiple locations', code: 'ROUTE A (DXB-MULTI)', status: 'Completed', assigned: '19/06/2026 06:45', started: '19/06/2026 07:02', completed: '19/06/2026 11:48', by: 'Admin - Fleet Ops', est: '5h', type: 'Bulk delivery' },
      { id: 82, desc: 'Empty van return to depot', personnel: 'Ravi PR', window: '12:30-13:00', loc: 'Central Depot, Al Quoz', code: 'DEPOT (DXB-001)', status: 'Completed', assigned: '19/06/2026 06:50', started: '19/06/2026 12:32', completed: '19/06/2026 12:55', by: 'Admin - Fleet Ops', est: '30m', type: 'Van return' },
    ] },
]

// ── Context ───────────────────────────────────────────────────────
interface TMCtx {
  staff: any[]; selStaff: any; selTask: any; selStaffId: number; selTaskId: number | null;
  setSelTaskId: (id: number | null) => void; updateStatus: (s: number, t: number, st: string) => void;
  stats: (s: any) => { total: number; assigned: number; inProgress: number; completed: number };
}
const TMContext = createContext<TMCtx | null>(null)
const useTM = () => useContext(TMContext) as TMCtx

function TMProvider({ children }: { children: ReactNode }) {
  const [staff, setStaff] = useState<any[]>(() => JSON.parse(JSON.stringify(INIT_STAFF)))
  const [selStaffId] = useState(1)
  const [selTaskId, setSelTaskId] = useState<number | null>(13)

  const selStaff = useMemo(() => staff.find(s => s.id === selStaffId), [staff, selStaffId])

  const stats = useCallback((s: any) => {
    const t = s.tasks
    return { total: t.length, assigned: t.filter((x: any) => x.status === 'Assigned').length, inProgress: t.filter((x: any) => x.status === 'In Progress').length, completed: t.filter((x: any) => x.status === 'Completed').length }
  }, [])

  const selTask = useMemo(() => selStaff?.tasks.find((t: any) => t.id === selTaskId) || null, [selStaff, selTaskId])

  const updateStatus = useCallback((staffId: number, taskId: number, newStatus: string) => {
    setStaff(prev => prev.map(s => {
      if (s.id !== staffId) return s
      return { ...s, tasks: s.tasks.map((t: any) => {
        if (t.id !== taskId) return t
        const u = { ...t, status: newStatus }; const now = tmNow()
        if (newStatus === 'Assigned') { u.started = null; u.completed = null }
        else if (newStatus === 'In Progress') { if (!t.started) u.started = now; u.completed = null }
        else if (newStatus === 'Completed') { if (!t.started) u.started = now; u.completed = now }
        return u
      }) }
    }))
  }, [])

  const val = useMemo<TMCtx>(() => ({ staff, selStaff, selTask, selStaffId, selTaskId, setSelTaskId, updateStatus, stats }),
    [staff, selStaff, selTask, selStaffId, selTaskId, updateStatus, stats])

  return <TMContext.Provider value={val}>{children}</TMContext.Provider>
}

// ── Shared bits ──────────────────────────────────────────────────
function TMStatusBadge({ task, staffId, small }: { task: any; staffId: number; small?: boolean }) {
  const { updateStatus } = useTM()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])
  const c = TM_STATUS_COLORS[task.status]
  return (
    <div ref={ref} style={{ position: 'relative', zIndex: open ? 50 : 1 }}>
      <div className="tm-status" style={{ background: c.bg, color: c.text, fontSize: small ? 11 : 12 }}
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.text, flexShrink: 0 }} />
        {task.status}
      </div>
      {open && (
        <div className="tm-status-dropdown" onClick={e => e.stopPropagation()}>
          {['Assigned', 'In Progress', 'Completed'].map(s => {
            const sc = TM_STATUS_COLORS[s]
            return (
              <button key={s} className="tm-status-option" style={{ color: sc.text, fontWeight: s === task.status ? 700 : 500 }}
                onClick={() => { updateStatus(staffId, task.id, s); setOpen(false) }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: sc.text, flexShrink: 0 }} />
                {s}{s === task.status && <span style={{ marginLeft: 'auto', fontSize: 13 }}>✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TMTaskRow({ task, staffId, isSelected, onClick }: { task: any; staffId: number; isSelected: boolean; onClick: () => void }) {
  return (
    <div className={`tm-task-row${isSelected ? ' selected' : ''}`} onClick={onClick}
      style={isSelected ? { background: '#EAF1FF', border: '2px dashed #CDD8EC', padding: '10px 12px' } : undefined}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="tm-task-badge">#{task.id}</div>
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Job Description : </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{task.desc}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ fontSize: 10.5, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              {task.assigned?.split(' ')[0]}
            </div>
            <TMStatusBadge task={task} staffId={staffId} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: '#94a3b8', paddingLeft: 46 }}>
          <span><b style={{ color: '#64748b' }}>Sales Personal :</b> {task.personnel}</span>
          {task.completed && <span style={{ marginLeft: 'auto' }}><b style={{ color: '#64748b' }}>Completed Time :</b> {task.completed}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: '#94a3b8', paddingLeft: 46 }}>
          <span><b style={{ color: '#64748b' }}>Time Window :</b> {task.window}</span>
          <span style={{ marginLeft: 'auto' }}><b style={{ color: '#64748b' }}>Location :</b> {task.code}</span>
        </div>
      </div>
    </div>
  )
}

function TMMapPlaceholder({ small }: { small?: boolean }) {
  const h = small ? 70 : 90
  return (
    <div style={{ width: '100%', height: h, borderRadius: 10, background: 'linear-gradient(135deg,#e8f0fe 0%,#d4e4f7 50%,#e0ecf5 100%)', position: 'relative', overflow: 'hidden', border: '1px solid #d1dce8' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(255,255,255,0.35) 1px,transparent 1px),linear-gradient(rgba(255,255,255,0.35) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <svg viewBox="0 0 24 32" style={{ position: 'absolute', top: '42%', left: '52%', transform: 'translate(-50%,-100%)', width: 24, height: 32 }}>
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="#EF4444" />
        <circle cx="12" cy="11" r="4.5" fill="#fff" />
      </svg>
      <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 9, fontWeight: 600, color: '#94a3b8', background: 'rgba(255,255,255,0.7)', padding: '2px 6px', borderRadius: 4 }}>Map</div>
    </div>
  )
}

function TMDetailPanel() {
  const { selTask: t, selStaff: s, setSelTaskId } = useTM()
  if (!t) return null
  const Field = ({ label, children }: { label: string; children: ReactNode }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b' }}>{children}</div>
    </div>
  )
  return (
    <div className="tm-detail-side">
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Task #{t.id}</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {['✏️', '🗑️', '💬'].map((icon, i) => <button key={i} className="tm-detail-action">{icon}</button>)}
          <button className="tm-detail-action" onClick={() => setSelTaskId(null)}>✕</button>
        </div>
      </div>
      <div className="tm-detail-scroll">
        <Field label="Created by">{t.by}</Field>
        <Field label="Staff">{s.name}</Field>
        <Field label="Estimated Time">{t.est}</Field>
        <Field label="Sales Personal">{t.personnel}</Field>
        <Field label="Job Description">{t.desc}</Field>
        <Field label="Time Window">{t.window}</Field>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Location</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>{t.loc}</div>
          <TMMapPlaceholder />
        </div>
        <Field label="Job Type">{t.type}</Field>
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 14, marginTop: 4 }}>
          <Field label="Assigned Time">{t.assigned || '–'}</Field>
          <Field label="In Progress Time">{t.started || '–'}</Field>
          <Field label="Completed Time">{t.completed || '–'}</Field>
        </div>
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 14, marginTop: 4 }}>
          <Field label="Signature">{t.status === 'Completed' ? <span style={{ color: '#16a34a' }}>Signed ✓</span> : <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Pending</span>}</Field>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Review</div>
            <TMStatusBadge task={t} staffId={s.id} small />
          </div>
        </div>
      </div>
    </div>
  )
}

function TMWebDashboard() {
  const { selStaffId, selTaskId, setSelTaskId, selStaff, stats: getStats } = useTM()
  const st = selStaff ? getStats(selStaff) : { total: 0, assigned: 0, inProgress: 0, completed: 0 }
  const hasDetail = !!selTaskId
  const topBg = '#F3F7FA'; const accent = '#1360EF'
  return (
    <div className="tm-web ms-web-min" style={{ gridTemplateColumns: hasDetail ? '1fr 220px' : '1fr' }}>
      <div className="tm-task-panel" style={{ borderRight: hasDetail ? '1px solid #e2e8f0' : 'none' }}>
        {/* Toolbar */}
        <div style={{ padding: '10px 16px', background: topBg, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 18, borderRadius: 9, background: '#22c55e', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
            </div>
            <div>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1e293b' }}>Active Tasks</span>
              <div style={{ fontSize: 10, color: '#94a3b8' }}>19/06/2026</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button className="tm-toolbar-btn">Today</button>
            <button className="tm-toolbar-btn" style={{ padding: '5px 8px' }}>▾</button>
            <button className="tm-toolbar-btn primary">Show Route</button>
            <button className="tm-toolbar-btn" style={{ padding: '5px 8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button className="tm-toolbar-btn" style={{ fontSize: 11 }}>All items are sel… ▾</button>
            <button className="tm-toolbar-btn primary">Create A Task</button>
            <button className="tm-toolbar-btn primary">Locations</button>
            <button className="tm-toolbar-btn" style={{ padding: '5px 8px', fontSize: 14, fontWeight: 800 }}>⋮</button>
          </div>
        </div>
        {/* Staff + stats */}
        {selStaff && (
          <div style={{ padding: '12px 16px', background: topBg, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="tm-avatar" style={{ background: selStaff.color, width: 44, height: 44, fontSize: 15 }}>{selStaff.initials}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', textTransform: 'uppercase' }}>{selStaff.name} <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500, textTransform: 'none' }}>[{selStaff.shift}]</span></div>
                <div style={{ fontSize: 10.5, color: '#94a3b8', fontFamily: 'ui-monospace,monospace', marginTop: 2 }}>[{selStaff.vehicle}]</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ n: st.total, l: 'Total', c: '#1e293b' }, { n: st.assigned, l: 'Assigned', c: accent }, { n: st.inProgress, l: 'In progress', c: '#d97706' }, { n: st.completed, l: 'Completed', c: '#16a34a' }].map(x => (
                <div key={x.l} style={{ textAlign: 'center', minWidth: 60, padding: '8px', borderRadius: 8, background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: x.c, fontVariantNumeric: 'tabular-nums' }}>{x.n}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Task list */}
        <div className="tm-task-list-scroll">
          {selStaff?.tasks.map((task: any) => (
            <TMTaskRow key={task.id} task={task} staffId={selStaffId} isSelected={task.id === selTaskId} onClick={() => setSelTaskId(task.id)} />
          ))}
        </div>
        {/* Footer */}
        {selStaff?.tasks.length > 0 && (
          <div style={{ padding: '8px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
            <input placeholder="Search..." style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontFamily: 'inherit', outline: 'none', width: 140 }} />
            <span style={{ color: accent, fontWeight: 600 }}>showing 1-{selStaff.tasks.length} of {selStaff.tasks.length} items</span>
          </div>
        )}
      </div>
      {hasDetail && <TMDetailPanel />}
    </div>
  )
}

// ── Mobile app ───────────────────────────────────────────────────
function StatusBar({ time }: { time: string }) {
  return (
    <div style={{ height: 36, padding: '0 24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 4, fontSize: 11, fontWeight: 600, color: '#fff', flexShrink: 0, background: '#1360EF' }}>
      <span>{time}</span>
      <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 10 }}>
        <svg width="14" height="10" viewBox="0 0 16 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="0.5" /><rect x="4.5" y="5" width="3" height="7" rx="0.5" /><rect x="9" y="2" width="3" height="10" rx="0.5" /><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3" /></svg>
        <svg width="14" height="10" viewBox="0 0 16 12" fill="#fff"><path d="M8 2C5.2 2 2.7 3.1 1 5l1.4 1.4C3.8 5 5.8 4 8 4s4.2 1 5.6 2.4L15 5c-1.7-1.9-4.2-3-7-3zm0 4c-1.7 0-3.2.7-4.2 1.8L5.2 9.2C5.9 8.5 6.9 8 8 8s2.1.5 2.8 1.2l1.4-1.4C11.2 6.7 9.7 6 8 6z" /></svg>
        <svg width="20" height="10" viewBox="0 0 25 12" fill="#fff"><rect x="0" y="1" width="20" height="10" rx="2" fill="none" stroke="#fff" strokeWidth="1" /><rect x="21" y="3.5" width="2" height="5" rx="1" fill="#fff" /><rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="#fff" /></svg>
      </span>
    </div>
  )
}

const NAV_TASKS = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8h20M8 4v16" /></svg>
const NAV_HOME = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg>
const NAV_MORE = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>

function BottomNav({ active }: { active: string }) {
  const items = [{ icon: NAV_TASKS, label: 'Tasks' }, { icon: NAV_HOME, label: 'Home' }, { icon: NAV_MORE, label: 'More' }]
  return (
    <div style={{ display: 'flex', background: '#fff', borderTop: '1px solid #e2e8f0', padding: '6px 0 18px', flexShrink: 0 }}>
      {items.map((item, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontSize: 10, fontWeight: 600, color: item.label === active ? '#1360EF' : '#94a3b8', cursor: 'pointer', padding: 4 }}>
          {item.icon}<span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function TMSignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [hasSig, setHasSig] = useState(false)
  const getPos = (e: any) => {
    const canvas = canvasRef.current!; const rect = canvas.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    return { x: x * (canvas.width / rect.width), y: y * (canvas.height / rect.height) }
  }
  const start = (e: any) => { const ctx = canvasRef.current!.getContext('2d')!; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); setDrawing(true); setHasSig(true) }
  const move = (e: any) => { if (!drawing) return; e.preventDefault(); const ctx = canvasRef.current!.getContext('2d')!; const p = getPos(e); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1e293b'; ctx.lineTo(p.x, p.y); ctx.stroke() }
  const end = () => setDrawing(false)
  const clear = () => { const c = canvasRef.current!; c.getContext('2d')!.clearRect(0, 0, c.width, c.height); setHasSig(false) }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Signature</span>
        {hasSig && <button onClick={clear} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>}
      </div>
      <canvas ref={canvasRef} width={300} height={90}
        style={{ border: '1.5px dashed #cbd5e1', borderRadius: 10, background: '#fff', cursor: 'crosshair', touchAction: 'none', width: '100%', height: 90, display: 'block' }}
        onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
        onTouchStart={start} onTouchMove={move} onTouchEnd={end} />
      {!hasSig && <div style={{ fontSize: 10, color: '#b0b8c4', textAlign: 'center', marginTop: 3 }}>Sign above to confirm delivery</div>}
    </div>
  )
}

function TMPhotoUpload() {
  const [photos, setPhotos] = useState<{ id: number; url: string }[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const addFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => setPhotos(prev => [...prev, { id: Date.now() + Math.random(), url: e.target!.result as string }])
      reader.readAsDataURL(file)
    })
  }
  const remove = (id: number) => setPhotos(prev => prev.filter(p => p.id !== id))
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Delivery Photos</div>
      <div className={`tm-photo-drop${dragOver ? ' dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}>
        <div style={{ fontSize: 22, marginBottom: 2 }}>📷</div>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: '#64748b' }}>Tap or drag photos here</div>
        <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 1 }}>Supports multiple images</div>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={e => e.target.files && addFiles(e.target.files)} />
      </div>
      {photos.length > 0 && (
        <div style={{ display: 'flex', gap: 7, marginTop: 8, flexWrap: 'wrap' }}>
          {photos.map(p => (
            <div key={p.id} style={{ width: 52, height: 52, borderRadius: 8, overflow: 'hidden', position: 'relative', border: '1px solid #e2e8f0' }}>
              { /* eslint-disable-next-line @next/next/no-img-element */ }
              <img src={p.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              <button onClick={(e) => { e.stopPropagation(); remove(p.id) }} style={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 9, display: 'grid', placeItems: 'center', lineHeight: 1 }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TMMobileTaskCard({ task, index, onClick }: { task: any; index: number; onClick: () => void }) {
  const c = TM_STATUS_COLORS[task.status]
  return (
    <div className="tm-mobile-card" onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>Job Description</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginTop: 1 }}>{task.desc}</div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: '#1360EF', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{index + 1}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>Location</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1360EF', marginTop: 1 }}>{task.loc.toUpperCase()}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.bg, display: 'grid', placeItems: 'center', marginLeft: 'auto', marginBottom: 3 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" />{task.status === 'Completed' && <path d="M15 17l2 2 3.5-3.5" strokeWidth="2.5" />}</svg>
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: c.text }}>{task.status}</div>
          <div style={{ fontSize: 9.5, color: '#b0b8c4' }}>{task.assigned?.split(' ')[0]}</div>
        </div>
      </div>
    </div>
  )
}

function TMMobileTaskDetail({ task, staffMember, onBack }: { task: any; staffMember: any; onBack: () => void }) {
  const { updateStatus } = useTM()
  const c = TM_STATUS_COLORS[task.status]
  const cycleStatus = () => {
    const order = ['Assigned', 'In Progress', 'Completed']
    const i = order.indexOf(task.status)
    updateStatus(staffMember.id, task.id, order[(i + 1) % order.length])
  }
  const Field = ({ label, children }: { label: string; children: ReactNode }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{children}</div>
    </div>
  )
  return (
    <>
      <div style={{ background: '#1360EF', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>←</button>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>Task Details</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#F0F4F7' }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <button onClick={cycleStatus} style={{ background: c.bg, color: c.text, border: `1.5px solid ${c.border}`, padding: '7px 22px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.text }} />
            {task.status}<span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
          </button>
          <div style={{ fontSize: 9, color: '#b0b8c4', marginTop: 3 }}>Tap to change status</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <Field label="Assigned By">{task.by}</Field>
          <Field label="Job Description">{task.desc}</Field>
          <Field label="Location">{task.loc}</Field>
          <TMMapPlaceholder small />
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <Field label="Assigned Time">{task.assigned || '–'}</Field>
          <Field label="In Progress Time">{task.started || '–'}</Field>
          <div><div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Completed Time</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{task.completed || '–'}</div></div>
        </div>
        {task.status === 'Completed' && (
          <div style={{ background: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', animation: 'tmSlideUp 0.3s ease' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, background: '#e8faf0', display: 'grid', placeItems: 'center', fontSize: 13 }}>✅</span>Delivery Confirmation
            </div>
            <div style={{ marginBottom: 14 }}><TMSignaturePad /></div>
            <TMPhotoUpload />
          </div>
        )}
      </div>
    </>
  )
}

function TMMobileApp() {
  const { staff } = useTM()
  const [view, setView] = useState('list')
  const [selTask, setSelTask] = useState<any>(null)
  const [selStaffMember, setSelStaffMember] = useState<any>(null)
  const [dateTab, setDateTab] = useState('Today')
  const allTasks = useMemo(() => {
    const out: any[] = []
    staff.forEach(s => s.tasks.forEach((t: any) => out.push({ ...t, _staff: s })))
    return out
  }, [staff])
  const liveTask = useMemo(() => {
    if (!selTask || !selStaffMember) return null
    const s = staff.find(st => st.id === selStaffMember.id)
    return s?.tasks.find((t: any) => t.id === selTask.id) || null
  }, [staff, selTask, selStaffMember])
  const openTask = (task: any) => { setSelTask(task); setSelStaffMember(task._staff); setView('detail') }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
      <div className="tm-phone">
        <div className="tm-phone-screen">
          <StatusBar time="9:41" />
          {view === 'list' ? (
            <>
              <div style={{ background: '#1360EF', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#fff', fontSize: 17, fontWeight: 800 }}>Task Listing</span>
                  <span style={{ background: 'rgba(255,255,255,0.3)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 5 }}>{allTasks.length}</span>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#F0F4F7' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 4, marginBottom: 10, display: 'flex', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  {['Yesterday', 'Today', 'Tomorrow', 'All'].map(d => (
                    <button key={d} onClick={() => setDateTab(d)} style={{ flex: 1, padding: '7px 2px', border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 11.5, fontWeight: d === dateTab ? 700 : 500, color: d === dateTab ? '#1360EF' : '#94a3b8', cursor: 'pointer', borderRadius: 8 }}>{d}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <div style={{ flex: 1, minWidth: 0, background: '#fff', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <input placeholder="Search For" style={{ border: 'none', outline: 'none', flex: 1, minWidth: 0, fontFamily: 'inherit', fontSize: 12, color: '#1e293b', background: 'transparent' }} />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                  </div>
                  <button style={{ width: 36, height: 36, borderRadius: 10, background: '#1360EF', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 15, display: 'grid', placeItems: 'center' }}>↻</button>
                </div>
                {allTasks.map((task, i) => <TMMobileTaskCard key={task.id} task={task} index={i} onClick={() => openTask(task)} />)}
              </div>
              <BottomNav active="Tasks" />
            </>
          ) : (
            liveTask && selStaffMember && <TMMobileTaskDetail task={liveTask} staffMember={selStaffMember} onBack={() => setView('list')} />
          )}
          <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 120, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.2)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Tabs + export ────────────────────────────────────────────────
export { StatusBar, BottomNav }

export default function TaskManagerShowcase() {
  const [tab, setTab] = useState<'web' | 'mobile'>('web')
  return (
    <TMProvider>
      <div className="ms-embed">
        <ModuleTabs tab={tab} setTab={setTab} />
        <div key={tab} style={{ animation: 'msFadeIn 0.3s ease' }}>
          {tab === 'web' ? <div className="ms-web-scroll"><TMWebDashboard /></div> : <TMMobileApp />}
        </div>
      </div>
    </TMProvider>
  )
}

export function ModuleTabs({ tab, setTab }: { tab: 'web' | 'mobile'; setTab: (t: 'web' | 'mobile') => void }) {
  return (
    <div className="ms-tabs">
      <button className={`ms-tab${tab === 'web' ? ' active' : ''}`} onClick={() => setTab('web')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
        Web Dashboard
      </button>
      <button className={`ms-tab${tab === 'mobile' ? ' active' : ''}`} onClick={() => setTab('mobile')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>
        Mobile App
      </button>
    </div>
  )
}
