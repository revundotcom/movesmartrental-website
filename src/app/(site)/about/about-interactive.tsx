'use client'

import { Target, ShieldCheck, Workflow, BarChart3 } from 'lucide-react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { TeamCard } from '@/components/team/team-card'
import { TEAM } from '@/data/team'

// ────────────────────────────────────────────────────────────────
// Our story. Restructured: featured quote (left) + tight prose (right).
// Tight, modern, two-column layout. No side rail, no drop cap, no
// stacked pull-quote breaking the flow.
// ────────────────────────────────────────────────────────────────
export function FounderEssay() {
  return (
    <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="mb-14 max-w-3xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                Our story
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.25rem]">
              Why MoveSmart{' '}
              <span className="font-display italic text-brand-emerald">
                exists
              </span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              A short note on the gap we set out to close in the rental
              market across Canada and the United States.
            </p>
          </div>
        </RevealOnScroll>

        {/* Two-column: quote card (left) + narrative (right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: Featured quote card */}
          <RevealOnScroll
            variant="slideUp"
            duration={0.7}
            className="lg:col-span-5"
          >
            <figure className="relative h-full rounded-sm border border-brand-navy/10 bg-white p-8 shadow-[0_1px_2px_rgba(11,29,58,0.04),0_28px_60px_-30px_rgba(11,29,58,0.18)] sm:p-10">
              <span
                aria-hidden="true"
                className="absolute -top-4 left-8 font-display text-[5.5rem] leading-none text-brand-gold/85"
              >
                &ldquo;
              </span>
              <blockquote className="relative pt-6">
                <p className="font-display text-[1.6rem] font-normal italic leading-[1.3] tracking-tight text-brand-navy sm:text-[1.85rem]">
                  Brokers sell. Managers operate. We built MoveSmart to obsess
                  over the leasing phase itself.
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-brand-navy/10 pt-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-brand-gold/90 font-display text-sm text-white"
                >
                  MS
                </span>
                <div>
                  <p className="font-display text-base font-normal text-brand-navy">
                    MoveSmart Rentals
                  </p>
                  <p className="text-xs text-slate-500">
                    Why we built it
                  </p>
                </div>
              </figcaption>
            </figure>
          </RevealOnScroll>

          {/* RIGHT: 3 tight paragraphs */}
          <RevealOnScroll
            variant="slideUp"
            duration={0.7}
            className="lg:col-span-7"
          >
            <div className="space-y-6 text-lg leading-[1.8] text-slate-700">
              <p>
                The rental market across Canada and the United States is
                busy and fragmented. Brokers are wired to sell. Property
                managers are wired to operate the years after a tenant
                moves in. Almost nobody is purpose-built for the leasing
                phase itself: the short window between vacancy and move-in
                that quietly decides how the next twelve months will go.
              </p>
              <p>
                We built MoveSmart Rentals for that window. Strategic
                pricing against live comparables. Polished listing
                presentation. Structured showings and disciplined
                applicant qualification. A complete move-in handover that
                covers utilities, insurance, key delivery, and a
                documented file the owner can audit.
              </p>
              <p className="font-display text-xl font-normal italic text-brand-emerald">
                Owners do not need warmth alone. They need proof the work
                was done.
              </p>
            </div>
          </RevealOnScroll>
        </div>
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
  { date: '2022', title: 'Expanded leasing coverage to 5 Canadian cities' },
  { date: '2023', title: 'Owner reporting portal launched' },
  { date: '2024', title: 'Cross-border expansion into US markets' },
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
// Aligned to brand personality: Strategic, Disciplined, Coordinated,
// Transparent, Performance-driven.
// ────────────────────────────────────────────────────────────────
const VALUES: {
  title: string
  body: string
  icon: typeof Target
}[] = [
  {
    title: 'Strategic before tactical',
    body:
      'Every campaign starts with live market analysis, comparable pricing, and a positioning plan. We price, present, and target the right tenant pool deliberately.',
    icon: Target,
  },
  {
    title: 'Disciplined tenant qualification',
    body:
      'Income verification, employment confirmation, credit review, landlord references, and a documented decision trail on every applicant. No shortcuts.',
    icon: ShieldCheck,
  },
  {
    title: 'Coordinated execution, end to end',
    body:
      'Showings, applications, lease execution, utility transfers, insurance, key handover, and the move-in walkthrough. All handled. All documented.',
    icon: Workflow,
  },
  {
    title: 'Transparent reporting',
    body:
      'Owners get structured updates on activity, applicants, pricing feedback, and time-to-lease. Outcomes are measurable. Files are auditable.',
    icon: BarChart3,
  },
]

export function Values() {
  return (
    <section className="relative bg-white py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="mb-14 max-w-3xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                Our principles
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.25rem]">
              What we{' '}
              <span className="font-display italic text-brand-emerald">
                believe
              </span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Four standards we hold every owner-file to. They are how we
              decide what to do, what not to do, and what to send the owner
              at the end of every engagement.
            </p>
          </div>
        </RevealOnScroll>

        {/* 4-card grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <RevealOnScroll
                key={v.title}
                variant="slideUp"
                duration={0.7}
                delay={i * 0.05}
              >
                <article className="group relative flex h-full flex-col rounded-sm border border-brand-navy/10 bg-white p-7 shadow-[0_1px_2px_rgba(11,29,58,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-navy/20 hover:shadow-[0_18px_40px_-22px_rgba(11,29,58,0.22)]">
                  {/* Top row: icon + number badge */}
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex size-12 items-center justify-center rounded-sm bg-emerald-50 ring-1 ring-emerald-100"
                    >
                      <Icon
                        className="size-6 text-brand-emerald"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-2xl font-normal text-brand-gold/80"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 font-display text-[1.4rem] font-normal leading-snug tracking-tight text-brand-navy">
                    {v.title}
                    <span
                      aria-hidden="true"
                      className="text-brand-emerald"
                    >
                      .
                    </span>
                  </h3>

                  {/* Body */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {v.body}
                  </p>

                  {/* Bottom divider accent */}
                  <div
                    aria-hidden="true"
                    className="mt-6 h-px w-12 bg-brand-gold/60 transition-all duration-300 group-hover:w-20"
                  />
                </article>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// Team. Full directory rendered directly on the About page.
// ────────────────────────────────────────────────────────────────
// Pulls every member from src/data/team.ts and renders them as a
// Fasken-style 3-column grid. To add or remove a person, edit team.ts.
// No code change needed here.
export function Team() {
  return (
    <section id="team" className="scroll-mt-24 bg-[#FBFAF6] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="mb-12 max-w-3xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-navy/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                Our team
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.25rem]">
              Meet Our Leadership{' '}
              <span className="font-display italic text-brand-emerald">
                Team
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Meet the team leading MoveSmart Rentals&rsquo; leasing,
              operations, and client support with a focus on transparency,
              efficiency, and a better rental experience.
            </p>
          </div>
        </RevealOnScroll>

        {/* The grid. Flat, 3 columns on desktop, just like Fasken. */}
        <RevealOnScroll variant="slideUp" duration={0.7}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </RevealOnScroll>
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
