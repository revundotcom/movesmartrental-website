import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { JsonLd } from '@/components/json-ld'
import { PortableTextBody } from '@/components/portable-text'
import { getFallbackUsCity } from '@/lib/static-fallbacks'
import { generatePageMetadata } from '@/lib/metadata'
import { buildBreadcrumbListSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'
import { sanityFetch } from '@/sanity/fetch'
import { CITY_PAGE_QUERY } from '@/sanity/queries/city'
import type { ServiceCardData } from '@/types/blocks'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const cities = await sanityFetch<
    Array<{
      slug: { current: string }
      provinceSlug: string
      country: string
    }>
  >({
    query: groq`
      *[_type == "city" && province->country == "us"] {
        slug,
        "provinceSlug": province->slug.current,
        "country": province->country
      }
    `,
    tags: ['city'],
  })

  const sanityParams = cities.map((c) => ({
    state: c.provinceSlug,
    city: c.slug.current,
  }))

  // Static fallback slugs — ensure major US cities always build
  const fallbackCombos: Array<{ state: string; city: string }> = [
    { state: 'florida', city: 'miami' },
    { state: 'florida', city: 'orlando' },
    { state: 'florida', city: 'tampa' },
    { state: 'florida', city: 'jacksonville' },
    { state: 'florida', city: 'fort-lauderdale' },
    { state: 'texas', city: 'austin' },
    { state: 'texas', city: 'houston' },
    { state: 'texas', city: 'dallas' },
    { state: 'texas', city: 'san-antonio' },
    { state: 'texas', city: 'fort-worth' },
    { state: 'california', city: 'los-angeles' },
    { state: 'california', city: 'san-diego' },
    { state: 'california', city: 'san-francisco' },
    { state: 'california', city: 'san-jose' },
    { state: 'california', city: 'sacramento' },
    { state: 'new-york', city: 'new-york-city' },
    { state: 'new-york', city: 'buffalo' },
    { state: 'new-york', city: 'rochester' },
    { state: 'new-york', city: 'albany' },
    { state: 'new-york', city: 'syracuse' },
    { state: 'illinois', city: 'chicago' },
    { state: 'illinois', city: 'aurora' },
    { state: 'illinois', city: 'naperville' },
    { state: 'illinois', city: 'rockford' },
    { state: 'illinois', city: 'springfield' },
  ]
  const seen = new Set(sanityParams.map((p) => `${p.state}/${p.city}`))
  const merged = [
    ...sanityParams,
    ...fallbackCombos.filter((p) => !seen.has(`${p.state}/${p.city}`)),
  ]
  return merged
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>
}): Promise<Metadata> {
  const { state, city } = await params

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
  const stateName = data?.province?.title ?? state

  return generatePageMetadata({
    seo: data?.seo,
    path: `/us/${state}/${city}`,
    fallbackTitle: `Property Management in ${cityTitle}`,
    fallbackDescription: `Tenant placement, screening, and property management in ${cityTitle}, ${stateName}. Browse our services and rental listings.`,
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
    && city->province->slug.current == $stateSlug
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPopulation(pop: number): string {
  return pop.toLocaleString('en-US')
}

function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function USCityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>
}) {
  const { state, city } = await params

  if (!slugSchema.safeParse(state).success || !slugSchema.safeParse(city).success) {
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
      params: { citySlug: city, stateSlug: state },
      tags: ['cityService'],
    }),
  ])

  // Fall back to static data when Sanity has no document for this slug
  const data: CityPageData | null = sanityData ?? (getFallbackUsCity(city) as CityPageData | null)

  if (!data) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const pageUrl = `${siteUrl}/us/${state}/${city}/`

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
      country: 'US',
    },
    areaServed: data.title,
  })

  // Check if description is Portable Text
  const isPortableText =
    Array.isArray(data.description) &&
    data.description.length > 0 &&
    typeof data.description[0] === 'object'

  const stateAbbr = data.province.abbreviation ?? data.province.title
  const descriptionText =
    typeof data.description === 'string' ? data.description : undefined

  return (
    <main>
      {/* JSON-LD */}
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={buildBreadcrumbListSchema({
        crumbs: [
          { name: 'Home', url: siteUrl },
          { name: 'United States', url: `${siteUrl}/us/` },
          { name: data.province.title, url: `${siteUrl}/us/${state}/` },
          { name: data.title, url: `${siteUrl}/us/${state}/${city}/` },
        ]
      })} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'United States', href: '/us/' },
            { label: data.province.title, href: `/us/${state}/` },
            { label: data.title, href: `/us/${state}/${city}/` },
          ]}
        />
      </div>

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={`${data.title}, ${stateAbbr}`}
        eyebrow="Property management & leasing"
        headline={`Leasing in ${data.title}`}
        lede={
          descriptionText?.slice(0, 220) ??
          `Local tenant placement, screening, rent protection, and day-to-day property management in ${data.title}, ${data.province.title}.`
        }
        cta1={{ label: 'Book a Local Call', href: '/contact/' }}
        cta2={{ label: 'Browse Rentals', href: '/locations/' }}
        meta={[
          ...(data.medianRent != null
            ? [{ label: 'Median rent', value: formatCurrency(data.medianRent) }]
            : [{ label: 'Avg fill', value: '14 days' }]),
          ...(data.neighbourhoods && data.neighbourhoods.length > 0
            ? [{ label: 'Neighborhoods', value: `${data.neighbourhoods.length}+` }]
            : [{ label: 'Neighborhoods', value: '20+' }]),
          ...(data.vacancyRate != null
            ? [{ label: 'Vacancy rate', value: formatPercentage(data.vacancyRate) }]
            : [{ label: 'Setup fee', value: '$0' }]),
          { label: 'Local team', value: 'In-market' },
        ]}
      />

      {/* City narrative */}
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

      {/* Market snapshot */}
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
                    Neighborhoods
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

      {/* Neighborhoods */}
      {data.neighbourhoods && data.neighbourhoods.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Neighborhoods we serve
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Local coverage across{' '}
                <span className="font-display italic text-brand-emerald">{data.title}</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </div>
            <ul className="mt-10 grid grid-cols-1 divide-y divide-brand-navy/10 border-y border-brand-navy/10 sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0">
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

      {/* Services available in this city */}
      {services.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
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
                basePath={`/us/${state}/${city}`}
                showHeading={false}
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Ready to lease in ${data.title}?`}
        description={`Book 20 minutes with a local advisor. Zero upfront cost, ${data.title}-specific market pricing, and compliant leases.`}
        primaryCta={{ label: 'Book a Call', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
