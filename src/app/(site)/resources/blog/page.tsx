import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'Blog | Insights for Serious Rental Operators | MoveSmart Rentals',
  description:
    'Field notes on leasing strategy, tenant qualification, pricing, and operations from the MoveSmart Rentals team. Built for landlords, property managers, and institutional rental operators.',
  alternates: { canonical: '/resources/blog/' },
  openGraph: {
    title: 'Blog | MoveSmart Rentals',
    description:
      'Field notes on leasing strategy, tenant qualification, pricing, and operations.',
    images: ['/og-share.png'],
  },
}

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/* ──────────────────────────────────────────────────────────────────
   Mock article data — cards are visually clickable (hover state +
   cursor) but intentionally do NOT navigate, since individual
   /resources/blog/<slug>/ detail pages do not exist yet (per client
   direction, June 2026 — avoid 404s).
   ────────────────────────────────────────────────────────────────── */

interface Article {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readMinutes: number
  author: string
  imageId: string
  featured?: boolean
}

const ARTICLES: Article[] = [
  {
    slug: 'pricing-rentals-in-a-softening-market',
    category: 'Pricing',
    title: 'How to price your rental in a softening market — without leaving money on the table',
    excerpt:
      'When listing velocity drops, the temptation is to cut asks aggressively. The data says the opposite: small, structured price tests beat dramatic cuts almost every time. Here is the playbook we use on every owner-file.',
    date: 'June 18, 2026',
    readMinutes: 7,
    author: 'Ravi Thakur',
    imageId: '1517935706615-2717063c2225',
    featured: true,
  },
  {
    slug: 'red-flags-in-tenant-applications',
    category: 'Screening',
    title: '5 red flags in tenant applications you cannot ignore',
    excerpt:
      'A clean credit score is not the whole picture. Here are the patterns our underwriting team flags before sending any shortlist to an owner.',
    date: 'June 12, 2026',
    readMinutes: 5,
    author: 'Simran Patel',
    imageId: '1517048676732-d65bc937f952',
  },
  {
    slug: 'hidden-cost-of-one-vacancy-month',
    category: 'Operations',
    title: 'The hidden cost of one vacancy month — and how to claw it back',
    excerpt:
      'A 30-day vacancy is rarely a 30-day problem. It compounds into turn costs, marketing reload, and lost renewal momentum. Here is the math.',
    date: 'June 5, 2026',
    readMinutes: 6,
    author: 'Anika Rao',
    imageId: '1591400304123-7d10f2f5add9',
  },
  {
    slug: 'multi-unit-lease-up-playbook',
    category: 'Operations',
    title: 'The multi-unit lease-up playbook for new construction',
    excerpt:
      'Absorbing 50+ units in under 90 days is not about marketing budget. It is about absorption curves, pricing waterfalls, and a disciplined showings cadence.',
    date: 'May 28, 2026',
    readMinutes: 9,
    author: 'Daniel Mercer',
    imageId: '1483790488866-adee346370c3',
  },
  {
    slug: 'owner-renewal-rate-only-kpi',
    category: 'Owner Resources',
    title: 'Why owner-renewal rate is the only KPI that actually matters',
    excerpt:
      'Time-to-lease is a vanity metric. Approval accuracy is a process metric. Owner-renewal is the truth. Here is why we organise the whole firm around it.',
    date: 'May 21, 2026',
    readMinutes: 5,
    author: 'Emily Larsson',
    imageId: '1508002461948-e612d8221021',
  },
  {
    slug: 'toronto-q2-2026-rental-report',
    category: 'Market Trends',
    title: 'Toronto rental market: the Q2 2026 report',
    excerpt:
      'Headline rents are flat. Net effective rents are not. Here is what the comp set is actually telling us across the GTA this quarter.',
    date: 'May 14, 2026',
    readMinutes: 8,
    author: 'Ravi Thakur',
    imageId: '1605276373954-0c4a0dac5b12',
  },
  {
    slug: 'setting-rents-that-do-not-get-reduced',
    category: 'Pricing',
    title: 'Setting rents that do not get reduced 30 days in',
    excerpt:
      'Every reduced listing started as an over-confident first ask. The fix is not lower asks — it is sharper ones, backed by absorption forecasts.',
    date: 'May 7, 2026',
    readMinutes: 4,
    author: 'Ravi Thakur',
    imageId: '1596022558228-463253a5f27c',
  },
  {
    slug: 'professional-move-in-handover',
    category: 'Operations',
    title: 'What a professional move-in handover actually looks like',
    excerpt:
      'Keys, utilities, insurance certificate, walkthrough video, signed condition report. The five deliverables every owner should expect on day one.',
    date: 'April 30, 2026',
    readMinutes: 6,
    author: 'Mei Bennett',
    imageId: '1519178614-68673b201f36',
  },
  {
    slug: 'reading-prior-landlord-references',
    category: 'Screening',
    title: 'Reading prior-landlord references: what tenants do not say is louder than what they do',
    excerpt:
      'A short, hesitant reference call tells you more than a long, glowing one. Here is how our analyst reads between the lines.',
    date: 'April 23, 2026',
    readMinutes: 5,
    author: 'Simran Patel',
    imageId: '1634944350954-c7377654e6f1',
  },
]

