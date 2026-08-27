// Single source of truth for the newsroom. Every card the board renders comes
// from here so the tab filter, the featured slot, and the rail all stay in sync.

export type NewsCategory =
  | 'product'
  | 'company'
  | 'events'
  | 'stories'
  | 'videos'
  | 'social'
  | 'media'
  | 'blog'

export type NewsItem = {
  id: string
  category: NewsCategory
  /** Small coloured chip drawn on the image. Falls back to the tab label. */
  tag: string
  title: string
  excerpt: string
  image: string
  /** How the image fills its frame. Defaults to 'cover' (crops to fill). Use
   *  'contain' when the source shouldn't be cropped — the frame letterboxes
   *  against its own dark background instead. */
  fit?: 'cover' | 'contain'
  /** Only meaningful with fit:'contain'. The image's own width/height ratio
   *  (e.g. '1280 / 805'), applied as the card's aspect-ratio so a 'contain'
   *  image fills its frame edge-to-edge instead of pillarboxing inside a
   *  frame shaped for something else. */
  imageAspect?: string
  date: string
  /** Shown on video cards only. */
  duration?: string
  /** Video cards only — drives the YouTube-style "12K views · 2 weeks ago" line. */
  views?: string
  ago?: string
  href: string
  /** Promotes the item into the big featured slot on the "All" tab. */
  featured?: boolean
}

export const TABS: { id: NewsCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Product Updates' },
  { id: 'company', label: 'Company News' },
  { id: 'events', label: 'Events' },
  { id: 'stories', label: 'Customer Stories' },
  { id: 'videos', label: 'Videos' },
  { id: 'social', label: 'Social Feed' },
  { id: 'media', label: 'Media Coverage' },
  { id: 'blog', label: 'Blog' },
]

export const CATEGORY_LABEL: Record<NewsCategory, string> = {
  product: 'Product Update',
  company: 'Company News',
  events: 'Event',
  stories: 'Customer Story',
  videos: 'Video',
  social: 'Social',
  media: 'Media Coverage',
  blog: 'Blog',
}

