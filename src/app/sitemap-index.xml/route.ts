/**
 * Sitemap index - Contract §7.6
 *
 * Content-type segmented index (Yoast / Insight Global style). Each child
 * sitemap groups one content type and is generated from typed data modules
 * in src/lib/sitemap/segments.ts. Submit this file to Search Console; it
 * auto-discovers every child sitemap. A branded XSL stylesheet renders the
 * raw XML as a styled page in browsers.
 */
import type { NextRequest } from 'next/server'

import { renderIndex } from '@/lib/sitemap/segments'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET(_request: NextRequest): Promise<Response> {
  void _request
  return new Response(renderIndex(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
