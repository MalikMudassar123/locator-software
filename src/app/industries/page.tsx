import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import IndustriesHero from '@/components/industries/IndustriesHero'
import IndustriesGrid from '@/components/industries/IndustriesGrid'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Locator supports connected fleets across every industry in the UAE — from logistics and construction to healthcare, government, and more.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries We Serve | Locator',
    description: 'GPS tracking, video telematics, and IoT for fleets across every UAE industry.',
    url: '/industries',
    type: 'website',
  },
}

export default function IndustriesPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <IndustriesHero />
      <IndustriesGrid />
      <Footer />
    </main>
  )
}
