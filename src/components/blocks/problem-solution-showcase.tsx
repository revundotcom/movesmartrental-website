'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'

type PairKey = 'pricing' | 'screening' | 'showings' | 'fees'

interface Pair {
  key: PairKey
  tag: string
  problem: string
  solution: string
}

const PAIRS: Pair[] = [
  {
    key: 'pricing',
    tag: 'Pricing & Exposure',
    problem:
      'Vacant units sitting empty for weeks, with thin marketing reach and no clear pricing strategy.',
    solution:
      'Comparables-driven pricing combined with MLS, major rental websites, paid social distribution, photography, and virtual tours.',
  },
  {
    key: 'screening',
    tag: 'Tenant Screening',
    problem:
      'Unstructured screening that misses red flags or feels like a black box for owners and applicants alike.',
    solution:
      'Structured tenant qualification: credit, income, employment, references, risk scoring, and a documented audit trail for every file.',
  },
  {
    key: 'showings',
    tag: 'Showings & Visibility',
    problem:
      'Disorganized showings, missed leads, and zero visibility into who saw the unit or what they thought.',
    solution:
      'Coordinated agent-led showings, open houses, developer tours, and a portal log of every applicant interaction.',
  },
  {
    key: 'fees',
    tag: 'Fees & Scope',
    problem:
      'Hidden upfront fees and surprise charges from generalist agents who quietly drift outside their scope.',
    solution:
      'Zero upfront. Standard leasing success fee on placement. Optional rental protection through partner pathways. Nothing beyond move-in.',
  },
]

