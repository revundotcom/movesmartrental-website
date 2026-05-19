'use client'

import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import {
  Building2,
  Activity,
  Users,
  Megaphone,
  ClipboardCheck,
  KeyRound,
  Calendar,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  LineChart,
  Clock,
  Gauge,
  type LucideIcon,
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const ICON_REGISTRY: Record<string, LucideIcon> = {
  Building2,
  Activity,
  Users,
  Megaphone,
  ClipboardCheck,
  KeyRound,
  Calendar,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  LineChart,
  Clock,
  Gauge,
}

/* ─────────────────────────────────────────────────────────────────────
 * AnimatedStat — stat number that counts up when in view.
 * ───────────────────────────────────────────────────────────────────── */
export function AnimatedStat({
  value,
  label,
  suffix = '',
  prefix = '',
  delay = 0,
}: {
  value: string
  label: string
  suffix?: string
  prefix?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="flex flex-col items-center justify-center text-center"
    >
      <p className="font-display text-4xl font-normal tabular-nums text-brand-navy sm:text-5xl md:text-[3.25rem]">
        {prefix}
        {value}
        {suffix && (
          <span className="text-brand-emerald">{suffix}</span>
        )}
      </p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * PainPointCard — image-led card detailing a builder pain point + fix.
 * Used in the "What keeps developers awake" grid.
 * ───────────────────────────────────────────────────────────────────── */
export function PainPointCard({
  index,
  iconKey,
  tag,
  imageSrc,
  imageAlt,
  problem,
  solution,
}: {
  index: number
  iconKey: string
  tag: string
  imageSrc: string
  imageAlt: string
  problem: string
  solution: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeral = String(index + 1).padStart(2, '0')
  const Icon = ICON_REGISTRY[iconKey] ?? Building2

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          unoptimized
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/25 to-transparent"
        />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
          <span>Risk {numeral}</span>
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <p className="font-display text-lg italic leading-tight text-white sm:text-xl">
            {tag}
          </p>
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            The risk
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700 sm:text-base">
            {problem}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            How we cover it
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-brand-navy sm:text-base">
            {solution}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * PhaseRow — large image-led row for the 8-phase lease-up campaign.
 * Alternates image left/right; large numeral overlay; copy block.
 * ───────────────────────────────────────────────────────────────────── */
export function PhaseRow({
  index,
  window,
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
}: {
  index: number
  window: string
  title: string
  description: string
  bullets: string[]
  imageSrc: string
  imageAlt: string
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const numeral = String(index + 1).padStart(2, '0')
  const isEven = index % 2 === 0

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.04 }}
      className="grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand-navy/10 md:grid-cols-12"
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden md:col-span-5 md:aspect-auto md:h-full md:min-h-[320px] ${
          isEven ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 460px"
          unoptimized
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-brand-navy/45 via-transparent to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute left-5 top-5 flex size-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15 font-display text-3xl italic text-white shadow-lg backdrop-blur-md"
        >
          {numeral}
        </span>
        <div className="absolute bottom-5 left-5 right-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
          <span>{window}</span>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center gap-5 p-6 sm:p-8 md:col-span-7 md:p-10 ${
          isEven ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <div>
          <h3 className="font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-[17px]">
            {description}
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-sm leading-relaxed text-slate-700"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-brand-emerald"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * PillarCard — image-led 3-up card used in the "What you get" grid.
 * ───────────────────────────────────────────────────────────────────── */
export function PillarCard({
  index,
  iconKey,
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  index: number
  iconKey: string
  tag: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeral = String(index + 1).padStart(2, '0')
  const Icon = ICON_REGISTRY[iconKey] ?? Building2

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          unoptimized
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/15 to-transparent"
        />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
          <span>Pillar {numeral}</span>
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            {tag}
          </p>
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {description}
        </p>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * KpiCard — small image + KPI card used in the absorption dashboard grid.
 * ───────────────────────────────────────────────────────────────────── */
export function KpiCard({
  index,
  iconKey,
  title,
  description,
  metric,
}: {
  index: number
  iconKey: string
  title: string
  description: string
  metric: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = ICON_REGISTRY[iconKey] ?? Gauge

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-gold/30 hover:bg-white/[0.07]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-brand-gold">
          <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
        </span>
        <p className="font-display text-3xl font-normal tabular-nums text-white">
          {metric}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
          {title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * ProjectTypeCard — image-led card for the asset-class showcase.
 * ───────────────────────────────────────────────────────────────────── */
export function ProjectTypeCard({
  index,
  title,
  units,
  description,
  imageSrc,
  imageAlt,
}: {
  index: number
  title: string
  units: string
  description: string
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
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lg"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        unoptimized
        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
      />

      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
        <span>{units}</span>
      </div>

      <div className="absolute inset-x-5 bottom-5">
        <h3 className="font-display text-2xl font-normal leading-tight text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          {description}
        </p>
        <div
          aria-hidden="true"
          className="mt-3 h-px w-12 bg-brand-gold transition-all duration-500 group-hover:w-24"
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * CaseStudyCard — image-led anonymous case study card.
 * ───────────────────────────────────────────────────────────────────── */
export function CaseStudyCard({
  index,
  badge,
  headline,
  body,
  metrics,
  imageSrc,
  imageAlt,
}: {
  index: number
  badge: string
  headline: string
  body: string
  metrics: Array<{ value: string; label: string }>
  imageSrc: string
  imageAlt: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 500px"
          unoptimized
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent"
        />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {badge}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
          {headline}
        </h3>
        <p className="text-[15px] leading-relaxed text-slate-600">{body}</p>
        <div className="mt-auto grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-display text-xl font-normal tabular-nums text-brand-emerald sm:text-2xl">
                {m.value}
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-[0.18em] text-slate-500">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * ParallaxImageBand — full-bleed photographic band with subtle parallax
 * on scroll. Used as a visual breather between content-heavy sections.
 * ───────────────────────────────────────────────────────────────────── */
export function ParallaxImageBand({
  imageSrc,
  imageAlt,
  overlayKicker,
  overlayTitle,
  overlayBody,
}: {
  imageSrc: string
  imageAlt: string
  overlayKicker: string
  overlayTitle: string
  overlayBody: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section
      ref={ref}
      className="relative isolate h-[68vh] min-h-[480px] overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          unoptimized
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/85 via-brand-navy/65 to-brand-navy/45" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col items-start justify-end px-4 pb-14 sm:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
            {overlayKicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl">
            {overlayTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
            {overlayBody}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * DeliverableTile — small image-tile in the deliverables masonry.
 * ───────────────────────────────────────────────────────────────────── */
export function DeliverableTile({
  index,
  iconKey,
  title,
  description,
  imageSrc,
  imageAlt,
  aspect = 'square',
}: {
  index: number
  iconKey: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  aspect?: 'square' | 'tall' | 'wide'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = ICON_REGISTRY[iconKey] ?? Building2

  const aspectClass =
    aspect === 'tall'
      ? 'aspect-[3/4]'
      : aspect === 'wide'
      ? 'aspect-[16/10]'
      : 'aspect-square'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.05 }}
      className={`group relative ${aspectClass} overflow-hidden rounded-2xl shadow-sm`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        unoptimized
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent transition-opacity duration-500 group-hover:from-brand-navy/85"
      />

      <div className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
        <Icon className="size-4" aria-hidden="true" strokeWidth={1.75} />
      </div>

      <div className="absolute inset-x-4 bottom-4">
        <p className="font-display text-base font-normal leading-tight text-white sm:text-lg">
          {title}
        </p>
        <p className="mt-1 text-[12px] leading-snug text-white/75 sm:text-[13px]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * TimelineMobilization — 15-day visual mobilization countdown bar.
 * ───────────────────────────────────────────────────────────────────── */
export function TimelineMobilization({
  steps,
}: {
  steps: Array<{ day: string; title: string; description: string }>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-gold/60 via-brand-emerald/40 to-transparent md:left-1/2 md:block"
      />
      <ol className="space-y-8 md:space-y-12">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: EASE, delay: idx * 0.08 }}
              className={`relative grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-12 ${
                isEven ? '' : 'md:[&>*:first-child]:order-2'
              }`}
            >
              <div
                className={`relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${
                  isEven ? 'md:text-right' : ''
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  {step.day}
                </p>
                <h4 className="mt-2 font-display text-lg font-normal text-brand-navy sm:text-xl">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
              <div className="hidden md:block" aria-hidden="true">
                <span className="relative mx-auto flex size-9 items-center justify-center rounded-full border-2 border-brand-gold bg-white font-display text-sm font-semibold text-brand-navy shadow-md">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * FloatingBadge — small framed glass badge used over hero imagery.
 * ───────────────────────────────────────────────────────────────────── */
export function FloatingBadge({
  delay = 0,
  iconKey,
  title,
  value,
  className,
}: {
  delay?: number
  iconKey: string
  title: string
  value: string
  className?: string
}) {
  const Icon = ICON_REGISTRY[iconKey] ?? TrendingUp
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={
        className ??
        'absolute rounded-2xl border border-white/40 bg-white/95 p-4 shadow-xl shadow-brand-navy/15 backdrop-blur'
      }
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
          <Icon className="size-5 text-brand-emerald" aria-hidden="true" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
            {title}
          </p>
          <p className="font-display text-base text-brand-navy">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * Reveal — generic enter wrapper.
 * ───────────────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
