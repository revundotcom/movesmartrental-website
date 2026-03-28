import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { PortableTextBody } from '@/components/portable-text'
import { generatePageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/fetch'
import {
  PROVINCE_PAGE_QUERY,
  PROVINCE_LIST_QUERY,
} from '@/sanity/queries/province'
import type { CityCardData } from '@/types/blocks'

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

  return provinces
    .filter((p) => p.country === 'us')
    .map((p) => ({ state: p.slug.current }))
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: string | any[] // Could be string or PortableTextBlock[]
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

  const data = await sanityFetch<StatePageData | null>({
    query: PROVINCE_PAGE_QUERY,
    params: { slug: state },
    tags: ['province', 'city'],
  })

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

  return (
    <main>
      {/* Breadcrumbs */}
      <BreadcrumbNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'United States', href: '/us/' },
          { label: data.title, href: `/us/${state}/` },
        ]}
      />

      {/* Hero */}
      <HeroBlock
        headline={`Property Management in ${data.title}`}
        subheadline={
          typeof data.description === 'string'
            ? data.description
            : undefined
        }
        priority
      />

      {/* State Description */}
      {data.description && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          {isPortableText ? (
            <PortableTextBody value={data.description as never} />
          ) : typeof data.description === 'string' ? (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          ) : null}
        </section>
      )}

      {/* City Grid */}
      <CityGridBlock
        cities={cities}
        province={`Cities in ${data.title}`}
        columns={4}
      />

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Find MoveSmart in ${data.title}`}
        description={`Professional property management services across ${data.title}. Get started today.`}
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}
