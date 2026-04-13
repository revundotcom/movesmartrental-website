'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { FranchiseIllustration } from '@/components/illustrations'

const EASE = [0.22, 1, 0.36, 1] as const

// ─── LongCountUp - same idea as the global CountUp but with a tunable duration
// (longer = more "investor-tier gravitas"). Used for the giant numerals on this page.
// Falls back to the final value immediately when reduced-motion is requested.
// ─────────────────────────────────────────────────────────────────────────────

interface LongCountUpProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  /** Spring duration in ms. Default 2200 - long, cinematic. */
  durationMs?: number
  className?: string
}

export function LongCountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  durationMs = 2200,
  className,
}: LongCountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: durationMs, bounce: 0 })
  const display = useTransform(spring, (v) => {
    const n = decimals > 0 ? Number(v).toFixed(decimals) : Math.round(v).toLocaleString()
    return `${prefix}${n}${suffix}`
  })

  useEffect(() => {
    if (inView && !reduce) motionVal.set(value)
  }, [inView, reduce, value, motionVal])

  if (reduce) {
    const n = decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()
    return <span className={className}>{`${prefix}${n}${suffix}`}</span>
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}

// ─── MarketStat - one giant numeral with a soft gold radial halo behind it.
// ─────────────────────────────────────────────────────────────────────────────

interface MarketStatProps {
  prefix?: string
  value: number
  suffix?: string
  decimals?: number
  label: string
}

export function MarketStat({ prefix, value, suffix, decimals = 0, label }: MarketStatProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(212,168,83,0.18) 0%, rgba(212,168,83,0) 60%)',
        }}
      />
      <LongCountUp
        prefix={prefix}
        value={value}
        suffix={suffix}
        decimals={decimals}
        className="relative z-10 font-display text-[5.5rem] font-normal leading-none tracking-tight text-white sm:text-[7rem] lg:text-[9rem]"
      />
      <p className="relative z-10 mt-6 max-w-[18ch] text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
        {label}
      </p>
    </div>
  )
}

// ─── TimelineRail - horizontal 6-node onboarding timeline.
// Gold rail animates strokeDashoffset left-to-right; nodes light up sequentially.
// On mobile: overflows horizontally with scroll-snap.
// ─────────────────────────────────────────────────────────────────────────────

interface TimelineNode {
  week: string
  title: string
  description: string
}

