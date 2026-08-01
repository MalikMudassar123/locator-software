'use client';

// Two finishes for the same window frame:
//
//   'browser'  a web page — coloured traffic lights and an address bar.
//   'app'      the LOCATOR platform itself — neutral window controls and no
//              address bar, because it is software rather than a page someone
//              navigated to. A URL over a product screenshot invites the reader
//              to go and type it in; there is no page there to visit.
//
// The homepage showcases stay on 'browser'; every frame on /software uses 'app'.

// Exported so the hand-built frame in software/BenefitsSection can match exactly.
// Two ramps drifting apart would show, on a page that puts both on screen.
export const APP_DOT_COLORS = ['#c3ccd9', '#d2d9e3', '#e0e5ed'];

const BROWSER_DOT_COLORS = ['#ff5f57', '#febc2e', '#28c840'];

export default function BrowserChrome({
  url = 'https://pro.mylocatorplus.com/',
  variant = 'browser',
}) {
  const isApp = variant === 'app';

  return (
    <div
      style={{
        height: 32,
        flexShrink: 0,
        background: 'linear-gradient(180deg, #f3f5f9 0%, #e6eaf2 100%)',
        borderBottom: '1px solid rgba(15,23,42,0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {(isApp ? APP_DOT_COLORS : BROWSER_DOT_COLORS).map((c) => (
          <span key={c} style={dot(c)} />
        ))}
      </div>

      {/* The address bar, and the spacer that optically centres it against the
          dots, belong to 'browser' alone. An empty pill left behind in 'app'
          would read as a page that failed to load rather than as an app window. */}
      {!isApp && (
        <>
          <div
            style={{
              flex: 1,
              height: 18,
              background: '#ffffff',
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(15,23,42,0.05), inset 0 0 0 0.5px rgba(15,23,42,0.04)',
              maxWidth: '62%',
              margin: '0 auto',
              padding: '0 10px',
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: 'rgb(100, 116, 141)',
                fontWeight: 600,
                letterSpacing: '0.01em',
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, "SF Pro Text", sans-serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {url}
            </span>
          </div>
          <div style={{ width: 39, flexShrink: 0 }} />
        </>
      )}
    </div>
  );
}

const dot = (bg) => ({
  width: 11,
  height: 11,
  borderRadius: '50%',
  background: bg,
  boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08), 0 0.5px 1px rgba(0,0,0,0.06)',
});
