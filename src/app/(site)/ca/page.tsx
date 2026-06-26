import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, TrendingUp, MapPin } from 'lucide-react'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CANADA_PROVINCES, COUNTRY_TOTALS } from '@/data/geo-market-data'
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

import { CanadaCitiesFilter } from './canada-cities-filter'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Leasing Brokerage Across Canada | MoveSmart Rentals',
  description:
    'Full-service leasing and tenant placement across Canada’s 6 largest provinces and 44 anchor cities. RECO/RECA-compliant lease execution, CMHC-aligned pricing, transparent success-fee terms.',
  alternates: {
    canonical: '/ca/',
  },
  openGraph: {
    title: 'Leasing Brokerage Across Canada | MoveSmart Rentals',
    description:
      'Full-service leasing and tenant placement across Canada’s 6 largest provinces and 44 anchor cities. RECO/RECA-compliant lease execution and CMHC-aligned pricing.',
    images: [{ url: '/og-share.png', width: 1200, height: 630, alt: 'MoveSmart Rentals Canada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage Across Canada | MoveSmart Rentals',
    description:
      'Full-service leasing and tenant placement across Canada’s 6 largest provinces and 44 anchor cities.',
    images: ['/og-share.png'],
  },
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const TORONTO_HERO =
  'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=2000&q=80'

const EDITORIAL_BANNER =
  'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=2400&q=80'

const CA = COUNTRY_TOTALS.canada

const VALUE_PROPS: Array<{
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}> = [
  {
    icon: Shield,
    title: 'RECO, RECA and OREA-compliant leasing',
    description:
      'Provincially licensed brokerage execution. Every lease, deposit and disclosure follows the Real Estate Council of Ontario, Alberta, and provincial-equivalent rules — no grey-area shortcuts that put your file at risk.',
  },
  {
    icon: TrendingUp,
    title: 'CMHC-aligned pricing intelligence',
    description:
      'We price against the same CMHC Rental Market Report data the lenders use. Comparable-set analysis at the unit level, refreshed every cycle, so listings hit market within 7 days at or above asking.',
  },
  {
    icon: MapPin,
    title: 'Brick-and-mortar offices in anchor metros',
    description:
      'Boots-on-the-ground showings in the GTA, Montreal, Vancouver, Calgary, Edmonton, Winnipeg, and Halifax. We meet your tenant in person — never a lockbox-and-pray showing strategy.',
  },
]

const CA_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: 'Do you handle leasing under each provincial Residential Tenancies Act?',
    answer:
      'Yes. Our leases are drafted to the Residential Tenancies Act of each province we serve — the standardised Form 2229 in Ontario, the TAL-mandated lease in Quebec, the Residential Tenancy Branch lease in BC, and the equivalent in Alberta, Manitoba, and Nova Scotia. Every clause is reviewed for the local act before tenants sign.',
  },
  {
    question: 'How does rent control vary across Canadian provinces?',
    answer:
      'Ontario caps annual rent increases on units first occupied before November 15, 2018 (2026 guideline: 2.5%); newer buildings are exempt. Quebec uses the TAL fixation calculator, not a flat guideline. BC sets an annual cap (2026: 3.0%). Alberta has no rent cap but limits increases to once every 12 months. Manitoba uses an annual guideline (2026: 3.0%). Nova Scotia’s temporary 5% cap remains in force through 2027.',
  },
  {
    question: 'What deposits can a landlord legally collect at lease signing?',
    answer:
      'In Ontario, only first and last month’s rent — no separate security or damage deposit is allowed. BC allows a half-month security deposit plus a half-month pet deposit. Alberta allows up to one month’s rent as a security deposit. Quebec prohibits all deposits except for keys. Manitoba allows a half-month security deposit. We collect exactly what each province permits — nothing more.',
  },
  {
    question: 'Is MoveSmart a licensed brokerage in each province?',
    answer:
      'Yes. MoveSmart Rentals operates as a licensed real estate brokerage under RECO (Ontario), with affiliated brokerage relationships and licensed associate agents covering RECA (Alberta), the OACIQ (Quebec), the BC Financial Services Authority, the Manitoba Securities Commission Real Estate Division, and the Nova Scotia Real Estate Commission.',
  },
  {
    question: 'How long does a typical Canadian leasing campaign take to fill a unit?',
    answer:
      'Median days-on-market across our 2025 Canadian portfolio was 14 days for purpose-built rentals priced to comparables, and 18 days for condo units. Toronto, Vancouver, and Ottawa run shorter (10–14 days); Calgary and Halifax sit in the 14–20 range; Edmonton and Winnipeg average 18–25 days. Mispriced listings always take longer — pricing is the lever.',
  },
  {
    question: 'How do you screen Canadian tenants — Equifax, TransUnion, or both?',
    answer:
      'Every applicant gets a soft-pull Equifax credit report, a 5-year employment and tenancy history verification (with reference calls to the two most recent landlords), and a written income confirmation showing rent at no more than 30–35% of gross monthly income. We comply with each province’s Human Rights Code — no questions about family status, source of income, or other protected grounds.',
  },
  {
    question: 'What does your full-service leasing fee structure look like in Canada?',
    answer:
      'Zero upfront. Our standard placement fee is one month’s rent, payable only when a qualified tenant signs and the first month is collected. No setup fees, no listing fees, no per-showing charges. Optional add-ons (rental protection, ongoing rent collection, annual renewals) are quoted separately and equally transparent.',
  },
  {
    question: 'Can MoveSmart support institutional lease-up campaigns of 50+ units?',
    answer:
      'Yes — that’s a meaningful share of our 2025–2026 book. We have run lease-up mandates from 50-door condo conversions in Toronto to 500-door purpose-built rental launches in Calgary and Edmonton. Lender-grade absorption reporting, on-site sales-centre operations, and unit-mix pricing strategy are included on institutional engagements.',
  },
]

