import type { MetadataRoute } from 'next'
import {
  getFallbackCityList,
  getFallbackServiceList,
} from '@/lib/static-fallbacks'
import { GUIDES } from '@/data/guides'
import { TEAM } from '@/data/team'
import { ROLES } from '@/data/careers'
import { SILO_SERVICE_SLUGS } from '@/data/silo-services'
import { SILO_INDUSTRY_SLUGS } from '@/data/silo-industries'
import { SILO_LOCATION_SLUGS } from '@/data/silo-locations'
import { SILO_RESOURCE_SLUGS } from '@/data/silo-resources'
import { FLAT_PAGES, SILO_BLOGS } from '@/lib/silo'

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
    { id: 'silo' },
    { id: 'local-authority' },
    { id: 'local-authority-blog' },
  ]
}

function buildSiloSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  entries.push({
    url: `${siteUrl}/industries/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })

  for (const slug of SILO_SERVICE_SLUGS) {
    entries.push({
      url: `${siteUrl}/services/${slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  for (const slug of SILO_INDUSTRY_SLUGS) {
    entries.push({
      url: `${siteUrl}/industries/${slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  for (const slug of SILO_LOCATION_SLUGS) {
    entries.push({
      url: `${siteUrl}/locations/${slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  for (const slug of SILO_RESOURCE_SLUGS) {
    entries.push({
      url: `${siteUrl}/resources/${slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })
  }

  return entries
}

/* ------------------------------------------------------------------ */
/*  Country partitioning                                              */
/* ------------------------------------------------------------------ */

/**
 * getFallbackCityList() returns a flat list of cities with `provinceSlug`
 * but no country discriminator. We enumerate all 6 priority CA provinces
 * here so the sitemap correctly partitions CA vs US cities.
 */
const CA_PROVINCE_SLUGS = new Set([
  'ontario',
  'quebec',
  'british-columbia',
  'alberta',
  'manitoba',
  'nova-scotia',
])

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
    // /resources/ hub URL intentionally omitted from the sitemap per
    // client direction (June 2026). The page still resolves by direct
    // URL but is no longer surfaced in nav or sitemap.
    { url: `${siteUrl}/franchising/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${siteUrl}/about/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.55 },
    ...TEAM.map((m) => ({
      url: `${siteUrl}/about/team/${m.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.45,
    })),
    { url: `${siteUrl}/careers/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 },
    ...ROLES.map((r) => ({
      url: `${siteUrl}/careers/${r.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.55,
    })),
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
    case 'silo':
      return buildSiloSegment()
    case 'local-authority':
      return buildLocalAuthoritySegment()
    case 'local-authority-blog':
      return buildLocalAuthorityBlogSegment()
    default:
      return []
  }
}

/* ------------------------------------------------------------------ */
/*  Local Authority Silo (3,432 additive pages)                        */
/* ------------------------------------------------------------------ */

function buildLocalAuthoritySegment(): MetadataRoute.Sitemap {
  const now = new Date()
  return FLAT_PAGES.map((p) => ({
    url: `${siteUrl}${p.url}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p.type === 'city_hub' ? 0.7 : 0.6,
  }))
}

function buildLocalAuthorityBlogSegment(): MetadataRoute.Sitemap {
  const now = new Date()
  return SILO_BLOGS.map((p) => ({
    url: `${siteUrl}${p.url}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
}
