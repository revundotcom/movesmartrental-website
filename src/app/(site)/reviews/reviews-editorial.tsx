'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'
import { GradientText } from '@/components/ui/gradient-text'
import { MagneticButton } from '@/components/ui/magnetic-button'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=MoveSmart+Rentals+reviews'

const EASE = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────────────────────────
// Data (preserved verbatim)
// ─────────────────────────────────────────────────────────────

interface Review {
  name: string
  city: string
  province: string
  propertyType: string
  quote: string
  date?: string
  size?: 'sm' | 'md' | 'lg'
}

const REVIEWS: Review[] = [
  {
    name: 'Priya S.',
    city: 'Mississauga',
    province: 'ON',
    propertyType: '3-bed semi',
    date: 'Feb 2026',
    size: 'md',
    quote:
      'Filled in nine days at $200 over our asking rent. The screening report was the most thorough I have ever seen - credit, employment, two reference calls, the works. I sleep better.',
  },
  {
    name: 'Marcus T.',
    city: 'Toronto',
    province: 'ON',
    propertyType: 'Downtown condo',
    date: 'Jan 2026',
    size: 'sm',
    quote:
      'Two units, two perfect placements. Communication is the difference - I always know where things stand.',
  },
  {
    name: 'Hema V.',
    city: 'Brampton',
    province: 'ON',
    propertyType: 'Detached 4-bed',
    date: 'Mar 2026',
    size: 'lg',
    quote:
      'I had been burned by an agent who placed a tenant in three weeks who did not pay. MoveSmart took longer to vet, but the family they placed has been flawless for two years now. I would never go back to the rush-and-pray model. Their process is the product.',
  },
  {
    name: 'Daniel R.',
    city: 'Hamilton',
    province: 'ON',
    propertyType: 'Duplex',
    date: 'Feb 2026',
    size: 'sm',
    quote:
      'Honest pricing, no surprise fees. They told me exactly what my rent ceiling was, even when I pushed for more.',
  },
  {
    name: 'Linda C.',
    city: 'Ottawa',
    province: 'ON',
    propertyType: 'Townhouse',
    date: 'Dec 2025',
    size: 'md',
    quote:
      'I live overseas and needed someone I could trust completely. Three years in, every monthly statement has been on time and accurate. The owner portal is genuinely useful - not the usual broken industry software.',
  },
  {
    name: 'Jennifer M.',
    city: 'Burlington',
    province: 'ON',
    propertyType: '2-bed condo',
    date: 'Mar 2026',
    size: 'sm',
    quote:
      'They turned a vacant unit around in eleven days. My previous PM took six weeks for the same building.',
  },
  {
    name: 'Andre P.',
    city: 'Vancouver',
    province: 'BC',
    propertyType: 'Yaletown 1-bed',
    date: 'Feb 2026',
    size: 'md',
    quote:
      'I interviewed four firms. MoveSmart was the only one that gave me a written market analysis before asking for a signature. That alone said everything about how they operate.',
  },
  {
    name: 'Sukhbir D.',
    city: 'Calgary',
    province: 'AB',
    propertyType: 'Suburban detached',
    date: 'Jan 2026',
    size: 'sm',
    quote:
      'Smooth handover from the previous PM. No drama, no gaps in service.',
  },
  {
    name: 'Rachel K.',
    city: 'Edmonton',
    province: 'AB',
    propertyType: 'Townhouse',
    date: 'Mar 2026',
    size: 'md',
    quote:
      'They handled an emergency furnace replacement in February at minus thirty without me lifting a finger. Three contractor quotes within a day, work done in 48 hours. That is what I am paying for.',
  },
  {
    name: 'Owen B.',
    city: 'Toronto',
    province: 'ON',
    propertyType: 'High Park duplex',
    date: 'Nov 2025',
    size: 'sm',
    quote:
      'Five years as a client. Two tenant turnovers in that time, both painless. Recommended to my whole investor circle.',
  },
  {
    name: 'Anita G.',
    city: 'Mississauga',
    province: 'ON',
    propertyType: 'Square One condo',
    date: 'Feb 2026',
    size: 'md',
    quote:
      'Their photographer made my unit look like a feature in House & Home. Showings booked out the first weekend. Lease signed at full ask.',
  },
  {
    name: 'Tomás L.',
    city: 'Ottawa',
    province: 'ON',
    propertyType: 'Westboro single-family',
    date: 'Dec 2025',
    size: 'sm',
    quote:
      'Direct, no upsell, no nonsense. Exactly what I want from a property manager.',
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
  { name: 'Google', rating: '4.9', count: '200+ reviews', href: GOOGLE_REVIEWS_URL },
  { name: 'BBB', rating: 'A+', count: 'Accredited business', href: 'https://www.bbb.org/' },
  { name: 'Realtor.ca', rating: '4.8', count: '60+ reviews', href: 'https://www.realtor.ca/' },
  { name: 'Yelp', rating: '4.7', count: '40+ reviews', href: 'https://www.yelp.ca/' },
]

interface CaseStudy {
  name: string
  city: string
  property: string
  before: string
  after: string
  story: string
  pullQuote: string
  stats: { label: string; value: string }[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    name: 'Hema Verma',
    city: 'Brampton, ON',
    property: 'Detached 4-bed, $3,400 target rent',
    before:
      'Six weeks vacant after a rushed placement collapsed at month two. Two months of unpaid rent.',
    after:
      'Re-listed, vetted, and signed a two-year lease with an A-tier family within twelve days.',
    story:
      'Hema came to us after a discount agent placed a tenant in three weeks who never paid. We re-priced her unit, restaged the photography, and put every applicant through full income, credit, and reference checks. The family we placed has been flawless for two years and just signed a renewal at a 4% increase.',
    pullQuote: 'Their process is the product - not the speed.',
    stats: [
      { label: 'Days to fill', value: '12' },
      { label: 'Renewal year 2', value: '+4%' },
      { label: 'Late payments', value: '0' },
    ],
  },
  {
    name: 'Linda Cheng',
    city: 'Ottawa, ON',
    property: 'Westboro townhouse, owner overseas',
    before:
      'Living in Singapore. Previous PM missed two HVAC service windows, lost a tenant over slow maintenance.',
    after:
      'Three years later: same tenant in place, every monthly statement on time, zero owner-side admin.',
    story:
      'Distance ownership is its own discipline. Linda needed a firm that would treat the asset like our own when she could not be there. We built a maintenance schedule, opened a single point of contact, and routed every approval over $300 through the owner portal. She has not had to chase a single email in three years.',
    pullQuote: 'Three years, zero chased emails.',
    stats: [
      { label: 'Years as client', value: '3' },
      { label: 'Maintenance SLA hit', value: '100%' },
      { label: 'Statement accuracy', value: '100%' },
    ],
  },
  {
    name: 'Andre Pereira',
    city: 'Vancouver, BC',
    property: 'Yaletown 1-bed, premium positioning',
    before:
      'Listed at $2,950 by previous broker. Sat empty for 38 days through peak season.',
    after:
      'Repositioned at $3,150 with new photography. Signed in nine days at full ask.',
    story:
      'Andre had been told his unit was overpriced. Our market analysis showed the opposite - it was under-marketed. New photography, a tighter listing copy, and targeted promotion to relocating tech employees produced four qualified applications in the first weekend.',
    pullQuote: 'Under-marketed, not over-priced.',
    stats: [
      { label: 'Days to fill', value: '9' },
      { label: 'Above prior ask', value: '+$200' },
      { label: 'Annual revenue lift', value: '+$2.4k' },
    ],
  },
]

const ACCREDITATIONS = [
  'BBB A+',
  'PMAO Member',
  'REIN Affiliate',
  'GTA Chamber Member',
  'CRA Filing Compliant',
  'TRESA Licensed',
]

const GOOGLE_RECENTS = [
  {
    name: 'Jennifer M.',
    when: '2 weeks ago',
    quote:
      'Eleven days to fill a unit my last PM took six weeks on. Night and day.',
  },
  {
    name: 'Andre P.',
    when: '3 weeks ago',
    quote:
      'Written market analysis before signature. The only firm of four that did this.',
  },
  {
    name: 'Sukhbir D.',
    when: '1 month ago',
    quote: 'Smooth handover, no drama, no gaps. Recommended.',
  },
  {
    name: 'Anita G.',
    when: '1 month ago',
    quote:
      'Photography made my unit look incredible. Showings booked out the first weekend.',
  },
  {
    name: 'Tomás L.',
    when: '5 weeks ago',
    quote: 'Direct, no upsell, no nonsense. Exactly what I want.',
  },
]

// ─────────────────────────────────────────────────────────────
// Section 1: Massive opening pull-quote
// ─────────────────────────────────────────────────────────────

function OpeningPullQuote() {
  return (
    <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-28">
      {/* Hairline ornamentation */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-navy/15 to-transparent"
      />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brand-emerald">
          The Featured Review · Vol. 12 · Spring 2026
        </p>

        <RevealOnScroll variant="rotateIn" duration={0.9}>
          <blockquote className="mt-10">
            <span
              aria-hidden="true"
              className="block font-display text-7xl leading-none text-brand-gold sm:text-8xl"
            >
              &ldquo;
            </span>
            <p className="mx-auto mt-2 max-w-4xl font-display text-[3rem] italic leading-[1.05] tracking-tight text-brand-navy sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem]">
              <GradientText variant="emerald">Filled</GradientText> in nine days
              at $200 over ask.
            </p>
          </blockquote>
        </RevealOnScroll>

        <RevealOnScroll variant="fade" delay={0.6}>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            The screening report was the most thorough I have ever seen - credit,
            employment, two reference calls, the works. I sleep better.
          </p>
        </RevealOnScroll>

        <RevealOnScroll variant="slideUp" delay={0.8}>
          <p className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.28em] text-brand-navy">
            Priya S.
            <span aria-hidden="true" className="mx-3 text-brand-gold">
              ·
            </span>
            <span className="text-slate-500">Mississauga, Ontario</span>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Section 2: Aggregate trust bar - typography first
// ─────────────────────────────────────────────────────────────

function AggregateTrustBar() {
  return (
    <section className="relative bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400">
          Verified across the web · April 2026
        </p>

        <RevealOnScroll
          variant="slideUp"
          staggerFrom="center"
          stagger={0.12}
          className="mt-8 flex flex-col items-center justify-center divide-y divide-brand-navy/15 text-center sm:flex-row sm:divide-x sm:divide-y-0"
        >
          {SOURCES.map((s) => {
            const numeric = parseFloat(s.rating)
            const isNumber = !Number.isNaN(numeric)
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full px-6 py-5 transition-colors sm:w-auto sm:px-10"
              >
                <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 group-hover:text-brand-emerald">
                  {s.name}
                </span>
                <span className="mt-2 block font-display text-4xl italic text-brand-navy sm:text-5xl">
                  {isNumber ? (
                    <CountUp value={numeric} />
                  ) : (
                    s.rating
                  )}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {s.count}
                </span>
              </a>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Section 3: Reviews editorial column layout
// ─────────────────────────────────────────────────────────────

function EditorialReview({
  review,
  index,
  reduceMotion,
}: {
  review: Review
  index: number
  reduceMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Alternate typographic treatment
  const isSerif = index % 2 === 0
  const sizeClass =
    review.size === 'lg'
      ? 'text-2xl sm:text-3xl leading-snug'
      : review.size === 'md'
        ? 'text-lg sm:text-xl leading-snug'
        : 'text-base sm:text-lg leading-relaxed'

  // Tiny rotation offset (±1.5deg) - papers settling
  const rotateFrom = index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1.2 : -0.8

  return (
    <motion.div
      ref={ref}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 14, rotate: rotateFrom }
      }
      animate={
        inView
          ? reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, rotate: 0 }
          : undefined
      }
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.08,
        ease: EASE,
      }}
      className="break-inside-avoid pb-10"
    >
      <p
        className={`text-brand-navy ${sizeClass} ${
          isSerif ? 'font-display italic' : 'font-sans'
        }`}
      >
        <span aria-hidden="true" className="text-brand-gold">
          &ldquo;
        </span>
        {review.quote}
        <span aria-hidden="true" className="text-brand-gold">
          &rdquo;
        </span>
      </p>
      <p className="mt-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy">
        {review.name}
        <span aria-hidden="true" className="mx-2 text-brand-gold">
          ·
        </span>
        <span className="text-slate-500">
          {review.city}, {review.province}
        </span>
        {review.date && (
          <>
            <span aria-hidden="true" className="mx-2 text-slate-300">
              /
            </span>
            <span className="text-slate-400">{review.date}</span>
          </>
        )}
      </p>
      <p className="mt-1 font-sans text-[11px] italic text-slate-400">
        {review.propertyType}
      </p>
      {/* Hairline rule */}
      <div
        aria-hidden="true"
        className="mt-8 h-px w-full bg-brand-navy/10"
      />
    </motion.div>
  )
}

function ReviewsEditorialSpread() {
  const reduceMotion = useReducedMotion() ?? false
  const [activeCity, setActiveCity] = useState<(typeof FILTER_CITIES)[number]>('All')

  const filtered = useMemo(() => {
    if (activeCity === 'All') return REVIEWS
    return REVIEWS.filter((r) => r.city === activeCity)
  }, [activeCity])

  // Split into two unequal columns: left (wider) gets ~60% of items
  const { left, right } = useMemo(() => {
    const l: Review[] = []
    const r: Review[] = []
    filtered.forEach((rev, i) => {
      // Distribute 3:2 weighted - left gets indices 0,1,2,5,6,7…; right gets 3,4,8,9…
      const phase = i % 5
      if (phase === 0 || phase === 1 || phase === 2) l.push(rev)
      else r.push(rev)
    })
    return { left: l, right: r }
  }, [filtered])

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Editorial header */}
        <div className="max-w-3xl">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brand-emerald">
            The Reviews Wall · Field Notes
          </p>
          <RevealOnScroll variant="clipReveal" duration={0.8}>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
              Twelve owners. Twelve voices.{' '}
              <span className="font-display italic text-brand-emerald">
                Read them as written.
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll variant="fade" delay={0.3}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Drawn from our verified Google, BBB, and Realtor.ca profiles. Names
              abbreviated for owner privacy; cities and outcomes are real.
            </p>
          </RevealOnScroll>
        </div>

        {/* Filter strip - text links, no chips */}
        <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-brand-navy/10 py-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
            Filter
          </span>
          {FILTER_CITIES.map((c) => {
            const active = activeCity === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCity(c)}
                className={
                  active
                    ? 'font-sans text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px]'
                    : 'font-sans text-sm font-medium text-slate-500 transition-colors hover:text-brand-emerald hover:underline hover:underline-offset-[6px]'
                }
              >
                {c}
              </button>
            )
          })}
          <span className="ml-auto font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
            Showing {filtered.length} of {REVIEWS.length}
          </span>
        </div>

        {/* Two-column editorial flow */}
        <div className="mt-14 grid grid-cols-1 gap-x-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {left.map((r, i) => (
              <EditorialReview
                key={r.name + r.city}
                review={r}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
          <div className="lg:col-span-2 lg:border-l lg:border-brand-navy/10 lg:pl-12">
            {right.map((r, i) => (
              <EditorialReview
                key={r.name + r.city}
                review={r}
                index={i + 100}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-sm font-semibold text-brand-emerald underline decoration-brand-gold decoration-2 underline-offset-[6px] hover:text-brand-navy"
          >
            Read all{' '}
            <CountUp value={200} suffix="+" />{' '}
            reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Section 4: Long-form case studies
// ─────────────────────────────────────────────────────────────

function CaseStudyArticle({
  cs,
  idx,
}: {
  cs: CaseStudy
  idx: number
}) {
  // Drop-cap is the first letter of the story
  const firstLetter = cs.story.charAt(0)
  const restOfStory = cs.story.slice(1)
  const half = Math.ceil(restOfStory.length / 2)
  // Find a sentence break near halfway for the pull-quote split
  const splitAt = restOfStory.indexOf('. ', half) + 1 || half
  const partA = restOfStory.slice(0, splitAt).trim()
  const partB = restOfStory.slice(splitAt).trim()

  return (
    <article className="mx-auto max-w-3xl py-16 sm:py-20">
      <div className="flex items-baseline gap-4 font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brand-emerald">
        <span>Case Study {String(idx + 1).padStart(2, '0')}</span>
        <span aria-hidden="true" className="text-brand-gold">
          ·
        </span>
        <span className="text-slate-400">{cs.city}</span>
      </div>

      <RevealOnScroll variant="clipReveal" duration={0.9}>
        <h3 className="mt-4 font-display text-4xl leading-tight tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
          {cs.name}
        </h3>
      </RevealOnScroll>

      <p className="mt-3 font-display text-lg italic text-slate-500 sm:text-xl">
        {cs.property}
      </p>

      {/* Before / After inline byline */}
      <RevealOnScroll variant="fade" delay={0.2}>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Before
            </p>
            <p className="mt-2 leading-relaxed text-slate-700">{cs.before}</p>
          </div>
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-emerald">
              After
            </p>
            <p className="mt-2 leading-relaxed text-slate-700">{cs.after}</p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Drop cap article */}
      <RevealOnScroll variant="fade" delay={0.3}>
        <div className="mt-12">
          <p className="font-display text-[1.2rem] leading-[1.7] text-brand-navy sm:text-[1.35rem]">
            <span
              aria-hidden="true"
              className="float-left mr-3 mt-2 font-display text-7xl leading-[0.8] text-brand-gold sm:text-8xl"
            >
              {firstLetter}
            </span>
            {partA}
          </p>
        </div>
      </RevealOnScroll>

      {/* Pull quote */}
      <RevealOnScroll variant="rotateIn" duration={0.8}>
        <blockquote className="my-12 border-y border-brand-gold/40 py-8 text-center">
          <p className="font-display text-3xl italic leading-snug text-brand-emerald sm:text-4xl">
            &ldquo;{cs.pullQuote}&rdquo;
          </p>
        </blockquote>
      </RevealOnScroll>

      {partB && (
        <RevealOnScroll variant="fade" delay={0.2}>
          <p className="font-display text-[1.2rem] leading-[1.7] text-brand-navy sm:text-[1.35rem]">
            {partB}
          </p>
        </RevealOnScroll>
      )}

      {/* Outcome stats inline at the end */}
      <RevealOnScroll variant="slideUp" delay={0.3}>
        <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6 border-t border-brand-navy/15 pt-8">
          {cs.stats.map((s) => {
            // Try to count numeric values
            const match = s.value.match(/-?\d+(\.\d+)?/)
            const numeric = match ? parseFloat(match[0]) : null
            const prefix = numeric !== null ? s.value.split(match![0])[0] : ''
            const suffix = numeric !== null ? s.value.split(match![0])[1] : ''

            return (
              <div key={s.label}>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                  {s.label}
                </p>
                <p className="mt-2 font-display text-4xl italic text-brand-navy sm:text-5xl">
                  {numeric !== null ? (
                    <>
                      {prefix}
                      <CountUp value={numeric} />
                      {suffix}
                    </>
                  ) : (
                    s.value
                  )}
                </p>
              </div>
            )
          })}
        </div>
      </RevealOnScroll>
    </article>
  )
}

function CaseStudiesEditorial() {
  return (
    <section className="bg-[#FBFAF6] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brand-emerald">
            Featured Case Studies · Long Reads
          </p>
          <RevealOnScroll variant="clipReveal" duration={0.9}>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
              Three owners.{' '}
              <span className="font-display italic text-brand-emerald">
                Three outcomes.
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll variant="fade" delay={0.3}>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              Real situations, real numbers. Names used with permission; details
              verified by the client.
            </p>
          </RevealOnScroll>
        </div>

        <div className="mt-12 divide-y divide-brand-navy/15">
          {CASE_STUDIES.map((cs, idx) => (
            <CaseStudyArticle key={cs.name} cs={cs} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Section 5: Recognition lockup row
// ─────────────────────────────────────────────────────────────

function RecognitionLockup() {
  return (
    <section className="bg-brand-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
          Recognition & Accreditation
        </p>
        <RevealOnScroll variant="clipReveal" duration={0.8}>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Credentials we{' '}
            <span className="font-display italic text-brand-emerald">
              earn.
            </span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll variant="fade" delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            We belong to the bodies that hold property managers to a written
            standard - not just feel-good marketing logos.
          </p>
        </RevealOnScroll>

        <RevealOnScroll variant="slideUp" staggerFrom="center" delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 font-display text-lg italic text-white/85 sm:text-xl md:text-2xl">
            {ACCREDITATIONS.map((a, i) => (
              <span key={a} className="inline-flex items-center gap-3">
                <span>{a}</span>
                {i < ACCREDITATIONS.length - 1 && (
                  <span aria-hidden="true" className="text-brand-gold">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Section 6: Google reviews - typewritten threaded list
// ─────────────────────────────────────────────────────────────

function GoogleReviewsThread() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brand-emerald">
          Recent · From the Google Feed
        </p>
        <RevealOnScroll variant="clipReveal" duration={0.8}>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Five most recent,{' '}
            <span className="font-display italic text-brand-emerald">
              unedited.
            </span>
          </h2>
        </RevealOnScroll>
        <p className="mt-4 flex items-baseline gap-3 font-sans text-xs text-slate-500">
          <span className="font-display text-3xl italic text-brand-navy">
            <CountUp value={4.9} />
          </span>
          <span>average across</span>
          <span className="font-display text-2xl italic text-brand-navy">
            <CountUp value={200} suffix="+" />
          </span>
          <span>verified Google reviews</span>
        </p>

        <ol className="mt-12 space-y-10 border-l-2 border-brand-gold/40 pl-7 font-mono">
          {GOOGLE_RECENTS.map((r, i) => (
            <RevealOnScroll key={r.name + r.when} variant="fade" delay={i * 0.08}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[33px] top-2 size-2.5 rounded-full bg-brand-gold ring-4 ring-white"
                />
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                  {r.when}
                  <span aria-hidden="true" className="mx-2 text-brand-gold">
                    ·
                  </span>
                  <span className="text-brand-navy">{r.name}</span>
                </p>
                <p className="mt-3 font-mono text-[15px] leading-relaxed text-slate-700">
                  &gt; {r.quote}
                </p>
              </li>
            </RevealOnScroll>
          ))}
        </ol>

        <div className="mt-12 border-t border-brand-navy/10 pt-6 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-semibold text-brand-emerald underline decoration-brand-gold decoration-2 underline-offset-[6px] hover:text-brand-navy"
          >
            Open the full thread on Google →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Section 7: Leave a review - editorial sign-off
// ─────────────────────────────────────────────────────────────

function LeaveAReviewSignOff() {
  return (
    <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brand-emerald">
          Already a client?
        </p>
        <RevealOnScroll variant="clipReveal" duration={0.8}>
          <h3 className="mt-4 font-display text-3xl italic leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            If we earned it, we would love your review.
          </h3>
        </RevealOnScroll>
        <RevealOnScroll variant="fade" delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Honest reviews - including critical ones - help other owners make the
            right call. Two minutes on Google goes a long way.
          </p>
        </RevealOnScroll>

        <RevealOnScroll variant="slideUp" delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              as="a"
              href={GOOGLE_REVIEWS_URL}
              className="rounded-full bg-brand-navy px-7 py-3.5 font-sans text-sm font-bold tracking-wide text-white transition-shadow hover:shadow-lg"
            >
              Leave a Google review
            </MagneticButton>
            <Link
              href="/contact/"
              className="font-sans text-sm font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px] hover:text-brand-emerald"
            >
              Or send feedback privately
            </Link>
          </div>
        </RevealOnScroll>
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
      <OpeningPullQuote />
      <AggregateTrustBar />
      <ReviewsEditorialSpread />
      <CaseStudiesEditorial />
      <RecognitionLockup />
      <GoogleReviewsThread />
      <LeaveAReviewSignOff />
    </>
  )
}
