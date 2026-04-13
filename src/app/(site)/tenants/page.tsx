import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'
import { sanityFetch } from '@/sanity/fetch'
import { HOMEPAGE_QUERY } from '@/sanity/queries/homepage'
import type { CityCardData } from '@/types/blocks'
import { ZigzagStep, FeeTableRow, PullQuoteReveal } from './tenants-interactive'

export const metadata: Metadata = {
  title: 'Rental Homes Canada | Apartments, Condos & Houses for Rent',
  description:
    'Browse verified rental listings across Canada. Apartments, condos, houses, and townhouses in Toronto, Mississauga, Ottawa, Hamilton, and 160+ cities. Apply online in minutes.',
  alternates: {
    canonical: '/tenants/',
  },
  openGraph: {
    title: 'Rental Homes Canada | MoveSmart Rentals',
    description:
      'Browse verified rental listings across Canada. Apartments, condos, houses, and townhouses in Toronto, Mississauga, Ottawa, Hamilton, and 160+ cities.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Homes Canada | MoveSmart Rentals',
    description:
      'Browse verified rental listings across Canada. Apartments, condos, houses, and townhouses in Toronto, Mississauga, Ottawa, Hamilton, and 160+ cities.',
  },
}

/* ---------- Tenant FAQs ---------- */

const TENANT_FAQS = [
  {
    question: 'What is the application process for renting a property?',
    answer:
      'Our application process is fully online. You submit your employment verification, credit check authorization, and references through our secure portal. Most applications receive a decision within 48 hours.',
  },
  {
    question: 'What documents do I need to apply?',
    answer:
      'You will need government-issued photo ID, proof of income (recent pay stubs or employment letter), a credit check authorization, and two references (one personal, one from a previous landlord if applicable).',
  },
  {
    question: 'What are the standard lease terms?',
    answer:
      'Standard leases in Ontario are 12 months. After the initial term, leases automatically convert to month-to-month unless renewed. All leases follow the Ontario Standard Lease form as required by law.',
  },
  {
    question: 'How much is the security deposit?',
    answer:
      "In Ontario, landlords can only collect a deposit equal to one month's rent (last month's rent deposit). No additional security deposits are permitted under the Residential Tenancies Act.",
  },
  {
    question: 'How do I submit a maintenance request?',
    answer:
      'Log in to your tenant portal and open a maintenance ticket with a short description and photos. Urgent issues (heat, water, electrical) are triaged within hours; routine items are scheduled within 3-5 business days.',
  },
  {
    question: 'Can I end my lease early?',
    answer:
      'Ontario tenants can give 60 days written notice ending on the last day of a rental period, but only once the fixed term has ended. Before that, you may assign or sublet with landlord consent, or negotiate a mutual lease termination.',
  },
  {
    question: 'How often can rent be increased?',
    answer:
      'Ontario permits one rent increase every 12 months, capped at the provincial Rent Increase Guideline. Landlords must provide 90 days written notice using Form N1. Most units built after November 15, 2018 are exempt from the cap.',
  },
  {
    question: 'How is rent paid each month?',
    answer:
      'We offer pre-authorized debit (PAD), e-transfer to a dedicated address, or tenant-portal bank payment. Auto-payment is encouraged - it eliminates late fees and keeps your rent history clean for future applications.',
  },
]

/* ---------- How renting with us works (4 editorial rows) ---------- */

const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Browse verified listings',
    body: 'Every listing on MoveSmart is owner-verified with accurate rent, deposit, and inclusions clearly posted. No bait-and-switch, no stale photos - filter by city, bedrooms, and budget and shortlist homes in minutes.',
  },
  {
    number: '02',
    title: 'Apply online in minutes',
    body: 'Upload your ID, proof of income, and references through our secure portal. One application works across every MoveSmart listing - no re-typing, no printing, no faxing anything to anyone.',
  },
  {
    number: '03',
    title: 'Transparent screening',
    body: 'We run credit, employment, and reference checks to the same standard for every applicant and issue a decision within 48 hours. You get a clear answer fast, not a ghost after a showing.',
  },
  {
    number: '04',
    title: 'Sign, pay, move in',
    body: 'Sign the Ontario Standard Lease digitally, pay your last-month deposit by e-transfer or pre-auth, and pick up your keys on move-in day. Your tenant portal goes live the same morning for rent, maintenance, and documents.',
  },
]

