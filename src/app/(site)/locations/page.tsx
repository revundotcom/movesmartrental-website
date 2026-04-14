import type { Metadata } from 'next'
import Link from 'next/link'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

import {
  OntarioCityDirectory,
  ProvinceGrid,
  StateGrid,
  USCityDirectory,
  type OntarioCity,
  type ProvinceCard,
  type StateCard,
  type USCity,
} from './locations-interactive'

export const metadata: Metadata = {
  title: 'Leasing Coverage - Canada & United States | MoveSmart Rentals',
  description:
    'White-glove leasing across Canada and the United States. 20+ Ontario tier-1 cities, five provinces, ten priority U.S. states including Florida, Texas, California, New York, and Illinois.',
  alternates: {
    canonical: '/locations/',
  },
  openGraph: {
    title: 'Leasing Coverage - Canada & United States | MoveSmart Rentals',
    description:
      'Same discipline, same white-glove execution - from a basement unit in Hamilton to a 500-unit lease-up in Miami.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Coverage - Canada & United States | MoveSmart Rentals',
    description:
      'White-glove leasing brokerage across Canada and the United States. See every province and state we serve.',
  },
}

// ─────────────────────────────────────────────────────────────
// Canadian provinces (5 priority)
// ─────────────────────────────────────────────────────────────

const CANADIAN_PROVINCES: ProvinceCard[] = [
  {
    name: 'Ontario',
    slug: 'ontario',
    country: 'CA',
    cityCount: 20,
    note: 'Flagship market',
    positioning:
      'Our deepest bench. Twenty tier-1 cities from Toronto to Kingston with named advisors in every corridor of the GTA, Golden Horseshoe, and Southwestern Ontario.',
  },
  {
    name: 'Quebec',
    slug: 'quebec',
    country: 'CA',
    cityCount: 6,
    note: 'Bilingual execution',
    positioning:
      'Bilingual lease execution aligned with the TAL. Montréal, Laval, Longueuil and Québec City - with French-fluent advisors and regie-ready documentation.',
  },
  {
    name: 'British Columbia',
    slug: 'british-columbia',
    country: 'CA',
    cityCount: 7,
    note: 'RTB-aligned',
    positioning:
      'Vancouver, Burnaby, Richmond, Surrey, Victoria and the Okanagan. RTB-aligned lease templates, strata-ready showings, and strict pet-and-smoking compliance baked in.',
  },
  {
    name: 'Alberta',
    slug: 'alberta',
    country: 'CA',
    cityCount: 5,
    note: 'Energy-corridor ready',
    positioning:
      'Calgary, Edmonton, Red Deer, Lethbridge and Airdrie. Built for energy-corridor mobility - flexible hold-over clauses and fast qualification for corporate transferees.',
  },
  {
    name: 'Nova Scotia',
    slug: 'nova-scotia',
    country: 'CA',
    cityCount: 5,
    note: 'Atlantic anchor',
    positioning:
      'Halifax, Dartmouth, Bedford, Sydney and Truro. Atlantic-region pricing discipline with an eye on the military, healthcare and post-secondary rental demand drivers.',
  },
]

// ─────────────────────────────────────────────────────────────
// Ontario tier-1 cities (20 - exact list per spec)
// ─────────────────────────────────────────────────────────────

