import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { generatePageMetadata } from '@/lib/metadata'
import { buildArticleSchema } from '@/lib/schema-builders/article'
import { GUIDES, GUIDE_SLUGS, getGuide, type GuideContent } from '@/data/guides'

// ---------------------------------------------------------------------------
// generateStaticParams
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }))
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

  const guide = getGuide(slug)
  if (!guide) {
    return { title: 'Resource Not Found' }
  }

  return generatePageMetadata({
    path: `/resources/${slug}`,
    fallbackTitle: guide.seoTitle,
    fallbackDescription: guide.metaDescription,
  })
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

  const guide = getGuide(slug)
  if (!guide) {
    notFound()
  }

  return <LocalGuidePage guide={guide} slug={slug} />
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
