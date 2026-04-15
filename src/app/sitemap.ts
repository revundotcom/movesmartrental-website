import type { MetadataRoute } from 'next'
import {
  getFallbackCityList,
  getFallbackServiceList,
} from '@/lib/static-fallbacks'
import { GUIDES } from '@/data/guides'

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
  ]
}

/* ------------------------------------------------------------------ */
/*  Country partitioning                                              */
/* ------------------------------------------------------------------ */

/**
 * getFallbackCityList() returns a flat list of cities with `provinceSlug`
 * but no country discriminator. Ontario is the only CA province in the
 * static fallbacks; everything else is a US state slug.
 */
const CA_PROVINCE_SLUGS = new Set(['ontario'])

function isCaCity(provinceSlug: string): boolean {
  return CA_PROVINCE_SLUGS.has(provinceSlug)
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

function buildCaCitiesSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  const cities = getFallbackCityList().filter((c) => isCaCity(c.provinceSlug))

  const entries: MetadataRoute.Sitemap = []

  // Province pages (only Ontario is currently seeded in static fallbacks)
  const provinceSlugs = Array.from(new Set(cities.map((c) => c.provinceSlug)))
  for (const provinceSlug of provinceSlugs) {
    entries.push({
      url: `${siteUrl}/ca/${provinceSlug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // City hub pages
  for (const city of cities) {
    entries.push({
      url: `${siteUrl}/ca/${city.provinceSlug}/${city.slug.current}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  }

  return entries
}

function buildCaServicesSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  const services = getFallbackServiceList()

  const entries: MetadataRoute.Sitemap = []

  // Service hub pages
  for (const service of services) {
    entries.push({
      url: `${siteUrl}/services/${service.slug.current}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  }

  // City x Service combinations for CA cities
  const caCities = getFallbackCityList().filter((c) => isCaCity(c.provinceSlug))
  for (const city of caCities) {
    for (const service of services) {
      entries.push({
        url: `${siteUrl}/ca/${city.provinceSlug}/${city.slug.current}/${service.slug.current}/`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    }
  }

  return entries
}

function buildUsCitiesSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  const cities = getFallbackCityList().filter((c) => !isCaCity(c.provinceSlug))

  const entries: MetadataRoute.Sitemap = []

  // State pages
  const stateSlugs = Array.from(new Set(cities.map((c) => c.provinceSlug)))
  for (const stateSlug of stateSlugs) {
    entries.push({
      url: `${siteUrl}/us/${stateSlug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // City hub pages
  for (const city of cities) {
    entries.push({
      url: `${siteUrl}/us/${city.provinceSlug}/${city.slug.current}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  }

  return entries
}

function buildUsServicesSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  const services = getFallbackServiceList()
  const usCities = getFallbackCityList().filter((c) => !isCaCity(c.provinceSlug))

  const entries: MetadataRoute.Sitemap = []

  for (const city of usCities) {
    for (const service of services) {
      entries.push({
        url: `${siteUrl}/us/${city.provinceSlug}/${city.slug.current}/${service.slug.current}/`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    }
  }

  return entries
}

function buildBlogSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  return Object.values(GUIDES).map((guide) => ({
    url: `${siteUrl}/resources/${guide.slug}/`,
    lastModified: guide.publishDate ? new Date(guide.publishDate) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
}

/* ------------------------------------------------------------------ */
/*  Main sitemap function                                             */
/* ------------------------------------------------------------------ */

export default function sitemap({
  id,
}: {
  id: string
}): MetadataRoute.Sitemap {
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
    default:
      return []
  }
}
