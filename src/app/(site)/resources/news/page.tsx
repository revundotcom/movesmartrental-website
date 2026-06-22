import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'News | Press, Announcements & Milestones | MoveSmart Rentals',
  description:
    'Press coverage, company announcements, market milestones, and product launches from MoveSmart Rentals — the full-service leasing brokerage operating across Canada and the United States.',
  alternates: { canonical: '/resources/news/' },
  openGraph: {
    title: 'News | MoveSmart Rentals',
    description:
      'Press coverage, company announcements, and milestones.',
    images: ['/og-default.png'],
  },
}

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/* ──────────────────────────────────────────────────────────────────
   Mock news data — internal rows are visually clickable but do NOT
   navigate (no /resources/news/<slug>/ detail pages exist yet, so
   we avoid 404s per client direction, June 2026). External press
   items still open the source publication in a new tab.
   ────────────────────────────────────────────────────────────────── */

interface NewsItem {
  slug: string
  type: 'Company News' | 'Press' | 'Milestone' | 'Product Launch'
  source?: string
  externalUrl?: string
  title: string
  excerpt: string
  date: string
  imageId: string
  featured?: boolean
}

const NEWS: NewsItem[] = [
  {
    slug: 'movesmart-expands-to-florida',
    type: 'Company News',
    title: 'MoveSmart Rentals expands operations to Florida',
    excerpt:
      'After three years of building density in the GTA, MoveSmart is bringing its full-service leasing model to South Florida — starting with Miami-Dade and Broward portfolios.',
    date: 'June 17, 2026',
    imageId: '1605276373954-0c4a0dac5b12',
    featured: true,
  },
  {
    slug: '500-unit-milestone',
    type: 'Milestone',
    title: 'MoveSmart reaches 500-unit leased milestone across the GTA',
    excerpt:
      'In the two years since the firm opened its doors, the leasing desk has placed tenants in more than 500 GTA units across single-family rentals, condos, and purpose-built multi-family.',
    date: 'June 5, 2026',
    imageId: '1517935706615-2717063c2225',
  },
  {
    slug: 'cbc-news-toronto-rental-crunch',
    type: 'Press',
    source: 'CBC News',
    externalUrl: 'https://www.cbc.ca/',
    title: 'Featured on CBC News: inside the Toronto rental crunch',
    excerpt:
      'MoveSmart Director of Operations Kevin Liu joined CBC News to discuss the leasing-side dynamics behind the headlines — what is actually moving and what is sitting on the market.',
    date: 'May 28, 2026',
    imageId: '1542744173-8e7e53415bb0',
  },
  {
    slug: 'institutional-lease-up-service-launch',
    type: 'Product Launch',
    title: 'MoveSmart launches institutional lease-up service for new construction',
    excerpt:
      'The new offering bundles pricing strategy, marketing, showings, qualification, and move-in handover for purpose-built rentals with 50+ units launching in a single window.',
    date: 'May 14, 2026',
    imageId: '1483790488866-adee346370c3',
  },
  {
    slug: 'globe-mail-future-of-leasing',
    type: 'Press',
    source: 'The Globe and Mail',
    externalUrl: 'https://www.theglobeandmail.com/',
    title: 'Globe and Mail interview: the future of leasing in Canada',
    excerpt:
      'Founder interview on why brokerages, property managers, and tech platforms are converging on the leasing window — and what owners should look for in the next five years.',
    date: 'April 22, 2026',
    imageId: '1556761175-b413da4baf72',
  },
  {
    slug: 'crm-platform-partnership',
    type: 'Company News',
    title: 'Partnership: MoveSmart selects new CRM platform for North American rollout',
    excerpt:
      'After a six-month evaluation, MoveSmart will standardise its leasing pipeline on a single CRM across Canadian and US markets — building the foundation for the firm’s scale plan.',
    date: 'April 10, 2026',
    imageId: '1531973576160-7125cd663d86',
  },
  {
    slug: 'multi-family-summit-panel',
    type: 'Press',
    source: 'GTA Multi-Family Summit',
    title: 'Daniel Mercer panels at the GTA Multi-Family Summit',
    excerpt:
      'Institutional Lease-Up Lead Daniel Mercer joined a panel on absorption strategy in a cooling market — covering pricing waterfalls, comp-set design, and turn budgets.',
    date: 'March 28, 2026',
    imageId: '1591400304123-7d10f2f5add9',
  },
]

