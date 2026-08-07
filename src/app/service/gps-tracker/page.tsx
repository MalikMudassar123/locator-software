import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import GpsTrackerHero from '@/components/service/gps-tracker/GpsTrackerHero'
import GpsTrackerData from '@/components/service/gps-tracker/GpsTrackerData'
import GpsTrackerWhy from '@/components/service/gps-tracker/GpsTrackerWhy'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { LOCATOR_TESTIMONIALS } from '@/components/service/serviceTestimonials'
import ServiceAppScreens from '@/components/service/ServiceAppScreens'
import ServiceUseCases from '@/components/service/ServiceUseCases'
import ServiceVideo from '@/components/service/ServiceVideo'
import DeviceCarousel from '@/components/service/tracking-devices/DeviceCarousel'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'GPS Tracker — Service',
  description:
    'The complete GPS tracker device for vehicles and fleets in the UAE — certified Teltonika hardware, professional installation, and real-time reporting on the LOCATOR platform.',
  alternates: { canonical: '/service/gps-tracker' },
  openGraph: {
    title: 'GPS Tracker | Locator',
    description:
      'Certified GPS tracker devices, installed and monitored by Locator across the UAE.',
    url: '/service/gps-tracker',
    type: 'website',
  },
}

export default function GpsTrackerPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <GpsTrackerHero />
      <GpsTrackerData />
      <GpsTrackerWhy />
      <TestimonialCarousel
        testimonials={LOCATOR_TESTIMONIALS}
        heading="What Our Clients Say"
        subheading="Real feedback from UAE businesses using the LOCATOR GPS tracker for vehicles, fleets, and assets."
      />
      <ServiceAppScreens />
      <ServiceUseCases />
      <ServiceVideo />
      <DeviceCarousel />
      <SoftwareBlog />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
