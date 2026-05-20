'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
  Star,
  Quote,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=MoveSmart+Rentals+reviews'

// ─────────────────────────────────────────────────────────────
// Data (preserved verbatim from the original)
// ─────────────────────────────────────────────────────────────

type Country = 'CA' | 'US'

interface Review {
  name: string
  city: string
  province: string
  country: Country
  propertyType: string
  quote: string
  date?: string
  /** Unsplash portrait URL for review-card avatar */
  photo: string
}

// Curated set of editorial Unsplash portraits (face-centered, 80px)
const PHOTOS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',
] as const

const REVIEWS: Review[] = [
  {
    name: 'Priya S.',
    city: 'Mississauga',
    province: 'ON',
    country: 'CA',
    propertyType: '3-bed semi',
    date: 'Feb 2026',
    photo: PHOTOS[0],
    quote:
      'Filled in nine days at $200 over our asking rent. The screening report was the most thorough I have ever seen - credit, employment, two reference calls, the works. I sleep better.',
  },
  {
    name: 'Marcus T.',
    city: 'Toronto',
    province: 'ON',
    country: 'CA',
    propertyType: 'Downtown condo',
    date: 'Jan 2026',
    photo: PHOTOS[3],
    quote:
      'Two units, two perfect placements. Communication is the difference - I always know where things stand.',
  },
  {
    name: 'Hema V.',
    city: 'Brampton',
    province: 'ON',
    country: 'CA',
    propertyType: 'Detached 4-bed',
    date: 'Mar 2026',
    photo: PHOTOS[2],
    quote:
      'I had been burned by an agent who placed a tenant in three weeks who did not pay. MoveSmart took longer to vet, but the family they placed has been flawless for two years now. I would never go back to the rush-and-pray model. Their process is the product.',
  },
  {
    name: 'Daniel R.',
    city: 'Hamilton',
    province: 'ON',
    country: 'CA',
    propertyType: 'Duplex',
    date: 'Feb 2026',
    photo: PHOTOS[6],
    quote:
      'Honest pricing, no surprise fees. They told me exactly what my rent ceiling was, even when I pushed for more.',
  },
  {
    name: 'Linda C.',
    city: 'Ottawa',
    province: 'ON',
    country: 'CA',
    propertyType: 'Townhouse',
    date: 'Dec 2025',
    photo: PHOTOS[1],
    quote:
      'I live overseas and needed a leasing partner I could trust completely. Three placements in three years - clean qualification reports, deposits properly trusted, every lease signed remotely. The owner portal is genuinely useful, not the usual broken industry software.',
  },
  {
    name: 'Jennifer M.',
    city: 'Burlington',
    province: 'ON',
    country: 'CA',
    propertyType: '2-bed condo',
    date: 'Mar 2026',
    photo: PHOTOS[5],
    quote:
      'They turned a vacant unit around in eleven days. My previous PM took six weeks for the same building.',
  },
  {
    name: 'Andre P.',
    city: 'Vancouver',
    province: 'BC',
    country: 'CA',
    propertyType: 'Yaletown 1-bed',
    date: 'Feb 2026',
    photo: PHOTOS[7],
    quote:
      'I interviewed four firms. MoveSmart was the only one that gave me a written market analysis before asking for a signature. That alone said everything about how they operate.',
  },
  {
    name: 'Sukhbir D.',
    city: 'Calgary',
    province: 'AB',
    country: 'CA',
    propertyType: 'Suburban detached',
    date: 'Jan 2026',
    photo: PHOTOS[3],
    quote:
      'Smooth handover from the previous PM. No drama, no gaps in service.',
  },
  {
    name: 'Rachel K.',
    city: 'Edmonton',
    province: 'AB',
    country: 'CA',
    propertyType: 'Townhouse',
    date: 'Mar 2026',
    photo: PHOTOS[4],
    quote:
      'They handled an emergency furnace replacement in February at minus thirty without me lifting a finger. Three contractor quotes within a day, work done in 48 hours. That is what I am paying for.',
  },
  {
    name: 'Owen B.',
    city: 'Toronto',
    province: 'ON',
    country: 'CA',
    propertyType: 'High Park duplex',
    date: 'Nov 2025',
    photo: PHOTOS[6],
    quote:
      'Five years as a client. Two tenant turnovers in that time, both painless. Recommended to my whole investor circle.',
  },
  {
    name: 'Anita G.',
    city: 'Mississauga',
    province: 'ON',
    country: 'CA',
    propertyType: 'Square One condo',
    date: 'Feb 2026',
    photo: PHOTOS[0],
    quote:
      'Their photographer made my unit look like a feature in House & Home. Showings booked out the first weekend. Lease signed at full ask.',
  },
  {
    name: 'Tomás L.',
    city: 'Ottawa',
    province: 'ON',
    country: 'CA',
    propertyType: 'Westboro single-family',
    date: 'Dec 2025',
    photo: PHOTOS[7],
    quote:
      'Direct, no upsell, no nonsense. Exactly what I want from a leasing advisor.',
  },

  // ── United States reviews ───────────────────────────────
  {
    name: 'Jordan W.',
    city: 'Miami',
    province: 'FL',
    country: 'US',
    propertyType: 'Brickell high-rise',
    date: 'Mar 2026',
    photo: PHOTOS[3],
    quote:
      'Two units leased in under three weeks, both above the comp set. Their photography and listing copy lifted my asking rent by $250 a month.',
  },
  {
    name: 'Carla M.',
    city: 'Austin',
    province: 'TX',
    country: 'US',
    propertyType: 'East-side bungalow',
    date: 'Feb 2026',
    photo: PHOTOS[2],
    quote:
      'I went through three property managers in five years. MoveSmart is the first team that treated tenant screening like underwriting, not a checkbox.',
  },
  {
    name: 'Michael H.',
    city: 'Denver',
    province: 'CO',
    country: 'US',
    propertyType: 'LoHi townhome',
    date: 'Jan 2026',
    photo: PHOTOS[6],
    quote:
      'Out-of-state owner here. Signed the lease, deposited the first month, and never had to fly out. Their owner portal makes everything frictionless.',
  },
  {
    name: 'Sasha B.',
    city: 'Phoenix',
    province: 'AZ',
    country: 'US',
    propertyType: 'Scottsdale 3-bed',
    date: 'Mar 2026',
    photo: PHOTOS[5],
    quote:
      'They pushed back when I wanted to over-price. Their data was right - leased in eleven days at the number they suggested.',
  },
  {
    name: 'David K.',
    city: 'Atlanta',
    province: 'GA',
    country: 'US',
    propertyType: 'Buckhead condo',
    date: 'Feb 2026',
    photo: PHOTOS[7],
    quote:
      'Honest, responsive, and surprisingly fast for a full-service shop. I have already referred two other landlords in my building.',
  },
]

