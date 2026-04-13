import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Check,
  FileText,
  Wrench,
  ClipboardCheck,
  Receipt,
  X,
  Minus,
  ArrowRight,
  DollarSign,
  Monitor,
  Users,
  Megaphone,
  Shield,
  CheckCircle,
  Paintbrush,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { TestimonialsSection } from '@/components/blocks/testimonials-section'
import { GuaranteeSection } from '@/components/blocks/guarantee-section'
import { CaseStudySection } from '@/components/blocks/case-study-card'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'
import { GradientText } from '@/components/ui/gradient-text'
import { sanityFetch } from '@/sanity/fetch'
import { SERVICE_OWNER_QUERY } from '@/sanity/queries/service'
import type { ServiceCardData } from '@/types/blocks'
import {
  LeasingTimeline,
  MarketRow,
  SlideFromRight,
  ZigzagRow,
} from './client-parts'

const CONTRACT_ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  Monitor,
  Users,
  Megaphone,
  Shield,
  CheckCircle,
  Paintbrush,
  TrendingUp,
  Zap,
}

export const metadata: Metadata = {
  title: 'Property Management for Landlords | Hands-Off Leasing Across Canada',
  description:
    'Hands-off property management for Canadian landlords. Zero upfront cost, dedicated account manager, tenant screening, rent protection, and full leasing execution.',
  alternates: {
    canonical: '/owners/',
  },
  openGraph: {
    title: 'Property Management for Landlords | Hands-Off Leasing Across Canada',
    description:
      'Hands-off property management for Canadian landlords. Zero upfront cost, dedicated account manager, tenant screening, and rent protection.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management for Landlords | Hands-Off Leasing Across Canada',
    description:
      'Hands-off property management for Canadian landlords. Zero upfront cost, dedicated account manager, tenant screening, and rent protection.',
  },
}

/* ---------- Landlord pain points (zigzag) ---------- */

const PAIN_POINTS: Array<{ problem: string; solution: string }> = [
  {
    problem:
      'Vacant units sitting empty for weeks, costing you thousands in lost rental income every month.',
    solution:
      'Our MLS distribution and 50+ rental site syndication fills vacancies in an average of 14 days.',
  },
  {
    problem:
      'Difficult tenants who damage property, pay late, or cause disputes with neighbours.',
    solution:
      'Structured screening with credit checks, employment verification, references, and full rental history review for every applicant.',
  },
  {
    problem:
      'Spending evenings and weekends handling maintenance calls, tenant complaints, and property inspections.',
    solution:
      'Your dedicated account manager handles everything. Track it all from your online portal without lifting a finger.',
  },
  {
    problem:
      'Hidden fees and unclear pricing from property management companies that eat into your returns.',
    solution:
      'Nothing upfront. Our transparent, success-based model means you pay nothing until your property is rented.',
  },
]

/* ---------- Contract-required messaging (9 points) ---------- */

const CONTRACT_MESSAGING: Array<{
  iconKey: string
  title: string
  description: string
}> = [
  {
    iconKey: 'DollarSign',
    title: 'Nothing Upfront',
    description:
      'Our success-based model means you pay nothing until your property is rented. No setup fees, ever.',
  },
  {
    iconKey: 'Monitor',
    title: 'Self-Serve Online Portal',
    description:
      'Manage your properties, view financial reports, and communicate through your dedicated online portal.',
  },
  {
    iconKey: 'Users',
    title: 'Dedicated Account Manager',
    description:
      'A single point of contact who knows your properties inside and out and handles every detail.',
  },
  {
    iconKey: 'Megaphone',
    title: 'MLS Distribution',
    description:
      'Your listings appear on MLS, Realtor.ca, and 50+ rental sites for maximum exposure and faster fills.',
  },
  {
    iconKey: 'Shield',
    title: 'Structured Screening',
    description:
      'Credit checks, employment verification, references, and full rental history review for every applicant.',
  },
  {
    iconKey: 'CheckCircle',
    title: 'Rent Protection + Insurance Pathways',
    description:
      'Our rent guarantee program protects your income from missed payments. Partner insurance pathways available where applicable.',
  },
  {
    iconKey: 'Paintbrush',
    title: 'Property Preparation',
    description:
      'Professional cleaning, staging, and photography before listing to attract quality tenants fast.',
  },
  {
    iconKey: 'TrendingUp',
    title: 'Full Visibility Into Every Step',
    description:
      'Track showings, applications, screening, approvals, inspections, and communications in real time from your portal.',
  },
  {
    iconKey: 'Zap',
    title: 'Tech + Brick-and-Mortar',
    description:
      'Modern technology backed by local market expertise and real people you can meet in person.',
  },
]

