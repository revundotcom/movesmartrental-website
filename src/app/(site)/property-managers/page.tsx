import type { Metadata } from 'next'
import { ClipboardCheck, Eye, Layers } from 'lucide-react'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const PAGE_PATH = '/property-managers/'
const PAGE_TITLE = 'Outsourced Leasing for Property Managers'
const PAGE_DESCRIPTION =
  'Outsource leasing without losing operational control. End-to-end leasing execution, live portal visibility, and structured tenant qualification across your portfolio. Zero internal payroll burden.'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: PAGE_PATH,
    fallbackTitle: PAGE_TITLE,
    fallbackDescription: PAGE_DESCRIPTION,
  })
}

const VALUE_PROPS: Array<{
  icon: typeof Layers
  title: string
  description: string
}> = [
  {
    icon: Layers,
    title: 'One accountable operator',
    description:
      'Listing setup, lead capture, tour booking, showings, qualification, lease execution, and move-in coordination, all run by one team with one escalation path.',
  },
  {
    icon: ClipboardCheck,
    title: 'Structured qualification',
    description:
      'Credit, income, employment, references, risk assessment, and compliance documented for every applicant. Audit trail visible per file.',
  },
  {
    icon: Eye,
    title: 'Audit any lead, anytime',
    description:
      'Every call logged with transcript, every text and email archived, every showing GPS-confirmed. Drill down to any specific lead end to end.',
  },
]

const COMPARISON_ROWS: Array<{
  label: string
  internal: string
  movesmart: string
}> = [
  {
    label: 'Coverage',
    internal: 'Fixed staff hours',
    movesmart: '24/7 calls, texts, email, chat',
  },
  {
    label: 'Cost',
    internal: 'Salaries, benefits, training, software',
    movesmart: 'Per-lease success fee, no overhead',
  },
  {
    label: 'Visibility',
    internal: 'Reports lag, fragmented systems',
    movesmart: 'Live portal, refreshed continuously',
  },
  {
    label: 'Approval',
    internal: 'Slow, weekday-only',
    movesmart:
      'AI auto-approval against your criteria, manual override on mobile 24/7',
  },
  {
    label: 'Execution risk',
    internal: 'Hiring, onboarding, retention',
    movesmart: 'One operator, one accountable team',
  },
]

export default async function PropertyManagersPage() {
  const breadcrumbCrumbs = [
    { label: 'Home', href: '/' },
    { label: 'For Property Managers', href: PAGE_PATH },
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
        kicker="For Property Managers"
        eyebrow="Outsourced leasing"
        headline="Outsource leasing without losing control"
        lede="Pass the full leasing process to our team and keep operational visibility through a portal you can audit any time. Live KPIs by asset, full communication history, and a single accountable operator."
        cta1={{
          label: 'Book a Strategy Call',
          href: '/contact/?type=property-manager',
        }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
      />

      {/* Value props - 3 column grid */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Leasing as output, not as a department
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Three commitments built into every property manager engagement. Run the same way
              across every asset in your portfolio.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((prop) => {
              const Icon = prop.icon
              return (
                <div
                  key={prop.title}
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
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {prop.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Side by side
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Internal team vs MoveSmart as a service
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The same leasing scope, two ways to deliver it. Compare on the line items that
              actually drive cost, speed, and risk.
            </p>
          </div>

          {/* Desktop table */}
          <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70"
                  >
                    Line item
                  </th>
                  <th scope="col" className="w-1/3 px-6 py-5">
                    <p className="font-display text-xl font-normal text-white">
                      Internal leasing team
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-white/60">
                      In-house staff and tooling
                    </p>
                  </th>
                  <th scope="col" className="w-1/3 px-6 py-5">
                    <p className="font-display text-xl font-normal italic text-brand-gold">
                      MoveSmart as a service
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-brand-gold/80">
                      One operator, one accountable team
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={`border-t border-slate-200/80 align-top ${
                      idx % 2 === 1 ? 'bg-[#FBFAF6]' : 'bg-white'
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 text-sm font-semibold text-brand-navy"
                    >
                      {row.label}
                    </th>
                    <td className="px-6 py-5 text-sm leading-relaxed text-slate-700">
                      {row.internal}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium leading-relaxed text-brand-navy">
                      {row.movesmart}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stack */}
          <div className="mt-12 space-y-4 md:hidden">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.label}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
              >
                <div className="bg-brand-navy px-5 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                    {row.label}
                  </p>
                </div>
                <dl className="divide-y divide-slate-200/80">
                  <div className="px-5 py-4">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Internal leasing team
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                      {row.internal}
                    </dd>
                  </div>
                  <div className="px-5 py-4">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-brand-emerald">
                      MoveSmart as a service
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-brand-navy">
                      {row.movesmart}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <CTABannerBlock
        headline="Run leasing as output, not as a department."
        description="Book a 30-minute working call to map your portfolio onto MoveSmart's leasing engine."
        primaryCta={{
          label: 'Book a Call',
          href: '/contact/?type=property-manager',
        }}
        secondaryCta={{ label: 'Pricing Options', href: '/pricing/' }}
      />
    </main>
  )
}
