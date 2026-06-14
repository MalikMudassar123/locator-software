'use client'
import { useState, type ReactNode } from 'react'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const ITEMS = [
  { label: 'Live GPS Tracking',          short: 'Track every vehicle live on the map with real-time speed, location, and driver status.' },
  { label: 'Dynamic Fleet Dashboard',    short: 'Central view of trips, vehicle health, performance scores, and daily activity.' },
  { label: 'Instant Idle Alerts',        short: 'Get notified when a vehicle idles beyond your threshold — cut fuel waste instantly.' },
  { label: 'After-Hours Vehicle Alerts', short: 'Instant alerts for any vehicle movement outside of operating hours.' },
  { label: 'Daily Route History',        short: 'Replay full trip routes, view stop logs, driver activity, and delivery proof.' },
  { label: 'Fleet Service Reminders',    short: 'Automated maintenance alerts for oil, tires, and scheduled service keep vehicles road-ready.' },
  { label: 'Field Tasks Manager',        short: 'Dispatch tasks to field staff and monitor live completion status from the dashboard.' },
  { label: 'Mobile Expense Manager',     short: 'Drivers upload bills on the go. Admins approve and report with one tap.' },
  { label: 'Geofence & POI Monitoring',  short: 'Draw virtual zones around offices, depots, or customer sites and get entry/exit alerts.' },
  { label: 'AI Route Optimization',      short: 'AI-powered routing reduces delays, cuts fuel costs, and improves delivery efficiency.' },
]

// ── Shared stage card chrome ─────────────────────────────────────────────────

