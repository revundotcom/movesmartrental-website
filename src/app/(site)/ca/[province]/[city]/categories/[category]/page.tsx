import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { generatePageMetadata } from '@/lib/metadata'
import {
  buildBreadcrumbListSchema,
  buildItemListSchema,
} from '@/lib/schema-builders'
import { getFallbackCityList } from '@/lib/static-fallbacks'

// ---------------------------------------------------------------------------
// Canonical categories (contract §10)
// ---------------------------------------------------------------------------

type CategorySlug =
  | 'apartments-for-rent'
  | 'condos-for-rent'
  | 'houses-for-rent'
  | 'townhouses-for-rent'
  | 'basement-apartments-for-rent'
  | 'duplex-for-rent'

const CANONICAL_CATEGORIES: readonly CategorySlug[] = [
  'apartments-for-rent',
  'condos-for-rent',
  'houses-for-rent',
  'townhouses-for-rent',
  'basement-apartments-for-rent',
  'duplex-for-rent',
] as const

interface CategoryMeta {
  /** Singular UI label - "Apartment" */
  singular: string
  /** Plural UI label - "Apartments" */
  plural: string
  /** Title-case label for headline - "Apartments for Rent" */
  headlineLabel: string
  /** Schema.org property type */
  schemaType: 'Apartment' | 'House' | 'Residence'
  /** One-sentence scope line */
  scope: string
}

const CATEGORY_META: Record<CategorySlug, CategoryMeta> = {
  'apartments-for-rent': {
    singular: 'Apartment',
    plural: 'Apartments',
    headlineLabel: 'Apartments for Rent',
    schemaType: 'Apartment',
    scope:
      'Purpose-built rental apartments - low-rise, mid-rise, and high-rise units across the local market.',
  },
  'condos-for-rent': {
    singular: 'Condo',
    plural: 'Condos',
    headlineLabel: 'Condos for Rent',
    schemaType: 'Apartment',
    scope:
      'Individually owned condominium units leased through licensed brokerage execution.',
  },
  'houses-for-rent': {
    singular: 'House',
    plural: 'Houses',
    headlineLabel: 'Houses for Rent',
    schemaType: 'House',
    scope:
      'Detached single-family homes, semi-detached, and freehold houses across the local market.',
  },
  'townhouses-for-rent': {
    singular: 'Townhouse',
    plural: 'Townhouses',
    headlineLabel: 'Townhouses for Rent',
    schemaType: 'Residence',
    scope:
      'Freehold and condo townhouses leased to qualified renters through MoveSmart Rentals.',
  },
  'basement-apartments-for-rent': {
    singular: 'Basement Apartment',
    plural: 'Basement Apartments',
    headlineLabel: 'Basement Apartments for Rent',
    schemaType: 'Apartment',
    scope:
      'Legal basement apartments and secondary suites in owner-occupied or investor-held homes.',
  },
  'duplex-for-rent': {
    singular: 'Duplex',
    plural: 'Duplexes',
    headlineLabel: 'Duplex for Rent',
    schemaType: 'Residence',
    scope:
      'Two-unit duplex homes - individual unit rentals or full-building leases.',
  },
}

// ---------------------------------------------------------------------------
// The 9-service leasing execution block (static content - no fabricated stats)
// ---------------------------------------------------------------------------

interface LeasingService {
  title: string
  href: string
  summary: string
}

const LEASING_SERVICES: LeasingService[] = [
  {
    title: 'Tenant Placement',
    href: '/services/tenant-placement/',
    summary:
      'Marketing launch, qualified showings, and signed lease - priced as a one-time success fee.',
  },
  {
    title: 'Leasing Services',
    href: '/services/leasing-services/',
    summary:
      'RTA-compliant lease drafting, digital signing, and renewal handling.',
  },
  {
    title: 'Tenant Screening',
    href: '/services/tenant-screening/',
    summary:
      'Credit, employment, reference, ID, and tenancy-history checks on every applicant.',
  },
  {
    title: 'Rent Guarantee',
    href: '/services/rent-guarantee/',
    summary: 'Protection against missed payments once a qualified tenant signs.',
  },
  {
    title: 'Tenant Insurance',
    href: '/services/',
    summary:
      'Renter liability and contents coverage bundled at lease execution.',
  },
  {
    title: 'Tenant Guarantor',
    href: '/services/',
    summary:
      'Co-signer support for newcomers, students, and applicants with thin credit files.',
  },
  {
    title: 'Rental Preparation',
    href: '/services/rental-preparation/',
    summary:
      'Staging, professional photography, and listing copy before the unit goes live.',
  },
  {
    title: 'Portal & Technology',
    href: '/portal-and-technology/',
    summary: 'Owner and applicant portal - paperwork, status, and reporting in one place.',
  },
  {
    title: 'Institutional Lease-Up',
    href: '/services/',
    summary:
      'Bulk lease-up for new builds and multi-unit portfolios on a dedicated timeline.',
  },
]

