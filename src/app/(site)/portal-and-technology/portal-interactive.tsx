'use client'

import { useRef } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileSignature,
  KeyRound,
  Lock,
  MapPin,
  Megaphone,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'

import { PortalIllustration } from '@/components/illustrations'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { Typewriter } from '@/components/ui/typewriter'

const EASE = [0.22, 1, 0.36, 1] as const

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION - Philosophy: 01 / 02 / 03 numbered editorial paragraphs            */
/* ─────────────────────────────────────────────────────────────────────────── */

const PILLARS = [
  {
    title: 'Real people first. Software second.',
    body: "A human leasing manager owns your lease-up. The portal is a window - not a replacement. You always have a name and a phone number. The dashboard exists so you don't have to call us; it doesn't exist because we don't want you to.",
  },
  {
    title: 'Built for the questions owners actually ask during a lease-up.',
    body: "“How did the Saturday showings go?” “Where is the Khan application in screening?” “Did the lease come back signed?” The portal answers those without a learning curve. We didn't design it for a software demo - we designed it for a Tuesday morning over coffee while your unit is on the market.",
  },
  {
    title: 'Transparency is the differentiator.',
    body: "Most brokerages go dark the moment your listing goes live and resurface only to announce a signed lease. We do the opposite. Every showing, every applicant, every screening check, every approval decision is on record - in your portal, exportable, and yours forever.",
  },
] as const