function StageWrap({ title, accent = '#1360ee', children }: { title: string; accent?: string; children: ReactNode }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderBottom: '1px solid #e8e8eb', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginLeft: '6px', flex: 1 }}>{title}</span>
        <div style={{ width: '48px', height: '4px', borderRadius: '2px', background: accent, opacity: 0.35 }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

// ── Stage 0: Live GPS Tracking ───────────────────────────────────────────────

function GPSStage() {
  return (
    <StageWrap title="Live Tracking — 47 vehicles" accent="#1360ee">
      <div style={{ padding: '14px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box' }}>
        <div style={{ flex: 1, background: 'linear-gradient(145deg,#e8eef8,#dce8f4)', borderRadius: '12px', position: 'relative', overflow: 'hidden', minHeight: '160px' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
            {[20,40,60,80].map(p => <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="rgba(255,255,255,.55)" strokeWidth="1" />)}
            {[16,33,50,67,84].map(p => <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="rgba(255,255,255,.55)" strokeWidth="1" />)}
            <polyline points="12%,78% 30%,58% 50%,42% 68%,30%" stroke="#1360ee" strokeWidth="2" fill="none" strokeDasharray="6,4" />
          </svg>
          {[
            { l: '30%', t: '58%', c: '#1fbf5b', name: 'VAN-204', info: '62 km/h · Moving' },
            { l: '50%', t: '42%', c: '#ff9f0a', name: 'TRK-118', info: 'Idle · Jebel Ali' },
            { l: '68%', t: '30%', c: '#1360ee', name: 'VAN-211', info: '45 km/h · Moving' },
          ].map((v, i) => (
            <div key={i} style={{ position: 'absolute', left: v.l, top: v.t, transform: 'translate(-50%,-50%)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: v.c, border: '2.5px solid #fff', boxShadow: `0 0 0 4px ${v.c}40` }} />
            </div>
          ))}
          <div style={{ position: 'absolute', right: '12px', top: '12px', background: '#fff', borderRadius: '10px', padding: '10px 13px', boxShadow: '0 4px 18px rgba(0,0,0,.12)', fontSize: '11.5px', minWidth: '128px' }}>
            <div style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '4px' }}>VAN-204</div>
            <div style={{ color: '#6e6e73', marginBottom: '3px' }}>62 km/h</div>
            <div style={{ color: '#6e6e73', marginBottom: '6px' }}>Jebel Ali, Dubai</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#1fbf5b', fontWeight: 700, fontSize: '11px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1fbf5b', display: 'inline-block' }} /> Live
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '7px' }}>
          {[
            { l: 'Active', v: '32', c: '#1fbf5b' },
            { l: 'Idle',   v: '8',  c: '#ff9f0a' },
            { l: 'Stopped',v: '6',  c: '#6e6e73' },
            { l: 'Offline',v: '1',  c: '#ff5f57' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#f5f5f7', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: s.c, letterSpacing: '-.02em' }}>{s.v}</div>
              <div style={{ fontSize: '10px', color: '#6e6e73', marginTop: '2px', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </StageWrap>
  )
}

// ── Stage 1: Dashboard ───────────────────────────────────────────────────────

function DashboardStage() {
  const bars = [55, 72, 65, 80, 90, 78, 95]
  return (
    <StageWrap title="Fleet Dashboard — Today" accent="#1360ee">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '9px', height: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { l: 'Total Trips',    v: '148',     sub: '+12% vs yesterday', c: '#1360ee' },
            { l: 'Total Distance', v: '3,240 km', sub: 'Fleet total today', c: '#13923f' },
            { l: 'Avg Speed',      v: '54 km/h',  sub: 'Fleet average',     c: '#7c3aed' },
            { l: 'Fuel Saved',     v: '18 L',     sub: 'vs manual routing', c: '#c2740a' },
          ].map((k, i) => (
            <div key={i} style={{ background: '#f5f5f7', borderRadius: '12px', padding: '13px' }}>
              <div style={{ fontSize: '10.5px', color: '#6e6e73', fontWeight: 600, marginBottom: '5px' }}>{k.l}</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: k.c, letterSpacing: '-.02em' }}>{k.v}</div>
              <div style={{ fontSize: '10px', color: '#a1a1a6', marginTop: '3px' }}>{k.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: '#f5f5f7', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '80px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#6e6e73' }}>Trips per day — this week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', flex: 1 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, borderRadius: '4px 4px 0 0', background: i === 6 ? '#1360ee' : '#dde3f0', height: `${h}%`, transition: 'height .3s' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '9px', color: i === 6 ? '#1360ee' : '#a1a1a6', fontWeight: 700 }}>{d}</div>
            ))}
          </div>
        </div>
      </div>
    </StageWrap>
  )
}

// ── Stage 2: Idle Alerts ─────────────────────────────────────────────────────

function IdleStage() {
  return (
    <StageWrap title="Idle Alerts — 3 active" accent="#c2740a">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ background: '#fff8ee', border: '1px solid #ffd27e', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#c2740a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚠️</span> 3 vehicles idling beyond 10-min threshold
        </div>
        {[
          { v: 'VAN-204', loc: 'Jebel Ali',    dur: '22 min', since: '09:14' },
          { v: 'TRK-090', loc: 'Business Bay', dur: '18 min', since: '09:28' },
          { v: 'VAN-211', loc: 'Al Quoz',      dur: '11 min', since: '09:41' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', background: '#fff', border: '1px solid #e8e8eb', borderRadius: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff9f0a', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#1d1d1f' }}>{a.v}</div>
              <div style={{ fontSize: '11px', color: '#6e6e73', marginTop: '1px' }}>{a.loc}</div>
            </div>
            <div style={{ textAlign: 'right', marginRight: '4px' }}>
              <div style={{ fontWeight: 800, fontSize: '13px', color: '#c2740a' }}>{a.dur}</div>
              <div style={{ fontSize: '10px', color: '#a1a1a6' }}>since {a.since}</div>
            </div>
            <button style={{ background: '#fff3e3', color: '#c2740a', border: 'none', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Alert</button>
          </div>
        ))}
      </div>
    </StageWrap>
  )
}

// ── Stage 3: After-Hours ─────────────────────────────────────────────────────

function AfterHoursStage() {
  return (
    <StageWrap title="After-Hours Monitor" accent="#7c3aed">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)', borderRadius: '14px', padding: '18px', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '22px' }}>🌙</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '13.5px' }}>After-Hours Movement</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.55)', marginTop: '2px' }}>11:42 PM · 14 Mar 2025</div>
            </div>
            <span style={{ background: '#7c3aed', borderRadius: '8px', padding: '4px 10px', fontSize: '10.5px', fontWeight: 700 }}>Alert</span>
          </div>
          {[
            { l: 'Vehicle',  v: 'TRK-118' },
            { l: 'Location', v: 'Al Quoz Industrial' },
            { l: 'Speed',    v: '48 km/h' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '7px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
              <span style={{ color: 'rgba(255,255,255,.5)' }}>{r.l}</span>
              <span style={{ fontWeight: 700 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[{ l: 'Off-hours trips', v: '1', c: '#7c3aed' }, { l: 'Distance covered', v: '14 km', c: '#1d1d1f' }].map((s, i) => (
            <div key={i} style={{ background: '#f5f5f7', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '15px', color: s.c }}>{s.v}</div>
              <div style={{ fontSize: '10px', color: '#6e6e73', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </StageWrap>
  )
}

// ── Stage 4: Route History ───────────────────────────────────────────────────

function RouteHistoryStage() {
  return (
    <StageWrap title="Route History — VAN-204 · Today" accent="#13923f">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '7px' }}>
          {[{ l: 'Total trips', v: '3' }, { l: 'Total km', v: '69 km' }, { l: 'Drive time', v: '1h 40m' }].map((s, i) => (
            <div key={i} style={{ background: '#edfff4', borderRadius: '10px', padding: '10px 6px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '15px', color: '#13923f' }}>{s.v}</div>
              <div style={{ fontSize: '10px', color: '#6e6e73', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
        {[
          { from: 'Dubai HQ', to: 'Jebel Ali Port', dist: '32 km', dur: '44 min', time: '07:12–07:56' },
          { from: 'Jebel Ali', to: 'Business Bay',  dist: '28 km', dur: '38 min', time: '08:15–08:53' },
          { from: 'Business Bay', to: 'Al Quoz',    dist: '9 km',  dur: '18 min', time: '09:22–09:40' },
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', background: '#fff', border: '1px solid #e8e8eb', borderRadius: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#13923f', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#1d1d1f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.from} → {t.to}</div>
              <div style={{ fontSize: '10.5px', color: '#6e6e73', marginTop: '2px' }}>{t.time} · {t.dist}</div>
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#13923f', flexShrink: 0 }}>{t.dur}</div>
          </div>
        ))}
      </div>
    </StageWrap>
  )
}

// ── Stage 5: Service Reminders ───────────────────────────────────────────────

function ServiceStage() {
  const items = [
    { icon: '🛢️', l: 'Oil Change',    v: 'TRK-118', due: 'Due 320 km',  badge: '#fff3e3', bc: '#c2740a' },
    { icon: '🛞', l: 'Tire Rotation', v: 'VAN-204', due: 'Due 12 days', badge: '#eef3ff', bc: '#1360ee' },
    { icon: '🔧', l: 'Full Service',  v: 'TRK-090', due: 'Completed',   badge: '#edfff4', bc: '#13923f' },
    { icon: '🪫', l: 'Battery Check', v: 'VAN-211', due: 'Overdue 4d',  badge: '#fff0f2', bc: '#c0384d' },
  ]
  return (
    <StageWrap title="Service Manager — Fleet schedule" accent="#1360ee">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', background: '#fff', border: '1px solid #e8e8eb', borderRadius: '12px' }}>
            <span style={{ fontSize: '18px' }}>{it.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#1d1d1f' }}>{it.l}</div>
              <div style={{ fontSize: '11px', color: '#6e6e73', marginTop: '1px' }}>{it.v}</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', background: it.badge, color: it.bc, whiteSpace: 'nowrap' }}>{it.due}</span>
          </div>
        ))}
      </div>
    </StageWrap>
  )
}

// ── Stage 6: Field Tasks ─────────────────────────────────────────────────────

function TasksStage() {
  const tasks = [
    { icon: '📦', t: 'Deliver order #4821', s: 'Sami K. · Jebel Ali',    badge: 'Done',        bg: '#edfff4', bc: '#13923f' },
    { icon: '🛠️', t: 'AC service call',     s: 'Ravi P. · Business Bay', badge: 'In Progress', bg: '#fff3e3', bc: '#c2740a' },
    { icon: '📋', t: 'Site inspection',      s: 'Omar A. · Al Quoz',      badge: 'Assigned',    bg: '#eef3ff', bc: '#1360ee' },
    { icon: '💧', t: 'Water refill route',   s: 'Leo M. · Deira',         badge: 'Queued',      bg: '#f5f5f7', bc: '#6e6e73' },
  ]
  return (
    <StageWrap title="Task Manager — Today's dispatch" accent="#13923f">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tasks.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', background: '#fff', border: '1px solid #e8e8eb', borderRadius: '12px' }}>
            <span style={{ fontSize: '18px' }}>{t.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#1d1d1f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.t}</div>
              <div style={{ fontSize: '11px', color: '#6e6e73', marginTop: '1px' }}>{t.s}</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', background: t.bg, color: t.bc, whiteSpace: 'nowrap' }}>{t.badge}</span>
          </div>
        ))}
      </div>
    </StageWrap>
  )
}

// ── Stage 7: Expense Manager ─────────────────────────────────────────────────

function ExpenseStage() {
  const items = [
    { icon: '⛽', t: 'Fuel — ENOC Station',         s: 'VAN-204 · 14 Mar', amt: 'AED 180', review: false },
    { icon: '🅿️', t: 'Parking — Mall of Emirates',  s: 'TRK-118 · 14 Mar', amt: 'AED 25',  review: false },
    { icon: '🛣️', t: 'Salik toll charge',            s: 'TRK-090 · 13 Mar', amt: 'AED 16',  review: false },
    { icon: '🧾', t: 'Ad-hoc — Loading help',        s: 'VAN-211 · 13 Mar', amt: 'AED 80',  review: true  },
  ]
  return (
    <StageWrap title="Expense Manager — Approvals" accent="#c0384d">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', background: '#fff', border: '1px solid #e8e8eb', borderRadius: '12px' }}>
            <span style={{ fontSize: '18px' }}>{it.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#1d1d1f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.t}</div>
              <div style={{ fontSize: '11px', color: '#6e6e73', marginTop: '1px' }}>{it.s}</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '13px', color: '#1d1d1f', flexShrink: 0, marginRight: '4px' }}>{it.amt}</div>
            {it.review
              ? <button style={{ background: '#fff0f2', color: '#c0384d', border: 'none', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Review</button>
              : <span style={{ fontSize: '13px', fontWeight: 800, color: '#13923f' }}>✓</span>}
          </div>
        ))}
      </div>
    </StageWrap>
  )
}

// ── Stage 8: Geofence ────────────────────────────────────────────────────────

function GeofenceStage() {
  return (
    <StageWrap title="Geofence Monitor — 3 active zones" accent="#1360ee">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxSizing: 'border-box' }}>
        <div style={{ flex: 1, background: 'linear-gradient(145deg,#e8eef8,#dce8f4)', borderRadius: '12px', position: 'relative', overflow: 'hidden', minHeight: '160px' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            {[20,40,60,80].map(p => <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="rgba(255,255,255,.5)" strokeWidth="1" />)}
            {[20,40,60,80].map(p => <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="rgba(255,255,255,.5)" strokeWidth="1" />)}
            <ellipse cx="28%" cy="55%" rx="52" ry="38" fill="rgba(19,144,63,.15)" stroke="#13923f" strokeWidth="1.5" strokeDasharray="6,3" />
            <ellipse cx="55%" cy="38%" rx="44" ry="32" fill="rgba(19,96,238,.15)" stroke="#1360ee" strokeWidth="1.5" strokeDasharray="6,3" />
            <ellipse cx="76%" cy="65%" rx="36" ry="28" fill="rgba(192,56,77,.12)" stroke="#c0384d" strokeWidth="1.5" strokeDasharray="6,3" />
            <text x="28%" y="57%" textAnchor="middle" fontSize="10" fill="#13923f" fontWeight="700">HQ</text>
            <text x="55%" y="40%" textAnchor="middle" fontSize="10" fill="#1360ee" fontWeight="700">Depot</text>
            <text x="76%" y="67%" textAnchor="middle" fontSize="10" fill="#c0384d" fontWeight="700">Client</text>
          </svg>
          <div style={{ position: 'absolute', left: '28%', top: '48%', width: '11px', height: '11px', borderRadius: '50%', background: '#1fbf5b', border: '2.5px solid #fff', boxShadow: '0 0 0 4px rgba(31,191,91,.3)', transform: 'translate(-50%,-50%)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { e: 'VAN-204 entered HQ zone',    t: '09:12', c: '#13923f' },
            { e: 'TRK-118 exited Depot zone',  t: '09:28', c: '#c0384d' },
          ].map((ev, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: '#f5f5f7', borderRadius: '9px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: ev.c }}>{ev.e}</span>
              <span style={{ fontSize: '11px', color: '#6e6e73' }}>{ev.t}</span>
            </div>
          ))}
        </div>
      </div>
    </StageWrap>
  )
}

// ── Stage 9: AI Route Optimization ──────────────────────────────────────────

function AIRouteStage() {
  return (
    <StageWrap title="AI Route Optimization" accent="#7c3aed">
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Current Route', dist: '48 km', time: '1h 22m', fuel: '5.2 L', c: '#6e6e73', bg: '#f5f5f7', border: '#e3e3e6', best: false },
            { label: 'AI Optimized',  dist: '36 km', time: '54 min', fuel: '3.9 L', c: '#7c3aed', bg: '#f3f0ff', border: 'rgba(124,58,237,.25)', best: true },
          ].map((r, i) => (
            <div key={i} style={{ background: r.bg, borderRadius: '14px', padding: '15px', border: `1.5px solid ${r.border}`, position: 'relative' }}>
              {r.best && <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#7c3aed', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', letterSpacing: '.04em' }}>BEST</div>}
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: r.c, marginBottom: '10px' }}>{r.label}</div>
              {[{ l: 'Distance', v: r.dist }, { l: 'Travel time', v: r.time }, { l: 'Fuel est.', v: r.fuel }].map((s, j) => (
                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#6e6e73' }}>{s.l}</span>
                  <span style={{ fontWeight: 700, color: '#1d1d1f' }}>{s.v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ background: '#f3f0ff', borderRadius: '12px', padding: '13px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '22px' }}>🤖</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#7c3aed' }}>Saves 28 min · 12 km · 1.3 L fuel</div>
            <div style={{ fontSize: '11px', color: '#6e6e73', marginTop: '3px' }}>Avoids 2 congestion points on Sheikh Zayed Rd</div>
          </div>
        </div>
      </div>
    </StageWrap>
  )
}

// ── Renderers map ────────────────────────────────────────────────────────────

const STAGES = [
  GPSStage, DashboardStage, IdleStage, AfterHoursStage,
  RouteHistoryStage, ServiceStage, TasksStage, ExpenseStage,
  GeofenceStage, AIRouteStage,
]

// ── Main export ──────────────────────────────────────────────────────────────

export default function BenefitsSection() {
  const [active, setActive] = useState(0)
  const StageContent = STAGES[active]

  return (
    <>
      <style>{`
        @keyframes stageIn {
          from { opacity: 0; transform: translateY(12px) scale(.99); }
          to   { opacity: 1; transform: none; }
        }
        .bfr {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; width: 100%;
          background: none; border: none;
          border-left: 2.5px solid transparent;
          cursor: pointer; font-family: inherit; text-align: left;
          transition: background .18s ${EASE}, border-color .18s ${EASE};
        }
        .bfr:hover { background: #f5f5f7; }
        .bfr.on { background: #eef3ff; border-left-color: #1360ee; }
        .bfr-num { font-size: 10.5px; font-weight: 700; color: #c0c0c8; width: 20px; flex-shrink: 0; font-variant-numeric: tabular-nums; transition: color .18s ${EASE}; }
        .bfr.on .bfr-num { color: #1360ee; }
        .bfr-lbl { font-size: 13.5px; font-weight: 600; color: #1d1d1f; flex: 1; transition: color .18s ${EASE}; letter-spacing: -.01em; }
        .bfr.on .bfr-lbl { color: #1360ee; font-weight: 700; }
        .bfr-arr { font-size: 14px; color: #d8d8de; transition: color .18s ${EASE}, transform .18s ${EASE}; }
        .bfr.on .bfr-arr { color: #1360ee; transform: translateX(2px); }
        .stage-in { animation: stageIn .3s ${EASE} both; }
        @media (max-width: 860px) {
          .bf-grid { grid-template-columns: 1fr !important; }
          .bf-stage { order: -1; min-height: 380px; }
        }
      `}</style>

      <section id="benefits" style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div data-reveal style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '.08em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              marginBottom: '16px',
            }}>
              <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
              Platform Benefits
              <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
            </span>
            <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              Everything your fleet needs,{' '}
              <span style={{ color: '#1360ee' }}>in one platform</span>
            </h2>
            <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.65, color: '#6e6e73' }}>
              From live GPS tracking to AI dashcam, task management, and maintenance — all connected in a single platform built for modern fleets.
            </p>
          </div>

          {/* Grid */}
          <div className="bf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.45fr', gap: '20px', alignItems: 'stretch' }}>

            {/* Left — numbered list */}
            <div data-reveal="left" style={{ background: '#fff', border: '1px solid #e8e8eb', borderRadius: '20px', overflow: 'hidden', padding: '6px 0' }}>
              {ITEMS.map((item, i) => (
                <button key={i} onClick={() => setActive(i)} className={`bfr${active === i ? ' on' : ''}`}>
                  <span className="bfr-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="bfr-lbl">{item.label}</span>
                  <span className="bfr-arr">›</span>
                </button>
              ))}
            </div>

            {/* Right — stage */}
            <div className="bf-stage" data-reveal="right" data-reveal-delay="100" style={{ background: '#fff', border: '1px solid #e8e8eb', borderRadius: '20px', overflow: 'hidden', minHeight: '460px' }}>
              <div key={active} className="stage-in" style={{ height: '100%' }}>
                <StageContent />
              </div>
            </div>
          </div>

          {/* Active item description below */}
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: 'clamp(13px,1.2vw,15px)', color: '#6e6e73', lineHeight: 1.55, maxWidth: '520px', margin: '20px auto 0' }}>
            {ITEMS[active].short}
          </p>
        </div>
      </section>
    </>
  )
}
