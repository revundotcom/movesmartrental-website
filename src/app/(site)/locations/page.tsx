import type { Metadata } from 'next'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { sanityFetch } from '@/sanity/fetch'
import { PROVINCES_WITH_CITIES_QUERY } from '@/sanity/queries/province'
import type { CityCardData } from '@/types/blocks'

import {
  CitySpotlight,
  LocalTeamsList,
  MarketSnapshot,
  ProvinceRow,
  QuickJumpCard,
  type ProvinceEntry,
  type SpotlightData,
  type Advisor,
  type SnapshotStat,
} from './locations-interactive'

export const metadata: Metadata = {
  title: 'Property Management Locations Canada | 20+ Cities Served',
  description:
    'MoveSmart Rentals serves 20+ Canadian cities including Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, Kitchener, Waterloo, Barrie, and Oakville. Find your city.',
  alternates: {
    canonical: '/locations/',
  },
  openGraph: {
    title: 'Property Management Locations Canada | MoveSmart Rentals',
    description:
      'MoveSmart Rentals serves 20+ Canadian cities. Find professional property management in Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, and more.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management Locations Canada | MoveSmart Rentals',
    description:
      'MoveSmart Rentals serves 20+ Canadian cities. Find professional property management in Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, and more.',
  },
}

interface ProvinceWithCities {
  _id: string
  title: string
  slug: string
  country: string
  cities: CityCardData[]
}

// ─────────────────────────────────────────────────────────────
// Static editorial content
// ─────────────────────────────────────────────────────────────

const SPOTLIGHTS: SpotlightData[] = [
  {
    city: 'Toronto',
    province: 'Ontario',
    href: '/ca/ontario/toronto/',
    summary:
      'Canada’s largest rental market rewards precision. Median one-bedroom rents hover near $2,500; demand peaks in late spring and early fall. We lease condos, row-houses and detached stock from the waterfront to North York.',
    neighborhoods: [
      { name: 'King West', note: 'Condo-heavy · high turnover' },
      { name: 'Leslieville', note: 'Row-house · young families' },
      { name: 'North York', note: 'Detached · long-term tenants' },
      { name: 'The Annex', note: 'Pre-war · student adjacent' },
      { name: 'Liberty Village', note: 'Condo · transit-first' },
    ],
  },
  {
    city: 'Ottawa',
    province: 'Ontario',
    href: '/ca/ontario/ottawa/',
    summary:
      'Stable government and tech employment keeps Ottawa vacancy below 2%. Townhouses in Barrhaven and Kanata lease in under two weeks when priced right. Expect steady 3-5% annual rent growth.',
    neighborhoods: [
      { name: 'Westboro', note: 'Walkable · premium rents' },
      { name: 'Barrhaven', note: 'Townhouse · family demand' },
      { name: 'Kanata', note: 'Tech corridor · executives' },
      { name: 'Centretown', note: 'Apartment · professionals' },
    ],
  },
  {
    city: 'Miami',
    province: 'Florida',
    href: '/us/florida/miami/',
    summary:
      'Snowbird seasonality shapes Miami leasing - winter demand spikes November through April. We coordinate short hold-over clauses, furnished options and HOA compliance across Brickell, Wynwood and Coral Gables.',
    neighborhoods: [
      { name: 'Brickell', note: 'High-rise · international renters' },
      { name: 'Wynwood', note: 'Lofts · creative class' },
      { name: 'Coral Gables', note: 'SFH · long-term families' },
      { name: 'Coconut Grove', note: 'Townhome · waterfront' },
    ],
  },
  {
    city: 'Austin',
    province: 'Texas',
    href: '/us/texas/austin/',
    summary:
      'Austin absorbed record new supply in 2025 - landlords need sharper pricing and faster turnarounds. We run aggressive marketing in East Austin and price-discovery in suburbs like Round Rock and Cedar Park.',
    neighborhoods: [
      { name: 'East Austin', note: 'SFH · young professionals' },
      { name: 'Mueller', note: 'New build · premium' },
      { name: 'Round Rock', note: 'Suburban · family' },
      { name: 'South Congress', note: 'Condo · walkable' },
    ],
  },
]

