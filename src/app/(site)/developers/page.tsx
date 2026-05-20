import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
import {
  AnimatedStat,
  PainPointCard,
  PhaseRow,
  PillarCard,
  KpiCard,
  ProjectTypeCard,
  CaseStudyCard,
  ParallaxImageBand,
  FloatingBadge,
  Reveal,
} from './developers-client-parts'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const PAGE_PATH = '/developers/'
const PAGE_TITLE = 'Lease-Up Services for Residential Developers & Builders'
const PAGE_DESCRIPTION =
  'End-to-end lease-up campaigns for developers and builders: pre-occupancy marketing, sales-centre operations, on-site leasing team, deposit collection, lender-grade absorption reporting. 15-day mobilization, zero internal payroll.'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: PAGE_PATH,
    fallbackTitle: PAGE_TITLE,
    fallbackDescription: PAGE_DESCRIPTION,
  })
}

/* ────────────────────────────────────────────────────────────────────
 *  HERO STATS
 * ──────────────────────────────────────────────────────────────────── */
const HERO_STATS: Array<{ value: string; label: string; suffix?: string }> = [
  { value: '15', label: 'Days to mobilize', suffix: 'd' },
  { value: '24', label: 'Hour coverage', suffix: '/7' },
  { value: '50', label: 'Rental portals', suffix: '+' },
  { value: '0', label: 'Internal payroll', suffix: '$' },
]

/* ────────────────────────────────────────────────────────────────────
 *  THREE PILLARS — image-led
 * ──────────────────────────────────────────────────────────────────── */
