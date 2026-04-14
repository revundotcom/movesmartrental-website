/**
 * US sitemap - Contract §7.6
 *
 * US hub, state pages, tier-1 cities (from data file if present, or inline
 * fallback list), and city-service combos where those templates exist.
 */

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

type ChangeFreq = 'weekly' | 'monthly' | 'yearly'

interface UrlEntry {
  path: string
  changefreq: ChangeFreq
  priority: number
}

// 10 expansion states (inline fallback if no data file)
const US_STATES: string[] = [
  'california',
  'texas',
  'florida',
  'new-york',
  'illinois',
  'arizona',
  'georgia',
  'washington',
  'massachusetts',
  'north-carolina',
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

interface TierCity {
  slug: string
  state?: string
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
      const state = typeof rec.state === 'string' ? rec.state : undefined
      if (slug) out.push({ slug, state })
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

  // US hub
  entries.push({ path: '/us/', changefreq: 'weekly', priority: 0.85 })

  // State hubs
  for (const state of US_STATES) {
    entries.push({
      path: `/us/${state}/`,
      changefreq: 'weekly',
      priority: 0.75,
    })
  }

  // Tier-1 US cities (graceful - data file may not exist yet)
  const tier1 = await loadOptionalCities(
    '@/data/us-cities-tier1',
    'tier1Cities',
  )

  if (tier1.length > 0) {
    for (const c of tier1) {
      const state = c.state ?? US_STATES[0]
      entries.push({
        path: `/us/${state}/${c.slug}/`,
        changefreq: 'weekly',
        priority: 0.7,
      })
      for (const service of SERVICE_COMBOS) {
        entries.push({
          path: `/us/${state}/${c.slug}/${service}/`,
          changefreq: 'monthly',
          priority: 0.6,
        })
      }
    }
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
