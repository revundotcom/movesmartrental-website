import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Monitor,
  User,
  Building,
  DollarSign,
  Megaphone,
  Eye,
  FileCheck,
  ShieldCheck,
  ClipboardCheck,
  Key,
  ArrowRight,
  Star,
  MapPin,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { HeroBlock } from '@/components/blocks/hero-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema } from '@/lib/schema-builders/organization'
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

/* ---------- How It Works Steps ---------- */

const HOW_IT_WORKS_STEPS = [
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description:
      'We analyze the market and set the right rental price to maximize your return while minimizing vacancy.',
  },
  {
    icon: Megaphone,
    title: 'Professional Marketing',
    description:
      'Professional photography, MLS distribution, and syndication across 50+ rental platforms.',
  },
  {
    icon: Eye,
    title: 'Managed Showings',
    description:
      'Our team handles all property showings, pre-screening inquiries, and follow-ups.',
  },
  {
    icon: FileCheck,
    title: 'Offer Management',
    description:
      'We present and negotiate offers, ensuring the best terms for your property.',
  },
  {
    icon: ShieldCheck,
    title: 'Tenant Qualification',
    description:
      'Credit checks, employment verification, references, and full rental history review.',
  },
  {
    icon: ClipboardCheck,
    title: 'Lease Execution',
    description:
      'Legally compliant lease preparation, signing, and documentation handled end-to-end.',
  },
  {
    icon: Key,
    title: 'Move-In Coordination',
    description:
      'Key handoff, condition reporting, and move-in inspection managed seamlessly.',
  },
] as const

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
    logo: `${siteUrl}/logo.png`,
    description:
      'White-glove leasing execution for serious rental operators. Tenant placement, screening, rent protection, and full-service property management with zero upfront cost.',
    contactEmail: 'info@movesmartrentals.com',
  })

  return (
    <>
      {/* Organization JSON-LD */}
      <JsonLd data={organizationSchema} />

      {/* ── SECTION 1: Hero ── */}
      <HeroBlock
        headline="White-Glove Leasing Execution for Serious Rental Operators"
        subheadline="Peace of Mind Through Execution. We handle pricing, marketing, showings, qualification, and lease execution so you never lift a finger."
        cta1={{ label: 'Get Started', href: '/contact/' }}
        cta2={{ label: 'See How It Works', href: '/owners/' }}
        priority
      />

      {/* ── SECTION 2: Social Proof Bar ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-r from-slate-50 via-white to-slate-50 py-10">
        {/* Decorative line accent */}
        <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Trusted by Ontario&apos;s most serious rental operators
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '500+', label: 'Properties Managed', icon: (
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              )},
              { value: '20+', label: 'Ontario Cities', icon: (
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              )},
              { value: '98%', label: 'Occupancy Rate', icon: (
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              )},
              { value: '14 Days', label: 'Average Fill Time', icon: (
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
            ].map((stat) => (
              <div
                key={stat.label}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/20 hover:shadow-md"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/8 text-brand-emerald transition-colors duration-300 group-hover:bg-brand-emerald/15">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl font-extrabold text-brand-navy">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              End-to-End Leasing,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Managed for You
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              From listing to lease signing, every step is handled by our experienced team with precision and care.
            </p>
          </div>
        </div>
        <ServiceGridBlock services={data.featuredServices} columns={4} showHeading={false} />
      </section>

      {/* ── SECTION 4: How It Works (7 Steps) ── */}
      <section className="relative overflow-hidden bg-brand-navy py-28 text-white">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        {/* Corner glow */}
        <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-brand-emerald/8 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand-emerald/6 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          {/* Two-col: text left + screening illustration right */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                Our Process
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                7 Steps From{' '}
                <span className="text-brand-emerald">Listing</span>{' '}
                to Move-In
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                Seven disciplined steps handled entirely by our team. Every detail managed, nothing left to chance.
              </p>

              {/* Steps list — compact with connectors */}
              <div className="mt-10 space-y-0">
                {HOW_IT_WORKS_STEPS.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="group flex gap-4">
                      {/* Connector column */}
                      <div className="flex shrink-0 flex-col items-center">
                        <div className="relative flex size-11 items-center justify-center rounded-xl border border-brand-emerald/30 bg-brand-emerald/10 transition-all duration-300 group-hover:border-brand-emerald/60 group-hover:bg-brand-emerald/20">
                          <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                          {/* Step number badge */}
                          <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-brand-emerald text-[9px] font-black text-white">
                            {index + 1}
                          </span>
                        </div>
                        {index < HOW_IT_WORKS_STEPS.length - 1 && (
                          <div className="my-1 h-6 w-px bg-gradient-to-b from-brand-emerald/30 to-transparent" />
                        )}
                      </div>
                      {/* Content */}
                      <div className={`pb-${index < HOW_IT_WORKS_STEPS.length - 1 ? '0' : '0'} pt-2`}>
                        <h3 className="text-sm font-bold text-white">{step.title}</h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-white/50">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Screening illustration */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px]">
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.18) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                {/* Card wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-2 backdrop-blur-sm">
                  <ScreeningIllustration className="w-full" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/20">
                    <ShieldCheck className="size-4 text-brand-emerald" aria-hidden="true" />
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
                {/* Floating notification */}
                <div className="absolute -right-6 -top-4 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/15">
                    <svg viewBox="0 0 20 20" className="size-4 text-brand-emerald" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">Rent Received</p>
                    <p className="text-[10px] text-muted-foreground">Unit 4B · $2,400</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                Owner Portal
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Full Control.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Zero Hassle.
                </span>
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
                  className="cursor-pointer font-bold"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
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
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                What Property Owners Say
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Real results from real landlords across Ontario.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  {
                    quote: 'MoveSmart handled everything from photography to lease signing. I did not have to lift a finger and my unit was rented in 10 days.',
                    name: 'Michael R.',
                    city: 'Toronto, ON',
                    outcome: 'Unit rented in 10 days',
                    initials: 'MR',
                    color: 'from-brand-emerald/20 to-brand-emerald/5',
                  },
                  {
                    quote: 'The structured screening process gave me total confidence in the tenant they placed. No more sleepless nights worrying about missed rent.',
                    name: 'Sarah L.',
                    city: 'Ottawa, ON',
                    outcome: 'Zero missed payments in 2 years',
                    initials: 'SL',
                    color: 'from-[#D4A853]/20 to-[#D4A853]/5',
                  },
                  {
                    quote: 'I manage 12 units across three cities. MoveSmart is the only company that treats my portfolio like their own. True white-glove service.',
                    name: 'James K.',
                    city: 'Hamilton, ON',
                    outcome: '12 units, 100% occupancy',
                    initials: 'JK',
                    color: 'from-brand-navy/10 to-brand-navy/3',
                  },
                ].map((testimonial) => (
                  <div
                    key={testimonial.name}
                    className="group relative flex gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-md"
                  >
                    {/* Left color accent */}
                    <div className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b ${testimonial.color}`} aria-hidden="true" />

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-xs font-black text-white">
                      {testimonial.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-brand-navy">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="size-3 fill-brand-gold text-brand-gold" aria-hidden="true" />
                          ))}
                        </div>
                      </div>
                      <blockquote className="mt-2 text-sm leading-relaxed text-slate-600">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5">
                        <svg className="size-3.5 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-semibold text-emerald-700">{testimonial.outcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Serving{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  20+ Ontario
                </span>{' '}
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
              <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Grow with{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #34D399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  MoveSmart
                </span>
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
                  className="cursor-pointer font-bold"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
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
