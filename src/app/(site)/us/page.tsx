import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, TrendingUp, MapPin } from 'lucide-react'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { US_STATES, COUNTRY_TOTALS } from '@/data/geo-market-data'
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

import { UsCitiesFilter } from './us-cities-filter'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Leasing Brokerage Across the United States | MoveSmart Rentals',
  description:
    'Full-service leasing and tenant placement across 10 US states and 57 anchor cities. State-licensed brokerage partners, ZIP-level pricing, transparent success-fee terms.',
  alternates: {
    canonical: '/us/',
  },
  openGraph: {
    title: 'Leasing Brokerage Across the United States | MoveSmart Rentals',
    description:
      'Full-service leasing and tenant placement across 10 US states and 57 anchor cities. State-licensed brokerage partners and ZIP-level pricing.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'MoveSmart Rentals United States' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage Across the United States | MoveSmart Rentals',
    description:
      'Full-service leasing and tenant placement across 10 US states and 57 anchor cities.',
    images: ['/og-default.png'],
  },
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const NYC_HERO =
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=80'

// Austin skyline — used for the mid-page editorial banner (not the NYC hero).
const EDITORIAL_BANNER =
  'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=2400&q=80'

const US = COUNTRY_TOTALS.us

const VALUE_PROPS: Array<{
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}> = [
  {
    icon: Shield,
    title: 'State-licensed brokerage partners',
    description:
      'Every market we touch runs through a state-licensed real estate brokerage — FREC (Florida), TREC (Texas), DRE (California), NYSDOS (New York), and equivalents. Lease execution, deposit handling, and disclosures follow the local statute, never a federal shortcut.',
  },
  {
    icon: TrendingUp,
    title: 'ZIP-level pricing intelligence',
    description:
      'We price against Zillow ZORI, RealPage, CoStar, and local MLS comps at the ZIP level — not the metro level. Asking rent gets set against unit-mix-matched comps refreshed every week, not against a stale CMA pulled at listing time.',
  },
  {
    icon: MapPin,
    title: 'Multi-state portfolio coverage',
    description:
      'Whether you own one Florida vacation rental, six Texas duplexes, or a 200-unit Phoenix lease-up, you get one point of contact, one reporting cadence, and one consolidated success-fee invoice across every state.',
  },
]

const US_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: 'How does landlord-tenant law vary state to state?',
    answer:
      'Significantly. Notice periods to terminate range from 30 days (most states) to 90 days (California for tenancies of one year or more). Security deposit limits run from one month (Florida, Georgia) to two months (California, Massachusetts) to unlimited (Texas). Eviction filing requirements, late-fee caps, and habitability standards all sit at the state — and often city — level. We lease against the specific statute for every jurisdiction we touch.',
  },
  {
    question: 'What are the security deposit limits in the states you serve?',
    answer:
      'Florida — no statutory cap, but must be held in a separate account with annual interest disclosure. Texas — no cap. California — two months for unfurnished, three for furnished (changes phasing in under AB 12). New York — one month cap. Illinois — one month cap in Chicago, no statewide cap. Georgia — no cap. North Carolina — two months for terms over one year. Arizona — 1.5 months. Colorado — no cap, but 60-day return deadline. New Jersey — 1.5 months.',
  },
  {
    question: 'How do you ensure Fair Housing Act compliance on every listing?',
    answer:
      'Every listing, screening criterion, and tenant communication is reviewed against the federal Fair Housing Act (race, colour, religion, sex including gender identity and sexual orientation, national origin, disability, familial status) plus the additional protected classes in each state we operate in (source of income, age, marital status, and others). Our screening criteria are documented and applied identically to every applicant — no discretionary deviation.',
  },
  {
    question: 'Do your listings syndicate through IDX and the major rental portals?',
    answer:
      'Yes. We syndicate to Zillow, Trulia, HotPads, Apartments.com, Rent.com, Realtor.com, Redfin, Apartment List, Zumper, and the local MLS IDX feed in every market that supports rental IDX. Photography, floor plans, 3D tours, and unit-mix detail flow to all 50+ portals from a single source so the listing reads identically everywhere.',
  },
  {
    question: 'How do you handle ESA (emotional support animal) and service animal requests?',
    answer:
      'Strictly per HUD guidance and the federal Fair Housing Act. Service animals (ADA) and ESAs (FHA) are not pets — no pet deposit, no breed restriction, no extra rent. We require the standard HUD-approved reasonable accommodation request with a treating-provider letter and apply the standard two-question framework for service animals. Owners are protected, applicants are respected, and the file is audit-defensible.',
  },
  {
    question: 'How fast does a US leasing campaign typically close?',
    answer:
      'Median days-on-market across our 2025 US portfolio was 21 days. Phoenix, Charlotte, and Atlanta sit at 14–18 days; Austin and Miami at 18–24 days; New York and Jersey City at 18–28 days depending on building class. California submarkets vary widely — coastal LA averages 24 days, Inland Empire closer to 30. Mispriced listings always run longer.',
  },
  {
    question: 'What does your US fee structure look like?',
    answer:
      'Zero upfront. Standard placement fee is 75–100% of one month’s rent, payable only when a qualified tenant signs the lease and pays the first month. No setup fees, no listing fees, no marketing pass-throughs. Optional add-ons — rental protection, monthly rent collection, annual renewal — are quoted separately, tier-priced, and equally transparent.',
  },
  {
    question: 'Do you support 1031 exchange owners and accidental landlords?',
    answer:
      'Yes — both segments are core to our US book. For 1031 exchange owners we coordinate with your qualified intermediary, structure the lease to align with passive-rental treatment, and deliver Schedule E-ready year-end statements. For accidental landlords (out-of-state job relocation, inherited property, slow-sale conversion to rental), we take the property from empty to leased in 14–21 days with zero owner involvement past the initial intake.',
  },
]