const ADVISORS: Advisor[] = [
  // TODO: Replace placeholder names with real local leasing advisors once confirmed.
  { name: 'Priya Kaur', city: 'Toronto', role: 'Senior Leasing Advisor', phone: '(416) 555-0142' },
  { name: 'Marcus Chen', city: 'Ottawa', role: 'Regional Lead - Ontario East', phone: '(613) 555-0108' },
  { name: 'Sophie Tremblay', city: 'Montreal', role: 'Leasing Advisor - Québec', phone: '(514) 555-0177' },
  { name: 'Daniel Okafor', city: 'Vancouver', role: 'Regional Lead - BC', phone: '(604) 555-0193' },
  { name: 'Hema Patel', city: 'Miami', role: 'Leasing Advisor - Florida', phone: '(305) 555-0124' },
  { name: 'Jordan Reyes', city: 'Austin', role: 'Regional Lead - Texas', phone: '(512) 555-0156' },
]

const SNAPSHOT_STATS: SnapshotStat[] = [
  { label: 'Average market rent', value: 2400, prefix: '$', suffix: '/mo' },
  { label: 'Listings this month', value: 340 },
  { label: 'Cities onboarding Q2', value: 6, suffix: ' more' },
  { label: 'Provinces by 2027', value: 0, text: 'All 10' },
]

const FAQ_ITEMS = [
  {
    question: "Do you serve my city?",
    answer:
      "We actively manage rentals across 20+ Canadian cities and an expanding list of U.S. states. If your city isn’t listed, email us - we expand regionally based on owner demand, and we may already have a local advisor in-market.",
  },
  {
    question: "Can I list a property if you don’t cover my area yet?",
    answer:
      "In most cases yes. We extend service to adjacent markets on a request basis - especially when multiple owners in one city reach out. Start with a Rental Analysis and we’ll tell you honestly whether we can serve you today or when coverage is expected.",
  },
  {
    question: "How local is ‘local’?",
    answer:
      "Every city we operate in has a named leasing advisor and a ground team that conducts showings, inspections and vendor coordination in person. We do not run remote-only pods - regional leads live and work in their markets.",
  },
  {
    question: "Do you handle regional regulations?",
    answer:
      "Yes. Provincial tenancy acts (RTA in Ontario, RTB in BC, TAL in Québec) and U.S. state landlord-tenant statutes are built into our lease templates and notice workflows. Compliance is non-negotiable - we update documentation the week any rule changes.",
  },
  {
    question: "Can out-of-province or overseas owners work with you?",
    answer:
      "Absolutely - roughly a third of our owner base lives outside the city their property is in. The owner portal, trust-accounted monthly statements and direct-deposit disbursements are designed exactly for this case.",
  },
]

const QUICK_JUMP = [
  { label: 'Ontario', href: '#ca-ontario' },
  { label: 'British Columbia', href: '#ca-british-columbia' },
  { label: 'Quebec', href: '#ca-quebec' },
  { label: 'Alberta', href: '#ca-alberta' },
  { label: 'Florida', href: '#us-florida' },
  { label: 'Texas', href: '#us-texas' },
]

// ─────────────────────────────────────────────────────────────

function toProvinceEntry(p: ProvinceWithCities): ProvinceEntry {
  return {
    _id: p._id,
    title: p.title,
    slug: p.slug,
    country: p.country,
    cities: p.cities.map((c) => ({
      title: c.title,
      slug: c.slug,
      provinceSlug: c.provinceSlug,
    })),
  }
}

