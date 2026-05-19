'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * RevealUp — generic stagger-up wrapper used across magazine sections.
 * ──────────────────────────────────────────────────────────────────────── */
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
      transition={{ duration: 0.65, ease: EASE, delay: index * delayStep }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * MagazinePolaroid — a single photo framed like a polaroid with optional
 * rotation, caption, and a slight drop shadow. Hand-arranged feel.
 * ──────────────────────────────────────────────────────────────────────── */
export function MagazinePolaroid({
  index = 0,
  rotateClass = '',
  children,
  caption,
  className = '',
  delay = 0,
}: {
  index?: number
  rotateClass?: string
  children: ReactNode
  caption?: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 18, rotate: 0 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 18 }
      }
      transition={{
        duration: 0.8,
        ease: EASE,
        delay: delay + index * 0.12,
      }}
      className={`${rotateClass} ${className}`}
    >
      <div className="rounded-sm border border-slate-200 bg-white p-3 shadow-[0_22px_60px_-24px_rgba(11,29,58,0.45)] sm:p-4">
        <div className="relative overflow-hidden bg-slate-100">
          {children}
        </div>
        {caption && (
          <figcaption className="mt-3 px-1 font-display text-[13px] italic leading-snug text-slate-600">
            {caption}
          </figcaption>
        )}
      </div>
    </motion.figure>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * GoldRule — a hairline gold rule with optional centered ornament.
 * Used to bracket oversized pull-quotes and pricing notes.
 * ──────────────────────────────────────────────────────────────────────── */
export function GoldRule({
  ornament = false,
  className = '',
}: {
  ornament?: boolean
  className?: string
}) {
  if (!ornament) {
    return (
      <div
        aria-hidden="true"
        className={`h-px w-full bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent ${className}`}
      />
    )
  }
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/60" />
      <span className="font-display text-base italic text-brand-gold">
        &#10086;
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/60" />
    </div>
  )
}
