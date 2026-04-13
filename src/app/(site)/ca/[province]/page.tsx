import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { JsonLd } from '@/components/json-ld'
import { PortableTextBody } from '@/components/portable-text'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
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

  return provinces
    .filter((p) => p.country === 'ca')
    .map((p) => ({ province: p.slug.current }))
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
    fallbackTitle: `${data?.title ?? province} Property Management`,
    fallbackDescription: `Professional property management services in ${data?.title ?? province}. Find MoveSmart Rentals in cities across ${data?.title ?? province}.`,
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

  const data = await sanityFetch<ProvincePageData | null>({
    query: PROVINCE_PAGE_QUERY,
    params: { slug: province },
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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

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
      <BreadcrumbNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Canada', href: '/ca/' },
          { label: data.title, href: `/ca/${province}/` },
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

      {/* Province Description */}
      {data.description && (
        <section className="relative overflow-hidden bg-white py-14 lg:py-14">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div
            className="absolute -right-32 top-0 size-[360px] rounded-full bg-brand-emerald/6 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-brand-emerald font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                About {data.title}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-brand-navy mb-6">
                Property Management Across{' '}
                <span className="italic text-brand-emerald">{data.title}</span>
              </h2>
            </div>
            {isPortableText ? (
              <PortableTextBody value={data.description as PortableTextBlock[]} />
            ) : typeof data.description === 'string' ? (
              <p className="text-lg leading-relaxed text-slate-600 text-center">
                {data.description}
              </p>
            ) : null}
          </div>
        </section>
      )}

      {/* City Grid Section */}
      <section className="py-14 lg:py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-brand-emerald font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Service Areas
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-navy mb-6">
              Cities We Serve in{' '}
              <span className="italic text-brand-emerald">{data.title}</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Professional property management across every major market in{' '}
              {data.title}. Local expertise, zero upfront cost, and results-driven
              leasing for owners and tenants.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-100 p-6 md:p-10 shadow-sm">
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
        description={`Professional property management services across ${data.title}. Get started today.`}
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}
