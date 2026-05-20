'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ScrollText,
  Camera,
  Home,
  FileSearch,
  HandCoins,
  CalendarClock,
  PhoneCall,
  ShieldCheck,
  Building2,
  BadgeCheck,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Button } from '@/components/ui/button'
import { FAQBlock } from '@/components/blocks/faq-block'
import { RentCalculator } from '@/components/blocks/rent-calculator'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'

/* ─── Pricing Hero - dark photographic backdrop, split-pane copy + $0 spec ──── */

function PricingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy">
      {/* Photographic backdrop: glasses + pen + lease document */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Heavy navy/dark gradient so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/85 to-brand-navy/70" />
        {/* Subtle emerald glow accent */}
        <div className="absolute -left-32 top-1/2 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/8 blur-3xl" />
      </div>

      {/* Gold hairline top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />

      {/* Breadcrumb sits inline at the top, light over dark */}
      <div className="relative mx-auto max-w-7xl px-4 pt-8 [&_*]:text-white/60 [&_a:hover]:text-white">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Pricing', href: '/pricing/' },
          ]}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
        {/* LEFT: kicker, eyebrow, headline, lede, CTAs (content preserved verbatim) */}
        <div className="lg:col-span-7">
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-3"
          >
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
              Pricing
            </span>
          </motion.div>

          {/* Eyebrow chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1"
          >
            <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              Zero Upfront. Success-Fee Leasing.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            Pay Nothing Until We Place a{' '}
            <span className="font-display italic text-brand-emerald">Tenant</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </motion.h1>

          {/* Lede */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            MoveSmart is a full-service leasing and tenant placement company. There is no setup fee, no monthly retainer, no management percentage. You pay a single one-time success fee - typically equivalent to one month of rent - only when a qualified tenant signs the lease.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="cursor-pointer px-7 py-6 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
              nativeButton={false}
              render={<Link href="/contact/?type=owner" />}
            >
              List my property
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer border-2 border-white/20 bg-transparent px-7 py-6 text-base font-semibold text-white hover:border-white/40 hover:bg-white/5"
              nativeButton={false}
              render={<Link href="/properties/" />}
            >
              Browse rentals
            </Button>
          </motion.div>
        </div>

        {/* RIGHT: $0 / One-time spec sheet on glass */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5 lg:pl-8"
        >
          {/* Vertical gold rule on desktop */}
          <span
            aria-hidden="true"
            className="hidden lg:absolute lg:left-0 lg:top-1 lg:block lg:h-[calc(100%-0.5rem)] lg:w-px lg:bg-gradient-to-b lg:from-brand-gold/70 lg:via-brand-gold/30 lg:to-transparent"
          />

          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">
            At a glance &middot; 2026 schedule
          </p>

          {/* $0 callout */}
          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-4 inline-block font-display text-[3.5rem] italic leading-[0.95] text-white sm:text-[4.5rem]"
          >
            <span className="relative inline-block">
              $<CountUp value={0} />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-emerald-400/25 blur-2xl motion-safe:animate-pulse"
              />
            </span>
            <span className="text-brand-gold">.</span>
          </motion.p>
          <p className="mt-2 font-sans text-sm uppercase tracking-[0.18em] text-white/60">
            Due upfront. No setup, no retainer, no onboarding.
          </p>

          <p className="mt-6 font-display text-[3.5rem] italic leading-[0.95] text-white sm:text-[4.5rem]">
            One-time
            <span className="text-brand-gold">.</span>
          </p>
          <p className="mt-2 font-sans text-sm uppercase tracking-[0.18em] text-white/60">
            Leasing success fee &mdash; only when a qualified tenant signs.
          </p>

          {/* Inline fact chips */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
            <span>$<CountUp value={0} /> retainer</span>
            <span aria-hidden="true" className="text-brand-gold">/</span>
            <span>No monthly fee</span>
            <span aria-hidden="true" className="text-brand-gold">/</span>
            <span><CountUp value={0} /> hidden</span>
          </div>

          <a
            href="#fee-schedule"
            className="mt-7 inline-flex items-center gap-2 border-b border-brand-emerald/40 pb-1 font-sans text-sm font-semibold text-emerald-300 transition-colors hover:border-brand-emerald hover:text-white"
          >
            Read the full fee schedule
          </a>
        </motion.aside>
      </div>

      {/* Gold hairline bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
    </section>
  )
}

/* ─── How we charge: image-led 3-card editorial grid ────────────────────────── */

const HOW_WE_CHARGE: Array<{
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  tag: string
  highlight: string
}> = [
  {
    tag: 'Zero upfront',
    highlight: '$0',
    title: 'Nothing to engage us.',
    imageSrc:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Owner handing over keys to a new tenant on move-in day',
    body:
      'No setup fee, no onboarding fee, no monthly retainer. Photography, syndication, screening, and lease preparation are all carried by us until a tenant is in place. If we do not place a qualified tenant, we do not earn a dollar.',
  },
  {
    tag: 'One success fee',
    highlight: 'Once',
    title: 'Paid only when a lease is signed.',
    imageSrc:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Owner and tenant signing a residential lease at a table',
    body:
      'When a qualified tenant signs a lease we negotiated, you pay a single one-time success fee \u2014 typically equivalent to one month of contracted rent. Invoiced once, on placement. We are a leasing brokerage, not an ongoing manager: there is no monthly percentage, ever.',
  },
  {
    tag: 'No surprises',
    highlight: 'Nothing',
    title: 'And nothing in between.',
    imageSrc:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Bright modern living room in a recently leased condo',
    body:
      'No vendor markups. No marketing surcharges. No listing-prep surcharges. No clawbacks. Optional add-ons (Rent Protection, paid advertising beyond standard syndication) are clearly named and owner-approved. Institutional lease-up engagements are quoted per RFP. Everything else is on this page.',
  },
]

function HowWeCharge() {
  return (
    <section className="relative overflow-hidden bg-[#FBFAF6] py-20 lg:py-28">
      {/* Decorative dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold/60" />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
              &sect; 01 &middot; How we charge
            </p>
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
            One fee. Earned on
            <span className="font-display italic text-brand-emerald"> results</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-5 max-w-2xl font-serif text-base leading-relaxed text-slate-600 sm:text-lg">
            Three principles shape every engagement letter we sign. Each one is visible long before you commit a dollar.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3">
          {HOW_WE_CHARGE.map((principle, i) => (
            <HowWeChargeCard key={principle.title} index={i} {...principle} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HowWeChargeCard({
  index,
  tag,
  title,
  body,
  imageSrc,
  imageAlt,
  highlight,
}: {
  index: number
  tag: string
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  highlight: string
}) {
  const numeral = String(index + 1).padStart(2, '0')
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      {/* Hero image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 400px"
          unoptimized
        />
        {/* Navy gradient for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/15 to-transparent"
        />

        {/* Top-left numeral pill */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
          <span>{numeral}</span>
        </div>

        {/* Bottom-left tag + giant highlight word */}
        <div className="absolute inset-x-5 bottom-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            {tag}
          </p>
          <p className="mt-1 font-display text-4xl italic leading-none text-white sm:text-5xl">
            {highlight}
            <span className="text-brand-gold">.</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <h3 className="font-display text-2xl font-normal leading-snug text-brand-navy">
          {title}
        </h3>
        <p className="font-serif text-[15px] leading-[1.75] text-slate-700">{body}</p>
      </div>
    </motion.article>
  )
}

/* ─── Editorial bridge: what "zero upfront" actually means (image + list) ───── */

function ZeroUpfrontBridge() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <RevealOnScroll variant="scaleIn" duration={0.8}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-navy/10">
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80&auto=format&fit=crop"
                alt="Bright modern living room in a recently leased rental condo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
              />
            </div>
          </RevealOnScroll>

          {/* Content */}
          <RevealOnScroll variant="slideUp" duration={0.7}>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              What zero-upfront actually covers
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal leading-[1.1] text-brand-navy sm:text-4xl">
              We carry the cost of getting your unit
              <span className="font-display italic text-brand-emerald"> market-ready</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-4 font-serif text-base leading-[1.75] text-slate-700">
              Before a single dollar changes hands, we have already invested in your listing.
              Everything below is on our balance sheet until a qualified tenant signs.
            </p>

            <ul className="mt-6 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
              {[
                ['Professional photography & video', 'Camera, wide-angle lens, edited gallery.'],
                ['MLS + 40-portal syndication', 'Realtor.ca, Zumper, Zolo, Kijiji, Marketplace.'],
                ['Applicant screening & references', 'Credit, employment, income, prior-tenancy.'],
                ['Lease drafting & e-signing', 'Provincially compliant lease and addenda.'],
              ].map(([title, detail]) => (
                <li key={title} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-display text-base text-brand-navy">{title}</span>
                  <span className="hidden text-right font-serif text-xs italic text-slate-500 sm:inline">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60">
              Invoiced once &middot; only on signed lease
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

/* ─── Full-width banner: bridge between comparison and guarantees ───────────── */

function PricingBannerImage() {
  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="scaleIn" duration={0.9}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-navy/10 sm:aspect-[2/1] lg:aspect-[21/8]">
            <Image
              src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=2400&q=80"
              alt="Toronto skyline at dusk — the Canadian rental market MoveSmart leases for owners"
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-brand-navy/70 via-brand-navy/30 to-transparent"
            />
            <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
              <div className="max-w-2xl">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Built for Canadian owners
                </p>
                <p className="mt-3 font-display text-3xl font-normal italic leading-tight text-white sm:text-4xl lg:text-5xl">
                  One signed lease. One fee. <br className="hidden sm:block" />Zero monthly drag.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
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
    <section
      id="fee-schedule"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/20 py-20 lg:py-28"
    >
      {/* Soft radial gradient mesh for visual interest */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 12% 15%, rgba(16,185,129,0.10) 0%, transparent 55%), radial-gradient(ellipse at 88% 85%, rgba(212,168,83,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.6}>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-navy/55">
            &sect; 02 &middot; The fee schedule
          </p>
        </RevealOnScroll>

        {/* Headline price moment — image-backed navy band */}
        <RevealOnScroll variant="scaleIn" duration={0.9}>
          <div className="mt-6 relative overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/20 ring-1 ring-brand-navy/10">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2400&q=80&auto=format&fit=crop"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized
              />
              {/* Heavy navy gradient so text/numbers stay legible */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/88 to-brand-navy/75"
              />
              {/* Subtle emerald accent glow */}
              <div
                aria-hidden="true"
                className="absolute -left-32 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-brand-emerald/15 blur-3xl"
              />
            </div>

            {/* Content grid sits above the image */}
            <div className="relative grid grid-cols-12 items-center gap-6 px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <div className="col-span-12 lg:col-span-7">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Due upfront to engage MoveSmart
                </p>
                <p className="relative mt-3 inline-block font-display font-normal leading-[0.85] text-white text-[5rem] sm:text-[8rem] lg:text-[11rem] xl:text-[13rem]">
                  {/* Pulsing emerald glow ring behind the $0 */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-emerald-400/25 blur-3xl motion-safe:animate-pulse"
                  />
                  $<CountUp value={0} />
                  <span className="text-brand-gold">.</span>
                </p>
              </div>
              <div className="col-span-12 lg:col-span-5">
                <RevealOnScroll variant="slideUp" duration={0.7} delay={0.2}>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">
                    Always
                  </p>
                  <p className="mt-3 font-serif text-base leading-[1.7] text-white/85">
                    You pay nothing to engage MoveSmart. The only fee on a standard leasing engagement
                    is a one-time success fee, charged when a qualified tenant signs the lease &mdash;
                    typically one month rent equivalent.
                  </p>
                  <a
                    href="/contact/?type=owner"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-emerald px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-xl"
                  >
                    Get a free rental analysis
                  </a>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </RevealOnScroll>

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

/* ─── How our pricing compares: 2-column with property image ────────────────── */

function PricingComparesVisual() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: text block */}
          <div className="lg:col-span-6">
            <RevealOnScroll variant="slideUp" duration={0.7}>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-emerald">
                How our pricing compares
              </p>
              <h2 className="mt-3 font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
                One success fee.
                <span className="font-display italic text-brand-emerald"> No monthly drag</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 font-serif text-base leading-[1.75] text-slate-700 sm:text-[17px]">
                Traditional property managers charge a monthly percentage for the life of the
                tenancy &mdash; that adds up to a multiple of our one-time success fee over a
                typical two-year hold. We&rsquo;re paid once, on placement, then we step back.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Single fee, invoiced once on a signed lease',
                  'No monthly retainer for the life of the tenancy',
                  'No vendor markups, no setup or onboarding charges',
                  'Tenant Replacement Guarantee included for six months',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <BadgeCheck
                      className="mt-0.5 size-5 shrink-0 text-brand-emerald"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="font-serif text-base leading-relaxed text-slate-700">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          {/* Right: image of a modern condo */}
          <div className="lg:col-span-6">
            <RevealOnScroll variant="scaleIn" duration={0.8}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-brand-navy/10">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80"
                  alt="Modern multi-unit residential building exterior"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                {/* Editorial overlay rule */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
                />
                {/* Caption pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-lg bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
                  <p className="font-display text-base italic leading-tight text-brand-navy">
                    Built for owners of a single condo &mdash; or a 40-unit portfolio.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Outcome guarantee illustration band ───────────────────────────────────── */

function OutcomeGuaranteeBand() {
  return (
    <section className="bg-[#FBFAF6] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: supporting image — signed lease / handshake */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <RevealOnScroll variant="scaleIn" duration={0.8}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-brand-navy/10">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80"
                  alt="Owner and tenant signing a residential lease at a table"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: outcome guarantee block */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <RevealOnScroll variant="slideUp" duration={0.7}>
              <div className="flex items-center gap-3">
                <BadgeCheck
                  className="size-10 text-brand-emerald"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-emerald">
                  Outcome guarantee
                </p>
              </div>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] text-brand-navy sm:text-5xl">
                If we don&rsquo;t place a qualified tenant, you don&rsquo;t
                <span className="font-display italic text-brand-emerald"> pay a dollar</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 font-serif text-base leading-[1.75] text-slate-700 sm:text-[17px]">
                Our model is contractually risk-shifted. Every cost we carry &mdash; photography,
                syndication, screening, lease prep &mdash; is on our balance sheet until your unit
                is leased. No clawbacks, no kill-fee, no time-and-materials hidden in a footer.
              </p>
              <p className="mt-4 font-serif text-base leading-[1.75] text-slate-700 sm:text-[17px]">
                We back it with the paperwork: a Tenant Replacement Guarantee for the first six
                months and a No-Placement, No-Fee Promise written into every engagement letter.
              </p>
            </RevealOnScroll>
          </div>
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
      {/* 1. Hero - dark photographic backdrop with split-pane $0 / One-time spec */}
      <PricingHero />

      {/* 2. How we charge - numbered editorial paragraphs */}
      <HowWeCharge />

      {/* 2b. Editorial bridge: what zero-upfront actually covers (NEW image) */}
      <ZeroUpfrontBridge />

      {/* 3. Headline price + magazine fee schedule */}
      <HeadlinePriceStatement />

      {/* 3b. How pricing compares - 2-column visual with property image */}
      <PricingComparesVisual />

      {/* 4. Transparency table */}
      <TransparencyTable />

      {/* 4b. Outcome guarantee illustration band */}
      <OutcomeGuaranteeBand />

      {/* 5. Rent calculator (existing component) */}
      <RentCalculator />

      {/* 6. Full-width editorial banner (NEW image) */}
      <PricingBannerImage />

      {/* 7. Money-back & guarantees - vertical numbered notes */}
      <GuaranteesPanel />

      {/* 8. Testimonials */}
      <PricingTestimonials />

      {/* 9. FAQ */}
      <FAQBlock questions={PRICING_FAQS} title={'Pricing & Fees - Frequently Asked'} showQuestionsCta={false} />
    </main>
  )
}
