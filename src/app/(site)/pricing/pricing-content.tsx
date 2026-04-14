'use client'

import {
  ArrowRight,
  ScrollText,
  Camera,
  Home,
  FileSearch,
  HandCoins,
  CalendarClock,
  PhoneCall,
  ShieldCheck,
  Building2,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { RentCalculator } from '@/components/blocks/rent-calculator'
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
        At a glance &middot; 2026 schedule
      </p>

      <p className="mt-4 font-display text-[3.5rem] italic leading-[0.95] text-brand-navy sm:text-[4.5rem]">
        $<CountUp value={0} />
        <span className="text-brand-gold">.</span>
      </p>
      <p className="mt-2 font-sans text-sm uppercase tracking-[0.18em] text-brand-navy/60">
        Due upfront. No setup, no retainer, no onboarding.
      </p>

      <p className="mt-6 font-display text-[3.5rem] italic leading-[0.95] text-brand-navy sm:text-[4.5rem]">
        One-time
        <span className="text-brand-gold">.</span>
      </p>
      <p className="mt-2 font-sans text-sm uppercase tracking-[0.18em] text-brand-navy/60">
        Leasing success fee &mdash; only when a qualified tenant signs.
      </p>

      {/* Inline fact chips */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/65">
        <span>$<CountUp value={0} /> retainer</span>
        <span aria-hidden="true" className="text-brand-gold">/</span>
        <span>No monthly fee</span>
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
    title: 'Zero upfront. Always.',
    body:
      'You pay nothing to engage MoveSmart. No setup fee. No onboarding fee. No monthly retainer. Photography, syndication, screening, and lease preparation are all carried by us until a tenant is in place. Our economics are aligned with yours from the first conversation - if we don\u2019t place a qualified tenant, we don\u2019t earn a dollar.',
  },
  {
    title: 'A single leasing success fee.',
    body:
      'When a qualified tenant signs a lease we negotiated, you pay a one-time success fee - a fee structure tailored to property type and market, typically equivalent to one month of contracted rent. It is invoiced once, on placement, and is the only fee you owe for the leasing engagement. We are a leasing brokerage, not an ongoing manager: there is no monthly percentage, ever.',
  },
  {
    title: 'And nothing in between.',
    body:
      'No vendor markups. No marketing surcharges. No listing-prep surcharges. No clawbacks. The only optional charges are clearly named add-ons: Rent Protection (priced through our underwriting partner) and paid advertising beyond our standard syndication. Institutional lease-up engagements are quoted per RFP. Everything else is on this page.',
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
            One fee. Earned on
            <span className="font-display italic text-brand-emerald"> results</span>
            <span className="text-brand-gold">.</span>
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
  emphasis?: boolean
}

const FEE_SCHEDULE: FeeRow[] = [
  {
    label: 'Standard leasing success fee',
    detail:
      'Single condo, townhouse, or single-family home. Charged once, on signed lease, to a qualified tenant we placed.',
    value: 'One month rent equivalent',
    emphasis: true,
  },
  {
    label: 'Setup, onboarding, photography, syndication',
    detail: 'Account creation, document collection, professional photos, 40+ portal listing.',
    value: '$0',
    emphasis: true,
  },
  {
    label: 'Monthly retainer or management %',
    detail: 'We are a leasing brokerage. There is no recurring fee.',
    value: 'Not charged',
  },
  {
    label: 'Tenant Replacement Guarantee',
    detail:
      'If a tenant we placed breaks the lease in the first six months, we re-lease at no additional success fee.',
    value: 'Included',
  },
  {
    label: 'Rent Protection (optional add-on)',
    detail:
      'Guaranteed rental income coverage underwritten through our insurance partner. Owner opts in.',
    value: 'Quoted by partner',
  },
  {
    label: 'Paid advertising beyond standard syndication',
    detail:
      'Optional boosted listings, premium portal placements, or targeted social campaigns. Owner pre-approves.',
    value: 'Pass-through at cost',
  },
  {
    label: 'Institutional lease-up (PMC, builder, developer)',
    detail:
      'Multi-unit lease-up programs, project-based engagements, custom service scope.',
    value: 'Custom RFP',
  },
  {
    label: 'Engagement exit',
    detail: 'Either party. No exit fee, no clawback on a placement already earned.',
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
                $<CountUp value={0} />
                <span className="text-brand-gold">.</span>
              </p>
            </RevealOnScroll>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-8">
            <RevealOnScroll variant="slideUp" duration={0.7} delay={0.2}>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-brand-emerald">
                Due upfront. Always.
              </p>
              <p className="mt-3 font-serif text-base leading-[1.7] text-slate-700">
                You pay nothing to engage MoveSmart. The only fee on a standard leasing engagement
                is a one-time success fee, charged when a qualified tenant signs the lease &mdash;
                typically one month rent equivalent.
              </p>
              <a
                href="/contact/?type=owner"
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
                Effective 2026 &middot; CAD
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
                      {row.value}
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
                    {row.value}
                  </p>
                </div>
              ))}
            </RevealOnScroll>
            <div className="border-t-2 border-double border-brand-navy/30" />
          </div>

          <p className="mt-8 max-w-3xl font-serif text-sm italic leading-relaxed text-slate-500">
            Pricing is tailored to property type, location, and engagement scope. Your advisor will
            confirm the exact success fee in writing before any work begins. All fees exclude
            applicable GST/HST.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── "What's included / what's not" transparency table ─────────────────────── */

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
    item: 'Marketing photography & video',
    detail: 'Professional camera, wide-angle lens, edited gallery, optional 3D walkthrough.',
    policy: 'included',
    cost: 'Included in success fee',
  },
  {
    icon: ScrollText,
    item: 'MLS + 40+ portal syndication',
    detail: 'Realtor.ca, Zumper, Zolo, Kijiji, Facebook Marketplace, and our agent network.',
    policy: 'included',
    cost: 'Included in success fee',
  },
  {
    icon: FileSearch,
    item: 'Tenant screening & background',
    detail: 'Credit, employment, income, reference, and prior-tenancy verification.',
    policy: 'included',
    cost: 'Included in success fee',
  },
  {
    icon: PhoneCall,
    item: 'Showings & applicant management',
    detail: 'Coordinated viewings, qualification calls, applicant shortlist with our recommendation.',
    policy: 'included',
    cost: 'Included in success fee',
  },
  {
    icon: HandCoins,
    item: 'Lease drafting & e-signing',
    detail: 'Provincially compliant lease, schedules, addenda, and digital execution.',
    policy: 'included',
    cost: 'Included in success fee',
  },
  {
    icon: Home,
    item: 'Move-in coordination & key handover',
    detail: 'Move-in inspection, condition report, key/fob delivery to tenant.',
    policy: 'included',
    cost: 'Included in success fee',
  },
  {
    icon: ShieldCheck,
    item: 'Rent Protection package',
    detail:
      'Optional guaranteed rental income coverage underwritten through our insurance partner.',
    policy: 'add-on',
    cost: 'Quoted separately by partner',
  },
  {
    icon: CalendarClock,
    item: 'Paid advertising beyond standard',
    detail:
      'Optional boosted listings, premium portal placements, or targeted social campaigns.',
    policy: 'pass-through',
    cost: 'At cost - owner pre-approves',
  },
  {
    icon: Building2,
    item: 'Institutional lease-up engagements',
    detail:
      'Multi-unit programs for property management companies, builders, and developers.',
    policy: 'add-on',
    cost: 'Custom RFP - contact for quote',
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
            &sect; 03 &middot; What the success fee includes
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
            Every leasing service we offer &mdash; in
            <span className="font-display italic text-brand-emerald"> one fee</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-slate-600">
            Most brokerages itemize photography, syndication, and screening as separate line items.
            We don&rsquo;t. The success fee covers all nine pillars of our leasing service. Add-ons
            are clearly labelled and never assumed.
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
            Pass-through, never markup.
          </span>{' '}
          When an owner opts into paid advertising or partner services, the cost is passed through
          at the price the vendor charges us. We do not earn a margin on add-ons.
        </p>
      </div>
    </section>
  )
}

