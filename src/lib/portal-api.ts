/**
 * Client for the portal.revun.com REST API.
 *
 * Endpoints (per MoveSmart Rentals API Documentation):
 *   - POST /api/lead-submit          → lead submission to Zoho CRM
 *   - GET  /api/properties           → paginated property listings
 *   - GET  /api/property/{slug}      → single property + similar properties
 *
 * The base URL is read from `NEXT_PUBLIC_PORTAL_BASE_URL` so it can be
 * overridden in non-production environments. It falls back to the
 * documented production host.
 */

import type {
  Property,
  PropertyListResponse,
  PropertyDetailResponse,
} from '@/types/property'

export const PORTAL_BASE_URL =
  process.env.NEXT_PUBLIC_PORTAL_BASE_URL || 'https://portal.revun.com'

/**
 * Portal hosted auth URLs. Used by header/footer/mobile-nav CTAs.
 * Per the API doc:
 *   - "Create Account" → /register
 *   - "Login"          → /login
 */
export const PORTAL_REGISTER_URL = `${PORTAL_BASE_URL}/register`
export const PORTAL_LOGIN_URL = `${PORTAL_BASE_URL}/login`

/**
 * "List my property" destination. Owners go straight to portal signup
 * (defaulted to the Owner role via `?type=owner`) so they can register /
 * log in and list the property themselves — no inquiry form in between.
 */
export const PORTAL_OWNER_SIGNUP_URL = `${PORTAL_REGISTER_URL}?type=owner`

/**
 * Apply Now: the portal handles auth and restores the original intent after
 * login (see "User Action Flow" in the API doc).
 *
 * It takes the unit's slug. The portal also accepts a CRM id, and did only that
 * until now — which is why one sat in every listing on this site for anyone
 * reading the page source. The slug is the address, and already public.
 *
 * There was a matching helper for booking a showing. Nothing rendered what it
 * built: that button is this site'''s own modal, which works from the unit id and
 * the slots API and never touched the portal.
 */
export function portalReserveOfferUrl(slug: string | number | null | undefined): string | null {
  if (slug == null || slug === '') return null
  return `${PORTAL_BASE_URL}/offer/reserve/${encodeURIComponent(String(slug))}`
}

const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const

// ----------------------------------------------------------------------------
// Lead submit
// ----------------------------------------------------------------------------

export type LeadUserType = 'Owner' | 'Tenant'

export interface LeadSubmitPayload {
  first_name: string
  last_name: string
  email: string
  /** Required by the API in the format `(123) 456-7890`. */
  phone: string
  user_type: LeadUserType
  /** Max 50 chars, e.g. "Website", "Google", "Contact Page". */
  source: string
  property_type?: string
  number_of_units?: string
  city?: string
}

export interface LeadSubmitResult {
  ok: boolean
  status: number
  data?: unknown
  /** Error message extracted from the response body when ok is false. */
  message?: string
}

/**
 * Submit a lead to portal.revun.com. Designed to be invoked from a
 * server-side handler (e.g. our /api/contact route) so the call can be
 * proxied without CORS or recaptcha bypass.
 */
export async function submitLead(
  payload: LeadSubmitPayload,
): Promise<LeadSubmitResult> {
  try {
    const res = await fetch(`${PORTAL_BASE_URL}/api/lead-submit`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(payload),
      // No caching on lead submission.
      cache: 'no-store',
    })

    let parsed: unknown = undefined
    const text = await res.text()
    if (text) {
      try {
        parsed = JSON.parse(text)
      } catch {
        parsed = text
      }
    }

    if (!res.ok) {
      const message =
        (typeof parsed === 'object' &&
          parsed !== null &&
          // Laravel-style { message, errors } payloads
          ('message' in parsed
            ? String((parsed as { message?: unknown }).message ?? '')
            : '')) ||
        `Lead API responded with ${res.status}`
      return { ok: false, status: res.status, data: parsed, message }
    }

    return { ok: true, status: res.status, data: parsed }
  } catch (err) {
    return {
      ok: false,
      status: 0,
      message:
        err instanceof Error
          ? err.message
          : 'Network error contacting lead API',
    }
  }
}

// ----------------------------------------------------------------------------
// Properties
// ----------------------------------------------------------------------------

export interface GetPropertiesOptions {
  page?: number
  /** seconds to cache the listing response; default 5 minutes. */
  revalidate?: number
  /** AbortSignal forwarded to fetch. */
  signal?: AbortSignal
}

/**
 * Fetch the paginated property listing. Returns `null` when the upstream
 * call fails so callers can render an empty state instead of crashing.
 */
export async function getProperties(
  options: GetPropertiesOptions = {},
): Promise<PropertyListResponse | null> {
  const { page, revalidate = 300, signal } = options
  const url = new URL(`${PORTAL_BASE_URL}/api/properties`)
  if (typeof page === 'number' && page > 0) {
    url.searchParams.set('page', String(page))
  }

  try {
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: JSON_HEADERS,
      next: { revalidate },
      signal,
    })

    if (!res.ok) {
      console.warn(
        `[portal-api] getProperties failed: ${res.status} ${res.statusText}`,
      )
      return null
    }

    return (await res.json()) as PropertyListResponse
  } catch (err) {
    console.warn('[portal-api] getProperties threw:', err)
    return null
  }
}

/**
 * Fetch EVERY property across all paginated pages. Used by the
 * `/properties/` browse page so visitors see the entire catalog.
 *
 * Strategy:
 *   1. Fetch page 1 to learn `last_page` (Laravel-style meta).
 *   2. If `last_page` is missing (older API shape), keep fetching
 *      sequential pages until we get an empty `data` array.
 *   3. Cap at MAX_PAGES so we can't burn the request loop on a
 *      misbehaving upstream.
 *
 * Returns whatever properties we managed to gather; never throws.
 */