// ---------------------------------------------------------------------------
// Copy generators
// ---------------------------------------------------------------------------

interface PainPoint {
  title: string
  body: string
}

function buildPainPoints(cat: CategoryMeta, cityTitle: string): PainPoint[] {
  const unit = cat.singular.toLowerCase()
  return [
    {
      title: `${cat.plural} sit empty`,
      body: `Thin marketing and slow showings mean a ${unit} in ${cityTitle} can bleed weeks of carrying cost before a lease is signed.`,
    },
    {
      title: 'Applicants are under-screened',
      body: `Without a five-point verification pipeline, a ${unit} gets signed to renters who can't afford it or won't honour the lease.`,
    },
    {
      title: 'Leases expose the landlord',
      body: `DIY leases miss RTA clauses specific to ${cityTitle}, creating enforcement problems when issues surface.`,
    },
    {
      title: 'No backup if rent stops',
      body: `When rent misses arrive, the owner has no rent-guarantee layer and no tenant-insurance trigger to absorb the hit.`,
    },
  ]
}

interface FaqPair {
  question: string
  answer: string
}

function buildFaq(
  cat: CategoryMeta,
  cityTitle: string,
  provinceTitle: string
): FaqPair[] {
  const unit = cat.singular.toLowerCase()
  const units = cat.plural.toLowerCase()
  return [
    {
      question: `How does MoveSmart Rentals lease ${units} in ${cityTitle}?`,
      answer: `Each ${unit} runs through a nine-step leasing sequence: unit prep, pricing, listing, marketing, showings, applicant screening, lease drafting, digital signing, and move-in coordination. Every step is handled by the local MoveSmart team in ${cityTitle}.`,
    },
    {
      question: `What does it cost to rent out a ${unit} with MoveSmart Rentals?`,
      answer: `MoveSmart Rentals charges a success fee at lease signing - no upfront marketing fees, no monthly lock-in, no long-term contract. See the full pricing page for current rates.`,
    },
    {
      question: `How fast can a ${unit} in ${cityTitle} be leased?`,
      answer: `Turnaround depends on pricing and unit condition. Most marketed ${units} in ${cityTitle} attract qualified applications within two weeks once the listing is live and photography is in place.`,
    },
    {
      question: `What kind of tenant screening runs on each ${unit}?`,
      answer: `Every applicant clears a five-point screen: credit check, income verification, employment reference, previous-landlord reference, and government ID match. A written recommendation is delivered before any lease is signed.`,
    },
    {
      question: `Is the lease RTA-compliant for ${provinceTitle}?`,
      answer: `Yes. Every ${unit} leased through MoveSmart Rentals uses the standard ${provinceTitle} residential tenancy lease with jurisdiction-specific clauses attached. Digital signing is run through the owner portal.`,
    },
    {
      question: `Do you handle the unit after the lease is signed?`,
      answer: `MoveSmart Rentals is a leasing brokerage - the lease, deposit, and move-in are handled end-to-end. Ongoing operational work after move-in is coordinated with the owner's preferred operator or in-house team.`,
    },
    {
      question: `Can I list my ${unit} on multiple portals?`,
      answer: `Yes. Each marketed ${unit} syndicates across the major Canadian rental portals plus the MoveSmart Rentals site. Lead capture is centralised so every inquiry is qualified in one pipeline.`,
    },
    {
      question: `What if the ${unit} needs prep work before going live?`,
      answer: `MoveSmart Rentals offers a rental-preparation layer - staging guidance, professional photography, and listing copy - so the ${unit} hits the market camera-ready. This is optional and priced separately.`,
    },
  ]
}

// ---------------------------------------------------------------------------
// Metadata helpers
// ---------------------------------------------------------------------------

function trimDescription(text: string, max = 158): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

function isCanonicalCategory(slug: string): slug is CategorySlug {
  return (CANONICAL_CATEGORIES as readonly string[]).includes(slug)
}

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