export function PhilosophyManifesto() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4">
        <RevealOnScroll variant="splitReveal" duration={0.9}>
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              Our Philosophy
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
              Why we built our own{' '}
              <span className="font-display italic text-brand-emerald">
                portal
              </span>
              <span className="text-brand-gold">.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              We&rsquo;re a white-glove leasing brokerage - not a software
              company. The portal exists for one reason: so you never have to
              chase us to find out where your lease-up stands. Three principles
              guided every decision.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-16 space-y-14">
          {PILLARS.map((p, i) => (
            <RevealOnScroll
              key={p.title}
              variant="blur"
              duration={0.75}
              delay={0.05}
            >
              <article className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-2">
                  <p
                    className="font-display text-5xl font-normal leading-none tracking-tight text-brand-gold sm:text-6xl"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-display text-2xl font-normal leading-snug text-brand-navy sm:text-[1.75rem]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                    {p.body}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION - Sticky product tour with scroll-linked dashboard annotations      */
/* ─────────────────────────────────────────────────────────────────────────── */

const TOUR_ANNOTATIONS = [
  {
    n: 1,
    title: 'Your listings at a glance',
    body: 'Every unit we have on the market for you - status, days live, view counts, inquiries received. The top stat row gives you the entire lease-up portfolio in three numbers.',
    // Stats row band
    highlight: { left: '27.5%', top: '20%', width: '63%', height: '17%' },
  },
  {
    n: 2,
    title: "This week's leasing activity",
    body: "Showings booked, showings completed, applications received, screenings in progress - charted day by day. Hover any bar for the underlying detail. No spreadsheet, no recap email needed.",
    // Bar chart
    highlight: { left: '27.5%', top: '40%', width: '63%', height: '30%' },
  },
  {
    n: 3,
    title: 'Open applications + screening status',
    body: "Every applicant currently under review, where each one is in screening, and the latest activity log - leases sent, signatures received, inspections scheduled, move-ins confirmed.",
    // Recent activity strip
    highlight: { left: '27.5%', top: '74%', width: '63%', height: '11%' },
  },
] as const

export function StickyProductTour() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Annotation 1 visible 0-33%, fade between
  const o1 = useTransform(scrollYProgress, [0.0, 0.08, 0.33, 0.42], [0, 1, 1, 0])
  const o2 = useTransform(scrollYProgress, [0.30, 0.42, 0.66, 0.74], [0, 1, 1, 0])
  const o3 = useTransform(scrollYProgress, [0.62, 0.74, 1.0, 1.0], [0, 1, 1, 1])

  // Highlight box position interpolated between the 3 regions
  const hLeft = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      TOUR_ANNOTATIONS[0].highlight.left,
      TOUR_ANNOTATIONS[0].highlight.left,
      TOUR_ANNOTATIONS[1].highlight.left,
      TOUR_ANNOTATIONS[2].highlight.left,
    ],
  )
  const hTop = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      TOUR_ANNOTATIONS[0].highlight.top,
      TOUR_ANNOTATIONS[0].highlight.top,
      TOUR_ANNOTATIONS[1].highlight.top,
      TOUR_ANNOTATIONS[2].highlight.top,
    ],
  )
  const hWidth = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      TOUR_ANNOTATIONS[0].highlight.width,
      TOUR_ANNOTATIONS[0].highlight.width,
      TOUR_ANNOTATIONS[1].highlight.width,
      TOUR_ANNOTATIONS[2].highlight.width,
    ],
  )
  const hHeight = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      TOUR_ANNOTATIONS[0].highlight.height,
      TOUR_ANNOTATIONS[0].highlight.height,
      TOUR_ANNOTATIONS[1].highlight.height,
      TOUR_ANNOTATIONS[2].highlight.height,
    ],
  )

  const opacities = [o1, o2, o3]

  return (
    <section
      ref={ref}
      id="walkthrough"
      className="relative bg-[#FBFAF6]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            A Walkthrough
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
            <Typewriter
              text="Your dashboard, your visibility."
              speed={45}
              cursor
            />
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            One screen. Three things you&rsquo;ll check most days while your
            unit is on the market - designed for an owner glancing at their
            phone over morning coffee, not for a software demo. Scroll to take
            the tour.
          </p>
        </div>

        {/* Desktop: sticky illustration on right + scrolling annotations on left */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Annotations rail (left) */}
          <div className="lg:col-span-5">
            <div className="relative">
              {TOUR_ANNOTATIONS.map((a, i) => (
                <motion.div
                  key={a.n}
                  style={
                    reduce
                      ? undefined
                      : { opacity: opacities[i] }
                  }
                  className="flex min-h-[80vh] flex-col justify-center"
                >
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
                    <span className="font-display text-3xl tabular-nums text-brand-gold">
                      {String(a.n).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="h-px w-10 bg-brand-gold/60" />
                    <span>
                      {String(a.n).padStart(2, '0')} / {String(TOUR_ANNOTATIONS.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-normal leading-tight text-brand-navy sm:text-4xl">
                    {a.title}
                    <span className="text-brand-gold">.</span>
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 md:text-lg">
                    {a.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sticky dashboard column (right) */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-emerald/8 via-transparent to-brand-gold/8 blur-2xl"
                />
                <div className="relative">
                  <PortalIllustration className="w-full" />

                  {/* Scroll-linked highlight ring */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute rounded-md"
                    style={
                      reduce
                        ? { display: 'none' }
                        : {
                            left: hLeft,
                            top: hTop,
                            width: hWidth,
                            height: hHeight,
                            boxShadow:
                              '0 0 0 2px rgb(16 185 129), 0 0 0 6px rgba(16,185,129,0.18), 0 8px 24px rgba(16,185,129,0.25)',
                          }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked vertical layout - illustration first, then annotations */}
        <div className="mt-12 lg:hidden">
          <div className="relative">
            <PortalIllustration className="w-full" />
          </div>
          <ol className="mt-10 space-y-10">
            {TOUR_ANNOTATIONS.map((a) => (
              <RevealOnScroll
                key={a.n}
                variant="slideFromLeft"
                duration={0.6}
              >
                <li>
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
                    <span className="font-display text-3xl tabular-nums text-brand-gold">
                      {String(a.n).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="h-px w-8 bg-brand-gold/60" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-brand-navy">
                    {a.title}
                    <span className="text-brand-gold">.</span>
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {a.body}
                  </p>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION - Tenant portal (centered editorial card)                           */
/* ─────────────────────────────────────────────────────────────────────────── */

const TENANT_LINES = [
  'Apply online in minutes',
  'Real-time application status tracking',
  'Digital lease signing, fully secure',
  'Move-in checklist + utility transfer',
] as const

export function OwnerTenantSplit() {
  return (
    <section className="relative bg-white pb-20 pt-20">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Both Sides Of The Door
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
            Your applicant gets a{' '}
            <span className="font-display italic text-brand-emerald">
              portal too
            </span>
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            A frictionless application, transparent screening status, and
            digital lease signing - which means stronger applicant pools,
            faster decisions, and a cleaner path to move-in for you.
          </p>
        </div>
      </div>

      {/* Centered tenant-side editorial card */}
      <div className="mx-auto mt-14 max-w-3xl px-4">
        <RevealOnScroll variant="scaleIn" duration={0.7}>
          <div className="relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-[#FBFAF6] px-6 py-12 shadow-sm sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.10) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.06) 0%, transparent 55%)',
              }}
            />
            <div className="relative text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Applicant & Tenant side
              </p>
              <h3 className="mt-4 font-display text-3xl font-normal leading-tight text-brand-navy sm:text-4xl">
                Friction-free{' '}
                <span className="italic text-brand-emerald">leasing</span>
                <span className="text-brand-gold">.</span>
              </h3>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                A separate login, scoped to their application and signed
                lease. Easier to apply, easier to sign - which is the quiet
                engine of better pools and faster lease-up.
              </p>
              <ul className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-2 sm:gap-x-8">
                {TENANT_LINES.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-base text-slate-700"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-brand-emerald"
                      aria-hidden="true"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-10 max-w-md border-t border-slate-200 pt-5 text-sm italic text-slate-500">
                Easier to apply and sign = faster lease-up for you.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION - Notifications timeline (vertical line + dots, slide from left)    */
/* ─────────────────────────────────────────────────────────────────────────── */

const NOTIFICATIONS = [
  {
    Icon: CalendarCheck,
    when: 'Tue 9:14a',
    title: 'Showing booked',
    detail: 'Mississauga 2nd Ave · Sat 11:00a · prospect confirmed',
    tone: 'emerald' as const,
  },
  {
    Icon: Megaphone,
    when: 'Tue 3:42p',
    title: 'Listing live across channels',
    detail: 'MLS · Rentals.ca · Zumper · Facebook Marketplace · paid social',
    tone: 'gold' as const,
  },
  {
    Icon: UserCheck,
    when: 'Wed 11:08a',
    title: 'Application submitted',
    detail: 'Brampton Maple St · 1 of 2 prospects on the shortlist',
    tone: 'navy' as const,
  },
  {
    Icon: ClipboardCheck,
    when: 'Thu 2:30p',
    title: 'Screening complete',
    detail: 'Credit · income · employment · references all clear',
    tone: 'emerald' as const,
  },
  {
    Icon: FileSignature,
    when: 'Fri 4:12p',
    title: 'Lease signed',
    detail: 'Hamilton King St · 12-month term · countersigned & filed',
    tone: 'navy' as const,
  },
  {
    Icon: KeyRound,
    when: 'Mon 10:18a',
    title: 'Move-in confirmed · utilities transferred',
    detail: 'Inspection logged · 24 condition photos · keys handed over',
    tone: 'emerald' as const,
  },
]

const TONE_DOT: Record<'emerald' | 'gold' | 'navy', string> = {
  emerald: 'bg-brand-emerald',
  gold: 'bg-brand-gold',
  navy: 'bg-brand-navy',
}
const TONE_ICON: Record<'emerald' | 'gold' | 'navy', string> = {
  emerald: 'text-brand-emerald',
  gold: 'text-brand-gold',
  navy: 'text-brand-navy',
}
const TONE_RING: Record<'emerald' | 'gold' | 'navy', string> = {
  emerald: 'ring-brand-emerald/20',
  gold: 'ring-brand-gold/25',
  navy: 'ring-brand-navy/15',
}

export function NotificationTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const reduce = useReducedMotion()

  return (
    <section className="bg-[#FBFAF6] py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Notifications
          </p>
          <RevealOnScroll variant="splitReveal" duration={0.85}>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
              Notifications you&rsquo;ll actually{' '}
              <span className="font-display italic text-brand-emerald">want</span>
              <span className="text-brand-gold">.</span>
            </h2>
          </RevealOnScroll>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Calm, human-paced. The milestones that matter during a lease-up -
            no buzzing your phone every time a prospect opens your listing.
            Choose email, SMS, or both.
          </p>
        </div>

        <div ref={ref} className="relative mx-auto mt-14 max-w-2xl pl-2">
          {/* Vertical timeline rail */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ transformOrigin: 'top' }}
            className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-brand-gold/40 via-brand-emerald/40 to-brand-emerald/60"
          />

          <ol className="space-y-7">
            {NOTIFICATIONS.map((item, i) => {
              const Icon = item.Icon
              const isLast = i === NOTIFICATIONS.length - 1
              return (
                <motion.li
                  key={item.title}
                  initial={{ x: -60, opacity: 0 }}
                  animate={
                    inView ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: reduce ? 0 : 0.25 + i * 0.18,
                    ease: EASE,
                  }}
                  className="relative flex items-start gap-5 pl-12"
                >
                  {/* Timeline dot */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[12px] top-1.5 inline-flex size-4 items-center justify-center rounded-full ring-4 ring-[#FBFAF6]`}
                  >
                    <span
                      className={`size-3 rounded-full ${TONE_DOT[item.tone]} ${
                        isLast && !reduce ? 'animate-pulse' : ''
                      }`}
                    />
                    {isLast && !reduce && (
                      <span
                        className={`absolute inline-flex size-3 rounded-full ${TONE_DOT[item.tone]} animate-ping opacity-60`}
                      />
                    )}
                  </span>

                  {/* Inline icon + content */}
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ${TONE_RING[item.tone]}`}
                  >
                    <Icon
                      className={`size-4 ${TONE_ICON[item.tone]}`}
                      aria-hidden="true"
                    />
                  </span>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate font-display text-base font-normal text-brand-navy">
                        {item.title}
                        {isLast && (
                          <span className="ml-2 inline-flex items-center gap-1.5 align-middle text-[10px] font-bold uppercase tracking-wider text-brand-emerald">
                            <span className="size-1.5 rounded-full bg-brand-emerald" />
                            Live
                          </span>
                        )}
                      </p>
                      <p className="shrink-0 text-[11px] tabular-nums text-slate-500">
                        {item.when}
                      </p>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>

          <div className="mt-10 flex items-center gap-3 pl-12">
            <Bell className="size-4 text-brand-emerald" aria-hidden="true" />
            <p className="text-xs italic text-slate-500">
              You decide which of these actually buzz your phone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION - Security trust strip (single horizontal strip, pipe-divided)      */
/* ─────────────────────────────────────────────────────────────────────────── */

const SECURITY_ITEMS = [
  { Icon: ShieldCheck, label: 'PIPEDA compliant' },
  { Icon: Lock, label: '256-bit AES + TLS 1.3' },
  { Icon: MapPin, label: 'Canadian data residency' },
  { Icon: CreditCard, label: 'PCI-DSS payments' },
] as const

export function SecurityTrustStrip() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Security &amp; Data
          </p>
          <RevealOnScroll variant="splitReveal" duration={0.85}>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Treated with the same care as your{' '}
              <span className="font-display italic text-brand-emerald">
                paper file
              </span>
              <span className="text-brand-gold">.</span>
            </h2>
          </RevealOnScroll>
          <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
            Applicant files, signed leases, screening reports, and inspection
            records live in encrypted Canadian-hosted infrastructure. Access is
            role-based - your leasing manager sees what they need, applicants
            see only their own file, and you see everything. We don&rsquo;t
            sell, syndicate, or pipe data to ad networks. Ever.
          </p>
        </div>

        {/* Horizontal trust strip - pipe-divided */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
          />
          <RevealOnScroll variant="fade" duration={0.7}>
            <ul className="flex flex-col items-stretch divide-y divide-slate-200 py-6 text-sm md:flex-row md:items-center md:justify-between md:divide-x md:divide-y-0 md:py-5">
              {SECURITY_ITEMS.map((item) => {
                const Icon = item.Icon
                return (
                  <li
                    key={item.label}
                    className="flex flex-1 items-center justify-center gap-3 px-4 py-3 md:py-1"
                  >
                    <Icon
                      className="size-4 shrink-0 text-brand-emerald"
                      aria-hidden="true"
                    />
                    <span className="font-display text-[0.95rem] font-normal text-brand-navy">
                      {item.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </RevealOnScroll>
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
          />
        </div>
      </div>
    </section>
  )
}
