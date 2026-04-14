import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from '@portabletext/types'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { BenefitsBlock } from '@/components/blocks/benefits-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { HowItWorksBlock } from '@/components/blocks/how-it-works-block'
import { PainPointBlock } from '@/components/blocks/pain-point-block'
import { PropertyCardBlock } from '@/components/blocks/property-card-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { TrustBlock } from '@/components/blocks/trust-block'
import { JsonLd } from '@/components/json-ld'
import { PortableTextBody } from '@/components/portable-text'
import { generatePageMetadata } from '@/lib/metadata'
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
} from '@/lib/schema-builders'
import { sanityFetch } from '@/sanity/fetch'
import {
  CITY_SERVICE_PAGE_QUERY,
  CITY_SERVICE_PARAMS_QUERY,
  CITY_SERVICE_SEO_QUERY,
} from '@/sanity/queries/city-service'
import {
  PROPERTY_CATEGORY_QUERY,
  PROPERTY_CATEGORY_PARAMS_QUERY,
} from '@/sanity/queries/property-category'
import type {
  BenefitData,
  FaqItem,
  HowItWorksStep,
  PainPointData,
  PropertyCardData,
  ServiceCardData,
  TestimonialData,
} from '@/types/blocks'
import type { SeoFields } from '@/types/sanity'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// CityService Data Shape
// ---------------------------------------------------------------------------

interface CityServicePageData {
  _id: string
  city: {
    _id: string
    title: string
    slug: { current: string }
    tier: number
    population?: number
    medianRent?: number
    vacancyRate?: number
    neighbourhoods?: string[]
    transitInfo?: string
  }
  province: {
    _id: string
    title: string
    slug: { current: string }
    country: string
    abbreviation?: string
  }
  service: {
    _id: string
    title: string
    slug: { current: string }
    shortDescription: string
    audience: 'owner' | 'tenant' | 'both'
    icon?: string
  }
  cityTitle?: string
  localMedianRent: number
  localVacancyRate: number
  neighbourhoodNames: string[]
  localRegulatory: string
  localBody: PortableTextBlock[]
  heroHeadline: string
  heroSubheadline?: string
  heroCta1?: { label: string; url: string }
  heroCta2?: { label: string; url: string }
  painPoints?: PainPointData[]
  benefits?: BenefitData[]
  howItWorks?: HowItWorksStep[]
  testimonials?: TestimonialData[]
  faq?: FaqItem[]
  relatedServices?: Array<{
    title: string
    slug: { current: string }
    shortDescription: string
    icon?: string
  }>
  seo?: SeoFields
}

// ---------------------------------------------------------------------------
// PropertyCategory Data Shape (shared [service] segment)
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
// Static Params (both CityService Tier-1 combos + PropertyCategory)
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const [cityServiceParams, categoryParams] = await Promise.all([
    sanityFetch<
      Array<{ province: string; city: string; service: string }>
    >({
      query: CITY_SERVICE_PARAMS_QUERY,
      tags: ['cityService'],
    }),
    sanityFetch<
      Array<{ propertyType: string; citySlug: string; provinceSlug: string }>
    >({
      query: PROPERTY_CATEGORY_PARAMS_QUERY,
      tags: ['propertyCategory'],
    }),
  ])

  const csParams = (cityServiceParams ?? []).map((p) => ({
    province: p.province,
    city: p.city,
    service: p.service,
  }))

  const catParams = (categoryParams ?? []).map((p) => ({
    province: p.provinceSlug,
    city: p.citySlug,
    service: p.propertyType,
  }))

  return [...csParams, ...catParams]
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface CityServiceSeoData {
  seo?: SeoFields
  heroHeadline: string
  cityTitle: string
  serviceTitle: string
  provinceName: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}): Promise<Metadata> {
  const { province, city, service } = await params

  // Try CityService first
  const csData = await sanityFetch<CityServiceSeoData | null>({
    query: CITY_SERVICE_SEO_QUERY,
    params: { provinceSlug: province, citySlug: city, serviceSlug: service },
    tags: ['cityService'],
  })

  if (csData) {
    return generatePageMetadata({
      seo: csData.seo,
      path: `/ca/${province}/${city}/${service}`,
      fallbackTitle: `${csData.serviceTitle} in ${csData.cityTitle} | MoveSmart Rentals`,
      fallbackDescription: `${csData.serviceTitle} in ${csData.cityTitle}, ${csData.provinceName}. White-glove leasing brokerage with zero upfront cost and success-fee pricing.`,
    })
  }

  // Fallback to PropertyCategory
  const catData = await sanityFetch<CategoryData | null>({
    query: PROPERTY_CATEGORY_QUERY,
    params: { citySlug: city, propertyType: service },
    tags: ['propertyCategory'],
  })

  if (catData) {
    const cityTitle = catData.city.title
    const propertyTypeLabel = catData.title || service.replace(/-/g, ' ')
    return generatePageMetadata({
      seo: catData.seo,
      path: `/ca/${province}/${city}/${service}`,
      fallbackTitle: `${propertyTypeLabel} for Rent in ${cityTitle}`,
      fallbackDescription: `Browse available ${propertyTypeLabel.toLowerCase()} listings for rent in ${cityTitle}. Verified properties with transparent pricing and online applications.`,
    })
  }

  return {}
}

