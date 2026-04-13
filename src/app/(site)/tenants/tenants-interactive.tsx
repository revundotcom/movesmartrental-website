'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * ZigzagStep - alternating left/right numbered editorial row
 * Even index → slideFromLeft; odd → mirrored slideFromRight.
 * ──────────────────────────────────────────────────────────────────────── */
export function ZigzagStep({
  index,
  children,
  className,
}: {
  index: number
  children: ReactNode
  className?: string
}) {
  const fromLeft = index % 2 === 0
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ x: fromLeft ? -60 : 60, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: fromLeft ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * FeeTableRow - slideUp row for transparent fee table, staggered
 * ──────────────────────────────────────────────────────────────────────── */
export function FeeTableRow({
  index,
  children,
  className,
}: {
  index: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * PullQuoteReveal - blur-in serif testimonial
 * ──────────────────────────────────────────────────────────────────────── */
export function PullQuoteReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.blockquote
      ref={ref}
      initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
      animate={
        inView
          ? { y: 0, opacity: 1, filter: 'blur(0px)' }
          : { y: -20, opacity: 0, filter: 'blur(10px)' }
      }
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.blockquote>
  )
}
