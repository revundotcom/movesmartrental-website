'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  Headphones,
  KeyRound,
  Layers,
  MapPin,
  MessageSquare,
  Mic,
  PhoneCall,
  Send,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'

/* ---------- Types --------------------------------------------------------- */

type Bullet = {
  label: string
  icon: LucideIcon
}

type KpiCard = {
  badge: string
  title: string
  bullets: readonly Bullet[]
  imageSrc: string
  imageAlt: string
}

/* ---------- Card data ----------------------------------------------------- */

const DEMAND_CARD: KpiCard = {
  badge: 'Demand',
  title: 'Lead volume and source mix',
  imageSrc:
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
  imageAlt:
    'Rental inquiry arriving on a mobile phone — inbound lead capture across channels',
  bullets: [
    { label: 'Total leads, live', icon: BarChart3 },
    { label: 'Source mix across all channels', icon: Layers },
    { label: 'Facebook Marketplace, Kijiji, Zumper', icon: Globe },
    { label: 'PadMapper, Rentals.ca, Toronto Rentals', icon: Globe },
    { label: 'REW, Rent Canada, RentFaster', icon: Globe },
    { label: 'MLS / Realtor.ca', icon: Building2 },
    { label: 'Performance by source', icon: TrendingUp },
  ],
}

const ENGAGEMENT_CARD: KpiCard = {
  badge: 'Engagement',
  title: 'Response and communication',
  imageSrc:
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  imageAlt:
    'MoveSmart leasing team handling tenant inquiries by call, text, and email',
  bullets: [
    { label: 'Calls, texts, emails, web chat', icon: Headphones },
    { label: 'Response time by channel', icon: Clock },
    { label: 'Engaged-lead count and rate', icon: Users },
    { label: 'Full communication history', icon: MessageSquare },
    { label: 'Call transcripts and summaries', icon: Mic },
    { label: 'GPS attendance for showings', icon: MapPin },
  ],
}

const CONVERSION_CARD: KpiCard = {
  badge: 'Conversion',
  title: 'Pipeline to move-in',
  imageSrc:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  imageAlt:
    'Keys handed over to a new tenant at move-in — lease signed and conversion complete',
  bullets: [
    { label: 'Tours booked', icon: Target },
    { label: 'Tours attended', icon: CheckCircle2 },
    { label: 'Offers submitted', icon: Send },
    { label: 'Offers approved', icon: CheckCircle2 },
    { label: 'Move-ins', icon: KeyRound },
    { label: 'Days to lease, by asset', icon: Clock },
    { label: 'Cost per lease', icon: DollarSign },
  ],
}

/* ---------- Component ----------------------------------------------------- */

