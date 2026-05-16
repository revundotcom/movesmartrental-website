'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
  Star,
  Quote,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  TrendingUp,
} from 'lucide-react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=MoveSmart+Rentals+reviews'

// ─────────────────────────────────────────────────────────────
// Data (preserved verbatim from the original)
// ─────────────────────────────────────────────────────────────

interface Review {
  name: string
  city: string
  province: string
  propertyType: string
  quote: string
  date?: string
}

const REVIEWS: Review[] = [
  {
    name: 'Priya S.',
    city: 'Mississauga',
    province: 'ON',
    propertyType: '3-bed semi',
    date: 'Feb 2026',
    quote:
      'Filled in nine days at $200 over our asking rent. The screening report was the most thorough I have ever seen - credit, employment, two reference calls, the works. I sleep better.',
  },
  {
    name: 'Marcus T.',
    city: 'Toronto',
    province: 'ON',
    propertyType: 'Downtown condo',
    date: 'Jan 2026',
    quote:
      'Two units, two perfect placements. Communication is the difference - I always know where things stand.',
  },
  {
    name: 'Hema V.',
    city: 'Brampton',
    province: 'ON',
    propertyType: 'Detached 4-bed',
    date: 'Mar 2026',
    quote:
      'I had been burned by an agent who placed a tenant in three weeks who did not pay. MoveSmart took longer to vet, but the family they placed has been flawless for two years now. I would never go back to the rush-and-pray model. Their process is the product.',
  },
  {
    name: 'Daniel R.',
    city: 'Hamilton',
    province: 'ON',
    propertyType: 'Duplex',
    date: 'Feb 2026',
    quote:
      'Honest pricing, no surprise fees. They told me exactly what my rent ceiling was, even when I pushed for more.',
  },
  {
    name: 'Linda C.',
    city: 'Ottawa',
    province: 'ON',
    propertyType: 'Townhouse',
    date: 'Dec 2025',
    quote:
      'I live overseas and needed a leasing partner I could trust completely. Three placements in three years - clean qualification reports, deposits properly trusted, every lease signed remotely. The owner portal is genuinely useful, not the usual broken industry software.',
  },
  {
    name: 'Jennifer M.',
    city: 'Burlington',
    province: 'ON',
    propertyType: '2-bed condo',
    date: 'Mar 2026',
    quote:
      'They turned a vacant unit around in eleven days. My previous PM took six weeks for the same building.',
  },
  {
    name: 'Andre P.',
    city: 'Vancouver',
    province: 'BC',
    propertyType: 'Yaletown 1-bed',
    date: 'Feb 2026',
    quote:
      'I interviewed four firms. MoveSmart was the only one that gave me a written market analysis before asking for a signature. That alone said everything about how they operate.',
  },
  {
    name: 'Sukhbir D.',
    city: 'Calgary',
    province: 'AB',
    propertyType: 'Suburban detached',
    date: 'Jan 2026',
    quote:
      'Smooth handover from the previous PM. No drama, no gaps in service.',
  },
  {
    name: 'Rachel K.',
    city: 'Edmonton',
    province: 'AB',
    propertyType: 'Townhouse',
    date: 'Mar 2026',
    quote:
      'They handled an emergency furnace replacement in February at minus thirty without me lifting a finger. Three contractor quotes within a day, work done in 48 hours. That is what I am paying for.',
  },
  {
    name: 'Owen B.',
    city: 'Toronto',
    province: 'ON',
    propertyType: 'High Park duplex',
    date: 'Nov 2025',
    quote:
      'Five years as a client. Two tenant turnovers in that time, both painless. Recommended to my whole investor circle.',
  },
  {
    name: 'Anita G.',
    city: 'Mississauga',
    province: 'ON',
    propertyType: 'Square One condo',
    date: 'Feb 2026',
    quote:
      'Their photographer made my unit look like a feature in House & Home. Showings booked out the first weekend. Lease signed at full ask.',
  },
  {
    name: 'Tomás L.',
    city: 'Ottawa',
    province: 'ON',
    propertyType: 'Westboro single-family',
    date: 'Dec 2025',
    quote:
      'Direct, no upsell, no nonsense. Exactly what I want from a leasing advisor.',
  },
]

const FILTER_CITIES = [
  'All',
  'Toronto',
  'Mississauga',
  'Ottawa',
  'Vancouver',
  'Calgary',
] as const

