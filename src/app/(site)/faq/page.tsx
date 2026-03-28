import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { buildFaqPageSchema } from '@/lib/schema-builders'
import { sanityFetch } from '@/sanity/fetch'
import { AGGREGATED_FAQ_QUERY } from '@/sanity/queries/faq'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about MoveSmart Rentals property management services for owners, tenants, and franchise partners.',
  alternates: {
    canonical: '/faq/',
  },
  openGraph: {
    title: 'FAQ | MoveSmart Rentals',
    description:
      'Frequently asked questions about MoveSmart Rentals property management services for owners, tenants, and franchise partners.',
    images: ['/og-default.png'],
  },
}

interface AggregatedFaqItem {
  question: string
  answer: string
  source: string
  sourceTitle: string
  sourceSlug: string
}

/** Hardcoded fallback FAQs when CMS has no data */
const FALLBACK_FAQS = {
  owner: [
    {
      question: 'How does MoveSmart Rentals work for property owners?',
      answer:
        'We handle everything from listing your property and screening tenants to lease signing. You pay nothing upfront and our success-based fee is only charged after a qualified tenant is placed.',
    },
    {
      question: 'What areas does MoveSmart Rentals serve?',
      answer:
        'MoveSmart Rentals currently serves property owners across Ontario, with coverage in major cities including Toronto, Ottawa, Hamilton, London, and more. We are expanding into new markets regularly.',
    },
    {
      question: 'How long does it take to find a tenant?',
      answer:
        'Our average tenant placement time is 14 days. This varies by market and property type, but our technology-driven approach and multi-channel marketing ensure fast, quality placements.',
    },
  ],
  tenant: [
    {
      question: 'How do I apply for a rental?',
      answer:
        'Browse available listings on our website, select a property you are interested in, and submit an application online. Our screening process is fast and you will hear back within 48 hours.',
    },
    {
      question: 'What do I need for a tenant application?',
      answer:
        'You will need valid government ID, proof of income or employment, references from previous landlords, and consent for a credit check. All information is handled securely.',
    },
  ],
  general: [
    {
      question: 'Is MoveSmart Rentals free for tenants?',
      answer:
        'Yes. Tenants never pay any fees to MoveSmart Rentals. Our services are funded by property owners through our success-based fee model.',
    },
    {
      question: 'How do I contact MoveSmart Rentals?',
      answer:
        'You can reach us by phone at +1 (437) 295-7688, by email at info@movesmartrentals.com, or through the contact form on our website. Our team responds within 24 hours.',
    },
  ],
}

function groupFaqsBySource(faqs: AggregatedFaqItem[]) {
  const groups: Record<string, AggregatedFaqItem[]> = {}

  for (const faq of faqs) {
    const groupKey =
      faq.source === 'service'
        ? 'Service Questions'
        : faq.source === 'cityService'
          ? 'City-Specific Questions'
          : 'General Questions'

    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(faq)
  }

  return groups
}

export default async function FAQPage() {
  const data = await sanityFetch<{ faqs: AggregatedFaqItem[] }>({
    query: AGGREGATED_FAQ_QUERY,
    tags: ['service', 'cityService', 'blogGuide'],
  })

  const hasCmsData = data?.faqs && data.faqs.length > 0
  const cmsFaqs = hasCmsData ? data.faqs : []

  // Build all FAQ items for JSON-LD (either CMS or fallback)
  const allFaqItems = hasCmsData
    ? cmsFaqs.map((f) => ({ question: f.question, answer: f.answer }))
    : [
        ...FALLBACK_FAQS.owner,
        ...FALLBACK_FAQS.tenant,
        ...FALLBACK_FAQS.general,
      ]

  const faqPageSchema = buildFaqPageSchema({ questions: allFaqItems })

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

      <HeroBlock
        headline="Frequently Asked Questions"
        subheadline="Find answers to common questions about our property management services"
      />

      {hasCmsData ? (
        /* CMS data: grouped by source */
        (() => {
          const groups = groupFaqsBySource(cmsFaqs)
          return Object.entries(groups).map(([groupTitle, items]) => (
            <FAQBlock
              key={groupTitle}
              questions={items.map((f) => ({
                question: f.question,
                answer: f.answer,
              }))}
              title={groupTitle}
              schemaEnabled={false}
            />
          ))
        })()
      ) : (
        /* Fallback: hardcoded FAQs grouped by category */
        <>
          <FAQBlock
            questions={FALLBACK_FAQS.owner}
            title="Owner Questions"
            schemaEnabled={false}
          />
          <FAQBlock
            questions={FALLBACK_FAQS.tenant}
            title="Tenant Questions"
            schemaEnabled={false}
          />
          <FAQBlock
            questions={FALLBACK_FAQS.general}
            title="General Questions"
            schemaEnabled={false}
          />
        </>
      )}

      <CTABannerBlock
        headline="Still Have Questions?"
        description="Our team is ready to help with any questions about our services."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}
