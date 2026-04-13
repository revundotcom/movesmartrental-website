import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { generatePageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/fetch'
import {
  CITY_SERVICE_PAGE_QUERY,
  CITY_SERVICE_SEO_QUERY,
} from '@/sanity/queries/city-service'
import type { SeoFields } from '@/types/sanity'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// Static Params -- US city-service pages
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const results = await sanityFetch<
    Array<{ stateSlug: string; citySlug: string; serviceSlug: string }>
  >({
    query: groq`
      *[_type == "cityService" && city->province->country == "us"] {
        "stateSlug": city->province->slug.current,
        "citySlug": city->slug.current,
        "serviceSlug": service->slug.current
      }
    `,
    tags: ['cityService'],
  })

  return (results ?? []).map((r) => ({
    state: r.stateSlug,
    city: r.citySlug,
    service: r.serviceSlug,
  }))
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
  params: Promise<{ state: string; city: string; service: string }>
}): Promise<Metadata> {
  const { state, city, service } = await params

  // Try CityService data
  const csData = await sanityFetch<CityServiceSeoData | null>({
    query: CITY_SERVICE_SEO_QUERY,
    params: { provinceSlug: state, citySlug: city, serviceSlug: service },
    tags: ['cityService'],
  })

  if (csData) {
    return generatePageMetadata({
      seo: csData.seo,
      path: `/us/${state}/${city}/${service}`,
      fallbackTitle: `${csData.serviceTitle} in ${csData.cityTitle}`,
      fallbackDescription: `Professional ${csData.serviceTitle.toLowerCase()} services in ${csData.cityTitle}, ${csData.provinceName}. MoveSmart Rentals provides expert property management with zero upfront cost.`,
    })
  }

  // Fallback metadata for coming-soon state
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
    fallbackDescription: `${formattedService} services coming soon to ${formattedCity}. MoveSmart Rentals is expanding property management across the United States.`,
  })
}

// ---------------------------------------------------------------------------
// City info query (for coming-soon fallback)
// ---------------------------------------------------------------------------

interface CityInfo {
  _id: string
  title: string
  slug: { current: string }
  province: {
    title: string
    slug: { current: string }
    abbreviation?: string
  }
}

const CITY_INFO_QUERY = groq`
  *[_type == "city"
    && slug.current == $citySlug
    && province->slug.current == $stateSlug
  ][0] {
    _id,
    title,
    slug,
    "province": province-> {
      title,
      slug,
      abbreviation
    }
  }
`

// ---------------------------------------------------------------------------
// CityService Data Shape (matches Canadian pattern)
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
  heroHeadline: string
  heroSubheadline?: string
  seo?: SeoFields
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

  // Try CityService data first
  const cityServiceData = await sanityFetch<CityServicePageData | null>({
    query: CITY_SERVICE_PAGE_QUERY,
    params: {
      provinceSlug: state,
      citySlug: city,
      serviceSlug: service,
    },
    tags: ['cityService', 'city', 'service'],
  })

  if (cityServiceData) {
    // Full CityService page (when US services are active)
    const cityTitle = cityServiceData.city.title
    const serviceTitle = cityServiceData.service.title
    const stateName = cityServiceData.province.title

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
          eyebrow="Local property management"
          headline={cityServiceData.heroHeadline}
          accentLastWord={false}
          lede={cityServiceData.heroSubheadline}
          cta1={{ label: 'Book a Local Call', href: '/contact/' }}
          cta2={{ label: 'See Pricing', href: '/pricing/' }}
          meta={[
            { label: 'Service', value: serviceTitle },
            { label: 'Market', value: cityTitle },
            { label: 'Setup fee', value: '$0' },
            { label: 'Local team', value: 'In-market' },
          ]}
        />

        <CTABannerBlock
          headline="Get Started with MoveSmart Rentals"
          description={`Professional ${serviceTitle.toLowerCase()} in ${cityTitle}. Zero upfront cost.`}
          primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
          secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
        />
      </main>
    )
  }

  // Fallback: Coming Soon page with city info
  const cityInfo = await sanityFetch<CityInfo | null>({
    query: CITY_INFO_QUERY,
    params: { citySlug: city, stateSlug: state },
    tags: ['city'],
  })

  if (!cityInfo) {
    notFound()
  }

  const cityTitle = cityInfo.title
  const stateName = cityInfo.province.title
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
        lede={`Professional ${formattedService.toLowerCase()} services are coming soon to ${cityTitle}, ${stateName}. Join our waitlist — priority access for founding owners.`}
        cta1={{ label: 'Join the Waitlist', href: '/contact/' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
        meta={[
          { label: 'City', value: cityTitle },
          { label: 'State', value: stateName },
          { label: 'Status', value: 'Coming soon' },
          { label: 'Setup fee', value: '$0' },
        ]}
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
        description={`Let MoveSmart Rentals handle your property management in ${cityTitle}. Zero upfront cost.`}
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}
