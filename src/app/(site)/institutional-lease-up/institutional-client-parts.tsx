'use client'

import Image from 'next/image'
import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  Gauge,
  LineChart,
  Rocket,
  ShieldCheck,
  Target,
  Timer,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

// Local icon registry — server passes string `iconKey` (serializable);
// resolved to a LucideIcon here on the client because Lucide forwardRef
// components cannot cross the RSC boundary.
const ICON_REGISTRY: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  Gauge,
  LineChart,
  Rocket,
  ShieldCheck,
  Target,
  Timer,
  TrendingUp,
  Users,
}

/* ────────────────────────────────────────────────────────────────────────
 * Reveal — small staggered fade/slide wrapper used throughout this page.
 * ──────────────────────────────────────────────────────────────────────── */
export function Reveal({
  index = 0,
  children,
  className,
}: {
  index?: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * RevealRow - generic vertical reveal wrapper for staggered list rows
 * inside the dark photographic band. (kept for backward compat)
 * ──────────────────────────────────────────────────────────────────────── */
export function RevealRow({
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
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * Sparkline — tiny inline SVG line+area chart used in KPI tiles.
 * Pure presentational: takes a small array of points.
 * ──────────────────────────────────────────────────────────────────────── */
export function Sparkline({
  points,
  stroke = '#C9A24B',
  fill = 'rgba(201,162,75,0.18)',
  width = 120,
  height = 32,
  ariaLabel,
}: {
  points: number[]
  stroke?: string
  fill?: string
  width?: number
  height?: number
  ariaLabel?: string
}) {
  if (points.length < 2) return null
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1
  const stepX = width / (points.length - 1)
  const coords = points.map((p, i) => {
    const x = i * stepX
    const y = height - ((p - min) / span) * (height - 4) - 2
    return [x, y] as const
  })
  const linePath = coords
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ')
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      className="block"
    >
      <path d={areaPath} fill={fill} />
      <path d={linePath} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * HeroKPITile — single dark-navy KPI tile shown in the executive hero.
 * Label up top, big mono number, sparkline at bottom.
 * ──────────────────────────────────────────────────────────────────────── */
export function HeroKPITile({
  index,
  label,
  value,
  unit,
  delta,
  spark,
  iconKey,
}: {
  index: number
  label: string
  value: string
  unit?: string
  delta?: string
  spark: number[]
  iconKey: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = ICON_REGISTRY[iconKey] ?? Activity
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.1 + index * 0.08 }}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-sm"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          {label}
        </p>
        <Icon className="size-3.5 text-brand-gold/80" aria-hidden="true" strokeWidth={1.75} />
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-medium tabular-nums tracking-tight text-white sm:text-[28px]">
          {value}
        </span>
        {unit && (
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <Sparkline points={spark} />
        {delta && (
          <span className="font-mono text-[10px] font-medium text-brand-emerald">
            {delta}
          </span>
        )}
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * BoardTile — dark, bordered tile used in the pilot framework 3-col grid.
 * ──────────────────────────────────────────────────────────────────────── */
export function BoardTile({
  index,
  iconKey,
  tag,
  title,
  body,
  dataLine,
}: {
  index: number
  iconKey: string
  tag: string
  title: string
  body: string
  dataLine: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = ICON_REGISTRY[iconKey] ?? Target
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy/95 p-7 text-white shadow-[0_30px_60px_-30px_rgba(8,18,40,0.6)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
          <span aria-hidden="true" className="block size-1.5 rounded-full bg-brand-gold" />
          {tag}
        </span>
        <span className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-brand-gold">
          <Icon className="size-4" aria-hidden="true" strokeWidth={1.75} />
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-normal leading-snug text-white sm:text-[26px]">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/70">
        {body}
      </p>
      <div
        aria-hidden="true"
        className="mt-6 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent"
      />
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-300">
        {dataLine}
      </p>
    </motion.article>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * GanttTimeline — horizontal phase strip for the engagement model.
 * Segments labeled by week, alternating gold/emerald fills.
 * ──────────────────────────────────────────────────────────────────────── */
export function GanttTimeline({
  phases,
}: {
  phases: Array<{
    label: string
    week: string
    weight: number // proportional width
    tone: 'gold' | 'emerald' | 'navy'
    detail: string
  }>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const total = phases.reduce((acc, p) => acc + p.weight, 0)
  const toneClass = (tone: 'gold' | 'emerald' | 'navy') => {
    if (tone === 'gold') return 'bg-brand-gold/85 text-brand-navy'
    if (tone === 'emerald') return 'bg-brand-emerald/85 text-white'
    return 'bg-brand-navy/90 text-white'
  }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="rounded-2xl border border-white/10 bg-brand-navy/95 p-6 text-white shadow-[0_30px_70px_-30px_rgba(8,18,40,0.65)] sm:p-8"
    >
      {/* Top axis */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
        <span>T-0 · Day 0</span>
        <span>T+120 · Decision</span>
      </div>

      {/* The bar */}
      <div className="mt-4 flex h-12 w-full overflow-hidden rounded-md ring-1 ring-white/10">
        {phases.map((p, i) => {
          const widthPct = (p.weight / total) * 100
          return (
            <motion.div
              key={p.label}
              initial={{ width: 0 }}
              animate={inView ? { width: `${widthPct}%` } : { width: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.1 }}
              className={`relative flex items-center justify-center border-r border-brand-navy/40 last:border-r-0 ${toneClass(p.tone)}`}
              style={{ width: `${widthPct}%` }}
            >
              <span className="px-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                {p.week}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Phase legend rows */}
      <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {phases.map((p, i) => (
          <motion.li
            key={p.label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.06 }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gold">
              {p.week}
            </p>
            <p className="mt-1 font-display text-sm font-normal leading-snug text-white">
              {p.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/60">{p.detail}</p>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * LiveDashboardMock — large stylized executive dashboard centrepiece.
 *  - 4 KPI tiles up top (Occupancy, Days-to-lease, Pipeline, Conversion)
 *  - Area chart (pure SVG)
 *  - Recent activity table
 * All numbers are static / mock.
 * ──────────────────────────────────────────────────────────────────────── */
export function LiveDashboardMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const kpis: Array<{
    label: string
    value: string
    unit?: string
    delta: string
    spark: number[]
    tone: 'emerald' | 'gold'
  }> = [
    { label: 'Occupancy', value: '94.6', unit: '%', delta: '+2.3 pts', spark: [84, 86, 88, 87, 90, 92, 94, 94.6], tone: 'emerald' },
    { label: 'Days-to-lease', value: '17.4', unit: 'd', delta: '-4.1 d', spark: [28, 26, 25, 23, 22, 20, 18, 17.4], tone: 'emerald' },
    { label: 'Pipeline', value: '218', unit: 'leads', delta: '+38', spark: [120, 145, 160, 170, 180, 195, 205, 218], tone: 'gold' },
    { label: 'Conversion', value: '11.2', unit: '%', delta: '+1.4 pts', spark: [7.5, 8.1, 8.8, 9.4, 10.1, 10.6, 11.0, 11.2], tone: 'emerald' },
  ]

  const activity: Array<{
    time: string
    asset: string
    market: string
    event: string
    delta: string
  }> = [
    { time: '14:02', asset: 'Asset 01 · Liberty Tower', market: 'Toronto', event: 'Lease signed · 1BR-708', delta: '+1 lease' },
    { time: '13:41', asset: 'Asset 02 · Westport East', market: 'Ottawa', event: 'Offer approved · 2BR-1102', delta: '+1 offer' },
    { time: '12:18', asset: 'Asset 03 · Bay & 14th', market: 'Toronto', event: 'Tour booked · Saturday 11:00', delta: '+1 tour' },
    { time: '11:55', asset: 'Asset 01 · Liberty Tower', market: 'Toronto', event: 'Pricing review · +$35 ask', delta: 'Δ price' },
    { time: '10:30', asset: 'Asset 02 · Westport East', market: 'Ottawa', event: '18 new leads from Kijiji', delta: '+18 leads' },
  ]

  // Mock area chart data — twin series (Pipeline vs Leases)
  const series1 = [12, 18, 22, 27, 31, 35, 38, 44, 49, 53, 58, 64, 68, 72]
  const series2 = [4, 6, 9, 11, 14, 17, 19, 22, 25, 28, 32, 35, 39, 42]

  const chartW = 760
  const chartH = 200
  const padX = 12
  const padY = 12

  const buildPath = (data: number[]) => {
    const allMax = Math.max(...series1, ...series2)
    const stepX = (chartW - padX * 2) / (data.length - 1)
    const coords = data.map((v, i) => {
      const x = padX + i * stepX
      const y = chartH - padY - (v / allMax) * (chartH - padY * 2)
      return [x, y] as const
    })
    const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
    const area = `${line} L${chartW - padX},${chartH - padY} L${padX},${chartH - padY} Z`
    return { line, area, coords }
  }

  const s1 = buildPath(series1)
  const s2 = buildPath(series2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand-navy text-white shadow-[0_50px_120px_-40px_rgba(8,18,40,0.55)]"
    >
      {/* Gold hairline top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />

      {/* Dashboard chrome */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(15,142,107,0.6)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300">
            MoveSmart · Executive Console
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          <span>3 assets</span>
          <span aria-hidden="true">·</span>
          <span>Q2-26</span>
          <span aria-hidden="true">·</span>
          <span className="text-brand-emerald">live</span>
        </div>
      </div>

      {/* KPI tile row */}
      <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-brand-navy p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {k.label}
            </p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                {k.value}
              </span>
              {k.unit && (
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                  {k.unit}
                </span>
              )}
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <Sparkline
                points={k.spark}
                stroke={k.tone === 'gold' ? '#C9A24B' : '#0F8E6B'}
                fill={k.tone === 'gold' ? 'rgba(201,162,75,0.18)' : 'rgba(15,142,107,0.18)'}
              />
              <span className={`font-mono text-[10px] font-medium ${k.tone === 'gold' ? 'text-brand-gold' : 'text-brand-emerald'}`}>
                {k.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Body grid: chart + side legend */}
      <div className="grid grid-cols-1 gap-px bg-white/10 lg:grid-cols-12">
        {/* Chart */}
        <div className="bg-brand-navy p-5 sm:p-6 lg:col-span-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Absorption curve · last 14 weeks
              </p>
              <p className="mt-1 font-display text-base text-white">
                Pipeline <span className="text-slate-400">vs</span>{' '}
                <span className="text-brand-emerald">Signed leases</span>
              </p>
            </div>
            <div className="hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 sm:flex">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="block size-2 rounded-sm bg-brand-gold" />
                Pipeline
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="block size-2 rounded-sm bg-brand-emerald" />
                Signed
              </span>
            </div>
          </div>

          <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            className="mt-4 block w-full"
            role="img"
            aria-label="Absorption curve over the last 14 weeks showing pipeline above signed leases"
          >
            {/* gridlines */}
            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1={padX}
                x2={chartW - padX}
                y1={padY + (chartH - padY * 2) * g}
                y2={padY + (chartH - padY * 2) * g}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="2 4"
              />
            ))}
            {/* pipeline series (gold) */}
            <path d={s1.area} fill="rgba(201,162,75,0.18)" />
            <path d={s1.line} fill="none" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* signed series (emerald) */}
            <path d={s2.area} fill="rgba(15,142,107,0.18)" />
            <path d={s2.line} fill="none" stroke="#0F8E6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* end dots */}
            {s1.coords.length > 0 && (
              <circle cx={s1.coords[s1.coords.length - 1][0]} cy={s1.coords[s1.coords.length - 1][1]} r="3" fill="#C9A24B" />
            )}
            {s2.coords.length > 0 && (
              <circle cx={s2.coords[s2.coords.length - 1][0]} cy={s2.coords[s2.coords.length - 1][1]} r="3" fill="#0F8E6B" />
            )}
          </svg>

          {/* x-axis ticks */}
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            <span>W-14</span>
            <span>W-10</span>
            <span>W-6</span>
            <span>W-2</span>
            <span className="text-brand-emerald">Now</span>
          </div>
        </div>

        {/* Side stats column */}
        <div className="bg-brand-navy p-5 sm:p-6 lg:col-span-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Asset rollup
          </p>
          <ul className="mt-4 space-y-4">
            {[
              { name: 'Asset 01 · Liberty Tower', occ: '96.1%', dtl: '15.2d', tone: 'emerald' as const },
              { name: 'Asset 02 · Westport East', occ: '93.4%', dtl: '18.1d', tone: 'emerald' as const },
              { name: 'Asset 03 · Bay & 14th', occ: '92.0%', dtl: '19.8d', tone: 'gold' as const },
            ].map((a) => (
              <li key={a.name} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2.5">
                <p className="font-display text-sm leading-snug text-white">{a.name}</p>
                <div className="mt-1.5 flex items-center justify-between font-mono text-[11px] tabular-nums text-slate-300">
                  <span>OCC {a.occ}</span>
                  <span>DTL {a.dtl}</span>
                  <span className={a.tone === 'emerald' ? 'text-brand-emerald' : 'text-brand-gold'}>
                    {a.tone === 'emerald' ? 'ON-TRACK' : 'WATCH'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Activity table */}
      <div className="border-t border-white/10 bg-brand-navy p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Recent activity · today
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-emerald">
            5 events
          </span>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-y-1 text-left">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <th className="px-3 py-2 font-semibold">Time</th>
                <th className="px-3 py-2 font-semibold">Asset</th>
                <th className="px-3 py-2 font-semibold">Market</th>
                <th className="px-3 py-2 font-semibold">Event</th>
                <th className="px-3 py-2 text-right font-semibold">Δ</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((row) => (
                <tr key={row.time + row.event} className="bg-white/[0.025] text-[13px]">
                  <td className="rounded-l-md px-3 py-2 font-mono text-slate-300 tabular-nums">{row.time}</td>
                  <td className="px-3 py-2 text-white">{row.asset}</td>
                  <td className="px-3 py-2 text-slate-300">{row.market}</td>
                  <td className="px-3 py-2 text-slate-300">{row.event}</td>
                  <td className="rounded-r-md px-3 py-2 text-right font-mono text-brand-emerald">{row.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * AssetCoverageBand — dark band with photo on right + 4 asset-class cells.
 * ──────────────────────────────────────────────────────────────────────── */
export function AssetCoverageBand({
  cells,
  imageSrc,
  imageAlt,
}: {
  cells: Array<{ kind: string; note: string }>
  imageSrc: string
  imageAlt: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-12"
    >
      {/* Copy + 4 asset cells */}
      <div className="bg-brand-navy p-8 sm:p-10 lg:col-span-8">
        <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
          <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
          Asset coverage
        </p>
        <h3 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl">
          Built for institutional{' '}
          <span className="font-display italic text-brand-emerald">multi-residential</span>
          <span aria-hidden="true" className="text-brand-gold">.</span>
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
          One operating model across the asset classes institutional landlords run today, with jurisdiction-specific lease templates and unified reporting.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {cells.map((c) => (
            <li key={c.kind} className="bg-brand-navy p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gold">
                {c.kind}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/65">{c.note}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy lg:col-span-4 lg:aspect-auto lg:min-h-[420px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-navy/20 to-brand-navy/60"
        />
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * Legacy components retained in case any other page imports them.
 * (Not actively used by the rebuilt page.)
 * ──────────────────────────────────────────────────────────────────────── */
export function PillarCard({
  index,
  tag,
  iconKey,
  imageSrc,
  imageAlt,
  title,
  description,
}: {
  index: number
  tag: string
  iconKey: string
  imageSrc: string
  imageAlt: string
  title: string
  description: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeral = String(index + 1).padStart(2, '0')
  const Icon = ICON_REGISTRY[iconKey] ?? Target

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 420px"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/15 to-transparent"
        />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
          <span>Pillar {numeral}</span>
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            {tag}
          </p>
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {description}
        </p>
      </div>
    </motion.article>
  )
}

export function TimelineStepRow({
  index,
  window: windowLabel,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  className,
}: {
  index: number
  window: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  children?: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const numeral = String(index + 1).padStart(2, '0')
  const isEven = index % 2 === 0

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      className={
        className ??
        'grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand-navy/10 md:grid-cols-12 md:gap-0'
      }
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden md:col-span-5 md:aspect-auto md:h-full md:min-h-[300px] ${
          isEven ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 460px"
          className="object-cover"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-brand-navy/35 via-transparent to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute left-5 top-5 flex size-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 font-display text-2xl italic text-white shadow-lg backdrop-blur-md sm:size-16 sm:text-3xl"
        >
          {numeral}
        </span>
      </div>
      <div
        className={`p-6 sm:p-8 md:col-span-7 md:p-10 ${
          isEven ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
          {windowLabel}
        </p>
        <h3 className="mt-2 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[17px]">
          {description}
        </p>
        {children}
      </div>
    </motion.li>
  )
}
