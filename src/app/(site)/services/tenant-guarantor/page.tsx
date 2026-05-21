import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FAQBlock } from '@/components/blocks/faq-block'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { getServiceContent } from '@/data/services-content'
import { generatePageMetadata } from '@/lib/metadata'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

import {
  GoldRule,
  MagazinePolaroid,
  RevealUp,
} from './tenant-guarantor-client'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('tenant-guarantor')!
  return generatePageMetadata({
    path: '/services/tenant-guarantor/',
    fallbackTitle: `${content.title} | MoveSmart Rentals`,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Photo set — verified working Unsplash IDs (per page brief).
// ---------------------------------------------------------------------------

const PHOTO = {
  handshake: {
    id: 'photo-1521791136064-7986c2920216',
    alt: 'Handshake in a modern office — partnership between landlord and guarantor advisor',
  },
  signing: {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'A guarantor co-signing a Canadian lease rider on paper',
  },
  students: {
    id: 'photo-1523240795612-9a054b0db644',
    alt: 'Students studying together in a campus library',
  },
  coworkers: {
    id: 'photo-1576267423445-b2e0074d68a4',
    alt: 'Modern professionals collaborating around a laptop',
  },
  couple: {
    id: 'photo-1582719508461-905c673771fd',
    alt: 'A couple celebrating in their new rental home',
  },
  keys: {
    id: 'photo-1554224155-6726b3ff858f',
    alt: 'Keys being handed over at the close of a tenancy',
  },
} as const

function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

// Roman numerals for the editorial 2-col problem layout.
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TenantGuarantorPage() {
  const content = getServiceContent('tenant-guarantor')!

  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/tenant-guarantor/`,
    serviceType: 'Tenant Guarantor Qualification Service',
    provider: {
      name: 'MoveSmart Rentals',
      url: SITE_URL,
    },
    areaServed: 'Ontario, Canada',
  })

  // Pull-quote sourced from problemPoints[3].body — strong editorial line.
  const pullQuote1 = content.solutionTitle
  const pullQuote2 =
    'Without a clean guarantor process, owners reject applicants who only needed a co-signer — and the unit sits vacant longer than it needed to.'

  return (
    <main className="bg-[#FBFAF2]">
      <JsonLd data={serviceSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
            { label: content.title, href: '/services/tenant-guarantor/' },
          ]}
        />
      </div>

      {/* ─── 1. MAGAZINE-COVER HERO ───────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#FBFAF2] pb-16 pt-10 sm:pb-24 sm:pt-14">
        {/* Faint paper grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4">
          {/* Top masthead row */}
          <div className="flex items-center justify-between border-b border-brand-navy/15 pb-4">
            <p className="font-display text-[11px] uppercase tracking-[0.32em] text-brand-navy/70">
              MoveSmart &middot;{' '}
              <span className="italic text-brand-gold">
                The Leasing Quarterly
              </span>
            </p>
            <p className="hidden font-display text-[11px] uppercase tracking-[0.32em] text-brand-navy/70 sm:block">
              Issue: Guarantor &middot; Vol. 01
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT — Editorial headline */}
            <div className="lg:col-span-7">
              <RevealUp>
                <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-brand-gold/70"
                  />
                  Feature &middot; {content.heroKicker}
                </p>
              </RevealUp>

              <RevealUp index={1}>
                <h1 className="mt-6 font-display text-[2.75rem] font-normal leading-[1.02] tracking-[-0.01em] text-brand-navy sm:text-6xl lg:text-[5.25rem]">
                  A structured path for
                  <span className="block italic text-brand-gold">
                    strong tenants
                  </span>
                  who need a
                  <span className="italic"> co-signer</span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h1>
              </RevealUp>

              <RevealUp index={2}>
                <div className="mt-8 max-w-xl border-l-2 border-brand-gold pl-5">
                  <p className="font-display text-lg italic leading-relaxed text-slate-700 sm:text-xl">
                    {content.heroEyebrow}
                  </p>
                </div>
              </RevealUp>

              <RevealUp index={3}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={PORTAL_OWNER_SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 border-b-2 border-brand-navy pb-1 font-display text-base font-normal uppercase tracking-[0.18em] text-brand-navy transition-colors hover:border-brand-gold hover:text-brand-gold sm:text-lg"
                  >
                    {content.cta1Label}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </a>
                  <Link
                    href="/contact/?type=discovery"
                    className="inline-flex items-center gap-2 font-display text-base italic text-slate-600 underline decoration-brand-gold decoration-1 underline-offset-[6px] transition-colors hover:text-brand-navy sm:text-lg"
                  >
                    {content.cta2Label}
                  </Link>
                </div>
              </RevealUp>

              <RevealUp index={4}>
                <p className="mt-10 font-display text-[11px] uppercase tracking-[0.28em] text-slate-500">
                  Photography by MoveSmart Studio &middot; Editorial &middot;
                  May 2026
                </p>
              </RevealUp>
            </div>

            {/* RIGHT — Polaroid collage, hand-arranged */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
                <MagazinePolaroid
                  index={0}
                  rotateClass="-rotate-3"
                  className="relative z-10 ml-0 w-[78%]"
                  caption="Plate I. — The co-signing handshake."
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={unsplash(PHOTO.handshake.id, 1200)}
                      alt={PHOTO.handshake.alt}
                      fill
                      sizes="(max-width: 1024px) 78vw, 320px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </MagazinePolaroid>

                <MagazinePolaroid
                  index={1}
                  rotateClass="rotate-[4deg]"
                  className="absolute -right-2 top-32 z-20 w-[62%] sm:-right-6 sm:top-44"
                  caption="Plate II. — Documented signatures, not handshakes."
                  delay={0.1}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={unsplash(PHOTO.signing.id, 1000)}
                      alt={PHOTO.signing.alt}
                      fill
                      sizes="(max-width: 1024px) 62vw, 250px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </MagazinePolaroid>

                {/* Cover-corner badge */}
                <div
                  aria-hidden="true"
                  className="absolute -left-2 bottom-0 z-30 hidden h-20 w-20 -rotate-12 items-center justify-center rounded-full border border-brand-gold/60 bg-[#FBFAF2] text-center font-display text-[10px] uppercase tracking-[0.18em] text-brand-gold sm:flex"
                >
                  <span className="leading-tight">
                    Vol.
                    <br />
                    01
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-brand-navy/15 pt-4">
            <p className="font-display text-[11px] uppercase tracking-[0.32em] text-brand-navy/60">
              Page 01 &middot; A Leasing Feature in Six Sections
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. DROP-CAP LEDE PARAGRAPH ──────────────────────────────────── */}
      <section className="relative bg-[#F7F2E6] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <RevealUp>
            <p className="text-center font-display text-[11px] uppercase tracking-[0.28em] text-brand-gold">
              The Lede
            </p>
          </RevealUp>
          <RevealUp index={1}>
            <p className="mt-8 font-display text-xl leading-[1.7] text-slate-800 sm:text-2xl sm:leading-[1.65]">
              <span className="float-left mr-3 mt-1 font-display text-7xl font-normal leading-none text-brand-gold sm:mr-4 sm:text-8xl">
                {content.heroLede.charAt(0)}
              </span>
              {content.heroLede.slice(1)}
            </p>
          </RevealUp>
          <RevealUp index={2}>
            <p className="mt-10 text-center font-display text-base italic text-slate-500">
              — A MoveSmart leasing feature
            </p>
          </RevealUp>
        </div>
      </section>

      {/* ─── 3. PROBLEM POINTS — 2-COL NEWSPAPER BODY ────────────────────── */}
      <section className="relative bg-[#FBFAF2] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <RevealUp>
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-brand-gold">
                Part One
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.5rem]">
                {content.problemTitle}
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <RevealUp index={2}>
            <GoldRule className="mb-10" />
          </RevealUp>

          <div className="text-slate-700 md:columns-2 md:gap-10">
            {content.problemPoints.map((p, idx) => (
              <article
                key={p.title}
                className="mb-8 break-inside-avoid pr-1"
              >
                <p className="font-display text-2xl italic leading-none text-brand-gold sm:text-3xl">
                  {ROMAN[idx]}.
                </p>
                <h3 className="mt-3 font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 font-display text-[15px] leading-[1.75] text-slate-700 sm:text-base">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          <RevealUp index={3}>
            <GoldRule className="mt-6" />
          </RevealUp>
        </div>
      </section>

      {/* ─── 4. OVERSIZED PULL QUOTE #1 ──────────────────────────────────── */}
      <section className="relative bg-[#F7F2E6] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <RevealUp>
            <GoldRule ornament className="mb-12" />
          </RevealUp>
          <RevealUp index={1}>
            <blockquote className="font-display text-4xl font-normal italic leading-[1.1] tracking-tight text-brand-navy sm:text-6xl md:text-[5rem]">
              <span aria-hidden="true" className="text-brand-gold">
                &ldquo;
              </span>
              {pullQuote1}
              <span aria-hidden="true" className="text-brand-gold">
                .&rdquo;
              </span>
            </blockquote>
          </RevealUp>
          <RevealUp index={2}>
            <p className="mt-10 font-display text-[11px] uppercase tracking-[0.32em] text-slate-600">
              — From the MoveSmart Leasing Desk &middot; Toronto
            </p>
          </RevealUp>
          <RevealUp index={3}>
            <GoldRule ornament className="mt-12" />
          </RevealUp>
        </div>
      </section>

      {/* ─── 5. SCOPE — PHOTO COLLAGE SPREAD ─────────────────────────────── */}
      <section className="relative bg-[#FBFAF2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 max-w-3xl">
            <RevealUp>
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-brand-gold">
                Part Two &middot; The Engagement
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.5rem]">
                Everything inside the{' '}
                <span className="italic text-brand-gold">guarantor file</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
            {/* LEFT — numbered editorial list */}
            <div className="lg:col-span-7">
              <RevealUp>
                <GoldRule className="mb-8" />
              </RevealUp>
              <ol className="divide-y divide-brand-navy/10">
                {content.scope.map((s, idx) => (
                  <li
                    key={s.title}
                    className="grid grid-cols-[auto_1fr] items-start gap-5 py-6 sm:gap-7"
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-3xl italic leading-none text-brand-gold sm:text-4xl"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-[1.6rem]">
                        <span aria-hidden="true" className="text-brand-gold">
                          &mdash;{' '}
                        </span>
                        {s.title}
                      </h3>
                      <p className="mt-2 font-display text-[15px] leading-[1.75] text-slate-700 sm:text-base">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <RevealUp>
                <GoldRule className="mt-2" />
              </RevealUp>
            </div>

            {/* RIGHT — hand-arranged 3-photo collage */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto h-[520px] max-w-md sm:h-[600px] lg:mx-0">
                <MagazinePolaroid
                  index={0}
                  rotateClass="-rotate-3"
                  className="absolute left-0 top-0 z-10 w-[70%]"
                  caption="Plate III. — Newcomer applicants, screened with care."
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={unsplash(PHOTO.students.id, 1000)}
                      alt={PHOTO.students.alt}
                      fill
                      sizes="(max-width: 1024px) 70vw, 280px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </MagazinePolaroid>

                <MagazinePolaroid
                  index={1}
                  rotateClass="rotate-[5deg]"
                  className="absolute right-0 top-32 z-20 w-[62%] sm:top-40"
                  caption="Plate IV. — A guarantor rider, e-signed."
                  delay={0.1}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={unsplash(PHOTO.coworkers.id, 1000)}
                      alt={PHOTO.coworkers.alt}
                      fill
                      sizes="(max-width: 1024px) 62vw, 240px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </MagazinePolaroid>

                <MagazinePolaroid
                  index={2}
                  rotateClass="-rotate-2"
                  className="absolute bottom-0 left-6 z-30 w-[58%] sm:left-12"
                  caption="Plate V. — Keys handed over. The file closes."
                  delay={0.2}
                >
                  <div className="relative aspect-[5/4]">
                    <Image
                      src={unsplash(PHOTO.keys.id, 1000)}
                      alt={PHOTO.keys.alt}
                      fill
                      sizes="(max-width: 1024px) 58vw, 220px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </MagazinePolaroid>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. HOW IT WORKS — HORIZONTAL RIBBON ─────────────────────────── */}
      <section className="relative bg-[#F7F2E6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 max-w-3xl">
            <RevealUp>
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-brand-gold">
                Part Three &middot; The Workflow
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-3xl font-normal leading-[1.1] tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Six stages, plainly told
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <RevealUp index={2}>
            <div className="hidden lg:block">
              <div className="grid grid-cols-6 items-start gap-0">
                {content.howItWorks.map((step, idx) => (
                  <div
                    key={step.step}
                    className="relative px-4 pt-10 text-center"
                  >
                    {/* Connecting gold rule */}
                    {idx > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[2.6rem] h-px w-1/2 bg-brand-gold/50"
                      />
                    )}
                    {idx < content.howItWorks.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute right-0 top-[2.6rem] h-px w-1/2 bg-brand-gold/50"
                      />
                    )}
                    {/* Numeral */}
                    <span
                      aria-hidden="true"
                      className="relative z-10 mx-auto block size-[3.25rem] rounded-full border border-brand-gold/60 bg-[#F7F2E6] font-display text-xl italic leading-[3.25rem] text-brand-gold"
                    >
                      {step.step}
                    </span>
                    <h3 className="mt-5 font-display text-[15px] font-normal leading-snug text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-display text-[13px] italic leading-relaxed text-slate-600">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealUp>

          {/* Mobile / tablet: stacked numbered list */}
          <div className="lg:hidden">
            <RevealUp index={2}>
              <GoldRule className="mb-6" />
            </RevealUp>
            <ol className="divide-y divide-brand-navy/10">
              {content.howItWorks.map((step) => (
                <li
                  key={step.step}
                  className="grid grid-cols-[auto_1fr] items-start gap-5 py-6"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 items-center justify-center rounded-full border border-brand-gold/60 font-display text-lg italic text-brand-gold"
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-normal leading-snug text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-display text-[15px] leading-relaxed text-slate-700">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <GoldRule className="mt-2" />
          </div>
        </div>
      </section>

      {/* ─── 7. OVERSIZED PULL QUOTE #2 ──────────────────────────────────── */}
      <section className="relative bg-[#FBFAF2] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <RevealUp>
            <GoldRule ornament className="mb-12" />
          </RevealUp>
          <RevealUp index={1}>
            <blockquote className="font-display text-3xl font-normal italic leading-[1.15] tracking-tight text-brand-navy sm:text-5xl md:text-[4.25rem]">
              <span aria-hidden="true" className="text-brand-gold">
                &ldquo;
              </span>
              {pullQuote2}
              <span aria-hidden="true" className="text-brand-gold">
                &rdquo;
              </span>
            </blockquote>
          </RevealUp>
          <RevealUp index={2}>
            <p className="mt-10 font-display text-[11px] uppercase tracking-[0.32em] text-slate-600">
              — A note from the MoveSmart leasing team
            </p>
          </RevealUp>
          <RevealUp index={3}>
            <GoldRule ornament className="mt-12" />
          </RevealUp>
        </div>
      </section>

      {/* ─── 8. WHO IT SERVES — MASTHEAD STYLE ───────────────────────────── */}
      <section className="relative bg-[#F7F2E6] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <RevealUp>
              <p className="font-display text-[11px] uppercase tracking-[0.32em] text-brand-gold">
                Part Four &middot; Who it serves
              </p>
            </RevealUp>
            <RevealUp index={1}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.75rem]">
                Audiences in the{' '}
                <span className="italic text-brand-gold">guarantor file</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </RevealUp>
          </div>

          <RevealUp index={2}>
            <GoldRule className="mb-12" />
          </RevealUp>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {content.whoItsFor.map((w, idx) => {
              const avatar =
                idx === 0
                  ? PHOTO.couple
                  : idx === 1
                    ? PHOTO.coworkers
                    : PHOTO.students
              return (
                <RevealUp key={w.audience} index={idx} delayStep={0.08}>
                  <article className="relative h-full border-t border-brand-navy/15 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0 [&:first-child]:md:border-l-0 [&:first-child]:md:pl-0">
                    <div className="flex items-center gap-4">
                      <span className="relative block size-14 overflow-hidden rounded-full border border-brand-gold/40 shadow-sm">
                        <Image
                          src={unsplash(avatar.id, 200)}
                          alt={avatar.alt}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      </span>
                      <p className="font-display text-[11px] uppercase tracking-[0.28em] text-brand-gold">
                        Audience {ROMAN[idx]}
                      </p>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-[1.75rem]">
                      {w.audience}
                    </h3>
                    <p className="mt-4 font-display text-[15px] leading-[1.75] italic text-slate-700 sm:text-base">
                      {w.fitNote}
                    </p>
                  </article>
                </RevealUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── 9. PRICING NOTE ─────────────────────────────────────────────── */}
      <section className="relative bg-[#FBFAF2] py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <RevealUp>
            <p className="font-display text-[11px] uppercase tracking-[0.32em] text-brand-gold">
              On Pricing
            </p>
          </RevealUp>
          <RevealUp index={1}>
            <p className="mx-auto mt-8 max-w-3xl font-display text-2xl font-normal leading-[1.35] text-brand-navy sm:text-3xl md:text-[2.25rem]">
              <span aria-hidden="true" className="text-brand-gold">
                &ldquo;
              </span>
              <span className="italic">{content.pricingNote}</span>
              <span aria-hidden="true" className="text-brand-gold">
                &rdquo;
              </span>
            </p>
          </RevealUp>
          <RevealUp index={2}>
            <div className="mx-auto mt-10 w-40">
              <GoldRule />
            </div>
          </RevealUp>
          <RevealUp index={3}>
            <Link
              href="/pricing/"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.22em] text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px] transition-colors hover:text-brand-gold"
            >
              See the full fee schedule
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealUp>
        </div>
      </section>

      {/* ─── 10. FAQ ────────────────────────────────────────────────────── */}
      <div className="bg-[#F7F2E6]">
        <FAQBlock
          title={`Questions about ${content.title}`}
          questions={content.faqItems}
          showQuestionsCta={false}
        />
      </div>

      {/* ─── 11. MAGAZINE-FOOTER CTA — ruled sign-off ────────────────────── */}
      <section className="relative bg-[#FBFAF2] py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <RevealUp>
            <GoldRule className="mb-12" />
          </RevealUp>
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <RevealUp index={1}>
                <p className="font-display text-[11px] uppercase tracking-[0.32em] text-brand-gold">
                  Closing &middot; A note to the reader
                </p>
              </RevealUp>
              <RevealUp index={2}>
                <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.5rem]">
                  Co-sign your next{' '}
                  <span className="italic text-brand-gold">applicant</span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealUp>
              <RevealUp index={3}>
                <p className="mt-6 max-w-xl font-display text-lg italic leading-relaxed text-slate-700">
                  A guarantor that has been screened, qualified, and bound by a
                  proper rider is a different instrument from a name on a
                  napkin. We draft the difference.
                </p>
              </RevealUp>
            </div>
            <div className="md:col-span-5">
              <RevealUp index={2}>
                <div className="flex flex-col items-start gap-5 md:items-end">
                  <Link
                    href="/contact/?type=discovery"
                    className="group inline-flex items-center gap-3 border-b-2 border-brand-navy pb-1 font-display text-lg font-normal uppercase tracking-[0.18em] text-brand-navy transition-colors hover:border-brand-gold hover:text-brand-gold sm:text-xl"
                  >
                    Talk to a Guarantor Advisor
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                  <a
                    href={PORTAL_OWNER_SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-display text-base italic text-slate-600 underline decoration-brand-gold decoration-1 underline-offset-[6px] transition-colors hover:text-brand-navy"
                  >
                    {content.cta1Label}
                  </a>
                </div>
              </RevealUp>
            </div>
          </div>
          <RevealUp index={4}>
            <GoldRule className="mt-12" />
          </RevealUp>
          <RevealUp index={5}>
            <p className="mt-6 text-center font-display text-[11px] uppercase tracking-[0.32em] text-slate-500">
              MoveSmart Rentals &middot; The Leasing Quarterly &middot; Vol. 01
              &middot; End of Feature
            </p>
          </RevealUp>
        </div>
      </section>
    </main>
  )
}
