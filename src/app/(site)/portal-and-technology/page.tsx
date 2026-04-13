import type { Metadata } from 'next'
import {
  Building2,
  Wallet,
  Wrench,
  FileText,
  ClipboardList,
  Lock,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { OwnersFeaturesBento } from '@/components/blocks/owners-features-bento'
import { TestimonialsSection } from '@/components/blocks/testimonials-section'
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
  fallbackTitle: 'Owner Portal & Technology | MoveSmart Rentals',
  fallbackDescription:
    'Total visibility into your property - built around real account managers. Live rent ledger, work-order tracking, statements, and a tenant portal that lowers turnover.',
})

/* ─────────────────────────────────────────────────────────────────────────── */
/* Hero aside - small editorial "what you'll see today" panel                  */
/* ─────────────────────────────────────────────────────────────────────────── */

const HERO_ASIDE_ITEMS = [
  { icon: Building2, label: 'Properties', detail: 'all units at a glance' },
  { icon: Wallet, label: 'Rent ledger', detail: 'paid · pending · late' },
  { icon: Wrench, label: 'Work orders', detail: 'open and resolved' },
  { icon: FileText, label: 'Documents', detail: 'leases · inspections' },
  { icon: ClipboardList, label: 'Statements', detail: 'monthly + tax docs' },
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
        Five sections.{' '}
        <span className="font-display italic text-brand-emerald">One login</span>
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
/* Owner portal feature bento (six tiles, asymmetric)                          */
/* ─────────────────────────────────────────────────────────────────────────── */

const PORTAL_FEATURES = [
  {
    iconKey: 'DollarSign',
    title: 'Live rent ledger',
    description:
      'See every payment as it lands. Status - paid, pending, or late - updated in real time, with full history exportable any time.',
  },
  {
    iconKey: 'Zap',
    title: 'Work-order tracker',
    description:
      'Every maintenance request, from first message to vendor invoice, with photos, timestamps, and approval trail attached.',
  },
  {
    iconKey: 'Megaphone',
    title: 'Tenant communications log',
    description:
      "Every message between your account manager and your tenant - searchable, dated, never lost in someone's inbox.",
  },
  {
    iconKey: 'Shield',
    title: 'Document vault',
    description:
      'Leases, inspection reports, condition photos, addenda - all filed against the right unit and a click away.',
  },
  {
    iconKey: 'TrendingUp',
    title: 'Monthly statements + tax docs',
    description:
      'Auto-generated every month. Year-end T776-ready summary your accountant will actually thank you for.',
  },
  {
    iconKey: 'CheckCircle',
    title: 'Maintenance approvals',
    description:
      'One-tap approve or decline on any spend above your threshold. Nothing happens to your property without your call.',
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
        eyebrow="Owner Visibility, Done Right"
        headline="Total Visibility, Zero Hassle"
        lede="Your dedicated account manager handles the work. The portal lets you see every step - anytime, from anywhere."
        cta1={{ label: 'Tour the Portal', href: '#walkthrough' }}
        cta2={{ label: 'Get a Demo', href: '/contact/?intent=demo' }}
        meta={[
          { label: 'Real-time updates', value: 'Yes' },
          { label: 'Mobile + desktop', value: 'Both' },
          { label: 'Reports', value: 'Auto' },
          { label: 'Support', value: 'Mon-Sat' },
        ]}
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
              &ldquo;I always know what&rsquo;s happening with my{' '}
              <span className="font-display italic text-brand-emerald">property</span>
              <span className="text-brand-gold">.&rdquo;</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              The visibility owners ask us about most isn&rsquo;t a metric - it&rsquo;s
              the feeling of never being in the dark.
            </p>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* SECTION 9 - Portal-specific FAQ */}
      <FAQBlock
        title="Portal & Technology FAQ"
        questions={[
          {
            question: 'Is there a mobile app?',
            answer:
              'The portal is a fully responsive web app - works on any phone or tablet browser, no download required. Most owners save it to their home screen for one-tap access. We chose this so you never have to wait for an app update to see your data.',
          },
          {
            question: 'Can my accountant get access?',
            answer:
              'Yes. You can grant your accountant a read-only role with access to statements, ledgers, and tax-ready summaries. They cannot see tenant communications or change anything. You can revoke access any time from your settings.',
          },
          {
            question: 'How do I download tax docs?',
            answer:
              'Year-end summaries (T776-ready in Canada, Schedule E-ready in the US) are auto-generated by January 15. Download as PDF or CSV from the Statements section, or have them auto-emailed to you and your accountant.',
          },
          {
            question: 'What if I have multiple properties?',
            answer:
              'The portal is built for portfolios. Toggle between unit-level detail and a portfolio-wide roll-up of revenue, occupancy, and open work orders. Owners with 12+ units use the portfolio dashboard as their daily home screen.',
          },
          {
            question: 'Do tenants see what I see?',
            answer:
              'No. Tenants have a separate portal scoped strictly to their own unit - their lease, their payments, their maintenance requests. They cannot see your financials, other units, or any owner-side data.',
          },
          {
            question: 'Is my data encrypted?',
            answer:
              'Yes. 256-bit AES encryption at rest, TLS 1.3 in transit, role-based access controls, and bank-grade (PCI-DSS) payment processing. We are PIPEDA compliant and host Canadian owner data on Canadian infrastructure where applicable.',
          },
          {
            question: 'What happens if I cancel - do I lose my history?',
            answer:
              'No. You receive a complete export of your records - leases, statements, communications, inspections, photos - in a portable format (PDF + CSV) before access ends. We retain a copy for the legally required period and then delete on request.',
          },
        ]}
      />

      {/* SECTION 10 - Portal-specific CTA banner */}
      <CTABannerBlock
        headline="See it in 5 minutes."
        description="Book a portal walkthrough with one of our account managers - no slides, no sales pitch, just a real owner login on a screen-share."
        primaryCta={{ label: 'Book a Portal Walkthrough', href: '/contact/?intent=demo' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
