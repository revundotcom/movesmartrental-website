import type { Metadata } from 'next'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { TestimonialsSection } from '@/components/blocks/testimonials-section'
import { GuaranteeSection } from '@/components/blocks/guarantee-section'
import { FAQBlock } from '@/components/blocks/faq-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { sanityFetch } from '@/sanity/fetch'
import { SERVICE_ALL_QUERY } from '@/sanity/queries/service'
import type { ServiceCardData } from '@/types/blocks'

import { ServicesLongform, type SectionEntry } from './services-longform'

export const metadata: Metadata = {
  title: 'Property Management Services Canada | End-to-End Leasing',
  description:
    'Full-service property management from photography to lease renewal. Tenant screening, MLS syndication, RTA compliance, vendor coordination, and rent protection - across 20+ Canadian markets.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Property Management Services Canada | MoveSmart Rentals',
    description:
      'Full-service property management from photography to lease renewal. RTA-compliant, vendor-coordinated, and built for Canadian landlords.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management Services Canada | MoveSmart Rentals',
    description:
      'Full-service property management from photography to lease renewal - built for Canadian landlords.',
  },
}

/* ── Section anchors used by the sticky scroll-spy sidebar ── */
const SECTION_INDEX: SectionEntry[] = [
  { id: 'service-catalogue', label: 'Service catalogue', hint: '8 core services' },
  { id: 'tiers', label: 'Service tiers', hint: 'Essential vs. Full-Service' },
  { id: 'playbook', label: 'Leasing playbook', hint: '8 phases, day by day' },
  { id: 'vendor-network', label: 'Vendor & partner network', hint: '200+ vetted pros' },
  { id: 'compliance', label: 'Canadian compliance', hint: 'RTA, LTB, deposits' },
  { id: 'add-ons', label: 'Optional add-ons', hint: '6 enhancements' },
]

/* ── Service tiers comparison data ── */
const TIER_INCLUSIONS = [
  { feature: 'Professional photography & listing copy', essential: true, full: true },
  { feature: 'MLS, Realtor.ca & syndicated portal distribution', essential: true, full: true },
  { feature: 'Tenant screening (credit, employment, references)', essential: true, full: true },
  { feature: 'RTA-compliant lease drafting & e-signature', essential: true, full: true },
  { feature: 'Move-in inspection & key handover', essential: true, full: true },
  { feature: 'Monthly rent collection & owner disbursement', essential: false, full: true },
  { feature: '24/7 maintenance hotline & vendor dispatch', essential: false, full: true },
  { feature: 'Mid-lease inspections (semi-annual)', essential: false, full: true },
  { feature: 'LTB / N-series notice handling & hearings', essential: false, full: true },
  { feature: 'Year-end statements & T776 tax-slip prep', essential: false, full: true },
  { feature: 'Lease renewal negotiation & rent reviews', essential: false, full: true },
]

/* ── Service FAQ ── */
const SERVICE_FAQ = [
  {
    question: 'Can I pick à la carte services or do I need full management?',
    answer:
      'Yes. Many owners begin with our Essential Leasing tier - placement only - and graduate into Full-Service Management later. You can also bolt on individual services (mid-lease inspections, eviction support, T776 prep) at any time without changing your tier.',
  },
  {
    question: 'Do you handle vacancies in winter, when the market slows?',
    answer:
      'Winter is when our marketing team works hardest. We adjust pricing models in November, push twilight photography, target relocation tenants, and lean on our corporate-housing partners. Average winter fill time stays under 21 days across our managed portfolio.',
  },
  {
    question: "What's actually included in 'Full-Service Management'?",
    answer:
      'Everything in Essential Leasing plus rent collection, vendor dispatch, mid-lease inspections, LTB notice handling, year-end tax statements, and lease-renewal negotiation. You receive a single monthly statement and a dedicated property manager - not a call centre.',
  },
  {
    question: 'How do you handle multi-unit buildings or small portfolios?',
    answer:
      'Portfolios of three or more units get a portfolio-tier monthly fee, a single point of contact, and consolidated reporting. Multi-unit buildings (6+ doors) move onto our small-MFR program with on-site weekly visits and dedicated maintenance routing.',
  },
  {
    question: 'Do you serve out-of-province or overseas owners?',
    answer:
      'Roughly a third of our owners live outside the property\'s province; many are abroad. We provide secure online portals, time-zoned monthly calls, signed-photo move-in/move-out packages, and act as your registered RTA contact and condo-board liaison.',
  },
  {
    question: 'Can I keep my preferred vendors - plumber, handyman, accountant?',
    answer:
      'Absolutely. We dispatch your trade book first and only fall back to our vendor network if your contact is unreachable inside the SLA window. Owner-preferred vendors can be added on day one of onboarding.',
  },
  {
    question: 'What happens if I want to sell the property mid-lease?',
    answer:
      'We coordinate showings around tenant rights (24-hour notice in Ontario), prepare the N12 if the buyer intends to occupy, and hand off the lease and deposit ledger to your real-estate counsel. We also have an in-house brokerage referral if you need a listing agent.',
  },
  {
    question: 'How do you report on what you have actually done each month?',
    answer:
      'You receive a single monthly statement with rent ledger, expense receipts, completed work-orders with before/after photos, vacancy and inquiry stats, and a one-page summary from your dedicated manager. Year-end packets include T776-ready totals.',
  },
]