/* ---------- Property types (editorial two-column) ---------- */

const PROPERTY_TYPES = [
  {
    title: 'Apartments',
    desc: 'Purpose-built rental buildings - elevators, on-site management, transit-friendly locations, often with utilities bundled.',
  },
  {
    title: 'Condos',
    desc: 'Individually owned units in amenity-rich buildings - gyms, pools, concierge, often newer construction with in-suite laundry.',
  },
  {
    title: 'Houses',
    desc: 'Detached and semi-detached homes with yards, driveways, and basements - ideal for families and long-term renters.',
  },
  {
    title: 'Townhouses',
    desc: 'Multi-level homes with the footprint of a house and the maintenance profile of a condo - often in planned communities.',
  },
]

/* ---------- Why MoveSmart (editorial 01/02/03) ---------- */

const WHY_PILLARS = [
  {
    number: '01',
    title: 'Verified listings, no bait-and-switch',
    body: "Every property is owner-verified before it goes live. The rent you see is the rent you pay - no phantom listings, no re-routing to a different unit, no surprise fees introduced at signing. If it's on MoveSmart, it's real, available, and priced as shown.",
  },
  {
    number: '02',
    title: 'Fast, fair applications',
    body: 'We apply the same screening criteria to every applicant and issue a decision within 48 hours. Newcomers with thin Canadian credit, self-employed applicants, and students are evaluated on the full picture - income, references, rental history - not a single score.',
  },
  {
    number: '03',
    title: 'Real support after move-in',
    body: 'A dedicated team handles maintenance tickets, lease questions, and renewals through your tenant portal. Urgent issues are triaged within hours, not days - you are a resident, not a file number in a call queue.',
  },
]

/* ---------- Transparent fee table ---------- */

const FEE_ROWS: Array<{ label: string; value: string; note?: string }> = [
  {
    label: 'Application fee',
    value: '$0',
    note: 'Credit and reference checks are covered by the landlord',
  },
  {
    label: 'Last-month rent deposit',
    value: '1 month rent',
    note: 'Held per Ontario Residential Tenancies Act; no additional security deposit permitted',
  },
  {
    label: 'Key deposit',
    value: 'Refundable',
    note: 'Typically $100-$250; returned in full when all keys are returned',
  },
  {
    label: 'Utilities (heat & water)',
    value: 'Included where stated',
    note: 'Each listing states exactly what is bundled - never assumed',
  },
  {
    label: 'Parking & storage',
    value: 'Listed per unit',
    note: 'Priced separately where applicable, disclosed before application',
  },
  {
    label: 'How rent is paid',
    value: 'PAD, e-transfer, or portal',
    note: 'Pre-authorized debit recommended to keep a clean rent-payment history',
  },
  {
    label: 'Late fee',
    value: 'None',
    note: 'Ontario law prohibits landlord late fees on residential rent',
  },
  {
    label: 'Rent increase cap',
    value: 'Provincial guideline',
    note: 'Max once per 12 months with 90 days written notice (Form N1)',
  },
]

/* ---------- Pull-quote testimonials ---------- */

const PULL_QUOTES: Array<{ quote: string; name: string; city: string }> = [
  {
    quote:
      'I applied on a Tuesday and had keys in my hand nine days later. Every number on the listing matched the lease. That never happened to me before.',
    name: 'Priya',
    city: 'Mississauga, ON',
  },
  {
    quote:
      'Our dishwasher died on a Sunday. I logged a ticket at 9pm and a tech was here Monday afternoon. I stopped dreading maintenance calls.',
    name: 'Marcus',
    city: 'Hamilton, ON',
  },
]

