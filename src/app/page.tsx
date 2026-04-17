import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Monitor,
  User,
  Building,
  ArrowRight,
  MapPin,
  Search,
  FileCheck,
  ThumbsUp,
  Home,
  Briefcase,
  Globe,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { WaveDivider } from '@/components/ui/wave-divider'
import { HeroBlock } from '@/components/blocks/hero-block'
import { HomeServicesShowcase } from '@/components/blocks/home-services-showcase'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { StatGrid } from '@/components/blocks/stat-grid'
import { PortalChips } from '@/components/blocks/portal-chips'
import { ListingToMoveInBlock } from '@/components/blocks/listing-to-movein-block'
import { RentCalculator } from '@/components/blocks/rent-calculator'
import { AudienceSegmentation } from '@/components/blocks/audience-segmentation'
import { ProblemSolutionShowcase } from '@/components/blocks/problem-solution-showcase'
import { CaseStudySection } from '@/components/blocks/case-study-card'
import { RentalAnalysisForm } from '@/components/blocks/rental-analysis-form'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema } from '@/lib/schema-builders/organization'
import { buildWebSiteSchema } from '@/lib/schema-builders/website'
import { buildLocalBusinessSchema } from '@/lib/schema-builders/local-business'
import { generatePageMetadata } from '@/lib/metadata'
import {
  getFallbackServiceList,
  getFallbackCityList,
} from '@/lib/static-fallbacks'
import type { ServiceCardData, CityCardData } from '@/types/blocks'
import {
  PortalIllustration,
  FranchiseIllustration,
} from '@/components/illustrations'
import { OntarioMap } from '@/components/illustrations/ontario-map'

/* ---------- Core 9 Services (white-glove leasing brokerage) ---------- */

const CORE_SERVICES: ServiceCardData[] = [
  {
    slug: 'tenant-placement',
    title: 'Strategic Rental Pricing',
    shortDescription:
      'Market analysis, comparables, and vacancy trend modelling so your property is priced to lease quickly without leaving rent on the table.',
    icon: 'dollar-sign',
    audience: 'owner',
  },
  {
    slug: 'leasing-services',
    title: 'Professional Marketing',
    shortDescription:
      'Photography, virtual tours, written copy, MLS, portal syndication, and paid social ads engineered for maximum qualified-applicant exposure.',
    icon: 'megaphone',
    audience: 'owner',
  },
  {
    slug: 'tenant-placement',
    title: 'Showing Coordination',
    shortDescription:
      'Scheduling, agent-led private showings, open houses, and developer tours, all coordinated by our concierge leasing team.',
    icon: 'users',
    audience: 'both',
  },
  {
    slug: 'leasing-services',
    title: 'Offer Management',
    shortDescription:
      'Application intake, offer review, negotiation, and counter-offers handled with disciplined transparency and clear owner approvals.',
    icon: 'file-text',
    audience: 'owner',
  },
  {
    slug: 'tenant-screening',
    title: 'Tenant Qualification',
    shortDescription:
      'Credit, income, employment, references, risk assessment, and compliance checks documented for every applicant, every time.',
    icon: 'shield',
    audience: 'owner',
  },
  {
    slug: 'rent-guarantee',
    title: 'Rental Protection Options',
    shortDescription:
      'Partner pathways for guaranteed rental income insurance and tenant insurance coordination so your cash flow is protected at lease-up.',
    icon: 'shield',
    audience: 'owner',
  },
  {
    slug: 'rental-preparation',
    title: 'Lease Execution',
    shortDescription:
      'Lease preparation, digital signing, statutory compliance, and deposit collection completed before move-in day.',
    icon: 'file-text',
    audience: 'both',
  },
  {
    slug: 'tenant-insurance',
    title: 'Move-In Coordination',
    shortDescription:
      'Utility transfers, insurance confirmation, key release, condition inspection, and signed condition documentation.',
    icon: 'home',
    audience: 'both',
  },
  {
    slug: 'institutional-lease-up',
    title: 'Institutional Lease-Up',
    shortDescription:
      'Bulk unit onboarding, campaign strategy, on-site leasing team deployment, and reporting dashboards for builders, PMCs, and institutional operators.',
    icon: 'monitor',
    audience: 'owner',
  },
]

