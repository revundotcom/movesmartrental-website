'use client'

import Image from 'next/image'
import {
  ArrowRight,
  Check,
  CheckCircle,
  DollarSign,
  Megaphone,
  Monitor,
  Paintbrush,
  Shield,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'

import { BrowserFrame } from '@/components/ui/browser-frame'
import { OwnerDashboardMockup } from '@/components/portal-mockups/owner-dashboard-mockup'
import { ShowingsOffersMockup } from '@/components/portal-mockups/showings-offers-mockup'
import { PropertiesListMockup } from '@/components/portal-mockups/properties-list-mockup'
import { AnalyticsMockup } from '@/components/portal-mockups/analytics-mockup'

const EASE = [0.22, 1, 0.36, 1] as const

// Local icon registry — server components pass a string `iconKey` (serializable)
// and we resolve to the LucideIcon here on the client side. Lucide icons
// themselves cannot cross the RSC boundary because they carry forwardRef
// methods.
const ICON_REGISTRY: Record<string, LucideIcon> = {
  DollarSign,
  Monitor,
  Users,
  Megaphone,
  Shield,
  CheckCircle,
  Paintbrush,
  TrendingUp,
  Zap,
}

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
 * PainPointCard - image-led card for a single landlord pain point.
 * Hero photo on top with floating tag pill + icon badge, then a clean
 * Problem → Fix split inside the body. Lifts on hover with image zoom.
 * ──────────────────────────────────────────────────────────────────────── */
export function PainPointCard({
  index,
  tag,
  iconKey,
  imageSrc,
  imageAlt,
  problem,
  solution,
}: {
  index: number
  tag: string
  iconKey: string
  imageSrc: string
  imageAlt: string
  problem: string
  solution: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeral = String(index + 1).padStart(2, '0')
  const Icon = ICON_REGISTRY[iconKey] ?? DollarSign

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      {/* Hero image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 600px"
          unoptimized
        />
        {/* Navy gradient for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/15 to-transparent"
        />

        {/* Top-left tag pill */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
          <span>Pain {numeral}</span>
        </div>

        {/* Bottom-left icon + tag */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              {tag}
            </p>
          </div>
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        {/* Problem */}
        <div>
          <div className="flex items-center gap-2">
            <span className="block h-px w-6 bg-rose-400" aria-hidden="true" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-500">
              The Problem
            </p>
          </div>
          <p className="mt-2 font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
            {problem}
          </p>
        </div>

        {/* Arrow divider */}
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="block h-px flex-1 bg-slate-200" />
          <span className="flex size-7 items-center justify-center rounded-full border border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald">
            <ArrowRight className="size-3.5" strokeWidth={2.5} />
          </span>
          <span className="block h-px flex-1 bg-slate-200" />
        </div>

        {/* Solution */}
        <div className="mt-auto rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-brand-emerald text-white">
              <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              How MoveSmart fixes it
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
            {solution}
          </p>
        </div>
      </div>
    </motion.article>
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

/* ────────────────────────────────────────────────────────────────────────
 * PortalShowcase - tabbed interface for the four portal mockups.
 * Left: a vertical feature list (click to switch). Right: the active
 * mockup inside a BrowserFrame, with cross-fade between views.
 * Replaces the previous heavy stacked layout.
 * ──────────────────────────────────────────────────────────────────────── */

const PORTAL_TABS = [
  {
    id: 'dashboard',
    title: 'Owner dashboard',
    description:
      'Properties, offers, tours, and occupancy at a glance — the first thing you see when you log in.',
    url: 'portal.movesmart.ca/owner/dashboard',
  },
  {
    id: 'showings',
    title: 'Showings & offers',
    description:
      'Every booked showing and live offer in one stream — timestamps, status, the team member running it.',
    url: 'portal.movesmart.ca/owner/showings',
  },
  {
    id: 'properties',
    title: 'Properties & applicants',
    description:
      'Every unit, every applicant, every screening file — one click from approval or counter-offer.',
    url: 'portal.movesmart.ca/owner/properties',
  },
  {
    id: 'analytics',
    title: 'Leasing analytics',
    description:
      'Lead-to-lease funnel, conversion rates, and source attribution — the same numbers your leasing lead works from.',
    url: 'portal.movesmart.ca/owner/analytics',
  },
] as const

type PortalTabId = (typeof PORTAL_TABS)[number]['id']

function PortalMockup({ id }: { id: PortalTabId }) {
  switch (id) {
    case 'dashboard':
      return <OwnerDashboardMockup />
    case 'showings':
      return <ShowingsOffersMockup />
    case 'properties':
      return <PropertiesListMockup />
    case 'analytics':
      return <AnalyticsMockup />
  }
}

export function PortalShowcase() {
  const [activeId, setActiveId] = useState<PortalTabId>('dashboard')
  const active = PORTAL_TABS.find((t) => t.id === activeId) ?? PORTAL_TABS[0]

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
      {/* LEFT: feature list / tabs */}
      <div className="lg:col-span-5">
        <ol className="space-y-2">
          {PORTAL_TABS.map((tab, idx) => {
            const isActive = tab.id === activeId
            const numeral = String(idx + 1).padStart(2, '0')
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  aria-pressed={isActive}
                  className={`group relative flex w-full items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-brand-emerald/40 bg-white shadow-md shadow-brand-navy/5'
                      : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-white/60'
                  }`}
                >
                  {/* Active rail */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-3 left-0 w-0.5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-brand-emerald' : 'bg-transparent'
                    }`}
                  />
                  <span
                    className={`mt-0.5 font-display text-sm italic tabular-nums ${
                      isActive ? 'text-brand-emerald' : 'text-brand-gold/70'
                    }`}
                  >
                    {numeral}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-display text-lg font-normal leading-snug ${
                        isActive ? 'text-brand-navy' : 'text-brand-navy/70'
                      }`}
                    >
                      {tab.title}
                    </p>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed transition-all ${
                        isActive ? 'text-slate-600' : 'text-slate-500'
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* RIGHT: active mockup */}
      <div className="lg:col-span-7">
        <div className="relative">
          {/* Soft glow underneath */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-emerald-100/40 via-transparent to-amber-100/30 blur-2xl"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <BrowserFrame url={active.url}>
                <div className="max-h-[560px] overflow-hidden">
                  <PortalMockup id={active.id} />
                </div>
              </BrowserFrame>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
