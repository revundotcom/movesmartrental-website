import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
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
  title: 'Canadian Rental Market Resources | Guides, Reports & Case Studies',
  description:
    'Free guides, Canadian rental market reports, property management case studies, and landlord FAQs. Expert resources for property owners and tenants.',
  alternates: { canonical: '/resources/' },
  openGraph: {
    title: 'Canadian Rental Market Resources | MoveSmart Rentals',
    description:
      'Free guides, Canadian rental market reports, property management case studies, and landlord FAQs.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian Rental Market Resources | MoveSmart Rentals',
    description:
      'Free guides, Canadian rental market reports, property management case studies, and landlord FAQs.',
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
      ? `Compare property management approaches for ${c.serviceTitle}.`
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
  // TODO: swap placeholder list once Sanity is seeded with monthly dispatches.
  const placeholders: EditorialArticle[] = [
    {
      title: 'What CMHC’s spring report means for GTA rents',
      slug: '#',
      publishedAt: '2026-04-03',
    },
    {
      title: 'Ontario rent-increase guideline, plain-English',
      slug: '#',
      publishedAt: '2026-04-01',
    },
    {
      title: 'Screening a self-employed applicant, the right way',
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
        What’s new on the shelf
      </h3>
      <ul className="mt-5 divide-y divide-brand-navy/10">
        {picks.map((p, i) => (
          <li key={`${p.slug}-${i}`} className="py-3">
            <Link
              href={
                p.slug && p.slug !== '#' ? `/resources/${p.slug}/` : '#recent'
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
        New guides published most weeks. No filler.
      </p>
    </div>
  )
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

  // Counts for hero meta strip
  const articleCount = allArticles.length
  const guideCount = blogGuides.filter(
    (b) => b.category === 'guide' || b.category === 'legal-guide',
  ).length
  const reportCount = blogGuides.filter(
    (b) => b.category === 'market-report',
  ).length

  return (
    <main>
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
        eyebrow="Articles, guides, and checklists"
        headline="A working library for Canadian rental owners and tenants"
        lede="Plain-English guides, monthly market reports, and checklists we actually use on our own files. No fluff, no paywalls, no lead-gen bait."
        cta1={{ label: 'Browse Articles', href: '#recent' }}
        cta2={{ label: 'Ask the Team', href: '/contact/' }}
        meta={[
          {
            label: 'Articles',
            value: articleCount > 0 ? String(articleCount) : '40+',
          },
          {
            label: 'Guides',
            value: guideCount > 0 ? String(guideCount) : '12',
          },
          { label: 'Updated', value: 'Weekly' },
          { label: 'Topics', value: '8' },
        ]}
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

      <CTABannerBlock
        headline="Can’t find what you’re looking for?"
        description="Our team answers owner and tenant questions within 24 hours - by phone, email, or the contact form. No chatbot runaround."
        primaryCta={{ label: 'Ask the Team', href: '/contact/' }}
        secondaryCta={{ label: 'View Services', href: '/services/' }}
      />
    </main>
  )
}
