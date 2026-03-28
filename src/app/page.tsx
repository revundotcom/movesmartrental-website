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

      {/* ── SECTION 2: Trust Bar ── */}
      <section className="border-b border-border bg-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by 100+ Leading Brands Across Ontario
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-40">
            {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'].map(
              (partner) => (
                <div
                  key={partner}
                  className="flex h-10 w-28 items-center justify-center rounded bg-slate-200 text-xs font-medium text-slate-500"
                >
                  {partner}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Services ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Our Services
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              End-to-End Leasing, Managed for You
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From listing to lease signing, every step is handled by our
              experienced team with precision and care.
            </p>
          </div>
        </div>
        <ServiceGridBlock services={data.featuredServices} columns={4} />
      </section>

      {/* ── SECTION 4: How It Works (7 Steps) ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Our Process
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Seven disciplined steps from pricing to move-in. Every detail
              handled, nothing left to chance.
            </p>
          </div>

          {/* Desktop: two-row grid */}
          <div className="mt-16 hidden md:block">
            <div className="grid grid-cols-4 gap-8">
              {HOW_IT_WORKS_STEPS.slice(0, 4).map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-white">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <span className="mt-3 inline-block rounded-full bg-brand-emerald/10 px-3 py-0.5 text-xs font-bold text-brand-emerald">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="my-8 flex items-center justify-center">
              <ArrowRight
                className="size-6 text-brand-emerald"
                aria-hidden="true"
              />
            </div>

            <div className="grid grid-cols-4 gap-8">
              <div />
              {HOW_IT_WORKS_STEPS.slice(4, 7).map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-white">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <span className="mt-3 inline-block rounded-full bg-brand-emerald/10 px-3 py-0.5 text-xs font-bold text-brand-emerald">
                      Step {index + 5}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile: vertical list */}
          <div className="mt-12 space-y-8 md:hidden">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-brand-navy text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    {index < HOW_IT_WORKS_STEPS.length - 1 && (
                      <div className="mt-2 h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="pb-4">
                    <span className="inline-block rounded-full bg-brand-emerald/10 px-2 py-0.5 text-xs font-bold text-brand-emerald">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Portal / Technology ── */}
      <section className="bg-brand-navy py-24 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Technology
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Your Property Management Portal
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              MoveSmart Rentals combines a self-serve online account, a dedicated
              account manager, and tech-enabled brick-and-mortar service to give
              you full control and total peace of mind.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Monitor,
                title: 'Self-Serve Online',
                description:
                  'View statements, track maintenance, and manage your properties from any device, any time.',
              },
              {
                icon: User,
                title: 'Dedicated Account Manager',
                description:
                  'One point of contact who knows your portfolio and handles every detail personally.',
              },
              {
                icon: Building,
                title: 'Tech + Brick-and-Mortar',
                description:
                  'The convenience of modern technology backed by real people and local offices you can visit.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-emerald/20">
                    <Icon
                      className="size-7 text-brand-emerald"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/70">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="default"
              size="lg"
              render={<Link href="/owners/" />}
            >
              Explore Owner Portal
            </Button>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Owner Testimonials ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Testimonials
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              What Property Owners Say
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  'MoveSmart handled everything from photography to lease signing. I did not have to lift a finger and my unit was rented in 10 days.',
                name: 'Michael R.',
                city: 'Toronto, ON',
                outcome: 'Unit rented in 10 days',
              },
              {
                quote:
                  'The structured screening process gave me total confidence in the tenant they placed. No more sleepless nights worrying about missed rent.',
                name: 'Sarah L.',
                city: 'Ottawa, ON',
                outcome: 'Zero missed payments in 2 years',
              },
              {
                quote:
                  'I manage 12 units across three cities. MoveSmart is the only company that treats my portfolio like their own. True white-glove service.',
                name: 'James K.',
                city: 'Hamilton, ON',
                outcome: '12 units, 100% occupancy',
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col rounded-xl border border-border bg-slate-50 p-8"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-brand-gold text-brand-gold"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                {testimonial.outcome && (
                  <p className="mt-4 rounded-md bg-brand-emerald/10 px-3 py-2 text-sm font-semibold text-brand-emerald">
                    {testimonial.outcome}
                  </p>
                )}
                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-semibold text-brand-navy">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Featured Ontario Cities ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              <MapPin
                className="mb-0.5 mr-1 inline-block size-4"
                aria-hidden="true"
              />
              Service Areas
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              Featured Ontario Cities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional leasing execution in major markets across Ontario and
              growing.
            </p>
          </div>
        </div>
        <CityGridBlock cities={data.featuredCities} columns={4} />
      </section>

      {/* ── SECTION 8: Franchising Preview ── */}
      <section className="relative overflow-hidden bg-brand-navy py-24 text-white">
        <div
          className="absolute left-0 top-0 h-1 w-full bg-brand-emerald"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
            Franchise Opportunity
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Expand with MoveSmart Rentals
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Interested in franchise opportunities? MoveSmart Rentals is growing
            across Canada and the US. Join our network and bring professional
            leasing execution to your local market.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="default"
              size="lg"
              render={<Link href="/franchising/" />}
            >
              Learn About Franchising
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              render={<Link href="/contact/" />}
            >
              Request Information
            </Button>
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
