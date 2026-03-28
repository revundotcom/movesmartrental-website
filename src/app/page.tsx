import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, User, Building } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { HeroBlock } from '@/components/blocks/hero-block'
import { PainPointBlock } from '@/components/blocks/pain-point-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { HowItWorksBlock } from '@/components/blocks/how-it-works-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema } from '@/lib/schema-builders/organization'
import { generatePageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/fetch'
import { HOMEPAGE_QUERY } from '@/sanity/queries/homepage'
import type { ServiceCardData, CityCardData } from '@/types/blocks'

/* ---------- Types ---------- */

interface HomepageData {
  featuredServices: ServiceCardData[]
  featuredCities: CityCardData[]
  stats: {
    cityServiceCount: number
    cityCount: number
    serviceCount: number
  }
}

/* ---------- Metadata ---------- */

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: '/',
    fallbackTitle:
      'MoveSmart Rentals | Professional Property Management Across Ontario',
    fallbackDescription:
      'Full-service property management with zero upfront cost. Tenant placement, screening, rent protection, and dedicated account management for Ontario landlords.',
  })
}

/* ---------- Page ---------- */

export default async function HomePage() {
  const data = await sanityFetch<HomepageData>({
    query: HOMEPAGE_QUERY,
    tags: ['service', 'city'],
  })

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  const organizationSchema = buildOrganizationSchema({
    name: 'MoveSmart Rentals',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'Professional property management services across Ontario. Tenant placement, screening, rent protection, and full-service property management with zero upfront cost.',
    contactEmail: 'info@movesmartrentals.com',
  })

  return (
    <>
      {/* Organization JSON-LD */}
      <JsonLd data={organizationSchema} />

      {/* Section 1: Hero with Dual CTAs */}
      <HeroBlock
        headline="Professional Property Management, Zero Upfront Cost"
        subheadline="Full-service tenant placement, screening, and rent protection for Ontario landlords"
        cta1={{ label: 'Create Free Account', href: '/contact/' }}
        cta2={{ label: 'Learn More', href: '/owners/' }}
        priority
      />

      {/* Section 2: Owner Problem / Solution */}
      <PainPointBlock
        title="Why Landlords Choose MoveSmart Rentals"
        painPoints={[
          {
            problem: 'Vacant units costing you thousands',
            solution:
              'We fill vacancies fast with targeted marketing and MLS distribution',
          },
          {
            problem: 'Unreliable tenants and missed rent',
            solution:
              'Structured screening and rent guarantee protect your income',
          },
          {
            problem: 'Juggling repairs, calls, and paperwork',
            solution:
              'Your dedicated account manager handles everything',
          },
          {
            problem: 'Losing money to property management fees',
            solution:
              'Nothing upfront — our success-based model aligns with yours',
          },
        ]}
      />

      {/* Section 3: Service Grid (from CMS) */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Our Services
          </h2>
        </div>
        <ServiceGridBlock
          services={data.featuredServices}
          columns={4}
        />
      </section>

      {/* Section 4: Portal / Technology Section */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Your Property Management Portal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            MoveSmart Rentals combines a self-serve online account, a dedicated
            account manager, and tech-enabled brick-and-mortar service to give
            you full control and total peace of mind.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                <Monitor className="size-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Self-Serve Online</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                View statements, track maintenance, and manage your properties
                from any device, any time.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                <User className="size-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Dedicated Account Manager
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                One point of contact who knows your portfolio and handles every
                detail personally.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                <Building className="size-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Tech + Brick-and-Mortar
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The convenience of modern technology backed by real people and
                local offices you can visit.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button
              variant="default"
              size="lg"
              render={<Link href="/owners/" />}
            >
              Explore Owner Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5: Tenant Journey */}
      <HowItWorksBlock
        title="How Renting Works"
        steps={[
          {
            stepNumber: 1,
            title: 'Browse Listings',
            description:
              'Search verified rentals by city and property type',
          },
          {
            stepNumber: 2,
            title: 'Apply Online',
            description:
              'Submit your application through our secure portal',
          },
          {
            stepNumber: 3,
            title: 'Move In',
            description: 'Sign your lease and get your keys',
          },
        ]}
      />

      {/* Section 6: Featured Cities (from CMS) */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Cities We Serve
          </h2>
        </div>
        <CityGridBlock cities={data.featuredCities} columns={4} />
      </section>

      {/* Section 7: Franchising Preview */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Expand with MoveSmart Rentals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Interested in franchise opportunities? MoveSmart Rentals is growing
            across Canada and the US. Join our network and bring professional
            property management to your local market.
          </p>
          <div className="mt-8">
            <Button
              variant="default"
              size="lg"
              render={<Link href="/franchising/" />}
            >
              Learn About Franchising
            </Button>
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <FAQBlock
        title="Frequently Asked Questions"
        schemaEnabled
        questions={[
          {
            question: 'What does MoveSmart Rentals do?',
            answer:
              'MoveSmart Rentals is a full-service property management company serving Ontario landlords and investors. We handle tenant placement, screening, rent collection, maintenance coordination, and dedicated account management so you can earn passive income without the day-to-day hassle.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Nothing upfront. MoveSmart Rentals operates on a success-based model — you only pay when we deliver results. There are no setup fees, no hidden charges, and no long-term contracts required.',
          },
          {
            question: 'Which cities do you serve?',
            answer:
              'MoveSmart Rentals currently serves major cities across Ontario including Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, Kitchener, Windsor, and more. We are actively expanding to additional markets.',
          },
          {
            question: 'How do you screen tenants?',
            answer:
              'Our structured screening process includes credit checks, employment and income verification, rental history review, and reference checks. Every applicant goes through the same rigorous process to protect your property and rental income.',
          },
          {
            question: 'Do you guarantee rent?',
            answer:
              'Yes. MoveSmart Rentals offers rent protection as part of our property management service. If a qualified tenant misses a payment, our rent guarantee program ensures your cash flow stays consistent.',
          },
          {
            question: 'Can I manage my property online?',
            answer:
              'Absolutely. MoveSmart Rentals provides a self-serve online portal where you can view financial statements, track maintenance requests, communicate with your account manager, and manage your properties from any device.',
          },
        ]}
      />

      {/* Section 9: Final CTA */}
      <CTABannerBlock
        headline="Ready to Protect Your Rental Income?"
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </>
  )
}
