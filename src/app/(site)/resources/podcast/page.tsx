import type { Metadata } from 'next'
import Image from 'next/image'
import { Headphones, Mic, Play, Clock, ArrowRight } from 'lucide-react'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'The Smart Lease Podcast | MoveSmart Rentals',
  description:
    'Conversations from the leasing desk. Pricing, screening, lease-ups, and operations — hosted by the MoveSmart Rentals team with guests from across the Canadian and US rental market.',
  alternates: { canonical: '/resources/podcast/' },
  openGraph: {
    title: 'The Smart Lease Podcast',
    description:
      'Conversations from the leasing desk. Pricing, screening, lease-ups, and operations.',
    images: ['/og-default.png'],
  },
}

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/* ──────────────────────────────────────────────────────────────────
   Mock podcast data — episode cards are visually clickable but do
   NOT navigate. Individual /resources/podcast/<slug>/ episode pages
   do not exist yet, so we render the listing as a static showcase
   per client direction (June 2026) to avoid 404s. Listen-on links
   in the hero still open Apple Podcasts / Spotify / etc.
   ────────────────────────────────────────────────────────────────── */

interface Episode {
  number: number
  slug: string
  title: string
  guest?: string
  excerpt: string
  duration: string
  date: string
  imageId: string
  featured?: boolean
}

const EPISODES: Episode[] = [
  {
    number: 12,
    slug: 'why-warmth-is-not-enough',
    title: 'Why warmth is not enough: building proof into every lease',
    guest: 'Founder, MoveSmart Rentals',
    excerpt:
      'A long conversation on why owners do not need warmth alone — they need proof the work was done. We unpack the leasing-phase gap and the seven deliverables every owner-file ships with.',
    duration: '54 min',
    date: 'June 12, 2026',
    imageId: '1590602847861-f357a9332bbc',
    featured: true,
  },
  {
    number: 11,
    slug: 'inside-an-institutional-lease-up',
    title: 'Inside an institutional lease-up: 180 units in 84 days',
    guest: 'Daniel Mercer, Institutional Lease-Up Lead',
    excerpt:
      'The week-by-week story of a 180-unit purpose-built rental in Toronto: pricing waterfalls, marketing budget allocation, and the absorption curve that decided everything.',
    duration: '47 min',
    date: 'May 28, 2026',
    imageId: '1478737270239-2f02b77fc618',
  },
  {
    number: 10,
    slug: 'tenant-screening-the-bank-grade-approach',
    title: 'Tenant screening: the bank-grade approach',
    guest: 'Simran Patel, Tenant Qualification Analyst',
    excerpt:
      'How a former Schedule-I credit analyst built the firm’s underwriting rubric — and why your screening process should look more like an institutional lender than a brokerage.',
    duration: '38 min',
    date: 'May 14, 2026',
    imageId: '1517048676732-d65bc937f952',
  },
  {
    number: 9,
    slug: 'pricing-model-debate-comparables-vs-gut',
    title: 'The pricing-model debate: comparables vs gut feel',
    guest: 'Ravi Thakur, Pricing & Market Analyst',
    excerpt:
      'Where guesswork ends and comparables start. We walk through MoveSmart’s live pricing model and the difference it makes on time-to-lease.',
    duration: '41 min',
    date: 'April 30, 2026',
    imageId: '1605276373954-0c4a0dac5b12',
  },
  {
    number: 8,
    slug: 'move-in-operations-checklists-that-prevent-disputes',
    title: 'Move-in operations: checklists that prevent disputes',
    guest: 'Mei Bennett, Move-In Coordinator',
    excerpt:
      'The last mile of every placement. Keys, utilities, insurance, walkthrough — why the move-in checklist matters more than people think, and what to put on it.',
    duration: '32 min',
    date: 'April 16, 2026',
    imageId: '1519178614-68673b201f36',
  },
  {
    number: 7,
    slug: 'why-we-do-not-do-property-management',
    title: 'Why we do not do property management',
    excerpt:
      'A founder conversation on the structural reasons MoveSmart stayed in the leasing window — and what that focus unlocks for owners who hire a separate property manager.',
    duration: '29 min',
    date: 'April 2, 2026',
    imageId: '1531973576160-7125cd663d86',
  },
]

const HOSTS = [
  {
    name: 'Kevin Liu',
    role: 'Director of Operations',
    bio: 'Twenty-five-plus years in operations leadership across customer service, sales, and back-office. Joined MoveSmart from Embark Student Corp.',
    initials: 'KL',
  },
  {
    name: 'Daniel Mercer',
    role: 'Institutional Lease-Up Lead',
    bio: 'Twelve-year GTA leasing veteran. Has placed 1,400+ tenants and runs the firm’s new-build absorption work.',
    initials: 'DM',
  },
  {
    name: 'Ravi Thakur',
    role: 'Pricing & Market Analyst',
    bio: 'Built the firm’s live pricing model. Four years in real-estate analytics at a Toronto investment fund before MoveSmart.',
    initials: 'RT',
  },
]

