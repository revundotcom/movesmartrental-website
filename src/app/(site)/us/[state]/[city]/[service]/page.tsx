import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { generatePageMetadata } from '@/lib/metadata'
import {
  getFallbackUsCity,
  getFallbackCityList,
} from '@/lib/static-fallbacks'
import type { FallbackCity } from '@/lib/static-fallbacks'
import {
  SERVICE_SLUGS,
  getServiceContent,
} from '@/data/services-content'
import type { ServicePageContent } from '@/data/services-content'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// Known US state slugs — only US cities participate in this cross-product.
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
// Static Params (cross-product of US cities × services)
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const allCities = getFallbackCityList()
  const usCities = allCities.filter((c) =>
    US_STATE_SLUGS.has(c.provinceSlug)
  )

  const seen = new Set<string>()
  const uniqueUsCities: Array<{ stateSlug: string; citySlug: string }> = []
  for (const c of usCities) {
    const key = `${c.provinceSlug}/${c.slug.current}`
    if (seen.has(key)) continue
    seen.add(key)
    uniqueUsCities.push({
      stateSlug: c.provinceSlug,
      citySlug: c.slug.current,
    })
  }

  const params: Array<{ state: string; city: string; service: string }> = []
  for (const city of uniqueUsCities) {
    for (const service of SERVICE_SLUGS) {
      params.push({
        state: city.stateSlug,
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
  params: Promise<{ state: string; city: string; service: string }>
}): Promise<Metadata> {
  const { state, city, service } = await params

  const cityData = getFallbackUsCity(city)
  const serviceData = getServiceContent(service)

  if (cityData && serviceData) {
    return generatePageMetadata({
      path: `/us/${state}/${city}/${service}`,
      fallbackTitle: `${serviceData.title} in ${cityData.title}`,
      fallbackDescription: `${serviceData.title} in ${cityData.title}, ${cityData.province.title}. White-glove leasing brokerage with zero upfront cost and success-fee pricing.`,
    })
  }

  // Fallback metadata for coming-soon / missing data state
  const formattedService = service
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const formattedCity = city
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return generatePageMetadata({
    path: `/us/${state}/${city}/${service}`,
    fallbackTitle: `${formattedService} in ${formattedCity}`,
    fallbackDescription: `${formattedService} services coming soon to ${formattedCity}. MoveSmart Rentals is expanding white-glove leasing brokerage across the United States.`,
  })
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function USCityServicePage({
  params,
}: {
  params: Promise<{ state: string; city: string; service: string }>
}) {
  const { state, city, service } = await params

  if (
    !slugSchema.safeParse(state).success ||
    !slugSchema.safeParse(city).success ||
    !slugSchema.safeParse(service).success
  ) {
    notFound()
  }

  const cityData: FallbackCity | null = getFallbackUsCity(city)
  const serviceData: ServicePageContent | null = getServiceContent(service)

  // Full CityService page when both city + service exist in local data
  if (cityData && serviceData) {
    const cityTitle = cityData.title
    const serviceTitle = serviceData.title
    const stateName = cityData.province.title

    return (
      <main>
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'United States', href: '/us/' },
            { label: stateName, href: `/us/${state}/` },
            { label: cityTitle, href: `/us/${state}/${city}/` },
            {
              label: serviceTitle,
              href: `/us/${state}/${city}/${service}/`,
            },
          ]}
        />

        <PageHeroBlock
          kicker={`${serviceTitle} · ${cityTitle}`}
          eyebrow="Local leasing brokerage"
          headline={`${serviceTitle} in ${cityTitle}`}
          accentLastWord={false}
          lede={serviceData.heroLede}
          cta1={{ label: 'Book a Local Call', href: '/contact/' }}
          cta2={{ label: 'See Pricing', href: '/pricing/' }}
        />

        <CTABannerBlock
          headline="Get Started with MoveSmart Rentals"
          description={`${serviceTitle} in ${cityTitle} - white-glove leasing brokerage, zero upfront cost, success-fee pricing.`}
          primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
          secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
        />
      </main>
    )
  }

  // Coming-soon fallback: city exists but service missing (or vice versa)
  if (!cityData) {
    notFound()
  }

  const cityTitle = cityData.title
  const stateName = cityData.province.title
  const formattedService = service
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <main>
      {/* Breadcrumbs */}
      <BreadcrumbNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'United States', href: '/us/' },
          { label: stateName, href: `/us/${state}/` },
          { label: cityTitle, href: `/us/${state}/${city}/` },
          {
            label: formattedService,
            href: `/us/${state}/${city}/${service}/`,
          },
        ]}
      />

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={`${cityTitle}, ${stateName}`}
        eyebrow="Coming soon"
        headline={`${formattedService} in ${cityTitle}`}
        accentLastWord={false}
        lede={`${formattedService} services are coming soon to ${cityTitle}, ${stateName}. Join our waitlist - priority access for founding landlords and developers.`}
        cta1={{ label: 'Join the Waitlist', href: '/contact/' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
      />

      {/* Coming Soon Notice */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Coming Soon to {cityTitle}
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            We are expanding our {formattedService.toLowerCase()} services to{' '}
            {cityTitle}, {stateName}. In the meantime, explore what MoveSmart
            Rentals offers in {cityTitle}.
          </p>
          <Link
            href={`/us/${state}/${city}/`}
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View {cityTitle} Overview
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Get Started in ${cityTitle}`}
        description={`Let MoveSmart Rentals run your leasing campaign in ${cityTitle}. White-glove brokerage, zero upfront, success-fee pricing.`}
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}
