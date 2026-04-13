'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  CalendarCheck,
  Camera,
  Check,
  ClipboardList,
  Eye,
  FileSignature,
  Flame,
  Hammer,
  HomeIcon,
  KeyRound,
  Megaphone,
  Plane,
  Receipt,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

/* ── Icon-bearing data arrays (kept on the client to avoid serializing
      component references across the server/client boundary) ──────────── */

const PLAYBOOK_PHASES: PlaybookPhase[] = [
  {
    day: 'Day 1',
    title: 'Owner onboarding',
    description:
      'Discovery call, property walkthrough, document intake (deed, condo rules, insurance) and management agreement signed.',
    icon: ClipboardList,
  },
  {
    day: 'Day 2 - 3',
    title: 'Property prep & make-ready',
    description:
      'Punch-list of repairs, deep clean, smoke-alarm and CO check, paint touch-ups, and any staging the unit needs to show its best.',
    icon: Sparkles,
  },
  {
    day: 'Day 4',
    title: 'Photography & listing copy',
    description:
      'Wide-angle photography, twilight shots where suitable, floorplan, and rental copy written for both keyword and renter appeal.',
    icon: Camera,
  },
  {
    day: 'Day 5',
    title: 'MLS & portal syndication',
    description:
      'Live on Realtor.ca, MLS, Kijiji, Zumper, PadMapper, Facebook Marketplace, and our own owner network within hours of approval.',
    icon: Megaphone,
  },
  {
    day: 'Day 6 - 12',
    title: 'Showings & enquiry triage',
    description:
      'Instant inquiry replies, pre-screen questions, and in-person or video showings booked in 30-minute windows.',
    icon: Eye,
  },
  {
    day: 'Day 8 - 13',
    title: 'Application & screening',
    description:
      'Equifax credit, employment letters, landlord references, and ID verification - all summarised into a single decision-ready report.',
    icon: ShieldCheck,
  },
  {
    day: 'Day 13 - 14',
    title: 'Lease execution',
    description:
      'OREA-standard or province-specific lease drafted, riders attached, deposits collected, and signed via secure e-signature.',
    icon: FileSignature,
  },
  {
    day: 'Day 15',
    title: 'Move-in & handover',
    description:
      'Photo-documented move-in inspection, key handover, utility transfer reminders, and welcome packet delivered to the tenant.',
    icon: KeyRound,
  },
]

const VENDOR_CATEGORIES: VendorEntry[] = [
  { icon: Camera, name: 'Real-estate photographers', count: '24 across 20+ cities' },
  { icon: KeyRound, name: 'Bonded locksmiths', count: '36 on 24-hr rotation' },
  { icon: ShieldCheck, name: 'Landlord insurance brokers', count: '6 preferred carriers' },
  { icon: Sparkles, name: 'Make-ready cleaning crews', count: '42 vetted teams' },
  { icon: Hammer, name: 'Licensed contractors & trades', count: '120+ in trade book' },
  { icon: Scale, name: 'Paralegals & RTA counsel', count: '11 LTB specialists' },
]

const COMPLIANCE_OBLIGATIONS: ComplianceEntry[] = [
  {
    icon: ScrollText,
    obligation: 'LTB notices (N4, N5, N12, N13)',
    handling:
      'Drafted, served, and tracked through the Landlord and Tenant Board hearing calendar - with paralegal representation when escalated.',
  },
  {
    icon: Wallet,
    obligation: 'Last-month deposit handling',
    handling:
      'Held in a designated trust account, interest credited annually per RTA s.106, and reconciled at lease end.',
  },
  {
    icon: Receipt,
    obligation: 'T776 statements & HST treatment',
    handling:
      'Owner statements packaged for your accountant each January, with capital vs. operating splits clearly delineated.',
  },
  {
    icon: Building2,
    obligation: 'Condo board liaison',
    handling:
      'We become your registered occupant contact - fielding parking, move-in elevator bookings, and rule-violation letters.',
  },
  {
    icon: Flame,
    obligation: 'Fire & life-safety compliance',
    handling:
      'Annual smoke-alarm and CO-detector logs kept on file; municipal inspections scheduled and attended on your behalf.',
  },
  {
    icon: Scale,
    obligation: 'AGI applications & rent guidelines',
    handling:
      'Annual provincial rent-increase notices issued on time; Above-Guideline Increase applications prepared where capital work qualifies.',
  },
]

