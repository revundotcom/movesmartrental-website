import type { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { sanityFetch } from '@/sanity/fetch'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

/* ------------------------------------------------------------------ */
/*  Segment IDs                                                       */
/* ------------------------------------------------------------------ */

export async function generateSitemaps() {
  return [
    { id: 'static' },
    { id: 'ca-cities' },
    { id: 'ca-services' },
    { id: 'blog' },
    { id: 'listings' },
    { id: 'resources' },
  ]
}

/* ------------------------------------------------------------------ */
/*  GROQ queries (sitemap-specific minimal projections)               */
/* ------------------------------------------------------------------ */

const SITEMAP_CITIES_QUERY = groq`
  *[_type == "city"] {
    "slug": slug.current,
    tier,
    "provinceSlug": province->slug.current
  }
`

const SITEMAP_PROVINCES_QUERY = groq`
  *[_type == "province"] {
    "slug": slug.current
  }
`

const SITEMAP_CITY_SERVICES_QUERY = groq`
  *[_type == "cityService"] {
    "provinceSlug": city->province->slug.current,
    "citySlug": city->slug.current,
    "serviceSlug": service->slug.current,
    "cityTier": city->tier
  }
`

const SITEMAP_SERVICES_QUERY = groq`
  *[_type == "service"] {
    "slug": slug.current
  }
`

const SITEMAP_BLOG_GUIDES_QUERY = groq`
  *[_type == "blogGuide"] {
    "slug": slug.current
  }
`

const SITEMAP_PROPERTY_CATEGORIES_QUERY = groq`
  *[_type == "propertyCategory"] {
    "propertyType": propertyType,
    "citySlug": city->slug.current,
    "provinceSlug": city->province->slug.current
  }
`

const SITEMAP_PROPERTY_LISTINGS_QUERY = groq`
  *[_type == "propertyListing"] {
    "slug": slug.current,
    "citySlug": city->slug.current,
    "provinceSlug": city->province->slug.current
  }
`

const SITEMAP_COMPARISONS_QUERY = groq`
  *[_type == "comparison"] {
    "slug": slug.current
  }
`

const SITEMAP_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] {
    "slug": slug.current
  }
`

/* ------------------------------------------------------------------ */
/*  Type helpers                                                      */
/* ------------------------------------------------------------------ */

type SitemapCity = { slug: string; tier: number; provinceSlug: string }
type SitemapProvince = { slug: string }
type SitemapCityService = {
  provinceSlug: string
  citySlug: string
  serviceSlug: string
  cityTier: number
}
type SitemapService = { slug: string }
type SitemapSlug = { slug: string }
type SitemapPropertyCategory = {
  propertyType: string
  citySlug: string
  provinceSlug: string
}
type SitemapPropertyListing = {
  slug: string
  citySlug: string
  provinceSlug: string
}

/* ------------------------------------------------------------------ */
/*  Segment builders                                                  */
/* ------------------------------------------------------------------ */

function buildStaticSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${siteUrl}/owners/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${siteUrl}/tenants/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${siteUrl}/services/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/locations/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/pricing/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${siteUrl}/resources/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${siteUrl}/franchising/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${siteUrl}/about/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${siteUrl}/contact/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${siteUrl}/faq/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${siteUrl}/ca/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/us/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ]
}

async function buildCaCitiesSegment(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [provinces, cities] = await Promise.all([
    sanityFetch<SitemapProvince[]>({
      query: SITEMAP_PROVINCES_QUERY,
      tags: ['province'],
    }),
    sanityFetch<SitemapCity[]>({
      query: SITEMAP_CITIES_QUERY,
      tags: ['city'],
    }),
  ])

  const entries: MetadataRoute.Sitemap = []

  // Province pages
  for (const province of provinces) {
    entries.push({
      url: `${siteUrl}/ca/${province.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // City hub pages
  for (const city of cities) {
    entries.push({
      url: `${siteUrl}/ca/${city.provinceSlug}/${city.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: city.tier === 1 ? 0.8 : 0.6,
    })
  }

  return entries
}

async function buildCaServicesSegment(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [cityServices, services] = await Promise.all([
    sanityFetch<SitemapCityService[]>({
      query: SITEMAP_CITY_SERVICES_QUERY,
      tags: ['cityService', 'service'],
    }),
    sanityFetch<SitemapService[]>({
      query: SITEMAP_SERVICES_QUERY,
      tags: ['service'],
    }),
  ])

  const entries: MetadataRoute.Sitemap = []

  // Service hub pages
  for (const service of services) {
    entries.push({
      url: `${siteUrl}/services/${service.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  }

  // CityService pages
  for (const cs of cityServices) {
    entries.push({
      url: `${siteUrl}/ca/${cs.provinceSlug}/${cs.citySlug}/${cs.serviceSlug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: cs.cityTier === 1 ? 0.9 : 0.7,
    })
  }

  return entries
}

async function buildBlogSegment(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const blogGuides = await sanityFetch<SitemapSlug[]>({
    query: SITEMAP_BLOG_GUIDES_QUERY,
    tags: ['blogGuide'],
  })

  return blogGuides.map((post) => ({
    url: `${siteUrl}/resources/${post.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
}

async function buildListingsSegment(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [categories, listings] = await Promise.all([
    sanityFetch<SitemapPropertyCategory[]>({
      query: SITEMAP_PROPERTY_CATEGORIES_QUERY,
      tags: ['propertyCategory'],
    }),
    sanityFetch<SitemapPropertyListing[]>({
      query: SITEMAP_PROPERTY_LISTINGS_QUERY,
      tags: ['propertyListing'],
    }),
  ])

  const entries: MetadataRoute.Sitemap = []

  // Property category pages
  for (const cat of categories) {
    entries.push({
      url: `${siteUrl}/ca/${cat.provinceSlug}/${cat.citySlug}/${cat.propertyType}-for-rent/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // Property detail pages
  for (const listing of listings) {
    entries.push({
      url: `${siteUrl}/ca/${listing.provinceSlug}/${listing.citySlug}/rentals/${listing.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })
  }

  return entries
}

async function buildResourcesSegment(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [comparisons, caseStudies] = await Promise.all([
    sanityFetch<SitemapSlug[]>({
      query: SITEMAP_COMPARISONS_QUERY,
      tags: ['comparison'],
    }),
    sanityFetch<SitemapSlug[]>({
      query: SITEMAP_CASE_STUDIES_QUERY,
      tags: ['caseStudy'],
    }),
  ])

  const entries: MetadataRoute.Sitemap = []

  for (const comp of comparisons) {
    entries.push({
      url: `${siteUrl}/resources/${comp.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  }

  for (const cs of caseStudies) {
    entries.push({
      url: `${siteUrl}/resources/${cs.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  }

  return entries
}

/* ------------------------------------------------------------------ */
/*  Main sitemap function                                             */
/* ------------------------------------------------------------------ */

export default async function sitemap({
  id,
}: {
  id: string
}): Promise<MetadataRoute.Sitemap> {
  switch (id) {
    case 'static':
      return buildStaticSegment()
    case 'ca-cities':
      return buildCaCitiesSegment()
    case 'ca-services':
      return buildCaServicesSegment()
    case 'blog':
      return buildBlogSegment()
    case 'listings':
      return buildListingsSegment()
    case 'resources':
      return buildResourcesSegment()
    default:
      return []
  }
}
