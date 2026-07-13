import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import AboutPillarHero from '@/components/about/AboutPillarHero'
import PurposePillars from '@/components/about/PurposePillars'
import AboutPillarNav from '@/components/about/AboutPillarNav'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Our Purpose — About Locator',
  description:
    'We exist to help businesses transform underutilized vehicles, assets, and field teams into engines of intelligent growth through AI-powered IoT technology.',
  alternates: { canonical: '/about/purpose' },
  openGraph: {
    title: 'Our Purpose | Locator',
    description:
      'AI-powered IoT technology that brings greater control, efficiency, safety, and transparency to operations.',
    url: '/about/purpose',
    type: 'website',
  },
}

export default function AboutPurposePage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <AboutPillarHero
        slug="purpose"
        title="Our Purpose"
        lead="We exist to help businesses transform underutilized vehicles, assets, and field teams into engines of intelligent growth. Through AI-powered IoT technology, we bring greater control, efficiency, safety, and transparency to operations — reducing costs, improving profitability, and enabling businesses to grow with purpose."
      />
      <PurposePillars />
      <AboutPillarNav current="purpose" />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
