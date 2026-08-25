'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

// Native <select> popups are OS-rendered and can't be restyled — this is a
// small custom listbox that matches the site's own dropdown/menu language
// instead (rounded panel, blue accent, checkmark on the selected row).
export default function FilterSelect({
  label,
  value,
  options,
  onChange,
  renderIcon,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
  /** Optional mark shown before each option and the current value — used by
   *  the location filter to put a country flag against every row. */
  renderIcon?: (option: string) => React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="fsl-root" ref={rootRef}>
      <style>{`
        .fsl-root { position: relative; }
        .fsl-trigger {
          width: 100%; display: flex; align-items: center; gap: 11px;
          text-align: left; cursor: pointer;
          padding: 7px 40px 9px 16px; border-radius: 12px;
          border: 1.5px solid #e4e8f0; background: #fbfcfe;
          font-family: inherit; transition: border-color .18s ${EASE}, box-shadow .18s ${EASE};
        }
        /* min-width:0 so a long country name ellipsises instead of shoving
           the flag out of the trigger. */
        .fsl-trigger-text { flex: 1; min-width: 0; }
        .fsl-trigger:hover { border-color: #c9d8f8; }
        .fsl-root[data-open="true"] .fsl-trigger,
        .fsl-trigger:focus-visible {
          outline: 0; border-color: #1360ee; background: #fff; box-shadow: 0 0 0 4px rgba(19,96,238,.12);
        }
        .fsl-label { display: block; font-size: var(--f-10-5); font-weight: 700; letter-spacing: .04em; color: #9aa2b1; }
        .fsl-value { display: block; font-size: var(--f-14); color: #1d1d1f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fsl-chevron {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #9aa2b1; pointer-events: none;
          transition: transform .22s ${EASE};
        }
        .fsl-root[data-open="true"] .fsl-chevron { transform: translateY(-50%) rotate(180deg); color: #1360ee; }

        .fsl-panel {
          position: absolute; z-index: 30; top: calc(100% + 8px); left: 0; right: 0;
          max-height: 280px; overflow-y: auto;
          background: #fff; border: 1px solid #e7ebf3; border-radius: 14px;
          box-shadow: 0 24px 48px -20px rgba(20,40,90,.32);
          padding: 6px; transform-origin: top;
          animation: fslIn .16s ${EASE};
        }
        @keyframes fslIn { from { opacity: 0; transform: scaleY(.92) translateY(-4px); } to { opacity: 1; transform: none; } }

        .fsl-opt {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          width: 100%; text-align: left; padding: 10px 12px; border-radius: 9px;
          border: 0; background: none; cursor: pointer;
          font-family: inherit; font-size: var(--f-14); color: #3a3a44;
          transition: background .14s ${EASE}, color .14s ${EASE};
        }
        .fsl-opt:hover { background: #f4f8ff; color: #1360ee; }
        .fsl-opt[aria-selected="true"] { color: #1360ee; font-weight: 700; background: #eef3ff; }
        .fsl-opt-main { display: flex; align-items: center; gap: 11px; min-width: 0; }
        .fsl-opt-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .fsl-opt svg { flex-shrink: 0; opacity: 0; transition: opacity .14s ${EASE}; }
        .fsl-opt[aria-selected="true"] svg { opacity: 1; }

        @media (prefers-reduced-motion: reduce) { .fsl-panel { animation: none; } }
      `}</style>

      <button
        type="button"
        className="fsl-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {renderIcon ? renderIcon(value) : null}
        <span className="fsl-trigger-text">
          <span className="fsl-label">{label}</span>
          <span className="fsl-value">{value}</span>
        </span>
      </button>
      <svg className="fsl-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>

      {open && (
        <ul className="fsl-panel" role="listbox" aria-label={label}>
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className="fsl-opt"
                role="option"
                aria-selected={opt === value}
                onClick={() => { onChange(opt); setOpen(false) }}
              >
                <span className="fsl-opt-main">
                  {renderIcon ? renderIcon(opt) : null}
                  <span className="fsl-opt-label">{opt}</span>
                </span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