/* ─── Worked examples: three engagement archetypes ──────────────────────────── */

const WORKED_EXAMPLES = [
  {
    tag: 'Engagement A',
    title: 'Single Toronto condo.',
    setup:
      'A two-bedroom condo at $3,200/month. Owner is relocating and needs a qualified tenant before closing on a new property.',
    fee: 'Success fee equivalent to one month rent.',
    timing: 'Invoiced once, on signed lease. Typically deducted from first month\u2019s rent so nothing comes from your bank account.',
    upfront: '$0',
    recurring: 'None. We do not manage the unit after placement unless engaged separately.',
  },
  {
    tag: 'Engagement B',
    title: 'Townhouse portfolio (4 units).',
    setup:
      'An owner with four townhouses across the GTA, three turning over within ninety days. A coordinated lease-up calendar reduces vacancy weeks.',
    fee: 'Per-unit success fee with a portfolio discount applied. Quoted in writing before work begins.',
    timing: 'Each fee invoiced as its corresponding unit is leased - not all upfront.',
    upfront: '$0',
    recurring: 'None.',
  },
  {
    tag: 'Engagement C',
    title: 'Institutional lease-up.',
    setup:
      'A property management company or builder bringing 40+ units to market on a defined absorption schedule. Custom service scope: dedicated agent team, onsite leasing office option, weekly absorption reporting.',
    fee: 'Custom pricing, structured per RFP - commonly a blend of monthly engagement allowance plus per-lease success fee.',
    timing: 'Defined in master services agreement. Not billed against this published schedule.',
    upfront: 'Per RFP',
    recurring: 'Per RFP',
  },
] as const

