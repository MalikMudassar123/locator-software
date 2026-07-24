'use client'

import dynamic from 'next/dynamic'
import ModuleShowcaseStyles from '@/components/software/modules/ModuleShowcaseStyles'

// Same interactive wireframe used in the Software page's #task-manager module.
const TaskManagerShowcase = dynamic(
  () => import('@/components/software/modules/TaskManagerShowcase'),
  { ssr: false },
)

// Content mirrors the task-manager entry in the Software page's MODULES list,
// so the two stay visually identical.
const LEAD =
  'Assign tasks directly to field staff through the app. Admin users can dispatch jobs, track live progress, collect custom field data, capture inspection reports, and monitor payment status. Integration with CRM/ERP ensures real-time sync, eliminating duplicate entries and improving team efficiency.'
const SUITED = [
  'FMCG delivery vans',
  'Logistics trucks',
  'Facility service cars',
  'Healthcare fleets',
  'Sales executive vehicles',
]

/**
 * The Software page's `#task-manager` module, lifted out as a standalone
 * section for /service/task-manager. Reuses the exact `pm-*` layout so both
 * pages render the same text-beside-showcase panel.
 */
export default function ServiceTaskManager() {
  return (
    <>
      <ModuleShowcaseStyles />
      <style href="svc-task-manager" precedence="medium">{`
        .pm-sec { padding: clamp(40px,5vw,76px) clamp(24px,6vw,96px); border-top: 1px solid #f0f0f3; scroll-margin-top: 84px; }

        .pm-grid {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.4fr);
          gap: clamp(28px, 3.4vw, 56px);
          align-items: center;
        }

        .pm-text { text-align: left; }
        .pm-tag {
          display: block;
          font-size: clamp(22px,2.8vw,32px); font-weight: 800; letter-spacing: .04em;
          color: #1360ee; text-transform: uppercase; margin-bottom: 16px;
        }
        .pm-tag span {
          display: block; width: 34px; height: 3px;
          background: #1360ee; border-radius: 2px; margin-bottom: 12px;
        }
        .pm-h2 { margin: 0; font-size: clamp(19px,2.2vw,26px); font-weight: 800; line-height: 1.25; letter-spacing: -.015em; color: rgb(72, 75, 76); }
        .pm-lead { margin: 18px 0 0; font-size: clamp(14px,1.45vw,16px); line-height: 1.62; color: #6e6e73; max-width: 46ch; }
        .pm-suited-label { margin: 22px 0 0; font-size: 11.5px; font-weight: 700; letter-spacing: .06em; color: #1d1d1f; text-transform: uppercase; }
        .pm-suited { margin: 14px 0 0; display: flex; flex-wrap: wrap; gap: 9px; }
        .pm-suited span { font-size: 13.5px; font-weight: 600; color: #1d1d1f; background: #fff; border: 1px solid #e3e3e6; padding: 8px 14px; border-radius: 999px; }

        .pm-viz { min-width: 0; }

        @media (max-width: 1080px) {
          .pm-grid { grid-template-columns: 1fr; gap: clamp(22px,4vw,34px); }
          .pm-text { text-align: center; max-width: 760px; margin: 0 auto; }
          .pm-lead { margin-left: auto; margin-right: auto; }
          .pm-suited { justify-content: center; }
        }
      `}</style>

      <section id="task-manager" className="pm-sec">
        <div className="pm-grid">
          <div className="pm-text" data-reveal="left">
            <span className="pm-tag"><span />MODULE<span /></span>
            <h2 className="pm-h2">Task Manager</h2>
            <p className="pm-lead">{LEAD}</p>
            <p className="pm-suited-label">Best suited for</p>
            <div className="pm-suited">{SUITED.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
          <div className="pm-viz" data-reveal="right">
            <TaskManagerShowcase />
          </div>
        </div>
      </section>
    </>
  )
}