export function PortalVisibilityBlock() {
  const prefersReducedMotion = useReducedMotion() ?? false

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  }

  return (
    <section
      className="relative overflow-hidden bg-[#FBFAF6] py-16 md:py-20"
      aria-labelledby="portal-visibility-heading"
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
      {/* Ambient emerald glow */}
      <div
        className="absolute -right-40 top-20 size-[420px] rounded-full bg-brand-emerald/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-10 size-[360px] rounded-full bg-brand-emerald/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Real-Time Portal Visibility
          </p>
          <h2
            id="portal-visibility-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl"
          >
            You can verify everything yourself, in{' '}
            <span className="font-display italic text-brand-emerald">real time</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Not &lsquo;trust us&rsquo;. Owners and operators see the same live data MoveSmart operates against. Every lead, every call, every showing, every offer logged and visible from the moment a property goes live.
          </p>
        </div>

        {/* ── KPI Card Grid ──────────────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-7">
          <KpiFamilyCard
            card={DEMAND_CARD}
            index={0}
            cardVariants={cardVariants}
            visual={<DemandFunnelVisual prefersReducedMotion={prefersReducedMotion} />}
          />
          <KpiFamilyCard
            card={ENGAGEMENT_CARD}
            index={1}
            cardVariants={cardVariants}
            visual={<EngagementFeedVisual prefersReducedMotion={prefersReducedMotion} />}
          />
          <KpiFamilyCard
            card={CONVERSION_CARD}
            index={2}
            cardVariants={cardVariants}
            visual={<ConversionFunnelVisual prefersReducedMotion={prefersReducedMotion} />}
          />
        </div>

        {/* ── Footer Strip ───────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 md:mt-14 md:flex-row md:gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
            <Activity className="size-4 text-brand-navy" aria-hidden="true" />
            <span className="text-sm font-semibold text-brand-navy">
              Role-based access. Dashboards customizable. Portal is proprietary.
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/25 bg-brand-emerald/5 px-4 py-2">
            <LivePulseDot prefersReducedMotion={prefersReducedMotion} />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-navy">
              Live data, refreshed continuously
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- KPI Family Card ----------------------------------------------- */

type CardVariants = {
  hidden: { opacity: number; y: number }
  visible: (i: number) => {
    opacity: number
    y: number
    transition: {
      delay: number
      duration: number
      ease: readonly [number, number, number, number]
    }
  }
}

function KpiFamilyCard({
  card,
  index,
  cardVariants,
  visual,
}: {
  card: KpiCard
  index: number
  cardVariants: CardVariants
  visual: React.ReactNode
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_-18px_rgba(11,29,58,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-[0_18px_40px_-18px_rgba(11,29,58,0.22)]"
    >
      {/* Tinted navy badge bar */}
      <div className="flex items-center justify-between bg-brand-navy px-5 py-2.5">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white">
          {card.badge}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-emerald-light">
          KPI Family
        </span>
      </div>

      {/* Header image strip */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          unoptimized
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-brand-navy/15 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Micro visual */}
        <div className="rounded-xl border border-slate-100 bg-[#FBFAF6] p-3.5">
          {visual}
        </div>

        {/* Title */}
        <h3 className="mt-5 text-base font-bold text-brand-navy md:text-lg">
          {card.title}
        </h3>

        {/* Bullets */}
        <ul className="mt-4 space-y-2.5">
          {card.bullets.map((bullet) => {
            const Icon = bullet.icon
            return (
              <li
                key={bullet.label}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-brand-emerald/10">
                  <Icon className="size-3 text-brand-emerald" aria-hidden="true" />
                </span>
                <span>{bullet.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.div>
  )
}

/* ---------- Card 1: Demand bars ------------------------------------------- */

function DemandFunnelVisual({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean
}) {
  const rows = [
    { label: 'All leads', width: 100, tone: 'bg-brand-navy' },
    { label: 'Engaged', width: 78, tone: 'bg-brand-navy/75' },
    { label: 'Toured', width: 52, tone: 'bg-brand-navy/55' },
    { label: 'Leased', width: 30, tone: 'bg-brand-emerald' },
  ] as const

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Lead funnel
        </span>
        <span className="text-[10px] font-semibold text-brand-emerald">Live</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-[10px] font-semibold text-slate-600">
              {row.label}
            </span>
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className={`h-full rounded-full ${row.tone}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.width}%` }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  delay: prefersReducedMotion ? 0 : 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Card 2: Engagement live feed ---------------------------------- */

function EngagementFeedVisual({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean
}) {
  const rows = [
    {
      icon: PhoneCall,
      label: 'Inbound call, 2 min response',
    },
    {
      icon: MessageSquare,
      label: 'SMS sent, 0 min response',
    },
    {
      icon: MapPin,
      label: 'Showing attended, on-site GPS confirmed',
    },
  ] as const

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Activity feed
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-emerald">
          <LivePulseDot prefersReducedMotion={prefersReducedMotion} small />
          Live
        </span>
      </div>
      <ul className="space-y-1.5">
        {rows.map((row, i) => {
          const Icon = row.icon
          return (
            <motion.li
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                delay: prefersReducedMotion ? 0 : 0.2 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-2.5 py-1.5"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-brand-navy/8">
                <Icon className="size-3 text-brand-navy" aria-hidden="true" />
              </span>
              <span className="flex-1 text-[11px] font-medium text-slate-700">
                {row.label}
              </span>
              <LivePulseDot prefersReducedMotion={prefersReducedMotion} small />
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------- Card 3: Conversion stacked funnel ----------------------------- */

function ConversionFunnelVisual({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean
}) {
  const rows = [
    { width: 100, tone: 'bg-brand-navy' },
    { width: 80, tone: 'bg-brand-navy/70' },
    { width: 60, tone: 'bg-brand-navy/55' },
    { width: 42, tone: 'bg-brand-navy/40' },
    { width: 26, tone: 'bg-brand-emerald' },
  ] as const

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Pipeline
        </span>
        <span className="text-[10px] font-semibold text-brand-emerald">To move-in</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {rows.map((row, i) => (
          <motion.div
            key={row.width}
            className={`h-3 rounded-md ${row.tone}`}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: `${row.width}%`, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.2 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- Live Pulse Dot ------------------------------------------------- */

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
      <span className="absolute inset-0 rounded-full bg-brand-emerald/50 animate-ping" />
      <span className={`relative block ${size} rounded-full bg-brand-emerald`} />
    </span>
  )
}
