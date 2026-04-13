'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'

const EASE = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────────────────────────
// Types (mirrored from server page to keep coupling explicit)
// ─────────────────────────────────────────────────────────────

export interface EditorialArticle {
  title: string
  slug: string
  category?: string
  excerpt?: string
  author?: string
  publishedAt?: string
  cityTitle?: string
  readTime?: number
}

interface ResourcesEditorialProps {
  featured: EditorialArticle | null
  recent: EditorialArticle[]
  counts: {
    articles: number
    guides: number
    reports: number
  }
}

// ─────────────────────────────────────────────────────────────
// Static editorial data (topics, most-read, glossary)
// ─────────────────────────────────────────────────────────────

const TOPICS: { label: string; href: string; active?: boolean }[] = [
  { label: 'All', href: '#recent', active: true },
  { label: 'For Owners', href: '#recent' },
  { label: 'For Tenants', href: '#recent' },
  { label: 'Market Reports', href: '#recent' },
  { label: 'Legal & Compliance', href: '#recent' },
  { label: 'Maintenance', href: '#recent' },
  { label: 'Moving', href: '#recent' },
  { label: 'Budgeting', href: '#recent' },
  { label: 'Glossary', href: '#glossary' },
]

const MOST_READ = [
  {
    n: '01',
    title: 'The Canadian landlord\u2019s tenant-screening playbook',
    blurb:
      'Credit, employment, references, and the two questions that catch 80% of problem applicants before they sign.',
    href: '/resources/tenant-screening-playbook/',
  },
  {
    n: '02',
    title: 'How to set rent you will actually collect',
    blurb:
      'A pricing framework that balances CMHC benchmarks, local comps, and concession realities so a unit rents in under three weeks.',
    href: '/resources/rent-pricing-framework/',
  },
  {
    n: '03',
    title: 'Ontario LTB: what owners must know in 2026',
    blurb:
      'N-notices, rent-increase guidelines, and the paperwork habits that keep applications out of the Landlord and Tenant Board.',
    href: '/resources/ontario-ltb-2026/',
  },
  {
    n: '04',
    title: 'Maintenance escalation: the 24/4/0 rule',
    blurb:
      '24 hours to acknowledge, 4 days to schedule, 0 excuses for unsafe conditions. A working SLA owners can hand a vendor.',
    href: '/resources/maintenance-escalation/',
  },
  {
    n: '05',
    title: 'Year-end tax prep for rental owners',
    blurb:
      'A deductible checklist, depreciation primer, and the three records your accountant wishes you had kept all year.',
    href: '/resources/year-end-tax-prep/',
  },
]

const GLOSSARY: { term: string; def: string }[] = [
  {
    term: 'Tenant screening',
    def: 'Multi-step vetting of credit history, employment, references, and identity before a lease is signed.',
  },
  {
    term: 'Rent roll',
    def: 'A live register of every unit, tenant, rent amount, and lease end date across an owner\u2019s portfolio.',
  },
  {
    term: 'CMHC',
    def: 'Canada Mortgage and Housing Corporation \u2014 the federal body that publishes vacancy and average-rent benchmarks.',
  },
  {
    term: 'Vacancy rate',
    def: 'The share of rental units sitting empty in a given submarket; the leading indicator of pricing power.',
  },
  {
    term: 'LTB',
    def: 'Ontario\u2019s Landlord and Tenant Board \u2014 the tribunal that adjudicates tenancy disputes under the RTA.',
  },
  {
    term: 'N-notice',
    def: 'A numbered notice form (N4, N5, N12\u2026) landlords serve under the Ontario Residential Tenancies Act.',
  },
  {
    term: 'MLS',
    def: 'Multiple Listing Service \u2014 the REALTOR\u00ae database; one of several channels we syndicate rentals to.',
  },
  {
    term: 'Amortization',
    def: 'The schedule over which a mortgage principal is paid down; shapes owner cash-flow math on a rental.',
  },
  {
    term: 'NOI',
    def: 'Net Operating Income \u2014 gross rent minus operating expenses, before mortgage interest and taxes.',
  },
  {
    term: 'Cap rate',
    def: 'NOI divided by property value; the standard yardstick for comparing rental investments.',
  },
]

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatDate(iso?: string): string | null {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return null
  }
}

function estimatedReadTime(article: EditorialArticle): number {
  if (article.readTime && article.readTime > 0) return article.readTime
  const base = (article.excerpt?.length ?? 400) / 5 / 220
  return Math.max(3, Math.round(base * 6))
}