const ONTARIO_TIER_1_CITIES: OntarioCity[] = [
  { name: 'Toronto', slug: 'toronto', marketNote: 'Canada’s largest rental market' },
  { name: 'Mississauga', slug: 'mississauga', marketNote: 'GTA West anchor' },
  { name: 'Brampton', slug: 'brampton', marketNote: 'High-growth, family-driven' },
  { name: 'Hamilton', slug: 'hamilton', marketNote: 'Golden Horseshoe value play' },
  { name: 'Ottawa', slug: 'ottawa', marketNote: 'Stable sub-2% vacancy' },
  { name: 'London', slug: 'london', marketNote: 'Student and healthcare corridor' },
  { name: 'Vaughan', slug: 'vaughan', marketNote: 'GTA North premium stock' },
  { name: 'Markham', slug: 'markham', marketNote: 'Tech-corridor professionals' },
  { name: 'Richmond Hill', slug: 'richmond-hill', marketNote: 'Executive long-term tenants' },
  { name: 'Oakville', slug: 'oakville', marketNote: 'Lakeshore premium homes' },
  { name: 'Burlington', slug: 'burlington', marketNote: 'Commuter demand, tight supply' },
  { name: 'Kitchener', slug: 'kitchener', marketNote: 'Waterloo-region tech hub' },
  { name: 'Waterloo', slug: 'waterloo', marketNote: 'University-driven turnover' },
  { name: 'Cambridge', slug: 'cambridge', marketNote: 'Manufacturing and logistics demand' },
  { name: 'Guelph', slug: 'guelph', marketNote: 'Low vacancy, steady growth' },
  { name: 'Barrie', slug: 'barrie', marketNote: 'GTA-exit family market' },
  { name: 'Milton', slug: 'milton', marketNote: 'Fastest-growing municipality' },
  { name: 'Oshawa', slug: 'oshawa', marketNote: 'Durham region anchor' },
  { name: 'Ajax', slug: 'ajax', marketNote: 'Transit-oriented family rentals' },
  { name: 'Pickering', slug: 'pickering', marketNote: 'East GTA growth pocket' },
]

// ─────────────────────────────────────────────────────────────
// U.S. states (10 priority)
// ─────────────────────────────────────────────────────────────

const US_STATES: StateCard[] = [
  {
    name: 'Florida',
    slug: 'florida',
    cityCount: 5,
    note: 'Snowbird seasonality',
    positioning:
      'Miami, Orlando, Tampa and Jacksonville. Snowbird hold-overs, HOA-compliant marketing and furnished-vs-unfurnished pricing built in.',
    status: 'Now live',
  },
  {
    name: 'Texas',
    slug: 'texas',
    cityCount: 5,
    note: 'Institutional lease-up',
    positioning:
      'Houston, Dallas, Austin and San Antonio. Institutional lease-up capacity for build-to-rent communities absorbing record new supply.',
    status: 'Now live',
  },
  {
    name: 'California',
    slug: 'california',
    cityCount: 5,
    note: 'Rent-control fluent',
    positioning:
      'Los Angeles, San Diego, San Francisco, San Jose and Sacramento. AB 1482 and local rent-control ordinances handled inside every lease.',
    status: 'Now live',
  },
  {
    name: 'New York',
    slug: 'new-york',
    cityCount: 5,
    note: 'Five-borough coverage',
    positioning:
      'NYC proper, Brooklyn, Queens, Buffalo and Rochester. HSTPA-compliant workflows, co-op board packages, and upstate SFH leasing.',
    status: 'Now live',
  },
  {
    name: 'Illinois',
    slug: 'illinois',
    cityCount: 4,
    note: 'Chicagoland focus',
    positioning:
      'Chicago, Aurora, Naperville and Rockford. CRLTO-aware leasing for Chicago condos and Chicagoland SFH portfolios.',
    status: 'Now live',
  },
  {
    name: 'Georgia',
    slug: 'georgia',
    cityCount: 4,
    note: 'Sunbelt growth',
    positioning:
      'Atlanta, Augusta, Savannah and Columbus. Intown condo and suburban SFH leasing with institutional-ready turn cycles.',
    status: 'Now live',
  },
  {
    name: 'North Carolina',
    slug: 'north-carolina',
    cityCount: 4,
    note: 'Research-triangle talent',
    positioning:
      'Charlotte, Raleigh, Greensboro and Durham. Tuned for research-triangle relocations and uptown high-rise stock.',
    status: 'Now live',
  },
  {
    name: 'Arizona',
    slug: 'arizona',
    cityCount: 4,
    note: 'Metro Phoenix scale',
    positioning:
      'Phoenix, Tucson, Mesa and Scottsdale. Fast lease-up for build-to-rent neighbourhoods and snowbird seasonal holds.',
    status: 'Now live',
  },
  {
    name: 'Colorado',
    slug: 'colorado',
    cityCount: 4,
    note: 'Front-range demand',
    positioning:
      'Denver, Colorado Springs, Aurora and Fort Collins. Front-range mountain-town seasonality and HOA-driven condo leasing.',
    status: 'Now live',
  },
  {
    name: 'New Jersey',
    slug: 'new-jersey',
    cityCount: 4,
    note: 'NYC-adjacent',
    positioning:
      'Newark, Jersey City, Paterson and Elizabeth. PATH-corridor professionals with cross-Hudson mobility and strict disclosure workflows.',
    status: 'Now live',
  },
]

