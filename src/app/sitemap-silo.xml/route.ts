/**
 * Local Authority Silo sitemap.
 *
 * Emits all city hub, service in city, and supporting blog URLs produced
 * by the silo bundle at src/lib/silo/content.json. Additive only — existing
 * /ca/{prov}/{city} and /us/{state}/{city} URLs are emitted by sitemap-ca
 * and sitemap-us and are preserved.
 */

import type { NextRequest } from 'next/server'

import { FLAT_PAGES, SILO_BLOGS } from '@/lib/silo'

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

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildUrlEntry(
  path: string,
  changefreq: ChangeFreq,
  priority: number,
  lastmod: string,
): string {
  const loc = escapeXml(`${SITE_URL}${path}`)
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n')
}

function buildSitemap(): string {
  const lastmod = new Date().toISOString()
  const entries: string[] = []

  for (const p of FLAT_PAGES) {
    entries.push(
      buildUrlEntry(
        `${p.url}/`,
        'weekly',
        p.type === 'city_hub' ? 0.7 : 0.6,
        lastmod,
      ),
    )
  }

  for (const p of SILO_BLOGS) {
    entries.push(buildUrlEntry(`${p.url}/`, 'monthly', 0.5, lastmod))
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.join('\n'),
    '</urlset>',
    '',
  ].join('\n')
}

export async function GET(_request: NextRequest): Promise<Response> {
  void _request
  const body = buildSitemap()
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
