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
import {
  getServiceContent,
  SERVICES_CONTENT,
  type ServicePageContent,
} from '@/data/services-content'

import {
  LayeredDocumentsCollage,
  ProblemAccordion,
  Reveal,
  ScreeningReportMockup,
} from './tenant-screening-client'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('tenant-screening')!
  return generatePageMetadata({
    path: '/services/tenant-screening/',
    fallbackTitle: `${content.title} | MoveSmart Rentals`,
    fallbackDescription: content.metaDescription,
  })
}

// ---------------------------------------------------------------------------
// Helpers / constants
// ---------------------------------------------------------------------------

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

// Per-scope-item data source pill (forensic checklist accent).
const SCOPE_SOURCES = [
  'Equifax soft pull',
  'Pay stubs · T4 · NOA',
  'Employer direct callback',
  'Prior landlord callback',
  'In-house underwriting',
  'OHRC checklist',
  'MoveSmart leasing desk',
]

function getRelatedCards(slugs: string[]): ServicePageContent[] {
  return slugs
    .map((s) => SERVICES_CONTENT[s])
    .filter((c): c is ServicePageContent => Boolean(c))
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TenantScreeningPage() {
  const content = getServiceContent('tenant-screening')!

  const serviceSchema = buildServiceSchema({
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/services/tenant-screening/`,
    provider: { name: 'MoveSmart Rentals', url: SITE_URL },
    serviceType: 'Tenant Screening Service',
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
            { label: content.title, href: '/services/tenant-screening/' },
          ]}
        />
      </div>

      <JsonLd data={serviceSchema} />

      {/* ─── Hero — LIGHT theme; aside is a big rounded tax/credit-forms photo ── */}
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
        service="tenant-screening"
        theme="light"
        aside={
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/20 ring-1 ring-brand-navy/5">
              <Image
                src={UNSPLASH('photo-1554224154-22dec7ec8818', 1200)}
                alt="Credit and tax forms with coffee and pen, ready for tenant screening review"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
              />
              {/* Subtle slate wash to lean compliance-tone, not happy-marketing */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 via-transparent to-transparent"
              />
            </div>
            {/* Floating "Verified" pill */}
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-emerald-100 bg-white p-3 shadow-xl shadow-brand-navy/15 sm:block">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full bg-emerald-500 text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                    Verified
                  </p>
                  <p className="font-display text-base text-brand-navy">
                    Decision-ready file
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ─── CENTERPIECE — Layered documents collage + intro copy ─────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        {/* Faint grid backdrop for forensic feel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#0B1D3A 1px, transparent 1px), linear-gradient(90deg, #0B1D3A 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: copy */}
            <div className="lg:col-span-6">
              <Reveal>
                <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  <span aria-hidden="true" className="block h-px w-8 bg-slate-300" />
                  What we check · why it matters
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                  Every applicant.{' '}
                  <span className="font-display italic text-brand-emerald">
                    Same rubric.
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Screening is a paper trail, not a feeling. Every applicant runs
                  through the same documented checks in the same order — credit,
                  income, employment, references, compliance — and every decision
                  lands in your portal with a written rationale.
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  If a tenancy ever sours, the file is the document that defends
                  you at the LTB. We build it the same way, every time.
                </p>

                {/* Forensic stat strip */}
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6">
                  <div>
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Turnaround
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-normal text-brand-navy">
                      24-48h
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Checks per file
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-normal text-brand-navy">
                      7
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Decision-maker
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-normal text-brand-navy">
                      You
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            {/* Right: the layered cards collage */}
            <div className="lg:col-span-6">
              <Reveal index={1}>
                <LayeredDocumentsCollage />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem points — slate-toned editorial accordion / issue log ── */}
      <section className="relative bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal className="mb-12 max-w-3xl">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
              <span aria-hidden="true" className="block h-px w-8 bg-amber-400/60" />
              Issue log
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {content.problemTitle}
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              What happens when screening is unstructured — recorded as we see it,
              every month, across hundreds of files.
            </p>
          </Reveal>

          <Reveal index={1}>
            <ProblemAccordion items={content.problemPoints} />
          </Reveal>
        </div>
      </section>

      {/* ─── Scope of checks — forensic checklist ────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="mb-12">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
              Screening checklist
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {content.solutionTitle}
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {content.solutionLede}
            </p>
          </Reveal>

          <ol className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {content.scope.map((item, idx) => {
              const source = SCOPE_SOURCES[idx] || 'MoveSmart leasing desk'
              return (
                <Reveal key={item.title} index={idx}>
                  <li className="group flex flex-col gap-3 border-b border-slate-200 px-5 py-5 transition-colors duration-300 last:border-b-0 hover:bg-emerald-50/30 sm:flex-row sm:gap-5 sm:px-7 sm:py-6">
                    {/* Green check */}
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-medium leading-snug text-brand-navy sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                        {item.body}
                      </p>
                    </div>

                    {/* Data source label */}
                    <div className="sm:w-44 sm:shrink-0 sm:text-right">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Data source
                      </p>
                      <p className="mt-1 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] text-slate-700">
                        {source}
                      </p>
                    </div>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ─── How it works — horizontal procedural diagram ─────────────────── */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="mb-12 max-w-3xl">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
              Process
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              From application to{' '}
              <span className="font-display italic text-brand-emerald">decision</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </Reveal>

          {/* Desktop: horizontal nodes with gold connectors. Mobile: vertical. */}
          <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-3">
            {/* Desktop horizontal line behind nodes */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent md:block"
            />

            {content.howItWorks.map((step, idx) => (
              <Reveal key={step.step} index={idx} className="relative">
                <li className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
                  {/* Numbered circle node */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold bg-white font-display text-lg font-medium text-brand-navy shadow-md shadow-brand-navy/10"
                  >
                    {String(step.step).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1 md:mt-4 md:flex-none">
                    <h3 className="font-display text-base font-medium leading-snug text-brand-navy sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Who it's for — pull quote + numbered list ────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Pull quote */}
            <div className="lg:col-span-6">
              <Reveal>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                  Who it&rsquo;s for
                </p>
                <blockquote className="mt-5">
                  <p className="font-display text-3xl font-normal italic leading-[1.15] text-brand-navy sm:text-4xl md:text-5xl">
                    &ldquo;Every applicant.{' '}
                    <span className="font-display not-italic text-brand-emerald">
                      Every time.
                    </span>{' '}
                    Same rubric.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
                  A documented, repeatable screen — whether you own one rental or
                  three hundred. Consistency is the only defence.
                </p>
                <span
                  aria-hidden="true"
                  className="mt-7 block h-px w-24 bg-gradient-to-r from-brand-gold/70 to-transparent"
                />
              </Reveal>
            </div>

            {/* Numbered list */}
            <div className="lg:col-span-6">
              <ol className="space-y-6">
                {content.whoItsFor.map((w, idx) => (
                  <Reveal key={w.audience} index={idx}>
                    <li className="group flex gap-5 border-b border-slate-200 pb-6 last:border-b-0">
                      <span
                        aria-hidden="true"
                        className="font-display text-3xl font-normal italic text-brand-gold"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-normal text-brand-navy sm:text-2xl">
                          {w.audience}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                          {w.fitNote}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Screening report mockup ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mb-12 text-center">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
              What you receive
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              A decision-ready file —{' '}
              <span className="font-display italic text-brand-emerald">
                not a phone call
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Tabbed report delivered to your owner portal. Click through credit,
              employment, references, and risk summary. Approve, counter, decline,
              or request a guarantor — every action logged.
            </p>
          </Reveal>

          <Reveal index={1}>
            <ScreeningReportMockup />
          </Reveal>
        </div>
      </section>

      {/* ─── Pricing + Related — inline footer cards ─────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Pricing card */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-7 shadow-sm sm:p-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
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
              </Reveal>
            </div>

            {/* Related services */}
            {relatedCards.length > 0 && (
              <div className="lg:col-span-2">
                <Reveal index={1}>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-7 sm:p-8">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Related services
                    </p>
                    <ul className="mt-4 space-y-3">
                      {relatedCards.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/services/${r.slug}/`}
                            className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:text-brand-emerald hover:shadow-md"
                          >
                            <span>{r.title}</span>
                            <ArrowRight
                              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock
        title="Tenant Screening FAQs"
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* ─── Custom inline dark navy CTA ─────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={UNSPLASH('photo-1551836022-d5d88e9218df', 2400)}
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
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Ready to screen
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
            Run an applicant through our{' '}
            <span className="font-display italic text-brand-emerald">rubric</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Standalone or bundled with full placement. Decision-ready report in
            24-48 hours. You make every final call.
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
