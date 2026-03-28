import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Monitor,
  User,
  Building,
  ArrowRight,
  MapPin,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { WaveDivider } from '@/components/ui/wave-divider'
import { HeroBlock } from '@/components/blocks/hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { StatGrid } from '@/components/blocks/stat-grid'
import { HowItWorksSteps } from '@/components/blocks/how-it-works-steps'
import { PortalChips } from '@/components/blocks/portal-chips'
import { TestimonialsSection } from '@/components/blocks/testimonials-section'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema } from '@/lib/schema-builders/organization'
import { buildWebSiteSchema } from '@/lib/schema-builders/website'
import { buildLocalBusinessSchema } from '@/lib/schema-builders/local-business'
import { generatePageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/fetch'
import { HOMEPAGE_QUERY } from '@/sanity/queries/homepage'
import type { ServiceCardData, CityCardData } from '@/types/blocks'
import {
  OwnerIllustration,
  PortalIllustration,
  OntarioMapIllustration,
  FranchiseIllustration,
  ScreeningIllustration,
} from '@/components/illustrations'

/* ---------- Types ---------- */

interface HomepageData {
  featuredServices: ServiceCardData[]
  featuredCities: CityCardData[]
  stats: {
    cityServiceCount: number
    cityCount: number
    serviceCount: number
  }
}

/* ---------- Metadata ---------- */

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: '/',
    fallbackTitle:
      'MoveSmart Rentals | White-Glove Leasing Execution for Ontario',
    fallbackDescription:
      'White-glove leasing execution for serious rental operators. Tenant placement, screening, rent protection, and dedicated account management with zero upfront cost.',
  })
}

/* ---------- Page ---------- */

