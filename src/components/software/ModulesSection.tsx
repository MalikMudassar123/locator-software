'use client'
import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const AnimatedModuleScene = dynamic(() => import('./AnimatedModuleScene'), { ssr: false })

type BadgeColor = 'green' | 'amber' | 'blue' | 'gray' | 'red'

interface MRow {
  icon: ReactNode
  title: string
  sub: string
  badge?: string
  color?: BadgeColor
  amt?: string
}

const BADGE: Record<BadgeColor, { background: string; color: string }> = {
  green: { background: 'rgba(31,191,91,.14)',  color: '#13923f' },
  amber: { background: 'rgba(255,159,10,.16)', color: '#c2740a' },
  blue:  { background: 'rgba(10,132,255,.12)', color: '#0a84ff' },
  gray:  { background: '#f0f0f2',              color: '#6e6e73'  },
  red:   { background: 'rgba(255,90,95,.14)',  color: '#d63a3f'  },
}

function VizCard({ title, rows }: { title: string; rows: MRow[] }) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid #e3e3e6',
      overflow: 'hidden',
      boxShadow: '0 30px 70px -40px rgba(20,40,90,.3)',
    }}>
      <div data-wire="header" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid #e3e3e6' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[0,1,2].map(n => <span key={n} data-wire="dot" style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#e0e0e3', display: 'inline-block' }} />)}
        </div>
        <span data-wire="htitle" style={{ fontSize: '12.5px', fontWeight: 700, color: '#6e6e73', marginLeft: '6px' }}>{title}</span>
      </div>
      <div style={{ padding: '20px' }}>
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="mrow-item"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 14px', margin: '0 -14px', borderRadius: '14px', position: 'relative', cursor: 'default' }}
          >
            <div data-wire="icon" style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(10,132,255,.08)', border: '1px solid rgba(10,132,255,.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              {row.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <b data-wire="title" style={{ display: 'block', fontSize: '14.5px', fontWeight: 700, letterSpacing: '-.01em', color: '#1d1d1f' }}>{row.title}</b>
              <span data-wire="sub" style={{ fontSize: '12.5px', color: '#6e6e73' }}>{row.sub}</span>
            </div>
            {row.amt
              ? <span data-wire="amount" style={{ fontSize: '14.5px', fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-.01em', color: '#1d1d1f', flexShrink: 0 }}>{row.amt}</span>
              : row.badge && row.color
                ? <span data-wire="badge" style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap', flexShrink: 0, ...BADGE[row.color] }}>{row.badge}</span>
                : null
            }
          </div>
        ))}
      </div>
    </div>
  )
}

