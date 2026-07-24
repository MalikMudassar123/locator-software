import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import ScrollReveal from '@/components/software/ScrollReveal'
import IndustryHero from '@/components/industries/IndustryHero'
import IndustryBlocks from '@/components/industries/IndustryBlocks'
import ServiceWhyChoose from '@/components/service/ServiceWhyChoose'
import ServiceVideo from '@/components/service/ServiceVideo'
import SoftwareBlog from '@/components/software/SoftwareBlog'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'
import { INDUSTRIES, getIndustry } from '@/components/industries/industries-data'

// Same trailing sections as the rest of the site (Why Locator, Videos, Blogs,
// FAQ, Footer) — generic and shared, not duplicated per industry.
const ServiceFAQ = dynamic(() => import('@/components/service/ServiceFAQ'))

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}

  return {
    title: `${industry.name} — Industries`,
    description: industry.lead,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: `${industry.name} | Locator`,
      description: industry.lead,
      url: `/industries/${industry.slug}`,
      type: 'website',
    },
  }
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <IndustryHero industry={industry} />
      <IndustryBlocks industry={industry} />
      <ServiceWhyChoose />
      <ServiceVideo />
      <SoftwareBlog />
      <ServiceFAQ />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
