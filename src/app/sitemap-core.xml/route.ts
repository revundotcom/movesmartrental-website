/**
 * Core commercial sitemap - Contract §7.6
 *
 * Static, high-priority commercial pages that rarely change:
 * home, owners, tenants, services hub + 9 service pages, locations,
 * pricing, resources hub, franchising, about, contact, FAQ, reviews,
 * portal-and-technology, privacy, terms.
 */

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

interface UrlEntry {
  path: string
  changefreq: ChangeFreq
  priority: number
}

const SERVICE_SLUGS = [
  'tenant-placement',
  'leasing-services',
  'tenant-screening',
  'rent-guarantee',
  'tenant-insurance',
  'tenant-guarantor',
  'rental-preparation',
  'portal-and-technology',
  'move-in-coordination',
]

const CORE_URLS: UrlEntry[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/owners/', changefreq: 'weekly', priority: 0.95 },
  { path: '/tenants/', changefreq: 'weekly', priority: 0.9 },
  { path: '/services/', changefreq: 'weekly', priority: 0.85 },
  ...SERVICE_SLUGS.map<UrlEntry>((slug) => ({
    path: `/services/${slug}/`,
    changefreq: 'weekly',
    priority: 0.8,
  })),
  { path: '/locations/', changefreq: 'weekly', priority: 0.8 },
  { path: '/pricing/', changefreq: 'monthly', priority: 0.8 },
  { path: '/resources/', changefreq: 'weekly', priority: 0.75 },
  { path: '/franchising/', changefreq: 'monthly', priority: 0.7 },
  { path: '/about/', changefreq: 'monthly', priority: 0.6 },
  { path: '/contact/', changefreq: 'monthly', priority: 0.7 },
  { path: '/faq/', changefreq: 'weekly', priority: 0.7 },
  { path: '/reviews/', changefreq: 'monthly', priority: 0.65 },
  { path: '/portal-and-technology/', changefreq: 'monthly', priority: 0.7 },
  { path: '/privacy/', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms/', changefreq: 'yearly', priority: 0.3 },
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

export async function GET(_request: NextRequest): Promise<Response> {
  void _request
  const body = buildUrlsetXml(CORE_URLS)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