export default async function ServicesPage() {
  const services = await sanityFetch<ServiceCardData[]>({
    query: SERVICE_ALL_QUERY,
    tags: ['service'],
  })

  /* ── Hero aside: editorial table-of-contents card ── */
  const heroAside = (
    <div className="relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-px w-24 bg-gradient-to-l from-brand-gold to-transparent"
      />
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
        A long-form services document
      </p>
      <h2 className="mt-2 font-display text-xl font-normal text-brand-navy">
        Six chapters
        <span aria-hidden="true" className="text-brand-gold">.</span>
      </h2>
      <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
        Read it end to end like a rentbook, or jump to the chapter you need.
      </p>
      <ol className="mt-5 space-y-2.5">
        {SECTION_INDEX.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group flex items-baseline gap-3 text-sm transition-colors"
            >
              <span className="font-mono text-[10px] font-semibold tracking-wider text-brand-navy/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-medium text-brand-navy group-hover:text-brand-emerald group-hover:underline group-hover:decoration-brand-gold group-hover:underline-offset-4">
                {section.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
          ]}
        />
      </div>

      {/* ── 1. Editorial page hero ── */}
      <PageHeroBlock
        kicker="Services"
        eyebrow="Full-Service Property Management"
        headline="End-to-End Leasing Done Right"
        lede="From wide-angle photography to lease-renewal negotiation, we run every workflow a Canadian landlord is supposed to - so your unit stays leased, compliant, and cash-flowing."
        cta1={{ label: 'Book a Discovery Call', href: '/contact/' }}
        cta2={{ label: 'See Pricing', href: '/pricing/' }}
        meta={[
          { label: 'Service categories', value: '8' },
          { label: 'Avg. fill time', value: '14 days' },
          { label: 'Vendor network', value: '200+' },
          { label: 'Markets', value: '20+ cities' },
        ]}
        aside={heroAside}
      />

      {/* ── 2-7. Long-form scroll-spy document ── */}
      <ServicesLongform
        sectionIndex={SECTION_INDEX}
        tierRows={TIER_INCLUSIONS}
        catalogue={
          <ServiceGridBlock services={services} columns={3} showHeading={false} />
        }
      />

      {/* ── 8. Testimonials ── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Owners on our service breadth
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              When it works,{' '}
              <span className="font-display italic text-brand-emerald">all of it</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* ── 9. Guarantee ── */}
      <GuaranteeSection />

      {/* ── 10. Service-specific FAQ ── */}
      <div id="faq" className="scroll-mt-24">
        <FAQBlock
          questions={SERVICE_FAQ}
          title="Questions owners ask about our services"
        />
      </div>

      {/* ── 11. CTA banner ── */}
      <CTABannerBlock
        headline="Ready to hand the playbook off?"
        description="Book a 20-minute discovery call. We will tour the unit (in person or video), pull your market rent, and quote a service tier with no obligation."
        primaryCta={{ label: 'Book a Discovery Call', href: '/contact/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />
    </main>
  )
}
