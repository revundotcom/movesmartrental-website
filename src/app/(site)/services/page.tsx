import type { Metadata } from 'next'
import Link from 'next/link'
import {
  TrendingUp,
  Megaphone,
  CalendarCheck,
  Handshake,
  ShieldCheck,
  Umbrella,
  FileSignature,
  KeyRound,
  Building2,
  ArrowRight,
  Check,
  type LucideIcon,
} from 'lucide-react'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { BRAND } from '@/lib/brand-constants'

export const metadata: Metadata = {
  title: 'Leasing Brokerage Services | MoveSmart Rentals Canada',
  description:
    'White-glove leasing execution for individual landlords and institutional operators - strategic pricing, professional marketing, tenant qualification, and lease execution. No upfront fees, success-based pricing.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Leasing Brokerage Services | MoveSmart Rentals Canada',
    description:
      'Nine end-to-end leasing services - from pricing strategy to move-in coordination - for landlords, PMCs, builders, and purpose-built rental operators.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage Services | MoveSmart Rentals Canada',
    description:
      'Strategic, concierge-grade leasing execution for individual landlords and institutional operators across Canada.',
  },
}

/* ──────────────────────────────────────────────────────────────────
 * The 9 leasing-execution services (per brand brief).
 * MoveSmart Rentals is a leasing brokerage - NOT a property
 * management company. No rent collection, no ongoing maintenance,
 * no LTB/eviction filing, no monthly statements.
 * ────────────────────────────────────────────────────────────────── */

type Service = {
  number: string
  title: string
  intent: string
  scope: string[]
  icon: LucideIcon
  audience: 'individual' | 'institutional' | 'both'
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Strategic Rental Pricing',
    intent: 'Set the right price the first time - not after two weeks of silence.',
    icon: TrendingUp,
    audience: 'both',
    scope: [
      'Live market analysis against active and recently-leased comparables',
      'Vacancy trend review for the building, neighbourhood, and submarket',
      'Pricing strategy discussion with you - aggressive fill vs. premium positioning',
      'Written pricing rationale you can reference at renewal',
    ],
  },
  {
    number: '02',
    title: 'Professional Marketing Execution',
    intent: 'Magazine-grade marketing that earns the asking rent.',
    icon: Megaphone,
    audience: 'both',
    scope: [
      'Wide-angle professional photography, virtual tours, and floor plans',
      'Listing copy written for both renter appeal and search visibility',
      'MLS listing plus syndication to every major Canadian rental portal',
      'One-time pre-listing prep coordination - paint touch-ups, deep clean, staging, light handyman, landscaping refresh',
      'Social media placement and targeted paid ad campaigns where suitable',
    ],
  },
  {
    number: '03',
    title: 'Showing Coordination',
    intent: 'Every qualified prospect through the door - without the calendar drain.',
    icon: CalendarCheck,
    audience: 'both',
    scope: [
      'Inquiry triage, scheduling, and confirmation handling',
      'Agent-led private showings with pre-screened prospects',
      'Open-house coordination for high-traffic units and weekends',
      'Developer lease-up tour blocks for purpose-built rental and pre-construction',
    ],
  },
  {
    number: '04',
    title: 'Offer Management',
    intent: 'A clean process from first interest to mutual agreement.',
    icon: Handshake,
    audience: 'both',
    scope: [
      'Application collection and standardised intake from every applicant',
      'Offer review and side-by-side comparison framing for your decision',
      'Negotiation support on rent, term, deposit, and inclusions',
      'Counter-offer drafting and back-and-forth management',
    ],
  },
  {
    number: '05',
    title: 'Tenant Qualification',
    intent: 'A defensible "yes" - or a documented "no" - on every applicant.',
    icon: ShieldCheck,
    audience: 'both',
    scope: [
      'Credit checks through accredited bureaus',
      'Income verification with paystubs, NOAs, and bank statements',
      'Employment verification and direct employer outreach',
      'Reference verification with current and prior landlords',
      'Risk assessment summary plus provincial compliance checks',
    ],
  },
  {
    number: '06',
    title: 'Rental Protection Options',
    intent: 'Optional partner pathways that put a floor under your rental income.',
    icon: Umbrella,
    audience: 'both',
    scope: [
      'Guaranteed rental income insurance through vetted partners',
      'Tenant insurance coordination as a lease condition',
      'Financial qualification validation against partner underwriting standards',
      'Plain-English explanation of coverage, exclusions, and claim mechanics',
    ],
  },
  {
    number: '07',
    title: 'Lease Execution',
    intent: 'A compliant, signed lease - with the deposit in trust.',
    icon: FileSignature,
    audience: 'both',
    scope: [
      'Lease preparation on province-specific, current-form templates',
      'Digital signing through audited e-signature workflow',
      'Compliance confirmation against provincial residential tenancy rules',
      'First-and-last or last-month deposit collection and trust handling',
    ],
  },
  {
    number: '08',
    title: 'Move-In Coordination',
    intent: 'A documented hand-over your future self will thank you for.',
    icon: KeyRound,
    audience: 'both',
    scope: [
      'Utility transfer coordination with the tenant',
      'Tenant insurance certificate confirmation before key release',
      'Key release scheduling at the unit or a secure pickup point',
      'Move-in inspection with full condition documentation',
      'Photo verification report archived for your records and any future dispute',
    ],
  },
  {
    number: '09',
    title: 'Institutional Lease-Up Services',
    intent: 'Bulk leasing infrastructure for builders, PMCs, and purpose-built operators.',
    icon: Building2,
    audience: 'institutional',
    scope: [
      'Bulk unit onboarding and asset-level data ingestion',
      'Campaign strategy across pre-leasing, soft launch, and stabilization',
      'Dedicated leasing team deployment - on-site or remote, single point of contact',
      'Live reporting dashboards with funnel, conversion, and absorption metrics',
      'Vacancy and lease-up performance tracking against pro-forma',
      'Structured rollout timelines aligned to occupancy permit and turnover schedules',
    ],
  },
]

