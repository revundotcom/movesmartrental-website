'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  Wallet,
  CalendarClock,
  FileSignature,
  Scale,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * Icon registry — keep Lucide forwardRef components on the client side.
 * Server passes a plain string `iconKey`.
 * ──────────────────────────────────────────────────────────────────────── */
const ICON_REGISTRY: Record<string, LucideIcon> = {
  Shield,
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  Wallet,
  CalendarClock,
  FileSignature,
  Scale,
  AlertTriangle,
  CheckCircle2,
  XCircle,
}

/* ────────────────────────────────────────────────────────────────────────
 * RevealUp — generic stagger-up wrapper.
 * ──────────────────────────────────────────────────────────────────────── */
export function RevealUp({
  index = 0,
  children,
  className,
  delayStep = 0.06,
  y = 28,
}: {
  index?: number
  children: ReactNode
  className?: string
  delayStep?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: EASE, delay: index * delayStep }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ShieldWatermark — giant decorative SVG shield used as the hero backdrop.
 * Animated soft pulse to give the hero its "protection" character.
 * ──────────────────────────────────────────────────────────────────────── */
export function ShieldWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative"
      >
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 blur-3xl"
        >
          <Shield
            className="size-[420px] text-brand-emerald/25 sm:size-[520px] lg:size-[640px]"
            strokeWidth={1}
          />
        </motion.div>
        <Shield
          className="relative size-[420px] text-brand-emerald/10 sm:size-[520px] lg:size-[640px]"
          strokeWidth={0.6}
        />
      </motion.div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * PolicyCard — mini "policy chip" in the hero right column. Stacks of these
 * read like an insurance policy summary.
 * ──────────────────────────────────────────────────────────────────────── */
export function PolicyCard({
  index,
  iconKey,
  metric,
  label,
  body,
}: {
  index: number
  iconKey: string
  metric: string
  label: string
  body: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = ICON_REGISTRY[iconKey] ?? Sparkles
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
      transition={{ duration: 0.65, ease: EASE, delay: 0.2 + index * 0.12 }}
      className="group relative overflow-hidden rounded-2xl border border-brand-emerald/25 bg-white/80 p-5 shadow-lg shadow-brand-emerald/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-emerald/45 hover:shadow-xl hover:shadow-brand-emerald/15 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 size-32 rounded-full bg-brand-emerald/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald shadow-sm"
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display text-2xl font-normal leading-none text-brand-navy sm:text-3xl">
            {metric}
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            {label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * CoverageCard — 3-col benefit card with shield-style icon, metric, body.
 * ──────────────────────────────────────────────────────────────────────── */
export function CoverageCard({
  index,
  iconKey,
  metric,
  title,
  body,
}: {
  index: number
  iconKey: string
  metric: string
  title: string
  body: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = ICON_REGISTRY[iconKey] ?? ShieldCheck
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-2xl hover:shadow-brand-emerald/15 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 size-44 rounded-full bg-brand-emerald/0 blur-3xl transition-all duration-700 group-hover:bg-brand-emerald/20"
      />
      <div className="relative">
        <span
          aria-hidden="true"
          className="inline-flex size-14 items-center justify-center rounded-2xl border border-brand-emerald/30 bg-gradient-to-br from-brand-emerald/15 via-brand-emerald/5 to-white text-brand-emerald shadow-inner"
        >
          <Icon className="size-7" strokeWidth={1.6} />
        </span>
        <p className="mt-6 font-display text-4xl font-normal leading-none text-brand-navy sm:text-5xl">
          {metric}
        </p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
          Coverage
        </p>
        <h3 className="mt-4 font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {body}
        </p>
      </div>
    </motion.article>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ProtectionAccordion — vertical step-by-step expander for howItWorks.
 * Each row has number + title + body + "Day X" timestamp; expandable.
 * ──────────────────────────────────────────────────────────────────────── */
export function ProtectionAccordion({
  steps,
}: {
  steps: Array<{ step: number; title: string; body: string; day: string }>
}) {
  const [openIdx, setOpenIdx] = useState<number>(0)

  return (
    <ol className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {steps.map((s, idx) => {
        const isOpen = openIdx === idx
        return (
          <ProtectionRow
            key={s.step}
            index={idx}
            step={s.step}
            title={s.title}
            body={s.body}
            day={s.day}
            isOpen={isOpen}
            onToggle={() => setOpenIdx(isOpen ? -1 : idx)}
          />
        )
      })}
    </ol>
  )
}

function ProtectionRow({
  index,
  step,
  title,
  body,
  day,
  isOpen,
  onToggle,
}: {
  index: number
  step: number
  title: string
  body: string
  day: string
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
      className={`relative transition-colors duration-300 ${
        isOpen ? 'bg-brand-emerald/[0.04]' : 'bg-white hover:bg-slate-50/70'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center gap-5 px-6 py-6 text-left sm:gap-7 sm:px-8 sm:py-7"
      >
        <span
          aria-hidden="true"
          className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border font-display text-lg font-normal italic transition-all duration-500 ${
            isOpen
              ? 'border-brand-emerald/50 bg-brand-emerald text-white shadow-md shadow-brand-emerald/30'
              : 'border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald'
          }`}
        >
          {String(step).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
              {title}
            </h3>
          </div>
          <p className="mt-1 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            <span aria-hidden="true" className="block h-px w-5 bg-brand-emerald/50" />
            {day}
          </p>
        </div>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? 'border-brand-emerald/50 bg-brand-emerald/15 text-brand-emerald'
              : 'border-slate-200 bg-white text-slate-500'
          }`}
        >
          <ChevronDown className="size-4" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 pl-[5.5rem] sm:px-8 sm:pl-[6.25rem]">
              <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                {body}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ComparisonColumn — one half of the With / Without comparison table.
 * ──────────────────────────────────────────────────────────────────────── */
export function ComparisonColumn({
  variant,
  title,
  subtitle,
  items,
  badge,
}: {
  variant: 'without' | 'with'
  title: string
  subtitle: string
  items: string[]
  badge: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isWith = variant === 'with'
  const IconMark = isWith ? CheckCircle2 : XCircle
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: EASE, delay: isWith ? 0.15 : 0 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 sm:p-10 ${
        isWith
          ? 'border-brand-emerald/40 bg-gradient-to-br from-brand-emerald/15 via-brand-navy/80 to-brand-navy text-white shadow-2xl shadow-brand-emerald/20'
          : 'border-rose-300/50 bg-gradient-to-br from-rose-50 via-white to-amber-50 text-slate-700'
      }`}
    >
      {isWith && (
        <>
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 size-56 rounded-full bg-brand-emerald/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -left-16 size-56 rounded-full bg-brand-gold/15 blur-3xl"
          />
        </>
      )}
      <div className="relative">
        <p
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] ${
            isWith
              ? 'border-white/25 bg-white/10 text-brand-gold backdrop-blur-md'
              : 'border-rose-200 bg-white/70 text-rose-600 backdrop-blur-md'
          }`}
        >
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${
              isWith ? 'bg-brand-emerald' : 'bg-rose-500'
            }`}
          />
          {badge}
        </p>
        <h3
          className={`mt-5 font-display text-2xl font-normal leading-tight sm:text-3xl ${
            isWith ? 'text-white' : 'text-brand-navy'
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-[15px] ${
            isWith ? 'text-white/70' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>

        <ul className="mt-8 space-y-4">
          {items.map((item, idx) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: isWith ? 12 : -12 }}
              animate={
                inView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: isWith ? 12 : -12 }
              }
              transition={{
                duration: 0.45,
                ease: EASE,
                delay: 0.3 + idx * 0.07,
              }}
              className={`flex items-start gap-3 border-b py-3 last:border-b-0 ${
                isWith ? 'border-white/10' : 'border-rose-200/60'
              }`}
            >
              <IconMark
                className={`mt-0.5 size-5 shrink-0 ${
                  isWith ? 'text-brand-emerald' : 'text-rose-500'
                }`}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span
                className={`text-sm leading-snug sm:text-[15px] ${
                  isWith ? 'text-white/90' : 'text-slate-700'
                }`}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
