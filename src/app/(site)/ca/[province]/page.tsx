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
    .filter((p) => p.country === 'ca')
    .map((p) => ({ province: p.slug.current }))

  // Ensure Ontario always builds even if Sanity is empty
  const seen = new Set(sanityParams.map((p) => p.province))
  if (!seen.has('ontario')) sanityParams.push({ province: 'ontario' })
  return sanityParams
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>
}): Promise<Metadata> {
  const { province } = await params

  const data = await sanityFetch<{
    title: string
    seo?: { metaTitle: string; metaDescription: string }
  } | null>({
    query: PROVINCE_PAGE_QUERY,
    params: { slug: province },
    tags: ['province'],
  })

  return generatePageMetadata({
    seo: data?.seo,
    path: `/ca/${province}`,
    fallbackTitle: `Leasing Brokerage in ${data?.title ?? province} | MoveSmart Rentals`,
    fallbackDescription: `White-glove leasing services across ${data?.title ?? province}: tenant placement, screening, lease execution, and move-in coordination with zero upfront cost.`,
  })
}

// ---------------------------------------------------------------------------
// Province Page Data Shape
// ---------------------------------------------------------------------------

interface ProvincePageData {
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

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ province: string }>
}) {
  const { province } = await params

  if (!slugSchema.safeParse(province).success) {
    notFound()
  }

  const sanityData = await sanityFetch<ProvincePageData | null>({
    query: PROVINCE_PAGE_QUERY,
    params: { slug: province },
    tags: ['province', 'city'],
  })

  // Fall back to static data when Sanity has no document for this slug
  const data: ProvincePageData | null =
    sanityData ?? (getFallbackProvince(province) as unknown as ProvincePageData | null)

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
          { name: 'Canada', url: `${siteUrl}/ca/` },
          { name: data.title, url: `${siteUrl}/ca/${province}/` },
        ]
      })} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Canada', href: '/ca/' },
            { label: data.title, href: `/ca/${province}/` },
          ]}
        />
      </div>

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={data.title}
        eyebrow={`Leasing brokerage across ${data.title}`}
        headline={`Leasing across ${data.title}`}
        lede={descriptionText ?? `White-glove leasing execution in every major ${data.title} market - strategic pricing, professional marketing, tenant qualification, and lease execution from a local team. Zero upfront cost.`}
        cta1={{ label: 'Book a Local Call', href: '/contact/' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
      />

      {/* Province narrative (Portable Text) */}
      {isPortableText && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              About {data.title}
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Leasing services across{' '}
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
              Local expertise in every major market - from tenant placement to
              institutional lease-up, executed by the same in-market team.
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
        description={`White-glove leasing services across ${data.title}. Book a 20-minute call with a local advisor - zero upfront cost.`}
        primaryCta={{ label: 'Book a Call', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
