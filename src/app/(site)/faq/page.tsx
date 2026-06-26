import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { buildFaqPageSchema } from '@/lib/schema-builders'
import {
  FAQCategoryBlock,
  FAQCategoryNav,
} from './faq-client'
import { ALL_FAQ_ITEMS, FAQ_CATEGORIES } from './faq-data'

export const metadata: Metadata = {
  title: 'Leasing Brokerage FAQ Canada | Common Questions Answered',
  description:
    'Answers to frequently asked questions about MoveSmart Rentals full-service leasing and tenant placement: pricing, tenant qualification, rental protection, cities served, and more.',
  alternates: {
    canonical: '/faq/',
  },
  openGraph: {
    title: 'Leasing Brokerage FAQ Canada | MoveSmart Rentals',
    description:
      'Answers to frequently asked questions about MoveSmart Rentals full-service leasing and tenant placement: pricing, tenant qualification, rental protection, cities served, and more.',
    images: [{ url: '/og-default.png?v=3', width: 1200, height: 630, alt: 'MoveSmart Rentals FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage FAQ Canada | MoveSmart Rentals',
    description:
      'Answers to frequently asked questions about MoveSmart Rentals full-service leasing and tenant placement: pricing, tenant qualification, rental protection, cities served, and more.',
    images: ['/og-default.png?v=3'],
  },
}

/* ------------------------------------------------------------------ */
/*  Hero aside - "Popular topics" editorial card with 5 anchor links   */
/* ------------------------------------------------------------------ */

function PopularTopicsAside() {
  const popular = [
    { id: 'pricing', label: 'Pricing & fees' },
    { id: 'owners', label: 'Tenant screening' },
    { id: 'legal', label: 'LTB & rent guarantee' },
    { id: 'portal', label: 'Owner portal access' },
    { id: 'tenants', label: 'Applying as a tenant' },
  ]

  return (
    <aside className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -top-px left-6 h-px w-16 bg-brand-gold"
      />
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
        Popular topics
      </p>
      <ul className="mt-5 space-y-0 divide-y divide-white/10 border-y border-white/10">
        {popular.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#faq-${item.id}`}
              className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors"
            >
              <span className="flex items-baseline gap-3">
                <span
                  className="font-display text-xs tabular-nums text-brand-gold"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-lg text-white group-hover:text-brand-emerald">
                  {item.label}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="translate-x-0 text-white/50 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-emerald"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs leading-relaxed text-white/60">
        Can&apos;t find what you need?{' '}
        <Link
          href="/contact/"
          className="text-white underline decoration-brand-gold decoration-2 underline-offset-[4px] hover:text-brand-emerald"
        >
          Ask a human
        </Link>
        .
      </p>
    </aside>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

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

      {/* SECTION 1 - Editorial page hero (ivory/gold) */}
      <PageHeroBlock
        kicker="FAQ"
        eyebrow="Answers to common questions"
        headline="Everything you wanted to know."
        accentLastWord
        lede="A reading room, not a dumping ground - organized by topic, written in plain language, and kept current with provincial rules. Browse a section, scan a question, or jump straight to the team."
        cta1={{ label: 'Browse by topic', href: '#browse' }}
        cta2={{ label: 'Contact us', href: '/contact/' }}
        aside={<PopularTopicsAside />}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Open notebook with questions and answers about renting"
      />

      {/* Invisible anchor to match the hero CTA "Browse by topic" */}
      <div id="browse" aria-hidden="true" />

      {/* SECTION 2 - Browse-by-category nav (sticky, underline style) */}
      <FAQCategoryNav categories={FAQ_CATEGORIES} />

      {/* SECTIONS 3-8 - Six category reading blocks */}
      <div className="bg-white">
        {FAQ_CATEGORIES.map((cat, i) => (
          <FAQCategoryBlock key={cat.id} category={cat} index={i} />
        ))}
      </div>

    </main>
  )
}
