'use client'

import {
  ArrowRight,
  ScrollText,
  Camera,
  Hammer,
  Home,
  FileSearch,
  Receipt,
  HandCoins,
  CalendarClock,
  PhoneCall,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { RentCalculator } from '@/components/blocks/rent-calculator'
import { TestimonialsSection } from '@/components/blocks/testimonials-section'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'

/* ─── Hero aside: "At a glance" typographic block (no card) ─────────────────── */

function HeroAtAGlance() {
  return (
    <div className="relative pl-6 lg:pl-8">
      {/* Vertical gold rule */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-brand-gold/70 via-brand-gold/30 to-transparent"
      />

      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
        At a glance · 2026 schedule
      </p>

      <p className="mt-4 font-display text-[3.5rem] italic leading-[0.95] text-brand-navy sm:text-[4.5rem]">
        One month
        <span className="text-brand-gold">.</span>
      </p>
      <p className="mt-2 font-sans text-sm uppercase tracking-[0.18em] text-brand-navy/60">
        Tenant placement &mdash; charged once, on signed lease.
      </p>

      <p className="mt-6 font-display text-[3.5rem] italic leading-[0.95] text-brand-navy sm:text-[4.5rem]">
        <CountUp value={8} suffix="%" />
        <span className="text-brand-gold">.</span>
      </p>
      <p className="mt-2 font-sans text-sm uppercase tracking-[0.18em] text-brand-navy/60">
        Of rent collected &mdash; only on months we actually collect.
      </p>

      {/* Inline fact chips */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/65">
        <span>$<CountUp value={0} /> setup</span>
        <span aria-hidden="true" className="text-brand-gold">/</span>
        <span><CountUp value={30} />-day cancel</span>
        <span aria-hidden="true" className="text-brand-gold">/</span>
        <span><CountUp value={0} /> hidden</span>
      </div>

      <a
        href="#fee-schedule"
        className="mt-7 inline-flex items-center gap-2 border-b border-brand-emerald/40 pb-1 font-sans text-sm font-semibold text-brand-emerald transition-colors hover:border-brand-emerald hover:text-brand-navy"
      >
        Read the full fee schedule
        <ArrowRight className="size-4" strokeWidth={2.25} />
      </a>
    </div>
  )
}

/* ─── How we charge: 3 numbered editorial paragraphs ────────────────────────── */

const HOW_WE_CHARGE = [
  {
    title: 'The leasing fee.',
    body:
      'A one-time fee equal to one month\u2019s rent, paid only after a qualified tenant signs the lease. It covers marketing, showings, screening, and lease preparation. If we don\u2019t place a tenant, we don\u2019t earn the fee. There is no upfront retainer, no listing surcharge, and no advertising line item billed separately.',
  },
  {
    title: 'The management fee.',
    body:
      'A flat eight percent of monthly rent collected \u2014 only on months we actually collect. If the unit sits vacant, we don\u2019t earn a management fee. Period. It is netted from the rent we collect each month and the remainder is deposited to your account along with a statement that itemizes every line.',
  },
  {
    title: 'And nothing in between.',
    body:
      'Zero onboarding fee, zero marketing surcharge, zero vendor markups. Repairs are billed at cost with the original contractor invoice attached to your statement. You see what we see. If a line item isn\u2019t printed on this page, it doesn\u2019t exist on your invoice.',
  },
] as const

function HowWeCharge() {
  return (
    <section className="bg-[#FBFAF6] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
            &sect; 01 &middot; How we charge
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
            Two fees. Both earned.
            <span className="font-display italic text-brand-emerald"> Nothing</span>
            <span className="text-brand-gold">.</span> in between.
          </h2>
        </RevealOnScroll>

        {/* Double-rule top */}
        <div className="mt-12 border-t-2 border-double border-brand-navy/25" />

        <RevealOnScroll variant="slideUp" stagger={0.12} duration={0.6}>
          {HOW_WE_CHARGE.map((para, i) => (
            <div
              key={para.title}
              className="grid grid-cols-12 gap-6 border-b border-brand-navy/10 py-10 last:border-b-0"
            >
              <div className="col-span-12 sm:col-span-2">
                <span className="font-display text-5xl italic leading-none text-brand-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="col-span-12 sm:col-span-10">
                <h3 className="font-display text-2xl font-normal leading-tight text-brand-navy sm:text-3xl">
                  {para.title}
                </h3>
                <p className="mt-3 max-w-2xl font-serif text-base leading-[1.7] text-slate-700 sm:text-[17px]">
                  {para.body}
                </p>
              </div>
            </div>
          ))}
        </RevealOnScroll>

        {/* Double-rule bottom */}
        <div className="border-t-2 border-double border-brand-navy/25" />
      </div>
    </section>
  )
}

/* ─── Big price statement + magazine fee schedule table ─────────────────────── */

interface FeeRow {
  label: string
  detail?: string
  value: string
  numeric?: { value: number; prefix?: string; suffix?: string }
  emphasis?: boolean
}

const FEE_SCHEDULE: FeeRow[] = [
  {
    label: 'Tenant placement fee',
    detail: 'Marketing, showings, screening, lease preparation.',
    value: 'One month\u2019s rent',
    emphasis: true,
  },
  {
    label: 'Monthly management',
    detail: 'On months we actually collect rent.',
    value: '8%',
    numeric: { value: 8, suffix: '%' },
    emphasis: true,
  },
  {
    label: 'Premium portfolio (multi-unit)',
    detail: 'Adds dedicated account manager, rent guarantee, 24/7 line.',
    value: '10%',
    numeric: { value: 10, suffix: '%' },
  },
  {
    label: 'Setup & onboarding',
    detail: 'Account creation, document collection, first listing.',
    value: '$0',
    numeric: { value: 0, prefix: '$' },
  },
  {
    label: 'Marketing & photography',
    detail: 'Professional photos, MLS, 40+ portal syndication.',
    value: '$0',
    numeric: { value: 0, prefix: '$' },
  },
  {
    label: 'Vacant-month management',
    detail: 'No rent collected = no fee charged. Period.',
    value: '$0',
    numeric: { value: 0, prefix: '$' },
  },
  {
    label: 'Cancellation',
    detail: 'Either party. No exit fee, no clawback.',
    value: '30-day notice',
  },
]

function HeadlinePriceStatement() {
  return (
    <section id="fee-schedule" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.6}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
            &sect; 02 &middot; The fee schedule
          </p>
        </RevealOnScroll>

        {/* Headline price moment - enormous typography */}
        <div className="mt-6 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 lg:col-span-8">
            <RevealOnScroll variant="scaleIn" duration={0.8}>
              <p className="font-display font-normal leading-[0.85] text-brand-navy text-[5rem] sm:text-[8rem] lg:text-[12rem] xl:text-[14rem]">
                <CountUp value={8} suffix="%" />
                <span className="text-brand-gold">.</span>
              </p>
            </RevealOnScroll>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-8">
            <RevealOnScroll variant="slideUp" duration={0.7} delay={0.2}>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-brand-emerald">
                Of monthly rent collected
              </p>
              <p className="mt-3 font-serif text-base leading-[1.7] text-slate-700">
                The flat management fee on our Full-Service plan. We earn it the same way you do
                &mdash; only on months the property is producing income.
              </p>
              <a
                href="/contact/"
                className="mt-5 inline-flex items-center gap-2 border-b border-brand-emerald/40 pb-1 font-sans text-sm font-semibold text-brand-emerald transition-colors hover:border-brand-emerald hover:text-brand-navy"
              >
                Get a free rental analysis
                <ArrowRight className="size-4" strokeWidth={2.25} />
              </a>
            </RevealOnScroll>
          </div>
        </div>

        {/* Magazine fee schedule - restaurant menu with dotted leaders */}
        <div className="mt-20">
          <RevealOnScroll variant="slideUp" duration={0.6}>
            <div className="flex items-baseline justify-between border-b border-brand-navy/15 pb-3">
              <p className="font-display text-2xl italic text-brand-navy">
                Full schedule of fees
              </p>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
                Effective 2026 &middot; CAD / USD
              </p>
            </div>
          </RevealOnScroll>

          {/* Desktop/tablet: proper table with double rules */}
          <div className="hidden border-t-2 border-double border-brand-navy/30 sm:block">
            <RevealOnScroll variant="slideUp" stagger={0.06} duration={0.5}>
              {FEE_SCHEDULE.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-12 items-baseline gap-4 border-b border-brand-navy/10 py-6"
                >
                  <div className="col-span-7">
                    <p
                      className={
                        row.emphasis
                          ? 'font-display text-xl font-normal text-brand-navy sm:text-2xl'
                          : 'font-display text-lg font-normal text-brand-navy sm:text-xl'
                      }
                    >
                      {row.label}
                    </p>
                    {row.detail && (
                      <p className="mt-1 font-serif text-sm italic leading-relaxed text-slate-500">
                        {row.detail}
                      </p>
                    )}
                  </div>
                  {/* Dotted leader */}
                  <div
                    aria-hidden="true"
                    className="col-span-2 self-end overflow-hidden whitespace-nowrap pb-2 text-brand-navy/30"
                    style={{ letterSpacing: '0.25em' }}
                  >
                    ............................................
                  </div>
                  <div className="col-span-3 text-right">
                    <p
                      className={
                        row.emphasis
                          ? 'font-display text-2xl font-normal text-brand-navy sm:text-3xl'
                          : 'font-display text-xl font-normal text-brand-navy sm:text-2xl'
                      }
                    >
                      {row.numeric ? (
                        <CountUp
                          value={row.numeric.value}
                          prefix={row.numeric.prefix}
                          suffix={row.numeric.suffix}
                        />
                      ) : (
                        row.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </RevealOnScroll>
            <div className="border-t-2 border-double border-brand-navy/30" />
          </div>

          {/* Mobile: stacked label-above-value */}
          <div className="border-t-2 border-double border-brand-navy/30 sm:hidden">
            <RevealOnScroll variant="slideUp" stagger={0.06} duration={0.5}>
              {FEE_SCHEDULE.map((row) => (
                <div key={row.label} className="border-b border-brand-navy/10 py-5">
                  <p className="font-display text-lg font-normal text-brand-navy">{row.label}</p>
                  {row.detail && (
                    <p className="mt-1 font-serif text-sm italic leading-relaxed text-slate-500">
                      {row.detail}
                    </p>
                  )}
                  <p className="mt-2 font-display text-2xl font-normal text-brand-navy">
                    {row.numeric ? (
                      <CountUp
                        value={row.numeric.value}
                        prefix={row.numeric.prefix}
                        suffix={row.numeric.suffix}
                      />
                    ) : (
                      row.value
                    )}
                  </p>
                </div>
              ))}
            </RevealOnScroll>
            <div className="border-t-2 border-double border-brand-navy/30" />
          </div>

          <p className="mt-8 max-w-3xl font-serif text-sm italic leading-relaxed text-slate-500">
            Fees shown apply across Ontario, BC, Alberta and most US states we serve. Quebec and a
            handful of US municipalities have small regional adjustments &mdash; your advisor will
            quote those upfront. All fees exclude applicable GST/HST/PST.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── "What's NOT included" transparency table ──────────────────────────────── */

type Policy = 'included' | 'pass-through' | 'add-on' | 'not-charged'

const TRANSPARENCY_ROWS: Array<{
  icon: typeof Camera
  item: string
  detail: string
  policy: Policy
  cost: string
}> = [
  {
    icon: Camera,
    item: 'Marketing photography',
    detail: 'Professional camera, wide-angle lens, edited gallery.',
    policy: 'included',
    cost: 'Included in leasing fee',
  },
  {
    icon: PhoneCall,
    item: 'Late-rent collection calls',
    detail: 'Outreach, payment plans, and demand letters when rent is late.',
    policy: 'included',
    cost: 'Included in management fee',
  },
  {
    icon: ScrollText,
    item: 'Eviction filing & paperwork',
    detail: 'LTB / equivalent tribunal filings and tenant correspondence.',
    policy: 'add-on',
    cost: '$350 flat (Premium plan: free)',
  },
  {
    icon: FileSearch,
    item: 'Mid-lease inspection',
    detail: 'In-person walkthrough with photo report sent to owner.',
    policy: 'included',
    cost: 'One per year on Full-Service & Premium',
  },
  {
    icon: Hammer,
    item: 'Maintenance & repairs',
    detail: 'Plumbers, electricians, handymen, contractors.',
    policy: 'pass-through',
    cost: 'At vendor cost \u2014 invoice attached, no markup',
  },
  {
    icon: Receipt,
    item: 'Year-end tax statement',
    detail: 'Itemized income & expense report for your accountant.',
    policy: 'included',
    cost: 'Included on Full-Service & Premium',
  },
  {
    icon: Home,
    item: 'Property prep / turnover',
    detail: 'Cleaning, paint touch-ups, minor staging between tenants.',
    policy: 'pass-through',
    cost: 'At vendor cost (typical: $150\u2013$600)',
  },
  {
    icon: HandCoins,
    item: 'Lease renewal',
    detail: 'Renewal negotiation, drafting, and execution.',
    policy: 'not-charged',
    cost: 'No fee \u2014 we want long tenancies',
  },
  {
    icon: CalendarClock,
    item: 'Vacant-month management fee',
    detail: 'What we charge while the unit is empty.',
    policy: 'not-charged',
    cost: 'Nothing. No rent, no fee.',
  },
]

function PolicyChip({ policy }: { policy: Policy }) {
  const map: Record<Policy, { label: string; color: string }> = {
    included: { label: 'Included', color: '#047857' },
    'pass-through': { label: 'Pass-through', color: '#92400E' },
    'add-on': { label: 'Optional add-on', color: '#3730A3' },
    'not-charged': { label: 'Not charged', color: '#065F46' },
  }
  const c = map[policy]
  return (
    <span
      className="inline-block whitespace-nowrap font-sans text-[10px] font-bold uppercase tracking-[0.18em]"
      style={{ color: c.color }}
    >
      [ {c.label} ]
    </span>
  )
}

function TransparencyTable() {
  return (
    <section className="bg-[#FBFAF6] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
            &sect; 03 &middot; The fine print, on the front page
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
            What&rsquo;s <span className="italic">NOT</span> in the headline fee &mdash; and what it
            <span className="font-display italic text-brand-emerald"> costs</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-slate-600">
            Most property managers hide these as add-ons. We list them here, before you sign anything.
            If a line item isn&rsquo;t on this page, it doesn&rsquo;t exist on your invoice.
          </p>
        </RevealOnScroll>

        {/* Desktop wide table with double-rule top/bottom */}
        <div className="mt-12 hidden border-t-2 border-double border-brand-navy/30 md:block">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 border-b border-brand-navy/15 py-3">
            <div className="col-span-6 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
              Line item
            </div>
            <div className="col-span-6 text-right font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
              Cost to you &middot; policy tag
            </div>
          </div>

          <RevealOnScroll variant="slideUp" stagger={0.06} duration={0.5}>
            {TRANSPARENCY_ROWS.map((row) => (
              <div
                key={row.item}
                className="grid grid-cols-12 items-baseline gap-4 border-b border-brand-navy/10 py-5"
              >
                <div className="col-span-6">
                  <p className="font-display text-lg font-normal text-brand-navy">{row.item}</p>
                  <p className="mt-1 font-serif text-sm italic leading-relaxed text-slate-500">
                    {row.detail}
                  </p>
                </div>
                <div className="col-span-6 text-right">
                  <p className="font-display text-base font-normal text-brand-navy">
                    {row.cost}
                  </p>
                  <p className="mt-1">
                    <PolicyChip policy={row.policy} />
                  </p>
                </div>
              </div>
            ))}
          </RevealOnScroll>
          <div className="border-t-2 border-double border-brand-navy/30" />
        </div>

        {/* Mobile: stacked rows, label above value */}
        <div className="mt-12 border-t-2 border-double border-brand-navy/30 md:hidden">
          <RevealOnScroll variant="slideUp" stagger={0.06} duration={0.5}>
            {TRANSPARENCY_ROWS.map((row) => (
              <div key={row.item} className="border-b border-brand-navy/10 py-5">
                <p className="font-display text-lg font-normal text-brand-navy">{row.item}</p>
                <p className="mt-1 font-serif text-sm italic leading-relaxed text-slate-500">
                  {row.detail}
                </p>
                <p className="mt-3 font-display text-base font-normal text-brand-navy">
                  {row.cost}
                </p>
                <p className="mt-1">
                  <PolicyChip policy={row.policy} />
                </p>
              </div>
            ))}
          </RevealOnScroll>
          <div className="border-t-2 border-double border-brand-navy/30" />
        </div>

        <p className="mt-8 max-w-3xl font-serif text-sm italic leading-relaxed text-slate-500">
          <span className="font-semibold not-italic text-brand-navy">
            Vendor pass-through, never markup.
          </span>{' '}
          Every contractor invoice is attached to your monthly statement at the price the contractor
          charged us. No hidden margin.
        </p>
      </div>
    </section>
  )
}

/* ─── Annual cost worked example: two-column ledger ─────────────────────────── */

function AnnualScenario() {
  // Scenario: $2,800/mo Toronto condo, 12-month lease, Full-Service plan
  const monthlyRent = 2800
  const leasingFee = monthlyRent
  const monthlyMgmt = Math.round(monthlyRent * 0.08)
  const annualMgmt = monthlyMgmt * 12
  const movesmartTotal = leasingFee + annualMgmt
  const annualGross = monthlyRent * 12
  const movesmartAllIn = movesmartTotal + 1400

  const movesmart = [
    { label: 'Leasing fee (one-time)', value: leasingFee },
    { label: 'Monthly management (8% × 12)', value: annualMgmt },
    { label: 'Setup, marketing, photography', value: 0 },
    { label: 'Vacancy carrying cost (2-week avg)', value: 1400 },
  ]

  const diy = [
    { label: 'Vacancy: avg 6 weeks vs our 2 weeks', value: 2800 },
    { label: 'Listing & screening services (Naborly + Buildium)', value: 480 },
    { label: 'Owner time: 80 hrs/yr at $50/hr', value: 4000 },
    { label: 'Eviction risk reserve (3% of annual rent)', value: 1008 },
    { label: 'One emergency vendor markup (no network)', value: 350 },
  ]
  const diyTotal = diy.reduce((s, x) => s + x.value, 0)
  const netSaved = diyTotal - movesmartAllIn

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #0B1D3A 0%, #0a1a33 100%)' }}
    >
      {/* Gold hairlines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
            &sect; 04 &middot; Worked example
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl font-normal leading-[1.05] text-white sm:text-5xl">
            One year, $<CountUp value={2800} />/mo Toronto
            <span className="font-display italic text-brand-emerald"> condo</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-white/65">
            What it actually costs to put us on a property for twelve months &mdash; versus what it
            actually costs to do it yourself. Real numbers, no marketing math.
          </p>
        </RevealOnScroll>

        {/* Two-column ledger */}
        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
          {/* MoveSmart column */}
          <div>
            <RevealOnScroll variant="slideUp" duration={0.6}>
              <div className="flex items-baseline justify-between border-b-2 border-double border-brand-emerald/40 pb-3">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                  With MoveSmart &middot; Full-Service
                </p>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  CAD
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="slideUp" stagger={0.06} duration={0.5}>
              {movesmart.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-12 items-baseline gap-3 border-b border-white/10 py-4"
                >
                  <p className="col-span-8 font-serif text-sm leading-snug text-white/75">
                    {row.label}
                  </p>
                  <p className="col-span-4 text-right font-display text-lg text-white">
                    $<CountUp value={row.value} />
                  </p>
                </div>
              ))}
            </RevealOnScroll>

            <RevealOnScroll variant="slideUp" duration={0.6} delay={0.3}>
              <div className="grid grid-cols-12 items-baseline gap-3 border-t-2 border-double border-brand-emerald/50 pt-4">
                <p className="col-span-7 font-display text-lg font-bold text-white sm:text-xl">
                  All-in annual cost
                </p>
                <p className="col-span-5 text-right font-display text-3xl text-brand-emerald sm:text-4xl">
                  $<CountUp value={movesmartAllIn} />
                </p>
              </div>
              <p className="mt-3 font-serif text-xs italic leading-relaxed text-white/55">
                Includes screening, lease, rent collection, year-end statement, mid-lease inspection,
                and a real human answering the phone. Roughly{' '}
                <CountUp value={Number(((movesmartTotal / annualGross) * 100).toFixed(1))} suffix="%" />{' '}
                of your $<CountUp value={annualGross} /> annual rent. Industry average is 12&ndash;18%.
              </p>
            </RevealOnScroll>
          </div>

          {/* DIY column */}
          <div>
            <RevealOnScroll variant="slideUp" duration={0.6}>
              <div className="flex items-baseline justify-between border-b-2 border-double border-brand-gold/40 pb-3">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Doing it yourself &middot; hidden costs
                </p>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  CAD
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="slideUp" stagger={0.06} duration={0.5}>
              {diy.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-12 items-baseline gap-3 border-b border-white/10 py-4"
                >
                  <p className="col-span-8 font-serif text-sm leading-snug text-white/75">
                    {row.label}
                  </p>
                  <p className="col-span-4 text-right font-display text-lg text-white">
                    $<CountUp value={row.value} />
                  </p>
                </div>
              ))}
            </RevealOnScroll>

            <RevealOnScroll variant="slideUp" duration={0.6} delay={0.3}>
              <div className="grid grid-cols-12 items-baseline gap-3 border-t-2 border-double border-brand-gold/50 pt-4">
                <p className="col-span-7 font-display text-lg font-bold text-white sm:text-xl">
                  Real cost of DIY
                </p>
                <p className="col-span-5 text-right font-display text-3xl text-brand-gold sm:text-4xl">
                  $<CountUp value={diyTotal} />
                </p>
              </div>
              <p className="mt-3 font-serif text-xs italic leading-relaxed text-white/55">
                Estimates based on Ontario averages: CMHC vacancy data, CRA hourly time-value, tenant
                insurance industry eviction reserves, and Naborly/Buildium list pricing.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Net difference - typographic line, no card */}
        <RevealOnScroll variant="scaleIn" duration={0.8} delay={0.2}>
          <div className="mt-16 border-y-2 border-double border-brand-gold/40 py-8 text-center">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">
              Net difference in your favour
            </p>
            <p className="mt-3 font-display text-5xl font-normal italic text-white sm:text-7xl">
              $<CountUp value={netSaved} />
              <span className="text-brand-gold">.</span>
            </p>
            <p className="mt-3 font-serif text-base italic text-white/70">
              And your weekends back.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ─── Guarantees: numbered editorial notes (vertical stack, NOT cards) ──────── */

const PRICING_GUARANTEES = [
  {
    title: 'Tenant Replacement.',
    body:
      'If a tenant we placed breaks their lease in the first six months, we re-lease the unit at no cost to you. We cover advertising, screening, and lease prep again \u2014 the new leasing fee is waived. You only pay the management fee on rent we actually collect during the gap.',
  },
  {
    title: 'Rent Protection (Premium).',
    body:
      'On the Premium plan, if a screened tenant misses rent, we cover the payment while the matter is resolved through the tribunal or collections process. Up to six months of cover, deposited into your account on schedule, so your cash flow doesn\u2019t pause while the legal process unfolds.',
  },
  {
    title: 'Satisfaction & Exit.',
    body:
      'Thirty-day notice cancellation, no exit fee, no clawback of paid management. If we don\u2019t earn the next month, you don\u2019t owe one. We hand off all tenant records, leases, and security deposits within seven days of cancellation.',
  },
] as const

function GuaranteesPanel() {
  return (
    <section className="bg-[#FBFAF6] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
            &sect; 05 &middot; Money-back &amp; guarantees
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
            We back the price with the
            <span className="font-display italic text-brand-emerald"> paperwork</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-slate-600">
            Each guarantee is written into the management agreement &mdash; not buried in a footer.
          </p>
        </RevealOnScroll>

        <div className="mt-14 border-t-2 border-double border-brand-navy/25" />

        <RevealOnScroll variant="blur" stagger={0.18} duration={0.7}>
          {PRICING_GUARANTEES.map((g, i) => (
            <div
              key={g.title}
              className="grid grid-cols-12 gap-6 border-b border-brand-navy/10 py-12 last:border-b-0"
            >
              <div className="col-span-12 sm:col-span-3">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
                  Note
                </p>
                <p className="mt-1 font-display text-6xl italic leading-none text-brand-gold sm:text-7xl">
                  {String(i + 1).padStart(2, '0')}
                </p>
              </div>
              <div className="col-span-12 sm:col-span-9">
                <h3 className="font-display text-2xl font-normal leading-tight text-brand-navy sm:text-3xl">
                  {g.title}
                </h3>
                <p className="mt-4 max-w-2xl font-serif text-base leading-[1.75] text-slate-700 sm:text-[17px]">
                  {g.body}
                </p>
              </div>
            </div>
          ))}
        </RevealOnScroll>

        <div className="border-t-2 border-double border-brand-navy/25" />
      </div>
    </section>
  )
}

/* ─── Pricing-fairness testimonials wrapper ─────────────────────────────────── */

function PricingTestimonials() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.6}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
              &sect; 06 &middot; Owners on our pricing
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal leading-tight text-brand-navy sm:text-4xl">
              No surprise invoices.
              <span className="font-display italic text-brand-emerald"> Ever</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-4 font-serif text-base leading-relaxed text-slate-600">
              What owners say after their first twelve months on a MoveSmart agreement.
            </p>
          </div>
        </RevealOnScroll>
        <TestimonialsSection />
      </div>
    </section>
  )
}

