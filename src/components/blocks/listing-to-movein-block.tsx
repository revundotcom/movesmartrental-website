'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ComponentType } from 'react'

import { BrowserFrame } from '@/components/ui/browser-frame'
import { AnalyticsMockup } from '@/components/portal-mockups/analytics-mockup'
import { OwnerDashboardMockup } from '@/components/portal-mockups/owner-dashboard-mockup'
import { PropertiesListMockup } from '@/components/portal-mockups/properties-list-mockup'
import { ShowingsOffersMockup } from '@/components/portal-mockups/showings-offers-mockup'

/* ---------- Step data ------------------------------------------------------- */

type Step = {
  title: string
  description: string
  mockup: ComponentType
  mockupUrl: string
}

const STEPS: readonly Step[] = [
  {
    title: 'Competitive Pricing',
    description:
      'We analyze the market and set the right rental price to maximize your return while minimizing vacancy.',
    mockup: AnalyticsMockup,
    mockupUrl: 'movesmart.ca/analytics',
  },
  {
    title: 'Professional Marketing',
    description:
      'Professional photography, MLS distribution, and syndication across 50+ rental platforms.',
    mockup: PropertiesListMockup,
    mockupUrl: 'movesmart.ca/properties',
  },
  {
    title: 'Managed Showings',
    description:
      'Our team handles all property showings, pre-screening inquiries, and follow-ups.',
    mockup: ShowingsOffersMockup,
    mockupUrl: 'movesmart.ca/showings',
  },
  {
    title: 'Offer Management',
    description:
      'We present and negotiate offers, ensuring the best terms for your property.',
    mockup: ShowingsOffersMockup,
    mockupUrl: 'movesmart.ca/offers',
  },
  {
    title: 'Tenant Qualification',
    description:
      'Credit checks, employment verification, references, and full rental history review.',
    mockup: AnalyticsMockup,
    mockupUrl: 'movesmart.ca/screening',
  },
  {
    title: 'Lease Execution',
    description:
      'Legally compliant lease preparation, signing, and documentation handled end-to-end.',
    mockup: OwnerDashboardMockup,
    mockupUrl: 'movesmart.ca/lease',
  },
  {
    title: 'Move-In Coordination',
    description:
      'Key handoff, condition reporting, and move-in inspection managed seamlessly.',
    mockup: OwnerDashboardMockup,
    mockupUrl: 'movesmart.ca/move-in',
  },
] as const

/* ---------- "What you get" status cards ------------------------------------ */

type StatusCard = {
  label: string
  detail: string
}

const STATUS_CARDS: readonly StatusCard[] = [
  {
    label: 'Marketing Live',
    detail: 'MLS syndication, 50+ portals, professional photos.',
  },
  {
    label: 'Tenant Qualified',
    detail: 'Credit 780, employment verified, references clear.',
  },
  {
    label: 'Lease Signed',
    detail: 'E-sign complete, deposit in trust.',
  },
] as const

/* ---------- Component ------------------------------------------------------- */

