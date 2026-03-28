import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from '@portabletext/types'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { BenefitsBlock } from '@/components/blocks/benefits-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { HeroBlock } from '@/components/blocks/hero-block'
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
      fallbackDescription: `Professional ${csData.serviceTitle.toLowerCase()} services in ${csData.cityTitle}, ${csData.provinceName}. MoveSmart Rentals provides expert property management with zero upfront cost.`,
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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPercentage(rate: number): string {
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
      description: `Professional ${serviceTitle.toLowerCase()} services in ${cityTitle}, ${provinceName}.`,
      url: pageUrl,
      address: {
        streetAddress: '',
        city: cityTitle,
        province: provinceAbbr,
        postalCode: '',
        country: 'CA',
      },
      areaServed: cityTitle,
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

      {/* Hero */}
      <HeroBlock
        headline={data.heroHeadline}
        subheadline={data.heroSubheadline}
        cta1={
          data.heroCta1
            ? { label: data.heroCta1.label, href: data.heroCta1.url }
            : undefined
        }
        cta2={
          data.heroCta2
            ? { label: data.heroCta2.label, href: data.heroCta2.url }
            : undefined
        }
        priority
      />

      {/* AI-01: Content section -- direct answer in first 40-60 words */}
      {data.localBody && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <PortableTextBody value={data.localBody} />
        </section>
      )}

      {/* Local Data Display -- CRITICAL for content differentiation */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          {cityTitle} Rental Market Data
        </h2>
        <div className="rounded-lg bg-muted p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Median Rent
              </p>
              <p className="mt-1 text-3xl font-bold">
                {formatCurrency(data.localMedianRent)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">per month</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Vacancy Rate
              </p>
              <p className="mt-1 text-3xl font-bold">
                {formatPercentage(data.localVacancyRate)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                current market rate
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-medium text-muted-foreground">
                Key Neighbourhoods
              </p>
              <p className="mt-1 text-lg font-bold">
                {data.neighbourhoodNames.join(', ')}
              </p>
            </div>
          </div>

          {data.localRegulatory && (
            <div className="mt-6 border-t pt-6">
              <p className="text-sm font-medium text-muted-foreground">
                Local Regulatory Information
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                {data.localRegulatory}
              </p>
            </div>
          )}
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
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Related Services in {cityTitle}
          </h2>
          <ServiceGridBlock
            services={relatedServices}
            columns={3}
            basePath={`/ca/${province}/${city}`}
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
        description={`Professional ${serviceTitle.toLowerCase()} in ${cityTitle}. Zero upfront cost.`}
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

      {/* Listings */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">
          Available {propertyTypeLabel} in {cityTitle}
        </h2>
        {listings.length > 0 ? (
          <PropertyCardBlock listings={listings} />
        ) : (
          <p className="text-muted-foreground">
            No {propertyTypeLabel.toLowerCase()} listings are currently available
            in {cityTitle}. Check back soon or browse other property types.
          </p>
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