// Chip colours per category — kept here rather than in CSS so a new category
// only has to be added in one place.
// All drawn from the site's own hero-gradient blues. They still differ enough to
// tell categories apart at a glance, but the row of chips now reads as one family
// instead of a colour chart. `media` stays slate — it is a neutral, not a hue.
export const CATEGORY_COLOR: Record<NewsCategory, string> = {
  product: '#1360ee',
  company: '#0d73e3',
  events: '#06a4e2',
  stories: '#1157dd',
  videos: '#0a84e3',
  social: '#2563eb',
  media: '#475569',
  blog: '#0e9ee2',
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'ai-driver-behaviour',
    category: 'product',
    tag: 'Featured Story',
    title: 'AI Driver Behaviour Now Powered by Predictive Intelligence',
    excerpt:
      'Our latest update uses advanced AI models to predict risky behaviour and prevent incidents before they happen — scoring every trip in real time and coaching drivers automatically.',
    image: '/1766153393233.jpg',
    fit: 'contain',
    imageAspect: '1280 / 805',
    date: 'May 30, 2026',
    href: '#',
    featured: true,
  },
  {
    id: 'indoor-asset-tracking',
    category: 'product',
    tag: 'Product Update',
    title: 'Indoor Asset Tracking Now More Accurate',
    excerpt:
      'BLE beacon triangulation cuts indoor position error to under two metres across warehouses and yards.',
    image: '/tracking_devices/RFID_Reader.jpg',
    date: 'May 30, 2026',
    href: '#',
  },
  {
    id: 'gitex-2026',
    category: 'events',
    tag: 'Event',
    title: 'Locator at GITEX Global 2026',
    excerpt:
      'Meet the team at Hall 3, D120 for live demos of AI Fleet Intelligence and the new driver-coaching suite.',
    image: '/ChatGPT Image Aug 27, 2026, 02_43_48 PM.png',
    fit: 'contain',
    imageAspect: '1536 / 1024',
    date: 'May 28, 2026',
    href: '#',
  },
  {
    id: 'transworld-story',
    category: 'stories',
    tag: 'Customer Story',
    title: 'How TransWorld Cut Costs by 35%',
    excerpt:
      'A 480-vehicle logistics fleet on route optimisation and fuel analytics — here is what changed in nine months.',
    image: '/service_page/Transport  Logistics 2.webp',
    date: 'May 15, 2026',
    href: '#',
  },
  {
    id: 'v46-release',
    category: 'product',
    tag: 'Product Update',
    title: 'Version 4.6 — Predictive Maintenance & Fuel Intelligence',
    excerpt:
      'Engine-hour thresholds, predicted service windows, and a rebuilt fuel-theft detection engine ship to all plans.',
    image: '/hero/web-graphical-report.png',
    date: 'May 22, 2026',
    href: '#',
  },
  {
    id: 'route-optimisation',
    category: 'product',
    tag: 'Product Update',
    title: 'Smarter Route Optimisation and Mobile App Updates',
    excerpt:
      'Multi-stop sequencing now accounts for live traffic, delivery windows, and vehicle load in one pass.',
    image: '/hero/mobile-map-view.webp',
    date: 'April 30, 2026',
    href: '#',
  },
  {
    id: 'temperature-alerts',
    category: 'product',
    tag: 'Product Update',
    title: 'Real-Time Temperature & Cold-Chain Alerts',
    excerpt:
      'Continuous sensor logging now triggers instant excursion alerts and generates one-click compliance exports for refrigerated fleets.',
    image: '/tracking_devices/Temperature_Humidity_Sensor.png',
    date: 'April 12, 2026',
    href: '#',
  },
  {
    id: 'driver-app-scorecards',
    category: 'product',
    tag: 'Product Update',
    title: 'Redesigned Driver App with Live Scorecards',
    excerpt:
      'Drivers now see their safety score, trip history, and coaching tips in a faster, rebuilt mobile app — with in-app notifications for harsh events.',
    image: '/hero/mobile-summary.webp',
    date: 'March 28, 2026',
    href: '#',
  },
  {
    id: 'saudi-office',
    category: 'company',
    tag: 'Company News',
    title: 'Locator Opens Riyadh Office to Serve Saudi Fleets',
    excerpt:
      'Local support, Arabic-first onboarding, and in-country installation teams now operate from Riyadh.',
    image: '/service_page/Public & Government Fleet.webp',
    date: 'May 12, 2026',
    href: '#',
  },
  {
    id: 'iso-certification',
    category: 'company',
    tag: 'Company News',
    title: 'Locator Achieves ISO 27001 Certification',
    excerpt:
      'An independent audit confirms our information-security controls across the platform and data centres.',
    image: '/regulatory/asateel-certified/LOCATOR-ASATEEL.webp',
    date: 'April 18, 2026',
    href: '#',
  },
  {
    id: 'milestone-10k',
    category: 'company',
    tag: 'Company News',
    title: 'Locator Surpasses 10,000 Vehicles Tracked Daily',
    excerpt:
      'A new milestone across the GCC as our platform now monitors more than ten thousand active vehicles every single day.',
    image: '/service_page/Transport  Logistics 2.webp',
    date: 'April 05, 2026',
    href: '#',
  },
  {
    id: 'dbschenker-partnership',
    category: 'company',
    tag: 'Company News',
    title: 'Locator Partners with DB Schenker on Regional Logistics',
    excerpt:
      'A new strategic partnership brings AI-powered fleet intelligence to one of the region’s largest logistics operators.',
    image: '/service_page/Facility Management.webp',
    date: 'March 22, 2026',
    href: '#',
  },
  {
    id: 'series-b-funding',
    category: 'company',
    tag: 'Company News',
    title: 'Locator Raises Series B to Expand Across the GCC',
    excerpt:
      'The new funding round accelerates our expansion into Saudi Arabia, Qatar, and Oman, and doubles our R&D team.',
    image: '/hero/web-graphical-report.png',
    date: 'March 08, 2026',
    href: '#',
  },
  {
    id: 'team-expansion',
    category: 'company',
    tag: 'Company News',
    title: 'Locator Doubles Its Field Installation Team',
    excerpt:
      'Fifty new GPS field technicians join across the UAE and KSA, cutting average installation lead times in half.',
    image: '/service_page/Public & Government Fleet.webp',
    date: 'February 20, 2026',
    href: '#',
  },
  {
    id: 'fleet-summit',
    category: 'events',
    tag: 'Event',
    title: 'Fleet & Mobility Summit — Dubai',
    excerpt:
      'Our VP of Product joins the panel on AI safety scoring and what regulators will expect by 2027.',
    image: '/service_page/Best-GPS-Tracker for-Vehicle.webp',
    date: 'June 10, 2026',
    href: '#',
  },
  {
    id: 'ai-webinar',
    category: 'events',
    tag: 'Webinar',
    title: 'AI Fleet Intelligence Webinar',
    excerpt:
      'A 45-minute walkthrough of predictive maintenance, driver scoring, and the new analytics workspace.',
    image: '/hero/web-live-map.webp',
    date: 'June 25, 2026',
    href: '#',
  },
  {
    id: 'school-transport-story',
    category: 'stories',
    tag: 'Customer Story',
    title: 'Safer School Runs for 12,000 Students Daily',
    excerpt:
      'RFID student attendance plus live parent notifications across a 210-bus school transport operation.',
    image: '/service_page/School & Educational Fleet Monitoring.webp',
    date: 'April 26, 2026',
    href: '#',
  },
  {
    id: 'cold-chain-story',
    category: 'stories',
    tag: 'Customer Story',
    title: 'Cold Chain Compliance Without the Paperwork',
    excerpt:
      'Continuous temperature logging turned a weekly audit scramble into a one-click export.',
    image: '/tracking_devices/Temperature.webp',
    date: 'April 09, 2026',
    href: '#',
  },
  {
    id: 'construction-utilisation-story',
    category: 'stories',
    tag: 'Customer Story',
    title: 'Al Laith Group Lifts Equipment Utilisation by 28%',
    excerpt:
      'Machine-hour tracking across 14 active sites turned idle assets into billable hours and cut unauthorised use to near zero.',
    image: '/service_page/Construction Site Fleet.webp',
    date: 'March 30, 2026',
    href: '#',
  },
  {
    id: 'fuel-theft-story',
    category: 'stories',
    tag: 'Customer Story',
    title: 'Energy Fleet Ends Fuel Theft with Sensor Analytics',
    excerpt:
      'A tanker operator traced drain events off the fuel curve and recovered its telematics investment in under four months.',
    image: '/service_page/Petroleum & Energy Fleet Intelligence.webp',
    date: 'March 14, 2026',
    href: '#',
  },
  {
    id: 'rental-recovery-story',
    category: 'stories',
    tag: 'Customer Story',
    title: 'Rental Company Slashes Vehicle Recovery Time',
    excerpt:
      'Live location and geofence alerts helped a 900-car leasing fleet recover overdue vehicles in hours instead of days.',
    image: '/service_page/rental.webp',
    date: 'February 26, 2026',
    href: '#',
  },
  {
    id: 'video-construction',
    category: 'videos',
    tag: 'Customer Review',
    title: 'Construction Company Review — Al Laith Group',
    excerpt: 'Heavy equipment visibility across 14 active sites, in their own words.',
    image: '/service_page/Construction Site Fleet.webp',
    date: 'May 20, 2026',
    duration: '02:16',
    views: '14K views',
    ago: '2 months ago',
    href: '#',
  },
  {
    id: 'video-school',
    category: 'videos',
    tag: 'Customer Review',
    title: 'School Transport Success Story',
    excerpt: 'How a district cut late arrivals by 62% in one term.',
    image: '/service_page/Industries we serve/School Districtse.webp',
    date: 'May 06, 2026',
    duration: '01:45',
    views: '8.2K views',
    ago: '3 months ago',
    href: '#',
  },
  {
    id: 'video-cold-chain',
    category: 'videos',
    tag: 'Customer Review',
    title: 'Cold Chain Logistics Customer Story',
    excerpt: 'Pharmaceutical distribution with zero temperature excursions.',
    image: '/service_page/Healthcare Fleet Monitoring.webp',
    date: 'April 22, 2026',
    duration: '02:10',
    views: '21K views',
    ago: '3 months ago',
    href: '#',
  },
  {
    id: 'video-waste',
    category: 'videos',
    tag: 'Product Demo',
    title: 'Waste Management Route Playback in 3 Minutes',
    excerpt: 'A quick tour of route playback, missed-bin flags, and proof of service.',
    image: '/service_page/Waste Management Fleet Visibility.webp',
    date: 'April 02, 2026',
    duration: '03:04',
    views: '5.7K views',
    ago: '4 months ago',
    href: '#',
  },
  {
    id: 'video-geofence',
    category: 'videos',
    tag: 'Tutorial',
    title: 'How to Set Up Geofence Alerts Drivers Will Not Ignore',
    excerpt: 'Zone types, dwell thresholds, and escalation rules in one sitting.',
    image: '/hero/web-live-map.webp',
    date: 'March 26, 2026',
    duration: '06:41',
    views: '33K views',
    ago: '4 months ago',
    href: '#',
  },
  {
    id: 'video-fuel',
    category: 'videos',
    tag: 'Product Demo',
    title: 'Catching Fuel Theft with Sensor Data — Live Walkthrough',
    excerpt: 'Reading drain events off the fuel curve and turning them into alerts.',
    image: '/tracking_devices/Fuel_Sensor.jpg',
    date: 'March 12, 2026',
    duration: '04:52',
    views: '18K views',
    ago: '5 months ago',
    href: '#',
  },
]

