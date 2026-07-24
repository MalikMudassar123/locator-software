import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import ServicePillarHero from '@/components/service/ServicePillarHero'
import ServiceTaskManager from '@/components/service/ServiceTaskManager'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Task Manager — Service',
  description:
    'Assign, track, and complete field jobs in real time with Locator Task Manager — dispatch jobs, collect field data, and sync with your CRM/ERP.',
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
      <ServiceTaskManager />
      <Footer />
    </main>
  )
}
