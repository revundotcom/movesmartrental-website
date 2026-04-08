import type { Metadata } from 'next'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { sanityFetch } from '@/sanity/fetch'
import { SERVICE_ALL_QUERY } from '@/sanity/queries/service'
import type { ServiceCardData } from '@/types/blocks'

export const metadata: Metadata = {
  title: 'Property Management Services Ontario | 8 Expert Services',
  description:
    '8 professional property management services for Ontario landlords. Tenant screening, rent collection, MLS distribution, property prep, and rent protection. Zero upfront cost.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Property Management Services Ontario | MoveSmart Rentals',
    description:
      '8 professional property management services for Ontario landlords. Tenant screening, rent collection, MLS distribution, property prep, and rent protection.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management Services Ontario | MoveSmart Rentals',
    description:
      '8 professional property management services for Ontario landlords. Tenant screening, rent collection, MLS distribution, property prep, and rent protection.',
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

      {/* Premium Service Grid Section */}
      <section className="relative overflow-hidden bg-slate-50 py-4">
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12">
          <div className="mx-auto max-w-2xl text-center mb-2">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              What We Offer
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Eight Services.{' '}
              <span className="font-display italic text-brand-emerald">
                One Platform.
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              From finding your first tenant to managing a full portfolio — every service
              is designed for Canadian landlords and renters.
            </p>
          </div>
        </div>

        <ServiceGridBlock services={services} columns={3} showHeading={false} />
      </section>

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
