import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { FAQBlock } from '@/components/blocks/faq-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import {
  getServiceContent,
  SERVICES_CONTENT,
  type ServicePageContent,
} from '@/data/services-content'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'

import {
  ClipFromLeft,
  MosaicTile,
  RevealUp,
  StripCard,
} from './leasing-services-client'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('leasing-services')!
  return generatePageMetadata({
    path: '/services/leasing-services/',
    fallbackTitle: `${content.title} | MoveSmart Rentals`,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Photo set — verified, working Unsplash IDs for this page.
// ---------------------------------------------------------------------------

const PHOTO = {
  heroLarge: {
    id: 'photo-1577415124269-fc1140a69e91',
    alt: 'Modern Canadian apartment block ready for lease-up',
  },
  splitInterior: {
    id: 'photo-1502672260266-1c1ef2d93688',
    alt: 'Bright modern Canadian rental interior',
  },
  splitSigning: {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'Tenant signing a residential lease agreement at a desk',
  },
  splitMeeting: {
    id: 'photo-1551836022-d5d88e9218df',
    alt: 'Two professionals meeting to discuss a leasing engagement',
  },
  footerBand: {
    id: 'photo-1502136969935-8d8eef54d77b',
    alt: 'Canadian cityscape at dusk',
  },
} as const

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

function getRelatedCards(slugs: string[]): ServicePageContent[] {
  return slugs
    .map((s) => SERVICES_CONTENT[s])
    .filter((c): c is ServicePageContent => Boolean(c))
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LeasingServicesPage() {
  const content = getServiceContent('leasing-services')!

  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/leasing-services/`,
    serviceType: 'Leasing Services',
    provider: {
      name: 'MoveSmart Rentals',
      url: SITE_URL,
    },
    areaServed: 'Ontario, Canada',
  })

  const relatedCards = getRelatedCards(content.relatedServices)

  const pricingParts = content.pricingNote.split('.')
  const pricingFact = pricingParts[0].trim() + '.'
  const pricingItalic = pricingParts.slice(1).join('.').trim()

  return (
    <main>
      <JsonLd data={serviceSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: content.title, href: '/services/leasing-services/' },
          ]}
        />
      </div>

      {/* ─── CUSTOM HERO — 4-tile image mosaic ────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pb-16 pt-8 sm:pb-20 sm:pt-12">
        {/* Decorative dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT — copy column */}
            <div className="lg:col-span-6 xl:col-span-5">
              <RevealUp>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 bg-brand-gold/70"
                  />
                  {content.heroKicker}
                </p>
              </RevealUp>
              <RevealUp index={1}>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  {content.heroEyebrow}
                </p>
              </RevealUp>
              <RevealUp index={2}>
                <h1 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                  {content.heroHeadline.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="font-display italic text-brand-emerald">
                    {content.heroHeadline.split(' ').slice(-1).join(' ')}
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h1>
              </RevealUp>
              <RevealUp index={3}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  {content.heroLede}
                </p>
              </RevealUp>
              <RevealUp index={4}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact/?type=owner"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-navy/20 transition-all hover:-translate-y-0.5 hover:bg-brand-navy/90 hover:shadow-xl"
                  >
                    {content.cta1Label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/pricing/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/20 bg-white px-6 py-3 text-sm font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:border-brand-gold/60 hover:bg-brand-gold/5"
                  >
                    See fee schedule
                  </Link>
                </div>
              </RevealUp>

            </div>

            {/* RIGHT — Single hero image */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="relative">
                {/* Soft gold/emerald underlays */}
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 hidden size-40 rounded-full bg-brand-gold/20 blur-3xl lg:block"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-8 -left-8 hidden size-44 rounded-full bg-brand-emerald/15 blur-3xl lg:block"
                />

                <MosaicTile index={0}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 shadow-xl shadow-brand-navy/20 sm:aspect-[5/4]">
                    <Image
                      src={unsplash(PHOTO.heroLarge.id, 1600)}
                      alt={PHOTO.heroLarge.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px"
                      unoptimized
                      priority
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent"
                    />
                    <div className="absolute inset-x-5 bottom-5">
                      <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-brand-gold"
                        />
                        Lease-up ready
                      </p>
                    </div>
                  </div>
                </MosaicTile>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM POINTS — split-screen: navy left + signing photo right ─ */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — dark navy, editorial numbered problems */}
        <div className="relative isolate overflow-hidden bg-brand-navy px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-14 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-0 size-96 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 bottom-0 size-80 rounded-full bg-brand-emerald/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
          />

          <div className="relative mx-auto max-w-xl lg:ml-auto lg:mr-0">
            <RevealUp>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-gold/70"
                />
                The Problem
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {content.problemTitle.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="font-display italic text-brand-gold">
                  {content.problemTitle.split(' ').slice(-2).join(' ')}
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>

            <ol className="mt-12 space-y-10">
              {content.problemPoints.map((p, idx) => (
                <RevealUp key={p.title} index={idx + 2}>
                  <li className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
                    <span
                      aria-hidden="true"
                      className="row-span-2 font-display text-4xl font-normal italic leading-none text-brand-gold sm:text-5xl"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="self-end font-display text-xl font-normal leading-snug text-white sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="col-start-2 text-sm leading-relaxed text-white/70 sm:text-[15px]">
                      {p.body}
                    </p>
                  </li>
                </RevealUp>
              ))}
            </ol>
          </div>
        </div>

        {/* RIGHT — lease-signing photo, full-bleed, no rounded corners */}
        <div className="relative min-h-[420px] lg:min-h-0">
          <Image
            src={unsplash(PHOTO.splitSigning.id, 1800)}
            alt={PHOTO.splitSigning.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-brand-navy/30 via-transparent to-brand-navy/10 lg:bg-gradient-to-r lg:from-brand-navy/40 lg:via-transparent lg:to-transparent"
          />
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-brand-gold"
              />
              The cost of fragmentation
            </p>
          </div>
        </div>
      </section>

      {/* ─── SOLUTION / SCOPE — split-screen MIRRORED: image left, copy right */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — bright interior photo */}
        <div className="relative order-2 min-h-[420px] lg:order-1 lg:min-h-0">
          <Image
            src={unsplash(PHOTO.splitInterior.id, 1800)}
            alt={PHOTO.splitInterior.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tl from-brand-navy/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-brand-navy/15"
          />
          <div className="absolute inset-x-6 top-6 sm:inset-x-10 sm:top-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-brand-gold"
              />
              The MoveSmart engagement
            </p>
          </div>
        </div>

        {/* RIGHT — copy with numbered scope list */}
        <div className="order-1 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:order-2 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-xl lg:ml-0 lg:mr-auto">
            <RevealUp>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-gold/70"
                />
                What we run
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                {content.solutionTitle.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="font-display italic text-brand-emerald">
                  {content.solutionTitle.split(' ').slice(-2).join(' ')}
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
            <RevealUp index={2}>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.solutionLede}
              </p>
            </RevealUp>

            <ol className="mt-10 divide-y divide-brand-gold/30 border-t border-brand-gold/30">
              {content.scope.map((item, idx) => (
                <RevealUp
                  key={item.title}
                  index={idx + 3}
                  delayStep={0.04}
                  y={16}
                >
                  <li className="grid grid-cols-[auto_1fr] items-start gap-x-5 py-5">
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs font-bold tracking-[0.22em] text-brand-gold"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {item.body}
                      </p>
                    </div>
                  </li>
                </RevealUp>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — horizontal strip of compact numbered cards ────── */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 max-w-3xl">
            <ClipFromLeft>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-gold/70"
                />
                How it works
              </p>
            </ClipFromLeft>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                The{' '}
                <span className="font-display italic text-brand-emerald">
                  six-stage engagement
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
            <RevealUp index={2}>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Each stage is logged in your owner portal — timestamps,
                decisions, and the team member who ran it.
              </p>
            </RevealUp>
          </div>

          {/* Horizontally scrollable on mobile, grid on desktop */}
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="grid grid-flow-col auto-cols-[78%] gap-4 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
              {content.howItWorks.map((step, idx) => (
                <StripCard
                  key={step.step}
                  index={idx}
                  step={step.step}
                  title={step.title}
                  body={step.body}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR — split-screen #3: navy left + team-meeting right  */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — navy with white audience pills */}
        <div className="relative isolate overflow-hidden bg-brand-navy px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-14 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-1/2 size-96 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
          />

          <div className="relative mx-auto max-w-xl lg:ml-auto lg:mr-0">
            <RevealUp>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-brand-gold/70"
                />
                Who it&rsquo;s for
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Built for every{' '}
                <span className="font-display italic text-brand-gold">
                  owner profile
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>

            <ul className="mt-12 space-y-6">
              {content.whoItsFor.map((w, idx) => (
                <RevealUp key={w.audience} index={idx + 2}>
                  <li className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-gold/40 hover:bg-white/[0.07] sm:p-7">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex size-8 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/10 font-mono text-[11px] font-bold text-brand-gold"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-lg font-normal text-white sm:text-xl">
                        {w.audience}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
                      {w.fitNote}
                    </p>
                  </li>
                </RevealUp>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — team meeting photo full bleed */}
        <div className="relative min-h-[420px] lg:min-h-0">
          <Image
            src={unsplash(PHOTO.splitMeeting.id, 1800)}
            alt={PHOTO.splitMeeting.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-brand-navy/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-navy/40 lg:via-transparent lg:to-transparent"
          />
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-brand-gold"
              />
              From a single door to a full portfolio
            </p>
          </div>
        </div>
      </section>

      {/* ─── PRICING + RELATED SERVICES — side by side ────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Pricing card */}
            <RevealUp>
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-gold/40 bg-gradient-to-br from-white via-white to-brand-gold/5 p-8 shadow-lg shadow-brand-navy/5 sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 size-48 rounded-full bg-brand-gold/15 blur-3xl"
                />
                <div className="relative">
                  <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                    <span
                      aria-hidden="true"
                      className="block h-px w-8 bg-brand-gold/70"
                    />
                    Pricing
                  </p>
                  <p className="mt-5 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl md:text-4xl">
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
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    Photo fees, listing fees, screening fees, and legal fees
                    are all included in the engagement &mdash; never billed
                    separately for the core scope.
                  </p>
                  <Link
                    href="/pricing/"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 transition-colors hover:text-brand-emerald"
                  >
                    Full fee schedule
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </RevealUp>

            {/* Related services card */}
            <RevealUp index={1}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-brand-navy p-8 text-white shadow-lg shadow-brand-navy/15 sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -left-16 -bottom-16 size-48 rounded-full bg-brand-emerald/20 blur-3xl"
                />
                <div className="relative">
                  <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                    <span
                      aria-hidden="true"
                      className="block h-px w-8 bg-brand-gold/70"
                    />
                    Related services
                  </p>
                  <h3 className="mt-5 font-display text-2xl font-normal leading-snug text-white sm:text-3xl">
                    Engage one piece, or the whole{' '}
                    <span className="font-display italic text-brand-gold">
                      package
                    </span>
                    <span aria-hidden="true" className="text-brand-gold">
                      .
                    </span>
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {relatedCards.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/services/${r.slug}/`}
                          className="group flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/[0.04] p-4 transition-all hover:-translate-y-0.5 hover:border-brand-gold/40 hover:bg-white/[0.08]"
                        >
                          <span>
                            <span className="block font-display text-base font-normal text-white sm:text-lg">
                              {r.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-white/60 sm:text-[13px]">
                              {r.heroLede.split('.')[0]}.
                            </span>
                          </span>
                          <ArrowRight
                            className="size-4 shrink-0 text-brand-gold transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealUp>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock
        title={`Questions about ${content.title}`}
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* ─── FOOTER BAND — full-bleed Canadian cityscape with overlay quote */}
      <section className="relative isolate overflow-hidden">
        <div className="relative h-[320px] sm:h-[380px] md:h-[440px]">
          <Image
            src={unsplash(PHOTO.footerBand.id, 2400)}
            alt={PHOTO.footerBand.alt}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/55 to-brand-navy/85"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
          />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                The MoveSmart promise
              </p>
              <p className="mt-4 font-display text-2xl font-normal italic leading-snug text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                &ldquo;One full-service team, one timeline, one success fee
                &mdash; from empty unit to signed, paid, and occupied.&rdquo;
              </p>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                Serving Ontario &middot; Built for Canadian landlords
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA — custom inline dark navy band ───────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 size-[420px] rounded-full bg-brand-emerald/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-gold/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
            Ready when you are
          </p>
          <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Hand the lease to a team that{' '}
            <span className="font-display italic text-brand-gold">
              owns the outcome
            </span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            List your property to start the engagement. No upfront cost, no
            obligation &mdash; we don&rsquo;t earn until your lease is signed
            and your tenant is moved in.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact/?type=owner"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy shadow-lg shadow-brand-gold/20 transition-all hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-xl"
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