const ADD_ONS: AddOnEntry[] = [
  {
    icon: Sparkles,
    name: 'Deep clean & turnover',
    description: 'Top-to-bottom turnover clean between tenancies, including grout, blinds, and appliance interiors.',
  },
  {
    icon: HomeIcon,
    name: 'Professional staging',
    description: 'Light staging package for vacant units to lift photo quality and reduce days on market.',
  },
  {
    icon: Camera,
    name: '3D virtual tours',
    description: 'Matterport walkthroughs that pre-qualify renters and cut showing volume in half.',
  },
  {
    icon: CalendarCheck,
    name: 'Mid-lease inspections',
    description: 'Quarterly photo-documented inspections with a written condition report sent to ownership.',
  },
  {
    icon: Scale,
    name: 'Eviction support',
    description: 'End-to-end LTB representation including filings, hearings, and Sheriff coordination.',
  },
  {
    icon: Plane,
    name: 'Owner-travel coverage',
    description: 'Extended after-hours coverage for owners abroad - local emergency contact and signing authority.',
  },
]

/* ── Types ─────────────────────────────────────────────────────────── */

export type SectionEntry = { id: string; label: string; hint: string }

export type TierRow = { feature: string; essential: boolean; full: boolean }

export type PlaybookPhase = {
  day: string
  title: string
  description: string
  icon: LucideIcon
}

export type VendorEntry = {
  icon: LucideIcon
  name: string
  count: string
}

export type ComplianceEntry = {
  icon: LucideIcon
  obligation: string
  handling: string
}

export type AddOnEntry = {
  icon: LucideIcon
  name: string
  description: string
}

interface ServicesLongformProps {
  sectionIndex: SectionEntry[]
  tierRows: TierRow[]
}

/* ── Sticky scroll-spy sidebar ─────────────────────────────────────── */

