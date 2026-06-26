import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SiloPageTemplate } from '@/components/blocks/silo-page-template'
import { getSiloResource, SILO_RESOURCES } from '@/data/silo-resources'

export function buildResourceMetadata(slug: string): Metadata {
  const resource = getSiloResource(slug)
  if (!resource) return { title: 'Resource not found' }
  return {
    title: resource.metaTitle,
    description: resource.metaDescription,
    alternates: { canonical: `/resources/${resource.slug}/` },
    openGraph: {
      title: resource.metaTitle,
      description: resource.metaDescription,
      url: `https://movesmartrentals.com/resources/${resource.slug}/`,
      images: ['/og-default.png?v=3'],
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.metaTitle,
      description: resource.metaDescription,
    },
  }
}

export function SiloResourcePage({ slug }: { slug: string }) {
  const resource = getSiloResource(slug)
  if (!resource) notFound()

  const related = SILO_RESOURCES.filter((r) => r.slug !== resource.slug)
    .slice(0, 3)
    .map((r) => ({
      title: r.title,
      href: `/resources/${r.slug}/`,
      description: r.navDescription,
    }))

  return (
    <SiloPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Resources', href: '/resources/' },
        { label: resource.title, href: `/resources/${resource.slug}/` },
      ]}
      heroKicker={resource.heroKicker}
      heroEyebrow={resource.heroEyebrow}
      heroHeadline={resource.heroHeadline}
      heroLede={resource.heroLede}
      intro={resource.intro}
      sections={resource.sections.map((s) => ({
        title: s.title,
        body: s.body,
      }))}
      items={resource.items}
      faq={resource.faq}
      closing={resource.closing}
      related={related}
      primaryCta={{ label: 'Subscribe for updates', href: '/contact/?type=newsletter' }}
      secondaryCta={{ label: 'Book a consultation', href: '/contact/?type=owner' }}
    />
  )
}
