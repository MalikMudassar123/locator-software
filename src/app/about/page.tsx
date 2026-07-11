import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import AboutHero from '@/components/about/AboutHero'
import AboutTimeline from '@/components/about/AboutTimeline'
import AboutValues from '@/components/about/AboutValues'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'About Us — Locator',
  description:
    'Locator is an AI-powered IoT company helping businesses turn vehicles, assets, and field teams into engines of intelligent growth. Discover our purpose, vision, mission, and core values.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Locator | AI-Powered IoT for Smarter Operations',
    description:
      'Our purpose, vision, mission, and core values — bringing greater control, efficiency, safety, and transparency to operations across the UAE and beyond.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <AboutHero />
      <AboutTimeline />
      <AboutValues />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