/* ---------- Leasing process timeline ---------- */

const LEASING_TIMELINE: Array<{
  day: string
  title: string
  description: string
}> = [
  {
    day: 'Day 0',
    title: 'Onboarding call',
    description:
      'A 30-minute call with your dedicated account manager to walk the property, set rent expectations, and confirm preferences.',
  },
  {
    day: 'Day 1-3',
    title: 'Prep, photography & staging',
    description:
      'Professional cleaning, light staging where useful, and shot-listed photography. Listing copy drafted and approved by you.',
  },
  {
    day: 'Day 3-4',
    title: 'MLS + 50-site syndication',
    description:
      'Your listing goes live on MLS, Realtor.ca, and 50+ rental portals on the same day. We handle inquiries from minute one.',
  },
  {
    day: 'Day 4-10',
    title: 'Showings & screening',
    description:
      'In-person and virtual tours managed by us. Every applicant runs through credit, employment, reference, and rental-history checks.',
  },
  {
    day: 'Day 10-14',
    title: 'Approval & lease signing',
    description:
      'You see the shortlisted applicants with our recommendation. Province-compliant lease, deposits collected, and move-in scheduled.',
  },
  {
    day: 'Ongoing',
    title: 'Full management',
    description:
      'Rent collection, maintenance coordination, inspections, statements, and renewals - tracked live in your portal.',
  },
]

/* ---------- Portal feature strip (the ONE allowed card grid) ---------- */

const PORTAL_FEATURES = [
  {
    icon: Receipt,
    title: 'Rent ledger',
    description:
      'Live ledger of every payment, deposit, fee, and disbursement - exportable to CSV or your accountant any time.',
  },
  {
    icon: Wrench,
    title: 'Work orders',
    description:
      'See every maintenance request from intake to vendor invoice. Approve spends above your threshold in one click.',
  },
  {
    icon: ClipboardCheck,
    title: 'Screening reports',
    description:
      'Full applicant files: credit, employment, references, rental history. You see what we see before approval.',
  },
  {
    icon: FileText,
    title: 'Monthly statements',
    description:
      'Itemised statement with rent collected, fees, and net deposit. Year-end summaries ready for your tax filing.',
  },
]

/* ---------- Owner economics comparison ---------- */

type Verdict = 'good' | 'bad' | 'meh'

