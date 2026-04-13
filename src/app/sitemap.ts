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
    { id: 'us-cities' },
    { id: 'us-services' },
    { id: 'blog' },
    { id: 'listings' },
    { id: 'resources' },
  ]
}

/* ------------------------------------------------------------------ */
/*  GROQ queries (sitemap-specific minimal projections)               */
/* ------------------------------------------------------------------ */

const SITEMAP_CA_CITIES_QUERY = groq`
  *[_type == "city" && province->country == "ca"] {
    "slug": slug.current,
    tier,
    "provinceSlug": province->slug.current,
    _updatedAt
  }
`

const SITEMAP_CA_PROVINCES_QUERY = groq`
  *[_type == "province" && country == "ca"] {
    "slug": slug.current,
    _updatedAt
  }
`

const SITEMAP_CA_CITY_SERVICES_QUERY = groq`
  *[_type == "cityService" && city->province->country == "ca"] {
    "provinceSlug": city->province->slug.current,
    "citySlug": city->slug.current,
    "serviceSlug": service->slug.current,
    "cityTier": city->tier,
    _updatedAt
  }
`

const SITEMAP_US_CITIES_QUERY = groq`
  *[_type == "city" && province->country == "us"] {
    "slug": slug.current,
    tier,
    "stateSlug": province->slug.current,
    _updatedAt
  }
`

const SITEMAP_US_STATES_QUERY = groq`
  *[_type == "province" && country == "us"] {
    "slug": slug.current,
    _updatedAt
  }
`

const SITEMAP_US_CITY_SERVICES_QUERY = groq`
  *[_type == "cityService" && city->province->country == "us"] {
    "stateSlug": city->province->slug.current,
    "citySlug": city->slug.current,
    "serviceSlug": service->slug.current,
    "cityTier": city->tier,
    _updatedAt
  }
`

const SITEMAP_SERVICES_QUERY = groq`
  *[_type == "service"] {
    "slug": slug.current,
    _updatedAt
  }
`

const SITEMAP_BLOG_GUIDES_QUERY = groq`
  *[_type == "blogGuide"] {
    "slug": slug.current,
    _updatedAt
  }
`

const SITEMAP_PROPERTY_CATEGORIES_QUERY = groq`
  *[_type == "propertyCategory"] {
    "propertyType": propertyType,
    "citySlug": city->slug.current,
    "provinceSlug": city->province->slug.current,
    _updatedAt
  }
`

const SITEMAP_PROPERTY_LISTINGS_QUERY = groq`
  *[_type == "propertyListing"] {
    "slug": slug.current,
    "citySlug": city->slug.current,
    "provinceSlug": city->province->slug.current,
    _updatedAt
  }
`

const SITEMAP_COMPARISONS_QUERY = groq`
  *[_type == "comparison"] {
    "slug": slug.current,
    _updatedAt
  }
`

const SITEMAP_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] {
    "slug": slug.current,
    _updatedAt
  }
`

/* ------------------------------------------------------------------ */
/*  Type helpers                                                      */
/* ------------------------------------------------------------------ */

type SitemapCity = { slug: string; tier: number; provinceSlug: string; _updatedAt?: string }
type SitemapProvince = { slug: string; _updatedAt?: string }
type SitemapCityService = {
  provinceSlug: string
  citySlug: string
  serviceSlug: string
  cityTier: number
  _updatedAt?: string
}
type SitemapUSCity = { slug: string; tier: number; stateSlug: string; _updatedAt?: string }
type SitemapUSCityService = {
  stateSlug: string
  citySlug: string
  serviceSlug: string
  cityTier: number
  _updatedAt?: string
}
type SitemapService = { slug: string; _updatedAt?: string }
type SitemapSlug = { slug: string; _updatedAt?: string }
type SitemapPropertyCategory = {
  propertyType: string
  citySlug: string
  provinceSlug: string
  _updatedAt?: string
}
type SitemapPropertyListing = {
  slug: string
  citySlug: string
  provinceSlug: string
  _updatedAt?: string
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
    { url: `${siteUrl}/reviews/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${siteUrl}/portal-and-technology/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${siteUrl}/ca/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/us/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ]
}

