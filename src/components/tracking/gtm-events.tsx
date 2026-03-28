'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pushEvent } from '@/lib/analytics'

export function ScrollDepthTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const thresholds = [25, 50, 75, 100] as const
    const fired = new Set<number>()

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          pushEvent({ event: 'scroll_depth', page: pathname, depth: threshold })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}
