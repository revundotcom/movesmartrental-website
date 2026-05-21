'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bell, CheckCircle2, Star } from 'lucide-react'

import { BrowserFrame } from '@/components/ui/browser-frame'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { OwnerDashboardMockup } from '@/components/portal-mockups/owner-dashboard-mockup'
import { PropertiesListMockup } from '@/components/portal-mockups/properties-list-mockup'
import { AnalyticsMockup } from '@/components/portal-mockups/analytics-mockup'

const EASE = [0.22, 1, 0.36, 1] as const

/* ─────────────────────────────────────────────────────────────────────────── */
/* 1. EditorialPortalHero                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export function EditorialPortalHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-20 sm:pt-14 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      {/* Subtle background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 8% 0%, rgba(16,185,129,0.06) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(212,168,83,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16">
        {/* LEFT — copy column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-6"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Portal &amp; Technology
          </p>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
            Total visibility,{' '}
            <span className="font-display italic text-brand-emerald">
              end to end
            </span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Most brokerages go dark the day your listing goes live. Our portal
            is the opposite &mdash; watch every showing, application, screening
            check, approval, and move-in confirmation as it happens, from one
            owner login.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact/?intent=demo"
              className="inline-flex items-center justify-center rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-emerald-hover hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald focus-visible:ring-offset-2"
            >
              Get a Demo
            </Link>
            <a
              href="#walkthrough"
              onClick={(e) => {
                const target = document.getElementById('walkthrough')
                if (target) {
                  e.preventDefault()
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-flex items-center justify-center rounded-full border border-brand-navy/15 bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
            >
              Tour the Portal
            </a>
          </div>

          {/* Lightweight trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
              PIPEDA compliant
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
              Canadian data residency
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-navy" aria-hidden="true" />
              Built by leasing operators
            </span>
          </div>
        </motion.div>

        {/* RIGHT — clean browser-framed dashboard with a soft brand glow */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
          className="relative lg:col-span-6"
        >
          {/* Soft brand glow behind the frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, rgba(16,185,129,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(212,168,83,0.14) 0%, transparent 60%)',
            }}
          />

          {/* The actual dashboard, in its browser frame */}
          <div className="relative drop-shadow-2xl">
            <BrowserFrame url="movesmart.ca/owner/dashboard">
              <OwnerDashboardMockup />
            </BrowserFrame>
          </div>

          {/* Floating notification card (bottom-left) */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="absolute -bottom-6 -left-3 w-[78%] max-w-[280px] sm:-bottom-8 sm:-left-6"
          >
            <div className="rounded-2xl border border-brand-navy/10 bg-white/95 p-4 shadow-xl shadow-brand-navy/15 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/10">
                  <Bell className="size-4 text-brand-emerald" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate font-display text-sm font-normal text-brand-navy">
                      Showing booked
                    </p>
                    <span className="shrink-0 text-[10px] tabular-nums text-slate-400">
                      now
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-snug text-slate-600">
                    Sat 11:00a &middot; prospect confirmed
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="size-1.5 animate-pulse rounded-full bg-brand-emerald" aria-hidden="true" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-emerald">
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 2. BuiltForOwners                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

const BUILT_STATS = [
  { label: 'Listing to lease', detail: '18 days' },
  { label: 'Notifications', detail: 'You choose' },
  { label: 'Files', detail: 'Yours forever' },
] as const

export function BuiltForOwners() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — large editorial photo (rendered second on mobile) */}
          <RevealOnScroll
            variant="scaleIn"
            duration={0.8}
            className="order-2 lg:order-1 lg:col-span-6"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/10">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop"
                alt="Leasing team in office collaborating around a laptop screen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1D3A]/25 to-transparent"
              />
            </div>
          </RevealOnScroll>

          {/* RIGHT — copy */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <RevealOnScroll variant="blur" duration={0.8}>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                By leasing operators, for landlords
              </p>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
                Built in the leasing{' '}
                <span className="font-display italic text-brand-emerald">
                  trenches
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                The portal exists because our team needed it themselves. We were
                tired of WhatsApp threads, screenshot recaps, and Friday emails
                summarising a week of leasing. So we built the view our
                managers wanted &mdash; and gave owners the same window.
              </p>
            </RevealOnScroll>

            <RevealOnScroll
              variant="slideUp"
              duration={0.65}
              delay={0.15}
              stagger={0.1}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {BUILT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-brand-navy/10 bg-[#FBFAF6] px-5 py-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/55">
                    {stat.label}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-normal text-brand-navy">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 3. DeviceShowcase                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

export function DeviceShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBFAF6] via-white to-[#FBFAF6] py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Anywhere you are
          </p>
          <RevealOnScroll variant="splitReveal" duration={0.85}>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
              One portal. Every{' '}
              <span className="font-display italic text-brand-emerald">
                device
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealOnScroll>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Glance from your phone over morning coffee, tap through on a tablet
            at a showing, or open it up on your laptop at the kitchen table.
            Same data, every screen.
          </p>
        </div>

        {/* Device cluster */}
        <div className="relative mt-16 hidden min-h-[520px] lg:block">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-3xl -translate-y-1/2 rounded-[3rem] bg-gradient-to-tr from-emerald-100/60 via-white to-amber-100/40 blur-3xl"
          />

          <div className="relative mx-auto flex h-full items-center justify-center">
            {/* LEFT — Tablet frame (tilted left) */}
            <div className="absolute left-[3%] top-1/2 z-10 w-[28%] -translate-y-1/2 -rotate-6">
              <TabletFrame ariaLabel="Properties list shown on a tablet">
                <PropertiesListMockup />
              </TabletFrame>
            </div>

            {/* CENTER — Laptop frame (largest, in front) */}
            <div className="relative z-20 w-[58%]">
              <LaptopFrame ariaLabel="Owner dashboard shown on a laptop">
                <OwnerDashboardMockup />
              </LaptopFrame>
            </div>

            {/* RIGHT — Phone frame (tilted right) */}
            <div className="absolute right-[6%] top-1/2 z-10 w-[16%] -translate-y-1/2 rotate-6">
              <PhoneFrame ariaLabel="Notifications shown on a phone">
                <div className="origin-top-left scale-[0.42] transform-gpu" style={{ width: '238%' }}>
                  <AnalyticsMockup />
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* Mobile/tablet fallback — vertical stack */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:hidden">
          <div className="mx-auto w-full max-w-2xl">
            <LaptopFrame ariaLabel="Owner dashboard shown on a laptop">
              <OwnerDashboardMockup />
            </LaptopFrame>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="mx-auto w-full max-w-xs">
              <TabletFrame ariaLabel="Properties list shown on a tablet">
                <PropertiesListMockup />
              </TabletFrame>
            </div>
            <div className="mx-auto w-full max-w-[160px]">
              <PhoneFrame ariaLabel="Notifications shown on a phone">
                <div className="origin-top-left scale-[0.42] transform-gpu" style={{ width: '238%' }}>
                  <AnalyticsMockup />
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Lightweight device-frame primitives */
function LaptopFrame({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel: string
}) {
  return (
    <div aria-label={ariaLabel} role="img" className="relative">
      {/* Screen bezel */}
      <div className="overflow-hidden rounded-2xl border-[10px] border-[#0B1D3A] bg-[#0B1D3A] shadow-2xl shadow-brand-navy/30">
        <div className="flex items-center justify-center gap-1 bg-[#0B1D3A] pb-2 pt-1">
          <span className="size-1 rounded-full bg-slate-600" aria-hidden="true" />
        </div>
        <div className="bg-white">{children}</div>
      </div>
      {/* Laptop base */}
      <div className="relative mx-auto -mt-1 h-3 w-[108%] -translate-x-[3.7%] rounded-b-2xl bg-gradient-to-b from-[#1f2c44] to-[#0B1D3A] shadow-lg" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-slate-700/60" />
      </div>
    </div>
  )
}

function TabletFrame({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel: string
}) {
  return (
    <div
      aria-label={ariaLabel}
      role="img"
      className="overflow-hidden rounded-[1.5rem] border-[8px] border-[#0B1D3A] bg-[#0B1D3A] shadow-xl shadow-brand-navy/25"
    >
      <div className="bg-white">{children}</div>
    </div>
  )
}

function PhoneFrame({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel: string
}) {
  return (
    <div
      aria-label={ariaLabel}
      role="img"
      className="relative overflow-hidden rounded-[2rem] border-[6px] border-[#0B1D3A] bg-[#0B1D3A] shadow-xl shadow-brand-navy/30"
    >
      {/* Notch */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-[#0B1D3A]"
      />
      <div className="aspect-[9/19] overflow-hidden bg-white">{children}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 4. ThreeRoles                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

const ROLES = [
  {
    role: 'Owner',
    photo:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop',
    alt: 'Property owner reviewing rental analytics on a laptop at home',
    description: 'Track every unit from listing to keys.',
    features: ['All listings live', 'Showings & offers', 'Approval & counter'],
  },
  {
    role: 'Applicant',
    photo:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop',
    alt: 'Couple browsing apartment listings together on a laptop',
    description: 'Apply in minutes, track status in real time.',
    features: ['One-tap apply', 'Live screening status', 'Digital lease signing'],
  },
  {
    role: 'Leasing Agent',
    photo:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop',
    alt: 'Real estate agent handing keys over at a property showing',
    description: 'Coordinate showings, screen applicants, close leases.',
    features: ['Showing calendar', 'Applicant pipeline', 'Lease execution'],
  },
] as const

export function ThreeRoles() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Three perspectives, one record
          </p>
          <RevealOnScroll variant="splitReveal" duration={0.85}>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
              A view for every{' '}
              <span className="font-display italic text-brand-emerald">
                role
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealOnScroll>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Owners, applicants, and the leasing agents who connect them &mdash;
            each gets a scoped login with the exact data they need, and nothing
            they shouldn&rsquo;t see.
          </p>
        </div>

        <RevealOnScroll
          variant="slideUp"
          duration={0.65}
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {ROLES.map((r) => (
            <article
              key={r.role}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-xl hover:shadow-brand-navy/10"
            >
              {/* Photo header */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={r.photo}
                  alt={r.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0B1D3A]/40 to-transparent"
                />
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-navy backdrop-blur">
                    {r.role}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-7">
                <p className="font-display text-lg font-normal leading-snug text-brand-navy">
                  {r.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-brand-emerald"
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 5. PressLogos                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

export function PressLogos() {
  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500/70">
          Featured in
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-60 grayscale sm:gap-x-14">
          {/* REIC */}
          <svg
            width="72"
            height="28"
            viewBox="0 0 72 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-label="REIC"
          >
            <text
              x="0"
              y="21"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="20"
              fontWeight="800"
              fill="#0B1D3A"
              letterSpacing="2"
            >
              REIC
            </text>
          </svg>
          {/* FRPO */}
          <svg
            width="72"
            height="28"
            viewBox="0 0 72 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-label="FRPO"
          >
            <text
              x="0"
              y="21"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="20"
              fontWeight="800"
              fill="#0B1D3A"
              letterSpacing="2"
            >
              FRPO
            </text>
          </svg>
          {/* REM Online */}
          <svg
            width="150"
            height="28"
            viewBox="0 0 150 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-label="REM Online"
          >
            <text
              x="0"
              y="21"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="18"
              fontWeight="800"
              fill="#0B1D3A"
              letterSpacing="1"
            >
              REM ONLINE
            </text>
          </svg>
          {/* The Globe and Mail */}
          <svg
            width="200"
            height="28"
            viewBox="0 0 200 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-label="The Globe and Mail"
          >
            <text
              x="0"
              y="21"
              fontFamily="'Times New Roman', Georgia, serif"
              fontSize="18"
              fontWeight="700"
              fill="#0B1D3A"
              letterSpacing="0.2"
            >
              THE GLOBE AND MAIL
            </text>
          </svg>
          {/* Toronto Star */}
          <svg
            width="160"
            height="28"
            viewBox="0 0 160 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-label="Toronto Star"
          >
            <text
              x="0"
              y="21"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="19"
              fontWeight="700"
              fill="#0B1D3A"
              letterSpacing="-0.3"
            >
              Toronto
            </text>
            <text
              x="86"
              y="21"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="19"
              fontWeight="400"
              fontStyle="italic"
              fill="#0B1D3A"
            >
              Star
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 6. WorkflowImageStrip                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

const WORKFLOW_STEPS = [
  {
    n: 1,
    label: 'Listing prep',
    photo:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop',
    alt: 'Photographer prepping a bright modern apartment for listing photos',
  },
  {
    n: 2,
    label: 'Showings',
    photo:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=80&auto=format&fit=crop',
    alt: 'Prospective tenant touring a furnished living room',
  },
  {
    n: 3,
    label: 'Screening',
    photo:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format&fit=crop',
    alt: 'Application documents and laptop on a desk during applicant screening',
  },
  {
    n: 4,
    label: 'Lease signing',
    photo:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop',
    alt: 'Hands signing a lease document with a fountain pen',
  },
  {
    n: 5,
    label: 'Move-in',
    photo:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop',
    alt: 'Moving boxes stacked in a sunlit empty room on move-in day',
  },
] as const

export function WorkflowImageStrip() {
  return (
    <section className="bg-[#FBFAF6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            The lease-up, in five frames
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
            Every stage, in your{' '}
            <span className="font-display italic text-brand-emerald">
              portal
            </span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
        </div>

        <RevealOnScroll
          variant="slideUp"
          duration={0.6}
          stagger={0.08}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5"
        >
          {WORKFLOW_STEPS.map((s) => (
            <figure key={s.label} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                <Image
                  src={s.photo}
                  alt={s.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  unoptimized
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1D3A]/55 to-transparent"
                />
                <span className="absolute left-3 top-3 inline-flex size-7 items-center justify-center rounded-full bg-white/95 font-display text-xs font-normal text-brand-gold backdrop-blur">
                  {String(s.n).padStart(2, '0')}
                </span>
              </div>
              <figcaption className="mt-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/70">
                {s.label}
              </figcaption>
            </figure>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 7. TestimonialsWall                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    quote:
      'I always know what’s happening with my unit. No more chasing my agent on Sundays.',
    name: 'Hema V.',
    city: 'Brampton, ON',
    since: 'Owner since 2024',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&q=80&auto=format&fit=crop&crop=faces',
    alt: 'Portrait of Hema V., a MoveSmart property owner from Brampton',
  },
  {
    quote:
      'The screening dashboard alone is worth the engagement. I see every credit check, employment verification — calm and documented.',
    name: 'Andre P.',
    city: 'Vancouver, BC',
    since: 'Owner since 2024',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop&crop=faces',
    alt: 'Portrait of Andre P., a MoveSmart property owner from Vancouver',
  },
  {
    quote:
      'Lease signed Friday at 4. Move-in confirmed Monday at 10. I got every notification on my phone.',
    name: 'Linda C.',
    city: 'Ottawa, ON',
    since: 'Owner since 2024',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80&auto=format&fit=crop&crop=faces',
    alt: 'Portrait of Linda C., a MoveSmart property owner from Ottawa',
  },
] as const

export function TestimonialsWall() {
  return (
    <section className="bg-[#FBFAF6] py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Owners on the portal
          </p>
          <RevealOnScroll variant="splitReveal" duration={0.85}>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
              Calm, documented,{' '}
              <span className="font-display italic text-brand-emerald">
                in writing
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </RevealOnScroll>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Three owners on the visibility their portal gives them, in their
            own words.
          </p>
        </div>

        <RevealOnScroll
          variant="slideUp"
          duration={0.7}
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                  <Image
                    src={t.avatar}
                    alt={t.alt}
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                  />
                </div>
                <figcaption className="min-w-0">
                  <p className="truncate font-display text-base font-normal text-brand-navy">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.city}</p>
                </figcaption>
              </div>

              <div className="mt-4 flex items-center gap-0.5" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="size-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 font-display text-base font-normal leading-relaxed text-brand-navy/90 sm:text-[17px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t.since}
              </p>
            </figure>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
