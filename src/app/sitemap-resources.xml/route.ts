/**
 * Resources sitemap - Contract §7.6
 *
 * Resources hub + long-form guides, comparisons, case studies, templates.
 * Uses a known baseline list of guide slugs - safe to render even before
 * CMS entries exist because the underlying routes are either live or will
 * be live shortly and Search Console tolerates 404s gracefully until crawl.
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

const RESOURCE_GUIDE_SLUGS = [
  'tenant-screening-guide',
  'rental-market-guide',
  'eviction-guide',
  'how-to-price-your-rental',
  'how-to-avoid-bad-tenants',
  'landlord-faq',
  'tenant-faq',
  'lease-up-playbook',
  'institutional-rfp-template',
  'rent-guarantee-101',
  'tenant-insurance-by-province',
  'moving-day-coordination',
]

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

function buildEntries(): UrlEntry[] {
  const entries: UrlEntry[] = []

  entries.push({
    path: '/resources/',
    changefreq: 'weekly',
    priority: 0.8,
  })

  for (const slug of RESOURCE_GUIDE_SLUGS) {
    entries.push({
      path: `/resources/${slug}/`,
      changefreq: 'monthly',
      priority: 0.65,
    })
  }

  return entries
}

export async function GET(_request: NextRequest): Promise<Response> {
  void _request
  const entries = buildEntries()
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
