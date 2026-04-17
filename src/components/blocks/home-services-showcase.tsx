'use client'

import { memo, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { ArrowRight, Check, Shield, Key, Building2, MapPin, Calendar, FileText, Sparkles } from 'lucide-react'

import type { ServiceCardData } from '@/types/blocks'

/**
 * Homepage "Our Services" showcase. Sticky scroll-linked layout: left panel
 * morphs to whichever service entry is active in the viewport. Not a card grid.
 */

// Shared easing curve (expo-out-ish). Used across all motion transitions here.
const EASE = [0.22, 1, 0.36, 1] as const

interface HomeServicesShowcaseProps {
  services: ServiceCardData[]
  basePath?: string
}

type ServiceMeta = {
  bullets: [string, string, string]
  metric: { value: string; label: string }
}

const SERVICE_META: ServiceMeta[] = [
  {
    bullets: ['Live comparables in 20+ Canadian markets', 'Vacancy-trend modelling', 'Pricing locked before listing goes live'],
    metric: { value: '0.4%', label: 'Avg gap to market' },
  },
  {
    bullets: ['Professional photography and floor plans', 'MLS plus 50+ syndicated portals', 'Targeted paid social spend'],
    metric: { value: '50+', label: 'Listing portals' },
  },
  {
    bullets: ['Agent-led private showings', 'Saturday open houses', 'Developer and bulk-tour coordination'],
    metric: { value: '14d', label: 'Avg time to keys' },
  },
  {
    bullets: ['Standardized application intake', 'Counter-offers handled in writing', 'Owner approval before any signature'],
    metric: { value: '100%', label: 'Owner-approved' },
  },
  {
    bullets: ['Credit, employment, and reference checks', 'AML and ID verification', 'Audit-ready documentation per file'],
    metric: { value: '760', label: 'Avg credit score placed' },
  },
  {
    bullets: ['Optional rental income guarantee', 'Tenant insurance coordination', 'Pre-funded deposit protocols'],
    metric: { value: '12mo', label: 'Coverage available' },
  },
  {
    bullets: ['Provincial standard lease forms', 'Digital signature with audit trail', 'LMR and pet deposits collected at signing'],
    metric: { value: 'e-Sign', label: 'Audit-trail logged' },
  },
  {
    bullets: ['Utility transfer coordination', 'Key release logged with photo proof', 'Move-in condition report countersigned'],
    metric: { value: '38pt', label: 'Condition checklist' },
  },
  {
    bullets: ['Bulk-unit campaign strategy', 'On-site leasing team deployment', 'Real-time absorption dashboards'],
    metric: { value: '50+', label: 'Units per cycle' },
  },
]

/**
 * Visual panel.
 * - variant="full": sticky desktop panel with morphing AnimatePresence layers.
 * - variant="compact": inline mobile panel with one static visual. No morphing
 *   needed (each mobile entry renders its own instance with a fixed idx) and
 *   no big number/progress dots (already shown in the entry header).
 */
function ShowcaseVisual({
  activeIdx,
  variant = 'full',
}: {
  activeIdx: number
  variant?: 'full' | 'compact'
}) {
  const meta = SERVICE_META[activeIdx]
  const isFull = variant === 'full'

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#071228] via-[#0B1D3A] to-[#040b18] shadow-[0_30px_60px_-20px_rgba(11,29,58,0.4)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-emerald to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 -top-20 size-[280px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.20) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 size-[280px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {isFull && (
        <div className="absolute left-6 top-6 z-20 flex flex-col gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIdx ? 'w-7 bg-brand-emerald' : 'w-3 bg-white/15'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 z-10 flex items-center justify-center pb-16">
        {isFull ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full px-8"
            >
              <ServiceVisual idx={activeIdx} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full px-8">
            <ServiceVisual idx={activeIdx} />
          </div>
        )}
      </div>

      <div className="absolute right-6 top-6 z-20">
        {isFull ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-black leading-none text-brand-emerald">{meta?.metric.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/50">{meta?.metric.label}</p>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-3 backdrop-blur-sm">
            <p className="font-display text-2xl font-black leading-none text-brand-emerald">{meta?.metric.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/50">{meta?.metric.label}</p>
          </div>
        )}
      </div>

    </div>
  )
}