export function ProblemSolutionShowcase() {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll progress across the tall container; sticky child stays pinned.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.2,
    restDelta: 0.0005,
  })

  // Total height = (PAIRS.length) * 100vh so each phase gets its own viewport slice.
  // Reduced motion: collapse to a normal section, no pin.
  if (prefersReducedMotion) {
    return (
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Header />
          <ol className="mt-12 space-y-6">
            {PAIRS.map((pair, i) => (
              <li
                key={pair.key}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <StaticCard pair={pair} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${PAIRS.length * 100}vh` }}
      aria-label="Leasing Friction, Resolved"
    >
      {/* Sticky stage — everything inside stays pinned for the duration of the section */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* Soft ivory wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#FBFAF6]/60 to-white"
        />

        {/* Subtle decorative grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-[340px_220px_1fr] lg:gap-10 lg:px-8">
          {/* LEFT: pinned header */}
          <div className="lg:pt-2">
            <Header />
            {/* On small screens the step indicator stacks under the header */}
            <div className="mt-8 lg:hidden">
              <StepIndicator progress={smoothProgress} />
            </div>
          </div>

          {/* MIDDLE: vertical step rail, visible alongside the card on lg+ */}
          <div className="hidden lg:flex lg:flex-col lg:justify-center lg:pt-4">
            <StepIndicator progress={smoothProgress} />
          </div>

          {/* RIGHT: phase stage */}
          <div className="relative h-[360px] sm:h-[380px] md:h-[400px]">
            {PAIRS.map((pair, i) => (
              <Phase
                key={pair.key}
                pair={pair}
                index={i}
                total={PAIRS.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Header                                                            */
/* ------------------------------------------------------------------ */

function Header() {
  return (
    <div className="max-w-md">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
        The Problem We Solve
      </p>
      <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
        Leasing Friction,{' '}
        <span className="font-display italic text-brand-emerald">Resolved</span>
      </h2>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
        Owners and operators don&apos;t need another overpromising agent. They
        need disciplined leasing execution, brick-by-brick, with full visibility
        from listing to move-in.
      </p>

      <div className="mt-6 inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand-navy/60">
        <span className="h-px w-8 bg-brand-emerald/40" />
        <Sparkles className="size-3.5 text-brand-gold" aria-hidden="true" />
        <span>Listing to move-in</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step indicator (left rail of dots that fill as you scroll)        */
/* ------------------------------------------------------------------ */

function StepIndicator({ progress }: { progress: MotionValue<number> }) {
  return (
    <ol className="mt-10 flex flex-col gap-3">
      {PAIRS.map((pair, i) => (
        <StepRow key={pair.key} index={i} total={PAIRS.length} progress={progress} pair={pair} />
      ))}
    </ol>
  )
}

function StepRow({
  index,
  total,
  progress,
  pair,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  pair: Pair
}) {
  // Each step "owns" 1/total slice of the scroll
  const start = index / total
  const end = (index + 1) / total

  // Smooth ramp into the active state, then sustain
  const fill = useTransform(
    progress,
    [Math.max(start - 0.06, 0), start, end - 0.001, end],
    ['0%', '100%', '100%', index === total - 1 ? '100%' : '100%'],
  )
  const opacity = useTransform(progress, [Math.max(start - 0.08, 0), start], [0.45, 1])
  const numeralColor = useTransform(
    progress,
    [Math.max(start - 0.06, 0), start],
    ['rgba(11,29,58,0.35)', 'rgba(15,142,107,1)'],
  )

  return (
    <li className="relative">
      <motion.div
        style={{ opacity }}
        className="flex items-center gap-4"
      >
        {/* Bar — big gray, fills in emerald as you scroll into this phase */}
        <div
          className="relative h-2 w-20 shrink-0 overflow-hidden rounded-full bg-slate-200"
          aria-hidden="true"
        >
          <motion.span
            style={{ width: fill }}
            className="absolute inset-y-0 left-0 block rounded-full bg-gradient-to-r from-brand-emerald to-emerald-500"
          />
        </div>
        {/* Numeral + title */}
        <div className="flex items-baseline gap-3">
          <motion.span
            style={{ color: numeralColor }}
            className="font-display text-base font-bold tabular-nums"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
          <span className="text-sm font-semibold text-brand-navy">
            {pair.tag}
          </span>
        </div>
      </motion.div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/*  Phase card — fades + slides in/out tied to scroll progress        */
/* ------------------------------------------------------------------ */

function Phase({
  pair,
  index,
  total,
  progress,
}: {
  pair: Pair
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // Each phase owns 1/total of scroll. Fade in / hold / fade out within that slice.
  const slice = 1 / total
  const start = index * slice
  const end = (index + 1) * slice

  // Wider fade window for smoother cross-dissolves between phases.
  const fadeIn = start + slice * 0.18
  const fadeOut = end - slice * 0.18

  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  )
  const y = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [24, 0, 0, index === total - 1 ? 0 : -24],
  )
  const scale = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0.98, 1, 1, index === total - 1 ? 1 : 0.98],
  )

  const step = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      style={{ opacity, y, scale, willChange: 'transform, opacity' }}
      className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-24px_rgba(11,29,58,0.22)]"
    >
      {/* Top accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-1 bg-gradient-to-r from-brand-gold/70 via-brand-emerald/80 to-brand-emerald/20"
      />

      {/* Header strip */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 bg-[#FBFAF6] px-6 py-3.5 sm:px-7 sm:py-4">
        <div className="flex items-center gap-3">
          <span
            className="font-display text-2xl italic leading-none text-brand-gold"
            aria-hidden="true"
          >
            {step}
          </span>
          <span className="h-4 w-px bg-slate-300" aria-hidden="true" />
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brand-navy/70 sm:text-xs">
            {pair.tag}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-emerald">
          <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
          Resolved
        </span>
      </div>

      {/* Two-column body */}
      <div className="grid h-[calc(100%-64px)] grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
        {/* Problem column */}
        <div className="relative bg-rose-50/60 px-6 py-5 sm:px-7 sm:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(244,63,94,0.10),transparent_60%)]"
          />
          <div className="relative flex items-center gap-2">
            <AlertCircle className="size-3.5 text-rose-500" aria-hidden="true" />
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-rose-600">
              Before
            </p>
          </div>
          <p className="relative mt-3 text-[0.95rem] leading-relaxed text-slate-600 md:text-base">
            {pair.problem}
          </p>
        </div>

        {/* Divider arrow */}
        <div
          aria-hidden="true"
          className="relative flex items-center justify-center bg-white px-0 py-2 md:px-4 md:py-0"
        >
          <span className="h-px w-full bg-slate-200 md:hidden" />
          <span className="absolute inset-y-4 left-1/2 hidden w-px -translate-x-1/2 bg-slate-200 md:block" />
          <span className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-brand-emerald/30 bg-white text-brand-emerald shadow-sm">
            <ArrowRight className="size-4 rotate-90 md:rotate-0" aria-hidden="true" />
          </span>
        </div>

        {/* Solution column */}
        <div className="relative px-6 py-5 sm:px-7 sm:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(16,185,129,0.10),transparent_60%)]"
          />
          <div className="relative flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-brand-emerald" aria-hidden="true" />
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brand-emerald">
              The MoveSmart Way
            </p>
          </div>
          <p className="relative mt-3 text-[1rem] font-medium leading-relaxed text-brand-navy md:text-[1.05rem]">
            {pair.solution}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

/* ------------------------------------------------------------------ */
/*  Static fallback card for reduced-motion users                     */
/* ------------------------------------------------------------------ */

function StaticCard({ pair, index }: { pair: Pair; index: number }) {
  const step = String(index + 1).padStart(2, '0')
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-display text-xl italic text-brand-gold">{step}</span>
        <span className="h-4 w-px bg-slate-300" />
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-navy/70">
          {pair.tag}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-rose-50/60 p-4">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-rose-600">
            Before
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {pair.problem}
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50/60 p-4">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brand-emerald">
            The MoveSmart Way
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-brand-navy">
            {pair.solution}
          </p>
        </div>
      </div>
    </div>
  )
}
