import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Zero upfront cost property management. Success-based pricing with no hidden fees. See our service tiers and what is included.',
  alternates: {
    canonical: '/pricing/',
  },
}

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
      <Check
        className="size-4 text-brand-emerald"
        aria-label="Included"
      />
    </div>
  )
}

function XIcon() {
  return (
    <div className="mx-auto flex size-6 items-center justify-center">
      <X
        className="size-4 text-slate-300"
        aria-label="Not included"
      />
    </div>
  )
}

/* ---------- Page ---------- */

export default function PricingPage() {
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
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-8 transition-shadow ${
                  tier.highlighted
                    ? 'border-brand-emerald shadow-xl shadow-brand-emerald/10 ring-1 ring-brand-emerald'
                    : 'border-border hover:shadow-lg'
                }`}
              >
                {/* Most Popular badge */}
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-emerald px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </div>
                )}

                {/* Tier header */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {tier.name}
                  </h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-brand-navy">
                      {tier.price}
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tier.priceNote}
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10">
                        <Check className="size-3 text-brand-emerald" />
                      </div>
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    variant={tier.highlighted ? 'default' : 'outline'}
                    size="lg"
                    className={`w-full ${
                      tier.highlighted
                        ? ''
                        : 'border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                    }`}
                    render={<Link href={tier.cta.href} />}
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Feature Comparison Table ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Detailed Comparison
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              Compare Plans
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-brand-navy">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-brand-navy">
                    Self-Serve
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-brand-emerald">
                    Full Service
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-brand-navy">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-border transition-colors last:border-b-0 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {row.feature}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {row.selfServe ? <CheckIcon /> : <XIcon />}
                    </td>
                    <td className="px-4 py-4 text-center">
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
