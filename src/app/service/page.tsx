import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ServiceHero from '@/components/service/ServiceHero'
import BenefitsSection from '@/components/software/BenefitsSection'
import ServiceIndustries from '@/components/service/ServiceIndustries'
import ServiceProcess from '@/components/service/ServiceProcess'
import AnimatedGlobeHero from '@/components/AnimatedGlobeHero'
import DashcamShowcase from '@/components/software/DashcamShowcase'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import ScrollReveal from '@/components/software/ScrollReveal'
import Footer from '@/components/layouts/Footer'

const ServiceFAQ = dynamic(() => import('@/components/service/ServiceFAQ'))

// Numbers section — same animated globe used on the landing page.
const SERVICE_STATS = [
  { value: '10+',    label: 'Years of fleet expertise',  side: 'left',  row: 'top'    },
  { value: '5,000+', label: 'Vehicles tracked daily',    side: 'left',  row: 'bottom' },
  { value: '500+',   label: 'UAE businesses served',     side: 'right', row: 'top'    },
  { value: '99.9%',  label: 'Tracking network uptime',   side: 'right', row: 'bottom' },
]

export const metadata: Metadata = {
  title: 'Service — GPS Tracking & Fleet Telematics',
  description:
    'Improve fleet operations with real-time GPS tracking and telematics. Manage drivers, routes, and road operations with ease across all UAE industries.',
}

export default function ServicePage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <ServiceHero />
      <BenefitsSection />
      <ServiceIndustries />
      <ServiceProcess />
      <AnimatedGlobeHero stats={SERVICE_STATS} />
      <DashcamShowcase />
      <SoftwareBlog />
      <ServiceFAQ />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
