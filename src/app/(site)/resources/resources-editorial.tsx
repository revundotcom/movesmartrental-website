'use client'

import Link from 'next/link'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

// ─────────────────────────────────────────────────────────────
// Types (mirrored from server page to keep coupling explicit)
// ─────────────────────────────────────────────────────────────

export interface EditorialArticle {
  title: string
  slug: string
  category?: string
  excerpt?: string
  author?: string
  publishedAt?: string
  cityTitle?: string
  readTime?: number
}

interface ResourcesEditorialProps {
  featured: EditorialArticle | null
  recent: EditorialArticle[]
  counts: {
    articles: number
    guides: number
    reports: number
  }
}

// ─────────────────────────────────────────────────────────────
// Category pillars (contract §20.13 - four audiences)
// ─────────────────────────────────────────────────────────────

interface Pillar {
  eyebrow: string
  title: string
  italicWord: string
  blurb: string
  bullets: string[]
  href: string
  ctaLabel: string
}

const PILLARS: Pillar[] = [
  {
    eyebrow: 'For Landlords',
    title: 'Owner',
    italicWord: 'playbooks',
    blurb:
      'Pricing, screening, lease drafting, and the paperwork habits that keep files out of the tribunal.',
    bullets: [
      'How to Find Tenants (city-specific)',
      'Tenant Screening Guide',
      'How to Price Your Rental',
      'How to Avoid Bad Tenants',
      'Eviction Guide (with partner legal counsel)',
      'Landlord FAQ',
    ],
    href: '#guides-landlord',
    ctaLabel: 'See landlord guides',
  },
  {
    eyebrow: 'For Tenants',
    title: 'Tenant',
    italicWord: 'handbooks',
    blurb:
      'Everything renters need to secure a home - applications, insurance, co-signers, and a calm move-in.',
    bullets: [
      'Tenant FAQ',
      'Tenant Insurance Guide',
      'Guarantor / Co-Signer Guide',
      'Moving Guide',
      'Application Walkthrough',
    ],
    href: '#guides-tenant',
    ctaLabel: 'See tenant guides',
  },
  {
    eyebrow: 'For Developers',
    title: 'Institutional',
    italicWord: 'playbooks',
    blurb:
      'Lease-up strategy for purpose-built rentals - from pre-marketing to stabilization.',
    bullets: [
      'Lease-Up Playbook for New Buildings',
      'Institutional RFP Checklist',
      'Purpose-Built Rental Marketing Strategy',
      'Vacancy Performance Benchmarks',
    ],
    href: '#guides-institutional',
    ctaLabel: 'See institutional guides',
  },
  {
    eyebrow: 'Market Reports',
    title: 'Market',
    italicWord: 'intelligence',
    blurb:
      'Quarterly and city-level reports covering vacancy, asking rents, concessions, and absorption.',
    bullets: [
      'Quarterly Ontario Rental Market Report',
      'Market Snapshot: Toronto',
      'Market Snapshot: Mississauga',
      'Market Snapshot: Ottawa',
      'Market Snapshot: Vancouver',
      'Market Snapshot: Miami',
    ],
    href: '#guides-reports',
    ctaLabel: 'See market reports',
  },
]

// ─────────────────────────────────────────────────────────────
// Featured guides (6-8 high-intent cards)
// TODO(phase-3): publish each slug as a Sanity guide so the
// /resources/[slug]/ route renders the long-form content.
// ─────────────────────────────────────────────────────────────

interface FeaturedGuide {
  tag: string
  title: string
  excerpt: string
  slug: string
  readMinutes: number
}