// ─────────────────────────────────────────────────────────────
// U.S. tier-1 cities (40+ - per spec)
// ─────────────────────────────────────────────────────────────

const US_TIER_1_CITIES: USCity[] = [
  // Florida
  { name: 'Miami', slug: 'miami', state: 'Florida', stateSlug: 'florida' },
  { name: 'Orlando', slug: 'orlando', state: 'Florida', stateSlug: 'florida' },
  { name: 'Tampa', slug: 'tampa', state: 'Florida', stateSlug: 'florida' },
  { name: 'Jacksonville', slug: 'jacksonville', state: 'Florida', stateSlug: 'florida' },
  { name: 'Fort Lauderdale', slug: 'fort-lauderdale', state: 'Florida', stateSlug: 'florida' },
  // Texas
  { name: 'Houston', slug: 'houston', state: 'Texas', stateSlug: 'texas' },
  { name: 'Dallas', slug: 'dallas', state: 'Texas', stateSlug: 'texas' },
  { name: 'Austin', slug: 'austin', state: 'Texas', stateSlug: 'texas' },
  { name: 'San Antonio', slug: 'san-antonio', state: 'Texas', stateSlug: 'texas' },
  { name: 'Fort Worth', slug: 'fort-worth', state: 'Texas', stateSlug: 'texas' },
  // California
  { name: 'Los Angeles', slug: 'los-angeles', state: 'California', stateSlug: 'california' },
  { name: 'San Diego', slug: 'san-diego', state: 'California', stateSlug: 'california' },
  { name: 'San Francisco', slug: 'san-francisco', state: 'California', stateSlug: 'california' },
  { name: 'Sacramento', slug: 'sacramento', state: 'California', stateSlug: 'california' },
  { name: 'San Jose', slug: 'san-jose', state: 'California', stateSlug: 'california' },
  // New York
  { name: 'New York City', slug: 'new-york-city', state: 'New York', stateSlug: 'new-york' },
  { name: 'Brooklyn', slug: 'brooklyn', state: 'New York', stateSlug: 'new-york' },
  { name: 'Queens', slug: 'queens', state: 'New York', stateSlug: 'new-york' },
  { name: 'Buffalo', slug: 'buffalo', state: 'New York', stateSlug: 'new-york' },
  { name: 'Rochester', slug: 'rochester', state: 'New York', stateSlug: 'new-york' },
  // Illinois
  { name: 'Chicago', slug: 'chicago', state: 'Illinois', stateSlug: 'illinois' },
  { name: 'Aurora', slug: 'aurora', state: 'Illinois', stateSlug: 'illinois' },
  { name: 'Naperville', slug: 'naperville', state: 'Illinois', stateSlug: 'illinois' },
  { name: 'Rockford', slug: 'rockford', state: 'Illinois', stateSlug: 'illinois' },
  // Georgia
  { name: 'Atlanta', slug: 'atlanta', state: 'Georgia', stateSlug: 'georgia' },
  { name: 'Augusta', slug: 'augusta', state: 'Georgia', stateSlug: 'georgia' },
  { name: 'Savannah', slug: 'savannah', state: 'Georgia', stateSlug: 'georgia' },
  { name: 'Columbus', slug: 'columbus', state: 'Georgia', stateSlug: 'georgia' },
  // North Carolina
  { name: 'Charlotte', slug: 'charlotte', state: 'North Carolina', stateSlug: 'north-carolina' },
  { name: 'Raleigh', slug: 'raleigh', state: 'North Carolina', stateSlug: 'north-carolina' },
  { name: 'Greensboro', slug: 'greensboro', state: 'North Carolina', stateSlug: 'north-carolina' },
  { name: 'Durham', slug: 'durham', state: 'North Carolina', stateSlug: 'north-carolina' },
  // Arizona
  { name: 'Phoenix', slug: 'phoenix', state: 'Arizona', stateSlug: 'arizona' },
  { name: 'Tucson', slug: 'tucson', state: 'Arizona', stateSlug: 'arizona' },
  { name: 'Mesa', slug: 'mesa', state: 'Arizona', stateSlug: 'arizona' },
  { name: 'Scottsdale', slug: 'scottsdale', state: 'Arizona', stateSlug: 'arizona' },
  // Colorado
  { name: 'Denver', slug: 'denver', state: 'Colorado', stateSlug: 'colorado' },
  { name: 'Colorado Springs', slug: 'colorado-springs', state: 'Colorado', stateSlug: 'colorado' },
  { name: 'Aurora', slug: 'aurora-co', state: 'Colorado', stateSlug: 'colorado' },
  { name: 'Fort Collins', slug: 'fort-collins', state: 'Colorado', stateSlug: 'colorado' },
  // New Jersey
  { name: 'Newark', slug: 'newark', state: 'New Jersey', stateSlug: 'new-jersey' },
  { name: 'Jersey City', slug: 'jersey-city', state: 'New Jersey', stateSlug: 'new-jersey' },
  { name: 'Paterson', slug: 'paterson', state: 'New Jersey', stateSlug: 'new-jersey' },
  { name: 'Elizabeth', slug: 'elizabeth', state: 'New Jersey', stateSlug: 'new-jersey' },
]

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'Which cities and states does MoveSmart actively serve?',
    answer:
      'In Canada we actively lease in 20+ Ontario tier-1 cities plus Quebec, British Columbia, Alberta and Nova Scotia. In the United States we cover ten priority states - Florida, Texas, California, New York, Illinois, Georgia, North Carolina, Arizona, Colorado and New Jersey - with a named leasing advisor per priority metro. The full map above shows every live jurisdiction.',
  },
  {
    question: 'When do you add new cities?',
    answer:
      'We open new markets when three signals line up: repeat owner demand, a local advisor we trust, and regulatory fluency in that jurisdiction. Expansion is quarterly - if you own a unit in a city we have not yet listed, write to us and we will tell you honestly whether we can serve you today or when coverage is expected.',
  },
  {
    question: 'Do you service rural areas and small towns?',
    answer:
      'Our footprint is tier-1 metropolitan and adjacent commuter markets. For rural single-unit landlords outside those corridors we are not the right fit today, though we will extend to adjacent communities on a case-by-case basis when multiple owners in one region request service.',
  },
  {
    question: 'Does pricing differ by market?',
    answer:
      'Our leasing fee structure is consistent across Canada and the United States, but strategic pricing inputs - comparable rents, typical days-on-market, seasonality - are always local. You will see the same nine-service scope everywhere, with market-specific playbooks applied underneath.',
  },
  {
    question: 'Is there a minimum portfolio size to work with MoveSmart?',
    answer:
      'No. We lease single basement units in Hamilton with the same discipline we apply to a 500-unit lease-up campaign in Miami. For institutional operators, builders and developers we offer a dedicated lease-up track - otherwise the standard owner workflow covers any unit count.',
  },
  {
    question: 'Can you handle cross-border institutional lease-up?',
    answer:
      'Yes - cross-border institutional lease-up is a deliberate specialty. Canadian operators with Sunbelt acquisitions, and U.S. builders expanding into the GTA or Montréal, get a single point of contact, unified reporting and jurisdiction-specific lease templates handled inside one program.',
  },
]