// ---------------------------------------------------------------------------
// Formatting Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return 'N/A'
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPercentage(rate: number | null | undefined): string {
  if (rate == null) return 'N/A'
  return `${rate.toFixed(1)}%`
}

// ---------------------------------------------------------------------------
// Bedroom Filter Config
// ---------------------------------------------------------------------------

const BEDROOM_OPTIONS = [
  { label: '1 Bedroom', slug: '1-bedroom' },
  { label: '2 Bedroom', slug: '2-bedroom' },
  { label: '3+ Bedroom', slug: '3-bedroom' },
]

// ---------------------------------------------------------------------------
// CityService View
// ---------------------------------------------------------------------------

function CityServiceView({
  data,
  province,
  city,
  service,
}: {
  data: CityServicePageData
  province: string
  city: string
  service: string
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const pageUrl = `${siteUrl}/ca/${province}/${city}/${service}/`

  const cityTitle = data.city.title
  const serviceTitle = data.service.title
  const provinceName = data.province.title
  const provinceAbbr = data.province.abbreviation ?? provinceName

  // Build JSON-LD schemas (4 types)
  const schemas: Record<string, unknown>[] = []

  // 1. LocalBusiness
  schemas.push(
    buildLocalBusinessSchema({
      name: `MoveSmart Rentals - ${cityTitle}`,
      description: `${serviceTitle} in ${cityTitle}, ${provinceName} - white-glove leasing brokerage with zero upfront cost.`,
      url: pageUrl,
      phone: '+18005959755',
      address: {
        streetAddress: cityTitle,
        city: cityTitle,
        province: provinceAbbr,
        postalCode: '',
        country: 'CA',
      },
      areaServed: cityTitle,
      openingHours: ['Mo-Fr 09:00-18:00'],
    })
  )

  // 2. Service
  schemas.push(
    buildServiceSchema({
      name: serviceTitle,
      description: data.service.shortDescription,
      url: pageUrl,
      provider: {
        name: 'MoveSmart Rentals',
        url: siteUrl,
      },
      areaServed: cityTitle,
    })
  )

  // 3. FAQ (if faq items exist)
  if (data.faq && data.faq.length > 0) {
    schemas.push(
      buildFaqPageSchema({
        questions: data.faq.map((f) => ({
          question: f.question,
          answer: f.answer,
        })),
      })
    )
  }

  // 4. BreadcrumbList
  schemas.push(
    buildBreadcrumbListSchema({
      crumbs: [
        { name: 'Home', url: siteUrl },
        { name: provinceName, url: `${siteUrl}/ca/${province}/` },
        { name: cityTitle, url: `${siteUrl}/ca/${province}/${city}/` },
        { name: serviceTitle, url: pageUrl },
      ],
    })
  )

  // Map related services to ServiceCardData
  const relatedServices: ServiceCardData[] = (data.relatedServices ?? []).map(
    (rs) => ({
      title: rs.title,
      slug: rs.slug.current,
      shortDescription: rs.shortDescription,
      icon: rs.icon,
      audience: 'both' as const,
    })
  )

  return (
    <>
      {/* JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      {/* Breadcrumbs */}
      <BreadcrumbNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: provinceName, href: `/ca/${province}/` },
          { label: cityTitle, href: `/ca/${province}/${city}/` },
          {
            label: serviceTitle,
            href: `/ca/${province}/${city}/${service}/`,
          },
        ]}
      />

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={`${serviceTitle} · ${cityTitle}`}
        eyebrow="Local leasing brokerage"
        headline={data.heroHeadline}
        accentLastWord={false}
        lede={data.heroSubheadline ?? data.service.shortDescription}
        cta1={
          data.heroCta1
            ? { label: data.heroCta1.label, href: data.heroCta1.url }
            : { label: 'Book a Local Call', href: '/contact/' }
        }
        cta2={
          data.heroCta2
            ? { label: data.heroCta2.label, href: data.heroCta2.url }
            : { label: 'See Pricing', href: '/pricing/' }
        }
      />

      {/* Premium Local Market Section - two-column layout */}
      <section className="relative overflow-hidden bg-white py-12">
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Emerald glow */}
        <div
          className="absolute -left-32 top-10 size-[360px] rounded-full bg-brand-emerald/6 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            {/* Left: local body content */}
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-emerald">
                Local Market Insight
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                {serviceTitle} in{' '}
                <span className="font-display italic text-brand-emerald">
                  {cityTitle}
                </span>
              </h2>

              {data.localBody ? (
                <div className="mt-6 text-lg leading-relaxed text-slate-600">
                  <PortableTextBody value={data.localBody} />
                </div>
              ) : (
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  MoveSmart Rentals runs {serviceTitle.toLowerCase()} in {cityTitle},{' '}
                  {provinceName} as a white-glove leasing brokerage. Our local
                  team knows the {cityTitle} rental market and delivers full-cycle
                  leasing execution - strategic pricing, marketing, qualification,
                  and lease execution - with zero upfront cost.
                </p>
              )}

              {data.localRegulatory && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Local Regulations
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {data.localRegulatory}
                  </p>
                </div>
              )}
            </div>

            {/* Right: stat bento grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-navy p-8 text-center">
                <p className="text-4xl font-black text-brand-emerald">
                  {formatCurrency(data.localMedianRent)}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Median Rent / Mo
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-emerald/10 p-8 text-center">
                <p className="text-4xl font-black text-brand-navy">
                  {formatPercentage(data.localVacancyRate)}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Vacancy Rate
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-emerald/10 p-8 text-center">
                <p className="text-4xl font-black text-brand-navy">
                  {data.city.population
                    ? data.city.population >= 1_000_000
                      ? `${(data.city.population / 1_000_000).toFixed(1)}M`
                      : data.city.population >= 1_000
                        ? `${Math.round(data.city.population / 1_000)}K`
                        : String(data.city.population)
                    : '-'}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Population
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-navy p-8 text-center">
                <p className="text-4xl font-black text-brand-emerald">
                  {data.neighbourhoodNames.length > 0
                    ? `${data.neighbourhoodNames.length}+`
                    : '10+'}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Neighbourhoods
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      {data.painPoints && data.painPoints.length > 0 && (
        <PainPointBlock painPoints={data.painPoints} />
      )}

      {/* Benefits */}
      {data.benefits && data.benefits.length > 0 && (
        <BenefitsBlock benefits={data.benefits} />
      )}

      {/* How It Works */}
      {data.howItWorks && data.howItWorks.length > 0 && (
        <HowItWorksBlock steps={data.howItWorks} />
      )}

      {/* Testimonials */}
      {data.testimonials && data.testimonials.length > 0 && (
        <TrustBlock testimonials={data.testimonials} variant="testimonials" />
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              More Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Related Services in{' '}
              <span className="font-display italic text-brand-emerald">
                {cityTitle}
              </span>
            </h2>
          </div>
          <ServiceGridBlock
            services={relatedServices}
            columns={3}
            basePath={`/ca/${province}/${city}`}
            showHeading={false}
          />
        </section>
      )}

      {/* FAQ -- schemaEnabled=false because FAQ JSON-LD injected above */}
      {data.faq && data.faq.length > 0 && (
        <FAQBlock questions={data.faq} schemaEnabled={false} />
      )}

      {/* CTA Banner */}
      <CTABannerBlock
        headline="Get Started with MoveSmart Rentals"
        description={`${serviceTitle} in ${cityTitle} - white-glove leasing brokerage, zero upfront cost, success-fee pricing.`}
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// PropertyCategory View
// ---------------------------------------------------------------------------