const INDIVIDUAL_SERVICES = SERVICES.filter((s) => s.audience !== 'institutional')
const INSTITUTIONAL_SERVICE = SERVICES.find((s) => s.audience === 'institutional')!

/* ──────────────────────────────────────────────────────────────────
 * FAQ - fee model and scope clarifications
 * ────────────────────────────────────────────────────────────────── */

const SERVICE_FAQ = [
  {
    question: 'How are you priced - and what does "no monthly percentage" mean?',
    answer:
      'There is zero upfront cost and zero ongoing monthly percentage. We earn a one-time success fee only when a qualified tenant is placed and the lease is signed. If we do not place a tenant, you pay nothing. Institutional lease-up engagements are scoped per project with transparent line-item pricing.',
  },
  {
    question: 'Are you a property manager?',
    answer:
      'No. MoveSmart Rentals is a white-glove leasing brokerage. Our scope is the leasing lifecycle - pricing, marketing, showings, qualification, lease execution, and move-in. We do not collect monthly rent, dispatch maintenance, file LTB notices, or issue year-end tax statements. If you need ongoing management, we can refer trusted partners.',
  },
  {
    question: 'What exactly is included in a placement?',
    answer:
      'Strategic pricing, professional marketing, listing distribution, showing coordination, applicant qualification, lease drafting and signing, deposit collection, and a documented move-in inspection. Optional add-ons include rental protection insurance referrals and one-time pre-listing prep work.',
  },
  {
    question: 'Do you work with builders, PMCs, and purpose-built rental operators?',
    answer:
      'Yes. Institutional Lease-Up is a dedicated practice. We deploy leasing teams, run pre-leasing campaigns, report on funnel and absorption against pro-forma, and align timelines to occupancy and turnover schedules. Engagements typically begin 60-120 days before first occupancy.',
  },
  {
    question: 'Do you handle ongoing maintenance, rent collection, or evictions?',
    answer:
      'No. Those sit outside leasing-execution scope. We focus exclusively on placing the right tenant on the right lease - so the asset is set up cleanly. For ongoing operations we maintain a referral list of trusted property management partners.',
  },
  {
    question: 'Can I choose only some of the nine services?',
    answer:
      'For individual landlords the services run as one continuous workflow - they are designed to interlock. For institutional engagements we scope modular packages: marketing-only, qualification-only, or full lease-up.',
  },
  {
    question: 'How do you protect owners during qualification?',
    answer:
      'Every applicant goes through credit, income, employment, and reference verification, plus a written risk summary and provincial compliance check. You receive a defensible record for every approval and decline.',
  },
  {
    question: 'What does "Rental Protection Options" actually cover?',
    answer:
      'It is a partner pathway, not an in-house insurance product. We coordinate guaranteed-rent insurance, tenant insurance as a lease condition, and validate applicants against partner underwriting standards. Coverage, premiums, and claim mechanics sit with the carrier.',
  },
]

