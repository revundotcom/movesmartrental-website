import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
import { getServiceContent, SERVICES_CONTENT, type ServicePageContent } from '@/data/services-content'

import { RevealRow, TimelineRail, TimelineStep } from './tenant-placement-client'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('tenant-placement')!
  return generatePageMetadata({
    path: '/services/tenant-placement/',
    fallbackTitle: `${content.title} | MoveSmart Rentals`,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

// Curated photo set for the timeline (one image per how-it-works step).
const TIMELINE_IMAGES: Array<{ id: string; alt: string }> = [
  {
    id: 'photo-1560518883-ce09059eeffa',
    alt: 'Leasing agent welcoming an owner for a discovery call',
  },
  {
    id: 'photo-1551434678-e076c223a692',
    alt: 'Photographer with camera capturing a rental unit',
  },
  {
    id: 'photo-1502672023488-70e25813eb80',
    alt: 'Listing prepped and syndicated across rental channels',
  },
  {
    id: 'photo-1573497019940-1c28c88b4f3e',
    alt: 'Screener reviewing applicant files on a laptop',
  },
  {
    id: 'photo-1502672260266-1c1ef2d93688',
    alt: 'Bright living room ready for prospective tenant tours',
  },
  {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'Lease being signed at a desk',
  },
  {
    id: 'photo-1554224155-6726b3ff858f',
    alt: 'Keys handed to a new tenant on move-in day',
  },
]

function getTimelineImage(index: number) {
  return TIMELINE_IMAGES[index % TIMELINE_IMAGES.length]
}

function getRelatedCards(slugs: string[]): ServicePageContent[] {
  return slugs
    .map((s) => SERVICES_CONTENT[s])
    .filter((c): c is ServicePageContent => Boolean(c))
}

export default function TenantPlacementPage() {
  const content = getServiceContent('tenant-placement')!

  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/tenant-placement/`,
    provider: { name: 'MoveSmart Rentals', url: SITE_URL },
    serviceType: 'Tenant Placement Service',
    areaServed: ['Ontario, Canada', 'Canada', 'United States'],
    audience: 'owner',
  })

  const relatedCards = getRelatedCards(content.relatedServices)

  // Pricing — split first sentence as "fact", remainder as italic clause.
  const pricingParts = content.pricingNote.split('.')
  const pricingFact = pricingParts[0].trim() + '.'
  const pricingItalic = pricingParts.slice(1).join('.').trim()

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: content.title, href: '/services/tenant-placement/' },
          ]}
        />
      </div>

      {/* JSON-LD */}
      <JsonLd data={serviceSchema} />

      {/* ─── Hero — LIGHT theme, no backdrop; aside is single rounded photo ── */}
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
        service="tenant-placement"
        theme="light"
        aside={
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/20 ring-1 ring-brand-navy/5">
              <Image
                src={UNSPLASH('photo-1560518883-ce09059eeffa', 1200)}
                alt="MoveSmart leasing agent leading a Canadian apartment showing"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
              />
              {/* Hairline gold accent at top edge */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
              />
            </div>
            {/* Floating "zero upfront" badge */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl shadow-brand-navy/15 sm:block">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5 text-brand-emerald"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
                    Pay on placement
                  </p>
                  <p className="font-display text-lg text-brand-navy">Zero upfront</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ─── Problem points — 2×2 grid with rose accents ──────────────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <RevealRow className="mb-12 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
              The friction
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {content.problemTitle}
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealRow>

          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
            {content.problemPoints.map((p, idx) => (
              <RevealRow key={p.title} index={idx} className="h-full">
                <div className="group relative flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-[#FBFAF6] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-rose-200 hover:bg-white hover:shadow-xl hover:shadow-brand-navy/5 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-2xl font-normal italic text-rose-500"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="block h-px flex-1 bg-rose-200/70" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-500">
                      Friction
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">{p.body}</p>
                </div>
              </RevealRow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Solution lede — short, single column intro to the timeline ───── */}
      <section className="bg-[#FBFAF6] pt-20 sm:pt-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <RevealRow>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              The MoveSmart approach
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {content.solutionTitle}
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              {content.solutionLede}
            </p>
            <span
              aria-hidden="true"
              className="mx-auto mt-7 block h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />
          </RevealRow>
        </div>
      </section>

      {/* ─── VERTICAL TIMELINE — the centerpiece ─────────────────────────── */}
      <section className="relative bg-[#FBFAF6] py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4">
          <RevealRow className="mb-12 text-center">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
              The journey
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
            </p>
            <h3 className="mt-3 font-display text-2xl font-normal italic text-brand-navy sm:text-3xl">
              How a unit moves from empty to occupied.
            </h3>
          </RevealRow>

          <div className="relative">
            {/* Animated central vertical rail */}
            <TimelineRail targetId="tp-timeline" />

            {/* Mobile rail (static) */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-brand-gold/30 via-slate-300/60 to-brand-emerald/30 md:hidden"
            />

            <ol
              id="tp-timeline"
              className="relative flex flex-col gap-10 md:gap-14"
            >
              {content.howItWorks.map((step, idx) => {
                const img = getTimelineImage(idx)
                const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right'
                return (
                  <li key={step.step}>
                    <TimelineStep
                      index={idx}
                      step={step.step}
                      title={step.title}
                      body={step.body}
                      imageSrc={UNSPLASH(img.id, 320)}
                      imageAlt={img.alt}
                      side={side}
                    />
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Who it's for + Pricing — combined section with side image ───── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Audience chips + pricing copy */}
            <div className="lg:col-span-7">
              <RevealRow>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                  Who it&rsquo;s for
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                  Built for owners who want{' '}
                  <span className="font-display italic text-brand-emerald">a defensible process</span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealRow>

              <ul className="mt-8 flex flex-wrap gap-3">
                {content.whoItsFor.map((w, idx) => (
                  <RevealRow key={w.audience} index={idx}>
                    <li className="group inline-flex max-w-md items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:shadow-md">
                      <span
                        aria-hidden="true"
                        className="mt-1 size-2 shrink-0 rounded-full bg-brand-emerald"
                      />
                      <div>
                        <p className="font-display text-sm font-normal text-brand-navy sm:text-base">
                          {w.audience}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                          {w.fitNote}
                        </p>
                      </div>
                    </li>
                  </RevealRow>
                ))}
              </ul>

              {/* Pricing callout */}
              <RevealRow index={content.whoItsFor.length}>
                <div className="mt-10 rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-7 shadow-sm sm:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                    Pricing
                  </p>
                  <p className="mt-3 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
                    {pricingFact}{' '}
                    {pricingItalic && (
                      <span className="font-display italic text-brand-emerald">
                        {pricingItalic}
                        <span aria-hidden="true" className="text-brand-gold">
                          .
                        </span>
                      </span>
                    )}
                  </p>
                  <Link
                    href="/pricing/"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 transition-colors hover:text-brand-emerald"
                  >
                    See the full fee schedule
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </RevealRow>
            </div>

            {/* Outcome image */}
            <div className="lg:col-span-5">
              <RevealRow>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/15 ring-1 ring-brand-navy/5">
                  <Image
                    src={UNSPLASH('photo-1582719508461-905c673771fd', 1200)}
                    alt="Happy couple celebrating a successful tenant placement"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                      Outcome
                    </p>
                    <p className="mt-1 font-display text-xl font-normal italic leading-snug text-white sm:text-2xl">
                      Lease signed. Keys handed over. You move on.
                    </p>
                  </div>
                </div>
              </RevealRow>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related services — inline pill links ────────────────────────── */}
      {relatedCards.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Continue exploring
            </p>
            <h2 className="mt-3 font-display text-2xl font-normal tracking-tight text-brand-navy sm:text-3xl md:text-4xl">
              Related{' '}
              <span className="font-display italic text-brand-emerald">services</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {relatedCards.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}/`}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-brand-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:bg-emerald-50/40 hover:text-brand-emerald hover:shadow-md"
                >
                  {r.title}
                  <ArrowRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock
        title="Tenant Placement FAQs"
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* ─── Final CTA — custom inline dark navy band (no CTABannerBlock) ── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={UNSPLASH('photo-1517090504586-fde19ea6066f', 2400)}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-navy/92 to-brand-navy/85" />
          <div className="absolute -left-24 top-0 size-[420px] rounded-full bg-brand-emerald/12 blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-gold/10 blur-3xl" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            Ready when you are
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
            Start your{' '}
            <span className="font-display italic text-brand-emerald">placement</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Twenty-minute discovery call, no upfront cost, no obligation. We don&rsquo;t earn a fee until your lease is signed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact/?type=owner"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-emerald/20 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-xl"
            >
              {content.cta1Label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
            >
              See fee schedule
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