const PRESS_LOGOS = [
  'CBC News',
  'The Globe and Mail',
  'Toronto Star',
  'REP Magazine',
  'FRPO',
  'Canadian Apartment',
]

export default function NewsPage() {
  const featured = NEWS.find((n) => n.featured)
  const rest = NEWS.filter((n) => !n.featured)

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--brand-navy)] py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">
            News
          </p>
          <h1 className="text-balance font-display text-4xl font-normal leading-[1.05] tracking-tight text-white md:text-6xl">
            Press, announcements,{' '}
            <span className="italic text-[var(--brand-gold)]">milestones.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            What we are doing, where we have been featured, and the milestones
            we are hitting as we build a full-service leasing brokerage across
            North America.
          </p>
        </div>
      </section>

      {/* ── PRESS LOGO STRIP ─────────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            As seen in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {PRESS_LOGOS.map((name) => (
              <span
                key={name}
                className="font-display text-lg italic text-[var(--brand-navy)]/85 sm:text-xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────────────────────────── */}
      {featured && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <article className="grid cursor-pointer grid-cols-1 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm md:grid-cols-12">
              <div className="relative aspect-[16/10] md:col-span-7 md:aspect-auto">
                <Image
                  src={UNSPLASH(featured.imageId, 1600)}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[var(--brand-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  Latest
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:col-span-5 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">
                  {featured.type}
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-[var(--brand-navy)] sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  {featured.excerpt}
                </p>
                <p className="mt-5 text-xs text-slate-500">{featured.date}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-emerald)]">
                  Read the full announcement
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ── NEWS LIST ────────────────────────────────────────────── */}
      <section className="bg-white pb-12 pt-4 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl text-[var(--brand-navy)] sm:text-3xl">
            All news
          </h2>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {rest.map((item) => (
              <li key={item.slug}>
                <NewsRow item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── MEDIA INQUIRIES CTA ──────────────────────────────────── */}
      <section className="bg-[var(--brand-navy)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
            Media inquiries
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl">
            Working on a{' '}
            <span className="italic text-[var(--brand-emerald)]">story?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
            Our team is available for interviews on the Canadian and US rental
            markets, multi-family lease-ups, tenant qualification, and leasing
            operations. Same-day response for confirmed press requests.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:press@movesmartrentals.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[var(--brand-emerald-hover)]"
            >
              press@movesmartrentals.com
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              General contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ─────────────────────────────────────────────────────────────────── */

function NewsRow({ item }: { item: NewsItem }) {
  const rowClass =
    'group grid grid-cols-1 gap-4 py-6 transition-colors hover:bg-slate-50/60 sm:grid-cols-12 sm:gap-6 sm:px-2 sm:py-8'

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-slate-100 sm:col-span-4 lg:col-span-3">
        <Image
          src={UNSPLASH(item.imageId, 800)}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="sm:col-span-8 lg:col-span-9">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em]">
          <span className="text-[var(--brand-emerald)]">{item.type}</span>
          {item.source && (
            <>
              <span aria-hidden="true" className="text-slate-300">|</span>
              <span className="text-slate-500">{item.source}</span>
            </>
          )}
          <span aria-hidden="true" className="text-slate-300">|</span>
          <span className="text-slate-500">{item.date}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-normal leading-snug tracking-tight text-[var(--brand-navy)] transition-colors group-hover:text-[var(--brand-emerald)] sm:text-[1.6rem]">
          {item.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {item.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-emerald)]">
          {item.externalUrl ? (
            <>
              Read at {item.source} <ArrowUpRight className="size-4" aria-hidden="true" />
            </>
          ) : (
            <>
              <Newspaper className="size-4" aria-hidden="true" /> Read the announcement
            </>
          )}
        </span>
      </div>
    </>
  )

  // External press items still open the source publication; internal
  // announcements stay on-page (no detail route exists yet).
  if (item.externalUrl) {
    return (
      <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
        {body}
      </a>
    )
  }

  return <div className={`${rowClass} cursor-pointer`}>{body}</div>
}
