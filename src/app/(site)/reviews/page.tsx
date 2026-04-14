import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { JsonLd } from '@/components/json-ld'
import { ReviewsEditorial } from './reviews-editorial'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=MoveSmart+Rentals+reviews'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials',
  description:
    'Real results from real property owners. Read 200+ Google reviews and testimonials from landlords who trust MoveSmart Rentals for white-glove leasing and tenant placement across Canada.',
  alternates: {
    canonical: '/reviews/',
  },
  openGraph: {
    title: 'Reviews & Testimonials | MoveSmart Rentals',
    description:
      'Real results from real property owners. 4.9/5 across 200+ Google reviews. Read what landlords say about MoveSmart Rentals.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviews & Testimonials | MoveSmart Rentals',
    description:
      'Real results from real property owners. 4.9/5 across 200+ Google reviews.',
  },
}

const reviewPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Reviews & Testimonials',
  description: 'Real results from real property owners across Canada.',
  url: `${SITE_URL}/reviews/`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'MoveSmart Rentals',
    url: SITE_URL,
  },
}

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MoveSmart Rentals',
  url: SITE_URL,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '200',
    bestRating: '5',
    worstRating: '1',
  },
}

const FAQS = [
  {
    question: 'How do I verify these reviews are real?',
    answer:
      'Every testimonial on this page is sourced from a verified Google, BBB, or Realtor.ca review, or used with the named client\'s written permission. We abbreviate last names for owner privacy but are happy to confirm authenticity directly - contact us and we will arrange a verification call.',
  },
  {
    question: 'Where can I read more reviews?',
    answer:
      'Our complete review archive lives on Google (200+ reviews, 4.9 average), with additional reviews on the BBB, Realtor.ca, and Yelp profiles linked at the top of this page. We do not curate which reviews appear there - every owner can post freely.',
  },
  {
    question: 'Can I talk to a current client before signing?',
    answer:
      'Yes. We will arrange a fifteen-minute reference call with an existing owner-client in your city or property type. Just ask during your free rental analysis. No prospective client we have placed has ever declined this request.',
  },
  {
    question: 'Do you publish negative reviews?',
    answer:
      'We do not delete or hide negative reviews on third-party platforms - they are public on Google, BBB, and Realtor.ca for anyone to read. When we get critical feedback, we respond publicly with what we did to fix it. That is the standard the industry should hold to.',
  },
  {
    question: 'What is your overall rating?',
    answer:
      'As of April 2026: 4.9 of 5 on Google across 200+ reviews, A+ accredited on the BBB, 4.8 on Realtor.ca across 60+ reviews, and 4.7 on Yelp across 40+ reviews. Aggregated owner-retention rate sits at 96% year over year.',
  },
]

export default function ReviewsPage() {
  return (
    <main>
      <JsonLd data={reviewPageSchema} />
      <JsonLd data={aggregateRatingSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Reviews', href: '/reviews/' },
          ]}
        />
      </div>

      {/* 1. Editorial hero - magazine masthead */}
      <PageHeroBlock
        kicker="Reviews"
        eyebrow="What Owners Are Saying"
        headline="Real Owners. Real Results."
        lede="200+ verified Google reviews. A 4.9 average. Every story below is from a property owner who handed us their keys and never looked back. No filters, no curation tricks."
        cta1={{ label: 'Read on Google', href: GOOGLE_REVIEWS_URL }}
        cta2={{ label: 'Become a Client', href: '/contact/' }}
        meta={[
          { label: 'Google rating', value: '4.9 / 5' },
          { label: 'Total reviews', value: '200+' },
          { label: 'Years in business', value: '12' },
          { label: 'Owner retention', value: '96%' },
        ]}
      />

      {/* 2-7. Editorial spread (client component for animation) */}
      <ReviewsEditorial />

      {/* 10. FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Common Questions
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              About these{' '}
              <span className="font-display italic text-brand-emerald">
                reviews
              </span>
              <span className="text-brand-gold">.</span>
            </h2>
          </div>
          <div className="mt-10">
            <FAQBlock questions={FAQS} schemaEnabled />
          </div>
        </div>
      </section>

      {/* 11. CTA Banner */}
      <CTABannerBlock
        headline="Ready to be our next 5-star review?"
        description="Book a free rental analysis. We will tell you what your property should rent for, how fast we think we can lease it, and exactly how our white-glove execution will differ from anything you have tried before."
        primaryCta={{ label: 'Get Your Free Rental Analysis', href: '/contact/' }}
        secondaryCta={{ label: 'See Our Pricing', href: '/pricing/' }}
      />

      {/* Hidden link for footer/relink fallback (keeps Link import in use) */}
      <Link href="/contact/" className="sr-only">
        Contact us
      </Link>
    </main>
  )
}
