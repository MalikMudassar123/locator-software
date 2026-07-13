import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import AboutPillarHero from '@/components/about/AboutPillarHero'
import NewsroomComingSoon from '@/components/about/NewsroomComingSoon'
import AboutPillarNav from '@/components/about/AboutPillarNav'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Newsroom — About Locator',
  description:
    'Company news, product announcements, and updates from the team building Locator’s AI-powered IoT platform.',
  alternates: { canonical: '/about/newsroom' },
  openGraph: {
    title: 'Newsroom | Locator',
    description: 'Company news and updates from the Locator team.',
    url: '/about/newsroom',
    type: 'website',
  },
}

export default function AboutNewsroomPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <AboutPillarHero
        slug="newsroom"
        title="Newsroom"
        lead="Company news, product announcements, and updates from the team building Locator's AI-powered IoT platform."
      />
      <NewsroomComingSoon />
      <AboutPillarNav current="newsroom" />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
