import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildServiceSchema } from '@/lib/schema-builders/service-schema'
import { generatePageMetadata } from '@/lib/metadata'
import { SERVICES_CONTENT } from '@/data/services-content'
import {
  AudienceCard,
  ProcessStep,
  ScopeImageCard,
  StaggerRow,
} from '../services/service-client-parts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
const PAGE_PATH = '/institutional-lease-up/'

export async function generateMetadata(): Promise<Metadata> {
  const content = SERVICES_CONTENT['institutional-lease-up']
  return generatePageMetadata({
    path: PAGE_PATH,
    fallbackTitle: 'Institutional Leasing Operating Layer | MoveSmart Rentals',
    fallbackDescription: content?.metaDescription || 'The complete institutional leasing operating layer. Bulk lease-up, dedicated on-site staff, and resident retention pipelines.',
  })
}

// ─── Image Rotations from standard services template ─────────────────────
const SCOPE_IMAGE_ROTATION = [
  { id: 'photo-1502672260266-1c1ef2d93688', alt: 'Bright modern Canadian rental interior', iconKey: 'Home', tag: 'Market-ready' },
  { id: 'photo-1573497019940-1c28c88b4f3e', alt: 'Leasing professional reviewing applicant data on a laptop', iconKey: 'Search', tag: 'Screening' },
  { id: 'photo-1505691938895-1758d7feb511', alt: 'Sun-lit condo interior with floor-to-ceiling windows', iconKey: 'Sparkles', tag: 'Prepared' },
  { id: 'photo-1556761175-5973dc0f32e7', alt: 'MoveSmart team meeting reviewing leasing pipeline', iconKey: 'Users', tag: 'Coordinated' },
  { id: 'photo-1450101499163-c8848c66ca85', alt: 'Lease document being signed at a desk', iconKey: 'FileSignature', tag: 'Compliant' },
  { id: 'photo-1554224155-6726b3ff858f', alt: 'Keys handed over after a successful placement', iconKey: 'KeyRound', tag: 'Closed out' },
  { id: 'photo-1560518883-ce09059eeffa', alt: 'Leasing agent leading an apartment tour', iconKey: 'Megaphone', tag: 'Marketed' },
  { id: 'photo-1577415124269-fc1140a69e91', alt: 'Modern Canadian apartment building exterior', iconKey: 'Shield', tag: 'Protected' },
]

function getScopeImage(index: number) {
  return SCOPE_IMAGE_ROTATION[index % SCOPE_IMAGE_ROTATION.length]
}

const AUDIENCE_IMAGES = [
  { id: 'photo-1564013799919-ab600027ffc6', alt: 'Detached Canadian family home with curb appeal' },
  { id: 'photo-1545324418-cc1a3fa10c00', alt: 'Multi-unit residential building at dusk' },
  { id: 'photo-1486325212027-8081e485255e', alt: 'Multi-storey residential building in a Canadian city' },
]

function getAudienceImage(index: number) {
  return AUDIENCE_IMAGES[index % AUDIENCE_IMAGES.length]
}

function splitTitleAccent(title: string): { leading: string; accent: string } {
  const words = title.split(' ')
  if (words.length <= 2) return { leading: '', accent: title }
  return { leading: words.slice(0, -2).join(' '), accent: words.slice(-2).join(' ') }
}

// ─── New Data Sections (from PRD) ───────────────────────────
const RETENTION_STRATEGIES = [
  {
    title: 'Renewal Pipelines',
    body: 'Automated 90-60-30 day outreach sequences tracking intent and mitigating churn long before a notice is given.',
  },
  {
    title: 'At-Risk & Transfers',
    body: 'Proactive identification of at-risk residents. Seamless internal transfer processes to keep good tenants within the portfolio.',
  },
  {
    title: 'Data-Driven Offers',
    body: 'Structured retention offers and non-renewal tracking to identify operational bottlenecks and resident friction points.',
  },
]

