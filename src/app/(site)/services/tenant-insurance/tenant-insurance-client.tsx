'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HomeIcon,
  ShieldCheck,
  Briefcase,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

// ---------------------------------------------------------------------------
// Icon registry — resolves a string iconKey to a Lucide component so server
// components can hand off icon choices without crossing the RSC boundary
// with forwardRef components.
// ---------------------------------------------------------------------------
const ICON_REGISTRY: Record<string, LucideIcon> = {
  HomeIcon,
  ShieldCheck,
  Briefcase,
  Sparkles,
}

export function ResolvedIcon({
  iconKey,
  className,
}: {
  iconKey: string
  className?: string
}) {
  const Icon = ICON_REGISTRY[iconKey] ?? Sparkles
  return <Icon className={className} aria-hidden="true" />
}

// ---------------------------------------------------------------------------
// RevealUp — generic stagger-up reveal used throughout the page.
// ---------------------------------------------------------------------------
export function RevealUp({
  index = 0,
  children,
  className,
  delayStep = 0.06,
  y = 24,
}: {
  index?: number
  children: ReactNode
  className?: string
  delayStep?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: EASE, delay: index * delayStep }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// PopIn — softer scale-up entrance for the floating circular coverage tiles.
// ---------------------------------------------------------------------------
export function PopIn({
  index = 0,
  children,
  className,
}: {
  index?: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 14 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.85, y: 14 }
      }
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// ChatBubble — alternating left/right reveal for chat-style how-it-works.
// ---------------------------------------------------------------------------
export function ChatBubble({
  index,
  children,
  className,
}: {
  index: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const fromLeft = index % 2 === 0
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
      animate={
        inView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: fromLeft ? -32 : 32 }
      }
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