// ─────────────────────────────────────────────────────────────
// JSON-LD Place schema
// ─────────────────────────────────────────────────────────────

const PLACE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MoveSmart Rentals',
  description:
    'White-glove residential leasing brokerage operating across Canada and the United States.',
  url: 'https://movesmartrentals.com/locations/',
  areaServed: [
    // Canadian provinces
    { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
    { '@type': 'AdministrativeArea', name: 'Quebec, Canada' },
    { '@type': 'AdministrativeArea', name: 'British Columbia, Canada' },
    { '@type': 'AdministrativeArea', name: 'Alberta, Canada' },
    { '@type': 'AdministrativeArea', name: 'Nova Scotia, Canada' },
    // U.S. states
    { '@type': 'AdministrativeArea', name: 'Florida, USA' },
    { '@type': 'AdministrativeArea', name: 'Texas, USA' },
    { '@type': 'AdministrativeArea', name: 'California, USA' },
    { '@type': 'AdministrativeArea', name: 'New York, USA' },
    { '@type': 'AdministrativeArea', name: 'Illinois, USA' },
    { '@type': 'AdministrativeArea', name: 'Georgia, USA' },
    { '@type': 'AdministrativeArea', name: 'North Carolina, USA' },
    { '@type': 'AdministrativeArea', name: 'Arizona, USA' },
    { '@type': 'AdministrativeArea', name: 'Colorado, USA' },
    { '@type': 'AdministrativeArea', name: 'New Jersey, USA' },
  ],
}