export function OnboardingTimeline({ nodes }: { nodes: TimelineNode[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="relative">
      {/* Mobile-first: horizontal scroller with snap */}
      <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:overflow-visible md:px-0">
        <div
          className="relative grid min-w-[1080px] grid-cols-6 gap-6 md:min-w-0 md:gap-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {/* Animated gold rail */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-[8%] right-[8%] top-[58px] z-0 h-[2px] w-[84%]"
          >
            <motion.line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="#D4A853"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
              transition={{ duration: reduce ? 0 : 1.6, ease: EASE, delay: 0.15 }}
            />
          </svg>

          {nodes.map((n, i) => (
            <motion.div
              key={n.week}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{
                duration: reduce ? 0 : 0.55,
                ease: EASE,
                delay: reduce ? 0 : 0.25 + i * 0.12,
              }}
              className="relative z-10 flex flex-col items-center text-center"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Title above */}
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                {n.week}
              </p>
              <h3 className="mb-5 font-display text-base font-normal leading-tight text-brand-navy md:text-lg">
                {n.title}
              </h3>
              {/* Numbered dot on the rail */}
              <span
                aria-hidden="true"
                className="relative flex size-12 items-center justify-center rounded-full border-2 border-brand-gold bg-white font-display text-base font-normal text-brand-navy shadow-[0_4px_14px_rgba(212,168,83,0.35)]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* Description below */}
              <p className="mt-5 max-w-[22ch] text-xs leading-relaxed text-slate-600 md:text-[13px]">
                {n.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-slate-400 md:hidden">
        Swipe to advance through the six weeks
      </p>
    </div>
  )
}

// ─── DiagonalFitColumns - fit-yes / fit-no two columns with a diagonal divider.
// slideFromLeft / slide-from-right; divider does a top-to-bottom clip reveal.
// Collapses to a horizontal hairline on mobile.
// ─────────────────────────────────────────────────────────────────────────────

interface DiagonalFitColumnsProps {
  fitYes: string[]
  fitNo: string[]
}

export function DiagonalFitColumns({ fitYes, fitNo }: DiagonalFitColumnsProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
      {/* Diagonal divider (md+) */}
      <motion.div
        aria-hidden="true"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: 0.15 }}
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px md:block"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,29,58,0) 0%, rgba(212,168,83,0.55) 50%, rgba(11,29,58,0) 100%)',
          transform: 'translateX(-50%) skewX(-12deg)',
          transformOrigin: 'top center',
        }}
      />
      {/* Mobile horizontal hairline divider */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent md:hidden"
      />

      {/* Fit-Yes column - slide from left */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
        className="md:pr-12 lg:pr-16"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
          You&rsquo;re a fit if&hellip;
        </p>
        <ul className="mt-6 space-y-5">
          {fitYes.map((item) => (
            <li
              key={item}
              className="border-b border-brand-navy/10 pb-5 font-display text-lg font-normal leading-snug text-brand-navy last:border-b-0 last:pb-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Fit-No column - slide from right */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: 0.1 }}
        className="md:pl-12 lg:pl-16"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-500">
          You&rsquo;re not a fit if&hellip;
        </p>
        <ul className="mt-6 space-y-5">
          {fitNo.map((item) => (
            <li
              key={item}
              className="border-b border-brand-navy/10 pb-5 font-display text-lg font-normal italic leading-snug text-slate-500 last:border-b-0 last:pb-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

// ─── TerritoryParallax - full-bleed navy band; FranchiseIllustration drifts
// slower than scroll speed. Awarded / Available lists flank as inline columns.
// Parallax disabled on mobile (hidden md:block on parallax wrapper).
// ─────────────────────────────────────────────────────────────────────────────

interface TerritorySectionProps {
  awarded: Array<{ name: string; status: string }>
  available: string[]
}

export function TerritoryParallax({ awarded, available }: TerritorySectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // SVG drifts up slower than the foreground (parallax depth)
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-navy py-24 text-white sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
      {/* Soft accent wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(16,185,129,0.10) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(212,168,83,0.10) 0%, transparent 55%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            The Map
          </p>
          <h2 className="mt-4 font-display text-4xl font-normal leading-tight tracking-tight text-white sm:text-5xl">
            Where MoveSmart is{' '}
            <span className="font-display italic text-emerald-300">growing</span>
            <span aria-hidden="true" className="text-brand-gold">.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Five Canadian territories are awarded today. The remaining North American map is open - but moves quickly. Once a market is awarded, it is exclusive to that operator for the duration of their agreement.
          </p>
        </div>

        {/* Full-bleed illustration with parallax (desktop only) */}
        <div className="relative mt-16 flex justify-center">
          <motion.div
            style={reduce ? undefined : { y }}
            className="relative w-full max-w-3xl px-6"
          >
            <FranchiseIllustration className="w-full opacity-90" />
          </motion.div>
        </div>

        {/* Inline two-column lists - no card chrome */}
        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
              Awarded territories
            </p>
            <ul className="mt-6 divide-y divide-white/10">
              {awarded.map((t) => (
                <li
                  key={t.name}
                  className="flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="font-display text-lg font-normal text-white/95">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    {t.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Available now
              </p>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                Limited
              </span>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-2">
              {available.map((t) => (
                <li key={t} className="flex items-baseline gap-2 text-white/90">
                  <TrendingUp
                    className="size-3.5 shrink-0 translate-y-0.5 text-brand-gold"
                    aria-hidden="true"
                  />
                  <span className="font-display text-base font-normal">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/45">
              Other markets considered on application.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact/?intent=franchise&topic=territory"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
          >
            Check availability for your market
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
    </section>
  )
}

// ─── PullQuote - large magazine-style centered quote with CountUp outcome below.
// Pair of these stacks vertically.
// ─────────────────────────────────────────────────────────────────────────────

interface PullQuoteProps {
  quote: string
  attribution: string
  market: string
  outcomeValue: number
  outcomePrefix?: string
  outcomeSuffix?: string
  outcomeDecimals?: number
  outcomeLabel: string
  /** Optional separator above quote */
  showRule?: boolean
  children?: ReactNode
}

export function PullQuote({
  quote,
  attribution,
  market,
  outcomeValue,
  outcomePrefix = '',
  outcomeSuffix = '',
  outcomeDecimals = 0,
  outcomeLabel,
  showRule = false,
}: PullQuoteProps) {
  return (
    <figure className="relative mx-auto max-w-3xl text-center">
      {showRule && (
        <div
          aria-hidden="true"
          className="mx-auto mb-14 h-px w-24 bg-brand-gold/50"
        />
      )}
      <blockquote className="font-display text-3xl font-normal italic leading-[1.2] text-brand-navy sm:text-4xl lg:text-[2.75rem]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
          {attribution}
          <span className="mx-2 text-brand-navy/30">/</span>
          <span className="text-brand-navy/55">{market}</span>
        </p>
        <p className="mt-8">
          <LongCountUp
            value={outcomeValue}
            prefix={outcomePrefix}
            suffix={outcomeSuffix}
            decimals={outcomeDecimals}
            durationMs={2400}
            className="font-display text-6xl font-normal text-brand-navy sm:text-7xl lg:text-[5.5rem]"
          />
        </p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
          {outcomeLabel}
        </p>
      </figcaption>
    </figure>
  )
}
