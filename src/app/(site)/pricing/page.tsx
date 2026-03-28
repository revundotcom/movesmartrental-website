import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing | MoveSmart Rentals',
  description:
    'Zero upfront cost property management. Success-based pricing with no hidden fees. See our service tiers and what is included.',
}

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

function CheckIcon() {
  return <Check className="mx-auto size-5 text-green-600" aria-label="Included" />
}

function XIcon() {
  return <X className="mx-auto size-5 text-muted-foreground/40" aria-label="Not included" />
}

export default function PricingPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Pricing', href: '/pricing/' },
          ]}
        />
      </div>

      <HeroBlock
        headline="Simple, Transparent Pricing"
        subheadline="Nothing upfront. We only succeed when you do."
      />

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${
                  tier.highlighted
                    ? 'border-primary shadow-lg ring-2 ring-primary'
                    : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tier.priceNote}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button
                      variant={tier.highlighted ? 'default' : 'outline'}
                      size="lg"
                      className="w-full"
                      render={<Link href={tier.cta.href} />}
                    >
                      {tier.cta.label}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Compare Plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 pr-4 text-left font-semibold">Feature</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Self-Serve
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Full Service
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row) => (
                  <tr key={row.feature} className="border-b">
                    <td className="py-3 pr-4">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      {row.selfServe ? <CheckIcon /> : <XIcon />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.fullService ? <CheckIcon /> : <XIcon />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.premium ? <CheckIcon /> : <XIcon />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQBlock questions={PRICING_FAQS} title="Pricing FAQ" />

      <CTABannerBlock
        headline="Start with Zero Risk"
        description="List your property for free. Only pay when we find you a qualified tenant."
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
      />
    </main>
  )
}
