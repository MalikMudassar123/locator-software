import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import TrackingDevicesHero from '@/components/service/tracking-devices/TrackingDevicesHero'
import DeviceCarousel from '@/components/service/tracking-devices/DeviceCarousel'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Tracking Devices & Accessories — Service',
  description:
    'GPS trackers, driver-ID readers, fuel and temperature sensors, and CAN adapters supplied, installed, and configured by Locator across the UAE.',
  alternates: { canonical: '/service/tracking-devices' },
  openGraph: {
    title: 'Tracking Devices & Accessories | Locator',
    description:
      'Certified Teltonika GPS terminals, iButton and RFID driver ID, fuel and temperature sensors — all feeding the LOCATOR platform.',
    url: '/service/tracking-devices',
    type: 'website',
  },
}

export default function TrackingDevicesPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <TrackingDevicesHero />
      <DeviceCarousel />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
