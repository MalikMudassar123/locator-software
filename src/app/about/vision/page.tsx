import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import VisionHero from '@/components/about/VisionHero'
import VisionRoadmap from '@/components/about/VisionRoadmap'
// import AboutPillarNav from '@/components/about/AboutPillarNav' // Explore more about Locator — disabled
// import SoftwareCTA from '@/components/software/SoftwareCTA' // Get Started Today — disabled
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Our Vision — About Locator',
  description:
    'By 2035, we envision a globally connected world where one million IoT devices enable smarter mobility, safer assets, and more intelligent operations.',
  alternates: { canonical: '/about/vision' },
  openGraph: {
    title: 'Our Vision | Locator',
    description:
      'A trusted global leader in AI-powered IoT innovation — one million connected devices by 2035.',
    url: '/about/vision',
    type: 'website',
  },
}

export default function AboutVisionPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <VisionHero />
      <VisionRoadmap />
      {/* <AboutPillarNav current="vision" /> */}
      {/* <SoftwareCTA /> */}
      <Footer />
    </main>
  )
}
