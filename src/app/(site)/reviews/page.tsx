import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { TestimonialsSection } from '@/components/blocks/testimonials-section'
import { StatGrid } from '@/components/blocks/stat-grid'
import { JsonLd } from '@/components/json-ld'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials | MoveSmart Rentals',
  description:
    'Real results from real property owners. Read reviews and testimonials from landlords who trust MoveSmart Rentals for tenant placement, property management, and hands-off leasing across Ontario.',
  alternates: {
    canonical: '/reviews/',
  },
  openGraph: {
    title: 'Reviews & Testimonials | MoveSmart Rentals',
    description:
      'Real results from real property owners. Read reviews from landlords who trust MoveSmart Rentals for hands-off leasing across Ontario.',
    images: ['/og-default.png'],
  },
}

const reviewPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Reviews & Testimonials',
  description:
    'Real results from real property owners across Ontario.',
  url: `${SITE_URL}/reviews/`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'MoveSmart Rentals',
    url: SITE_URL,
  },
}

export default function ReviewsPage() {
  return (
    <main>
      <JsonLd data={reviewPageSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Reviews', href: '/reviews/' },
          ]}
        />
      </div>

      {/* -- Hero -- */}
      <HeroBlock
        headline="What Our Clients Say"
        subheadline="Real results from real landlords. Hear how MoveSmart Rentals helps property owners across Ontario fill vacancies faster, screen tenants better, and earn more from their rentals."
        cta1={{ label: 'Create a Free Account', href: '/contact/' }}
        cta2={{ label: 'Book a Call', href: '/contact/?intent=call' }}
      />

      {/* -- Trust Stats -- */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              By The Numbers
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Results That <span className="font-display italic text-brand-emerald">Speak</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our track record across Ontario, backed by hundreds of satisfied property owners.
            </p>
          </div>
          <div className="mt-14">
            <StatGrid />
          </div>
        </div>
      </section>

      {/* -- Testimonials -- */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              Owner Stories
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Trusted by Landlords Across <span className="font-display italic text-brand-emerald">Ontario</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From single-unit owners to multi-property investors, our clients share their experience with MoveSmart Rentals.
            </p>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* -- CTA Banner -- */}
      <CTABannerBlock
        headline="Ready to See Results?"
        description="Join 500+ property owners who trust MoveSmart Rentals for white-glove leasing execution with zero upfront cost."
        primaryCta={{ label: 'Create a Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/?intent=call' }}
      />
    </main>
  )
}