/* ---------- Metadata ---------- */

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    path: '/',
    fallbackTitle:
      'MoveSmart Rentals | White-Glove Leasing Brokerage Across Canada',
    fallbackDescription:
      'White-glove leasing brokerage delivering full-cycle leasing execution from listing to move-in. MLS and multi-platform advertising, professional screening, rental protection options, and zero upfront cost.',
  })
}

/* ---------- Page ---------- */

export default async function HomePage() {
  // Static local data (Sanity has been removed).
  const featuredServices: ServiceCardData[] = getFallbackServiceList().map(
    (s) => ({
      title: s.title,
      slug: s.slug.current,
      shortDescription: s.shortDescription,
      icon: s.icon,
      audience: s.audience,
    }),
  )
  const featuredCities: CityCardData[] = getFallbackCityList()
    .slice(0, 8)
    .map((c) => ({
      title: c.title,
      slug: c.slug.current,
      provinceSlug: c.provinceSlug,
      population: c.population,
      medianRent: c.medianRent,
      heroImageUrl: c.heroImageUrl,
      heroImageAlt: c.heroImageAlt,
    }))

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  const organizationSchema = buildOrganizationSchema({
    name: 'MoveSmart Rentals',
    url: siteUrl,
    logo: `${siteUrl}/og-default.png`,
    description:
      'White-glove leasing brokerage delivering full-cycle leasing execution for individual landlords, builders, PMCs, and institutional rental operators. Listing to move-in, with MLS and multi-platform advertising, professional screening, and rental protection options.',
    contactEmail: 'contact@movesmartrentals.com',
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
    description:
      'White-glove leasing brokerage for Canadian landlords, builders, PMCs, and institutional rental operators. Full-cycle leasing execution from listing to move-in with zero upfront cost.',
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

  // Prefer local featured services if present, otherwise fall back to the
  // contract-mandated 9 core leasing services defined above.
  const services =
    featuredServices.length > 0 ? featuredServices : CORE_SERVICES

  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <JsonLd data={localBusinessSchema} />

      {/* ── SECTION 1: Hero ── */}
      <section className="relative overflow-hidden">
        <HeroBlock
          headline="Get Your Property Rented to Qualified Tenants, Fast"
          subheadline="MoveSmart Rentals is a white-glove leasing brokerage. We advertise on MLS and 50+ platforms, screen every applicant, and handle every step from listing to move-in. Nothing due upfront."
          cta1={{ label: 'Create a Free Account', href: '/contact/' }}
          cta2={{ label: 'Book a Call', href: '/contact/?intent=call' }}
          priority
        />
      </section>

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

      {/* Wave divider */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 2b: Owner Problem to Solution Overview ── */}
      <ProblemSolutionShowcase />

      {/* ── SECTION 3: Service Grid (9 core leasing services) ── */}
      <HomeServicesShowcase services={services} />

      <RentCalculator />

      {/* ── SECTION 4: How It Works - listing to move-in ── */}
      <ListingToMoveInBlock />

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
            {/* Left: portal mockup */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[520px]">
                <div
                  className="absolute -bottom-6 left-1/2 h-16 w-4/5 -translate-x-1/2 rounded-full bg-brand-navy/10 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-brand-navy/10">
                  <PortalIllustration className="w-full" />
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
                <span className="font-display italic text-brand-emerald">Concierge When You Need It.</span>
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

      {/* Wave divider */}
      <WaveDivider fill="#f8fafc" flip={true} />

      {/* ── SECTION 6: Case Studies ── */}
      <CaseStudySection />

      {/* Wave divider */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 6b: Tenant Journey ── */}
      <section className="relative overflow-hidden bg-white py-16">
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              For Tenants
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Apply, Screen, Sign,{' '}
              <span className="font-display italic text-brand-emerald">Move In</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Browse verified listings, apply online, screen with confidence, and walk through your move-in inspection on day one.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, step: '01', title: 'Apply', description: 'Submit a complete application through our secure portal in minutes.' },
              { icon: FileCheck, step: '02', title: 'Screen', description: 'Credit, income, employment, references, and rental history reviewed transparently.' },
              { icon: ThumbsUp, step: '03', title: 'Sign', description: 'Digital lease signing, deposit collection, and statutory compliance handled by our team.' },
              { icon: Home, step: '04', title: 'Move In', description: 'Utility transfers, key release, condition inspection, and signed condition documentation.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/20 hover:shadow-md">
                  <span className="text-4xl font-black text-brand-emerald/15">{item.step}</span>
                  <div className="mt-2 flex size-10 items-center justify-center rounded-xl bg-brand-emerald/10">
                    <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-brand-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Button
              variant="default"
              size="lg"
              className="cta-primary-shadow cursor-pointer font-bold"
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
              nativeButton={false}
              render={<Link href="/tenants/" />}
            >
              Explore Tenant Hub
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Featured Ontario Cities ── */}
      <section className="relative overflow-hidden bg-slate-50 py-14">
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="mb-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
                <MapPin className="size-4" aria-hidden="true" />
                Service Areas
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Leasing Across{' '}
                <span className="font-display italic text-brand-emerald">20+ Ontario</span>{' '}
                Cities
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                White-glove leasing execution across Ontario&apos;s major rental markets, with active expansion across Canada and the United States.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Toronto', 'Mississauga', 'Brampton', 'Hamilton', 'Ottawa', 'London', 'Vaughan', 'Markham', 'Richmond Hill', 'Oakville', 'Burlington', 'Kitchener', 'Waterloo'].map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-brand-emerald/20 bg-brand-emerald/6 px-3 py-1 text-xs font-semibold text-brand-navy"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[440px]">
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-brand-navy p-4 shadow-2xl shadow-brand-navy/20">
                  <OntarioMap className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CityGridBlock cities={featuredCities} columns={4} showHeading={false} />
      </section>

      {/* ── SECTION 7.5: North America Positioning (Canada + US expansion) ── */}
      <section className="relative overflow-hidden bg-white py-16">
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              <Globe className="size-4" aria-hidden="true" />
              North America Footprint
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Built in Canada.{' '}
              <span className="font-display italic text-brand-emerald">Expanding Across the US.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              MoveSmart Rentals scales the same disciplined leasing playbook across both sides of the border, with brick-and-mortar offices in our anchor markets and a unified portal for owners and operators.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: 'Canada - Ontario Anchor',
                description:
                  'Active leasing across Toronto, the GTA, Ottawa, Hamilton, London, Kitchener-Waterloo, and 14 additional Ontario markets.',
              },
              {
                icon: Globe,
                title: 'United States - Expansion',
                description:
                  'Rolling out the MoveSmart leasing brokerage model into priority US metros for individual landlords and institutional rental operators.',
              },
              {
                icon: Briefcase,
                title: 'Institutional Lease-Up',
                description:
                  'Bulk lease-up campaigns, on-site leasing teams, and reporting dashboards for builders, developers, and PMC partners across both countries.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/20 hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-emerald/10">
                    <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-brand-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

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
              <div className="relative w-full max-w-[480px]">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <FranchiseIllustration className="relative w-full" />
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
                  { title: 'Proven Leasing Playbook', desc: 'Battle-tested across 20+ Ontario markets' },
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

      {/* Wave divider */}
      <WaveDivider fill="#0B1D3A" flip={true} />

      {/* ── SECTION 8.5: Free Rental Analysis Form ── */}
      <RentalAnalysisForm />

      {/* Wave divider */}
      <WaveDivider fill="#ffffff" />

      {/* ── SECTION 9: FAQ - leasing-focused ── */}
      <FAQBlock
        title="Common Questions, Direct Answers"
        schemaEnabled
        questions={[
          {
            question: 'What does MoveSmart Rentals do?',
            answer:
              'MoveSmart Rentals is a white-glove leasing brokerage. We deliver full-cycle leasing execution from listing to move-in: strategic pricing, professional marketing, showing coordination, offer management, tenant qualification, lease execution, and move-in coordination. We do not handle ongoing property management.',
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
              'MoveSmart Rentals currently leases across 20+ Ontario cities including Toronto, Mississauga, Brampton, Hamilton, Ottawa, London, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Kitchener, and Waterloo. We are actively expanding across Canada and into the United States.',
          },
        ]}
      />

    </>
  )
}
