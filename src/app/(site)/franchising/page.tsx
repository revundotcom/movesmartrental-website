import type { Metadata } from 'next'
import Image from 'next/image'
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
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { GradientText } from '@/components/ui/gradient-text'
import { JsonLd } from '@/components/json-ld'
import { buildFaqPageSchema } from '@/lib/schema-builders'
import {
  DiagonalFitColumns,
  OnboardingTimeline,
  PullQuote,
  TerritoryParallax,
} from './franchising-client'

export const metadata: Metadata = {
  title: 'Leasing Brokerage Franchise Opportunity Canada & US',
  description:
    'Start your own full-service leasing and tenant placement business with MoveSmart Rentals. Protected territory, 6-week training, proven leasing playbook, and ongoing HQ support.',
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
      'A documented, repeatable system for strategic pricing, marketing, showings, tenant qualification, and lease execution. Trusted by thousands of landlords across our network.',
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
   FRANCHISE FAQ - 12+ questions covering prospect-stage objections
   ────────────────────────────────────────────────────────────────────────── */

const FRANCHISE_FAQS = [
  {
    question: 'How much does a MoveSmart territory cost?',
    answer:
      'The initial franchise fee for a single protected territory is $45,000, with a typical first-year total investment between $84,500 and $116,500 once build-out, working capital, and the launch technology package are included. Multi-territory operators receive a reduced fee on additional markets. Specific costs for your market are detailed in the FDD.',
  },
  {
    question: 'How long does the training program take?',
    answer:
      'Initial training is six weeks: a structured curriculum that mixes HQ classroom time, on-site shadowing, and a launch-readiness checkpoint. You begin closing your first owner engagements during weeks five and six, and HQ stays embedded with weekly group calls and a dedicated success manager for the first twelve months.',
  },
  {
    question: 'Is the technology platform included?',
    answer:
      'Yes. The leasing execution software, owner portal, applicant portal, e-signing, deposit-trust workflow, and the reporting suite are all included in your royalty. There is no separate SaaS licence to buy and no per-seat charge. New platform releases roll out network-wide at no additional cost.',
  },
  {
    question: 'What technology stack does the franchise run on?',
    answer:
      'Owners and tenants interact through a unified web portal and mobile-responsive applicant flow. Internally, franchisees use our leasing CRM, screening integrations, e-signature, deposit-trust accounting, listing-syndication, and a national reporting dashboard. HQ runs the security, hosting, and uptime so you can focus on local market work.',
  },
  {
    question: 'What ongoing royalties and fees should I expect?',
    answer:
      'A 7% royalty on gross revenue and a 2% contribution to the national marketing fund. There is no monthly minimum royalty in months one through six, and the marketing fund is audited annually. Optional add-on services (premium screening, paid advertising co-op spend) are elective and separately disclosed.',
  },
  {
    question: 'Is my territory exclusive?',
    answer:
      'Yes. Each territory is defined by ZIP/postal-code boundaries and protected in writing - no other MoveSmart franchisee can operate inside your market. National marketing leads inside your boundary route to you automatically. Adjacent territories can later be added under a multi-unit development schedule.',
  },
  {
    question: 'How much working capital do I need on hand?',
    answer:
      'Plan for $25,000 to $40,000 in dedicated operating capital on top of the franchise fee and launch package. That covers your first six months of overhead - rent (if any), payroll, insurance, vehicle, and marketing - while owner contracts ramp up. Total liquid capital recommended at signing is roughly $80,000, with $150,000 net worth.',
  },
  {
    question: 'What kind of ROI can I realistically expect?',
    answer:
      'Most operators reach break-even in months 9 to 14 and positive cash flow by month 18. Outcomes vary by market size, sales effort, and local competition - so we share full Item 19 Financial Performance Representations from existing operators inside the FDD, and connect qualified candidates with current franchisees for validation calls.',
  },
  {
    question: 'What are my exit options if I want to sell?',
    answer:
      'Franchise agreements include a defined transfer process. You can sell to a qualified buyer subject to HQ approval, transfer to a family member, or in some cases re-sell back to the franchise system. Established MoveSmart units typically trade at a healthy multiple of recurring leasing revenue.',
  },
  {
    question: 'Can I operate this alongside my existing brokerage or real estate business?',
    answer:
      'In many cases yes, but it requires review. We look at your existing client base and any non-compete obligations to confirm there is no conflict with the MoveSmart playbook or another franchisee in an adjacent territory. The discovery process surfaces conflicts early so both sides can decide before signing.',
  },
  {
    question: 'What support do I get during launch?',
    answer:
      'A dedicated launch coach walks you through the first 90 days: grand-opening marketing plan, first owner outreach, signage rollout, vendor onboarding, and your first revenue plan. You also join weekly group calls with peer franchisees and have direct lines to HQ operations, marketing, and tech support.',
  },
  {
    question: 'How does the national marketing co-op work?',
    answer:
      'Franchisees contribute 2% of gross revenue to the national marketing fund. Those dollars pay for shared SEO, paid search, listing syndication, brand creative, and the central web platform. The fund is held in a separate account, audited annually, and a council of franchisees reviews spend priorities each year.',
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
    question: 'What financing options exist?',
    answer:
      'MoveSmart Rentals does not directly finance franchisees. We partner with SBA-preferred lenders in the US and BDC in Canada and can introduce you to financing professionals familiar with our model. Many franchisees fund startup with a combination of personal capital, an SBA 7(a) loan, or a home equity line of credit.',
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
  { label: 'Network', value: 'Trusted by thousands of landlords' },
]

/* ──────────────────────────────────────────────────────────────────────────
   FRANCHISING HERO - custom dark-themed hero with proper contrast.
   PageHeroBlock's `aside` slot couldn't make the spec sheet legible on
   the navy backdrop (label text was slate-500 over navy), and the left
   column felt sparse with only a single CTA. This rewrites the entire
   hero so the snapshot, CTAs, and trust strip read clearly end-to-end.
   ────────────────────────────────────────────────────────────────────────── */

function FranchisingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy">
      {/* Background photograph */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Heavier navy gradient — the previous version still showed too much
            photograph behind the empty left-column space, making the BG feel
            patchy. This version is opaque enough that the photo reads as a
            subtle texture, not a competing image. */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-navy/94 to-brand-navy/92" />
        {/* Decorative dot-grid texture so the dark area doesn't read as flat */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Soft brand accents */}
        <div className="absolute -left-40 top-1/2 size-[560px] -translate-y-1/2 rounded-full bg-brand-emerald/12 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.10] blur-3xl" />
      </div>

      {/* Hairline top accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />

      {/* items-center: left column now sits vertically centered against the
          taller right column (image + spec sheet) so the empty space below
          the lede/CTAs is shared evenly above + below instead of collapsed
          to the top. Vertical padding tightened so the section overall is
          shorter and the BG doesn't extend into dead space. */}
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        {/* LEFT column — kicker, eyebrow, headline, lede, CTAs, trust strip */}
        <div className="lg:col-span-7">
          {/* Kicker */}
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
              Franchise Opportunity
            </span>
          </div>

          {/* Eyebrow chip */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
            <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              Now Awarding Territories
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Start your own full-service{' '}
            <span className="font-display italic text-brand-emerald">leasing business</span>
            <span className="text-brand-gold" aria-hidden="true">.</span>
          </h1>

          {/* Lede */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            MoveSmart Rentals is awarding protected territories to qualified operators across Canada and the United States. You bring local market knowledge and operational drive — we provide the playbook, the tech platform, and the brand that owners trust.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/contact/?intent=franchise"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-px hover:shadow-xl"
            >
              Request the Franchise Kit
            </a>
            <a
              href="#franchise-economics"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 bg-transparent px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              See the economics
            </a>
          </div>
        </div>

        {/* RIGHT column — dark spec sheet only (editorial image removed per design feedback) */}
        <aside className="lg:col-span-5">
          {/* Spec sheet — re-themed for dark backdrop */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
            <div aria-hidden="true" className="mb-3 h-px w-12 bg-brand-gold" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              Franchise snapshot
            </p>
            <p className="mt-2 font-display text-sm font-normal italic leading-snug text-white/65">
              From the current Franchise Disclosure Document.
            </p>

            <dl className="mt-5">
              {HERO_SNAPSHOT.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-baseline justify-between gap-4 py-4 ${
                    i === 0
                      ? 'border-y border-white/15'
                      : 'border-b border-white/10 last:border-b-0'
                  }`}
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                    {row.label}
                  </dt>
                  <dd className="text-right font-display text-lg font-normal text-white sm:text-xl">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-white/55">
              <FileText
                className="mt-px size-3.5 shrink-0 text-brand-gold"
                aria-hidden="true"
              />
              <span>
                Not an offer to sell a franchise. An offer can only be made through a Franchise Disclosure Document.
              </span>
            </p>
          </div>
        </aside>
      </div>

      {/* Hairline bottom accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
    </section>
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

      {/* ── SECTION 1: Custom dark hero — proper contrast + denser left column ── */}
      <FranchisingHero />

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

        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
      </section>

      {/* ── SECTION 2b: Editorial visual band - multi-unit growth imagery ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-brand-navy/10 md:aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
                  alt="Modern multi-unit residential buildings - the inventory MoveSmart franchisees lease"
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 720px, 100vw"
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
              </div>
            </div>
            <div className="flex flex-col justify-center md:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Why this category
              </p>
              <h3 className="mt-3 font-display text-3xl font-normal leading-tight text-brand-navy sm:text-4xl">
                The inventory is everywhere &mdash; the operators
                <span className="italic text-brand-emerald"> are not</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </h3>
              <p className="mt-4 font-serif text-base leading-[1.7] text-slate-700 sm:text-[17px]">
                Every condo tower, every townhouse street, every duplex on a quiet block needs the
                same nine leasing services done right. Most independent owners want help, and most
                local markets don&rsquo;t have a brand they trust. That gap is your territory.
              </p>
            </div>
          </div>
        </div>
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

      {/* ── SECTION 3b: Office / branding bridge (NEW image alongside investment) ── */}
      <section className="bg-white pt-20 sm:pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Image */}
            <RevealOnScroll variant="scaleIn" duration={0.8}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-navy/10">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80&auto=format&fit=crop"
                  alt="Modern open-plan office workspace, typical of a MoveSmart franchise location"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
                />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                  <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy">
                    Home-office or storefront &mdash; both work
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Content */}
            <RevealOnScroll variant="slideUp" duration={0.7}>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                A real business with a real footprint
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-[1.1] text-brand-navy sm:text-4xl">
                Lean to start.
                <span className="font-display italic text-brand-emerald"> Scalable</span> when you&rsquo;re ready
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 font-serif text-base leading-[1.75] text-slate-700">
                Most franchisees launch from a small commercial office or a dedicated home setup,
                then expand to a storefront in year two or three as the team grows. The numbers below
                cover the lean launch path &mdash; storefront upgrades are optional, not required.
              </p>
              <ul className="mt-6 space-y-2 font-serif text-sm text-slate-600">
                <li>&middot; Build-out budget covers signage, desks, photography kit, and branding.</li>
                <li>&middot; No franchise-mandated commercial real estate lease in year one.</li>
                <li>&middot; HQ supplies brand guidelines, signage templates, and the visual identity system.</li>
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Investment & Financials - single ledger-style table, dotted leaders ── */}
      <section id="franchise-economics" className="scroll-mt-24 bg-white py-24 sm:py-28">
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

            <p className="mt-10 text-xs italic leading-relaxed text-slate-500">
              Full Financial Performance Representations are provided to qualified candidates inside FDD Item 19.
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

      {/* ── SECTION 6b: Full-width city banner (NEW image) ── */}
      <section className="relative bg-[#FBFAF6] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="scaleIn" duration={0.9}>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-navy/10">
              <Image
                src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=1600&q=80&auto=format&fit=crop"
                alt="Downtown Toronto skyline - one of many MoveSmart franchise markets across Canada and the US"
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-brand-navy/65 via-brand-navy/25 to-transparent"
              />
              <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
                <div className="max-w-2xl">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                    Canada &middot; United States
                  </p>
                  <p className="mt-3 font-display text-3xl font-normal italic leading-tight text-white sm:text-4xl lg:text-5xl">
                    A national brand. <br className="hidden sm:block" />A local owner-operator.
                  </p>
                  <p className="mt-4 max-w-xl font-serif text-sm leading-relaxed text-white/85 sm:text-base">
                    Territories are awarded by metro and ZIP/postal-code boundary so every franchisee
                    owns a defensible local market &mdash; underwritten by a national brand.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
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
              quote="I came from residential sales, not leasing brokerage. The 6-week onboarding gave me a full operating system on day one."
              attribution="D. Patel"
              market="Calgary franchisee since 2024"
            />
            <PullQuote
              quote="HQ marketing has been the quiet engine. Owner inquiries land in my inbox already pre-qualified by the national site. My job is to close them - and the playbook tells me how."
              attribution="S. Lemieux"
              market="Vancouver Lower Mainland, since 2023"
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
          showQuestionsCta={false}
        />
      </RevealOnScroll>

      {/* ── SECTION 11: Final CTA banner ── */}
      <CTABannerBlock
        headline="Limited territories. Apply now."
        description="If your market is open and you meet the qualifications, we can have you in onboarding within 60 days. Request the Franchise Kit to get the full FDD overview."
        primaryCta={{ label: 'Request Franchise Kit', href: '/contact/?intent=franchise' }}
      />

      {/* Small hours-of-operation note under the final CTA */}
      <div className="bg-white py-6">
        <p className="mx-auto max-w-3xl px-4 text-center text-[12px] leading-relaxed text-slate-500 sm:text-sm">
          Note: Franchise team responds Mon&ndash;Fri, closed at 5pm ET / 2pm PT.
        </p>
      </div>
    </main>
  )
}
