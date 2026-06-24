// Shared CSS for the four interactive module wireframe showcases.
// Ported from the Locator-websites standalone embeds. Rendered once.
export default function ModuleShowcaseStyles() {
  return (
    <style>{`
      /* ── Embed shell + tab switcher ────────────────────────────── */
      .ms-embed { width: 100%; }
      .ms-tabs {
        display: flex; gap: 4px; padding: 4px; background: #e6eaf1;
        border-radius: 14px; width: fit-content; margin: 0 auto 14px;
      }
      .ms-tab {
        display: flex; align-items: center; gap: 7px;
        padding: 10px 26px; border-radius: 11px; border: none; background: transparent;
        font-family: inherit; font-size: 13.5px; font-weight: 600; color: #64748b;
        cursor: pointer; transition: all .2s ease; white-space: nowrap;
      }
      .ms-tab:hover { color: #334155; }
      .ms-tab.active { background: #fff; color: #1360EF; box-shadow: 0 1px 4px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04); }
      .ms-tab svg { width: 16px; height: 16px; flex-shrink: 0; }

      /* The web dashboards are designed wide; let narrow screens scroll them. */
      .ms-web-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .ms-web-scroll::-webkit-scrollbar { height: 7px; }
      .ms-web-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      .ms-web-min { min-width: 760px; }
      @media (max-width: 600px) { .ms-web-min { min-width: 700px; } }

      @keyframes msFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes tmSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
      @keyframes tmSlideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
      @keyframes emSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

      /* ── Task Manager web ──────────────────────────────────────── */
      .tm-web { display: grid; margin: 0 auto; height: 520px; border: 1px solid #dce1e8; border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 6px 32px -8px rgba(30,41,59,.1), 0 1px 2px rgba(0,0,0,.04); position: relative; }
      .tm-task-panel { display: flex; flex-direction: column; overflow: hidden; }
      .tm-toolbar-btn { font-family: inherit; font-size: 11.5px; font-weight: 600; padding: 5px 12px; border-radius: 7px; border: 1px solid #e2e8f0; background: #fff; color: #475569; cursor: pointer; transition: .15s ease; white-space: nowrap; }
      .tm-toolbar-btn:hover { background: #f1f5f9; }
      .tm-toolbar-btn.primary { background: #1360EF; color: #fff; border-color: #1360EF; }
      .tm-task-list-scroll { flex: 1; overflow-y: auto; padding: 6px 12px; }
      .tm-task-list-scroll::-webkit-scrollbar { width: 4px; }
      .tm-task-list-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
      .tm-task-row { display: flex; gap: 10px; align-items: center; padding: 12px 14px; border-radius: 10px; border: 1px solid transparent; cursor: pointer; transition: all .15s ease; margin-bottom: 2px; }
      .tm-task-row:hover { background: #f8fafc; border-color: #e2e8f0; }
      .tm-task-row.selected { background: #EAF1FF; border: 2px dashed #CDD8EC; }
      .tm-task-badge { background: #1360EF; color: #fff; font-size: 11.5px; font-weight: 700; padding: 4px 9px; border-radius: 6px; white-space: nowrap; flex-shrink: 0; }
      .tm-avatar { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
      .tm-status { display: inline-flex; align-items: center; gap: 5px; padding: 4px 11px; border-radius: 999px; font-size: 12px; font-weight: 700; cursor: pointer; position: relative; transition: transform .15s ease; white-space: nowrap; user-select: none; }
      .tm-status:hover { transform: scale(1.05); }
      .tm-status-dropdown { position: absolute; top: calc(100% + 4px); right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px; box-shadow: 0 10px 30px -8px rgba(0,0,0,.16); z-index: 60; min-width: 145px; }
      .tm-status-option { display: flex; align-items: center; gap: 7px; padding: 7px 11px; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; transition: background .1s ease; border: none; background: transparent; width: 100%; font-family: inherit; text-align: left; }
      .tm-status-option:hover { background: #f1f5f9; }
      .tm-detail-side { background: #f8fafc; display: flex; flex-direction: column; overflow: hidden; border-left: 1px solid #e2e8f0; animation: tmSlideIn .25s ease; }
      .tm-detail-action { width: 28px; height: 28px; border-radius: 7px; border: 1px solid #e2e8f0; background: #fff; display: grid; place-items: center; cursor: pointer; color: #64748b; transition: all .15s ease; font-size: 13px; padding: 0; }
      .tm-detail-action:hover { background: #ebf0ff; color: #1360EF; border-color: #c7d2fe; }
      .tm-detail-scroll { flex: 1; overflow-y: auto; padding: 16px; }
      .tm-detail-scroll::-webkit-scrollbar { width: 4px; }
      .tm-detail-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }

      /* ── Phone shell (shared by all mobile apps) ───────────────── */
      .tm-phone { width: 288px; height: 590px; background: #111; border-radius: 38px; padding: 7px; box-shadow: 0 30px 60px -12px rgba(0,0,0,.22), 0 18px 36px -18px rgba(0,0,0,.28), inset 0 0 0 1.5px rgba(255,255,255,.08); position: relative; flex-shrink: 0; }
      .tm-phone-screen { width: 100%; height: 100%; background: #f0f4f8; border-radius: 30px; overflow: hidden; display: flex; flex-direction: column; position: relative; }

      /* Phone inner scroll areas: slim, unobtrusive scrollbar + no horizontal bar */
      .tm-phone-screen [style*="overflow-y"] { overflow-x: hidden; scrollbar-width: thin; scrollbar-color: rgba(100,116,139,.32) transparent; }
      .tm-phone-screen ::-webkit-scrollbar { width: 4px; height: 0; }
      .tm-phone-screen ::-webkit-scrollbar-thumb { background: rgba(100,116,139,.32); border-radius: 4px; }
      .tm-phone-screen ::-webkit-scrollbar-track { background: transparent; }
      .tm-mobile-card { background: #fff; border-radius: 12px; padding: 10px; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.05); cursor: pointer; transition: transform .15s ease; }
      .tm-mobile-card:active { transform: scale(.98); }
      .tm-photo-drop { border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 14px; text-align: center; cursor: pointer; transition: all .15s ease; background: #fff; }
      .tm-photo-drop:hover, .tm-photo-drop.dragover { border-color: #1360EF; background: #f5f7ff; }

      /* ── Expense / shared button hovers ────────────────────────── */
      .em-pay-btn:hover { background: #1d4ed8 !important; }
      .em-dots-btn:hover { background: #1d4ed8 !important; }
    `}</style>
  )
}
