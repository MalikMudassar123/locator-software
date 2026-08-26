import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import AboutPillarHero from '@/components/about/AboutPillarHero'
import CoreValuesIntro from '@/components/about/CoreValuesIntro'
import AboutValues from '@/components/about/AboutValues'
import MissionCTA from '@/components/about/MissionCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Our Core Values — About Locator',
  description:
    'Customer success, purpose-driven innovation, operational excellence, transparency, safety, and ownership with integrity — the principles behind everything we build.',
  alternates: { canonical: '/about/core-values' },
  openGraph: {
    title: 'Our Core Values | Locator',
    description:
      'The six principles that guide how we build products and work with customers every day.',
    url: '/about/core-values',
    type: 'website',
  },
}

export default function AboutCoreValuesPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <AboutPillarHero
        slug="core-values"
        title="# The principles that guide how we innovate, work, and grow togetherrrr."
        lead="The principles that guide how we innovate, work, and grow together."
      />
      <CoreValuesIntro />
      <AboutValues />
      {/* <AboutPillarNav current="core-values" /> */}
      <MissionCTA />
      <Footer />
    </main>
  )
}
