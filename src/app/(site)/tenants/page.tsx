import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'
import { getFallbackCityList } from '@/lib/static-fallbacks'
import type { CityCardData } from '@/types/blocks'
import { ZigzagStep, FeeTableRow, PullQuoteReveal } from './tenants-interactive'

export const metadata: Metadata = {
  title: 'Rental Homes Canada | Apartments, Condos & Houses for Rent',
  description:
    'Browse verified rental listings across Canada and the United States. Apartments, condos, houses, and townhouses in Toronto, Mississauga, Miami, Austin, and 160+ cities. Apply online in minutes.',
  alternates: {
    canonical: '/tenants/',
  },
  openGraph: {
    title: 'Rental Homes Canada | MoveSmart Rentals',
    description:
      'Browse verified rental listings across Canada. Apartments, condos, houses, and townhouses in Toronto, Mississauga, Ottawa, Hamilton, and 160+ cities.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Homes Canada | MoveSmart Rentals',
    description:
      'Browse verified rental listings across Canada. Apartments, condos, houses, and townhouses in Toronto, Mississauga, Ottawa, Hamilton, and 160+ cities.',
  },
}

/* ---------- Tenant FAQs ---------- */

const TENANT_FAQS = [
  {
    question: 'What is the application process for renting a property?',
    answer:
      'Our application process is fully online. You submit your employment verification, credit check authorization, and references through our secure portal. Most applications receive a decision within 48 hours.',
  },
  {
    question: 'What documents do I need to apply?',
    answer:
      'You will need government-issued photo ID, proof of income (recent pay stubs or employment letter), a credit check authorization, and two references (one personal, one from a previous landlord if applicable).',
  },
  {
    question: 'What are the standard lease terms?',
    answer:
      'Standard leases in Ontario are 12 months. After the initial term, leases automatically convert to month-to-month unless renewed. All leases follow the Ontario Standard Lease form as required by law.',
  },
  {
    question: 'How much is the security deposit?',
    answer:
      "In Ontario, landlords can only collect a deposit equal to one month's rent (last month's rent deposit). No additional security deposits are permitted under the Residential Tenancies Act.",
  },
  {
    question: 'How do I submit a maintenance request?',
    answer:
      'Log in to your tenant portal and open a maintenance ticket with a short description and photos. Urgent issues (heat, water, electrical) are triaged within hours; routine items are scheduled within 3-5 business days.',
  },
  {
    question: 'Can I end my lease early?',
    answer:
      'Ontario tenants can give 60 days written notice ending on the last day of a rental period, but only once the fixed term has ended. Before that, you may assign or sublet with landlord consent, or negotiate a mutual lease termination.',
  },
  {
    question: 'How often can rent be increased?',
    answer:
      'Ontario permits one rent increase every 12 months, capped at the provincial Rent Increase Guideline. Landlords must provide 90 days written notice using Form N1. Most units built after November 15, 2018 are exempt from the cap.',
  },
  {
    question: 'How is rent paid each month?',
    answer:
      'We offer pre-authorized debit (PAD), e-transfer to a dedicated address, or tenant-portal bank payment. Auto-payment is encouraged - it eliminates late fees and keeps your rent history clean for future applications.',
  },
]

/* ---------- How renting with us works (4 image-led editorial rows) ---------- */

const HOW_IT_WORKS: Array<{
  number: string
  title: string
  body: string
  imageSrc: string
  imageAlt: string
}> = [
  {
    number: '01',
    title: 'Browse verified listings',
    body: 'Every listing on MoveSmart is owner-verified with accurate rent, deposit, and inclusions clearly posted. No bait-and-switch, no stale photos - filter by city, bedrooms, and budget and shortlist homes in minutes.',
    imageSrc:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Bright modern Canadian rental condo interior',
  },
  {
    number: '02',
    title: 'Apply online in minutes',
    body: 'Upload your ID, proof of income, and references through our secure portal. One application works across every MoveSmart listing - no re-typing, no printing, no faxing anything to anyone.',
    imageSrc:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Renter completing an online rental application on a laptop',
  },
  {
    number: '03',
    title: 'Transparent screening',
    body: 'We run credit, employment, and reference checks to the same standard for every applicant and issue a decision within 48 hours. You get a clear answer fast, not a ghost after a showing.',
    imageSrc:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'MoveSmart leasing team reviewing applicant files',
  },
  {
    number: '04',
    title: 'Sign, pay, move in',
    body: 'Sign the Ontario Standard Lease digitally, pay your last-month deposit by e-transfer or pre-auth, and pick up your keys on move-in day. Your tenant portal goes live the same morning for rent, maintenance, and documents.',
    imageSrc:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Property owner handing over keys to a new tenant on move-in day',
  },
]