const PLATFORM_LINKS = [
  { name: 'Apple Podcasts', href: 'https://podcasts.apple.com/' },
  { name: 'Spotify', href: 'https://open.spotify.com/' },
  { name: 'YouTube', href: 'https://www.youtube.com/' },
  { name: 'RSS', href: '#' },
]

export default function PodcastPage() {
  const featured = EPISODES.find((e) => e.featured)
  const rest = EPISODES.filter((e) => !e.featured)

  const podcastSchema = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    '@id': `${SITE_URL}/resources/podcast/#podcast`,
    name: 'The Smart Lease',
    url: `${SITE_URL}/resources/podcast/`,
    description:
      'Conversations from the leasing desk. Pricing, screening, lease-ups, and operations.',
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[var(--brand-navy)] py-16 text-white sm:py-20 md:py-24">
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Cover art */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-sm shadow-2xl ring-1 ring-white/10">
              <Image
                src={UNSPLASH('1590602847861-f357a9332bbc', 1000)}
                alt="The Smart Lease podcast — studio microphone"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-navy)]/60 via-transparent to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                  The Smart Lease
                </p>
                <p className="mt-1 font-display text-2xl italic text-white">A MoveSmart Rentals podcast</p>
              </div>
            </div>
          </div>

          {/* Copy + listen-on */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">
              Podcast
            </p>
            <h1 className="text-balance font-display text-4xl font-normal leading-[1.05] tracking-tight text-white md:text-6xl">
              The{' '}
              <span className="italic text-[var(--brand-gold)]">Smart Lease.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Conversations from the leasing desk. Pricing, screening,
              lease-ups, and operations — with the MoveSmart Rentals team and
              guests from across the Canadian and US rental market.
            </p>

            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Listen on
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLATFORM_LINKS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  <Headphones className="size-3.5" aria-hidden="true" />
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED / LATEST EPISODE ────────────────────────────── */}
      {featured && (
        <section className="bg-[#FBFAF6] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">
              Latest episode
            </p>
            <article className="grid grid-cols-1 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm md:grid-cols-12">
              <div className="relative aspect-square md:col-span-5 md:aspect-auto">
                <Image
                  src={UNSPLASH(featured.imageId, 1200)}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex size-20 items-center justify-center rounded-full bg-[var(--brand-emerald)] text-white shadow-2xl">
                    <Play className="size-9 fill-current" aria-hidden="true" />
                  </span>
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:col-span-7 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">
                  Episode {featured.number}
                  {featured.guest && (
                    <>
                      <span aria-hidden="true" className="mx-2 text-slate-300">|</span>
                      <span className="text-slate-500">with {featured.guest}</span>
                    </>
                  )}
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-[var(--brand-navy)] sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden="true" /> {featured.duration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.date}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-emerald)]">
                  Show notes and transcript
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ── EPISODE GRID ─────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl text-[var(--brand-navy)] sm:text-3xl">
            All episodes
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((ep) => (
              <EpisodeCard key={ep.slug} ep={ep} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSTS ────────────────────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">
              Hosts
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--brand-navy)] sm:text-4xl">
              The voices on the show.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOSTS.map((h) => (
              <div key={h.name} className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-navy)] font-display text-base text-white"
                  >
                    {h.initials}
                  </span>
                  <div>
                    <p className="font-display text-lg text-[var(--brand-navy)]">{h.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-emerald)]">
                      {h.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{h.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUEST CTA ────────────────────────────────────────────── */}
      <section className="bg-[var(--brand-navy)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
            Be on the show
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl">
            Got a story{' '}
            <span className="italic text-[var(--brand-emerald)]">worth telling?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
            We are always looking for guests who have shipped real work in the
            rental space — operators, founders, analysts, lawyers, contractors.
            If you have a sharp point of view, we want to hear it.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:podcast@movesmartrentals.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[var(--brand-emerald-hover)]"
            >
              <Mic className="size-4" aria-hidden="true" />
              Pitch a guest
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ─────────────────────────────────────────────────────────────────── */

function EpisodeCard({ ep }: { ep: Episode }) {
  return (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={UNSPLASH(ep.imageId, 800)}
          alt={ep.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute right-3 top-3 inline-flex items-center rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          EP {ep.number.toString().padStart(2, '0')}
        </div>
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 inline-flex size-12 items-center justify-center rounded-full bg-[var(--brand-emerald)] text-white shadow-lg transition-transform group-hover:scale-110"
        >
          <Play className="size-5 fill-current" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {ep.guest && (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">
            with {ep.guest}
          </p>
        )}
        <h3 className="mt-2 font-display text-xl font-normal leading-snug tracking-tight text-[var(--brand-navy)] transition-colors group-hover:text-[var(--brand-emerald)] sm:text-[1.4rem]">
          {ep.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{ep.excerpt}</p>
        <div className="mt-auto pt-5">
          <div aria-hidden="true" className="h-px w-full bg-slate-100" />
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" /> {ep.duration}
            </span>
            <span aria-hidden="true">·</span>
            <span>{ep.date}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
