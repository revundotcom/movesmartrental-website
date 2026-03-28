import type { Metadata } from 'next'
import Link from 'next/link'
import { Building, Building2, Castle, Home } from 'lucide-react'

import { HeroBlock } from '@/components/blocks/hero-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { HowItWorksBlock } from '@/components/blocks/how-it-works-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { sanityFetch } from '@/sanity/fetch'
import { HOMEPAGE_QUERY } from '@/sanity/queries/homepage'
import type { CityCardData } from '@/types/blocks'

export const metadata: Metadata = {
  title: 'Tenants | Find Rentals',
  description:
    'Browse verified rental listings across Ontario. Apartments, condos, houses, and townhouses available in 20+ cities.',
  alternates: {
    canonical: '/tenants/',
  },
  openGraph: {
    title: 'Find Your Next Rental Home | MoveSmart Rentals',
    description:
      'Browse verified rental listings across Ontario. Apartments, condos, houses, and townhouses available in 20+ cities.',
    images: ['/og-default.png'],
  },
}

const PROPERTY_TYPES = [
  {
    title: 'Apartments for Rent',
    description:
      'Find affordable apartment rentals with verified listings and transparent pricing.',
    icon: Building2,
    href: '/tenants/#apartments',
    id: 'apartments',
  },
  {
    title: 'Condos for Rent',
    description:
      'Browse modern condo rentals with amenities like gyms, pools, and concierge services.',
    icon: Building,
    href: '/tenants/#condos',
    id: 'condos',
  },
  {
    title: 'Houses for Rent',
    description:
      'Discover spacious house rentals with yards, garages, and family-friendly neighbourhoods.',
    icon: Home,
    href: '/tenants/#houses',
    id: 'houses',
  },
  {
    title: 'Townhouses for Rent',
    description:
      'Explore townhouse rentals that combine the space of a house with low-maintenance living.',
    icon: Castle,
    href: '/tenants/#townhouses',
    id: 'townhouses',
  },
]

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
      'In Ontario, landlords can only collect a deposit equal to one month\'s rent (last month\'s rent deposit). No additional security deposits are permitted under the Residential Tenancies Act.',
  },
]

const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: 1,
    title: 'Browse Listings',
    description:
      'Search verified rentals by city, property type, and price range.',
  },
  {
    stepNumber: 2,
    title: 'Apply Online',
    description:
      'Submit your application with employment, credit, and reference details.',
  },
  {
    stepNumber: 3,
    title: 'Get Approved',
    description:
      'Our screening process gives you a decision within 48 hours.',
  },
  {
    stepNumber: 4,
    title: 'Move In',
    description:
      'Sign your lease and receive your keys on move-in day.',
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

  return (
    <main>
      {/* Hero */}
      <HeroBlock
        headline="Find Your Next Rental Home"
        subheadline="Browse verified listings in 20+ Ontario cities"
        cta1={{ label: 'Browse Cities', href: '#cities' }}
        cta2={{ label: 'How It Works', href: '#how-it-works' }}
      />

      {/* Property Type Links */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Property Types
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
              Browse by Property Type
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROPERTY_TYPES.map((type) => {
              const Icon = type.icon
              return (
                <Link key={type.id} href={type.href} className="group cursor-pointer">
                  <div className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-white p-6 text-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-200 group-hover:shadow-lg group-hover:shadow-emerald-900/8">
                    {/* Top bar */}
                    <div className="absolute inset-x-0 top-0 h-0.5 origin-center scale-x-0 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all duration-300 group-hover:from-emerald-100 group-hover:to-emerald-200 group-hover:shadow-sm group-hover:shadow-emerald-200">
                      <Icon className="size-7 text-emerald-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold text-brand-navy transition-colors duration-200 group-hover:text-emerald-700">
                      {type.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {type.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 transition-all duration-200 group-hover:opacity-100">
                      View listings
                      <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <div id="cities">
        <CityGridBlock cities={cities} columns={4} />
      </div>

      {/* How It Works */}
      <div id="how-it-works">
        <HowItWorksBlock
          steps={HOW_IT_WORKS_STEPS}
          title="How Renting Works"
        />
      </div>

      {/* FAQ */}
      <FAQBlock
        questions={TENANT_FAQS}
        title="Tenant FAQs"
      />

      {/* CTA Banner */}
      <CTABannerBlock
        headline="Ready to Find Your New Home?"
        primaryCta={{ label: 'Browse Listings', href: '/locations/' }}
      />
    </main>
  )
}
