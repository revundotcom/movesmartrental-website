import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { PropertyCardBlock } from '@/components/blocks/property-card-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PortableTextBody } from '@/components/portable-text'
import { sanityFetch } from '@/sanity/fetch'
import { generatePageMetadata } from '@/lib/metadata'
import {
  PROPERTY_CATEGORY_QUERY,
  PROPERTY_CATEGORY_PARAMS_QUERY,
} from '@/sanity/queries/property-category'
import type { PropertyCardData } from '@/types/blocks'
import type { SeoFields } from '@/types/sanity'
import type { PortableTextBlock } from '@portabletext/types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CategoryData {
  _id: string
  title: string
  slug: { current: string }
  propertyType: string
  description?: PortableTextBlock[]
  averageRent?: number
  city: {
    _id: string
    title: string
    slug: { current: string }
    tier: number
    population?: number
    medianRent?: number
  }
  province: {
    _id: string
    title: string
    slug: { current: string }
    country: string
    abbreviation?: string
  }
  listings: PropertyCardData[]
  seo?: SeoFields
}

// ---------------------------------------------------------------------------
// Static Params + Dynamic
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const params = await sanityFetch<
    Array<{ propertyType: string; citySlug: string; provinceSlug: string }>
  >({
    query: PROPERTY_CATEGORY_PARAMS_QUERY,
    tags: ['propertyCategory'],
  })

  return (params ?? []).map((p) => ({
    province: p.provinceSlug,
    city: p.citySlug,
    service: p.propertyType,
  }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}): Promise<Metadata> {
  const { province, city, service } = await params

  const data = await sanityFetch<CategoryData | null>({
    query: PROPERTY_CATEGORY_QUERY,
    params: { citySlug: city, propertyType: service },
    tags: ['propertyCategory'],
  })

  if (!data) {
    return {}
  }

  const cityTitle = data.city.title
  const propertyTypeLabel = data.title || service.replace(/-/g, ' ')

  return generatePageMetadata({
    seo: data.seo,
    path: `/ca/${province}/${city}/${service}`,
    fallbackTitle: `${propertyTypeLabel} for Rent in ${cityTitle}`,
    fallbackDescription: `Browse available ${propertyTypeLabel.toLowerCase()} listings for rent in ${cityTitle}. Verified properties with transparent pricing and online applications.`,
  })
}

// ---------------------------------------------------------------------------
// Bedroom filter link config
// ---------------------------------------------------------------------------

const BEDROOM_OPTIONS = [
  { label: '1 Bedroom', slug: '1-bedroom' },
  { label: '2 Bedroom', slug: '2-bedroom' },
  { label: '3+ Bedroom', slug: '3-bedroom' },
]

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function PropertyCategoryPage({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}) {
  const { province, city, service } = await params

  const data = await sanityFetch<CategoryData | null>({
    query: PROPERTY_CATEGORY_QUERY,
    params: { citySlug: city, propertyType: service },
    tags: ['propertyCategory', 'propertyListing'],
  })

  if (!data) {
    notFound()
  }

  const cityTitle = data.city.title
  const provinceTitle = data.province.title
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
          ]}
        />
      </div>

      {/* Hero */}
      <HeroBlock
        headline={`${propertyTypeLabel} for Rent in ${cityTitle}`}
        subheadline={
          listings.length > 0
            ? `${listings.length} verified listing${listings.length === 1 ? '' : 's'} available`
            : `Browse ${propertyTypeLabel.toLowerCase()} rentals in ${cityTitle}`
        }
      />

      {/* Category Description */}
      {data.description && (
        <section className="mx-auto max-w-4xl px-4 py-8">
          <PortableTextBody value={data.description} />
        </section>
      )}

      {/* Bedroom Filter Links */}
      {listings.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="mb-4 text-xl font-semibold">Filter by Bedrooms</h2>
          <div className="flex flex-wrap gap-3">
            {BEDROOM_OPTIONS.map((option) => (
              <Link
                key={option.slug}
                href={`/ca/${province}/${city}/${service}/${option.slug}/`}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {option.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Listings - Server-rendered HTML (TEN-05) */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">
          Available {propertyTypeLabel} in {cityTitle}
        </h2>
        {listings.length > 0 ? (
          <PropertyCardBlock listings={listings} />
        ) : (
          <p className="text-muted-foreground">
            No {propertyTypeLabel.toLowerCase()} listings are currently
            available in {cityTitle}. Check back soon or browse other property
            types.
          </p>
        )}
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline="Find Your Next Rental"
        description={`Looking for the perfect ${propertyTypeLabel.toLowerCase()} in ${cityTitle}? Browse all available listings and apply online.`}
        primaryCta={{ label: 'Browse All Cities', href: '/locations/' }}
      />
    </main>
  )
}
