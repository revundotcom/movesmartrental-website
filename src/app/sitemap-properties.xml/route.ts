/**
 * Properties sitemap - Dynamic listing of all active properties and building hubs.
 * Fetches live listings from the portal API on a revalidated schedule.
 */

import type { NextRequest } from 'next/server'
import { getAllProperties } from '@/lib/portal-api'

export const revalidate = 43200 // Cache for 12 hours to avoid spamming portal API

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const FIXED_BUILDING_SLUGS = [
  'chandler-drive-kitchener-on',
  '200-old-carriage-drive-kitchener-on',
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(_request: NextRequest): Promise<Response> {
  void _request

  const nowIso = new Date().toISOString()
  const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = []

  // 1. Add fixed building landing pages
  for (const slug of FIXED_BUILDING_SLUGS) {
    entries.push({
      url: `${SITE_URL}/properties/${slug}/`,
      lastmod: nowIso,
      changefreq: 'weekly',
      priority: 0.85,
    })
  }

  // 2. Add all dynamic rental properties from the portal API
  try {
    const properties = await getAllProperties({ revalidate: 1800 })
    for (const p of properties) {
      if (!p.slug) continue
      const lastmod = p.updated_at
        ? new Date(p.updated_at).toISOString()
        : p.created_at
          ? new Date(p.created_at).toISOString()
          : nowIso

      entries.push({
        url: `${SITE_URL}/properties/${p.slug}/`,
        lastmod,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  } catch (err) {
    console.warn('[sitemap-properties] Failed to fetch properties for sitemap:', err)
  }

  const xmlEntries = entries
    .map((e) => {
      const loc = escapeXml(e.url)
      return (
        `  <url>\n` +
        `    <loc>${loc}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority.toFixed(2)}</priority>\n` +
        `  </url>`
      )
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>\n`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400',
    },
  })
}
