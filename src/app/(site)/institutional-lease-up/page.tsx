import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { FAQBlock } from '@/components/blocks/faq-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
import { SERVICES_CONTENT } from '@/data/services-content'
import {
  AssetCoverageBand,
  BoardTile,
  GanttTimeline,
  HeroKPITile,
  LiveDashboardMock,
  Reveal,
} from './institutional-client-parts'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
const PAGE_PATH = '/institutional-lease-up/'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: PAGE_PATH,
    fallbackTitle: 'Institutional Lease-Up Services | MoveSmart Rentals',
    fallbackDescription:
      'Pilot-ready leasing for institutional landlords and asset managers. Three-asset pilot, 15-day mobilization, 120-day decision point.',
  })
}

// ── Photo set (verified) ────────────────────────────────────────────────────
const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop',
  advisory:
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&auto=format&fit=crop',
  planning:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&auto=format&fit=crop',
  assetClass:
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop',
  project:
    'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1600&q=80&auto=format&fit=crop',
  portfolio:
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop',
  markets:
    'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=1600&q=80&auto=format&fit=crop',
}

// ── Hero KPI tiles (executive-style mock metrics) ───────────────────────────
const HERO_TILES: Array<{
  label: string
  value: string
  unit?: string
  delta?: string
  spark: number[]
  iconKey: string
}> = [
  {
    label: 'Pilot scope',
    value: '3',
    unit: 'assets',
    delta: 'mobilized',
    spark: [1, 1, 2, 2, 3, 3, 3, 3],
    iconKey: 'Building2',
  },
  {
    label: 'Mobilization',
    value: '15',
    unit: 'days',
    delta: 'to launch',
    spark: [22, 20, 19, 18, 17, 16, 15, 15],
    iconKey: 'Timer',
  },
  {
    label: 'Decision point',
    value: '120',
    unit: 'days',
    delta: 'KPI-based',
    spark: [30, 60, 90, 100, 110, 115, 118, 120],
    iconKey: 'Calendar',
  },
  {
    label: 'Markets',
    value: '12',
    unit: 'cities',
    delta: 'CA + US',
    spark: [4, 5, 7, 8, 9, 10, 11, 12],
    iconKey: 'Activity',
  },
]

// ── Pilot framework tiles (3-col board grid) ────────────────────────────────
const PILOT_TILES: Array<{
  iconKey: string
  tag: string
  title: string
  body: string
  dataLine: string
}> = [
  {
    iconKey: 'Briefcase',
    tag: 'Scope',
    title: '3-Asset Pilot',
    body: 'Three institutional assets in three markets — sized to give clean attribution, real comparables, and enough volume for a defensible KPI read.',
    dataLine: 'SCOPE: 3 assets · TERM: 120d · FEE: success-based',
  },
  {
    iconKey: 'Rocket',
    tag: 'Velocity',
    title: '15-Day Mobilization',
    body: 'Contract countersigned to live lead-handling in 15 days. Portal provisioning, asset data ingest, KPI threshold alignment — all inside the window.',
    dataLine: 'D0 setup · D7 audit · D15 LIVE · $0 mobilization fee',
  },
  {
    iconKey: 'Gauge',
    tag: 'Governance',
    title: '120-Day Decision Point',
    body: 'A numbers-based gate at day 120. Scale to portfolio, refine the operating model, or stop — measured against thresholds agreed before launch.',
    dataLine: 'D120 review · KPI thresholds · no obligation',
  },
]

