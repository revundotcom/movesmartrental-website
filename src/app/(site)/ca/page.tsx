import type { Metadata } from 'next'
import Link from 'next/link'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { sanityFetch } from '@/sanity/fetch'
import { COUNTRY_PROVINCES_QUERY } from '@/sanity/queries/province'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProvinceCard {
  _id: string
  title: string
  slug: string
  abbreviation?: string
  description?: string
  cityCount: number
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Property Management in Canada',
  description:
    'Professional property management across Canada. Explore our services in Ontario, Quebec, British Columbia, Alberta, Nova Scotia, and more.',
  alternates: {
    canonical: '/ca/',
  },
  openGraph: {
    title: 'Property Management in Canada',
    description:
      'Professional property management across Canada. Explore our services in Ontario, Quebec, British Columbia, Alberta, Nova Scotia, and more.',
  },
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function CanadaHubPage() {
  const provinces = await sanityFetch<ProvinceCard[]>({
    query: COUNTRY_PROVINCES_QUERY,
    params: { country: 'ca' },
    tags: ['province'],
  })

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Canada', href: '/ca/' },
          ]}
        />
      </div>

      {/* 1. Hero */}
      <HeroBlock
        headline="Property Management Across Canada"
        subheadline="From coast to coast, MoveSmart Rentals provides professional property management that maximizes returns and minimizes stress for Canadian property owners."
      />

      {/* 2. Intro section */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Canada&apos;s Trusted Property Management Partner
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          MoveSmart Rentals operates across Canada&apos;s most active rental
          markets. Whether you own a condo in downtown Toronto, a duplex in
          Montreal, or a single-family home in Calgary, our local teams
          understand the provincial regulations, tenant demographics, and market
          dynamics that drive success. We handle tenant placement, rent
          collection, maintenance coordination, and compliance so you can invest
          with confidence.
        </p>
      </section>

      {/* 3. Province cards */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Explore by Province
        </h2>

        {provinces.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Province listings are coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {provinces.map((province) => (
              <Link
                key={province._id}
                href={`/ca/${province.slug}/`}
                className="group"
              >
                <div className="h-full rounded-lg border bg-card p-6 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary">
                      {province.title}
                    </h3>
                    {province.abbreviation && (
                      <span className="rounded bg-muted px-2 py-1 text-sm font-medium text-muted-foreground">
                        {province.abbreviation}
                      </span>
                    )}
                  </div>

                  {province.description && (
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {province.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {province.cityCount}{' '}
                      {province.cityCount === 1 ? 'city' : 'cities'}
                    </span>
                    <span className="font-medium text-primary group-hover:underline">
                      View Province &rarr;
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
        headline="Ready to Maximize Your Canadian Rental Income?"
        description="Join thousands of property owners who trust MoveSmart Rentals for professional, transparent management."
        primaryCta={{ label: 'Book a Free Consultation', href: '/contact/' }}
        secondaryCta={{ label: 'View Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
