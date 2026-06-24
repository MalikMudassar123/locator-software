'use client'
import dynamic from 'next/dynamic'
import ModuleShowcaseStyles from './modules/ModuleShowcaseStyles'

// Heavy interactive wireframes — load on the client, below the fold.
const TaskManagerShowcase = dynamic(() => import('./modules/TaskManagerShowcase'), { ssr: false })
const ExpenseManagerShowcase = dynamic(() => import('./modules/ExpenseManagerShowcase'), { ssr: false })
const InspectionShowcase = dynamic(() => import('./modules/InspectionShowcase'), { ssr: false })
const FleetManagerShowcase = dynamic(() => import('./modules/FleetManagerShowcase'), { ssr: false })

interface ModuleDef {
  h2: string
  h2Accent: string
  leads: string[]
  suitedLabel: string
  suited: string[]
  Showcase: React.ComponentType
}

const MODULES: ModuleDef[] = [
  {
    h2: 'Task', h2Accent: 'Manager', Showcase: TaskManagerShowcase,
    leads: ['Assign tasks directly to field staff through the app. Admin users can dispatch jobs, track live progress, collect custom field data, capture inspection reports, and monitor payment status. Integration with CRM/ERP ensures real-time sync, eliminating duplicate entries and improving team efficiency.'],
    suitedLabel: 'Best suited for',
    suited: ['FMCG delivery vans', 'Logistics trucks', 'Facility service cars', 'Healthcare fleets', 'Sales executive vehicles'],
  },
  {
    h2: 'Expense', h2Accent: 'Manager', Showcase: ExpenseManagerShowcase,
    leads: ['Field teams can upload fuel bills, parking receipts, toll charges, or ad-hoc expenses through the mobile app. Admin users can review, approve, and generate expense trend reports from the web platform. This reduces paper-based reimbursement delays and gives better financial control.'],
    suitedLabel: 'Best suited for',
    suited: ['FMCG delivery vans', 'Logistics trucks', 'Facility service cars', 'Healthcare fleets', 'Sales executive vehicles'],
  },
  {
    h2: 'Inspection', h2Accent: 'Module', Showcase: InspectionShowcase,
    leads: ['Conduct vehicle, machine, or equipment inspections with customizable checklists, photos, and condition attributes. It ensures tool availability, tracks condition during handovers, and assigns damage responsibility accurately, strengthening accountability and operational compliance for UAE fleets.'],
    suitedLabel: 'Useful for',
    suited: ['Company vehicles', 'Construction machines', 'Rental fleets', 'School buses', 'Facility generators', 'Boom loaders & bulldozers'],
  },
  {
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
        .pm-sec { padding: clamp(40px,5vw,76px) clamp(24px,6vw,96px); border-top: 1px solid #f0f0f3; }
        .pm-sec:nth-child(even) { background: #f7f9fc; }

        /* ── Desktop: text + showcase side by side, showcase dominant ── */
        .pm-grid {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.4fr);
          gap: clamp(28px, 3.4vw, 56px);
          align-items: center;
        }
        /* zig-zag: showcase swaps to the left, text to the right */
        .pm-grid.flip { grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.72fr); }
        .pm-grid.flip .pm-text { order: 2; }
        .pm-grid.flip .pm-viz  { order: 1; }

        .pm-text { text-align: left; }
        .pm-tag {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 700; letter-spacing: .08em;
          color: #1360ee; text-transform: uppercase; margin-bottom: 14px;
        }
        .pm-tag span { display: inline-block; width: 18px; height: 1.5px; background: #1360ee; border-radius: 2px; }
        .pm-h2 { margin: 0; font-size: clamp(26px,3.2vw,40px); font-weight: 800; line-height: 1.08; letter-spacing: -.025em; color: #1d1d1f; }
        .pm-lead { margin: 18px 0 0; font-size: clamp(14px,1.45vw,16px); line-height: 1.62; color: #6e6e73; max-width: 46ch; }
        .pm-suited-label { margin: 22px 0 0; font-size: 11.5px; font-weight: 700; letter-spacing: .06em; color: #1d1d1f; text-transform: uppercase; }
        .pm-suited { margin: 14px 0 0; display: flex; flex-wrap: wrap; gap: 9px; }
        .pm-suited span { font-size: 13.5px; font-weight: 600; color: #1d1d1f; background: #fff; border: 1px solid #e3e3e6; padding: 8px 14px; border-radius: 999px; }

        .pm-viz { min-width: 0; }

        /* ── Tablet / mobile: stack (text on top, showcase below) ── */
        @media (max-width: 1080px) {
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
            <section key={mod.h2} className="pm-sec">
              <div className={`pm-grid${flip ? ' flip' : ''}`}>
                <div className="pm-text" data-reveal={flip ? 'right' : 'left'}>
                  <span className="pm-tag"><span />MODULE<span /></span>
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
