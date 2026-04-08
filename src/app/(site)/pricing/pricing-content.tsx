'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'

/* ─── Brand tokens ─────────────────────────────────────────────────────────── */
const NAVY = '#0B1D3A'
const EMERALD = '#10B981'
const GOLD = '#D4A853'

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const TRADITIONAL_PAINS = [
  { label: 'Monthly Fee', value: '8–12% of rent forever' },
  { label: 'Upfront Cost', value: '$500–$1,200 setup fee' },
  { label: 'Time to Tenant', value: '4–8 weeks average' },
  { label: 'Hidden Charges', value: 'Inspections, ads, leases extra' },
]

const MOVESMART_BENEFITS = [
  { label: 'Monthly Fee', value: 'Zero — pay nothing monthly' },
  { label: 'Upfront Cost', value: 'Zero — list for free' },
  { label: 'Time to Tenant', value: '2–3 weeks average' },
  { label: 'Hidden Charges', value: 'None. One flat fee when rented' },
]

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'List Your Property',
    price: 'Free',
    description: 'Professional photography, MLS listing, portal syndication. Zero cost to you.',
    color: EMERALD,
  },
  {
    step: '02',
    title: 'We Find Your Tenant',
    price: 'Included',
    description: 'Full tenant screening, credit checks, application management by our specialists.',
    color: EMERALD,
  },
  {
    step: '03',
    title: 'Pay Only When Rented',
    price: "One Month's Rent",
    description: 'One-time placement fee. No recurring charges, no surprises. Success-based.',
    color: GOLD,
    highlight: true,
  },
]

const COMPARISON_FEATURES = [
  { feature: 'Portal Listing', selfServe: true, fullService: true, premium: true },
  { feature: 'Professional Photography', selfServe: false, fullService: true, premium: true },
  { feature: 'MLS Listing', selfServe: false, fullService: true, premium: true },
  { feature: 'Tenant Screening', selfServe: false, fullService: true, premium: true },
  { feature: 'Lease Preparation', selfServe: false, fullService: true, premium: true },
  { feature: 'Dedicated Specialist', selfServe: false, fullService: true, premium: true },
  { feature: 'Account Manager', selfServe: false, fullService: false, premium: true },
  { feature: 'Rent Protection', selfServe: false, fullService: false, premium: true },
  { feature: 'Property Prep', selfServe: false, fullService: false, premium: true },
  { feature: 'Maintenance Coordination', selfServe: false, fullService: false, premium: true },
  { feature: '24/7 Emergency Support', selfServe: false, fullService: false, premium: true },
] as const

const PRICING_FAQS = [
  {
    question: 'What does "nothing upfront" mean?',
    answer:
      'You never pay anything before we find you a qualified tenant. Our success-based model means we only earn when you do. There are no listing fees, no advertising fees, and no setup charges.',
  },
  {
    question: 'When do I pay?',
    answer:
      'Payment is due only after a tenant has been placed and has signed a lease. You pay from the rental income, not out of pocket.',
  },
  {
    question: 'Are there hidden fees?',
    answer:
      'No. Our pricing is transparent. The fee structure is explained in full before you sign up, and there are no surprise charges at any stage.',
  },
  {
    question: 'Can I switch plans?',
    answer:
      'Yes. You can upgrade or downgrade your service level at any time. Contact your account manager or our support team to make changes.',
  },
  {
    question: 'What is the rent guarantee?',
    answer:
      'Our Premium plan includes rent protection. If a tenant we placed misses a payment, we cover the rent so you are never left without income.',
  },
]

/* ─── Helper: SVG Check Icon ────────────────────────────────────────────────── */

function CheckSVG() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Included"
      className="mx-auto shrink-0"
    >
      <circle cx="11" cy="11" r="11" fill={EMERALD} />
      <path
        d="M6.5 11.5L9.5 14.5L15.5 8.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function XSVGIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Not included"
      className="mx-auto shrink-0"
    >
      <circle cx="11" cy="11" r="11" fill="#E2E8F0" />
      <path
        d="M8 8L14 14M14 8L8 14"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ─── Section: VS Comparison ────────────────────────────────────────────────── */

