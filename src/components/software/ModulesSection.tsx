'use client'
import dynamic from 'next/dynamic'
import ModuleShowcaseStyles from './modules/ModuleShowcaseStyles'

// Heavy interactive wireframes — load on the client, below the fold.
const TaskManagerShowcase = dynamic(() => import('./modules/TaskManagerShowcase'), { ssr: false })
const ExpenseManagerShowcase = dynamic(() => import('./modules/ExpenseManagerShowcase'), { ssr: false })
const InspectionShowcase = dynamic(() => import('./modules/InspectionShowcase'), { ssr: false })
const FleetManagerShowcase = dynamic(() => import('./modules/FleetManagerShowcase'), { ssr: false })

interface ModuleDef {
  slug: string
  h2: string
  h2Accent: string
  leads: string[]
  suitedLabel: string
  suited: string[]
  Showcase: React.ComponentType
}

const MODULES: ModuleDef[] = [
  {
    slug: 'task-manager',
    h2: 'Task', h2Accent: 'Manager', Showcase: TaskManagerShowcase,
    leads: ['Assign tasks directly to field staff through the app. Admin users can dispatch jobs, track live progress, collect custom field data, capture inspection reports, and monitor payment status. Integration with CRM/ERP ensures real-time sync, eliminating duplicate entries and improving team efficiency.'],
    suitedLabel: 'Best suited for',
    suited: ['FMCG delivery vans', 'Logistics trucks', 'Facility service cars', 'Healthcare fleets', 'Sales executive vehicles'],
  },
  {
    slug: 'expense-manager',
    h2: 'Expense', h2Accent: 'Manager', Showcase: ExpenseManagerShowcase,
    leads: ['Field teams can upload fuel bills, parking receipts, toll charges, or ad-hoc expenses through the mobile app. Admin users can review, approve, and generate expense trend reports from the web platform. This reduces paper-based reimbursement delays and gives better financial control.'],
    suitedLabel: 'Best suited for',
    suited: ['FMCG delivery vans', 'Logistics trucks', 'Facility service cars', 'Healthcare fleets', 'Sales executive vehicles'],
  },
  {
    slug: 'inspection',
    h2: 'Inspection', h2Accent: 'Module', Showcase: InspectionShowcase,
    leads: ['Conduct vehicle, machine, or equipment inspections with customizable checklists, photos, and condition attributes. It ensures tool availability, tracks condition during handovers, and assigns damage responsibility accurately, strengthening accountability and operational compliance for UAE fleets.'],
    suitedLabel: 'Useful for',
    suited: ['Company vehicles', 'Construction machines', 'Rental fleets', 'School buses', 'Facility generators', 'Boom loaders & bulldozers'],
  },
  {
    slug: 'fleet-manager',
    h2: 'Fleet', h2Accent: 'Manager', Showcase: FleetManagerShowcase,
    leads: ['Manage your entire fleet operations with comprehensive tracking for vehicle documents, service schedules, fuel consumption, and other expenses. Ensure compliance, reduce downtime, and maintain accurate cost records for all fleet vehicles across UAE operations.'],
    suitedLabel: 'Useful for',
    suited: ['Company vehicles', 'Construction machines', 'Rental fleets', 'School buses', 'Facility generators', 'Boom loaders & bulldozers'],
  },
]

export default function ModulesSection() {
  return (
    <>
      <ModuleShowcaseStyles />
      <style>{`
        .pm-sec { padding: clamp(40px,5vw,76px) clamp(24px,6vw,96px); border-top: 1px solid #f0f0f3; scroll-margin-top: 84px; }
        .pm-sec:nth-child(even) { background: #f7f9fc; }

        /* ── Desktop: text + showcase side by side, showcase dominant ── */
        .pm-grid {
          max-width: var(--w-1440); margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(270px, 0.68fr) minmax(0, 1.64fr);
          gap: clamp(28px, 3.4vw, 56px);
          align-items: center;
        }
        /* zig-zag: showcase swaps to the left, text to the right */
        .pm-grid.flip { grid-template-columns: minmax(0, 1.64fr) minmax(270px, 0.68fr); }
        .pm-grid.flip .pm-text { order: 2; }
        .pm-grid.flip .pm-viz  { order: 1; }

        .pm-text { text-align: left; }
        /* Small kicker label — the heading below carries the visual weight, not this. */
        .pm-tag {
          display: block;
          font-size: var(--f-12); font-weight: 600; letter-spacing: .14em;
          color: #1360ee; text-transform: uppercase; margin-bottom: 10px;
        }
        .pm-h2 { margin: 0; font-size: max(clamp(27px,3.6vw,40px), min(2.778vw, 58px)); font-weight: 600; line-height: 1.15; letter-spacing: -.02em; color: rgb(72, 75, 76); }
        .pm-lead { margin: 20px 0 0; font-size: max(clamp(14px,1.45vw,16px), min(1.111vw, 23.2px)); font-weight: 400; line-height: 1.7; color: #6e6e73; max-width: 46ch; }
        .pm-suited-label { margin: 26px 0 0; font-size: var(--f-11); font-weight: 500; letter-spacing: .08em; color: #8a8a8f; text-transform: uppercase; }
        .pm-suited { margin: 14px 0 0; display: flex; flex-wrap: wrap; gap: 9px; }
        .pm-suited span { font-size: var(--f-13); font-weight: 600; color: #3a3a3c; background: #fff; border: 1px solid #e3e3e6; padding: 8px 14px; border-radius: 999px; }

        .pm-viz { min-width: 0; }

        /* ── Tablet / mobile: stack (text on top, showcase below) ── */
        @media (max-width: 1180px) {
          .pm-grid, .pm-grid.flip { grid-template-columns: 1fr; gap: clamp(22px,4vw,34px); }
          .pm-grid.flip .pm-text { order: 0; }
          .pm-grid.flip .pm-viz  { order: 0; }
          .pm-text { text-align: center; max-width: 760px; margin: 0 auto; }
          .pm-lead { margin-left: auto; margin-right: auto; }
          .pm-suited { justify-content: center; }
        }
      `}</style>

      <div id="modules">
        {MODULES.map((mod, idx) => {
          const { Showcase } = mod
          const flip = idx % 2 === 1
          return (
            <section key={mod.h2} id={mod.slug} className="pm-sec">
              <div className={`pm-grid${flip ? ' flip' : ''}`}>
                <div className="pm-text" data-reveal={flip ? 'right' : 'left'}>
                  <span className="pm-tag">MODULE</span>
                  <h2 className="pm-h2">{mod.h2} {mod.h2Accent}</h2>
                  {mod.leads.map((p, i) => <p key={i} className="pm-lead">{p}</p>)}
                  <p className="pm-suited-label">{mod.suitedLabel}</p>
                  <div className="pm-suited">{mod.suited.map(s => <span key={s}>{s}</span>)}</div>
                </div>
                <div className="pm-viz" data-reveal={flip ? 'left' : 'right'}>
                  <Showcase />
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
