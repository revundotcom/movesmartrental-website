import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { PortableTextBody } from '@/components/portable-text'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
import { getFallbackProvince } from '@/lib/static-fallbacks'
import { sanityFetch } from '@/sanity/fetch'
import {
  PROVINCE_PAGE_QUERY,
  PROVINCE_LIST_QUERY,
} from '@/sanity/queries/province'
import type { PortableTextBlock } from '@portabletext/types'
import type { CityCardData } from '@/types/blocks'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const provinces = await sanityFetch<
    Array<{ slug: { current: string }; country: string }>
  >({
    query: PROVINCE_LIST_QUERY,
    tags: ['province'],
  })

  const sanityParams = provinces
    .filter((p) => p.country === 'us')
    .map((p) => ({ state: p.slug.current }))

  // Static fallback slugs — ensure footer-linked US states always build
  const fallbackStates = ['florida', 'texas', 'california', 'new-york', 'illinois']
  const seen = new Set(sanityParams.map((p) => p.state))
  const fallbackParams = fallbackStates
    .filter((state) => !seen.has(state))
    .map((state) => ({ state }))
  return [...sanityParams, ...fallbackParams]
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params

  const data = await sanityFetch<{
    title: string
    seo?: { metaTitle: string; metaDescription: string }
  } | null>({
    query: PROVINCE_PAGE_QUERY,
    params: { slug: state },
    tags: ['province'],
  })

  return generatePageMetadata({
    seo: data?.seo,
    path: `/us/${state}`,
    fallbackTitle: `${data?.title ?? state} Property Management`,
    fallbackDescription: `Professional property management services in ${data?.title ?? state}. Find MoveSmart Rentals in cities across ${data?.title ?? state}.`,
  })
}

// ---------------------------------------------------------------------------
// State Page Data Shape
// ---------------------------------------------------------------------------

interface StatePageData {
  _id: string
  title: string
  slug: { current: string }
  country: string
  abbreviation?: string
  description?: string | PortableTextBlock[]
  heroImage?: {
    asset: { _ref: string }
    alt?: string
  }
  cities: Array<{
    title: string
    slug: { current: string }
    tier: number
    population?: number
    medianRent?: number
    provinceSlug: string
  }>
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params

  if (!slugSchema.safeParse(state).success) {
    notFound()
  }

  const sanityData = await sanityFetch<StatePageData | null>({
    query: PROVINCE_PAGE_QUERY,
    params: { slug: state },
    tags: ['province', 'city'],
  })

  // Fall back to static data when Sanity has no document for this slug
  const data: StatePageData | null =
    sanityData ?? (getFallbackProvince(state) as unknown as StatePageData | null)

  if (!data) {
    notFound()
  }

  // Map cities to CityCardData shape for CityGridBlock
  const cities: CityCardData[] = (data.cities ?? []).map((city) => ({
    title: city.title,
    slug: city.slug.current,
    provinceSlug: city.provinceSlug,
    population: city.population,
    medianRent: city.medianRent,
  }))

  // Check if description is Portable Text or plain string
  const isPortableText =
    Array.isArray(data.description) &&
    data.description.length > 0 &&
    typeof data.description[0] === 'object'

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  const descriptionText =
    typeof data.description === 'string' ? data.description : undefined

  return (
    <main>
      {/* JSON-LD */}
      <JsonLd data={buildBreadcrumbListSchema({
        crumbs: [
          { name: 'Home', url: siteUrl },
          { name: 'United States', url: `${siteUrl}/us/` },
          { name: data.title, url: `${siteUrl}/us/${state}/` },
        ]
      })} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'United States', href: '/us/' },
            { label: data.title, href: `/us/${state}/` },
          ]}
        />
      </div>

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={data.title}
        eyebrow={`Property management across ${data.title}`}
        headline={`Leasing across ${data.title}`}
        lede={descriptionText ?? `Professional property management in every major ${data.title} market — placement, screening, rent protection, and day-to-day operations handled by a local team.`}
        cta1={{ label: 'Book a Local Call', href: '/contact/' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
        meta={[
          { label: 'Cities served', value: `${cities.length}+` },
          { label: 'Avg fill time', value: '14 days' },
          { label: 'Setup fee', value: '$0' },
          { label: 'Local team', value: 'In-market' },
        ]}
      />

      {/* State narrative (Portable Text) */}
      {isPortableText && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              About {data.title}
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Property management across{' '}
              <span className="font-display italic text-brand-emerald">{data.title}</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <div className="mt-8">
              <PortableTextBody value={data.description as PortableTextBlock[]} />
            </div>
          </div>
        </section>
      )}

      {/* Cities list */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Service areas
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Cities we serve in{' '}
              <span className="font-display italic text-brand-emerald">{data.title}</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Local expertise in every major market — from tenant placement to full
              property management.
            </p>
          </div>
          <div className="mt-12">
            <CityGridBlock
              cities={cities}
              province={`Cities in ${data.title}`}
              columns={4}
              showHeading={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Find MoveSmart in ${data.title}`}
        description={`Professional property management across ${data.title}. Book a 20-minute call with a local advisor.`}
        primaryCta={{ label: 'Book a Call', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
