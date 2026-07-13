import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import ServicePillarHero from '@/components/service/ServicePillarHero'
import ServiceComingSoon from '@/components/service/ServiceComingSoon'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Task Manager — Service',
  description: 'Field team task and job scheduling from Locator — coming soon.',
  alternates: { canonical: '/service/task-manager' },
}

export default function TaskManagerPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <ServicePillarHero
        slug="task-manager"
        title="Task Manager"
        lead="Assign, track, and complete field jobs in real time — keeping your team and your customers in sync."
      />
      <ServiceComingSoon accent="#13923f" />
      <Footer />
    </main>
  )
}
