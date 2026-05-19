'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * HowItWorksTimeline - 4-step numbered timeline with stagger reveal.
 * Each step has its own card; the connecting rail runs behind on desktop.
 * ──────────────────────────────────────────────────────────────────────── */
export function HowItWorksTimeline({
  steps,
  provinceName,
}: {
  steps: Array<{ title: string; description: string }>
  provinceName: string
}) {
  return (
    <ol
      aria-label={`How leasing in ${provinceName} works`}
      className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
    >
      {/* Desktop connecting rail */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-emerald/30 to-transparent lg:block"
      />

      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.55,
            delay: i * 0.1,
            ease: EASE,
          }}
          className="relative flex flex-col"
        >
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-brand-emerald/30 bg-white font-display text-xl font-normal text-brand-emerald shadow-sm">
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="font-display text-lg font-normal tracking-tight text-brand-navy">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {step.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * EditorialBanner - full-bleed photo with overlay caption.
 * Used between value props and how-it-works sections.
 * ──────────────────────────────────────────────────────────────────────── */
export function EditorialBanner({
  imageUrl,
  imageAlt,
  caption,
}: {
  imageUrl: string
  imageAlt: string
  caption: string
}) {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[400px] lg:h-[480px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Navy gradient overlay for legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-brand-navy/85 via-brand-navy/50 to-transparent"
          />
          {/* Gold corner accent */}
          <div
            aria-hidden="true"
            className="absolute right-8 top-8 h-12 w-12 rounded-full bg-brand-gold/20 blur-xl"
          />
          <div className="relative flex h-full items-end p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald-light">
                MoveSmart Rentals
              </p>
              <p className="mt-3 font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
                {caption}
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
