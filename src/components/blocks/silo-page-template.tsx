import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AudienceSegmentation } from '@/components/blocks/audience-segmentation'
import { RentCalculator } from '@/components/blocks/rent-calculator'
import { BentoTile } from '@/app/(site)/services/client-parts'
import {
  ArrowRight,
  ArrowUpRight,
  Gauge,
  UserCheck,
  ShieldCheck,
  MonitorCheck,
  RadioTower,
  Check,
  ChevronDown,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { FAQBlock } from '@/components/blocks/faq-block'
import { RentalAnalysisForm } from '@/components/blocks/rental-analysis-form'

/* MoveSmart design-system tokens (scoped to silo pages) */
const NAVY = '#0B1D3A'
const NAVY900 = '#071228'

function renderInline(text: string): React.ReactNode {
  // Tokenize **bold** and [text](href) markdown.
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#0B1D3A]">
          {p.slice(2, -2)}
        </strong>
      )
    }
    const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const ext = /^https?:\/\//.test(link[2])
      return (
        <Link
          key={i}
          href={link[2]}
          {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-medium text-[#0B7A52] underline decoration-[#10B981]/40 underline-offset-2 hover:decoration-[#10B981]"
        >
          {link[1]}
        </Link>
      )
    }
    return <Fragment key={i}>{p}</Fragment>
  })
}

