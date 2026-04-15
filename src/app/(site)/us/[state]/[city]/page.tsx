import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import {
  getFallbackUsCity,
  getFallbackCityList,
} from '@/lib/static-fallbacks'
import type { FallbackCity } from '@/lib/static-fallbacks'
import { generatePageMetadata } from '@/lib/metadata'
import { buildBreadcrumbListSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// Known US state slugs — used to filter the flat city list.
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
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const allCities = getFallbackCityList()
  const usCities = allCities.filter((c) =>
    US_STATE_SLUGS.has(c.provinceSlug)
  )

  const seen = new Set<string>()
  const params: Array<{ state: string; city: string }> = []
  for (const c of usCities) {
    const key = `${c.provinceSlug}/${c.slug.current}`
    if (seen.has(key)) continue
    seen.add(key)
    params.push({ state: c.provinceSlug, city: c.slug.current })
  }
  return params
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>
}): Promise<Metadata> {
  const { state, city } = await params

  const data = getFallbackUsCity(city)

  const cityTitle = data?.title ?? city
  const stateName = data?.province?.title ?? state

  return generatePageMetadata({
    path: `/us/${state}/${city}`,
    fallbackTitle: `Leasing Services in ${cityTitle}`,
    fallbackDescription: `White-glove leasing brokerage in ${cityTitle}, ${stateName}: tenant placement, screening, lease execution, and move-in coordination. Zero upfront cost.`,
  })
}

// ---------------------------------------------------------------------------
// Formatting Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPopulation(pop: number): string {
  return pop.toLocaleString('en-US')
}

function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function USCityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>
}) {
  const { state, city } = await params

  if (!slugSchema.safeParse(state).success || !slugSchema.safeParse(city).success) {
    notFound()
  }

  const data: FallbackCity | null = getFallbackUsCity(city)

  if (!data) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const pageUrl = `${siteUrl}/us/${state}/${city}/`

  // Build LocalBusiness JSON-LD
  const localBusinessSchema = buildLocalBusinessSchema({
    name: `MoveSmart Rentals - ${data.title}`,
    description: `White-glove leasing brokerage in ${data.title}, ${data.province.title}.`,
    url: pageUrl,
    address: {
      streetAddress: '',
      city: data.title,
      province: data.province.abbreviation ?? data.province.title,
      postalCode: '',
      country: 'US',
    },
    areaServed: data.title,
  })

  const stateAbbr = data.province.abbreviation ?? data.province.title
  const descriptionText = data.description

  return (
    <main>
      {/* JSON-LD */}
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={buildBreadcrumbListSchema({
        crumbs: [
          { name: 'Home', url: siteUrl },
          { name: 'United States', url: `${siteUrl}/us/` },
          { name: data.province.title, url: `${siteUrl}/us/${state}/` },
          { name: data.title, url: `${siteUrl}/us/${state}/${city}/` },
        ]
      })} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'United States', href: '/us/' },
            { label: data.province.title, href: `/us/${state}/` },
            { label: data.title, href: `/us/${state}/${city}/` },
          ]}
        />
      </div>

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={`${data.title}, ${stateAbbr}`}
        eyebrow="White-glove leasing brokerage"
        headline={`Leasing services in ${data.title}`}
        lede={
          descriptionText?.slice(0, 220) ??
          `Local tenant placement, screening, lease execution, and move-in coordination in ${data.title}, ${data.province.title}. Zero upfront - success-fee pricing only.`
        }
        cta1={{ label: 'Book a Local Call', href: '/contact/' }}
        cta2={{ label: 'Browse Rentals', href: '/locations/' }}
      />

      {/* City narrative */}
      {descriptionText && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              About {data.title}
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              {data.title}{' '}
              <span className="font-display italic text-brand-emerald">at a glance</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <div className="mt-8">
              <p className="text-lg leading-relaxed text-slate-600">
                {descriptionText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Market snapshot */}
      {(data.population != null ||
        data.medianRent != null ||
        data.vacancyRate != null ||
        (data.neighbourhoods && data.neighbourhoods.length > 0)) && (
        <section className="bg-[#FBFAF6] py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Market snapshot
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-8 border-y border-brand-navy/10 py-10 sm:grid-cols-4 sm:divide-x sm:divide-brand-navy/10 sm:gap-0">
              {data.population != null && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Population
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {formatPopulation(data.population)}
                  </dd>
                </div>
              )}
              {data.medianRent != null && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Median rent
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {formatCurrency(data.medianRent)}
                  </dd>
                </div>
              )}
              {data.vacancyRate != null && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Vacancy rate
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {formatPercentage(data.vacancyRate)}
                  </dd>
                </div>
              )}
              {data.neighbourhoods && data.neighbourhoods.length > 0 && (
                <div className="text-center sm:px-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                    Neighborhoods
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                    {data.neighbourhoods.length}+
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      {data.neighbourhoods && data.neighbourhoods.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Neighborhoods we serve
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Local coverage across{' '}
                <span className="font-display italic text-brand-emerald">{data.title}</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </div>
            <ul className="mt-10 grid grid-cols-1 divide-y divide-brand-navy/10 border-y border-brand-navy/10 sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0">
              {data.neighbourhoods.map((n, i) => (
                <li
                  key={n}
                  className={`py-4 font-display text-xl text-brand-navy ${
                    i < data.neighbourhoods!.length - 1 ? 'sm:border-b sm:border-brand-navy/10' : ''
                  }`}
                >
                  <span aria-hidden="true" className="mr-3 font-mono text-xs text-brand-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Ready to lease in ${data.title}?`}
        description={`Book 20 minutes with a local advisor. Zero upfront cost, ${data.title}-specific market pricing, and compliant leases.`}
        primaryCta={{ label: 'Book a Call', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
