'use client'

import Image from 'next/image'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * HeroDashboard
 *
 * A polished SaaS dashboard mockup that mirrors the actual MoveSmart portal.
 * Layout is deliberately sized so the parent's floating "Lease Signed" and
 * "Tenant Placed" badges sit in negative space — no content collision.
 */

const DONUT_R = 26
const DONUT_C = 2 * Math.PI * DONUT_R
const OCCUPANCY = 0.22
const DASH_ON = DONUT_C * OCCUPANCY
const DASH_OFF = DONUT_C - DASH_ON

type PropertyRow = {
  address: string
  city: string
  thumbnail: string
  statusBadge: string
  secondaryBadge: string
  secondaryTone: 'info' | 'warn' | 'success'
}

const PROPERTIES: PropertyRow[] = [
  {
    address: '393 University Avenue',
    city: 'Toronto, ON · M5G 2M2',
    thumbnail:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=160&q=80',
    statusBadge: 'Vacant',
    secondaryBadge: 'Listing signed · Waiting for MLS',
    secondaryTone: 'info',
  },
  {
    address: '88 Park Lawn Road',
    city: 'Toronto, ON · M8Y 3H8',
    thumbnail:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=160&q=80',
    statusBadge: 'Vacant',
    secondaryBadge: 'Access agreement pending',
    secondaryTone: 'warn',
  },
  {
    address: '9500 Dufferin Street',
    city: 'Vaughan, ON · L6A 4H9',
    thumbnail:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=160&q=80',
    statusBadge: 'Leased',
    secondaryBadge: 'Move-in 1 Jun · Deposit in trust',
    secondaryTone: 'success',
  },
]

