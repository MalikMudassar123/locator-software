export type BlogImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type BlogPost = {
  slug: string
  title: string
  seoTitle: string
  description: string
  keywords: string[]
  excerpt: string
  tag: string
  date: string
  dateLabel: string
  readingMinutes: number
  hero: BlogImage
  legacyUrl: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fleet-tracking-software-real-time-vehicle-management",
    title: "Fleet Tracking Software: The Smart Way to Manage Vehicles in Real-Time",
    seoTitle: "Fleet Tracking Software in UAE | Real-Time GPS Vehicle Management",
    description: "Discover how Locator’s fleet tracking software empowers UAE businesses with real-time GPS tracking, driver behavior monitoring, route optimization, and automated alerts — all from one easy dashboard to reduce costs and boost productivity.",
    keywords: ["fleet tracking software", "GPS vehicle tracking UAE", "real-time fleet management", "driver monitoring UAE", "route optimization", "vehicle health tracking", "Locator fleet software", "fleet management Dubai", "live GPS tracking", "driver scorecards UAE"],
    excerpt: "Whether you're managing delivery vans, heavy trucks, or service vehicles, staying in control of operations is crucial. Today’s fleet tracking software does far more than just show vehicle locations — it gives you full control of your mobile workforce in real-time.",
    tag: "Fleet Tracking",
    date: "2025-08-12",
    dateLabel: "August 12, 2025",
    readingMinutes: 3,
    hero: { src: "/blog/fleet-tracking.webp", alt: "Fleet tracking software following LOCATOR trucks across the Dubai skyline on web and mobile", width: 1800, height: 1214 },
    legacyUrl: "https://locator.ae/blog-details.html/13/",
  },
  {
    slug: "the-tracking-edge-optimized-gps-and-field-tools",
    title: "The Tracking Edge – Optimized GPS & Field Tools",
    seoTitle: "GPS Tracking & Fleet Tools for Smarter Operations | Locator UAE",
    description: "Boost productivity with real-time GPS tracking, task management, and fleet tools. Manage vehicles, staff & operations smarter with Locator.ae across the UAE.",
    keywords: ["GPS tracker UAE", "fleet management software", "real-time vehicle tracking", "task manager app", "field service tools", "Locator.ae", "vehicle monitoring UAE", "driver tracking system", "fleet tracking Dubai", "optimize fleet operations"],
    excerpt: "Whether you're managing delivery fleets, service vehicles, or mobile field teams, staying in control of operations is key to success. Modern GPS tracking is no longer just about showing vehicle locations — it’s about managing your entire field workflow smarter and faster.",
    tag: "GPS Tracking",
    date: "2025-07-18",
    dateLabel: "July 18, 2025",
    readingMinutes: 3,
    hero: { src: "/blog/optimized-gps.webp", alt: "Car tracked in real time on a mobile GPS map against the Dubai skyline", width: 1800, height: 1013 },
    legacyUrl: "https://locator.ae/blog-details.html/12/",
  },
  {
    slug: "car-tracker-hub-from-routes-to-reports",
    title: "Car Tracker Hub – From Routes to Reports",
    seoTitle: "Route Playback & Car Tracker Tools for Smarter Fleets | Locator UAE",
    description: "Track every route, stop, toll, and driver behavior with Route Playback from Locator UAE. Gain control, cut costs, and drive smarter decisions.",
    keywords: ["route playback UAE", "car tracker system", "GPS tracker Dubai", "driver behavior monitoring", "toll tracking fleet", "POI monitoring", "vehicle tracking UAE", "idle time tracker", "fuel cost tracking", "fleet analytics", "Locator UAE"],
    excerpt: "Whether you're managing delivery fleets, corporate vehicles, or any car-dependent business, visibility over daily operations is crucial. That’s where Route Playback becomes a game-changer.",
    tag: "Car Tracking",
    date: "2025-06-26",
    dateLabel: "June 26, 2025",
    readingMinutes: 4,
    hero: { src: "/blog/car-hub.webp", alt: "Hand holding a phone that tracks a car in real time", width: 1800, height: 1267 },
    legacyUrl: "https://locator.ae/blog-details.html/11/",
  },
  {
    slug: "next-gen-gps-tracker-insights",
    title: "LOCATOR: Next-Gen GPS Tracker Insights",
    seoTitle: "Next-Gen GPS Tracker with Smart Fleet Tools | Locator UAE",
    description: "Discover advanced GPS tracking with route optimization, task & expense tools. Locator UAE brings full control to your fleet operations — all in one platform.",
    keywords: ["next-gen GPS tracker UAE", "route optimization tool", "fleet tracking system", "real-time vehicle monitoring", "task manager GPS", "expense manager fleet", "route playback UAE", "Locator.ae", "GPS tracking software Dubai", "fleet automation UAE"],
    excerpt: "Whether you're managing delivery fleets, service vehicles, or mobile field teams, staying in control of daily operations is more important than ever. Today’s next-generation GPS trackers go far beyond simply showing a dot on a map. They offer powerful tools like real-time location tracking, route optimization, task assignment, and expense monitoring — all designed to keep your fleet efficient, accountable, and cost-effective.",
    tag: "GPS Tracking",
    date: "2025-06-15",
    dateLabel: "June 15, 2025",
    readingMinutes: 3,
    hero: { src: "/blog/locator-apps.webp", alt: "Live view, trips, summary and report screens in the LOCATOR GPS tracker mobile app", width: 1799, height: 1230 },
    legacyUrl: "https://locator.ae/blog-details.html/10/",
  },
  {
    slug: "car-fleet-why-you-need-a-gps-tracker",
    title: "Do You Manage a Car Fleet? Here’s Why You Need a GPS Tracker",
    seoTitle: "Do You Manage a Car Fleet? Here’s Why You Need a GPS Tracker",
    description: "Managing a car fleet? Discover how a GPS tracker can reduce fuel costs, prevent misuse, and improve efficiency with Locator's smart tracking system.",
    keywords: ["GPS tracker for car fleet", "fleet tracking system", "vehicle tracking UAE", "real-time GPS tracking", "fleet management software", "car fleet monitoring"],
    excerpt: "Whether you manage delivery fleets, corporate transport, or any vehicle-reliant business, maintaining control is critical. GPS trackers were designed for this purpose — and Locator.ae delivers smart, real-time solutions to keep your operations efficient, visible, and fully connected. From vans to trucks, and especially when it comes to cars, having the right tracker for car can make all the difference.",
    tag: "Car Tracking",
    date: "2025-06-09",
    dateLabel: "June 9, 2025",
    readingMinutes: 3,
    hero: { src: "/blog/tracker-for-cars.webp", alt: "Fleet managers reviewing a car tracker dashboard showing every vehicle on the map", width: 1800, height: 1140 },
    legacyUrl: "https://locator.ae/blog-details.html/9/",
  },
  {
    slug: "why-gps-trackers-matter-for-your-business",
    title: "Why GPS Trackers Matter for Your Business?",
    seoTitle: "Why a GPS Tracker Is Essential for Your Business | Locator UAE",
    description: "Discover how Locator’s GPS tracker software helps your business cut costs, improve efficiency, and gain real-time control of your vehicles and fleet.",
    keywords: ["GPS tracker", "GPS tracking software", "vehicle tracking", "fleet management", "real-time tracking", "Locator GPS UAE"],
    excerpt: "Whether you manage delivery fleets, corporate transport, or any vehicle-reliant business,maintaining control is critical. GPS trackers were designed for this purpose — and Locator.ae delivers smart, real-time solutions to keep your operations efficient,visible, and fully connected.",
    tag: "GPS Tracking",
    date: "2025-05-15",
    dateLabel: "May 15, 2025",
    readingMinutes: 3,
    hero: { src: "/blog/gps-tracker.webp", alt: "Team reviewing GPS tracker positions for a fleet of vans on a desktop map", width: 1800, height: 1139 },
    legacyUrl: "https://locator.ae/blog-details.html/8/",
  },
  {
    slug: "gps-vehicle-trackers-fleet-management-dubai",
    title: "Revolutionizing Fleet Management in Dubai : The Power of GPS Vehicle Trackers in Dubai",
    seoTitle: "Revolutionizing Fleet Management in Dubai | GPS Vehicle Tracking by LOCATOR",
    description: "Discover how GPS vehicle trackers from Locator.ae are transforming fleet management in Dubai. From live tracking to route optimization and driver monitoring, stay efficient, secure, and in control.",
    keywords: ["GPS vehicle trackers Dubai", "fleet management solutions", "real-time vehicle tracking", "route optimization UAE", "driver monitoring system", "Locator.ae GPS tracking"],
    excerpt: "Whether you manage delivery fleets, corporate transport, or any vehicle-reliant business, maintaining control is critical. GPS vehicle trackers were designed for this purpose - and Locator.ae delivers smart, real-time solutions to keep your operations efficient, visible, and fully connected",
    tag: "Fleet Management",
    date: "2025-04-29",
    dateLabel: "April 29, 2025",
    readingMinutes: 2,
    hero: { src: "/blog/the-power-of-gps-vehicle-tracker.webp", alt: "Fleet manager following vehicles across Dubai on a GPS vehicle tracking dashboard", width: 1800, height: 1139 },
    legacyUrl: "https://locator.ae/blog-details.html/7/",
  },
  {
    slug: "asateel-vehicle-permit-4-simple-steps",
    title: "4 Simple Steps to get your Vehicle Permit in ASATEEL and start operating in Abu Dhabi",
    seoTitle: "4 Simple Steps to get your Vehicle Permit in ASATEEL",
    description: "4 Simple Steps to get your Vehicle Permit in ASATEEL and start operating in Abu Dhabi. You may connect us anytime at 052 675 1880 or email us at info@locator.ae if you have any queries on the steps.",
    keywords: ["ASATEEL", "asateel certificate", "iavmep", "asateel abu dhabi", "asateel uae contact number", "asateel vehicle permit", "ASATEEL GPS Tracker", "https://asateel.itc.gov.ae"],
    excerpt: "It seems that you are looking to register you company in ASATEEL and obtain a Vehicle Permit to start your business operations in Abu Dhabi.",
    tag: "ASATEEL Compliance",
    date: "2025-03-06",
    dateLabel: "March 6, 2025",
    readingMinutes: 4,
    hero: { src: "/blog/four-steps-to-get-vehicle-permit-in-asateel.svg", alt: "The four ASATEEL steps — company registration, adding a traffic code, GPS device installation and applying for the vehicle permit", width: 1713, height: 1157 },
    legacyUrl: "https://locator.ae/blog-details.html/1/",
  },
  {
    slug: "asateel-certified-obu-installation-made-simple",
    title: "We make ASATEEL Certified OBU Installation Simple!",
    seoTitle: "We make ASATEEL Simple!",
    description: "LOCATOR, is one of the listed approved companies by ITC to supply, install, operate and maintain GPS tracking devices. We are ready to help you and make the process simpler. You may Call us anytime at 052 675 1880 or email us at info@locator.ae if you have any queries.",
    keywords: ["ASATEEL", "asateel certificate", "asateel abu dhabi", "asateel uae contact number", "asateel customer care number", "asateel approved companies", "ASATEEL GPS Tracker", "https://asateel.itc.gov.ae"],
    excerpt: "As you are aware, the Integrated Transport Centre (ITC) in Abu Dhabi mandates all operating passengers’ transport services by buses and freight transport operation companies has to register on the ASATEEL platform.",
    tag: "ASATEEL Compliance",
    date: "2025-02-08",
    dateLabel: "February 8, 2025",
    readingMinutes: 1,
    hero: { src: "/blog/asateel-simple.svg", alt: "The four ASATEEL vehicle-permit stages shown as cards beside a fleet administrator at a laptop", width: 1280, height: 1056 },
    legacyUrl: "https://locator.ae/blog-details.html/2/",
  },
  {
    slug: "asateel-freight-and-passenger-transport-abu-dhabi",
    title: "ASATEEL: Freight Transport and Passenger transport operating in Abu Dhabi. What you should know?",
    seoTitle: "ASATEEL: Freight Transport and Passenger transport operating in Abu Dhabi.",
    description: "LOCATOR, an approved and officially ASATEEL-qualified supplier in Abu Dhabi, always aim to ensure that GPS devices being installed and monitored are align with the policies of ITC. We are ready to help you and make the process simpler. You may call us anytime at 052 675 1880 or email us at info@locator.ae if you have further queries.",
    keywords: ["ASATEEL", "asateel certificate", "asateel UAE", "asateel approved companies", "ASATEEL GPS Tracker", "https://asateel.itc.gov.ae", "ITC"],
    excerpt: "The Integrated Transport Centre (ITC) in Abu Dhabi is an organization established by the Department of Municipalities and Transport (DMT).",
    tag: "ASATEEL Compliance",
    date: "2025-01-02",
    dateLabel: "January 2, 2025",
    readingMinutes: 5,
    hero: { src: "/blog/asateel-freight-and-passenger-transport.webp", alt: "Fleet operators reviewing ASATEEL freight and passenger transport data on a dashboard", width: 1300, height: 704 },
    legacyUrl: "https://locator.ae/blog-details.html/3/",
  },
  {
    slug: "ten-things-a-fleet-manager-should-be-tracking",
    title: "Ten Things A Fleet Manager Should Be Tracking",
    seoTitle: "Ten Things A Fleet Manager Should Be Tracking.",
    description: "Check out these 10 crucial metrics that every fleet manager needs to keep an eye on to enhance decision-making, boost efficiency, and streamline fleet operations.",
    keywords: ["ASATEEL", "asateel certificate", "asateel UAE", "asateel approved companies", "ASATEEL GPS Tracker", "https://asateel.itc.gov.ae", "ITC"],
    excerpt: "Decision making for your fleet operations comes from data gathered throughout a certain period of time.",
    tag: "Fleet Management",
    date: "2024-11-07",
    dateLabel: "November 7, 2024",
    readingMinutes: 4,
    hero: { src: "/newsroom/graphical-report.png", alt: "Fleet reporting dashboard showing the metrics a fleet manager should be tracking", width: 1400, height: 1282 },
    legacyUrl: "https://locator.ae/blog-details.html/5/",
  },
  {
    slug: "how-to-keep-high-mileage-vehicles-running-smoothly",
    title: "How to Keep High-Mileage Vehicles Running Smoothly",
    seoTitle: "Extend Life of High-Mileage Vehicles with LOCATOR UAE",
    description: "Extend the life of high-mileage vehicles with smart maintenance tips. Learn about oil changes, tire checks, and more for better fleet performance.",
    keywords: ["high-mileage vehicles", "fleet maintenance", "oil changes", "tire inspections", "vehicle longevity", "fleet performance"],
    excerpt: "After some period of time, and after running a thousand miles, vehicle performance decreases.",
    tag: "Vehicle Maintenance",
    date: "2024-10-03",
    dateLabel: "October 3, 2024",
    readingMinutes: 1,
    hero: { src: "/blog/mileage.png", alt: "How to keep high-mileage vehicles running smoothly, shown with a fleet maintenance dashboard", width: 1200, height: 800 },
    legacyUrl: "https://locator.ae/blog-details.html/6/",
  },
]

export const BLOG_BASE = '/about/newsroom/blog'

export const blogHref = (slug: string) => `${BLOG_BASE}/${slug}`

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getBlogPost(slug)
  if (!post) return BLOG_POSTS.slice(0, limit)
  const rest = BLOG_POSTS.filter((p) => p.slug !== slug)
  const sameTag = rest.filter((p) => p.tag === post.tag)
  return [...sameTag, ...rest.filter((p) => p.tag !== post.tag)].slice(0, limit)
}
