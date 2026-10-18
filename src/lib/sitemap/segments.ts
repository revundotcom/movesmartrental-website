/**
 * Content-type sitemap segments (Yoast / Insight Global style).
 *
 * Single source of truth for the segmented XML sitemap. Each segment is
 * generated from the same typed data modules the pages are built from, so
 * adding a city / service / industry / guide automatically flows into the
 * correct sitemap. Scales by content type; pagination kicks in via
 * `paginate()` if any single segment ever approaches the 50k URL limit.
 */
import { SILO_SERVICE_SLUGS } from '@/data/silo-services'
import { SILO_INDUSTRY_SLUGS } from '@/data/silo-industries'
import { SILO_LOCATION_SLUGS } from '@/data/silo-locations'
import { FLAT_PAGES, SILO_BLOGS } from '@/lib/silo'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

/** Stylesheet that renders the raw XML as a styled page in browsers. */
export const XSL_HREF = '/sitemap.xsl'

/** Sitemaps.org soft limit is 50,000 URLs / file. Split well before that. */
export const MAX_URLS_PER_FILE = 5000

export type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export interface UrlEntry {
  path: string
  changefreq: ChangeFreq
  priority: number
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/* ---------------------------------------------------------------- */
/*  Segment builders (pull from the same typed data the pages use)  */
/* ---------------------------------------------------------------- */

const LEGACY_SERVICE_SLUGS = [
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

export function buildPages(): UrlEntry[] {
  return [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/owners/', changefreq: 'weekly', priority: 0.95 },
    { path: '/tenants/', changefreq: 'weekly', priority: 0.9 },
    { path: '/pricing/', changefreq: 'monthly', priority: 0.8 },
    { path: '/franchising/', changefreq: 'monthly', priority: 0.7 },
    { path: '/about/', changefreq: 'monthly', priority: 0.6 },
    { path: '/contact/', changefreq: 'monthly', priority: 0.7 },
    { path: '/faq/', changefreq: 'weekly', priority: 0.7 },
    { path: '/reviews/', changefreq: 'monthly', priority: 0.65 },
    { path: '/portal-and-technology/', changefreq: 'monthly', priority: 0.7 },
    { path: '/ca/', changefreq: 'weekly', priority: 0.8 },
    { path: '/us/', changefreq: 'weekly', priority: 0.8 },
    { path: '/privacy/', changefreq: 'yearly', priority: 0.3 },
    { path: '/terms/', changefreq: 'yearly', priority: 0.3 },
  ]
}

export function buildServices(): UrlEntry[] {
  const slugs = Array.from(
    new Set([...LEGACY_SERVICE_SLUGS, ...SILO_SERVICE_SLUGS]),
  )
  return [
    { path: '/services/', changefreq: 'weekly', priority: 0.85 },
    ...slugs.map<UrlEntry>((s) => ({
      path: `/services/${s}/`,
      changefreq: 'weekly',
      priority: 0.8,
    })),
  ]
}

export function buildIndustries(): UrlEntry[] {
  return [
    { path: '/industries/', changefreq: 'weekly', priority: 0.8 },
    ...SILO_INDUSTRY_SLUGS.map<UrlEntry>((s) => ({
      path: `/industries/${s}/`,
      changefreq: 'weekly',
      priority: 0.7,
    })),
  ]
}

export function buildLocations(): UrlEntry[] {
  return [
    { path: '/locations/', changefreq: 'weekly', priority: 0.8 },
    ...SILO_LOCATION_SLUGS.map<UrlEntry>((s) => ({
      path: `/locations/${s}/`,
      changefreq: 'weekly',
      priority: 0.75,
    })),
  ]
}

export function buildCityService(): UrlEntry[] {
  return FLAT_PAGES.map<UrlEntry>((p) => ({
    path: `${p.url}/`,
    changefreq: 'weekly',
    priority: p.type === 'city_hub' ? 0.7 : 0.6,
  }))
}

export function buildBlog(): UrlEntry[] {
  return SILO_BLOGS.map<UrlEntry>((p) => ({
    path: `${p.url}/`,
    changefreq: 'monthly',
    priority: 0.5,
  }))
}

/* ---------------------------------------------------------------- */
/*  Segment registry                                                */
/* ---------------------------------------------------------------- */

export interface SegmentDef {
  filename: string
  label: string
  /** Builders own their URLs. `null` = served by a pre-existing route. */
  build: (() => UrlEntry[]) | null
}

/** Order shown in the sitemap index. */
export const SEGMENTS: SegmentDef[] = [
  { filename: 'sitemap-pages.xml', label: 'Pages', build: buildPages },
  { filename: 'sitemap-services.xml', label: 'Services', build: buildServices },
  {
    filename: 'sitemap-industries.xml',
    label: 'Industries',
    build: buildIndustries,
  },
  {
    filename: 'sitemap-locations.xml',
    label: 'Locations',
    build: buildLocations,
  },
  { filename: 'sitemap-ca.xml', label: 'Canada', build: null },
  { filename: 'sitemap-us.xml', label: 'United States', build: null },
  {
    filename: 'sitemap-resources.xml',
    label: 'Resources & Guides',
    build: null,
  },
  {
    filename: 'sitemap-city-service.xml',
    label: 'City + Service',
    build: buildCityService,
  },
  { filename: 'sitemap-blog.xml', label: 'Local Guides', build: buildBlog },
]

/* ---------------------------------------------------------------- */
/*  Renderers                                                       */
/* ---------------------------------------------------------------- */

const XML_HEADER =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<?xml-stylesheet type="text/xsl" href="${XSL_HREF}"?>\n`

export function renderUrlset(entries: UrlEntry[]): string {
  const lastmod = new Date().toISOString()
  const body = entries
    .map((e) => {
      const loc = escapeXml(`${SITE_URL}${e.path}`)
      return (
        `  <url>\n` +
        `    <loc>${loc}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority.toFixed(2)}</priority>\n` +
        `  </url>`
      )
    })
    .join('\n')
  return `${XML_HEADER}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

export function renderIndex(): string {
  const lastmod = new Date().toISOString()
  const entries = SEGMENTS.map((s) => {
    const loc = escapeXml(`${SITE_URL}/${s.filename}`)
    return `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`
  }).join('\n')
  return `${XML_HEADER}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`
}

const RESPONSE_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control':
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
}

/** Thin helper for segment route handlers. */
export function urlsetResponse(entries: UrlEntry[]): Response {
  return new Response(renderUrlset(entries), {
    status: 200,
    headers: RESPONSE_HEADERS,
  })
}
