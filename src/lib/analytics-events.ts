// Centralized GA4 / GTM event registry for MoveSmart Rentals.
// Per contract sections 7.6, 17.5, and 20.15, all events must flow through
// the GTM dataLayer with consistent names and payload shapes. This module is
// the single source of truth; tracking components MUST import from here
// rather than hand-rolling event names or dataLayer pushes.

declare global {
  interface Window {
    // GTM injects this at container load; we defensively initialize.
    dataLayer?: Record<string, unknown>[]
  }
}

export const AnalyticsEvent = {
  ACCOUNT_CREATION_CLICK: 'account_creation_click',
  BOOK_A_CALL_CLICK: 'book_a_call_click',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  SCROLL_DEPTH: 'scroll_depth',
  OUTBOUND_PARTNER_CLICK: 'outbound_partner_click',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  CITY_TO_SERVICE_CTR: 'city_to_service_ctr',
  SERVICE_TO_ACCOUNT_CONVERSION: 'service_to_account_conversion',
} as const

export type AnalyticsEventName = typeof AnalyticsEvent[keyof typeof AnalyticsEvent]

export type AnalyticsPayloadValue = string | number | boolean | undefined

export interface AnalyticsPayload {
  [key: string]: AnalyticsPayloadValue
}

/**
 * SSR-safe push to window.dataLayer. Initializes dataLayer if GTM has not
 * loaded yet so that early events are not lost.
 */
export function pushDataLayerEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...payload,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Detects whether the supplied pathname represents a service page. Supports
 * both the flat `/services/{slug}/` pattern and the localized
 * `/{country}/{province}/{city}/{service}/` pattern used by the city pages.
 */
export function isServicePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  if (pathname.includes('/services/')) return true
  return /^\/(ca|us)\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname)
}

/**
 * Detects whether the supplied pathname represents a city landing page.
 * A city page is `/{country}/{province}/{city}/` with no trailing service segment.
 */
export function isCityPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return /^\/(ca|us)\/[^/]+\/[^/]+\/?$/.test(pathname)
}

/**
 * Parses `/{country}/{province}/{city}/` into its components. Returns null
 * if the pathname does not match.
 */
export function parseCityPath(
  pathname: string | null | undefined,
): { country: string; province: string; city: string } | null {
  if (!pathname) return null
  const match = pathname.match(/^\/(ca|us)\/([^/]+)\/([^/]+)\/?$/)
  if (!match) return null
  return { country: match[1], province: match[2], city: match[3] }
}

export type CTAType = 'account_creation' | 'book_a_call'

/**
 * Fires the primary CTA click event. `account_creation` maps to
 * ACCOUNT_CREATION_CLICK; `book_a_call` maps to BOOK_A_CALL_CLICK. When the
 * CTA is an account_creation click on a service page, also emits the
 * SERVICE_TO_ACCOUNT_CONVERSION funnel event.
 */
export function trackCTA(type: CTAType, payload: AnalyticsPayload = {}): void {
  if (type === 'account_creation') {
    pushDataLayerEvent(AnalyticsEvent.ACCOUNT_CREATION_CLICK, payload)
    const page = typeof payload.page === 'string' ? payload.page : undefined
    if (isServicePath(page)) {
      pushDataLayerEvent(AnalyticsEvent.SERVICE_TO_ACCOUNT_CONVERSION, {
        page: payload.page,
        service: payload.service,
        city: payload.city,
      })
    }
    return
  }
  pushDataLayerEvent(AnalyticsEvent.BOOK_A_CALL_CLICK, payload)
}

export function trackFormSubmit(
  formType: string,
  payload: AnalyticsPayload = {},
): void {
  pushDataLayerEvent(AnalyticsEvent.CONTACT_FORM_SUBMIT, {
    form_type: formType,
    ...payload,
  })
}

const SITE_HOSTS = ['movesmartrentals.com', 'www.movesmartrentals.com']

export function isOutboundHref(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false
  try {
    const url = new URL(href)
    return !SITE_HOSTS.includes(url.hostname.toLowerCase())
  } catch {
    return false
  }
}

export function getPartnerDomain(href: string): string | undefined {
  try {
    return new URL(href).hostname.toLowerCase()
  } catch {
    return undefined
  }
}

export function trackOutbound(
  href: string,
  payload: AnalyticsPayload = {},
): void {
  pushDataLayerEvent(AnalyticsEvent.OUTBOUND_PARTNER_CLICK, {
    href,
    partner_domain: getPartnerDomain(href),
    ...payload,
  })
}

export function trackPhoneClick(
  phoneNumber: string,
  payload: AnalyticsPayload = {},
): void {
  pushDataLayerEvent(AnalyticsEvent.PHONE_CLICK, {
    phone_number: phoneNumber,
    ...payload,
  })
}

export function trackEmailClick(
  emailAddress: string,
  payload: AnalyticsPayload = {},
): void {
  pushDataLayerEvent(AnalyticsEvent.EMAIL_CLICK, {
    email_address: emailAddress,
    ...payload,
  })
}

export function trackCityToService(payload: {
  source_city: string
  source_province: string
  target_service: string
  page: string
}): void {
  pushDataLayerEvent(AnalyticsEvent.CITY_TO_SERVICE_CTR, payload)
}

export function trackScrollDepth(
  depthPct: 25 | 50 | 75 | 100,
  page: string,
): void {
  pushDataLayerEvent(AnalyticsEvent.SCROLL_DEPTH, {
    page,
    depth_pct: depthPct,
    milestone: `${depthPct}%`,
  })
}
