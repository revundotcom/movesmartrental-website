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
                A note from the team on the problem we came here to solve.
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
                P
              </span>
              roperty management, as most owners have experienced it, is a game of opaque
              invoices, slow phone calls, and promises that evaporate the moment a pipe
              bursts at midnight. We started MoveSmart Rentals because we had been on the
              other side of that phone call - as owners ourselves - and we knew the industry
              could do so much better.
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant="slideUp" duration={0.7}>
            <p className="mt-8 text-lg leading-[1.8] text-slate-600 sm:text-[1.15rem]">
              Our founding idea was plain: treat every door like it was our own. That meant
              real people answering real questions, a pricing model that only earned when
              owners earned, and a technology layer that quietly did the work instead of
              shouting about itself. No upsells, no small print, no surprise deductions on
              the monthly statement.
            </p>
          </RevealOnScroll>

          {/* Pull-quote */}
          <RevealOnScroll variant="slideUp" duration={0.7}>
            <blockquote className="my-14 border-l-2 border-brand-gold pl-8">
              <p className="font-display text-3xl font-normal italic leading-[1.3] tracking-tight text-brand-gold sm:text-[2.25rem]">
                &ldquo;We wanted to build the property manager we wished we had
                hired ourselves.&rdquo;
              </p>
            </blockquote>
          </RevealOnScroll>

          <RevealOnScroll variant="slideUp" duration={0.7}>
            <p className="text-lg leading-[1.8] text-slate-600 sm:text-[1.15rem]">
              Six years later, that principle still runs the company. It shapes who we
              hire, how we price, and why we still answer the phone on a Sunday afternoon.
              Owners stay with us because the spreadsheet works - occupancy stays high,
              placements stay fast, maintenance stays honest. But they refer us because the
              service feels unreasonably personal for an industry this size.
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
  { date: '2021', title: 'First 50 doors under management' },
  { date: '2022', title: 'Expanded to 5 Ontario cities' },
  { date: '2023', title: 'Owner portal launched' },
  { date: '2024', title: '500 doors milestone' },
  { date: '2025', title: 'Entered US market' },
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
// Values - 01 / 02 / 03 editorial statements
// ────────────────────────────────────────────────────────────────
const VALUES = [
  {
    title: 'Treat every door like our own',
    body:
      'We do not distinguish between a single condo and a twelve-unit portfolio. The same standard of care, the same named account manager, the same urgency on a Sunday evening.',
  },
  {
    title: 'Earn on outcomes, never on friction',
    body:
      'Our fees are tied to performance - rented units, renewed leases, protected rent. If we do not deliver, we do not invoice. It is the only model we believe in.',
  },
  {
    title: 'Be the boring kind of excellent',
    body:
      'Reliability beats novelty. We would rather return every call within two hours for a decade than ship a flashy feature once. Owners stay with operators who stay consistent.',
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
const TEAM: {
  initials: string
  name: string
  role: string
  credo?: string
  tone: 'gold' | 'emerald'
}[] = [
  { initials: 'JC', name: 'Jatin Chhabra', role: 'Founder & Principal Broker', credo: 'Answers the phone on Sundays.', tone: 'gold' },
  { initials: 'AR', name: 'Anika Rao', role: 'Head of Operations', credo: 'Runs the playbook, writes the playbook.', tone: 'emerald' },
  { initials: 'DM', name: 'Daniel Mercer', role: 'Lead Property Manager', credo: 'Twelve-year veteran of GTA leasing.', tone: 'gold' },
  { initials: 'SP', name: 'Simran Patel', role: 'Tenant Placement Lead', credo: 'Screens like a bank, warms like a neighbour.', tone: 'emerald' },
  { initials: 'KO', name: 'Kwame Owusu', role: 'Maintenance Coordinator', credo: 'Keeps 40 trades on speed-dial.', tone: 'gold' },
  { initials: 'EL', name: 'Emily Larsson', role: 'Owner Success Manager', credo: 'Every owner has her cell number.', tone: 'emerald' },
  { initials: 'RT', name: 'Ravi Thakur', role: 'Portfolio Analyst', credo: 'Where the monthly statement gets honest.', tone: 'gold' },
  { initials: 'MB', name: 'Mei Bennett', role: 'Client Onboarding', credo: 'Makes week-one feel like year-ten.', tone: 'emerald' },
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
              <span className="font-display italic text-brand-emerald">the portfolio</span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              A small, RECO-licensed team with twenty-plus years of combined property
              management experience across Ontario.
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
// ────────────────────────────────────────────────────────────────
const BY_NUMBERS: { value: number; suffix: string; label: string }[] = [
  { value: 8, suffix: '', label: 'Years in market' },
  { value: 24, suffix: '', label: 'Team members' },
  { value: 20, suffix: '+', label: 'Cities' },
  { value: 3200, suffix: '', label: 'Inspections / year' },
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
            By the numbers
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
// NOTE: press mentions placeholder - verify with PR before launch.
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
// Long-form testimonials - two pull quotes about TEAM & VALUES
// ────────────────────────────────────────────────────────────────
const LONG_TESTIMONIALS = [
  {
    quote:
      'What surprised me was not the occupancy rate - it was that after three years, my account manager still knows every tenant by name and every quirk in the building. You do not get that from a big franchise. You get it from a team that decided early on what kind of company they wanted to be.',
    name: 'James K.',
    role: '12-unit portfolio owner, Hamilton',
  },
  {
    quote:
      'I interviewed four property managers before choosing MoveSmart. The others talked about their software. This team talked about my tenants, my building, and how they would protect both. Four years later that is still the difference.',
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
              <span className="font-display italic text-brand-emerald">team</span>
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
