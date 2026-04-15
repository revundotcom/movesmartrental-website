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
  title: 'Leasing Brokerage in Canada | MoveSmart Rentals',
  description:
    'White-glove leasing brokerage across Canada. Tenant placement, screening, and full-cycle leasing execution in Ontario, Quebec, BC, Alberta, Nova Scotia, and more.',
  alternates: {
    canonical: '/ca/',
  },
  openGraph: {
    title: 'Leasing Brokerage in Canada | MoveSmart Rentals',
    description:
      'White-glove leasing brokerage across Canada. Tenant placement, screening, and full-cycle leasing execution in Ontario, Quebec, BC, Alberta, Nova Scotia, and more.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'MoveSmart Rentals Canada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage in Canada | MoveSmart Rentals',
    description:
      'White-glove leasing brokerage across Canada. Tenant placement, screening, and full-cycle leasing execution in Ontario, Quebec, BC, Alberta, Nova Scotia, and more.',
    images: ['/og-default.png'],
  },
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function CanadaHubPage() {
  const provinces = (await sanityFetch<ProvinceCard[] | null>({
    query: COUNTRY_PROVINCES_QUERY,
    params: { country: 'ca' },
    tags: ['province'],
  })) ?? []

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
        headline="Leasing Brokerage Across Canada"
        subheadline="From coast to coast, MoveSmart Rentals is the only leasing firm that serves a basement-unit landlord and a 500-door lease-up campaign with the same discipline - zero upfront, success-fee pricing."
      />

      {/* 2. Intro section */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Canada&apos;s Only Unified Leasing Brokerage
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          MoveSmart Rentals runs leasing campaigns across Canada&apos;s most active
          rental markets. Whether you own one condo in downtown Toronto, a
          duplex in Montreal, or a 300-unit lease-up in Calgary, our local
          teams deliver strategic pricing, professional marketing, showing
          coordination, tenant qualification, and lease execution under one
          brand. We are the only Canadian leasing specialist bridging individual
          landlords and institutional lease-up campaigns - with transparent
          success-fee pricing, not opaque quotes.
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
        headline="Ready to Lease Your Canadian Rental?"
        description="Landlords, property managers, and developers trust MoveSmart Rentals for zero-upfront, success-fee leasing execution."
        primaryCta={{ label: 'Book a Free Consultation', href: '/contact/' }}
        secondaryCta={{ label: 'View Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