// ── Gantt phases ─────────────────────────────────────────────────────────────
const GANTT_PHASES: Array<{
  label: string
  week: string
  weight: number
  tone: 'gold' | 'emerald' | 'navy'
  detail: string
}> = [
  { label: 'Setup & intake', week: 'W0', weight: 1, tone: 'gold', detail: 'Contracts, portal access, asset data, sponsor onboarding.' },
  { label: 'Audit & KPI lock', week: 'W1–W2', weight: 1, tone: 'gold', detail: 'Unit-by-unit audit, baseline review, threshold alignment.' },
  { label: 'Live mobilization', week: 'W3–W4', weight: 1.5, tone: 'emerald', detail: 'Lead handling live across all 3 pilot assets, in-portal.' },
  { label: 'Monthly cadence', week: 'W5–W16', weight: 3.5, tone: 'emerald', detail: 'Live KPIs, monthly executive review, pricing tuning.' },
  { label: 'Decision', week: 'W17', weight: 1, tone: 'navy', detail: 'Numbers-based gate: scale, refine, or stop.' },
]

// ── Asset coverage cells ─────────────────────────────────────────────────────
const ASSET_CELLS: Array<{ kind: string; note: string }> = [
  { kind: 'Purpose-built', note: 'New-build multi-residential at lease-up.' },
  { kind: 'Condo PRS', note: 'Owned-condo portfolios consolidated under one operator.' },
  { kind: 'Townhouse', note: 'Suburban townhome inventory at portfolio scale.' },
  { kind: 'Mixed-use', note: 'Retail-podium residential, jurisdictional templates.' },
]

// ── Why-operators-choose-us callouts ────────────────────────────────────────
const PROOF_COLUMNS: Array<{
  title: string
  body: string
  eyebrow: string
}> = [
  {
    eyebrow: 'Operating model',
    title: 'Buy output, not headcount',
    body: 'Starlight, Greenwin and Realstar pattern: no internal leasing payroll, no recruiter cost, no benefits or manager-of-managers tier. One operator, delivered as a service.',
  },
  {
    eyebrow: 'Accountability',
    title: 'One operator, one team',
    body: 'A single leasing lead, single ops team, single escalation path for the asset manager. The same operator runs every asset in the pilot — attribution stays clean.',
  },
  {
    eyebrow: 'Cross-border',
    title: 'CAD & USD inventory',
    body: 'Built for operators with mixed Canadian and U.S. portfolios. Jurisdiction-specific lease templates, unified KPI reporting, one program lead across both currencies.',
  },
]

// ── Pricing spec table (investment-policy style) ────────────────────────────
const PRICING_ROWS: Array<{ k: string; v: string }> = [
  { k: 'Engagement type', v: 'Pilot — 3 assets, 120 days' },
  { k: 'Term', v: '120 days · monthly executive review' },
  { k: 'Fee structure (Option A)', v: '1 month rent / successful lease · ad costs included' },
  { k: 'Fee structure (Option B)', v: '70% of 1 month rent / lease · owner funds ad spend at cost' },
  { k: 'Mobilization fee', v: '$0 · no setup or platform charge' },
  { k: 'Reporting cadence', v: 'Live in portal · monthly executive pack' },
  { k: 'Decision gate', v: 'Day 120 · numbers-based scale / refine / stop' },
  { k: 'Internal payroll required', v: 'None · no salaries, recruiter, benefits or overhead' },
]

// ── FAQs sourced from services content, slim subset ─────────────────────────
const INST = SERVICES_CONTENT['institutional-lease-up']
const FAQ_ITEMS = INST?.faqItems ?? []

