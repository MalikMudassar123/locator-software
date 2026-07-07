import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import SecurepathPremiumHero from '@/components/regulatory/securepath-premium/SecurepathPremiumHero'
import SecurepathPremiumExplainer from '@/components/regulatory/securepath-premium/SecurepathPremiumExplainer'
import SecurepathPremiumImportance from '@/components/regulatory/securepath-premium/SecurepathPremiumImportance'
import SecurepathPremiumVehicleList from '@/components/regulatory/securepath-premium/SecurepathPremiumVehicleList'
import SecurepathPremiumCertification from '@/components/regulatory/securepath-premium/SecurepathPremiumCertification'
import SecurepathPremiumDevice from '@/components/regulatory/securepath-premium/SecurepathPremiumDevice'
import SecurepathPremiumFAQ from '@/components/regulatory/securepath-premium/SecurepathPremiumFAQ'
import SecurepathPremiumCTA from '@/components/regulatory/securepath-premium/SecurepathPremiumCTA'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'SecurePath Premium — Regulatory GPS Certification',
  description:
    'SecurePath Premium — the mandatory SIRA-approved GPS tracking certification for selected Dubai businesses, fully managed by LOCATOR.',
  alternates: { canonical: '/securepath-premium' },
  openGraph: {
    title: 'SecurePath Premium GPS Certification | Locator',
    description:
      'SIRA-approved SecurePath Premium certification for selected Dubai businesses — approved devices, certified installation, and full compliance support.',
    url: '/securepath-premium',
    type: 'website',
  },
}

export default function SecurepathPremiumPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <SecurepathPremiumHero />
      <SecurepathPremiumExplainer />
      <SecurepathPremiumImportance />
      <SecurepathPremiumVehicleList />
      <SecurepathPremiumCertification />
      <SecurepathPremiumDevice />
      <SecurepathPremiumFAQ />
      <SecurepathPremiumCTA />
      <SoftwareBlog />
      <Footer />
    </main>
  )
}
