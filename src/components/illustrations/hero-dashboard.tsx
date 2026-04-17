'use client'

import Image from 'next/image'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * HeroDashboard
 *
 * A real-looking SaaS dashboard mockup (DIV-based, not an SVG scene).
 * Mirrors the actual MoveSmart app dashboard the user sees when logged in:
 *  - macOS window chrome with URL bar
 *  - "My Properties" page with 3 summary stats + a property list
 *  - Animated counters and a "live" pulse dot for a real-time feel.
 *
 * Design specs:
 *  - Outer frame keeps navy window chrome on top for the "computer window" read,
 *    but the body is a crisp light UI like any real SaaS product.
 *  - Brand tokens: navy #0B1D3A, emerald #10B981, gold #D4A853.
 *  - Caller wraps this in max-w-[520px]; all sizing is tuned to that width.
 */

// Donut ring geometry for the occupancy stat (22%).
const DONUT_R = 26
const DONUT_C = 2 * Math.PI * DONUT_R // ~163.36
const OCCUPANCY = 0.22
const DASH_ON = DONUT_C * OCCUPANCY
const DASH_OFF = DONUT_C - DASH_ON

type PropertyRow = {
  address: string
  city: string
  thumbnail: string
  statusBadge: string
  secondaryBadge: string
  secondaryTone: 'info' | 'warn'
  livePulse?: boolean
}

const PROPERTIES: PropertyRow[] = [
  {
    address: '393 University Avenue',
    city: 'Toronto, ON M5G 2M2',
    thumbnail:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=120&q=80',
    statusBadge: 'Vacant',
    secondaryBadge: 'Listing Agreement signed, Waiting for MLS',
    secondaryTone: 'info',
    livePulse: true,
  },
  {
    address: '88 Park Lawn Road',
    city: 'Toronto, ON M8Y 3H8',
    thumbnail:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=120&q=80',
    statusBadge: 'Vacant',
    secondaryBadge: 'Property Access Agreement Pending',
    secondaryTone: 'warn',
  },
  {
    address: '9500 Dufferin Street',
    city: 'Vaughan, ON L6A 4H9',
    thumbnail:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=120&q=80',
    statusBadge: 'Vacant',
    secondaryBadge: 'Listing Agreement signed, Waiting for MLS',
    secondaryTone: 'info',
  },
]

