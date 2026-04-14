/**
 * Sitemap index - Contract §7.6
 *
 * Aggregates all segmented sitemaps so search engines can discover them
 * through a single entry point. Complements the Next.js `generateSitemaps`
 * output at /sitemap.xml; either can be submitted to Search Console.
 */

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const SEGMENT_SITEMAPS = [
  'sitemap-core.xml',
  'sitemap-ca.xml',
  'sitemap-us.xml',
  'sitemap-resources.xml',
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemapIndex(): string {
  const lastmod = new Date().toISOString()
  const entries = SEGMENT_SITEMAPS.map((segment) => {
    const loc = escapeXml(`${SITE_URL}/${segment}`)
    return `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`
}

export async function GET(_request: NextRequest): Promise<Response> {
  void _request
  const body = buildSitemapIndex()
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
