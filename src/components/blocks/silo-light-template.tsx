import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'

/**
 * Light editorial silo template — adopts the airy, white, serif-accented
 * styling of the /us/[state]/[city] city page (AJ's design language) and
 * renders our deep, 8-section silo content inside it. White and ivory bands,
 * font-display headlines with emerald-italic accents and a gold period,
 * generous spacing, numbered hairline lists. No dense dashboard blocks.
 */

type Section = { title: string; body: string }
type FaqItem = { question: string; answer: string }
type Related = { title: string; href: string; description?: string }

export interface SiloLightTemplateProps {
  breadcrumbs: { label: string; href: string }[]
  heroKicker: string
  heroEyebrow: string
  heroHeadline: string
  heroLede: string
  heroImage?: { src: string; alt: string }
  city: string
  serviceWord: string
  intro?: string
  keyTakeaways?: string[]
  sections?: Section[]
  painPoints?: { intro?: string; items: { title: string; body: string }[] }
  neighborhoods?: string[]
  faq: FaqItem[]
  related?: Related[]
  closing: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

/** Serif headline with an emerald-italic last span and a gold period. */
function EditorialH2({
  lead,
  accent,
}: {
  lead: string
  accent?: string
}) {
  return (
    <h2 className="font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
      {lead}
      {accent && (
        <>
          {' '}
          <span className="font-display italic text-brand-emerald">{accent}</span>
        </>
      )}
      <span aria-hidden="true" className="text-brand-gold">
        .
      </span>
    </h2>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
      {children}
    </p>
  )
}

export function SiloLightTemplate(props: SiloLightTemplateProps) {
  const {
    breadcrumbs,
    heroKicker,
    heroEyebrow,
    heroHeadline,
    heroImage,
    heroLede,
    city,
    serviceWord,
    intro,
    keyTakeaways,
    sections,
    painPoints,
    neighborhoods,
    faq,
    related,
    closing,
    primaryCta,
    secondaryCta,
  } = props

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav crumbs={breadcrumbs} />
      </div>

      {/* Hero — same editorial navy hero AJ uses, with the per-city photo */}
      <PageHeroBlock
        kicker={heroKicker}
        eyebrow={heroEyebrow}
        headline={heroHeadline}
        accentLastWord
        lede={heroLede}
        cta1={primaryCta}
        cta2={secondaryCta}
        theme="dark"
        backgroundImageUrl={heroImage?.src}
        backgroundImageAlt={heroImage?.alt}
        city={city}
        service={serviceWord}
      />

      {/* Intro + at-a-glance — light, airy */}
      {(intro || (keyTakeaways && keyTakeaways.length > 0)) && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Eyebrow>{serviceWord} in {city}</Eyebrow>
            <EditorialH2 lead={`${serviceWord} in`} accent={city} />
            {intro && (
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600">
                {intro}
              </p>
            )}
            {keyTakeaways && keyTakeaways.length > 0 && (
              <ul className="mt-10 grid gap-x-10 gap-y-4 border-t border-brand-navy/10 pt-8 sm:grid-cols-3">
                {keyTakeaways.slice(0, 3).map((t, i) => (
                  <li key={i} className="flex flex-col">
                    <span aria-hidden="true" className="font-mono text-xs text-brand-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Deep content sections — alternating white / ivory, serif headings */}
      {sections && sections.length > 0 && (
        <div>
          {sections.map((s, i) => {
            // strip a leading "N. " numbering the model may emit
            const title = s.title.replace(/^\d+\.\s*/, '')
            return (
              <section
                key={s.title}
                className={i % 2 === 1 ? 'bg-[#FBFAF6] py-14 sm:py-16' : 'bg-white py-14 sm:py-16'}
              >
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="font-mono text-sm text-brand-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-display text-2xl font-normal tracking-tight text-brand-navy sm:text-[1.9rem]">
                      {title}
                    </h2>
                  </div>
                  <p className="mt-5 pl-0 text-lg leading-[1.75] text-slate-600 sm:pl-10">
                    {s.body}
                  </p>
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Neighborhoods — AJ's numbered hairline list */}
      {neighborhoods && neighborhoods.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Eyebrow>Neighborhoods we serve</Eyebrow>
              <EditorialH2 lead="Local coverage across" accent={city} />
            </div>
            <ul className="mt-10 grid grid-cols-1 border-y border-brand-navy/10 sm:grid-cols-2 sm:gap-x-10">
              {neighborhoods.map((n, i) => (
                <li
                  key={n}
                  className="flex items-center py-4 font-display text-xl text-brand-navy sm:border-b sm:border-brand-navy/10"
                >
                  <span aria-hidden="true" className="mr-3 font-mono text-xs text-brand-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Pain points — light cards */}
      {painPoints && painPoints.items && painPoints.items.length > 0 && (
        <section className="bg-[#FBFAF6] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Eyebrow>Why it is hard alone</Eyebrow>
              <EditorialH2 lead="What goes wrong in" accent={city} />
            </div>
            {painPoints.intro && (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                {painPoints.intro}
              </p>
            )}
            <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {painPoints.items.map((p) => (
                <div key={p.title} className="border-t border-brand-navy/10 pt-5">
                  <h3 className="font-display text-xl font-normal text-brand-navy">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                    {p.body}
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
          title={`${serviceWord} in ${city}: common questions`}
          questions={faq}
          schemaEnabled={false}
        />
      )}

      {/* Related — light link cards */}
      {related && related.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Eyebrow>Keep exploring</Eyebrow>
            <EditorialH2 lead={`More in`} accent={city} />
            <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group border-t border-brand-navy/10 pt-5 transition-colors"
                >
                  <h3 className="font-display text-lg font-normal text-brand-navy group-hover:text-brand-emerald">
                    {r.title}
                  </h3>
                  {r.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {r.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABannerBlock
        headline={closing}
        description={`Get a free rental analysis with ${city}-specific market pricing. Zero upfront cost, success-fee only.`}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </main>
  )
}
