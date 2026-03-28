'use client'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { Button } from '@/components/ui/button'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ---------- Data ---------- */

const PRICING_TIERS = [
  {
    name: 'Self-Serve',
    price: 'Free',
    priceNote: 'to list',
    description: 'List your property and manage tenants yourself.',
    features: [
      'Basic listing on portal',
      'Self-manage applications',
      'Listing analytics dashboard',
      'Email support',
    ],
    cta: { label: 'Get Started Free', href: '/contact/' },
    highlighted: false,
  },
  {
    name: 'Full Service',
    price: 'Success-Based',
    priceNote: 'fee on placement',
    description:
      'Professional tenant placement with screening and marketing.',
    features: [
      'Professional photography',
      'MLS and portal listing',
      'Tenant screening and credit checks',
      'Application management',
      'Lease preparation',
      'Dedicated placement specialist',
    ],
    cta: { label: 'Choose Full Service', href: '/contact/' },
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 'All-Inclusive',
    priceNote: 'full management',
    description:
      'Everything in Full Service plus ongoing property management.',
    features: [
      'Everything in Full Service',
      'Dedicated account manager',
      'Rent protection guarantee',
      'Property prep coordination',
      'Ongoing tenant relations',
      'Maintenance coordination',
      '24/7 emergency support',
    ],
    cta: { label: 'Choose Premium', href: '/contact/' },
    highlighted: false,
  },
] as const

