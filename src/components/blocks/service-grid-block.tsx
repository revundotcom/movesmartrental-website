'use client'
import {
  DollarSign,
  FileText,
  Home,
  Megaphone,
  Monitor,
  Paintbrush,
  Shield,
  Users,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import type { ServiceGridBlockProps } from '@/types/blocks'

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  shield: Shield,
  paintbrush: Paintbrush,
  megaphone: Megaphone,
  'file-text': FileText,
  monitor: Monitor,
  'dollar-sign': DollarSign,
}

/* ─── Card configs — each card gets a fixed visual personality ─── */
const CARD_CONFIGS = [
  // 0 — Hero stat card (dark, tall)
  {
    bg: 'bg-gradient-to-b from-[#0b1e3d] to-[#082a20]',
    textPrimary: 'text-white',
    textSecondary: 'text-white/55',
    accentText: 'text-brand-emerald',
    iconBg: 'bg-brand-emerald/20',
    iconColor: 'text-brand-emerald',
    pill: null,
    variant: 'hero',
  },
  // 1 — Light card (tall)
  {
    bg: 'bg-white border border-slate-200',
    textPrimary: 'text-brand-navy',
    textSecondary: 'text-slate-500',
    accentText: 'text-brand-emerald',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    pill: null,
    variant: 'tall',
  },
  // 2 — Emerald card (short accent)
  {
    bg: 'bg-brand-emerald',
    textPrimary: 'text-white',
    textSecondary: 'text-white/70',
    accentText: 'text-white',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    pill: null,
    variant: 'accent',
  },
  // 3 — Navy card
  {
    bg: 'bg-[#0b1e3d]',
    textPrimary: 'text-white',
    textSecondary: 'text-white/55',
    accentText: 'text-brand-emerald',
    iconBg: 'bg-brand-emerald/20',
    iconColor: 'text-brand-emerald',
    pill: null,
    variant: 'dark',
  },
  // 4 — Light card
  {
    bg: 'bg-white border border-slate-200',
    textPrimary: 'text-brand-navy',
    textSecondary: 'text-slate-500',
    accentText: 'text-brand-emerald',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    pill: null,
    variant: 'standard',
  },
  // 5 — Warm tint card
  {
    bg: 'bg-amber-50 border border-amber-100',
    textPrimary: 'text-amber-950',
    textSecondary: 'text-amber-800/70',
    accentText: 'text-amber-700',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    pill: null,
    variant: 'warm',
  },
  // 6 — Dark teal card
  {
    bg: 'bg-gradient-to-b from-teal-900 to-teal-950',
    textPrimary: 'text-white',
    textSecondary: 'text-teal-200/70',
    accentText: 'text-teal-300',
    iconBg: 'bg-teal-700/50',
    iconColor: 'text-teal-200',
    pill: null,
    variant: 'teal',
  },
  // 7 — Ghost/outline card
  {
    bg: 'bg-slate-50 border border-slate-200',
    textPrimary: 'text-brand-navy',
    textSecondary: 'text-slate-500',
    accentText: 'text-brand-emerald',
    iconBg: 'bg-gradient-to-br from-emerald-50 to-teal-100',
    iconColor: 'text-emerald-600',
    pill: null,
    variant: 'ghost',
  },
]

