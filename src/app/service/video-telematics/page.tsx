import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import VideoTelematicsHero from '@/components/service/video-telematics/VideoTelematicsHero'
import VideoTelematicsDescription from '@/components/service/video-telematics/VideoTelematicsDescription'
import VideoTelematicsAlertsScroll from '@/components/service/video-telematics/VideoTelematicsAlertsScroll'
import VideoTelematicsShowcase from '@/components/service/video-telematics/VideoTelematicsShowcase'
import VideoTelematicsIndustries from '@/components/service/video-telematics/VideoTelematicsIndustries'
import VideoTelematicsFAQ from '@/components/service/video-telematics/VideoTelematicsFAQ'
import VideoTelematicsVideo from '@/components/service/video-telematics/VideoTelematicsVideo'
import VideoTelematicsBlog from '@/components/service/video-telematics/VideoTelematicsBlog'
import SoftwareCTA from '@/components/software/SoftwareCTA'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Video Telematics — AI Dash Cameras & MDVR | Service',
  description:
    'AI-powered fleet dash cameras and MDVR safety systems — real-time driver monitoring, cargo surveillance, and multi-camera recording for trucks, taxis, buses, and commercial fleets.',
  alternates: { canonical: '/service/video-telematics' },
  openGraph: {
    title: 'Video Telematics | Locator',
    description:
      'AI-powered dash cameras and MDVR recording for commercial fleets — collision prevention, driver monitoring, and cost savings.',
    url: '/service/video-telematics',
    type: 'website',
  },
}

export default function VideoTelematicsPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ScrollReveal />
      <VideoTelematicsHero />
      <VideoTelematicsDescription />
      <VideoTelematicsAlertsScroll />
      <VideoTelematicsShowcase />
      <VideoTelematicsIndustries />
      <VideoTelematicsVideo />
      <VideoTelematicsFAQ />
      <VideoTelematicsBlog />
      <SoftwareCTA />
      <Footer />
    </main>
  )
}
