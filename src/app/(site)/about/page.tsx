import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'

import {
  FounderEssay,
  Timeline,
  Values,
  Team,
  ByTheNumbers,
  Press,
  LongTestimonials,
} from './about-interactive'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'About Us | Property Management Company Across Canada',
  description:
    'MoveSmart Rentals: Canada\'s white-glove property management company. Zero upfront cost, 500+ properties managed, 98% occupancy rate, and dedicated account managers.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About MoveSmart Rentals | Canada Property Management',
    description:
      'Canada\'s white-glove property management company. Zero upfront cost, 500+ properties managed, 98% occupancy rate, and dedicated account managers.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MoveSmart Rentals | Canada Property Management',
    description:
      'Canada\'s white-glove property management company. Zero upfront cost, 500+ properties managed, 98% occupancy rate, and dedicated account managers.',
  },
}

const organizationSchema = buildOrganizationSchema({
  name: 'MoveSmart Rentals',
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.png`,
  description:
    'Professional property management across Canada with zero upfront cost, modern technology, and local expertise.',
  contactEmail: 'info@movesmartrentals.com',
  socialLinks: [
    'https://www.linkedin.com/company/movesmart-rentals',
    'https://www.instagram.com/movesmartrentals',
    'https://www.facebook.com/movesmartrentals',
    'https://www.youtube.com/@movesmartrentals',
  ],
  foundingDate: '2024',
})

const localBusinessSchema = buildLocalBusinessSchema({
  name: 'MoveSmart Rentals',
  description:
    'White-glove property management for Ontario landlords. Tenant placement, screening, rent protection, and full-service leasing with zero upfront cost.',
  url: SITE_URL,
  phone: '+14372957688',
  address: {
    streetAddress: '1 King St W, Suite 4801',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'M5H 1A1',
    country: 'CA',
  },
  areaServed: 'Ontario, Canada',
  openingHours: ['Mo-Fr 09:00-18:00'],
})

// Founder quote aside for hero (not a dashboard mock)
function FounderQuoteCard() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-brand-navy/10 bg-white p-8 shadow-[0_1px_2px_rgba(17,24,39,0.04),0_20px_40px_-20px_rgba(17,24,39,0.15)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/50">
        From the founder
      </p>
      <p className="mt-6 font-display text-2xl font-normal italic leading-[1.35] text-brand-navy sm:text-[1.6rem]">
        &ldquo;We wanted to build the property manager we wished we had hired
        ourselves.&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-3 border-t border-brand-navy/10 pt-5">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full bg-brand-gold/90 font-display text-sm text-white"
        >
          JC
        </span>
        <div>
          <p className="font-display text-base font-normal text-brand-navy">
            Jatin Chhabra
          </p>
          <p className="text-xs text-slate-500">
            Founder &amp; Principal Broker
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about/' },
          ]}
        />
      </div>

      <PageHeroBlock
        kicker="About"
        eyebrow="Our story"
        headline="Property management, rebuilt around owners"
        accentLastWord
        lede="MoveSmart Rentals was founded on a simple idea: property management should be accessible, transparent, and results-driven. Six years later, that principle still runs the company."
        cta1={{ label: 'Meet the team', href: '#team' }}
        cta2={{ label: 'Contact us', href: '/contact/' }}
        aside={<FounderQuoteCard />}
      />

      <FounderEssay />

      <Timeline />

      <Values />

      <Team />

      <ByTheNumbers />

      <Press />

      <LongTestimonials />

      <CTABannerBlock
        headline="Curious if we're the right fit for your property?"
        description="Book a 20-minute call with our team. No pressure, no obligation."
        primaryCta={{ label: 'Book a 20-minute call', href: '/contact/' }}
      />
    </main>
  )
}