function ScrollSpySidebar({ sections }: { sections: SectionEntry[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    headings.forEach((el) => obs.observe(el))
    observers.push(obs)
    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  return (
    <aside
      aria-label="On this page"
      className="hidden lg:block lg:sticky lg:top-28 lg:self-start"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
        On this page
      </p>
      <h2 className="mt-2 font-display text-2xl font-normal text-brand-navy">
        The playbook
        <span aria-hidden="true" className="text-brand-gold">.</span>
      </h2>
      <ol className="mt-6 space-y-1">
        {sections.map((s, i) => {
          const isActive = activeId === s.id
          return (
            <li key={s.id} className="relative">
              <a
                href={`#${s.id}`}
                className="group relative flex items-baseline gap-3 py-2 pl-4 pr-2 text-sm transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="services-spy-underline"
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-brand-gold"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span
                  className={`font-mono text-[10px] font-semibold tracking-wider ${
                    isActive ? 'text-brand-gold' : 'text-brand-navy/35'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex flex-col">
                  <span
                    className={`font-medium transition-colors ${
                      isActive
                        ? 'text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4'
                        : 'text-brand-navy/55 group-hover:text-brand-navy'
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[11px] text-slate-400">{s.hint}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>

      <div
        aria-hidden="true"
        className="mt-8 h-px w-full bg-gradient-to-r from-brand-navy/15 via-brand-navy/5 to-transparent"
      />
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Long-form service overview. Read end to end, or jump to the chapter you need.
      </p>
    </aside>
  )
}

/* ── Mobile anchor strip (replaces sidebar) ────────────────────────── */

function MobileAnchorStrip({ sections }: { sections: SectionEntry[] }) {
  return (
    <nav
      aria-label="Page sections"
      className="lg:hidden -mx-4 mt-2 mb-10 overflow-x-auto px-4"
    >
      <ul className="flex w-max gap-2">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-navy/15 bg-white px-3 py-1.5 text-xs font-medium text-brand-navy/80 transition-colors hover:border-brand-emerald/40 hover:text-brand-emerald"
            >
              <span className="font-mono text-[10px] text-brand-navy/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ── Tiers comparison table ────────────────────────────────────────── */

function TierTable({ rows }: { rows: TierRow[] }) {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-brand-navy/10">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-navy/10">
            <th
              scope="col"
              className="px-5 py-5 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-brand-navy/55"
            >
              What&apos;s included
            </th>
            <th
              scope="col"
              className="border-l border-brand-navy/10 px-5 py-5 text-left"
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">
                Tier 01
              </span>
              <span className="mt-1 block font-display text-base font-normal text-brand-navy">
                Essential Leasing
              </span>
              <span className="mt-1 block text-[11px] text-slate-500">
                Hands-on owners
              </span>
            </th>
            <th
              scope="col"
              className="relative border-l border-brand-navy/10 bg-brand-navy px-5 py-5 text-left"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
              />
              <span className="inline-flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Tier 02
                </span>
                <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-gold">
                  Most chosen
                </span>
              </span>
              <span className="mt-1 block font-display text-base font-normal text-white">
                Full-Service Management
              </span>
              <span className="mt-1 block text-[11px] text-white/55">
                Investor owners
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.feature}
              className={`border-b border-brand-navy/5 last:border-b-0 ${
                i % 2 === 0 ? 'bg-white' : 'bg-[#FBFAF6]'
              }`}
            >
              <th
                scope="row"
                className="px-5 py-4 text-left font-medium text-brand-navy/85"
              >
                {row.feature}
              </th>
              <td className="border-l border-brand-navy/5 px-5 py-4">
                {row.essential ? (
                  <Check
                    aria-label="Included"
                    className="size-4 text-brand-emerald"
                  />
                ) : (
                  <X aria-label="Not included" className="size-4 text-slate-300" />
                )}
              </td>
              <td className="border-l border-brand-navy/5 bg-brand-navy/95 px-5 py-4">
                {row.full ? (
                  <Check
                    aria-label="Included"
                    className="size-4 text-brand-emerald"
                  />
                ) : (
                  <X aria-label="Not included" className="size-4 text-white/30" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Horizontal snap rail (8-phase playbook) ───────────────────────── */

function PhaseRail({ phases }: { phases: PlaybookPhase[] }) {
  const railRef = useRef<HTMLOListElement | null>(null)
  const inView = useInView(railRef, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || reduceMotion) return
    const el = railRef.current
    if (!el) return
    const target = el.scrollWidth * 0.1
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.scrollLeft = v
      },
    })
    const reset = window.setTimeout(() => {
      animate(el.scrollLeft, 0, {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          el.scrollLeft = v
        },
      })
    }, 1400)
    return () => {
      controls.stop()
      window.clearTimeout(reset)
    }
  }, [inView, reduceMotion])

  return (
    <div className="relative mt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent"
      />
      <ol
        ref={railRef}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 [scrollbar-width:thin]"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {phases.map((phase, i) => {
          const Icon = phase.icon
          return (
            <li
              key={phase.title}
              className="relative flex w-[85%] shrink-0 snap-start flex-col border-l border-brand-navy/15 pl-6 sm:w-[60%] lg:w-[55%]"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-brand-gold ring-4 ring-white"
              />
              <span className="font-mono text-[10px] font-semibold tracking-wider text-brand-navy/40">
                PHASE {String(i + 1).padStart(2, '0')} · {phase.day}
              </span>
              <div className="mt-4 inline-flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-brand-emerald">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-normal leading-tight text-brand-navy">
                {phase.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">
                {phase.description}
              </p>
            </li>
          )
        })}
        {/* Trailing spacer so last item can snap-start nicely */}
        <li aria-hidden="true" className="w-1 shrink-0" />
      </ol>

      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-brand-navy/40">
        Swipe or scroll horizontally · 8 phases
      </p>
    </div>
  )
}

/* ── Vendor strip (marquee) ────────────────────────────────────────── */

function VendorStrip({ vendors }: { vendors: VendorEntry[] }) {
  const reduceMotion = useReducedMotion()
  const items = [...vendors, ...vendors]
  return (
    <div className="relative mt-8 overflow-hidden border-y border-brand-navy/10 py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#FBFAF6] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#FBFAF6] to-transparent"
      />
      <motion.div
        className="flex w-max gap-10"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 36, ease: 'linear', repeat: Infinity }
        }
      >
        {items.map((v, i) => {
          const Icon = v.icon
          return (
            <div
              key={`${v.name}-${i}`}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap"
            >
              <Icon className="size-4 text-brand-navy/60" aria-hidden="true" />
              <span className="text-sm font-semibold text-brand-navy">
                {v.name}
              </span>
              <span className="text-xs text-slate-500">· {v.count}</span>
              <span
                aria-hidden="true"
                className="ml-6 inline-block h-1 w-1 rounded-full bg-brand-gold"
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ── Main long-form layout ─────────────────────────────────────────── */

export function ServicesLongform({
  sectionIndex,
  tierRows,
  catalogue,
}: ServicesLongformProps & { catalogue: React.ReactNode }) {
  const phases = PLAYBOOK_PHASES
  const vendors = VENDOR_CATEGORIES
  const compliance = COMPLIANCE_OBLIGATIONS
  const addOns = ADD_ONS
  return (
    <div className="bg-[#FBFAF6]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-12 lg:gap-x-16">
          {/* ── Sticky sidebar (lg+) ── */}
          <div className="lg:col-span-4 xl:col-span-4">
            <ScrollSpySidebar sections={sectionIndex} />
          </div>

          {/* ── Long-form right column ── */}
          <div className="lg:col-span-8 xl:col-span-8">
            <MobileAnchorStrip sections={sectionIndex} />

            {/* 1 - Service catalogue */}
            <section
              id="service-catalogue"
              className="scroll-mt-28 first:mt-0 mt-0"
            >
              <RevealOnScroll variant="clipReveal">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Chapter 01 · The catalogue
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                  Eight core services. One{' '}
                  <span className="font-display italic text-brand-emerald">
                    accountable
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>{' '}
                  team.
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="fade" stagger={0.05} delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                  Each service is a discipline owned by a specialist on our
                  staff - not a vendor we forward your call to. Pick what you
                  need, or stack them into a single management agreement.
                </p>
              </RevealOnScroll>
              <div className="mt-10">{catalogue}</div>
            </section>

            <SectionDivider />

            {/* 2 - Tiers */}
            <section id="tiers" className="scroll-mt-28">
              <RevealOnScroll variant="clipReveal">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Chapter 02 · Two tiers
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                  Choose the depth of{' '}
                  <span className="font-display italic text-brand-emerald">
                    cover
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="fade" stagger={0.05} delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                  Both tiers include the leasing playbook end-to-end.
                  Full-Service adds the post-move-in operating layer most
                  owners would rather not run themselves.
                </p>
              </RevealOnScroll>
              <TierTable rows={tierRows} />
            </section>

            <SectionDivider />

            {/* 3 - Playbook */}
            <section id="playbook" className="scroll-mt-28">
              <RevealOnScroll variant="clipReveal">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Chapter 03 · The leasing playbook
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                  From signed agreement to keys handed{' '}
                  <span className="font-display italic text-brand-emerald">
                    over
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="fade" stagger={0.05} delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                  Eight named phases, each with a typical day-marker and a
                  specialist responsible. Average end-to-end run time is 14
                  days from go-live to keys.
                </p>
              </RevealOnScroll>
              <PhaseRail phases={phases} />
            </section>

            <SectionDivider />

            {/* 4 - Vendor network */}
            <section id="vendor-network" className="scroll-mt-28">
              <RevealOnScroll variant="clipReveal">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Chapter 04 · Vendor & partner network
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                  A trade book{' '}
                  <span className="font-display italic text-brand-emerald">
                    200
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    +
                  </span>{' '}
                  deep.
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="fade" stagger={0.05} delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                  Every category below is filled by background-checked,
                  insured, and rate-card-locked partners we work with weekly.
                  Most owners save more on vendor pricing than they spend on
                  management.
                </p>
              </RevealOnScroll>

              <VendorStrip vendors={vendors} />

              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-brand-navy/10 pt-6 sm:grid-cols-4">
                {[
                  { k: 'Avg. dispatch time', v: '37 min' },
                  { k: 'After-hours coverage', v: '24 / 7 / 365' },
                  { k: 'Insurance carried', v: '$2M min' },
                  { k: 'Owner mark-up', v: '0%' },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {s.k}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-normal text-brand-navy">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <SectionDivider />

            {/* 5 - Compliance */}
            <section id="compliance" className="scroll-mt-28">
              <RevealOnScroll variant="clipReveal">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Chapter 05 · Canadian compliance
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                  Built for the obligations owners{' '}
                  <span className="font-display italic text-brand-emerald">
                    often miss
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="fade" stagger={0.05} delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                  Property management in Canada is a regulated practice - the
                  RTA, LTB, condo bylaws, and CRA all want something from you.
                  Here is what we keep on file, on time, and audit-ready.
                </p>
              </RevealOnScroll>

              <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-[minmax(0,9rem)_1fr]">
                {compliance.map((c) => (
                  <ComplianceRow key={c.obligation} entry={c} />
                ))}
              </dl>

              <p className="mt-10 max-w-3xl text-xs leading-relaxed text-slate-500">
                Provincial scope: Ontario (RTA / LTB), British Columbia (RTB),
                Alberta (RTDRS), Quebec (TAL), and the Atlantic provinces.
                Forms and timelines vary - your dedicated manager applies the
                correct jurisdiction.
              </p>
            </section>

            <SectionDivider />

            {/* 6 - Add-ons */}
            <section id="add-ons" className="scroll-mt-28">
              <RevealOnScroll variant="clipReveal">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Chapter 06 · Optional add-ons
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                  Bolt on what you{' '}
                  <span className="font-display italic text-brand-emerald">
                    need
                  </span>
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="fade" stagger={0.05} delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                  Single-fee enhancements you can add at any point in your
                  tenancy - no tier change required.
                </p>
              </RevealOnScroll>

              <ul className="mt-8 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
                {addOns.map((a) => {
                  const Icon = a.icon
                  return (
                    <li
                      key={a.name}
                      className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-5 sm:grid-cols-[auto_minmax(0,16rem)_1fr] sm:items-baseline"
                    >
                      <Icon
                        className="size-4 self-center text-brand-emerald sm:self-auto sm:translate-y-[3px]"
                        aria-hidden="true"
                      />
                      <span className="font-display text-lg font-normal text-brand-navy">
                        {a.name}
                      </span>
                      <span className="col-span-2 text-sm leading-relaxed text-slate-600 sm:col-span-1">
                        {a.description}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-16 flex items-center gap-4 lg:my-20"
    >
      <span className="h-px flex-1 bg-brand-navy/10" />
      <span className="size-1.5 rounded-full bg-brand-gold" />
      <span className="h-px flex-1 bg-brand-navy/10" />
    </div>
  )
}

function ComplianceRow({ entry }: { entry: ComplianceEntry }) {
  return (
    <>
      <dt className="font-display text-base font-semibold text-brand-navy">
        {entry.obligation}
      </dt>
      <dd className="font-serif text-[15px] italic leading-relaxed text-slate-600 sm:not-italic sm:font-sans sm:text-sm">
        {entry.handling}
      </dd>
    </>
  )
}
