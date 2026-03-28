import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { sanityFetch } from '@/sanity/fetch'
import { BLOG_GUIDE_LIST_QUERY } from '@/sanity/queries/blog-guide'
import { COMPARISON_LIST_QUERY } from '@/sanity/queries/comparison'
import { CASE_STUDY_LIST_QUERY } from '@/sanity/queries/case-study'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Ontario Rental Market Resources | Guides, Reports & Case Studies',
  description:
    'Free guides, Ontario rental market reports, property management case studies, and landlord FAQs. Expert resources for property owners and tenants.',
  alternates: { canonical: '/resources/' },
  openGraph: {
    title: 'Ontario Rental Market Resources | MoveSmart Rentals',
    description:
      'Free guides, Ontario rental market reports, property management case studies, and landlord FAQs.',
    images: ['/og-default.png'],
  },
}

// ---------------------------------------------------------------------------
// Types for fetched listing data
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
// Category badge colors
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  blog: 'bg-blue-100 text-blue-800',
  guide: 'bg-green-100 text-green-800',
  'market-report': 'bg-purple-100 text-purple-800',
  'legal-guide': 'bg-red-100 text-red-800',
  comparison: 'bg-orange-100 text-orange-800',
  'case-study': 'bg-teal-100 text-teal-800',
}

const CATEGORY_LABELS: Record<string, string> = {
  blog: 'Blog Post',
  guide: 'Guide',
  'market-report': 'Market Report',
  'legal-guide': 'Legal Guide',
  comparison: 'Comparison',
  'case-study': 'Case Study',
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-800'}`}
    >
      {CATEGORY_LABELS[category] ?? category}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Resource Card
// ---------------------------------------------------------------------------

function ResourceCard({
  title,
  slug,
  category,
  excerpt,
  author,
  publishedAt,
  cityTitle,
}: {
  title: string
  slug: string
  category: string
  excerpt?: string
  author?: string
  publishedAt?: string
  cityTitle?: string
}) {
  return (
    <article className="rounded-lg border shadow-sm transition hover:shadow-md p-6">
      <CategoryBadge category={category} />
      <h3 className="mt-3 font-semibold">
        <Link
          href={`/resources/${slug}/`}
          className="hover:text-primary transition-colors"
        >
          {title}
        </Link>
      </h3>
      {excerpt && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {excerpt.length > 120 ? `${excerpt.slice(0, 120)}...` : excerpt}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {author && <span>{author}</span>}
        {publishedAt && (
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        )}
        {cityTitle && (
          <span className="rounded bg-gray-100 px-2 py-0.5">{cityTitle}</span>
        )}
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Section component for grouped content
// ---------------------------------------------------------------------------

function ResourceSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
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

  // Split blog guides by category
  const guides = blogGuides.filter(
    (bg) => bg.category === 'guide' || bg.category === 'blog' || !bg.category
  )
  const marketReports = blogGuides.filter(
    (bg) => bg.category === 'market-report'
  )
  const legalGuides = blogGuides.filter(
    (bg) => bg.category === 'legal-guide'
  )

  // Category anchor links
  const categoryAnchors = [
    { label: 'All', href: '#' },
    { label: 'Guides', href: '#guides' },
    { label: 'Market Reports', href: '#market-reports' },
    { label: 'Legal Guides', href: '#legal-guides' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Comparisons', href: '#comparisons' },
  ]

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources/' },
          ]}
        />
      </div>

      <HeroBlock
        headline="Resources and Guides"
        subheadline="Expert advice for Ontario property owners and tenants"
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Category filter tabs (anchor links) */}
        <nav className="mb-12 flex flex-wrap gap-2" aria-label="Resource categories">
          {categoryAnchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-primary hover:text-primary-foreground"
            >
              {anchor.label}
            </a>
          ))}
        </nav>

        {/* Content sections */}
        <div className="space-y-16">
          {guides.length > 0 && (
            <ResourceSection id="guides" title="Guides & Articles">
              {guides.map((item) => (
                <ResourceCard
                  key={item.slug}
                  title={item.title}
                  slug={item.slug}
                  category={item.category || 'blog'}
                  excerpt={item.excerpt}
                  author={item.author}
                  publishedAt={item.publishedAt}
                  cityTitle={item.cityTitle}
                />
              ))}
            </ResourceSection>
          )}

          {marketReports.length > 0 && (
            <ResourceSection id="market-reports" title="Market Reports">
              {marketReports.map((item) => (
                <ResourceCard
                  key={item.slug}
                  title={item.title}
                  slug={item.slug}
                  category="market-report"
                  excerpt={item.excerpt}
                  author={item.author}
                  publishedAt={item.publishedAt}
                  cityTitle={item.cityTitle}
                />
              ))}
            </ResourceSection>
          )}

          {legalGuides.length > 0 && (
            <ResourceSection id="legal-guides" title="Legal Guides">
              {legalGuides.map((item) => (
                <ResourceCard
                  key={item.slug}
                  title={item.title}
                  slug={item.slug}
                  category="legal-guide"
                  excerpt={item.excerpt}
                  author={item.author}
                  publishedAt={item.publishedAt}
                  cityTitle={item.cityTitle}
                />
              ))}
            </ResourceSection>
          )}

          {caseStudies.length > 0 && (
            <ResourceSection id="case-studies" title="Case Studies">
              {caseStudies.map((item) => (
                <ResourceCard
                  key={item.slug}
                  title={item.title}
                  slug={item.slug}
                  category="case-study"
                  excerpt={
                    item.outcome
                      ? item.outcome.length > 120
                        ? `${item.outcome.slice(0, 120)}...`
                        : item.outcome
                      : undefined
                  }
                  cityTitle={item.cityTitle}
                />
              ))}
            </ResourceSection>
          )}

          {comparisons.length > 0 && (
            <ResourceSection id="comparisons" title="Comparisons">
              {comparisons.map((item) => (
                <ResourceCard
                  key={item.slug}
                  title={item.title}
                  slug={item.slug}
                  category="comparison"
                  excerpt={
                    item.serviceTitle
                      ? `Compare property management services for ${item.serviceTitle}`
                      : undefined
                  }
                />
              ))}
            </ResourceSection>
          )}
        </div>
      </div>

      <CTABannerBlock
        headline="Have Questions?"
        description="Our team is ready to help you find the right property management solution."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
        secondaryCta={{ label: 'View Services', href: '/services/property-management/' }}
      />
    </main>
  )
}
