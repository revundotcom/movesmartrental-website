import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
import {
  getServiceContent,
  SERVICE_SLUGS,
  SERVICES_CONTENT,
  type ServicePageContent,
} from '@/data/services-content'

// ---------------------------------------------------------------------------
// Static Params - all 9 service slugs prerender at build
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ service: slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service: slug } = await params
  const content = getServiceContent(slug)

  if (!content) {
    return { title: 'Service Not Found | MoveSmart Rentals' }
  }

  const metaTitle = `${content.title} | MoveSmart Rentals`

  return generatePageMetadata({
    seo: {
      metaTitle,
      metaDescription: content.metaDescription,
      keywords: [content.primaryKeyword, ...content.secondaryKeywords],
    },
    path: `/services/${slug}`,
    fallbackTitle: metaTitle,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

// Curated Unsplash photo IDs matched to each leasing service.
// Each banner uses fit=crop with width=2400 for retina-quality delivery.
const SERVICE_BANNER_IMAGES: Record<string, { id: string; alt: string }> = {
  'tenant-placement': {
    id: 'photo-1502672260266-1c1ef2d93688',
    alt: 'Modern Canadian rental living room staged for a tenant placement showing',
  },
  'leasing-services': {
    id: 'photo-1560448204-e02f11c3d0e2',
    alt: 'Bright, professionally photographed luxe condo kitchen ready for the rental market',
  },
  'tenant-screening': {
    id: 'photo-1573497019940-1c28c88b4f3e',
    alt: 'MoveSmart screener reviewing an applicant credit and reference file on a laptop',
  },
  'rent-guarantee': {
    id: 'photo-1521791136064-7986c2920216',
    alt: 'Owner and broker shaking hands after signing a rent guarantee partner agreement',
  },
  'tenant-insurance': {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'Tenant signing an insurance coverage agreement for their rental home',
  },
  'tenant-guarantor': {
    id: 'photo-1521737711867-e3b97375f902',
    alt: 'Family members reviewing a tenancy agreement together as guarantor and applicant',
  },
  'rental-preparation': {
    id: 'photo-1505691938895-1758d7feb511',
    alt: 'Newly prepped and styled rental condo unit ready for professional listing photography',
  },
  'portal-and-technology': {
    id: 'photo-1542744173-8e7e53415bb0',
    alt: 'Owner using the MoveSmart leasing portal on a laptop to track applicants and approvals',
  },
  'institutional-lease-up': {
    id: 'photo-1556761175-5973dc0f32e7',
    alt: 'Institutional lease-up team in a meeting reviewing absorption metrics against pro-forma',
  },
}

function getServiceBanner(slug: string) {
  return (
    SERVICE_BANNER_IMAGES[slug] ?? {
      id: 'photo-1502672260266-1c1ef2d93688',
      alt: 'Modern Canadian rental property',
    }
  )
}

function getRelatedCards(slugs: string[]): ServicePageContent[] {
  return slugs
    .map((s) => SERVICES_CONTENT[s])
    .filter((c): c is ServicePageContent => Boolean(c))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service: slug } = await params
  const content = getServiceContent(slug)

  if (!content) {
    notFound()
  }

  // Build Service JSON-LD (SCHEMA-04)
  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/${slug}/`,
    provider: {
      name: 'MoveSmart Rentals',
      url: SITE_URL,
    },
    areaServed: 'Ontario, Canada',
  })

  const relatedCards = getRelatedCards(content.relatedServices)
  const banner = getServiceBanner(slug)
  const bannerSrc = `https://images.unsplash.com/${banner.id}?w=2400&q=80&auto=format&fit=crop`

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: content.title, href: `/services/${slug}/` },
          ]}
        />
      </div>

      {/* JSON-LD */}
      <JsonLd data={serviceSchema} />

      {/* Editorial hero */}
      <PageHeroBlock
        kicker={content.heroKicker}
        eyebrow={content.heroEyebrow}
        headline={content.heroHeadline}
        accentLastWord={true}
        lede={content.heroLede}
        cta1={{ label: content.cta1Label, href: '/contact/?type=owner' }}
        cta2={
          /\bbook\b.*\bcall\b/i.test(content.cta2Label)
            ? undefined
            : { label: content.cta2Label, href: '/contact/' }
        }
        service={slug}
      />

      {/* Editorial banner image matched to this service */}
      <section className="bg-white pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative aspect-[16/6] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/15">
            <Image
              src={bannerSrc}
              alt={banner.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 via-brand-navy/20 to-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center px-8 sm:px-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                {content.heroEyebrow}
              </p>
              <p className="mt-3 font-display text-2xl font-normal italic leading-snug text-white sm:text-3xl md:text-4xl">
                {content.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem points */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                The problem
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-snug text-brand-navy sm:text-4xl">
                {content.problemTitle.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="font-display italic text-brand-emerald">
                  {content.problemTitle.split(' ').slice(-2).join(' ')}
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {content.problemPoints.map((p) => (
              <RevealOnScroll key={p.title}>
                <div className="h-full rounded-2xl border border-brand-navy/10 bg-[#FBFAF6] p-6 sm:p-7">
                  <h3 className="font-display text-xl font-normal text-brand-navy">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {p.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Solution + scope */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                The MoveSmart approach
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-snug text-brand-navy sm:text-4xl">
                {content.solutionTitle.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="font-display italic text-brand-emerald">
                  {content.solutionTitle.split(' ').slice(-2).join(' ')}
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.solutionLede}
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.scope.map((item, idx) => (
              <RevealOnScroll key={item.title}>
                <div className="h-full rounded-xl border border-brand-navy/10 bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-normal text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                How it works
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-snug text-brand-navy sm:text-4xl">
                The{' '}
                <span className="font-display italic text-brand-emerald">
                  engagement
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </div>
          </RevealOnScroll>

          <ol className="mt-12 space-y-5">
            {content.howItWorks.map((step) => (
              <RevealOnScroll key={step.step}>
                <li className="flex items-start gap-5 rounded-xl border border-brand-navy/10 bg-[#FBFAF6] p-5 sm:p-6">
                  <div className="flex size-10 flex-none items-center justify-center rounded-full bg-brand-navy font-display text-base font-normal text-white sm:size-12 sm:text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-normal text-brand-navy sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      {/* Mid-content visual break - keys handover signifying engagement closeout */}
      <section className="bg-white pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative aspect-[16/7] overflow-hidden rounded-2xl shadow-lg shadow-brand-navy/10">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=2000&q=80&auto=format&fit=crop"
              alt="Keys handed to a qualified tenant - the close of the leasing engagement"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Who it&apos;s for
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-snug text-brand-navy sm:text-4xl">
                A fit for every{' '}
                <span className="font-display italic text-brand-emerald">
                  owner profile
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {content.whoItsFor.map((w) => (
              <RevealOnScroll key={w.audience}>
                <div className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6">
                  <h3 className="font-display text-lg font-normal text-brand-navy">
                    {w.audience}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {w.fitNote}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Pricing
          </p>
          <p className="mt-3 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
            {content.pricingNote.split('.').slice(0, 1).join('.') + '.'}{' '}
            <span className="font-display italic text-brand-emerald">
              {content.pricingNote.split('.').slice(1).join('.').trim()}
            </span>
            {content.pricingNote.split('.').slice(1).join('.').trim() && (
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            )}
          </p>
          <Link
            href="/pricing/"
            className="mt-5 inline-block text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-emerald"
          >
            See the full fee schedule →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FAQBlock
        title={`Questions about ${content.title}`}
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* Related services */}
      {relatedCards.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Related services
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal leading-snug text-brand-navy sm:text-4xl">
                  Explore the full{' '}
                  <span className="font-display italic text-brand-emerald">
                    engagement
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {relatedCards.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}/`}
                  className="group block h-full rounded-2xl border border-brand-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-px hover:border-brand-emerald/40 hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-normal text-brand-navy group-hover:text-brand-emerald">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {r.heroLede.split('.').slice(0, 1).join('.') + '.'}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-emerald">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABannerBlock
        headline={`Ready to start with ${content.title}?`}
        description="Create a free account to walk through the process. No upfront cost, no obligation."
        primaryCta={{ label: 'Create a Free Account', href: '/contact/?type=owner' }}
      />
    </main>
  )
}