// ─────────────────────────────────────────────────────────────

export default function LocationsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PLACE_SCHEMA) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations/' },
          ]}
        />
      </div>

      {/* Hero - editorial */}
      <PageHeroBlock
        kicker="Locations"
        eyebrow="Where we lease"
        headline="Leasing coverage across North America"
        accentLastWord
        lede="Same discipline, same white-glove execution - from a basement-unit landlord in Hamilton to a 500-unit lease-up campaign in Miami. Five provinces, ten priority U.S. states, one concierge standard."
        cta1={{ label: 'Create a Free Account', href: '/signup/' }}
        cta2={{ label: 'Book a Call', href: '/contact/?intent=call' }}
      />

      {/* Section 1 - Canada coverage */}
      <section id="canada" className="relative bg-[#FBFAF6] py-20">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="fade">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                Atlas · Canada
              </p>
              <h2 className="font-display text-4xl font-normal leading-[1.1] text-brand-navy sm:text-5xl">
                Every province we
                <span className="italic text-brand-emerald"> serve</span>
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Five priority provinces with a named advisor in every tier-1
                metro. Each province card links to the full provincial directory
                with rental market data, leasing timelines, and local regulatory
                notes.
              </p>
            </div>
          </RevealOnScroll>

          <ProvinceGrid provinces={CANADIAN_PROVINCES} />
        </div>
      </section>

      {/* Section 2 - Ontario tier-1 cities */}
      <section id="ontario" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="fade">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                Flagship · Ontario
              </p>
              <h2 className="font-display text-4xl font-normal leading-[1.1] text-brand-navy sm:text-5xl">
                Twenty Ontario cities, one leasing
                <span className="italic text-brand-emerald"> standard</span>
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Ontario is our home market and deepest bench. From Toronto to
                Pickering, every tier-1 city below has a local leasing advisor,
                RTA-aligned documentation, and the full nine-service concierge
                scope.
              </p>
            </div>
          </RevealOnScroll>

          <OntarioCityDirectory cities={ONTARIO_TIER_1_CITIES} />
        </div>
      </section>

      {/* Section 3 - U.S. state coverage */}
      <section id="united-states" className="relative bg-brand-navy py-20">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="fade">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                Atlas · United States
              </p>
              <h2 className="font-display text-4xl font-normal leading-[1.1] text-white sm:text-5xl">
                Ten states, now
                <span className="italic text-brand-emerald"> live</span>
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
                Our U.S. footprint follows owner demand - Canadian operators with
                Sunbelt stock, cross-border snowbird portfolios, and institutional
                build-to-rent lease-ups. Every state below is staffed, with
                jurisdiction-specific lease templates already in production.
              </p>
            </div>
          </RevealOnScroll>

          <StateGrid states={US_STATES} />
        </div>
      </section>

      {/* Section 4 - U.S. tier-1 cities */}
      <section id="us-cities" className="bg-[#FBFAF6] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="fade">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                U.S. cities · Priority list
              </p>
              <h2 className="font-display text-4xl font-normal leading-[1.1] text-brand-navy sm:text-5xl">
                Forty priority U.S. cities, grouped by
                <span className="italic text-brand-emerald"> state</span>
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Filter by city or state, then drill into the city page for rent
                benchmarks, vacancy trends, and local leasing playbooks.
              </p>
            </div>
          </RevealOnScroll>

          <USCityDirectory cities={US_TIER_1_CITIES} />
        </div>
      </section>

      {/* Section 5 - Institutional coverage */}
      <section id="institutional" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="fade">
            <div className="grid grid-cols-1 gap-10 rounded-3xl border border-brand-navy/10 bg-[#FBFAF6] p-10 lg:grid-cols-12 lg:p-14">
              <div className="lg:col-span-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                  For builders, developers &amp; institutional operators
                </p>
                <h2 className="font-display text-3xl font-normal leading-[1.1] text-brand-navy sm:text-4xl lg:text-5xl">
                  Cross-border institutional
                  <span className="italic text-brand-emerald"> lease-up</span>
                  <span className="text-brand-gold" aria-hidden="true">
                    .
                  </span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                  MoveSmart is one of the few leasing brokerages that runs
                  institutional lease-up campaigns on both sides of the border -
                  Canadian PMCs absorbing new Sunbelt acquisitions, U.S. builders
                  opening Ontario and Quebec stock, and cross-listed REITs that
                  need unified reporting in CAD and USD.
                </p>
                <ul className="mt-6 space-y-3 font-heading text-sm text-brand-navy">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                    <span>Single program lead across Canada and the U.S.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                    <span>Jurisdiction-specific lease templates, applied inside one workflow</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                    <span>Absorption pacing, pricing strategy and staffing scaled to the campaign</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center border-t border-brand-navy/10 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                  Start the conversation
                </p>
                <p className="mt-3 font-display text-xl font-normal leading-snug text-brand-navy">
                  Request an institutional RFP and we&rsquo;ll respond within one
                  business day with a tailored scope and a named program lead.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contact/?type=institutional"
                    className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-brand-emerald"
                  >
                    Request an institutional RFP
                    <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                  <Link
                    href="/contact/?intent=call"
                    className="inline-flex items-center justify-center rounded-full border border-brand-navy/20 px-6 py-3 font-heading text-sm font-semibold text-brand-navy transition-colors hover:border-brand-emerald hover:text-brand-emerald"
                  >
                    Book a scoping call
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 6 - FAQ */}
      <FAQBlock title="Location questions, answered" questions={FAQ_ITEMS} />

      {/* Final CTA */}
      <CTABannerBlock
        headline="Ready to lease your unit - anywhere in our footprint?"
        description="Create a free account and a local leasing advisor will introduce themselves within one business day, with a rental analysis tailored to your exact address."
        primaryCta={{ label: 'Create a Free Account', href: '/signup/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/?intent=call' }}
      />
    </main>
  )
}
