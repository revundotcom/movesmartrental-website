import Image from 'next/image'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { FAQBlock } from '@/components/blocks/faq-block'

/**
 * Shared template used by all four silo dynamic routes
 * (services, industries, locations, resources).
 *
 * Keeps the visual language consistent: navy hero, emerald accents,
 * white sections, simple typography. Voice is consumer friendly with
 * emojis allowed where the page data supplies them.
 *
 * Does NOT depend on the elaborate ServicePageContent infrastructure
 * used by the original /services/[service] template so it stays
 * lightweight and easy to author at scale.
 */

export type SiloSection = {
  title: string
  body?: string
  items?: Array<{ title?: string; body?: string; description?: string; tag?: string }>
}

export type SiloBreadcrumb = { label: string; href: string }

export type SiloRelated = {
  title: string
  href: string
  description?: string
}

export type SiloMarketData = {
  label: string
  value: string
}

type Props = {
  breadcrumbs: SiloBreadcrumb[]
  heroKicker: string
  heroEyebrow: string
  heroHeadline: string
  heroLede: string
  intro?: string
  /** Optional 4 to 6 metric strip rendered just below the hero. */
  marketData?: SiloMarketData[]
  /** Generic content sections rendered as cards or numbered lists. */
  sections?: SiloSection[]
  /** Step by step numbered process (used by service and industry pages). */
  process?: Array<{ step: number; title: string; body: string }>
  /** Bullet checklists (included or not included). */
  included?: string[]
  notIncluded?: string[]
  /** Audience or who it is for. */
  audience?: string[]
  /** Neighborhood list for location pages. */
  neighborhoods?: string[]
  /** Resource items grid. */
  items?: Array<{ title: string; description: string; tag?: string }>
  faq: Array<{ question: string; answer: string }>
  /** Final CTA copy. */
  closing: string
  /** Related links displayed at the bottom of the page. */
  related?: SiloRelated[]
  /** Optional CTA target overrides. */
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Optional hero image rendered in a full bleed band below the hero text. */
  heroImage?: { src: string; alt: string; caption?: string }
}

