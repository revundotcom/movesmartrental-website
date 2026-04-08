'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, Children } from 'react'

// ─── Variant definitions ──────────────────────────────────────────────────────

const VARIANTS = {
  blur: {
    hidden: { y: -20, opacity: 0, filter: 'blur(10px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
  },
  slideUp: {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  scaleIn: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

// Legacy export — existing motion.div children with revealItem variants still work
export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = 'blur' | 'slideUp' | 'scaleIn' | 'fade'
type StaggerFrom = 'first' | 'center'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  /**
   * Animation variant applied to this wrapper.
   * When omitted, RevealOnScroll acts as a legacy stagger container
   * (children are expected to be motion.div with their own variants).
   */
  variant?: Variant
  /** Stagger delay between children in seconds. Default 0.12 */
  stagger?: number
  /** Direction stagger originates from. Default: "first" */
  staggerFrom?: StaggerFrom
  /** Manual delay offset in seconds */
  delay?: number
  /** Animation duration in seconds. Default: 0.5 */
  duration?: number
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RevealOnScroll({
  children,
  className,
  variant,
  stagger = 0.12,
  staggerFrom = 'first',
  delay = 0,
  duration = 0.5,
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // ── New variant mode: animate this wrapper directly ───────────────────────
  if (variant) {
    const childCount = Children.count(children)
    const { hidden, visible } = VARIANTS[variant]

    const getDelay = (i: number): number => {
      if (staggerFrom === 'center') {
        const mid = (childCount - 1) / 2
        return delay + Math.abs(i - mid) * stagger
      }
      return delay + i * stagger
    }

    // Multiple children — stagger each with independent motion.div wrappers
    if (childCount > 1) {
      return (
        <div ref={ref} className={className}>
          {Children.map(children, (child, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{
                hidden,
                visible: {
                  ...visible,
                  transition: {
                    duration,
                    delay: getDelay(i),
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      )
    }

    // Single child — animate wrapper itself
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden,
          visible: {
            ...visible,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  // ── Legacy stagger-container mode (no variant prop) ───────────────────────
  // Children are motion.div elements with their own variants (e.g. revealItem).
  const staggerVariants =
    stagger === 0.12
      ? { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
      : { hidden: {}, visible: { transition: { staggerChildren: stagger } } }

  return (
    <motion.div
      ref={ref}
      variants={staggerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
