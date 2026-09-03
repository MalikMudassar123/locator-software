import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import CarGpsHero from '@/components/service/car-gps-tracker/CarGpsHero'
import CarGpsOffers from '@/components/service/car-gps-tracker/CarGpsOffers'
import CarGpsAbout from '@/components/service/car-gps-tracker/CarGpsAbout'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { LOCATOR_TESTIMONIALS } from '@/components/service/serviceTestimonials'
import ServiceVideo from '@/components/service/ServiceVideo'
import ServiceUseCases from '@/components/service/ServiceUseCases'
import DeviceCarousel from '@/components/service/tracking-devices/DeviceCarousel'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Car GPS Tracker — Service',
  description:
    'The best car GPS tracker for maximum visibility — fuel management, real-time location, and customizable alerts for every vehicle in your fleet across the UAE.',
  alternates: { canonical: '/service/car-gps-tracker' },
  openGraph: {
    title: 'Car GPS Tracker | Locator',
    description:
      'A perfect solution to monitor your vehicles — live location, fuel management, and smart alerts from LOCATOR.',
    url: '/service/car-gps-tracker',
    type: 'website',
  },
}

export default function CarGpsTrackerPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <CarGpsHero />
      <CarGpsOffers />
      <CarGpsAbout />
      <TestimonialCarousel
        testimonials={LOCATOR_TESTIMONIALS}
        heading="What Our Clients Say"
        subheading="Real feedback from UAE businesses using the LOCATOR car GPS tracker for vehicles and fleets."
      />
      <ServiceVideo />
      <ServiceUseCases />
      <DeviceCarousel />
      <SoftwareBlog tag="Car Tracking" />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
