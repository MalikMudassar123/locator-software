import type { Metadata } from 'next'
import ScrollReveal from '@/components/software/ScrollReveal'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'
import BlogListing from '@/components/about/newsroom/blog/BlogListing'
import NewsroomSubscribe from '@/components/about/newsroom/NewsroomSubscribe'
import AboutPillarNav from '@/components/about/AboutPillarNav'
import Footer from '@/components/layouts/Footer'
import { BLOG_POSTS, blogHref } from '@/components/about/newsroom/blog/blog-index'
import { siteConfig, siteUrl } from '@/config/site'

const TITLE = 'Locator Blog | Your UAE Guide to Fleet Tracking & GPS Solutions'
const DESCRIPTION =
  'Expert advice and fleet management strategies from LOCATOR. Guides on GPS tracking, fleet software, driver behaviour and ASATEEL compliance for UAE businesses.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'UAE fleet tracking',
    'GPS tracking solutions',
    'fleet management UAE',
    'vehicle tracking systems',
    'Locator blog',
    'GPS technology for business',
  ],
  alternates: { canonical: '/about/newsroom/blog' },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: '/about/newsroom/blog',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: BLOG_POSTS[0].hero.src }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [BLOG_POSTS[0].hero.src],
  },
}

export default function BlogIndexPage() {
  const url = `${siteUrl}/about/newsroom/blog`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        name: 'LOCATOR Blog',
        description: DESCRIPTION,
        url,
        inLanguage: 'en-AE',
        publisher: { '@type': 'Organization', name: siteConfig.name, url: siteUrl },
        blogPost: BLOG_POSTS.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          image: `${siteUrl}${p.hero.src}`,
          url: `${siteUrl}${blogHref(p.slug)}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Newsroom', item: `${siteUrl}/about/newsroom` },
          { '@type': 'ListItem', position: 3, name: 'Blog', item: url },
        ],
      },
    ],
  }

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'clip' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollReveal />
      <SoftwareNavbar />
      <BlogListing />
      <NewsroomSubscribe />
      <AboutPillarNav current="newsroom" />
      <Footer />
    </main>
  )
}
