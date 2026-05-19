'use client'

import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * TimelineRail — vertical SVG line whose stroke length animates with scroll
 * progress through the timeline section. Acts as the central spine of the
 * journey, gold-tinted at the top, emerald at the bottom.
 * ──────────────────────────────────────────────────────────────────────── */
export function TimelineRail({ targetId }: { targetId: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 25%'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-timeline-rail={targetId}
      className="pointer-events-none absolute inset-y-0 left-6 hidden w-px md:left-1/2 md:block md:-translate-x-1/2"
    >
      {/* Soft background rail */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-brand-gold/30 via-slate-300/60 to-brand-emerald/30" />
      {/* Animated progress rail on top */}
      <svg
        className="absolute inset-y-0 left-0 h-full w-px overflow-visible"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          stroke="url(#timeline-gradient)"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A853" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * TimelineStep — single timeline card. Alternates sides on md+; stacked
 * with a left-rail connector on mobile. Includes thumbnail image, italic
 * gold step numeral, display title, and body.
 * ──────────────────────────────────────────────────────────────────────── */
export function TimelineStep({
  index,
  step,
  title,
  body,
  imageSrc,
  imageAlt,
  side,
}: {
  index: number
  step: number
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  side: 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const numeral = String(step).padStart(2, '0')

  const isLeft = side === 'left'

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[3rem_1fr] gap-4 md:grid-cols-2 md:gap-0"
    >
      {/* ── Mobile: connector dot on the rail (left:6) ───────────────────── */}
      <div className="relative flex justify-center md:hidden">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: index * 0.05 + 0.15 }}
          className="absolute top-6 z-10 flex size-4 items-center justify-center rounded-full border-2 border-brand-gold bg-white shadow-md"
        >
          <span className="size-1.5 rounded-full bg-brand-emerald" />
        </motion.span>
      </div>

      {/* ── Desktop: place card on left half if side==left, else spacer ─── */}
      {isLeft ? (
        <>
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
            transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
            className="col-start-2 md:col-start-1 md:pr-12 lg:pr-16"
          >
            <StepCard
              numeral={numeral}
              title={title}
              body={body}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              align="right"
            />
          </motion.div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
            className="col-start-2 md:col-start-2 md:pl-12 lg:pl-16"
          >
            <StepCard
              numeral={numeral}
              title={title}
              body={body}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              align="left"
            />
          </motion.div>
        </>
      )}

      {/* ── Desktop: connector dot centered on the rail ──────────────────── */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 + 0.2 }}
        aria-hidden="true"
        className="absolute left-1/2 top-8 z-10 hidden size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-gold bg-white shadow-md md:flex"
      >
        <span className="size-2 rounded-full bg-brand-emerald" />
      </motion.span>

      {/* ── Desktop: horizontal connector arm from rail to card edge ─────── */}
      {isLeft ? (
        <span
          aria-hidden="true"
          className="absolute right-1/2 top-10 mr-2.5 hidden h-px w-10 bg-gradient-to-l from-transparent to-brand-gold/60 md:block lg:w-14"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-10 ml-2.5 hidden h-px w-10 bg-gradient-to-r from-brand-gold/60 to-transparent md:block lg:w-14"
        />
      )}
    </div>
  )
}

function StepCard({
  numeral,
  title,
  body,
  imageSrc,
  imageAlt,
  align,
}: {
  numeral: string
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  align: 'left' | 'right'
}) {
  const isRight = align === 'right'
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-xl hover:shadow-brand-navy/10 sm:p-7 ${
        isRight ? 'md:text-right' : 'md:text-left'
      }`}
    >
      <div
        className={`flex items-start gap-5 ${
          isRight ? 'md:flex-row-reverse' : 'md:flex-row'
        }`}
      >
        {/* Thumbnail */}
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            unoptimized
            sizes="80px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <p
            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald ${
              isRight ? 'md:justify-end' : ''
            }`}
          >
            <span className="font-display text-2xl font-normal italic text-brand-gold">
              {numeral}
            </span>
            <span aria-hidden="true" className="block h-px w-6 bg-brand-emerald/40" />
            <span>Step</span>
          </p>
          <h3 className="mt-2 font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {body}
          </p>
        </div>
      </div>
    </article>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * RevealRow — generic stagger-up wrapper used for the non-timeline sections
 * on this page (problem cards, scope rows, etc).
 * ──────────────────────────────────────────────────────────────────────── */
export function RevealRow({
  index = 0,
  children,
  className,
}: {
  index?: number
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
