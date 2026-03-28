import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { BenefitsBlock } from '@/components/blocks/benefits-block'
import { TrustBlock } from '@/components/blocks/trust-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema } from '@/lib/schema-builders'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'About MoveSmart Rentals',
  description:
    'MoveSmart Rentals provides professional property management across Ontario with zero upfront cost, modern technology, and local expertise.',
}

const organizationSchema = buildOrganizationSchema({
  name: 'MoveSmart Rentals',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Professional property management across Ontario with zero upfront cost, modern technology, and local expertise.',
  contactEmail: 'info@movesmartrentals.com',
})

const DIFFERENTIATORS = [
  {
    title: 'Technology-Driven',
    description:
      'Our proprietary platform streamlines every step from listing to lease signing, giving owners real-time visibility and tenants a seamless experience.',
    icon: 'monitor',
  },
  {
    title: 'Local Expertise',
    description:
      'Our teams live and work in the communities they serve. We know the neighbourhoods, the market rents, and the regulations that matter.',
    icon: 'home',
  },
  {
    title: 'Zero Upfront Cost',
    description:
      'We only earn when you do. Our success-based pricing means no listing fees, no advertising charges, and no hidden costs.',
    icon: 'dollar-sign',
  },
  {
    title: 'Dedicated Account Managers',
    description:
      'Every property owner gets a dedicated point of contact who manages their portfolio and is available when it matters most.',
    icon: 'users',
  },
]

const COMPANY_STATS = [
  { label: 'Properties Managed', value: '500+' },
  { label: 'Cities Served', value: '25+' },
  { label: 'Tenant Satisfaction', value: '96%' },
  { label: 'Avg. Placement Time', value: '14 Days' },
]

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={organizationSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about/' },
          ]}
        />
      </div>

      <HeroBlock
        headline="About MoveSmart Rentals"
        subheadline="Professional property management built on technology, transparency, and trust."
      />

      {/* Company Story */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
            Our Mission
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              MoveSmart Rentals was founded on a simple idea: property management
              should be accessible, transparent, and results-driven. Too many
              property owners face opaque pricing, slow tenant placement, and
              outdated processes. We set out to change that.
            </p>
            <p>
              By combining modern technology with local market knowledge,
              MoveSmart Rentals delivers a property management experience that
              works for owners and tenants alike. Our success-based model means
              we only earn when we deliver results, aligning our interests with
              yours from day one.
            </p>
            <p>
              Today, MoveSmart Rentals serves property owners across Ontario and
              is expanding into new markets across Canada. Every city we enter
              gets the same commitment: professional service, fair pricing, and a
              team that treats your property as if it were their own.
            </p>
          </div>
        </div>
      </section>

      <BenefitsBlock
        benefits={DIFFERENTIATORS}
        title="What Sets MoveSmart Rentals Apart"
        columns={2}
      />

      <TrustBlock stats={COMPANY_STATS} variant="stats" />

      <CTABannerBlock
        headline="Join the MoveSmart Network"
        description="List your property with zero upfront cost and experience modern property management."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}
