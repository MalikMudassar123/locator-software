import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import AboutPillarHero from '@/components/about/AboutPillarHero'
import MissionPillars from '@/components/about/MissionPillars'
import AboutPillarNav from '@/components/about/AboutPillarNav'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Our Mission — About Locator',
  description:
    'Our mission is to empower businesses worldwide with AI-powered IoT solutions that create safer, smarter, and more efficient operations — turning complexity into clarity and growth.',
  alternates: { canonical: '/about/mission' },
  openGraph: {
    title: 'Our Mission | Locator',
    description:
      'Empowering businesses worldwide with AI-powered IoT solutions for safer, smarter, more efficient operations.',
    url: '/about/mission',
    type: 'website',
  },
}

export default function AboutMissionPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <AboutPillarHero
        slug="mission"
        title="Our Mission"
        lead="Our mission is to empower businesses worldwide with AI-powered IoT solutions that create safer, smarter, and more efficient operations — turning complexity into clarity and growth."
      />
      <MissionPillars />
      <AboutPillarNav current="mission" />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
