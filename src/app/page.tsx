import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Monitor,
  User,
  Building,
  ArrowRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { WaveDivider } from '@/components/ui/wave-divider'
import { HeroBlock } from '@/components/blocks/hero-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PortalChips } from '@/components/blocks/portal-chips'
import { PortalVisibilityBlock } from '@/components/blocks/portal-visibility-block'
import { RentCalculator } from '@/components/blocks/rent-calculator'
import { AudienceSegmentation } from '@/components/blocks/audience-segmentation'
import { BuyOutputBlock } from '@/components/blocks/buy-output-block'
import { ProblemSolutionShowcase } from '@/components/blocks/problem-solution-showcase'
import { CaseStudySection } from '@/components/blocks/case-study-card'
import { NorthAmericaShowcase } from '@/components/blocks/north-america-showcase'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema } from '@/lib/schema-builders/organization'
import { buildWebSiteSchema } from '@/lib/schema-builders/website'
import { buildLocalBusinessSchema } from '@/lib/schema-builders/local-business'
import { generatePageMetadata } from '@/lib/metadata'
import { PORTAL_LOGIN_URL } from '@/lib/portal-api'
import { BrowserFrame } from '@/components/ui/browser-frame'
import { OwnerDashboardMockup } from '@/components/portal-mockups/owner-dashboard-mockup'

/* ---------- Metadata ---------- */

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: '/',
    fallbackTitle:
      'MoveSmart Rentals | Full-Service Leasing & Tenant Placement Across Canada and the United States',
    fallbackDescription:
      'Full-service leasing and tenant placement with technology, transparency, and broad advertising exposure. End-to-end execution from listing to move-in, disciplined screening, rental protection options, and zero upfront cost.',
  })
}

/* ---------- Page ---------- */

