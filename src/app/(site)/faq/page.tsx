import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { buildFaqPageSchema } from '@/lib/schema-builders'
import { FAQPageClient } from './faq-client'
import { FAQ_TABS } from './faq-data'

export const metadata: Metadata = {
  title: 'Property Management FAQ Ontario | Common Questions Answered',
  description:
    'Answers to frequently asked questions about MoveSmart Rentals property management: pricing, tenant screening, rent protection, cities served, and more.',
  alternates: {
    canonical: '/faq/',
  },
  openGraph: {
    title: 'Property Management FAQ Ontario | MoveSmart Rentals',
    description:
      'Answers to frequently asked questions about MoveSmart Rentals property management: pricing, tenant screening, rent protection, cities served, and more.',
    images: ['/og-default.png'],
  },
}

/* ------------------------------------------------------------------ */
/*  Curated FAQ content — organized by audience + category            */
/*  City-specific FAQs live on individual city/service pages          */
/* ------------------------------------------------------------------ */


const ALL_FAQ_ITEMS = FAQ_TABS.flatMap((tab) =>
  tab.categories.flatMap((cat) => cat.questions)
)

export default function FAQPage() {
  const faqPageSchema = buildFaqPageSchema({ questions: ALL_FAQ_ITEMS })

  return (
    <main>
      <JsonLd data={faqPageSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'FAQ', href: '/faq/' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1D3A] py-16 sm:py-20">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#10B98133 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Help Center
          </p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Everything you need to know about MoveSmart Rentals — organized by who you are and what you need.
          </p>
          {/* Stats row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {ALL_FAQ_ITEMS.length} answers
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              3 audience sections
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Updated for 2025/2026
            </span>
          </div>
        </div>
      </section>

      {/* Main FAQ interactive section */}
      <FAQPageClient tabs={FAQ_TABS} />

      <CTABannerBlock
        headline="Still Have Questions?"
        description="Our team is ready to help with any questions about our services."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}
