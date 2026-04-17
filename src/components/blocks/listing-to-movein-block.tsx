'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  DollarSign,
  Megaphone,
  Users,
  FileSignature,
  ClipboardCheck,
  FileText,
  KeyRound,
  Check,
} from 'lucide-react'

/* ---------- Step data ------------------------------------------------------- */

type Step = {
  icon: typeof DollarSign
  title: string
  description: string
  day: string
}

const STEPS: readonly Step[] = [
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description:
      'We analyze the market and set the right rental price to maximize your return while minimizing vacancy.',
    day: 'Day 1',
  },
  {
    icon: Megaphone,
    title: 'Professional Marketing',
    description:
      'Professional photography, MLS distribution, and syndication across 50+ rental platforms.',
    day: 'Day 2, 3',
  },
  {
    icon: Users,
    title: 'Managed Showings',
    description:
      'Our team handles all property showings, pre-screening inquiries, and follow-ups.',
    day: 'Day 4 to 9',
  },
  {
    icon: FileSignature,
    title: 'Offer Management',
    description:
      'We present and negotiate offers, ensuring the best terms for your property.',
    day: 'Day 10, 11',
  },
  {
    icon: ClipboardCheck,
    title: 'Tenant Qualification',
    description:
      'Credit checks, employment verification, references, and full rental history review.',
    day: 'Day 12, 13',
  },
  {
    icon: FileText,
    title: 'Lease Execution',
    description:
      'Legally compliant lease preparation, signing, and documentation handled end-to-end.',
    day: 'Day 14, 15',
  },
  {
    icon: KeyRound,
    title: 'Move-In Coordination',
    description:
      'Key handoff, condition reporting, and move-in inspection managed seamlessly.',
    day: 'Day 16 to 18',
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

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.08,
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  }

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
          <Timeline prefersReducedMotion={prefersReducedMotion ?? false} cardVariants={cardVariants} />
        </div>

        {/* ── Status panel ───────────────────────────────────────────────── */}
        <div className="mt-16">
          <StatusPanel prefersReducedMotion={prefersReducedMotion ?? false} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Timeline (desktop horizontal, mobile vertical) ------------------ */

type CardVariants = {
  hidden: { opacity: number; y: number }
  visible: (i: number) => {
    opacity: number
    y: number
    transition: { delay: number; duration: number; ease: readonly [number, number, number, number] }
  }
}

function Timeline({
  prefersReducedMotion,
  cardVariants,
}: {
  prefersReducedMotion: boolean
  cardVariants: CardVariants
}) {
  return (
    <>
      {/* Desktop: horizontal 4-column grid over 2 rows */}
      <div className="hidden lg:block">
        <DesktopTimeline
          prefersReducedMotion={prefersReducedMotion}
          cardVariants={cardVariants}
        />
      </div>

      {/* Tablet: 2-column grid with vertical connector */}
      <div className="hidden sm:block lg:hidden">
        <TabletTimeline
          prefersReducedMotion={prefersReducedMotion}
          cardVariants={cardVariants}
        />
      </div>

      {/* Mobile: single-column vertical timeline */}
      <div className="sm:hidden">
        <MobileTimeline
          prefersReducedMotion={prefersReducedMotion}
          cardVariants={cardVariants}
        />
      </div>
    </>
  )
}

/* ---------- Desktop Timeline ------------------------------------------------ */

function DesktopTimeline({
  prefersReducedMotion,
  cardVariants,
}: {
  prefersReducedMotion: boolean
  cardVariants: CardVariants
}) {
  // Two rows of 4 + 3 cards, connector line draws across each row
  const row1 = STEPS.slice(0, 4)
  const row2 = STEPS.slice(4)

  return (
    <div className="space-y-14">
      <TimelineRow
        steps={row1}
        startIndex={0}
        prefersReducedMotion={prefersReducedMotion}
        cardVariants={cardVariants}
      />
      <TimelineRow
        steps={row2}
        startIndex={4}
        prefersReducedMotion={prefersReducedMotion}
        cardVariants={cardVariants}
      />
    </div>
  )
}