function categoryLabel(c?: string): string {
  if (!c) return 'Dispatch'
  const map: Record<string, string> = {
    blog: 'Dispatch',
    guide: 'Guide',
    'market-report': 'Market Report',
    'legal-guide': 'Legal',
    comparison: 'Comparison',
    'case-study': 'Case Study',
  }
  return map[c] ?? c
}

// ─────────────────────────────────────────────────────────────
// Featured article (magazine-style)
// ─────────────────────────────────────────────────────────────

function FeaturedArticle({ article }: { article: EditorialArticle }) {
  const readTime = estimatedReadTime(article)
  const date = formatDate(article.publishedAt)
  const author = article.author ?? 'The MoveSmart editors'

  return (
    <section className="relative overflow-hidden bg-[#FBFAF6] py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll variant="blur" duration={0.9}>
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {categoryLabel(article.category)} \u00b7 Featured
          </p>
          <h2 className="font-display text-4xl font-normal leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-[3.25rem]">
            {article.title}
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-600">
            <span className="font-medium text-brand-navy">{author}</span>
            <span aria-hidden="true" className="text-slate-400">
              \u00b7
            </span>
            <span>{readTime} min read</span>
            {date && (
              <>
                <span aria-hidden="true" className="text-slate-400">
                  \u00b7
                </span>
                <time dateTime={article.publishedAt}>{date}</time>
              </>
            )}
            {article.cityTitle && (
              <>
                <span aria-hidden="true" className="text-slate-400">
                  \u00b7
                </span>
                <span>{article.cityTitle}</span>
              </>
            )}
          </div>
          {article.excerpt && (
            <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic leading-relaxed text-slate-700 sm:text-2xl">
              {article.excerpt}
            </p>
          )}
          <div className="mt-10">
            <Link
              href={`/resources/${article.slug}/`}
              className="group inline-flex items-center gap-2 border-b-2 border-brand-emerald pb-1 font-display text-lg italic text-brand-emerald transition-colors hover:text-brand-navy hover:border-brand-navy"
            >
              Read the piece
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                \u2192
              </span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Browse-by-topic horizontal nav
// ─────────────────────────────────────────────────────────────

function TopicNav() {
  return (
    <nav
      aria-label="Browse by topic"
      className="border-y border-brand-navy/10 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Browse by topic
        </p>
        <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-2 text-sm">
          {TOPICS.map((t) => (
            <li key={t.label}>
              <a
                href={t.href}
                className={
                  t.active
                    ? 'font-display italic text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px]'
                    : 'text-slate-600 transition-colors hover:text-brand-navy'
                }
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────
// Recent articles - magazine masonry (varied sizes, hairlines)
// ─────────────────────────────────────────────────────────────

function RecentArticles({ items }: { items: EditorialArticle[] }) {
  const shouldReduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Deterministic pseudo-random rotation per index (no hydration drift)
  const rotations = useMemo(
    () => items.map((_, i) => ((i * 37) % 11) / 10 - 0.5),
    [items]
  )

  if (items.length === 0) {
    return (
      <section id="recent" className="bg-[#FBFAF6] py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-display text-2xl italic text-slate-600">
            New dispatches are in the press. Check back next week.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="recent" className="bg-[#FBFAF6] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-brand-navy/15 pb-4">
            <h2 className="font-display text-3xl font-normal text-brand-navy sm:text-4xl">
              Recent{' '}
              <span className="italic text-brand-emerald">dispatches</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="hidden text-sm text-slate-500 sm:block">
              Updated weekly \u00b7{' '}
              <CountUp value={items.length} className="font-semibold text-brand-navy" />{' '}
              in the feed
            </p>
          </div>
        </RevealOnScroll>

        <div
          ref={ref}
          className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((a, i) => {
            const prominence = i % 5 === 0 ? 'lg' : i % 3 === 0 ? 'md' : 'sm'
            const pullQuote = i % 7 === 3
            const date = formatDate(a.publishedAt)
            const author = a.author ?? 'MoveSmart editors'

            return (
              <motion.article
                key={a.slug}
                initial={
                  shouldReduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: 20, rotate: rotations[i] - 0.5 }
                }
                animate={
                  inView
                    ? shouldReduce
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, rotate: 0 }
                    : undefined
                }
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: EASE,
                }}
                className={
                  prominence === 'lg'
                    ? 'md:col-span-2'
                    : undefined
                }
              >
                <div className="border-t border-brand-navy/15 pt-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                    {categoryLabel(a.category)}
                    {a.cityTitle && (
                      <span className="ml-2 text-slate-500">
                        {' \u00b7 '}
                        {a.cityTitle}
                      </span>
                    )}
                  </p>
                  <h3
                    className={
                      prominence === 'lg'
                        ? 'font-display text-3xl font-normal leading-tight text-brand-navy sm:text-4xl'
                        : prominence === 'md'
                          ? 'font-display text-2xl font-normal leading-snug text-brand-navy'
                          : 'font-display text-xl font-normal leading-snug text-brand-navy'
                    }
                  >
                    <Link
                      href={`/resources/${a.slug}/`}
                      className="transition-colors hover:text-brand-emerald"
                    >
                      {a.title}
                    </Link>
                  </h3>
                  {a.excerpt && (
                    <p
                      className={
                        pullQuote
                          ? 'mt-3 font-display text-base italic leading-relaxed text-slate-700'
                          : 'mt-3 text-sm leading-relaxed text-slate-600'
                      }
                    >
                      {pullQuote ? `\u201c${a.excerpt}\u201d` : a.excerpt}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-slate-500">
                    {author}
                    {date && <span> \u00b7 {date}</span>}
                    <span> \u00b7 {estimatedReadTime(a)} min</span>
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Most-read guides - numbered stack, no cards
// ─────────────────────────────────────────────────────────────

function MostReadStack() {
  const shouldReduce = useReducedMotion()
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            The shelf
          </p>
          <h2 className="mb-12 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
            Most-read{' '}
            <span className="italic text-brand-emerald">guides</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
        </RevealOnScroll>

        <ol ref={ref} className="divide-y divide-brand-navy/10">
          {MOST_READ.map((g, i) => (
            <motion.li
              key={g.n}
              initial={
                shouldReduce ? { opacity: 0 } : { opacity: 0, x: -60 }
              }
              animate={
                inView
                  ? shouldReduce
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0 }
                  : undefined
              }
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="flex items-start gap-6 py-6 sm:gap-10"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl italic text-brand-gold sm:text-6xl"
              >
                {g.n}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-xl font-normal text-brand-navy sm:text-2xl">
                  <Link
                    href={g.href}
                    className="transition-colors hover:text-brand-emerald"
                  >
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {g.blurb}
                </p>
                <Link
                  href={g.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-emerald transition-colors hover:text-brand-navy"
                >
                  Read the guide
                  <span aria-hidden="true">\u2192</span>
                </Link>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Glossary - 2-col <dl>, clipReveal on terms
// ─────────────────────────────────────────────────────────────

function Glossary() {
  return (
    <section id="glossary" className="bg-[#FBFAF6] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Index
          </p>
          <h2 className="mb-12 font-display text-3xl font-normal text-brand-navy sm:text-4xl">
            Glossary of property{' '}
            <span className="italic text-brand-emerald">terms</span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
        </RevealOnScroll>

        <dl className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div
              key={g.term}
              className="border-t border-brand-navy/15 py-5 first:border-t sm:[&:nth-child(2)]:border-t"
            >
              <RevealOnScroll variant="clipReveal" duration={0.6}>
                <dt className="font-display text-lg font-normal text-brand-navy">
                  {g.term}
                </dt>
              </RevealOnScroll>
              <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                {g.def}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Newsletter signup - editorial panel, not a card
// ─────────────────────────────────────────────────────────────

function NewsletterPanel() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-y border-brand-navy/15 py-10 text-center sm:py-14">
          <RevealOnScroll variant="scaleIn" duration={0.7}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
              The dispatch
            </p>
            <h2 className="font-display text-3xl font-normal text-brand-navy sm:text-4xl">
              One email a month.{' '}
              <span className="italic text-brand-emerald">No noise</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              New guides, Canadian market shifts, and the occasional policy
              alert. If a month has nothing worth reading, we don\u2019t send.
            </p>
          </RevealOnScroll>

          <form
            action="/contact/?intent=newsletter"
            method="get"
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input type="hidden" name="intent" value="newsletter" />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@domain.com"
              className="flex-1 border-b border-brand-navy/25 bg-transparent px-1 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-none border border-brand-navy bg-brand-navy px-6 py-3 font-display text-sm uppercase tracking-wider text-white transition-colors hover:bg-brand-emerald hover:border-brand-emerald"
            >
              Subscribe
            </button>
          </form>
          <p className="mx-auto mt-4 max-w-md text-xs text-slate-500">
            No spam, ever. Unsubscribe in one click. We never share your email.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Composed export
// ─────────────────────────────────────────────────────────────

export function ResourcesEditorial({
  featured,
  recent,
  counts,
}: ResourcesEditorialProps) {
  // suppress unused lint in case counts referenced only by parent hero
  void counts
  return (
    <>
      {featured && <FeaturedArticle article={featured} />}
      <TopicNav />
      <RecentArticles items={recent} />
      <MostReadStack />
      <Glossary />
      <NewsletterPanel />
    </>
  )
}
