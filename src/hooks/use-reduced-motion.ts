'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useAnimationConfig() {
  const shouldReduce = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return {
    shouldAnimate: !shouldReduce,
    isMobile,
    enableParallax: !shouldReduce && !isMobile,
    enableMagnetic: !shouldReduce && !isMobile,
    enableMesh: !shouldReduce,
    meshBlobCount: isMobile ? 2 : 4,
    parallaxSpeed: isMobile ? 0.25 : 0.5,
  }
}
