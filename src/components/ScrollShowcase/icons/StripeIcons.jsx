const iconProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

export function PaymentsIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-payments" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M11 8 L24 16 L11 24 Z" fill={muted ? '#9ca3af' : 'url(#grad-payments)'} />
    </svg>
  );
}

export function ConnectIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-connect" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="14" height="14" rx="3" fill={muted ? '#9ca3af' : 'url(#grad-connect)'} opacity="0.85" />
      <rect x="12" y="12" width="14" height="14" rx="3" fill={muted ? '#9ca3af' : 'url(#grad-connect)'} opacity="0.6" />
    </svg>
  );
}

export function CapitalIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-capital" x1="0" y1="32" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#16a34a" />
          <stop offset="1" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <rect x="6"  y="18" width="5" height="9"  rx="1.5" fill={muted ? '#9ca3af' : 'url(#grad-capital)'} />
      <rect x="13" y="12" width="5" height="15" rx="1.5" fill={muted ? '#9ca3af' : 'url(#grad-capital)'} />
      <rect x="20" y="6"  width="5" height="21" rx="1.5" fill={muted ? '#9ca3af' : 'url(#grad-capital)'} />
    </svg>
  );
}

export function TreasuryIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-treasury" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <rect x="6"  y="10" width="14" height="14" rx="2.5" fill={muted ? '#9ca3af' : 'url(#grad-treasury)'} opacity="0.85" />
      <rect x="13" y="6"  width="14" height="14" rx="2.5" fill={muted ? '#9ca3af' : 'url(#grad-treasury)'} opacity="0.6" />
    </svg>
  );
}

export function ClimateIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-climate" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22c55e" />
          <stop offset="1" stopColor="#65a30d" />
        </linearGradient>
      </defs>
      <path
        d="M22 6 C 14 6 7 13 7 22 C 7 23.5 7.3 24.8 7.8 26 C 9 26.5 10.3 26.8 11.8 26.8 C 20.8 26.8 27.8 19.8 27.8 11.8 C 27.8 10.3 27.5 9 27 7.8 C 25.5 7 22 6 22 6 Z"
        fill={muted ? '#9ca3af' : 'url(#grad-climate)'}
      />
    </svg>
  );
}

export function AtlasIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-atlas" x1="16" y1="6" x2="16" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f97316" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <polygon points="16,6 26,26 6,26" fill={muted ? '#9ca3af' : 'url(#grad-atlas)'} />
    </svg>
  );
}

export function BillingIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-billing" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect x="8" y="5" width="16" height="22" rx="2.5" fill={muted ? '#9ca3af' : 'url(#grad-billing)'} />
      <rect x="11" y="11" width="10" height="1.5" rx="0.75" fill="#ffffff" opacity="0.85" />
      <rect x="11" y="15" width="10" height="1.5" rx="0.75" fill="#ffffff" opacity="0.85" />
      <rect x="11" y="19" width="6"  height="1.5" rx="0.75" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

export function RadarIcon({ muted = false }) {
  return (
    <svg {...iconProps} style={{ opacity: muted ? 0.35 : 1 }}>
      <defs>
        <linearGradient id="grad-radar" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ec4899" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <path
        d="M6 22 Q 11 12 16 16 Q 21 20 26 10"
        stroke={muted ? '#9ca3af' : 'url(#grad-radar)'}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