/* ──────────────────────────────────────────────────────────────────
 * Service card - reused across both audience sections
 * ────────────────────────────────────────────────────────────────── */

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-brand-navy/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-lg">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-px w-16 bg-gradient-to-l from-brand-gold to-transparent"
      />
      <div className="flex items-start justify-between">
        <div className="inline-flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-brand-emerald transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <span className="font-mono text-[11px] font-semibold tracking-wider text-brand-navy/35">
          {service.number}
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-normal leading-snug text-brand-navy">
        {service.title}
        <span aria-hidden="true" className="text-brand-gold">.</span>
      </h3>
      <p className="mt-2 text-sm italic leading-relaxed text-brand-emerald/90">
        {service.intent}
      </p>
      <ul className="mt-5 space-y-2.5 border-t border-brand-navy/5 pt-5">
        {service.scope.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
            <Check
              className="mt-0.5 size-4 shrink-0 text-brand-emerald"
              aria-hidden="true"
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function ServicesPage() {
  /* ── JSON-LD: each service as Service entity for SEO/AEO ── */
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MoveSmart Rentals Leasing Services',
    description:
      'Nine end-to-end leasing services for Canadian landlords and institutional rental operators.',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.intent,
        provider: {
          '@type': 'Organization',
          name: BRAND.name,
          url: BRAND.url,
        },
        areaServed: 'CA',
      },
    })),
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SERVICE_FAQ.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  /* ── Hero aside: dual-audience card ── */
  const heroAside = (
    <div className="relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-px w-24 bg-gradient-to-l from-brand-gold to-transparent"
      />
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
        Who we serve
      </p>
      <h2 className="mt-2 font-display text-xl font-normal text-brand-navy">
        Two audiences, one playbook
        <span aria-hidden="true" className="text-brand-gold">.</span>
      </h2>
      <div className="mt-5 space-y-4">
        <a
          href="#for-landlords"
          className="group block rounded-xl border border-brand-navy/10 bg-[#FBFAF6] p-4 transition-colors hover:border-brand-emerald/40"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-emerald">
            For individual landlords
          </p>
          <p className="mt-1.5 text-sm font-medium text-brand-navy group-hover:underline group-hover:decoration-brand-gold group-hover:underline-offset-4">
            One unit or a small portfolio - placed concierge-style.
          </p>
        </a>
        <a
          href="#for-institutional"
          className="group block rounded-xl border border-brand-navy/10 bg-[#FBFAF6] p-4 transition-colors hover:border-brand-emerald/40"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-emerald">
            For builders, PMCs &amp; operators
          </p>
          <p className="mt-1.5 text-sm font-medium text-brand-navy group-hover:underline group-hover:decoration-brand-gold group-hover:underline-offset-4">
            Bulk lease-up infrastructure with reporting against pro-forma.
          </p>
        </a>
      </div>
      <p className="mt-5 border-t border-brand-navy/10 pt-4 text-[11px] leading-relaxed text-slate-500">
        Zero upfront. Zero monthly percentage. Success-based fee on placement.
      </p>
    </div>
  )

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
          ]}
        />
      </div>

      {/* ── 1. Editorial page hero ── */}
      <PageHeroBlock
        kicker="Services"
        eyebrow="White-Glove Leasing Brokerage"
        headline="Nine services. One leased unit."
        accentLastWord={false}
        lede="From pricing strategy to move-in inspection, MoveSmart Rentals runs the leasing lifecycle end to end - so individual landlords get peace of mind, and institutional operators get a leasing team that scales with them."
        cta1={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
        cta2={{ label: 'Book a Call', href: '/contact/?type=owner&intent=call' }}
        aside={heroAside}
      />

      {/* ── 2. For individual landlords - 8 service cards ── */}
      <section id="for-landlords" className="scroll-mt-24 bg-[#FBFAF6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                For individual landlords
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Concierge leasing,{' '}
                <span className="font-display italic text-brand-emerald">end to end</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Eight interlocking services that take your unit from listed to leased -
                with documented decisions at every stage and a defensible paper trail
                for everything that matters.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INDIVIDUAL_SERVICES.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CTA strip ── */}
      <section className="bg-brand-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Ready when you are
              </p>
              <h2 className="mt-2 font-display text-2xl font-normal text-white sm:text-3xl">
                Get a market read on your unit{' '}
                <span className="font-display italic text-emerald-300">this week</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                No upfront cost. No monthly percentage. A success fee only when a
                qualified tenant signs.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/?type=owner"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-px hover:bg-emerald-500 hover:shadow-lg"
              >
                Create a Free Account
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact/?type=owner&intent=call"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. For institutional operators ── */}
      <section id="for-institutional" className="scroll-mt-24 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                For builders, PMCs &amp; purpose-built operators
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Institutional{' '}
                <span className="font-display italic text-brand-emerald">lease-up</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                When it is not one unit but eighty, one hundred, or a tower at a time -
                we deploy a dedicated leasing team, run pre-leasing campaigns, and report
                live against your pro-forma.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Big feature card */}
              <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1929] via-[#0b2240] to-[#062318] p-8 shadow-lg lg:col-span-7 lg:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-emerald-500/15 blur-3xl"
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex size-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                      <Building2 className="size-6" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-white/40">
                      {INSTITUTIONAL_SERVICE.number}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-normal text-white sm:text-4xl">
                    {INSTITUTIONAL_SERVICE.title}
                    <span aria-hidden="true" className="text-brand-gold">.</span>
                  </h3>
                  <p className="mt-3 text-base italic leading-relaxed text-emerald-300/90">
                    {INSTITUTIONAL_SERVICE.intent}
                  </p>
                  <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {INSTITUTIONAL_SERVICE.scope.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-white/75"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-emerald-400"
                          aria-hidden="true"
                          strokeWidth={2.5}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* Side: who it's for + CTA */}
              <aside className="flex flex-col gap-5 lg:col-span-5">
                <div className="rounded-2xl border border-brand-navy/10 bg-[#FBFAF6] p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
                    Built for
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-brand-navy">
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-emerald" strokeWidth={2.5} aria-hidden="true" />
                      <span>Builders &amp; developers nearing first occupancy</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-emerald" strokeWidth={2.5} aria-hidden="true" />
                      <span>Property management companies expanding leasing capacity</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-emerald" strokeWidth={2.5} aria-hidden="true" />
                      <span>Purpose-built rental operators stabilising new assets</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-emerald" strokeWidth={2.5} aria-hidden="true" />
                      <span>Portfolio owners with multi-unit absorption windows</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-brand-emerald/30 bg-emerald-50/60 p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                    Engagement model
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy">
                    Project-scoped pricing. Dedicated leasing lead. Live reporting
                    dashboards. Engagements typically begin 60-120 days before first
                    occupancy.
                  </p>
                  <Link
                    href="/contact/?type=owner&intent=call"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-emerald hover:underline hover:decoration-brand-gold hover:underline-offset-4"
                  >
                    Talk to our lease-up team
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <div id="faq" className="scroll-mt-24">
        <FAQBlock
          questions={SERVICE_FAQ}
          title="Questions about scope and pricing"
        />
      </div>

      {/* ── 6. Final CTA banner ── */}
      <CTABannerBlock
        headline="Hand the leasing playbook off."
        description="Create a free account or book a 20-minute call. We will pull live market rent for your unit and walk you through the nine-service workflow - no obligation."
        primaryCta={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/?type=owner&intent=call' }}
      />
    </main>
  )
}
