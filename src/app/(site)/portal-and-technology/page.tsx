import type { Metadata } from 'next'
import {
  CalendarCheck,
  Inbox,
  ClipboardCheck,
  FileSignature,
  KeyRound,
  Lock,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { OwnersFeaturesBento } from '@/components/blocks/owners-features-bento'
import { generatePageMetadata } from '@/lib/metadata'

import {
  NotificationTimeline,
  OwnerTenantSplit,
  PhilosophyManifesto,
  SecurityTrustStrip,
  StickyProductTour,
} from './portal-interactive'

export const metadata: Metadata = generatePageMetadata({
  path: '/portal-and-technology/',
  fallbackTitle: 'Owner Portal & Leasing Transparency | MoveSmart Rentals',
  fallbackDescription:
    'Total visibility into your leasing - from listing to signed lease. Track showings, applications, screening progress, approvals, and move-in coordination from one owner login.',
})

/* ─────────────────────────────────────────────────────────────────────────── */
/* Hero aside - small editorial "what you'll see today" panel                  */
/* ─────────────────────────────────────────────────────────────────────────── */

const HERO_ASIDE_ITEMS = [
  { icon: KeyRound, label: 'Listings', detail: 'live · views · inquiries' },
  { icon: CalendarCheck, label: 'Showings', detail: 'booked · feedback logged' },
  { icon: Inbox, label: 'Applicants', detail: 'received · under review' },
  { icon: ClipboardCheck, label: 'Screening', detail: 'credit · income · references' },
  { icon: FileSignature, label: 'Lease & Move-in', detail: 'signed · keys handed over' },
]

function HeroAsideCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-white p-7 shadow-sm">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
        What you&rsquo;ll see today
      </p>
      <h3 className="mt-2 font-display text-xl font-normal text-brand-navy">
        Five stages.{' '}
        <span className="font-display italic text-brand-emerald">One leasing view</span>
        <span className="text-brand-gold">.</span>
      </h3>

      <ul className="mt-5 divide-y divide-slate-100">
        {HERO_ASIDE_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.label} className="flex items-center gap-3 py-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/10">
                <Icon className="size-4 text-brand-emerald" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-brand-navy">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500">{item.detail}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5">
        <Lock className="size-3.5 text-slate-500" aria-hidden="true" />
        <p className="text-[11px] text-slate-600">
          Bank-grade encryption · Canadian data residency
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Owner portal feature bento (six tiles, leasing-lifecycle focused)           */
/* ─────────────────────────────────────────────────────────────────────────── */

const PORTAL_FEATURES = [
  {
    iconKey: 'Zap',
    title: 'Live Showing Calendar',
    description:
      'Every scheduled showing, confirmation, no-show, and post-tour feedback note - visible the moment our leasing team logs it. No more guessing how Saturday went.',
  },
  {
    iconKey: 'Users',
    title: 'Applicant Inbox',
    description:
      'Every application that lands, with the prospect summary and current screening status attached. See your shortlist build in real time, not in a Friday email.',
  },
  {
    iconKey: 'Shield',
    title: 'Screening Dashboard',
    description:
      'Credit pull, income verification, employment confirmation, reference checks, and compliance flags - tracked stage by stage, with the underwriter notes that matter.',
  },
  {
    iconKey: 'CheckCircle',
    title: 'Approval & Counteroffer Workflow',
    description:
      'Approve or decline an applicant in one tap. Negotiate a counteroffer on rent, term, or conditions without leaving the portal - every decision time-stamped and on record.',
  },
  {
    iconKey: 'Megaphone',
    title: 'Marketing Distribution View',
    description:
      'See exactly where your listing is live - MLS, rental portals, social syndication, and any paid ad placement - with status, impressions, and inquiry counts per channel.',
  },
  {
    iconKey: 'Monitor',
    title: 'Move-In Coordination',
    description:
      'The inspection checklist, condition photos, signed lease packet, and utility-transfer tracker - all linked to the day keys change hands. A clean handoff, fully documented.',
  },
]

/* ─────────────────────────────────────────────────────────────────────────── */
/* Page                                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function PortalAndTechnologyPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Portal & Technology', href: '/portal-and-technology/' },
          ]}
        />
      </div>

      {/* SECTION 1 - Editorial inner-page hero */}
      <PageHeroBlock
        kicker="Portal & Technology"
        eyebrow="Leasing Transparency, End-to-End"
        headline="Total Visibility Into Your Leasing"
        lede="Most brokerages go dark the day your listing goes live. Our portal is the opposite - watch every showing, application, screening check, and approval as it happens, from listing through signed lease and move-in."
        cta1={{ label: 'Tour the Portal', href: '#walkthrough' }}
        cta2={{ label: 'Get a Demo', href: '/contact/?intent=demo' }}
        aside={<HeroAsideCard />}
      />

      {/* SECTION 2 - Philosophy: 01 / 02 / 03 numbered editorial */}
      <PhilosophyManifesto />

      {/* SECTION 3 - Owner portal feature bento (asymmetric, kept) */}
      <OwnersFeaturesBento features={PORTAL_FEATURES} />

      {/* SECTION 4 - Sticky product tour with scroll-linked dashboard annotations */}
      <StickyProductTour />

      {/* SECTION 5 - Owner / Tenant clip-reveal split */}
      <OwnerTenantSplit />

      {/* SECTION 6 - Notifications timeline */}
      <NotificationTimeline />

      {/* SECTION 7 - Security trust strip (single horizontal strip) */}
      <SecurityTrustStrip />

      {/* SECTION 8 - Testimonials */}
      <section className="bg-[#FBFAF6] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              Owners On The Portal
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
              &ldquo;I always knew where my{' '}
              <span className="font-display italic text-brand-emerald">lease-up</span>
              <span className="text-brand-gold">&nbsp;stood.&rdquo;</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              The visibility owners ask us about most isn&rsquo;t a metric - it&rsquo;s
              the feeling of never being in the dark while their unit is on the market.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9 - Portal-specific FAQ */}
      <FAQBlock
        title="Portal & Technology FAQ"
        questions={[
          {
            question: 'Is there a mobile app?',
            answer:
              'The portal is a fully responsive web app - works on any phone or tablet browser, no download required. Most owners save it to their home screen for one-tap access. We chose this so you never have to wait for an app update to see your latest showing feedback.',
          },
          {
            question: 'Can I see applicant feedback in real-time?',
            answer:
              'Yes. The moment our leasing agent logs a showing or screens a new application, it appears in your portal - showing notes, applicant summary, screening progress, and any flags. No waiting for a weekly email recap.',
          },
          {
            question: 'What happens after my tenant is approved?',
            answer:
              'You see the lease move from Draft to Out-for-Signature to Signed, with timestamps. Then move-in coordination kicks in: inspection checklist, condition photos, utility-transfer tracker, and a final confirmation when keys change hands. Once move-in is confirmed, our active engagement closes out and the record stays available to you.',
          },
          {
            question: 'What if I have multiple units being leased at once?',
            answer:
              'The portal is built for portfolios. Toggle between unit-level detail and a portfolio-wide roll-up of listings live, showings booked this week, applications under review, and approvals pending. Owners running multi-unit lease-ups use this as their morning view.',
          },
          {
            question: 'Do applicants and tenants see what I see?',
            answer:
              'No. Tenants and applicants have a separate, scoped login - their application status, their lease, their move-in checklist. They cannot see your other listings, your decision notes, or any owner-side data.',
          },
          {
            question: 'Is my data encrypted?',
            answer:
              'Yes. 256-bit AES encryption at rest, TLS 1.3 in transit, role-based access controls, and PCI-DSS compliant payment processing for application fees and first-month deposits. We are PIPEDA compliant and host Canadian owner data on Canadian infrastructure where applicable.',
          },
          {
            question: 'Is my data exportable after the lease is signed?',
            answer:
              'Yes. You can export the full leasing record at any time - showing log, applicant files, screening reports, signed lease, inspection photos, and communication history - in a portable format (PDF + CSV). Your file stays accessible to you for as long as you keep your account.',
          },
        ]}
      />

      {/* SECTION 10 - Portal-specific CTA banner */}
      <CTABannerBlock
        headline="See it in 5 minutes."
        description="Book a portal walkthrough with one of our leasing managers - no slides, no sales pitch, just a real owner login on a screen-share."
        primaryCta={{ label: 'Book a Portal Walkthrough', href: '/contact/?intent=demo' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