/* ---------- Property types (image-led card grid) ---------- */

const PROPERTY_TYPES: Array<{
  title: string
  desc: string
  imageSrc: string
  imageAlt: string
  tag: string
}> = [
  {
    title: 'Apartments',
    tag: 'Purpose-built rentals',
    desc: 'Purpose-built rental buildings - elevators, on-site management, transit-friendly locations, often with utilities bundled.',
    imageSrc:
      'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Modern Canadian apartment building exterior',
  },
  {
    title: 'Condos',
    tag: 'Amenity-rich towers',
    desc: 'Individually owned units in amenity-rich buildings - gyms, pools, lobby attendants, often newer construction with in-suite laundry.',
    imageSrc:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Bright modern condo interior with large windows',
  },
  {
    title: 'Houses',
    tag: 'Family detached',
    desc: 'Detached and semi-detached homes with yards, driveways, and basements - ideal for families and long-term renters.',
    imageSrc:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Family home in a residential Canadian neighbourhood',
  },
  {
    title: 'Townhouses',
    tag: 'Planned communities',
    desc: 'Multi-level homes with the footprint of a house and the maintenance profile of a condo - often in planned communities.',
    imageSrc:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Row of modern Canadian townhouses',
  },
]

/* ---------- Why MoveSmart (editorial 01/02/03) ---------- */

const WHY_PILLARS = [
  {
    number: '01',
    title: 'Verified listings, no bait-and-switch',
    body: "Every property is owner-verified before it goes live. The rent you see is the rent you pay - no phantom listings, no re-routing to a different unit, no surprise fees introduced at signing. If it's on MoveSmart, it's real, available, and priced as shown.",
  },
  {
    number: '02',
    title: 'Fast, fair applications',
    body: 'We apply the same screening criteria to every applicant and issue a decision within 48 hours. Newcomers with thin Canadian credit, self-employed applicants, and students are evaluated on the full picture - income, references, rental history - not a single score.',
  },
  {
    number: '03',
    title: 'Real support after move-in',
    body: 'A dedicated team handles maintenance tickets, lease questions, and renewals through your tenant portal. Urgent issues are triaged within hours, not days - you are a resident, not a file number in a call queue.',
  },
]

/* ---------- Transparent fee table ---------- */

const FEE_ROWS: Array<{ label: string; value: string; note?: string }> = [
  {
    label: 'Application fee',
    value: '$0',
    note: 'Credit and reference checks are covered by the landlord',
  },
  {
    label: 'Last-month rent deposit',
    value: '1 month rent',
    note: 'Held per Ontario Residential Tenancies Act; no additional security deposit permitted',
  },
  {
    label: 'Key deposit',
    value: 'Refundable',
    note: 'Typically $100-$250; returned in full when all keys are returned',
  },
  {
    label: 'Utilities (heat & water)',
    value: 'Included where stated',
    note: 'Each listing states exactly what is bundled - never assumed',
  },
  {
    label: 'Parking & storage',
    value: 'Listed per unit',
    note: 'Priced separately where applicable, disclosed before application',
  },
  {
    label: 'How rent is paid',
    value: 'PAD, e-transfer, or portal',
    note: 'Pre-authorized debit recommended to keep a clean rent-payment history',
  },
  {
    label: 'Late fee',
    value: 'None',
    note: 'Ontario law prohibits landlord late fees on residential rent',
  },
  {
    label: 'Rent increase cap',
    value: 'Provincial guideline',
    note: 'Max once per 12 months with 90 days written notice (Form N1)',
  },
]

/* ---------- Tenant testimonials (photo cards with avatar imagery) ---------- */

const PULL_QUOTES: Array<{
  quote: string
  name: string
  city: string
  unit: string
  imageSrc: string
  imageAlt: string
}> = [
  {
    quote:
      'I applied on a Tuesday and had keys in my hand nine days later. Every number on the listing matched the lease. That never happened to me before.',
    name: 'Priya',
    city: 'Mississauga, ON',
    unit: '2-bed condo, Square One',
    imageSrc:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Priya, MoveSmart tenant in Mississauga',
  },
  {
    quote:
      'Our dishwasher died on a Sunday. I logged a ticket at 9pm and a tech was here Monday afternoon. I stopped dreading maintenance calls.',
    name: 'Marcus',
    city: 'Hamilton, ON',
    unit: 'Detached house, Westdale',
    imageSrc:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Marcus, MoveSmart tenant in Hamilton',
  },
]

