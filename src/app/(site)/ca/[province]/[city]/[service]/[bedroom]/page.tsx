import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { PropertyCardBlock } from '@/components/blocks/property-card-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { sanityFetch } from '@/sanity/fetch'
import { generatePageMetadata } from '@/lib/metadata'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

/**
 * Parse bedroom count from slug: "1-bedroom" -> 1, "2-bedroom" -> 2, "3-bedroom" -> 3
 */
function parseBedroomCount(slug: string): number | null {
  const match = slug.match(/^(\d+)-bedroom$/)
  if (!match) return null
  return parseInt(match[1], 10)
}

/**
 * Format bedroom label: 1 -> "1-Bedroom", 3 -> "3+-Bedroom"
 */
function formatBedroomLabel(count: number): string {
  if (count >= 3) return `${count}+-Bedroom`
  return `${count}-Bedroom`
}

function humanServiceLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function trimDescription(text: string, max = 158): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

// Sibling bedroom variants for related-links block.
const BEDROOM_VARIANTS = [
  { slug: '1-bedroom', label: '1-Bedroom' },
  { slug: '2-bedroom', label: '2-Bedroom' },
  { slug: '3-bedroom', label: '3+-Bedroom' },
]

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

  const cityTitle = data?.city.title ?? humanServiceLabel(city)
  const serviceLabel = data?.title || humanServiceLabel(service)
  const bedroomLabel = formatBedroomLabel(bedroomCount)

  // Contract pattern: "{Service} for {Bedroom}-Bedroom Rentals in {City}"
  const fallbackTitle = `${serviceLabel} for ${bedroomLabel} Rentals in ${cityTitle}`

  const descBase = `${serviceLabel} for ${bedroomLabel.toLowerCase()} rentals in ${cityTitle} - white-glove leasing execution, verified applicants, RTA-compliant leases. Talk to MoveSmart Rentals today.`

  return generatePageMetadata({
    seo: data?.seo,
    path: `/ca/${province}/${city}/${service}/${bedroom}`,
    fallbackTitle,
    fallbackDescription: trimDescription(descBase),
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

  // Fall back to synthesised labels so the page still renders as a useful
  // landing destination when Sanity has no document for this filter combo.
  const cityTitle = data?.city.title ?? humanServiceLabel(city)
  const provinceTitle = data?.province.title ?? humanServiceLabel(province)
  const bedroomLabel = formatBedroomLabel(bedroomCount)
  const serviceLabel = data?.title || humanServiceLabel(service)
  const listings = data?.listings ?? []

  const pageUrl = `${SITE_URL}/ca/${province}/${city}/${service}/${bedroom}/`

  const breadcrumbSchema = buildBreadcrumbListSchema({
    crumbs: [
      { name: 'Home', url: SITE_URL },
      { name: provinceTitle, url: `${SITE_URL}/ca/${province}/` },
      { name: cityTitle, url: `${SITE_URL}/ca/${province}/${city}/` },
      {
        name: serviceLabel,
        url: `${SITE_URL}/ca/${province}/${city}/${service}/`,
      },
      { name: `${bedroomLabel} rentals`, url: pageUrl },
    ],
  })

  return (
    <main className="bg-[#FBFAF6]">
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: provinceTitle, href: `/ca/${province}/` },
            { label: cityTitle, href: `/ca/${province}/${city}/` },
            {
              label: serviceLabel,
              href: `/ca/${province}/${city}/${service}/`,
            },
            {
              label: bedroomLabel,
              href: `/ca/${province}/${city}/${service}/${bedroom}/`,
            },
          ]}
        />
      </div>

      {/* Editorial hero (single H1, no meta strip per §10) */}
      <PageHeroBlock
        kicker={`${cityTitle} rentals`}
        eyebrow={`${bedroomLabel} · ${serviceLabel}`}
        headline={`${serviceLabel} for ${bedroomLabel} rentals in ${cityTitle}`}
        accentLastWord={false}
        lede={
          listings.length > 0
            ? `${listings.length} verified ${bedroomLabel.toLowerCase()} listing${listings.length === 1 ? '' : 's'} - transparent pricing, online applications, RTA-compliant leases handled by MoveSmart Rentals.`
            : `No ${bedroomLabel.toLowerCase()} listings are active in ${cityTitle} right now. Browse all ${serviceLabel.toLowerCase()} openings, or have MoveSmart Rentals source one for you.`
        }
        cta1={{ label: 'Apply now', href: '/contact/?intent=apply' }}
        cta2={{
          label: `All ${serviceLabel.toLowerCase()}`,
          href: `/ca/${province}/${city}/${service}/`,
        }}
        city={city}
        service={service}
      />

      {/* Related bedroom variants */}
      <section className="mx-auto max-w-7xl px-4 pt-10">
        <h2 className="font-display text-2xl font-normal text-brand-navy">
          Filter by{' '}
          <span className="font-display italic text-brand-emerald">
            bedrooms
          </span>
          <span aria-hidden="true" className="text-brand-gold">
            .
          </span>
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/ca/${province}/${city}/${service}/`}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5 hover:text-brand-emerald"
          >
            All
          </Link>
          {BEDROOM_VARIANTS.map((v) => {
            const isActive = v.slug === bedroom
            return (
              <Link
                key={v.slug}
                href={`/ca/${province}/${city}/${service}/${v.slug}/`}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'inline-flex items-center rounded-full border border-brand-emerald bg-brand-emerald/10 px-5 py-2 text-sm font-semibold text-brand-emerald'
                    : 'inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5 hover:text-brand-emerald'
                }
              >
                {v.label}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Listings - server-rendered HTML (TEN-05) */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-6 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
          Available{' '}
          <span className="font-display italic text-brand-emerald">
            {bedroomLabel.toLowerCase()} {serviceLabel.toLowerCase()}
          </span>{' '}
          in {cityTitle}
          <span aria-hidden="true" className="text-brand-gold">
            .
          </span>
        </h2>
        {listings.length > 0 ? (
          <PropertyCardBlock listings={listings} />
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            No {bedroomLabel.toLowerCase()} {serviceLabel.toLowerCase()}{' '}
            listings are currently active in {cityTitle}. Try browsing{' '}
            <Link
              href={`/ca/${province}/${city}/${service}/`}
              className="font-medium text-brand-emerald underline-offset-2 hover:underline"
            >
              all {serviceLabel.toLowerCase()} in {cityTitle}
            </Link>{' '}
            or{' '}
            <Link
              href="/contact/?intent=apply"
              className="font-medium text-brand-emerald underline-offset-2 hover:underline"
            >
              tell us what you need
            </Link>
            .
          </p>
        )}
      </section>

      {/* Navigation back-links */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-6">
          <Link
            href={`/ca/${province}/${city}/${service}/`}
            className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-emerald"
          >
            <ArrowLeft className="size-4" />
            All {serviceLabel.toLowerCase()} in {cityTitle}
          </Link>
          <Link
            href={`/ca/${province}/${city}/`}
            className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-emerald"
          >
            <ArrowLeft className="size-4" />
            {cityTitle} rental hub
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Find your next ${bedroomLabel.toLowerCase()} rental`}
        description={`Browse ${bedroomLabel.toLowerCase()} ${serviceLabel.toLowerCase()} openings in ${cityTitle} or let MoveSmart Rentals source one for you.`}
        primaryCta={{
          label: `Browse ${cityTitle} rentals`,
          href: `/ca/${province}/${city}/`,
        }}
        secondaryCta={{ label: 'Talk to a broker', href: '/contact/' }}
        city={city}
        service={service}
      />
    </main>
  )
}
