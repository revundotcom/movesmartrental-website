import type { Metadata } from 'next'
import Image from 'next/image'
import { Activity, Building2, Users } from 'lucide-react'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const PAGE_PATH = '/developers/'
const PAGE_TITLE = 'Lease-Up Services for Developers'
const PAGE_DESCRIPTION =
  'Bulk unit onboarding, campaign strategy, on-site leasing team deployment, and reporting dashboards for residential developers and builders. Zero internal payroll. Live portal visibility from day one.'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: PAGE_PATH,
    fallbackTitle: PAGE_TITLE,
    fallbackDescription: PAGE_DESCRIPTION,
  })
}

const VALUE_PROPS: Array<{
  icon: typeof Building2
  title: string
  description: string
}> = [
  {
    icon: Building2,
    title: 'Bulk unit onboarding',
    description:
      'We onboard the full unit roster, draft listings, prep photography, virtual tours, and floor plans, and stage MLS plus 50+ rental portal syndication on launch day.',
  },
  {
    icon: Activity,
    title: 'Live portal visibility',
    description:
      'Owners and project teams see the same live dashboard our leasing team works against. Lead volume, response time, tours, offers, leases, and days-to-lease, by asset and by unit.',
  },
  {
    icon: Users,
    title: 'On-site leasing team',
    description:
      'Coordinated showings, structured tenant qualification, lease execution, and move-in coordination. We staff to your absorption schedule, not a fixed shift.',
  },
]

const PROCESS_STEPS: Array<{ title: string; description: string }> = [
  {
    title: 'Mobilize',
    description: '15 days from sign-off to launch.',
  },
  {
    title: 'Distribute',
    description: 'MLS, Realtor.ca, 50+ rental portals, paid social, and your website.',
  },
  {
    title: 'Convert',
    description:
      '24/7 lead handling, in-person and virtual showings, AI-assisted approval against your criteria.',
  },
  {
    title: 'Stabilize',
    description:
      'Documented move-ins, weekly absorption reporting, monthly executive review.',
  },
]

export default async function DevelopersPage() {
  const breadcrumbCrumbs = [
    { label: 'Home', href: '/' },
    { label: 'For Developers', href: PAGE_PATH },
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
        kicker="For Developers"
        eyebrow="Lease-up campaigns"
        headline="Lease-up campaigns, executed end to end"
        lede="Bulk unit onboarding, campaign strategy, on-site leasing team deployment, and reporting dashboards. We absorb the leasing operation so your project hits stabilization on schedule."
        cta1={{ label: 'See Pricing', href: '/pricing/' }}
        aside={
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-brand-navy/10">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80"
              alt="Modern multi-unit residential building exterior, the kind of project MoveSmart leases up"
              fill
              unoptimized
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-brand-navy/35 via-transparent to-transparent"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-lg bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
              <p className="font-display text-base italic leading-tight text-brand-navy">
                15 days to mobilize. One operator.
              </p>
            </div>
          </div>
        }
      />

      {/* Value props - 3 column grid */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              What you get
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Three pillars of a clean lease-up
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              One operator, one accountable team, one reporting surface. Built to absorb the
              leasing workload so your internal team can focus on construction, finance, and
              handover.
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

      {/* Mid-page visual band - on-site leasing team */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-brand-navy/10">
                <Image
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80"
                  alt="On-site leasing team collaborating around a project plan"
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center md:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Deployed to your schedule
              </p>
              <h3 className="mt-3 font-display text-3xl font-normal leading-tight text-brand-navy sm:text-4xl">
                A dedicated leasing team,
                <span className="italic text-brand-emerald"> not a call centre</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h3>
              <p className="mt-4 font-serif text-base leading-[1.7] text-slate-700 sm:text-[17px]">
                Named coordinators, in-market showings, and AI-assisted approval against your
                criteria. We staff to your absorption schedule and report on the same KPIs your
                project finance team already tracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process strip - 4 horizontal numbered steps */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              The Playbook
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              From mobilization to stabilization
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Four phases, one operator, weekly reporting on the same KPIs your project finance
              team already tracks.
            </p>
          </div>

          <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => (
              <li
                key={step.title}
                className="relative border-t-2 border-brand-navy/15 pt-6"
              >
                <div className="absolute -top-[2px] left-0 h-[2px] w-12 bg-brand-gold" />
                <p className="font-display text-5xl font-normal italic leading-none text-brand-gold/70 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-xl font-normal text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA banner */}
      <CTABannerBlock
        headline="Bring lease-up risk down to zero internal headcount."
        description="Align on scope, pricing, and an absorption schedule. We deploy a dedicated leasing team to your project."
        primaryCta={{ label: 'Get Started', href: '/contact/?type=developer' }}
        secondaryCta={{ label: 'View Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