function TimelineRow({
  steps,
  startIndex,
  prefersReducedMotion,
  cardVariants,
}: {
  steps: readonly Step[]
  startIndex: number
  prefersReducedMotion: boolean
  cardVariants: CardVariants
}) {
  const cols = steps.length
  return (
    <div className="relative">
      {/* Drawing connector line */}
      <motion.div
        className="absolute top-7 h-0.5 origin-left bg-gradient-to-r from-brand-emerald/50 via-brand-emerald/70 to-brand-emerald/20"
        style={{
          left: `calc(${100 / cols / 2}%)`,
          right: `calc(${100 / cols / 2}%)`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: '-80px' }}
        aria-hidden="true"
      />

      <div
        className="relative grid gap-6"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {steps.map((step, i) => (
          <StepCard
            key={step.title}
            step={step}
            index={startIndex + i}
            cardVariants={cardVariants}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- Tablet Timeline (2 columns) ------------------------------------- */

function TabletTimeline({
  prefersReducedMotion,
  cardVariants,
}: {
  prefersReducedMotion: boolean
  cardVariants: CardVariants
}) {
  return (
    <div className="relative">
      {/* Vertical center connector */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top bg-gradient-to-b from-brand-emerald/40 via-brand-emerald/60 to-brand-emerald/20"
        style={{ height: '100%' }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: '-80px' }}
        aria-hidden="true"
      />
      <div className="relative grid grid-cols-2 gap-6">
        {STEPS.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} cardVariants={cardVariants} />
        ))}
      </div>
    </div>
  )
}

/* ---------- Mobile Timeline (vertical) -------------------------------------- */

function MobileTimeline({
  prefersReducedMotion,
  cardVariants,
}: {
  prefersReducedMotion: boolean
  cardVariants: CardVariants
}) {
  return (
    <div className="relative">
      {/* Vertical connector on the left */}
      <motion.div
        className="absolute left-7 top-0 w-0.5 origin-top bg-gradient-to-b from-brand-emerald/50 via-brand-emerald/60 to-brand-emerald/15"
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

      <ol className="relative space-y-6">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.li
              key={step.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative flex gap-4"
            >
              {/* Number badge + ring */}
              <div className="relative z-10 shrink-0">
                <div className="flex size-14 items-center justify-center rounded-full bg-white ring-4 ring-brand-emerald/30 shadow-lg shadow-brand-navy/5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-emerald text-base font-bold text-white">
                    {i + 1}
                  </div>
                </div>
              </div>
              {/* Card */}
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-brand-emerald/10">
                    <Icon className="size-3.5 text-brand-emerald" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                    {step.day}
                  </p>
                </div>
                <h3 className="mt-2 text-base font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

/* ---------- Step Card (desktop + tablet) ------------------------------------ */

function StepCard({
  step,
  index,
  cardVariants,
}: {
  step: Step
  index: number
  cardVariants: CardVariants
}) {
  const Icon = step.icon
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="group relative flex flex-col items-center text-center"
    >
      {/* Numbered badge with emerald ring */}
      <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-white ring-4 ring-brand-emerald/30 shadow-lg shadow-brand-navy/5 transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="flex size-10 items-center justify-center rounded-full bg-brand-emerald text-base font-bold text-white">
          {index + 1}
        </div>
      </div>

      {/* Card body */}
      <div className="relative mt-5 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-emerald/30 group-hover:shadow-xl group-hover:shadow-brand-navy/5">
        {/* Icon + day tag */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand-emerald/10">
            <Icon className="size-4 text-brand-emerald" aria-hidden="true" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">
            {step.day}
          </p>
        </div>
        <h3 className="mt-3 text-base font-bold text-brand-navy">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
      </div>
    </motion.div>
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
