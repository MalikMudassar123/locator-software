import type { Metadata } from 'next'
import DemoHero from '@/components/demo/DemoHero'
import DemoSteps from '@/components/demo/DemoSteps'
import DemoBooking from '@/components/demo/DemoBooking'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Get a Free Demo — Fleet Telematics & GPS Tracking UAE',
  description:
    'Book a free, personalized demo of LOCATOR fleet telematics, GPS tracking, video telematics, and IoT solutions. Pick a date and time that works for you — no obligation.',
  alternates: { canonical: '/get-a-free-demo' },
  openGraph: {
    title: 'Get a Free Demo | Locator',
    description:
      'Tell us about your fleet and schedule a live demo tailored to your operation — installation at your location and full support.',
    url: '/get-a-free-demo',
    type: 'website',
  },
}

export default function GetAFreeDemoPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <DemoHero />
      <DemoSteps />
      <DemoBooking />
      <Footer />
    </main>
  )
}