const FILTER_CITIES_CA = [
  'All',
  'Toronto',
  'Mississauga',
  'Ottawa',
  'Vancouver',
  'Calgary',
] as const

const FILTER_CITIES_US = [
  'All',
  'Miami',
  'Austin',
  'Denver',
  'Phoenix',
  'Atlanta',
] as const

interface CaseStudy {
  name: string
  city: string
  property: string
  before: string
  after: string
  pullQuote: string
  imageUrl: string
  stats: { label: string; value: string }[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    name: 'Hema Verma',
    city: 'Brampton, ON',
    property: 'Detached 4-bed · $3,400 rent',
    before:
      'Six weeks vacant after a rushed placement collapsed at month two. Two months of unpaid rent.',
    after:
      'Re-listed, vetted, and signed a two-year lease with an A-tier family within twelve days.',
    pullQuote: 'Their process is the product — not the speed.',
    imageUrl:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80&auto=format&fit=crop',
    stats: [
      { label: 'Days to fill', value: '12' },
      { label: 'Renewal year 2', value: '+4%' },
      { label: 'Late payments', value: '0' },
    ],
  },
  {
    name: 'Linda Cheng',
    city: 'Ottawa, ON',
    property: 'Westboro townhouse · owner overseas',
    before:
      'Living in Singapore. Previous broker placed a tenant in three weeks who broke the lease at month four.',
    after:
      'Three placements over three years: every lease signed remotely, every deposit trusted, zero owner-side admin.',
    pullQuote: 'Three placements, zero chased emails.',
    imageUrl:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80&auto=format&fit=crop',
    stats: [
      { label: 'Years as client', value: '3' },
      { label: 'Placements done', value: '3' },
      { label: 'Qualification accuracy', value: '100%' },
    ],
  },
  {
    name: 'Andre Pereira',
    city: 'Vancouver, BC',
    property: 'Yaletown 1-bed · premium positioning',
    before:
      'Listed at $2,950 by previous broker. Sat empty for 38 days through peak season.',
    after:
      'Repositioned at $3,150 with new photography. Signed in nine days at full ask.',
    pullQuote: 'Under-marketed, not over-priced.',
    imageUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop',
    stats: [
      { label: 'Days to fill', value: '9' },
      { label: 'Above prior ask', value: '+$200' },
      { label: 'Annual lift', value: '+$2.4k' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// Shared atoms
// ─────────────────────────────────────────────────────────────

function StarRating({ rating = 5, size = 'sm' }: { rating?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'size-5' : size === 'md' ? 'size-4' : 'size-3.5'
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating ? 'fill-brand-gold text-brand-gold' : 'fill-slate-200 text-slate-200'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function Avatar({
  name,
  photo,
  size = 'md',
}: {
  name: string
  photo?: string
  size?: 'md' | 'lg'
}) {
  const dim = size === 'lg' ? 56 : 40
  const sizeClass = size === 'lg' ? 'size-14' : 'size-10'
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (photo) {
    return (
      <div
        className={`relative ${sizeClass} shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm`}
      >
        <Image
          src={photo}
          alt={`${name} avatar`}
          width={dim}
          height={dim}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>
    )
  }

  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const palette = [
    'bg-emerald-100 text-emerald-700',
    'bg-indigo-100 text-indigo-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
  ]
  const cls = palette[hash % palette.length]
  return (
    <div
      aria-hidden="true"
      className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-full text-sm font-semibold ${cls}`}
    >
      {initials}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 0. Editorial hero image — handover moment, sets the tone
// ─────────────────────────────────────────────────────────────

function EditorialHeroImage() {
  return (
    <section className="bg-white pt-2 sm:pt-4">
      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll variant="slideUp">
          <figure className="group relative overflow-hidden rounded-3xl border border-brand-navy/10 shadow-[0_30px_80px_-30px_rgba(11,29,58,0.35)]">
            <div className="relative aspect-[16/7]">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=85&auto=format&fit=crop"
                alt="Property owner handing over keys to a new tenant at the front door"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 1100px"
                priority
                unoptimized
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-brand-navy/55 via-brand-navy/15 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-emerald shadow-sm">
                  <CheckCircle2 className="size-3.5" /> 200+ keys handed over
                </span>
                <p className="mt-4 max-w-2xl font-display text-xl leading-snug text-white sm:text-2xl md:text-3xl">
                  Behind every five-star review is a key changing hands &mdash;
                  <span className="italic text-brand-gold"> and an owner who didn&rsquo;t have to be there.</span>
                </p>
              </figcaption>
            </div>
          </figure>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Inline editorial bridge — between trust sources and reviews grid
// ─────────────────────────────────────────────────────────────

function EditorialBridge() {
  return (
    <section className="bg-white pb-4 sm:pb-6">
      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll variant="slideUp">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-brand-navy/10 bg-[#FBFAF6] shadow-sm md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=85&auto=format&fit=crop"
                alt="Couple unpacking moving boxes in their new rental home"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                The next chapter
              </p>
              <h3 className="font-display text-2xl font-normal leading-snug text-brand-navy sm:text-3xl">
                Every review on this page started with{' '}
                <span className="font-display italic text-brand-emerald">a real move-in day</span>
                <span className="text-brand-gold">.</span>
              </h3>
              <p className="text-base leading-relaxed text-slate-600">
                Below: 17 owners across Canada and the US, in their own words. Filter by country or city to find owners near you.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 1. Featured Review — clean hero card
// ─────────────────────────────────────────────────────────────

function FeaturedReview() {
  const featured = REVIEWS[0] // Priya S.
  return (
    <section className="relative bg-[#FBFAF6] py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-emerald/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-emerald">
            <CheckCircle2 className="size-3.5" /> Featured review
          </span>
        </div>

        <RevealOnScroll variant="slideUp">
          <article className="mt-8 rounded-3xl border border-brand-navy/10 bg-white p-8 shadow-[0_20px_60px_-15px_rgba(11,29,58,0.15)] sm:p-12">
            <div className="flex items-center justify-between gap-4">
              <StarRating rating={5} size="md" />
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <ShieldCheck className="size-4 text-brand-emerald" />
                Verified Google review
              </span>
            </div>

            <blockquote className="mt-8 relative">
              <Quote
                aria-hidden="true"
                className="absolute -left-2 -top-2 size-10 text-brand-gold/30"
              />
              <p className="relative pl-6 font-display text-2xl leading-snug text-brand-navy sm:text-3xl md:text-4xl">
                {featured.quote}
              </p>
            </blockquote>

            <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-brand-navy/10 pt-6">
              <div className="flex items-center gap-3">
                <Avatar name={featured.name} photo={featured.photo} size="lg" />
                <div>
                  <p className="font-semibold text-brand-navy">{featured.name}</p>
                  <p className="text-sm text-slate-500">
                    {featured.city}, {featured.province} · {featured.propertyType}
                  </p>
                </div>
              </div>
              {featured.date && (
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {featured.date}
                </span>
              )}
            </footer>
          </article>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 3. All reviews — clean filterable card grid
// ─────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <StarRating rating={5} />
        {review.date && (
          <span className="text-xs font-medium text-slate-400">{review.date}</span>
        )}
      </div>

      <p className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700">
        &ldquo;{review.quote}&rdquo;
      </p>

      <footer className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <Avatar name={review.name} photo={review.photo} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-brand-navy">{review.name}</p>
          <p className="truncate text-xs text-slate-500">
            {review.city}, {review.province} · {review.propertyType}
          </p>
        </div>
      </footer>
    </motion.article>
  )
}

function ReviewsGrid() {
  const [country, setCountry] = useState<Country>('CA')
  const cityList = country === 'CA' ? FILTER_CITIES_CA : FILTER_CITIES_US
  const [activeCity, setActiveCity] =
    useState<(typeof FILTER_CITIES_CA)[number] | (typeof FILTER_CITIES_US)[number]>('All')

  const byCountry = useMemo(
    () => REVIEWS.filter((r) => r.country === country),
    [country],
  )

  const filtered = useMemo(() => {
    if (activeCity === 'All') return byCountry
    return byCountry.filter((r) => r.city === activeCity)
  }, [activeCity, byCountry])

  function switchCountry(next: Country) {
    setCountry(next)
    setActiveCity('All')
  }

  return (
    <section className="bg-[#FBFAF6] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            What owners say
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Owners across North America.{' '}
            <span className="font-display italic text-brand-emerald">Read every word.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Sourced from our verified Google, BBB, Realtor.ca, and Trustpilot profiles. Names abbreviated for owner privacy; cities and outcomes are real.
          </p>
        </div>

        {/* Country toggle */}
        <div className="mt-10 flex items-center justify-center">
          <div
            role="tablist"
            aria-label="Country filter"
            className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm"
          >
            {([
              { id: 'CA', flag: '🇨🇦', label: 'Canada' },
              { id: 'US', flag: '🇺🇸', label: 'United States' },
            ] as const).map((c) => {
              const active = country === c.id
              return (
                <button
                  key={c.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => switchCountry(c.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-brand-navy'
                  }`}
                >
                  <span aria-hidden="true">{c.flag}</span>
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* City filter chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Filter by city
          </span>
          {cityList.map((c) => {
            const active = activeCity === c
            const count =
              c === 'All' ? byCountry.length : byCountry.filter((r) => r.city === c).length
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCity(c)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-emerald/30 hover:text-brand-navy'
                }`}
              >
                {c}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Card grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ReviewCard key={r.name + r.city} review={r} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-navy bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
          >
            Read all 200+ reviews on Google
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 4. Case studies — 3 clean horizontal cards
// ─────────────────────────────────────────────────────────────

function CaseStudyCard({ cs, idx }: { cs: CaseStudy; idx: number }) {
  return (
    <RevealOnScroll variant="slideUp">
      <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:col-span-2 lg:aspect-auto">
            <Image
              src={cs.imageUrl}
              alt={`${cs.name}'s property in ${cs.city}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              unoptimized
            />
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-emerald shadow-sm">
                Case study {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:col-span-3">
            <h3 className="font-display text-2xl font-normal text-brand-navy sm:text-3xl">
              {cs.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {cs.city} · {cs.property}
            </p>

            {/* Before / After */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Before
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{cs.before}</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  After
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{cs.after}</p>
              </div>
            </div>

            {/* Pull quote */}
            <blockquote className="mt-6 border-l-2 border-brand-gold pl-4">
              <p className="font-display text-lg italic leading-snug text-brand-navy">
                &ldquo;{cs.pullQuote}&rdquo;
              </p>
            </blockquote>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-100 pt-5">
              {cs.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    {s.label}
                  </p>
                  <p className="mt-1 font-display text-2xl text-brand-emerald">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}

function CaseStudies() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Owner success stories
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Three owners.{' '}
            <span className="font-display italic text-brand-emerald">Three outcomes.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Real situations, real numbers. Names used with permission; details verified by the client.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {CASE_STUDIES.map((cs, idx) => (
            <CaseStudyCard key={cs.name} cs={cs} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 6. Sign-off CTA
// ─────────────────────────────────────────────────────────────

function LeaveAReview() {
  return (
    <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
          Already a client?
        </p>
        <h3 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
          If we earned it,{' '}
          <span className="font-display italic text-brand-emerald">
            we&apos;d love your review.
          </span>
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
          Honest reviews — including critical ones — help other owners make the right call. Two minutes on Google goes a long way.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Leave a Google review
            <ArrowUpRight className="size-4" />
          </a>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px] hover:text-brand-emerald"
          >
            Or send feedback privately
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Composed export
// ─────────────────────────────────────────────────────────────

export function ReviewsEditorial() {
  return (
    <>
      <EditorialHeroImage />
      <FeaturedReview />
      <EditorialBridge />
      <ReviewsGrid />
      <CaseStudies />
      <LeaveAReview />
    </>
  )
}