export type SocialPost = {
  id: string
  network: 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube'
  /** Display name on the post byline. */
  handle: string
  /** Second byline line — the follower/role blurb LinkedIn shows under the name. */
  subtitle: string
  time: string
  text: string
  image: string
  /** Engagement counts rendered in the reaction bar. */
  likes: number
  comments: number
  reposts: number
  href: string
}

// Ordered newest-first — the Social Feed tab renders these as one continuous
// column, so this array doubles as the feed's sort order.
export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 's2',
    network: 'linkedin',
    handle: 'Locator',
    subtitle: '18,420 followers',
    time: '5h',
    text: 'AI is changing how fleets operate in 2026.\n\nOur VP of Product breaks down what actually moves the needle — and what is just noise. Three things we keep seeing across the 900+ fleets on our platform:\n\n1. Predictive maintenance beats scheduled maintenance, but only once you have 6+ months of engine-hour data.\n2. Driver scores change nothing on their own. The coaching loop is the product.\n3. Route optimisation savings mostly come from fewer failed deliveries, not shorter distance.\n\nFull breakdown in the comments. 👇',
    image: '/hero/web-graphical-report.png',
    likes: 428,
    comments: 37,
    reposts: 51,
    href: '#',
  },
  {
    id: 's1',
    network: 'instagram',
    handle: 'locator.ae',
    subtitle: 'Dubai, United Arab Emirates',
    time: '8h',
    text: 'Another fleet goes live. 120 vehicles connected across Dubai this week. 🚚\n\n#FleetManagement #GPSTracking #Telematics #Dubai',
    image: '/service_page/Transport  Logistics 2.webp',
    likes: 1240,
    comments: 62,
    reposts: 18,
    href: '#',
  },
  {
    id: 's5',
    network: 'youtube',
    handle: 'Locator',
    subtitle: 'New video · 6:41',
    time: '1d',
    text: 'New walkthrough: setting up geofence alerts that your drivers will not ignore. Zone types, dwell thresholds, and escalation rules — all in one sitting.',
    image: '/hero/web-live-map.webp',
    likes: 892,
    comments: 41,
    reposts: 24,
    href: '#',
  },
  {
    id: 's3',
    network: 'facebook',
    handle: 'Locator',
    subtitle: 'Sponsored · Dubai',
    time: '2d',
    text: 'Great conversations at the Fleet & Mobility Summit in Dubai. Thanks to everyone who stopped by the booth — and to the ops teams who told us exactly what is still broken. That list is now our roadmap.',
    image: '/service_page/video_banner.webp',
    likes: 604,
    comments: 28,
    reposts: 33,
    href: '#',
  },
  {
    id: 's4',
    network: 'x',
    handle: 'locator_ae',
    subtitle: '@locator_ae',
    time: '3d',
    text: 'v4.6 is out.\n\n· Predictive maintenance\n· Rebuilt fuel-theft detection\n· Route playback that actually keeps up with a 400-vehicle fleet\n\nShipping to all plans this week.',
    image: '/hero/web-route-playback.webp',
    likes: 2130,
    comments: 94,
    reposts: 312,
    href: '#',
  },
  {
    id: 's6',
    network: 'linkedin',
    handle: 'Locator',
    subtitle: '18,420 followers',
    time: '4d',
    text: 'We are hiring GPS field technicians across the UAE and KSA.\n\nIf you have hands-on vehicle electrical experience and want to work on connected fleets rather than one-off installs, we would like to talk. Riyadh, Dubai, and Abu Dhabi.',
    image: '/service_page/Facility Management Fleet.webp',
    likes: 356,
    comments: 19,
    reposts: 47,
    href: '#',
  },
]

