'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

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

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]

export function ProblemSolutionShowcase() {
  const prefersReducedMotion = useReducedMotion()

  const listRef = useRef<HTMLOListElement>(null)

  // Track scroll progress through the cards list so we can drive a progress rail.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 80%', 'end 20%'],
  })
  const progressY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.4,
  })
  const progressHeight = useTransform(progressY, (v) => `${v * 100}%`)

  const headerTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE }

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      {/* Ivory gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#FBFAF6]/60 to-white"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={headerTransition}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            The Problem We Solve
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Leasing Friction,{' '}
            <span className="font-display italic text-brand-emerald">Resolved</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Owners and operators don&apos;t need another overpromising agent. They need
            disciplined leasing execution, brick-by-brick, with full visibility from listing
            to move-in.
          </p>
        </motion.div>

        {/* Scroll-driven list with progress rail */}
        <div className="relative mt-12 md:mt-14">
          {/* Vertical progress rail (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px bg-slate-200/80 md:block lg:-left-6"
          >
            <motion.span
              style={{ height: prefersReducedMotion ? '100%' : progressHeight }}
              className="absolute inset-x-0 top-0 block bg-gradient-to-b from-brand-emerald via-brand-emerald/70 to-brand-emerald/20"
            />
          </div>

          <ol ref={listRef} className="space-y-6 md:space-y-8">
            {PAIRS.map((pair, i) => (
              <PairCard
                key={pair.key}
                pair={pair}
                index={i}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </ol>
        </div>

        {/* Footer accent line */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: EASE, delay: 0.2 }
          }
          className="mt-12 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-navy/60 md:mt-16"
        >
          <span className="h-px w-10 bg-brand-emerald/40" />
          <Sparkles className="size-3.5 text-brand-gold" aria-hidden="true" />
          <span>From listing to move-in</span>
          <span className="h-px w-10 bg-brand-emerald/40" />
        </motion.div>
      </div>
    </section>
  )
}

