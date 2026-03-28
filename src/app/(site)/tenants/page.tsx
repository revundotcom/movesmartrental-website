import type { Metadata } from 'next'

import { HeroBlock } from '@/components/blocks/hero-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { HowItWorksBlock } from '@/components/blocks/how-it-works-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { TenantsPropertyTypes } from '@/components/blocks/tenants-property-types'
import { TenantsWhySection } from '@/components/blocks/tenants-why-section'
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

      {/* Property Types — bento grid */}
      <TenantsPropertyTypes />

      {/* Why MoveSmart */}
      <TenantsWhySection />

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