function PropertyCategoryView({
  data,
  province,
  city,
  service,
}: {
  data: CategoryData
  province: string
  city: string
  service: string
}) {
  const cityTitle = data.city.title
  const provinceTitle = data.province.title
  const propertyTypeLabel = data.title || service.replace(/-/g, ' ')
  const listings = data.listings ?? []

  return (
    <>
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

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={`${cityTitle} Rentals`}
        eyebrow={`${propertyTypeLabel} in ${cityTitle}`}
        headline={`${propertyTypeLabel} for rent in ${cityTitle}`}
        accentLastWord={false}
        lede={
          listings.length > 0
            ? `${listings.length} verified listing${listings.length === 1 ? '' : 's'} available - transparent pricing, online applications, RTA-compliant leases.`
            : `Browse ${propertyTypeLabel.toLowerCase()} rentals in ${cityTitle}. Verified properties with transparent pricing.`
        }
        cta1={{ label: 'Apply Now', href: '/contact/?intent=apply' }}
        cta2={{ label: 'Browse More Cities', href: '/locations/' }}
      />

      {/* Category Description */}
      {data.description && (
        <section className="mx-auto max-w-4xl px-4 py-8">
          <PortableTextBody value={data.description} />
        </section>
      )}

      {/* Bedroom Filter Links */}
      {listings.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-5 flex flex-col gap-1">
            <p className="text-brand-emerald font-heading font-semibold text-xs uppercase tracking-wider">
              Narrow Your Search
            </p>
            <h2 className="font-display text-2xl text-brand-navy">
              Filter by Bedrooms
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              href={`/ca/${province}/${city}/${service}/`}
              className="inline-flex items-center gap-2 rounded-full border border-brand-emerald bg-brand-emerald/5 px-5 py-2.5 text-sm font-medium text-brand-emerald transition-all duration-200"
            >
              All
            </Link>
            {BEDROOM_OPTIONS.map((option) => (
              <Link
                key={option.slug}
                href={`/ca/${province}/${city}/${service}/${option.slug}/`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-brand-emerald hover:bg-brand-emerald/5 hover:text-brand-emerald hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
              >
                {option.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Listings */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-1">
          <p className="text-brand-emerald font-heading font-semibold text-xs uppercase tracking-wider">
            Verified Listings
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-brand-navy">
            Available {propertyTypeLabel} in{' '}
            <span className="italic text-brand-emerald">{cityTitle}</span>
          </h2>
        </div>
        {listings.length > 0 ? (
          <div className="[&_a]:transition-all [&_a]:duration-300 [&_a:hover]:-translate-y-1 [&_a:hover]:shadow-lg">
            <PropertyCardBlock listings={listings} />
          </div>
        ) : (
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-10 text-center">
            <p className="text-slate-600 leading-relaxed">
              No {propertyTypeLabel.toLowerCase()} listings are currently
              available in {cityTitle}. Check back soon or browse other property
              types.
            </p>
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline="Find Your Next Rental"
        description={`Looking for the perfect ${propertyTypeLabel.toLowerCase()} in ${cityTitle}? Browse all available listings and apply online.`}
        primaryCta={{ label: 'Browse All Cities', href: '/locations/' }}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// Page Component (dispatches to CityService or PropertyCategory)
// ---------------------------------------------------------------------------

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}) {
  const { province, city, service } = await params

  if (
    !slugSchema.safeParse(province).success ||
    !slugSchema.safeParse(city).success ||
    !slugSchema.safeParse(service).success
  ) {
    notFound()
  }

  // Try CityService first (highest-value SEO page type)
  const cityServiceData = await sanityFetch<CityServicePageData | null>({
    query: CITY_SERVICE_PAGE_QUERY,
    params: {
      provinceSlug: province,
      citySlug: city,
      serviceSlug: service,
    },
    tags: ['cityService', 'city', 'service'],
  })

  if (cityServiceData) {
    return (
      <main>
        <CityServiceView
          data={cityServiceData}
          province={province}
          city={city}
          service={service}
        />
      </main>
    )
  }

  // Fallback: try PropertyCategory
  const categoryData = await sanityFetch<CategoryData | null>({
    query: PROPERTY_CATEGORY_QUERY,
    params: { citySlug: city, propertyType: service },
    tags: ['propertyCategory', 'propertyListing'],
  })

  if (categoryData) {
    return (
      <main>
        <PropertyCategoryView
          data={categoryData}
          province={province}
          city={city}
          service={service}
        />
      </main>
    )
  }

  // Neither matched
  notFound()
}
