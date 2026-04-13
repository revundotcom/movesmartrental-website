'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'

const EASE = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────

export interface ProvinceEntry {
  _id: string
  title: string
  slug: string
  country: string
  cities: Array<{
    title: string
    slug: string
    provinceSlug?: string
  }>
}

// ─────────────────────────────────────────────────────────────
// Typographic headline with letter-spacing cascade
// ─────────────────────────────────────────────────────────────

function TypographicHeading({
  children,
  className,
  as: Tag = 'h2',
}: {
  children: React.ReactNode
  className?: string
  as?: 'h2' | 'h3'
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const MotionTag = Tag === 'h2' ? motion.h2 : motion.h3

  return (
    <MotionTag
      ref={ref}
      initial={reduce ? false : { opacity: 0, letterSpacing: '0.1em' }}
      animate={
        inView
          ? { opacity: 1, letterSpacing: '0.01em' }
          : { opacity: 0, letterSpacing: '0.1em' }
      }
      transition={{ duration: 0.9, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

// ─────────────────────────────────────────────────────────────
// Editorial inline city list (cascades left-to-right)
// ─────────────────────────────────────────────────────────────

function InlineCityList({
  cities,
  allHref,
  allLabel,
  theme = 'light',
}: {
  cities: Array<{ title: string; slug: string; href: string }>
  allHref: string
  allLabel: string
  theme?: 'light' | 'dark'
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const linkBase =
    theme === 'dark'
      ? 'text-white/80 hover:text-brand-gold transition-colors duration-200'
      : 'text-brand-navy/85 hover:text-brand-emerald transition-colors duration-200'
  const sepColor =
    theme === 'dark' ? 'text-white/25' : 'text-brand-navy/25'
  const allLinkColor =
    theme === 'dark'
      ? 'text-brand-gold hover:text-white'
      : 'text-brand-emerald hover:text-brand-navy'

  return (
    <div
      ref={ref}
      className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-heading text-base leading-relaxed sm:text-lg"
    >
      {cities.map((city, i) => (
        <motion.span
          key={city.slug}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.45, delay: i * 0.03, ease: EASE }}
          className="inline-flex items-baseline gap-x-2"
        >
          <Link href={city.href} className={linkBase}>
            {city.title}
          </Link>
          <span className={sepColor} aria-hidden="true">
            ·
          </span>
        </motion.span>
      ))}
      <motion.span
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{
          duration: 0.45,
          delay: cities.length * 0.03,
          ease: EASE,
        }}
      >
        <Link
          href={allHref}
          className={`font-semibold ${allLinkColor}`}
        >
          {allLabel}
        </Link>
      </motion.span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Province row - large typographic header + inline city list
// ─────────────────────────────────────────────────────────────

export function ProvinceRow({
  province,
  theme = 'light',
  index = 0,
}: {
  province: ProvinceEntry
  theme?: 'light' | 'dark'
  index?: number
}) {
  const reduce = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })

  const countryPath = province.country === 'CA' ? 'ca' : 'us'
  const allHref = `/${countryPath}/${province.slug}/`
  const citiesWithHref = province.cities.map((c) => ({
    ...c,
    href: `/${countryPath}/${province.slug}/${c.slug}/`,
  }))

  const titleClass =
    theme === 'dark'
      ? 'font-display text-3xl font-normal text-white sm:text-4xl lg:text-5xl'
      : 'font-display text-3xl font-normal text-brand-navy sm:text-4xl lg:text-5xl'

  const kickerClass =
    theme === 'dark'
      ? 'text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold'
      : 'text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald'

  const ruleClass =
    theme === 'dark' ? 'bg-white/15' : 'bg-brand-navy/15'

  const countLabelClass =
    theme === 'dark' ? 'text-white/50' : 'text-brand-navy/50'

  return (
    <motion.div
      ref={headingRef}
      initial={reduce ? false : { opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      className="py-10 first:pt-0 last:pb-0"
    >
      <div className="mb-5 flex items-baseline justify-between gap-6">
        <div className="min-w-0">
          <p className={`mb-2 ${kickerClass}`}>
            {province.country === 'CA' ? 'Province' : 'State'} · {province.cities.length}{' '}
            {province.cities.length === 1 ? 'city' : 'cities'}
          </p>
          <TypographicHeading className={titleClass}>
            {province.title}
          </TypographicHeading>
        </div>
        <span
          className={`hidden shrink-0 font-heading text-sm ${countLabelClass} md:inline`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={`mb-5 h-px w-full ${ruleClass}`} aria-hidden="true" />

      <InlineCityList
        cities={citiesWithHref}
        allHref={allHref}
        allLabel={`All ${province.title} →`}
        theme={theme}
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Featured city spotlight - two-column editorial
// ─────────────────────────────────────────────────────────────

export interface SpotlightData {
  city: string
  province: string
  href: string
  summary: string
  neighborhoods: Array<{ name: string; note: string }>
}

export function CitySpotlight({
  data,
  index = 0,
}: {
  data: SpotlightData
  index?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : { opacity: 0, filter: 'blur(10px)', y: -20 }}
      animate={
        inView
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, filter: 'blur(10px)', y: -20 }
      }
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      className="grid grid-cols-1 gap-8 border-t border-brand-navy/10 py-12 first:border-t-0 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
          Spotlight · {data.province}
        </p>
        <h3 className="font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
          {data.city}
          <span className="text-brand-gold" aria-hidden="true">
            .
          </span>
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
          {data.summary}
        </p>
        <Link
          href={data.href}
          className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-brand-emerald transition-colors hover:text-brand-navy"
        >
          Explore {data.city} rentals
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="lg:col-span-6">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
          Top neighborhoods
        </p>
        <ul>
          {data.neighborhoods.map((n, i) => (
            <motion.li
              key={n.name}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={
                inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
              }
              transition={{
                duration: 0.45,
                delay: 0.15 + i * 0.06,
                ease: EASE,
              }}
              className="flex items-baseline justify-between gap-6 border-b border-brand-navy/10 py-3 last:border-b-0"
            >
              <span className="font-heading text-base font-semibold text-brand-navy">
                {n.name}
              </span>
              <span className="shrink-0 text-right text-sm text-slate-500">
                {n.note}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────
// Market snapshot strip - editorial pipe-divided, NOT cards
// ─────────────────────────────────────────────────────────────

export interface SnapshotStat {
  label: string
  value: number
  prefix?: string
  suffix?: string
  /** Fallback display text if value not countable (e.g. "All 10") */
  text?: string
}

export function MarketSnapshot({ stats }: { stats: SnapshotStat[] }) {
  return (
    <RevealOnScroll variant="fade" duration={0.9}>
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
          Market snapshot
        </p>
        <div className="flex flex-col items-center justify-center gap-y-6 border-y border-brand-navy/10 py-8 md:flex-row md:items-baseline md:gap-x-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-1 items-baseline justify-center gap-0 px-6 text-center md:px-8"
              style={{
                borderLeft:
                  i > 0 ? '1px solid rgba(11,29,58,0.12)' : undefined,
              }}
            >
              <div>
                <p className="font-display text-3xl font-normal text-brand-navy md:text-4xl">
                  {s.text ? (
                    s.text
                  ) : (
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  )}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  )
}

// ─────────────────────────────────────────────────────────────
// Local teams - horizontal editorial lockup list
// ─────────────────────────────────────────────────────────────

export interface Advisor {
  name: string
  city: string
  phone: string
  role: string
}

export function LocalTeamsList({ advisors }: { advisors: Advisor[] }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <ul
      ref={ref}
      className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
    >
      {advisors.map((a, i) => (
        <motion.li
          key={a.name}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          className="border-t border-brand-navy/15 pt-4"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-emerald">
            {a.city}
          </p>
          <p className="mt-2 font-display text-xl font-normal leading-tight text-brand-navy">
            {a.name}
          </p>
          <p className="mt-1 text-xs text-slate-500">{a.role}</p>
          <a
            href={`tel:${a.phone.replace(/[^+\d]/g, '')}`}
            className="mt-3 inline-block font-heading text-sm font-semibold text-brand-navy hover:text-brand-emerald"
          >
            {a.phone}
          </a>
        </motion.li>
      ))}
    </ul>
  )
}

// ─────────────────────────────────────────────────────────────
// Quick-jump aside for hero
// ─────────────────────────────────────────────────────────────

export function QuickJumpCard({
  items,
}: {
  items: Array<{ label: string; href: string }>
}) {
  return (
    <div className="rounded-2xl border border-brand-navy/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
        Quick jump
      </p>
      <ul className="divide-y divide-brand-navy/10">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between py-2.5 font-heading text-sm text-brand-navy transition-colors hover:text-brand-emerald"
            >
              <span>{item.label}</span>
              <span aria-hidden="true" className="text-brand-navy/40">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