function ServiceVisual({ idx }: { idx: number }) {
  switch (idx) {
    case 0: return <PricingVisual />
    case 1: return <MarketingVisual />
    case 2: return <ShowingVisual />
    case 3: return <OfferVisual />
    case 4: return <ScreeningVisual />
    case 5: return <ProtectionVisual />
    case 6: return <LeaseVisual />
    case 7: return <MoveInVisual />
    case 8: return <InstitutionalVisual />
    default: return null
  }
}

function PricingVisual() {
  const comps = [
    { unit: '123 King St W', sqft: '680', rent: '$2,790', isYou: false },
    { unit: '127 King St W', sqft: '710', rent: '$2,850', isYou: true },
    { unit: '145 Bathurst', sqft: '695', rent: '$2,825', isYou: false },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[360px] rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200"
    >
      {/* Address chip */}
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 ring-1 ring-slate-200/70">
        <MapPin className="size-3.5 text-brand-emerald" aria-hidden="true" />
        <span className="truncate text-[11px] font-semibold text-slate-700">127 King St W, Toronto</span>
      </div>

      {/* Suggested rent */}
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Suggested Rent</p>
          <p className="font-display text-2xl font-black leading-none text-brand-emerald">$2,850<span className="text-sm font-semibold text-slate-400">/mo</span></p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-brand-emerald ring-1 ring-emerald-200">+2.1% vs market</span>
      </div>

      {/* Comparables chart */}
      <div className="mt-3 rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200/70">
        <svg viewBox="0 0 280 80" className="block w-full" aria-hidden="true">
          {/* Band */}
          <rect x="0" y="22" width="280" height="22" fill="#10B981" fillOpacity="0.08" />
          <line x1="0" y1="33" x2="280" y2="33" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
          {/* Line */}
          <motion.path
            d="M 5 55 L 45 50 L 85 42 L 125 36 L 165 34 L 205 30 L 245 28 L 275 25"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          {/* Dots */}
          {[[45, 50], [85, 42], [125, 36], [165, 34], [205, 30], [245, 28]].map(([x, y]) => (
            <circle key={`${x}`} cx={x} cy={y} r="2.5" fill="white" stroke="#10B981" strokeWidth="1.5" />
          ))}
          {/* Highlight */}
          <circle cx="165" cy="34" r="5" fill="#10B981" />
          <circle cx="165" cy="34" r="9" fill="#10B981" fillOpacity="0.18" />
        </svg>
      </div>

      {/* Comparables table */}
      <div className="mt-3 overflow-hidden rounded-lg ring-1 ring-slate-200/70">
        <div className="grid grid-cols-[1fr_56px_72px] gap-1 bg-slate-100/70 px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-wider text-slate-500">
          <span>Unit</span>
          <span className="text-right">Sqft</span>
          <span className="text-right">Rent</span>
        </div>
        {comps.map((c) => (
          <div
            key={c.unit}
            className={`grid grid-cols-[1fr_56px_72px] items-center gap-1 px-2.5 py-1.5 text-[10.5px] ${
              c.isYou ? 'bg-emerald-50/70 font-bold text-brand-emerald' : 'text-slate-600'
            } border-t border-slate-100`}
          >
            <span className="flex items-center gap-1.5 truncate">
              {c.isYou && <span className="rounded bg-brand-emerald px-1 py-0.5 text-[7.5px] font-black leading-none text-white">YOU</span>}
              <span className="truncate">{c.unit}</span>
            </span>
            <span className="text-right tabular-nums">{c.sqft}</span>
            <span className="text-right font-semibold tabular-nums">{c.rent}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function MarketingVisual() {
  const portals = ['MLS', 'Realtor.ca', 'Kijiji', 'Facebook', 'Instagram', 'Rentals.ca']
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[360px] rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200"
    >
      {/* Listing header */}
      <div className="flex items-center gap-3">
        <div className="relative size-14 overflow-hidden rounded-lg ring-1 ring-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=240&q=80"
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold text-slate-900">2 BR · King West</p>
          <p className="text-[15px] font-black leading-tight text-brand-emerald">$2,850<span className="text-[10px] font-semibold text-slate-400">/mo</span></p>
          <p className="mt-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-slate-400">Listed today · MLS ready</p>
        </div>
        <motion.span
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-brand-emerald ring-1 ring-emerald-200"
        >
          <span className="mr-1 inline-block size-1.5 rounded-full bg-brand-emerald align-middle" />
          Live in 50+
        </motion.span>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-slate-100" />

      {/* Portals label */}
      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Syndication</p>

      {/* Portal chips */}
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {portals.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
            className="flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1.5 ring-1 ring-slate-200/70"
          >
            <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-emerald">
              <Check className="size-2.5 text-white" strokeWidth={4} aria-hidden="true" />
            </span>
            <span className="truncate text-[10px] font-semibold text-slate-700">{p}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-navy px-2.5 py-1.5">
        <span className="text-[9px] font-bold uppercase tracking-wider text-white/70">Reach</span>
        <div className="flex items-center gap-2">
          <div className="h-1 w-20 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
              className="h-full bg-brand-emerald"
            />
          </div>
          <span className="text-[9.5px] font-black text-brand-emerald">1.2M imp.</span>
        </div>
      </div>
    </motion.div>
  )
}

function ShowingVisual() {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  // [col, row] -> initials
  const booked: Record<string, string> = {
    '0-1': 'JM',
    '1-0': 'KP',
    '2-2': 'SL',
    '3-1': 'RT',
    '4-0': 'DC',
    '5-2': 'JM',
    '5-3': 'AW',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[360px] rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5 text-brand-emerald" aria-hidden="true" />
          <p className="text-[10.5px] font-bold text-slate-900">This week</p>
        </div>
        <p className="text-[9px] font-semibold text-slate-400">Apr 13 · Apr 19</p>
      </div>

      {/* Day headers */}
      <div className="mt-3 grid grid-cols-6 gap-1">
        {days.map((d) => (
          <div key={d} className="text-center text-[9px] font-bold uppercase tracking-wider text-slate-400">{d}</div>
        ))}
      </div>

      {/* Grid 6 cols x 5 rows */}
      <div className="mt-1 grid grid-cols-6 gap-1">
        {Array.from({ length: 5 }).map((_, row) =>
          days.map((_, col) => {
            const key = `${col}-${row}`
            const initials = booked[key]
            const isBooked = Boolean(initials)
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: 0.03 * (row * 6 + col) }}
                className={`flex aspect-square items-center justify-center rounded-md text-[8.5px] font-black ${
                  isBooked
                    ? 'bg-brand-emerald text-white shadow-sm'
                    : 'bg-slate-50 text-slate-300 ring-1 ring-inset ring-slate-200'
                }`}
              >
                {initials ?? ''}
              </motion.div>
            )
          }),
        )}
      </div>

      {/* Upcoming row */}
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50/70 px-2.5 py-2 ring-1 ring-emerald-200">
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-[9px] font-black text-white">JM</span>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold uppercase tracking-wider text-brand-emerald">Upcoming</p>
          <p className="truncate text-[10.5px] font-semibold text-slate-800">Sat 2:00 PM · Jessica M. · Unit 4B</p>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-[8.5px] font-bold text-brand-emerald ring-1 ring-emerald-200">Confirmed</span>
      </div>
    </motion.div>
  )
}

function OfferVisual() {
  const offers = [
    { label: 'Offer A', rent: '$2,850', term: '12-mo', emp: 'Verified', credit: 780, winning: true },
    { label: 'Offer B', rent: '$2,800', term: '12-mo', emp: 'Verified', credit: 762, winning: false },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[360px] rounded-2xl bg-white p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200"
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Offers received</p>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {offers.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.1 }}
            className={`relative rounded-xl p-2.5 ${
              o.winning
                ? 'bg-gradient-to-br from-emerald-50 to-white ring-2 ring-brand-emerald'
                : 'bg-slate-50 ring-1 ring-slate-200'
            }`}
          >
            {o.winning && (
              <span className="absolute -right-1.5 -top-1.5 rounded-md bg-brand-emerald px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white shadow">
                Winning
              </span>
            )}
            <p className={`text-[9px] font-bold uppercase tracking-wider ${o.winning ? 'text-brand-emerald' : 'text-slate-400'}`}>{o.label}</p>
            <p className={`font-display text-xl font-black leading-none ${o.winning ? 'text-brand-emerald' : 'text-slate-700'}`}>
              {o.rent}
              <span className="ml-0.5 text-[9px] font-semibold text-slate-400">/mo</span>
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Term</span>
                <span className="font-bold text-slate-700">{o.term}</span>
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Employment</span>
                <span className="inline-flex items-center gap-0.5 font-bold text-brand-emerald">
                  <Check className="size-2.5" strokeWidth={4} aria-hidden="true" />
                  {o.emp}
                </span>
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Credit</span>
                <span className="font-black text-slate-800">{o.credit}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Owner approves */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-navy px-3 py-2">
        <div>
          <p className="text-[8.5px] font-bold uppercase tracking-wider text-white/50">Awaiting</p>
          <p className="text-[10.5px] font-semibold text-white">Owner approval</p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-md bg-brand-emerald px-2.5 py-1.5 text-[10px] font-black text-white shadow-[0_6px_20px_-4px_rgba(16,185,129,0.6)]">
          <Check className="size-3" strokeWidth={4} aria-hidden="true" />
          Owner approves
        </div>
      </div>
    </motion.div>
  )
}

function ScreeningVisual() {
  const score = 780
  const pct = (score - 300) / (850 - 300) // ~0.873
  // Circle stroke math (r=28, circumference ~175.93)
  const r = 28
  const circ = 2 * Math.PI * r
  const checks = ['Employment', 'Income', 'References', 'ID + AML', 'Rental History']
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[360px] rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Applicant</p>
          <p className="text-[12.5px] font-bold text-slate-900">Jessica Moreau</p>
        </div>
        <div className="relative">
          <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
            <circle cx="36" cy="36" r={r} fill="none" stroke="#E2E8F0" strokeWidth="6" />
            <motion.circle
              cx="36"
              cy="36"
              r={r}
              fill="none"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ * (1 - pct) }}
              transition={{ duration: 1.4, ease: EASE }}
              transform="rotate(-90 36 36)"
            />
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[15px] font-black leading-none text-slate-900">{score}</span>
            <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">Credit</span>
          </div>
        </div>
      </div>

      {/* Checks */}
      <div className="mt-3 space-y-1.5">
        {checks.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
            className="flex items-center justify-between rounded-md bg-slate-50 px-2.5 py-1.5 ring-1 ring-slate-200/70"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-brand-emerald">
                <Check className="size-2.5 text-white" strokeWidth={4} aria-hidden="true" />
              </span>
              <span className="text-[10px] font-semibold text-slate-700">{c}</span>
            </div>
            <span className="text-[8.5px] font-bold uppercase tracking-wider text-brand-emerald">Passed</span>
          </motion.div>
        ))}
      </div>

      {/* Approved pill */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 ring-1 ring-emerald-200">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-emerald px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
          <Check className="size-2.5" strokeWidth={4} aria-hidden="true" />
          Approved
        </span>
        <span className="text-[9px] font-semibold text-slate-500">Apr 17 · 11:42 AM</span>
      </div>
    </motion.div>
  )
}

