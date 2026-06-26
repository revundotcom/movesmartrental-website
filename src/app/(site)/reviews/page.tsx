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
    'Real results from real property owners. Read testimonials from landlords who trust MoveSmart Rentals for full-service leasing and tenant placement across Canada and the United States.',
  alternates: {
    canonical: '/reviews/',
  },
  openGraph: {
    title: 'Reviews & Testimonials | MoveSmart Rentals',
    description:
      'Real results from real property owners. 4.9/5 across 200+ Google reviews. Read what landlords say about MoveSmart Rentals.',
    images: ['/og-share.png'],
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
  description: 'Real results from real property owners across Canada and the United States.',
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
      'Every testimonial on this page is sourced from a verified Google, BBB, or Realtor.ca review, or used with the named client\'s written permission. We abbreviate last names for owner privacy but are happy to confirm authenticity directly — contact us and we will arrange a verification call.',
  },
  {
    question: 'Where can I read more reviews?',
    answer:
      'Our complete review archive lives on Google, with additional reviews across BBB, Realtor.ca, and Trustpilot. We do not curate which reviews appear there — every owner can post freely.',
  },
  {
    question: 'Can I talk to a current client before signing?',
    answer:
      'Yes. We will arrange a fifteen-minute reference call with an existing owner-client in your city or property type. Just ask during your free rental analysis. No prospective client we have placed has ever declined this request.',
  },
  {
    question: 'Do you publish negative reviews?',
    answer:
      'We do not delete or hide negative reviews on third-party platforms — they are public on Google, BBB, and Realtor.ca for anyone to read. When we get critical feedback, we respond publicly with what we did to fix it. That is the standard the industry should hold to.',
  },
  {
    question: 'How are tenants screened before placement?',
    answer:
      'Every applicant goes through a structured multi-step qualification: credit pull, income and employment verification, prior-landlord references, ID verification, and a documented risk summary you approve or decline. Every decision follows applicable human-rights and fair-housing law in the jurisdiction of the unit.',
  },
  {
    question: 'How is the success fee calculated?',
    answer:
      'Our standard placement success fee is typically equivalent to one month of contracted rent, invoiced once on lease signing. No setup fees, no monthly retainer, no marketing surcharges. The full fee schedule lives on the Pricing page.',
  },
  {
    question: 'Can I leave a review if I am a tenant rather than a landlord?',
    answer:
      'Yes — tenant reviews are welcome on the same Google, BBB, Realtor.ca, and Trustpilot profiles. Tenant feedback helps other renters know what to expect from MoveSmart-managed listings and helps us hold our showing and screening teams to a written standard.',
  },
  {
    question: 'Do you serve clients outside Canada?',
    answer:
      'Yes. We currently serve 10 priority US states — Florida, Texas, California, New York, Illinois, Georgia, North Carolina, Arizona, Colorado, and New Jersey — alongside six Canadian provinces. Toggle the country filter at the top of the page to see reviews from each region.',
  },
  {
    question: 'How long does it usually take to place a tenant?',
    answer:
      'Time-to-lease varies by city, unit type, and pricing. Units priced to live-market comps with professional photography typically receive multiple qualified applicants within the first two weeks of listing. We commit to written progress updates at every milestone.',
  },
  {
    question: 'What happens if a placed tenant breaks the lease early?',
    answer:
      'Early termination is rare with our screening process, but if it happens we re-list immediately at no additional success fee within the original 12-month guarantee window. Optional Rent Protection through partner pathways adds further coverage.',
  },
  {
    question: 'Do you respond to all reviews — good and bad?',
    answer:
      'Yes. Every published review on Google, BBB, Realtor.ca, and Trustpilot gets an owner-level response within five business days. Praise gets a thank-you; criticism gets a concrete remediation plan, in public.',
  },
  {
    question: 'Are case studies on this page real?',
    answer:
      'Yes. Every case study features named clients who gave written permission to publish their story. Before/after numbers are pulled from the leasing file — vacancy days, ask vs. signed rent, screening outcomes. Names appear in full where the client opted in; abbreviated where privacy was requested.',
  },
  {
    question: 'How can I share my experience with MoveSmart?',
    answer:
      'Click "Leave a Google review" at the bottom of the page. If you prefer to send feedback privately, use the contact form — we read every message and route concerns directly to the leasing director responsible for your file.',
  },
  {
    question: 'Why do some reviews mention specific advisors by name?',
    answer:
      'Each MoveSmart owner is assigned a named leasing advisor for the duration of the placement. Owners often single out their advisor in reviews because the relationship is personal, not a call-centre handoff. We celebrate that publicly — and it keeps advisors accountable.',
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
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="MoveSmart leasing team reviewing owner feedback on a laptop"
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
            <FAQBlock questions={FAQS} schemaEnabled showQuestionsCta={false} />
          </div>
        </div>
      </section>

      {/* 11. CTA Banner */}
      <CTABannerBlock
        headline="Ready to be our next 5-star review?"
        description="Book a free rental analysis. We will tell you what your property should rent for, how fast we think we can lease it, and exactly how our full-service execution will differ from anything you have tried before."
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