export default async function TenantsPage() {
  const data = await sanityFetch<{
    featuredCities: CityCardData[]
  }>({
    query: HOMEPAGE_QUERY,
    tags: ['city'],
  })

  const cities = data?.featuredCities ?? []

  const heroAside = (
    <div className="rounded-3xl border border-brand-navy/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-7">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
        Start your search
      </p>
      <h2 className="mt-2 font-display text-xl font-normal text-brand-navy sm:text-2xl">
        Browse by home type
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Filter verified listings across 160+ Canadian cities. No account required to browse.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { label: '1-bed', href: '/locations/' },
          { label: '2-bed', href: '/locations/' },
          { label: 'Condo', href: '/locations/' },
          { label: 'Townhouse', href: '/locations/' },
          { label: 'House', href: '/locations/' },
          { label: 'Pet-friendly', href: '/locations/' },
        ].map((chip) => (
          <Link
            key={chip.label}
            href={chip.href}
            className="rounded-full border border-brand-navy/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-emerald/40 hover:bg-emerald-50 hover:text-brand-emerald"
          >
            {chip.label}
          </Link>
        ))}
      </div>
      <div className="mt-5 border-t border-brand-navy/10 pt-4">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Every listing is owner-verified. Rent, deposit, and inclusions shown are what you pay -
          not an estimate.
        </p>
      </div>
    </div>
  )

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'For Tenants', href: '/tenants/' },
          ]}
        />
      </div>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <PageHeroBlock
        kicker="Tenant Hub"
        eyebrow="Find your next home"
        headline="Verified rentals, fair applications, real home."
        lede="Browse owner-verified apartments, condos, houses, and townhouses across 160+ Canadian cities. Apply online in minutes and get a decision within 48 hours."
        cta1={{ label: 'Browse Rentals', href: '/locations/' }}
        cta2={{ label: 'Tenant FAQ', href: '/faq/' }}
        meta={[
          { label: 'Cities', value: '20+' },
          { label: 'Avg move-in', value: '14 days' },
          { label: 'Listings', value: 'Daily' },
          { label: 'Response', value: '< 24h' },
        ]}
        aside={heroAside}
      />

      {/* ─── How renting with us works (zigzag editorial) ───────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                The Process
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                How renting with us{' '}
                <span className="font-display italic text-brand-emerald">works</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
            </div>
          </RevealOnScroll>

          <ol className="space-y-2">
            {HOW_IT_WORKS.map((step, idx) => {
              const isEven = idx % 2 === 0
              return (
                <ZigzagStep
                  key={step.number}
                  index={idx}
                  className={`grid grid-cols-1 items-start gap-6 border-t border-brand-navy/10 py-10 md:grid-cols-12 md:gap-10 ${
                    isEven ? '' : 'md:text-right'
                  }`}
                >
                  {/* Numeral */}
                  <div
                    className={`md:col-span-3 ${
                      isEven ? 'md:order-1' : 'md:order-2 md:text-right'
                    }`}
                  >
                    <span
                      className="font-display text-6xl font-normal leading-none text-brand-gold sm:text-7xl md:text-8xl"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Copy */}
                  <div
                    className={`md:col-span-9 ${
                      isEven ? 'md:order-2' : 'md:order-1 md:text-right'
                    }`}
                  >
                    <h3 className="font-display text-2xl font-normal text-brand-navy sm:text-3xl">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-3 text-base leading-relaxed text-slate-600 sm:text-lg ${
                        isEven ? 'max-w-2xl' : 'max-w-2xl md:ml-auto'
                      }`}
                    >
                      {step.body}
                    </p>
                  </div>
                </ZigzagStep>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ─── Property types (editorial two-col list) ───────────────────── */}
      <section className="bg-[#FBFAF6] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-12 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Browse by property type
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Find your perfect{' '}
                <span className="font-display italic text-brand-emerald">home</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
            </div>
          </RevealOnScroll>

          <dl className="grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2">
            {PROPERTY_TYPES.map((type, idx) => (
              <FeeTableRow
                key={type.title}
                index={idx}
                className="flex flex-col gap-2 border-t border-brand-navy/10 py-8 last:border-b-0 sm:py-10"
              >
                <dt className="font-display text-2xl font-normal text-brand-navy sm:text-3xl">
                  {type.title}
                </dt>
                <dd className="text-base leading-relaxed text-slate-600">{type.desc}</dd>
                <Link
                  href="/locations/"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-emerald transition-colors hover:text-emerald-700"
                >
                  Browse {type.title.toLowerCase()}
                  <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </FeeTableRow>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── Featured Cities ─────────────────────────────────────────────── */}
      {cities.length > 0 && (
        <div id="cities">
          <CityGridBlock cities={cities} columns={4} />
        </div>
      )}

      {/* ─── Why rent from MoveSmart (editorial 01/02/03) ─────────────── */}
      <section className="bg-brand-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Why MoveSmart
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                Renting,{' '}
                <span className="font-display italic text-brand-emerald">done right</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="divide-y divide-white/10">
            {WHY_PILLARS.map((pillar, idx) => (
              <FeeTableRow
                key={pillar.number}
                index={idx}
                className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-12"
              >
                <div className="md:col-span-3">
                  <span
                    className="font-display text-5xl font-normal leading-none text-brand-gold sm:text-6xl"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl font-normal text-white sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                    {pillar.body}
                  </p>
                </div>
              </FeeTableRow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Transparent fee table ───────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-10 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Transparent pricing
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                What you&apos;ll pay &amp; how you pay{' '}
                <span className="font-display italic text-brand-emerald">it</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Every fee, deposit, and payment method - posted before you apply. No last-minute
                add-ons, no surprise charges at signing.
              </p>
            </div>
          </RevealOnScroll>

          <div className="border-t-2 border-brand-navy/80">
            {FEE_ROWS.map((row, idx) => (
              <FeeTableRow
                key={row.label}
                index={idx}
                className="grid grid-cols-12 items-baseline gap-4 border-b border-brand-navy/10 py-5 sm:py-6"
              >
                <div className="col-span-12 sm:col-span-4">
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-navy sm:text-[13px]">
                    {row.label}
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className="col-span-12 hidden flex-1 border-b border-dotted border-brand-navy/20 sm:col-span-3 sm:block"
                />
                <div className="col-span-12 sm:col-span-5 sm:text-right">
                  <p className="font-display text-xl font-normal text-brand-navy sm:text-2xl">
                    {row.value}
                  </p>
                  {row.note && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {row.note}
                    </p>
                  )}
                </div>
              </FeeTableRow>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-brand-navy/10 pt-8">
            <div>
              <p className="font-display text-4xl font-normal text-brand-navy sm:text-5xl">
                <CountUp value={0} prefix="$" />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Application fee
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-normal text-brand-navy sm:text-5xl">
                <CountUp value={14} suffix=" days" />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Average time to move-in
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-normal text-brand-navy sm:text-5xl">
                <CountUp value={20} suffix="+" />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Canadian cities served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pull-quote testimonials ──────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-20">
        <div className="mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <p className="mb-12 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Tenant stories
            </p>
          </RevealOnScroll>

          <div className="space-y-16">
            {PULL_QUOTES.map((q, idx) => (
              <PullQuoteReveal
                key={q.name}
                delay={idx * 0.1}
                className="relative max-w-4xl"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-2 -top-8 font-display text-7xl leading-none text-brand-gold/60 sm:-left-6 sm:text-8xl"
                >
                  &ldquo;
                </span>
                <p className="font-display text-2xl font-normal italic leading-[1.35] text-brand-navy sm:text-3xl md:text-4xl">
                  {q.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-brand-gold/60"
                  />
                  <cite className="not-italic">
                    <span className="font-semibold text-brand-navy">{q.name}</span>
                    <span className="text-slate-500"> - {q.city}</span>
                  </cite>
                </footer>
              </PullQuoteReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock questions={TENANT_FAQS} title="Tenant FAQs" />

      {/* ─── CTA Banner ─────────────────────────────────────────────────── */}
      <CTABannerBlock
        headline="Ready to find your home?"
        primaryCta={{ label: 'Browse Listings', href: '/locations/' }}
      />
    </main>
  )
}