export function SiloPageTemplate(props: Props) {
  const {
    breadcrumbs,
    heroKicker,
    heroEyebrow,
    heroHeadline,
    heroLede,
    intro,
    marketData,
    sections,
    process,
    included,
    notIncluded,
    audience,
    neighborhoods,
    items,
    faq,
    closing,
    related,
    primaryCta = { label: 'Book a free consultation', href: '/contact/?type=owner' },
    secondaryCta = { label: 'See our pricing', href: '/pricing/' },
    heroImage,
  } = props

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <BreadcrumbNav crumbs={breadcrumbs} />
      </div>

      {/* Hero - dark navy */}
      <section className="relative isolate overflow-hidden bg-[#0B1D3A] py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top right, rgba(16,185,129,0.25), transparent 60%), radial-gradient(ellipse at bottom left, rgba(16,185,129,0.15), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
            {heroKicker}
          </p>
          <p className="mt-3 inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
            {heroEyebrow}
          </p>
          <h1 className="mt-5 font-display text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {heroHeadline}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            {heroLede}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Hero image band */}
      {heroImage && (
        <section className="relative bg-[#0B1D3A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-8 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 sm:-mt-10 lg:-mt-12">
              <div className="relative aspect-[16/7] w-full sm:aspect-[16/6]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  sizes="(min-width: 1024px) 1100px, 100vw"
                  className="object-cover"
                  priority
                />
                {heroImage.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1D3A]/85 via-[#0B1D3A]/40 to-transparent p-5 sm:p-7">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                      On the ground
                    </p>
                    <p className="mt-1 max-w-2xl font-display text-lg font-normal text-white sm:text-xl">
                      {heroImage.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-10 bg-gradient-to-b from-[#0B1D3A] to-transparent sm:h-12" />
        </section>
      )}

      {/* Market data strip */}
      {marketData && marketData.length > 0 && (
        <section className="border-b border-slate-200 bg-[#FBFAF6] py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Market snapshot
            </p>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
              {marketData.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-start justify-center bg-white p-5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {m.label}
                  </p>
                  <p className="mt-1 font-display text-xl font-normal text-[#0B1D3A] sm:text-2xl">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro */}
      {intro && (
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              {intro}
            </p>
          </div>
        </section>
      )}

      {/* Process / How it works */}
      {process && process.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-[#0B1D3A] sm:text-4xl">
              The process, step by step
            </h2>
            <ol className="mt-10 space-y-6">
              {process.map((p) => (
                <li
                  key={p.step}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-display text-lg font-semibold text-emerald-700">
                    {p.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-normal text-[#0B1D3A]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Included / Not included */}
      {(included || notIncluded) && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {included && included.length > 0 && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                    What is included
                  </p>
                  <h3 className="mt-2 font-display text-xl font-normal text-[#0B1D3A] sm:text-2xl">
                    Every step covered
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {included.map((i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700 sm:text-base">
                        <span
                          aria-hidden="true"
                          className="mt-1 inline-block size-2 shrink-0 rounded-full bg-emerald-500"
                        />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {notIncluded && notIncluded.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    What is not included
                  </p>
                  <h3 className="mt-2 font-display text-xl font-normal text-[#0B1D3A] sm:text-2xl">
                    We do not do property management
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {notIncluded.map((i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700 sm:text-base">
                        <span
                          aria-hidden="true"
                          className="mt-1 inline-block size-2 shrink-0 rounded-full bg-slate-400"
                        />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sections grid (used by industries challenges, fit, why here, etc.) */}
      {sections && sections.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-2xl font-normal text-[#0B1D3A] sm:text-3xl">
                    {section.title}
                  </h2>
                  {section.body && (
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                      {section.body}
                    </p>
                  )}
                  {section.items && section.items.length > 0 && (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {section.items.map((item, idx) => (
                        <div
                          key={`${item.title ?? 'item'}-${idx}`}
                          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                          {item.tag && (
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                              {item.tag}
                            </p>
                          )}
                          {item.title && (
                            <h3 className="mt-2 font-display text-lg font-normal text-[#0B1D3A]">
                              {item.title}
                            </h3>
                          )}
                          {(item.body || item.description) && (
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              {item.body || item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Audience list (industries page only) */}
      {audience && audience.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Who this is for
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-[#0B1D3A] sm:text-4xl">
              The right fit
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {audience.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#FBFAF6] p-5 text-sm text-slate-700 sm:text-base"
                >
                  <span aria-hidden="true" className="mt-1 inline-block size-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Neighborhoods (locations only) */}
      {neighborhoods && neighborhoods.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Neighborhoods served
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-[#0B1D3A] sm:text-4xl">
              On the ground across the city
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoods.map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
                >
                  <span aria-hidden="true" className="mt-1 inline-block size-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Resource items grid */}
      {items && items.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Featured items
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-[#0B1D3A] sm:text-4xl">
              Free downloads and reads
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-[#FBFAF6] p-5 shadow-sm"
                >
                  {item.tag && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                      {item.tag}
                    </p>
                  )}
                  <h3 className="font-display text-lg font-normal text-[#0B1D3A]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <FAQBlock
          title="Common questions"
          questions={faq.map((f) => ({ question: f.question, answer: f.answer }))}
          showQuestionsCta={false}
        />
      )}

      {/* Related links */}
      {related && related.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Keep exploring
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-[#0B1D3A] sm:text-4xl">
              Related
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-normal text-[#0B1D3A] group-hover:text-emerald-700">
                    {r.title}
                  </h3>
                  {r.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {r.description}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                    Read more
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-[#0B1D3A] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
            Ready when you are
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal text-white sm:text-4xl">
            {closing}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