const FEATURED_GUIDES: FeaturedGuide[] = [
  {
    tag: 'Landlord',
    title: 'Tenant Screening Guide for Ontario Landlords',
    excerpt:
      'Credit, employment, references, and the two questions that catch most problem applicants before they sign.',
    // TODO(phase-3): publish tenant-screening-ontario-landlords
    slug: 'tenant-screening-ontario-landlords',
    readMinutes: 9,
  },
  {
    tag: 'Landlord',
    title: 'How to Price Your Rental in 2026',
    excerpt:
      'A framework that balances CMHC benchmarks, live comps, and concession realities so a unit leases in under three weeks.',
    // TODO(phase-3): publish how-to-price-your-rental-2026
    slug: 'how-to-price-your-rental-2026',
    readMinutes: 7,
  },
  {
    tag: 'Landlord',
    title: 'Rent Guarantee 101: What It Covers',
    excerpt:
      'How rent guarantee products work, what they do and do not cover, and when they are worth the premium.',
    // TODO(phase-3): publish rent-guarantee-101
    slug: 'rent-guarantee-101',
    readMinutes: 5,
  },
  {
    tag: 'Institutional',
    title: 'Lease-Up Playbook: The First 30 Days',
    excerpt:
      'Pre-marketing, leasing-office staffing, incentive calibration, and the reporting cadence stabilization demands.',
    // TODO(phase-3): publish lease-up-playbook-first-30-days
    slug: 'lease-up-playbook-first-30-days',
    readMinutes: 10,
  },
  {
    tag: 'Landlord',
    title: 'How to Avoid Bad Tenants: The 12-Point Checklist',
    excerpt:
      'The twelve disqualifying patterns we flag during screening, and how to verify each without tripping human-rights legislation.',
    // TODO(phase-3): publish how-to-avoid-bad-tenants
    slug: 'how-to-avoid-bad-tenants',
    readMinutes: 8,
  },
  {
    tag: 'Institutional',
    title: 'Institutional RFP Template for Purpose-Built Rentals',
    excerpt:
      'A copy-and-edit RFP scope covering marketing, leasing, and handover - the document developers keep asking us for.',
    // TODO(phase-3): publish institutional-rfp-template
    slug: 'institutional-rfp-template',
    readMinutes: 6,
  },
  {
    tag: 'Tenant',
    title: 'Tenant Insurance Requirements by Province',
    excerpt:
      'What most leases require, what insurers actually pay out, and the coverage figures worth negotiating.',
    // TODO(phase-3): publish tenant-insurance-by-province
    slug: 'tenant-insurance-by-province',
    readMinutes: 6,
  },
  {
    tag: 'Tenant',
    title: 'Moving Day Coordination Guide (Tenant Edition)',
    excerpt:
      'Booking elevators, utilities, insurance, and the inspection walkthrough - the timeline we share with every new tenant.',
    // TODO(phase-3): publish moving-day-coordination-tenant
    slug: 'moving-day-coordination-tenant',
    readMinutes: 5,
  },
]

// ─────────────────────────────────────────────────────────────
// Category-specific guide indexes (list views under each pillar)
// ─────────────────────────────────────────────────────────────

interface GuideLink {
  title: string
  slug: string
  note?: string
}

const LANDLORD_GUIDES: GuideLink[] = [
  {
    title: 'How to Find Tenants',
    // TODO(phase-3): publish how-to-find-tenants with per-city variants
    slug: 'how-to-find-tenants',
    note: 'City-specific variants available',
  },
  {
    title: 'Tenant Screening Guide',
    // TODO(phase-3): publish tenant-screening-ontario-landlords
    slug: 'tenant-screening-ontario-landlords',
  },
  {
    title: 'Rental Market Guide',
    // TODO(phase-3): publish rental-market-guide
    slug: 'rental-market-guide',
  },
  {
    title: 'Eviction Guide',
    // TODO(phase-3): publish eviction-guide-ontario
    slug: 'eviction-guide-ontario',
    note: 'Published with partner legal counsel - not a service we provide',
  },
  {
    title: 'How to Price Your Rental',
    // TODO(phase-3): publish how-to-price-your-rental-2026
    slug: 'how-to-price-your-rental-2026',
  },
  {
    title: 'How to Avoid Bad Tenants',
    // TODO(phase-3): publish how-to-avoid-bad-tenants
    slug: 'how-to-avoid-bad-tenants',
  },
  {
    title: 'Landlord FAQ',
    // TODO(phase-3): publish landlord-faq
    slug: 'landlord-faq',
  },
]

const TENANT_GUIDES: GuideLink[] = [
  {
    title: 'Tenant FAQ',
    // TODO(phase-3): publish tenant-faq
    slug: 'tenant-faq',
  },
  {
    title: 'Tenant Insurance Guide',
    // TODO(phase-3): publish tenant-insurance-by-province
    slug: 'tenant-insurance-by-province',
  },
  {
    title: 'Guarantor / Co-Signer Guide',
    // TODO(phase-3): publish guarantor-co-signer-guide
    slug: 'guarantor-co-signer-guide',
  },
  {
    title: 'Moving Guide',
    // TODO(phase-3): publish moving-day-coordination-tenant
    slug: 'moving-day-coordination-tenant',
  },
  {
    title: 'Application Walkthrough',
    // TODO(phase-3): publish tenant-application-walkthrough
    slug: 'tenant-application-walkthrough',
  },
]

