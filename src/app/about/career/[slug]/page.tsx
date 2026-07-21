import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ScrollReveal from '@/components/software/ScrollReveal'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'
import JobDetail from '@/components/about/career/JobDetail'
import Footer from '@/components/layouts/Footer'
import { JOBS, getJob } from '@/components/about/career/jobs-data'

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) return {}

  return {
    title: `${job.title} — Careers`,
    description: job.intro,
    alternates: { canonical: `/about/career/${job.slug}` },
    openGraph: {
      title: `${job.title} | Locator Careers`,
      description: job.intro,
      url: `/about/career/${job.slug}`,
      type: 'website',
    },
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) notFound()

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <SoftwareNavbar />
      <JobDetail job={job} />
      <Footer />
    </main>
  )
}