const COMPARISON_FEATURES = [
  {
    feature: 'Portal Listing',
    selfServe: true,
    fullService: true,
    premium: true,
  },
  {
    feature: 'Professional Photography',
    selfServe: false,
    fullService: true,
    premium: true,
  },
  {
    feature: 'MLS Listing',
    selfServe: false,
    fullService: true,
    premium: true,
  },
  {
    feature: 'Tenant Screening',
    selfServe: false,
    fullService: true,
    premium: true,
  },
  {
    feature: 'Lease Preparation',
    selfServe: false,
    fullService: true,
    premium: true,
  },
  {
    feature: 'Dedicated Specialist',
    selfServe: false,
    fullService: true,
    premium: true,
  },
  {
    feature: 'Account Manager',
    selfServe: false,
    fullService: false,
    premium: true,
  },
  {
    feature: 'Rent Protection',
    selfServe: false,
    fullService: false,
    premium: true,
  },
  {
    feature: 'Property Prep',
    selfServe: false,
    fullService: false,
    premium: true,
  },
  {
    feature: 'Maintenance Coordination',
    selfServe: false,
    fullService: false,
    premium: true,
  },
  {
    feature: '24/7 Emergency Support',
    selfServe: false,
    fullService: false,
    premium: true,
  },
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

/* ---------- Helper components ---------- */

function CheckIcon() {
  return (
    <div className="mx-auto flex size-6 items-center justify-center rounded-full bg-brand-emerald/10">
      <Check className="size-4 text-brand-emerald" aria-label="Included" />
    </div>
  )
}

function XIcon() {
  return (
    <div className="mx-auto flex size-6 items-center justify-center">
      <X className="size-4 text-slate-300" aria-label="Not included" />
    </div>
  )
}

/* ---------- Page ---------- */

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

      {/* ── SECTION 1: Hero ── */}
      <HeroBlock
        headline="Simple, Transparent Pricing"
        subheadline="Nothing upfront. We only succeed when you do. No hidden fees, no surprises."
      />

      {/* ── SECTION 2: Pricing Tiers ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-28">
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-widest text-brand-emerald">
              Plans &amp; Pricing
            </p>
            <h2 className="mt-3 font-display text-4xl font-normal text-brand-navy">
              Pick the plan that fits your goals
            </h2>
            <p className="mt-4 text-base text-slate-500">
              All plans are risk-free. We only earn when you do — no upfront
              charges, ever.
            </p>
          </div>

          {/* Tier cards */}
          <RevealOnScroll className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) =>
              tier.highlighted ? (
                /* ── Highlighted card ── */
                <motion.div
                  key={tier.name}
                  variants={revealItem}
                  className="relative flex flex-col"
                >
                  {/* Glow behind card */}
                  <div className="absolute -inset-4 rounded-3xl bg-brand-emerald/5 blur-xl" />

                  {/* Most Popular badge */}
                  <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-emerald px-5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>

                  <div className="relative flex flex-1 flex-col rounded-3xl bg-gradient-to-b from-[#0f2044] to-[#082a20] p-8 text-white shadow-2xl shadow-brand-navy/40 ring-2 ring-brand-emerald/50 scale-105">
                    {/* Tier name */}
                    <p className="text-xs font-black uppercase tracking-widest text-brand-emerald">
                      {tier.name}
                    </p>

                    {/* Price */}
                    <p className="mt-4 text-5xl font-black text-white">
                      {tier.price}
                    </p>
                    <p className="text-sm text-white/50">{tier.priceNote}</p>

                    {/* Description */}
                    <p className="mt-4 text-sm text-white/70">
                      {tier.description}
                    </p>

                    {/* Divider */}
                    <div className="my-6 h-px bg-white/10" />

                    {/* Features */}
                    <ul className="flex-1 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-emerald/20">
                            <Check className="size-3 text-brand-emerald" />
                          </div>
                          <span className="text-sm text-white/80">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-8">
                      <Button
                        size="lg"
                        className="w-full bg-brand-emerald font-bold text-white hover:-translate-y-0.5 hover:bg-brand-emerald/90"
                        render={<Link href={tier.cta.href} />}
                      >
                        {tier.cta.label}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ── Standard cards ── */
                <motion.div
                  key={tier.name}
                  variants={revealItem}
                  className="group relative flex flex-col"
                >
                  {/* Top accent bar */}
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-3xl bg-gradient-to-r from-brand-emerald to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="flex flex-1 flex-col rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-xl hover:shadow-brand-navy/10">
                    {/* Tier name */}
                    <p className="text-xs font-black uppercase tracking-widest text-brand-emerald">
                      {tier.name}
                    </p>

                    {/* Price */}
                    <p className="mt-4 text-5xl font-black text-brand-navy">
                      {tier.price}
                    </p>
                    <p className="text-sm text-slate-400">{tier.priceNote}</p>

                    {/* Description */}
                    <p className="mt-4 text-sm text-slate-500">
                      {tier.description}
                    </p>

                    {/* Divider */}
                    <div className="my-6 h-px bg-slate-100" />

                    {/* Features */}
                    <ul className="flex-1 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10">
                            <Check className="size-3 text-brand-emerald" />
                          </div>
                          <span className="text-sm text-slate-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-8">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                        render={<Link href={tier.cta.href} />}
                      >
                        {tier.cta.label}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 3: Feature Comparison Table ── */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-4xl px-4">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-widest text-brand-emerald">
              Detailed Comparison
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-brand-navy">
              Compare Plans Side by Side
            </h2>
            <p className="mt-4 text-base text-slate-500">
              Every feature, clearly laid out — so you can choose with
              confidence.
            </p>
          </div>

          {/* Table */}
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-brand-navy/8"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-navy text-white">
                      <th className="px-6 py-5 text-left text-sm font-semibold text-white/80">
                        Feature
                      </th>
                      <th className="px-4 py-5 text-center text-sm font-semibold text-white/80">
                        Self-Serve
                      </th>
                      <th className="bg-brand-emerald/20 px-4 py-5 text-center text-sm font-bold text-brand-emerald">
                        Full Service
                      </th>
                      <th className="px-4 py-5 text-center text-sm font-semibold text-white/80">
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_FEATURES.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-slate-100 transition-colors last:border-b-0 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                        }`}
                      >
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {row.feature}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {row.selfServe ? <CheckIcon /> : <XIcon />}
                        </td>
                        <td className="bg-brand-emerald/[0.03] px-4 py-4 text-center">
                          {row.fullService ? <CheckIcon /> : <XIcon />}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {row.premium ? <CheckIcon /> : <XIcon />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 4: FAQ ── */}
      <FAQBlock questions={PRICING_FAQS} title="Pricing FAQ" />

      {/* ── SECTION 5: CTA ── */}
      <CTABannerBlock
        headline="Start with Zero Risk"
        description="List your property for free. Only pay when we find you a qualified tenant."
        primaryCta={{ label: 'Get Started', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}
