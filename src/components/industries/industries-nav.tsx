import type { ReactNode } from 'react'
import { INDUSTRIES } from './industries-data'

// Nav-facing view of INDUSTRIES, shaped to the navbar's mega-menu item contract
// ({ slug, name, tagline, accent, icon }) — the same shape SOFTWARE_MODULES,
// SERVICE_PAGES and ABOUT_PAGES already satisfy.
//
// This lives in its own file rather than as extra fields on `Industry` for two
// reasons: industries-data.ts is a plain .ts module and cannot hold JSX icons, and
// accent/icon are presentation for one menu, not facts about an industry.
export type IndustryNavItem = { slug: string; name: string; tagline: string; accent: string; icon: ReactNode }

const sv = (children: ReactNode) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

// Keyed by slug so it survives INDUSTRIES being reordered. Accents are drawn from
// the palette the other menus already use (#1360ee / #0e9aa7 / #7c3aed / #c2740a /
// #13923f / #4f46e5) so the four dropdowns read as one system.
const NAV_META: Record<string, { accent: string; icon: ReactNode }> = {
  'rental-leasing': {
    accent: '#1360ee',
    icon: sv(<>
      <path d="M3 13.5l1.8-5A2 2 0 016.7 7h10.6a2 2 0 011.9 1.5l1.8 5" />
      <path d="M3 13.5h18V17a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </>),
  },
  'transportation-logistics': {
    accent: '#0e9aa7',
    icon: sv(<>
      <path d="M3 6h11v10H3z" />
      <path d="M14 9h3.6l2.4 3v4H14z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>),
  },
  'courier-last-mile-delivery': {
    accent: '#7c3aed',
    icon: sv(<>
      <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
      <path d="M4 7.2l8 4.2 8-4.2" />
      <path d="M12 11.4V21" />
    </>),
  },
  construction: {
    accent: '#c2740a',
    icon: sv(<>
      <path d="M3 17.5h18" />
      <path d="M4.5 17.5V15a7.5 7.5 0 0115 0v2.5" />
      <path d="M9.5 8.4V5a1.5 1.5 0 011.5-1.5h2A1.5 1.5 0 0114.5 5v3.4" />
    </>),
  },
  'field-services': {
    accent: '#13923f',
    icon: sv(
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a6 6 0 01-7.9 7.9l-6.9 6.9a2.1 2.1 0 01-3-3l6.9-6.9a6 6 0 017.9-7.9z" />
    ),
  },
  'food-beverage': {
    accent: '#4f46e5',
    icon: sv(<>
      <path d="M4.5 4h15l-1 4H5.5z" />
      <path d="M5.8 8h12.4l-1.2 11.3a2 2 0 01-2 1.7H9a2 2 0 01-2-1.7z" />
      <path d="M9.8 12v5M14.2 12v5" />
    </>),
  },
}

// Anything added to INDUSTRIES without a NAV_META entry still renders — it just gets
// a neutral chip instead of crashing the whole navbar on a missing icon.
const FALLBACK = {
  accent: '#1360ee',
  icon: sv(<>
    <path d="M3 20h18" />
    <path d="M5 20V9l7-5 7 5v11" />
    <path d="M10 20v-5h4v5" />
  </>),
}

export const INDUSTRY_NAV_ITEMS: IndustryNavItem[] = INDUSTRIES.map(ind => ({
  slug: ind.slug,
  name: ind.name,
  // `cardTag`, NOT `tagline`. Industry.tagline is the detail page's hero headline
  // ("Track, Protect and Optimize Every Rental Asset") — far too long for a menu
  // card's one-line subtitle, which truncates to a single line. `cardTag` is the
  // short "who it's for" string the /industries grid already uses.
  tagline: ind.cardTag,
  ...(NAV_META[ind.slug] ?? FALLBACK),
}))
