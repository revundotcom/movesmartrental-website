import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SiloPageTemplate } from '@/components/blocks/silo-page-template'
import { getSiloService, SILO_SERVICES } from '@/data/silo-services'

export function buildServiceMetadata(slug: string): Metadata {
  const service = getSiloService(slug)
  if (!service) return { title: 'Service not found' }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://movesmartrentals.com/services/${service.slug}/`,
      images: ['/og-default.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
  }
}

function getRelatedServices(currentSlug: string) {
  return SILO_SERVICES.filter((s) => s.slug !== currentSlug)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/services/${s.slug}/`,
      description: s.navDescription,
    }))
}

export function SiloServicePage({ slug }: { slug: string }) {
  const service = getSiloService(slug)
  if (!service) notFound()

  return (
    <SiloPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services/' },
        { label: service.title, href: `/services/${service.slug}/` },
      ]}
      heroKicker={service.heroKicker}
      heroEyebrow={service.heroEyebrow}
      heroHeadline={service.heroHeadline}
      heroLede={service.heroLede}
      intro={service.intro}
      process={service.process}
      included={service.included}
      notIncluded={service.notIncluded}
      audience={service.audience}
      faq={service.faq}
      closing={service.closing}
      related={getRelatedServices(service.slug)}
    />
  )
}