function VSComparison() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-slate-50 py-28">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${NAVY} 1px, transparent 1px), linear-gradient(90deg, ${NAVY} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: EMERALD }}>
            Why MoveSmart
          </p>
          <h2 className="mt-3 font-display text-4xl font-normal" style={{ color: NAVY }}>
            The old way costs you money every month
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Traditional property managers take a cut forever. We charge once, only after you&apos;re rented.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Traditional PM — left */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8"
          >
            {/* Muted overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 to-slate-50/40 pointer-events-none" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#94A3B8" />
                  <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Traditional Property Management</span>
              </div>

              <div className="space-y-4">
                {TRADITIONAL_PAINS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                      <p className="mt-1 text-base font-semibold text-slate-500">{item.value}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-1 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#FEE2E2" />
                      <path d="M7 7L13 13M13 7L7 13" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <p className="mt-6 text-sm text-slate-400 italic">
                On a $2,500/mo property: up to $3,600/year in management fees alone.
              </p>
            </div>
          </motion.div>

          {/* MoveSmart — right */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="relative overflow-hidden rounded-3xl border-2 p-8 shadow-2xl"
            style={{ borderColor: EMERALD, background: `linear-gradient(135deg, ${NAVY} 0%, #0a2e1e 100%)` }}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl opacity-20"
              style={{ background: EMERALD }}
            />
            <div className="relative">
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{ background: `${EMERALD}20`, border: `1px solid ${EMERALD}40` }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill={EMERALD} />
                  <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>MoveSmart Rentals</span>
              </div>

              <div className="space-y-4">
                {MOVESMART_BENEFITS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                    className="flex items-start justify-between gap-4 rounded-2xl border px-5 py-4"
                    style={{ borderColor: `${EMERALD}25`, background: `${EMERALD}08` }}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: `${EMERALD}90` }}>{item.label}</p>
                      <p className="mt-1 text-base font-semibold text-white">{item.value}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-1 shrink-0">
                      <circle cx="10" cy="10" r="10" fill={EMERALD} fillOpacity="0.2" />
                      <path d="M6.5 10.5L9 13L13.5 7.5" stroke={EMERALD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <p className="mt-6 text-sm italic" style={{ color: `${EMERALD}80` }}>
                Same $2,500/mo property: one-time $2,500 placement fee. That&apos;s it.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section: Process Timeline ─────────────────────────────────────────────── */

function ProcessTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-28">
      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: EMERALD }}>
            How It Works
          </p>
          <h2 className="mt-3 font-display text-4xl font-normal" style={{ color: NAVY }}>
            Three steps to a placed tenant
          </h2>
          <p className="mt-4 text-base text-slate-500">
            No complexity, no surprises. You only pay at step three.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Animated dashed connector line — desktop */}
          <div className="absolute top-12 left-[16.67%] right-[16.67%] hidden lg:block" aria-hidden="true">
            <svg width="100%" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="2"
                x2="100"
                y2="2"
                stroke={EMERALD}
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div
                  className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full text-2xl font-black text-white shadow-lg"
                  style={{
                    background: step.highlight
                      ? `linear-gradient(135deg, ${GOLD} 0%, #b8882e 100%)`
                      : `linear-gradient(135deg, ${EMERALD} 0%, #059669 100%)`,
                    boxShadow: step.highlight
                      ? `0 8px 32px ${GOLD}50`
                      : `0 8px 32px ${EMERALD}40`,
                  }}
                >
                  {step.step}
                </div>

                {/* Content card */}
                <div
                  className="mt-6 w-full rounded-3xl border p-6"
                  style={{
                    borderColor: step.highlight ? `${GOLD}40` : `${EMERALD}20`,
                    background: step.highlight
                      ? `linear-gradient(135deg, ${NAVY}f5 0%, #0a2208f5 100%)`
                      : 'white',
                  }}
                >
                  <h3
                    className="font-display text-xl font-semibold"
                    style={{ color: step.highlight ? 'white' : NAVY }}
                  >
                    {step.title}
                  </h3>

                  {/* Price pill */}
                  <div
                    className="mx-auto mt-3 inline-block rounded-full px-4 py-1.5 text-sm font-black"
                    style={
                      step.highlight
                        ? { background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }
                        : { background: `${EMERALD}15`, color: EMERALD, border: `1px solid ${EMERALD}30` }
                    }
                  >
                    {step.price}
                  </div>

                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: step.highlight ? 'rgba(255,255,255,0.7)' : '#64748b' }}
                  >
                    {step.description}
                  </p>

                  {step.highlight && (
                    <div className="mt-4">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider"
                        style={{ background: EMERALD, color: 'white' }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section: Cost Calculator Chart ────────────────────────────────────────── */

function CostCalculator() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Assumptions: $2,500/mo rent
  const TRADITIONAL_ANNUAL = 3600   // 12% × $2500 × 12 = $3,600
  const MOVESMART_ANNUAL = 2500     // one-time month's rent
  const SAVINGS = TRADITIONAL_ANNUAL - MOVESMART_ANNUAL
  const MAX_BAR = TRADITIONAL_ANNUAL

  const traditionalH = Math.round((TRADITIONAL_ANNUAL / MAX_BAR) * 220)  // px
  const movesmartH = Math.round((MOVESMART_ANNUAL / MAX_BAR) * 220)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #082a20 100%)` }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl opacity-15"
        style={{ background: EMERALD }}
      />

      <div className="relative mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: EMERALD }}>
            Annual Cost Comparison
          </p>
          <h2 className="mt-3 font-display text-4xl font-normal text-white">
            Based on a $2,500/mo rental property
          </h2>
          <p className="mt-4 text-base text-white/60">
            Traditional PM charges every month forever. MoveSmart charges once.
          </p>
        </motion.div>

        {/* Bar chart */}
        <div className="mt-16 flex items-end justify-center gap-16">
          {/* Traditional bar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p className="text-2xl font-black text-white">$3,600</p>
              <p className="text-xs text-white/50">per year</p>
            </motion.div>

            <div className="relative w-28 overflow-hidden rounded-t-2xl" style={{ height: `${traditionalH}px`, background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-t-2xl"
                style={{ background: 'linear-gradient(to top, #475569, #94A3B8)' }}
                initial={{ height: '0%' }}
                animate={inView ? { height: '100%' } : {}}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <p className="max-w-[112px] text-center text-sm font-semibold text-slate-400">Traditional PM</p>
          </motion.div>

          {/* VS divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mb-8 flex flex-col items-center gap-2"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-black text-white"
              style={{ background: `${GOLD}30`, border: `2px solid ${GOLD}60`, color: GOLD }}
            >
              VS
            </div>
            {/* Savings callout */}
            <div
              className="mt-4 rounded-2xl px-5 py-4 text-center"
              style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40` }}
            >
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>You save</p>
              <p className="text-3xl font-black" style={{ color: GOLD }}>${SAVINGS.toLocaleString()}</p>
              <p className="text-xs" style={{ color: `${GOLD}80` }}>first year alone</p>
            </div>
          </motion.div>

          {/* MoveSmart bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <p className="text-2xl font-black text-white">$2,500</p>
              <p className="text-xs text-white/50">one-time only</p>
            </motion.div>

            <div className="relative w-28 overflow-hidden rounded-t-2xl" style={{ height: `${traditionalH}px`, background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-t-2xl"
                style={{ background: `linear-gradient(to top, #059669, ${EMERALD})`, boxShadow: `0 -8px 32px ${EMERALD}60` }}
                initial={{ height: '0%' }}
                animate={inView ? { height: `${Math.round((movesmartH / traditionalH) * 100)}%` } : {}}
                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <p className="max-w-[112px] text-center text-sm font-semibold" style={{ color: EMERALD }}>MoveSmart Rentals</p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="mt-10 text-center text-xs text-white/30"
        >
          Calculation assumes $2,500/mo rent. Traditional PM at 12% annual. MoveSmart one-time placement fee equals one month&apos;s rent.
        </motion.p>
      </div>
    </section>
  )
}

/* ─── Section: Feature Comparison Table ─────────────────────────────────────── */

function FeatureTable() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative bg-white py-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: EMERALD }}>
            Detailed Comparison
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal" style={{ color: NAVY }}>
            Compare Plans Side by Side
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Every feature, clearly laid out — so you can choose with confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/80"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: NAVY }}>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-white/70">Feature</th>
                  <th className="px-4 py-5 text-center text-sm font-semibold text-white/70">Self-Serve</th>
                  <th className="px-4 py-5 text-center text-sm font-bold" style={{ color: EMERALD, background: `${EMERALD}18` }}>
                    Full Service
                  </th>
                  <th className="px-4 py-5 text-center text-sm font-semibold text-white/70">Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-slate-100 last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">{row.feature}</td>
                    <td className="px-4 py-4 text-center">{row.selfServe ? <CheckSVG /> : <XSVGIcon />}</td>
                    <td className="bg-emerald-50/60 px-4 py-4 text-center">{row.fullService ? <CheckSVG /> : <XSVGIcon />}</td>
                    <td className="px-4 py-4 text-center">{row.premium ? <CheckSVG /> : <XSVGIcon />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export function PricingContent() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Pricing', href: '/pricing/' },
          ]}
        />
      </div>

      {/* Hero */}
      <HeroBlock
        headline="Simple, Transparent Pricing"
        subheadline="Nothing upfront. We only succeed when you do. No hidden fees, no surprises."
      />

      {/* Section 1: VS Comparison */}
      <VSComparison />

      {/* Section 2: Process Timeline */}
      <ProcessTimeline />

      {/* Section 3: Cost Calculator Bar Chart */}
      <CostCalculator />

      {/* Section 4: Feature Comparison Table */}
      <FeatureTable />

      {/* Section 5: FAQ */}
      <FAQBlock questions={PRICING_FAQS} title="Pricing FAQ" />

      {/* Section 6: CTA */}
      <CTABannerBlock
        headline="Start with Zero Risk"
        description="List your property for free. Only pay when we find you a qualified tenant."
        primaryCta={{ label: 'Get Started', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}
