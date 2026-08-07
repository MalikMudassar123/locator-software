import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import GpsTrackingHero from '@/components/service/gps-tracking-system/GpsTrackingHero'
import LogoMarquee from '@/components/Logomarquee'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { LOCATOR_TESTIMONIALS } from '@/components/service/serviceTestimonials'
import GpsTrackingLaptop from '@/components/service/gps-tracking-system/GpsTrackingLaptop'
import GpsTrackingWhy from '@/components/service/gps-tracking-system/GpsTrackingWhy'
import ServiceAppScreens from '@/components/service/ServiceAppScreens'
import ServiceVideo from '@/components/service/ServiceVideo'
import ServiceUseCases from '@/components/service/ServiceUseCases'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'GPS Tracking System for Vehicles | UAE — Locator',
  description:
    'Our GPS tracker software makes your life easier when it comes to managing your vehicles and team — live tracking, alerts, geofencing, and detailed reports across the UAE.',
  alternates: { canonical: '/service/gps-tracking-system' },
  openGraph: {
    title: 'GPS Tracking System for Vehicles | UAE — Locator',
    description:
      'Live tracking, alerts, geofencing, and detailed reports for every vehicle in your fleet — powered by LOCATOR.',
    url: '/service/gps-tracking-system',
    type: 'website',
  },
}

export default function GpsTrackingSystemPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <GpsTrackingHero />
      <LogoMarquee />
      <TestimonialCarousel
        testimonials={LOCATOR_TESTIMONIALS}
        heading="What Our Clients Say"
        subheading="Real feedback from UAE businesses using the LOCATOR GPS tracking system for vehicles and fleets."
      />
      <GpsTrackingLaptop />
      <GpsTrackingWhy />
      <ServiceAppScreens
        eyebrow="The App In Action"
        heading="See screenshots of our GPS tracking system for vehicles in UAE"
        lead="From these screenshots, you can see that LOCATOR is highly customizable. It has been developed to meet the varying needs of individuals and businesses."
      />
      <ServiceVideo />
      <ServiceUseCases />
      <SoftwareBlog />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
