'use client';

export default function BrowserChrome({ url = 'https://pro.mylocatorplus.com/' }) {
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
        <span style={dot('#ff5f57')} />
        <span style={dot('#febc2e')} />
        <span style={dot('#28c840')} />
      </div>
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
            color: '#f59e0b',
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