const COMPARISON_ROWS: Array<{
  label: string
  diy: { verdict: Verdict; text: string }
  traditional: { verdict: Verdict; text: string }
  movesmart: { verdict: Verdict; text: string }
}> = [
  {
    label: 'Average vacancy time',
    diy: { verdict: 'bad', text: '30-60 days' },
    traditional: { verdict: 'meh', text: '21-35 days' },
    movesmart: { verdict: 'good', text: '14 days average' },
  },
  {
    label: 'Tenant screening rigour',
    diy: { verdict: 'bad', text: 'Credit check only, if any' },
    traditional: { verdict: 'meh', text: 'Credit + basic references' },
    movesmart: { verdict: 'good', text: 'Credit, employment, references, rental history' },
  },
  {
    label: 'Evening & weekend calls',
    diy: { verdict: 'bad', text: 'You answer them' },
    traditional: { verdict: 'meh', text: 'Routed to call centre' },
    movesmart: { verdict: 'good', text: 'Dedicated manager + 24/7 maintenance line' },
  },
  {
    label: 'Setup & onboarding fees',
    diy: { verdict: 'good', text: '$0' },
    traditional: { verdict: 'bad', text: '$200-$500 typical' },
    movesmart: { verdict: 'good', text: '$0 - pay nothing until rented' },
  },
  {
    label: 'Hidden fees on your statement',
    diy: { verdict: 'good', text: 'None - but you do the work' },
    traditional: { verdict: 'bad', text: 'Markups on maintenance, lease renewal fees' },
    movesmart: { verdict: 'good', text: 'Flat percentage. No vendor markups.' },
  },
  {
    label: 'Visibility into the work',
    diy: { verdict: 'good', text: 'You are the work' },
    traditional: { verdict: 'bad', text: 'Monthly PDF, phone calls' },
    movesmart: { verdict: 'good', text: 'Live portal - every showing, application, work order' },
  },
]

/* ---------- Markets we serve ---------- */

const MARKETS: Array<{
  region: string
  href: string
  blurb: string
  cities: string
}> = [
  {
    region: 'Ontario',
    href: '/ca/ontario/',
    blurb: 'Our largest footprint - GTA, Ottawa Valley, and Southwestern Ontario.',
    cities: 'Toronto · Ottawa · Mississauga · Hamilton · Brampton · London · Kitchener',
  },
  {
    region: 'British Columbia',
    href: '/ca/british-columbia/',
    blurb: 'Lower Mainland and Vancouver Island leasing, RTB-compliant lease packages.',
    cities: 'Vancouver · Surrey · Burnaby · Victoria · Richmond',
  },
  {
    region: 'Alberta',
    href: '/ca/alberta/',
    blurb: 'Calgary and Edmonton metros with bilingual French/English options where needed.',
    cities: 'Calgary · Edmonton · Red Deer · Lethbridge',
  },
  {
    region: 'Quebec',
    href: '/ca/quebec/',
    blurb: 'TAL-compliant leases, French-language tenant comms, Montreal-area specialists.',
    cities: 'Montreal · Quebec City · Laval · Gatineau',
  },
  {
    region: 'United States',
    href: '/us/',
    blurb: 'Cross-border owners welcome. Five-state coverage with US-licensed brokers.',
    cities: 'Florida · Texas · California · New York · Illinois',
  },
]

/* ---------- Hero "What you get" aside ---------- */

const HERO_INCLUDED = [
  'Photography, staging & MLS listing',
  'Tenant screening - credit, employment, references',
  'Province-compliant lease & e-signing',
  'Rent collection & monthly owner statements',
  'Maintenance coordination with vetted vendors',
]

function HeroAside() {
  return (
    <div className="relative">
      {/* Gold hairline corner */}
      <div
        aria-hidden="true"
        className="absolute -top-2 left-0 h-px w-12 bg-brand-gold"
      />

      <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy/55">
          What&rsquo;s included
        </p>
        <h3 className="mt-2 font-display text-xl font-normal leading-snug text-brand-navy">
          Full leasing &amp; management,{' '}
          <span className="font-display italic text-brand-emerald">end&#8209;to&#8209;end</span>
        </h3>

        <ul className="mt-5 space-y-3">
          {HERO_INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
                <Check className="size-3 text-brand-emerald" aria-hidden="true" strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-slate-700">{item}</span>
            </li>
          ))}
        </ul>

        {/* Owner quote */}
        <figure className="mt-6 border-t border-brand-navy/10 pt-5">
          <blockquote className="font-display text-base font-normal italic leading-snug text-brand-navy">
            &ldquo;They filled my Etobicoke condo in eleven days. I haven&rsquo;t taken a tenant call since.&rdquo;
          </blockquote>
          <figcaption className="mt-3 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
              MR
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-navy">Michael R.</p>
              <p className="text-xs text-slate-500">Owner, Toronto ON</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

