'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackOutboundClick, trackPhoneClick, trackEmailClick, pushEvent } from '@/lib/analytics'

export function LinkTracker() {
  const pathname = usePathname()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href) return

      // Outbound links
      if (href.startsWith('http') && !href.includes('movesmartrentals.com')) {
        trackOutboundClick(href, target.textContent?.trim() || '')
      }

      // Phone links
      if (href.startsWith('tel:')) {
        trackPhoneClick(href.replace('tel:', ''))
      }

      // Email links
      if (href.startsWith('mailto:')) {
        trackEmailClick(href.replace('mailto:', ''))
      }

      // City-to-service navigation (detect /ca/{province}/{city}/{service}/ or /us/ pattern)
      const cityServiceMatch = href.match(/\/(ca|us)\/[^/]+\/([^/]+)\/([^/]+)\/?$/)
      if (cityServiceMatch) {
        pushEvent({
          event: 'city_to_service_ctr',
          page: pathname,
          city: cityServiceMatch[2],
          service: cityServiceMatch[3],
        })
      }
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return null
}
