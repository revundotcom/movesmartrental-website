/**
 * services sitemap segment. Generated from typed data modules via
 * src/lib/sitemap/segments.ts. See sitemap-index.xml for the index.
 */
import type { NextRequest } from 'next/server'

import { buildServices, urlsetResponse } from '@/lib/sitemap/segments'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET(_request: NextRequest): Promise<Response> {
  void _request
  return urlsetResponse(buildServices())
}