function InspectionCard() {
  const items = [
    { label: 'Tyres & pressure',        pass: true  },
    { label: 'Brakes & lights',          pass: true  },
    { label: 'Coolant level — low',      pass: false },
    { label: 'Safety equipment present', pass: true  },
  ]
  return (
    <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e3e3e6', overflow: 'hidden', boxShadow: '0 30px 70px -40px rgba(20,40,90,.3)' }}>
      <div data-wire="header" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid #e3e3e6' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[0,1,2].map(n => <span key={n} data-wire="dot" style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#e0e0e3', display: 'inline-block' }} />)}
        </div>
        <span data-wire="htitle" style={{ fontSize: '12.5px', fontWeight: 700, color: '#6e6e73', marginLeft: '6px' }}>Inspection — Pre-trip checklist</span>
      </div>
      <div style={{ padding: '20px' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < items.length - 1 ? '1px solid #e3e3e6' : 'none' }}>
            <span data-wire="check" style={{ width: '22px', height: '22px', borderRadius: '7px', background: it.pass ? '#1fbf5b' : '#ff9f0a', display: 'grid', placeItems: 'center', flexShrink: 0, color: '#fff', fontSize: '13px', fontWeight: 700 }}>
              {it.pass ? '✓' : '!'}
            </span>
            <span data-wire="title" style={{ fontSize: '14.5px', fontWeight: 600, color: '#1d1d1f' }}>{it.label}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          {[0,1,2].map(n => (
            <div key={n} data-wire="photo" style={{ flex: 1, height: '54px', borderRadius: '10px', background: 'repeating-linear-gradient(135deg,#eef1f5,#eef1f5 7px,#e6eaef 7px,#e6eaef 14px)', border: '1px solid #e3e3e6', display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 700, color: '#a1a1a6', fontFamily: 'ui-monospace, monospace' }}>
              PHOTO
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── SVG icon helpers ──────────────────────────────────────────────────────────

const IC = ({ d, extra }: { d: string | string[]; extra?: ReactNode }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
    {extra}
  </svg>
)

const ICONS = {
  package: (
    <IC d={[
      'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
      'm3.3 7 8.7 5 8.7-5',
      'M12 22V12',
    ]} />
  ),
  wrench: (
    <IC d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  clipboard: (
    <IC
      d={[
        'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
        'M12 11h4',
        'M12 16h4',
        'M8 11h.01',
        'M8 16h.01',
      ]}
      extra={<rect x="8" y="2" width="8" height="4" rx="1" stroke="#0a84ff" strokeWidth="1.75" fill="none" />}
    />
  ),
  droplet: (
    <IC d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  ),
  fuel: (
    <IC
      d={[
        'M3 22h11',
        'M14 11v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9a1 1 0 0 0-.3-.7L16 6',
      ]}
      extra={<rect x="4" y="3" width="9" height="19" rx="1" stroke="#0a84ff" strokeWidth="1.75" fill="none" />}
    />
  ),
  parking: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  route: (
    <IC d={[
      'M3 17a1 1 0 1 0 2 0 1 1 0 0 0-2 0',
      'M19 5a1 1 0 1 0 2 0 1 1 0 0 0-2 0',
      'M5 17H3m0 0c0-4 2-7 8-7h5M21 5h-2m0 0c0 4-2 7-8 7H6',
    ]} />
  ),
  receipt: (
    <IC d={[
      'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z',
      'M14 8H8',
      'M16 12H8',
      'M13 16H8',
    ]} />
  ),
  oildrop: (
    <IC d={[
      'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z',
      'M9.5 15.5a4 4 0 0 0 2 2',
    ]} />
  ),
  tire: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  ),
  battery: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" />
      <path d="M6 11h4" />
    </svg>
  ),
}

// ── Module data ───────────────────────────────────────────────────────────────

interface ModuleDef {
  tag: string
  h2: string
  h2Accent: string
  leads: string[]
  suitedLabel?: string
  suited?: string[]
  vizTitle: string
  vizRows?: MRow[]
  vizType?: 'inspection'
  vizAnim?: 'task' | 'expense' | 'service'
  flip: boolean
}

const MODULES: ModuleDef[] = [
  {
    tag: 'MODULE', h2: 'Task', h2Accent: 'Manager', flip: false, vizAnim: 'task',
    leads: ['Assign tasks directly to field staff through the app. Admin users can dispatch jobs, track live progress, collect custom field data, capture inspection reports, and monitor payment status. Integration with CRM/ERP ensures real-time sync, eliminating duplicate entries and improving team efficiency.'],
    suitedLabel: 'Best suited for',
    suited: ['FMCG delivery vans', 'Logistics trucks', 'Facility service cars', 'Healthcare fleets', 'Sales executive vehicles'],
    vizTitle: "Task Manager — Today's dispatch",
    vizRows: [
      { icon: ICONS.package,   title: 'Deliver order #4821', sub: 'Driver · Sami K. · Jebel Ali',    badge: 'Done',        color: 'green' },
      { icon: ICONS.wrench,    title: 'AC service call',      sub: 'Driver · Ravi P. · Business Bay', badge: 'In progress', color: 'amber' },
      { icon: ICONS.clipboard, title: 'Site inspection',       sub: 'Driver · Omar A. · Al Quoz',      badge: 'Assigned',    color: 'blue'  },
      { icon: ICONS.droplet,   title: 'Water refill route',    sub: 'Driver · Leo M. · Deira',         badge: 'Queued',      color: 'gray'  },
    ],
  },
  {
    tag: 'MODULE', h2: 'Expense', h2Accent: 'Manager', flip: true, vizAnim: 'expense',
    leads: [
      'Field teams can upload fuel bills, parking receipts, toll charges, or ad-hoc expenses through the mobile app. Admin users can review, approve, and generate expense trend reports from the web platform.',
      'This reduces paper-based reimbursement delays and gives better financial control.',
    ],
    vizTitle: 'Expense Manager — Approvals',
    vizRows: [
      { icon: ICONS.fuel,     title: 'Fuel — ENOC Station',        sub: 'VAN-204 · 14 Mar', amt: 'AED 180' },
      { icon: ICONS.parking,  title: 'Parking — Mall of Emirates', sub: 'TRK-118 · 14 Mar', amt: 'AED 25'  },
      { icon: ICONS.route,    title: 'Salik toll charge',           sub: 'TRK-090 · 13 Mar', amt: 'AED 16'  },
      { icon: ICONS.receipt,  title: 'Ad-hoc — Loading help',       sub: 'VAN-211 · 13 Mar', badge: 'Review', color: 'amber' },
    ],
  },
  {
    tag: 'MODULE', h2: 'Inspection', h2Accent: 'Module', flip: false,
    leads: ['Conduct vehicle, machine, or equipment inspections with customizable checklists, photos, and condition attributes. It ensures tool availability, tracks condition during handovers, and assigns damage responsibility accurately, strengthening accountability and operational compliance for UAE fleets.'],
    suitedLabel: 'Useful for',
    suited: ['Company vehicles', 'Construction machines', 'Rental fleets', 'School buses', 'Facility generators', 'Boom loaders & bulldozers'],
    vizTitle: 'Inspection — Pre-trip checklist',
    vizType: 'inspection',
  },
  {
    tag: 'MODULE', h2: 'Fleet Service', h2Accent: 'Manager', flip: true, vizAnim: 'service',
    leads: ['Log completed services through the mobile app and view updates instantly on the admin dashboard. Automate reminders for oil change, tire change, maintenance schedules, and service follow-ups. This reduces breakdown risk, improves vehicle uptime, and streamlines daily fleet maintenance planning for UAE businesses.'],
    vizTitle: 'Service Manager — Upcoming',
    vizRows: [
      { icon: ICONS.oildrop, title: 'Oil change',    sub: 'TRK-118 · due in 320 km',  badge: 'Due soon',  color: 'amber' },
      { icon: ICONS.tire,    title: 'Tire rotation', sub: 'VAN-204 · due in 12 days',  badge: 'Scheduled', color: 'blue'  },
      { icon: ICONS.wrench,  title: 'Full service',  sub: 'TRK-090 · completed 2 Mar', badge: 'Done',      color: 'green' },
      { icon: ICONS.battery, title: 'Battery check', sub: 'VAN-211 · overdue 4 days',  badge: 'Overdue',   color: 'red'   },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function ModulesSection() {
  return (
    <>
      <style>{`
        @media (hover: hover) {
          .mrow-item:hover { background: #f6f8fc; transform: translateX(4px); }
        }
        .mrow-item { transition: background .25s cubic-bezier(.22,.61,.36,1), transform .25s cubic-bezier(.22,.61,.36,1); }
        @media (max-width: 880px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .feat-grid-flip-text { order: 0 !important; }
        }
      `}</style>

      <div id="modules">
        {MODULES.map((mod, idx) => (
          <section
            key={idx}
            style={{
              padding: 'clamp(36px,4vw,52px) 28px',
              background: '#ffffff',
              borderTop: idx > 0 ? '1px solid #f0f0f3' : 'none',
            }}
          >
            <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
              <div
                className="feat-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}
              >
                {/* Text */}
                <div
                  className={mod.flip ? 'feat-grid-flip-text' : ''}
                  data-reveal={mod.flip ? 'right' : 'left'}
                  style={{ order: mod.flip ? 2 : 0 }}
                >
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '.08em',
                    color: '#1360ee', textTransform: 'uppercase' as const,
                    marginBottom: '16px',
                  }}>
                    <span style={{ display: 'inline-block', width: '18px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
                    {mod.tag}
                    <span style={{ display: 'inline-block', width: '18px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
                  </span>
                  <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.025em', color: '#1d1d1f' }}>
                    {mod.h2}{' '}
                    <span style={{ color: '#1360ee' }}>{mod.h2Accent}</span>
                  </h2>
                  {mod.leads.map((p, pi) => (
                    <p key={pi} style={{ marginTop: pi === 0 ? '20px' : '14px', fontSize: 'clamp(14px,1.45vw,16px)', lineHeight: 1.6, color: '#6e6e73', maxWidth: '460px' }}>
                      {p}
                    </p>
                  ))}
                  {mod.suitedLabel && (
                    <>
                      <p style={{ marginTop: '26px', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.06em', color: '#1d1d1f', textTransform: 'uppercase' as const }}>
                        {mod.suitedLabel}
                      </p>
                      <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
                        {mod.suited!.map(s => (
                          <span key={s} style={{ fontSize: '13.5px', fontWeight: 600, color: '#1d1d1f', background: '#fff', border: '1px solid #e3e3e6', padding: '8px 14px', borderRadius: '999px' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Viz card */}
                <div data-reveal={mod.flip ? 'left' : 'right'} data-reveal-delay="120" style={{ order: mod.flip ? 0 : 2 }}>
                  {mod.vizType === 'inspection' ? (
                    <AnimatedModuleScene type="inspection">
                      <InspectionCard />
                    </AnimatedModuleScene>
                  ) : mod.vizAnim ? (
                    <AnimatedModuleScene type={mod.vizAnim}>
                      <VizCard title={mod.vizTitle} rows={mod.vizRows!} />
                    </AnimatedModuleScene>
                  ) : (
                    <VizCard title={mod.vizTitle} rows={mod.vizRows!} />
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
