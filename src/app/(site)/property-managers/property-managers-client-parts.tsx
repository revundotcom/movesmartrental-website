'use client'

import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import {
  Layers,
  ClipboardCheck,
  Eye,
  Clock,
  ShieldCheck,
  Cable,
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Megaphone,
  Activity,
  Check,
  X,
  Minus,
  type LucideIcon,
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const ICON_REGISTRY: Record<string, LucideIcon> = {
  Layers,
  ClipboardCheck,
  Eye,
  Clock,
  ShieldCheck,
  Cable,
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Megaphone,
  Activity,
}

/* ─────────────────────────────────────────────────────────────────────
 * AnimatedStat — number that fades up on enter, used in stat strips.
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
        {suffix && <span className="text-brand-emerald">{suffix}</span>}
      </p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
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

/* ─────────────────────────────────────────────────────────────────────
 * PillarCard — image-led 3-up card with icon badge.
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
  const Icon = ICON_REGISTRY[iconKey] ?? Layers

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
 * PainPointCard — image-led card with problem + fix split.
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
  const Icon = ICON_REGISTRY[iconKey] ?? Layers

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
          <span>Friction {numeral}</span>
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
            The friction
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700 sm:text-base">
            {problem}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            What we do instead
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
 * WhiteLabelCard — selectable card for the white-label model picker.
 * ───────────────────────────────────────────────────────────────────── */
export function WhiteLabelPicker({
  options,
}: {
  options: Array<{
    key: string
    title: string
    summary: string
    points: string[]
    imageSrc: string
    imageAlt: string
    badge: string
  }>
}) {
  const [active, setActive] = useState(options[0]?.key ?? '')
  const current = options.find((o) => o.key === active) ?? options[0]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <ul className="space-y-3">
          {options.map((opt) => {
            const isActive = opt.key === active
            return (
              <li key={opt.key}>
                <button
                  type="button"
                  onClick={() => setActive(opt.key)}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-brand-emerald/40 bg-emerald-50/40 shadow-md'
                      : 'border-slate-200 bg-white hover:border-brand-emerald/30 hover:bg-emerald-50/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                        isActive
                          ? 'bg-brand-emerald text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {opt.badge}
                    </span>
                    <p className="font-display text-lg font-normal text-brand-navy">
                      {opt.title}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {opt.summary}
                  </p>
                  {isActive && (
                    <motion.div
                      layoutId="wl-active-underline"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-gold"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="lg:col-span-7">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={current.imageSrc}
              alt={current.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              unoptimized
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/15 to-transparent"
            />
            <div className="absolute inset-x-5 bottom-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                {current.badge}
              </p>
              <h4 className="mt-2 font-display text-2xl font-normal text-white sm:text-3xl">
                {current.title}
              </h4>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <ul className="space-y-3">
              {current.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-brand-emerald"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * WorkflowStep — image-led step row for the 8-step engagement.
 * ───────────────────────────────────────────────────────────────────── */
export function WorkflowStep({
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
      className="grid grid-cols-1 items-stretch overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand-navy/10 md:grid-cols-12"
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
 * ParallaxImageBand — full-bleed photographic band with subtle parallax.
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
 * IntegrationCard — small PMS logo / name tile in the integrations grid.
 * ───────────────────────────────────────────────────────────────────── */
export function IntegrationCard({
  index,
  name,
  description,
  initial,
}: {
  index: number
  name: string
  description: string
  initial: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 font-display text-2xl text-brand-navy ring-1 ring-slate-200">
          {initial}
        </span>
        <p className="font-display text-lg font-normal text-brand-navy">{name}</p>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-emerald" />
        Live integration
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * PricingCard — hover-elevated success-fee plan tile.
 * ───────────────────────────────────────────────────────────────────── */
export function PricingCard({
  index,
  badge,
  title,
  headlinePrice,
  subline,
  description,
  bullets,
  featured = false,
  imageSrc,
  imageAlt,
}: {
  index: number
  badge: string
  title: string
  headlinePrice: string
  subline: string
  description: string
  bullets: string[]
  featured?: boolean
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
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-navy/10 ${
        featured
          ? 'border-brand-emerald/40 bg-white ring-2 ring-emerald-100'
          : 'border-slate-200 bg-white'
      }`}
    >
      {featured && (
        <div className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-emerald px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg">
          Most popular
        </div>
      )}
      <div className="relative aspect-[16/10] overflow-hidden">
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
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/25 to-transparent"
        />
        <div className="absolute inset-x-5 bottom-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {badge}
          </p>
          <h3 className="mt-2 font-display text-2xl font-normal text-white sm:text-3xl">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div>
          <p className="font-display text-4xl font-normal text-brand-navy">
            {headlinePrice}
          </p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            {subline}
          </p>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-600">{description}</p>
        <ul className="mt-auto space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-brand-emerald"
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * ComparisonTable — In-house vs MoveSmart side-by-side, image-led header.
 * ───────────────────────────────────────────────────────────────────── */
export function ComparisonTable({
  rows,
}: {
  rows: Array<{
    label: string
    internal: { text: string; tone: 'bad' | 'neutral' | 'good' }
    movesmart: { text: string; tone: 'bad' | 'neutral' | 'good' }
  }>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const ToneIcon = ({ tone }: { tone: 'bad' | 'neutral' | 'good' }) => {
    if (tone === 'good')
      return (
        <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-brand-emerald">
          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
        </span>
      )
    if (tone === 'bad')
      return (
        <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <X className="size-3" strokeWidth={3} aria-hidden="true" />
        </span>
      )
    return (
      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Minus className="size-3" strokeWidth={3} aria-hidden="true" />
      </span>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:block">
        <div className="grid grid-cols-12 bg-brand-navy text-white">
          <div className="col-span-4 px-6 py-6 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
            Line item
          </div>
          <div className="col-span-4 px-6 py-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
              Option A
            </p>
            <p className="mt-1 font-display text-xl font-normal">In-house leasing team</p>
          </div>
          <div className="col-span-4 bg-gradient-to-br from-emerald-700/40 to-emerald-900/30 px-6 py-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              Option B
            </p>
            <p className="mt-1 font-display text-xl font-normal italic text-brand-gold">
              MoveSmart as a service
            </p>
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {rows.map((row, idx) => (
            <div
              key={row.label}
              className={`grid grid-cols-12 items-center ${
                idx % 2 === 1 ? 'bg-[#FBFAF6]' : 'bg-white'
              }`}
            >
              <div className="col-span-4 px-6 py-5 font-display text-base font-normal text-brand-navy">
                {row.label}
              </div>
              <div className="col-span-4 px-6 py-5">
                <div className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <ToneIcon tone={row.internal.tone} />
                  <span>{row.internal.text}</span>
                </div>
              </div>
              <div className="col-span-4 bg-emerald-50/30 px-6 py-5">
                <div className="flex items-start gap-3 text-sm font-medium leading-relaxed text-brand-navy">
                  <ToneIcon tone={row.movesmart.tone} />
                  <span>{row.movesmart.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="bg-brand-navy px-5 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                {row.label}
              </p>
            </div>
            <div className="divide-y divide-slate-200">
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  In-house leasing team
                </p>
                <div className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                  <ToneIcon tone={row.internal.tone} />
                  <span>{row.internal.text}</span>
                </div>
              </div>
              <div className="bg-emerald-50/30 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-emerald">
                  MoveSmart as a service
                </p>
                <div className="mt-2 flex items-start gap-2 text-sm font-medium leading-relaxed text-brand-navy">
                  <ToneIcon tone={row.movesmart.tone} />
                  <span>{row.movesmart.text}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * CaseStudyCard — image-led anonymous case card.
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
 * KpiCard — dark-band live KPI tile.
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
  const Icon = ICON_REGISTRY[iconKey] ?? Activity

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
        <p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * FloatingBadge — small framed glass badge for hero overlays.
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
  const Icon = ICON_REGISTRY[iconKey] ?? Activity
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