export default async function HomePage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  const organizationSchema = buildOrganizationSchema({
    name: 'MoveSmart Rentals',
    url: siteUrl,
    logo: `${siteUrl}/og-default.png`,
    description:
      'Full-service leasing and tenant placement company delivering end-to-end leasing execution for individual landlords, builders, PMCs, and institutional rental operators. Listing to move-in, with broad multi-platform advertising, disciplined screening, and rental protection options.',
    contactEmail: 'contact@movesmartrentals.com',
    socialLinks: [
      'https://www.facebook.com/movesmartrentals',
      'https://www.instagram.com/movesmartrentals',
      'https://www.linkedin.com/company/movesmart-rentals/',
      'https://www.tiktok.com/@movesmartrentals',
      'https://x.com/Movesmartrental',
    ],
  })

  const webSiteSchema = buildWebSiteSchema({
    url: siteUrl,
    name: 'MoveSmart Rentals',
  })

  const localBusinessSchema = buildLocalBusinessSchema({
    name: 'MoveSmart Rentals',
    description:
      'Full-service leasing and tenant placement company for Canadian landlords, builders, PMCs, and institutional rental operators. End-to-end leasing execution from listing to move-in with zero upfront cost.',
    url: siteUrl,
    phone: '+18005959755',
    address: {
      streetAddress: '1 King St W, Suite 4801',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5H 1A1',
      country: 'CA',
    },
    areaServed: 'Ontario, Canada',
    openingHours: ['Mo-Fr 09:00-18:00'],
  })

  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <JsonLd data={localBusinessSchema} />

      {/* ── SECTION 1: Hero ── */}
      <section className="relative overflow-hidden">
        <HeroBlock
          headline="Leasing, handled"
          subheadline="MoveSmart Rentals is a full-service leasing partner powered by our proprietary technology — built to help landlords lease faster, reduce vacancy, and screen every applicant. We syndicate your unit to the MLS and 20+ platforms and handle every step from listing to move-in."
          cta1={{ label: 'List my property', href: '/contact/?type=owner' }}
          cta2={{ label: 'Browse rentals', href: '/properties/' }}
          statStrip={[
            { value: 'MLS + Rental Network', label: 'Broad listing exposure' },
            { value: 'Live Owner Portal', label: 'Real-time leasing visibility' },
            { value: 'Screened Applicant Flow', label: 'Applications organized for review' },
          ]}
          priority
        />
      </section>

      {/* ── SECTION 2: Trust / Press marquee ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-r from-slate-50 via-white to-slate-50 py-10">
        {/* Decorative line accent */}
        <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4">
          {/* Media / trust logo marquee */}
          <div>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              As seen in
            </p>
            <div className="relative mt-5 overflow-hidden">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
              <div className="flex animate-marquee items-center gap-16 whitespace-nowrap opacity-40 grayscale">
                {/* Toronto Star */}
                <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-label="Toronto Star">
                  <text x="0" y="21" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="700" fill="#0B1D3A" letterSpacing="-0.3">Toronto</text>
                  <text x="74" y="21" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="400" fill="#0B1D3A" fontStyle="italic" letterSpacing="-0.3"> Star</text>
                </svg>
                {/* Globe and Mail */}
                <svg width="200" height="28" viewBox="0 0 200 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-label="Globe and Mail">
                  <text x="0" y="21" fontFamily="'Times New Roman', Georgia, serif" fontSize="18" fontWeight="700" fill="#0B1D3A" letterSpacing="0.2">THE GLOBE AND MAIL</text>
                </svg>
                {/* REIC */}
                <svg width="72" height="28" viewBox="0 0 72 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-label="REIC">
                  <text x="0" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="800" fill="#0B1D3A" letterSpacing="2">REIC</text>
                </svg>
                {/* FRPO */}
                <svg width="72" height="28" viewBox="0 0 72 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-label="FRPO">
                  <text x="0" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="800" fill="#0B1D3A" letterSpacing="2">FRPO</text>
                </svg>
                {/* REP Magazine */}
                <svg width="160" height="28" viewBox="0 0 160 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-label="REP Magazine">
                  <text x="0" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="800" fill="#0B1D3A" letterSpacing="1">REP</text>
                  <text x="52" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="400" fill="#0B1D3A" letterSpacing="1"> MAGAZINE</text>
                </svg>
                {/* Duplicate set for seamless loop */}
                <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                  <text x="0" y="21" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="700" fill="#0B1D3A" letterSpacing="-0.3">Toronto</text>
                  <text x="74" y="21" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="400" fill="#0B1D3A" fontStyle="italic" letterSpacing="-0.3"> Star</text>
                </svg>
                <svg width="200" height="28" viewBox="0 0 200 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                  <text x="0" y="21" fontFamily="'Times New Roman', Georgia, serif" fontSize="18" fontWeight="700" fill="#0B1D3A" letterSpacing="0.2">THE GLOBE AND MAIL</text>
                </svg>
                <svg width="72" height="28" viewBox="0 0 72 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                  <text x="0" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="800" fill="#0B1D3A" letterSpacing="2">REIC</text>
                </svg>
                <svg width="72" height="28" viewBox="0 0 72 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                  <text x="0" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="800" fill="#0B1D3A" letterSpacing="2">FRPO</text>
                </svg>
                <svg width="160" height="28" viewBox="0 0 160 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                  <text x="0" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="800" fill="#0B1D3A" letterSpacing="1">REP</text>
                  <text x="52" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="400" fill="#0B1D3A" letterSpacing="1"> MAGAZINE</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2.5: Audience Segmentation (landlords / builders / PMCs / institutional) ── */}
      <AudienceSegmentation />

      {/* ── SECTION 2.6: Buy Output, Not Headcount (B2B operator differentiator) ── */}
      <BuyOutputBlock />

      {/* Wave divider */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 2b: Owner Problem to Solution Overview ── */}
      <ProblemSolutionShowcase />

      {/* ── SECTION 4.5: Real-Time Portal Visibility (live KPI families) ── */}
      <PortalVisibilityBlock />

      <RentCalculator />

      {/* ── SECTION 5: Owner Portal - Leasing Visibility (NOT ongoing mgmt) + 9 messaging pillars ── */}
      <section className="relative overflow-hidden bg-white py-14">
        <div
          className="absolute inset-0 opacity-[0.025]"
          aria-hidden="true"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #0B1D3A 0, #0B1D3A 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left: real portal dashboard mockup wrapped in a browser frame */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[560px]">
                <div
                  className="absolute -bottom-6 left-1/2 h-16 w-4/5 -translate-x-1/2 rounded-full bg-brand-navy/10 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-brand-navy/15 ring-1 ring-slate-200">
                  <BrowserFrame url="movesmart.ca/owner/dashboard">
                    <OwnerDashboardMockup />
                  </BrowserFrame>
                </div>
                <PortalChips />
              </div>
            </div>

            {/* Right: content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                Owner Portal - Leasing Visibility
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Self-Serve.{' '}
                <span className="font-display italic text-brand-emerald">Account Manager When You Need It.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Track showings, applicant records, screening results, approvals, counter-offers, condition inspections, and the full communication history, in real time. Owners can self-serve online without ever picking up the phone, or escalate to a dedicated account manager whenever they want.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  {
                    icon: Monitor,
                    title: 'Self-Serve Leasing Portal',
                    description:
                      'Showings, applications, screening, approvals, counter-offers, and inspections, all visible from any device.',
                    color: 'bg-brand-emerald/10',
                    textColor: 'text-brand-emerald',
                  },
                  {
                    icon: User,
                    title: 'Optional Account-Manager Support',
                    description:
                      'Want a human in the loop? A dedicated account manager handles every detail of your leasing file personally.',
                    color: 'bg-[#D4A853]/10',
                    textColor: 'text-[#D4A853]',
                  },
                  {
                    icon: Building,
                    title: 'Technology + Brick-and-Mortar Execution',
                    description:
                      'Modern leasing tech backed by physical offices and on-the-ground agents in every market we serve.',
                    color: 'bg-brand-navy/8',
                    textColor: 'text-brand-navy',
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/20 hover:shadow-md"
                    >
                      <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                        <Icon className={`size-5 ${item.textColor}`} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-brand-navy">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8">
                <Button
                  variant="default"
                  size="lg"
                  className="cta-primary-shadow cursor-pointer font-bold"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                  nativeButton={false}
                  render={
                    <a
                      href={PORTAL_LOGIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  Explore Owner Portal
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Wave divider */}
      <WaveDivider fill="#f8fafc" flip={true} />

      {/* ── SECTION 5.5: Owner Visual Showcase (modern Canadian condo) ── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-brand-navy/15">
              <Image
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&auto=format&fit=crop"
                alt="Bright modern Canadian condo unit with floor-to-ceiling windows ready for tenant move-in"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                Built for the Canadian rental market
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Properties that lease,{' '}
                <span className="font-display italic text-brand-emerald">presented properly.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Professional photography, virtual tours, and editorial listing copy. We make your unit show as well online as it does in person, then put it in front of the qualified tenants who are actually shopping right now.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-display text-3xl font-normal text-brand-navy">MLS+</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">20+ platforms</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-normal text-brand-navy">$0</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Upfront cost</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-normal text-brand-navy">N.A.</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">North America</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact/?type=owner"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-sm shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-px hover:bg-emerald-600 hover:shadow-md"
                >
                  List my property
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/properties/"
                  className="inline-flex items-center justify-center rounded-lg border border-brand-navy/15 bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all duration-200 hover:-translate-y-px hover:border-brand-navy/30 hover:bg-slate-50"
                >
                  Browse rentals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Case Studies ── */}
      <CaseStudySection />

      {/* Wave divider */}
      <WaveDivider fill="#ffffff" />


      {/* ── SECTION 7: North America Service Areas (provinces + states + city carousel) ── */}
      <NorthAmericaShowcase />

      {/* Wave divider */}
      <WaveDivider fill="#0B1D3A" />

      {/* ── SECTION 8: Franchising Preview ── */}
      <section className="relative overflow-hidden bg-brand-navy py-14 text-white">
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute -left-20 top-1/2 size-[350px] -translate-y-1/2 rounded-full bg-brand-emerald/8 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 top-1/2 size-[350px] -translate-y-1/2 rounded-full bg-brand-emerald/6 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[520px]">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-brand-emerald/10 ring-1 ring-brand-emerald/20">
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80&auto=format&fit=crop"
                    alt="World map showing MoveSmart Rentals franchise expansion across Canada and the United States"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 520px"
                    unoptimized
                  />
                  {/* Navy tint so the map blends with the dark franchising section */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/40 via-transparent to-brand-navy/60" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-4 py-1.5">
                <span className="size-1.5 rounded-full bg-brand-emerald" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-emerald">
                  Franchise Opportunity
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                Bring MoveSmart{' '}
                <span className="font-display italic text-brand-emerald">to Your Market</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/65">
                MoveSmart Rentals is expanding across Canada and the United States. Join the franchise network and operate the same disciplined leasing brokerage model in your local market.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { title: 'Proven Leasing Playbook', desc: 'Battle-tested across 20+ Canadian markets' },
                  { title: 'Full Operational Support', desc: 'Training, leasing tech stack, and dedicated ops team' },
                  { title: 'Cross-Border Demand', desc: 'Millions of rental units across Canada and the US' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-emerald/20">
                      <svg viewBox="0 0 12 12" className="size-3 text-brand-emerald" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">{item.title}</span>
                      <span className="ml-1.5 text-sm text-white/50">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="default"
                  size="lg"
                  className="cta-primary-shadow cursor-pointer font-bold"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                  nativeButton={false}
                  render={<Link href="/franchising/" />}
                >
                  Learn About Franchising
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer border-white/20 bg-white/5 font-semibold text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
                  nativeButton={false}
                  render={<Link href="/contact/" />}
                >
                  Request Information
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider — navy franchising section into white FAQ below */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 9: FAQ - leasing-focused ── */}
      <FAQBlock
        title="Common Questions, Direct Answers"
        schemaEnabled
        showQuestionsCta={false}
        questions={[
          {
            question: 'What does MoveSmart Rentals do?',
            answer:
              'MoveSmart Rentals is a full-service leasing and tenant placement company. We deliver end-to-end leasing execution from listing to move-in: strategic pricing, professional marketing, showing coordination, offer management, tenant qualification, lease execution, and move-in coordination. We do not handle ongoing property management.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Nothing upfront. MoveSmart Rentals operates on a standard leasing success fee, payable only when a qualified tenant is placed. Optional rental protection is available through partner pathways. No setup fees, no retainers.',
          },
          {
            question: 'Who do you work with - landlords, builders, or institutional operators?',
            answer:
              'All of the above. We serve individual landlords, builders, developers, property management companies, and institutional rental operators. For institutional clients we also run bulk lease-up campaigns with on-site leasing teams and reporting dashboards.',
          },
          {
            question: 'How do you screen applicants?',
            answer:
              'Tenant qualification is structured and documented: credit checks, income and employment verification, rental history, references, risk assessment, and statutory compliance. Every file is recorded transparently in your owner portal.',
          },
          {
            question: 'Do you offer rent protection?',
            answer:
              'Yes, through partner pathways. Guaranteed rental income insurance and tenant insurance coordination are available as optional add-ons attached to your placement. We do not collect rent or manage your property after move-in.',
          },
          {
            question: 'Can I run my leasing file online without calling anyone?',
            answer:
              'Yes. Owners can self-serve from initial brief through digital lease signing using the MoveSmart portal. Showings, applications, screening, approvals, counter-offers, inspections, and the full communication history are all visible in real time. A dedicated account manager is available whenever you want a guided experience instead.',
          },
          {
            question: 'Where do you operate?',
            answer:
              'MoveSmart Rentals operates across North America. In the United States we serve 10 priority states including Florida, Texas, California, New York, Illinois, Georgia, North Carolina, Arizona, Colorado, and New Jersey. In Canada we lease across Ontario, Quebec, British Columbia, Alberta, Manitoba, and Nova Scotia.',
          },
          {
            question: 'How fast can you find a tenant for my property?',
            answer:
              'Time-to-lease varies by city, unit type, and pricing. Units priced to live-market comps with professional photography typically receive multiple qualified applicants within the first two weeks of listing. We commit to written progress updates at every milestone.',
          },
          {
            question: 'Do I need to be present for showings?',
            answer:
              'No. Our licensed leasing advisors run every showing on your behalf. Owners receive a digest of every tour booked, the applicant feedback, and any offers — visible live in your portal.',
          },
          {
            question: 'What platforms do you advertise my unit on?',
            answer:
              'Your unit is syndicated to MLS and 20+ partner platforms including Realtor.ca, Zillow, Kijiji, Facebook Marketplace, Instagram, and our own MoveSmart property feed. We do not rely on a single channel.',
          },
          {
            question: 'How is your screening different from a DIY background check?',
            answer:
              'We run a structured multi-step qualification on every applicant: credit pull, income and employment verification, prior-landlord references, ID verification, and a documented risk summary you approve or decline. All decisions follow applicable human-rights and fair-housing law in the jurisdiction of the unit.',
          },
          {
            question: 'What happens if a tenant stops paying rent?',
            answer:
              'Rent default is rare with structured screening, but optional rental protection is available through our partner network. Coverage activates after the standard waiting period and protects up to a defined monthly cap. Details are presented during the engagement based on your unit.',
          },
          {
            question: 'Can I see properties on the website without creating an account?',
            answer:
              'You can browse property summaries and photos without logging in. Detailed listing data — listing brokerage, room dimensions, key facts, parking, and full MLS data fields — is gated behind a free account, per the IDX and MLS data-display rules that govern Canadian and US listing feeds.',
          },
          {
            question: 'Are you a brokerage or a property manager?',
            answer:
              'We are a full-service leasing and tenant placement brokerage. We do NOT handle ongoing property management — no rent collection, no maintenance dispatch, no repairs. Our scope is listing through move-in. We partner with brokerages such as Valerie Real Estate Inc. for the brokerage relationship that the IDX feed requires.',
          },
          {
            question: 'Can a tenant apply online?',
            answer:
              'Yes. Applications, ID submission, credit authorization, e-signatures, lease execution, deposit collection, and rent payments all flow through the MoveSmart tenant portal. No paper, no in-person paperwork required.',
          },
          {
            question: 'Do you serve institutional landlords and developers?',
            answer:
              'Yes. We run bulk lease-up campaigns for builders, REITs, and PMCs across both Canada and the US — including on-site leasing teams, weekly absorption reporting, and integration with your existing property management software.',
          },
          {
            question: 'What does it cost a tenant to apply?',
            answer:
              'Nothing. Tenant applications, ID verification, and credit checks are free for the applicant. Tenants pay only the rent and required deposits stipulated in the executed lease.',
          },
          {
            question: 'Are you licensed and regulated?',
            answer:
              'Yes. In Canada we operate under Valerie Real Estate Inc. Brokerage and comply with provincial regulators such as the Real Estate Council of Ontario (RECO) and the Residential Tenancies Act. In the US we operate through licensed brokerage partners in each state we serve.',
          },
          {
            question: 'How is technology built into the service?',
            answer:
              'Every step is timestamped in the MoveSmart portal: showings, applicant interactions, offers, screening decisions, signed documents, and move-in coordination. Owners and operators have audit-ready visibility on demand, with optional Slack and email notifications.',
          },
          {
            question: 'Do you offer franchising?',
            answer:
              'Yes. MoveSmart Rentals is actively expanding the franchise network across both Canada and the United States. Request a franchise kit from the Franchising page for territory availability and the financial model.',
          },
        ]}
      />

    </>
  )
}
