'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackScrollDepth } from '@/lib/analytics-events'

/**
 * Standalone scroll depth tracker (contract §17.5). Mount once per page tree.
 *
 * Behavior:
 *  - Fires `scroll_depth` at 25%, 50%, 75%, 100% thresholds.
 *  - Each threshold fires at most once per page load.
 *  - Uses a throttled (rAF) scroll listener backed by a passive event to
 *    minimize layout thrash; falls back to a direct measurement on mount
 *    so deep links into already-scrolled pages still record the current
 *    depth.
 *  - Resets its internal fired set whenever the Next.js pathname changes.
 *
 * NOTE: This component must be mounted in the root layout. The project's
 * current root layout (`src/app/layout.tsx`) imports
 * `ScrollDepthTracker` from `@/components/tracking/gtm-events`; swap that
 * import to `@/components/tracking/scroll-depth-tracker` to adopt this
 * standalone file.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const thresholds: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100]
    const fired = new Set<number>()
    let ticking = false

    function measure() {
      ticking = false
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

    function handleScroll() {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(measure)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial measurement captures deep-link / restored scroll positions.
    measure()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}