const INSTITUTIONAL_GUIDES: GuideLink[] = [
  {
    title: 'Lease-Up Playbook for New Buildings',
    // TODO(phase-3): publish lease-up-playbook-first-30-days
    slug: 'lease-up-playbook-first-30-days',
  },
  {
    title: 'Institutional RFP Checklist',
    // TODO(phase-3): publish institutional-rfp-template
    slug: 'institutional-rfp-template',
  },
  {
    title: 'Purpose-Built Rental Marketing Strategy',
    // TODO(phase-3): publish purpose-built-rental-marketing
    slug: 'purpose-built-rental-marketing',
  },
  {
    title: 'Vacancy Performance Benchmarks',
    // TODO(phase-3): publish vacancy-performance-benchmarks
    slug: 'vacancy-performance-benchmarks',
  },
]

const MARKET_REPORTS: GuideLink[] = [
  {
    title: 'Quarterly Ontario Rental Market Report',
    // TODO(phase-3): publish quarterly-ontario-rental-report
    slug: 'quarterly-ontario-rental-report',
    note: 'Series - updated four times a year',
  },
  {
    title: 'Market Snapshot: Toronto',
    // TODO(phase-3): publish market-snapshot-toronto
    slug: 'market-snapshot-toronto',
  },
  {
    title: 'Market Snapshot: Mississauga',
    // TODO(phase-3): publish market-snapshot-mississauga
    slug: 'market-snapshot-mississauga',
  },
  {
    title: 'Market Snapshot: Ottawa',
    // TODO(phase-3): publish market-snapshot-ottawa
    slug: 'market-snapshot-ottawa',
  },
  {
    title: 'Market Snapshot: Vancouver',
    // TODO(phase-3): publish market-snapshot-vancouver
    slug: 'market-snapshot-vancouver',
  },
  {
    title: 'Market Snapshot: Miami',
    // TODO(phase-3): publish market-snapshot-miami
    slug: 'market-snapshot-miami',
  },
]

// ─────────────────────────────────────────────────────────────
// FAQ (5-6 questions)
// ─────────────────────────────────────────────────────────────

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Are these guides free?',
    a: 'Yes. Every guide, checklist, and market report on this site is free to read. No paywall, no email gate on the content itself, no lead-form gymnastics. We publish our documented process because transparency is the differentiator.',
  },
  {
    q: 'How often are the guides updated?',
    a: 'Legal guides are reviewed whenever the governing statute or tribunal rule changes. Market reports refresh each quarter. Evergreen operational guides (pricing, screening, moving) get a full audit once a year, with in-line corrections any time a reader flags a stale detail.',
  },
  {
    q: 'Can I republish or cite these guides?',
    a: 'Short excerpts with attribution and a link back to the original page are fine. For longer reproductions, reach out and we will confirm in writing - our only requirement is that the attribution remains visible and the text stays unedited.',
  },
  {
    q: 'Do you produce custom guides for institutional clients?',
    a: 'Yes. For developers and asset managers, we prepare tailored lease-up playbooks, RFP responses, and concession-strategy memos specific to the asset. That work is part of an engagement - the public guides here reflect the documented process behind it.',
  },
  {
    q: 'Who writes these guides?',
    a: 'Our leasing team writes the operational content. Legal guides are reviewed by outside counsel before publication. Market reports are compiled from CMHC, Statistics Canada, MLS data, and our own leasing file - with sources cited in every report.',
  },
  {
    q: 'How do I request a guide on a topic that is not covered?',
    a: 'Email the team or use the contact form. If a question comes in more than a handful of times, it becomes a guide. Several of the pages linked above started exactly that way.',
  },
]

// ─────────────────────────────────────────────────────────────
// Pillar cards
// ─────────────────────────────────────────────────────────────

