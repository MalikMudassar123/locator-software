import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import ServicePillarHero from '@/components/service/ServicePillarHero'
import ServiceComingSoon from '@/components/service/ServiceComingSoon'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Tracking Devices & Accessories — Service',
  description: 'GPS trackers, OBUs, and fleet hardware accessories from Locator — coming soon.',
  alternates: { canonical: '/service/tracking-devices' },
}

export default function TrackingDevicesPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <ServicePillarHero
        slug="tracking-devices"
        title="Tracking Devices & Accessories"
        lead="The hardware behind every Locator install — GPS trackers, OBUs, dash cameras, and fleet accessories."
      />
      <ServiceComingSoon accent="#c2740a" />
      <Footer />
    </main>
  )
}
