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
 * Property-interaction deep links. The portal handles auth + restores
 * the original intent after login (see "User Action Flow" in the API doc).
 * Both helpers require the unit's `zcrm_id` returned by the listing /
 * detail APIs.
 */
export function portalShowingScheduleUrl(zcrmId: string | number | null | undefined): string | null {
  if (zcrmId == null || zcrmId === '') return null
  return `${PORTAL_BASE_URL}/showing/schedule/${encodeURIComponent(String(zcrmId))}`
}

export function portalReserveOfferUrl(zcrmId: string | number | null | undefined): string | null {
  if (zcrmId == null || zcrmId === '') return null
  return `${PORTAL_BASE_URL}/offer/reserve/${encodeURIComponent(String(zcrmId))}`
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
 * Fetch a single property by slug. Returns `null` for 404/network
 * failures so the caller can call `notFound()` cleanly.
 */
export async function getProperty(
  slug: string,
  options: { revalidate?: number; signal?: AbortSignal } = {},
): Promise<PropertyDetailResponse | null> {
  const { revalidate = 300, signal } = options
  if (!slug) return null

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

    if (res.status === 404) return null
    if (!res.ok) {
      console.warn(
        `[portal-api] getProperty(${slug}) failed: ${res.status} ${res.statusText}`,
      )
      return null
    }

    const json = (await res.json()) as PropertyDetailResponse
    if (!json?.status || !json?.data?.unit) return null
    return json
  } catch (err) {
    console.warn(`[portal-api] getProperty(${slug}) threw:`, err)
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