const MAX_PAGES = 100

export async function getAllProperties(
  options: { revalidate?: number } = {},
): Promise<Property[]> {
  const { revalidate = 300 } = options

  const first = await getProperties({ page: 1, revalidate })
  if (!first || !Array.isArray(first.data)) return []

  const collected: Property[] = [...first.data]
  // Prefer the API's own page count when it tells us.
  const totalPages =
    typeof first.last_page === 'number' && first.last_page > 0
      ? Math.min(first.last_page, MAX_PAGES)
      : MAX_PAGES

  // Fetch remaining pages in small batches to prevent overloading upstream PHP-FPM pool
  if (totalPages > 1) {
    for (let p = 2; p <= totalPages; p += 2) {
      const batch = [getProperties({ page: p, revalidate })]
      if (p + 1 <= totalPages) {
        batch.push(getProperties({ page: p + 1, revalidate }))
      }
      const results = await Promise.all(batch)
      for (const r of results) {
        if (!r || !Array.isArray(r.data) || r.data.length === 0) continue
        collected.push(...r.data)
      }
      if (p + 2 <= totalPages) {
        await new Promise((resolve) => setTimeout(resolve, 80))
      }
    }
  }

  // De-dupe by id (in case the API returns overlapping pages).
  const seen = new Set<number>()
  const unique: Property[] = []
  for (const p of collected) {
    if (!seen.has(p.id)) {
      seen.add(p.id)
      unique.push(p)
    }
  }
  return unique
}

/**
 * Fetch a single property by slug.
 * Returns null ONLY when upstream genuinely returns 404 (property not found).
 * For 5xx errors or network glitches, retries automatically. If it still fails,
 * throws an error so Next.js ISR preserves the existing valid page instead of caching a false 404!
 */
export async function getProperty(
  slug: string,
  options: { revalidate?: number; signal?: AbortSignal } = {},
): Promise<PropertyDetailResponse | null> {
  const { revalidate = 300, signal } = options
  if (!slug) return null

  let lastError: Error | null = null

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(
        `${PORTAL_BASE_URL}/api/property/${encodeURIComponent(slug)}`,
        {
          method: 'GET',
          headers: JSON_HEADERS,
          next: { revalidate },
          signal,
        },
      )

      if (res.status === 404) {
        // Genuine 404 - Property does not exist
        return null
      }

      if (!res.ok) {
        console.warn(
          `[portal-api] getProperty(${slug}) attempt ${attempt + 1} failed: ${res.status} ${res.statusText}`,
        )
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 600))
          continue
        }
        throw new Error(`Upstream portal error ${res.status} fetching property ${slug}`)
      }

      const json = (await res.json()) as PropertyDetailResponse
      if (!json?.status || !json?.data?.unit) {
        console.warn(`[portal-api] getProperty(${slug}) returned invalid data:`, json)
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 600))
          continue
        }
        throw new Error(`Invalid property data payload for ${slug}`)
      }
      return json
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      console.warn(`[portal-api] getProperty(${slug}) attempt ${attempt + 1} error:`, err)
      if (attempt === 0) {
        await new Promise((r) => setTimeout(r, 600))
        continue
      }
    }
  }

  // If we reach here, it failed due to upstream network/5xx error (NOT 404).
  // Throwing ensures Next.js ISR serves the stale valid page instead of caching a false 404!
  throw (lastError || new Error(`Failed to fetch property ${slug} after retries`))
}

/**
 * Fetch a building by one of the specific hardcoded slugs.
 * Falls back to null if it fails or if the slug is not recognized.
 */
export async function getFixedBuildingData(
  slug: string,
  options: { revalidate?: number; signal?: AbortSignal } = {},
): Promise<import('@/types/property').BuildingDetailResponse | null> {
  const { revalidate = 300, signal } = options

  let endpoint = ''
  if (slug === '294-chandler-drive-kitchener-on-n2e-2k1') {
    endpoint = '/api/building-294'
  } else if (slug === '286-chandler-drive-kitchener-on-n2e-3j8') {
    endpoint = '/api/building-286'
  } else {
    return null
  }

  try {
    const res = await fetch(`${PORTAL_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: JSON_HEADERS,
      next: { revalidate },
      signal,
    })

    if (!res.ok) {
      console.warn(`[portal-api] getFixedBuildingData(${endpoint}) failed: ${res.status}`)
      return null
    }

    const json = await res.json()
    if (!json?.status || !json?.data) {
      return null
    }
    return json
  } catch (err) {
    console.warn(`[portal-api] getFixedBuildingData(${endpoint}) threw:`, err)
    return null
  }
}

// ----------------------------------------------------------------------------
// Image URL helper
// ----------------------------------------------------------------------------

/**
 * Resolve a property image reference (string path or media object) to an
 * absolute URL the Next.js Image component can render. Returns null when
 * no image is available.
 */
export function resolvePropertyImage(
  input: string | { file_path?: string | null; external_link?: string | null } | null | undefined,
): string | null {
  if (!input) return null
  if (typeof input === 'string') {
    if (input.startsWith('http://') || input.startsWith('https://')) return input
    if (input.startsWith('/')) return `${PORTAL_BASE_URL}${input}`
    return `${PORTAL_BASE_URL}/${input}`
  }
  if (input.external_link) return input.external_link
  if (input.file_path) {
    const p = input.file_path.startsWith('/')
      ? input.file_path
      : `/storage/${input.file_path}`
    return `${PORTAL_BASE_URL}${p}`
  }
  return null
}