const SOURCES = [
  {
    name: 'Google',
    rating: '4.9',
    count: '200+ reviews',
    href: GOOGLE_REVIEWS_URL,
    accent: 'text-[#4285F4]',
  },
  {
    name: 'BBB',
    rating: 'A+',
    count: 'Accredited',
    href: 'https://www.bbb.org/',
    accent: 'text-[#003a70]',
  },
  {
    name: 'Realtor.ca',
    rating: '4.8',
    count: '60+ reviews',
    href: 'https://www.realtor.ca/',
    accent: 'text-[#E11D48]',
  },
  {
    name: 'Yelp',
    rating: '4.7',
    count: '40+ reviews',
    href: 'https://www.yelp.ca/',
    accent: 'text-[#D32323]',
  },
]

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

const ACCREDITATIONS = [
  { name: 'BBB A+ Accredited', icon: ShieldCheck },
  { name: 'PMAO Member', icon: Award },
  { name: 'REIN Affiliate', icon: TrendingUp },
  { name: 'GTA Chamber Member', icon: CheckCircle2 },
  { name: 'CRA Filing Compliant', icon: ShieldCheck },
  { name: 'TRESA Licensed', icon: Award },
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

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  // Stable color per name (one of 4 brand-aligned hues)
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
      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${cls}`}
    >
      {initials}
    </div>
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
                <Avatar name={featured.name} />
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
// 2. Trust sources — 4-up platform card grid
// ─────────────────────────────────────────────────────────────

function TrustSources() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Verified across the web
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
            Every review is{' '}
            <span className="font-display italic text-brand-emerald">independently sourced</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            We can&apos;t delete a Google review and we wouldn&apos;t if we could. Here&apos;s where our ratings live in public.
          </p>
        </div>

        <RevealOnScroll
          variant="slideUp"
          stagger={0.08}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {SOURCES.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center rounded-2xl border border-brand-navy/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-lg sm:p-7"
            >
              <ArrowUpRight
                aria-hidden="true"
                className="absolute right-4 top-4 size-4 text-slate-300 transition-colors group-hover:text-brand-emerald"
              />
              <p className={`text-sm font-bold uppercase tracking-[0.18em] ${s.accent}`}>
                {s.name}
              </p>
              <p className="mt-4 font-display text-4xl font-normal text-brand-navy sm:text-5xl">
                {s.rating}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">{s.count}</p>
              {s.name !== 'BBB' && (
                <div className="mt-3">
                  <StarRating rating={Math.round(parseFloat(s.rating))} size="sm" />
                </div>
              )}
            </a>
          ))}
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
        <Avatar name={review.name} />
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
  const [activeCity, setActiveCity] = useState<(typeof FILTER_CITIES)[number]>('All')

  const filtered = useMemo(() => {
    if (activeCity === 'All') return REVIEWS
    return REVIEWS.filter((r) => r.city === activeCity)
  }, [activeCity])

  return (
    <section className="bg-[#FBFAF6] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            What owners say
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Twelve owners.{' '}
            <span className="font-display italic text-brand-emerald">Read every word.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Sourced from our verified Google, BBB, and Realtor.ca profiles. Names abbreviated for owner privacy; cities and outcomes are real.
          </p>
        </div>

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Filter
          </span>
          {FILTER_CITIES.map((c) => {
            const active = activeCity === c
            const count = c === 'All' ? REVIEWS.length : REVIEWS.filter((r) => r.city === c).length
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
// 5. Recognition — clean accreditation badges
// ─────────────────────────────────────────────────────────────

function Recognition() {
  return (
    <section className="bg-brand-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            Recognition & accreditation
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl">
            Credentials we{' '}
            <span className="font-display italic text-brand-emerald">earn</span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            We belong to the bodies that hold leasing brokerages to a written standard — not just feel-good marketing logos.
          </p>
        </div>

        <RevealOnScroll
          variant="slideUp"
          stagger={0.06}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {ACCREDITATIONS.map((a) => {
            const Icon = a.icon
            return (
              <div
                key={a.name}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-sm transition-colors hover:border-brand-emerald/30 hover:bg-white/[0.06]"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-emerald/15">
                  <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold leading-tight text-white/90">{a.name}</p>
              </div>
            )
          })}
        </RevealOnScroll>
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
            <ArrowRight className="size-4" />
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
      <FeaturedReview />
      <TrustSources />
      <ReviewsGrid />
      <CaseStudies />
      <Recognition />
      <LeaveAReview />
    </>
  )
}
