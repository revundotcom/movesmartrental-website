'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  /** Override stagger delay in seconds. Default 0.12 */
  stagger?: number
}

export function RevealOnScroll({ children, className, stagger = 0.12 }: RevealOnScrollProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const variants =
    stagger === 0.12
      ? containerVariants
      : {
          hidden: {},
          visible: { transition: { staggerChildren: stagger } },
        }
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
