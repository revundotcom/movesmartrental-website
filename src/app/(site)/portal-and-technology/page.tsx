import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { OwnersFeaturesBento } from '@/components/blocks/owners-features-bento'
import { generatePageMetadata } from '@/lib/metadata'

import {
  NotificationTimeline,
  OwnerTenantSplit,
  PhilosophyManifesto,
  SecurityTrustStrip,
} from './portal-interactive'

import {
  BuiltForOwners,
  EditorialPortalHero,
  PressLogos,
  TestimonialsWall,
  ThreeRoles,
  WorkflowImageStrip,
} from './portal-imagery'

import { BrowserFrame } from '@/components/ui/browser-frame'
import { OwnerDashboardMockup } from '@/components/portal-mockups/owner-dashboard-mockup'
import { PropertiesListMockup } from '@/components/portal-mockups/properties-list-mockup'
import { ShowingsOffersMockup } from '@/components/portal-mockups/showings-offers-mockup'
import { AnalyticsMockup } from '@/components/portal-mockups/analytics-mockup'
import { WalletMockup } from '@/components/portal-mockups/wallet-mockup'
import { OwnerServicesMockup } from '@/components/portal-mockups/owner-services-mockup'
import { EventsCalendarMockup } from '@/components/portal-mockups/events-calendar-mockup'
import { PortalScreensTabbed } from './portal-screens-tabbed'

const PORTAL_SCREENS = [
  {
    title: 'Owner Dashboard',
    description:
      'A single home base for every property in your portfolio — offers, tours, occupancy, and the units that need your attention today.',
    url: 'movesmart.ca/owner/dashboard',
    component: <OwnerDashboardMockup />,
  },
  {
    title: 'Properties',
    description:
      'Filter by condo, house, or apartment. See lease status, listing status, and which units have showings scheduled this week.',
    url: 'movesmart.ca/owner/properties',
    component: <PropertiesListMockup />,
  },
  {
    title: 'Showings & Offers',
    description:
      'Every tour booked, every offer received, countered, or declined — with move-in dates and reference IDs you can act on.',
    url: 'movesmart.ca/owner/showings',
    component: <ShowingsOffersMockup />,
  },
  {
    title: 'Analytics',
    description:
      'Watch your lead conversion pipeline — from first inquiry to signed lease — and the channels driving it.',
    url: 'movesmart.ca/owner/analytics',
    component: <AnalyticsMockup />,
  },
  {
    title: 'Wallet',
    description:
      'Net income at a glance. Every transaction — rent collected, screening fees, photography, MLS — itemized and exportable.',
    url: 'movesmart.ca/owner/wallet',
    component: <WalletMockup />,
  },
  {
    title: 'Owner Services & Transactions',
    description:
      'Request maintenance, book listing photography, and track income vs. expense across the year — all from one card.',
    url: 'movesmart.ca/owner/services',
    component: <OwnerServicesMockup />,
  },
  {
    title: 'Events Calendar',
    description:
      'Lockbox installs, photo shoots, and key-collection appointments — synced to your month-at-a-glance calendar.',
    url: 'movesmart.ca/owner/calendar',
    component: <EventsCalendarMockup />,
  },
]

function PortalScreensShowcase() {
  // Pre-render each mockup wrapped in its BrowserFrame on the server,
  // then hand them to the client component as plain ReactNodes — only
  // the active one is visible at any time. This avoids cramping the
  // mockups inside a narrow 8-col grid.
  const screens = PORTAL_SCREENS.map((screen) => ({
    title: screen.title,
    description: screen.description,
    url: screen.url,
    frame: <BrowserFrame url={screen.url}>{screen.component}</BrowserFrame>,
  }))
  return <PortalScreensTabbed screens={screens} />
}

export const metadata: Metadata = generatePageMetadata({
  path: '/portal-and-technology/',
  fallbackTitle: 'Owner Portal & Leasing Transparency | MoveSmart Rentals',
  fallbackDescription:
    'Total visibility into your leasing - from listing to signed lease. Track showings, applications, screening progress, approvals, and move-in coordination from one owner login.',
})

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

      {/* SECTION 1 - Editorial hero with composited dashboard + notification card */}
      <EditorialPortalHero />

      {/* SECTION 2 - Press logos */}
      <PressLogos />

      {/* SECTION 3 - Philosophy: 01 / 02 / 03 numbered editorial */}
      <PhilosophyManifesto />

      {/* SECTION 4 - Built in the leasing trenches (image + copy + stat tiles) */}
      <BuiltForOwners />

      {/* SECTION 5 - Editorial 5-step workflow image strip */}
      <WorkflowImageStrip />

      {/* SECTION 6 - Owner portal feature bento (asymmetric, kept) */}
      <OwnersFeaturesBento features={PORTAL_FEATURES} />

      {/* SECTION 7 - Real portal screen mockups in browser frames */}
      <PortalScreensShowcase />

      {/* SECTION 9 - Three roles (Owner / Applicant / Leasing Agent photo cards) */}
      <ThreeRoles />

      {/* SECTION 10 - Owner / Tenant clip-reveal split */}
      <OwnerTenantSplit />

      {/* SECTION 11 - Notifications timeline */}
      <NotificationTimeline />

      {/* SECTION 12 - Security trust strip (single horizontal strip) */}
      <SecurityTrustStrip />

      {/* SECTION 13 - Testimonials wall */}
      <TestimonialsWall />

      {/* SECTION 14 - Portal-specific FAQ */}
      <FAQBlock
        title="Portal & Technology FAQ"
        showQuestionsCta={false}
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

      {/* SECTION 15 - Portal-specific CTA banner */}
      <CTABannerBlock
        headline="See it in 5 minutes."
        description="Book a portal walkthrough with one of our leasing managers - no slides, no sales pitch, just a real owner login on a screen-share."
        primaryCta={{ label: 'Book a Portal Walkthrough', href: '/contact/?intent=demo' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
