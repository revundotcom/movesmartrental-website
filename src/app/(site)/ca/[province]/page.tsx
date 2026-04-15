import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
import { getFallbackProvince } from '@/lib/static-fallbacks'
import type { FallbackProvince } from '@/lib/static-fallbacks'
import type { CityCardData } from '@/types/blocks'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  return [
    { province: 'ontario' },
    { province: 'quebec' },
    { province: 'british-columbia' },
    { province: 'alberta' },
    { province: 'nova-scotia' },
  ]
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

  const data = getFallbackProvince(province)

  return generatePageMetadata({
    path: `/ca/${province}`,
    fallbackTitle: `Leasing Brokerage in ${data?.title ?? province}`,
    fallbackDescription: `White-glove leasing services across ${data?.title ?? province}: tenant placement, screening, lease execution, and move-in coordination with zero upfront cost.`,
  })
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

  const data: FallbackProvince | null = getFallbackProvince(province)

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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  // Fallback description is a plain string, not PortableText
  const descriptionText = data.description

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

      {/* Province narrative (plain-text description) */}
      {descriptionText && (
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
              <p className="text-lg leading-relaxed text-slate-600">{descriptionText}</p>
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
