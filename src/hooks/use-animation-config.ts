'use client'

import { useState, useEffect } from 'react'

interface AnimationConfig {
  /** User prefers reduced motion */
  prefersReducedMotion: boolean
  /** Device is mobile/touch */
  isMobile: boolean
  /** Whether to show full animations */
  shouldAnimate: boolean
  /** Parallax multiplier (0 on mobile/reduced, 1 otherwise) */
  parallaxMultiplier: number
  /** Number of gradient mesh blobs to render */
  meshBlobCount: number
  /** Whether to enable canvas-based effects */
  enableCanvasEffects: boolean
  /** Duration multiplier (0.01 for reduced motion) */
  durationMultiplier: number
}

export function useAnimationConfig(): AnimationConfig {
  const [config, setConfig] = useState<AnimationConfig>({
    prefersReducedMotion: false,
    isMobile: false,
    shouldAnimate: true,
    parallaxMultiplier: 1,
    meshBlobCount: 4,
    enableCanvasEffects: true,
    durationMultiplier: 1,
  })

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const prefersReduced = reducedMotion.matches

    setConfig({
      prefersReducedMotion: prefersReduced,
      isMobile,
      shouldAnimate: !prefersReduced,
      parallaxMultiplier: prefersReduced ? 0 : isMobile ? 0.5 : 1,
      meshBlobCount: isMobile ? 2 : 4,
      enableCanvasEffects: !isMobile && !prefersReduced,
      durationMultiplier: prefersReduced ? 0.01 : 1,
    })

    const handleChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        shouldAnimate: !e.matches,
        parallaxMultiplier: e.matches ? 0 : prev.isMobile ? 0.5 : 1,
        durationMultiplier: e.matches ? 0.01 : 1,
        enableCanvasEffects: !prev.isMobile && !e.matches,
      }))
    }

    reducedMotion.addEventListener('change', handleChange)
    return () => reducedMotion.removeEventListener('change', handleChange)
  }, [])

  return config
}
