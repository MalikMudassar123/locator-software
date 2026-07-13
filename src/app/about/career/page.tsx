import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import AboutPillarHero from '@/components/about/AboutPillarHero'
import CareerContent from '@/components/about/CareerContent'
import AboutPillarNav from '@/components/about/AboutPillarNav'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Careers — About Locator',
  description:
    'Join the team building AI-powered IoT technology that keeps businesses across the region moving safely and efficiently.',
  alternates: { canonical: '/about/career' },
  openGraph: {
    title: 'Careers | Locator',
    description: 'Build the future of fleet intelligence with the Locator team.',
    url: '/about/career',
    type: 'website',
  },
}

export default function AboutCareerPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <AboutPillarHero
        slug="career"
        title="Careers"
        lead="Join the team building AI-powered IoT technology that keeps businesses across the region moving safely and efficiently."
      />
      <CareerContent />
      <AboutPillarNav current="career" />
      <Footer />
    </main>
  )
}
