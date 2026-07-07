import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import ShahinHero from '@/components/regulatory/shahin/ShahinHero'
import ShahinExplainer from '@/components/regulatory/shahin/ShahinExplainer'
import ShahinBenefits from '@/components/regulatory/shahin/ShahinBenefits'
import ShahinSteps from '@/components/regulatory/shahin/ShahinSteps'
import ShahinCrossSell from '@/components/regulatory/shahin/ShahinCrossSell'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import ShahinFAQ from '@/components/regulatory/shahin/ShahinFAQ'
import ShahinCTA from '@/components/regulatory/shahin/ShahinCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'SHAHIN — Regulatory GPS Certification',
  description:
    'Get your fleet SHAHIN-certified with a fully managed, SIRA-compliant GPS tracking solution — registration, installation, and real-time compliance reporting.',
  alternates: { canonical: '/shahin' },
  openGraph: {
    title: 'SHAHIN — Regulatory GPS Certification | Locator',
    description:
      'SIRA-compliant SHAHIN GPS certification for Dubai cargo fleets — fully managed registration, installation, and compliance reporting.',
    url: '/shahin',
    type: 'website',
  },
}

export default function ShahinPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <ShahinHero />
      <ShahinExplainer />
      <ShahinBenefits />
      <ShahinSteps />
      <ShahinCrossSell />
      <SoftwareBlog />
      <ShahinFAQ />
      <ShahinCTA />
      <Footer />
    </main>
  )
}
