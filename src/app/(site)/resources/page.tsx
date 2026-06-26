import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { listGuides, type GuideContent } from '@/data/guides'

import {
  ResourcesEditorial,
  type EditorialArticle,
} from './resources-editorial'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Leasing Resources | Landlord, Tenant & Institutional Guides | MoveSmart Rentals',
  description:
    'Field manuals for serious rental operators. Free landlord playbooks, tenant handbooks, institutional lease-up guides, and quarterly market reports from Canada and the US\u2019s full-service leasing and tenant placement company.',
  alternates: { canonical: '/resources/' },
  openGraph: {
    title: 'Leasing Resources | MoveSmart Rentals',
    description:
      'Field manuals for serious rental operators. Landlord playbooks, tenant handbooks, institutional lease-up guides, and quarterly market reports.',
    images: ['/og-default.png?v=2'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Resources | MoveSmart Rentals',
    description:
      'Field manuals for serious rental operators - landlord, tenant, institutional, and market-report guides.',
  },
}

// ---------------------------------------------------------------------------
// Mapper: normalise local GuideContent into EditorialArticle
// ---------------------------------------------------------------------------

function mapGuide(g: GuideContent): EditorialArticle {
  return {
    title: g.title,
    slug: g.slug,
    category: g.category,
    excerpt: g.metaDescription,
    author: g.author,
    publishedAt: g.publishDate,
  }
}

// ---------------------------------------------------------------------------
// JSON-LD: CollectionPage describing the resources hub
// ---------------------------------------------------------------------------

const COLLECTION_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'MoveSmart Rentals Leasing Resources',
  url: 'https://movesmartrentals.com/resources/',
  description:
    'Field manuals for serious rental operators. Landlord playbooks, tenant handbooks, institutional lease-up guides, and quarterly market reports published by MoveSmart Rentals.',
  inLanguage: 'en',
  isPartOf: {
    '@type': 'WebSite',
    name: 'MoveSmart Rentals',
    url: 'https://movesmartrentals.com/',
  },
  about: [
    { '@type': 'Thing', name: 'Landlord guides' },
    { '@type': 'Thing', name: 'Tenant guides' },
    { '@type': 'Thing', name: 'Institutional lease-up guides' },
    { '@type': 'Thing', name: 'Rental market reports' },
  ],
  hasPart: [
    {
      '@type': 'ItemList',
      name: 'Featured leasing guides',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: 'https://movesmartrentals.com/resources/tenant-screening-ontario-landlords/',
          name: 'Tenant Screening Guide for Ontario Landlords',
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: 'https://movesmartrentals.com/resources/how-to-price-your-rental-2026/',
          name: 'How to Price Your Rental in 2026',
        },
        {
          '@type': 'ListItem',
          position: 3,
          url: 'https://movesmartrentals.com/resources/rent-guarantee-101/',
          name: 'Rent Guarantee 101: What It Covers',
        },
        {
          '@type': 'ListItem',
          position: 4,
          url: 'https://movesmartrentals.com/resources/lease-up-playbook-first-30-days/',
          name: 'Lease-Up Playbook: The First 30 Days',
        },
        {
          '@type': 'ListItem',
          position: 5,
          url: 'https://movesmartrentals.com/resources/how-to-avoid-bad-tenants/',
          name: 'How to Avoid Bad Tenants: The 12-Point Checklist',
        },
        {
          '@type': 'ListItem',
          position: 6,
          url: 'https://movesmartrentals.com/resources/institutional-rfp-template/',
          name: 'Institutional RFP Template for Purpose-Built Rentals',
        },
        {
          '@type': 'ListItem',
          position: 7,
          url: 'https://movesmartrentals.com/resources/tenant-insurance-by-province/',
          name: 'Tenant Insurance Requirements by Province',
        },
        {
          '@type': 'ListItem',
          position: 8,
          url: 'https://movesmartrentals.com/resources/moving-day-coordination-tenant/',
          name: 'Moving Day Coordination Guide (Tenant Edition)',
        },
      ],
    },
  ],
}

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are these guides free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every guide, checklist, and market report on this site is free to read. No paywall, no email gate on the content itself, no lead-form gymnastics.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often are the guides updated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Legal guides are reviewed whenever the governing statute or tribunal rule changes. Market reports refresh each quarter. Evergreen operational guides get a full audit once a year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I republish or cite these guides?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Short excerpts with attribution and a link back to the original page are fine. For longer reproductions, reach out and we will confirm in writing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you produce custom guides for institutional clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. For developers and asset managers, we prepare tailored lease-up playbooks, RFP responses, and concession-strategy memos specific to the asset.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who writes these guides?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our leasing team writes the operational content. Legal guides are reviewed by outside counsel. Market reports are compiled from CMHC, Statistics Canada, MLS data, and our own leasing file.',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ResourcesPage() {
  // Local guide registry replaces the prior Sanity-backed fetches.
  const guides = listGuides()
  const comparisons: never[] = []
  const caseStudies: never[] = []

  // Normalise every source into the editorial article shape
  const allArticles: EditorialArticle[] = [
    ...guides.map(mapGuide),
    ...comparisons,
    ...caseStudies,
  ]

  // Pick featured: first guide, else first article
  const featured: EditorialArticle | null = guides[0]
    ? mapGuide(guides[0])
    : allArticles[0] ?? null

  // Recent feed (everything except featured, capped at 12)
  const recent = allArticles
    .filter((a) => a.slug !== featured?.slug)
    .slice(0, 12)

  // Counts passed to editorial in case a future section surfaces them
  const articleCount = allArticles.length
  const guideCount = guides.filter(
    (g) => g.category === 'landlord' || g.category === 'tenant' || g.category === 'institutional',
  ).length
  const reportCount = guides.filter((g) => g.category === 'market').length

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources/' },
          ]}
        />
      </div>

      <PageHeroBlock
        kicker="Resources"
        eyebrow="The published process"
        headline="Field manuals for serious rental operators"
        lede="Everything we have learned from thousands of leases, 20+ markets, and institutional lease-up campaigns across North America - documented for landlords, tenants, and developers. Peace of mind, through execution you can audit."
        cta1={{ label: 'Browse the library', href: '#featured' }}
        cta2={{ label: 'Talk to the team', href: '/contact/?type=owner' }}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Lease documents and paperwork — MoveSmart resource library"
      />

      <ResourcesEditorial
        featured={featured}
        recent={recent}
        counts={{
          articles: articleCount,
          guides: guideCount,
          reports: reportCount,
        }}
      />
    </main>
  )
}