const CATEGORIES = [
  'All',
  'Pricing',
  'Screening',
  'Operations',
  'Owner Resources',
  'Market Trends',
] as const

export default function BlogPage() {
  const featured = ARTICLES.find((a) => a.featured)
  const rest = ARTICLES.filter((a) => !a.featured)

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/resources/blog/#blog`,
    name: 'MoveSmart Rentals Blog',
    url: `${SITE_URL}/resources/blog/`,
    description:
      'Field notes on leasing strategy, tenant qualification, pricing, and operations.',
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--brand-navy)] py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">
            Blog
          </p>
          <h1 className="text-balance font-display text-4xl font-normal leading-[1.05] tracking-tight text-white md:text-6xl">
            Insights for serious{' '}
            <span className="italic text-[var(--brand-gold)]">rental operators.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Field notes from the leasing desk, the underwriting desk, the
            pricing desk, and the move-in desk. Built for landlords, property
            managers, and institutional rental operators who take the work
            seriously.
          </p>
        </div>
      </section>

      {/* ── CATEGORY FILTER (visual only — wire up to CMS later) ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 sm:gap-3 sm:py-5">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                type="button"
                className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  i === 0
                    ? 'border-[var(--brand-navy)] bg-[var(--brand-navy)] text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────────────────────────── */}
      {featured && (
        <section className="bg-[#FBFAF6] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <article className="group grid cursor-pointer grid-cols-1 gap-6 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md md:grid-cols-12 md:gap-0">
              <div className="relative aspect-[16/10] md:col-span-7 md:aspect-auto">
                <Image
                  src={UNSPLASH(featured.imageId, 1600)}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[var(--brand-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:col-span-5 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">
                  {featured.category}
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-[var(--brand-navy)] transition-colors group-hover:text-[var(--brand-emerald)] sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">{featured.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" /> {featured.readMinutes} min read
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-emerald)]">
                  Read the article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ── ARTICLE GRID ─────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl text-[var(--brand-navy)] sm:text-3xl">
            Latest articles
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/* ─────────────────────────────────────────────────────────────────── */

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={UNSPLASH(article.imageId, 1200)}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">
          {article.category}
        </p>
        <h3 className="mt-3 font-display text-xl font-normal leading-snug tracking-tight text-[var(--brand-navy)] transition-colors group-hover:text-[var(--brand-emerald)] sm:text-[1.4rem]">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {article.excerpt}
        </p>
        <div className="mt-auto pt-5">
          <div aria-hidden="true" className="h-px w-full bg-slate-100" />
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-900">{article.author}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" /> {article.readMinutes} min
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