// ---------------------------------------------------------------------------
// Shared classnames
// ---------------------------------------------------------------------------

const EYEBROW_CLASS =
  'mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald'
const SECTION_HEADING_CLASS =
  'font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]'
const HAIRLINE = (
  <div
    aria-hidden="true"
    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
  />
)

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function CanadaHubPage() {
  return (
    <main>
      {/* 1. Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Canada', href: '/ca/' },
          ]}
        />
      </div>

      {/* 2. Hero */}
      <PageHeroBlock
        theme="dark"
        kicker="Canada"
        eyebrow="Coast-to-coast leasing"
        headline="Leasing across Canada"
        lede={`${CA.population} population. ${CA.rentalHouseholds} rental households. $${CA.medianRent.replace('$', '')} median 2-bed rent. Six provinces, 44 anchor cities, one disciplined leasing standard — from a single basement suite to a 500-door purpose-built lease-up.`}
        cta1={{ label: 'List my property', href: PORTAL_OWNER_SIGNUP_URL }}
        cta2={{ label: 'Browse rentals', href: '/properties/' }}
        backgroundImageUrl={TORONTO_HERO}
        backgroundImageAlt="Toronto skyline with the CN Tower at dusk representing the Canadian rental market"
      />

      {/* "Two countries, same standard" intro card (white) */}
      <section className="relative bg-white py-16 sm:py-20">
        {HAIRLINE}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="slideUp" className="text-center">
            <p className={EYEBROW_CLASS}>Two countries, same standard</p>
            <h2 className={SECTION_HEADING_CLASS}>
              Built by a Canadian operator — for{' '}
              <span className="italic text-brand-emerald">Canadian landlords</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              MoveSmart was founded in the Greater Toronto Area in 2019 — long before we ever crossed into the U.S. Every province below was opened by an owner who has filed an N12, walked a CMHC absorption report, and sat through an LTB hearing. We grew south of the border only after the Canadian playbook was proven across six provinces and 44 cities. The same lease-quality bar, screening discipline, and pricing rigour you read about in our American pages was built here first — by a team that still calls home the country in this hub.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. 6-province editorial grid (ivory) */}
      <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
        {HAIRLINE}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="slideUp" className="mb-14 max-w-3xl">
            <p className={EYEBROW_CLASS}>Explore by province</p>
            <h2 className={SECTION_HEADING_CLASS}>
              Six provinces.{' '}
              <span className="italic text-brand-emerald">One standard</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              From the Ontario LTB and the Quebec TAL to the BC Residential Tenancy Branch and the Alberta RTDRS — same disciplined leasing playbook, locally compliant in every market.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CANADA_PROVINCES.map((province, i) => (
              <RevealOnScroll
                key={province.slug}
                variant="slideUp"
                delay={i * 0.08}
                className="h-full"
              >
                <Link
                  href={`/ca/${province.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-navy/5">
                    <Image
                      src={province.heroImageUrl}
                      alt={province.heroImageAlt}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <h3 className="font-display text-2xl font-normal leading-tight text-white sm:text-3xl">
                        {province.name}
                      </h3>
                      <span aria-hidden="true" className="text-2xl drop-shadow-md">
                        {province.flagEmoji}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">
                      {province.market.intro}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium">
                      <span className="rounded-full bg-brand-navy/[0.04] px-2.5 py-1 text-brand-navy/70">
                        {province.market.population} people
                      </span>
                      <span className="rounded-full bg-brand-emerald/10 px-2.5 py-1 text-brand-emerald">
                        {province.market.medianRent} median
                      </span>
                      <span className="rounded-full bg-brand-gold/10 px-2.5 py-1 text-brand-gold">
                        {province.market.vacancyRate} vacancy
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Editorial banner (image-driven) — visual rest stop */}
      <section className="relative bg-white py-16 sm:py-20">
        {HAIRLINE}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="splitReveal">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[21/9] w-full bg-brand-navy/10 sm:aspect-[21/8]">
                <Image
                  src={EDITORIAL_BANNER}
                  alt="Vancouver harbour and North Shore mountains representing leasing reach from coast to coast"
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
                      Halifax to Victoria
                    </p>
                    <p className="font-display text-2xl font-normal leading-[1.2] text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                      From Halifax to Victoria — same disciplined{' '}
                      <span className="italic text-brand-emerald">leasing playbook</span>
                      <span className="text-brand-gold">.</span>
                    </p>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                      Same pricing rigour. Same tenant screening. Same lease quality. Whether the keys change hands in downtown Toronto or a Victoria condo overlooking Inner Harbour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. All Canadian cities grid with filter (ivory) */}
      <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
        {HAIRLINE}
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
            <p className={EYEBROW_CLASS}>All cities</p>
            <h2 className={SECTION_HEADING_CLASS}>
              44 Canadian cities,{' '}
              <span className="italic text-brand-emerald">one leasing standard</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Pick your market. Each city page carries the latest CMHC vacancy, median asking rent by bedroom count, neighbourhood breakdowns, and the local leasing nuances we run against.
            </p>
          </RevealOnScroll>

          <CanadaCitiesFilter />
        </div>
      </section>

      {/* 8. Why MoveSmart in Canada (white) */}
      <section className="relative bg-white py-20 sm:py-24">
        {HAIRLINE}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="slideUp" className="mb-14 max-w-3xl">
            <p className={EYEBROW_CLASS}>Why MoveSmart in Canada</p>
            <h2 className={SECTION_HEADING_CLASS}>
              Built for Canadian{' '}
              <span className="italic text-brand-emerald">landlords</span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Three things every Canadian owner, PMC, and developer needs from a leasing partner — and the disciplined version of each we deliver.
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

      {/* 9. FAQ */}
      <FAQBlock title="Leasing in Canada, answered" questions={CA_FAQS} />

      {/* 10. CTA */}
      <CTABannerBlock
        headline="List your Canadian rental with MoveSmart"
        description="Zero upfront. Success-fee only. Lease in 14 days, screened against five years of tenant history."
        primaryCta={{ label: 'List my property', href: PORTAL_OWNER_SIGNUP_URL }}
        secondaryCta={{ label: 'Browse rentals', href: '/properties/' }}
      />
    </main>
  )
}
