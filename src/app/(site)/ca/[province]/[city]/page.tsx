import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { groq } from 'next-sanity'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { JsonLd } from '@/components/json-ld'
import { PortableTextBody } from '@/components/portable-text'
import { generatePageMetadata } from '@/lib/metadata'
import { buildLocalBusinessSchema } from '@/lib/schema-builders'
import { sanityFetch } from '@/sanity/fetch'
import { CITY_PAGE_QUERY, CITY_LIST_QUERY } from '@/sanity/queries/city'
import type { ServiceCardData } from '@/types/blocks'

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const cities = await sanityFetch<
    Array<{ slug: { current: string }; provinceSlug: string }>
  >({
    query: CITY_LIST_QUERY,
    tags: ['city'],
  })

  return cities.map((c) => ({
    province: c.provinceSlug,
    city: c.slug.current,
  }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string }>
}): Promise<Metadata> {
  const { province, city } = await params

  const data = await sanityFetch<{
    title: string
    province: { title: string }
    seo?: { metaTitle: string; metaDescription: string }
  } | null>({
    query: CITY_PAGE_QUERY,
    params: { slug: city },
    tags: ['city'],
  })

  const cityTitle = data?.title ?? city
  const provinceName = data?.province?.title ?? province

  return generatePageMetadata({
    seo: data?.seo,
    path: `/ca/${province}/${city}`,
    fallbackTitle: `Property Management in ${cityTitle} | MoveSmart Rentals`,
    fallbackDescription: `Tenant placement, screening, and property management in ${cityTitle}, ${provinceName}. Browse our services and rental listings.`,
  })
}

// ---------------------------------------------------------------------------
// City Page Data Shape
// ---------------------------------------------------------------------------

interface CityPageData {
  _id: string
  title: string
  slug: { current: string }
  tier: number
  population?: number
  medianRent?: number
  vacancyRate?: number
  neighbourhoods?: string[]
  transitInfo?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: string | any[] // Could be string or PortableTextBlock[]
  province: {
    title: string
    slug: { current: string }
    country: string
    abbreviation?: string
  }
}

/** Shape returned by the city services query */
interface CityServiceItem {
  serviceTitle: string
  serviceSlug: string
  serviceDescription: string
  serviceIcon?: string
  serviceAudience: 'owner' | 'tenant' | 'both'
}

// ---------------------------------------------------------------------------
// City Services Query
// ---------------------------------------------------------------------------

const CITY_SERVICES_QUERY = groq`
  *[_type == "cityService"
    && city->slug.current == $citySlug
    && city->province->slug.current == $provinceSlug
  ] {
    "serviceTitle": service->title,
    "serviceSlug": service->slug.current,
    "serviceDescription": service->shortDescription,
    "serviceIcon": service->icon,
    "serviceAudience": service->audience
  }
`

// ---------------------------------------------------------------------------
// Formatting Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPopulation(pop: number): string {
  return pop.toLocaleString('en-CA')
}

