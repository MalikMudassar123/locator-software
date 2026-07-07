import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import SecurepathHero from '@/components/regulatory/securepath/SecurepathHero'
import SecurepathExplainer from '@/components/regulatory/securepath/SecurepathExplainer'
import SecurepathFeatures from '@/components/regulatory/securepath/SecurepathFeatures'
import SecurepathBenefits from '@/components/regulatory/securepath/SecurepathBenefits'
import SecurepathUseCases from '@/components/regulatory/securepath/SecurepathUseCases'
import SecurepathProcess from '@/components/regulatory/securepath/SecurepathProcess'
import SecurepathFAQ from '@/components/regulatory/securepath/SecurepathFAQ'
import SecurepathCTA from '@/components/regulatory/securepath/SecurepathCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'SecurePath — Regulatory GPS Certification',
  description:
    'SecurePath GPS tracking from LOCATOR — SIRA & RTA compliant registration, installation, and monitoring for Dubai car rental and security-related vehicles.',
  alternates: { canonical: '/securepath' },
  openGraph: {
    title: 'SecurePath GPS Certification | Locator',
    description:
      'SIRA & RTA compliant SecurePath registration for Dubai rental vehicles — approved installation, certification, and real-time monitoring.',
    url: '/securepath',
    type: 'website',
  },
}

export default function SecurepathPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <SecurepathHero />
      <SecurepathExplainer />
      <SecurepathFeatures />
      <SecurepathBenefits />
      <SecurepathUseCases />
      <SecurepathProcess />
      <SecurepathFAQ />
      <SecurepathCTA />
      <Footer />
    </main>
  )
}
