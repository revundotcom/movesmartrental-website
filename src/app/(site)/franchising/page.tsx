import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { BenefitsBlock } from '@/components/blocks/benefits-block'
import { HowItWorksBlock } from '@/components/blocks/how-it-works-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'

export const metadata: Metadata = {
  title: 'Property Management Franchise Opportunity Canada & US',
  description:
    'Join the MoveSmart Rentals franchise network. Expand white-glove property management into your market with proven systems, full technology platform, and dedicated support.',
  alternates: {
    canonical: '/franchising/',
  },
  openGraph: {
    title: 'Property Management Franchise Canada & US | MoveSmart Rentals',
    description:
      'Join the MoveSmart Rentals franchise network. Expand white-glove property management into your market with proven systems, full technology platform, and dedicated support.',
    images: ['/og-default.png'],
  },
}

const FRANCHISE_BENEFITS = [
  {
    title: 'Proven Business Model',
    description:
      'Replicate our success-based property management system in your market.',
    icon: 'check-circle',
  },
  {
    title: 'Technology Platform',
    description:
      'Full access to our property management portal and tenant screening tools.',
    icon: 'monitor',
  },
  {
    title: 'Training and Support',
    description:
      'Comprehensive onboarding, ongoing training, and dedicated franchise support.',
    icon: 'users',
  },
  {
    title: 'Marketing System',
    description:
      'SEO-optimized website pages, listing distribution, and lead generation built in.',
    icon: 'megaphone',
  },
  {
    title: 'Brand Recognition',
    description:
      'Leverage the growing MoveSmart Rentals brand across Canada and the US.',
    icon: 'award',
  },
  {
    title: 'Exclusive Territory',
    description:
      'Protected geographic territories ensure no internal competition.',
    icon: 'shield',
  },
]

const FRANCHISE_STEPS = [
  {
    stepNumber: 1,
    title: 'Inquiry',
    description:
      'Submit your interest and we will schedule a discovery call.',
  },
  {
    stepNumber: 2,
    title: 'Discovery',
    description:
      'Learn about the model, financials, and territory options.',
  },
  {
    stepNumber: 3,
    title: 'Agreement',
    description:
      'Sign the franchise agreement and begin onboarding.',
  },
  {
    stepNumber: 4,
    title: 'Launch',
    description:
      'Open your MoveSmart Rentals office with full support.',
  },
]

const FRANCHISE_FAQS = [
  {
    question: 'What is the initial investment required?',
    answer:
      'The initial franchise investment varies by territory size and market. Contact us for a detailed breakdown of startup costs, ongoing fees, and projected returns during the discovery call.',
  },
  {
    question: 'Which territories are available?',
    answer:
      'We have territories available across Canada and are expanding into select US markets. Each territory is geographically protected, meaning no other MoveSmart Rentals franchise will compete in your area.',
  },
  {
    question: 'What training is included?',
    answer:
      'Franchisees receive comprehensive initial training covering operations, technology platform, marketing, tenant screening, and compliance. Ongoing support includes monthly coaching calls, annual conferences, and access to our knowledge base.',
  },
  {
    question: 'How does the revenue model work?',
    answer:
      'Revenue comes from tenant placement fees and ongoing property management fees. Our success-based model means you earn as you place tenants and grow your managed portfolio, with no upfront fees charged to property owners.',
  },
]

export default function FranchisingPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Franchising', href: '/franchising/' },
          ]}
        />
      </div>

      <HeroBlock
        headline="Franchise with MoveSmart Rentals"
        subheadline="Proven property management model ready for your market"
        cta1={{ label: 'Request Information', href: '/contact/' }}
        cta2={{ label: 'Learn More', href: '#benefits' }}
      />

      <div id="benefits">
        <BenefitsBlock
          benefits={FRANCHISE_BENEFITS}
          title="Why Franchise with MoveSmart Rentals"
          columns={3}
        />
      </div>

      <HowItWorksBlock
        steps={FRANCHISE_STEPS}
        title="How to Get Started"
      />

      <FAQBlock
        questions={FRANCHISE_FAQS}
        title="Franchise FAQ"
      />

      <CTABannerBlock
        headline="Ready to Build Your Business?"
        description="Take the first step toward owning a MoveSmart Rentals franchise in your market."
        primaryCta={{ label: 'Request Franchise Info', href: '/contact/' }}
      />
    </main>
  )
}
