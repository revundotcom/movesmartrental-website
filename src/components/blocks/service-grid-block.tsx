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
import { motion, type Variants } from 'framer-motion'

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

/* ─── Animation variants ─── */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

/* ─── Card styles — 8 unique looks, no two cards the same ─── */
type CardStyle = {
  wrap: string          // outer wrapper / background
  title: string
  desc: string
  cta: string
  iconWrap: string
  iconColor: string
  glow: boolean
}

const STYLES: CardStyle[] = [
  /* 0 — deep navy-forest hero */
  { wrap: 'bg-gradient-to-br from-[#0a1929] via-[#0b2240] to-[#062318]', title: 'text-white', desc: 'text-white/55', cta: 'text-emerald-400', iconWrap: 'bg-emerald-500/20', iconColor: 'text-emerald-400', glow: true },
  /* 1 — crisp white */
  { wrap: 'bg-white border border-slate-200/80', title: 'text-slate-900', desc: 'text-slate-500', cta: 'text-emerald-600', iconWrap: 'bg-emerald-50', iconColor: 'text-emerald-600', glow: false },
  /* 2 — solid emerald */
  { wrap: 'bg-emerald-600', title: 'text-white', desc: 'text-emerald-100/80', cta: 'text-white', iconWrap: 'bg-white/20', iconColor: 'text-white', glow: false },
  /* 3 — midnight navy */
  { wrap: 'bg-[#0b1e3d]', title: 'text-white', desc: 'text-slate-400', cta: 'text-emerald-400', iconWrap: 'bg-emerald-500/20', iconColor: 'text-emerald-400', glow: true },
  /* 4 — warm sand */
  { wrap: 'bg-amber-50 border border-amber-200/60', title: 'text-amber-950', desc: 'text-amber-800/70', cta: 'text-amber-700', iconWrap: 'bg-amber-200/60', iconColor: 'text-amber-700', glow: false },
  /* 5 — slate cool */
  { wrap: 'bg-slate-100 border border-slate-200/60', title: 'text-slate-900', desc: 'text-slate-500', cta: 'text-emerald-600', iconWrap: 'bg-white shadow-sm', iconColor: 'text-slate-600', glow: false },
  /* 6 — deep teal */
  { wrap: 'bg-gradient-to-br from-teal-900 to-teal-950', title: 'text-white', desc: 'text-teal-300/70', cta: 'text-teal-300', iconWrap: 'bg-teal-700/50', iconColor: 'text-teal-200', glow: true },
  /* 7 — light teal tint */
  { wrap: 'bg-teal-50 border border-teal-100', title: 'text-teal-950', desc: 'text-teal-700/70', cta: 'text-teal-700', iconWrap: 'bg-teal-100', iconColor: 'text-teal-700', glow: false },
]

/*
 * ── LAYOUT MAP ──────────────────────────────────────────────
 *
 * Desktop (≥1024px): Asymmetric 12-column CSS grid
 *
 *   col:  1   2   3   4   5   6   7   8   9  10  11  12
 *   row1: [──── card 0 (hero) ─────────] [─ card 1 ──] [─ card 2 ─]
 *   row2: [─ card 5 ─] [─ card 6 ──────] [──── card 3 ────────────]
 *   row3: [─ card 7 ─────────────────────────] [─ card 4 ──────────]
 *
 * Cards 0, 3, 7 are wide; cards 1, 2, 5, 6, 4 are narrower.
 * This creates a genuine asymmetry — not a regular grid.
 * ────────────────────────────────────────────────────────────
 */
type GridConfig = { col: string; row: string }

const GRID_CONFIGS: GridConfig[] = [
  /* 0 */ { col: 'lg:col-start-1 lg:col-end-6',  row: 'lg:row-start-1 lg:row-end-2' },
  /* 1 */ { col: 'lg:col-start-6 lg:col-end-10', row: 'lg:row-start-1 lg:row-end-2' },
  /* 2 */ { col: 'lg:col-start-10 lg:col-end-13',row: 'lg:row-start-1 lg:row-end-2' },
  /* 3 */ { col: 'lg:col-start-8 lg:col-end-13', row: 'lg:row-start-2 lg:row-end-3' },
  /* 4 */ { col: 'lg:col-start-7 lg:col-end-13', row: 'lg:row-start-3 lg:row-end-4' },
  /* 5 */ { col: 'lg:col-start-1 lg:col-end-5',  row: 'lg:row-start-2 lg:row-end-3' },
  /* 6 */ { col: 'lg:col-start-5 lg:col-end-8',  row: 'lg:row-start-2 lg:row-end-3' },
  /* 7 */ { col: 'lg:col-start-1 lg:col-end-7',  row: 'lg:row-start-3 lg:row-end-4' },
]