export default async function InstitutionalLeaseUpPage() {
  const content = SERVICES_CONTENT['institutional-lease-up']
  const FAQ_ITEMS = content?.faqItems ?? []
  
  const serviceSchema = buildServiceSchema({
    name: 'Institutional Leasing Operating Layer',
    description: content.metaDescription,
    url: `${SITE_URL}${PAGE_PATH}`,
    provider: { name: 'MoveSmart Rentals', url: SITE_URL },
    areaServed: 'Ontario, Canada',
  })

  const problemAccent = splitTitleAccent(content.problemTitle)
  const solutionAccent = splitTitleAccent(content.solutionTitle)

  const heroStats = [
    { value: '$0', label: 'Upfront cost' },
    { value: '14d', label: 'Avg time to lease' },
    { value: '48h', label: 'Screening decision' },
    { value: '20+', label: 'Markets served' },
  ]

  const bridgeImageUrl = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop'
  const heroUrl = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2400&q=80'

  // Feature flag for case studies
  const SHOW_CASE_STUDIES = false

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav crumbs={[{ label: 'Home', href: '/' }, { label: 'Institutional Leasing', href: PAGE_PATH }]} />
      </div>

      <JsonLd data={serviceSchema} />

      {/* ─── HERO ─────────────────────────────────────── */}
      <PageHeroBlock
        kicker="Operating Layer"
        eyebrow="Institutional Leasing"
        headline="The complete institutional leasing operating layer"
        accentLastWord={true}
        lede="From granular market surveys and full lease-up execution to deep resident retention pipelines. We deploy dedicated teams and integrated tech to maximize your portfolio's yield."
        cta1={{ label: 'Discuss Your Portfolio', href: '/contact/?type=institutional' }}
        service="institutional-lease-up"
        theme="dark"
        backgroundImageUrl={heroUrl}
        backgroundImageAlt="Institutional lease-up team in a strategy meeting"
      />

      {/* ─── STATS STRIP ───────────────────────── */}
      <section className="bg-white pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-navy/10 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center bg-white p-6 text-center sm:p-8">
                <p className="font-display text-3xl font-normal text-brand-navy sm:text-4xl md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL IMAGE BRIDGE ────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <RevealOnScroll variant="slideFromLeft">
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/15">
                <Image src={bridgeImageUrl} alt="MoveSmart leasing team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
                <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl shadow-brand-navy/15 sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                      <svg viewBox="0 0 24 24" className="size-5 text-brand-emerald" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">Pay on placement</p>
                      <p className="font-display text-lg text-brand-navy">Zero upfront</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">The MoveSmart approach</p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                {solutionAccent.leading} <span className="font-display italic text-brand-emerald">{solutionAccent.accent}</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                We plug our technology, lead management, and overflow support directly into your existing on-site property teams, or deploy fully dedicated on-site staff to run your centralized portfolio leasing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VIDEO SHOWCASE ────────────────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-brand-navy/10">
            <iframe
              src="https://www.youtube.com/embed/md1ozX7Zun0?rel=0&modestbranding=1"
              title="MoveSmart Institutional Leasing"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          </div>
        </div>
      </section>

      {/* ─── PROBLEM POINTS ───────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-12 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" /> The Problem
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                {problemAccent.leading} <span className="font-display italic text-brand-emerald">{problemAccent.accent}</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
            {content.problemPoints.map((p, idx) => (
              <StaggerRow key={p.title} index={idx} className="h-full">
                <div className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-xl hover:shadow-brand-navy/5 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="font-display text-2xl font-normal italic text-rose-500">{String(idx + 1).padStart(2, '0')}</span>
                    <span aria-hidden="true" className="block h-px flex-1 bg-rose-200/70" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-500">Friction</span>
                  </div>
                  <h3 className="font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">{p.body}</p>
                </div>
              </StaggerRow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SCOPE (Image Cards) ─────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" /> What&rsquo;s included
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Every piece of the <span className="font-display italic text-brand-emerald">engagement</span>.
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {content.scope.map((item, idx) => {
              const img = getScopeImage(idx)
              return (
                <ScopeImageCard
                  key={item.title}
                  index={idx}
                  tag={img.tag}
                  iconKey={img.iconKey}
                  imageSrc={`https://images.unsplash.com/${img.id}?w=1200&q=80&auto=format&fit=crop`}
                  imageAlt={img.alt}
                  title={item.title}
                  body={item.body}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── RESIDENT RETENTION (Major Section - Dark Photographic) ─── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=2400&q=80&auto=format&fit=crop" alt="" fill className="object-cover object-center" sizes="100vw" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/88 to-brand-navy/80" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
        
        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" /> Maximize Lifetime Value
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                Resident retention is <span className="font-display italic text-brand-emerald">leasing</span>.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                We don&apos;t just find replacements after residents leave. We engineer renewal pipelines to protect occupancy before the notice period even begins.
              </p>
            </div>
          </RevealOnScroll>
          <ol className="divide-y divide-white/12 border-t border-white/12">
            {RETENTION_STRATEGIES.map((step, idx) => (
              <ProcessStep key={step.title} index={idx} step={idx + 1} title={step.title} body={step.body} />
            ))}
          </ol>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─────────────────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-12 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" /> Who it&rsquo;s for
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                A fit for every <span className="font-display italic text-brand-emerald">owner profile</span>.
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-3">
            {content.whoItsFor.map((w, idx) => {
              const img = getAudienceImage(idx)
              return (
                <AudienceCard
                  key={w.audience}
                  index={idx}
                  audience={w.audience}
                  fitNote={w.fitNote}
                  imageSrc={`https://images.unsplash.com/${img.id}?w=1200&q=80&auto=format&fit=crop`}
                  imageAlt={img.alt}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── OPTIONAL CASE STUDIES ──────────────── */}
      {SHOW_CASE_STUDIES && (
        <section className="bg-white py-20 text-center">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-display text-3xl text-brand-navy">Proven Results</h2>
            <p className="mt-4 text-slate-600">Case studies will appear here once approved data is published.</p>
          </div>
        </section>
      )}

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock title="Questions about Institutional Leasing" questions={FAQ_ITEMS} showQuestionsCta={false} />

      {/* ─── PRICING NOTE ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">Pricing</p>
          <p className="mt-4 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl md:text-4xl">
            {content.pricingNote}
          </p>
          <Link href="/contact/?type=institutional" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 transition-colors hover:text-brand-emerald">
            Discuss Your Portfolio
          </Link>
        </div>
      </section>
    </main>
  )
}
