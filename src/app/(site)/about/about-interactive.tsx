'use client'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'

// ────────────────────────────────────────────────────────────────
// Founder essay - editorial long-form with drop-cap + pull-quote
// ────────────────────────────────────────────────────────────────
export function FounderEssay() {
  return (
    <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Side label - left rail */}
        <aside className="lg:col-span-3">
          <RevealOnScroll variant="slideUp" duration={0.7}>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                  Chapter 01
                </span>
              </div>
              <p className="mt-4 font-display text-2xl font-normal leading-tight tracking-tight text-brand-navy">
                Why we<br />
                <span className="font-display italic text-brand-emerald">exist</span>
                <span aria-hidden="true" className="text-brand-gold">.</span>
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
                A note from the team on the gap we set out to close in the rental market.
              </p>
            </div>
          </RevealOnScroll>
        </aside>

        {/* 7-col prose column */}
        <article className="lg:col-span-7 lg:col-start-5">
          <RevealOnScroll variant="slideUp" duration={0.7}>
            <p className="text-xl leading-relaxed text-slate-700 sm:text-[1.35rem] sm:leading-[1.7]">
              <span
                aria-hidden="true"
                className="float-left mr-3 mt-2 font-display text-[5rem] font-normal italic leading-[0.85] text-brand-gold"
              >
                T
              </span>
              he Canadian rental market is fragmented. Listings are
              under-presented, pricing is guessed at instead of analyzed,
              vacancy turnaround drifts, and tenant screening swings between
              too lenient and too rigid. Brokers are wired to sell. Property
              managers are wired to operate the years that follow. Almost
              nobody is obsessing over the leasing phase itself - the eight
              to twenty-one days that decide whether the next twelve months
              go smoothly or go sideways.
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant="slideUp" duration={0.7}>
            <p className="mt-8 text-lg leading-[1.8] text-slate-600 sm:text-[1.15rem]">
              We built MoveSmart Rentals to be that specialist. A white-glove
              leasing brokerage with one job: deliver disciplined,
              well-documented, market-aware leasing execution for the people
              who actually own and operate rental inventory. That means
              individual landlords with one or two doors, property managers
              who outsource their lease-up, builders handing over fresh
              inventory, and institutional operators coordinating hundreds of
              units across multiple buildings.
            </p>
          </RevealOnScroll>

          {/* Pull-quote */}
          <RevealOnScroll variant="slideUp" duration={0.7}>
            <blockquote className="my-14 border-l-2 border-brand-gold pl-8">
              <p className="font-display text-3xl font-normal italic leading-[1.3] tracking-tight text-brand-gold sm:text-[2.25rem]">
                &ldquo;Brokers sell. Managers operate. We built MoveSmart to
                obsess over the leasing phase itself.&rdquo;
              </p>
            </blockquote>
          </RevealOnScroll>

          <RevealOnScroll variant="slideUp" duration={0.7}>
            <p className="text-lg leading-[1.8] text-slate-600 sm:text-[1.15rem]">
              Every campaign we run has the same anatomy: strategic pricing
              against live comparables, polished listing presentation,
              structured showings, disciplined applicant qualification,
              optional rental protection, and a complete move-in handover -
              utilities, insurance, key delivery, and a documented file the
              owner can audit. Owners do not need warmth alone. They need
              proof the work was done. That is what we deliver, and it is why
              serious operators keep handing us the next building.
            </p>
          </RevealOnScroll>
        </article>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent"
      />
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// Timeline - milestone rail (static)
// ────────────────────────────────────────────────────────────────
const MILESTONES: { date: string; title: string }[] = [
  { date: '2020', title: 'MoveSmart founded in Toronto' },
  { date: '2021', title: 'First 50 units leased across the GTA' },
  { date: '2022', title: 'Expanded leasing coverage to 5 Ontario cities' },
  { date: '2023', title: 'Owner reporting portal launched' },
  { date: '2024', title: '500+ units leased milestone' },
  { date: '2025', title: 'First institutional lease-up campaigns' },
]

export function Timeline() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                Chapter 02
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
              A short history of<br />
              <span className="font-display italic text-brand-emerald">getting here</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="relative">
            {/* Base rail */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[4.25rem] hidden h-px bg-brand-gold/50 md:block"
            />

            <ol className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-6 md:gap-y-0">
              {MILESTONES.map((m, i) => (
                <li key={m.title} className="flex flex-col items-start px-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-emerald">
                    {m.date}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative z-10 my-4 flex size-8 items-center justify-center rounded-full border-2 border-brand-gold bg-white font-display text-xs font-normal text-brand-navy shadow-sm"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-display text-lg font-normal leading-snug text-brand-navy">
                    {m.title}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// Values - 01 / 02 / 03 / 04 editorial statements
// Aligned to brand personality: Strategic, Disciplined, Concierge,
// Transparent, Performance-driven.
// ────────────────────────────────────────────────────────────────
const VALUES = [
  {
    title: 'Strategic before tactical',
    body:
      'Every campaign starts with live market analysis, comparable pricing, and a positioning plan for the listing. We do not post and pray. We price, present, and target the right tenant pool deliberately - because the first decision sets the next twelve months.',
  },
  {
    title: 'Disciplined tenant qualification',
    body:
      'Screening is the single biggest lever in a rental file, so we treat it like one. Income verification, employment confirmation, credit review, landlord references, and a documented decision trail on every applicant. Consistent standards, no shortcuts, no surprises.',
  },
  {
    title: 'Concierge coordination, end to end',
    body:
      'Showings, applications, lease execution, utility transfers, insurance setup, key handover, and the move-in walkthrough - handled by our team and documented for the owner. The owner should not have to chase any thread of the leasing phase.',
  },
  {
    title: 'Transparent, performance-driven reporting',
    body:
      'Owners and institutional partners receive structured updates on activity, applicants, pricing feedback, and time-to-lease. Outcomes are measurable. Files are auditable. Peace of mind comes from proof, not promises.',
  },
]

export function Values() {
  return (
    <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                Chapter 03
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
              What we<br />
              <span className="font-display italic text-brand-emerald">believe</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="space-y-14 lg:space-y-16">
          {VALUES.map((v, i) => (
            <RevealOnScroll key={v.title} variant="slideUp" duration={0.7}>
              <div className="grid grid-cols-1 gap-6 border-t border-brand-navy/10 pt-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <span className="font-display text-[4.5rem] font-normal leading-none text-brand-gold sm:text-[5.5rem]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
                    {v.title}
                    <span aria-hidden="true" className="text-brand-emerald">.</span>
                  </h3>
                  <p className="mt-4 max-w-3xl text-lg leading-[1.75] text-slate-600">
                    {v.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// Team - circle-initials editorial grid
// ────────────────────────────────────────────────────────────────
// NOTE: team roster placeholder - confirm names with leadership before launch.
// Roles reframed to match leasing brokerage positioning.
const TEAM: {
  initials: string
  name: string
  role: string
  credo?: string
  tone: 'gold' | 'emerald'
}[] = [
  { initials: 'JC', name: 'Jatin Chhabra', role: 'Founder & Principal Broker', credo: 'Owns the standard the team executes against.', tone: 'gold' },
  { initials: 'AR', name: 'Anika Rao', role: 'Head of Leasing Operations', credo: 'Runs the playbook, writes the playbook.', tone: 'emerald' },
  { initials: 'DM', name: 'Daniel Mercer', role: 'Institutional Lease-Up Lead', credo: 'Twelve-year veteran of GTA leasing.', tone: 'gold' },
  { initials: 'SP', name: 'Simran Patel', role: 'Tenant Qualification Analyst', credo: 'Screens like a bank, briefs like a partner.', tone: 'emerald' },
  { initials: 'KO', name: 'Kwame Owusu', role: 'Showings Manager', credo: 'Keeps every tour on time and on script.', tone: 'gold' },
  { initials: 'EL', name: 'Emily Larsson', role: 'Owner Success Manager', credo: 'Every owner has her cell number.', tone: 'emerald' },
  { initials: 'RT', name: 'Ravi Thakur', role: 'Pricing & Market Analyst', credo: 'Where guesswork ends and comparables start.', tone: 'gold' },
  { initials: 'MB', name: 'Mei Bennett', role: 'Move-In Coordinator', credo: 'Keys, utilities, insurance, walkthrough - all handled.', tone: 'emerald' },
]

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                Chapter 04
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
              The people behind<br />
              <span className="font-display italic text-brand-emerald">the campaigns</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              A small, RECO-licensed leasing team with twenty-plus years of
              combined rental brokerage experience across Ontario.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-brand-navy/10 pt-12 sm:grid-cols-3 lg:grid-cols-4">
            {TEAM.map((p) => (
              <div key={p.name} className="flex flex-col items-start">
                <span
                  aria-hidden="true"
                  className={
                    p.tone === 'gold'
                      ? 'flex size-20 items-center justify-center rounded-full bg-brand-gold/90 font-display text-2xl font-normal text-white'
                      : 'flex size-20 items-center justify-center rounded-full bg-brand-emerald font-display text-2xl font-normal text-white'
                  }
                >
                  {p.initials}
                </span>
                <p className="mt-5 font-display text-xl font-normal leading-tight text-brand-navy">
                  {p.name}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-emerald">{p.role}</p>
                {p.credo && (
                  <p className="mt-2 text-sm italic leading-relaxed text-slate-500">
                    {p.credo}
                  </p>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// By the numbers - editorial strip with pipe dividers
// Reframed to leasing-execution metrics.
// ────────────────────────────────────────────────────────────────
const BY_NUMBERS: { value: number; suffix: string; label: string }[] = [
  { value: 500, suffix: '+', label: 'Units leased' },
  { value: 14, suffix: '', label: 'Avg days to placement' },
  { value: 20, suffix: '+', label: 'Cities served' },
  { value: 94, suffix: '%', label: 'Applicant approval accuracy' },
]

export function ByTheNumbers() {
  return (
    <section className="bg-brand-navy py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Leasing performance, by the numbers
          </p>
        </RevealOnScroll>

        <dl className="grid grid-cols-2 items-center gap-y-10 md:grid-cols-4 md:gap-y-0">
          {BY_NUMBERS.map((n, i) => (
            <div
              key={n.label}
              className={
                i > 0
                  ? 'text-center md:border-l md:border-white/15'
                  : 'text-center'
              }
            >
              <dt className="sr-only">{n.label}</dt>
              <dd className="font-display text-5xl font-normal leading-none text-white sm:text-6xl">
                <CountUp value={n.value} suffix={n.suffix} />
              </dd>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {n.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// Press & recognition - single horizontal editorial line
// ────────────────────────────────────────────────────────────────
// NOTE: press mentions placeholder - replace with verified logos before launch.
const PRESS = ['Toronto Star', 'Globe and Mail', 'REP Magazine', 'FRPO', 'CBC Radio']

export function Press() {
  return (
    <section className="bg-[#FBFAF6] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <RevealOnScroll variant="fade" duration={0.7}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/50">
            As seen in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {PRESS.map((name, i) => (
              <span key={name} className="flex items-center gap-x-2 sm:gap-x-4">
                <span className="font-display text-xl italic text-brand-navy sm:text-2xl">
                  {name}
                </span>
                {i < PRESS.length - 1 && (
                  <span aria-hidden="true" className="text-lg text-brand-gold sm:text-xl">
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

// ────────────────────────────────────────────────────────────────
// Long-form testimonials - two pull quotes about TEAM & EXECUTION
// ────────────────────────────────────────────────────────────────
const LONG_TESTIMONIALS = [
  {
    quote:
      'What surprised me was not the speed - it was the discipline. Every applicant came with a documented file: income, references, credit, the reasoning behind the recommendation. I had never seen a leasing team operate with that level of structure. Three buildings later, that is still the difference.',
    name: 'James K.',
    role: '12-unit portfolio owner, Hamilton',
  },
  {
    quote:
      'I interviewed four firms before choosing MoveSmart. The others pitched their listings reach. This team walked me through pricing logic, qualification standards, and how the move-in handover would be documented. The leasing phase finally felt like it was being handled, not improvised.',
    name: 'Priya M.',
    role: 'Owner, Mississauga',
  },
]

export function LongTestimonials() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                In their words
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
              Owners on the<br />
              <span className="font-display italic text-brand-emerald">execution</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {LONG_TESTIMONIALS.map((t) => (
            <RevealOnScroll key={t.name} variant="slideUp" duration={0.7}>
              <figure className="border-l-2 border-brand-gold pl-8">
                <blockquote className="font-display text-2xl font-normal italic leading-[1.4] text-brand-navy sm:text-[1.75rem]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-slate-500">
                  <span className="font-semibold text-brand-navy">{t.name}</span>
                  <span aria-hidden="true" className="mx-2 text-brand-gold">·</span>
                  {t.role}
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
