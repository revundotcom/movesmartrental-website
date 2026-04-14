import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { sanityFetch } from '@/sanity/fetch'
import { BLOG_GUIDE_LIST_QUERY } from '@/sanity/queries/blog-guide'
import { COMPARISON_LIST_QUERY } from '@/sanity/queries/comparison'
import { CASE_STUDY_LIST_QUERY } from '@/sanity/queries/case-study'

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
    'Field manuals for serious rental operators. Free landlord playbooks, tenant handbooks, institutional lease-up guides, and quarterly market reports from Canada and the US\u2019s white-glove leasing brokerage.',
  alternates: { canonical: '/resources/' },
  openGraph: {
    title: 'Leasing Resources | MoveSmart Rentals',
    description:
      'Field manuals for serious rental operators. Landlord playbooks, tenant handbooks, institutional lease-up guides, and quarterly market reports.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Resources | MoveSmart Rentals',
    description:
      'Field manuals for serious rental operators - landlord, tenant, institutional, and market-report guides.',
  },
}

// ---------------------------------------------------------------------------
// Types for fetched listing data (preserved from prior implementation)
// ---------------------------------------------------------------------------

interface BlogGuideListItem {
  title: string
  slug: string
  category?: 'blog' | 'guide' | 'market-report' | 'legal-guide'
  excerpt?: string
  heroImageUrl?: string
  heroImageAlt?: string
  author?: string
  publishedAt?: string
  cityTitle?: string
  serviceTitle?: string
  featured?: boolean
}

interface ComparisonListItem {
  title: string
  slug: string
  serviceTitle?: string
}

interface CaseStudyListItem {
  title: string
  slug: string
  clientName?: string
  outcome?: string
  cityTitle?: string
  heroImageUrl?: string
  heroImageAlt?: string
}

// ---------------------------------------------------------------------------
// Mappers: normalise every Sanity source into EditorialArticle
// ---------------------------------------------------------------------------

function mapBlogGuide(b: BlogGuideListItem): EditorialArticle {
  return {
    title: b.title,
    slug: b.slug,
    category: b.category,
    excerpt: b.excerpt,
    author: b.author,
    publishedAt: b.publishedAt,
    cityTitle: b.cityTitle,
  }
}

function mapComparison(c: ComparisonListItem): EditorialArticle {
  return {
    title: c.title,
    slug: c.slug,
    category: 'comparison',
    excerpt: c.serviceTitle
      ? `Compare leasing approaches for ${c.serviceTitle}.`
      : undefined,
  }
}

function mapCaseStudy(c: CaseStudyListItem): EditorialArticle {
  return {
    title: c.title,
    slug: c.slug,
    category: 'case-study',
    excerpt: c.outcome,
    cityTitle: c.cityTitle,
    author: c.clientName,
  }
}

function formatShortDate(iso?: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

// ---------------------------------------------------------------------------
// "What's new this month" aside (Sanity-driven, placeholder fallback)
// ---------------------------------------------------------------------------

function WhatsNewAside({ items }: { items: EditorialArticle[] }) {
  // TODO(phase-3): swap placeholder list once Sanity is seeded with guide drops.
  const placeholders: EditorialArticle[] = [
    {
      title: 'Q2 2026 Ontario rental market report',
      slug: '#',
      publishedAt: '2026-04-03',
    },
    {
      title: 'Lease-up playbook: the first 30 days',
      slug: '#',
      publishedAt: '2026-04-01',
    },
    {
      title: 'Screening a self-employed applicant the right way',
      slug: '#',
      publishedAt: '2026-03-28',
    },
  ]
  const picks = (items.length >= 3 ? items.slice(0, 3) : placeholders).slice(
    0,
    3,
  )

  return (
    <div className="relative overflow-hidden border border-brand-navy/10 bg-white px-6 py-7 shadow-[0_20px_60px_-30px_rgba(10,20,50,0.25)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
      />
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
        This month
      </p>
      <h3 className="font-display text-xl font-normal text-brand-navy">
        Freshly{' '}
        <span className="italic text-brand-emerald">published</span>
        <span aria-hidden="true" className="text-brand-gold">
          .
        </span>
      </h3>
      <ul className="mt-5 divide-y divide-brand-navy/10">
        {picks.map((p, i) => (
          <li key={`${p.slug}-${i}`} className="py-3">
            <Link
              href={
                p.slug && p.slug !== '#' ? `/resources/${p.slug}/` : '#featured'
              }
              className="group flex items-start justify-between gap-4"
            >
              <span className="text-sm font-medium leading-snug text-brand-navy transition-colors group-hover:text-brand-emerald">
                {p.title}
              </span>
              <span className="shrink-0 text-[11px] uppercase tracking-wider text-slate-500">
                {formatShortDate(p.publishedAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[11px] italic text-slate-500">
        New guides published most weeks. Nothing filler, ever.
      </p>
    </div>
  )
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
  const [blogGuides, comparisons, caseStudies] = await Promise.all([
    sanityFetch<BlogGuideListItem[]>({
      query: BLOG_GUIDE_LIST_QUERY,
      params: { category: null },
      tags: ['blogGuide'],
    }),
    sanityFetch<ComparisonListItem[]>({
      query: COMPARISON_LIST_QUERY,
      tags: ['comparison'],
    }),
    sanityFetch<CaseStudyListItem[]>({
      query: CASE_STUDY_LIST_QUERY,
      tags: ['caseStudy'],
    }),
  ])

  // Normalise every Sanity source into the editorial article shape
  const allArticles: EditorialArticle[] = [
    ...blogGuides.map(mapBlogGuide),
    ...comparisons.map(mapComparison),
    ...caseStudies.map(mapCaseStudy),
  ]

  // Pick featured: explicit featured flag, else first blog/guide, else first item
  const featuredSource =
    blogGuides.find((b) => b.featured) ?? blogGuides[0] ?? null
  const featured: EditorialArticle | null = featuredSource
    ? mapBlogGuide(featuredSource)
    : allArticles[0] ?? null

  // Recent feed (everything except featured, capped at 12)
  const recent = allArticles
    .filter((a) => a.slug !== featured?.slug)
    .slice(0, 12)

  // Counts passed to editorial in case a future section surfaces them
  const articleCount = allArticles.length
  const guideCount = blogGuides.filter(
    (b) => b.category === 'guide' || b.category === 'legal-guide',
  ).length
  const reportCount = blogGuides.filter(
    (b) => b.category === 'market-report',
  ).length

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
        cta1={{ label: 'Browse the library', href: '#pillars' }}
        cta2={{ label: 'Talk to the team', href: '/contact/?type=owner' }}
        aside={<WhatsNewAside items={recent} />}
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
