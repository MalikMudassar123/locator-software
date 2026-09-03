import type { ReactNode } from 'react'

export type ServicePage = {
  slug: string
  name: string
  tagline: string
  accent: string
  icon: ReactNode
}

// Every page carries the same accent: the site's blue, #1360ee. This drives
// ServiceModuleTabs' nav tabs, active-tab colour, icon chip and eyebrow — a
// per-page hue there turned the tab strip into a colour chart and made sibling
// services look like unrelated products, same reasoning as ABOUT_PAGES.
export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'fleet-telematics',
    name: 'Fleet Telematics',
    tagline: 'GPS tracking & fleet operations',
    accent: '#1360ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M21 10c0 7-7 13-7 13s-7-6-7-13a7 7 0 0 1 14 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="14" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    slug: 'video-telematics',
    name: 'Video Telematics',
    tagline: 'AI dash cameras & MDVR safety',
    accent: '#1360ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2.5" y="7" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M18.5 11l6-4v14l-6-4v-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'smart-iot',
    name: 'Smart IoT & Asset Intelligence',
    tagline: 'Connected assets & sensors',
    accent: '#1360ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 3v4M14 21v4M3 14h4M21 14h4M6.3 6.3l2.8 2.8M18.9 18.9l2.8 2.8M21.7 6.3l-2.8 2.8M9.1 18.9l-2.8 2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'task-manager',
    name: 'Task Manager',
    tagline: 'Field team & job scheduling',
    accent: '#1360ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="4" width="18" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12.5l2.5 2.5L19 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 19h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'tracking-devices',
    name: 'Tracking Devices & Accessories',
    tagline: 'Hardware, OBUs & sensors',
    accent: '#1360ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="8" y="3" width="12" height="22" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]