const PROVINCE_NAMES: Record<string, string> = {
  ontario: 'Ontario',
}

export const dynamicParams = true

export async function generateStaticParams() {
  // Prerender the 6 canonical categories across every Ontario city we ship
  // content for. Tier-1 + tier-2 Ontario cities live in the static-fallbacks
  // list (via getFallbackCityList, filtered to provinceSlug='ontario').
  const ontarioCities = getFallbackCityList().filter(
    (c) => c.provinceSlug === 'ontario'
  )

  const params: Array<{ province: string; city: string; category: string }> =
    []

  for (const city of ontarioCities) {
    for (const category of CANONICAL_CATEGORIES) {
      params.push({
        province: 'ontario',
        city: city.slug.current,
        category,
      })
    }
  }

  return params
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

function humanise(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string; category: string }>
}): Promise<Metadata> {
  const { province, city, category } = await params

  if (!isCanonicalCategory(category)) return {}

  const meta = CATEGORY_META[category]
  const cityTitle = humanise(city)
  const provinceTitle = PROVINCE_NAMES[province] ?? humanise(province)

  // Keep title 50-60 chars: "{Category} in {City}, {Province} | MoveSmart"
  const fallbackTitle = `${meta.headlineLabel} in ${cityTitle}, ${provinceTitle} | MoveSmart`

  const descBase = `${meta.headlineLabel} in ${cityTitle}, ${provinceTitle}. White-glove leasing brokerage - strategic pricing, verified applicants, RTA-compliant leases, updated weekly.`

  return generatePageMetadata({
    path: `/ca/${province}/${city}/categories/${category}`,
    fallbackTitle,
    fallbackDescription: trimDescription(descBase),
  })
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function PropertyCategoryPage({
  params,
}: {
  params: Promise<{ province: string; city: string; category: string }>
}) {
  const { province, city, category } = await params

  if (!isCanonicalCategory(category)) {
    notFound()
  }

  const meta = CATEGORY_META[category]
  const cityTitle = humanise(city)
  const provinceTitle = PROVINCE_NAMES[province] ?? humanise(province)
  const pageUrl = `${SITE_URL}/ca/${province}/${city}/categories/${category}/`

  // ── Related categories in this city ───────────────────────────────────
  const relatedCategories = CANONICAL_CATEGORIES.filter(
    (c) => c !== category
  ).map((c) => ({
    slug: c,
    meta: CATEGORY_META[c],
    href: `/ca/${province}/${city}/categories/${c}/`,
  }))

  // ── Related cities (same category in tier-1 peers) ────────────────────
  const ontarioCities = getFallbackCityList().filter(
    (c) => c.provinceSlug === 'ontario' && c.slug.current !== city
  )
  const relatedCities = ontarioCities.slice(0, 8)

  // ── Pain points & FAQ ────────────────────────────────────────────────
  const painPoints = buildPainPoints(meta, cityTitle)
  const faq = buildFaq(meta, cityTitle, provinceTitle)

  // ── JSON-LD ──────────────────────────────────────────────────────────
  const breadcrumbSchema = buildBreadcrumbListSchema({
    crumbs: [
      { name: 'Home', url: SITE_URL },
      { name: provinceTitle, url: `${SITE_URL}/ca/${province}/` },
      { name: cityTitle, url: `${SITE_URL}/ca/${province}/${city}/` },
      { name: meta.headlineLabel, url: pageUrl },
    ],
  })

  const itemListSchema = buildItemListSchema({
    name: `${meta.headlineLabel} in ${cityTitle}`,
    description: `${meta.headlineLabel} available through MoveSmart Rentals in ${cityTitle}, ${provinceTitle}.`,
    url: pageUrl,
    items: CANONICAL_CATEGORIES.map((c, i) => ({
      name: CATEGORY_META[c].headlineLabel,
      url: `${SITE_URL}/ca/${province}/${city}/categories/${c}/`,
      description: CATEGORY_META[c].scope,
      position: i + 1,
    })),
  })

  return (
    <main className="bg-[#FBFAF6]">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: provinceTitle, href: `/ca/${province}/` },
            { label: cityTitle, href: `/ca/${province}/${city}/` },
            { label: meta.headlineLabel, href: pageUrl.replace(SITE_URL, '') },
          ]}
        />
      </div>

      {/* Hero - single H1, no meta prop */}
      <PageHeroBlock
        kicker={`${cityTitle} rentals`}
        eyebrow={`White-glove leasing brokerage`}
        headline={`${meta.headlineLabel} in ${cityTitle}, ${provinceTitle}`}
        accentLastWord={false}
        lede={`${meta.scope} MoveSmart Rentals runs the full leasing sequence - pricing, marketing, screening, and signing - so every ${meta.singular.toLowerCase()} in ${cityTitle} is leased to a qualified renter.`}
        cta1={{ label: 'Apply now', href: '/contact/?intent=apply' }}
        cta2={{ label: 'Talk to a broker', href: '/contact/' }}
        city={city}
      />

      {/* Proof strip */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-brand-emerald" aria-hidden="true" />
            <span>
              <span className="font-semibold text-brand-navy">
                {meta.plural} in {cityTitle}
              </span>{' '}
              · Updated weekly
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              <span className="font-semibold text-brand-navy">Category:</span>{' '}
              {meta.headlineLabel}
            </span>
            <span>
              <span className="font-semibold text-brand-navy">City:</span>{' '}
              {cityTitle}
            </span>
            <span>
              <span className="font-semibold text-brand-navy">Province:</span>{' '}
              {provinceTitle}
            </span>
          </div>
        </div>
      </section>

      {/* Problem block */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              The problem
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
              What goes wrong when you rent a{' '}
              <span className="font-display italic text-brand-emerald">
                {meta.singular.toLowerCase()}
              </span>{' '}
              in {cityTitle} without professional leasing
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-normal text-brand-navy">
                  {p.title}
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Solution block - 9-service leasing execution */}
      <section className="relative overflow-hidden bg-brand-navy py-16">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="mx-auto max-w-7xl px-4">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
                The solution
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal text-white sm:text-4xl">
                Nine-service leasing execution for every{' '}
                <span className="font-display italic text-brand-emerald">
                  {meta.singular.toLowerCase()}
                </span>{' '}
                in {cityTitle}
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                Every {meta.singular.toLowerCase()} leased through MoveSmart
                Rentals runs the same disciplined sequence - no shortcuts, no
                DIY gaps, no hand-offs between disconnected vendors.
              </p>
            </div>
          </RevealOnScroll>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LEASING_SERVICES.map((svc, i) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-emerald/40 hover:bg-white/10"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 font-display text-lg font-normal text-white">
                  {svc.title}
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {svc.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQBlock
        questions={faq}
        title={`${meta.headlineLabel} in ${cityTitle} - FAQ`}
        schemaEnabled={true}
      />

      {/* Related categories in this city */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              More categories
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
              Other rental categories in{' '}
              <span className="font-display italic text-brand-emerald">
                {cityTitle}
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </div>
        </RevealOnScroll>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedCategories.map((rc) => (
            <Link
              key={rc.slug}
              href={rc.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-emerald hover:shadow-sm"
            >
              <h3 className="font-display text-lg font-normal text-brand-navy">
                {rc.meta.headlineLabel}
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {rc.meta.scope}
              </p>
              <p className="mt-3 text-sm font-semibold text-brand-emerald">
                See {rc.meta.plural.toLowerCase()} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Related cities (same category elsewhere in Ontario) */}
      {relatedCities.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                  Nearby cities
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
                  {meta.headlineLabel} in other{' '}
                  <span className="font-display italic text-brand-emerald">
                    {provinceTitle}
                  </span>{' '}
                  cities
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </div>
            </RevealOnScroll>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedCities.map((rc) => (
                <Link
                  key={rc.slug.current}
                  href={`/ca/${province}/${rc.slug.current}/categories/${category}/`}
                  className="rounded-xl border border-slate-200 bg-[#FBFAF6] px-4 py-3 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5 hover:text-brand-emerald"
                >
                  {rc.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <CTABannerBlock
        headline={`Lease a ${meta.singular.toLowerCase()} in ${cityTitle} with MoveSmart`}
        description={`Zero upfront cost, success-fee pricing, RTA-compliant leases. Tell us about the ${meta.singular.toLowerCase()}.`}
        primaryCta={{ label: 'Talk to a broker', href: '/contact/' }}
        secondaryCta={{ label: 'See pricing', href: '/pricing/' }}
        city={city}
      />
    </main>
  )
}

// ---------------------------------------------------------------------------
// Constants (module-scoped)
// ---------------------------------------------------------------------------

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
