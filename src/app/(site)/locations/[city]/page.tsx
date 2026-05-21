import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SiloPageTemplate } from '@/components/blocks/silo-page-template'
import {
  getSiloLocation,
  SILO_LOCATIONS,
  SILO_LOCATION_SLUGS,
} from '@/data/silo-locations'

export async function generateStaticParams() {
  return SILO_LOCATION_SLUGS.map((city) => ({ city }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const location = getSiloLocation(city)
  if (!location) return { title: 'Location not found' }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: { canonical: `/locations/${location.slug}/` },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `https://movesmartrentals.com/locations/${location.slug}/`,
      images: ['/og-default.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: location.metaTitle,
      description: location.metaDescription,
    },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const location = getSiloLocation(city)
  if (!location) notFound()

  const related = SILO_LOCATIONS.filter(
    (l) => l.slug !== location.slug && l.country === location.country,
  )
    .slice(0, 3)
    .map((l) => ({
      title: l.city + ', ' + l.region,
      href: `/locations/${l.slug}/`,
      description: l.navDescription,
    }))

  return (
    <SiloPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations/' },
        {
          label: location.city,
          href: `/locations/${location.slug}/`,
        },
      ]}
      heroKicker={location.heroKicker}
      heroEyebrow={location.heroEyebrow}
      heroHeadline={location.heroHeadline}
      heroLede={location.heroLede}
      intro={location.intro}
      marketData={[
        { label: 'Avg 1 bed', value: location.marketData.avgRent1Bed },
        { label: 'Avg 2 bed', value: location.marketData.avgRent2Bed },
        { label: 'Vacancy', value: location.marketData.vacancyRate },
        { label: 'YoY rent', value: location.marketData.yoyRentChange },
        { label: 'Days on market', value: location.marketData.avgDaysOnMarket },
        { label: 'Region', value: location.region },
      ]}
      neighborhoods={location.neighborhoods}
      sections={[
        {
          title: 'Why landlords use us in ' + location.city,
          items: location.whyHere.map((w) => ({
            title: w.title,
            body: w.body,
          })),
        },
        {
          title: 'Current market trend',
          body: location.marketData.keyTrend,
        },
      ]}
      process={location.process}
      faq={location.faq}
      closing={location.closing}
      related={related}
    />
  )
}