export default async function HomePage() {
  const data = await sanityFetch<HomepageData>({
    query: HOMEPAGE_QUERY,
    tags: ['service', 'city'],
  })

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  const organizationSchema = buildOrganizationSchema({
    name: 'MoveSmart Rentals',
    url: siteUrl,
    logo: `${siteUrl}/og-default.png`,
    description:
      'White-glove leasing execution for serious rental operators. Tenant placement, screening, rent protection, and full-service property management with zero upfront cost.',
    contactEmail: 'info@movesmartrentals.com',
    socialLinks: [
      'https://www.facebook.com/movesmartrentals',
      'https://www.instagram.com/movesmartrentals',
      'https://www.linkedin.com/company/movesmartrentals',
    ],
  })

  const webSiteSchema = buildWebSiteSchema({
    url: siteUrl,
    name: 'MoveSmart Rentals',
  })

  const localBusinessSchema = buildLocalBusinessSchema({
    name: 'MoveSmart Rentals',
    description: 'White-glove property management for Ontario landlords. Tenant placement, screening, rent protection, and full-service leasing with zero upfront cost.',
    url: siteUrl,
    phone: '+14372957688',
    address: {
      streetAddress: '123 King Street West',
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
      <HeroBlock
        headline="White-Glove Leasing Execution for Serious Rental Operators"
        subheadline="Peace of Mind Through Execution. We handle pricing, marketing, showings, qualification, and lease execution so you never lift a finger."
        cta1={{ label: 'Get Started', href: '/contact/' }}
        cta2={{ label: 'See How It Works', href: '/owners/' }}
        priority
      />

      {/* ── SECTION 2: Trust / Stats Bar ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-r from-slate-50 via-white to-slate-50 py-10">
        {/* Decorative line accent */}
        <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4">
          {/* Counting stats row */}
          <StatGrid />

          {/* Media / trust logo marquee */}
          <div className="mt-8 border-t border-slate-100 pt-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              As seen in
            </p>
            <div className="relative mt-5 overflow-hidden">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
              <div className="flex animate-marquee items-center gap-16 whitespace-nowrap opacity-40 grayscale">
                {['Toronto Star', 'Globe and Mail', 'REIC', 'FRPO', 'REP Magazine', 'Toronto Star', 'Globe and Mail', 'REIC', 'FRPO', 'REP Magazine'].map((name, i) => (
                  <span key={i} className="shrink-0 text-sm font-bold tracking-tight text-slate-600">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider: Section 2 (slate-50/white) → Section 3 (white) */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 3: Services ── */}
      <section className="relative overflow-hidden bg-white py-28">
        {/* Decorative accent top-left */}
        <div
          className="absolute -left-10 top-10 size-[200px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        {/* Decorative cross pattern */}
        <svg
          className="absolute right-8 top-16 text-brand-navy/5"
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden="true"
        >
          {[0, 40, 80, 120, 160].map((x) =>
            [0, 40, 80, 120, 160].map((y) => (
              <g key={`${x}-${y}`}>
                <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="currentColor" strokeWidth="1" />
                <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="currentColor" strokeWidth="1" />
              </g>
            ))
          )}
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              Our Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              End-to-End Leasing,{' '}
              <span className="font-display italic text-brand-emerald">Managed for You</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              From listing to lease signing, every step is handled by our experienced team with precision and care.
            </p>
          </div>
        </div>
        <ServiceGridBlock services={data.featuredServices} columns={4} showHeading={false} />
      </section>

      {/* ── SECTION 4: How It Works (7 Steps) — L-shape layout ── */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        {/* Ambient glows */}
        <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-brand-emerald/8 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand-emerald/6 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          {/*
            L-SHAPE LAYOUT
            ┌─────────────────────────────┬──────────────────┐
            │  Eyebrow + H2 + description │                  │
            │  (horizontal bar of L)      │  Illustration    │
            ├──────────┬──────────────────│  card  (tall,    │
            │  Steps   │  Steps           │  vertical bar)   │
            │  col 1   │  col 2           │                  │
            └──────────┴──────────────────┴──────────────────┘
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">

            {/* LEFT COLUMN */}
            <div className="flex flex-col py-20 lg:py-24 lg:pr-16">

              {/* Header block — wide, spans left col */}
              <div className="mb-12 border-b border-white/8 pb-10">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                  Our Process
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                  7 Steps From{' '}
                  <span className="text-brand-emerald">Listing</span>{' '}
                  to Move-In
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                  Seven disciplined steps handled entirely by our team. Every detail managed, nothing left to chance.
                </p>
              </div>

              {/* Steps in a 2-column grid — fills the horizontal bar of L */}
              <HowItWorksSteps variant="grid" />
            </div>

            {/* RIGHT COLUMN — vertical bar of L, full section height */}
            <div className="relative hidden lg:block">
              {/* Left edge line — corner of the L */}
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-emerald/25 to-transparent" aria-hidden="true" />

              <div className="sticky top-24 flex flex-col gap-6 py-24 pl-10">
                {/* Glow behind card */}
                <div
                  className="pointer-events-none absolute -inset-8 rounded-3xl"
                  style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.14) 0%, transparent 65%)' }}
                  aria-hidden="true"
                />

                {/* Screening card */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-2 backdrop-blur-sm shadow-2xl">
                    <ScreeningIllustration className="w-full" />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/20">
                      <svg viewBox="0 0 20 20" className="size-4 text-brand-emerald" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Fully Vetted</p>
                      <p className="text-[10px] text-white/50">Every tenant, every time</p>
                    </div>
                  </div>
                </div>

                {/* Stat chips — weight the vertical bar */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4 backdrop-blur-sm">
                    <p className="text-2xl font-black text-brand-emerald">98%</p>
                    <p className="mt-0.5 text-xs text-white/50">Tenant retention</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4 backdrop-blur-sm">
                    <p className="text-2xl font-black text-brand-emerald">14d</p>
                    <p className="mt-0.5 text-xs text-white/50">Avg. days to lease</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only illustration (below steps) */}
            <div className="pb-16 lg:hidden">
              <div className="relative mx-auto max-w-sm">
                <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-2 backdrop-blur-sm">
                  <ScreeningIllustration className="w-full" />
                </div>
                <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/20">
                    <svg viewBox="0 0 20 20" className="size-4 text-brand-emerald" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Fully Vetted</p>
                    <p className="text-[10px] text-white/50">Every tenant, every time</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Wave divider: Section 4 (brand-navy) → Section 5 (white) */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 5: Portal / Technology ── */}
      <section className="relative overflow-hidden bg-white py-28">
        {/* Decorative background: diagonal stripe */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          aria-hidden="true"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #0B1D3A 0, #0B1D3A 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          {/* Two-column: portal illustration left, feature cards right */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left: portal mockup */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[520px]">
                {/* Shadow */}
                <div
                  className="absolute -bottom-6 left-1/2 h-16 w-4/5 -translate-x-1/2 rounded-full bg-brand-navy/10 blur-2xl"
                  aria-hidden="true"
                />
                {/* Illustration frame */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-brand-navy/10">
                  <PortalIllustration className="w-full" />
                </div>
                {/* Animated floating chips */}
                <PortalChips />
              </div>
            </div>

            {/* Right: content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                Owner Portal
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Full Control.{' '}
                <span className="font-display italic text-brand-emerald">Zero Hassle.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                MoveSmart combines a self-serve portal, a dedicated account manager, and local offices — giving you total peace of mind.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  {
                    icon: Monitor,
                    title: 'Self-Serve Online Portal',
                    description: 'View statements, track maintenance requests, and manage your portfolio from any device.',
                    color: 'bg-brand-emerald/10',
                    textColor: 'text-brand-emerald',
                  },
                  {
                    icon: User,
                    title: 'Dedicated Account Manager',
                    description: 'One expert who knows your properties and handles every detail personally.',
                    color: 'bg-[#D4A853]/10',
                    textColor: 'text-[#D4A853]',
                  },
                  {
                    icon: Building,
                    title: 'Local Tech + Brick-and-Mortar',
                    description: 'Modern tech backed by real people and local offices you can actually visit.',
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
                  render={<Link href="/owners/" />}
                >
                  Explore Owner Portal
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider: Section 5 (white) → Section 6 (slate-50), flipped */}
      <WaveDivider fill="#f8fafc" flip={true} />

      {/* ── SECTION 6: Owner Testimonials ── */}
      <section className="relative overflow-hidden bg-slate-50 py-28">
        {/* Decorative SVG blob top-right */}
        <svg
          className="absolute -right-24 -top-24 size-[400px] text-brand-emerald/5"
          viewBox="0 0 400 400"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M200 0C280 0 380 80 380 200C380 320 300 400 180 400C60 400 0 320 20 200C40 80 120 0 200 0Z" />
        </svg>
        {/* Decorative SVG blob bottom-left */}
        <svg
          className="absolute -bottom-20 -left-20 size-[300px] text-brand-navy/5"
          viewBox="0 0 300 300"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M150 0C230 20 300 80 280 160C260 240 180 300 100 280C20 260 0 180 20 100C40 20 70 -20 150 0Z" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: owner illustration */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[420px]">
                <OwnerIllustration className="w-full" />
                {/* Big stat */}
                <div
                  className="absolute -left-4 bottom-8 rounded-3xl px-6 py-4 shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #0B1D3A, #132D54)' }}
                >
                  <p className="text-3xl font-black text-brand-emerald">98%</p>
                  <p className="text-xs text-white/60">Average Occupancy</p>
                </div>
              </div>
            </div>

            {/* Right: testimonials */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                Testimonials
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                What Property Owners Say
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Real results from real landlords across Ontario.
              </p>

              {/* Stagger-animated testimonial cards */}
              <TestimonialsSection />
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider: Section 6 (slate-50) → Section 7 (white) */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 7: Featured Ontario Cities ── */}
      <section className="relative overflow-hidden bg-white py-28">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          {/* Two-col: text left + map right */}
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                <MapPin className="size-4" aria-hidden="true" />
                Service Areas
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Serving{' '}
                <span className="font-display italic text-brand-emerald">20+ Ontario</span>{' '}
                Cities
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Professional leasing execution in major markets across Ontario — and actively expanding to new cities.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'Brampton', 'Kitchener', 'London', 'Barrie', 'Oakville', '+12 more'].map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-brand-emerald/20 bg-brand-emerald/6 px-3 py-1 text-xs font-semibold text-brand-navy"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
            {/* Ontario map illustration */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[440px]">
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-brand-navy p-4 shadow-2xl shadow-brand-navy/20">
                  <OntarioMapIllustration className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CityGridBlock cities={data.featuredCities} columns={4} showHeading={false} />
      </section>

      {/* Wave divider: Section 7 (white) → Section 8 (navy) */}
      <WaveDivider fill="#0B1D3A" />

      {/* ── SECTION 8: Franchising Preview ── */}
      <section className="relative overflow-hidden bg-brand-navy py-28 text-white">
        {/* Multi-layer bg */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute -left-20 top-1/2 size-[350px] -translate-y-1/2 rounded-full bg-brand-emerald/8 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 top-1/2 size-[350px] -translate-y-1/2 rounded-full bg-brand-emerald/6 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left: franchise network illustration */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[480px]">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <FranchiseIllustration className="relative w-full" />
              </div>
            </div>

            {/* Right: content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-4 py-1.5">
                <span className="size-1.5 rounded-full bg-brand-emerald" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-emerald">
                  Franchise Opportunity
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                Grow with{' '}
                <span className="font-display italic text-brand-emerald">MoveSmart</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/65">
                MoveSmart Rentals is expanding across Canada and the United States. Join our network and bring white-glove leasing execution to your local market.
              </p>

              {/* 3 value props */}
              <div className="mt-8 space-y-3">
                {[
                  { title: 'Proven System', desc: 'Battle-tested playbook across 20+ Ontario markets' },
                  { title: 'Full Support', desc: 'Training, tech stack, and dedicated ops team' },
                  { title: 'Growing Demand', desc: 'Millions of rental units across Canada & US' },
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
                  render={<Link href="/franchising/" />}
                >
                  Learn About Franchising
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer border-white/20 bg-white/5 font-semibold text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
                  render={<Link href="/contact/" />}
                >
                  Request Information
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider: Section 8 (navy) → Section 9 (white/FAQ) */}
      <WaveDivider fill="#ffffff" flip={true} />

      {/* ── SECTION 9: FAQ ── */}
      <FAQBlock
        title="Frequently Asked Questions"
        schemaEnabled
        questions={[
          {
            question: 'What does MoveSmart Rentals do?',
            answer:
              'MoveSmart Rentals provides white-glove leasing execution for serious rental operators across Ontario. We handle competitive pricing analysis, professional marketing, managed showings, tenant qualification, lease execution, and move-in coordination so you can earn passive income without the day-to-day hassle.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Nothing upfront. MoveSmart Rentals operates on a success-based model -- you only pay when we deliver results. There are no setup fees, no hidden charges, and no long-term contracts required.',
          },
          {
            question: 'Which cities do you serve?',
            answer:
              'MoveSmart Rentals currently serves major cities across Ontario including Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, Kitchener, Windsor, and more. We are actively expanding to additional markets.',
          },
          {
            question: 'How do you screen tenants?',
            answer:
              'Our structured screening process includes credit checks, employment and income verification, rental history review, and reference checks. Every applicant goes through the same rigorous process to protect your property and rental income.',
          },
          {
            question: 'Do you guarantee rent?',
            answer:
              'Yes. MoveSmart Rentals offers rent protection as part of our property management service. If a qualified tenant misses a payment, our rent guarantee program ensures your cash flow stays consistent.',
          },
          {
            question: 'Can I manage my property online?',
            answer:
              'Absolutely. MoveSmart Rentals provides a self-serve online portal where you can view financial statements, track maintenance requests, communicate with your account manager, and manage your properties from any device.',
          },
        ]}
      />

      {/* ── SECTION 10: Final CTA ── */}
      <CTABannerBlock
        headline="Ready to Experience White-Glove Leasing?"
        description="Join 100+ property owners who trust MoveSmart Rentals for hands-off leasing execution."
        primaryCta={{ label: 'Get Started', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </>
  )
}
