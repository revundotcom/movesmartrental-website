import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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
import {
  AudienceCard,
  ProcessStep,
  ScopeImageCard,
  StaggerRow,
} from '../service-client-parts'
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

// ---------------------------------------------------------------------------
// Static Params - this dynamic template only serves slugs that do NOT have
// a dedicated /services/<slug>/ folder. Each of the 7 consumer-facing
// services has been split into its own dedicated page with a distinct
// layout system, and `/institutional-lease-up/` + `/portal-and-technology/`
// live at top-level routes. So this template is effectively dormant unless
// new service slugs are added.
// ---------------------------------------------------------------------------

const SLUGS_WITH_DEDICATED_PAGES = new Set<string>([
  'tenant-placement',
  'leasing-services',
  'tenant-screening',
  'rent-guarantee',
  'tenant-insurance',
  'tenant-guarantor',
  'rental-preparation',
  'institutional-lease-up',
  'portal-and-technology',
])

export async function generateStaticParams() {
  return SERVICE_SLUGS.filter(
    (slug) => !SLUGS_WITH_DEDICATED_PAGES.has(slug),
  ).map((slug) => ({ service: slug }))
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

// Curated, slug-specific hero backdrops. All IDs are drawn from the
// project's vetted Unsplash set. Anything missing falls back to the
// Toronto skyline at dusk for the universal dark hero treatment.
const HERO_BACKDROPS: Record<string, { id: string; alt: string }> = {
  'tenant-placement': {
    id: 'photo-1554224155-6726b3ff858f',
    alt: 'Keys handed to a new tenant on move-in day',
  },
  'leasing-services': {
    id: 'photo-1502672260266-1c1ef2d93688',
    alt: 'Modern Canadian rental living room staged for showings',
  },
  'tenant-screening': {
    id: 'photo-1573497019940-1c28c88b4f3e',
    alt: 'MoveSmart screener reviewing an applicant file on a laptop',
  },
  'rent-guarantee': {
    id: 'photo-1556761175-5973dc0f32e7',
    alt: 'Team reviewing rent guarantee agreements together',
  },
  'tenant-insurance': {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'Tenant signing an insurance coverage agreement',
  },
  'tenant-guarantor': {
    id: 'photo-1582719508461-905c673771fd',
    alt: 'Family members reviewing a guarantor tenancy agreement together',
  },
  'rental-preparation': {
    id: 'photo-1505691938895-1758d7feb511',
    alt: 'Bright, prepped condo unit ready for listing photography',
  },
  'portal-and-technology': {
    id: 'photo-1573497019940-1c28c88b4f3e',
    alt: 'Owner using the MoveSmart leasing portal on a laptop',
  },
  'institutional-lease-up': {
    id: 'photo-1556761175-5973dc0f32e7',
    alt: 'Institutional lease-up team in a strategy meeting',
  },
}

const DEFAULT_HERO_ID = 'photo-1517090504586-fde19ea6066f'

function getHeroBackdrop(slug: string) {
  return (
    HERO_BACKDROPS[slug] ?? {
      id: DEFAULT_HERO_ID,
      alt: 'Canadian skyline at dusk - MoveSmart leasing markets',
    }
  )
}

// Universal rotation of vetted photos for the scope/feature image cards.
// We rotate through these by index so every service gets a coherent
// editorial set without needing slug-specific maps for every scope item.
const SCOPE_IMAGE_ROTATION: Array<{ id: string; alt: string; iconKey: string; tag: string }> = [
  {
    id: 'photo-1502672260266-1c1ef2d93688',
    alt: 'Bright modern Canadian rental interior',
    iconKey: 'Home',
    tag: 'Market-ready',
  },
  {
    id: 'photo-1573497019940-1c28c88b4f3e',
    alt: 'Leasing professional reviewing applicant data on a laptop',
    iconKey: 'Search',
    tag: 'Screening',
  },
  {
    id: 'photo-1505691938895-1758d7feb511',
    alt: 'Sun-lit condo interior with floor-to-ceiling windows',
    iconKey: 'Sparkles',
    tag: 'Prepared',
  },
  {
    id: 'photo-1556761175-5973dc0f32e7',
    alt: 'MoveSmart team meeting reviewing leasing pipeline',
    iconKey: 'Users',
    tag: 'Coordinated',
  },
  {
    id: 'photo-1450101499163-c8848c66ca85',
    alt: 'Lease document being signed at a desk',
    iconKey: 'FileSignature',
    tag: 'Compliant',
  },
  {
    id: 'photo-1554224155-6726b3ff858f',
    alt: 'Keys handed over after a successful placement',
    iconKey: 'KeyRound',
    tag: 'Closed out',
  },
  {
    id: 'photo-1560518883-ce09059eeffa',
    alt: 'Leasing agent leading an apartment tour',
    iconKey: 'Megaphone',
    tag: 'Marketed',
  },
  {
    id: 'photo-1577415124269-fc1140a69e91',
    alt: 'Modern Canadian apartment building exterior',
    iconKey: 'Shield',
    tag: 'Protected',
  },
  {
    id: 'photo-1545324418-cc1a3fa10c00',
    alt: 'Multi-unit residential building at dusk',
    iconKey: 'ClipboardList',
    tag: 'Documented',
  },
]

function getScopeImage(index: number) {
  return SCOPE_IMAGE_ROTATION[index % SCOPE_IMAGE_ROTATION.length]
}

// Stable rotation of vetted "audience" photos for the who-it's-for grid.
const AUDIENCE_IMAGES = [
  {
    id: 'photo-1564013799919-ab600027ffc6',
    alt: 'Detached Canadian family home with curb appeal',
  },
  {
    id: 'photo-1545324418-cc1a3fa10c00',
    alt: 'Multi-unit residential building at dusk',
  },
  {
    id: 'photo-1486325212027-8081e485255e',
    alt: 'Multi-storey residential building in a Canadian city',
  },
  {
    id: 'photo-1570129477492-45c003edd2be',
    alt: 'Modern townhouse row in a planned community',
  },
] as const

function getAudienceImage(index: number) {
  return AUDIENCE_IMAGES[index % AUDIENCE_IMAGES.length]
}

function getRelatedCards(slugs: string[]): ServicePageContent[] {
  return slugs
    .map((s) => SERVICES_CONTENT[s])
    .filter((c): c is ServicePageContent => Boolean(c))
}

// Split a sentence-style title into a leading clause + final 2-word italic
// accent, matching the editorial pattern used across the site.
function splitTitleAccent(title: string): { leading: string; accent: string } {
  const words = title.split(' ')
  if (words.length <= 2) {
    return { leading: '', accent: title }
  }
  return {
    leading: words.slice(0, -2).join(' '),
    accent: words.slice(-2).join(' '),
  }
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
  const hero = getHeroBackdrop(slug)
  const heroUrl = `https://images.unsplash.com/${hero.id}?auto=format&fit=crop&w=2400&q=80`

  const problemAccent = splitTitleAccent(content.problemTitle)
  const solutionAccent = splitTitleAccent(content.solutionTitle)

  // Compact 4-up stats strip — universal proof points for the leasing engagement.
  const heroStats = [
    { value: '$0', label: 'Upfront cost' },
    { value: '14d', label: 'Avg time to lease' },
    { value: '48h', label: 'Screening decision' },
    { value: '20+', label: 'Markets served' },
  ]

  // Bridge image immediately after the hero — second photo from the
  // backdrop rotation that contrasts the hero shot, used as a vertical
  // companion to the solution lede on the left.
  const bridgeImage =
    slug === 'tenant-screening'
      ? { id: 'photo-1556761175-5973dc0f32e7', alt: 'MoveSmart leasing team reviewing applicant files' }
      : slug === 'tenant-placement'
        ? { id: 'photo-1502672260266-1c1ef2d93688', alt: 'Move-in ready Canadian rental living room' }
        : slug === 'rental-preparation'
          ? { id: 'photo-1505691938895-1758d7feb511', alt: 'Prepped rental condo ready for photography' }
          : { id: 'photo-1560518883-ce09059eeffa', alt: 'Leasing agent leading an apartment tour' }
  const bridgeImageUrl = `https://images.unsplash.com/${bridgeImage.id}?w=1600&q=80&auto=format&fit=crop`

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
            { label: content.title, href: `/services/${slug}/` },
          ]}
        />
      </div>

      {/* JSON-LD */}
      <JsonLd data={serviceSchema} />

      {/* ─── Hero — dark photographic ─────────────────────────────────────── */}
      <PageHeroBlock
        kicker={content.heroKicker}
        eyebrow={content.heroEyebrow}
        headline={content.heroHeadline}
        accentLastWord={true}
        lede={content.heroLede}
        cta1={{
          label: content.cta1Label,
          // "List my property" goes straight to owner signup; any other
          // cta1 label (e.g. "Request a Lease-Up Proposal") keeps the
          // contact/inquiry flow.
          href:
            content.cta1Label === 'List my property'
              ? PORTAL_OWNER_SIGNUP_URL
              : '/contact/?type=owner',
        }}
        cta2={
          /\bbook\b.*\bcall\b/i.test(content.cta2Label)
            ? undefined
            : { label: content.cta2Label, href: '/contact/' }
        }
        service={slug}
        theme="dark"
        backgroundImageUrl={heroUrl}
        backgroundImageAlt={hero.alt}
      />

      {/* ─── Stats strip — 4 universal proof points ───────────────────────── */}
      <section className="bg-white pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-navy/10 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-white p-6 text-center sm:p-8"
              >
                <p className="font-display text-3xl font-normal text-brand-navy sm:text-4xl md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editorial image bridge — solution preview ────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <RevealOnScroll variant="slideFromLeft">
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/15">
                <Image
                  src={bridgeImageUrl}
                  alt={bridgeImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                {/* Floating credential badge */}
                <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl shadow-brand-navy/15 sm:block">
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
            </RevealOnScroll>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                The MoveSmart approach
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                {solutionAccent.leading ? (
                  <>
                    {solutionAccent.leading}{' '}
                    <span className="font-display italic text-brand-emerald">
                      {solutionAccent.accent}
                    </span>
                  </>
                ) : (
                  <span className="font-display italic text-brand-emerald">
                    {solutionAccent.accent}
                  </span>
                )}
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.solutionLede}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem points — clean two-col cards (rose accent) ───────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-12 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                The Problem
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                {problemAccent.leading ? (
                  <>
                    {problemAccent.leading}{' '}
                    <span className="font-display italic text-brand-emerald">
                      {problemAccent.accent}
                    </span>
                  </>
                ) : (
                  <span className="font-display italic text-brand-emerald">
                    {problemAccent.accent}
                  </span>
                )}
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
            {content.problemPoints.map((p, idx) => (
              <StaggerRow key={p.title} index={idx} className="h-full">
                <div className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-xl hover:shadow-brand-navy/5 sm:p-8">
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
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {p.body}
                  </p>
                </div>
              </StaggerRow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Scope — image-led card grid ─────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                What&rsquo;s included
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Every piece of the{' '}
                <span className="font-display italic text-brand-emerald">
                  engagement
                </span>
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                One full-service team, one timeline, one fixed success fee. Here&rsquo;s what we run on your behalf — visible end-to-end in your owner portal.
              </p>
            </div>
          </RevealOnScroll>

          <div
            className={`grid grid-cols-1 gap-6 sm:gap-7 ${
              content.scope.length === 4
                ? 'sm:grid-cols-2 lg:grid-cols-2'
                : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
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

      {/* ─── How it works — DARK PHOTOGRAPHIC BAND ───────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        {/* Photographic backdrop */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={`https://images.unsplash.com/${DEFAULT_HERO_ID}?w=2400&q=80&auto=format&fit=crop`}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/88 to-brand-navy/80" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/10 blur-3xl" />
        </div>

        {/* Gold hairlines */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
                How it works
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                The{' '}
                <span className="font-display italic text-brand-emerald">
                  engagement
                </span>
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                Every step is logged in your owner portal — timestamps, decisions, the team member who ran it.
              </p>
            </div>
          </RevealOnScroll>

          <ol className="divide-y divide-white/12 border-t border-white/12">
            {content.howItWorks.map((step, idx) => (
              <ProcessStep
                key={step.step}
                index={idx}
                step={step.step}
                title={step.title}
                body={step.body}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Editorial banner — keys handover ────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/15">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=2400&q=80&auto=format&fit=crop"
              alt="Keys handed to a qualified tenant — the close of the leasing engagement"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/15 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-8 pb-8 sm:px-12 sm:pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Engagement closeout
              </p>
              <p className="mt-2 font-display text-2xl font-normal italic leading-snug text-white sm:text-3xl md:text-4xl">
                Keys handed over, success fee invoiced — and not a day earlier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who it's for — image-led audience cards ─────────────────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-12 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Who it&rsquo;s for
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                A fit for every{' '}
                <span className="font-display italic text-brand-emerald">
                  owner profile
                </span>
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
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

      {/* ─── Pricing note ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Pricing
          </p>
          <p className="mt-4 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl md:text-4xl">
            {pricingFact}{' '}
            {pricingItalic && (
              <span className="font-display italic text-brand-emerald">
                {pricingItalic}
                <span className="text-brand-gold" aria-hidden="true">
                  .
                </span>
              </span>
            )}
          </p>
          <Link
            href="/pricing/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 transition-colors hover:text-brand-emerald"
          >
            See the full fee schedule
          </Link>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock
        title={`Questions about ${content.title}`}
        questions={content.faqItems}
        showQuestionsCta={false}
      />

      {/* ─── Related services ────────────────────────────────────────────── */}
      {relatedCards.length > 0 && (
        <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4">
            <RevealOnScroll variant="clipReveal" duration={0.6}>
              <div className="mb-12 max-w-2xl">
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                  Related services
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                  Explore the full{' '}
                  <span className="font-display italic text-brand-emerald">
                    engagement
                  </span>
                  <span className="text-brand-gold" aria-hidden="true">
                    .
                  </span>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedCards.map((r, idx) => (
                <StaggerRow key={r.slug} index={idx} className="h-full">
                  <Link
                    href={`/services/${r.slug}/`}
                    className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-2xl hover:shadow-brand-navy/10 sm:p-8"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                      Service
                    </p>
                    <h3 className="font-display text-xl font-normal leading-snug text-brand-navy transition-colors group-hover:text-brand-emerald sm:text-2xl">
                      {r.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                      {r.heroLede.split('.').slice(0, 1).join('.') + '.'}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-emerald">
                      Learn more
                    </span>
                  </Link>
                </StaggerRow>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Final CTA — custom inline dark navy band ────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={`https://images.unsplash.com/${DEFAULT_HERO_ID}?w=2400&q=80&auto=format&fit=crop`}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
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

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            Ready when you are
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to start with{' '}
            <span className="font-display italic text-brand-emerald">
              {content.title}
            </span>
            <span className="text-brand-gold" aria-hidden="true">
              ?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            List your property to walk through the process. No upfront cost, no obligation — we don&rsquo;t earn until your lease is signed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {content.cta1Label === 'List my property' ? (
              <a
                href={PORTAL_OWNER_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-emerald/20 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-xl"
              >
                {content.cta1Label}
              </a>
            ) : (
              <Link
                href="/contact/?type=owner"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-emerald/20 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-xl"
              >
                {content.cta1Label}
              </Link>
            )}
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
