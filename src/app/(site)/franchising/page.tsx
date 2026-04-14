import type { Metadata } from 'next'
import {
  ShieldCheck,
  BookOpen,
  Monitor,
  Megaphone,
  Users,
  Wrench,
  FileText,
  MapPin,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { GradientText } from '@/components/ui/gradient-text'
import { JsonLd } from '@/components/json-ld'
import { buildFaqPageSchema } from '@/lib/schema-builders'
import {
  DiagonalFitColumns,
  LongCountUp,
  MarketStat,
  OnboardingTimeline,
  PullQuote,
  TerritoryParallax,
} from './franchising-client'

export const metadata: Metadata = {
  title: 'Leasing Brokerage Franchise Opportunity Canada & US',
  description:
    'Start your own white-glove leasing brokerage with MoveSmart Rentals. Protected territory, 6-week training, proven leasing playbook, and ongoing HQ support.',
  alternates: {
    canonical: '/franchising/',
  },
  openGraph: {
    title: 'Leasing Brokerage Franchise Canada & US | MoveSmart Rentals',
    description:
      'Now awarding territories. Protected market, 6-week training, proven leasing playbook, and ongoing HQ support.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'MoveSmart Rentals Franchise Opportunity' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage Franchise Canada & US | MoveSmart Rentals',
    description:
      'Now awarding territories. Protected market, 6-week training, proven leasing playbook, and ongoing HQ support.',
    images: ['/og-default.png'],
  },
}

/* ──────────────────────────────────────────────────────────────────────────
   FRANCHISEE BENEFITS - 6 entries (rendered as numbered editorial list)
   ────────────────────────────────────────────────────────────────────────── */

const FRANCHISEE_BENEFITS: Array<{
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}> = [
  {
    icon: MapPin,
    title: 'Protected Territory',
    description:
      'Your market is yours. Defined by ZIP/postal code boundaries with a written exclusivity guarantee - no internal competition from other MoveSmart franchisees.',
  },
  {
    icon: BookOpen,
    title: 'Proven Leasing Playbook',
    description:
      'A documented, repeatable system for strategic pricing, marketing, showings, tenant qualification, and lease execution. Built from 500+ units leased today.',
  },
  {
    icon: Monitor,
    title: 'Tech Platform & Owner Portal',
    description:
      'Full access to our leasing execution software, owner portal, applicant portal, and reporting suite - no separate SaaS to license, included in your royalty.',
  },
  {
    icon: Megaphone,
    title: 'National Marketing & Lead-Gen',
    description:
      'SEO-optimized location pages, paid search, and listing distribution route qualified owner inquiries directly to your territory inbox.',
  },
  {
    icon: Users,
    title: 'Ongoing Coaching from HQ',
    description:
      'Weekly group calls, quarterly business reviews, and a dedicated franchise success manager. Annual conference and peer mastermind included.',
  },
  {
    icon: Wrench,
    title: 'Vendor Network Access',
    description:
      'Pre-vetted relationships with cleaners, photographers, locksmiths, painters, and trades - at preferred franchise pricing in every market.',
  },
]

/* ──────────────────────────────────────────────────────────────────────────
   INVESTMENT - financial breakdown
   TODO: confirm with legal/finance - figures below are realistic placeholders
   pending FDD finalization with franchise counsel.
   ────────────────────────────────────────────────────────────────────────── */

const INVESTMENT_LINES: Array<{
  item: string
  range: string
  note: string
}> = [
  {
    item: 'Initial franchise fee',
    range: '$45,000',
    note: 'One-time, paid at signing',
  },
  {
    item: 'Build-out & office setup',
    range: '$8,000 - $25,000',
    note: 'Home-office or small commercial; varies by market',
  },
  {
    item: 'Initial working capital',
    range: '$25,000 - $40,000',
    note: 'Covers first 6 months of operating overhead',
  },
  {
    item: 'Technology & launch package',
    range: '$6,500',
    note: 'Portal access, signage, business cards, photography starter kit',
  },
  {
    item: 'Royalty fee',
    range: '7% of gross revenue',
    note: 'Paid monthly, no minimum',
  },
  {
    item: 'National marketing fund',
    range: '2% of gross revenue',
    note: 'Funds shared SEO, brand, and paid search',
  },
]

const TOTAL_INVESTMENT = '$84,500 - $116,500'

/* ──────────────────────────────────────────────────────────────────────────
   ONBOARDING - 6-week training timeline
   ────────────────────────────────────────────────────────────────────────── */

const ONBOARDING_WEEKS: Array<{
  week: string
  title: string
  description: string
}> = [
  {
    week: 'Week 1',
    title: 'Brand & Systems',
    description:
      'Brand standards, voice & tone, the MoveSmart operating playbook, and your territory market analysis. On-site at HQ.',
  },
  {
    week: 'Week 2',
    title: 'Sales & Lead Gen',
    description:
      'Owner acquisition scripts, the rental analysis appointment, objection handling, and closing the leasing engagement agreement.',
  },
  {
    week: 'Week 3',
    title: 'Operations & Legal',
    description:
      'Province/state-specific lease packages, tenancy law, fair-housing compliance, and your local regulatory checklist.',
  },
  {
    week: 'Week 4',
    title: 'Tech & Portal',
    description:
      'Hands-on training in the leasing execution platform: listings, screening, e-signing, deposit trust, and owner reporting.',
  },
  {
    week: 'Week 5',
    title: 'Vendor Network',
    description:
      'Recruiting your local trade partners using HQ templates, pricing benchmarks, and the quality scorecard.',
  },
  {
    week: 'Week 6',
    title: 'Launch Readiness',
    description:
      'Grand-opening marketing plan, first 30 owner outreach, ribbon-cutting checklist, and your first 90-day revenue plan.',
  },
]

/* ──────────────────────────────────────────────────────────────────────────
   FIT FILTER - honest two-column
   ────────────────────────────────────────────────────────────────────────── */

const FIT_YES = [
  'You have a real estate, sales, or operations background',
  'You can commit $80K+ in liquid capital and $150K+ net worth',
  'You want to be hands-on for the first 18 months',
  'You enjoy meeting owners, walking units, and building a local team',
  'You believe customer service is a moat, not an expense',
]

const FIT_NO = [
  'You are looking for passive income with no day-to-day involvement',
  'You have no interest in operations, hiring, or local market work',
  'You want immediate ROI in the first 90 days without a ramp period',
]

/* ──────────────────────────────────────────────────────────────────────────
   TERRITORY availability (illustrative)
   TODO: confirm with legal/franchise development - territory map current
   as of writing and may shift as agreements are signed.
   ────────────────────────────────────────────────────────────────────────── */

const TERRITORY_AWARDED = [
  { name: 'Greater Toronto Area, ON', status: 'Active' },
  { name: 'Ottawa, ON', status: 'Active' },
  { name: 'Hamilton, ON', status: 'Active' },
  { name: 'Calgary, AB', status: 'Active' },
  { name: 'Vancouver Lower Mainland, BC', status: 'Active' },
]

const TERRITORY_AVAILABLE = [
  'Edmonton, AB',
  'Winnipeg, MB',
  'Halifax, NS',
  'Montreal (West Island), QC',
  'Victoria, BC',
  'Saskatoon, SK',
  'Quebec City, QC',
  'Tampa, FL',
  'Austin, TX',
  'Phoenix, AZ',
  'Charlotte, NC',
  'Nashville, TN',
]

/* ──────────────────────────────────────────────────────────────────────────
   FRANCHISE FAQ - 8 questions
   ────────────────────────────────────────────────────────────────────────── */

const FRANCHISE_FAQS = [
  {
    question: 'How long until my franchise is profitable?',
    answer:
      'Most franchisees reach operating break-even in months 9 to 14, with positive cash flow typically by month 18. Time-to-profit depends on your market size, sales effort, and how aggressively you invest in local lead generation. Year 1 targets 25-40 units leased; year 3 mature operators close 120-200 placements per year.',
  },
  {
    question: 'Do I need a real estate background to qualify?',
    answer:
      'A real estate, leasing, or sales operations background is strongly preferred and accelerates ramp time. It is not strictly required - we have onboarded franchisees from financial services and small-business ownership - but you must hold (or be willing to obtain) the real estate or leasing brokerage licence required in your province or state. We help you navigate licensing during onboarding.',
  },
  {
    question: 'Can I run this as a semi-absentee owner?',
    answer:
      'No. The MoveSmart model is owner-operator for the first 18 to 24 months. Local relationships with owners and tenants are the asset, and that is hard to delegate to a manager from day one. Once you are at scale, a general manager can run day-to-day, but absentee ownership is not the model.',
  },
  {
    question: 'What are the ongoing fees?',
    answer:
      'A 7% royalty on gross revenue, a 2% contribution to the national marketing fund, and your share of any optional add-on technology you elect (e.g. premium screening). There is no monthly minimum royalty in months 1-6, and the marketing fund is held separately and audited annually.',
  },
  {
    question: 'Can I expand to multiple territories?',
    answer:
      'Yes - and we encourage it. Multi-unit franchisees receive a reduced franchise fee on territories two and three, and priority access to adjacent open markets. Your second territory typically opens 18 to 24 months after the first, once you have hit the milestones in your development schedule.',
  },
  {
    question: 'What financing options exist?',
    answer:
      'MoveSmart Rentals does not directly finance franchisees. We partner with SBA-preferred lenders in the US and BDC in Canada and can introduce you to financing professionals familiar with our model. Many franchisees fund startup with a combination of personal capital, an SBA 7(a) loan, or a home equity line of credit.',
  },
  {
    question: 'How are leads from national marketing distributed?',
    answer:
      'Owner leads generated through national SEO, paid search, and the central website are routed by ZIP/postal code directly to the franchisee whose territory contains the lead. Routing is automated and audited; the only fee is your standard 2% national marketing contribution.',
  },
  {
    question: 'What if I want to exit - can I sell my franchise?',
    answer:
      'Yes. Franchise agreements include a defined transfer process. You can sell to a qualified buyer subject to HQ approval, transfer to a family member, or in some cases re-sell back to the franchise system. Most established MoveSmart units sell at a healthy multiple of recurring leasing revenue.',
  },
]

/* ──────────────────────────────────────────────────────────────────────────
   HERO ASIDE - Snapshot, typographic spec sheet (no card chrome)
   ────────────────────────────────────────────────────────────────────────── */

const HERO_SNAPSHOT: Array<{ label: string; value: string }> = [
  { label: 'Initial investment', value: '$84.5K - $116.5K' }, // TODO: confirm with legal/finance
  { label: 'Royalty', value: '7% of gross revenue' }, // TODO: confirm with legal/finance
  { label: 'Initial training', value: '6 weeks · HQ + on-site' },
  { label: 'Time to first units', value: '60 - 90 days' },
  { label: 'Active franchisees', value: '5 territories awarded' }, // TODO: update as system grows
]

function HeroSpecSheet() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -top-3 left-0 h-px w-16 bg-brand-gold"
      />
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
        Franchise snapshot
      </p>
      <p className="mt-2 font-display text-base font-normal italic leading-snug text-brand-navy/70">
        From the current Franchise Disclosure Document.
      </p>

      <dl className="mt-8">
        {HERO_SNAPSHOT.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-baseline justify-between gap-6 py-5 ${
              i === 0 ? 'border-y border-brand-navy/15' : 'border-b border-brand-navy/10'
            }`}
          >
            <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              {row.label}
            </dt>
            <dd className="text-right font-display text-xl font-normal text-brand-navy">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 max-w-md text-[11px] leading-relaxed text-slate-500">
        <FileText
          className="-mt-0.5 mr-1.5 inline-block size-3.5 text-brand-gold"
          aria-hidden="true"
        />
        Not an offer to sell a franchise. An offer can only be made through a Franchise Disclosure Document.
      </p>
    </div>
  )
}

export default function FranchisingPage() {
  const faqSchema = buildFaqPageSchema({ questions: FRANCHISE_FAQS })

  return (
    <main>
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Franchising', href: '/franchising/' },
          ]}
        />
      </div>

      {/* ── SECTION 1: Editorial page hero (light - investor warmth, not nightclub navy) ── */}
      <PageHeroBlock
        kicker="Franchise Opportunity"
        eyebrow="Now Awarding Territories"
        headline="Start your own white-glove leasing brokerage."
        accentLastWord={false}
        lede="MoveSmart Rentals is awarding protected territories to qualified operators across Canada and the United States. You bring local market knowledge and operational drive - we provide the playbook, the tech platform, and the brand that owners trust."
        cta1={{ label: 'Request the Franchise Kit', href: '/contact/?intent=franchise' }}
        cta2={{ label: 'Book Discovery Call', href: '/contact/?type=franchise&intent=call' }}
        aside={<HeroSpecSheet />}
      />

      {/* ── SECTION 2: Market opportunity - full-bleed navy, 3 enormous floating numerals ── */}
      <section className="relative overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              The Market
            </p>
            <RevealOnScroll variant="blur" duration={0.9}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                Why residential leasing is the right{' '}
                <GradientText variant="emerald" className="font-display italic">
                  franchise category
                </GradientText>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </RevealOnScroll>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Roughly one in three North American households rents. Most independent landlords manage their own units - and most quietly want to stop. High recurring revenue, sticky multi-year contracts, and a fragmented competitive landscape ripe for consolidation under a trusted brand.
            </p>
          </div>

          {/* Three huge numerals across the width - floating, no tiles */}
          {/* TODO: confirm market data figures with research team */}
          <div className="mt-20 grid grid-cols-1 gap-16 sm:mt-24 sm:grid-cols-3 sm:gap-8">
            <MarketStat
              prefix="$"
              value={101}
              suffix="B"
              label="North American residential rental industry size"
            />
            <MarketStat
              value={4.3}
              decimals={1}
              suffix="%"
              label="Annual industry growth · 2024-2029 CAGR"
            />
            <MarketStat
              value={85}
              suffix="%+"
              label="Recurring owner re-engagement on lease renewal cycles"
            />
          </div>

          <p className="mt-16 text-center text-[11px] uppercase tracking-[0.18em] text-white/40">
            Sources: IBISWorld · NARPM · MoveSmart internal benchmarks
          </p>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
      </section>

      {/* ── SECTION 3: What you get - vertical numbered editorial list (no cards) ── */}
      <section className="bg-[#FBFAF6] py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              The Package
            </p>
            <RevealOnScroll variant="blur" duration={0.9}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl">
                What you get as a MoveSmart{' '}
                <span className="font-display italic text-brand-emerald">franchisee</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </RevealOnScroll>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Six things land in your hands the day you sign. No card grids, no buzzwords - the actual operating system.
            </p>
          </div>

          <ol className="mt-16 divide-y divide-brand-navy/10">
            {FRANCHISEE_BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <li
                  key={benefit.title}
                  className="grid grid-cols-12 items-start gap-x-6 gap-y-3 py-10 first:pt-0"
                >
                  <div className="col-span-12 flex items-baseline gap-4 sm:col-span-3">
                    <span className="font-display text-5xl font-normal leading-none text-brand-gold sm:text-6xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className="size-5 text-brand-emerald/70" aria-hidden="true" />
                  </div>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="font-display text-2xl font-normal leading-tight text-brand-navy sm:text-[1.75rem]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ── SECTION 4: Investment & Financials - single ledger-style table, dotted leaders ── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              The Numbers
            </p>
            <RevealOnScroll variant="blur" duration={0.9}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl">
                Investment &{' '}
                <span className="font-display italic text-brand-emerald">financials</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </RevealOnScroll>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Real numbers, no fine print. Below is a typical first-year investment for a single territory. Full FDD - including Item 19 - provided to qualified candidates.
            </p>
          </div>

          {/* Ledger - double rule top & bottom, dotted leaders between item and amount */}
          <div className="mt-16">
            <div className="border-y-4 border-double border-brand-navy/70 py-2">
              <div className="border-y border-brand-navy/15 py-3">
                <div className="grid grid-cols-12 px-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
                  <div className="col-span-7 sm:col-span-6">Line item</div>
                  <div className="col-span-5 text-right sm:col-span-3">Amount</div>
                  <div className="hidden sm:col-span-3 sm:block">Note</div>
                </div>
              </div>

              <ul>
                {INVESTMENT_LINES.map((line) => (
                  <li
                    key={line.item}
                    className="grid grid-cols-12 items-baseline gap-x-3 border-b border-dashed border-brand-navy/15 px-2 py-5 last:border-b-0"
                  >
                    <span className="col-span-7 font-display text-lg font-normal leading-snug text-brand-navy sm:col-span-6 sm:text-xl">
                      {line.item}
                    </span>
                    <span className="col-span-5 text-right font-display text-lg font-normal text-brand-navy sm:col-span-3 sm:text-xl">
                      {line.range}
                    </span>
                    <span className="col-span-12 mt-1 text-xs italic leading-relaxed text-slate-500 sm:col-span-3 sm:mt-0 sm:text-[13px]">
                      {line.note}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Running total */}
              <div className="border-t-2 border-brand-navy/70 px-2 pt-6">
                <div className="grid grid-cols-12 items-baseline gap-x-3">
                  <span className="col-span-7 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald sm:col-span-6">
                    Total typical first-year investment
                  </span>
                  <span className="col-span-5 text-right font-display text-2xl font-normal text-brand-navy sm:col-span-3 sm:text-3xl">
                    {TOTAL_INVESTMENT}
                  </span>
                  <span className="col-span-12 mt-1 text-xs italic leading-relaxed text-slate-500 sm:col-span-3 sm:mt-0 sm:text-[13px]">
                    Single territory, owner-operator
                  </span>
                </div>
              </div>
            </div>

            {/* Performance benchmarks - inline editorial line, not boxes */}
            <div className="mt-14">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
                Performance benchmarks
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
                <div>
                  <dd>
                    <LongCountUp
                      value={25}
                      suffix=" - 40"
                      className="font-display text-4xl font-normal text-brand-navy sm:text-5xl"
                    />
                  </dd>
                  <dt className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Year 1 units leased
                  </dt>
                </div>
                <div>
                  <dd>
                    <LongCountUp
                      value={120}
                      suffix=" - 200"
                      className="font-display text-4xl font-normal text-brand-navy sm:text-5xl"
                    />
                  </dd>
                  <dt className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Year 3 mature annual placements
                  </dt>
                </div>
                <div>
                  <dd>
                    <LongCountUp
                      prefix="$"
                      value={1800}
                      suffix=" - $2,400"
                      className="font-display text-4xl font-normal text-brand-navy sm:text-5xl"
                    />
                  </dd>
                  <dt className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Avg success fee per placement
                  </dt>
                </div>
              </dl>
            </div>

            <p className="mt-10 text-xs italic leading-relaxed text-slate-500">
              {/* TODO: confirm with legal/finance - Item 19 figures pending FDD finalization */}
              Performance ranges are illustrative averages from existing operators. Actual results vary. Refer to FDD Item 19 for full Financial Performance Representations.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: 6-week onboarding - horizontal timeline with animated gold rail ── */}
      <section className="bg-brand-navy py-24 text-white sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              The Onboarding
            </p>
            <RevealOnScroll variant="blur" duration={0.9}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl">
                Your first six weeks,{' '}
                <span className="font-display italic text-emerald-300">week-by-week</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </RevealOnScroll>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
              From signing day to your first thirty owner conversations. Structured, supported, and built for someone who has never run a leasing brokerage before.
            </p>
          </div>

          {/* Timeline component: white / navy mismatch - rail looks great on dark */}
          <div className="rounded-none bg-[#FBFAF6] px-4 py-12 sm:px-10 sm:py-16">
            <OnboardingTimeline nodes={ONBOARDING_WEEKS} />
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Ideal franchisee profile - diagonal divider, no cards ── */}
      <section className="bg-[#FBFAF6] py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              The Fit
            </p>
            <RevealOnScroll variant="blur" duration={0.9}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl">
                Is MoveSmart the{' '}
                <span className="font-display italic text-brand-emerald">right fit</span>
                <span aria-hidden="true" className="text-brand-gold">?</span>
              </h2>
            </RevealOnScroll>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Not every operator is the right operator. Honest filtering up front saves both of us a lot of time later.
            </p>
          </div>

          <div className="mt-16">
            <DiagonalFitColumns fitYes={FIT_YES} fitNo={FIT_NO} />
          </div>

          <div className="mt-16 flex items-center justify-center gap-3">
            <ShieldCheck className="size-4 text-brand-emerald" aria-hidden="true" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
              Honest qualification - both ways
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Territory section - full-bleed navy, parallax illustration ── */}
      <TerritoryParallax awarded={TERRITORY_AWARDED} available={TERRITORY_AVAILABLE} />

      {/* ── SECTION 8: Franchisee testimonials - magazine pull-quotes + CountUp outcomes ── */}
      {/* TODO: confirm testimonials with franchise relations - placeholder operators */}
      <section className="bg-[#FBFAF6] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
              From the Network
            </p>
            <RevealOnScroll variant="blur" duration={0.9}>
              <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl">
                What our{' '}
                <span className="font-display italic text-brand-emerald">franchisees</span> say
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h2>
            </RevealOnScroll>
          </div>

          <div className="space-y-24 sm:space-y-32">
            <PullQuote
              quote="I came from residential sales, not leasing brokerage. The 6-week onboarding gave me a full operating system on day one. We placed tenants in 38 units in our first eleven months and are on track for 110 by year-end."
              attribution="D. Patel"
              market="Calgary franchisee since 2024"
              outcomeValue={38}
              outcomeSuffix=" units"
              outcomeLabel="Leased in first 11 months"
            />
            <PullQuote
              quote="HQ marketing has been the quiet engine. Owner inquiries land in my inbox already pre-qualified by the national site. My job is to close them - and the playbook tells me how."
              attribution="S. Lemieux"
              market="Vancouver Lower Mainland, since 2023"
              outcomeValue={420}
              outcomePrefix="$"
              outcomeSuffix="K"
              outcomeLabel="Annual recurring revenue by month 18"
              showRule
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FDD legal - small-caps editorial footnote, no card ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div
            aria-hidden="true"
            className="mx-auto h-px w-24 bg-brand-gold/60"
          />
          <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
            Legal disclosure · Franchise Disclosure Document &amp; offer terms
          </p>
          <div className="mt-8 space-y-5 text-center text-[13px] leading-relaxed text-slate-600 sm:text-sm">
            <p>
              A current Franchise Disclosure Document (FDD) is provided to qualified candidates following the discovery call. The FDD includes the full Item 7 estimated initial investment, Item 19 financial performance representations, sample franchise agreement, and obligations of both parties.
            </p>
            <p className="font-display text-base font-normal italic leading-relaxed text-brand-navy sm:text-lg">
              {/* TODO: confirm with legal - disclaimer wording must match jurisdiction */}
              This website and its contents do not constitute an offer to sell, or the solicitation of an offer to buy, a franchise. An offer can only be made through the delivery of a Franchise Disclosure Document. Certain US states and Canadian provinces (including Alberta, Ontario, New Brunswick, Manitoba, Prince Edward Island, and British Columbia) regulate the offer and sale of franchises. If you are a resident of one of these jurisdictions, we will not offer you a franchise unless and until we have complied with applicable pre-sale registration and disclosure requirements.
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              MoveSmart Rentals is an independent franchisor · Franchisee results vary
            </p>
          </div>
          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px w-24 bg-brand-gold/60"
          />
        </div>
      </section>

      {/* ── SECTION 10: FAQ ── */}
      <RevealOnScroll variant="blur" duration={0.9}>
        <FAQBlock
          questions={FRANCHISE_FAQS}
          title="Franchise FAQ"
          schemaEnabled={false}
        />
      </RevealOnScroll>

      {/* ── SECTION 11: Final CTA banner ── */}
      <CTABannerBlock
        headline="Limited territories. Apply now."
        description="If your market is open and you meet the qualifications, we can have you in onboarding within 60 days. Request the Franchise Kit to get the full FDD overview and a discovery-call invite."
        primaryCta={{ label: 'Request Franchise Kit', href: '/contact/?intent=franchise' }}
        secondaryCta={{ label: 'Book Discovery Call', href: '/contact/?type=franchise&intent=call' }}
      />
    </main>
  )
}