export default async function InstitutionalLeaseUpPage() {
  const breadcrumbCrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Institutional Lease-Up', href: PAGE_PATH },
  ]

  const breadcrumbSchema = buildBreadcrumbListSchema({
    crumbs: breadcrumbCrumbs.map((c) => ({
      name: c.label,
      url: `${SITE_URL}${c.href}`,
    })),
  })

  return (
    <main className="bg-brand-navy">
      <JsonLd data={breadcrumbSchema} />

      {/* ─── Breadcrumb (on dark) ─────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8 [&_a]:text-white/70 [&_a:hover]:text-white [&_li]:text-white/50 [&_span]:text-white">
        <BreadcrumbNav crumbs={breadcrumbCrumbs} />
      </div>

      {/* ─── EXECUTIVE KPI HERO ──────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy pb-20 pt-10 text-white sm:pb-28 sm:pt-14">
        {/* Soft background ambience */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-32 top-10 size-[520px] rounded-full bg-brand-emerald/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 bottom-0 size-[440px] rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16 lg:px-8">
          {/* Left: headline column */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-gold">
              <span aria-hidden="true" className="block size-1.5 rounded-full bg-brand-gold" />
              Institutional Lease-Up · Boardroom Brief
            </p>
            <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[56px]">
              A controlled pilot to measurably improve{' '}
              <span className="font-display italic text-brand-emerald">
                leasing velocity
              </span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h1>
            <p className="mt-3 max-w-xl font-display text-lg italic text-white/70 sm:text-xl">
              Three assets. 120 days. One decision.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-[17px]">
              Pilot-ready leasing for institutional landlords, REITs and asset managers. A 15-day mobilization, a live KPI portal from day one, and a numbers-based decision point at day 120 — scale, refine, or stop.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact/?type=institutional"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-emerald/25 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-xl"
              >
                Request Pilot Brief
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact/?intent=call"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Talk to a Director
              </Link>
            </div>

            {/* Sub-meta strip — mono, data feel */}
            <dl className="mt-10 grid grid-cols-3 gap-x-6 gap-y-3 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:max-w-xl">
              <div>
                <dt className="text-brand-gold">Coverage</dt>
                <dd className="mt-1 text-white">CA · US</dd>
              </div>
              <div>
                <dt className="text-brand-gold">Reporting</dt>
                <dd className="mt-1 text-white">Live · Monthly</dd>
              </div>
              <div>
                <dt className="text-brand-gold">Internal cost</dt>
                <dd className="mt-1 text-white">$0 payroll</dd>
              </div>
            </dl>
          </div>

          {/* Right: KPI tile cluster */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_40px_100px_-40px_rgba(8,18,40,0.55)] sm:p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  Pilot snapshot · Q2-26
                </p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-emerald">
                  <span aria-hidden="true" className="block size-1.5 rounded-full bg-brand-emerald shadow-[0_0_6px_rgba(15,142,107,0.7)]" />
                  Live
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {HERO_TILES.map((t, i) => (
                  <HeroKPITile
                    key={t.label}
                    index={i}
                    label={t.label}
                    value={t.value}
                    unit={t.unit}
                    delta={t.delta}
                    spark={t.spark}
                    iconKey={t.iconKey}
                  />
                ))}
              </div>
              <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Source: pilot framework · indicative metrics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PILOT FRAMEWORK · 3-col board grid ─────────────────────── */}
      <section className="relative isolate overflow-hidden bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Pilot framework
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Three commitments. One{' '}
                <span className="font-display italic text-brand-emerald">accountable</span> operator
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Built for the asset-management committee. Each pillar is sized, measured and reported against an agreed threshold — not against opinion.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILOT_TILES.map((t, i) => (
              <BoardTile
                key={t.title}
                index={i}
                iconKey={t.iconKey}
                tag={t.tag}
                title={t.title}
                body={t.body}
                dataLine={t.dataLine}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT GANTT TIMELINE ──────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-slate-100 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Engagement timeline
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                From T-0 to{' '}
                <span className="font-display italic text-brand-emerald">decision</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                A Gantt-style view of the 120-day pilot — every phase, every cadence, every milestone in one strip. Phase bars are sized by working duration.
              </p>
            </div>
          </Reveal>

          <div className="mt-12">
            <GanttTimeline phases={GANTT_PHASES} />
          </div>
        </div>
      </section>

      {/* ─── LIVE KPI DASHBOARD MOCKUP (centerpiece) ────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute -left-40 top-20 size-[520px] rounded-full bg-brand-emerald/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 bottom-0 size-[440px] rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
                Executive console
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                A live KPI dashboard,{' '}
                <span className="font-display italic text-brand-emerald">from day one</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Occupancy, days-to-lease, pipeline and conversion — by asset, by market, by week. The same console the asset team and the executive sponsor share in the monthly review.
              </p>
            </div>
          </Reveal>

          <div className="mt-12">
            <LiveDashboardMock />
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
            Mock data shown for illustration · live pilot data replaces on Day 15
          </p>
        </div>
      </section>

      {/* ─── ASSET COVERAGE BAND ────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AssetCoverageBand
            cells={ASSET_CELLS}
            imageSrc={PHOTO.portfolio}
            imageAlt="Multi-unit residential portfolio asset coverage"
          />
        </div>
      </section>

      {/* ─── WHY OPERATORS CHOOSE US · 3-col McKinsey-style ────────── */}
      <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Why institutional operators choose us
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                The pattern{' '}
                <span className="font-display italic text-brand-emerald">institutional peers</span> already run
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                The Starlight, Greenwin and Realstar shape: lean leasing organizations buying delivered leases at portfolio scale.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {PROOF_COLUMNS.map((c, i) => (
              <Reveal key={c.title} index={i} className="relative">
                <span aria-hidden="true" className="block h-[2px] w-12 bg-brand-gold" />
                <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {c.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-[26px]">
                  {c.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  {c.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXECUTIVE TESTIMONIAL · large serif pull-quote ─────────── */}
      <section className="relative isolate overflow-hidden bg-[#FBFAF6] py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <Reveal>
            <span
              aria-hidden="true"
              className="font-display text-7xl leading-none text-brand-gold/40 sm:text-8xl"
            >
              &ldquo;
            </span>
            <blockquote className="mt-2 font-display text-2xl font-normal leading-[1.35] tracking-tight text-brand-navy sm:text-3xl md:text-[34px]">
              They came in as a pilot and gave us a measurable answer in a quarter. Three assets, one operator, one report — exactly what an investment committee can sign off against.
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-brand-gold/40">
                <Image
                  src={PHOTO.hero}
                  alt="Institutional asset manager"
                  fill
                  sizes="56px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="text-left">
                <p className="font-display text-base text-brand-navy">
                  Director, Asset Management
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Institutional landlord · GTA
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICING · investment-policy style specs table ──────────── */}
      <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Engagement specs
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Pricing &{' '}
                <span className="font-display italic text-brand-emerald">structure</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Two success-based fee options. Both tied to delivered leases, both with zero mobilization fee, both reported live in the portal.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div
              aria-hidden="true"
              className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
            />
            <dl className="divide-y divide-slate-200">
              {PRICING_ROWS.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-12 sm:gap-6 sm:px-8"
                >
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:col-span-4">
                    {row.k}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-brand-navy sm:col-span-8">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Under either option · no leasing payroll, salaries, recruiter or benefits cost to owner
          </p>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────── */}
      {FAQ_ITEMS.length > 0 && (
        <section className="relative isolate overflow-hidden bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <FAQBlock
              title="Executive FAQ"
              questions={FAQ_ITEMS}
              schemaEnabled
              showQuestionsCta={false}
            />
          </div>
        </section>
      )}

      {/* ─── FINAL DARK CTA ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-0 size-[420px] rounded-full bg-brand-emerald/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 bottom-0 size-[420px] rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />

        <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                Ready to mobilize
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                Test a controlled leasing model,{' '}
                <span className="font-display italic text-brand-emerald">no internal payroll</span>{' '}
                required
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Three assets, 15-day mobilization, 120-day decision point. We&apos;ll send a pilot brief with proposed KPI thresholds and engagement plan within two business days.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
              <Link
                href="/contact/?type=institutional"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-emerald/20 transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-xl md:w-auto"
              >
                Request Pilot Brief
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact/?intent=call"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 md:w-auto"
              >
                Talk to a Director
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