const PILLARS: Array<{
  iconKey: string
  tag: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}> = [
  {
    iconKey: 'Building2',
    tag: 'Bulk onboarding',
    title: 'Full unit roster in 15 days',
    description:
      'We ingest the unit mix, draft editorial listings, schedule photography and virtual tours, prep floor plans, and stage MLS plus 50+ rental-portal syndication for launch day.',
    imageSrc:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Multi-family residential tower ready for lease-up onboarding',
  },
  {
    iconKey: 'Activity',
    tag: 'Live KPI portal',
    title: 'Lender-grade absorption visibility',
    description:
      'You and the equity group see the same live dashboard our leasing team works against — lead volume, response time, tours, offers, leases, days-to-lease, cost-per-lease, asset by asset and unit by unit.',
    imageSrc:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Asset manager reviewing live absorption dashboard for a lease-up project',
  },
  {
    iconKey: 'Users',
    tag: 'On-site leasing team',
    title: 'Sales-centre and showings, staffed',
    description:
      'Named coordinators run model-suite tours, evening and weekend showings, AI-assisted approval against your criteria, deposit collection, and phased move-in choreography against your TCO release schedule.',
    imageSrc:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'On-site leasing professional touring a prospect through a new-build model suite',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  RISKS / PAIN POINTS
 * ──────────────────────────────────────────────────────────────────── */
const PAIN_POINTS: Array<{
  iconKey: string
  tag: string
  imageSrc: string
  imageAlt: string
  problem: string
  solution: string
}> = [
  {
    iconKey: 'DollarSign',
    tag: 'Carrying cost burn',
    imageSrc:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Keys handed over at the close of a successful lease-up engagement',
    problem:
      'Every vacant month on a 200-unit GTA build burns six figures in debt service and opex. Slow absorption silently eats IRR.',
    solution:
      '15-day mobilization, 24/7 lead coverage, and parallel tour cadence so absorption velocity matches the pro forma instead of the calendar.',
  },
  {
    iconKey: 'Calendar',
    tag: 'Lender draw schedule',
    imageSrc:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Construction-loan documents and signed lease agreements on a boardroom table',
    problem:
      'Construction-to-perm conversion depends on hitting 50 / 75 / 93% occupancy milestones. Missing them triggers extension fees or worse refinancing terms.',
    solution:
      'Weekly draw-package documentation and milestone-locked reporting so lenders see absorption against schedule in real time.',
  },
  {
    iconKey: 'Clock',
    tag: 'Phased occupancy chaos',
    imageSrc:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Multi-residential building under construction at dusk with cranes visible',
    problem:
      'TCO permits drip floor by floor. Leasing teams must match move-in inventory to the lease pipeline in real time or stack tenants on the wrong dates.',
    solution:
      'Inventory-aware lease execution and move-in choreography that follows the elevator booking, parking, and TCO floor release.',
  },
  {
    iconKey: 'Megaphone',
    tag: 'Sales-centre operations',
    imageSrc:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Modern sales centre interior staged with marketing collateral',
    problem:
      'Builders are not staffed for 7-day touring, after-hours leads, multilingual prospects, or concierge-style sales-centre coverage.',
    solution:
      'Dedicated on-site team running model suite, sales centre, broker open houses, and after-hours response — 63% of inquiries arrive outside fixed staff hours.',
  },
  {
    iconKey: 'TrendingUp',
    tag: 'Pro-forma rent defense',
    imageSrc:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Lease-up team reviewing comp set and rent strategy on a laptop',
    problem:
      'Asking rent was underwritten 24 months ago. Now the market has softened and the temptation is to discount — permanently re-basing the rent roll.',
    solution:
      'Calibrated pricing strategy reviewed weekly against live comps, concession-adjusted to defend effective rent without resetting the schedule.',
  },
  {
    iconKey: 'ShieldCheck',
    tag: 'RECO compliance',
    imageSrc:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compliance and legal team reviewing lease documentation in a boardroom',
    problem:
      'Deposit collection and lease execution on behalf of an owner requires RECO registration and TRESA-compliant disclosure. Mistakes invite regulator action.',
    solution:
      'RECO-registered brokerage, trust-accounted deposits, jurisdiction-specific lease templates, and PIPEDA-compliant tenant data handling end-to-end.',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  8-PHASE LEASE-UP CAMPAIGN
 * ──────────────────────────────────────────────────────────────────── */
const PHASES: Array<{
  window: string
  title: string
  description: string
  bullets: string[]
  imageSrc: string
  imageAlt: string
}> = [
  {
    window: 'T-180 to T-90 · Strategy',
    title: 'Pre-development planning',
    description:
      'Market study, rent strategy, audience segmentation, and lease-up budget set before the first brochure is written.',
    bullets: [
      'Submarket absorption read',
      'Rent and concession strategy',
      'Persona and channel map',
      'Lease-up budget envelope',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Strategy session reviewing submarket data and absorption planning',
  },
  {
    window: 'T-120 to T-60 · Brand',
    title: 'Brand and creative development',
    description:
      'Project identity, microsite, editorial photography, 3D virtual tour, and lender-ready collateral built to the unit mix.',
    bullets: [
      'Project naming and identity',
      'Microsite + Google Index ready',
      '3D virtual tour + floor plans',
      'Broker preview package',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Creative team reviewing brand identity and microsite design',
  },
  {
    window: 'T-90 to T-30 · Pre-launch',
    title: 'Soft launch and waitlist build',
    description:
      'Registration capture, broker preview, paid acquisition, and tiered priority access opens — converting interest into a real pipeline before TCO.',
    bullets: [
      'Geo-fenced Meta + Google',
      'Broker registration portal',
      'Tiered priority access',
      'Tour booking flow live',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Digital marketing team running paid acquisition for a new-build lease-up',
  },
  {
    window: 'T-30 to T+0 · Launch',
    title: 'Grand opening and market launch',
    description:
      'Sales centre opens, model suite live, broker open houses, PR push, and 50+ portal syndication switches on the same day.',
    bullets: [
      'Sales centre staffed 7-day',
      'Broker open houses',
      'MLS + 50 rental portals',
      'PR + community activation',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Grand opening event at a new-build residential sales centre',
  },
  {
    window: 'T+0 onward · Active leasing',
    title: 'Tour cadence and lead conversion',
    description:
      'Coordinated showings, after-hours response, structured tenant qualification, and AI-assisted approval against your criteria.',
    bullets: [
      '24/7 lead handling',
      'In-person and virtual tours',
      'GPS-attested showings',
      'AI-assisted screening',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Leasing professional touring a prospective tenant through a new unit',
  },
  {
    window: 'Application stage',
    title: 'Application and lease execution',
    description:
      'Credit and income verification, employment references, rental history, deposit collection in trust, and province-compliant lease signing.',
    bullets: [
      'Structured screening file',
      'Trust-accounted deposit',
      'RECO-registered execution',
      '<72hr decision cycle',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Lease signing and document execution in a brokerage office',
  },
  {
    window: 'Move-in window',
    title: 'Phased move-in operations',
    description:
      'Move-in scheduling matched to TCO floor release, elevator booking, parking and locker assignment, key handover, and condition inspection.',
    bullets: [
      'Elevator booking calendar',
      'Move-in inspection report',
      'Parking + locker pairing',
      'Welcome handover kit',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'New tenants moving in to a freshly delivered residential building',
  },
  {
    window: 'Stabilization',
    title: 'Handover to ongoing PM',
    description:
      'At 93–95% occupancy we transfer clean tenant files, the deposit ledger, deficiency cross-walk, and the live KPI report to your PM operator.',
    bullets: [
      'Clean tenant file pack',
      'Deposit ledger reconciliation',
      'Deficiency cross-walk',
      'Final lender draw package',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Stabilized residential tower at handover to ongoing property management',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  KPI DASHBOARD (dark band)
 * ──────────────────────────────────────────────────────────────────── */
const KPI_TILES: Array<{
  iconKey: string
  title: string
  description: string
  metric: string
}> = [
  {
    iconKey: 'Activity',
    title: 'Lead volume',
    description: 'Total inbound by source, hourly cohort, channel ROI.',
    metric: '24/7',
  },
  {
    iconKey: 'Clock',
    title: 'Response time',
    description: 'First-touch latency across web, MLS, portals, and broker.',
    metric: '<3m',
  },
  {
    iconKey: 'Gauge',
    title: 'Tour-to-lease',
    description: 'Booked, attended, signed — funnel % per asset.',
    metric: '9-12%',
  },
  {
    iconKey: 'TrendingUp',
    title: 'Absorption velocity',
    description: 'Net leased units per month vs. underwriting target.',
    metric: '18-25/mo',
  },
  {
    iconKey: 'DollarSign',
    title: 'Cost per lease',
    description: 'Blended marketing + leasing spend per executed lease.',
    metric: 'Live',
  },
  {
    iconKey: 'Calendar',
    title: 'Days to lease',
    description: 'List-to-signed by unit type, by floor, by month.',
    metric: '~18d',
  },
  {
    iconKey: 'LineChart',
    title: 'Pre-lease %',
    description: 'Pre-TCO commitments tracked against draw milestones.',
    metric: '25-40%',
  },
  {
    iconKey: 'ShieldCheck',
    title: 'Approval rate',
    description: 'Application-to-approval cycle and decline reasons logged.',
    metric: '<72h',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  PROJECT TYPES
 * ──────────────────────────────────────────────────────────────────── */
const PROJECT_TYPES: Array<{
  title: string
  units: string
  description: string
  imageSrc: string
  imageAlt: string
}> = [
  {
    title: 'Purpose-built rental',
    units: '100–300 units',
    description: 'Mid- and high-rise PBR towers in primary GTA and US metros.',
    imageSrc:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Purpose-built rental tower in a Canadian urban market',
  },
  {
    title: 'Condo lease-up',
    units: 'Up to 500 units',
    description: 'Investor-owned condo towers needing coordinated leasing across owners.',
    imageSrc:
      'https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Modern condo tower lit at dusk',
  },
  {
    title: 'Stacked townhomes',
    units: '40–120 units',
    description: 'Boutique stacked-town and back-to-back communities with phased delivery.',
    imageSrc:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Modern stacked townhouse community in a Canadian suburb',
  },
  {
    title: 'Build-to-rent SFR',
    units: '50–250 doors',
    description: 'Single-family build-to-rent communities with model home + clubhouse leasing.',
    imageSrc:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Modern single-family build-to-rent community',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  CASE STUDIES (anonymous patterns)
 * ──────────────────────────────────────────────────────────────────── */
const CASE_STUDIES: Array<{
  badge: string
  headline: string
  body: string
  metrics: Array<{ value: string; label: string }>
  imageSrc: string
  imageAlt: string
}> = [
  {
    badge: 'GTA · 240u mid-rise',
    headline: 'Stabilized in 9 months vs. 14-month pro forma',
    body: 'A purpose-built rental tower in west Toronto hit 93% occupancy four months ahead of underwriting. Carrying-cost savings funded the next acquisition deposit.',
    metrics: [
      { value: '−4mo', label: 'Vs. pro forma' },
      { value: '$1.8M', label: 'Carry saved' },
      { value: '93%', label: 'Occupancy' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Mid-rise residential tower at lease-up stabilization',
  },
  {
    badge: 'Mississauga · 180u PBR',
    headline: '102% of underwritten rent in a softening submarket',
    body: 'Calibrated weekly pricing and a tight concession discipline defended effective rent against pro forma without re-basing the rent roll for the cohort.',
    metrics: [
      { value: '102%', label: 'Of UW rent' },
      { value: '<4%', label: 'Concession' },
      { value: '21u', label: 'Per month' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Urban residential rental tower in Mississauga at dusk',
  },
  {
    badge: 'Two-tower · 320u',
    headline: 'Hit 50 / 75 / 93% draw milestones on schedule',
    body: 'A two-tower portfolio hit every lender occupancy milestone on or ahead of the construction-loan covenant — unlocking perm-loan conversion 60 days early.',
    metrics: [
      { value: '−60d', label: 'Conversion' },
      { value: '3/3', label: 'Milestones' },
      { value: '320u', label: 'Pilot scope' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Two residential towers reaching lender draw milestones on schedule',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  CREDENTIALS STRIP
 * ──────────────────────────────────────────────────────────────────── */
const CREDENTIALS: Array<{ label: string; detail: string }> = [
  { label: 'RECO', detail: 'Registered brokerage' },
  { label: 'TRESA 2023', detail: 'Compliant disclosure' },
  { label: 'PIPEDA', detail: 'Tenant data handling' },
  { label: 'AODA', detail: 'Marketing accessibility' },
  { label: 'IFRS 15', detail: 'Lease revenue support' },
  { label: 'E&O', detail: 'Insured + bonded' },
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

      {/* ─── 01. HERO ────────────────────────────────────────────────── */}
      <PageHeroBlock
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Modern multi-residential building under development at dusk"
        kicker="For Developers & Builders"
        eyebrow="End-to-end lease-up"
        headline="Lease-up campaigns, executed end to end"
        lede="Pre-occupancy marketing, sales-centre operations, on-site leasing, deposit collection, and lender-grade absorption reporting. We absorb the leasing operation so your project hits stabilization on the pro forma — not the calendar."
        cta1={{ label: 'Request a Lease-Up Brief', href: '/contact/?type=developer' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
        aside={
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-2xl shadow-black/30 ring-1 ring-white/10">
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
              className="absolute inset-0 bg-gradient-to-tr from-brand-navy/45 via-transparent to-transparent"
            />
            <FloatingBadge
              iconKey="Calendar"
              title="Mobilize"
              value="15 days"
              delay={0.5}
              className="absolute -left-4 top-6 hidden rounded-2xl border border-white/40 bg-white/95 p-4 shadow-xl shadow-black/30 backdrop-blur sm:block"
            />
            <FloatingBadge
              iconKey="TrendingUp"
              title="Absorption"
              value="18–25/mo"
              delay={0.7}
              className="absolute -right-4 bottom-24 hidden rounded-2xl border border-white/40 bg-white/95 p-4 shadow-xl shadow-black/30 backdrop-blur sm:block"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-lg bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
              <p className="font-display text-base italic leading-tight text-brand-navy">
                One operator. Stabilization on schedule.
              </p>
            </div>
          </div>
        }
      />

      {/* ─── 02. STATS STRIP ────────────────────────────────────────── */}
      <section className="bg-white pt-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-navy/10 sm:grid-cols-4">
            {HERO_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex items-center justify-center bg-white p-6 sm:p-8"
              >
                <AnimatedStat
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={idx * 0.08}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03. THREE PILLARS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                What you get
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Three pillars of a clean{' '}
                <span className="font-display italic text-brand-emerald">lease-up</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                One operator, one accountable team, one reporting surface. Built to absorb the
                leasing workload so your internal team can focus on construction, finance, and
                handover.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-3">
            {PILLARS.map((p, idx) => (
              <PillarCard
                key={p.title}
                index={idx}
                iconKey={p.iconKey}
                tag={p.tag}
                title={p.title}
                description={p.description}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04. PARALLAX BAND — “Buy output not headcount” ─────────── */}
      <ParallaxImageBand
        imageSrc="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Toronto skyline with multi-residential towers at dusk"
        overlayKicker="The operator pattern"
        overlayTitle="Buy leasing output, not headcount."
        overlayBody="Starlight, Greenwin, and Realstar all run lean leasing organizations because they buy delivered leases — not salaries. No recruiter spend, no benefits, no manager-of-managers tier. One operator, one accountable team, one program lead."
      />

      {/* ─── 05. RISKS / PAIN POINTS ────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                What keeps developers awake
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Six risks that quietly burn{' '}
                <span className="font-display italic text-brand-emerald">IRR</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Lease-up is where the underwriting meets the market. Each of these six is a real
                line item against your IRR — and each one is a workflow we cover end-to-end.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PAIN_POINTS.map((p, idx) => (
              <PainPointCard
                key={p.tag}
                index={idx}
                iconKey={p.iconKey}
                tag={p.tag}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
                problem={p.problem}
                solution={p.solution}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 06. 8-PHASE LEASE-UP CAMPAIGN ──────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                The 8-phase playbook
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                From pre-development to{' '}
                <span className="font-display italic text-brand-emerald">stabilization</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Eight phases, one operator, weekly reporting against the same KPIs your project
                finance team already tracks. Each phase has a defined deliverable, a clear owner,
                and a milestone gate.
              </p>
            </div>
          </RevealOnScroll>

          <ol className="space-y-6 sm:space-y-8">
            {PHASES.map((step, idx) => (
              <PhaseRow
                key={step.title}
                index={idx}
                window={step.window}
                title={step.title}
                description={step.description}
                bullets={step.bullets}
                imageSrc={step.imageSrc}
                imageAlt={step.imageAlt}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 07. KPI DARK BAND ──────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-navy/92 to-brand-navy/85" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.08] blur-3xl" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
                Live KPI portal
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                The same dashboard your{' '}
                <span className="font-display italic text-brand-emerald">lender</span> can read
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
                Eight live signals, one screen — visible to the development team, the equity
                group, and the construction lender. No spreadsheets, no after-the-fact reports.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KPI_TILES.map((tile, idx) => (
              <KpiCard
                key={tile.title}
                index={idx}
                iconKey={tile.iconKey}
                title={tile.title}
                description={tile.description}
                metric={tile.metric}
              />
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                63% of inquiries arrive outside fixed staff hours. Live coverage is the difference
                between a lead and a lease.
              </p>
              <Link
                href="/portal-and-technology/"
                className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-5 py-2.5 text-sm font-semibold text-brand-gold transition hover:bg-brand-gold/15"
              >
                See the portal
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 08. EDITORIAL IMAGE BRIDGE — On-site leasing team ──────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/15">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80"
                alt="On-site leasing team coordinating a model suite showing with prospects"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
              />
              <FloatingBadge
                iconKey="Users"
                title="Named leads"
                value="One operator"
                className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl shadow-brand-navy/20 sm:block"
              />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Deployed to your schedule
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                A dedicated leasing team,{' '}
                <span className="font-display italic text-brand-emerald">
                  not a call centre.
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Named coordinators on-site at the sales centre. In-market showings, evening hours,
                multilingual coverage, AI-assisted approval against your criteria. We staff to
                your absorption schedule, not a fixed shift. The asset team gets one accountable
                point of escalation — not a queue.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '7-day touring, evening + weekend cadence',
                  'After-hours response covering 63% of inquiry window',
                  'AI-assisted screening to your criteria',
                  'Single named lead, single escalation path',
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-brand-emerald"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 09. PROJECT TYPES ──────────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Project types
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Built for the assets you{' '}
                <span className="font-display italic text-brand-emerald">build</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Purpose-built rental, condo lease-up, stacked townhomes, build-to-rent SFR —
                whatever you put in the ground, we lease up against your draw schedule.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECT_TYPES.map((p, idx) => (
              <ProjectTypeCard
                key={p.title}
                index={idx}
                title={p.title}
                units={p.units}
                description={p.description}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. CASE STUDY PATTERNS ────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Case patterns
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                What &ldquo;on schedule&rdquo; looks like in{' '}
                <span className="font-display italic text-brand-emerald">numbers</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Three anonymised engagement patterns — the velocity case, the pro-forma defense
                case, and the lender-milestone case.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((c, idx) => (
              <CaseStudyCard
                key={c.badge}
                index={idx}
                badge={c.badge}
                headline={c.headline}
                body={c.body}
                metrics={c.metrics}
                imageSrc={c.imageSrc}
                imageAlt={c.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. COMPLIANCE / CREDENTIALS STRIP ─────────────────────── */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/15">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80"
                  alt="Compliance and legal documentation on a brokerage boardroom table"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
                />
                <FloatingBadge
                  iconKey="ShieldCheck"
                  title="RECO"
                  value="Registered"
                  className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl shadow-brand-navy/20 sm:block"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Compliance and credentials
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Lender-defensible.{' '}
                <span className="font-display italic text-brand-emerald">Regulator-clean.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Deposit collection and lease execution on behalf of an owner are regulated
                activities. We run them as a RECO-registered brokerage with documented trust
                accounting, TRESA-compliant disclosure, and lease revenue support your auditor
                can sign off on.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-brand-navy/10 bg-white px-4 py-3"
                  >
                    <p className="font-display text-lg font-normal text-brand-navy">
                      {c.label}
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      {c.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 12. CLOSING DARK CTA BAND ──────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-navy/92 to-brand-navy/80" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.08] blur-3xl" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
              Bring lease-up risk down to zero internal headcount
            </p>
            <h2 className="mt-4 font-display text-4xl font-normal leading-tight text-white sm:text-5xl md:text-[3.5rem]">
              Talk to an operator who has{' '}
              <span className="font-display italic text-brand-emerald">
                stabilized buildings like yours
              </span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              30-minute lease-up brief. We come back with a draft mobilization plan, an absorption
              target, and a pricing structure aligned to your draw schedule — no obligation.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact/?type=developer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-emerald-900/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Request a Lease-Up Brief
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                See Pricing
              </Link>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/55">
              Or call us directly · <span className="text-white/80">+1 (800) 595-9755</span>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