function PillarGrid() {
  return (
    <section
      id="pillars"
      className="relative bg-white py-20 sm:py-24"
      aria-label="Guide categories"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            The library
          </p>
          <h2 className="mb-12 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
            Four audiences,{' '}
            <span className="italic text-brand-emerald">one discipline</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <RevealOnScroll key={p.eyebrow} variant="fade" duration={0.6}>
              <div className="flex h-full flex-col border-t border-brand-navy/15 pt-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                  {p.eyebrow}
                </p>
                <h3 className="font-display text-2xl font-normal leading-tight text-brand-navy">
                  {p.title}{' '}
                  <span className="italic text-brand-emerald">
                    {p.italicWord}
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {p.blurb}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] inline-block h-1 w-1 shrink-0 bg-brand-emerald"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5">
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1 border-b-2 border-brand-emerald pb-1 font-display text-base italic text-brand-emerald transition-colors hover:border-brand-navy hover:text-brand-navy"
                  >
                    {p.ctaLabel}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Featured guides - 6-8 high-intent cards
// ─────────────────────────────────────────────────────────────

function FeaturedGuides() {
  return (
    <section
      id="featured"
      className="bg-[#FBFAF6] py-20 sm:py-24"
      aria-label="Featured guides"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-brand-navy/15 pb-4">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Start here
              </p>
              <h2 className="font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                Featured{' '}
                <span className="italic text-brand-emerald">guides</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              The published process - documented so you can see exactly what
              serious leasing execution looks like before you hire anyone.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_GUIDES.map((g) => (
            <RevealOnScroll key={g.slug} variant="fade" duration={0.6}>
              <article className="flex h-full flex-col border-t border-brand-navy/15 pt-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                  {g.tag}
                </p>
                <h3 className="font-display text-xl font-normal leading-snug text-brand-navy">
                  <Link
                    href={`/resources/${g.slug}/`}
                    className="transition-colors hover:text-brand-emerald"
                  >
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {g.excerpt}
                </p>
                <p className="mt-5 text-xs uppercase tracking-wider text-slate-500">
                  {g.readMinutes} min read
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Category guide indexes (anchor targets for pillar CTAs)
// ─────────────────────────────────────────────────────────────

function CategoryIndex({
  id,
  eyebrow,
  title,
  italicWord,
  intro,
  guides,
}: {
  id: string
  eyebrow: string
  title: string
  italicWord: string
  intro: string
  guides: GuideLink[]
}) {
  return (
    <section id={id} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll variant="fade" duration={0.6}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {eyebrow}
          </p>
          <h3 className="font-display text-2xl font-normal text-brand-navy sm:text-3xl">
            {title}{' '}
            <span className="italic text-brand-emerald">{italicWord}</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            {intro}
          </p>
        </RevealOnScroll>

        <ul className="mt-8 divide-y divide-brand-navy/10 border-t border-brand-navy/15">
          {guides.map((g) => (
            <li key={g.slug} className="py-4">
              <Link
                href={`/resources/${g.slug}/`}
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
              >
                <span className="font-display text-lg font-normal text-brand-navy transition-colors group-hover:text-brand-emerald">
                  {g.title}
                </span>
                {g.note && (
                  <span className="text-xs italic text-slate-500">
                    {g.note}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CategoryIndexes() {
  return (
    <>
      <CategoryIndex
        id="guides-landlord"
        eyebrow="For Landlords"
        title="Owner"
        italicWord="library"
        intro="The operational documents we hand our own files - pricing frameworks, screening SOPs, and the paperwork habits that keep an owner out of the tribunal."
        guides={LANDLORD_GUIDES}
      />
      <CategoryIndex
        id="guides-tenant"
        eyebrow="For Tenants"
        title="Tenant"
        italicWord="library"
        intro="Practical guides for renters - what a strong application looks like, how guarantors work, what tenant insurance actually covers, and how to plan a calm move-in."
        guides={TENANT_GUIDES}
      />
      <CategoryIndex
        id="guides-institutional"
        eyebrow="For Developers"
        title="Institutional"
        italicWord="library"
        intro="Lease-up playbooks, RFP templates, and marketing strategies for purpose-built rental developers and asset managers stabilizing new inventory."
        guides={INSTITUTIONAL_GUIDES}
      />
      <CategoryIndex
        id="guides-reports"
        eyebrow="Market Reports"
        title="Market"
        italicWord="reports"
        intro="Quarterly province-level reports and city-level snapshots covering vacancy, asking rents, concessions, and absorption - with sources cited."
        guides={MARKET_REPORTS}
      />
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// Newsletter panel
// ─────────────────────────────────────────────────────────────

function NewsletterPanel() {
  return (
    <section
      id="newsletter"
      className="bg-[#FBFAF6] py-20 sm:py-24"
      aria-label="Monthly market intel signup"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-y border-brand-navy/15 py-10 text-center sm:py-14">
          <RevealOnScroll variant="scaleIn" duration={0.7}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
              The dispatch
            </p>
            <h2 className="font-display text-3xl font-normal text-brand-navy sm:text-4xl">
              Monthly market intel.{' '}
              <span className="italic text-brand-emerald">
                New guides first
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              One email a month: fresh guides, Canadian and US market shifts,
              and the occasional policy alert. If a month has nothing worth
              reading, we do not send.
            </p>
          </RevealOnScroll>

          <form
            action="/contact/"
            method="get"
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input type="hidden" name="type" value="newsletter" />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@domain.com"
              className="flex-1 border-b border-brand-navy/25 bg-transparent px-1 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-none border border-brand-navy bg-brand-navy px-6 py-3 font-display text-sm uppercase tracking-wider text-white transition-colors hover:border-brand-emerald hover:bg-brand-emerald"
            >
              Subscribe
            </button>
          </form>
          <p className="mx-auto mt-4 max-w-md text-xs text-slate-500">
            No spam, ever. Unsubscribe in one click. We never share your email.
          </p>
          <p className="mx-auto mt-2 max-w-md text-xs italic text-slate-500">
            Prefer a direct request?{' '}
            <Link
              href="/contact/?type=newsletter"
              className="underline decoration-brand-gold underline-offset-4 hover:text-brand-emerald"
            >
              Ask the team for the current issue
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Related anchors - locations + services
// ─────────────────────────────────────────────────────────────

function RelatedAnchors() {
  return (
    <section
      className="bg-white py-20 sm:py-24"
      aria-label="Related sections"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Keep exploring
          </p>
          <h2 className="mb-12 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
            Put the library{' '}
            <span className="italic text-brand-emerald">into context</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="border-t border-brand-navy/15 pt-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
              Locations
            </p>
            <h3 className="font-display text-xl font-normal leading-snug text-brand-navy">
              <Link
                href="/locations/"
                className="transition-colors hover:text-brand-emerald"
              >
                Every market we lease in, with local data
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Toronto, Mississauga, Ottawa, Vancouver, Miami, and the twenty
              other cities where our brokerage is licensed to execute - each
              with local vacancy, rent, and concession benchmarks.
            </p>
          </div>
          <div className="border-t border-brand-navy/15 pt-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
              Services
            </p>
            <h3 className="font-display text-xl font-normal leading-snug text-brand-navy">
              <Link
                href="/services/"
                className="transition-colors hover:text-brand-emerald"
              >
                The leasing services these guides support
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Tenant placement, screening, lease drafting, showing coordination,
              and full institutional lease-up - each service is the executed
              version of the guide it maps to.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────

function FAQSection() {
  return (
    <section id="faq" className="bg-[#FBFAF6] py-20 sm:py-24" aria-label="FAQ">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Frequently asked
          </p>
          <h2 className="mb-12 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
            About the{' '}
            <span className="italic text-brand-emerald">resources hub</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
        </RevealOnScroll>

        <dl className="divide-y divide-brand-navy/10 border-t border-brand-navy/15">
          {FAQ.map((f) => (
            <div key={f.q} className="py-6">
              <RevealOnScroll variant="fade" duration={0.5}>
                <dt className="font-display text-lg font-normal text-brand-navy">
                  {f.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </dd>
              </RevealOnScroll>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section
      className="relative bg-brand-navy py-20 sm:py-24"
      aria-label="Final call to action"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll variant="scaleIn" duration={0.8}>
          <h2 className="font-display text-3xl font-normal leading-tight text-white sm:text-4xl">
            Ready to put these resources{' '}
            <span className="italic text-brand-gold">into practice</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
            The guides document the process. Our leasing team runs it on your
            file - zero upfront, success-fee only.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact/?type=owner"
              className="inline-flex items-center gap-2 rounded-none border border-brand-gold bg-brand-gold px-7 py-3 font-display text-sm uppercase tracking-wider text-brand-navy transition-colors hover:bg-white hover:border-white"
            >
              Talk to a leasing advisor
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 border-b-2 border-white/60 pb-1 font-display text-base italic text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              Review our services
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Composed export
// ─────────────────────────────────────────────────────────────

export function ResourcesEditorial({
  featured,
  recent,
  counts,
}: ResourcesEditorialProps) {
  // Parent page controls the hero + Sanity-driven "What's new" aside.
  // Suppress unused lint - these remain in the prop contract for future use
  // (e.g. surfacing Sanity-published guides inside the featured section).
  void featured
  void recent
  void counts

  return (
    <>
      <PillarGrid />
      <FeaturedGuides />
      <CategoryIndexes />
      <NewsletterPanel />
      <RelatedAnchors />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
