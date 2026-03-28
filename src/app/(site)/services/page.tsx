import type { Metadata } from 'next'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { sanityFetch } from '@/sanity/fetch'
import { SERVICE_ALL_QUERY } from '@/sanity/queries/service'
import type { ServiceCardData } from '@/types/blocks'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore our 8 professional property management services. From tenant screening and rent collection to property preparation and MLS distribution.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Our Services',
    description:
      'Explore our 8 professional property management services. From tenant screening and rent collection to property preparation and MLS distribution.',
  },
}

export default async function ServicesPage() {
  const services = await sanityFetch<ServiceCardData[]>({
    query: SERVICE_ALL_QUERY,
    tags: ['service'],
  })

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
          ]}
        />
      </div>

      {/* Hero */}
      <HeroBlock
        headline="Our Property Management Services"
        subheadline="Comprehensive property management solutions designed to maximize your rental income and minimize your workload."
      />

      {/* Service Grid */}
      <ServiceGridBlock services={services} columns={3} />

      {/* CTA */}
      <CTABannerBlock
        headline="Ready to Get Started?"
        description="Create your free account and discover how our services can transform your property management experience."
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}
