'use client'

import Image from 'next/image'
import {
  ClipboardList,
  FileSignature,
  Handshake,
  Home,
  KeyRound,
  Megaphone,
  Search,
  Shield,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

// Local icon registry — server component passes a string `iconKey`,
// resolved here client-side so Lucide forwardRef components never cross
// the RSC boundary.
const ICON_REGISTRY: Record<string, LucideIcon> = {
  Megaphone,
  Search,
  Shield,
  Sparkles,
  Users,
  Wallet,
  Home,
  Handshake,
  KeyRound,
  FileSignature,
  ClipboardList,
}

/* ────────────────────────────────────────────────────────────────────────
 * StaggerRow — generic stagger-up wrapper for cards / list rows.
 * ──────────────────────────────────────────────────────────────────────── */
export function StaggerRow({
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
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ScopeImageCard — image-led card for one "what's included" pillar.
 * Photo on top with glassmorphic tag pill + icon badge, white body card
 * below. Lifts on hover with image zoom.
 * ──────────────────────────────────────────────────────────────────────── */
export function ScopeImageCard({
  index,
  tag,
  iconKey,
  imageSrc,
  imageAlt,
  title,
  body,
}: {
  index: number
  tag: string
  iconKey: string
  imageSrc: string
  imageAlt: string
  title: string
  body: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeral = String(index + 1).padStart(2, '0')
  const Icon = ICON_REGISTRY[iconKey] ?? Sparkles

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      {/* Hero image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          unoptimized
        />
        {/* Navy gradient for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/15 to-transparent"
        />

        {/* Top-left glassmorphism tag pill */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
          <span>{tag}</span>
        </div>

        {/* Bottom row: numeral + icon badge */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <span
            aria-hidden="true"
            className="font-mono text-[11px] font-semibold tracking-[0.22em] text-white/85"
          >
            {numeral}
          </span>
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <h3 className="font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {body}
        </p>
      </div>
    </motion.article>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ProcessStep — single dark-band process step row with reveal animation.
 * ──────────────────────────────────────────────────────────────────────── */
export function ProcessStep({
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      className="grid grid-cols-1 gap-6 border-b border-white/12 py-10 last:border-b-0 md:grid-cols-12 md:gap-12"
    >
      <div className="md:col-span-3">
        <span
          className="font-display text-5xl font-normal leading-none text-brand-gold sm:text-6xl md:text-7xl"
          aria-hidden="true"
        >
          {String(step).padStart(2, '0')}
        </span>
      </div>
      <div className="md:col-span-9">
        <h3 className="font-display text-2xl font-normal leading-snug text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
          {body}
        </p>
      </div>
    </motion.li>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * AudienceCard — single "who it's for" card with hover lift + arrow.
 * ──────────────────────────────────────────────────────────────────────── */
export function AudienceCard({
  index,
  audience,
  fitNote,
  imageSrc,
  imageAlt,
}: {
  index: number
  audience: string
  fitNote: string
  imageSrc: string
  imageAlt: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 400px"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/25 to-transparent"
        />
        <p className="absolute inset-x-5 bottom-4 font-display text-xl font-normal italic leading-tight text-white sm:text-2xl">
          {audience}
          <span aria-hidden="true" className="text-brand-gold">
            .
          </span>
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {fitNote}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-emerald">
          A fit
        </span>
      </div>
    </motion.div>
  )
}
