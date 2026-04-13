import type { Metadata } from 'next'
import { PricingContent } from './pricing-content'

export const metadata: Metadata = {
  title: 'Property Management Pricing Canada | Zero Upfront Cost',
  description:
    'Simple, transparent pricing for Canada property management. Self-Serve (free), Full Service (success-based), and Premium (all-inclusive). Zero upfront cost - pay only when your property is rented.',
  alternates: {
    canonical: '/pricing/',
  },
  openGraph: {
    title: 'Property Management Pricing Canada | MoveSmart Rentals',
    description:
      'Simple, transparent pricing for Canada property management. Zero upfront cost - pay only when your property is rented.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management Pricing Canada | MoveSmart Rentals',
    description:
      'Simple, transparent pricing for Canada property management. Zero upfront cost - pay only when your property is rented.',
  },
}

export default function PricingPage() {
  return <PricingContent />
}
