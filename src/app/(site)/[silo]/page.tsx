import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { JsonLd } from '@/components/json-ld'
import {
  SiloPageTemplate,
  type SiloSection,
} from '@/components/blocks/silo-page-template'
import { BRAND } from '@/lib/brand-constants'
import {
  FLAT_PAGES,
  SILO_BLOGS,
  SILO_PAGES,
  type SiloPage,
} from '@/lib/silo'

type Params = { params: Promise<{ silo: string }> }

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return FLAT_PAGES.map((p) => ({ silo: p.url.replace(/^\//, '') }))
}

function findFlatPage(slug: string): SiloPage | undefined {
  return FLAT_PAGES.find((p) => p.url === `/${slug}`)
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { silo } = await params
  const page = findFlatPage(silo)
  if (!page) return { title: 'Page not found | MoveSmart Rentals' }

  const title = `${page.title} | ${BRAND.name}`
  return {
    title,
    description: page.meta_description,
    alternates: { canonical: `${BRAND.url}${page.url}/` },
    openGraph: {
      title: page.title,
      description: page.meta_description,
      url: `${BRAND.url}${page.url}/`,
      siteName: BRAND.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description,
    },
  }
}

function buildGraph(page: SiloPage): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = []

  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BRAND.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: `${BRAND.url}${page.url}/`,
      },
    ],
  })

  if (page.type === 'city_hub') {
    graph.push({
      '@type': 'LocalBusiness',
      '@id': `${BRAND.url}${page.url}/#localbusiness`,
      name: `${BRAND.name} ${page.city}, ${page.state_abbr}`,
      url: `${BRAND.url}${page.url}/`,
      telephone: BRAND.phone,
      areaServed: {
        '@type': 'City',
        name: page.city,
        containedInPlace: { '@type': 'State', name: page.state },
      },
      ...(typeof page.lat === 'number' && typeof page.lng === 'number'
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: page.lat,
              longitude: page.lng,
            },
          }
        : {}),
    })
  } else if (page.type === 'service_in_city') {
    graph.push({
      '@type': 'Service',
      '@id': `${BRAND.url}${page.url}/#service`,
      name: `${page.service_label} in ${page.city}, ${page.state_abbr}`,
      provider: {
        '@type': 'LocalBusiness',
        name: BRAND.name,
        url: BRAND.url,
      },
      areaServed: { '@type': 'City', name: page.city },
      description: page.service_blurb || page.meta_description,
    })
  }

  if (page.faq && page.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return graph
}

const PLACEHOLDER_VARIANTS = [
  '/city-placeholder-a.svg',
  '/city-placeholder-b.svg',
  '/city-placeholder-c.svg',
  '/city-placeholder-d.svg',
  '/city-placeholder-e.svg',
  '/city-placeholder-f.svg',
]

function placeholderFor(cityKey: string): string {
  let hash = 0
  for (let i = 0; i < cityKey.length; i++) {
    hash = (hash * 31 + cityKey.charCodeAt(i)) >>> 0
  }
  return PLACEHOLDER_VARIANTS[hash % PLACEHOLDER_VARIANTS.length]
}

const AUDIENCE_TILES = [
  'Individual landlords managing one to ten units',
  'Builders and developers releasing new construction',
  'Property management companies expanding portfolios',
  'Institutional rental operators and REITs at scale',
]