export function ServiceGridBlock({
  services,
  columns: _columns = 3, // eslint-disable-line @typescript-eslint/no-unused-vars
  basePath,
  showHeading = true,
}: ServiceGridBlockProps) {
  if (services.length === 0) return null

  const href = (slug: string) => basePath ? `${basePath}/${slug}/` : `/services/${slug}/`

  return (
    <section className="bg-transparent pt-10">
      <div className="mx-auto max-w-7xl px-4 pb-20">
        {showHeading && (
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Our Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-emerald" />
          </div>
        )}

        {/* ── DESKTOP: Asymmetric 12-column grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden lg:grid lg:grid-cols-12 lg:gap-4 xl:gap-5"
          style={{ gridAutoRows: 'minmax(200px, auto)' }}
        >
          {services.slice(0, 8).map((service, idx) => {
            const style = STYLES[idx % STYLES.length]
            const grid  = GRID_CONFIGS[idx] ?? GRID_CONFIGS[0]
            const Icon  = service.icon ? ICON_MAP[service.icon] : null
            const isHero = idx === 0

            return (
              <motion.div
                key={service.slug}
                variants={item}
                className={`${grid.col} ${grid.row}`}
              >
                <Link href={href(service.slug)} className="group block h-full cursor-pointer">
                  <div className={`relative flex h-full flex-col overflow-hidden rounded-3xl ${style.wrap} p-7 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl`}>

                    {/* Glow blob for dark cards */}
                    {style.glow && (
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-emerald-500/10 blur-3xl"
                        aria-hidden="true"
                      />
                    )}

                    {/* Number badge — top right */}
                    <span className={`absolute right-5 top-5 font-mono text-[11px] font-semibold tracking-wider opacity-30 ${isHero || style.glow ? 'text-white' : 'text-slate-800'}`}>
                      0{idx + 1}
                    </span>

                    <div className="relative z-10 flex h-full flex-col">
                      {/* Icon */}
                      {Icon && (
                        <div className={`mb-5 inline-flex size-12 items-center justify-center rounded-2xl ${style.iconWrap} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className={`size-6 ${style.iconColor}`} aria-hidden="true" />
                        </div>
                      )}

                      {/* Hero stat */}
                      {isHero && (
                        <div className="mb-3">
                          <p className="font-display text-[56px] font-black leading-none text-emerald-400">500+</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">Tenants placed</p>
                        </div>
                      )}

                      <h3 className={`${isHero ? 'mt-2 text-2xl' : 'text-[15px]'} font-bold ${style.title} leading-snug`}>
                        {service.title}
                      </h3>

                      <p className={`mt-2 flex-1 text-sm leading-relaxed ${style.desc}`}>
                        {service.shortDescription}
                      </p>

                      <div className={`mt-6 flex items-center gap-1.5 ${style.cta} text-sm font-semibold`}>
                        <span>Learn more</span>
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── MOBILE / TABLET: 2-column grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden"
        >
          {services.map((service, idx) => {
            const style = STYLES[idx % STYLES.length]
            const Icon  = service.icon ? ICON_MAP[service.icon] : null
            const isHero = idx === 0

            return (
              <motion.div key={service.slug} variants={item} className={isHero ? 'sm:col-span-2' : ''}>
                <Link href={href(service.slug)} className="group block cursor-pointer">
                  <div className={`relative flex flex-col overflow-hidden rounded-3xl ${style.wrap} p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl min-h-[180px]`}>
                    {style.glow && (
                      <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />
                    )}
                    <div className="relative z-10 flex flex-1 flex-col">
                      {Icon && (
                        <div className={`mb-4 inline-flex size-11 items-center justify-center rounded-2xl ${style.iconWrap} transition-transform duration-300 group-hover:scale-110`}>
                          <Icon className={`size-5 ${style.iconColor}`} aria-hidden="true" />
                        </div>
                      )}
                      {isHero && (
                        <div className="mb-2">
                          <p className="font-display text-4xl font-black leading-none text-emerald-400">500+</p>
                          <p className="mt-1 text-xs uppercase tracking-widest text-white/40">Tenants placed</p>
                        </div>
                      )}
                      <h3 className={`${isHero ? 'mt-2 text-xl' : 'text-base'} font-bold ${style.title}`}>
                        {service.title}
                      </h3>
                      <p className={`mt-1.5 flex-1 text-sm leading-relaxed ${style.desc}`}>
                        {service.shortDescription}
                      </p>
                      <div className={`mt-4 flex items-center gap-1 ${style.cta} text-sm font-semibold`}>
                        <span>Learn more</span>
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
