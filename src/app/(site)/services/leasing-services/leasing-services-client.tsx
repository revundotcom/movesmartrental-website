'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * RevealUp — generic stagger-up wrapper used across the split-screen page.
 * ──────────────────────────────────────────────────────────────────────── */
export function RevealUp({
  index = 0,
  children,
  className,
  delayStep = 0.06,
  y = 28,
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

/* ────────────────────────────────────────────────────────────────────────
 * ClipFromLeft — used for split-screen image panels entering.
 * ──────────────────────────────────────────────────────────────────────── */
export function ClipFromLeft({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ClipFromRight({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * MosaicTile — wrapper for each hero mosaic tile with subtle stagger.
 * ──────────────────────────────────────────────────────────────────────── */
export function MosaicTile({
  index,
  children,
  className,
}: {
  index: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.92, y: 18 }
      }
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * StripCard — single horizontal "how-it-works" step card with reveal.
 * ──────────────────────────────────────────────────────────────────────── */
export function StripCard({
  index,
  step,
  title,
  body,
}: {
  index: number
  step: number
  title: string
  body: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.07 }}
      className="group relative flex h-full min-w-[240px] flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-xl hover:shadow-brand-navy/10 sm:min-w-0 sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span
          aria-hidden="true"
          className="font-display text-3xl font-normal italic text-brand-gold sm:text-4xl"
        >
          {String(step).padStart(2, '0')}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
          Step
        </span>
      </div>
      <span aria-hidden="true" className="block h-px w-10 bg-brand-gold/60" />
      <h3 className="font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">{body}</p>
    </motion.div>
  )
}
