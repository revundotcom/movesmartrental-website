import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { BRAND } from '@/lib/brand-constants'
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'
import { BentoTile, RevealRow } from './client-parts'

export const metadata: Metadata = {
  title: 'Leasing Brokerage Services | MoveSmart Rentals Canada',
  description:
    'Full-service leasing execution for individual landlords and institutional operators - strategic pricing, professional marketing, tenant qualification, and lease execution. No upfront fees, success-based pricing.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Leasing Brokerage Services | MoveSmart Rentals Canada',
    description:
      'Nine end-to-end leasing services - from pricing strategy to move-in coordination - for landlords, PMCs, builders, and purpose-built rental operators.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasing Brokerage Services | MoveSmart Rentals Canada',
    description:
      'Strategic, full-service leasing execution for individual landlords and institutional operators across Canada.',
  },
}

/* ──────────────────────────────────────────────────────────────────
 * The 9 leasing-execution services, mapped to the live
 * `/services/[service]/` slugs in `src/data/services-content.ts`.
 * For the bento grid: each service is assigned a verified photo from
 * the page's locked photo set and a size profile.
 * ────────────────────────────────────────────────────────────────── */

type ServiceCard = {
  slug: string
  title: string
  summary: string
  imageId: string
  imageAlt: string
}

const SERVICES: Record<string, ServiceCard> = {
  tenantPlacement: {
    slug: 'tenant-placement',
    title: 'Tenant Placement',
    summary:
      'Pricing, marketing, showings, screening, lease, and move-in - one team running the full placement loop on a single timeline.',
    imageId: 'photo-1554224155-6726b3ff858f',
    imageAlt: 'Property owner handing house keys to a new tenant on move-in day',
  },
  leasingServices: {
    slug: 'leasing-services',
    title: 'Leasing Services',
    summary:
      'Professional photography, MLS plus Canadian portal syndication, agent-led showings, and offer management for one unit or a portfolio.',
    imageId: 'photo-1493809842364-78817add7ffb',
    imageAlt: 'Modern Canadian high-rise rental towers from a low-angle perspective',
  },
  tenantScreening: {
    slug: 'tenant-screening',
    title: 'Tenant Screening',
    summary:
      'Credit, income, employment, and reference verification with a written risk summary - a defensible yes or a documented no on every applicant.',
    imageId: 'photo-1450101499163-c8848c66ca85',
    imageAlt: 'MoveSmart leasing team reviewing applicant files at the signing table',
  },
  rentGuarantee: {
    slug: 'rent-guarantee',
    title: 'Rent Guarantee',
    summary:
      'Optional partner pathway that puts a floor under your rental income - guaranteed monthly rent with clear coverage and claim mechanics.',
    imageId: 'photo-1556745753-b2904692b3cd',
    imageAlt: 'Small-business owner reviewing income statements at her counter',
  },
  tenantInsurance: {
    slug: 'tenant-insurance',
    title: 'Tenant Insurance',
    summary:
      'Tenant insurance coordinated as a lease condition with certificates confirmed before key release - liability covered from day one.',
    imageId: 'photo-1502672023488-70e25813eb80',
    imageAlt: 'Bright open-plan Canadian rental living room ready for move-in',
  },
  tenantGuarantor: {
    slug: 'tenant-guarantor',
    title: 'Tenant Guarantor',
    summary:
      'Structured guarantor program for newcomers, students, and thin-file applicants - underwriting and documentation handled end to end.',
    imageId: 'photo-1551836022-d5d88e9218df',
    imageAlt: 'Two professionals in advisory conversation in a bright office',
  },
  rentalPreparation: {
    slug: 'rental-preparation',
    title: 'Rental Preparation',
    summary:
      'One-time prep work - paint touch-ups, deep clean, light handyman, staging, and landscaping refresh - so the unit shows at its asking rent.',
    imageId: 'photo-1502672023488-70e25813eb80',
    imageAlt: 'Freshly prepared modern condo ready for the rental market',
  },
  portalTech: {
    slug: 'portal-and-technology',
    title: 'Portal & Technology',
    summary:
      'Owner and tenant portals with showings, offers, screening files, lease docs, and live leasing analytics - one place for every decision.',
    imageId: 'photo-1556745753-b2904692b3cd',
    imageAlt: 'Operator reviewing leasing portal analytics on a tablet device',
  },
  institutionalLeaseUp: {
    slug: 'institutional-lease-up',
    title: 'Institutional Lease-Up',
    summary:
      'Bulk leasing infrastructure for builders, PMCs, and purpose-built operators - dedicated teams, live reporting, lease-up against pro-forma.',
    imageId: 'photo-1542744173-8e7e53415bb0',
    imageAlt: 'Institutional operators meeting at a conference table to plan a lease-up',
  },
}

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`
}

/* ──────────────────────────────────────────────────────────────────
 * Service-focused FAQ - fee model and scope clarifications
 * ────────────────────────────────────────────────────────────────── */

const SERVICE_FAQ = [
  {
    question: 'How are you priced - and what does "no monthly percentage" mean?',
    answer:
      'There is zero upfront cost and zero ongoing monthly percentage. We earn a one-time success fee only when a qualified tenant is placed and the lease is signed. If we do not place a tenant, you pay nothing. Institutional lease-up engagements are scoped per project with transparent line-item pricing.',
  },
  {
    question: 'Are you a property manager?',
    answer:
      'No. MoveSmart Rentals is a full-service leasing and tenant placement company. Our scope is the leasing lifecycle - pricing, marketing, showings, qualification, lease execution, and move-in. We do not collect monthly rent, dispatch maintenance, file LTB notices, or issue year-end tax statements. If you need ongoing management, we can refer trusted partners.',
  },
  {
    question: 'What exactly is included in a placement?',
    answer:
      'Strategic pricing, professional marketing, listing distribution, showing coordination, applicant qualification, lease drafting and signing, deposit collection, and a documented move-in inspection. Optional add-ons include rental protection insurance referrals and one-time pre-listing prep work.',
  },
  {
    question: 'Do you work with builders, PMCs, and purpose-built rental operators?',
    answer:
      'Yes. Institutional Lease-Up is a dedicated practice. We deploy leasing teams, run pre-leasing campaigns, report on funnel and absorption against pro-forma, and align timelines to occupancy and turnover schedules. Engagements typically begin 60-120 days before first occupancy.',
  },
  {
    question: 'Do you handle ongoing maintenance, rent collection, or evictions?',
    answer:
      'No. Those sit outside leasing-execution scope. We focus on placing the right tenant on the right lease, so the asset is set up cleanly. For ongoing operations we maintain a referral list of trusted property management partners.',
  },
  {
    question: 'Can I choose only some of the nine services?',
    answer:
      'For individual landlords the services run as one continuous workflow - they are designed to interlock. For institutional engagements we scope modular packages: marketing-only, qualification-only, or full lease-up.',
  },
  {
    question: 'How do you protect owners during qualification?',
    answer:
      'Every applicant goes through credit, income, employment, and reference verification, plus a written risk summary and provincial compliance check. You receive a defensible record for every approval and decline.',
  },
]

/* ──────────────────────────────────────────────────────────────────
 * Commitments shown in the staggered editorial rows below the bento
 * ────────────────────────────────────────────────────────────────── */

const COMMITMENTS = [
  {
    number: '01',
    title: 'Zero upfront, zero monthly percentage',
    body:
      'No retainer, no setup fee, no ongoing slice of your rent. A single success fee on placement - or you pay nothing at all.',
  },
  {
    number: '02',
    title: 'Documented decisions at every stage',
    body:
      'Pricing rationale, marketing assets, showing logs, screening files, signed lease, and move-in inspection - archived in your portal and exportable on demand.',
  },
  {
    number: '03',
    title: 'A single point of contact, end to end',
    body:
      'One dedicated leasing lead from listing prep to key handover. No call-centre triage, no losing the thread between two agents.',
  },
]

/* ──────────────────────────────────────────────────────────────────
 * Stats strip - 4 quick proof points, rendered as ruled inline rows
 * ────────────────────────────────────────────────────────────────── */

const STATS_STRIP = [
  { value: '20+', label: 'Cities served', detail: 'GTA + Ontario priority, expanding west' },
  { value: '18 Days', label: 'Avg time to lease', detail: 'Pricing-to-key-handover, on Canadian portals' },
  { value: '12+', label: 'Portals syndicated', detail: 'MLS, Realtor.ca, Kijiji, Zumper, Padmapper' },
  { value: '$0', label: 'Upfront cost', detail: 'Success-fee on placement, no retainer' },
]

export default function ServicesPage() {
  /* ── JSON-LD: each service as Service entity for SEO/AEO ── */
  const servicesArray = Object.values(SERVICES)

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MoveSmart Rentals Leasing Services',
    description:
      'Nine end-to-end leasing services for Canadian landlords and institutional rental operators.',
    itemListElement: servicesArray.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.summary,
        url: `${BRAND.url}/services/${s.slug}/`,
        provider: {
          '@type': 'Organization',
          name: BRAND.name,
          url: BRAND.url,
        },
        areaServed: 'CA',
      },
    })),
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SERVICE_FAQ.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  /* ── Hero aside: dual-audience card ── */
  const heroAside = (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-sm backdrop-blur-md sm:p-7">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-px w-24 bg-gradient-to-l from-brand-gold to-transparent"
      />
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
        Who we serve
      </p>
      <h2 className="mt-2 font-display text-xl font-normal text-white sm:text-2xl">
        Two audiences, one playbook
        <span aria-hidden="true" className="text-brand-gold">
          .
        </span>
      </h2>
      <div className="mt-5 space-y-4">
        <a
          href="#services-bento"
          className="group block rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-brand-emerald/50 hover:bg-white/10"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            For individual landlords
          </p>
          <p className="mt-1.5 text-sm font-medium text-white group-hover:underline group-hover:decoration-brand-gold group-hover:underline-offset-4">
            One unit or a small portfolio - placed end to end.
          </p>
        </a>
        <a
          href="#services-bento"
          className="group block rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-brand-emerald/50 hover:bg-white/10"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            For builders, PMCs &amp; operators
          </p>
          <p className="mt-1.5 text-sm font-medium text-white group-hover:underline group-hover:decoration-brand-gold group-hover:underline-offset-4">
            Bulk lease-up infrastructure with reporting against pro-forma.
          </p>
        </a>
      </div>
      <p className="mt-5 border-t border-white/15 pt-4 text-[11px] leading-relaxed text-white/65">
        Zero upfront. Zero monthly percentage. Success-based fee on placement.
      </p>
    </div>
  )

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/' },
          ]}
        />
      </div>

      {/* ── 1. HERO - dark photographic Toronto skyline backdrop ──── */}
      <PageHeroBlock
        kicker="Services"
        eyebrow="Full-Service Leasing &amp; Tenant Placement"
        headline="Nine services. One leased unit."
        accentLastWord={false}
        lede="From pricing strategy to move-in inspection, MoveSmart Rentals runs the leasing lifecycle end to end - so individual landlords get peace of mind, and institutional operators get a leasing team that scales with them."
        cta1={{ label: 'List my property', href: PORTAL_OWNER_SIGNUP_URL }}
        cta2={{ label: 'Browse rentals', href: '/properties/' }}
        aside={heroAside}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=2400&q=80&auto=format&fit=crop"
        backgroundImageAlt="Toronto skyline at dusk - the Canadian rental market MoveSmart leases across"
      />

      {/* ── 2. BENTO GRID - asymmetric service tiles ──────────────── */}
      <section
        id="services-bento"
        className="relative scroll-mt-24 overflow-hidden bg-[#FBFAF6] py-12 sm:py-20 lg:py-24"
      >
        {/* Decorative dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-8 grid items-end gap-6 sm:mb-12 sm:gap-8 md:mb-14 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                  The nine services
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                  Every step of leasing,{' '}
                  <span className="font-display italic text-brand-emerald">in one place</span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </div>
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg md:col-span-5">
                Nine interlocking services that take your unit from market read to move-in inspection. Tap any tile to see how that service runs.
              </p>
            </div>
          </RevealOnScroll>

          {/* ── BENTO GRID ───────────────────────────────────────────
              Layout (lg+):
              Row 1: [Placement WIDE col-2 row-2] [Leasing TALL col-1 row-2] [Stat 20+ col-1]
              Row 2: continued tall tiles ............................. [CTA "Talk" col-1]
              Row 3: [Screening col-1] [Lease-Up WIDE col-2] [Insurance col-1]
              Row 4: [Editorial Insurance TALL col-2 row-2] [Guarantor col-1] [Stat $0 col-1]
              Row 5: continued .................................. [Prep col-1] [Portal col-1]
              Row 6: [Rent Guar WIDE col-2] [Stat 18d col-1] [Final CTA col-1]
          ─────────────────────────────────────────────────────────── */}
          {/* grid-flow-dense packs tiles to fill any gaps created by the
              col-span-2 / row-span-2 mix at sm and lg breakpoints. Without
              it, the auto-placer can leave a blank cell visible on screen.
              Row heights tuned per breakpoint: mobile gets 220px so the
              image (top half) and text overlay (bottom half) both have
              real estate; tablet/desktop get progressively more so the
              full-bleed photo reads as the design element it is. */}
          <div className="grid auto-rows-[220px] grid-flow-row-dense grid-cols-1 gap-4 sm:auto-rows-[230px] sm:grid-cols-2 sm:gap-5 lg:auto-rows-[260px] lg:grid-cols-4 lg:gap-6">
            {/* TILE 1 - Tenant Placement (LARGE: col-2 row-2) hero of the grid */}
            <BentoTile
              index={0}
              variant="image"
              className="sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2"
              href={`/services/${SERVICES.tenantPlacement.slug}/`}
              title={SERVICES.tenantPlacement.title}
              summary={SERVICES.tenantPlacement.summary}
              imageSrc={unsplash(SERVICES.tenantPlacement.imageId)}
              imageAlt={SERVICES.tenantPlacement.imageAlt}
              bodySize="xl"
            />

            {/* TILE 2 - Leasing Services (TALL: col-1 row-2) */}
            <BentoTile
              index={1}
              variant="image"
              className="sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2"
              href={`/services/${SERVICES.leasingServices.slug}/`}
              title={SERVICES.leasingServices.title}
              summary={SERVICES.leasingServices.summary}
              imageSrc={unsplash(SERVICES.leasingServices.imageId)}
              imageAlt={SERVICES.leasingServices.imageAlt}
              bodySize="lg"
            />

            {/* TILE 3 - Stat tile (SMALL) */}
            <BentoTile
              index={2}
              variant="stat"
              className="sm:col-span-1 lg:col-span-1"
              statValue="20+"
              statLabel="Cities served"
              summary="GTA-led, expanding west across Ontario, BC, and Alberta."
              bg="emerald"
            />

            {/* TILE 4 - CTA tile (SMALL) */}
            <BentoTile
              index={3}
              variant="cta"
              className="sm:col-span-1 lg:col-span-1"
              href="/contact/?type=owner&intent=call"
              title="Book a 15-min call"
              ctaLabel="Schedule"
              bg="navy"
            />

            {/* TILE 5 - Tenant Screening (MEDIUM) */}
            <BentoTile
              index={4}
              variant="image"
              className="sm:col-span-1 lg:col-span-1"
              href={`/services/${SERVICES.tenantScreening.slug}/`}
              title={SERVICES.tenantScreening.title}
              imageSrc={unsplash(SERVICES.tenantScreening.imageId)}
              imageAlt={SERVICES.tenantScreening.imageAlt}
              bodySize="md"
            />

            {/* TILE 6 - Institutional Lease-Up (WIDE: col-2) */}
            <BentoTile
              index={5}
              variant="image"
              className="sm:col-span-2 lg:col-span-2"
              href={`/services/${SERVICES.institutionalLeaseUp.slug}/`}
              title={SERVICES.institutionalLeaseUp.title}
              summary={SERVICES.institutionalLeaseUp.summary}
              imageSrc={unsplash(SERVICES.institutionalLeaseUp.imageId)}
              imageAlt={SERVICES.institutionalLeaseUp.imageAlt}
              bodySize="lg"
            />

            {/* TILE 7 - Tenant Insurance (MEDIUM, image) */}
            <BentoTile
              index={6}
              variant="image"
              className="sm:col-span-1 lg:col-span-1"
              href={`/services/${SERVICES.tenantInsurance.slug}/`}
              title={SERVICES.tenantInsurance.title}
              imageSrc={unsplash(SERVICES.tenantInsurance.imageId)}
              imageAlt={SERVICES.tenantInsurance.imageAlt}
              bodySize="md"
            />

            {/* TILE 8 - Tenant Guarantor (TALL: row-2) */}
            <BentoTile
              index={7}
              variant="image"
              className="sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2"
              href={`/services/${SERVICES.tenantGuarantor.slug}/`}
              title={SERVICES.tenantGuarantor.title}
              summary={SERVICES.tenantGuarantor.summary}
              imageSrc={unsplash(SERVICES.tenantGuarantor.imageId)}
              imageAlt={SERVICES.tenantGuarantor.imageAlt}
              bodySize="lg"
            />

            {/* TILE 9 - Rental Preparation (MEDIUM) */}
            <BentoTile
              index={8}
              variant="image"
              className="sm:col-span-1 lg:col-span-2"
              href={`/services/${SERVICES.rentalPreparation.slug}/`}
              title={SERVICES.rentalPreparation.title}
              summary={SERVICES.rentalPreparation.summary}
              imageSrc={unsplash(SERVICES.rentalPreparation.imageId)}
              imageAlt={SERVICES.rentalPreparation.imageAlt}
              bodySize="md"
            />

            {/* TILE 10 - Stat tile $0 (SMALL) */}
            <BentoTile
              index={9}
              variant="stat"
              className="sm:col-span-1 lg:col-span-1"
              statValue="$0"
              statLabel="Upfront cost"
              summary="Success fee on placement - or you pay nothing at all."
              bg="gold"
            />

            {/* TILE 11 - Portal & Technology (MEDIUM) */}
            <BentoTile
              index={10}
              variant="image"
              className="sm:col-span-1 lg:col-span-1"
              href={`/services/${SERVICES.portalTech.slug}/`}
              title={SERVICES.portalTech.title}
              imageSrc={unsplash(SERVICES.portalTech.imageId)}
              imageAlt={SERVICES.portalTech.imageAlt}
              bodySize="md"
            />

            {/* TILE 12 - Rent Guarantee (WIDE: col-2) */}
            <BentoTile
              index={11}
              variant="image"
              className="sm:col-span-2 lg:col-span-2"
              href={`/services/${SERVICES.rentGuarantee.slug}/`}
              title={SERVICES.rentGuarantee.title}
              summary={SERVICES.rentGuarantee.summary}
              imageSrc={unsplash(SERVICES.rentGuarantee.imageId)}
              imageAlt={SERVICES.rentGuarantee.imageAlt}
              bodySize="lg"
            />

            {/* TILE 13 - Stat: avg days to lease (SMALL) */}
            <BentoTile
              index={12}
              variant="stat"
              className="sm:col-span-1 lg:col-span-1"
              statValue="18 Days"
              statLabel="Avg pricing-to-key handover"
              summary="On Canadian rental portals, all property types."
              bg="cream"
            />

            {/* TILE 14 - Final CTA (SMALL) */}
            <BentoTile
              index={13}
              variant="cta"
              className="sm:col-span-1 lg:col-span-1"
              href="/contact/?type=owner"
              title="Get a market read"
              summary="Live rent comps for your unit - no obligation."
              ctaLabel="Start now"
              bg="emerald"
            />
          </div>
        </div>
      </section>

      {/* ── 3. EDITORIAL BRIDGE - full-service execution photograph ─ */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-navy/20 lg:col-span-7">
              <Image
                src="https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1600&q=80&auto=format&fit=crop"
                alt="Spacious move-in-ready open-plan living room in a Canadian rental"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                unoptimized
              />
              {/* Floating proof badge */}
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
                      Move-in
                    </p>
                    <p className="font-display text-lg text-brand-navy">Inspected</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Full-service execution
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                A defensible paper trail{' '}
                <span className="font-display italic text-brand-emerald">
                  for every decision
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Province-specific lease templates, e-signature workflow, deposits held in trust, condition reports with photo evidence - every stage of the engagement is structured, recorded, and archived. If anything is ever questioned, the answer is already in the file.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact/?type=owner"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-px hover:bg-emerald-500 hover:shadow-lg"
                >
                  Get a market read
                </Link>
                <Link
                  href="/owners/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/15 bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all duration-300 hover:-translate-y-px hover:border-brand-emerald/40 hover:bg-emerald-50"
                >
                  Owner overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. STATS STRIP - staggered ruled rows (not a uniform 4-up grid) ─ */}
      <section className="relative isolate overflow-hidden bg-[#0B1D3A] py-12 text-white sm:py-20 lg:py-24">
        {/* Subtle radial accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 size-[500px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.08] blur-3xl"
        />
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
            <div className="mb-8 max-w-2xl sm:mb-12">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
                Proof in numbers
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                The leasing engine,{' '}
                <span className="font-display italic text-brand-emerald">measured</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {STATS_STRIP.map((stat, idx) => (
              <RevealRow
                key={stat.label}
                index={idx}
                className="grid grid-cols-1 items-baseline gap-4 py-7 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-3">
                  <p
                    className="font-display text-5xl font-normal leading-none text-brand-gold sm:text-6xl md:text-7xl"
                    aria-hidden="true"
                  >
                    {stat.value}
                    <span className="text-brand-emerald">.</span>
                  </p>
                </div>
                <div
                  className={`md:col-span-4 ${idx % 2 === 1 ? 'md:col-start-5' : ''}`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                    {stat.label}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                    {stat.detail}
                  </p>
                </div>
              </RevealRow>
            ))}
          </div>

          {/* Commitments below the stats - same staggered cadence */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
            {COMMITMENTS.map((c, idx) => (
              <RevealRow
                key={c.number}
                index={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7"
              >
                <span
                  className="font-display text-3xl font-normal leading-none text-brand-gold sm:text-4xl"
                  aria-hidden="true"
                >
                  {c.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-normal leading-snug text-white sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{c.body}</p>
              </RevealRow>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ─────────────────────────────────────────────────── */}
      <div id="faq" className="scroll-mt-24">
        <FAQBlock
          questions={SERVICE_FAQ}
          title="Questions about scope and pricing"
          showQuestionsCta={false}
        />
      </div>

      {/* ── 6. CUSTOM DARK CTA - replaces killed CTABannerBlock ──── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-12 text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-brand-emerald/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 size-[360px] rounded-full bg-brand-gold/[0.10] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Ready when you are
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                Hand the leasing playbook{' '}
                <span className="font-display italic text-emerald-300">off</span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                List your property and we will pull live market rent for your unit and walk you through the nine-service workflow - no obligation, no upfront cost.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={PORTAL_OWNER_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-emerald px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-px hover:bg-emerald-500 hover:shadow-xl"
              >
                List my property
              </a>
              <Link
                href="/contact/?type=owner&intent=call"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:border-brand-gold/60 hover:bg-white/10"
              >
                Talk to a leasing advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