function PairCard({
  pair,
  index,
  prefersReducedMotion,
}: {
  pair: Pair
  index: number
  prefersReducedMotion: boolean
}) {
  const step = String(index + 1).padStart(2, '0')

  // Per-card viewport orchestration: we let the parent's whileInView trigger
  // initial/animate, and use `variants` so children sequence naturally via
  // `staggerChildren`. This gives the card a phased in-and-out story:
  // 1. card frame fades + slides up
  // 2. header strip slides in from the left
  // 3. problem column fades + slides from the left
  // 4. arrow pops and glows
  // 5. solution column fades + slides from the right
  const cardVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: EASE,
            delayChildren: 0.1,
            staggerChildren: 0.08,
          },
        },
      }

  const headerVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -18 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }

  const problemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -24 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      }

  const arrowVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.55 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: EASE },
        },
      }

  const solutionVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: 24 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      }

  const numberVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: EASE },
        },
      }

  return (
    <li className="relative">
      {/* Progress node that aligns with the vertical rail (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[14px] top-8 hidden size-2 rounded-full bg-white ring-2 ring-brand-emerald/50 md:block lg:-left-[26px]"
      >
        <motion.span
          initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: EASE, delay: 0.1 }
          }
          className="absolute inset-0.5 rounded-full bg-brand-emerald"
        />
      </div>

      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_-18px_rgba(11,29,58,0.18)] transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-[0_16px_40px_-18px_rgba(11,29,58,0.28)]"
      >
        {/* Top accent bar that scales in on reveal */}
        <motion.span
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: EASE, delay: 0.15 }
          }
          className="absolute inset-x-0 top-0 block h-0.5 origin-left bg-gradient-to-r from-brand-gold/70 via-brand-emerald/70 to-brand-emerald/20"
        />

        {/* Header strip */}
        <motion.div
          variants={headerVariants}
          className="flex items-center justify-between gap-4 border-b border-slate-200/70 bg-[#FBFAF6] px-5 py-3 sm:px-6 sm:py-4"
        >
          <div className="flex items-center gap-3">
            <motion.span
              variants={numberVariants}
              className="font-display text-2xl italic leading-none text-brand-gold"
              aria-hidden="true"
            >
              {step}
            </motion.span>
            <span className="h-4 w-px bg-slate-300" aria-hidden="true" />
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brand-navy/70">
              {pair.tag}
            </span>
          </div>
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: EASE, delay: 0.45 }
            }
            className="hidden items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-emerald sm:inline-flex"
          >
            <motion.span
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.4,
                      ease: EASE,
                      delay: 0.5,
                    }
              }
              className="inline-block size-1.5 rounded-full bg-brand-emerald"
            />
            Resolved
          </motion.span>
        </motion.div>

        {/* Two-column body: problem | arrow | solution */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
          {/* Problem column */}
          <motion.div
            variants={problemVariants}
            className="relative bg-rose-50/60 px-5 py-5 sm:px-6 sm:py-6"
          >
            {/* Subtle rose shimmer that sweeps in */}
            <motion.span
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.8, ease: EASE, delay: 0.25 }
              }
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(244,63,94,0.08),transparent_60%)]"
            />
            <div className="relative flex items-center gap-2">
              <span
                className="inline-block size-1.5 rounded-full bg-rose-500"
                aria-hidden="true"
              />
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-rose-600">
                Before
              </p>
            </div>
            <p className="relative mt-2 text-[0.95rem] leading-relaxed text-slate-600">
              {pair.problem}
            </p>
          </motion.div>

          {/* Divider arrow */}
          <div
            aria-hidden="true"
            className="relative flex items-center justify-center bg-white px-0 py-2 md:px-3 md:py-0"
          >
            {/* Mobile horizontal rule */}
            <span className="h-px w-full bg-slate-200 md:hidden" />
            {/* Desktop vertical rule */}
            <span className="absolute inset-y-5 left-1/2 hidden w-px -translate-x-1/2 bg-slate-200 md:block" />
            <motion.span
              variants={arrowVariants}
              className="relative z-10 inline-flex size-8 items-center justify-center rounded-full border border-brand-emerald/30 bg-white text-brand-emerald shadow-sm"
            >
              {/* Pulsing halo behind the arrow */}
              {!prefersReducedMotion && (
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{
                    scale: [0.7, 1.4, 0.7],
                    opacity: [0, 0.35, 0],
                  }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 1.8,
                    ease: 'easeInOut',
                    delay: 0.5,
                    repeat: 0,
                  }}
                  className="absolute inset-0 rounded-full bg-brand-emerald/50"
                />
              )}
              <motion.span
                initial={prefersReducedMotion ? false : { x: -4, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.45, ease: EASE, delay: 0.55 }
                }
                className="inline-flex"
              >
                <ArrowRight
                  className="size-4 rotate-90 md:rotate-0"
                  aria-hidden="true"
                />
              </motion.span>
            </motion.span>
          </div>

          {/* Solution column */}
          <motion.div
            variants={solutionVariants}
            className="relative px-5 py-5 sm:px-6 sm:py-6"
          >
            <motion.span
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.8, ease: EASE, delay: 0.4 }
              }
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(16,185,129,0.08),transparent_60%)]"
            />
            <div className="relative flex items-center gap-2">
              <span
                className="inline-block size-1.5 rounded-full bg-brand-emerald"
                aria-hidden="true"
              />
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brand-emerald">
                The MoveSmart Way
              </p>
            </div>
            <p className="relative mt-2 text-[1rem] font-medium leading-relaxed text-brand-navy">
              {pair.solution}
            </p>
          </motion.div>
        </div>

        {/* Bottom edge accent on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-emerald/0 via-brand-emerald/60 to-brand-emerald/0 transition-transform duration-500 group-hover:scale-x-100"
        />
      </motion.article>
    </li>
  )
}