function WorkedExamples() {
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
            &sect; 04 &middot; Worked examples
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl font-normal leading-[1.05] text-white sm:text-5xl">
            Three engagements. One pricing
            <span className="font-display italic text-brand-emerald"> philosophy</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-white/65">
            How the success-fee model lands across a single condo, a small portfolio, and an
            institutional lease-up program.
          </p>
        </RevealOnScroll>

        <div className="mt-14 border-t-2 border-double border-brand-gold/30" />

        <RevealOnScroll variant="slideUp" stagger={0.12} duration={0.6}>
          {WORKED_EXAMPLES.map((ex) => (
            <div
              key={ex.tag}
              className="grid grid-cols-12 gap-6 border-b border-white/10 py-12 last:border-b-0"
            >
              <div className="col-span-12 sm:col-span-3">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  {ex.tag}
                </p>
                <h3 className="mt-2 font-display text-2xl italic leading-tight text-white sm:text-3xl">
                  {ex.title}
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-9">
                <p className="font-serif text-base leading-[1.7] text-white/80 sm:text-[17px]">
                  {ex.setup}
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                      Fee structure
                    </dt>
                    <dd className="mt-1 font-serif text-sm leading-relaxed text-white/80">
                      {ex.fee}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                      Timing
                    </dt>
                    <dd className="mt-1 font-serif text-sm leading-relaxed text-white/80">
                      {ex.timing}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                      Due upfront
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-white">{ex.upfront}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                      Recurring
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-white">{ex.recurring}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </RevealOnScroll>

        <div className="border-t-2 border-double border-brand-gold/30" />

        <RevealOnScroll variant="scaleIn" duration={0.8} delay={0.1}>
          <p className="mt-10 text-center font-serif text-base italic leading-relaxed text-white/70">
            Every engagement is quoted in writing before work begins. No surprises, no escalators.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ─── Comparison: MoveSmart vs. traditional PM vs. DIY ──────────────────────── */

interface CompareRow {
  label: string
  movesmart: string
  traditional: string
  diy: string
}

const COMPARE_ROWS: CompareRow[] = [
  {
    label: 'Upfront cost',
    movesmart: '$0',
    traditional: 'Setup + onboarding fee common',
    diy: 'Listing fees, screening tools, paid ads',
  },
  {
    label: 'Recurring monthly fee',
    movesmart: 'None - we are a leasing brokerage',
    traditional: 'Percentage of monthly rent, every month',
    diy: 'None, but you carry the ongoing time cost',
  },
  {
    label: 'When you pay',
    movesmart: 'Once, on signed lease',
    traditional: 'Every month for the life of the contract',
    diy: 'On every transaction - plus your hours',
  },
  {
    label: 'Vacancy alignment',
    movesmart: 'We earn nothing until a tenant signs',
    traditional: 'Some plans charge during vacancy',
    diy: 'You absorb the entire vacancy cost',
  },
  {
    label: 'Tenant Replacement Guarantee',
    movesmart: 'Included - first six months',
    traditional: 'Varies by provider',
    diy: 'You start over from scratch',
  },
  {
    label: 'Vendor markup on repairs',
    movesmart: 'Not applicable - we do not manage',
    traditional: 'Often 10-20% markup',
    diy: 'None, but you source every vendor',
  },
  {
    label: 'Cancellation',
    movesmart: '30-day notice. No clawback.',
    traditional: 'Often 60-120 days, with exit fees',
    diy: 'Anytime',
  },
]

function ComparisonTable() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
            &sect; 05 &middot; How we compare
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
            Success-fee leasing vs. monthly management vs.
            <span className="font-display italic text-brand-emerald"> doing it yourself</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-slate-600">
            We are not a property manager. We are a white-glove leasing brokerage. Here is how the
            three options actually compare on cost, alignment, and risk.
          </p>
        </RevealOnScroll>

        {/* Desktop table */}
        <div className="mt-12 hidden border-t-2 border-double border-brand-navy/30 md:block">
          <div className="grid grid-cols-12 gap-4 border-b border-brand-navy/15 py-4">
            <div className="col-span-3 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
              Dimension
            </div>
            <div className="col-span-3 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              MoveSmart leasing brokerage
            </div>
            <div className="col-span-3 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
              Traditional property manager
            </div>
            <div className="col-span-3 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
              Do-it-yourself
            </div>
          </div>

          <RevealOnScroll variant="slideUp" stagger={0.05} duration={0.5}>
            {COMPARE_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-12 items-baseline gap-4 border-b border-brand-navy/10 py-5"
              >
                <p className="col-span-3 font-display text-base font-normal text-brand-navy sm:text-lg">
                  {row.label}
                </p>
                <p className="col-span-3 font-serif text-sm leading-relaxed text-brand-navy">
                  <span className="font-semibold">{row.movesmart}</span>
                </p>
                <p className="col-span-3 font-serif text-sm italic leading-relaxed text-slate-500">
                  {row.traditional}
                </p>
                <p className="col-span-3 font-serif text-sm italic leading-relaxed text-slate-500">
                  {row.diy}
                </p>
              </div>
            ))}
          </RevealOnScroll>
          <div className="border-t-2 border-double border-brand-navy/30" />
        </div>

        {/* Mobile: stacked per row */}
        <div className="mt-12 border-t-2 border-double border-brand-navy/30 md:hidden">
          <RevealOnScroll variant="slideUp" stagger={0.05} duration={0.5}>
            {COMPARE_ROWS.map((row) => (
              <div key={row.label} className="border-b border-brand-navy/10 py-5">
                <p className="font-display text-lg font-normal text-brand-navy">{row.label}</p>
                <dl className="mt-3 space-y-2">
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
                      MoveSmart
                    </dt>
                    <dd className="mt-0.5 font-serif text-sm text-brand-navy">{row.movesmart}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy/55">
                      Traditional PM
                    </dt>
                    <dd className="mt-0.5 font-serif text-sm italic text-slate-500">
                      {row.traditional}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy/55">
                      Do-it-yourself
                    </dt>
                    <dd className="mt-0.5 font-serif text-sm italic text-slate-500">{row.diy}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </RevealOnScroll>
          <div className="border-t-2 border-double border-brand-navy/30" />
        </div>
      </div>
    </section>
  )
}

/* ─── Guarantees: numbered editorial notes (vertical stack, NOT cards) ──────── */

const PRICING_GUARANTEES = [
  {
    title: 'Tenant Replacement Guarantee.',
    body:
      'If a tenant we placed breaks the lease in the first six months, we re-lease the unit at no additional success fee. We carry advertising, screening, and lease prep again. Our economics absorb the cost, not yours.',
  },
  {
    title: 'No-Placement, No-Fee Promise.',
    body:
      'You owe nothing if we fail to place a qualified tenant. There is no kill-fee, no time-and-materials clawback, no minimum spend. Our risk is real and contractual - spelled out in writing before you sign anything.',
  },
  {
    title: 'Transparent Exit.',
    body:
      'Engagements end on 30-day written notice from either party. There is no exit fee, no clawback on a placement already earned, and we hand off all applicant records and signed documents within seven days.',
  },
] as const

function GuaranteesPanel() {
  return (
    <section className="bg-[#FBFAF6] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
            &sect; 06 &middot; Money-back &amp; guarantees
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
            We back the price with the
            <span className="font-display italic text-brand-emerald"> paperwork</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-slate-600">
            Each guarantee is written into the leasing services agreement &mdash; not buried in a
            footer.
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
              &sect; 07 &middot; Owners on our pricing
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal leading-tight text-brand-navy sm:text-4xl">
              No surprise invoices.
              <span className="font-display italic text-brand-emerald"> Ever</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-4 font-serif text-base leading-relaxed text-slate-600">
              What owners say about engaging a success-fee leasing brokerage instead of a
              percentage-based property manager.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ─── Pricing FAQs ──────────────────────────────────────────────────────────── */

const PRICING_FAQS = [
  {
    question: 'Are there setup fees, onboarding fees, or any cost to get started?',
    answer:
      'No. Engaging MoveSmart is free. There is no setup fee, no onboarding fee, no monthly retainer, and no cost for photography, syndication, or screening. The only fee on a standard engagement is a one-time leasing success fee, charged when a qualified tenant signs the lease.',
  },
  {
    question: 'Do you charge a monthly management percentage?',
    answer:
      'No. We are a leasing brokerage, not an ongoing property manager. There is no recurring monthly fee. Once we place a qualified tenant, the engagement is complete unless you specifically engage us for a separate scope.',
  },
  {
    question: 'When exactly do I pay the success fee?',
    answer:
      'The success fee is invoiced after the tenant signs the lease and pays first month\u2019s rent plus deposit. It is typically deducted from that first rent payment so nothing comes out of your bank account.',
  },
  {
    question: 'What is included in the leasing success fee?',
    answer:
      'All nine pillars of our service: professional photography and video, MLS plus 40+ portal syndication, applicant screening (credit, employment, income, references, prior tenancy), coordinated showings, lease drafting and e-signing, move-in coordination, key handover, condition reporting, and the Tenant Replacement Guarantee.',
  },
  {
    question: 'What costs extra?',
    answer:
      'Three things, all optional and clearly named: Rent Protection (guaranteed rental income coverage, quoted by our insurance partner), paid advertising beyond standard syndication (boosted listings or premium portal placements, owner pre-approves), and Institutional Lease-Up engagements for property management companies, builders, or developers, which are scoped per RFP.',
  },
  {
    question: 'What happens if my tenant breaks the lease early?',
    answer:
      'If a tenant we placed breaks the lease within the first six months, we re-lease the property at no additional success fee under our Tenant Replacement Guarantee. We cover advertising, screening, and lease preparation again.',
  },
  {
    question: 'Do you work with builders, developers, or property management companies?',
    answer:
      'Yes. Institutional lease-up engagements are scoped per RFP - commonly a blend of monthly engagement allowance plus per-lease success fee, with custom service scope (dedicated agent team, onsite leasing office option, weekly absorption reporting). Contact us for an institutional quote.',
  },
  {
    question: 'What are the cancellation terms?',
    answer:
      'Either party can cancel with 30 days\u2019 written notice. There is no exit fee, and no clawback on a placement already earned. We hand off all applicant records and signed documents within seven days.',
  },
  {
    question: 'Is GST/HST included in the fees shown?',
    answer:
      'No. All fees on this page are quoted before tax. Applicable GST/HST is added to your invoice and itemized separately so your accountant can claim input tax credits where eligible.',
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
        eyebrow="Zero Upfront. Success-Fee Leasing."
        headline="Pay Nothing Until We Place a Tenant."
        lede="MoveSmart is a white-glove leasing brokerage. There is no setup fee, no monthly retainer, no management percentage. You pay a single one-time success fee - typically equivalent to one month of rent - only when a qualified tenant signs the lease."
        cta1={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
        cta2={{ label: 'Book a Call', href: '/contact/?type=owner&intent=call' }}
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

      {/* 6. Worked examples - three engagement archetypes */}
      <WorkedExamples />

      {/* 7. Comparison table - MoveSmart vs. PM vs. DIY */}
      <ComparisonTable />

      {/* 8. Money-back & guarantees - vertical numbered notes */}
      <GuaranteesPanel />

      {/* 9. Testimonials */}
      <PricingTestimonials />

      {/* 10. FAQ */}
      <FAQBlock questions={PRICING_FAQS} title={'Pricing & Fees - Frequently Asked'} />

      {/* 11. CTA Banner - pricing-specific */}
      <CTABannerBlock
        headline="Get a written success-fee quote before you commit."
        description={'Open a free account and we\u2019ll send a no-fee placement quote tailored to your address - typically back to you within one business day.'}
        primaryCta={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/?type=owner&intent=call' }}
      />
    </main>
  )
}
