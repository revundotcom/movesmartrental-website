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
import Link from 'next/link'
import { SILO_PAGES } from '@/lib/silo'

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

  const data = getFallbackUsCity(city, state)

  const cityTitle = data?.title ?? city
  const stateName = data?.province?.title ?? state

  return generatePageMetadata({
    path: `/us/${state}/${city}`,
    fallbackTitle: `Leasing Services in ${cityTitle}`,
    fallbackDescription: `Full-service leasing and tenant placement in ${cityTitle}, ${stateName}: tenant placement, screening, lease execution, and move-in coordination. Zero upfront cost.`,
  })
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

  const data: FallbackCity | null = getFallbackUsCity(city, state)

  if (!data) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const pageUrl = `${siteUrl}/us/${state}/${city}/`

  // Build LocalBusiness JSON-LD
  const localBusinessSchema = buildLocalBusinessSchema({
    name: `MoveSmart Rentals - ${data.title}`,
    description: `Full-service leasing and tenant placement in ${data.title}, ${data.province.title}.`,
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

  // Our deep service pages for this city (the silo). Filter to real pages so
  // every link resolves — this is the city <-> service connection that was
  // missing, so footer -> state -> city -> service now reaches our content.
  const cityKey = `${city}-${(data.province.abbreviation ?? '').toLowerCase()}`
  const cityServices = SILO_PAGES.filter(
    (p) => p.type === 'service_in_city' && p.city_key === cityKey,
  )

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
        eyebrow="Full-service leasing and tenant placement"
        headline={`Leasing services in ${data.title}`}
        lede={
          descriptionText?.slice(0, 220) ??
          `Local tenant placement, screening, lease execution, and move-in coordination in ${data.title}, ${data.province.title}. Zero upfront - success-fee pricing only.`
        }
        cta1={{ label: 'Browse rentals', href: '/properties/' }}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt={`${data.title} skyline`}
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

      {/* Services in this city — links into our deep silo service pages */}
      {cityServices.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Services in {data.title}
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Everything we do in{' '}
                <span className="font-display italic text-brand-emerald">{data.title}</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </div>
            <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {cityServices.map((s) => (
                <Link
                  key={s.url}
                  href={`${s.url}/`}
                  className="group border-t border-brand-navy/10 pt-5 transition-colors"
                >
                  <h3 className="font-display text-lg font-normal text-brand-navy group-hover:text-brand-emerald">
                    {s.service_label || s.title}
                  </h3>
                  {s.service_blurb && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {s.service_blurb}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABannerBlock
        headline={`Ready to lease in ${data.title}?`}
        description={`Get a free rental analysis with ${data.title}-specific market pricing. Zero upfront cost and compliant leases.`}
        primaryCta={{ label: 'Get Started', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