function AnimatedNumber({
  to,
  play,
  delay = 0,
  duration = 1.4,
  suffix = '',
}: {
  to: number
  play: boolean
  delay?: number
  duration?: number
  suffix?: string
}) {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`)
  const [text, setText] = useState(`0${suffix}`)

  useEffect(() => {
    if (!play) return
    const controls = animate(mv, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = rounded.on('change', (v) => setText(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [play, to, delay, duration, mv, rounded])

  return <>{text}</>
}

export function HeroDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="w-full select-none"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {/* ───── Outer window frame ───── */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(11,29,58,0.35)] ring-1 ring-black/5">
        {/* Navy window chrome with subtle gradient */}
        <div
          className="flex items-center gap-3 px-4 py-2.5"
          style={{ background: 'linear-gradient(180deg, #0F2549 0%, #0B1D3A 100%)' }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1 text-[10px] font-medium text-white/75 ring-1 ring-white/5">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="5.5" width="6" height="4" rx="0.7" />
                <path d="M4.5 5.5V4a1.5 1.5 0 013 0v1.5" strokeLinecap="round" />
              </svg>
              <span>movesmart.ca/dashboard</span>
            </div>
          </div>
          <div className="w-10" />
        </div>

        {/* ───── App top bar ───── */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white px-5 py-3">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-bold tracking-tight text-brand-navy">
              Dashboard
            </p>
            <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
              Live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 text-[10px] font-medium text-slate-500 sm:flex">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M13 13l-2.5-2.5" />
              </svg>
              <span>Search</span>
            </div>
            <span className="h-3 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2.5a3.5 3.5 0 00-3.5 3.5v2.3c0 .45-.18.88-.5 1.2l-.8.8A.8.8 0 003.76 12h8.48a.8.8 0 00.56-1.37l-.8-.8a1.7 1.7 0 01-.5-1.2V6A3.5 3.5 0 008 2.5z" />
                <path d="M6.5 13a1.5 1.5 0 003 0" />
              </svg>
              <span className="tabular-nums">3</span>
            </div>
          </div>
        </div>

        {/* ───── Main body ───── */}
        <div className="bg-gradient-to-b from-white to-slate-50/30 px-5 pb-5 pt-4">
          {/* Section title row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-brand-emerald">
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7.5L8 3l6 4.5V13a1 1 0 01-1 1h-3v-3.5h-4V14H3a1 1 0 01-1-1V7.5z" />
                </svg>
              </span>
              <h3 className="text-[13px] font-bold tracking-tight text-brand-navy">
                My Properties
              </h3>
              <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 tabular-nums">
                9
              </span>
            </div>
            <div className="hidden items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400 sm:flex">
              <span>Last 30 days</span>
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5L6 7.5l3-3" />
              </svg>
            </div>
          </div>

          {/* Stat grid: 3 KPI cards aligned in a clean row */}
          <div className="mb-3 grid grid-cols-3 gap-2">
            <StatCard
              label="Offers"
              icon="offers"
              accent="emerald"
              delay={0.3}
              inView={inView}
            >
              <AnimatedNumber to={4} play={inView} delay={0.5} duration={1.0} />
            </StatCard>

            <StatCard
              label="Tours"
              icon="tours"
              accent="violet"
              delay={0.4}
              inView={inView}
            >
              <AnimatedNumber to={6} play={inView} delay={0.6} duration={1.0} />
            </StatCard>

            <StatCard
              label="Applications"
              icon="apps"
              accent="gold"
              delay={0.5}
              inView={inView}
            >
              <AnimatedNumber to={12} play={inView} delay={0.7} duration={1.0} />
            </StatCard>
          </div>

          {/* Occupancy + type breakdown bar */}
          <motion.div
            className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <div className="relative flex h-[48px] w-[48px] shrink-0 items-center justify-center">
              <svg viewBox="0 0 70 70" className="h-[48px] w-[48px] -rotate-90">
                <circle cx="35" cy="35" r={DONUT_R} fill="none" stroke="#E5E7EB" strokeWidth="6" />
                <motion.circle
                  cx="35"
                  cy="35"
                  r={DONUT_R}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${DASH_ON} ${DASH_OFF}`}
                  initial={{ strokeDasharray: `0 ${DONUT_C}` }}
                  animate={inView ? { strokeDasharray: `${DASH_ON} ${DASH_OFF}` } : {}}
                  transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-brand-navy tabular-nums">
                <AnimatedNumber to={22} play={inView} delay={0.8} duration={1.2} suffix="%" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Occupancy
                </p>
                <p className="text-[9px] font-medium text-slate-400 tabular-nums">
                  2 / 9 leased
                </p>
              </div>
              {/* Composite type bar */}
              <div className="mt-1.5 flex h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.span
                  className="block bg-brand-emerald"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '22%' } : {}}
                  transition={{ delay: 0.9, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block bg-brand-navy/70"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '45%' } : {}}
                  transition={{ delay: 1.0, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block bg-brand-gold/70"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '33%' } : {}}
                  transition={{ delay: 1.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-1.5 flex items-center gap-3 text-[9px] font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-brand-emerald" /> Houses 4
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-brand-navy/70" /> Apts 3
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-brand-gold/70" /> Condos 2
                </span>
              </div>
            </div>
          </motion.div>

          {/* ───── Property list ───── */}
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
            {PROPERTIES.map((p, idx) => (
              <motion.div
                key={p.address}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-slate-50/60 ${
                  idx < PROPERTIES.length - 1 ? 'border-b border-slate-200/70' : ''
                }`}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200/60">
                  <Image
                    src={p.thumbnail}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[11px] font-bold leading-tight text-brand-navy">
                      {p.address}
                    </p>
                    <StatusPill tone={p.statusBadge === 'Leased' ? 'success' : 'vacant'}>
                      {p.statusBadge}
                    </StatusPill>
                  </div>
                  <p className="mt-0.5 truncate text-[9.5px] leading-tight text-slate-500">
                    {p.city}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <SecondaryPill tone={p.secondaryTone}>{p.secondaryBadge}</SecondaryPill>
                  </div>
                </div>

                <div className="hidden shrink-0 items-center gap-0.5 text-[10px] font-bold text-brand-emerald sm:flex">
                  <span>View</span>
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 2l4 4-4 4" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-semibold text-slate-600">Live</span>
              <span className="text-slate-400">· synced now</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-brand-navy/5 px-2 py-1 text-[10px] font-bold text-brand-navy transition-colors hover:bg-brand-navy/10"
            >
              View all
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 2l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* -------- Stat KPI card -------- */
function StatCard({
  label,
  icon,
  accent,
  delay,
  inView,
  children,
}: {
  label: string
  icon: 'offers' | 'tours' | 'apps'
  accent: 'emerald' | 'violet' | 'gold'
  delay: number
  inView: boolean
  children: React.ReactNode
}) {
  const accentClasses = {
    emerald: { bg: 'bg-emerald-50', text: 'text-brand-emerald', delta: 'text-emerald-600' },
    violet: { bg: 'bg-violet-100', text: 'text-violet-600', delta: 'text-violet-600' },
    gold: { bg: 'bg-amber-50', text: 'text-amber-600', delta: 'text-amber-600' },
  }[accent]

  const iconPath = {
    offers: (
      <>
        <path d="M2 8.5l2.5-2.5 2 1.5L9 5l5 3v3a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5z" />
        <path d="M6 8l2 1.5 2-1" />
      </>
    ),
    tours: (
      <>
        <rect x="2.5" y="3.5" width="11" height="10" rx="1.2" />
        <path d="M2.5 6.5h11M5 2.5v2M11 2.5v2" />
        <path d="M6 10l1.5 1.5L10 9" />
      </>
    ),
    apps: (
      <>
        <path d="M3 3h10v3H3zM3 8h10v5H3z" />
        <path d="M5 10.5h3" strokeLinecap="round" />
      </>
    ),
  }[icon]

  return (
    <motion.div
      className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-6 w-6 items-center justify-center rounded-md ${accentClasses.bg} ${accentClasses.text}`}>
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {iconPath}
          </svg>
        </div>
        <span className={`inline-flex items-center gap-0.5 text-[8.5px] font-bold ${accentClasses.delta}`}>
          <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8l3-3 2 2 3-4" />
            <path d="M7 3h3v3" />
          </svg>
          +12%
        </span>
      </div>
      <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="text-lg font-bold leading-tight text-brand-navy tabular-nums">
        {children}
      </p>
    </motion.div>
  )
}

/* -------- Status pills -------- */
function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: 'vacant' | 'success'
}) {
  const cls =
    tone === 'success'
      ? 'bg-emerald-50 text-emerald-700'
      : 'bg-rose-50 text-rose-600'
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${cls}`}>
      <span className={`size-1 rounded-full ${tone === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      {children}
    </span>
  )
}

function SecondaryPill({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: 'info' | 'warn' | 'success'
}) {
  const cls = {
    info: 'bg-blue-50 text-blue-700',
    warn: 'bg-amber-50 text-amber-700',
    success: 'bg-emerald-50 text-emerald-700',
  }[tone]
  return (
    <span className={`inline-block truncate rounded px-1.5 py-0.5 text-[8.5px] font-medium ${cls}`}>
      {children}
    </span>
  )
}
