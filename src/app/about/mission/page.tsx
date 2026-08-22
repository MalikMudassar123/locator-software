import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import MissionHero from '@/components/about/MissionHero'
import MissionPillars from '@/components/about/MissionPillars'
import MissionCTA from '@/components/about/MissionCTA'
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
      <MissionHero />
      <MissionPillars />
      {/* <AboutPillarNav current="mission" /> */}
      <MissionCTA />
      <Footer />
    </main>
  )
}
