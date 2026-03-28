import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { PropertyCardBlock } from '@/components/blocks/property-card-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { sanityFetch } from '@/sanity/fetch'
import { generatePageMetadata } from '@/lib/metadata'
import { BEDROOM_COUNT_QUERY } from '@/sanity/queries/property-category'
import type { PropertyCardData } from '@/types/blocks'
import type { SeoFields } from '@/types/sanity'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BedroomCategoryData {
  _id: string
  title: string
  slug: { current: string }
  propertyType: string
  city: {
    _id: string
    title: string
    slug: { current: string }
  }
  province: {
    _id: string
    title: string
    slug: { current: string }
  }
  listings: PropertyCardData[]
  seo?: SeoFields
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse bedroom count from slug: "1-bedroom" -> 1, "2-bedroom" -> 2, "3-bedroom" -> 3
 */
function parseBedroomCount(slug: string): number | null {
  const match = slug.match(/^(\d+)-bedroom$/)
  if (!match) return null
  return parseInt(match[1], 10)
}

/**
 * Format bedroom label: 1 -> "1 Bedroom", 3 -> "3+ Bedroom"
 */
function formatBedroomLabel(count: number): string {
  if (count >= 3) return `${count}+ Bedroom`
  return `${count} Bedroom`
}

// ---------------------------------------------------------------------------
// Dynamic Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

// No generateStaticParams -- bedroom pages are on-demand only

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    province: string
    city: string
    service: string
    bedroom: string
  }>
}): Promise<Metadata> {
  const { province, city, service, bedroom } = await params
  const bedroomCount = parseBedroomCount(bedroom)

  if (!bedroomCount) return {}

  const data = await sanityFetch<BedroomCategoryData | null>({
    query: BEDROOM_COUNT_QUERY,
    params: { citySlug: city, propertyType: service, bedrooms: bedroomCount },
    tags: ['propertyCategory'],
  })

  if (!data) return {}

  const cityTitle = data.city.title
  const bedroomLabel = formatBedroomLabel(bedroomCount)
  const propertyTypeLabel = data.title || service.replace(/-/g, ' ')

  return generatePageMetadata({
    seo: data.seo,
    path: `/ca/${province}/${city}/${service}/${bedroom}`,
    fallbackTitle: `${bedroomLabel} ${propertyTypeLabel} in ${cityTitle}`,
    fallbackDescription: `Browse ${bedroomLabel.toLowerCase()} ${propertyTypeLabel.toLowerCase()} for rent in ${cityTitle}. Verified listings with online applications.`,
  })
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BedroomPage({
  params,
}: {
  params: Promise<{
    province: string
    city: string
    service: string
    bedroom: string
  }>
}) {
  const { province, city, service, bedroom } = await params
  const bedroomCount = parseBedroomCount(bedroom)

  if (!bedroomCount) {
    notFound()
  }

  const data = await sanityFetch<BedroomCategoryData | null>({
    query: BEDROOM_COUNT_QUERY,
    params: { citySlug: city, propertyType: service, bedrooms: bedroomCount },
    tags: ['propertyCategory', 'propertyListing'],
  })

  if (!data) {
    notFound()
  }

  const cityTitle = data.city.title
  const provinceTitle = data.province.title
  const bedroomLabel = formatBedroomLabel(bedroomCount)
  const propertyTypeLabel = data.title || service.replace(/-/g, ' ')
  const listings = data.listings ?? []

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: provinceTitle, href: `/ca/${province}/` },
            { label: cityTitle, href: `/ca/${province}/${city}/` },
            {
              label: propertyTypeLabel,
              href: `/ca/${province}/${city}/${service}/`,
            },
            {
              label: bedroomLabel,
              href: `/ca/${province}/${city}/${service}/${bedroom}/`,
            },
          ]}
        />
      </div>

      {/* Hero */}
      <HeroBlock
        headline={`${bedroomLabel} ${propertyTypeLabel} in ${cityTitle}`}
        subheadline={
          listings.length > 0
            ? `${listings.length} listing${listings.length === 1 ? '' : 's'} found`
            : `No ${bedroomLabel.toLowerCase()} listings currently available`
        }
      />

      {/* Listings - Server-rendered HTML (TEN-05) */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">
          {bedroomLabel} {propertyTypeLabel} for Rent in {cityTitle}
        </h2>
        {listings.length > 0 ? (
          <PropertyCardBlock listings={listings} />
        ) : (
          <p className="text-muted-foreground">
            No {bedroomLabel.toLowerCase()} {propertyTypeLabel.toLowerCase()}{' '}
            listings are currently available in {cityTitle}. Try browsing all{' '}
            {propertyTypeLabel.toLowerCase()} or check back soon.
          </p>
        )}
      </section>

      {/* Back to category link */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <Link
          href={`/ca/${province}/${city}/${service}/`}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          View all {propertyTypeLabel.toLowerCase()} in {cityTitle}
        </Link>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline="Find Your Perfect Rental"
        description={`Browse all available rentals in ${cityTitle} and apply online today.`}
        primaryCta={{ label: 'Browse All Listings', href: `/ca/${province}/${city}/` }}
      />
    </main>
  )
}
