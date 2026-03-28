import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PortableTextBody } from '@/components/portable-text'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
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

  return services.map((s) => ({
    service: s.slug.current,
  }))
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

  const service = await sanityFetch<ServicePageData | null>({
    query: SERVICE_PAGE_QUERY,
    params: { slug },
    tags: ['service'],
  })

  if (!service) {
    return { title: 'Service Not Found | MoveSmart Rentals' }
  }

  return generatePageMetadata({
    seo: service.seo,
    path: `/services/${slug}`,
    fallbackTitle: `${service.title} | MoveSmart Rentals`,
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

  const service = await sanityFetch<ServicePageData | null>({
    query: SERVICE_PAGE_QUERY,
    params: { slug },
    tags: ['service'],
  })

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

  // Build hero image URL from asset ref if available
  const heroImageUrl = service.heroImage?.asset?._ref
    ? buildSanityImageUrl(service.heroImage.asset._ref)
    : undefined

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

      {/* Hero */}
      <HeroBlock
        headline={service.title}
        subheadline={service.shortDescription}
        backgroundImageUrl={heroImageUrl}
        backgroundImageAlt={service.heroImage?.alt}
        cta1={{ label: 'Get Started', href: '/contact/' }}
      />

      {/* CMS Body Content */}
      {service.body && (
        <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <PortableTextBody value={service.body} />
        </section>
      )}

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <FAQBlock
          title={`${service.title} FAQ`}
          questions={service.faq}
        />
      )}

      {/* Available Cities */}
      {service.availableCities && service.availableCities.length > 0 && (
        <section className="py-12 md:py-16">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Cities Where {service.title} Is Available
          </h2>
          <CityGridBlock cities={service.availableCities} columns={3} />
        </section>
      )}

      {/* CTA */}
      <CTABannerBlock
        headline={`Get ${service.title} Today`}
        description="Contact us to learn how this service can work for your property."
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

/**
 * Build a Sanity CDN image URL from an asset reference.
 * Reference format: "image-{id}-{WxH}-{ext}" -> "{id}-{WxH}.{ext}"
 */
function buildSanityImageUrl(ref: string): string {
  const parts = ref.replace('image-', '').split('-')
  const ext = parts.pop()
  const rest = parts.join('-')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${rest}.${ext}`
}