// Per-city Unsplash photo IDs so the Featured Cities tiles render real
// imagery instead of dark fallback placeholders. Cities not in this map
// fall back to a generic Canadian streetscape.
const CITY_IMAGES: Record<string, string> = {
  toronto: 'photo-1517090504586-fde19ea6066f', // CN Tower
  ottawa: 'photo-1503614472-8c93d56e92ce', // Canadian cityscape
  mississauga: 'photo-1545324418-cc1a3fa10c00', // modern condo
  hamilton: 'photo-1486325212027-8081e485255e', // multi-storey
  brampton: 'photo-1568605114967-8130f3a36994', // suburban home
  vaughan: 'photo-1577415124269-fc1140a69e91', // apartment block
  markham: 'photo-1564013799919-ab600027ffc6', // suburban exterior
  'richmond-hill': 'photo-1570129477492-45c003edd2be', // modern home
  oakville: 'photo-1517090504586-fde19ea6066f', // Toronto downtown
  burlington: 'photo-1502672260266-1c1ef2d93688', // bright interior
  kitchener: 'photo-1486325212027-8081e485255e', // multi-storey
  waterloo: 'photo-1505691938895-1758d7feb511', // modern condo
  london: 'photo-1564013799919-ab600027ffc6', // suburban
  ottawa_default: 'photo-1503614472-8c93d56e92ce',
}

const CITY_IMAGE_FALLBACK = 'photo-1503614472-8c93d56e92ce'

function cityHeroImage(slug: string): string {
  const id = CITY_IMAGES[slug] ?? CITY_IMAGE_FALLBACK
  return `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`
}