async function buildCaCitiesSegment(): Promise<MetadataRoute.Sitemap> {
  const [provinces, cities] = await Promise.all([
    sanityFetch<SitemapProvince[]>({
      query: SITEMAP_CA_PROVINCES_QUERY,
      tags: ['province'],
    }),
    sanityFetch<SitemapCity[]>({
      query: SITEMAP_CA_CITIES_QUERY,
      tags: ['city'],
    }),
  ])

  const entries: MetadataRoute.Sitemap = []

  // Province pages
  for (const province of provinces) {
    entries.push({
      url: `${siteUrl}/ca/${province.slug}/`,
      lastModified: province._updatedAt ? new Date(province._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // City hub pages
  for (const city of cities) {
    entries.push({
      url: `${siteUrl}/ca/${city.provinceSlug}/${city.slug}/`,
      lastModified: city._updatedAt ? new Date(city._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: city.tier === 1 ? 0.8 : 0.6,
    })
  }

  return entries
}

async function buildCaServicesSegment(): Promise<MetadataRoute.Sitemap> {
  const [cityServices, services] = await Promise.all([
    sanityFetch<SitemapCityService[]>({
      query: SITEMAP_CA_CITY_SERVICES_QUERY,
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
      lastModified: service._updatedAt ? new Date(service._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  }

  // CityService pages
  for (const cs of cityServices) {
    entries.push({
      url: `${siteUrl}/ca/${cs.provinceSlug}/${cs.citySlug}/${cs.serviceSlug}/`,
      lastModified: cs._updatedAt ? new Date(cs._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: cs.cityTier === 1 ? 0.9 : 0.7,
    })
  }

  return entries
}

async function buildBlogSegment(): Promise<MetadataRoute.Sitemap> {
  const blogGuides = await sanityFetch<SitemapSlug[]>({
    query: SITEMAP_BLOG_GUIDES_QUERY,
    tags: ['blogGuide'],
  })

  return blogGuides.map((post) => ({
    url: `${siteUrl}/resources/${post.slug}/`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
}

async function buildListingsSegment(): Promise<MetadataRoute.Sitemap> {
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
      lastModified: cat._updatedAt ? new Date(cat._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // Property detail pages
  for (const listing of listings) {
    entries.push({
      url: `${siteUrl}/ca/${listing.provinceSlug}/${listing.citySlug}/rentals/${listing.slug}/`,
      lastModified: listing._updatedAt ? new Date(listing._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })
  }

  return entries
}

async function buildResourcesSegment(): Promise<MetadataRoute.Sitemap> {
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
      lastModified: comp._updatedAt ? new Date(comp._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  }

  for (const cs of caseStudies) {
    entries.push({
      url: `${siteUrl}/resources/${cs.slug}/`,
      lastModified: cs._updatedAt ? new Date(cs._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  }

  return entries
}

/* ------------------------------------------------------------------ */
/*  US segment builders                                               */
/* ------------------------------------------------------------------ */

async function buildUsCitiesSegment(): Promise<MetadataRoute.Sitemap> {
  const [states, cities] = await Promise.all([
    sanityFetch<SitemapProvince[]>({
      query: SITEMAP_US_STATES_QUERY,
      tags: ['province'],
    }),
    sanityFetch<SitemapUSCity[]>({
      query: SITEMAP_US_CITIES_QUERY,
      tags: ['city'],
    }),
  ])

  const entries: MetadataRoute.Sitemap = []

  // State pages
  for (const state of states) {
    entries.push({
      url: `${siteUrl}/us/${state.slug}/`,
      lastModified: state._updatedAt ? new Date(state._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // City hub pages
  for (const city of cities) {
    entries.push({
      url: `${siteUrl}/us/${city.stateSlug}/${city.slug}/`,
      lastModified: city._updatedAt ? new Date(city._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: city.tier === 1 ? 0.8 : 0.6,
    })
  }

  return entries
}

async function buildUsServicesSegment(): Promise<MetadataRoute.Sitemap> {
  const usCityServices = await sanityFetch<SitemapUSCityService[]>({
    query: SITEMAP_US_CITY_SERVICES_QUERY,
    tags: ['cityService'],
  })

  const entries: MetadataRoute.Sitemap = []

  // US CityService pages (may be empty for now)
  for (const cs of usCityServices ?? []) {
    entries.push({
      url: `${siteUrl}/us/${cs.stateSlug}/${cs.citySlug}/${cs.serviceSlug}/`,
      lastModified: cs._updatedAt ? new Date(cs._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: cs.cityTier === 1 ? 0.9 : 0.7,
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
    case 'us-cities':
      return buildUsCitiesSegment()
    case 'us-services':
      return buildUsServicesSegment()
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
