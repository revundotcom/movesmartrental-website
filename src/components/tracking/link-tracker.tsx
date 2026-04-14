'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  isOutboundHref,
  isCityPath,
  parseCityPath,
  trackCityToService,
  trackEmailClick,
  trackOutbound,
  trackPhoneClick,
} from '@/lib/analytics-events'

/**
 * LinkTracker attaches a single delegated click listener to the document
 * and routes qualifying clicks to the appropriate analytics event:
 *  - tel:        -> PHONE_CLICK
 *  - mailto:     -> EMAIL_CLICK
 *  - external    -> OUTBOUND_PARTNER_CLICK (non-movesmartrentals.com hosts)
 *  - city -> svc -> CITY_TO_SERVICE_CTR (city page linking to a service URL)
 */
export function LinkTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof document === 'undefined') return

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      const linkText = anchor.textContent?.trim() || ''
      const partnerName =
        anchor.getAttribute('data-partner-name') || linkText || undefined
      const section = anchor.getAttribute('data-section') || undefined

      if (href.startsWith('tel:')) {
        trackPhoneClick(href.replace('tel:', ''), {
          page: pathname,
          section,
        })
        return
      }

      if (href.startsWith('mailto:')) {
        trackEmailClick(href.replace('mailto:', ''), {
          page: pathname,
          section,
        })
        return
      }

      if (isOutboundHref(href)) {
        trackOutbound(href, {
          page: pathname,
          partner_name: partnerName,
        })
        return
      }

      // City -> Service CTR: fires only when the current page is a city page
      // AND the destination matches either the flat /services/{slug}/ route
      // or the localized /{country}/{prov}/{city}/{service}/ route.
      if (isCityPath(pathname)) {
        const flatMatch = href.match(/^\/services\/([^/?#]+)\/?/)
        const localizedMatch = href.match(
          /^\/(ca|us)\/([^/]+)\/([^/]+)\/([^/]+)\/?$/,
        )
        const cityCtx = parseCityPath(pathname)
        if (cityCtx && (flatMatch || localizedMatch)) {
          const targetService = flatMatch
            ? flatMatch[1]
            : localizedMatch
              ? localizedMatch[4]
              : ''
          if (targetService) {
            trackCityToService({
              source_city: cityCtx.city,
              source_province: cityCtx.province,
              target_service: targetService,
              page: pathname || '',
            })
          }
        }
      }
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return null
}
