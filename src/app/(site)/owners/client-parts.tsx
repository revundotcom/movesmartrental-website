'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * SlideFromRight - mirrored partner to RevealOnScroll variant="slideFromLeft"
 * ──────────────────────────────────────────────────────────────────────── */
export function SlideFromRight({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ x: 60, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ZigzagRow - alternating left/right pain-point row.
 * Index even → slide from left, index odd → slide from right.
 * ──────────────────────────────────────────────────────────────────────── */
export function ZigzagRow({
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
      transition={{ duration: 0.65, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * LeasingTimeline - vertical restoration-log timeline.
 * The center rail draws downward as you scroll; each dot scales in.
 * ──────────────────────────────────────────────────────────────────────── */
export function LeasingTimeline({
  steps,
}: {
  steps: Array<{ day: string; title: string; description: string }>
}) {
  const containerRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 35%'],
  })
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <ol ref={containerRef} className="relative">
      {/* Vertical rail track (dim) */}
      <div
        aria-hidden="true"
        className="absolute left-[calc(33%+11px)] top-2 bottom-2 hidden w-px bg-brand-navy/10 md:block"
      />
      {/* Vertical rail fill (emerald, scales with scroll) */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[calc(33%+11px)] top-2 bottom-2 hidden w-px origin-top bg-brand-emerald md:block"
        style={{ scaleY: railScaleY }}
      />
      {/* Mobile rail */}
      <div
        aria-hidden="true"
        className="absolute left-[11px] top-2 bottom-2 w-px bg-brand-navy/10 md:hidden"
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-brand-emerald md:hidden"
        style={{ scaleY: railScaleY }}
      />

      {steps.map((step, idx) => (
        <TimelineRow key={step.title} step={step} index={idx} />
      ))}
    </ol>
  )
}

function TimelineRow({
  step,
  index,
}: {
  step: { day: string; title: string; description: string }
  index: number
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <li ref={ref} className="relative grid grid-cols-1 gap-4 pb-12 last:pb-2 md:grid-cols-12 md:gap-6">
      {/* Day marker - left column on desktop, top on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
        className="md:col-span-4 md:pr-6 md:text-right"
      >
        <p className="font-display text-xl font-normal italic text-brand-navy md:text-2xl">
          {step.day}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald md:hidden">
          Step {String(index + 1).padStart(2, '0')}
        </p>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-0 top-1.5 md:left-[calc(33%+1px)]">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: index * 0.05 + 0.15 }}
          className="relative z-10 flex size-[22px] items-center justify-center rounded-full border border-brand-emerald/40 bg-white shadow-sm"
        >
          <div className="size-2 rounded-full bg-brand-emerald" />
        </motion.div>
      </div>

      {/* Right column - title + description */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 + 0.1 }}
        className="pl-9 md:col-span-8 md:pl-12"
      >
        <p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald md:block">
          Step {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-1 font-display text-xl font-normal text-brand-navy sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {step.description}
        </p>
      </motion.div>
    </li>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ComparisonRowReveal - wipe-in row for comparison table.
 * Uses clip-path inset so each row "wipes" left-to-right when entering view.
 * ──────────────────────────────────────────────────────────────────────── */
export function ComparisonRowReveal({
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
      initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
      animate={
        inView
          ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
          : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }
      }
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * MarketRow - list row with gold underline that draws on hover/reveal.
 * ──────────────────────────────────────────────────────────────────────── */
export function MarketRow({
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
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