export type MediaMention = {
  id: string
  publication: string
  title: string
  date: string
  image: string
  href: string
}

export const MEDIA_MENTIONS: MediaMention[] = [
  {
    id: 'm1',
    publication: 'Khaleej Times',
    title: 'Locator Raises the Bar for Fleet Intelligence in the UAE',
    date: 'May 24, 2026',
    image: '/hero/web-live-map.webp',
    href: '#',
  },
  {
    id: 'm2',
    publication: 'Gulf Business',
    title: 'AI-Powered Telematics Is Driving Smarter Fleets Across the Gulf',
    date: 'May 11, 2026',
    image: '/hero/web-graphical-report.png',
    href: '#',
  },
  {
    id: 'm3',
    publication: 'Arabian Business',
    title: 'Locator’s Growth Story and Road Ahead',
    date: 'April 20, 2026',
    image: '/service_page/Transport  Logistics 2.webp',
    href: '#',
  },
  {
    id: 'm4',
    publication: 'Zawya',
    title: 'Regional Logistics Operators Turn to Predictive Maintenance',
    date: 'April 03, 2026',
    image: '/service_page/Facility Management.webp',
    href: '#',
  },
]

export type LiveUpdate = {
  id: string
  kind: 'release' | 'video' | 'linkedin' | 'webinar' | 'event'
  title: string
  body: string
  /**
   * How old the update is when the page loads, in seconds. The rail renders
   * this through a live formatter that ticks upward ("3s ago" → "1m ago"), so
   * the panel ages in real time instead of showing a frozen string.
   */
  secondsAgo: number
  cta: string
  href: string
}

