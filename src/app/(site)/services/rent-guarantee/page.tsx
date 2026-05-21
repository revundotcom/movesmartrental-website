import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ShieldCheck } from 'lucide-react'

import { FAQBlock } from '@/components/blocks/faq-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { getServiceContent } from '@/data/services-content'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

import {
  ComparisonColumn,
  CoverageCard,
  PolicyCard,
  ProtectionAccordion,
  RevealUp,
  ShieldWatermark,
} from './rent-guarantee-client'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('rent-guarantee')!
  return generatePageMetadata({
    path: '/services/rent-guarantee/',
    fallbackTitle: `${content.title} | MoveSmart Rentals`,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Photo set — verified working Unsplash IDs (per page brief).
// ---------------------------------------------------------------------------

const PHOTO = {
  heroSigning: {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'Landlord signing a rent guarantee protection agreement',
  },
  money: {
    id: 'photo-1565514020179-026b92b84bb6',
    alt: 'Roll of Canadian currency representing protected rent income',
  },
  interior: {
    id: 'photo-1502672260266-1c1ef2d93688',
    alt: 'Calm, occupied rental unit interior',
  },
  handshake: {
    id: 'photo-1521791136064-7986c2920216',
    alt: 'Handshake between landlord and leasing coordinator',
  },
  family: {
    id: 'photo-1564013799919-ab600027ffc6',
    alt: 'Family home representing stable, paying tenancy',
  },
  team: {
    id: 'photo-1556761175-5973dc0f32e7',
    alt: 'MoveSmart team coordinating a rent guarantee claim',
  },
} as const

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

// ---------------------------------------------------------------------------
// Static page-specific data (coverage cards, comparison rows, accordion days).
// ---------------------------------------------------------------------------

const COVERAGE_CARDS = [
  {
    iconKey: 'ShieldCheck',
    metric: 'Up to 6 mo',
    title: 'Lost-rent coverage',
    body: 'Most partner policies cover continued rent during a tenant default up to a defined monthly cap and total months threshold — so a stalled LTB file does not stall your mortgage.',
  },
  {
    iconKey: 'Scale',
    metric: 'Legal',
    title: 'LTB-process costs',
    body: 'Eligible legal fees tied to filing and prosecuting a non-payment file at the Landlord and Tenant Board are covered under most policy options.',
  },
  {
    iconKey: 'BadgeCheck',
    metric: '100%',
    title: 'Vetted underwriting',
    body: 'Every applicant is mapped against partner underwriting before you bind. No surprise denials, no policies that quietly fail to pay.',
  },
] as const

const POLICY_CHIPS = [
  {
    iconKey: 'Wallet',
    metric: 'Rent paid',
    label: 'Income continuity',
    body: 'Continued cash flow during default, up to policy caps.',
  },
  {
    iconKey: 'CalendarClock',
    metric: '12 months',
    label: 'Standard term',
    body: 'Annual policy aligned with the lease term and renewal.',
  },
  {
    iconKey: 'FileSignature',
    metric: 'Bound on signing',
    label: 'Lease-aligned',
    body: 'Policy issued the same day the lease is executed.',
  },
] as const

// "Day X" annotation per how-it-works step (display-only).
const DAY_LABELS = [
  'Day 0 · Screening',
  'Day 1 · Underwriting map',
  'Day 2 · Options review',
  'Day 3 · Lease alignment',
  'Day 4 · Policy bound',
  'On default · Claim support',
]

const WITHOUT_ITEMS = [
  'Six-to-nine months of lost rent during an LTB non-payment file',
  'Legal fees for filing, prosecuting, and enforcing the eviction',
  'Mortgage payments still due on a unit producing zero income',
  'Self-insuring with no defined coverage caps or claim mechanics',
  'No lease alignment — gaps that void any coverage you do carry',
]

const WITH_ITEMS = [
  'Partner-underwritten coverage for continued rent during default',
  'Eligible legal costs of the LTB process included in most policies',
  'Lease, riders, and notices pre-aligned to policy requirements',
  'Tenant insurance enforced and filed in your owner portal',
  'Claim file assembled by MoveSmart, assessed by the licensed insurer',
]

const TRUST_STATS = [
  { metric: '24-72 hr', label: 'Eligibility map turnaround' },
  { metric: 'Licensed', label: 'Canadian insurance partners' },
  { metric: '$0', label: 'MoveSmart coordination fee when bundled' },
  { metric: 'On lease', label: 'Policy bound at signing, not after' },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function RentGuaranteePage() {
  const content = getServiceContent('rent-guarantee')!

  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/rent-guarantee/`,
    serviceType: 'Rent Guarantee Coordination',
    provider: {
      name: 'MoveSmart Rentals',
      url: SITE_URL,
    },
    areaServed: 'Ontario, Canada',
  })

  // Pair each how-it-works step with a display-only "Day X" label.
  const accordionSteps = content.howItWorks.map((s, idx) => ({
    step: s.step,
    title: s.title,
    body: s.body,
    day: DAY_LABELS[idx] ?? `Stage ${s.step}`,
  }))

  return (
    <main>
      <JsonLd data={serviceSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: content.title, href: '/services/rent-guarantee/' },
          ]}
        />
      </div>

      {/* ─── CUSTOM HERO — giant shield watermark + policy chips ──────────── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white pb-20 pt-10 sm:pb-24 sm:pt-14">
        {/* Giant decorative shield watermark in the background */}
        <ShieldWatermark />

        {/* Soft dot grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT — copy column */}
            <div className="lg:col-span-7">
              <RevealUp>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 bg-brand-gold/70"
                  />
                  {content.heroKicker}
                </p>
              </RevealUp>
              <RevealUp index={1}>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  <ShieldCheck className="size-3.5" aria-hidden="true" />
                  {content.heroEyebrow}
                </p>
              </RevealUp>
              <RevealUp index={2}>
                <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                  Rental income,{' '}
                  <span className="font-display italic text-brand-emerald">
                    protected
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h1>
              </RevealUp>
              <RevealUp index={3}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  {content.heroLede}
                </p>
              </RevealUp>
              <RevealUp index={4}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={PORTAL_OWNER_SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-emerald/25 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald/90 hover:shadow-xl"
                  >
                    {content.cta1Label}
                  </a>
                  <Link
                    href="/contact/?type=discovery"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/20 bg-white px-6 py-3 text-sm font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:border-brand-emerald/50 hover:bg-brand-emerald/5"
                  >
                    {content.cta2Label}
                  </Link>
                </div>
              </RevealUp>
              <RevealUp index={5}>
                <p className="mt-6 max-w-xl text-xs leading-relaxed text-slate-500">
                  Coverage is underwritten by licensed Canadian insurance
                  partners. MoveSmart coordinates qualification, lease
                  alignment, and claim support — we are the coordinator, not
                  the insurer.
                </p>
              </RevealUp>
            </div>

            {/* RIGHT — stack of 3 policy chips */}
            <div className="lg:col-span-5">
              <div className="relative space-y-4 sm:space-y-5">
                {POLICY_CHIPS.map((chip, idx) => (
                  <PolicyCard
                    key={chip.label}
                    index={idx}
                    iconKey={chip.iconKey}
                    metric={chip.metric}
                    label={chip.label}
                    body={chip.body}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S COVERED — 3-col benefit cards (icon-led, NOT image-led) ─ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 max-w-3xl">
            <RevealUp>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-emerald">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-emerald/60"
                />
                What is covered
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                The protection,{' '}
                <span className="font-display italic text-brand-emerald">
                  in plain numbers
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
            <RevealUp index={2}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Coverage terms, premium, waiting period, exclusions, and claim
                mechanics are disclosed in plain language before you bind —
                never after.
              </p>
            </RevealUp>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
            {COVERAGE_CARDS.map((card, idx) => (
              <CoverageCard
                key={card.title}
                index={idx}
                iconKey={card.iconKey}
                metric={card.metric}
                title={card.title}
                body={card.body}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW PROTECTION WORKS — vertical accordion ────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-brand-emerald/8 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="mb-12 max-w-3xl">
            <RevealUp>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-gold/70"
                />
                How protection works
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                A six-stage{' '}
                <span className="font-display italic text-brand-emerald">
                  protection workflow
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
            <RevealUp index={2}>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                From the first screening to a possible claim — each stage is
                logged, timestamped, and visible in your owner portal.
              </p>
            </RevealUp>
          </div>

          <RevealUp index={3}>
            <ProtectionAccordion steps={accordionSteps} />
          </RevealUp>
        </div>
      </section>

      {/* ─── COMPARISON TABLE — With vs Without rent guarantee ────────────── */}
      <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 max-w-3xl">
            <RevealUp>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-emerald">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-emerald/60"
                />
                The difference
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                With vs without{' '}
                <span className="font-display italic text-brand-emerald">
                  rent guarantee
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
            <RevealUp index={2}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                What a single non-paying tenancy actually costs — and what a
                coordinated rent guarantee policy puts back on the balance
                sheet.
              </p>
            </RevealUp>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <ComparisonColumn
              variant="without"
              badge="Without protection"
              title="The cost of going it alone"
              subtitle="What individual landlords typically absorb when a tenancy stops paying."
              items={WITHOUT_ITEMS}
            />
            <ComparisonColumn
              variant="with"
              badge="With MoveSmart"
              title="The cost, covered"
              subtitle="A coordinated policy aligned to your lease, bound at signing, claimable on default."
              items={WITH_ITEMS}
            />
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS BAND — claim-process stats + handshake accent ──── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#FBFAF6] via-white to-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Side accent image */}
            <div className="lg:col-span-4">
              <RevealUp>
                <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-brand-navy/10">
                  <Image
                    src={unsplash(PHOTO.handshake.id, 1200)}
                    alt={PHOTO.handshake.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    unoptimized
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-tr from-brand-navy/40 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-brand-emerald"
                      />
                      Claim coordination, in writing
                    </p>
                  </div>
                </div>
              </RevealUp>
            </div>

            {/* Stat grid */}
            <div className="lg:col-span-8">
              <RevealUp>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-emerald">
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 bg-brand-emerald/60"
                  />
                  Trust the process
                </p>
              </RevealUp>
              <RevealUp index={1}>
                <h2 className="mt-4 font-display text-2xl font-normal leading-tight tracking-tight text-brand-navy sm:text-3xl md:text-4xl">
                  Licensed insurers.{' '}
                  <span className="font-display italic text-brand-emerald">
                    Coordinated by MoveSmart.
                  </span>
                </h2>
              </RevealUp>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-navy/10 sm:grid-cols-4">
                {TRUST_STATS.map((stat, idx) => (
                  <RevealUp key={stat.label} index={idx + 2} delayStep={0.05}>
                    <div className="h-full bg-white p-5 text-center sm:p-6">
                      <p className="font-display text-2xl font-normal text-brand-navy sm:text-3xl">
                        {stat.metric}
                      </p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  </RevealUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR — simple 2-col emerald-checkmark list ────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-3xl">
            <RevealUp>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-gold/70"
                />
                Who it&rsquo;s for
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Built for landlords who treat rent as{' '}
                <span className="font-display italic text-brand-emerald">
                  cash flow
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {content.whoItsFor.map((w, idx) => (
              <RevealUp key={w.audience} index={idx} delayStep={0.05}>
                <li className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:shadow-xl hover:shadow-brand-emerald/10 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald"
                  >
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
                      {w.audience}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                      {w.fitNote}
                    </p>
                  </div>
                </li>
              </RevealUp>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── PRICING NOTE — single centered display-serif statement ───────── */}
      <section className="relative isolate overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto size-72 -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <RevealUp>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-emerald">
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-brand-emerald/60"
              />
              Pricing
            </p>
          </RevealUp>
          <RevealUp index={1}>
            <p className="mt-6 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl md:text-[2.25rem]">
              <span className="italic text-brand-emerald">
                &ldquo;{content.pricingNote}&rdquo;
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </p>
          </RevealUp>
          <RevealUp index={2}>
            <Link
              href="/pricing/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-navy underline decoration-brand-emerald decoration-2 underline-offset-4 transition-colors hover:text-brand-emerald"
            >
              See full fee schedule
            </Link>
          </RevealUp>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock
        title={`Questions about ${content.title}`}
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* ─── FINAL CTA — custom inline dark band with shield icon ─────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 size-[420px] rounded-full bg-brand-emerald/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-gold/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-emerald/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-emerald/60 to-transparent"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <RevealUp>
            <span
              aria-hidden="true"
              className="mx-auto inline-flex size-16 items-center justify-center rounded-2xl border border-brand-emerald/40 bg-brand-emerald/15 text-brand-emerald shadow-lg shadow-brand-emerald/20"
            >
              <ShieldCheck className="size-8" strokeWidth={1.5} />
            </span>
          </RevealUp>
          <RevealUp index={1}>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
              Ready to bind protection
            </p>
          </RevealUp>
          <RevealUp index={2}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Make a missed rent cheque{' '}
              <span className="font-display italic text-brand-emerald">
                someone else&rsquo;s problem
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealUp>
          <RevealUp index={3}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              List your property and we will map your applicant to the partner
              underwriting rubric, present coverage options, and align the
              lease — all before you bind.
            </p>
          </RevealUp>
          <RevealUp index={4}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={PORTAL_OWNER_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-emerald/30 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald/90 hover:shadow-xl"
              >
                {content.cta1Label}
              </a>
              <Link
                href="/contact/?type=discovery"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-emerald/50 hover:bg-white/10"
              >
                {content.cta2Label}
              </Link>
            </div>
          </RevealUp>
        </div>
      </section>
    </main>
  )
}
