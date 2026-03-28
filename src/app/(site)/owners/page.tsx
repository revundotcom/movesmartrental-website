import type { Metadata } from 'next'

import { BenefitsBlock } from '@/components/blocks/benefits-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { PainPointBlock } from '@/components/blocks/pain-point-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { TrustBlock } from '@/components/blocks/trust-block'
import { sanityFetch } from '@/sanity/fetch'
import { SERVICE_OWNER_QUERY } from '@/sanity/queries/service'
import type { ServiceCardData } from '@/types/blocks'

export const metadata: Metadata = {
  title: 'Property Owners | MoveSmart Rentals',
  description:
    'Professional property management for Ontario landlords and investors. Zero upfront cost, dedicated account manager, tenant screening, and rent protection.',
  alternates: {
    canonical: '/owners/',
  },
  openGraph: {
    title: 'Property Owners | MoveSmart Rentals',
    description:
      'Professional property management for Ontario landlords and investors. Zero upfront cost, dedicated account manager, tenant screening, and rent protection.',
  },
}

export default async function OwnersPage() {
  const services = await sanityFetch<ServiceCardData[]>({
    query: SERVICE_OWNER_QUERY,
    tags: ['service'],
  })

  return (
    <main>
      {/* 1. Hero */}
      <HeroBlock
        headline="Property Management That Pays for Itself"
        subheadline="Zero upfront cost. We only succeed when your property is rented. Professional management for Ontario landlords and investors."
        cta1={{ label: 'Create Free Account', href: '/contact/' }}
        cta2={{ label: 'Submit Property', href: '/contact/' }}
        priority
      />

      {/* 2. Pain Points */}
      <PainPointBlock
        title="Common Challenges Landlords Face"
        painPoints={[
          {
            problem:
              'Vacant units sitting empty for weeks, costing you thousands in lost rental income every month.',
            solution:
              'Our MLS distribution and 50+ rental site syndication fills vacancies in an average of 14 days.',
          },
          {
            problem:
              'Difficult tenants who damage property, pay late, or cause disputes with neighbours.',
            solution:
              'Structured screening with credit checks, employment verification, references, and full rental history review for every applicant.',
          },
          {
            problem:
              'Spending evenings and weekends handling maintenance calls, tenant complaints, and property inspections.',
            solution:
              'Your dedicated account manager handles everything. Track it all from your online portal without lifting a finger.',
          },
          {
            problem:
              'Hidden fees and unclear pricing from property management companies that eat into your returns.',
            solution:
              'Nothing upfront. Our transparent, success-based model means you pay nothing until your property is rented.',
          },
        ]}
      />

      {/* 3. Benefits -- OWN-05 contract messaging */}
      <BenefitsBlock
        title="Why Owners Choose MoveSmart"
        columns={3}
        benefits={[
          {
            title: 'Nothing Upfront',
            description:
              'Our success-based model means you pay nothing until your property is rented.',
            icon: 'dollar-sign',
          },
          {
            title: 'Self-Serve Online',
            description:
              'Manage your properties, view reports, and communicate through your online portal.',
            icon: 'monitor',
          },
          {
            title: 'Dedicated Account Manager',
            description:
              'A single point of contact who knows your properties inside and out.',
            icon: 'users',
          },
          {
            title: 'MLS Distribution',
            description:
              'Your listings appear on MLS, Realtor.ca, and 50+ rental sites for maximum exposure.',
            icon: 'megaphone',
          },
          {
            title: 'Structured Screening',
            description:
              'Credit checks, employment verification, references, and rental history for every applicant.',
            icon: 'shield',
          },
          {
            title: 'Rent Protection',
            description:
              'Our rent guarantee program protects your income from missed payments.',
            icon: 'check-circle',
          },
          {
            title: 'Property Preparation',
            description:
              'Professional cleaning, staging, and photography before listing.',
            icon: 'paintbrush',
          },
          {
            title: 'Portal Visibility',
            description:
              'Track applications, maintenance, and rent payments in real time.',
            icon: 'trending-up',
          },
          {
            title: 'Tech + Brick-and-Mortar',
            description:
              'Local market expertise backed by modern technology.',
            icon: 'zap',
          },
        ]}
      />

      {/* 4. Service Grid -- filtered owner services from CMS */}
      <ServiceGridBlock services={services} columns={3} />

      {/* 5. Trust -- stats variant */}
      <TrustBlock
        variant="stats"
        stats={[
          { label: 'Properties Managed', value: '500+' },
          { label: 'Tenant Satisfaction', value: '98%' },
          { label: 'Avg. Placement Time', value: '14 days' },
          { label: 'Cities Served', value: '20+' },
        ]}
      />

      {/* 6. FAQ -- owner-specific */}
      <FAQBlock
        title="Owner FAQs"
        questions={[
          {
            question: 'How much does MoveSmart property management cost?',
            answer:
              'We operate on a success-based model -- you pay nothing upfront. Our management fee is a percentage of collected rent, so we only earn when your property is earning. There are no hidden fees or long-term contracts.',
          },
          {
            question: 'What services are included in property management?',
            answer:
              'Our full-service management includes tenant screening, rent collection, maintenance coordination, lease management, property inspections, financial reporting, and 24/7 emergency response. Everything you need to be a hands-off landlord.',
          },
          {
            question: 'How do you screen tenants?',
            answer:
              'Every applicant undergoes a structured screening process including credit checks, employment and income verification, previous landlord references, and rental history review. We only place tenants who meet our qualification criteria.',
          },
          {
            question: 'What is the rent protection guarantee?',
            answer:
              'Our rent guarantee program protects your rental income from missed payments. If a qualified tenant fails to pay, we cover the rent so your cash flow remains consistent.',
          },
          {
            question: 'How quickly can you fill my vacancy?',
            answer:
              'On average, we fill vacancies within 14 days. We syndicate your listing across MLS, Realtor.ca, and 50+ rental platforms for maximum exposure, combined with professional photography and staging to attract quality tenants fast.',
          },
        ]}
      />

      {/* 7. CTA Banner */}
      <CTABannerBlock
        headline="Start Managing Smarter Today"
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}
