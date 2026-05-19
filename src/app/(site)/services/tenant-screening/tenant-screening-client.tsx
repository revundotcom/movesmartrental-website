'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * Reveal — generic stagger-up wrapper used across the screening page.
 * ──────────────────────────────────────────────────────────────────────── */
export function Reveal({
  index = 0,
  children,
  className,
}: {
  index?: number
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * LayeredDocumentsCollage — THE distinguishing visual feature.
 *
 * A stack of 4 fake "screening report" cards rotated at slight angles,
 * overlapping each other to evoke a forensic file folder / desk of
 * application documents. Each card is a white rounded panel with mocked
 * redacted content (name bar, credit-score badge, employment chip, refs).
 *
 * Animates in with a subtle staggered settle, mimicking documents being
 * dropped onto a desk.
 * ──────────────────────────────────────────────────────────────────────── */
export function LayeredDocumentsCollage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const cards = [
    {
      // Bottom card — older application, lowest score
      label: 'Application · A-1041',
      score: 612,
      scoreTint: 'text-amber-600',
      scoreRing: 'border-amber-200 bg-amber-50',
      employment: 'Self-employed · 14 mo',
      employmentTone: 'text-amber-700 bg-amber-50 border-amber-200',
      refs: [true, true, false],
      rotate: 'md:-rotate-[7deg]',
      offset: 'md:translate-x-8 md:translate-y-10',
      z: 'z-[1]',
      delay: 0.05,
    },
    {
      // Mid-back card
      label: 'Application · A-1042',
      score: 698,
      scoreTint: 'text-slate-700',
      scoreRing: 'border-slate-200 bg-slate-50',
      employment: 'Full-time · 3 yr 2 mo',
      employmentTone: 'text-slate-700 bg-slate-100 border-slate-200',
      refs: [true, true, true],
      rotate: 'md:rotate-[4deg]',
      offset: 'md:-translate-x-6 md:translate-y-4',
      z: 'z-[2]',
      delay: 0.12,
    },
    {
      // Mid-front card — flagged
      label: 'Application · A-1043',
      score: 587,
      scoreTint: 'text-rose-600',
      scoreRing: 'border-rose-200 bg-rose-50',
      employment: 'Contract · 8 mo',
      employmentTone: 'text-rose-700 bg-rose-50 border-rose-200',
      refs: [true, false, false],
      rotate: 'md:-rotate-[2deg]',
      offset: 'md:translate-x-4 md:-translate-y-2',
      z: 'z-[3]',
      delay: 0.19,
    },
    {
      // TOP card — the headline approval
      label: 'Application · A-1044',
      score: 762,
      scoreTint: 'text-emerald-700',
      scoreRing: 'border-emerald-200 bg-emerald-50',
      employment: 'Full-time · 5 yr 7 mo',
      employmentTone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      refs: [true, true, true],
      rotate: 'md:rotate-[2deg]',
      offset: 'md:-translate-x-2 md:-translate-y-4',
      z: 'z-[4]',
      delay: 0.26,
    },
  ]

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[420px] w-full max-w-md sm:h-[460px] md:h-[520px]"
    >
      {cards.map((c) => (
        <motion.article
          key={c.label}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={
            inView
              ? { opacity: 1, y: 0, rotate: 0 }
              : { opacity: 0, y: 30, rotate: 0 }
          }
          transition={{ duration: 0.7, ease: EASE, delay: c.delay }}
          className={`absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-brand-navy/10 ring-1 ring-black/[0.02] sm:w-[320px] sm:p-6 ${c.rotate} ${c.offset} ${c.z}`}
        >
          {/* Header: label + status dot */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {c.label}
            </p>
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-500"
            />
          </div>

          {/* Redacted name bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="size-9 rounded-full bg-slate-200" aria-hidden="true" />
            <div className="flex-1 space-y-1.5">
              <div
                aria-hidden="true"
                className="h-2.5 w-3/4 rounded-full bg-slate-800/85"
              />
              <div
                aria-hidden="true"
                className="h-1.5 w-1/2 rounded-full bg-slate-200"
              />
            </div>
          </div>

          {/* Credit score circle */}
          <div className="mt-5 flex items-center gap-4">
            <div
              className={`flex size-16 shrink-0 items-center justify-center rounded-full border-2 ${c.scoreRing}`}
            >
              <div className="text-center">
                <p
                  className={`font-display text-2xl font-medium leading-none ${c.scoreTint}`}
                >
                  {c.score}
                </p>
                <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Equifax
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Employment
              </p>
              <p
                className={`mt-1 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold ${c.employmentTone}`}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-current"
                />
                {c.employment}
              </p>
            </div>
          </div>

          {/* References row */}
          <div className="mt-5 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                References
              </p>
              <p className="font-mono text-[10px] text-slate-400">
                {c.refs.filter(Boolean).length}/{c.refs.length}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              {c.refs.map((ok, j) => (
                <span
                  key={j}
                  aria-hidden="true"
                  className={`flex size-6 items-center justify-center rounded-md border ${
                    ok
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                      : 'border-slate-200 bg-slate-50 text-slate-300'
                  }`}
                >
                  {ok ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}

      {/* Floating "verified" stamp on the top card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={
          inView
            ? { opacity: 1, scale: 1, rotate: -8 }
            : { opacity: 0, scale: 0.6, rotate: -8 }
        }
        transition={{ duration: 0.5, ease: EASE, delay: 0.65 }}
        aria-hidden="true"
        className="absolute right-2 top-8 z-[5] rounded-md border-2 border-emerald-500/70 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 shadow-md backdrop-blur-sm md:right-6 md:top-12"
      >
        Verified
      </motion.div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ProblemAccordion — slate-toned editorial accordion (issue log style).
 * Each row collapses; amber warning iconography keeps the forensic tone.
 * ──────────────────────────────────────────────────────────────────────── */
export function ProblemAccordion({
  items,
}: {
  items: Array<{ title: string; body: string }>
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <ol className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx
        const stamp = `2026-05-${String(18 - idx).padStart(2, '0')}`
        return (
          <li
            key={item.title}
            className="border-b border-slate-200 last:border-b-0"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="group flex w-full items-start gap-4 px-5 py-5 text-left transition-colors duration-300 hover:bg-amber-50/40 sm:gap-5 sm:px-7 sm:py-6"
            >
              {/* Amber warning icon */}
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Issue · {String(idx + 1).padStart(3, '0')}
                  </p>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <p className="font-mono text-[10px] text-slate-400">
                    Logged {stamp}
                  </p>
                </div>
                <h3 className="mt-1.5 font-display text-lg font-normal leading-snug text-brand-navy sm:text-xl">
                  {item.title}
                </h3>

                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]"
                  >
                    {item.body}
                  </motion.p>
                )}
              </div>

              <span
                aria-hidden="true"
                className={`mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-300 ${
                  isOpen ? 'rotate-45 border-brand-navy/20 bg-slate-50' : ''
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ScreeningReportMockup — stylized SVG/div mockup of a screening report.
 * Tabs for Credit · Employment · References · Risk Summary.
 * Sample data on the active tab. Pure presentation, no interactivity wired
 * beyond local tab state.
 * ──────────────────────────────────────────────────────────────────────── */
export function ScreeningReportMockup() {
  const [tab, setTab] = useState<'credit' | 'employment' | 'references' | 'risk'>(
    'risk',
  )

  const tabs = [
    { id: 'credit', label: 'Credit' },
    { id: 'employment', label: 'Employment' },
    { id: 'references', label: 'References' },
    { id: 'risk', label: 'Risk Summary' },
  ] as const

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-brand-navy/15 ring-1 ring-black/[0.03]">
      {/* Browser-style chrome */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-rose-300" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-amber-300" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-emerald-300" />
        <div className="ml-3 hidden flex-1 truncate rounded-md border border-slate-200 bg-white px-3 py-1 font-mono text-[10px] text-slate-500 sm:block">
          portal.movesmartrentals.com / applications / A-1044 / report
        </div>
        <span className="ml-auto rounded-md bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
          Live
        </span>
      </div>

      {/* Report header */}
      <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Screening Report · A-1044
            </p>
            <h3 className="mt-1 font-display text-2xl font-normal text-brand-navy sm:text-3xl">
              Applicant File
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h3>
            <p className="mt-1.5 font-mono text-xs text-slate-500">
              Submitted 2026-05-17 09:42 · Reviewed by L. Martin
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                Recommendation
              </p>
              <p className="font-display text-sm font-medium text-emerald-800">
                Approve
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div role="tablist" className="flex border-b border-slate-200 bg-slate-50/60">
        {tabs.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`relative flex-1 px-3 py-3 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
                active
                  ? 'text-brand-navy'
                  : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              {t.label}
              {active && (
                <motion.span
                  layoutId="screening-tab-underline"
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-0 h-0.5 rounded-t bg-brand-gold"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        {tab === 'credit' && <CreditPanel />}
        {tab === 'employment' && <EmploymentPanel />}
        {tab === 'references' && <ReferencesPanel />}
        {tab === 'risk' && <RiskPanel />}
      </div>

      {/* Footer rule */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-5 py-3 font-mono text-[10px] text-slate-500 sm:px-7">
        Log · ID verified · Equifax 762 · Employer confirmed ·
        2 of 2 references positive · Decision pending owner approval
      </div>
    </div>
  )
}

function CreditPanel() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
          Equifax Score
        </p>
        <p className="mt-2 font-display text-5xl font-normal text-emerald-700">
          762
        </p>
        <p className="mt-1 font-mono text-[10px] text-slate-500">
          Soft pull · 2026-05-17
        </p>
      </div>
      <div className="md:col-span-2">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <Row label="Trade lines" value="11 active" />
          <Row label="Oldest account" value="9 yr 4 mo" />
          <Row label="Utilisation" value="22%" />
          <Row label="Collections" value="0" tone="good" />
          <Row label="Judgments" value="0" tone="good" />
          <Row label="Bankruptcies" value="None" tone="good" />
        </dl>
      </div>
    </div>
  )
}

function EmploymentPanel() {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
      <Row label="Employer" value="Northgate Health Inc." />
      <Row label="Role" value="Senior Nurse Practitioner" />
      <Row label="Tenure" value="5 yr 7 mo" />
      <Row label="Stated income" value="$96,400 / yr" />
      <Row label="Verified income" value="$96,400 / yr" tone="good" />
      <Row label="Confirmed by" value="HR direct callback" tone="good" />
    </dl>
  )
}

function ReferencesPanel() {
  const rows = [
    {
      name: 'Prior landlord — 2022 to 2026',
      status: 'Positive',
      note: 'On-time payments, full notice, unit returned clean.',
      good: true,
    },
    {
      name: 'Prior landlord — 2019 to 2022',
      status: 'Positive',
      note: 'Renewed twice. No complaints on file.',
      good: true,
    },
  ]
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li
          key={r.name}
          className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <p className="font-display text-sm text-brand-navy">{r.name}</p>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                {r.status}
              </span>
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              {r.note}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function RiskPanel() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
      <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Rent-to-income
        </p>
        <p className="mt-2 font-display text-3xl font-normal text-brand-navy">
          24.8%
        </p>
        <p className="mt-1 font-mono text-[10px] text-emerald-700">
          Below 33% threshold
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            aria-hidden="true"
            className="h-full rounded-full bg-emerald-500"
            style={{ width: '24.8%' }}
          />
        </div>
      </div>
      <div className="md:col-span-3 space-y-2">
        <RiskRow
          tone="good"
          label="Credit — 762 Equifax, no derogatories"
        />
        <RiskRow
          tone="good"
          label="Income — verified at $96,400 by direct callback"
        />
        <RiskRow
          tone="good"
          label="References — 2 of 2 prior landlords positive"
        />
        <RiskRow tone="neutral" label="ID verified — Ontario driver licence" />
        <RiskRow
          tone="neutral"
          label="OHRC compliance review — passed, no protected-ground factors used"
        />
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'good'
}) {
  return (
    <>
      <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </dt>
      <dd
        className={`text-right text-sm font-semibold ${
          tone === 'good' ? 'text-emerald-700' : 'text-brand-navy'
        }`}
      >
        {value}
      </dd>
    </>
  )
}

function RiskRow({
  label,
  tone,
}: {
  label: string
  tone: 'good' | 'neutral' | 'warn'
}) {
  const tones = {
    good: {
      ring: 'border-emerald-200 bg-emerald-50',
      dot: 'bg-emerald-500',
      text: 'text-emerald-800',
    },
    neutral: {
      ring: 'border-slate-200 bg-slate-50',
      dot: 'bg-slate-400',
      text: 'text-slate-700',
    },
    warn: {
      ring: 'border-amber-200 bg-amber-50',
      dot: 'bg-amber-500',
      text: 'text-amber-800',
    },
  }[tone]
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${tones.ring}`}
    >
      <span
        aria-hidden="true"
        className={`size-2 shrink-0 rounded-full ${tones.dot}`}
      />
      <p className={`text-xs leading-snug ${tones.text} sm:text-sm`}>{label}</p>
    </div>
  )
}
