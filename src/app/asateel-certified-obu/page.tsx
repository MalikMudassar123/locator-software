import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import AsateelHero from '@/components/regulatory/asateel/AsateelHero'
import AsateelExplainer from '@/components/regulatory/asateel/AsateelExplainer'
import AsateelInstallation from '@/components/regulatory/asateel/AsateelInstallation'
import AsateelSteps from '@/components/regulatory/asateel/AsateelSteps'
import AsateelStats from '@/components/regulatory/asateel/AsateelStats'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import AsateelFAQ from '@/components/regulatory/asateel/AsateelFAQ'
import AsateelCTA from '@/components/regulatory/asateel/AsateelCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'ASATEEL Certified OBU — Regulatory GPS Certification',
  description:
    'Get your commercial fleet ASATEEL-certified with a fully managed on-board unit (OBU) installation service — approved by Abu Dhabi\'s ITC, with real-time compliance reporting.',
  alternates: { canonical: '/asateel-certified-obu' },
  openGraph: {
    title: 'ASATEEL Certified OBU Installation | Locator',
    description:
      'ITC-approved ASATEEL OBU installation for Abu Dhabi commercial fleets — enrollment, certified installation, and compliance reporting.',
    url: '/asateel-certified-obu',
    type: 'website',
  },
}

export default function AsateelCertifiedObuPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <AsateelHero />
      <AsateelExplainer />
      <AsateelInstallation />
      <AsateelSteps />
      <AsateelStats />
      <SoftwareBlog />
      <AsateelFAQ />
      <AsateelCTA />
      <Footer />
    </main>
  )
}
