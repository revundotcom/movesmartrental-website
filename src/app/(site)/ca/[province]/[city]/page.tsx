import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { MapPin } from 'lucide-react'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { JsonLd } from '@/components/json-ld'
import { PortableTextBody } from '@/components/portable-text'
import { generatePageMetadata } from '@/lib/metadata'
import { buildBreadcrumbListSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'
import { getFallbackCaCity } from '@/lib/static-fallbacks'
import { sanityFetch } from '@/sanity/fetch'
import { CITY_PAGE_QUERY, CITY_LIST_QUERY } from '@/sanity/queries/city'
import type { ServiceCardData } from '@/types/blocks'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const cities = await sanityFetch<
    Array<{ slug: { current: string }; provinceSlug: string; country: string }>
  >({
    query: CITY_LIST_QUERY,
    tags: ['city'],
  })

  const sanityParams = cities
    .filter((c) => c.country === 'ca')
    .map((c) => ({
      province: c.provinceSlug,
      city: c.slug.current,
    }))

  // Static fallback slugs - ensure footer-linked Ontario cities always build.
  const fallbackSlugs = [
    'toronto',
    'ottawa',
    'mississauga',
    'hamilton',
    'brampton',
    'london',
    'kitchener',
  ]
  const fallbackParams = fallbackSlugs.map((city) => ({ province: 'ontario', city }))

  // De-duplicate (Sanity takes precedence when both exist)
  const seen = new Set(sanityParams.map((p) => `${p.province}/${p.city}`))
  const merged = [
    ...sanityParams,
    ...fallbackParams.filter((p) => !seen.has(`${p.province}/${p.city}`)),
  ]
  return merged
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
    fallbackTitle: `Leasing Services in ${cityTitle} | MoveSmart Rentals`,
    fallbackDescription: `White-glove leasing brokerage in ${cityTitle}, ${provinceName}: tenant placement, screening, lease execution, and move-in coordination. Zero upfront cost.`,
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
  heroImageUrl?: string
  heroImageAlt?: string
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

  if (!slugSchema.safeParse(province).success || !slugSchema.safeParse(city).success) {
    notFound()
  }

  // Fetch city data and available services in parallel
  const [sanityData, cityServices] = await Promise.all([
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

  // Fall back to static data when Sanity has no document for this slug
  const data: CityPageData | null = sanityData ?? (getFallbackCaCity(city) as CityPageData | null)

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
    description: `White-glove leasing brokerage in ${data.title}, ${data.province.title}.`,
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

  const provinceAbbr = data.province.abbreviation ?? data.province.title
  const descriptionText =
    typeof data.description === 'string' ? data.description : undefined

  return (
    <main>
      {/* JSON-LD */}
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={buildBreadcrumbListSchema({
        crumbs: [
          { name: 'Home', url: siteUrl },
          { name: 'Canada', url: `${siteUrl}/ca/` },
          { name: data.province.title, url: `${siteUrl}/ca/${province}/` },
          { name: data.title, url: `${siteUrl}/ca/${province}/${city}/` },
        ]
      })} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Canada', href: '/ca/' },
            { label: data.province.title, href: `/ca/${province}/` },
            { label: data.title, href: `/ca/${province}/${city}/` },
          ]}
        />
      </div>

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={`${data.title}, ${provinceAbbr}`}
        eyebrow="White-glove leasing brokerage"
        headline={`Leasing services in ${data.title}`}
        lede={
          descriptionText?.slice(0, 220) ??
          `Local tenant placement, screening, lease execution, and move-in coordination in ${data.title}, ${data.province.title}. Zero upfront - success-fee pricing only.`
        }
        cta1={{ label: 'Book a Local Call', href: '/contact/' }}
        cta2={{ label: 'Browse Rentals', href: '/locations/' }}
      />

      {/* City narrative (Portable Text or description paragraph) */}
      {data.description && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              About {data.title}
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              {data.title}{' '}
              <span className="font-display italic text-brand-emerald">at a glance</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <div className="mt-8">
              {isPortableText ? (
                <PortableTextBody value={data.description as never} />
              ) : typeof data.description === 'string' ? (
                <p className="text-lg leading-relaxed text-slate-600">
                  {data.description}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Market snapshot - editorial strip with pipe dividers */}
      {(data.population != null ||
        data.medianRent != null ||
        data.vacancyRate != null ||
        (data.neighbourhoods && data.neighbourhoods.length > 0)) && (
        <section className="bg-[#FBFAF6] py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Market snapshot
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-8 border-y border-brand-navy/10 py-10 sm:grid-cols-4 sm:divide-x sm:divide-brand-navy/10 sm:gap-0">
              {data.population != null && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Population
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {formatPopulation(data.population)}
                  </dd>
                </div>
              )}
              {data.medianRent != null && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Median rent
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {formatCurrency(data.medianRent)}
                  </dd>
                </div>
              )}
              {data.vacancyRate != null && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Vacancy rate
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {formatPercentage(data.vacancyRate)}
                  </dd>
                </div>
              )}
              {data.neighbourhoods && data.neighbourhoods.length > 0 && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Neighbourhoods
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {data.neighbourhoods.length}+
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {/* Neighbourhoods list */}
      {data.neighbourhoods && data.neighbourhoods.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Neighbourhoods we serve
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Local coverage across{' '}
                <span className="font-display italic text-brand-emerald">{data.title}</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-y-0 divide-y divide-brand-navy/10 border-y border-brand-navy/10 sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0">
              {data.neighbourhoods.map((n, i) => (
                <li
                  key={n}
                  className={`py-4 font-display text-xl text-brand-navy ${
                    i < data.neighbourhoods!.length - 1 ? 'sm:border-b sm:border-brand-navy/10' : ''
                  }`}
                >
                  <span aria-hidden="true" className="mr-3 font-mono text-xs text-brand-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Transit info */}
      {data.transitInfo && (
        <section className="bg-[#FBFAF6] py-12 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 size-6 shrink-0 text-brand-emerald" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Transit &amp; transportation
                </p>
                <h3 className="mt-2 font-display text-2xl font-normal text-brand-navy">
                  Getting around {data.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {data.transitInfo}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services available in this city */}
      {services.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Available in {data.title}
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Full-service leasing in{' '}
                <span className="font-display italic text-brand-emerald">{data.title}</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </div>
            <div className="mt-12">
              <ServiceGridBlock
                services={services}
                columns={3}
                basePath={`/ca/${province}/${city}`}
                showHeading={false}
              />
            </div>
          </div>
        </section>
      )}

      {/* Property type links - editorial list, not hover cards */}
      <section className="bg-[#FBFAF6] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Rental listings
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Browse rentals in{' '}
              <span className="font-display italic text-brand-emerald">{data.title}</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
          </div>
          <ul className="mt-10 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {PROPERTY_TYPES.map((pt) => (
              <li key={pt.slug}>
                <Link
                  href={`/ca/${province}/${city}/${pt.slug}/`}
                  className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-white/60"
                >
                  <span className="font-display text-xl text-brand-navy group-hover:text-brand-emerald sm:text-2xl">
                    {pt.label}
                  </span>
                  <span className="text-sm text-slate-500 group-hover:text-brand-navy">
                    in {data.title} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Ready to lease in ${data.title}?`}
        description={`Book 20 minutes with a local leasing advisor. Zero upfront, success-fee pricing, ${data.title}-specific market strategy, and RTA-compliant leases.`}
        primaryCta={{ label: 'Book a Call', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
