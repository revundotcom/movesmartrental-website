import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  ClipboardCheck,
  Eye,
  KeyRound,
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

import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { TestimonialsSection } from '@/components/blocks/testimonials-section'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { GradientText } from '@/components/ui/gradient-text'
import {
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
  title: 'Full-Service Leasing for Landlords | MoveSmart Rentals',
  description:
    'Full-service leasing and tenant placement for Canadian landlords. Strategic pricing, professional marketing, structured screening, and lease execution. Zero upfront cost, success-fee on placement.',
  alternates: {
    canonical: '/owners/',
  },
  openGraph: {
    title: 'Full-Service Leasing for Landlords | MoveSmart Rentals',
    description:
      'Strategic pricing, professional marketing, structured screening, and lease execution for Canadian landlords. Zero upfront cost, success-fee on placement.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Service Leasing for Landlords | MoveSmart Rentals',
    description:
      'Strategic pricing, professional marketing, structured screening, and lease execution. Zero upfront cost, success-fee on placement.',
  },
}

/* ---------- Landlord pain points (zigzag) - leasing-focused ---------- */

const PAIN_POINTS: Array<{ problem: string; solution: string }> = [
  {
    problem:
      'Vacant units sitting empty for weeks while you guess at the right asking rent.',
    solution:
      'Strategic, data-backed pricing on day one - calibrated to live comps in your neighbourhood, not last year\u2019s averages. Most listings reach signed lease in roughly 18 days.',
  },
  {
    problem:
      'Listing photos that do not sell the unit and copy that gets lost in the feed.',
    solution:
      'Professional photography, virtual tours, and editorial listing copy syndicated to MLS, Realtor.ca, and the major rental websites the same day prep wraps.',
  },
  {
    problem:
      'Applicant chaos: a flood of inquiries, no-show showings, and screening you cannot defend.',
    solution:
      'Showings coordinated and confirmed by our team. Every applicant runs through a structured, documented screen - credit, employment, references, rental history - visible to you in the portal.',
  },
  {
    problem:
      'Pricing guesswork, sloppy lease paperwork, and a messy move-in that sets the tenancy off badly.',
    solution:
      'Province-compliant lease execution, deposits and first-month collected on signing, key handover and move-in inspection coordinated end-to-end. Rent protection and partner insurance pathways available where applicable.',
  },
]

/* ---------- Contract-required messaging (9 owner pillars) ---------- */

const CONTRACT_MESSAGING: Array<{
  iconKey: string
  title: string
  description: string
}> = [
  {
    iconKey: 'DollarSign',
    title: 'Nothing Upfront',
    description:
      'Standard leasing success fee is paid only on placement. No setup fees, no retainers, nothing due to start.',
  },
  {
    iconKey: 'Monitor',
    title: 'Self-Serve Online',
    description:
      'Onboard, list, and track everything online. No mandatory phone calls - book a call only if you want one.',
  },
  {
    iconKey: 'Users',
    title: 'Dedicated Account Manager (Optional)',
    description:
      'A single named contact who knows your file end-to-end, available to owners who want a hands-on point of contact.',
  },
  {
    iconKey: 'Zap',
    title: 'Tech + Brick-and-Mortar Execution',
    description:
      'Modern listing tools and screening pipelines backed by licensed brokers and on-the-ground showing teams in every market we serve.',
  },
  {
    iconKey: 'TrendingUp',
    title: 'Full Portal Visibility',
    description:
      'Live view of showings, applicants, screening, approvals, counter-offers, inspections, and the full communication history.',
  },
  {
    iconKey: 'Paintbrush',
    title: 'Property Preparation',
    description:
      'Photography, virtual tours, painting, cleaning, junk removal, landscaping, handyman, and short-term financing support to get your unit lease-ready.',
  },
  {
    iconKey: 'Megaphone',
    title: 'MLS + Major Rental Websites',
    description:
      'Listings distributed to MLS, Realtor.ca, the major rental portals, and our social channels for maximum applicant volume in week one.',
  },
  {
    iconKey: 'Shield',
    title: 'Structured, Documented Screening',
    description:
      'Credit, employment, references, and rental history - every applicant, every time, with the file visible to you before you approve.',
  },
  {
    iconKey: 'CheckCircle',
    title: 'Rent Protection + Insurance Pathways',
    description:
      'Optional partner pathways for rent protection and landlord insurance, surfaced at the right moment in your leasing flow.',
  },
]

/* ---------- Portal feature strip - leasing-focused ---------- */

