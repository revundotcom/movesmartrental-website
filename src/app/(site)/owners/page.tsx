import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  X,
  Minus,
  Clock,
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
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'
import {
  MarketRow,
  PainPointCard,
  PortalShowcase,
  SlideFromRight,
} from './client-parts'

const CONTRACT_ICON_MAP: Record<string, LucideIcon> = {
  Clock,
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

/* ---------- Landlord pain points - leasing-focused ---------- */

const PAIN_POINTS: Array<{
  problem: string
  solution: string
  iconKey: string
  imageSrc: string
  imageAlt: string
  tag: string
}> = [
  {
    tag: 'Pricing & Vacancy',
    iconKey: 'DollarSign',
    imageSrc:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Empty bright apartment ready to lease',
    problem:
      'Vacant units sitting empty for weeks while you guess at the right asking rent.',
    solution:
      'Strategic, data-backed pricing on day one \u2014 calibrated to live comps in your neighbourhood, not last year\u2019s averages. Most listings reach signed lease in roughly 18 days.',
  },
  {
    tag: 'Marketing & Reach',
    iconKey: 'Megaphone',
    imageSrc:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Modern Canadian condo presented with editorial photography',
    problem:
      'Listing photos that do not sell the unit and copy that gets lost in the feed.',
    solution:
      'Professional photography, virtual tours, and editorial listing copy syndicated to MLS, Realtor.ca, and the major rental websites the same day prep wraps.',
  },
  {
    tag: 'Showings & Screening',
    iconKey: 'Shield',
    imageSrc:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'MoveSmart leasing professional reviewing applicant files',
    problem:
      'Applicant chaos: a flood of inquiries, no-show showings, and screening you cannot defend.',
    solution:
      'Showings coordinated and confirmed by our team. Every applicant runs through a structured, documented screen \u2014 credit, employment, references, rental history \u2014 visible to you in the portal.',
  },
  {
    tag: 'Lease & Move-In',
    iconKey: 'CheckCircle',
    imageSrc:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Property owner handing over keys to a qualified new tenant on move-in day',
    problem:
      'Pricing guesswork, sloppy lease paperwork, and a messy move-in that sets the tenancy off badly.',
    solution:
      'Province-compliant lease execution, deposits and first-month collected on signing, key handover and move-in inspection coordinated end-to-end. Rent protection and partner insurance pathways available where applicable.',
  },
]

/* ---------- Contract-required messaging (10 owner pillars) ---------- */

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
  {
    iconKey: 'Clock',
    title: 'Time-Bound Listing Promise',
    description:
      'Your unit goes live on MLS and 20+ rental portals within 72 hours of contract sign-off — photography, copy, and syndication included. If we miss that window, the engagement is yours to walk away from with zero obligation.',
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
    region: 'Canada',
    href: '/ca/ontario/',
    blurb: 'Our largest footprint - GTA, Ottawa Valley, and Southwestern Canada.',
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

      <div className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-sm sm:p-6 md:p-7">
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
      className="mx-auto my-8 h-px max-w-xs bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent sm:my-10"
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
        cta1={{ label: 'List my property', href: PORTAL_OWNER_SIGNUP_URL }}
        cta2={{ label: 'Browse rentals', href: '/properties/' }}
        aside={<HeroAside />}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Real estate professional handing house keys to a property owner"
      />

      {/* ── SECTION 2: Pain Points - IMAGE-LED CARD GRID ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FBFAF6]/40 to-white pb-20 pt-4 sm:pb-24">
        {/* Subtle decorative dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="slideFromLeft" className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              <span className="block h-px w-8 bg-brand-emerald/60" aria-hidden="true" />
              The Problem
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              The leasing{' '}
              <span className="font-display italic text-brand-emerald">aches</span> owners hit across 20+ markets
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Four friction points show up in nearly every owner conversation. Here&rsquo;s how we resolve each one — by design, not by exception.
            </p>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-8">
            {PAIN_POINTS.map((point, idx) => (
              <PainPointCard
                key={point.problem}
                index={idx}
                tag={point.tag}
                iconKey={point.iconKey}
                imageSrc={point.imageSrc}
                imageAlt={point.imageAlt}
                problem={point.problem}
                solution={point.solution}
              />
            ))}
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
              Ten commitments, written into{' '}
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
              <span className="text-white">A leasing process you can </span>
              <GradientText variant="emerald" className="font-display italic">
                actually see
              </GradientText>
              <span className="text-white">. Evenings that stay </span>
              <GradientText variant="emerald" className="font-display italic">
                yours
              </GradientText>
              <span className="text-white">.</span>
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 5: Portal Feature Strip - now image-rich with real mockups ── */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
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

          {/* Tabbed portal showcase — click a feature on the left to swap the screen on the right */}
          <RevealOnScroll variant="slideUp" duration={0.7} className="mt-14">
            <PortalShowcase />
          </RevealOnScroll>

          <div className="mt-12 text-center">
            <Link
              href="/portal-and-technology/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-emerald"
            >
              Tour the portal
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
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/55 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-8 pb-8 sm:px-12 sm:pb-10">
              <p className="font-display text-2xl font-normal italic leading-snug text-white drop-shadow-[0_2px_8px_rgba(11,29,58,0.85)] sm:text-3xl md:text-4xl">
                Listings that look as good online as the unit does in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Owner Economics - INLINE TYPOGRAPHIC TABLE (no cards) ── */}
      <section className="bg-white pb-14 sm:pb-20 md:pb-24">
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
                    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        DIY
                      </dt>
                      <dd>
                        <VerdictInline verdict={row.diy.verdict} text={row.diy.text} />
                      </dd>
                    </div>
                    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3">
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
                    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3">
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
      <section className="bg-white py-12 sm:py-16">
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

      {/* ── SECTION 9: Markets We Serve - DARK PHOTOGRAPHIC BACKDROP ── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        {/* Photographic backdrop */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=2400&q=80&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
          {/* Layered navy + gold accents for legibility and warmth */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/88 to-brand-navy/80" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/8 blur-3xl" />
        </div>

        {/* Gold hairlines top + bottom for editorial feel */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="slideFromLeft" className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-gold">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
              Coverage
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
              Markets we{' '}
              <span className="font-display italic text-brand-emerald">serve</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              20+ Canadian cities plus cross-border US coverage, with licensed brokers and on-the-ground showing teams in every region.
            </p>
          </RevealOnScroll>

          {/* Single-column editorial list — inverted for dark backdrop */}
          <div className="mt-14 divide-y divide-white/12 border-y border-white/12">
            {MARKETS.map((market, idx) => (
              <MarketRow key={market.region} index={idx}>
                <Link
                  href={market.href}
                  className="group block py-8 transition-colors duration-300 hover:bg-white/[0.03] sm:py-10"
                >
                  <div className="grid grid-cols-1 items-baseline gap-y-3 px-2 sm:grid-cols-12 sm:gap-x-8">
                    <div className="flex items-baseline gap-4 sm:col-span-5">
                      <span
                        aria-hidden="true"
                        className="font-display text-base italic text-brand-gold tabular-nums"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-3xl font-normal leading-none text-white transition-colors group-hover:text-brand-emerald sm:text-4xl md:text-5xl">
                        {market.region}
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed text-white/70 sm:col-span-7">
                      {market.blurb}
                    </p>
                  </div>
                  <p className="mt-3 px-2 text-xs uppercase tracking-wider text-white/45 sm:ml-12">
                    {market.cities}
                  </p>
                </Link>
              </MarketRow>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/locations/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              See every city we cover
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
          {
            question: 'Will I get a proper invoice and HST/GST receipt for the success fee?',
            answer:
              'Yes. The success fee is billed via a formal invoice with HST/GST itemized separately so your accountant can claim input tax credits where eligible. We can also provide a year-end summary for owners with multiple placements in a calendar year.',
          },
          {
            question: 'My condo board requires approval for new tenants. Do you handle that?',
            answer:
              'Yes. We prepare and submit the full board package on your behalf — applicant credit and reference summary, lease, ID, and any building-specific forms — and coordinate with the property manager or board administrator through approval. Common in Toronto, Mississauga, and Vancouver high-rises.',
          },
          {
            question: 'Can I specify a "no pets" or other applicant criteria?',
            answer:
              'You set the criteria. We document your preferences during onboarding — pets, smoking, occupancy limits, minimum income multiple, lease term, anything Human Rights legislation permits — and apply them consistently during screening. We flag any criteria that may raise a discrimination concern and suggest a compliant equivalent.',
          },
          {
            question: 'My current tenant is leaving. When should I list?',
            answer:
              'Ideally 30–45 days before vacancy. We can pre-market with placeholder photos and a "coming soon" listing as soon as notice is given, schedule showings to start the week the unit becomes accessible, and aim for the new tenant to move in the day after the prior lease ends. Most owners avoid even a single vacant week this way.',
          },
          {
            question: 'Can you lease my unit privately, off-MLS?',
            answer:
              'Yes — for sensitive listings (occupied units, executive relocations, builder pre-leasing), we run an off-market campaign through our internal agent network, partner relocation services, and private buyer database. Lower exposure than MLS, but useful where confidentiality matters more than maximum applicant volume.',
          },
        ]}
      />

      {/* ── FINAL CTA BANNER - the single sign-off (List my property → contact) ── */}
      <section className="relative overflow-hidden bg-brand-navy py-24 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <RevealOnScroll variant="slideUp" duration={0.7}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">
              Ready when you are
            </p>
            <h2 className="mt-6 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              List your property{' '}
              <GradientText variant="emerald" className="font-display italic">
                with us
              </GradientText>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Nothing due upfront. Standard leasing success fee on placement. Tell us about your unit and a leasing lead will be in touch within one business day.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={PORTAL_OWNER_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-emerald px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-emerald/20 transition-all hover:bg-emerald-600 hover:shadow-xl"
              >
                List my property
              </a>
              {/* "Browse rentals" CTA removed per client direction
                  (Jun 2026) — /properties/ is hidden from public surfaces. */}
            </div>
          </RevealOnScroll>
        </div>
      </section>

    </main>
  )
}
