import type { ReactNode } from 'react'

/**
 * Content for /service/car-tracking-system.
 *
 * Every string here is section copy, kept out of the components so the page
 * reads as one document and so the JSON-LD in page.tsx can be generated from the
 * same arrays the page renders — the two can then never drift.
 */

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export type Capability = {
  title: string
  desc: string
  href: string
  img: string
  alt: string
}

/** "What we offer" — the three things the platform is for. */
export const CAPABILITIES: Capability[] = [
  {
    title: 'Real-time fleet visibility',
    desc:
      'Every vehicle, every driver, every route — live on one map. See where each car is, what it is doing and how it got there, without calling anyone to ask.',
    href: '/service/fleet-telematics',
    img: '/footer_pages_images/car-tracking-system/real-time-fleet-visibility.png',
    alt: 'A tracked car reporting its route to a satellite and a live map on screen',
  },
  {
    title: 'Reduced fleet cost',
    desc:
      'Idling, speeding, after-hours use and unplanned detours are where a fleet quietly leaks money. LOCATOR measures all four, so you can act on the ones that cost most.',
    href: '/benefits-of-gps-tracking',
    img: '/footer_pages_images/car-tracking-system/reduced-fleet-cost.png',
    alt: 'Fuel pump beside a falling cost chart, reviewed under a magnifier',
  },
  {
    title: 'Effortless reporting',
    desc:
      'Trip histories, fuel, utilisation, driver behaviour and maintenance due — scheduled to your inbox or exported on demand. Decisions backed by the record, not by memory.',
    href: '/software',
    img: '/footer_pages_images/car-tracking-system/easy-reporting.png',
    alt: 'Fleet report panels showing utilisation, fuel and cost breakdowns',
  },
]

/** The eight outcomes, as claimed on the page this replaces. */
export const OUTCOMES: string[] = [
  'Improved safety and driving habits',
  'Automatic and accurate monitoring of your fleet',
  'Improved workforce productivity',
  'Measurable reduction in fuel cost',
  'Scheduled fleet maintenance and cost control',
  'Longer working life from every vehicle',
  'Faster response times for your customers',
  'Real-time visibility of the whole fleet',
]

export const STATS = [
  { value: 10, suffix: '+', label: 'Years in business across the UAE' },
  { value: 1000, suffix: '+', label: 'Happy customers on the platform' },
  { value: 20000, suffix: '+', label: 'Devices tracked and supported' },
]

export type Reason = { title: string; desc: string; icon: ReactNode }

/** Why choose this device — the four differentiators. */
export const REASONS: Reason[] = [
  {
    title: 'Advanced features',
    desc:
      'Innovative, well-built tooling that covers the whole job — live location, driver scoring, geofencing, fuel and engine data, document expiry and job dispatch in one place.',
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M12 2l2.4 6.3L21 9.6l-4.8 4.4 1.3 6.5-5.5-3.3-5.5 3.3 1.3-6.5L3 9.6l6.6-1.3z" />
      </svg>
    ),
  },
  {
    title: 'Competitive pricing',
    desc:
      'Built for fleets of every size. Whether you run four vehicles or four hundred, the pricing stays proportionate — a shoestring budget is still a workable budget here.',
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M20.6 13.4 12 22l-9-9V3h10z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Exceptional support',
    desc:
      'A question about how something works should never hold up your day. Our specialists are reachable 24/7, and they know the platform and the hardware equally well.',
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M3 15v-3a9 9 0 0 1 18 0v3" />
        <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Software integration',
    desc:
      'A flexible platform that accepts third-party software without a fight. Run LOCATOR alongside the ERP, dispatch or accounting tools you already depend on.',
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.6" />
        <rect x="14" y="14" width="7" height="7" rx="1.6" />
        <path d="M10 6.5h2.5A1.5 1.5 0 0 1 14 8v6" />
      </svg>
    ),
  },
]