export default async function TenantsPage() {
  // Static local data (Sanity has been removed). Tenants hub features the
  // top cities from the fallback city list.
  const cities: CityCardData[] = getFallbackCityList()
    .slice(0, 8)
    .map((c) => ({
      title: c.title,
      slug: c.slug.current,
      provinceSlug: c.provinceSlug,
      population: c.population,
      medianRent: c.medianRent,
      heroImageUrl: cityHeroImage(c.slug.current),
      heroImageAlt: `${c.title} skyline and neighbourhood`,
    }))

  const heroAside = (
    <div className="rounded-3xl border border-brand-navy/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-7">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
        Start your search
      </p>
      <h2 className="mt-2 font-display text-xl font-normal text-brand-navy sm:text-2xl">
        Browse by home type
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Filter verified listings across 160+ Canadian cities. No account required to browse.
      </p>

      {/* Home-type chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { label: '1-bed', href: '/properties/' },
          { label: '2-bed', href: '/properties/' },
          { label: 'Condo', href: '/properties/' },
          { label: 'Townhouse', href: '/properties/' },
          { label: 'House', href: '/properties/' },
          { label: 'Pet-friendly', href: '/properties/' },
        ].map((chip) => (
          <Link
            key={chip.label}
            href={chip.href}
            className="rounded-full border border-brand-navy/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-emerald/40 hover:bg-emerald-50 hover:text-brand-emerald"
          >
            {chip.label}
          </Link>
        ))}
      </div>

      {/* Popular cities row */}
      <div className="mt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Popular cities
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {[
            { label: 'Toronto', href: '/ca/ontario/toronto/' },
            { label: 'Ottawa', href: '/ca/ontario/ottawa/' },
            { label: 'Mississauga', href: '/ca/ontario/mississauga/' },
            { label: 'Hamilton', href: '/ca/ontario/hamilton/' },
            { label: 'Brampton', href: '/ca/ontario/brampton/' },
          ].map((city) => (
            <Link
              key={city.label}
              href={city.href}
              className="font-medium text-slate-600 underline decoration-brand-gold/50 decoration-2 underline-offset-[5px] transition-colors hover:text-brand-emerald hover:decoration-brand-emerald"
            >
              {city.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Strong CTA */}
      <Link
        href="/properties/"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-emerald px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-dark hover:shadow-md"
      >
        See all live listings
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>

      <div className="mt-5 border-t border-brand-navy/10 pt-4">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Every listing is owner-verified. Rent, deposit, and inclusions shown are what you pay -
          not an estimate.
        </p>
      </div>
    </div>
  )

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'For Tenants', href: '/tenants/' },
          ]}
        />
      </div>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <PageHeroBlock
        kicker="Tenant Hub"
        eyebrow="Find your next home"
        headline="Verified rentals, fair applications, real homes."
        hideAccentDot
        lede="Browse owner-verified apartments, condos, houses, and townhouses across 160+ Canadian cities. Apply online in minutes and get a decision within 48 hours."
        cta1={{ label: 'Browse rentals', href: '/properties/' }}
        cta2={{ label: 'Tenant FAQ', href: '/faq/' }}
        meta={[
          { label: 'Cities', value: '20+' },
          { label: 'Avg move-in', value: '18 days' },
          { label: 'Listings', value: 'Daily' },
          { label: 'Response', value: '< 24h' },
        ]}
        aside={heroAside}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Couple settling into a bright modern rental apartment"
      />

      {/* ─── Editorial image bridge: happy new tenants moving in ───────── */}
      <section className="bg-white pt-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-xl shadow-brand-navy/10">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80&auto=format&fit=crop"
                alt="Smiling young couple celebrating after being approved for their new rental apartment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              {/* Floating decision badge */}
              <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl shadow-brand-navy/15 sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                    <svg viewBox="0 0 24 24" className="size-5 text-brand-emerald" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">Approved</p>
                    <p className="font-display text-lg text-brand-navy">48 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Renters first
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                A 48-hour decision,{' '}
                <span className="font-display italic text-brand-emerald">not a ghost.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Newcomers with thin Canadian credit, self-employed applicants, and students all get reviewed on the full picture - income, references, rental history - not a single score. You get a clear answer fast, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How renting with us works (image-led zigzag) ───────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-14 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                The Process
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                How renting with us{' '}
                <span className="font-display italic text-brand-emerald">works</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Four steps, from first click to keys-in-hand. Every one of them visible in your tenant portal.
              </p>
            </div>
          </RevealOnScroll>

          <ol className="relative space-y-6 sm:space-y-8">
            {HOW_IT_WORKS.map((step, idx) => {
              const isEven = idx % 2 === 0
              return (
                <ZigzagStep
                  key={step.number}
                  index={idx}
                  className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand-navy/10 md:grid-cols-12 md:gap-0"
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden md:col-span-5 md:aspect-auto md:h-full md:min-h-[320px] ${
                      isEven ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <Image
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover"
                      unoptimized
                    />
                    {/* Soft gradient overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-tr from-brand-navy/30 via-transparent to-transparent"
                    />
                    {/* Floating numeral */}
                    <span
                      aria-hidden="true"
                      className="absolute left-5 top-5 flex size-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 font-display text-2xl italic text-white shadow-lg backdrop-blur-md sm:size-16 sm:text-3xl"
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Copy */}
                  <div
                    className={`p-6 sm:p-8 md:col-span-7 md:p-10 ${
                      isEven ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                      Step {step.number}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[17px]">
                      {step.body}
                    </p>
                  </div>
                </ZigzagStep>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ─── Property types (image-led card grid) ─────────────────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        {/* Decorative dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-12 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Browse by property type
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Find your perfect{' '}
                <span className="font-display italic text-brand-emerald">home</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Four formats, every one of them owner-verified. Pick the layout that fits your life — then filter the live listings.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
            {PROPERTY_TYPES.map((type, idx) => (
              <FeeTableRow
                key={type.title}
                index={idx}
                className="h-full"
              >
                <Link
                  href="/properties/"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
                >
                  {/* Hero image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={type.imageSrc}
                      alt={type.imageAlt}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 320px"
                      unoptimized
                    />
                    {/* Navy gradient for legibility */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent"
                    />
                    {/* Tag pill */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <span className="size-1 rounded-full bg-brand-gold" aria-hidden="true" />
                      {type.tag}
                    </div>
                    {/* Title at bottom-left */}
                    <p className="absolute inset-x-4 bottom-3 font-display text-2xl font-normal italic leading-none text-white sm:text-3xl">
                      {type.title}
                      <span className="text-brand-gold">.</span>
                    </p>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">{type.desc}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-emerald transition-colors group-hover:text-emerald-700">
                      Browse {type.title.toLowerCase()}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </FeeTableRow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editorial banner: agent-led showing ──────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/15">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2400&q=80&auto=format&fit=crop"
              alt="Prospective tenants touring an open Canadian apartment with a leasing agent"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-brand-navy/15 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-8 pb-8 sm:px-12 sm:pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Real showings, real homes
              </p>
              <p className="mt-2 font-display text-2xl font-normal italic leading-snug text-white sm:text-3xl md:text-4xl">
                Tour the unit before you apply. No bait-and-switch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Cities ─────────────────────────────────────────────── */}
      {cities.length > 0 && (
        <div id="cities">
          <CityGridBlock cities={cities} columns={4} />
        </div>
      )}

      {/* ─── Why rent from MoveSmart - DARK PHOTOGRAPHIC BACKDROP ─────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
        {/* Photographic backdrop: Canadian skyline at dusk */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=2400&q=80&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
          {/* Layered navy gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/88 to-brand-navy/80" />
          <div className="absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/8 blur-3xl" />
        </div>

        {/* Gold hairlines top + bottom */}
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
            <div className="mb-14 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
                Why MoveSmart
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                Renting,{' '}
                <span className="font-display italic text-brand-emerald">done right</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                Three commitments we hold to every renter, every application, every move-in.
              </p>
            </div>
          </RevealOnScroll>

          <div className="divide-y divide-white/12 border-t border-white/12">
            {WHY_PILLARS.map((pillar, idx) => (
              <FeeTableRow
                key={pillar.number}
                index={idx}
                className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-12"
              >
                <div className="md:col-span-3">
                  <span
                    className="font-display text-5xl font-normal leading-none text-brand-gold sm:text-6xl md:text-7xl"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl font-normal leading-snug text-white sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                    {pillar.body}
                  </p>
                </div>
              </FeeTableRow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Transparent fee table ───────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-10 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Transparent pricing
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                What you&apos;ll pay &amp; how you pay{' '}
                <span className="font-display italic text-brand-emerald">it</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Every fee, deposit, and payment method - posted before you apply. No last-minute
                add-ons, no surprise charges at signing.
              </p>
            </div>
          </RevealOnScroll>

          <div className="border-t-2 border-brand-navy/80">
            {FEE_ROWS.map((row, idx) => (
              <FeeTableRow
                key={row.label}
                index={idx}
                className="grid grid-cols-12 items-baseline gap-4 border-b border-brand-navy/10 py-5 sm:py-6"
              >
                <div className="col-span-12 sm:col-span-4">
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-navy sm:text-[13px]">
                    {row.label}
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className="col-span-12 hidden flex-1 border-b border-dotted border-brand-navy/20 sm:col-span-3 sm:block"
                />
                <div className="col-span-12 sm:col-span-5 sm:text-right">
                  <p className="font-display text-xl font-normal text-brand-navy sm:text-2xl">
                    {row.value}
                  </p>
                  {row.note && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {row.note}
                    </p>
                  )}
                </div>
              </FeeTableRow>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-brand-navy/10 pt-8">
            <div>
              <p className="font-display text-4xl font-normal text-brand-navy sm:text-5xl">
                <CountUp value={0} prefix="$" />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Application fee
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-normal text-brand-navy sm:text-5xl">
                <CountUp value={14} suffix=" days" />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Average time to move-in
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-normal text-brand-navy sm:text-5xl">
                <CountUp value={20} suffix="+" />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Cities across Canada &amp; the US
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tenant testimonials (photo cards) ─────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-24">
        {/* Decorative dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="clipReveal" duration={0.6}>
            <div className="mb-12 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                <span aria-hidden="true" className="block h-px w-8 bg-brand-emerald/60" />
                Tenant stories
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Real renters,{' '}
                <span className="font-display italic text-brand-emerald">real moves</span>
                <span className="text-brand-gold" aria-hidden="true">.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Two recent placements who chose to put it on the record.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {PULL_QUOTES.map((q, idx) => (
              <PullQuoteReveal
                key={q.name}
                delay={idx * 0.1}
                className="not-italic"
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10">
                  {/* Top accent rule */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
                  />

                  <div className="flex flex-1 flex-col gap-6 p-7 sm:p-9">
                    {/* Quote glyph */}
                    <span
                      aria-hidden="true"
                      className="font-display text-6xl leading-none text-brand-gold/70 sm:text-7xl"
                    >
                      &ldquo;
                    </span>

                    <p className="-mt-4 font-display text-xl font-normal italic leading-snug text-brand-navy sm:text-2xl md:text-[1.6rem]">
                      {q.quote}
                    </p>

                    <footer className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-5">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-emerald/20">
                        <Image
                          src={q.imageSrc}
                          alt={q.imageAlt}
                          fill
                          sizes="48px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-brand-navy">{q.name}</p>
                        <p className="text-xs text-slate-500">
                          {q.unit} &middot; {q.city}
                        </p>
                      </div>
                      {/* Verified badge */}
                      <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
                        <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
                        Verified
                      </span>
                    </footer>
                  </div>
                </div>
              </PullQuoteReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <FAQBlock questions={TENANT_FAQS} title="Tenant FAQs" showQuestionsCta={false} />

      {/* ─── CTA Banner ─────────────────────────────────────────────────── */}
      <CTABannerBlock
        headline="Ready to find your home?"
        primaryCta={{ label: 'Browse rentals', href: '/properties/' }}
      />
    </main>
  )
}