/* ─── Pricing FAQs ──────────────────────────────────────────────────────────── */

const PRICING_FAQS = [
  {
    question: 'Are there setup fees, onboarding fees, or marketing fees?',
    answer:
      'No. Setup, onboarding, photography, MLS syndication, and portal advertising are all included in the leasing fee. You pay nothing before a tenant signs.',
  },
  {
    question: 'When exactly do I pay the leasing fee?',
    answer:
      'The leasing fee is invoiced after the tenant has signed the lease and paid first month\u2019s rent and deposit. It is typically deducted from that first rent payment so nothing comes out of your pocket.',
  },
  {
    question: 'What happens if my tenant breaks the lease early?',
    answer:
      'If a tenant we placed breaks the lease within the first six months, we re-lease the property at no additional leasing fee. We cover advertising, screening and lease prep again \u2014 you only pay the management fee on rent we actually collect.',
  },
  {
    question: 'Are repair vendors and contractors marked up?',
    answer:
      'No. Every contractor invoice is passed through at the price our vendor charges us, with the original invoice attached to your monthly statement. We do not earn any margin on repairs, turnover work, or emergency callouts.',
  },
  {
    question: 'Is the management fee deducted automatically from rent?',
    answer:
      'Yes. The 8% (Full-Service) or 10% (Premium) management fee is netted from the rent we collect each month, and the remainder is deposited into your account along with a statement showing every line item.',
  },
  {
    question: 'Do you charge a management fee during vacant months?',
    answer:
      'No. The management fee is a percentage of rent collected. If we don\u2019t collect rent that month, you don\u2019t pay management. We only earn when you do.',
  },
  {
    question: 'What are the cancellation terms?',
    answer:
      'Either party can cancel with 30 days\u2019 written notice. There is no exit fee, no clawback of past management fees, and we hand off all tenant records, leases, and security deposits within seven days.',
  },
  {
    question: 'Is GST/HST/PST included in the fees shown?',
    answer:
      'No. All fees on this page are quoted before tax. Applicable GST/HST (Canada) or state/local taxes (US) are added to your monthly statement and are itemized separately so your accountant can claim them as input tax credits where eligible.',
  },
]

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

      {/* 1. Hero - editorial PageHeroBlock with typographic aside */}
      <PageHeroBlock
        kicker="Pricing"
        eyebrow="Transparent. Performance-Based."
        headline="Pay Nothing Until We Lease It."
        lede="Two fees, both earned. A one-time leasing fee when a qualified tenant signs, and a flat percentage of monthly rent we actually collect. No setup fee, no marketing surcharge, no vendor markups, and no charge for vacant months."
        cta1={{ label: 'Get Free Rental Analysis', href: '/contact/' }}
        cta2={{ label: 'Talk to an Advisor', href: '/contact/' }}
        meta={[
          { label: 'Setup fee', value: '$0' },
          { label: 'Cancel anytime', value: '30 days' },
          { label: 'Hidden fees', value: 'None' },
          { label: 'Lease guarantee', value: '6 months' },
        ]}
        aside={<HeroAtAGlance />}
      />

      {/* 2. How we charge - numbered editorial paragraphs */}
      <HowWeCharge />

      {/* 3. Headline price + magazine fee schedule */}
      <HeadlinePriceStatement />

      {/* 4. Transparency table */}
      <TransparencyTable />

      {/* 5. Rent calculator (existing component) */}
      <RentCalculator />

      {/* 6. Annual cost worked scenario - two-column ledger */}
      <AnnualScenario />

      {/* 7. Money-back & guarantees - vertical numbered notes */}
      <GuaranteesPanel />

      {/* 8. Testimonials */}
      <PricingTestimonials />

      {/* 9. FAQ */}
      <FAQBlock questions={PRICING_FAQS} title={'Pricing & Fees \u2014 Frequently Asked'} />

      {/* 10. CTA Banner - pricing-specific */}
      <CTABannerBlock
        headline="See your number before you sign anything."
        description={'Get a free rental analysis with a no-fee placement quote for your address \u2014 typically back to you within one business day.'}
        primaryCta={{ label: 'Get My Free Quote', href: '/contact/' }}
        secondaryCta={{ label: 'Speak to an Advisor', href: '/contact/' }}
      />
    </main>
  )
}
