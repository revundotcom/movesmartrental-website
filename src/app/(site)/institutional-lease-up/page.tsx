import type { Metadata } from 'next'
import { BarChart3, Calendar, Target } from 'lucide-react'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const PAGE_PATH = '/institutional-lease-up/'
const PAGE_TITLE = 'Institutional Lease-Up Services'
const PAGE_DESCRIPTION =
  'Pilot-ready leasing for institutional landlords and asset managers. Three-asset pilot, 15-day mobilization, 120-day decision point. Live KPIs, monthly executive review, no internal payroll.'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: PAGE_PATH,
    fallbackTitle: PAGE_TITLE,
    fallbackDescription: PAGE_DESCRIPTION,
  })
}

const PILLARS: Array<{
  icon: typeof Target
  title: string
  description: string
}> = [
  {
    icon: Target,
    title: 'Buy output, not headcount',
    description:
      'Starlight, Greenwin, Realstar pattern: no leasing payroll, no recruiter cost, no benefits or management overhead. One operator, one team, delivered as a service.',
  },
  {
    icon: BarChart3,
    title: 'KPI-driven governance',
    description:
      'Leads, tours, offers, approvals, move-ins, days-to-lease, cost-per-lease, vacancy reduction. Live in the portal, reviewed monthly.',
  },
  {
    icon: Calendar,
    title: 'Time-boxed pilot',
    description:
      'Day 0 setup. Day 15 launch. Day 30 full pilot active. Day 120 scale, refine, or stop, decided against agreed KPI thresholds.',
  },
]

const PRICING_OPTIONS: Array<{
  badge: string
  title: string
  description: string
}> = [
  {
    badge: 'Option A',
    title: 'Full service',
    description:
      "1 month's rent per successful lease. MoveSmart covers all leasing and advertising costs. Owner covers signage where applicable.",
  },
  {
    badge: 'Option B',
    title: 'Reduced fee plus pass-through',
    description:
      "70% of 1 month's rent per lease. Owner funds ad spend at cost. MoveSmart covers all staffing and execution.",
  },
]

const TIMELINE_STEPS: Array<{ window: string; title: string; description: string }> = [
  {
    window: 'Days 0 to 7',
    title: 'Setup and intake',
    description:
      'Contracts, data intake, portal provisioning, user access.',
  },
  {
    window: 'Days 7 to 15',
    title: 'Audit and KPI alignment',
    description:
      'Unit access verified, baseline reviewed, thresholds aligned.',
  },
  {
    window: 'Day 15',
    title: 'Pilot launch',
    description: 'Live lead handling, tour scheduling, source attribution.',
  },
  {
    window: 'By day 30',
    title: 'Full pilot active',
    description:
      'Active across all assets, monthly executive review cadence.',
  },
  {
    window: 'Day 120',
    title: 'Decision point',
    description: 'Scale, refine, or stop, decided against agreed KPI targets.',
  },
]

export default async function InstitutionalLeaseUpPage() {
  const breadcrumbCrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Institutional Lease-Up', href: PAGE_PATH },
  ]

  const breadcrumbSchema = buildBreadcrumbListSchema({
    crumbs: breadcrumbCrumbs.map((c) => ({
      name: c.label,
      url: `${SITE_URL}${c.href}`,
    })),
  })

  return (
    <main>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <BreadcrumbNav crumbs={breadcrumbCrumbs} />
      </div>

      {/* Hero */}
      <PageHeroBlock
        kicker="For Institutional Landlords"
        eyebrow="Pilot-ready leasing"
        headline="A controlled pilot to measurably improve leasing velocity"
        lede="Three assets, three markets, one pilot. 15 days to mobilize, 30 days to full deployment, 120 days to a numbers-based decision: scale, refine, or stop."
        cta1={{
          label: 'Request a Pilot Brief',
          href: '/contact/?type=institutional',
        }}
        cta2={{ label: 'See KPI Framework', href: '/portal-and-technology/' }}
      />

      {/* Three pillar cards */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              The pilot model
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Three pillars, one accountable operator
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The institutional lease-up pilot is built on three commitments. Each one is
              measured, reported, and reviewed against agreed KPI thresholds.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="relative flex flex-col rounded-2xl border border-brand-navy/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-md"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
                  />
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                    <Icon
                      className="size-6 text-brand-emerald"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="font-display text-xl font-normal text-brand-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing options strip */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Commercial structure
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Two pricing options, one promise
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Choose the structure that aligns with your asset management model. Both options
              are success-based and tied to delivered leases.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PRICING_OPTIONS.map((option) => (
              <div
                key={option.badge}
                className="relative flex flex-col rounded-2xl border border-brand-navy/10 bg-white p-8 shadow-sm"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
                />
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                  {option.badge}
                </span>
                <h3 className="mt-5 font-display text-2xl font-normal text-brand-navy">
                  {option.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">
            Under either option, the owner pays no leasing payroll, salaries, recruiter
            costs, benefits, or internal staffing overhead.
          </p>
        </div>
      </section>

      {/* Pilot timeline visualization */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Pilot timeline
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              From day 0 to decision point
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              A 120-day controlled pilot with five clearly defined milestones. Each one is
              measured against a pre-agreed KPI threshold.
            </p>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="relative mt-16 hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0"
            />
            <ol className="relative grid grid-cols-5 gap-4">
              {TIMELINE_STEPS.map((step, idx) => (
                <li key={step.title} className="relative">
                  <div className="flex flex-col items-start">
                    <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-brand-navy font-display text-sm font-semibold text-white shadow-md ring-4 ring-white">
                      {idx + 1}
                    </span>
                    <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-emerald">
                      {step.window}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-normal leading-snug text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Mobile / tablet vertical timeline */}
          <ol className="relative mt-12 space-y-8 lg:hidden">
            <div
              aria-hidden="true"
              className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand-gold/0 via-brand-gold/60 to-brand-gold/0"
            />
            {TIMELINE_STEPS.map((step, idx) => (
              <li key={step.title} className="relative pl-16">
                <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-brand-navy font-display text-sm font-semibold text-white shadow-md ring-4 ring-white">
                  {idx + 1}
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-emerald">
                  {step.window}
                </p>
                <h3 className="mt-1 font-display text-xl font-normal leading-snug text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA banner */}
      <CTABannerBlock
        headline="Test a controlled leasing model, no internal payroll required."
        description="Three assets, 15-day mobilization, 120-day decision point."
        primaryCta={{
          label: 'Request Pilot Brief',
          href: '/contact/?type=institutional',
        }}
        secondaryCta={{ label: 'Talk to a Director', href: '/contact/?intent=call' }}
      />
    </main>
  )
}
