import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { HowItWorksBlock } from '@/components/blocks/how-it-works-block'
import { JsonLd } from '@/components/json-ld'
import { generatePageMetadata } from '@/lib/metadata'
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
} from '@/lib/schema-builders'
import {
  getFallbackCaCity,
  getFallbackCityList,
} from '@/lib/static-fallbacks'
import type { FallbackCity } from '@/lib/static-fallbacks'
import {
  SERVICE_SLUGS,
  getServiceContent,
} from '@/data/services-content'
import type { ServicePageContent } from '@/data/services-content'
import type { HowItWorksStep } from '@/types/blocks'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// Known US state slugs — exclude US cities from the CA cross-product.
const US_STATE_SLUGS = new Set([
  'florida',
  'texas',
  'california',
  'new-york',
  'illinois',
  'georgia',
  'north-carolina',
  'arizona',
  'colorado',
  'new-jersey',
])

// ---------------------------------------------------------------------------
// Static Params (cross-product of CA cities × services)
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const allCities = getFallbackCityList()
  const caCities = allCities.filter(
    (c) => !US_STATE_SLUGS.has(c.provinceSlug)
  )

  // Dedupe cities in case the list has any duplicates.
  const seen = new Set<string>()
  const uniqueCaCities: Array<{ provinceSlug: string; citySlug: string }> = []
  for (const c of caCities) {
    const key = `${c.provinceSlug}/${c.slug.current}`
    if (seen.has(key)) continue
    seen.add(key)
    uniqueCaCities.push({
      provinceSlug: c.provinceSlug,
      citySlug: c.slug.current,
    })
  }

  const params: Array<{ province: string; city: string; service: string }> = []
  for (const city of uniqueCaCities) {
    for (const service of SERVICE_SLUGS) {
      params.push({
        province: city.provinceSlug,
        city: city.citySlug,
        service,
      })
    }
  }
  return params
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

  const cityData = getFallbackCaCity(city)
  const serviceData = getServiceContent(service)

  if (!cityData || !serviceData) {
    return {}
  }

  const cityTitle = cityData.title
  const serviceTitle = serviceData.title
  const provinceName = cityData.province.title

  return generatePageMetadata({
    path: `/ca/${province}/${city}/${service}`,
    fallbackTitle: `${serviceTitle} in ${cityTitle}`,
    fallbackDescription: `${serviceTitle} in ${cityTitle}, ${provinceName}. White-glove leasing brokerage with zero upfront cost and success-fee pricing.`,
  })
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
// CityService View (synthesised from local city + service data)
// ---------------------------------------------------------------------------

function CityServiceView({
  cityData,
  serviceData,
  province,
  city,
  service,
}: {
  cityData: FallbackCity
  serviceData: ServicePageContent
  province: string
  city: string
  service: string
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const pageUrl = `${siteUrl}/ca/${province}/${city}/${service}/`

  const cityTitle = cityData.title
  const serviceTitle = serviceData.title
  const provinceName = cityData.province.title
  const provinceAbbr = cityData.province.abbreviation ?? provinceName

  // Synthesise localised hero headline combining city + service
  const heroHeadline = `${serviceTitle} in ${cityTitle}`
  const heroSubheadline = serviceData.heroLede

  // Build JSON-LD schemas
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
      description: serviceData.metaDescription,
      url: pageUrl,
      provider: {
        name: 'MoveSmart Rentals',
        url: siteUrl,
      },
      areaServed: cityTitle,
    })
  )

  // 3. FAQ
  if (serviceData.faqItems && serviceData.faqItems.length > 0) {
    schemas.push(
      buildFaqPageSchema({
        questions: serviceData.faqItems.map((f) => ({
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

  // Map service "howItWorks" steps (service-content shape) to block shape
  const howItWorksSteps: HowItWorksStep[] = serviceData.howItWorks.map((s) => ({
    stepNumber: s.step,
    title: s.title,
    description: s.body,
  }))

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
        headline={heroHeadline}
        accentLastWord={false}
        lede={heroSubheadline}
        cta1={{ label: 'Book a Local Call', href: '/contact/' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
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

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                {cityData.description ??
                  `MoveSmart Rentals runs ${serviceTitle.toLowerCase()} in ${cityTitle}, ${provinceName} as a white-glove leasing brokerage. Our local team knows the ${cityTitle} rental market and delivers full-cycle leasing execution - strategic pricing, marketing, qualification, and lease execution - with zero upfront cost.`}
              </p>

              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {serviceData.solutionLede}
              </p>
            </div>

            {/* Right: stat bento grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-navy p-8 text-center">
                <p className="text-4xl font-black text-brand-emerald">
                  {formatCurrency(cityData.medianRent)}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Median Rent / Mo
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-emerald/10 p-8 text-center">
                <p className="text-4xl font-black text-brand-navy">
                  {formatPercentage(cityData.vacancyRate)}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Vacancy Rate
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-emerald/10 p-8 text-center">
                <p className="text-4xl font-black text-brand-navy">
                  {cityData.population
                    ? cityData.population >= 1_000_000
                      ? `${(cityData.population / 1_000_000).toFixed(1)}M`
                      : cityData.population >= 1_000
                        ? `${Math.round(cityData.population / 1_000)}K`
                        : String(cityData.population)
                    : '-'}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Population
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-navy p-8 text-center">
                <p className="text-4xl font-black text-brand-emerald">
                  {cityData.neighbourhoods && cityData.neighbourhoods.length > 0
                    ? `${cityData.neighbourhoods.length}+`
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

      {/* How It Works (from service data) */}
      {howItWorksSteps.length > 0 && (
        <HowItWorksBlock steps={howItWorksSteps} />
      )}

      {/* FAQ — schemaEnabled=false because FAQ JSON-LD injected above */}
      {serviceData.faqItems && serviceData.faqItems.length > 0 && (
        <FAQBlock questions={serviceData.faqItems} schemaEnabled={false} />
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
// Page Component
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

  const cityData = getFallbackCaCity(city)
  const serviceData = getServiceContent(service)

  if (!cityData || !serviceData) {
    // TODO: no static data — property-category (apartments-for-rent, etc.)
    // and unknown slugs fall through to 404 here.
    notFound()
  }

  return (
    <main>
      <CityServiceView
        cityData={cityData}
        serviceData={serviceData}
        province={province}
        city={city}
        service={service}
      />
    </main>
  )
}
