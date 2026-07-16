import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import SmartIotHero from '@/components/service/smart-iot/SmartIotHero'
import SmartIotShowcase from '@/components/service/smart-iot/SmartIotShowcase'
import SmartIotFeatures from '@/components/service/smart-iot/SmartIotFeatures'
import SmartIotFAQ from '@/components/service/smart-iot/SmartIotFAQ'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Smart IoT & GPS Asset Tracking Solutions UAE — Service',
  description:
    'Real-time visibility for road teams, machines, and business assets. GPS asset tracking, heavy machinery monitoring, and custom IoT sensor & telemetry projects across the UAE.',
  alternates: { canonical: '/service/smart-iot' },
  openGraph: {
    title: 'Smart IoT & Asset Intelligence | Locator',
    description:
      'GPS asset tracking, industrial telematics, and IoT sensor projects — unified in one connected LOCATOR dashboard.',
    url: '/service/smart-iot',
    type: 'website',
  },
}

export default function SmartIotPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <SmartIotHero />
      <SmartIotShowcase />
      <SmartIotFeatures />
      <SmartIotFAQ />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
