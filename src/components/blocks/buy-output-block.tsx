'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const AVOID_ITEMS = [
  'Hiring leasing coordinators',
  'Hiring call handling staff',
  'Hiring showing and field staff',
  'Payroll, benefits, management overhead',
  'Recruiter costs and training time',
  'Software and tooling coordination',
  'Running leasing across fragmented teams',
]

const GET_ITEMS = [
  'One accountable leasing operator',
  'One live data environment',
  'One measurable reporting structure',
  'One escalation path',
  'One 120-day decision point, by the numbers',
  'Full leasing team delivered as a service',
]

export function BuyOutputBlock() {
  const prefersReducedMotion = useReducedMotion()
  const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]

  const headerTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease }

  const cardTransition = (delay: number) =>
    prefersReducedMotion ? { duration: 0 } : { duration: 0.7, ease, delay }

  const rowTransition = (i: number) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.4, ease, delay: 0.2 + i * 0.05 }

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      {/* Subtle ivory wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#FBFAF6] to-white"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={headerTransition}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            For B2B Operators
          </p>
          <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-brand-navy sm:mt-5 sm:text-4xl md:text-5xl">
            Buy leasing output,
            <br />
            <span className="font-display italic text-brand-emerald">
              not headcount
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
            Test a controlled leasing model with no internal payroll, no staffing complexity, no long-term fixed overhead. One accountable team delivered as a service.
          </p>
        </motion.div>

        {/* Two-column comparison */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:gap-7 md:grid-cols-2 md:gap-8">
          {/* Left: What you avoid (rose) */}
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={cardTransition(0)}
            className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-rose-50/60 p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-rose-700">
                What you avoid
              </span>
            </div>
            <h3 className="mt-4 font-heading text-xl font-bold text-brand-navy">
              Build an internal leasing team
            </h3>

            <ul className="mt-6 space-y-3 sm:space-y-4">
              {AVOID_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 12 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={rowTransition(i)}
                  className="flex items-start gap-3 text-[0.95rem] leading-snug text-brand-navy/85"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100">
                    <X
                      className="size-3.5 text-rose-500"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <p className="border-t border-rose-200/70 pt-4 text-sm font-semibold text-rose-700">
                Fixed cost regardless of output.
              </p>
            </div>
          </motion.article>

          {/* Right: What you get instead (emerald) */}
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={cardTransition(0.12)}
            className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-emerald-50/60 p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                What you get instead
              </span>
            </div>
            <h3 className="mt-4 font-heading text-xl font-bold text-brand-navy">
              Buy MoveSmart leasing output
            </h3>

            <ul className="mt-6 space-y-3 sm:space-y-4">
              {GET_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 12 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={rowTransition(i)}
                  className="flex items-start gap-3 text-[0.95rem] leading-snug text-brand-navy/85"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check
                      className="size-3.5 text-emerald-600"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <p className="border-t border-emerald-200/70 pt-4 text-sm font-semibold text-emerald-700">
                You pay for placements. Nothing else.
              </p>
            </div>
          </motion.article>
        </div>

        {/* Bottom call-out strip */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={cardTransition(0.2)}
          className="relative mt-10 overflow-hidden rounded-2xl bg-brand-navy text-white shadow-[0_18px_50px_-22px_rgba(11,29,58,0.45)] md:mt-12"
        >
          {/* Gold left accent */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1.5 bg-brand-gold"
          />

          <div className="grid grid-cols-1 items-center gap-8 px-6 py-8 pl-8 sm:px-8 sm:py-10 sm:pl-10 lg:grid-cols-12 lg:gap-10">
            {/* Stat */}
            <div className="lg:col-span-3">
              <p className="font-display text-5xl font-normal leading-none text-brand-gold">
                50%+
              </p>
            </div>

            {/* Description */}
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-white/85">
                of leads arrive after-hours. Fixed-schedule staff cannot cover this. MoveSmart delivers 24/7 coverage when most leads actually arrive.
              </p>
            </div>

            {/* Executive takeaway */}
            <div className="lg:col-span-4 lg:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Executive Takeaway
              </span>
              <p className="mt-3 font-heading text-base font-bold leading-snug text-white">
                Operators are buying leasing output, not building a leasing department.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