// ---------------------------------------------------------------------------
// Shared eyebrow + hairline classes (visual spine)
// ---------------------------------------------------------------------------

const EYEBROW = 'text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald'
const HEADING =
  'font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]'

function GoldHairline() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
    />
  )
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function USHubPage() {
  return (
    <main>
      {/* 1. Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'United States', href: '/us/' },
          ]}
        />
      </div>

      {/* 2. Hero (kept verbatim) */}
      <PageHeroBlock
        theme="dark"
        kicker="United States"
        eyebrow="Multi-state leasing"
        headline="Leasing across the United States"
        lede={`${US.population} population. ${US.rentalHouseholds} rental households. ${US.medianRent} median 2-bed rent. Ten states, 57 anchor cities — same disciplined leasing playbook from a single Miami condo to a 500-door Austin lease-up.`}
        cta1={{ label: 'List my property', href: PORTAL_OWNER_SIGNUP_URL }}
        cta2={{ label: 'Browse rentals', href: '/properties/' }}
        backgroundImageUrl={NYC_HERO}
        backgroundImageAlt="Manhattan skyline at dusk representing the US rental market"
      />

      {/* "Built American, expanding everywhere" intro card (white) */}
      <section className="relative bg-white py-16 sm:py-20">
        <GoldHairline />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="slideUp">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-brand-navy/10 bg-[#FBFAF6] px-6 py-10 text-center shadow-sm sm:px-12 sm:py-14">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
              />
              <p className={`mb-4 ${EYEBROW}`}>Built American, expanding everywhere</p>
              <h2 className="font-display text-2xl font-normal leading-tight tracking-tight text-brand-navy sm:text-3xl md:text-[2.25rem]">
                An American-rooted brokerage, now leasing across{' '}
                <span className="italic text-brand-emerald">ten states</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                MoveSmart was built around US landlord-tenant practice — Florida deposits, Texas eviction filings, California rent caps, New York broker law. Today we run the same disciplined playbook across ten states and 57 anchor cities, through state-licensed brokerage partners, with a single consolidated relationship for every owner. One contract, one fee structure, fifty-seven local pricing engines.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. State cards (ivory) */}
      <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
        <GoldHairline />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="slideUp" className="mb-14 max-w-3xl">
            <p className={`mb-3 ${EYEBROW}`}>Explore by state</p>
            <h2 className={HEADING}>
              Ten states.{' '}
              <span className="italic text-brand-emerald">One standard</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              From Florida’s no-state-income-tax Sun Belt to California’s tech corridors and the New York–New Jersey commuter belt — leasing executed against the specific state landlord-tenant act, not a federal one-size-fits-all template.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {US_STATES.map((state, i) => (
              <RevealOnScroll
                key={state.slug}
                variant="slideUp"
                delay={i * 0.06}
                className="h-full"
              >
                <Link
                  href={`/us/${state.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-navy/5">
                    <Image
                      src={state.heroImageUrl}
                      alt={state.heroImageAlt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <h3 className="font-display text-2xl font-normal leading-tight text-white sm:text-3xl">
                        {state.name}
                      </h3>
                      <span aria-hidden="true" className="text-2xl drop-shadow-md">
                        {state.flagEmoji}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {state.market.intro}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 border-t border-brand-navy/10 pt-4 text-[11px] font-medium">
                      <span className="rounded-full bg-brand-navy/[0.04] px-2.5 py-1 text-brand-navy/70">
                        {state.market.population}
                      </span>
                      <span className="rounded-full bg-brand-emerald/10 px-2.5 py-1 text-brand-emerald">
                        {state.market.medianRent} median
                      </span>
                      <span className="rounded-full bg-brand-gold/10 px-2.5 py-1 text-brand-gold">
                        {state.market.vacancyRate} vacancy
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Editorial banner — visual rest stop between states and all-cities (white) */}
      <section className="relative bg-white py-16 sm:py-20">
        <GoldHairline />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="splitReveal">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[21/9] w-full bg-brand-navy/10 sm:aspect-[21/8]">
                <Image
                  src={EDITORIAL_BANNER}
                  alt="Austin, Texas skyline at dusk representing leasing reach across the United States"
                  fill
                  unoptimized
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/55 to-brand-navy/15"
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-2xl px-6 py-10 sm:px-12 lg:px-16">
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                      Miami to Denver
                    </p>
                    <p className="font-display text-2xl font-normal leading-[1.2] text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                      From Miami to Denver — same disciplined{' '}
                      <span className="italic text-brand-emerald">leasing playbook</span>
                      <span className="text-brand-gold">.</span>
                    </p>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                      Same pricing rigour. Same tenant screening. Same lease quality. State-by-state compliance with the local landlord-tenant act, one consolidated relationship for the owner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. All US cities grid with filter (ivory) */}
      <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
        <GoldHairline />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="slideUp" className="mb-10 text-center">
            <p className={`mb-3 ${EYEBROW}`}>All cities</p>
            <h2 className={HEADING}>
              57 American cities,{' '}
              <span className="italic text-brand-emerald">one leasing standard</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Pick your market. Each city page carries the latest Zillow ZORI rent index, ACS population and median household income, neighbourhood breakdowns, and the state-specific leasing nuances we run against.
            </p>
          </RevealOnScroll>

          <UsCitiesFilter />
        </div>
      </section>

      {/* 8. Why MoveSmart in the US (white) */}
      <section className="relative bg-white py-20 sm:py-24">
        <GoldHairline />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="slideUp" className="mb-14 max-w-3xl">
            <p className={`mb-3 ${EYEBROW}`}>Why MoveSmart in the US</p>
            <h2 className={HEADING}>
              Built for American{' '}
              <span className="italic text-brand-emerald">landlords</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Three things every US owner, PMC, and developer needs from a leasing partner — and the disciplined version of each we deliver across all ten states.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((vp, i) => {
              const Icon = vp.icon
              return (
                <RevealOnScroll key={vp.title} variant="slideUp" delay={i * 0.1}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-md">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
                    />
                    <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
                      {vp.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {vp.description}
                    </p>
                  </div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. FAQ (kept) */}
      <FAQBlock
        title="Leasing in the United States, answered"
        questions={US_FAQS}
      />

      {/* 10. Closing CTA (kept) */}
      <CTABannerBlock
        headline="List your US rental with MoveSmart"
        description="Zero upfront. Success-fee only. Lease in 21 days, screened against five years of tenant history and state-specific Fair Housing rules."
        primaryCta={{ label: 'List my property', href: PORTAL_OWNER_SIGNUP_URL }}
        secondaryCta={{ label: 'Browse rentals', href: '/properties/' }}
      />
    </main>
  )
}
