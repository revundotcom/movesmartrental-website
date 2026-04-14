'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackScrollDepth } from '@/lib/analytics-events'

/**
 * ScrollDepthTracker fires `scroll_depth` dataLayer events as the visitor
 * crosses 25%, 50%, 75%, and 100% of the document. Each threshold fires at
 * most once per page load; the internal `fired` set resets when the
 * pathname changes (Next.js client transitions).
 *
 * This component is preserved here for backward compatibility with existing
 * root layout imports. The canonical implementation now lives in
 * `./scroll-depth-tracker.tsx`; both components share the same behavior via
 * `trackScrollDepth` from the central events registry.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const thresholds: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100]
    const fired = new Set<number>()

    function handleScroll() {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          trackScrollDepth(threshold, pathname || '')
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Fire once in case the page is already scrolled (deep link / back nav).
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}
