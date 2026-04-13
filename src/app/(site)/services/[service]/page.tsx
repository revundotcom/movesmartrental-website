import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PortableTextBody } from '@/components/portable-text'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
import { getFallbackService } from '@/lib/static-fallbacks'
import { sanityFetch } from '@/sanity/fetch'
import {
  SERVICE_LIST_QUERY,
  SERVICE_PAGE_QUERY,
} from '@/sanity/queries/service'
import type { CityCardData, FaqItem } from '@/types/blocks'
import type { SanityImage, SanitySlug, SeoFields } from '@/types/sanity'
import type { PortableTextBlock } from '@portabletext/types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ServicePageData {
  _id: string
  _type: string
  title: string
  slug: SanitySlug
  shortDescription: string
  icon?: string
  audience: 'owner' | 'tenant' | 'both'
  order?: number
  heroImage?: SanityImage
  body?: PortableTextBlock[]
  faq?: FaqItem[]
  seo?: SeoFields
  availableCities?: CityCardData[]
}

interface ServiceSlug {
  slug: SanitySlug
}

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const services = await sanityFetch<ServiceSlug[]>({
    query: SERVICE_LIST_QUERY,
    tags: ['service'],
  })

  const sanityParams = services.map((s) => ({ service: s.slug.current }))

  // Static fallback slugs — ensure footer-linked services always build
  const fallbackSlugs = [
    'tenant-placement',
    'tenant-screening',
    'rent-guarantee',
    'rental-preparation',
    'leasing-services',
  ]
  const seen = new Set(sanityParams.map((p) => p.service))
  const fallbackParams = fallbackSlugs
    .filter((slug) => !seen.has(slug))
    .map((slug) => ({ service: slug }))
  return [...sanityParams, ...fallbackParams]
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service: slug } = await params

  const sanityService = await sanityFetch<ServicePageData | null>({
    query: SERVICE_PAGE_QUERY,
    params: { slug },
    tags: ['service'],
  })

  const fallback = getFallbackService(slug)
  const service = sanityService ?? (fallback as unknown as ServicePageData | null)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return generatePageMetadata({
    seo: service.seo,
    path: `/services/${slug}`,
    fallbackTitle: service.title,
    fallbackDescription: service.shortDescription,
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service: slug } = await params

  const sanityService = await sanityFetch<ServicePageData | null>({
    query: SERVICE_PAGE_QUERY,
    params: { slug },
    tags: ['service'],
  })

  // Fall back to static data when Sanity has no document for this slug
  const service: ServicePageData | null =
    sanityService ?? (getFallbackService(slug) as unknown as ServicePageData | null)

  if (!service) {
    notFound()
  }

  // Build Service JSON-LD (SCHEMA-04)
  const serviceSchema = buildServiceSchema({
    name: service.title,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${slug}/`,
    provider: {
      name: 'MoveSmart Rentals',
      url: SITE_URL,
    },
    areaServed: 'Ontario, Canada',
  })

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: service.title, href: `/services/${slug}/` },
          ]}
        />
      </div>

      {/* JSON-LD */}
      <JsonLd data={serviceSchema} />

      {/* Editorial hero */}
      <PageHeroBlock
        kicker="Services"
        eyebrow={`${service.title} · Full-Service Property Management`}
        headline={service.title}
        accentLastWord={false}
        lede={service.shortDescription}
        cta1={{ label: 'Book a Discovery Call', href: '/contact/' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
        meta={[
          { label: 'Audience', value: service.audience === 'owner' ? 'Owners' : service.audience === 'tenant' ? 'Tenants' : 'Owners & Tenants' },
          { label: 'Avg fill time', value: '14 days' },
          { label: 'Cities available', value: service.availableCities?.length ? `${service.availableCities.length}+` : '20+' },
          { label: 'Bundled in Full-Service', value: 'Yes' },
        ]}
      />

      {/* CMS Body Content — editorial column */}
      {service.body && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <PortableTextBody value={service.body} />
          </div>
        </section>
      )}

      {/* Pricing note */}
      <section className="bg-[#FBFAF6] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Pricing
          </p>
          <p className="mt-3 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
            {service.title} is included in our Full-Service Management at{' '}
            <span className="font-display italic text-brand-emerald">8% of monthly rent</span>
            <span aria-hidden="true" className="text-brand-gold">.</span>
          </p>
          <Link
            href="/pricing/"
            className="mt-5 inline-block text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-emerald"
          >
            See the full fee schedule →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <FAQBlock
          title={`Questions about ${service.title}`}
          questions={service.faq}
        />
      )}

      {/* Available Cities */}
      {service.availableCities && service.availableCities.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Where we deliver
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                {service.title} in{' '}
                <span className="font-display italic text-brand-emerald">
                  {service.availableCities.length}+ cities
                </span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </div>
            <div className="mt-12">
              <CityGridBlock cities={service.availableCities} columns={3} showHeading={false} />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABannerBlock
        headline={`Ready to start with ${service.title}?`}
        description="Book a 20-minute discovery call. We'll tour the unit, pull your market rent, and quote a service tier — no obligation."
        primaryCta={{ label: 'Book a Discovery Call', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}