export function ListingToMoveInBlock() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden bg-[#FBFAF6]"
      aria-labelledby="listing-to-movein-heading"
    >
      {/* Faint navy grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#0B1D3A 1px, transparent 1px), linear-gradient(90deg, #0B1D3A 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      {/* Ambient emerald glows */}
      <div
        className="absolute -right-40 -top-40 size-[500px] rounded-full bg-brand-emerald/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand-emerald/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 lg:py-16">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Our Process
          </p>
          <h2
            id="listing-to-movein-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl"
          >
            From <span className="text-brand-emerald">Listing</span> to Move-In
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            A disciplined leasing sequence handled entirely by our team. Every applicant logged, every approval recorded, every key release documented.
          </p>
        </div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <div className="mt-14">
          <Timeline prefersReducedMotion={prefersReducedMotion ?? false} />
        </div>

        {/* ── Status panel ───────────────────────────────────────────────── */}
        <div className="mt-16">
          <StatusPanel prefersReducedMotion={prefersReducedMotion ?? false} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Timeline -------------------------------------------------------- */

function Timeline({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <div className="relative">
      {/* Vertical spine connector (visible on md+) */}
      <motion.div
        className="pointer-events-none absolute left-7 top-0 w-0.5 origin-top bg-gradient-to-b from-brand-emerald/50 via-brand-emerald/60 to-brand-emerald/15 md:left-1/2 md:-translate-x-1/2"
        style={{ bottom: 0 }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: '-80px' }}
        aria-hidden="true"
      />

      <ol className="relative space-y-10 md:space-y-16">
        {STEPS.map((step, i) => (
          <StepRow
            key={step.title}
            step={step}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </ol>
    </div>
  )
}

/* ---------- Step Row (image + text, alternating on desktop) ----------------- */

function StepRow({
  step,
  index,
  prefersReducedMotion,
}: {
  step: Step
  index: number
  prefersReducedMotion: boolean
}) {
  const Mockup = step.mockup
  const isReversed = index % 2 === 1

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Mobile + tablet: badge sits on the left spine */}
      <div className="md:hidden">
        <div className="flex gap-4">
          <div className="relative z-10 shrink-0">
            <div className="flex size-14 items-center justify-center rounded-full bg-white ring-4 ring-brand-emerald/30 shadow-lg shadow-brand-navy/5">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-emerald text-base font-bold text-white">
                {index + 1}
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-base font-bold text-brand-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
            <BrowserFrame url={step.mockupUrl} className="bg-white">
              <div className="pointer-events-none origin-top scale-[0.78] sm:scale-90">
                <Mockup />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>

      {/* Desktop: alternating two-column layout with center spine + badge */}
      <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-12">
        {/* Centered badge on the spine */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex size-14 items-center justify-center rounded-full bg-white ring-4 ring-brand-emerald/30 shadow-lg shadow-brand-navy/5">
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-emerald text-base font-bold text-white">
              {index + 1}
            </div>
          </div>
        </div>

        {/* Text card */}
        <div className={isReversed ? 'md:order-2 md:pl-16' : 'md:order-1 md:pr-16 md:text-right'}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-xl hover:shadow-brand-navy/5">
            <h3 className="text-xl font-bold text-brand-navy">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {step.description}
            </p>
          </div>
        </div>

        {/* Mockup */}
        <div className={isReversed ? 'md:order-1 md:pr-16' : 'md:order-2 md:pl-16'}>
          <BrowserFrame url={step.mockupUrl}>
            <div className="pointer-events-none h-[320px] origin-top-left scale-[0.6] overflow-hidden lg:h-[360px] lg:scale-[0.7]">
              <Mockup />
            </div>
          </BrowserFrame>
        </div>
      </div>
    </motion.li>
  )
}

/* ---------- Status Panel ---------------------------------------------------- */

function StatusPanel({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-brand-navy/5 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-emerald">
            What You Get
          </p>
          <h3 className="mt-2 font-display text-2xl font-normal text-brand-navy sm:text-3xl">
            Live milestones, logged in real time
          </h3>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-brand-emerald/25 bg-brand-emerald/5 px-3 py-1.5 sm:self-auto">
          <LivePulseDot prefersReducedMotion={prefersReducedMotion} />
          <span className="text-xs font-bold text-brand-navy">Live Feed</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {STATUS_CARDS.map((card, i) => (
          <StatusMiniCard
            key={card.label}
            card={card}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  )
}

function StatusMiniCard({
  card,
  index,
  prefersReducedMotion,
}: {
  card: StatusCard
  index: number
  prefersReducedMotion: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.08,
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-2xl border border-slate-200 bg-[#FBFAF6] p-4 transition-all duration-300 hover:border-brand-emerald/40 hover:bg-white hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/15">
          <Check className="size-4 text-brand-emerald" aria-hidden="true" strokeWidth={3} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-brand-navy">{card.label}</p>
            <LivePulseDot prefersReducedMotion={prefersReducedMotion} small />
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">{card.detail}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- Pulse Dot ------------------------------------------------------- */

function LivePulseDot({
  prefersReducedMotion,
  small = false,
}: {
  prefersReducedMotion: boolean
  small?: boolean
}) {
  const size = small ? 'size-1.5' : 'size-2'
  if (prefersReducedMotion) {
    return (
      <span
        className={`${size} shrink-0 rounded-full bg-brand-emerald`}
        aria-hidden="true"
      />
    )
  }
  return (
    <span className={`relative ${size} shrink-0`} aria-hidden="true">
      <span className={`absolute inset-0 rounded-full bg-brand-emerald/50 animate-ping`} />
      <span className={`relative block ${size} rounded-full bg-brand-emerald`} />
    </span>
  )
}