const PORTAL_FEATURES = [
  {
    icon: Eye,
    title: 'Showings & inquiries',
    description:
      'Every inquiry, every booked showing, every no-show - logged with timestamps and the team member who handled it.',
  },
  {
    icon: Users,
    title: 'Applicant pipeline',
    description:
      'See every applicant as they move from inquiry through showing, application, and recommendation. Approve or counter in one click.',
  },
  {
    icon: ClipboardCheck,
    title: 'Screening reports',
    description:
      'Full applicant files: credit, employment, references, rental history. You see what we see before you approve.',
  },
  {
    icon: KeyRound,
    title: 'Lease & move-in',
    description:
      'Signed lease, deposits collected, move-in inspection report, and the full communication history - all in one place.',
  },
]

/* ---------- Owner economics comparison - leasing line items ---------- */

type Verdict = 'good' | 'bad' | 'meh'

const COMPARISON_ROWS: Array<{
  label: string
  diy: { verdict: Verdict; text: string }
  traditional: { verdict: Verdict; text: string }
  movesmart: { verdict: Verdict; text: string }
}> = [
  {
    label: 'Average days to signed lease',
    diy: { verdict: 'bad', text: '30-60 days' },
    traditional: { verdict: 'meh', text: '21-35 days' },
    movesmart: { verdict: 'good', text: '~18 days average' },
  },
  {
    label: 'Pricing approach',
    diy: { verdict: 'bad', text: 'Gut feel, last year\u2019s rent' },
    traditional: { verdict: 'meh', text: 'Broker estimate, infrequent updates' },
    movesmart: { verdict: 'good', text: 'Strategic pricing on live comps' },
  },
  {
    label: 'Listing quality & distribution',
    diy: { verdict: 'bad', text: 'Phone photos, one or two sites' },
    traditional: { verdict: 'meh', text: 'Basic photos, limited syndication' },
    movesmart: { verdict: 'good', text: 'Pro photos + virtual tour, MLS + major portals + social' },
  },
  {
    label: 'Showing coordination',
    diy: { verdict: 'bad', text: 'You answer every text yourself' },
    traditional: { verdict: 'meh', text: 'Shared inbox, slow reply times' },
    movesmart: { verdict: 'good', text: 'Dedicated team confirms and runs every showing' },
  },
  {
    label: 'Tenant qualification rigour',
    diy: { verdict: 'bad', text: 'Credit check only, if any' },
    traditional: { verdict: 'meh', text: 'Credit + basic references' },
    movesmart: { verdict: 'good', text: 'Credit, employment, references, rental history - documented' },
  },
  {
    label: 'Setup & onboarding fees',
    diy: { verdict: 'good', text: '$0' },
    traditional: { verdict: 'bad', text: '$200-$500 typical' },
    movesmart: { verdict: 'good', text: '$0 - success fee paid only on placement' },
  },
  {
    label: 'Visibility into the leasing process',
    diy: { verdict: 'good', text: 'You are the process' },
    traditional: { verdict: 'bad', text: 'Phone calls, occasional email updates' },
    movesmart: { verdict: 'good', text: 'Live portal - every showing, applicant, and approval' },
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
  'Strategic rental pricing on live comps',
  'Photography, virtual tour & MLS listing',
  'Showing coordination - in-person & virtual',
  'Structured screening - credit, employment, references',
  'Province-compliant lease execution & move-in handoff',
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
          Full-service leasing,{' '}
          <span className="font-display italic text-brand-emerald">listing to move&#8209;in</span>
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
            &ldquo;They leased my Etobicoke condo in eleven days - listing photos, showings, screened applicants, signed lease, all handled.&rdquo;
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
        headline="Full-service leasing. Real Results."
        lede="Strategic pricing, professional marketing, structured screening, and clean lease execution - from listing to move-in. Nothing due upfront. Standard leasing success fee on placement."
        cta1={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
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
              Four leasing{' '}
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

      {/* ── Editorial image bridge: leasing team at work ── */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-xl shadow-brand-navy/10">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=80&auto=format&fit=crop"
                alt="MoveSmart leasing professional reviewing applicant files on a laptop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                The leasing team behind your file
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                A real person owns your{' '}
                <span className="font-display italic text-brand-emerald">lease-up</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Every owner file has a named leasing lead and a documented applicant pipeline. Inquiries are triaged within hours, every showing is confirmed in writing, and every applicant runs through the same structured screening - all visible in your portal, all backed by a person you can call.
              </p>
            </div>
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
              We do not get paid until your unit is leased. That single line
              re-writes every other line on this page.
            </blockquote>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              The MoveSmart promise
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 3: 9 Owner Pillars - EDITORIAL FEATURE LIST ── */}
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
              Not marketing copy - clauses. Each line below appears verbatim in the leasing agreement you sign.
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

      {/* ── Editorial image bridge: keys handover at move-in ── */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-brand-navy/10">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop"
                alt="Property owner handing over keys to a qualified new tenant on move-in day"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="lg:order-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Move-in coordination
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                A clean handover{' '}
                <span className="font-display italic text-brand-emerald">on day one</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Lease signed, deposits in trust, utilities coordinated, condition inspection completed and photo-documented. By the time keys change hands, every paper trail is closed and your tenant&apos;s first day in the unit feels managed - not improvised.
              </p>
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
              Four views that turn the leasing process from a black box into a glass box. Log in from any device, any time.
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

      {/* ── Editorial banner: modern Canadian condo interior ── */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/15">
            <Image
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2400&q=80&auto=format&fit=crop"
              alt="Bright, professionally staged modern condo living room in a high-rise Canadian rental building"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-8 pb-8 sm:px-12 sm:pb-10">
              <p className="font-display text-2xl font-normal italic leading-snug text-white sm:text-3xl md:text-4xl">
                Listings that look as good online as the unit does in person.
              </p>
            </div>
          </div>
        </div>
      </section>

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
              Most owner pages skip the math. Here&rsquo;s how listing it yourself, hiring a traditional leasing agent, and partnering with us actually compare on the line items that decide how fast - and how well - your unit leases.
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
                      You list it yourself
                    </p>
                  </th>
                  <th scope="col" className="w-1/4 py-5 pr-6 align-bottom">
                    <p className="font-display text-2xl font-normal text-brand-navy">
                      Traditional Agent
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">
                      Local leasing agent, paper-first
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
            Industry benchmarks compiled from CMHC, Buildium, and 2025 leasing-industry owner reports. Specific numbers vary by market.
          </p>
        </div>
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
              Twenty-plus cities across Canada and the United States, with licensed brokers and on-the-ground showing teams in every region.
            </p>
          </RevealOnScroll>

          {/* Single-column editorial list, big bold city names, hairline dividers */}
          <div className="mt-14 divide-y divide-brand-navy/15 border-y border-brand-navy/15">
            {MARKETS.map((market, idx) => (
              <MarketRow key={market.region} index={idx}>
                <div className="block py-8 sm:py-10">
                  <div className="grid grid-cols-1 items-baseline gap-y-3 px-2 sm:grid-cols-12 sm:gap-x-8">
                    <div className="flex items-baseline gap-4 sm:col-span-5">
                      <span
                        aria-hidden="true"
                        className="font-display text-base italic text-brand-gold tabular-nums"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-3xl font-normal leading-none text-brand-navy sm:text-4xl md:text-5xl">
                        {market.region}
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed text-slate-700 sm:col-span-7">
                      {market.blurb}
                    </p>
                  </div>
                  <p className="mt-3 px-2 text-xs uppercase tracking-wider text-slate-500 sm:ml-12">
                    {market.cities}
                  </p>
                </div>
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
        showQuestionsCta={false}
        questions={[
          {
            question: 'How much does MoveSmart leasing cost?',
            answer:
              'Standard leasing success fee, paid only on placement. Nothing is due upfront - no setup fees, no retainers, no long-term contracts. You owe nothing until a qualified tenant is signed and moved in.',
          },
          {
            question: 'What is included in a MoveSmart leasing engagement?',
            answer:
              'Strategic rental pricing, professional photography and virtual tours, listing distribution to MLS and the major rental websites, showing coordination, structured tenant qualification, offer and counter-offer management, province-compliant lease execution, and move-in coordination. Property preparation services (paint, clean, junk removal, landscaping, handyman) and rent protection / insurance partner pathways are available where applicable.',
          },
          {
            question: 'How do you qualify tenants?',
            answer:
              'Every applicant runs through a structured, documented screen: credit check, employment and income verification, previous landlord references, and rental history review. The full file lives in your portal so you see exactly what we see before approving.',
          },
          {
            question: 'What is the rent protection pathway?',
            answer:
              'We surface optional partner pathways for rent protection and landlord insurance at the right moment in your leasing flow. These are third-party programs offered through vetted partners - you choose whether to enrol, and the cost and terms come from the partner directly.',
          },
          {
            question: 'How quickly will my unit lease?',
            answer:
              'Most listings reach a signed lease in roughly 18 days from going live. We distribute to MLS, Realtor.ca, and the major rental portals, with professional photos and a virtual tour, to drive applicant volume in week one.',
          },
          {
            question: 'Do I need to get on a call to start?',
            answer:
              'No. Onboarding is fully self-serve online. A dedicated account manager is available if you want a hands-on point of contact, but no phone call is required to list with us.',
          },
          {
            question: 'What happens after the tenant moves in?',
            answer:
              'Our scope is leasing execution - from listing to move-in. Once the lease is signed, deposits collected, and the move-in inspection is complete, the engagement is fulfilled. We are a leasing brokerage, not a property management firm.',
          },
        ]}
      />

    </main>
  )
}
