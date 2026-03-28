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
    fallbackTitle: `Property Management in ${cityTitle}`,
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
        backgroundImageUrl={data.heroImageUrl}
        backgroundImageAlt={data.heroImageAlt}
        priority
      />

      {/* Premium Local Data Section */}
      <section className="relative overflow-hidden bg-white py-20">
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="absolute -right-32 top-0 size-[360px] rounded-full bg-brand-emerald/6 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-emerald">
              Market Overview
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              {data.title}{' '}
              <span className="font-display italic text-brand-emerald">
                at a Glance
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {data.population != null && (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-navy p-8 text-center">
                <p className="text-3xl font-black text-brand-emerald">
                  {formatPopulation(data.population)}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Population
                </p>
              </div>
            )}
            {data.medianRent != null && (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-emerald/10 p-8 text-center">
                <p className="text-3xl font-black text-brand-navy">
                  {formatCurrency(data.medianRent)}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Median Rent
                </p>
              </div>
            )}
            {data.vacancyRate != null && (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-emerald/10 p-8 text-center">
                <p className="text-3xl font-black text-brand-navy">
                  {formatPercentage(data.vacancyRate)}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Vacancy Rate
                </p>
              </div>
            )}
            {data.neighbourhoods && data.neighbourhoods.length > 0 && (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-navy p-8 text-center">
                <p className="text-3xl font-black text-brand-emerald">
                  {data.neighbourhoods.length}+
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Neighbourhoods
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Getting Around */}
      {data.transitInfo && (
        <section className="py-10 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#0B1D3A] mb-4">Getting Around {data.title}</h2>
            <p className="text-slate-600 leading-relaxed">{data.transitInfo}</p>
          </div>
        </section>
      )}

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
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              Available in {data.title}
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Full-Service Leasing in{' '}
              <span className="font-display italic text-brand-emerald">
                {data.title}
              </span>
            </h2>
          </div>
          <ServiceGridBlock
            services={services}
            columns={3}
            basePath={`/ca/${province}/${city}`}
            showHeading={false}
          />
        </section>
      )}

      {/* Property Type Links */}
      <section className="relative overflow-hidden bg-slate-50 py-20">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A0d 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              Rental Listings
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Browse Rentals in{' '}
              <span className="font-display italic text-brand-emerald">
                {data.title}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROPERTY_TYPES.map((pt) => (
              <Link
                key={pt.slug}
                href={`/ca/${province}/${city}/${pt.slug}/`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-[0_2px_12px_rgba(11,29,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-[0_12px_40px_rgba(11,29,58,0.12)]"
              >
                {/* Top accent bar on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: 'linear-gradient(90deg, #10B981, #34D399)' }}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-bold text-brand-navy transition-colors duration-200 group-hover:text-brand-emerald">
                  {pt.label}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  in {data.title}
                </p>
              </Link>
            ))}
          </div>
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