function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`
}

// ---------------------------------------------------------------------------
// Property Type Cards
// ---------------------------------------------------------------------------

const PROPERTY_TYPES = [
  { label: 'Apartments for Rent', slug: 'apartments-for-rent' },
  { label: 'Condos for Rent', slug: 'condos-for-rent' },
  { label: 'Houses for Rent', slug: 'houses-for-rent' },
  { label: 'Townhouses for Rent', slug: 'townhouses-for-rent' },
] as const

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function CityPage({
  params,
}: {
  params: Promise<{ province: string; city: string }>
}) {
  const { province, city } = await params

  // Fetch city data and available services in parallel
  const [data, cityServices] = await Promise.all([
    sanityFetch<CityPageData | null>({
      query: CITY_PAGE_QUERY,
      params: { slug: city },
      tags: ['city'],
    }),
    sanityFetch<CityServiceItem[]>({
      query: CITY_SERVICES_QUERY,
      params: { citySlug: city, provinceSlug: province },
      tags: ['cityService'],
    }),
  ])

  if (!data) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const pageUrl = `${siteUrl}/ca/${province}/${city}/`

  // Map services to ServiceCardData shape
  const services: ServiceCardData[] = (cityServices ?? []).map((cs) => ({
    title: cs.serviceTitle,
    slug: cs.serviceSlug,
    shortDescription: cs.serviceDescription,
    icon: cs.serviceIcon,
    audience: cs.serviceAudience,
  }))

  // Build LocalBusiness JSON-LD
  const localBusinessSchema = buildLocalBusinessSchema({
    name: `MoveSmart Rentals - ${data.title}`,
    description: `Professional property management services in ${data.title}, ${data.province.title}.`,
    url: pageUrl,
    address: {
      streetAddress: '',
      city: data.title,
      province: data.province.abbreviation ?? data.province.title,
      postalCode: '',
      country: 'CA',
    },
    areaServed: data.title,
  })

  // Check if description is Portable Text
  const isPortableText =
    Array.isArray(data.description) &&
    data.description.length > 0 &&
    typeof data.description[0] === 'object'

  return (
    <main>
      {/* JSON-LD */}
      <JsonLd data={localBusinessSchema} />

      {/* Breadcrumbs */}
      <BreadcrumbNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Canada', href: '/ca/' },
          { label: data.province.title, href: `/ca/${province}/` },
          { label: data.title, href: `/ca/${province}/${city}/` },
        ]}
      />

      {/* Hero */}
      <HeroBlock
        headline={`Property Management in ${data.title}`}
        subheadline={
          typeof data.description === 'string'
            ? (data.description as string).slice(0, 160)
            : `Professional property management and tenant placement in ${data.title}, ${data.province.title}.`
        }
        priority
      />

      {/* Local Data Section -- prominently displayed */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
          {data.title} at a Glance
        </h2>
        <div className="grid grid-cols-1 gap-4 rounded-lg bg-muted p-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.population != null && (
            <div>
              <p className="text-sm text-muted-foreground">Population</p>
              <p className="text-2xl font-bold">
                {formatPopulation(data.population)}
              </p>
            </div>
          )}
          {data.medianRent != null && (
            <div>
              <p className="text-sm text-muted-foreground">Median Rent</p>
              <p className="text-2xl font-bold">
                {formatCurrency(data.medianRent)}
              </p>
            </div>
          )}
          {data.vacancyRate != null && (
            <div>
              <p className="text-sm text-muted-foreground">Vacancy Rate</p>
              <p className="text-2xl font-bold">
                {formatPercentage(data.vacancyRate)}
              </p>
            </div>
          )}
          {data.neighbourhoods && data.neighbourhoods.length > 0 && (
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-sm text-muted-foreground">
                Top Neighbourhoods
              </p>
              <p className="font-bold">{data.neighbourhoods.join(', ')}</p>
            </div>
          )}
        </div>
      </section>

      {/* City Description */}
      {data.description && (
        <section className="mx-auto max-w-4xl px-4 py-8">
          {isPortableText ? (
            <PortableTextBody value={data.description as never} />
          ) : typeof data.description === 'string' ? (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          ) : null}
        </section>
      )}

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Our Services in {data.title}
          </h2>
          <ServiceGridBlock
            services={services}
            columns={3}
            basePath={`/ca/${province}/${city}`}
          />
        </section>
      )}

      {/* Property Type Links */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Browse Rentals in {data.title}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROPERTY_TYPES.map((pt) => (
            <Link
              key={pt.slug}
              href={`/ca/${province}/${city}/${pt.slug}/`}
              className="group rounded-lg border bg-card p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold group-hover:text-primary">
                {pt.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                in {data.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Get Started in ${data.title}`}
        description={`Let MoveSmart Rentals handle your property management in ${data.title}. Zero upfront cost.`}
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}
