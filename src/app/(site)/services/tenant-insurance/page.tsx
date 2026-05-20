import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
  ChatBubble,
  PopIn,
  ResolvedIcon,
  RevealUp,
} from './tenant-insurance-client'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('tenant-insurance')!
  return generatePageMetadata({
    path: '/services/tenant-insurance/',
    fallbackTitle: `${content.title} | MoveSmart Rentals`,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Photo set — verified, working Unsplash IDs for this page.
// ---------------------------------------------------------------------------

const PHOTO = {
  heroCouple: {
    id: 'photo-1582719508461-905c673771fd',
    alt: 'Happy young couple celebrating in their new rental home',
  },
  livingRoom: {
    id: 'photo-1560448204-61dc36dc98c8',
    alt: 'Bright furnished living and dining room interior',
  },
  condoInterior: {
    id: 'photo-1505691938895-1758d7feb511',
    alt: 'Modern condo interior with bright windows',
  },
  policyDocs: {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'Tenant insurance policy documents on a desk',
  },
  professionals: {
    id: 'photo-1576267423445-b2e0074d68a4',
    alt: 'Young professionals reviewing details on a laptop',
  },
  students: {
    id: 'photo-1523240795612-9a054b0db644',
    alt: 'Students laughing together as renters',
  },
} as const

function unsplash(id: string, w = 1200) {
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
// Static structural data (only used for the locked-layout sections — all
// copy comes from the content object).
// ---------------------------------------------------------------------------

// Three "floating coverage circles" — short marketing labels that pair with
// the conceptual coverages renters care about.
const COVERAGE_CIRCLES: Array<{
  label: string
  caption: string
  photoId: string
  photoAlt: string
  tint: string
}> = [
  {
    label: 'Your stuff',
    caption: 'Contents coverage',
    photoId: PHOTO.livingRoom.id,
    photoAlt: PHOTO.livingRoom.alt,
    tint: 'bg-emerald-100/70',
  },
  {
    label: 'Peace of mind',
    caption: 'Personal liability',
    photoId: PHOTO.heroCouple.id,
    photoAlt: PHOTO.heroCouple.alt,
    tint: 'bg-rose-100/70',
  },
  {
    label: 'A backup plan',
    caption: 'Additional living expenses',
    photoId: PHOTO.condoInterior.id,
    photoAlt: PHOTO.condoInterior.alt,
    tint: 'bg-amber-100/70',
  },
]

// Four "what's covered" cards — pastel-tinted, no images, icon-only.
const COVERED_CARDS: Array<{
  iconKey: string
  title: string
  body: string
  tint: string
  iconTint: string
}> = [
  {
    iconKey: 'HomeIcon',
    title: 'Contents inside the unit',
    body: 'Furniture, electronics, clothing and the everyday things you own — replaced if they are damaged, stolen, or destroyed by a covered loss.',
    tint: 'bg-emerald-50',
    iconTint: 'bg-emerald-100 text-brand-emerald',
  },
  {
    iconKey: 'ShieldCheck',
    title: 'Personal liability ($1M–$2M)',
    body: 'If a guest is injured in your unit, or you accidentally cause damage that affects another suite, your liability coverage steps in.',
    tint: 'bg-rose-50',
    iconTint: 'bg-rose-100 text-rose-600',
  },
  {
    iconKey: 'Briefcase',
    title: 'Additional living expenses',
    body: 'If the unit becomes unliveable after a covered loss, the policy can pay for a hotel, meals, and the cost of staying somewhere else.',
    tint: 'bg-amber-50',
    iconTint: 'bg-amber-100 text-amber-700',
  },
  {
    iconKey: 'Sparkles',
    title: 'Optional add-ons',
    body: 'Identity theft assistance, higher single-item limits for jewellery or bikes, and overland water in flood-exposed neighbourhoods.',
    tint: 'bg-sky-50',
    iconTint: 'bg-sky-100 text-sky-600',
  },
]

// "Who it's for" avatar carousel — pair each audience with a circular photo.
const AUDIENCE_PHOTOS: Array<{ id: string; alt: string }> = [
  { id: PHOTO.heroCouple.id, alt: PHOTO.heroCouple.alt },
  { id: PHOTO.condoInterior.id, alt: PHOTO.condoInterior.alt },
  { id: PHOTO.professionals.id, alt: PHOTO.professionals.alt },
  { id: PHOTO.students.id, alt: PHOTO.students.alt },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TenantInsurancePage() {
  const content = getServiceContent('tenant-insurance')!

  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/tenant-insurance/`,
    serviceType: 'Tenant Insurance Coordination',
    provider: {
      name: 'MoveSmart Rentals',
      url: SITE_URL,
    },
    areaServed: 'Ontario, Canada',
  })

  const relatedCards = getRelatedCards(content.relatedServices)

  return (
    <main className="bg-white">
      <JsonLd data={serviceSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: content.title, href: '/services/tenant-insurance/' },
          ]}
        />
      </div>

      {/* ─── CUSTOM PASTEL HERO — circular avatar photo + soft gradient ──── */}
      <section className="relative overflow-hidden pb-20 pt-10 sm:pb-24 sm:pt-14">
        {/* Soft pastel backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50 via-rose-50/80 to-amber-50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-emerald-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-10 size-[380px] rounded-full bg-rose-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-1/3 size-[320px] rounded-full bg-amber-200/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT — friendly copy column */}
            <div className="lg:col-span-7 xl:col-span-6">
              <RevealUp>
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-700">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-rose-500"
                  />
                  Renter coverage
                </span>
              </RevealUp>
              <RevealUp index={1}>
                <h1 className="mt-6 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                  Tenant insurance,{' '}
                  <span className="font-display italic text-brand-emerald">
                    actually enforced
                  </span>
                  <span aria-hidden="true" className="text-rose-400">
                    .
                  </span>
                </h1>
              </RevealUp>
              <RevealUp index={2}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  {content.heroLede}
                </p>
              </RevealUp>
              <RevealUp index={3}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact/?type=owner"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-emerald px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald/90 hover:shadow-xl"
                  >
                    {content.cta1Label}
                  </Link>
                  <Link
                    href="/contact/?type=discovery"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/20 bg-white/80 px-7 py-3.5 text-sm font-bold text-brand-navy backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-navy/40 hover:bg-white"
                  >
                    {content.cta2Label}
                  </Link>
                </div>
              </RevealUp>
              <RevealUp index={4}>
                <p className="mt-6 text-xs text-slate-500">
                  Coordination is included with the full Leasing Services
                  engagement &mdash; you don&rsquo;t pay extra for it.
                </p>
              </RevealUp>
            </div>

            {/* RIGHT — circular avatar hero photo */}
            <div className="relative lg:col-span-5 xl:col-span-6">
              <RevealUp index={2}>
                <div className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-[520px]">
                  {/* Soft decorative ring */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-4 rounded-full bg-gradient-to-br from-emerald-200/60 via-white/0 to-rose-200/60 blur-xl"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full border border-white/80 bg-white/30 backdrop-blur-sm"
                  />
                  <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-white shadow-2xl shadow-emerald-900/15">
                    <Image
                      src={unsplash(PHOTO.heroCouple.id, 1200)}
                      alt={PHOTO.heroCouple.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 80vw, 520px"
                      unoptimized
                      priority
                    />
                  </div>

                  {/* Floating price chip */}
                  <div className="absolute -left-2 bottom-6 sm:-left-6 lg:-left-10">
                    <PopIn index={1}>
                      <div className="flex items-center gap-3 rounded-full border border-rose-200 bg-white/95 px-4 py-2.5 shadow-xl shadow-rose-300/30 backdrop-blur-sm">
                        <span className="inline-flex size-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                          <ResolvedIcon
                            iconKey="ShieldCheck"
                            className="size-4"
                          />
                        </span>
                        <span className="text-xs font-semibold text-brand-navy">
                          From{' '}
                          <span className="font-display text-base italic text-brand-emerald">
                            $15/mo
                          </span>
                          <sup className="ml-0.5 text-[9px] text-slate-400">
                            *
                          </sup>{' '}
                          through partner
                        </span>
                      </div>
                    </PopIn>
                  </div>

                  {/* Floating verified chip */}
                  <div className="absolute -right-2 top-8 sm:-right-4 lg:-right-8">
                    <PopIn index={2}>
                      <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/95 px-3.5 py-2 shadow-xl shadow-emerald-300/30 backdrop-blur-sm">
                        <span
                          aria-hidden="true"
                          className="size-2 rounded-full bg-emerald-500"
                        />
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                          Proof on file
                        </span>
                      </div>
                    </PopIn>
                  </div>
                </div>
              </RevealUp>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 FLOATING COVERAGE CIRCLES ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
            <RevealUp>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                The three pillars
              </span>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Three things every renter&rsquo;s{' '}
                <span className="font-display italic text-brand-emerald">
                  policy should do
                </span>
                <span aria-hidden="true" className="text-rose-400">
                  .
                </span>
              </h2>
            </RevealUp>
            <RevealUp index={2}>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                We help applicants pick coverage that actually meets the
                lease requirement &mdash; not a $5 add-on that leaves
                everyone exposed.
              </p>
            </RevealUp>
          </div>

          {/* Floating circles row with vertical offsets */}
          <div className="relative">
            {/* Soft connector line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-3/4 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-200 to-transparent md:block"
            />

            <div className="grid grid-cols-1 items-center justify-items-center gap-12 md:grid-cols-3 md:gap-6">
              {COVERAGE_CIRCLES.map((c, idx) => {
                // Middle circle is bigger; sides are slightly offset.
                const isCenter = idx === 1
                const size = isCenter
                  ? 'size-60 sm:size-72'
                  : 'size-48 sm:size-56'
                const offset =
                  idx === 0
                    ? 'md:translate-y-6'
                    : idx === 2
                      ? 'md:-translate-y-6'
                      : ''
                return (
                  <PopIn key={c.label} index={idx} className={offset}>
                    <div className="group relative flex flex-col items-center text-center">
                      <div
                        className={`relative ${size} overflow-hidden rounded-full border-[5px] border-white shadow-2xl ${c.tint} shadow-emerald-900/10 transition-transform duration-500 group-hover:-translate-y-1`}
                      >
                        <Image
                          src={unsplash(c.photoId, 800)}
                          alt={c.photoAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 240px, 280px"
                          unoptimized
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"
                        />
                      </div>
                      <p className="mt-6 font-display text-xl font-normal text-brand-navy sm:text-2xl">
                        {c.label}
                      </p>
                      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
                        {c.caption}
                      </p>
                    </div>
                  </PopIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S COVERED — 2×2 pastel-tinted masonry cards ─────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-emerald-50/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <RevealUp>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-700">
                What&rsquo;s actually covered
              </span>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                A friendly tour of the{' '}
                <span className="font-display italic text-brand-emerald">
                  fine print
                </span>
                <span aria-hidden="true" className="text-rose-400">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {COVERED_CARDS.map((card, idx) => (
              <RevealUp key={card.title} index={idx}>
                <div
                  className={`group flex h-full flex-col gap-4 rounded-[2rem] border border-white/80 ${card.tint} p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-9`}
                >
                  <span
                    className={`inline-flex size-14 items-center justify-center rounded-2xl ${card.iconTint} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <ResolvedIcon iconKey={card.iconKey} className="size-6" />
                  </span>
                  <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {card.body}
                  </p>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM SUMMARY — short editorial intro into how we fix it ──── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 max-w-3xl">
            <RevealUp>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800">
                Why this matters
              </span>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
                {content.problemTitle.split(' ').slice(0, -3).join(' ')}{' '}
                <span className="font-display italic text-brand-emerald">
                  {content.problemTitle.split(' ').slice(-3).join(' ')}
                </span>
                <span aria-hidden="true" className="text-rose-400">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {content.problemPoints.map((p, idx) => (
              <RevealUp key={p.title} index={idx}>
                <div className="flex h-full flex-col gap-3 rounded-[1.75rem] border border-slate-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-rose-200 hover:shadow-md">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-normal italic text-rose-400"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {p.body}
                  </p>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — conversational chat-bubble flow ──────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-rose-50/40 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <RevealUp>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                How it works
              </span>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                {content.solutionTitle.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="font-display italic text-brand-emerald">
                  {content.solutionTitle.split(' ').slice(-2).join(' ')}
                </span>
                <span aria-hidden="true" className="text-rose-400">
                  .
                </span>
              </h2>
            </RevealUp>
            <RevealUp index={2}>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.solutionLede}
              </p>
            </RevealUp>
          </div>

          <ol className="relative space-y-6">
            {content.howItWorks.map((step, idx) => {
              const isLeft = idx % 2 === 0
              const avatarTint = isLeft
                ? 'bg-emerald-100 text-brand-emerald'
                : 'bg-rose-100 text-rose-600'
              const bubbleTint = isLeft
                ? 'bg-white border-emerald-100'
                : 'bg-white border-rose-100'
              const tailSide = isLeft
                ? 'before:-left-2 before:bg-white before:border-emerald-100 before:border-l before:border-b'
                : 'before:-right-2 before:bg-white before:border-rose-100 before:border-r before:border-b'

              return (
                <ChatBubble key={step.step} index={idx}>
                  <li
                    className={`flex items-end gap-3 sm:gap-5 ${isLeft ? '' : 'flex-row-reverse'}`}
                  >
                    {/* Avatar circle */}
                    <span
                      className={`relative inline-flex shrink-0 size-12 items-center justify-center rounded-full ${avatarTint} font-display text-base font-normal shadow-md sm:size-14 sm:text-lg`}
                    >
                      {String(step.step).padStart(2, '0')}
                    </span>

                    {/* Chat bubble */}
                    <div
                      className={`relative max-w-[85%] rounded-[1.75rem] border ${bubbleTint} px-6 py-5 shadow-md shadow-emerald-900/5 sm:max-w-[80%] sm:px-7 sm:py-6 ${tailSide} before:absolute before:bottom-2 before:size-4 before:rotate-45 before:content-['']`}
                    >
                      <p className="font-display text-base font-normal leading-snug text-brand-navy sm:text-lg">
                        {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </ChatBubble>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ─── WHO IT'S FOR — horizontal carousel of avatar circles ────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 max-w-2xl">
            <RevealUp>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-700">
                Who it&rsquo;s for
              </span>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Built for the landlords who actually{' '}
                <span className="font-display italic text-brand-emerald">
                  collect the certificate
                </span>
                <span aria-hidden="true" className="text-rose-400">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="flex min-w-max gap-6 sm:grid sm:min-w-0 sm:grid-cols-3 sm:gap-8">
              {content.whoItsFor.map((w, idx) => {
                const photo = AUDIENCE_PHOTOS[idx % AUDIENCE_PHOTOS.length]
                return (
                  <PopIn key={w.audience} index={idx}>
                    <div className="flex w-56 flex-col items-center text-center sm:w-auto">
                      <div className="relative aspect-square w-40 overflow-hidden rounded-full border-[5px] border-white shadow-xl shadow-emerald-900/10 sm:w-48">
                        <Image
                          src={unsplash(photo.id, 600)}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 160px, 192px"
                          unoptimized
                        />
                      </div>
                      <p className="mt-5 font-display text-lg font-normal text-brand-navy sm:text-xl">
                        {w.audience}
                      </p>
                      <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-slate-600">
                        {w.fitNote}
                      </p>
                    </div>
                  </PopIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING + PARTNER DISCLAIMER — peach/rose tinted soft card ──── */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4">
          <RevealUp>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-8 shadow-lg shadow-rose-200/30 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-rose-200/40 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -left-12 size-56 rounded-full bg-amber-200/40 blur-3xl"
              />
              <div className="relative text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-700 shadow-sm">
                  Pricing &amp; partner note
                </span>
                <p className="mx-auto mt-6 max-w-2xl font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl md:text-[1.75rem]">
                  {content.pricingNote}
                </p>
                <p className="mt-5 text-xs text-slate-500">
                  *Starting premium varies by partner provider, deductible
                  and unit type. MoveSmart Rentals is not a licensed
                  insurance broker; we coordinate proof-of-coverage and
                  route applicants to vetted Canadian partner providers.
                </p>
              </div>
            </div>
          </RevealUp>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock
        title={`Questions about ${content.title}`}
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* ─── RELATED SERVICES — compact pastel strip ─────────────────────── */}
      <section className="bg-gradient-to-b from-white to-emerald-50/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <RevealUp>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                  Pairs well with
                </span>
              </RevealUp>
              <RevealUp index={1}>
                <h2 className="mt-5 font-display text-2xl font-normal leading-tight tracking-tight text-brand-navy sm:text-3xl md:text-4xl">
                  Other services in the{' '}
                  <span className="font-display italic text-brand-emerald">
                    leasing engagement
                  </span>
                  <span aria-hidden="true" className="text-rose-400">
                    .
                  </span>
                </h2>
              </RevealUp>
            </div>
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-brand-emerald underline decoration-2 underline-offset-4 transition-colors hover:text-brand-navy"
            >
              All services
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {relatedCards.map((r, idx) => (
              <RevealUp key={r.slug} index={idx}>
                <Link
                  href={`/services/${r.slug}/`}
                  className="group flex h-full flex-col gap-3 rounded-[1.75rem] border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-emerald">
                    Service
                  </span>
                  <h3 className="font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {r.heroLede.split('.')[0]}.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-brand-emerald transition-transform group-hover:translate-x-0.5">
                    Read more
                  </span>
                </Link>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CUSTOM ROUNDED EMERALD CTA ──────────────────────────────────── */}
      <section className="bg-white px-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="relative isolate overflow-hidden rounded-[3rem] bg-gradient-to-br from-emerald-600 via-brand-emerald to-emerald-700 px-6 py-16 text-center text-white shadow-2xl shadow-emerald-900/20 sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 top-0 size-80 rounded-full bg-rose-300/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-amber-200/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-amber-200"
                />
                Make the clause mean something
              </span>
              <h2 className="mt-6 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Lease signed, certificate{' '}
                <span className="font-display italic text-amber-200">
                  on file
                </span>
                <span aria-hidden="true" className="text-amber-200">
                  .
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                List your property and we&rsquo;ll enforce the tenant
                insurance clause from day one &mdash; coverage verified,
                proof collected, renewal tracked.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact/?type=owner"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-emerald shadow-xl shadow-emerald-950/30 transition-all hover:-translate-y-0.5 hover:bg-rose-50 hover:text-rose-700"
                >
                  {content.cta1Label}
                </Link>
                <Link
                  href="/contact/?type=discovery"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/20"
                >
                  {content.cta2Label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
