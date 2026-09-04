import type { ReactNode } from 'react'

/**
 * Content shared by every tracking product page (/service/car-tracking-system,
 * /service/vehicle-tracking-system, …).
 *
 * These two sets are not page-specific: the customer quotes are the same four
 * accounts wherever they appear, and the three use cases are the shapes the
 * product is sold in regardless of which door a visitor came through. Keeping
 * one copy here means a corrected quote or a re-pointed link lands on every page
 * at once, which is the whole reason the section components moved out of
 * car-tracking/ alongside it.
 */

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export type UseCase = { title: string; desc: string; href: string; icon: ReactNode }

/** Who the tracker is bought for. */
export const USE_CASES: UseCase[] = [
  {
    title: 'Sales & service tracking',
    desc:
      'The right fit for sales and service vehicles carrying staff and product on the road — see who is nearest a job, and prove when they arrived.',
    href: '/service/fleet-telematics',
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M5 17H3v-5l2-5h11l3 5h1v5h-2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: 'Delivery & truck tracking',
    desc:
      'Customer service and fleet efficiency are what decide whether a delivery or trucking operation makes money. Both are measurable from the first week.',
    href: '/service/fleet-telematics',
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <rect x="1.5" y="6" width="12" height="10" rx="1.4" />
        <path d="M13.5 9.5H18l3.5 3.5V16h-8z" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: 'Asset tracking',
    desc:
      'Generators, plant and equipment report the things that matter for them — location, fuel level, running hours and temperature — on the same map as the vehicles.',
    href: '/service/smart-iot',
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M12 2 3 6.5v11L12 22l9-4.5v-11z" />
        <path d="M3 6.5 12 11l9-4.5M12 11v11" />
      </svg>
    ),
  },
]

/**
 * `rating` is not invented here — these same four quotes already carry
 * `rating: 5` in components/service/serviceTestimonials.ts, which is what the
 * gps-tracker / car-tracker pages publish. Carrying the figure across keeps the
 * two surfaces telling the same story.
 */
export type Voice = { quote: string; company: string; person: string; role: string; logo: string; rating: number }

/** Customer quotes, carried over verbatim, each with the client's own mark. */
export const VOICES: Voice[] = [
  {
    quote:
      'Having a large fleet, I can easily monitor the document expiry and service maintenance of our vehicles with the help of LOCATOR.',
    company: 'Safari Mall',
    person: 'Shameem',
    role: 'Transport',
    logo: '/services/testimonials/safari.png',
    rating: 5,
  },
  {
    quote:
      'We are able to monitor and control vehicle usage with LOCATOR now — no worries about unnecessary fuel consumption.',
    company: 'Med7',
    person: 'Susan',
    role: 'Manager',
    logo: '/services/testimonials/med.png',
    rating: 5,
  },
  {
    quote:
      'Assigning jobs to multiple drivers is hard. With LOCATOR, we can now schedule jobs to drivers with ease.',
    company: 'TAD-BEER',
    person: 'Shahid',
    role: 'IT Manager',
    logo: '/services/testimonials/tad.png',
    rating: 5,
  },
  {
    quote:
      'A user-friendly tool for managing your fleet, with a commendable tech support team. We highly recommend LOCATOR.',
    company: 'Blue Rhine',
    person: 'Ahmed',
    role: 'Admin',
    logo: '/services/testimonials/blue.png',
    rating: 5,
  },
]
