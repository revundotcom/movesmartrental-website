import type { Metadata } from 'next'
import Script from 'next/script'
import { PricingContent } from './pricing-content'

export const metadata: Metadata = {
  title: 'Leasing Platform Pricing Canada | Zero Upfront, Success-Fee Only',
  description:
    'Transparent leasing platform pricing. Zero upfront cost, no monthly retainer, no setup fee. Pay a one-time success fee only when a qualified tenant signs the lease. Custom pricing for institutional lease-up.',
  alternates: {
    canonical: '/pricing/',
  },
  openGraph: {
    title: 'Leasing Platform Pricing | MoveSmart Rentals',
    description:
      'Zero upfront cost. Success-fee leasing platform pricing - pay only when a qualified tenant signs the lease.',
    images: ['/og-share.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Platform Pricing | MoveSmart Rentals',
    description:
      'Zero upfront cost. Success-fee leasing platform pricing - pay only when a qualified tenant signs.',
  },
}

const PRODUCT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MoveSmart Rentals - Full-Service Leasing and Tenant Placement',
  serviceType: 'Residential Leasing Platform',
  provider: {
    '@type': 'Organization',
    name: 'MoveSmart Rentals',
    url: 'https://movesmartrentals.com',
  },
  areaServed: { '@type': 'Country', name: 'Canada' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Standard Leasing Success Fee',
      description:
        'One-time success fee, typically equivalent to one month of contracted rent, charged only when a qualified tenant signs the lease. Zero upfront cost.',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '0',
        priceCurrency: 'CAD',
        description:
          'Zero upfront. Success fee tailored to property type and market - typically one month rent equivalent, one-time on placement.',
      },
      eligibleCustomerType: 'Individual property owners and small portfolios',
    },
    {
      '@type': 'Offer',
      name: 'Institutional Lease-Up',
      description:
        'Custom-scoped lease-up engagements for property management companies, builders, and developers. Pricing structured per RFP.',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'CAD',
        description: 'Custom institutional pricing - contact for RFP.',
      },
      eligibleCustomerType: 'Property management companies, builders, developers',
    },
    {
      '@type': 'Offer',
      name: 'Rent Protection (Add-On)',
      description:
        'Optional guaranteed rental income coverage - priced separately through partner underwriter.',
    },
  ],
}

export default function PricingPage() {
  return (
    <>
      <Script
        id="pricing-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSONLD) }}
      />
      <PricingContent />
    </>
  )
}
