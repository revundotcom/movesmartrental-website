/**
 * Canada sitemap - Contract §7.6
 *
 * Canada hub, provinces, cities (tier-1 enumerated inline, tier-2/3 loaded
 * from data files if present), per-city service combos, and per-city guides.
 *
 * Graceful: tier-2/3 data files may not yet exist. Dynamic imports wrapped
 * so sitemap never crashes.
 */

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

type ChangeFreq = 'weekly' | 'monthly' | 'yearly' | 'daily'

interface UrlEntry {
  path: string
  changefreq: ChangeFreq
  priority: number
}

const PROVINCE_SLUGS = [
  'ontario',
  'quebec',
  'british-columbia',
  'alberta',
  'nova-scotia',
]

// Tier-1 Ontario cities per contract spec
const TIER1_ON_CITIES: string[] = [
  'toronto',
  'mississauga',
  'brampton',
  'hamilton',
  'ottawa',
  'london',
  'vaughan',
  'markham',
  'richmond-hill',
  'oakville',
  'burlington',
  'kitchener',
  'waterloo',
  'cambridge',
  'guelph',
  'barrie',
  'milton',
  'oshawa',
  'ajax',
  'pickering',
]

const SERVICE_COMBOS = [
  'tenant-placement',
  'leasing-services',
  'tenant-screening',
  'rent-guarantee',
  'tenant-insurance',
  'tenant-guarantor',
  'rental-preparation',
  'portal-and-technology',
]

const CITY_GUIDE_SLUGS = [
  'how-to-find-tenants',
  'tenant-screening-guide',
  'rental-market-guide',
  'eviction-guide',
  'how-to-price-your-rental',
  'how-to-avoid-bad-tenants',
  'landlord-faq',
  'tenant-faq',
]

interface TierCity {
  slug: string
  province?: string
}

async function loadOptionalCities(
  modulePath: string,
  exportName: string,
): Promise<TierCity[]> {
  try {
    const mod: Record<string, unknown> = await import(
      /* webpackIgnore: true */ modulePath
    ).catch(() => ({}))
    const raw = mod[exportName]
    if (!Array.isArray(raw)) return []
    const out: TierCity[] = []
    for (const item of raw) {
      if (!item || typeof item !== 'object') continue
      const rec = item as Record<string, unknown>
      const slug = typeof rec.slug === 'string' ? rec.slug : undefined
      const province =
        typeof rec.province === 'string' ? rec.province : undefined
      if (slug) out.push({ slug, province })
    }
    return out
  } catch {
    return []
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildUrlsetXml(entries: UrlEntry[]): string {
  const lastmod = new Date().toISOString()
  const body = entries
    .map((entry) => {
      const loc = escapeXml(`${SITE_URL}${entry.path}`)
      return (
        `  <url>\n` +
        `    <loc>${loc}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n` +
        `    <priority>${entry.priority.toFixed(2)}</priority>\n` +
        `  </url>`
      )
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

async function buildEntries(): Promise<UrlEntry[]> {
  const entries: UrlEntry[] = []

  // Canada hub
  entries.push({ path: '/ca/', changefreq: 'weekly', priority: 0.9 })

  // Province hubs
  for (const province of PROVINCE_SLUGS) {
    entries.push({
      path: `/ca/${province}/`,
      changefreq: 'weekly',
      priority: 0.8,
    })
  }

  // Tier-1 Ontario cities + service combos + guides
  for (const citySlug of TIER1_ON_CITIES) {
    entries.push({
      path: `/ca/ontario/${citySlug}/`,
      changefreq: 'weekly',
      priority: 0.85,
    })
    for (const service of SERVICE_COMBOS) {
      entries.push({
        path: `/ca/ontario/${citySlug}/${service}/`,
        changefreq: 'weekly',
        priority: 0.75,
      })
    }
    for (const guide of CITY_GUIDE_SLUGS) {
      entries.push({
        path: `/ca/ontario/${citySlug}/guides/${guide}/`,
        changefreq: 'monthly',
        priority: 0.6,
      })
    }
  }

  // Tier-2 cities (graceful - may not exist yet)
  const tier2 = await loadOptionalCities(
    '@/data/ontario-cities-tier2',
    'tier2Cities',
  )
  for (const c of tier2) {
    const province = c.province ?? 'ontario'
    entries.push({
      path: `/ca/${province}/${c.slug}/`,
      changefreq: 'weekly',
      priority: 0.7,
    })
    for (const service of SERVICE_COMBOS) {
      entries.push({
        path: `/ca/${province}/${c.slug}/${service}/`,
        changefreq: 'monthly',
        priority: 0.55,
      })
    }
  }

  // Tier-3 cities (graceful)
  const tier3 = await loadOptionalCities(
    '@/data/ontario-cities-tier3',
    'tier3Cities',
  )
  for (const c of tier3) {
    const province = c.province ?? 'ontario'
    entries.push({
      path: `/ca/${province}/${c.slug}/`,
      changefreq: 'monthly',
      priority: 0.5,
    })
  }

  return entries
}

export async function GET(_request: NextRequest): Promise<Response> {
  void _request
  const entries = await buildEntries()
  const body = buildUrlsetXml(entries)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
