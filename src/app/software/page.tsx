import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import SoftwareHero from '@/components/software/SoftwareHero'
import BenefitsSection from '@/components/software/BenefitsSection'
import ModulesSection from '@/components/software/ModulesSection'
import DashcamShowcase from '@/components/software/DashcamShowcase'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

const SoftwareFAQ = dynamic(() => import('@/components/software/SoftwareFAQ'))

export const metadata: Metadata = {
  title: 'Software — Fleet Telematics Platform',
  description:
    'One platform for complete fleet visibility. GPS tracking, telematics, tasks, expenses, inspections, maintenance and AI dashcams for your whole fleet.',
}

export default function SoftwarePage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <SoftwareHero />
      <BenefitsSection />
      <ModulesSection />
      <DashcamShowcase />
      <SoftwareBlog />
      <SoftwareFAQ />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
