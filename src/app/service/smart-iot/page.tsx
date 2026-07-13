import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import ServicePillarHero from '@/components/service/ServicePillarHero'
import ServiceComingSoon from '@/components/service/ServiceComingSoon'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Smart IoT & Asset Intelligence Solutions — Service',
  description: 'Connected IoT sensors and asset intelligence solutions from Locator — coming soon.',
  alternates: { canonical: '/service/smart-iot' },
}

export default function SmartIotPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <ServicePillarHero
        slug="smart-iot"
        title="Smart IoT & Asset Intelligence Solutions"
        lead="Connected sensors and intelligence for the assets that keep your business running — beyond the vehicle."
      />
      <ServiceComingSoon accent="#7c3aed" />
      <Footer />
    </main>
  )
}
