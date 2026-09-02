'use client';

// Two finishes for the same window frame:
//
//   'browser'  a web page — carries an address bar.
//   'app'      the LOCATOR platform itself — no address bar, because it is
//              software rather than a page someone navigated to. A URL over a
//              product screenshot invites the reader to go and type it in; there
//              is no page there to visit.
//
// The homepage showcases stay on 'browser'; every frame on /software uses 'app'.

// The window controls are the same neutral greys in BOTH finishes. 'browser' used
// to carry mac traffic lights (#ff5f57 / #febc2e / #28c840), and they were the one
// saturated thing in these frames: three primary-colour dots in the corner of a
// mock pull the eye away from the product screenshot they are framing, and they
// read as another vendor's chrome next to a palette of blues and slate.
//
// One ramp for both, exported, because the hand-built frame in
// software/BenefitsSection has to match it exactly and a second copy would drift.
export const WINDOW_DOT_COLORS = ['#c3ccd9', '#d2d9e3', '#e0e5ed'];

export default function BrowserChrome({
  url = 'https://mylocatorplus.com/',
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
        {WINDOW_DOT_COLORS.map((c) => (
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
