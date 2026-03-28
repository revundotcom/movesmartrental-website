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

interface StateCard {
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
  title: 'Property Management in the United States',
  description:
    'Professional property management across the United States. Explore our services in Florida, Texas, California, New York, and more.',
  alternates: {
    canonical: '/us/',
  },
  openGraph: {
    title: 'Property Management in the United States',
    description:
      'Professional property management across the United States. Explore our services in Florida, Texas, California, New York, and more.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'MoveSmart Rentals United States' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management in the United States | MoveSmart Rentals',
    description:
      'Professional property management across the United States. Explore our services in Florida, Texas, California, New York, and more.',
    images: ['/og-default.png'],
  },
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function USHubPage() {
  const states = await sanityFetch<StateCard[]>({
    query: COUNTRY_PROVINCES_QUERY,
    params: { country: 'us' },
    tags: ['province'],
  })

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
        headline="Property Management Across the United States"
        subheadline="MoveSmart Rentals is expanding into America's top rental markets, bringing our proven Canadian model to US property owners."
      />

      {/* 2. Intro section */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Expanding Into America&apos;s Top Markets
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          Building on our success managing properties across Canada, MoveSmart
          Rentals is bringing our technology-driven approach to the United
          States. Our US operations focus on high-growth rental markets where
          property owners need professional management that combines local
          expertise with scalable systems. From Florida&apos;s Sun Belt to
          California&apos;s tech corridors, we deliver tenant placement,
          compliance management, and maximized occupancy rates.
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
        headline="Own Property in the US? Let Us Manage It."
        description="MoveSmart Rentals is bringing professional, technology-driven property management to America's top rental markets."
        primaryCta={{ label: 'Book a Free Consultation', href: '/contact/' }}
        secondaryCta={{ label: 'View Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
