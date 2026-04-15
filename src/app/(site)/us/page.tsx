import type { Metadata } from 'next'
import Link from 'next/link'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { getFallbackCityList } from '@/lib/static-fallbacks'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StateCard {
  _id: string
  title: string
  slug: string
  abbreviation?: string
  description?: string
  cityCount: number
}

// ---------------------------------------------------------------------------
// Static state data (Sanity has been removed)
// ---------------------------------------------------------------------------

const US_STATES_META: Array<{
  _id: string
  title: string
  slug: string
  abbreviation: string
  description: string
}> = [
  {
    _id: 'state-florida-static',
    title: 'Florida',
    slug: 'florida',
    abbreviation: 'FL',
    description:
      'Sun Belt leasing demand driven by Northeast migration and international investors. Strongest in Miami, Tampa, Orlando, and Fort Lauderdale.',
  },
  {
    _id: 'state-texas-static',
    title: 'Texas',
    slug: 'texas',
    abbreviation: 'TX',
    description:
      'Fastest-growing state by new-resident rental demand. Austin, Houston, and the DFW metroplex anchor our Texas footprint.',
  },
  {
    _id: 'state-california-static',
    title: 'California',
    slug: 'california',
    abbreviation: 'CA',
    description:
      'The most competitive rental market in North America with strict tenant-protection statutes. AB-1482 and Costa-Hawkins specialist leasing.',
  },
  {
    _id: 'state-new-york-static',
    title: 'New York',
    slug: 'new-york',
    abbreviation: 'NY',
    description:
      'From Manhattan\u2019s ultra-competitive submarkets through emerging Brooklyn and Queens neighbourhoods. DHCR-aware, rent-stabilization-aware leasing.',
  },
  {
    _id: 'state-illinois-static',
    title: 'Illinois',
    slug: 'illinois',
    abbreviation: 'IL',
    description:
      'Chicago metro leasing with Chicago RLTO compliance plus collar-county growth submarkets.',
  },
  {
    _id: 'state-georgia-static',
    title: 'Georgia',
    slug: 'georgia',
    abbreviation: 'GA',
    description:
      'Atlanta-anchored leasing across a fast-growing Sun Belt state with strong in-migration and build-to-rent inventory.',
  },
  {
    _id: 'state-north-carolina-static',
    title: 'North Carolina',
    slug: 'north-carolina',
    abbreviation: 'NC',
    description:
      'Charlotte and Raleigh-Durham leasing across one of the strongest tech-and-finance inbound migration corridors in the US.',
  },
  {
    _id: 'state-arizona-static',
    title: 'Arizona',
    slug: 'arizona',
    abbreviation: 'AZ',
    description:
      'Phoenix-metro leasing with disciplined pricing for a market shaped by seasonal rental cycles and California in-migration.',
  },
  {
    _id: 'state-colorado-static',
    title: 'Colorado',
    slug: 'colorado',
    abbreviation: 'CO',
    description:
      'Denver-anchored leasing with Front Range coverage for a market that balances strong wage growth and steady rental demand.',
  },
  {
    _id: 'state-new-jersey-static',
    title: 'New Jersey',
    slug: 'new-jersey',
    abbreviation: 'NJ',
    description:
      'Northern New Jersey leasing with a focus on NYC-commuter submarkets and dense rental inventory along the Hudson corridor.',
  },
]

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Leasing Brokerage in the United States | MoveSmart Rentals',
  description:
    'White-glove leasing brokerage expanding across the United States. Tenant placement, screening, and lease execution in Florida, Texas, California, New York, and more.',
  alternates: {
    canonical: '/us/',
  },
  openGraph: {
    title: 'Leasing Brokerage in the United States | MoveSmart Rentals',
    description:
      'White-glove leasing brokerage expanding across the United States. Tenant placement, screening, and lease execution in Florida, Texas, California, New York, and more.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'MoveSmart Rentals United States' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage in the United States | MoveSmart Rentals',
    description:
      'White-glove leasing brokerage expanding across the United States. Tenant placement, screening, and lease execution in Florida, Texas, California, New York, and more.',
    images: ['/og-default.png'],
  },
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function USHubPage() {
  // Static local data (Sanity has been removed). City counts are derived
  // from the local city list by matching provinceSlug (which holds the
  // state slug for US entries).
  const cityList = getFallbackCityList()
  const states: StateCard[] = US_STATES_META.map((s) => ({
    _id: s._id,
    title: s.title,
    slug: s.slug,
    abbreviation: s.abbreviation,
    description: s.description,
    cityCount: cityList.filter((c) => c.provinceSlug === s.slug).length,
  }))

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'United States', href: '/us/' },
          ]}
        />
      </div>

      {/* 1. Hero */}
      <HeroBlock
        headline="Leasing Brokerage Across the United States"
        subheadline="MoveSmart Rentals is expanding into America's top rental markets, bringing our zero-upfront, success-fee leasing model to US landlords, property managers, and developers."
      />

      {/* 2. Intro section */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Expanding Into America&apos;s Top Markets
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          Building on our leasing execution across Canada, MoveSmart Rentals is
          bringing white-glove leasing brokerage to the United States. Our US
          operations focus on high-growth rental markets where landlords,
          property managers, and developers need disciplined leasing execution
          with transparent pricing. From Florida&apos;s Sun Belt to
          California&apos;s tech corridors, we deliver strategic rental pricing,
          professional marketing, tenant qualification, and lease execution -
          zero upfront, success-fee only.
        </p>
      </section>

      {/* 3. State cards */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Explore by State
        </h2>

        {states.length === 0 ? (
          <p className="text-center text-muted-foreground">
            State listings are coming soon. Check back as we expand into new
            markets.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {states.map((state) => (
              <Link
                key={state._id}
                href={`/us/${state.slug}/`}
                className="group"
              >
                <div className="h-full rounded-lg border bg-card p-6 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary">
                      {state.title}
                    </h3>
                    {state.abbreviation && (
                      <span className="rounded bg-muted px-2 py-1 text-sm font-medium text-muted-foreground">
                        {state.abbreviation}
                      </span>
                    )}
                  </div>

                  {state.description && (
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {state.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {state.cityCount}{' '}
                      {state.cityCount === 1 ? 'city' : 'cities'}
                    </span>
                    <span className="font-medium text-primary group-hover:underline">
                      View State &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. CTA */}
      <CTABannerBlock
        headline="Own Rental Property in the US? Let Us Lease It."
        description="MoveSmart Rentals is bringing white-glove leasing brokerage to America's top rental markets - zero upfront, success-fee pricing."
        primaryCta={{ label: 'Book a Free Consultation', href: '/contact/' }}
        secondaryCta={{ label: 'View Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