export default async function LocationsPage() {
  const provinces = await sanityFetch<ProvinceWithCities[]>({
    query: PROVINCES_WITH_CITIES_QUERY,
    tags: ['province', 'city'],
  })

  const provincesWithCities = provinces.filter(
    (p) => p.cities && p.cities.length > 0,
  )

  const canadian = provincesWithCities
    .filter((p) => p.country === 'CA')
    .map(toProvinceEntry)
  const american = provincesWithCities
    .filter((p) => p.country === 'US')
    .map(toProvinceEntry)

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations/' },
          ]}
        />
      </div>

      {/* 1. Editorial hero */}
      <PageHeroBlock
        kicker="Locations"
        eyebrow="Where we lease"
        headline="Rentals across Canada"
        lede="Twenty-plus cities, five provinces, and a growing U.S. footprint - each with a named advisor and a team that works the neighborhood in person, not from a remote call center."
        cta1={{ label: 'Find a Rental', href: '#directory' }}
        cta2={{ label: 'Talk to a Local Advisor', href: '/contact/?intent=call' }}
        meta={[
          { label: 'Cities', value: '20+' },
          { label: 'Provinces', value: '5' },
          { label: 'Listings live', value: 'Daily' },
          { label: 'Local teams', value: 'In-market' },
        ]}
        aside={<QuickJumpCard items={QUICK_JUMP} />}
      />

      {/* 2. Canada directory - ivory band */}
      <section
        id="directory"
        className="relative bg-[#FBFAF6] py-20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
              Atlas · Canada
            </p>
            <h2 className="font-display text-4xl font-normal leading-[1.1] text-brand-navy sm:text-5xl">
              Every province we
              <span className="italic text-brand-emerald"> serve</span>
              <span className="text-brand-gold" aria-hidden="true">.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              A full index of Canadian markets under active management. Click a
              city for local rent data, leasing timelines and vacancy rates.
            </p>
          </div>

          <div className="divide-y divide-brand-navy/10">
            {canadian.map((p, i) => (
              <div key={p._id} id={`ca-${p.slug}`}>
                <ProvinceRow province={p} theme="light" index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. United States directory - navy band */}
      {american.length > 0 && (
        <section className="relative bg-brand-navy py-20">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
          />
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                Atlas · United States
              </p>
              <h2 className="font-display text-4xl font-normal leading-[1.1] text-white sm:text-5xl">
                States we’ve
                <span className="italic text-brand-emerald"> opened</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
                Our U.S. expansion follows owner demand - snowbird portfolios,
                cross-border investors, and Canadian operators with Sunbelt
                stock. Every state below is staffed by a regional lead.
              </p>
            </div>

            <div className="divide-y divide-white/10">
              {american.map((p, i) => (
                <div key={p._id} id={`us-${p.slug}`}>
                  <ProvinceRow province={p} theme="dark" index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Featured city spotlights */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
              Featured markets
            </p>
            <h2 className="font-display text-4xl font-normal leading-[1.1] text-brand-navy sm:text-5xl">
              Four cities, four
              <span className="italic text-brand-emerald"> playbooks</span>
              <span className="text-brand-gold" aria-hidden="true">.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Leasing strategy changes with geography. Here’s how we read a
              handful of the markets we know best.
            </p>
          </div>

          <div>
            {SPOTLIGHTS.map((s, i) => (
              <CitySpotlight key={s.city} data={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Local teams */}
      <section className="bg-[#FBFAF6] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                Local teams
              </p>
              <h2 className="font-display text-4xl font-normal leading-[1.1] text-brand-navy sm:text-5xl">
                Named advisors, in
                <span className="italic text-brand-emerald"> market</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg lg:col-span-7">
              Every city we operate in has a person - not a ticket queue. Our
              regional leads live where they lease, show properties themselves,
              and know which vendors answer the phone on a Saturday. Call them
              directly; they’ll pick up.
            </p>
          </div>

          <LocalTeamsList advisors={ADVISORS} />
        </div>
      </section>

      {/* 6. Market snapshot strip */}
      <section className="bg-white py-16">
        <MarketSnapshot stats={SNAPSHOT_STATS} />
      </section>

      {/* 7. FAQ */}
      <FAQBlock
        title="Location questions, answered"
        questions={FAQ_ITEMS}
      />

      {/* 8. CTA */}
      <CTABannerBlock
        headline="Don’t see your city?"
        description="Email us - we expand based on demand. Tell us where your property is and we’ll tell you honestly whether we can serve you today."
        primaryCta={{ label: 'Request Your City', href: '/contact/' }}
        secondaryCta={{ label: 'Browse All Cities', href: '#directory' }}
      />
    </main>
  )
}
