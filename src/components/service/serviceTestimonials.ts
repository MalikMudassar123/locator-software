/**
 * Customer quotes shown on the service landing pages.
 *
 * `avatar` points at a company logo, not a face — hence the `logo` flag, which
 * tells the carousel to letterbox the image on white instead of cropping it to
 * fill the circle. A logo cropped with `cover` loses its wordmark at the edges,
 * which is exactly the part that identifies it.
 *
 * Saif Belhasa has no logo asset in the repo, so it carries no `avatar` and
 * falls back to the initials tile the carousel draws for missing images.
 */
export const LOCATOR_TESTIMONIALS = [
  {
    name: 'Shameem — Transport, Safari Mall',
    rating: 5,
    text: 'Having a large fleet, I can easily monitor the documents expiry and service maintenance of our vehicles with the help of LOCATOR.',
    avatar: '/services/testimonials/safari.png',
    logo: true,
  },
  {
    name: 'Susan — Manager, Med7 Pharmacy',
    rating: 5,
    text: 'We are able to monitor and control vehicle usage with LOCATOR now, no worries about unnecessary fuel consumption.',
    avatar: '/services/testimonials/med.png',
    logo: true,
  },
  {
    name: 'Shanid — IT Manager, TAD-BEER',
    rating: 5,
    text: 'Assigning jobs to multiple drivers is hard — with LOCATOR, we can now schedule jobs to drivers with ease.',
    avatar: '/services/testimonials/tad.png',
    logo: true,
  },
  {
    name: 'Ahmed — Admin, Blue Rhine',
    rating: 5,
    text: 'A user-friendly tool for managing your fleet. With its commendable tech support team, we highly recommend LOCATOR.',
    avatar: '/services/testimonials/blue.png',
    logo: true,
  },
  {
    name: 'Saif Belhasa — Transport Manager',
    rating: 5,
    text: 'I’m managing a big list of vehicles and it’s always a challenge to keep track of Mulkia, insurance expiries, and periodic services. Now LOCATOR takes all the worry out of fleet maintenance.',
    avatar: '',
  },
]