/** Count-up number that animates from 0 to `to` when `play` flips true. */
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
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Navy window chrome */}
        <div
          className="flex items-center gap-3 px-4 py-2.5"
          style={{ background: '#0B1D3A' }}
        >
          {/* macOS traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          {/* URL bar */}
          <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1 text-[10px] font-medium text-white/70">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="5.5" width="6" height="4" rx="0.7" />
                <path d="M4.5 5.5V4a1.5 1.5 0 013 0v1.5" strokeLinecap="round" />
              </svg>
              <span>movesmart.ca/dashboard</span>
            </div>
          </div>
          <div className="w-10" />
        </div>

        {/* ───── App top bar (light grey) ───── */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-50 px-5 py-3">
          <p className="text-[13px] font-semibold tracking-tight text-brand-navy">
            Dashboard
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2.5a3.5 3.5 0 00-3.5 3.5v2.3c0 .45-.18.88-.5 1.2l-.8.8A.8.8 0 003.76 12h8.48a.8.8 0 00.56-1.37l-.8-.8a1.7 1.7 0 01-.5-1.2V6A3.5 3.5 0 008 2.5z" />
              <path d="M6.5 13a1.5 1.5 0 003 0" />
            </svg>
            <span>0 Notifications</span>
          </div>
        </div>

        {/* ───── Main body ───── */}
        <div className="bg-white px-5 pb-5 pt-4">
          {/* Section title */}
          <div className="mb-3 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-brand-emerald">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7.5L8 3l6 4.5V13a1 1 0 01-1 1h-3v-3.5h-4V14H3a1 1 0 01-1-1V7.5z" />
              </svg>
            </span>
            <h3 className="text-[13px] font-semibold tracking-tight text-brand-navy">
              My Properties
            </h3>
          </div>

          {/* Summary row: 2 stat cards + occupancy ring + property-type pills */}
          <div className="mb-4 grid grid-cols-5 gap-2">
            {/* OFFERS */}
            <motion.div
              className="col-span-1 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-brand-emerald">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8.5l2.5-2.5 2 1.5L9 5l5 3v3a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5z" />
                  <path d="M6 8l2 1.5 2-1" />
                </svg>
              </div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                Offers
              </p>
              <p className="text-lg font-bold leading-tight text-brand-navy tabular-nums">
                <AnimatedNumber to={4} play={inView} delay={0.5} duration={1.0} />
              </p>
            </motion.div>

            {/* TOURS */}
            <motion.div
              className="col-span-1 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-violet-100 text-violet-600">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="3.5" width="11" height="10" rx="1.2" />
                  <path d="M2.5 6.5h11M5 2.5v2M11 2.5v2" />
                  <path d="M6 10l1.5 1.5L10 9" />
                </svg>
              </div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                Tours
              </p>
              <p className="text-lg font-bold leading-tight text-brand-navy tabular-nums">
                <AnimatedNumber to={6} play={inView} delay={0.6} duration={1.0} />
              </p>
            </motion.div>

            {/* OCCUPANCY DONUT */}
            <motion.div
              className="col-span-2 flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center">
                <svg viewBox="0 0 70 70" className="h-[52px] w-[52px] -rotate-90">
                  <circle
                    cx="35"
                    cy="35"
                    r={DONUT_R}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="7"
                  />
                  <motion.circle
                    cx="35"
                    cy="35"
                    r={DONUT_R}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${DASH_ON} ${DASH_OFF}`}
                    initial={{ strokeDasharray: `0 ${DONUT_C}` }}
                    animate={inView ? { strokeDasharray: `${DASH_ON} ${DASH_OFF}` } : {}}
                    transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center leading-none">
                  <span className="text-[13px] font-bold text-brand-navy tabular-nums">
                    <AnimatedNumber to={22} play={inView} delay={0.8} duration={1.2} suffix="%" />
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                  Occupancy
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-slate-500">
                  2 of 9 leased
                </p>
              </div>
            </motion.div>

            {/* PROPERTY TYPE PILLS */}
            <motion.div
              className="col-span-1 flex flex-col gap-1"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[
                { label: 'Condos', value: 2 },
                { label: 'Houses', value: 4 },
                { label: 'Apts', value: 3 },
              ].map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center justify-between rounded-md px-2 py-1"
                  style={{ background: '#0B1D3A' }}
                >
                  <span className="text-[8px] font-semibold uppercase tracking-wider text-white/70">
                    {pill.label}
                  </span>
                  <span className="text-[10px] font-bold text-white tabular-nums">
                    {pill.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ───── Property list ───── */}
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
            {PROPERTIES.map((p, idx) => (
              <motion.div
                key={p.address}
                className={`flex items-center gap-3 px-3 py-2.5 ${
                  idx < PROPERTIES.length - 1 ? 'border-b border-slate-200/80' : ''
                }`}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
              >
                {/* Thumbnail */}
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-slate-100">
                  <Image
                    src={p.thumbnail}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>

                {/* Address + badges */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10.5px] font-semibold leading-tight text-brand-navy">
                    {p.address}
                  </p>
                  <p className="mt-0.5 truncate text-[9px] leading-tight text-slate-500">
                    {p.city}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1">
                    <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-wide text-rose-600">
                      {p.livePulse && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                        </span>
                      )}
                      {p.statusBadge}
                    </span>
                    <span
                      className={`inline-block truncate rounded px-1.5 py-0.5 text-[8.5px] font-medium ${
                        p.secondaryTone === 'warn'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {p.secondaryBadge}
                    </span>
                  </div>
                </div>

                {/* Showings & Offers link */}
                <div className="flex shrink-0 items-center gap-0.5 text-[9px] font-semibold text-brand-emerald">
                  <span className="hidden sm:inline">Showings &amp; Offers</span>
                  <span className="sm:hidden">View</span>
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 2l4 4-4 4" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer: View All Properties */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium">Live, synced just now</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-navy hover:text-brand-emerald"
            >
              View All Properties (9)
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 2l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