export default async function SiloFlatPage({ params }: Params) {
  const { silo } = await params
  const page = findFlatPage(silo)
  if (!page) notFound()

  const cityPages = SILO_PAGES.filter((p) => p.city_key === page.city_key)
  const siblingServices = cityPages.filter(
    (p) => p.type === 'service_in_city' && p.url !== page.url,
  )
  const cityHub = cityPages.find((p) => p.type === 'city_hub')
  const cityBlogs = SILO_BLOGS.filter((p) => p.city_key === page.city_key)

  // Breadcrumbs
  const crumbs = [
    { label: 'Home', href: '/' },
    cityHub && cityHub.url !== page.url
      ? { label: page.city, href: `${cityHub.url}/` }
      : null,
    {
      label:
        page.type === 'service_in_city' && page.service_label
          ? page.service_label
          : page.title,
      href: `${page.url}/`,
    },
  ].filter(Boolean) as Array<{ label: string; href: string }>

  // Hero copy
  const heroKicker =
    page.type === 'service_in_city' && page.service_label
      ? page.service_label
      : 'Property management'
  const heroEyebrow = `${page.city}, ${page.state_abbr}`
  const heroHeadline = page.title
  const heroLede =
    page.intro || page.meta_description || `${heroKicker} in ${page.city}.`

  // Hero image
  const heroImage = {
    src: placeholderFor(page.city_key),
    alt: `${page.city}, ${page.state_abbr} city visual for ${heroKicker}`,
    caption: `Active ${heroKicker.toLowerCase()} coverage across ${page.city}, ${page.state_abbr} and the surrounding ${page.state} market.`,
  }

  // Market data strip
  const marketData: { label: string; value: string }[] = [
    { label: 'Market', value: page.city },
    { label: 'Region', value: page.state },
    {
      label: 'Coverage',
      value:
        page.country === 'CA'
          ? 'Canada'
          : page.country === 'US'
            ? 'United States'
            : 'Canada and US',
    },
    { label: 'Dispatch', value: '24 / 7' },
  ]
  if (page.neighborhoods && page.neighborhoods.length > 0) {
    marketData.push({
      label: 'Neighborhoods',
      value: `${page.neighborhoods.length}+`,
    })
  }
  if (page.jurisdiction?.body) {
    marketData.push({ label: 'Jurisdiction', value: page.jurisdiction.body })
  }

  // Body sections from bundle copy
  const sections: SiloSection[] = []
  if (page.local_context) {
    sections.push({
      title: `Local market context in ${page.city}`,
      body: page.local_context,
    })
  }
  if (page.service_details) {
    sections.push({
      title: 'What this looks like on the ground',
      body: page.service_details,
    })
  }
  // Sibling services as a "service lines in this city" card grid
  if (siblingServices.length > 0) {
    sections.push({
      title:
        page.type === 'city_hub'
          ? `Service lines in ${page.city}`
          : `Other services in ${page.city}`,
      items: siblingServices.slice(0, 6).map((s) => ({
        title: s.service_label || s.title,
        body: s.service_blurb || '',
        tag: 'View service',
      })),
    })
  }
  // Authority citations as a "sources" sub-section
  const citations = (page.authority_citations || []).concat(
    page.authority_citation ? [page.authority_citation] : [],
  )
  if (citations.length > 0) {
    sections.push({
      title: 'Local authority sources',
      body: 'Cited references for this market.',
      items: citations
        .filter((c) => c && c.url)
        .slice(0, 6)
        .map((c) => ({
          title: c.name,
          body: c.context,
          tag: 'External source',
        })),
    })
  }

  // FAQ
  const faq = (page.faq || []).map((f) => ({ question: f.q, answer: f.a }))

  // Closing CTA copy
  const closing =
    page.type === 'service_in_city'
      ? `Ready to start ${(page.service_label || 'leasing').toLowerCase()} in ${page.city}?`
      : `Ready to lease faster in ${page.city}?`

  // Related: 3 next-best links — sibling services + city blogs
  const related: { title: string; href: string; description?: string }[] = []
  for (const s of siblingServices.slice(0, 2)) {
    related.push({
      title: s.title,
      href: `${s.url}/`,
      description: s.service_blurb,
    })
  }
  for (const b of cityBlogs.slice(0, 3)) {
    related.push({
      title: b.title,
      href: `${b.url}/`,
      description: b.intro?.slice(0, 140),
    })
    if (related.length >= 6) break
  }

  return (
    <>
      <JsonLd data={buildGraph(page)} />
      <SiloPageTemplate
        breadcrumbs={crumbs}
        heroKicker={heroKicker}
        heroEyebrow={heroEyebrow}
        heroHeadline={heroHeadline}
        heroLede={heroLede}
        heroImage={heroImage}
        marketData={marketData}
        sections={sections}
        audience={AUDIENCE_TILES}
        neighborhoods={page.neighborhoods}
        faq={faq}
        closing={closing}
        related={related}
        primaryCta={{ label: 'List my property', href: '/owners/' }}
        secondaryCta={{
          label: `Call ${BRAND.phoneDisplay}`,
          href: `tel:${BRAND.phone}`,
        }}
      />
    </>
  )
}
