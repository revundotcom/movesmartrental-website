import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { PortableTextBody } from '@/components/portable-text'
import { generatePageMetadata } from '@/lib/metadata'
import { buildArticleSchema } from '@/lib/schema-builders/article'
import { sanityFetch } from '@/sanity/fetch'
import { BLOG_GUIDE_LIST_QUERY } from '@/sanity/queries/blog-guide'
import { COMPARISON_LIST_QUERY } from '@/sanity/queries/comparison'
import { CASE_STUDY_LIST_QUERY } from '@/sanity/queries/case-study'
import { GUIDES, GUIDE_SLUGS, type GuideContent } from '@/data/guides'
import type { SeoFields, PublishingControls, CompetitorComparison } from '@/types/sanity'
import type { PortableTextBlock } from '@portabletext/types'

// ---------------------------------------------------------------------------
// Sanity Image URL Helper (mirrors portable-text.tsx)
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

function sanityImageUrl(ref: string): string {
  const parts = ref.replace('image-', '').split('-')
  const ext = parts.pop()
  const rest = parts.join('-')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${rest}.${ext}`
}

// ---------------------------------------------------------------------------
// Universal Resource GROQ Query
// ---------------------------------------------------------------------------

const UNIVERSAL_RESOURCE_QUERY = groq`
  *[slug.current == $slug && _type in ["blogGuide", "comparison", "caseStudy"]][0] {
    _id,
    _type,
    _updatedAt,
    title,
    slug,
    seo,
    publishing,
    // blogGuide fields
    _type == "blogGuide" => {
      category,
      body,
      excerpt,
      heroImage {
        asset,
        alt,
        hotspot
      },
      author,
      "cityTitle": city->title,
      "citySlug": city->slug.current,
      "cityProvinceSlug": city->province->slug.current,
      "serviceTitle": service->title,
      "serviceSlug": service->slug.current
    },
    // comparison fields
    _type == "comparison" => {
      competitors[] {
        name,
        features[] {
          feature,
          us,
          them
        }
      },
      body,
      "serviceTitle": service->title,
      "serviceSlug": service->slug.current
    },
    // caseStudy fields
    _type == "caseStudy" => {
      clientName,
      outcome,
      body,
      heroImage {
        asset,
        alt,
        hotspot
      },
      "cityTitle": city->title,
      "citySlug": city->slug.current,
      "cityProvinceSlug": city->province->slug.current
    }
  }
`

// ---------------------------------------------------------------------------
// Fetched document type (union of all content type fields)
// ---------------------------------------------------------------------------

interface ResourceDocument {
  _id: string
  _type: 'blogGuide' | 'comparison' | 'caseStudy'
  _updatedAt: string
  title: string
  slug: { current: string }
  seo: SeoFields
  publishing: PublishingControls
  // blogGuide fields
  category?: 'blog' | 'guide' | 'market-report' | 'legal-guide'
  body?: PortableTextBlock[]
  excerpt?: string
  heroImage?: { asset: { _ref: string }; alt?: string }
  author?: string
  cityTitle?: string
  citySlug?: string
  cityProvinceSlug?: string
  serviceTitle?: string
  serviceSlug?: string
  // comparison fields
  competitors?: CompetitorComparison[]
  // caseStudy fields
  clientName?: string
  outcome?: string
}

// ---------------------------------------------------------------------------
// Category labels
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  blog: 'Blog Post',
  guide: 'Guide',
  'market-report': 'Market Report',
  'legal-guide': 'Legal Guide',
}

const CATEGORY_COLORS: Record<string, string> = {
  blog: 'bg-blue-100 text-blue-800',
  guide: 'bg-green-100 text-green-800',
  'market-report': 'bg-purple-100 text-purple-800',
  'legal-guide': 'bg-red-100 text-red-800',
  comparison: 'bg-orange-100 text-orange-800',
  'case-study': 'bg-teal-100 text-teal-800',
}

// ---------------------------------------------------------------------------
// generateStaticParams
// ---------------------------------------------------------------------------

interface SlugItem {
  slug: string
}

export async function generateStaticParams() {
  const [blogGuides, comparisons, caseStudies] = await Promise.all([
    sanityFetch<SlugItem[]>({
      query: BLOG_GUIDE_LIST_QUERY,
      params: { category: null },
      tags: ['blogGuide'],
    }),
    sanityFetch<SlugItem[]>({
      query: COMPARISON_LIST_QUERY,
      tags: ['comparison'],
    }),
    sanityFetch<SlugItem[]>({
      query: CASE_STUDY_LIST_QUERY,
      tags: ['caseStudy'],
    }),
  ])

  const localSlugs = GUIDE_SLUGS.map((slug) => ({ slug }))
  const sanitySlugs = [
    ...blogGuides.map((bg) => ({ slug: bg.slug })),
    ...comparisons.map((c) => ({ slug: c.slug })),
    ...caseStudies.map((cs) => ({ slug: cs.slug })),
  ]

  // De-dupe - local slugs take precedence when a slug exists in both sources
  const seen = new Set(localSlugs.map((s) => s.slug))
  const merged = [
    ...localSlugs,
    ...sanitySlugs.filter((s) => !seen.has(s.slug)),
  ]

  return merged
}

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // Local guide registry takes precedence
  const localGuide = GUIDES[slug]
  if (localGuide) {
    return generatePageMetadata({
      path: `/resources/${slug}`,
      fallbackTitle: localGuide.seoTitle,
      fallbackDescription: localGuide.metaDescription,
    })
  }

  const doc = await sanityFetch<ResourceDocument | null>({
    query: UNIVERSAL_RESOURCE_QUERY,
    params: { slug },
    tags: ['blogGuide', 'comparison', 'caseStudy'],
  })

  if (!doc) {
    return { title: 'Resource Not Found' }
  }

  const typeLabel =
    doc._type === 'blogGuide'
      ? CATEGORY_LABELS[doc.category || 'blog'] || 'Article'
      : doc._type === 'comparison'
        ? 'Comparison'
        : 'Case Study'

  return generatePageMetadata({
    seo: doc.seo,
    path: `/resources/${slug}`,
    fallbackTitle: `${doc.title} | ${typeLabel}`,
    fallbackDescription:
      doc.excerpt || doc.outcome || `${typeLabel}: ${doc.title}`,
  })
}

// ---------------------------------------------------------------------------
// Comparison Table Component
// ---------------------------------------------------------------------------

function ComparisonTable({ competitor }: { competitor: CompetitorComparison }) {
  return (
    <div className="my-8 overflow-x-auto">
      <h3 className="mb-4 text-xl font-semibold">
        MoveSmart Rentals vs {competitor.name}
      </h3>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="px-4 py-3 font-semibold">Feature</th>
            <th className="px-4 py-3 font-semibold text-primary">
              MoveSmart Rentals
            </th>
            <th className="px-4 py-3 font-semibold">{competitor.name}</th>
          </tr>
        </thead>
        <tbody>
          {competitor.features?.map((row, i) => (
            <tr
              key={row.feature}
              className={i % 2 === 0 ? 'bg-muted/50' : 'bg-white'}
            >
              <td className="border-b px-4 py-3 font-medium">{row.feature}</td>
              <td className="border-b px-4 py-3">{row.us}</td>
              <td className="border-b px-4 py-3">{row.them}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Local guide registry takes precedence - render with dedicated layout
  const localGuide = GUIDES[slug]
  if (localGuide) {
    return <LocalGuidePage guide={localGuide} slug={slug} />
  }

  const doc = await sanityFetch<ResourceDocument | null>({
    query: UNIVERSAL_RESOURCE_QUERY,
    params: { slug },
    tags: ['blogGuide', 'comparison', 'caseStudy'],
  })

  if (!doc) {
    notFound()
  }

  // Determine display category for badge
  const displayCategory =
    doc._type === 'blogGuide'
      ? doc.category || 'blog'
      : doc._type === 'comparison'
        ? 'comparison'
        : 'case-study'

  const categoryLabel =
    doc._type === 'blogGuide'
      ? CATEGORY_LABELS[doc.category || 'blog'] || 'Blog Post'
      : doc._type === 'comparison'
        ? 'Comparison'
        : 'Case Study'

  // JSON-LD Article schema
  const heroImageRef = doc.heroImage?.asset?._ref
  const articleSchema = buildArticleSchema({
    headline: doc.title,
    author: doc.author || 'MoveSmart Rentals',
    datePublished: doc.publishing?.publishedAt || doc._updatedAt,
    dateModified: doc.publishing?.updatedAt || doc._updatedAt,
    description:
      doc.seo?.metaDescription || doc.excerpt || doc.outcome || doc.title,
    image: heroImageRef ? sanityImageUrl(heroImageRef) : undefined,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'}/resources/${slug}/`,
    isBlogPost: doc._type === 'blogGuide' && doc.category === 'blog',
  })

  // CTA config by type
  const ctaConfig =
    doc._type === 'blogGuide'
      ? {
          headline: 'Need Help Leasing Your Unit?',
          description: 'Get expert leasing advice tailored to your situation.',
          primaryCta: { label: 'Get a Free Quote', href: '/contact/' },
        }
      : doc._type === 'comparison'
        ? {
            headline: 'Ready to Switch?',
            description:
              'See why property owners choose MoveSmart Rentals for white-glove leasing.',
            primaryCta: { label: 'Compare Plans', href: '/pricing/' },
          }
        : {
            headline: 'Want Similar Results?',
            description: 'Let us run the leasing playbook on your unit - listed to keys.',
            primaryCta: { label: 'Contact Us', href: '/contact/' },
          }

  return (
    <main>
      <JsonLd data={articleSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-[#132850] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          className="absolute -right-32 top-0 size-[420px] rounded-full bg-brand-emerald/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -left-32 bottom-0 size-[360px] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-brand-emerald [&_span]:text-white/50 mb-6">
            <BreadcrumbNav
              crumbs={[
                { label: 'Home', href: '/' },
                { label: 'Resources', href: '/resources/' },
                { label: doc.title, href: `/resources/${slug}/` },
              ]}
            />
          </div>

          <header>
            <div className="mb-6">
              <span
                className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${CATEGORY_COLORS[displayCategory] ?? 'bg-gray-100 text-gray-800'}`}
              >
                {categoryLabel}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              {doc.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
              {doc.author && (
                <span className="font-medium">By {doc.author}</span>
              )}
              {doc.publishing?.publishedAt && (
                <>
                  <span className="text-white/30">&bull;</span>
                  <time dateTime={doc.publishing.publishedAt}>
                    {new Date(doc.publishing.publishedAt).toLocaleDateString(
                      'en-CA',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </time>
                </>
              )}
              {doc.cityTitle && doc.citySlug && doc.cityProvinceSlug && (
                <>
                  <span className="text-white/30">&bull;</span>
                  <Link
                    href={`/ca/${doc.cityProvinceSlug}/${doc.citySlug}/`}
                    className="text-brand-emerald hover:text-brand-emerald/80 hover:underline font-medium"
                  >
                    {doc.cityTitle}
                  </Link>
                </>
              )}
              {doc.serviceTitle && doc.serviceSlug && (
                <>
                  <span className="text-white/30">&bull;</span>
                  <Link
                    href={`/services/${doc.serviceSlug}/`}
                    className="text-brand-emerald hover:text-brand-emerald/80 hover:underline font-medium"
                  >
                    {doc.serviceTitle}
                  </Link>
                </>
              )}
            </div>
          </header>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-12">
        {/* Type-specific rendering */}

        {/* ---- BlogGuide ---- */}
        {doc._type === 'blogGuide' && (
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-a:text-brand-emerald hover:prose-a:text-brand-emerald/80">
            {doc.heroImage?.asset?._ref && (
              <div className="relative mb-10 aspect-[2/1] overflow-hidden rounded-2xl shadow-lg not-prose">
                <Image
                  src={sanityImageUrl(doc.heroImage.asset._ref)}
                  alt={doc.heroImage.alt || doc.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            {doc.body && <PortableTextBody value={doc.body} />}
          </article>
        )}

        {/* ---- Comparison ---- */}
        {doc._type === 'comparison' && (
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-a:text-brand-emerald hover:prose-a:text-brand-emerald/80">
            {doc.body && <PortableTextBody value={doc.body} />}
            {doc.competitors && doc.competitors.length > 0 && (
              <div className="mt-10 space-y-12 not-prose">
                {doc.competitors.map((competitor) => (
                  <ComparisonTable
                    key={competitor.name}
                    competitor={competitor}
                  />
                ))}
              </div>
            )}
          </article>
        )}

        {/* ---- Case Study ---- */}
        {doc._type === 'caseStudy' && (
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-a:text-brand-emerald hover:prose-a:text-brand-emerald/80">
            {doc.heroImage?.asset?._ref && (
              <div className="relative mb-10 aspect-[2/1] overflow-hidden rounded-2xl shadow-lg not-prose">
                <Image
                  src={sanityImageUrl(doc.heroImage.asset._ref)}
                  alt={doc.heroImage.alt || doc.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            {doc.outcome && (
              <div className="mb-10 rounded-2xl border-l-4 border-brand-emerald bg-brand-emerald/5 p-6 not-prose">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-2">
                  Outcome
                </p>
                <p className="font-display text-xl text-brand-navy">
                  {doc.outcome}
                </p>
              </div>
            )}
            {doc.clientName && (
              <p className="mb-6 text-sm text-slate-500 not-prose">
                Client:{' '}
                <span className="font-semibold text-brand-navy">
                  {doc.clientName}
                </span>
              </p>
            )}
            {doc.body && <PortableTextBody value={doc.body} />}
          </article>
        )}
      </div>

      {/* Related Resources */}
      <section className="bg-slate-50 py-12 lg:py-12 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-emerald font-heading font-semibold text-xs uppercase tracking-wider mb-3">
              Keep Reading
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-brand-navy">
              More Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/resources/"
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-emerald/30"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-2">
                Browse All
              </p>
              <h3 className="font-display text-lg text-brand-navy group-hover:text-brand-emerald transition-colors">
                All Resources
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Guides, comparisons, and case studies.
              </p>
            </Link>
            <Link
              href="/services/"
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-emerald/30"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-2">
                Services
              </p>
              <h3 className="font-display text-lg text-brand-navy group-hover:text-brand-emerald transition-colors">
                Our Services
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Nine end-to-end leasing services.
              </p>
            </Link>
            <Link
              href="/locations/"
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-emerald/30"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-2">
                Locations
              </p>
              <h3 className="font-display text-lg text-brand-navy group-hover:text-brand-emerald transition-colors">
                Service Areas
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Cities we serve across Canada.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <CTABannerBlock
        headline={ctaConfig.headline}
        description={ctaConfig.description}
        primaryCta={ctaConfig.primaryCta}
      />
    </main>
  )
}

// ---------------------------------------------------------------------------
// Local Guide Page - renders from src/data/guides registry (non-Sanity)
// ---------------------------------------------------------------------------

function GuideBody({ body }: { body: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Lift markdown rendering into brand-appropriate classes.
        // prose wrapper on the article already applies base typography,
        // so ReactMarkdown components can be minimal.
        a: ({ href, children }) => (
          <a href={href} className="text-brand-emerald hover:text-brand-emerald/80">
            {children}
          </a>
        ),
        h3: ({ children }) => (
          <h3 className="font-display text-brand-navy">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="font-display text-brand-navy">{children}</h4>
        ),
      }}
    >
      {body}
    </ReactMarkdown>
  )
}

function LocalGuidePage({ guide, slug }: { guide: GuideContent; slug: string }) {
  const articleSchema = buildArticleSchema({
    headline: guide.title,
    author: guide.author,
    datePublished: guide.publishDate,
    dateModified: guide.publishDate,
    description: guide.metaDescription,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'}/resources/${slug}/`,
    isBlogPost: false,
  })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqItems.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const categoryLabel =
    guide.category === 'landlord'
      ? 'Landlord Guide'
      : guide.category === 'tenant'
        ? 'Tenant Guide'
        : guide.category === 'institutional'
          ? 'Institutional Guide'
          : 'Market Report'

  return (
    <main>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-[#132850] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-brand-emerald [&_span]:text-white/50 mb-6">
            <BreadcrumbNav
              crumbs={[
                { label: 'Home', href: '/' },
                { label: 'Resources', href: '/resources/' },
                { label: guide.title, href: `/resources/${slug}/` },
              ]}
            />
          </div>
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold mb-4">
              {guide.hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              {guide.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {guide.hero.lede}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {categoryLabel}
              </span>
              <span className="text-white/30">&bull;</span>
              <span>{guide.readTimeMinutes} min read</span>
              <span className="text-white/30">&bull;</span>
              <span>By {guide.author}</span>
            </div>
          </header>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-12">
        {/* Table of contents */}
        {guide.tableOfContents.length > 0 && (
          <nav aria-label="Table of contents" className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-3">
              On this page
            </p>
            <ol className="space-y-2 text-sm text-brand-navy">
              {guide.tableOfContents.map((item, i) => (
                <li key={item.id}>
                  <Link href={`#${item.id}`} className="hover:text-brand-emerald">
                    {i + 1}. {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Sections */}
        <article className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-a:text-brand-emerald hover:prose-a:text-brand-emerald/80">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.heading}</h2>
              <GuideBody body={section.body} />
              {section.subsections?.map((sub, j) => (
                <div key={j}>
                  <h3>{sub.heading}</h3>
                  <GuideBody body={sub.body} />
                </div>
              ))}
              {section.callout && (
                <aside className="my-6 rounded-2xl border-l-4 border-brand-emerald bg-brand-emerald/5 p-6 not-prose">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-2">
                    {section.callout.label}
                  </p>
                  <div className="font-display text-lg text-brand-navy">
                    <GuideBody body={section.callout.body} />
                  </div>
                </aside>
              )}
            </section>
          ))}
        </article>

        {/* FAQ */}
        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="font-display text-3xl text-brand-navy mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {guide.faqItems.map((f, i) => (
              <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer font-display text-lg text-brand-navy group-open:text-brand-emerald">
                  {f.question}
                </summary>
                <div className="mt-3 text-slate-700">
                  <GuideBody body={f.answer} />
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related services */}
        {guide.relatedServices.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-3">
              Related services
            </p>
            <h2 className="font-display text-2xl text-brand-navy mb-6">
              How MoveSmart delivers this
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guide.relatedServices.map((svc) => (
                <Link
                  key={svc}
                  href={`/services/${svc}/`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-md"
                >
                  <p className="font-display text-lg text-brand-navy group-hover:text-brand-emerald capitalize">
                    {svc.replace(/-/g, ' ')}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">View service →</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Download offer */}
        {guide.downloadOffer && (
          <section className="mt-16 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-2">
              {guide.downloadOffer.label}
            </p>
            <h2 className="font-display text-2xl text-brand-navy mb-3">
              {guide.downloadOffer.description}
            </h2>
            <Link
              href={guide.downloadOffer.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy/90"
            >
              {guide.downloadOffer.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        )}

        {/* Related guides (filter out missing) */}
        {guide.relatedGuides.filter((s) => GUIDES[s]).length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald mb-3">
              Keep reading
            </p>
            <h2 className="font-display text-2xl text-brand-navy mb-6">
              Related guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guide.relatedGuides
                .filter((s) => GUIDES[s])
                .map((s) => {
                  const g = GUIDES[s]
                  return (
                    <Link
                      key={s}
                      href={`/resources/${s}/`}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-md"
                    >
                      <p className="font-display text-lg text-brand-navy group-hover:text-brand-emerald">
                        {g.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {g.readTimeMinutes} min read
                      </p>
                    </Link>
                  )
                })}
            </div>
          </section>
        )}
      </div>

      <CTABannerBlock
        headline="Ready to put this into practice?"
        description="Our leasing team can run this playbook on your unit - zero upfront, success fee on placement."
        primaryCta={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/?type=owner&intent=call' }}
      />
    </main>
  )
}
