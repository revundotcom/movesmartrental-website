'use client'

import { useRef } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

interface ParallaxOptions {
  /** Speed multiplier. 0.5 = half scroll speed (recedes), -0.5 = opposite direction. Default 0.5 */
  speed?: number
  /** Scroll offset range. Default ["start end", "end start"] */
  offset?: [string, string]
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLElement | null>
  y: MotionValue<number>
  opacity: MotionValue<number>
}

export function useParallax(options: ParallaxOptions = {}): ParallaxReturn {
  const { speed = 0.5, offset = ['start end', 'end start'] } = options
  const ref = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as unknown as ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return { ref, y, opacity }
}