/* ---------- Inline verdict cell for typographic table ---------- */

function VerdictInline({
  verdict,
  text,
  emphasis = false,
}: {
  verdict: Verdict
  text: string
  emphasis?: boolean
}) {
  const Icon = verdict === 'good' ? Check : verdict === 'bad' ? X : Minus
  const iconClass =
    verdict === 'good'
      ? 'text-brand-emerald'
      : verdict === 'bad'
        ? 'text-rose-500'
        : 'text-slate-400'

  return (
    <span className="inline-flex items-start gap-2">
      <Icon
        className={`mt-1 size-3.5 shrink-0 ${iconClass}`}
        aria-hidden="true"
        strokeWidth={3}
      />
      <span
        className={`leading-snug ${emphasis ? 'font-semibold text-brand-navy' : 'text-slate-700'}`}
      >
        {text}
      </span>
    </span>
  )
}

/* ---------- Hairline gold divider ---------- */
function GoldRule() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto my-20 h-px max-w-xs bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
    />
  )
}

export default async function OwnersPage() {
  const services = await sanityFetch<ServiceCardData[]>({
    query: SERVICE_OWNER_QUERY,
    tags: ['service'],
  })

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'For Owners', href: '/owners/' },
          ]}
        />
      </div>

      {/* ── SECTION 1: Editorial Page Hero ── */}
      <PageHeroBlock
        kicker="Owner Hub"
        eyebrow="For Property Owners"
        headline="Hands-off leasing. Real Results."
        lede="White-glove leasing execution from a property manager that does not get paid until your unit is rented. Real people, real markets, real accountability - backed by a portal that shows you everything."
        cta1={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
        cta2={{ label: 'Book a 20-Min Call', href: '/contact/?type=owner&intent=call' }}
        aside={<HeroAside />}
      />

      {/* ── SECTION 2: Pain Points - ZIGZAG EDITORIAL ROWS ── */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="slideFromLeft" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              The Problem
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Four landlord{' '}
              <span className="font-display italic text-brand-emerald">aches</span>, four answers
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealOnScroll>

          <div className="mt-14 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {PAIN_POINTS.map((point, idx) => {
              const fromLeft = idx % 2 === 0
              const numeral = String(idx + 1).padStart(2, '0')
              return (
                <ZigzagRow key={point.problem} index={idx} className="py-12 sm:py-16">
                  <div
                    className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 ${
                      fromLeft ? '' : 'lg:[direction:rtl]'
                    }`}
                  >
                    {/* Oversized counter */}
                    <div className="lg:col-span-3 lg:[direction:ltr]">
                      <p
                        aria-hidden="true"
                        className="font-display text-7xl font-normal italic leading-none text-brand-gold/60 sm:text-8xl"
                      >
                        {numeral}
                      </p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
                        {fromLeft ? 'Pain · Fix' : 'Fix · Pain'}
                      </p>
                    </div>

                    {/* Problem */}
                    <div className="lg:col-span-4 lg:[direction:ltr]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500/80">
                        Problem
                      </p>
                      <p className="mt-2 font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
                        {point.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="lg:col-span-5 lg:border-l lg:border-brand-navy/10 lg:pl-8 lg:[direction:ltr]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
                        How we fix it
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-slate-700 sm:text-lg">
                        {point.solution}
                      </p>
                    </div>
                  </div>
                </ZigzagRow>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE 1 - dreamy blur reveal ── */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <RevealOnScroll variant="blur" duration={0.9}>
            <span
              aria-hidden="true"
              className="font-display text-7xl leading-none text-brand-gold sm:text-8xl"
            >
              &ldquo;
            </span>
            <blockquote className="-mt-4 font-display text-2xl font-normal italic leading-snug text-brand-navy sm:text-3xl md:text-4xl">
              We do not get paid until your property is rented. That single line
              re-writes every other line on this page.
            </blockquote>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              The MoveSmart promise
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 3: 9 Contract-Required Messaging Points - EDITORIAL FEATURE LIST ── */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SlideFromRight className="max-w-3xl lg:ml-auto lg:text-right">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              The Contract
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Nine commitments, written into{' '}
              <span className="font-display italic text-brand-emerald">every owner agreement</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Not marketing copy - clauses. Each line below appears verbatim in the contract you sign.
            </p>
          </SlideFromRight>

          <RevealOnScroll
            variant="slideUp"
            stagger={0.05}
            className="mt-14 grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2"
          >
            {CONTRACT_MESSAGING.map((item, idx) => {
              const Icon = CONTRACT_ICON_MAP[item.iconKey] ?? DollarSign
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 border-t border-brand-navy/10 pt-6"
                >
                  <span className="font-display text-lg font-normal italic text-brand-gold tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <Icon
                    className="mt-1 size-5 shrink-0 text-brand-emerald"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <p className="text-[15px] leading-relaxed text-slate-700">
                    <strong className="font-semibold text-brand-navy">{item.title}</strong>
                    <span className="mx-2 text-brand-navy/30">-</span>
                    {item.description}
                  </p>
                </div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 4: Leasing Process - VERTICAL SPINE TIMELINE (no cards) ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <RevealOnScroll variant="slideFromLeft" className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
                The Leasing Playbook
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                How we lease your{' '}
                <span className="font-display italic text-brand-emerald">property</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                A six-step playbook refined across 500+ properties. Each step has a real owner, a real timeline, and a real handoff - no black-box marketing.
              </p>
              <div className="mt-8 border-t border-brand-navy/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Average end-to-end
                </p>
                <p className="mt-1 font-display text-4xl font-normal text-brand-navy">
                  <CountUp value={14} /> days
                </p>
                <p className="mt-1 text-sm text-slate-500">to a signed lease.</p>
              </div>
            </RevealOnScroll>

            <div className="lg:col-span-8">
              <LeasingTimeline steps={LEASING_TIMELINE} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE 2 - Gradient statement, halfway down the page ── */}
      <section className="relative bg-brand-navy py-28 sm:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="mx-auto max-w-5xl px-4 text-center">
          <RevealOnScroll variant="blur" duration={1}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">
              The owner promise
            </p>
            <p className="mt-8 font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-white">Your unit, leased in </span>
              <GradientText variant="emerald" className="font-display italic">
                fourteen days
              </GradientText>
              <span className="text-white">. Your evenings, </span>
              <GradientText variant="emerald" className="font-display italic">
                yours
              </GradientText>
              <span className="text-white"> again.</span>
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 5: Portal Feature Strip (the ONE allowed card grid) ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="slideFromLeft" className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Inside The Portal
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              What you&rsquo;ll see in your{' '}
              <span className="font-display italic text-brand-emerald">portal</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Four views that turn property management from a black box into a glass box. Log in from any device, any time.
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            variant="slideUp"
            stagger={0.08}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PORTAL_FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group relative flex flex-col rounded-2xl border border-brand-navy/10 bg-[#FBFAF6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:bg-white hover:shadow-md"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-white ring-1 ring-brand-navy/10">
                    <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-normal text-brand-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </RevealOnScroll>

          <div className="mt-10 text-center">
            <Link
              href="/portal-and-technology/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-emerald"
            >
              Tour the portal
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── SECTION 6: Owner Economics - INLINE TYPOGRAPHIC TABLE (no cards) ── */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="slideFromLeft" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Owner Economics
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              The honest{' '}
              <span className="font-display italic text-brand-emerald">comparison</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Most owner pages skip the math. Here&rsquo;s how managing it yourself, hiring a traditional PM, and partnering with us actually compare on the line items that hit your bottom line.
            </p>
          </RevealOnScroll>

          {/* Desktop / tablet inline table */}
          <RevealOnScroll variant="slideUp" duration={0.7} className="mt-14 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-brand-navy/20">
                  <th
                    scope="col"
                    className="w-1/4 py-5 pr-6 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Line item
                  </th>
                  <th scope="col" className="w-1/4 py-5 pr-6 align-bottom">
                    <p className="font-display text-2xl font-normal text-brand-navy">DIY</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">
                      You manage it yourself
                    </p>
                  </th>
                  <th scope="col" className="w-1/4 py-5 pr-6 align-bottom">
                    <p className="font-display text-2xl font-normal text-brand-navy">
                      Traditional PM
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">
                      Local agency, paper-first
                    </p>
                  </th>
                  <th scope="col" className="w-1/4 py-5 align-bottom">
                    <p className="font-display text-2xl font-normal italic text-brand-emerald">
                      MoveSmart
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-brand-emerald/80">
                      Tech + brick-and-mortar
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-brand-navy/10 align-top"
                  >
                    <th
                      scope="row"
                      className="py-6 pr-6 text-sm font-semibold text-brand-navy"
                    >
                      {row.label}
                    </th>
                    <td className="py-6 pr-6 text-sm">
                      <VerdictInline verdict={row.diy.verdict} text={row.diy.text} />
                    </td>
                    <td className="py-6 pr-6 text-sm">
                      <VerdictInline
                        verdict={row.traditional.verdict}
                        text={row.traditional.text}
                      />
                    </td>
                    <td className="py-6 text-sm">
                      <VerdictInline
                        verdict={row.movesmart.verdict}
                        text={row.movesmart.text}
                        emphasis
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RevealOnScroll>

          {/* Mobile stack - definition lists, no card chrome */}
          <div className="mt-12 md:hidden">
            <div className="divide-y divide-brand-navy/10 border-y border-brand-navy/10">
              {COMPARISON_ROWS.map((row) => (
                <div key={row.label} className="py-6">
                  <p className="font-display text-lg font-normal text-brand-navy">
                    {row.label}
                  </p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="grid grid-cols-[5.5rem_1fr] items-start gap-3">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        DIY
                      </dt>
                      <dd>
                        <VerdictInline verdict={row.diy.verdict} text={row.diy.text} />
                      </dd>
                    </div>
                    <div className="grid grid-cols-[5.5rem_1fr] items-start gap-3">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Traditional
                      </dt>
                      <dd>
                        <VerdictInline
                          verdict={row.traditional.verdict}
                          text={row.traditional.text}
                        />
                      </dd>
                    </div>
                    <div className="grid grid-cols-[5.5rem_1fr] items-start gap-3">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-brand-emerald">
                        MoveSmart
                      </dt>
                      <dd>
                        <VerdictInline
                          verdict={row.movesmart.verdict}
                          text={row.movesmart.text}
                          emphasis
                        />
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs text-slate-500">
            Industry benchmarks compiled from CMHC, Buildium, and Mynd 2025 owner reports. Specific numbers may vary by market.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: Service Grid (from CMS) ── */}
      <section className="bg-[#FBFAF6] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <RevealOnScroll variant="slideFromLeft" className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Owner Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Everything we do, listed in one place
            </h2>
          </RevealOnScroll>
        </div>
        <ServiceGridBlock services={services} columns={3} showHeading={false} />
      </section>

      {/* ── SECTION 8: Testimonials ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Owner Stories
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy">
              What Our Owners Say
            </h2>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* ── Guarantee Section ── */}
      <GuaranteeSection />

      {/* ── Case Study Section ── */}
      <CaseStudySection />

      {/* ── SECTION 9: Markets We Serve - EDITORIAL LIST (no grid) ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="slideFromLeft" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Coverage
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Markets we{' '}
              <span className="font-display italic text-brand-emerald">serve</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Twenty-plus cities across Canada and the United States, with licensed brokers and on-the-ground account managers in every region.
            </p>
          </RevealOnScroll>

          {/* Single-column editorial list, big bold city names, hairline dividers */}
          <div className="mt-14 divide-y divide-brand-navy/15 border-y border-brand-navy/15">
            {MARKETS.map((market, idx) => (
              <MarketRow key={market.region} index={idx}>
                <Link
                  href={market.href}
                  className="group block py-8 transition-colors hover:bg-[#FBFAF6] sm:py-10"
                >
                  <div className="grid grid-cols-1 items-baseline gap-y-3 px-2 sm:grid-cols-12 sm:gap-x-8">
                    <div className="flex items-baseline gap-4 sm:col-span-5">
                      <span
                        aria-hidden="true"
                        className="font-display text-base italic text-brand-gold tabular-nums"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-3xl font-normal leading-none text-brand-navy transition-colors group-hover:text-brand-emerald sm:text-4xl md:text-5xl">
                        {market.region}
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed text-slate-700 sm:col-span-5">
                      {market.blurb}
                    </p>
                    <div className="flex items-center justify-between gap-4 sm:col-span-2 sm:justify-end">
                      <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald sm:inline">
                        Visit
                      </span>
                      <ArrowRight
                        className="size-5 text-brand-navy/30 transition-all group-hover:translate-x-1 group-hover:text-brand-emerald"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <p className="mt-3 px-2 text-xs uppercase tracking-wider text-slate-500 sm:ml-12">
                    {market.cities}
                  </p>
                </Link>
              </MarketRow>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/locations/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-emerald"
            >
              See every city we cover
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: FAQ ── */}
      <FAQBlock
        title="Owner FAQs"
        questions={[
          {
            question: 'How much does MoveSmart property management cost?',
            answer:
              'We operate on a success-based model -- you pay nothing upfront. Our management fee is a percentage of collected rent, so we only earn when your property is earning. There are no hidden fees or long-term contracts.',
          },
          {
            question: 'What services are included in property management?',
            answer:
              'Our full-service management includes tenant screening, rent collection, maintenance coordination, lease management, property inspections, financial reporting, and 24/7 emergency response. Everything you need to be a hands-off landlord.',
          },
          {
            question: 'How do you screen tenants?',
            answer:
              'Every applicant undergoes a structured screening process including credit checks, employment and income verification, previous landlord references, and rental history review. We only place tenants who meet our qualification criteria.',
          },
          {
            question: 'What is the rent protection guarantee?',
            answer:
              'Our rent guarantee program protects your rental income from missed payments. If a qualified tenant fails to pay, we cover the rent so your cash flow remains consistent.',
          },
          {
            question: 'How quickly can you fill my vacancy?',
            answer:
              'On average, we fill vacancies within 14 days. We syndicate your listing across MLS, Realtor.ca, and 50+ rental platforms for maximum exposure, combined with professional photography and staging to attract quality tenants fast.',
          },
          {
            question: 'Will I have a dedicated point of contact?',
            answer:
              'Yes. Every owner is assigned a dedicated account manager who knows your portfolio, your preferences, and your tenants. You will not be bounced around a call centre - you have one phone number and one inbox for everything.',
          },
          {
            question: 'Can I cancel if I am not happy?',
            answer:
              'Yes. There are no long-term contracts and no cancellation fees. We earn your business month to month - if we are not delivering, you are free to leave.',
          },
        ]}
      />

      {/* ── SECTION 11: CTA Banner ── */}
      <CTABannerBlock
        headline="Ready for Hands-Off Leasing?"
        description="Join 500+ property owners who trust MoveSmart Rentals for white-glove leasing execution."
        primaryCta={{ label: 'Get Your Free Rental Analysis', href: '/contact/' }}
        secondaryCta={{ label: 'See Our Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
