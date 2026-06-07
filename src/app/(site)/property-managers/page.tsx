import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
import {
  Reveal,
  PillarCard,
  PainPointCard,
  WhiteLabelPicker,
  WorkflowStep,
  ParallaxImageBand,
  IntegrationCard,
  PricingCard,
  ComparisonTable,
  CaseStudyCard,
  KpiCard,
  FloatingBadge,
} from './property-managers-client-parts'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const PAGE_PATH = '/property-managers/'
const PAGE_TITLE = 'Outsourced Leasing for Property Managers'
const PAGE_DESCRIPTION =
  'Outsource the leasing operation, keep the management contract. White-label leasing-as-a-service for PM firms: 24/7 lead capture, structured screening, lease execution via our RECO-registered partner brokerage, and PMS-integrated handoff to your ongoing ops.'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: PAGE_PATH,
    fallbackTitle: PAGE_TITLE,
    fallbackDescription: PAGE_DESCRIPTION,
  })
}

/* ────────────────────────────────────────────────────────────────────
 *  THREE PILLARS
 * ──────────────────────────────────────────────────────────────────── */
const PILLARS: Array<{
  iconKey: string
  tag: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}> = [
  {
    iconKey: 'Layers',
    tag: 'One operator',
    title: 'One accountable team, end to end',
    description:
      'Listing setup, lead capture, tour booking, showings, screening, lease execution, deposit collection, and move-in handoff — run by one team with one escalation path. No vendor stack to manage.',
    imageSrc:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Outsourced leasing operations team coordinating portfolio activity',
  },
  {
    iconKey: 'ClipboardCheck',
    tag: 'Structured qualification',
    title: 'Documented screening, every applicant',
    description:
      'Credit, income, employment, references, rental history — every applicant runs through a structured, RTA-compliant screen with a defensible audit trail visible per file in your portal.',
    imageSrc:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Leasing professional reviewing structured applicant screening file',
  },
  {
    iconKey: 'Eye',
    tag: 'Audit any lead',
    title: 'Full transparency, no black box',
    description:
      'Every call logged with transcript, every text and email archived, every showing GPS-confirmed. Drill into any lead end to end, any unit, any time — and white-label the report to your owner.',
    imageSrc:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Leasing dashboard with live KPIs and per-lead drilldown',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  PAIN POINTS / FRICTION
 * ──────────────────────────────────────────────────────────────────── */
const PAIN_POINTS: Array<{
  iconKey: string
  tag: string
  imageSrc: string
  imageAlt: string
  problem: string
  solution: string
}> = [
  {
    iconKey: 'DollarSign',
    tag: 'Volatile leasing payroll',
    imageSrc:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Property manager reviewing leasing payroll and budget allocation',
    problem:
      'You staff up for spring turnover, then carry the team through low season. A fully-loaded GTA leasing agent is $85–105K with RECO dues, E&O, and software — even when units sit quiet.',
    solution:
      'Variable per-lease success fee. You only pay when we deliver an executed lease. Fixed overhead becomes a per-unit line item the owner sees on the invoice.',
  },
  {
    iconKey: 'Users',
    tag: 'Leasing agent turnover',
    imageSrc:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Empty desk after leasing agent turnover at a property management office',
    problem:
      'Leasing-consultant turnover runs 50–80% annually. Every churn means 60–90 days of recruiting, RECO licensing verification, PMS retraining, and lost portfolio knowledge.',
    solution:
      'You contract with the firm, not the individual. Coverage is continuous. Onboarding, licensing, training, and retention are our line items — never yours.',
  },
  {
    iconKey: 'Clock',
    tag: 'After-hours leads lost',
    imageSrc:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'After-hours rental inquiry coming in on a mobile phone screen',
    problem:
      '60–65% of rental inquiries land outside 9–5 hours. The 5-minute response converts 9× better than the 1-hour response. Most internal teams are M–F daytime only.',
    solution:
      'Live first-touch in under 5 minutes, including evenings, weekends, and stat holidays. Multilingual coverage by default. Tour booked while the prospect is still warm.',
  },
  {
    iconKey: 'Cable',
    tag: 'Stack fragmentation',
    imageSrc:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Property management software dashboard with multiple integrated tools',
    problem:
      'Yardi + RentCafe + ShowMojo + a screening vendor + a CRM. Each handoff loses data. Each tool has a separate bill, contract, and renewal date.',
    solution:
      'One operator with native sync to Yardi, AppFolio, Buildium, Entrata, and RealPage. Guest cards, screening files, and signed leases flow back to your system of record.',
  },
  {
    iconKey: 'ShieldCheck',
    tag: 'Compliance exposure',
    imageSrc:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compliance documentation and TRESA-registered lease paperwork',
    problem:
      'Every Ontario leasing activity for compensation requires RECO registration under TRESA 2002. Multi-state US operators juggle 5–15 different licensing regimes. Mistakes invite regulator action.',
    solution:
      'RECO-registered partner brokerage with broker-of-record coverage in every state where we operate. FINTRAC verification on deposit handling. Trust-accounted, audit-ready.',
  },
  {
    iconKey: 'TrendingUp',
    tag: 'BD capacity ceiling',
    imageSrc:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Property management business development pitch meeting',
    problem:
      'You can&apos;t honestly promise lease-up capacity for a 200-unit takeover bid when your internal team is already at capacity on the existing book.',
    solution:
      'Surge capacity available on 15-day mobilization. Bid bigger takeovers with confidence. Lease them up, hand them back to your ongoing PM team at stabilization.',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  WHITE-LABEL MODELS
 * ──────────────────────────────────────────────────────────────────── */
const WHITE_LABEL_MODELS: Array<{
  key: string
  badge: string
  title: string
  summary: string
  points: string[]
  imageSrc: string
  imageAlt: string
}> = [
  {
    key: 'behind-the-scenes',
    badge: 'Model A',
    title: 'Behind the scenes',
    summary:
      'Our agents work under your brand. Owners and tenants never see MoveSmart — only your company.',
    points: [
      'Emails sent from `@yourcompany.com` aliases',
      'Calls answered as your team',
      'Showings booked under your brand',
      'Owner portal reports under your logo',
      'Standard non-solicit + non-circumvent in every MSA',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'White-label leasing operations branded under the property manager identity',
  },
  {
    key: 'co-branded',
    badge: 'Model B',
    title: 'Co-branded',
    summary:
      '"Leasing powered by MoveSmart" — used when you want to flex tech sophistication to owners as a differentiator.',
    points: [
      'Joint email signatures and footers',
      '"Powered by" credit on owner reports',
      'Tech-stack credibility for BD pitches',
      'Same workflow as behind-the-scenes',
      'Owner sees a modern operator partnership',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Co-branded leasing operations report on a laptop',
  },
  {
    key: 'fully-white-label',
    badge: 'Model C',
    title: 'Fully white-label stack',
    summary:
      'We provide the lead-capture site, chatbot, and booking tools under your domain — leasing infrastructure as a service.',
    points: [
      'Custom subdomain (lease.yourcompany.com)',
      'Your brand, your colours, your copy',
      'Your booking calendar, our agents',
      'Fully owned data + tenant relationships',
      'Best for tech-forward operators',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Property management firm branded leasing portal on a laptop',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  8-STEP WORKFLOW
 * ──────────────────────────────────────────────────────────────────── */
const WORKFLOW_STEPS: Array<{
  window: string
  title: string
  description: string
  bullets: string[]
  imageSrc: string
  imageAlt: string
}> = [
  {
    window: 'Day 1–7',
    title: 'Portfolio onboarding',
    description:
      'Unit inventory imported from your PMS, pricing strategy reviewed, brand and tone calibrated to match your owner voice, lease templates aligned per province/state.',
    bullets: [
      'Unit roster + amenity intake',
      'Pricing baseline review',
      'Brand and tone calibration',
      'Lease template alignment',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Portfolio onboarding session with property data review',
  },
  {
    window: 'Day 7–10',
    title: 'PMS integration live',
    description:
      'API or SFTP feed configured to Yardi Voyager / Breeze, AppFolio, Buildium, Entrata, or RealPage. Test guest-card flow validated end to end before launch.',
    bullets: [
      'API or SFTP guest-card feed',
      'Lease export to your PMS',
      'Source attribution mapping',
      'Owner portal sync verified',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'PMS integration dashboard showing live data flow',
  },
  {
    window: 'Day 10–15',
    title: 'Multi-channel listing distribution',
    description:
      'Kijiji, Zumper, PadMapper, Rentals.ca, Realtor.ca, Facebook Marketplace plus 50+ rental portals. Editorial copy + professional photo refresh where needed.',
    bullets: [
      '50+ rental portals + MLS',
      'Editorial copy refresh',
      'Photo + virtual-tour audit',
      'Same-day relisting on changes',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Rental listing syndication dashboard with multi-portal distribution',
  },
  {
    window: 'Active leasing',
    title: '24/7 lead capture',
    description:
      'AI-assisted first response in under 60 seconds, live agent handoff for qualified leads, structured intake on the first conversation. No lead waits till morning.',
    bullets: [
      'Sub-60s first response',
      'Live agent handoff',
      'Multilingual coverage',
      'CRM-attributed by source',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80',
    imageAlt: '24/7 lead capture and live agent handoff for rental inquiries',
  },
  {
    window: 'Tour cadence',
    title: 'Tour booking + showings',
    description:
      'Self-show with smart locks or live-show with our local agent network. GPS-attested attendance. Video tour for distance prospects. Same-day slotting where possible.',
    bullets: [
      'Self-show or live-show',
      'GPS-attested attendance',
      'Video tour for distance',
      'Same-day slot availability',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Leasing professional showing a rental unit to qualified applicant',
  },
  {
    window: 'Application',
    title: 'Structured applicant screening',
    description:
      'Credit pull, income verification (Plaid/Inverite), landlord references, employment confirmation, RTA-compliant question set, decision in under 72 hours.',
    bullets: [
      'Plaid/Inverite income verify',
      'Multi-bureau credit pull',
      'RTA-compliant Q&A only',
      '<72hr decision cycle',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Applicant screening review and credit verification workflow',
  },
  {
    window: 'Lease execution',
    title: 'E-signed lease + deposit',
    description:
      'lease execution via our RECO-registered partner brokerage, first month + LMR collected in trust on signing, all docs e-signed and timestamped, full file pushed back to your PMS.',
    bullets: [
      'execution via our RECO-registered partner brokerage',
      'Trust-accounted deposits',
      'E-signed + timestamped',
      'Full file to your PMS',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'E-signed lease execution and deposit collection workflow',
  },
  {
    window: 'Handoff',
    title: 'Keys + move-in to your team',
    description:
      'At lease execution we transfer the tenant record, screening file, signed lease, deposit ledger, and move-in checklist back to your PMS. Your ops team owns the rest.',
    bullets: [
      'Tenant file packaged',
      'Move-in inspection scheduled',
      'Deposit ledger reconciled',
      'Welcome kit + key handover',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Keys handed over to new tenant at move-in handoff',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  PMS INTEGRATIONS
 * ──────────────────────────────────────────────────────────────────── */
const INTEGRATIONS: Array<{
  name: string
  initial: string
  description: string
}> = [
  {
    name: 'Yardi Voyager / Breeze',
    initial: 'Y',
    description:
      'ILS feed via RentCafe, guest-card sync via Yardi API, lease docs pushed back via Voyager.',
  },
  {
    name: 'AppFolio',
    initial: 'A',
    description:
      'Inbound lead webhook + Property Manager API. Screening results auto-attach to applicant.',
  },
  {
    name: 'Entrata',
    initial: 'E',
    description:
      'ProspectPortal integration, native CRM sync, lease-to-move-in handoff workflow.',
  },
  {
    name: 'Buildium',
    initial: 'B',
    description:
      'API + Zapier push of signed lease and tenant profile to ongoing management record.',
  },
  {
    name: 'RealPage OneSite',
    initial: 'R',
    description:
      'ILS data feed and Lead2Lease workflow integration for enterprise-scale portfolios.',
  },
  {
    name: 'DoorLoop',
    initial: 'D',
    description:
      'Native API push of guest cards, screening, and signed leases for SMB operators.',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  LIVE KPI TILES
 * ──────────────────────────────────────────────────────────────────── */
const KPI_TILES: Array<{
  iconKey: string
  title: string
  description: string
  metric: string
}> = [
  {
    iconKey: 'Clock',
    title: 'Response time',
    description: 'First-touch latency across web, MLS, portals, broker.',
    metric: '<5m',
  },
  {
    iconKey: 'Activity',
    title: 'Lead volume',
    description: 'Total inbound by source and hourly cohort.',
    metric: '24/7',
  },
  {
    iconKey: 'TrendingUp',
    title: 'Days to lease',
    description: 'List-to-signed average per unit type and asset.',
    metric: '~17d',
  },
  {
    iconKey: 'DollarSign',
    title: 'Cost per lease',
    description: 'Blended marketing + leasing spend per signed lease.',
    metric: 'Live',
  },
  {
    iconKey: 'Users',
    title: 'Conversion rate',
    description: 'Lead-to-tour-to-lease funnel by source.',
    metric: '9–12%',
  },
  {
    iconKey: 'ShieldCheck',
    title: 'Tenant quality',
    description: 'Delinquency at 6 / 12 months on placed tenants.',
    metric: '<3%',
  },
  {
    iconKey: 'Eye',
    title: 'Owner reports',
    description: 'Auto-generated, white-labelled, owner-ready.',
    metric: 'Weekly',
  },
  {
    iconKey: 'Building2',
    title: 'Portfolio coverage',
    description: 'Same workflow across every door under management.',
    metric: '100%',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  PRICING MODELS
 * ──────────────────────────────────────────────────────────────────── */
const PRICING_MODELS: Array<{
  badge: string
  title: string
  headlinePrice: string
  subline: string
  description: string
  bullets: string[]
  featured?: boolean
  imageSrc: string
  imageAlt: string
}> = [
  {
    badge: 'Pay on outcome',
    title: 'Per-lease success fee',
    headlinePrice: '50–100%',
    subline: 'Of one month’s rent · per signed lease',
    description:
      'You only pay when we deliver an executed lease. Best for variable turnover portfolios and PM firms running tight margins.',
    bullets: [
      'No retainer, no setup',
      'Full leasing scope included',
      'White-label by default',
      'Cancel any time',
    ],
    featured: true,
    imageSrc:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Per-lease success-fee model — keys handed over after signed lease',
  },
  {
    badge: 'Predictable spend',
    title: 'Per-door monthly retainer',
    headlinePrice: '$8–15',
    subline: 'Per door · per month',
    description:
      'Predictable monthly cost scales with portfolio size. Best for stabilized portfolios with steady turnover and forecasted leasing volume.',
    bullets: [
      'Predictable monthly invoice',
      'Includes all listing + marketing',
      'Scales with portfolio',
      'Volume-tiered pricing',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Stabilized residential portfolio under per-door retainer model',
  },
  {
    badge: 'Hybrid',
    title: 'Reduced retainer + success fee',
    headlinePrice: 'Custom',
    subline: 'Lower retainer · reduced success fee',
    description:
      'Best for mixed portfolios with both stabilized assets and active turnover. Calibrated to your historical leasing cost per door.',
    bullets: [
      'Lower fixed monthly base',
      'Reduced per-lease success fee',
      'Custom volume bands',
      'Quarterly true-up review',
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Mixed portfolio of residential buildings under hybrid pricing',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  COMPARISON ROWS
 * ──────────────────────────────────────────────────────────────────── */
const COMPARISON_ROWS = [
  {
    label: 'Coverage',
    internal: { text: 'M–F 9–6, voicemail evenings + weekends', tone: 'bad' as const },
    movesmart: { text: '24/7 across calls, texts, email, chat', tone: 'good' as const },
  },
  {
    label: 'Cost structure',
    internal: { text: '~$85–105K loaded per agent + benefits + RECO + E&O', tone: 'bad' as const },
    movesmart: { text: 'Per-lease success fee or per-door retainer', tone: 'good' as const },
  },
  {
    label: 'Visibility',
    internal: { text: 'Reports lag days, fragmented across 4–5 tools', tone: 'bad' as const },
    movesmart: { text: 'Live portal refreshed continuously, drill-down per lead', tone: 'good' as const },
  },
  {
    label: 'Compliance',
    internal: { text: 'You manage RECO + TRESA + E&O + FINTRAC', tone: 'bad' as const },
    movesmart: { text: 'RECO-registered partner brokerage, trust-accounted, audit-ready', tone: 'good' as const },
  },
  {
    label: 'Hiring + retention',
    internal: { text: '50–80% leasing-consultant turnover, 60–90 day backfill', tone: 'bad' as const },
    movesmart: { text: 'You contract with the firm, never the individual', tone: 'good' as const },
  },
  {
    label: 'Surge capacity',
    internal: { text: 'Limited to current headcount', tone: 'neutral' as const },
    movesmart: { text: '15-day mobilization for takeover bids', tone: 'good' as const },
  },
  {
    label: 'Tech stack',
    internal: { text: 'Yardi + RentCafe + ShowMojo + CRM + screening vendor', tone: 'neutral' as const },
    movesmart: { text: 'One operator, native sync to your PMS', tone: 'good' as const },
  },
  {
    label: 'Owner reporting',
    internal: { text: 'Manual pull, weekly admin drag', tone: 'bad' as const },
    movesmart: { text: 'White-labelled, auto-generated, owner-ready', tone: 'good' as const },
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  CASE STUDIES (anonymous patterns)
 * ──────────────────────────────────────────────────────────────────── */
const CASE_STUDIES: Array<{
  badge: string
  headline: string
  body: string
  metrics: Array<{ value: string; label: string }>
  imageSrc: string
  imageAlt: string
}> = [
  {
    badge: 'GTA · 2,100 doors',
    headline: 'Dissolved internal leasing team after 12-month pilot',
    body: 'A mid-market PM running 2,100 doors across 14 buildings closed their 4-person internal leasing team. Days-to-lease dropped from 28 to 17. Annual payroll savings: $380K. Vacancy NOI recovery: $310K.',
    metrics: [
      { value: '−11d', label: 'Days to lease' },
      { value: '$690K', label: 'Annual save' },
      { value: '+18', label: 'Owner NPS' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Stabilized residential portfolio under outsourced leasing',
  },
  {
    badge: 'Regional · 240u takeover',
    headline: 'Surge capacity on a 30-day takeover bid',
    body: 'A regional PM won a 240-unit takeover but couldn’t hire in 30 days. MoveSmart provided burst capacity: 240 units leased in 11 weeks at 22-day average days-to-market. Repeated on 3 more takeovers.',
    metrics: [
      { value: '11wk', label: 'To stabilize' },
      { value: '22d', label: 'Days on market' },
      { value: '0', label: 'Hires needed' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Mid-rise residential building taken over by regional property manager',
  },
  {
    badge: 'Multi-province PM',
    headline: 'Killed compliance overhead across ON, QC, BC',
    body: 'A PM expanding into Quebec and BC faced 3 different licensing regimes. Outsourced all leasing to MoveSmart’s licensed brokers in each province. Re-deployed savings into 600 new doors of management contract.',
    metrics: [
      { value: '3', label: 'Provinces' },
      { value: '+600', label: 'Doors won' },
      { value: '0', label: 'E&O claims' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Cross-province PM operations with licensed brokers in multiple jurisdictions',
  },
]

/* ────────────────────────────────────────────────────────────────────
 *  CREDENTIALS STRIP
 * ──────────────────────────────────────────────────────────────────── */
const CREDENTIALS: Array<{ label: string; detail: string }> = [
  { label: 'RECO', detail: 'Registered brokerage' },
  { label: 'TRESA 2002', detail: 'Compliant disclosure' },
  { label: 'FINTRAC', detail: 'Deposit verification' },
  { label: 'PIPEDA', detail: 'Tenant data residency' },
  { label: 'E&O', detail: '$2M aggregate' },
  { label: 'Non-solicit', detail: 'Owner-relationship locked' },
]

export default async function PropertyManagersPage() {
  const breadcrumbCrumbs = [
    { label: 'Home', href: '/' },
    { label: 'For Property Managers', href: PAGE_PATH },
  ]

  const breadcrumbSchema = buildBreadcrumbListSchema({
    crumbs: breadcrumbCrumbs.map((c) => ({
      name: c.label,
      url: `${SITE_URL}${c.href}`,
    })),
  })

  return (
    <main>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <BreadcrumbNav crumbs={breadcrumbCrumbs} />
      </div>

      {/* ─── 01. HERO ──────────────────────────────────────────────── */}
      <PageHeroBlock
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Property manager reviewing leasing operations on a laptop"
        kicker="For Property Managers"
        eyebrow="Outsourced leasing-as-a-service"
        headline="Outsource leasing. Keep the management contract"
        lede="White-label leasing for third-party PM firms: 24/7 lead capture, structured screening, lease execution via our RECO-registered partner brokerage, and a clean PMS handoff back to your ongoing ops team. You keep the owner. We deliver the leases."
        cta1={{ label: 'Talk to an operator', href: '/contact/?type=property-manager' }}
        cta2={{ label: 'See pricing models', href: '/pricing/' }}
        aside={
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-2xl shadow-black/30 ring-1 ring-white/10">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80"
              alt="Property operations team monitoring leasing KPIs from a workspace"
              fill
              unoptimized
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-brand-navy/45 via-transparent to-transparent"
            />
            <FloatingBadge
              iconKey="Clock"
              title="Response"
              value="<5 minutes"
              delay={0.5}
              className="absolute -left-4 top-6 hidden rounded-2xl border border-white/40 bg-white/95 p-4 shadow-xl shadow-black/30 backdrop-blur sm:block"
            />
            <FloatingBadge
              iconKey="ShieldCheck"
              title="Brokerage"
              value="RECO registered"
              delay={0.7}
              className="absolute -right-4 bottom-24 hidden rounded-2xl border border-white/40 bg-white/95 p-4 shadow-xl shadow-black/30 backdrop-blur sm:block"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-lg bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
              <p className="font-display text-base italic leading-tight text-brand-navy">
                One operator. One accountable team.
              </p>
            </div>
          </div>
        }
      />

      {/* ─── 02. THREE PILLARS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                How it works
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Leasing as output, not as a{' '}
                <span className="font-display italic text-brand-emerald">department</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Three commitments built into every PM engagement. Run the same way across every
                door under management — and every owner you report to.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-3">
            {PILLARS.map((p, idx) => (
              <PillarCard
                key={p.title}
                index={idx}
                iconKey={p.iconKey}
                tag={p.tag}
                title={p.title}
                description={p.description}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04. PARALLAX BAND ──────────────────────────────────────── */}
      <ParallaxImageBand
        imageSrc="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Toronto skyline at dusk with residential towers"
        overlayKicker="The operator pattern"
        overlayTitle="You keep the owner. We deliver the leases."
        overlayBody="MoveSmart never solicits your owners, never identifies to them without permission, and contractual non-solicit is standard in every MSA. Your management contract is yours. The leasing operation runs in the background."
      />

      {/* ─── 05. WHITE-LABEL MODEL PICKER ───────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                White-label models
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Three ways to wear your{' '}
                <span className="font-display italic text-brand-emerald">brand</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Behind-the-scenes, co-branded, or fully white-label. Same workflow underneath.
                Pick the model that fits your owner relationship.
              </p>
            </div>
          </Reveal>

          <WhiteLabelPicker options={WHITE_LABEL_MODELS} />
        </div>
      </section>

      {/* ─── 06. FRICTION / PAIN POINTS ─────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Where leasing breaks for PMs
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Six frictions every PM firm{' '}
                <span className="font-display italic text-brand-emerald">already knows</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                You didn&apos;t start your firm to run a leasing call centre. Each of these six is
                a real line item against your margin — and each one is a workflow we own end to
                end.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PAIN_POINTS.map((p, idx) => (
              <PainPointCard
                key={p.tag}
                index={idx}
                iconKey={p.iconKey}
                tag={p.tag}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
                problem={p.problem}
                solution={p.solution}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 07. 8-STEP WORKFLOW ────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Engagement workflow
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Eight steps from PMS sync to{' '}
                <span className="font-display italic text-brand-emerald">key handoff</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Onboarding to executed lease. Each step has a defined owner, a clean handoff, and
                a milestone visible in your portal.
              </p>
            </div>
          </RevealOnScroll>

          <ol className="space-y-6 sm:space-y-8">
            {WORKFLOW_STEPS.map((step, idx) => (
              <WorkflowStep
                key={step.title}
                index={idx}
                window={step.window}
                title={step.title}
                description={step.description}
                bullets={step.bullets}
                imageSrc={step.imageSrc}
                imageAlt={step.imageAlt}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 08. LIVE KPI DARK BAND ─────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-navy/92 to-brand-navy/85" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.08] blur-3xl" />
        </div>

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
            <div className="mb-14 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
                Live portal
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                The KPIs your{' '}
                <span className="font-display italic text-brand-emerald">owners</span> actually
                ask about
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
                Eight live signals, one screen. Auto-generated weekly owner reports under your
                logo. Drill into any lead, any unit, any time.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KPI_TILES.map((tile, idx) => (
              <KpiCard
                key={tile.title}
                index={idx}
                iconKey={tile.iconKey}
                title={tile.title}
                description={tile.description}
                metric={tile.metric}
              />
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                Owner reports auto-build under your brand. Send them weekly without lifting a
                finger.
              </p>
              <Link
                href="/portal-and-technology/"
                className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-5 py-2.5 text-sm font-semibold text-brand-gold transition hover:bg-brand-gold/15"
              >
                See the portal
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 09. PMS INTEGRATIONS ───────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                  PMS integrations
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                  We plug into the{' '}
                  <span className="font-display italic text-brand-emerald">stack you run</span>
                  <span aria-hidden="true" className="text-brand-gold">.</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Guest cards, screening files, and signed leases flow back to your system of
                  record. Source attribution preserved, no double-entry, no copy-paste.
                </p>

                <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy/90 p-6 text-white shadow-xl">
                  <p className="font-display text-2xl font-normal italic">
                    Your system of record stays your system of record.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    We never ask you to switch PMS, never run a parallel database, never lock you
                    into our portal. We feed yours.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {INTEGRATIONS.map((integ, idx) => (
                  <IntegrationCard
                    key={integ.name}
                    index={idx}
                    name={integ.name}
                    description={integ.description}
                    initial={integ.initial}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. PRICING MODELS ─────────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Pricing models
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Three ways to pay,{' '}
                <span className="font-display italic text-brand-emerald">one accountable team</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Pick the structure that fits your portfolio and your margin. All three include
                the full leasing scope — only the commercial wrapper changes.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PRICING_MODELS.map((m, idx) => (
              <PricingCard
                key={m.title}
                index={idx}
                badge={m.badge}
                title={m.title}
                headlinePrice={m.headlinePrice}
                subline={m.subline}
                description={m.description}
                bullets={m.bullets}
                featured={m.featured}
                imageSrc={m.imageSrc}
                imageAlt={m.imageAlt}
              />
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">
            All models include the full leasing scope — listing, lead capture, tours, screening,
            lease execution, deposit collection, and PMS handoff. White-label by default. No
            setup fee under any model.
          </p>
        </div>
      </section>

      {/* ─── 11. EDITORIAL BRIDGE — Portfolio scale ─────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/15">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
                alt="Residential apartment block representing portfolio scale"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
              />
              <FloatingBadge
                iconKey="Building2"
                title="Same discipline"
                value="40–4,000 doors"
                className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl shadow-brand-navy/20 sm:block"
              />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Built for portfolio scale
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Same discipline across every{' '}
                <span className="font-display italic text-brand-emerald">asset.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Whether you manage 40 doors or 4,000, the workflow is identical: listing,
                capture, qualification, signing, handoff. Live in the portal. Audit any unit, any
                lead, any time. The same operator runs every door in your portfolio.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Same workflow at 40 doors and at 4,000',
                  'One escalation path for your ops team',
                  'White-labelled owner reports under your logo',
                  'Surge capacity for takeover bids',
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-brand-emerald"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 12. COMPARISON TABLE ───────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Side by side
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                In-house team vs.{' '}
                <span className="font-display italic text-brand-emerald">MoveSmart as a service</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Same scope, two ways to deliver. Compare on the line items that actually move
                cost, speed, and risk.
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            <ComparisonTable rows={COMPARISON_ROWS} />
          </div>
        </div>
      </section>

      {/* ─── 13. CASE STUDY PATTERNS ────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Case patterns
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                What PMs save when they{' '}
                <span className="font-display italic text-brand-emerald">stop staffing leasing</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Three anonymised PM engagement patterns — the stabilized operator, the surge
                takeover, and the multi-province compliance play.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((c, idx) => (
              <CaseStudyCard
                key={c.badge}
                index={idx}
                badge={c.badge}
                headline={c.headline}
                body={c.body}
                metrics={c.metrics}
                imageSrc={c.imageSrc}
                imageAlt={c.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 14. COMPLIANCE / CREDENTIALS STRIP ─────────────────────── */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/15">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80"
                  alt="Compliance and legal documentation on a brokerage boardroom table"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
                />
                <FloatingBadge
                  iconKey="ShieldCheck"
                  title="RECO"
                  value="Registered"
                  className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl shadow-brand-navy/20 sm:block"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Compliance &amp; trust
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Audit-ready.{' '}
                <span className="font-display italic text-brand-emerald">Regulator-clean.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Leasing on behalf of your owner clients is a regulated activity. We run it as a
                RECO-registered partner brokerage with FINTRAC-verified deposits, PIPEDA-compliant data
                residency, and a non-solicit clause baked into every engagement.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-brand-navy/10 bg-white px-4 py-3"
                  >
                    <p className="font-display text-lg font-normal text-brand-navy">
                      {c.label}
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      {c.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 15. CLOSING DARK CTA BAND ──────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-navy/92 to-brand-navy/80" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.08] blur-3xl" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
              Run leasing as output, not as a department
            </p>
            <h2 className="mt-4 font-display text-4xl font-normal leading-tight text-white sm:text-5xl md:text-[3.5rem]">
              Stop staffing leasing.{' '}
              <span className="font-display italic text-brand-emerald">
                Start booking it as output.
              </span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              30-minute scoping call. We map your PMS, your portfolio, and your owner reporting
              needs — and come back with a pricing model and a 15-day mobilization plan. No
              obligation.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact/?type=property-manager"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-emerald-900/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Talk to an operator
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                See pricing models
              </Link>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/55">
              Or call us directly · <span className="text-white/80">+1 (800) 595-9755</span>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