/* Stagger config for each column */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function ServiceGridBlock({
  services,
  columns: _columns = 3, // eslint-disable-line @typescript-eslint/no-unused-vars
  basePath,
  showHeading = true,
}: ServiceGridBlockProps) {
  if (services.length === 0) return null

  /* ─── Split into 5 columns with staggered vertical offsets ─── */
  // col 0: cards 0, 5        col 1: cards 1, 6
  // col 2: cards 2 (center)  col 3: cards 3, 7
  // col 4: card 4
  const columns = [
    [0, 5],
    [1, 6],
    [2],
    [3, 7],
    [4],
  ]

  /* Vertical offset per column (in px) to create the stagger illusion */
  const colOffsets = [60, 0, 120, 30, 80]

  return (
    <section className="bg-transparent pt-10">
      <div className="mx-auto max-w-7xl px-4 pb-16">
        {showHeading && (
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Our Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-emerald" />
          </div>
        )}

        {/* ── Desktop: 5-column staggered layout ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="hidden lg:flex lg:gap-4 xl:gap-5"
        >
          {columns.map((cardIndices, colIdx) => (
            <div
              key={colIdx}
              className="flex flex-1 flex-col gap-4 xl:gap-5"
              style={{ marginTop: colOffsets[colIdx] }}
            >
              {cardIndices.map((serviceIdx) => {
                const service = services[serviceIdx]
                if (!service) return null
                const cfg = CARD_CONFIGS[serviceIdx % CARD_CONFIGS.length]
                const Icon = service.icon ? ICON_MAP[service.icon] : null
                const href = basePath ? `${basePath}/${service.slug}/` : `/services/${service.slug}/`

                return (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    cfg={cfg}
                    Icon={Icon}
                    href={href}
                    isHero={serviceIdx === 0}
                  />
                )
              })}
            </div>
          ))}
        </motion.div>

        {/* ── Mobile / Tablet: 2-column grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden"
        >
          {services.map((service, idx) => {
            const cfg = CARD_CONFIGS[idx % CARD_CONFIGS.length]
            const Icon = service.icon ? ICON_MAP[service.icon] : null
            const href = basePath ? `${basePath}/${service.slug}/` : `/services/${service.slug}/`
            return (
              <ServiceCard
                key={service.slug}
                service={service}
                cfg={cfg}
                Icon={Icon}
                href={href}
                isHero={idx === 0}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Individual card ─── */
function ServiceCard({
  service,
  cfg,
  Icon,
  href,
  isHero,
}: {
  service: { title: string; shortDescription: string; slug: string }
  cfg: (typeof CARD_CONFIGS)[0]
  Icon: LucideIcon | null
  href: string
  isHero: boolean
}) {
  return (
    <motion.div variants={cardVariants}>
      <Link href={href} className="group block cursor-pointer">
        <div
          className={`relative flex flex-col overflow-hidden rounded-3xl ${cfg.bg} p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl ${isHero ? 'min-h-[320px]' : 'min-h-[200px]'}`}
        >
          {/* Pill label top-right */}
          <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm ${cfg.variant === 'hero' || cfg.variant === 'dark' || cfg.variant === 'teal' ? 'bg-white/10 text-white/70' : 'bg-black/5 text-slate-500'}`}>
            Service
          </div>

          {/* Subtle glow for dark cards */}
          {(cfg.variant === 'hero' || cfg.variant === 'dark') && (
            <div
              className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-brand-emerald/10 blur-3xl"
              aria-hidden="true"
            />
          )}

          <div className="relative z-10 flex flex-1 flex-col">
            {/* Icon */}
            {Icon && (
              <div
                className={`mb-5 flex size-11 items-center justify-center rounded-2xl ${cfg.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`size-5 ${cfg.iconColor}`} aria-hidden="true" />
              </div>
            )}

            {/* Hero stat */}
            {isHero && (
              <div className="mb-1">
                <p className="font-display text-5xl font-black text-brand-emerald leading-none">500+</p>
                <p className={`mt-1 text-xs uppercase tracking-widest ${cfg.textSecondary}`}>Tenants placed</p>
              </div>
            )}

            <h3 className={`${isHero ? 'mt-4 text-xl' : 'text-base'} font-bold ${cfg.textPrimary} transition-colors duration-200`}>
              {service.title}
            </h3>
            <p className={`mt-2 flex-1 text-sm leading-relaxed ${cfg.textSecondary}`}>
              {service.shortDescription}
            </p>

            {/* CTA row */}
            <div className={`mt-5 flex items-center gap-1 ${cfg.accentText}`}>
              <span className="text-sm font-semibold">Learn more</span>
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