/** "3s ago", "12m ago", "4h ago", "2d ago" — matches how a real feed reads. */
export function formatAgo(seconds: number): string {
  if (seconds < 3) return 'just now'
  if (seconds < 60) return `${Math.floor(seconds)}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

// The sticky rail. Ordered newest-first; `time` is relative on purpose so the
// panel reads as a feed rather than an archive.
export const LIVE_UPDATES: LiveUpdate[] = [
  {
    id: 'l1',
    kind: 'release',
    title: 'Version 4.6 Released',
    body: 'AI Driver Behaviour with Predictive Intelligence is here.',
    secondsAgo: 3,
    cta: 'View Release Notes',
    href: '#',
  },
  {
    id: 'l2',
    kind: 'video',
    title: 'New Customer Review Video',
    body: 'TransWorld Logistics shares their success story.',
    secondsAgo: 720,
    cta: 'Watch Now',
    href: '#',
  },
  {
    id: 'l3',
    kind: 'linkedin',
    title: 'New LinkedIn Post',
    body: 'How AI is transforming fleet operations in 2026.',
    secondsAgo: 1560,
    cta: 'Open Post',
    href: '#',
  },
  {
    id: 'l4',
    kind: 'webinar',
    title: 'Webinar Reminder',
    body: 'AI Fleet Intelligence Webinar at 3:00 PM GST.',
    secondsAgo: 3900,
    cta: 'Register Now',
    href: '#',
  },
  {
    id: 'l5',
    kind: 'event',
    title: 'GITEX Global 2026',
    body: 'Booth setup completed. See you at Hall 3, D120.',
    secondsAgo: 11400,
    cta: 'View Photos',
    href: '#',
  },
]

export type TickerItem = { label: string; badge?: string }

export const TICKER: TickerItem[] = [
  { label: 'v4.6 Released', badge: 'New' },
  { label: 'New Customer Story', badge: 'Video' },
  { label: 'GITEX Global 2026', badge: 'Event' },
  { label: 'New LinkedIn Post', badge: 'Social' },
  { label: 'AI Maintenance Feature Launched' },
  { label: 'Riyadh Office Now Open', badge: 'News' },
  { label: 'ISO 27001 Certified' },
]

export type TimelineEntry = {
  version: string
  date: string
  title: string
  body: string
  latest?: boolean
  href: string
}

export const RELEASE_TIMELINE: TimelineEntry[] = [
  {
    version: 'v4.6.0',
    date: 'May 22, 2026',
    title: 'AI Driver Behaviour',
    body: 'Predictive alerts, fuel-anomaly detection, and more.',
    latest: true,
    href: '#',
  },
  {
    version: 'v4.5.2',
    date: 'May 02, 2026',
    title: 'Maintenance Scheduling',
    body: 'Smart Reports and Performance Improvements.',
    href: '#',
  },
  {
    version: 'v4.5.0',
    date: 'April 30, 2026',
    title: 'Route Optimisation',
    body: 'Sensor Enhancements and Mobile App Updates.',
    href: '#',
  },
]

export type UpcomingEvent = {
  day: string
  month: string
  title: string
  meta: string
  cta: string
  href: string
}

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    day: '25',
    month: 'JUN',
    title: 'AI Fleet Intelligence Webinar',
    meta: '3:00 PM GST · Online',
    cta: 'Register',
    href: '#',
  },
  {
    day: '13',
    month: 'OCT',
    title: 'GITEX Global 2026',
    meta: 'Dubai World Trade Centre',
    cta: 'Learn More',
    href: '#',
  },
  {
    day: '10',
    month: 'JUN',
    title: 'Fleet & Mobility Summit',
    meta: 'Dubai World Trade Centre',
    cta: 'Learn More',
    href: '#',
  },
]

export const BLOG_POSTS: NewsItem[] = [
  {
    id: 'b1',
    category: 'blog',
    tag: 'Fleet Management',
    title: 'Fleet Tracking Software: The Smart Way to Manage Vehicles in Real-Time',
    excerpt:
      'Modern fleet tracking does far more than show vehicle locations — it gives you full control of your mobile workforce in real time.',
    image: '/blog/fleet tracking.png',
    date: 'August 12, 2026',
    href: '#',
  },
  {
    id: 'b2',
    category: 'blog',
    tag: 'GPS Technology',
    title: 'The Tracking Edge — Optimized GPS & Field Tools',
    excerpt:
      'GPS tracking is no longer just about vehicle locations. It is about managing your entire field workflow smarter and faster.',
    image: '/blog/Optimized GPS.png',
    date: 'July 18, 2026',
    href: '#',
  },
  {
    id: 'b3',
    category: 'blog',
    tag: 'Cost Control',
    title: 'Five Fuel Costs Hiding in Plain Sight in Your Fleet Data',
    excerpt:
      'Idling, unauthorised trips, and drain events rarely show up on a fuel card statement — but they always show up in telematics.',
    image: '/tracking_devices/Fuel_Sensor.jpg',
    date: 'June 28, 2026',
    href: '#',
  },
  {
    id: 'b4',
    category: 'blog',
    tag: 'Compliance',
    title: 'A Practical Guide to Fleet Compliance in the UAE',
    excerpt:
      'What Asateel, SecurePath, and Shahin actually require — and how to stay audit-ready without extra admin.',
    image: '/service_page/Petroleum & Energy Fleet Intelligence.webp',
    date: 'June 04, 2026',
    href: '#',
  },
  {
    id: 'b5',
    category: 'blog',
    tag: 'Safety',
    title: 'Driver Coaching That Drivers Actually Accept',
    excerpt:
      'Scores alone change nothing. Here is the feedback loop that moved harsh-braking events down 41% in one fleet.',
    image: '/service_page/Rental Leasing.webp',
    date: 'May 19, 2026',
    href: '#',
  },
  {
    id: 'b6',
    category: 'blog',
    tag: 'Operations',
    title: 'Route Optimisation: Where the Savings Really Come From',
    excerpt:
      'Shorter routes are only part of it. The bigger win is fewer failed deliveries and tighter time windows.',
    image: '/hero/web-route-playback.webp',
    date: 'April 30, 2026',
    href: '#',
  },
]