function ProtectionVisual() {
  const rows = [
    { label: 'Legal support included', pct: 100 },
    { label: 'Tenant default covered', pct: 92 },
    { label: 'Insurance coordinated', pct: 88 },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[360px] rounded-2xl bg-gradient-to-br from-[#0E2548] to-[#0B1D3A] p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
    >
      {/* Shield + headline */}
      <div className="flex items-start gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/40"
        >
          <Shield className="size-7 text-brand-emerald" strokeWidth={2.2} aria-hidden="true" />
          <span className="absolute -right-1 -top-1 inline-flex size-4 items-center justify-center rounded-full bg-brand-emerald text-white">
            <Check className="size-2.5" strokeWidth={4} aria-hidden="true" />
          </span>
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300/80">Rent protection</p>
          <p className="text-[13px] font-bold leading-tight text-white">12-Month Rent Guarantee</p>
          <p className="mt-0.5 text-[10px] text-white/50">Active from move-in day</p>
        </div>
      </div>

      {/* Big coverage number */}
      <div className="mt-3 flex items-end justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">Coverage up to</p>
          <p className="font-display text-2xl font-black leading-none text-brand-emerald">$30,000</p>
        </div>
        <span className="rounded-md bg-brand-emerald/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-brand-emerald ring-1 ring-brand-emerald/40">
          Paid monthly
        </span>
      </div>

      {/* Coverage rows */}
      <div className="mt-3 space-y-2">
        {rows.map((r, i) => (
          <div key={r.label} className="space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1.5 font-semibold text-white/80">
                <Check className="size-3 text-brand-emerald" strokeWidth={4} aria-hidden="true" />
                {r.label}
              </span>
              <span className="text-[9px] font-bold text-brand-emerald">{r.pct}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${r.pct}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: EASE }}
                className="h-full bg-brand-emerald"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function LeaseVisual() {
  const audit = [
    { label: 'Sent', time: '9:14 AM', done: true },
    { label: 'Viewed', time: '11:03 AM', done: true },
    { label: 'Signed', time: '2:47 PM', done: true },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto grid w-full max-w-[360px] grid-cols-[1fr_90px] gap-2"
    >
      {/* Document viewer */}
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200">
        {/* Header bar */}
        <div className="flex items-center gap-2 bg-brand-navy px-2.5 py-2">
          <FileText className="size-3.5 text-brand-emerald" aria-hidden="true" />
          <p className="text-[9px] font-black uppercase tracking-wider text-white">Ontario Standard Lease</p>
          <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[7.5px] font-bold text-white/70">Form 2229E</span>
        </div>

        {/* Body */}
        <div className="space-y-1.5 p-3">
          <div className="h-1.5 w-5/6 rounded-full bg-slate-100" />
          <div className="h-1.5 w-3/4 rounded-full bg-slate-100" />
          <div className="h-1.5 w-4/5 rounded-full bg-slate-100" />
          <div className="h-1.5 w-2/3 rounded-full bg-slate-100" />
          <div className="h-1.5 w-3/4 rounded-full bg-slate-100" />
          <div className="h-1.5 w-1/2 rounded-full bg-slate-100" />
        </div>

        {/* Signature block */}
        <div className="border-t border-slate-100 px-3 pb-3 pt-2">
          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Tenant Signature</p>
          <div className="relative mt-1 h-9 border-b border-slate-300">
            <svg viewBox="0 0 160 36" className="h-full w-full" aria-hidden="true">
              <motion.path
                d="M 6 26 C 14 10, 28 30, 38 20 C 48 10, 58 28, 70 18 C 82 8, 94 26, 108 16 C 120 8, 136 22, 150 12"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
              />
            </svg>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-[8.5px] font-semibold text-slate-500">e-Signed today at 2:47 PM</p>
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-brand-emerald ring-1 ring-emerald-200">
              <Check className="size-2.5" strokeWidth={4} aria-hidden="true" />
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Audit panel */}
      <div className="rounded-xl bg-brand-navy p-2.5 ring-1 ring-white/10">
        <p className="text-[8.5px] font-black uppercase tracking-wider text-emerald-300/80">Audit Trail</p>
        <div className="relative mt-2 space-y-3">
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/15" aria-hidden="true" />
          {audit.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.12 }}
              className="relative flex items-start gap-2"
            >
              <span className="relative z-10 mt-0.5 inline-flex size-[11px] items-center justify-center rounded-full bg-brand-emerald ring-2 ring-brand-navy">
                <span className="size-1 rounded-full bg-white" />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold leading-tight text-white">{a.label}</p>
                <p className="text-[8px] text-white/50">{a.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function MoveInVisual() {
  const items = [
    'Hydro transferred',
    'Gas + water confirmed',
    'Locks rotated',
    '38-pt condition photos',
    'Move-in report countersigned',
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[360px] rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ rotate: -25, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A853] to-[#B78B3C] shadow-[0_8px_20px_-6px_rgba(212,168,83,0.6)]"
        >
          <Key className="size-5 text-white" strokeWidth={2.2} aria-hidden="true" />
        </motion.div>
        <div className="flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Keys ready</p>
          <p className="font-display text-lg font-black leading-none text-brand-navy">UNIT 4B</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-brand-emerald ring-1 ring-emerald-200">
          <Sparkles className="size-2.5" strokeWidth={3} aria-hidden="true" />
          Cleared
        </span>
      </div>

      {/* Checklist */}
      <div className="mt-3 space-y-1.5">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.09 }}
            className="flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1.5 ring-1 ring-slate-200/70"
          >
            <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-emerald">
              <Check className="size-2.5 text-white" strokeWidth={4} aria-hidden="true" />
            </span>
            <span className="flex-1 text-[10.5px] font-semibold text-slate-700">{item}</span>
            <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-400">Done</span>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-3 rounded-lg bg-brand-navy px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">Move-in readiness</span>
          <span className="text-[11px] font-black text-brand-emerald">100%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
            className="h-full rounded-full bg-gradient-to-r from-brand-emerald to-emerald-400"
          />
        </div>
      </div>
    </motion.div>
  )
}

function InstitutionalVisual() {
  const bars = [3, 4, 5, 7, 3] // peak week 4
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5']
  const maxBar = Math.max(...bars)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto grid w-full max-w-[360px] grid-cols-[84px_1fr] gap-2.5"
    >
      {/* Building silhouette */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0E2548] to-[#0B1D3A] p-2 ring-1 ring-white/10">
        <div className="flex items-center gap-1 pb-1.5">
          <Building2 className="size-3 text-brand-emerald" aria-hidden="true" />
          <span className="text-[7.5px] font-bold uppercase tracking-wider text-white/60">Tower A</span>
        </div>
        <div className="grid grid-cols-4 gap-[3px]">
          {Array.from({ length: 28 }).map((_, i) => {
            const lit = i < 20
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.04 * i }}
                className={`aspect-[3/4] rounded-sm ${
                  lit ? 'bg-brand-emerald shadow-[0_0_6px_rgba(16,185,129,0.6)]' : 'bg-white/5 ring-1 ring-inset ring-white/10'
                }`}
              />
            )
          })}
        </div>
        <div className="mt-1.5 rounded-md bg-white/5 px-1.5 py-1 text-center ring-1 ring-white/10">
          <span className="text-[8.5px] font-black text-brand-emerald">22/28</span>
          <span className="ml-1 text-[7.5px] font-semibold uppercase tracking-wider text-white/50">leased</span>
        </div>
      </div>

      {/* Command center panel */}
      <div className="rounded-xl bg-white p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-slate-400">Absorption</p>
          <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[7.5px] font-black uppercase tracking-wider text-brand-gold ring-1 ring-amber-200">
            60-day cycle
          </span>
        </div>
        <p className="mt-0.5 font-display text-2xl font-black leading-none text-brand-emerald">
          22<span className="text-base text-slate-400">/28</span>
          <span className="ml-1.5 text-[10px] font-semibold text-slate-500">units</span>
        </p>

        {/* Bar chart */}
        <div className="mt-2.5 rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200/70">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Weekly leases</p>
            <p className="text-[8px] font-semibold text-slate-400">Peak W4</p>
          </div>
          <div className="mt-1.5 flex h-14 items-end gap-1.5">
            {bars.map((h, i) => {
              const isPeak = h === maxBar
              const hPct = (h / maxBar) * 100
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${hPct}%` }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: EASE }}
                    className={`w-full rounded-sm ${
                      isPeak ? 'bg-brand-gold' : 'bg-brand-emerald/70'
                    }`}
                  />
                  <span className={`text-[7px] font-bold ${isPeak ? 'text-brand-gold' : 'text-slate-400'}`}>{weeks[i]}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status pill */}
        <div className="mt-2.5 inline-flex w-full items-center justify-between rounded-md bg-emerald-50 px-2 py-1.5 ring-1 ring-emerald-200">
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-brand-emerald"
              />
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider text-brand-emerald">On-site team deployed</span>
          </span>
          <span className="text-[8.5px] font-bold text-brand-emerald">Live</span>
        </div>
      </div>
    </motion.div>
  )
}

interface ServiceEntryProps {
  service: ServiceCardData
  idx: number
  isActive: boolean
  meta: ServiceMeta
  href: string
  entryRef: (el: HTMLDivElement | null) => void
}

// Memoized so an activeIdx change in the parent doesn't re-render all 9 entries.
// Only entries whose `isActive` flag flipped will re-render.
const ServiceEntry = memo(function ServiceEntry({
  service,
  idx,
  isActive,
  meta,
  href,
  entryRef,
}: ServiceEntryProps) {
  return (
    <div ref={entryRef} data-idx={idx} className="relative py-10 lg:py-14">
      <div className="absolute left-0 top-0 h-full w-px bg-slate-200/80 lg:left-[-1px]" aria-hidden="true" />
      <motion.div
        className="absolute left-0 top-0 w-[2px] origin-top bg-brand-emerald lg:left-[-1px]"
        initial={false}
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        style={{ height: '100%' }}
        transition={{ duration: 0.5, ease: EASE }}
        aria-hidden="true"
      />

      <motion.div
        className="pl-7 lg:pl-10"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0.45 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="flex items-baseline gap-3">
          <span className={`font-display text-5xl font-black leading-none lg:text-6xl transition-colors duration-500 ${isActive ? 'text-brand-emerald' : 'text-brand-navy/15'}`}>
            {String(idx + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
          {service.title}
        </h3>

        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[17px]">
          {service.shortDescription}
        </p>

        <ul className="mt-6 space-y-2.5">
          {meta.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                <Check className="size-3 text-brand-emerald" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-[15px] leading-relaxed text-slate-700">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 lg:hidden">
          <ShowcaseVisual activeIdx={idx} variant="compact" />
        </div>

        <Link
          href={href}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-emerald hover:text-emerald-700"
        >
          <span>Explore {service.title.toLowerCase()}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  )
})

export function HomeServicesShowcase({ services, basePath }: HomeServicesShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  const list = useMemo(() => services.slice(0, 9), [services])
  const href = (slug: string) =>
    basePath ? `${basePath}/${slug}/` : `/services/${slug}/`

  // Single IntersectionObserver owns all 9 entries. On each batch of entries
  // we receive, we pick the topmost-visible entry and promote it to active.
  // This fixes the effect-ordering race that per-entry `useInView` causes
  // during fast scrolls (children can overwrite each other in wrong order).
  useEffect(() => {
    const els = entryRefs.current.filter((el): el is HTMLDivElement => el !== null)
    if (els.length === 0) return

    // Track which entries are currently in the center band.
    const inBand = new Set<HTMLDivElement>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target as HTMLDivElement)
          else inBand.delete(e.target as HTMLDivElement)
        }
        if (inBand.size === 0) return
        // Pick the topmost element still in the band (smallest top offset).
        let topmost: HTMLDivElement | null = null
        let topmostY = Infinity
        for (const el of inBand) {
          const y = el.getBoundingClientRect().top
          if (y < topmostY) { topmostY = y; topmost = el }
        }
        if (topmost) {
          const idx = Number(topmost.dataset.idx)
          if (!Number.isNaN(idx)) {
            setActiveIdx((prev) => (prev === idx ? prev : idx))
          }
        }
      },
      // Band roughly aligns with natural reading focus (upper third of viewport),
      // so the "active" entry tracks what the user is actually reading.
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 },
    )

    for (const el of els) observer.observe(el)
    return () => observer.disconnect()
  }, [list.length])

  const setEntryRef = (idx: number) => (el: HTMLDivElement | null) => {
    entryRefs.current[idx] = el
  }

  return (
    <MotionConfig reducedMotion="user">
    <section className="relative overflow-x-clip bg-white py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(#0B1D3A 1px, transparent 1px), linear-gradient(90deg, #0B1D3A 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-32 size-[400px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Our Services
          </p>
          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
            Full-Cycle Leasing,{' '}
            <span className="font-display italic text-brand-emerald">
              Executed With Discipline
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Nine concentrated leasing services. Listing to move-in. Nothing beyond. Scroll to see each one in motion.
          </p>
          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-brand-emerald to-transparent" />
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24">
              <div className="relative">
                <ShowcaseVisual activeIdx={activeIdx} />
                <div className="pointer-events-none absolute inset-x-5 bottom-5 z-30 rounded-2xl border border-white/8 bg-brand-navy/85 px-5 py-3.5 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-emerald/90">
                    Now Showing · {String(activeIdx + 1).padStart(2, '0')} of 09
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="mt-0.5 font-display text-xl font-normal text-white"
                    >
                      {list[activeIdx]?.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </aside>

          <div className="relative lg:col-span-6">
            {list.map((service, idx) => (
              <ServiceEntry
                key={`${service.slug}-${idx}`}
                service={service}
                idx={idx}
                isActive={activeIdx === idx}
                meta={SERVICE_META[idx] ?? SERVICE_META[0]}
                href={href(service.slug)}
                entryRef={setEntryRef(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  )
}
