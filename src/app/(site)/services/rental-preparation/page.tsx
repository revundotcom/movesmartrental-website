import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FAQBlock } from '@/components/blocks/faq-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
import {
  getServiceContent,
  SERVICES_CONTENT,
  type ServicePageContent,
} from '@/data/services-content'

import { BeforeAfterSlider, RevealRow } from './rental-preparation-client'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('rental-preparation')!
  return generatePageMetadata({
    path: '/services/rental-preparation/',
    fallbackTitle: `${content.title} | MoveSmart Rentals`,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const UNSPLASH = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

// Verified photo set — workstream gallery (painted, cleaned, photographed, finished).
const GALLERY_PHOTOS: Array<{ id: string; alt: string }> = [
  {
    id: 'photo-1562259949-e8e7689d7828',
    alt: 'Painter rolling fresh paint onto a wall during a rental prep turn',
  },
  {
    id: 'photo-1581578731548-c64695cc6952',
    alt: 'Cleaner in mask wiping down a large window during a deep clean',
  },
  {
    id: 'photo-1551434678-e076c223a692',
    alt: 'Listing photographer with DSLR capturing a finished rental interior',
  },
  {
    id: 'photo-1502672260266-1c1ef2d93688',
    alt: 'Bright modern living room ready for listing photography',
  },
  {
    id: 'photo-1505691938895-1758d7feb511',
    alt: 'Staged modern condo interior in neutral palette',
  },
  {
    id: 'photo-1560448204-61dc36dc98c8',
    alt: 'Furnished living and dining area styled for a virtual tour',
  },
]

// Punch-list mock items — contractor-style checklist (handwritten feel).
const PUNCH_LIST: Array<{ room: string; task: string; done: boolean }> = [
  { room: 'Master bedroom', task: 'Wall — paint touch-up, north corner', done: true },
  { room: 'Master bedroom', task: 'Closet shelf — re-anchor centre bracket', done: true },
  { room: 'Living room', task: 'Baseboards — caulk seam at south wall', done: true },
  { room: 'Living room', task: 'Window blinds — repair tilt mechanism', done: true },
  { room: 'Kitchen', task: 'Cabinet door — re-align upper-left hinge', done: true },
  { room: 'Kitchen', task: 'Range hood — degrease and polish stainless', done: true },
  { room: 'Bathroom', task: 'Grout — re-seal around tub surround', done: true },
  { room: 'Bathroom', task: 'Faucet aerator — replace, hot side', done: true },
  { room: 'Entryway', task: 'Doormat & threshold — vacuum and steam', done: true },
  { room: 'Exterior', task: 'Lawn — cut, edge, and bag clippings', done: false },
]

function getRelatedCards(slugs: string[]): ServicePageContent[] {
  return slugs
    .map((s) => SERVICES_CONTENT[s])
    .filter((c): c is ServicePageContent => Boolean(c))
}

export default function RentalPreparationPage() {
  const content = getServiceContent('rental-preparation')!

  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/rental-preparation/`,
    provider: { name: 'MoveSmart Rentals', url: SITE_URL },
    serviceType: 'Rental Preparation Service',
    areaServed: ['Ontario, Canada', 'Canada'],
    audience: 'owner',
  })

  const relatedCards = getRelatedCards(content.relatedServices)

  // Pricing — split first sentence as "fact", remainder as italic clause.
  const pricingParts = content.pricingNote.split('.')
  const pricingFact = pricingParts[0].trim() + '.'
  const pricingItalic = pricingParts.slice(1).join('.').trim()

  // Timeline / Gantt segments — derived from howItWorks with day-anchored labels.
  const totalSteps = content.howItWorks.length
  const dayAnchors = ['Day 1', 'Day 2', 'Day 3', 'Day 5', 'Day 8', 'Day 10']

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: content.title, href: '/services/rental-preparation/' },
          ]}
        />
      </div>

      {/* JSON-LD */}
      <JsonLd data={serviceSchema} />

      {/* ─── CUSTOM HERO — 2-col with paint-roller photo + timestamp pill ─── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/40 py-16 sm:py-20 lg:py-24">
        {/* Soft dotted texture in background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 -z-10 size-[480px] rounded-full bg-amber-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 -z-10 size-[420px] rounded-full bg-emerald-200/40 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16">
          {/* Left — text */}
          <div className="lg:col-span-6">
            <RevealRow>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                <span aria-hidden="true" className="block h-px w-8 bg-amber-600/60" />
                {content.heroKicker}
              </p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                {content.heroEyebrow}
              </p>
              <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-6xl lg:text-[64px]">
                {content.heroHeadline}
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.heroLede}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact/?type=owner"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-emerald/20 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-xl"
                >
                  {content.cta1Label}
                </Link>
                <Link
                  href="/pricing/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3 text-sm font-bold text-brand-navy backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:bg-white"
                >
                  See pricing
                </Link>
              </div>
            </RevealRow>
          </div>

          {/* Right — full-bleed paint-roller photo with timestamp pill */}
          <div className="lg:col-span-6">
            <RevealRow index={1}>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-brand-navy/25 ring-1 ring-amber-900/10 sm:aspect-[5/6] lg:aspect-[4/5]">
                  <Image
                    src={UNSPLASH('photo-1562259949-e8e7689d7828', 1400)}
                    alt="Painter rolling a fresh coat of paint onto a rental wall on day one of prep"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-center"
                  />
                  {/* Warm tint to push the work-tone feeling */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 via-transparent to-transparent"
                  />
                  {/* Hairline gold accent at top edge */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
                  />
                </div>

                {/* "Day 1 of prep" timestamp pill — overlaid bottom-left */}
                <div className="absolute -bottom-5 left-5 inline-flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-xl shadow-brand-navy/15 sm:left-7">
                  <div className="flex size-10 items-center justify-center rounded-full bg-amber-100">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                      Day 1 of prep
                    </p>
                    <p className="font-display text-base text-brand-navy">
                      Walls + cleanup in progress
                    </p>
                  </div>
                </div>

                {/* Small floating "ready in ~10 days" pill — top-right */}
                <div className="absolute -top-4 right-4 hidden items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-emerald shadow-lg shadow-brand-navy/10 sm:inline-flex">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-emerald" />
                  Listing-ready in ~10 days
                </div>
              </div>
            </RevealRow>
          </div>
        </div>
      </section>

      {/* ─── CENTERPIECE — BEFORE/AFTER COMPARISON ROW ───────────────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <RevealRow className="mb-12 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
              <span aria-hidden="true" className="block h-px w-8 bg-amber-600/60" />
              The transformation
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              From tired turn to{' '}
              <span className="font-display italic text-brand-emerald">listing-ready</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Drag the divider on any pair below. Same room, same angle — one before
              our prep crew arrives, one after the paint, clean, and styling are
              complete and the photographer is on site.
            </p>
          </RevealRow>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <RevealRow>
              <BeforeAfterSlider
                beforeSrc={UNSPLASH('photo-1562259949-e8e7689d7828', 900)}
                beforeAlt="Wall mid paint-roll during day-one rental prep"
                afterSrc={UNSPLASH('photo-1502672260266-1c1ef2d93688', 900)}
                afterAlt="Bright finished living room ready for listing photography"
              />
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  Pair 01 · Walls
                </p>
                <p className="mt-1 font-display text-lg text-brand-navy">
                  Scuffed walls{' '}
                  <span className="font-display italic text-brand-emerald">→ neutral repaint</span>
                </p>
              </div>
            </RevealRow>

            <RevealRow index={1}>
              <BeforeAfterSlider
                beforeSrc={UNSPLASH('photo-1581578731548-c64695cc6952', 900)}
                beforeAlt="Cleaner in mask deep-cleaning windows mid-turn"
                afterSrc={UNSPLASH('photo-1505691938895-1758d7feb511', 900)}
                afterAlt="Spotless modern condo interior in neutral palette"
              />
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  Pair 02 · Clean
                </p>
                <p className="mt-1 font-display text-lg text-brand-navy">
                  Move-out residue{' '}
                  <span className="font-display italic text-brand-emerald">→ deep-clean reset</span>
                </p>
              </div>
            </RevealRow>

            <RevealRow index={2} className="md:col-span-2 xl:col-span-1">
              <BeforeAfterSlider
                beforeSrc={UNSPLASH('photo-1551434678-e076c223a692', 900)}
                beforeAlt="Listing photographer setting up gear inside an empty unit"
                afterSrc={UNSPLASH('photo-1560448204-61dc36dc98c8', 900)}
                afterAlt="Furnished living and dining area styled for a virtual tour"
              />
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  Pair 03 · Media
                </p>
                <p className="mt-1 font-display text-lg text-brand-navy">
                  Phone snapshots{' '}
                  <span className="font-display italic text-brand-emerald">→ HDR + virtual tour</span>
                </p>
              </div>
            </RevealRow>
          </div>
        </div>
      </section>

      {/* ─── Problem section — warning-tone callouts (amber border-left) ───── */}
      <section className="relative overflow-hidden bg-amber-50/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <RevealRow className="mb-12 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
              <span aria-hidden="true" className="block h-px w-8 bg-amber-600/60" />
              The friction
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {content.problemTitle}
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealRow>

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {content.problemPoints.map((p, idx) => (
              <RevealRow key={p.title} index={idx} className="h-full">
                <li className="group relative h-full rounded-r-2xl border-l-4 border-amber-500 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-900/5">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-7 items-center justify-center rounded-full bg-amber-100 text-amber-700"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">
                      Friction · {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {p.body}
                  </p>
                </li>
              </RevealRow>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Solution lede ───────────────────────────────────────────────── */}
      <section className="bg-white pt-20 sm:pt-24">
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

      {/* ─── WORKSTREAMS — HORIZONTAL SCROLLABLE GALLERY ─────────────────── */}
      <section className="relative bg-white py-16 sm:py-20">
        <div className="mx-auto mb-10 max-w-7xl px-4">
          <RevealRow className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Full scope
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                One coordinator,{' '}
                <span className="font-display italic text-brand-emerald">every trade</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </div>
            <p className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:inline-flex sm:items-center sm:gap-2">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
              Scroll to see all {content.scope.length}
            </p>
          </RevealRow>
        </div>

        {/* Edge fade overlays + horizontal scroll rail */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20"
          />

          <ol
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:gap-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))]"
            style={{ scrollbarWidth: 'thin' }}
          >
            {content.scope.map((item, idx) => {
              const photo = GALLERY_PHOTOS[idx % GALLERY_PHOTOS.length]
              return (
                <li
                  key={item.title}
                  className="group relative flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md shadow-brand-navy/5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-xl hover:shadow-brand-navy/10 sm:w-[300px]"
                >
                  {/* Photo — tall poster-style */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                    <Image
                      src={UNSPLASH(photo.id, 800)}
                      alt={photo.alt}
                      fill
                      unoptimized
                      sizes="300px"
                      className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/10 to-transparent"
                    />
                    {/* Workstream numeral */}
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy backdrop-blur-sm">
                      <span aria-hidden="true" className="font-display text-base italic text-brand-gold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      Scope
                    </span>
                    {/* Title overlay */}
                    <h3 className="absolute inset-x-4 bottom-4 font-display text-xl font-normal leading-tight text-white sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
                    <span
                      aria-hidden="true"
                      className="mt-auto block h-px w-12 bg-gradient-to-r from-brand-gold/70 to-transparent"
                    />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ─── HOW IT WORKS — Gantt-style ruler timeline ───────────────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <RevealRow className="mb-12 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              From walkthrough to{' '}
              <span className="font-display italic text-brand-emerald">listing live</span>{' '}
              in about ten days
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealRow>

          {/* Desktop — horizontal ruler */}
          <RevealRow index={1}>
            <div className="hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:block">
              {/* Step segments */}
              <div className="grid" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
                {content.howItWorks.map((step, idx) => {
                  const isLast = idx === totalSteps - 1
                  return (
                    <div key={step.step} className="relative pr-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">
                        Step {String(step.step).padStart(2, '0')}
                      </p>
                      <h3 className="mt-2 font-display text-base font-normal leading-snug text-brand-navy">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.body}</p>
                      {/* Connector arrow between steps */}
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="absolute right-0 top-1 hidden text-slate-300 lg:block"
                        >
                          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* The ruler bar */}
              <div className="relative mt-8">
                {/* Continuous bar with gradient segments */}
                <div className="grid h-3 overflow-hidden rounded-full" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
                  {content.howItWorks.map((step, idx) => (
                    <div
                      key={step.step}
                      className={
                        idx === 0
                          ? 'bg-amber-400'
                          : idx === totalSteps - 1
                          ? 'bg-brand-emerald'
                          : 'bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300'
                      }
                    />
                  ))}
                </div>
                {/* Tick marks */}
                <div
                  className="absolute inset-x-0 -top-1 grid"
                  style={{ gridTemplateColumns: `repeat(${totalSteps + 1}, minmax(0, 1fr))` }}
                  aria-hidden="true"
                >
                  {Array.from({ length: totalSteps + 1 }).map((_, i) => (
                    <span
                      key={i}
                      className="block h-5 w-px justify-self-start bg-brand-navy/40 first:justify-self-start last:justify-self-end"
                    />
                  ))}
                </div>
                {/* Day-anchor labels under each segment */}
                <div className="mt-3 grid" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
                  {content.howItWorks.map((step, idx) => (
                    <p
                      key={step.step}
                      className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500"
                    >
                      {dayAnchors[idx] ?? `Day ${idx + 1}`}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </RevealRow>

          {/* Mobile / tablet — stacked timeline */}
          <div className="space-y-4 lg:hidden">
            {content.howItWorks.map((step, idx) => (
              <RevealRow key={step.step} index={idx}>
                <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">
                      Step {String(step.step).padStart(2, '0')}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                      {dayAnchors[idx] ?? `Day ${idx + 1}`}
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-normal leading-snug text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
                </div>
              </RevealRow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUNCH-LIST MOCKUP — contractor's checklist on paper ─────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left — context copy */}
            <div className="lg:col-span-5">
              <RevealRow>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  <span aria-hidden="true" className="block h-px w-8 bg-amber-600/60" />
                  The punch-list
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                  Every line item,{' '}
                  <span className="font-display italic text-brand-emerald">accounted for</span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                  Your prep scope shows up in the portal as a real punch-list — every
                  task, every room, every cost line, every status. Items get checked
                  off as the trade closes them out, with photos when the work is
                  hidden behind drywall or paint.
                </p>

                <ul className="mt-7 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 inline-flex size-2 shrink-0 rounded-full bg-brand-emerald" />
                    <span>
                      <strong className="font-semibold text-brand-navy">Fixed price.</strong>{' '}
                      You approve the line items before any trade picks up a tool.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 inline-flex size-2 shrink-0 rounded-full bg-brand-emerald" />
                    <span>
                      <strong className="font-semibold text-brand-navy">Photo-verified.</strong>{' '}
                      Closeout images attached to each completed line.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 inline-flex size-2 shrink-0 rounded-full bg-brand-emerald" />
                    <span>
                      <strong className="font-semibold text-brand-navy">Live status.</strong>{' '}
                      You watch progress in the portal — no chasing texts.
                    </span>
                  </li>
                </ul>
              </RevealRow>
            </div>

            {/* Right — the punch-list mockup itself */}
            <div className="lg:col-span-7">
              <RevealRow index={1}>
                <div className="relative rounded-2xl border border-amber-200 bg-amber-50/40 p-5 shadow-xl shadow-brand-navy/10 sm:p-8">
                  {/* "Paper clip" / form header */}
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b-2 border-dashed border-amber-400/50 pb-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">
                        Prep Punch-list · WO-2026-0419
                      </p>
                      <p className="mt-1 font-display text-lg font-normal italic text-brand-navy sm:text-xl">
                        217 Sample Ave · Unit 4B
                      </p>
                    </div>
                    <div className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-right">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                        9 of 10 done
                      </p>
                      <p className="font-mono text-xs text-brand-navy">Day 8 / 10</p>
                    </div>
                  </div>

                  {/* The checklist */}
                  <ul className="space-y-2.5 font-mono text-[13px] leading-relaxed">
                    {PUNCH_LIST.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {/* Checkbox */}
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-2 ${
                            item.done
                              ? 'border-brand-emerald bg-brand-emerald text-white'
                              : 'border-amber-700/60 bg-white'
                          }`}
                        >
                          {item.done && (
                            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          )}
                        </span>
                        <span className={item.done ? 'flex-1 text-slate-500 line-through' : 'flex-1 text-brand-navy'}>
                          <span className="font-semibold text-brand-navy/90">[{item.room}]</span>{' '}
                          {item.task}
                          {item.done && (
                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald no-underline">
                              <span aria-hidden="true" className="size-1 rounded-full bg-brand-emerald" />
                              Done
                            </span>
                          )}
                          {!item.done && (
                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                              <span aria-hidden="true" className="size-1 rounded-full bg-amber-600" />
                              Scheduled · today
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Sign-off line */}
                  <div className="mt-6 flex items-center justify-between border-t border-amber-400/50 pt-4">
                    <p className="font-mono text-[11px] text-slate-600">
                      Signed off — <span className="text-brand-navy">M. Patel</span>, Prep Lead
                    </p>
                    <p
                      aria-hidden="true"
                      className="font-display text-xl italic text-amber-700"
                      style={{ transform: 'rotate(-4deg)' }}
                    >
                      MoveSmart
                    </p>
                  </div>
                </div>
              </RevealRow>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who it's for + Pricing — 2-col split with warm card ─────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Audience list */}
            <div className="lg:col-span-7">
              <RevealRow>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                  Who it&rsquo;s for
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                  Built for the{' '}
                  <span className="font-display italic text-brand-emerald">turn ahead</span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealRow>

              <ul className="mt-8 space-y-4">
                {content.whoItsFor.map((w, idx) => (
                  <RevealRow key={w.audience} index={idx}>
                    <li className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:shadow-md">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-brand-emerald"
                      >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-display text-lg font-normal text-brand-navy">
                          {w.audience}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {w.fitNote}
                        </p>
                      </div>
                    </li>
                  </RevealRow>
                ))}
              </ul>
            </div>

            {/* Pricing — warm-toned card */}
            <div className="lg:col-span-5">
              <RevealRow index={1}>
                <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-100/50 p-7 shadow-xl shadow-amber-900/5 sm:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 size-40 rounded-full bg-amber-200/40 blur-2xl"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-16 -left-12 size-44 rounded-full bg-emerald-200/40 blur-2xl"
                  />
                  <div className="relative">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                      Pricing
                    </p>
                    <p className="mt-3 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
                      {pricingFact}
                    </p>
                    {pricingItalic && (
                      <p className="mt-3 font-display text-lg italic leading-relaxed text-brand-emerald">
                        {pricingItalic}
                        <span aria-hidden="true" className="text-brand-gold">
                          .
                        </span>
                      </p>
                    )}
                    <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-white/70 p-4 backdrop-blur-sm">
                      <div className="flex size-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-700">
                        Typical condo prep falls between{' '}
                        <strong className="font-semibold text-brand-navy">a few hundred and a few thousand dollars</strong> —
                        scoped on the walkthrough, approved before work begins.
                      </p>
                    </div>
                    <Link
                      href="/pricing/"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 transition-colors hover:text-brand-emerald"
                    >
                      See the full fee schedule
                    </Link>
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
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock
        title="Rental Preparation FAQs"
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* ─── Final CTA — custom inline warm-tone band ────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={UNSPLASH('photo-1502672260266-1c1ef2d93688', 2400)}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-navy/92 to-brand-navy/85" />
          <div className="absolute -left-24 top-0 size-[420px] rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-emerald/15 blur-3xl" />
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
            Get the unit{' '}
            <span className="font-display italic text-brand-emerald">listing-ready</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            One walkthrough, one fixed-price quote, one coordinator across every
            trade. Approved line by line — and you watch the punch-list close out
            in the portal.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact/?type=owner"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-emerald/20 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-xl"
            >
              {content.cta1Label}
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