function RichText({ text }: { text: string }) {
  const normalized = text.trim().replace(/(^|\n)(### .*)\n(?!\n)/g, '$1$2\n\n')
  const blocks = normalized.split(/\n\n+/)
  return (
    <div className="space-y-5 text-[17px] leading-[1.75] text-slate-600">
      {blocks.map((block, i) => {
        const lines = block.split('\n').filter((l) => l.trim().length > 0)
        if (lines.length > 0 && lines.every((l) => l.trim().startsWith('- '))) {
          return (
            <ul key={i} className="space-y-3">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3">
                  <Check
                    className="mt-1 h-4 w-4 flex-none text-[#10B981]"
                    strokeWidth={2.5}
                  />
                  <span>{renderInline(l.trim().slice(2))}</span>
                </li>
              ))}
            </ul>
          )
        }
        if (block.trim().startsWith('### ')) {
          return (
            <h3
              key={i}
              className="pt-3 font-display text-2xl font-normal text-[#0B1D3A]"
            >
              {renderInline(block.trim().slice(4).trim())}
            </h3>
          )
        }
        return <p key={i}>{renderInline(block)}</p>
      })}
    </div>
  )
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.14em] ${
        light ? 'text-[#34D399]' : 'text-[#10B981]'
      }`}
    >
      {children}
    </p>
  )
}

/** Live-site headline: DM Serif Display, last word in emerald italic + gold dot. */
function H2({
  children,
  light = false,
  className = '',
}: {
  children: React.ReactNode
  light?: boolean
  className?: string
}) {
  const raw = Array.isArray(children)
    ? (children as unknown[]).join('')
    : String(children ?? '')
  const text = raw.trim().replace(/\.$/, '')
  const words = text.split(' ')
  const last = words.pop() ?? ''
  const head = words.join(' ')
  return (
    <h2
      className={`font-display text-[32px] font-normal leading-[1.14] tracking-tight sm:text-[40px] ${
        light ? 'text-white' : 'text-[#0B1D3A]'
      } ${className}`}
    >
      {head ? `${head} ` : ''}
      <span className="font-display italic text-[#10B981]">{last}</span>
      <span aria-hidden="true" className="text-[#D4A853]">
        .
      </span>
    </h2>
  )
}


export type SiloSection = {
  title: string
  body?: string
  items?: Array<{
    title?: string
    body?: string
    description?: string
    tag?: string
    href?: string
    external?: boolean
  }>
}
export type SiloBreadcrumb = { label: string; href: string }
export type SiloRelated = { title: string; href: string; description?: string }
export type SiloMarketData = { label: string; value: string; sub?: string }
export type SiloProcessStep = { step: number; title: string; body: string }
export type SiloServiceCard = { title: string; href: string; description?: string }
export type SiloChip = { icon: string; title: string; sub: string }
export type SiloProof = { value: string; label: string }
export type RentByBed = { label: string; value: string; yoy?: string }

type Props = {
  breadcrumbs: SiloBreadcrumb[]
  heroKicker: string
  heroEyebrow: string
  heroHeadline: string
  heroLede: string
  heroSubhead?: string
  serviceWord?: string
  chips?: SiloChip[]
  intro?: string
  marketData?: SiloMarketData[]
  rentByBed?: RentByBed[]
  rentSource?: string
  trustChips?: string[]
  proofStats?: SiloProof[]
  /** Bulleted "everything we handle in this market" service list. */
  serviceList?: Array<{ label: string; blurb: string }>
  /** Local leasing-law / compliance section (RTA, LTB, etc.). */
  localRules?: { intro: string; items: Array<{ term: string; detail: string }> }
  /** Pricing compare cards. */
  pricing?: {
    intro: string
    cards: Array<{ name: string; price: string; sub: string; feats: string[]; cta: { label: string; href: string }; highlight?: boolean }>
  }
  /** [lat, lng] for a real Google Map embed in the areas section. */
  mapLatLng?: [number, number]
  /** Nearby cities/suburbs we also serve (internal links to their pages). */
  nearbyCities?: Array<{ city: string; href: string }>
  /** Risk-reversal guarantee band. */
  guarantee?: { title: string; body: string; points: string[] }
  /** Render the rental-analysis request form section. */
  showForm?: boolean
  sections?: SiloSection[]
  process?: SiloProcessStep[]
  serviceCards?: SiloServiceCard[]
  splitImage?: { src: string; alt: string }
  splitImage2?: { src: string; alt: string }
  /** Accepted for compatibility with the services/industries routes. */
  included?: string[]
  notIncluded?: string[]
  audience?: string[]
  neighborhoods?: string[]
  neighborhoodLinks?: Array<{ name: string; href: string }>
  bentoServices?: Array<{ title: string; description?: string; href: string; image: string }>
  pullQuote?: { quote: string; attribution?: string }
  painPoints?: { intro?: string; items: Array<{ title: string; body: string }> }
  comparison?: {
    intro?: string
    rows: Array<{ label: string; diy: string; us: string }>
  }
  showCalculator?: boolean
  exploreLinks?: Array<{ label: string; href: string; sub?: string }>
  items?: Array<{ title: string; description: string; tag?: string }>
  faq: Array<{ question: string; answer: string }>
  closing: string
  related?: SiloRelated[]
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  heroImage?: { src: string; alt: string; caption?: string }
}

const CHIP_ICONS: Record<string, typeof RadioTower> = {
  'radio-tower': RadioTower,
  'monitor-check': MonitorCheck,
  'user-check': UserCheck,
  'shield-check': ShieldCheck,
  gauge: Gauge,
}

export function SiloPageTemplate(props: Props) {
  const {
    breadcrumbs,
    heroKicker,
    heroEyebrow,
    heroHeadline,
    heroLede,
    heroSubhead,
    serviceWord,
    chips,
    marketData,
    rentByBed,
    rentSource,
    trustChips,
    localRules,
    pricing,
    mapLatLng,
    nearbyCities,
    neighborhoodLinks,
    painPoints,
    comparison,
    showCalculator,
    exploreLinks,
    bentoServices,
    pullQuote,
    guarantee,
    showForm,
    sections,
    process,
    splitImage,
    splitImage2,
    neighborhoods,
    faq,
    closing,
    primaryCta = { label: 'List my property', href: '/owners/' },
    secondaryCta = { label: 'Browse rentals', href: '/properties/' },
    heroImage,
  } = props

  const contentSections = sections ?? []
  const city = heroEyebrow.split(',')[0] || 'your market'
  const subhead =
    heroSubhead || heroLede.replace(/\*\*/g, '').split('. ').slice(0, 2).join('. ') + '.'

  const Btn = ({
    href,
    children,
    variant = 'go',
  }: {
    href: string
    children: React.ReactNode
    variant?: 'go' | 'navy' | 'outline' | 'outlineWhite'
  }) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-[11px] px-6 py-3.5 text-[15px] font-semibold transition'
    const styles: Record<string, string> = {
      go: 'bg-[#10B981] text-white hover:bg-[#34D399]',
      navy: 'bg-[#0B1D3A] text-white hover:bg-[#132D54]',
      outline: 'border border-[#CDD5E0] bg-white text-[#0B1D3A] hover:bg-[#F2F5FA]',
      outlineWhite: 'border border-white/50 text-white hover:bg-white/10',
    }
    return (
      <Link href={href} className={`${base} ${styles[variant]}`}>
        {children}
      </Link>
    )
  }

  return (
    <main className="bg-white font-sans">
      {/* Breadcrumb (white bar above hero) */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <BreadcrumbNav crumbs={breadcrumbs} />
      </div>

      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden">
        {/* Full-bleed city photo as the hero background, with a heavy navy
            overlay so the headline stays legible (AJ-style treatment). */}
        {heroImage?.src ? (
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Image
              src={heroImage.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/[0.88] to-brand-navy/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-brand-navy/30" />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{ background: NAVY }}
          />
        )}
        {/* ə symbol motif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-32 h-[560px] w-[440px] opacity-[0.08]"
          style={{
            backgroundImage: 'url(/ds/symbol.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <Eyebrow light>{heroKicker}</Eyebrow>
            <h1 className="mt-4 font-display text-[46px] font-normal leading-[1.06] tracking-tight text-white sm:text-[60px]">
              {(() => {
                const t = heroHeadline.trim().replace(/\.$/, '')
                const w = t.split(' ')
                const last = w.pop() ?? ''
                return (
                  <>
                    {w.length ? `${w.join(' ')} ` : ''}
                    <span className="font-display italic text-[#34D399]">
                      {last}
                    </span>
                    <span aria-hidden="true" className="text-[#D4A853]">
                      .
                    </span>
                  </>
                )
              })()}
            </h1>
            <p className="mt-5 max-w-xl text-[18px] leading-[1.55] text-[#C7D3E8]">
              {subhead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={primaryCta.href} variant="go">
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Btn>
              <Btn href={secondaryCta.href} variant="outlineWhite">
                {secondaryCta.label}
              </Btn>
            </div>
            {chips && chips.length > 0 && (
              <div className="mt-9 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                {chips.map((c) => {
                  const Ic = CHIP_ICONS[c.icon] ?? RadioTower
                  return (
                    <div key={c.title} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/[0.12] text-[#34D399]">
                        <Ic className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="text-[14.5px] text-white">
                        <span className="font-semibold">{c.title}</span>
                        <span className="text-[#C7D3E8]"> · {c.sub}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      {trustChips && trustChips.length > 0 && (
        <section className="border-b border-[#E3E8EF] bg-white py-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 sm:px-6 lg:px-8">
            {trustChips.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0B1D3A]"
              >
                <Check className="h-4 w-4 flex-none text-[#10B981]" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ============ STAT BAND (light editorial — real data only) ============ */}
      {marketData && marketData.length > 0 && (
        <section className="border-b border-slate-200/70 bg-[#FBFAF6] py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/70" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                {city} market snapshot
              </p>
            </div>
            <div
              className={`mt-9 grid grid-cols-2 gap-y-9 ${
                marketData.length >= 4
                  ? 'lg:grid-cols-4'
                  : marketData.length === 3
                    ? 'lg:grid-cols-3'
                    : 'lg:grid-cols-2'
              }`}
            >
              {marketData.map((m, i) => (
                <div
                  key={m.label}
                  className={`px-1 sm:px-6 ${i > 0 ? 'lg:border-l lg:border-slate-200' : ''} ${i === 2 && marketData.length >= 4 ? 'border-l border-slate-200 lg:border-l' : ''}`}
                >
                  <p className="font-display text-[40px] font-normal leading-none tracking-tight text-brand-navy sm:text-5xl md:text-[56px]">
                    {m.value}
                  </p>
                  <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:text-[13px]">
                    {m.label}
                  </p>
                  {m.sub && (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium text-brand-emerald">
                      {m.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {rentSource && (
              <p className="mt-9 text-[12px] italic text-slate-400">{rentSource}</p>
            )}
          </div>
        </section>
      )}

      {/* ============ PAIN POINTS (photo + editorial list) ============ */}
      {painPoints && painPoints.items.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                <Eyebrow>Why it matters</Eyebrow>
              </div>
              <H2 className="mt-3">What goes wrong with {serviceWord ?? 'leasing'} in {city} alone</H2>
              {painPoints.intro && (
                <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
                  {painPoints.intro}
                </p>
              )}
              <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-lg lg:block">
                <Image
                  src="/msr/split-owner.webp"
                  alt={`A ${city} property owner weighing how to lease their unit`}
                  fill
                  sizes="480px"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
              </div>
            </div>
            <ul className="divide-y divide-slate-200 border-t border-slate-200">
              {painPoints.items.map((p, i) => (
                <li key={p.title} className="flex gap-6 py-7">
                  <span className="font-display text-2xl font-normal italic leading-none text-brand-gold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-normal text-brand-navy sm:text-[22px]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-slate-600">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ============ SERVICE BENTO (photographic mosaic — moved up) ============ */}
      {bentoServices && bentoServices.length > 0 && (
        <section className="bg-[#FBFAF6] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                  <Eyebrow>Full-service leasing in {city}</Eyebrow>
                </div>
                <H2 className="mt-3">Every rental service, one team</H2>
              </div>
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg md:col-span-5">
                One accountable point of contact for the full leasing engine, from
                pricing and marketing through screening, the lease, and move-in.
              </p>
            </div>
            <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[210px] sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {bentoServices.map((s, i) => {
                const span =
                  i === 0
                    ? 'sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2'
                    : i === 3
                      ? 'sm:col-span-2 lg:col-span-2'
                      : 'sm:col-span-1 lg:col-span-1'
                const tiles = [
                  <BentoTile
                    key={s.href}
                    index={i}
                    variant="image"
                    className={span}
                    href={s.href}
                    tag={`0${i + 1} / Service`}
                    title={s.title}
                    summary={i === 0 ? s.description : undefined}
                    imageSrc={s.image}
                    imageAlt={`${s.title} in ${city} — MoveSmart Rentals`}
                    bodySize={i === 0 ? 'xl' : 'md'}
                  />,
                ]
                if (i === 1) {
                  tiles.push(
                    <BentoTile key="stat-lease" index={i + 1} variant="stat"
                      className="sm:col-span-1 lg:col-span-1" tag={`In ${city}`}
                      statValue="18d" statLabel="Average listing to signed lease" bg="emerald" />,
                  )
                }
                if (i === 2) {
                  tiles.push(
                    <BentoTile key="stat-fee" index={i + 1} variant="stat"
                      className="sm:col-span-1 lg:col-span-1" tag="No win, no fee"
                      statValue="$0" statLabel="Upfront — success fee only" bg="gold" />,
                  )
                }
                if (i === 4) {
                  tiles.push(
                    <BentoTile key="cta" index={i + 1} variant="cta"
                      className="sm:col-span-1 lg:col-span-1" href={primaryCta.href}
                      tag="Talk to an advisor" title="List my unit"
                      summary={`Get a free ${city} rental analysis.`} ctaLabel="Get started" bg="navy" />,
                  )
                }
                return tiles
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ DIY vs MOVESMART comparison ============ */}
      {comparison && comparison.rows.length > 0 && (
        <section className="bg-[#F6F8FB] py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Eyebrow>Self-managed vs MoveSmart</Eyebrow>
              <H2 className="mt-3">The same vacancy, two outcomes</H2>
              {comparison.intro && (
                <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
                  {comparison.intro}
                </p>
              )}
            </div>
            {/* Desktop: 3-column table */}
            <div className="mt-10 hidden overflow-hidden rounded-3xl border border-[#E3E8EF] bg-white shadow-sm sm:block">
              <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-[#E3E8EF] bg-[#0B1D3A] text-white">
                <div className="px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70">
                  &nbsp;
                </div>
                <div className="px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70">
                  Leasing it yourself
                </div>
                <div className="px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-[#10B981]">
                  With MoveSmart
                </div>
              </div>
              {comparison.rows.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-[1.3fr_1fr_1fr] items-center ${i % 2 ? 'bg-[#F8FAFC]' : 'bg-white'}`}
                >
                  <div className="px-7 py-4 text-[14.5px] font-semibold text-[#0B1D3A]">
                    {r.label}
                  </div>
                  <div className="px-6 py-4 text-center text-[14px] leading-snug text-[#5A6B82]">
                    {r.diy}
                  </div>
                  <div className="flex items-center justify-center gap-2 px-6 py-4 text-center text-[14px] font-medium leading-snug text-[#0B1D3A]">
                    <Check className="h-4 w-4 flex-none text-[#10B981]" strokeWidth={2.5} />
                    <span>{r.us}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile: stacked cards per row */}
            <div className="mt-8 space-y-4 sm:hidden">
              {comparison.rows.map((r) => (
                <div
                  key={r.label}
                  className="overflow-hidden rounded-2xl border border-[#E3E8EF] bg-white shadow-sm"
                >
                  <div className="border-b border-[#E3E8EF] bg-[#0B1D3A] px-5 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white">
                    {r.label}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-[#E3E8EF]">
                    <div className="px-5 py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        Yourself
                      </p>
                      <p className="mt-1.5 text-[14px] leading-snug text-[#5A6B82]">
                        {r.diy}
                      </p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#10B981]">
                        <Check className="h-3 w-3" strokeWidth={3} /> MoveSmart
                      </p>
                      <p className="mt-1.5 text-[14px] font-medium leading-snug text-[#0B1D3A]">
                        {r.us}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ RENT CALCULATOR (free interactive tool) ============ */}
      {showCalculator && <RentCalculator />}

      {/* ============ MARKET CONTEXT + rent-by-bed ============ */}
      {contentSections[0] && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
            <div>
              <Eyebrow>Market context</Eyebrow>
              <H2 className="mt-3">{contentSections[0].title}</H2>
              {contentSections[0].body && (
                <div className="mt-7">
                  <RichText text={contentSections[0].body} />
                </div>
              )}
            </div>
            {rentByBed && rentByBed.length > 0 && (
              <div className="self-start overflow-hidden rounded-3xl border border-[#E3E8EF] bg-[#F6F8FB]">
                <p className="px-7 pt-7 text-xs font-bold uppercase tracking-[0.12em] text-[#10B981]">
                  {city} average rent · 2026
                </p>
                <table className="mt-5 w-full text-left">
                  <thead>
                    <tr className="border-y border-[#E3E8EF] text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">
                      <th className="px-7 py-3">Unit</th>
                      <th className="py-3 text-right">Avg. rent</th>
                      <th className="px-7 py-3 text-right">YoY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentByBed.map((r) => (
                      <tr
                        key={r.label}
                        className="border-b border-[#E3E8EF] last:border-0"
                      >
                        <td className="px-7 py-4 text-[15px] font-medium text-[#2C3A4F]">
                          {r.label}
                        </td>
                        <td className="py-4 text-right font-display text-[22px] font-normal text-[#0B1D3A]">
                          {r.value}
                        </td>
                        <td className="px-7 py-4 text-right text-[14px] font-semibold text-[#10B981]">
                          {r.yoy ?? ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rentSource && (
                  <p className="px-7 py-4 text-[12px] text-[#8493A8]">
                    {rentSource}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ PROCESS — editorial numbered step flow ============ */}
      {process && process.length > 0 && (
        <section className="bg-[#FBFAF6] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                  <Eyebrow>How it works</Eyebrow>
                </div>
                <H2 className="mt-3">How we lease your {city} unit</H2>
              </div>
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg md:col-span-5">
                A documented, repeatable sequence. You see every step in your
                owner portal as it happens.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {process.map((step, i) => (
                <div
                  key={step.step}
                  className="border-t border-slate-200 pt-6"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-5xl font-normal italic leading-none text-brand-gold tabular-nums sm:text-6xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Step
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-normal leading-snug text-brand-navy sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-slate-600">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ PHOTO SPLIT 1 ============ */}
      {splitImage && contentSections[1] && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src={splitImage.src}
                alt={splitImage.alt}
                fill
                sizes="(min-width:1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <Eyebrow>What you get</Eyebrow>
              <H2 className="mt-3">{contentSections[1].title}</H2>
              {contentSections[1].body && (
                <div className="mt-6">
                  <RichText text={contentSections[1].body} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============ LOCAL RULES (compliance moat) ============ */}
      {localRules && localRules.items.length > 0 && (
        <section className="bg-[#F6F8FB] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Eyebrow>Leasing legally in Ontario</Eyebrow>
              <H2 className="mt-3">The rules that protect you</H2>
              <p className="mt-5 text-[18px] leading-relaxed text-slate-600">
                {renderInline(localRules.intro)}
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {localRules.items.map((r) => (
                <div
                  key={r.term}
                  className="rounded-2xl border border-[#E3E8EF] bg-white p-7 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1D3A]/5 text-[#0B1D3A]">
                    <ShieldCheck className="h-[22px] w-[22px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-normal text-[#0B1D3A]">
                    {r.term}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-[#5A6B82]">
                    {renderInline(r.detail)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ PHOTO SPLIT 2 (reversed) ============ */}
      {splitImage2 && contentSections[2] && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div className="order-2 lg:order-1">
              <Eyebrow>Defensible &amp; documented</Eyebrow>
              <H2 className="mt-3">{contentSections[2].title}</H2>
              {contentSections[2].body && (
                <div className="mt-6">
                  <RichText text={contentSections[2].body} />
                </div>
              )}
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-3xl shadow-lg lg:order-2">
              <Image
                src={splitImage2.src}
                alt={splitImage2.alt}
                fill
                sizes="(min-width:1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* ============ PULL QUOTE (large serif breathing moment) ============ */}
      {pullQuote && (
        <section className="bg-[#FBFAF6] py-14 sm:py-18">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span aria-hidden="true" className="mx-auto mb-7 block h-px w-12 bg-brand-gold/60" />
            <p className="font-display text-[28px] font-normal leading-[1.3] tracking-tight text-brand-navy sm:text-[36px] md:text-[42px]">
              {pullQuote.quote}
            </p>
            {pullQuote.attribution && (
              <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
                {pullQuote.attribution}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ============ PRICING ============ */}
      {pricing && pricing.cards.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Transparent pricing</Eyebrow>
              <H2 className="mt-3">Leasing fees in {city}</H2>
              <p className="mt-5 text-[18px] leading-relaxed text-slate-600">
                {renderInline(pricing.intro)}
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
              {pricing.cards.map((c) => (
                <div
                  key={c.name}
                  className={`rounded-3xl border p-8 ${
                    c.highlight
                      ? 'border-[#10B981] bg-[#0B1D3A] text-white shadow-lg'
                      : 'border-[#E3E8EF] bg-white shadow-sm'
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.12em] ${
                      c.highlight ? 'text-[#34D399]' : 'text-[#10B981]'
                    }`}
                  >
                    {c.name}
                  </p>
                  <p
                    className={`mt-4 font-display text-[34px] font-normal ${
                      c.highlight ? 'text-white' : 'text-[#0B1D3A]'
                    }`}
                  >
                    {c.price}
                  </p>
                  <p
                    className={`mt-1 text-[14px] ${
                      c.highlight ? 'text-[#AFBED8]' : 'text-[#5A6B82]'
                    }`}
                  >
                    {c.sub}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {c.feats.map((f) => (
                      <li
                        key={f}
                        className={`flex gap-2.5 text-[14.5px] ${
                          c.highlight ? 'text-white/90' : 'text-[#2C3A4F]'
                        }`}
                      >
                        <Check
                          className="mt-1 h-4 w-4 flex-none text-[#10B981]"
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Btn
                      href={c.cta.href}
                      variant={c.highlight ? 'go' : 'navy'}
                    >
                      {c.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ GUARANTEE (risk reversal) ============ */}
      {guarantee && (
        <section className="bg-[#F6F8FB] py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-[#10B981]/30 bg-white shadow-sm">
              <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
                <div className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl bg-[#10B981]/10 text-[#10B981]">
                  <ShieldCheck className="h-10 w-10" strokeWidth={1.5} />
                </div>
                <div>
                  <Eyebrow>Our promise</Eyebrow>
                  <H2 className="mt-2 !text-[26px] sm:!text-[32px]">
                    {guarantee.title}
                  </H2>
                  <p className="mt-3 text-[17px] leading-relaxed text-slate-600">
                    {renderInline(guarantee.body)}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                    {guarantee.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2 text-[15px] font-medium text-[#0B1D3A]"
                      >
                        <Check className="h-4 w-4 flex-none text-[#10B981]" strokeWidth={2.5} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ DETAILED GUIDE (remaining prose, designed) ============ */}
      {contentSections.length > 3 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Eyebrow>The detail</Eyebrow>
              <H2 className="mt-3">Everything that goes into {serviceWord ?? 'leasing'} in {city}</H2>
              <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
                Pricing, marketing, screening, cost, and renewals, broken down
                so you know exactly what we do and why it works in this market.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-3xl border border-[#E3E8EF] bg-white shadow-sm">
              {contentSections.slice(3).map((section, idx) => (
                <details
                  key={section.title}
                  open={idx === 0}
                  className="group border-b border-[#E3E8EF] last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-5 px-6 py-6 transition-colors hover:bg-[#F8FAFC] sm:px-9 sm:py-7 [&::-webkit-details-marker]:hidden">
                    <span className="font-mono text-xs text-[#10B981]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="flex-1 font-display text-[21px] font-normal leading-snug text-[#0B1D3A] sm:text-[26px]">
                      {section.title}
                    </h3>
                    <ChevronDown
                      className="h-5 w-5 flex-none text-[#5A6B82] transition-transform duration-300 group-open:rotate-180"
                      strokeWidth={2}
                    />
                  </summary>
                  {section.body && (
                    <div className="px-6 pb-9 pl-[3.25rem] sm:px-9 sm:pb-10 sm:pl-[4.5rem]">
                      <div className="max-w-prose">
                        <RichText text={section.body} />
                      </div>
                    </div>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ OWNERS / TENANTS — exact homepage section ============ */}
      <AudienceSegmentation />

      {/* ============ EXPLORE RENTALS (silo links into property types) ============ */}
      {exploreLinks && exploreLinks.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Eyebrow>Browse {city} rentals</Eyebrow>
              <H2 className="mt-3">Find the right rental in {city}</H2>
              <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
                Browse live {city} listings by property type, or see the full
                market overview for the city.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exploreLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-[#E3E8EF] bg-white px-6 py-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#10B981]/40 hover:shadow-md"
                >
                  <span>
                    <span className="block font-display text-lg font-normal text-[#0B1D3A] group-hover:text-[#10B981]">
                      {l.label}
                    </span>
                    {l.sub && (
                      <span className="mt-0.5 block text-[13.5px] text-slate-500">
                        {l.sub}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight className="h-5 w-5 flex-none text-[#10B981] opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ AREAS WE SERVE (map + districts) ============ */}
      {((neighborhoodLinks && neighborhoodLinks.length > 0) ||
        (neighborhoods && neighborhoods.length > 0)) && (
        <section className="bg-[#F6F8FB] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Eyebrow>Areas we serve</Eyebrow>
              <H2 className="mt-3">Local coverage across {city}</H2>
              <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
                A dedicated leasing page for each {city} district, with rents,
                demand and lease times specific to that pocket of the city.
              </p>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              {neighborhoodLinks && neighborhoodLinks.length > 0 ? (
                <ul className="grid grid-cols-1 self-start border-t border-[#E3E8EF] sm:grid-cols-2 sm:gap-x-10">
                  {neighborhoodLinks.map((n, i) => (
                    <li key={n.href} className="border-b border-[#E3E8EF]">
                      <Link
                        href={n.href}
                        className="group flex items-baseline gap-4 py-3.5 font-display text-lg font-normal text-[#0B1D3A] transition-colors hover:text-[#10B981]"
                      >
                        <span className="font-mono text-xs text-[#10B981]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1">{n.name}</span>
                        <span className="font-sans text-sm text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#10B981]">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 self-start border-t border-[#E3E8EF] sm:grid-cols-2 sm:gap-x-10">
                  {neighborhoods!.map((n, i) => (
                    <li
                      key={n}
                      className="flex items-baseline gap-4 border-b border-[#E3E8EF] py-3.5 font-display text-lg font-normal text-[#0B1D3A]"
                    >
                      <span className="font-mono text-xs text-[#10B981]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {n}
                    </li>
                  ))}
                </ul>
              )}
              {mapLatLng && (
                <div className="overflow-hidden rounded-3xl border border-[#E3E8EF] shadow-sm">
                  <iframe
                    title={`Map of ${city}`}
                    src={`https://maps.google.com/maps?q=${mapLatLng[0]},${mapLatLng[1]}&z=11&output=embed`}
                    loading="lazy"
                    className="h-full min-h-[340px] w-full"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============ NEARBY CITIES (suburb internal links) ============ */}
      {nearbyCities && nearbyCities.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Eyebrow>Beyond {city}</Eyebrow>
              <H2 className="mt-3">Leasing across the region</H2>
              <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
                The same leasing pipeline and standard runs across the
                surrounding cities. One point of contact for a portfolio spread
                across more than one market.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {nearbyCities.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#E3E8EF] bg-white px-5 py-2.5 text-[15px] font-medium text-[#0B1D3A] transition hover:border-[#10B981] hover:bg-[#F6F8FB]"
                >
                  {c.city}
                  <ArrowUpRight className="h-4 w-4 text-[#10B981] opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ REQUEST FORM (self-contained navy section) ============ */}
      {showForm && <RentalAnalysisForm />}

      {/* ============ FAQ ============ */}
      {faq && faq.length > 0 && (
        <FAQBlock title="Frequently asked questions" questions={faq} schemaEnabled={false} />
      )}

      {/* ============ FINAL CTA ============ */}
      <section className="py-20 sm:py-24" style={{ background: NAVY900 }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <H2 light>{closing || 'Ready to lease faster?'}</H2>
          <p className="mx-auto mt-5 max-w-xl text-[18px] leading-[1.6] text-white/75">
            Zero upfront, success-fee pricing, and a documented, compliant lease.
            One number, one accountable team.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Btn href={primaryCta.href} variant="go">
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Btn>
            <Btn href={secondaryCta.href} variant="outlineWhite">
              {secondaryCta.label}
            </Btn>
          </div>
        </div>
      </section>
    </main>
  )
}
