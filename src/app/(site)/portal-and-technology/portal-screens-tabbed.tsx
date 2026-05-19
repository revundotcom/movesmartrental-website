'use client'

import { useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface Screen {
  title: string
  description: string
  url: string
  /** Pre-wrapped in <BrowserFrame> by the server component */
  frame: ReactNode
}

interface PortalScreensTabbedProps {
  screens: Screen[]
}

/**
 * Scroll-pinned interactive product tour for the owner portal.
 *
 * - Outer container = N * 100vh so each mockup gets its own scroll slice.
 * - Sticky inner child pins on screen for the full traversal.
 * - LEFT rail: vertical stepper with a solid navy bg so the mockup beside it
 *   reads as the hero.
 * - RIGHT stage: stacked <BrowserFrame> mockups that cross-fade by progress,
 *   sitting on an ivory canvas so the white chrome of the mockup pops without
 *   getting washed out by a pastel glow.
 *
 * Mobile (< lg): drops the pin and renders a normal stacked layout.
 * Reduced motion: same stacked layout, no scroll-linked transforms.
 */
export function PortalScreensTabbed({ screens }: PortalScreensTabbedProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const total = screens.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  })

  const [active, setActive] = useState(0)
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(latest * total)))
    if (idx !== active) setActive(idx)
  })

  if (prefersReducedMotion) {
    return <StackedFallback screens={screens} />
  }

  return (
    <>
      {/* Mobile + tablet fallback. Pin only fires when there's enough
          horizontal room for rail + mockup side-by-side — lowered the
          threshold from xl (1280) to lg (1024) so common laptop widths
          get the rich pinned experience instead of the stacked fallback. */}
      <div className="lg:hidden">
        <StackedFallback screens={screens} />
      </div>

      {/* Desktop (lg+) scroll-pinned tour */}
      <section
        ref={containerRef}
        id="portal-screens"
        aria-label="Inside the owner portal"
        className="relative hidden lg:block"
        style={{ height: `${total * 100}vh` }}
      >
        {/* Sticky stage */}
        <div className="sticky top-0 flex h-screen w-full items-stretch overflow-hidden bg-[#FBFAF6]">
          {/* Top hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
          />

          <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-[240px_1fr] items-stretch px-0 xl:grid-cols-[300px_1fr]">
            {/* LEFT: dark navy rail with stepper */}
            <div className="relative flex flex-col justify-between bg-brand-navy px-6 py-8 text-white xl:px-8 xl:py-10">
              {/* Decorative dot grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'radial-gradient(#10B981 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              {/* Hairline gold accent on left edge */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent"
              />

              {/* Header */}
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Inside The Portal
                </p>
                <h2 className="mt-2 font-display text-2xl font-normal leading-tight tracking-tight text-white xl:text-[1.75rem]">
                  See what your{' '}
                  <span className="font-display italic text-brand-emerald">
                    owner portal
                  </span>{' '}
                  looks like
                  <span className="text-brand-gold">.</span>
                </h2>

                {/* Step counter pill */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                  <span className="size-1 rounded-full bg-brand-emerald" aria-hidden="true" />
                  <span className="tabular-nums">
                    {String(active + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Stepper */}
              <ol
                className="relative mt-5 overflow-y-auto pr-1"
                role="list"
                aria-label="Portal sections"
              >
                {/* Vertical rail behind the stepper items */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-[7px] top-3 w-px bg-white/12"
                />
                {/* Filled progress segment */}
                <FilledRail
                  progress={smoothProgress}
                />
                {screens.map((s, i) => (
                  <StepperItem
                    key={s.title}
                    index={i}
                    total={total}
                    progress={smoothProgress}
                    title={s.title}
                    isActive={active === i}
                    container={containerRef}
                  />
                ))}
              </ol>

              {/* Scroll cue at bottom */}
              <div className="relative mt-4 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                <span className="size-1 rounded-full bg-brand-emerald" aria-hidden="true" />
                <span>Scroll to advance</span>
              </div>
            </div>

            {/* RIGHT: ivory stage with stacked frames */}
            <div className="relative flex min-h-0 items-center justify-center overflow-hidden bg-[#FBFAF6] px-4 py-5 lg:px-6 lg:py-6 xl:px-10 xl:py-8">
              {/* Subtle radial brand glow well below the frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(16,185,129,0.25) 0%, transparent 70%)',
                }}
              />
              {/* Subtle vertical dot grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'radial-gradient(#0B1D3A 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Frame stack — kept compact so URL + frame + caption all fit in one viewport */}
              <div className="relative flex h-full w-full max-w-[820px] flex-col">
                {/* URL bar pill ABOVE the frame */}
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-2.5 py-1 text-[10px] font-semibold text-brand-navy shadow-sm">
                    <span className="size-1.5 animate-pulse rounded-full bg-brand-emerald" aria-hidden="true" />
                    <span className="truncate font-mono text-[9px] text-slate-500">
                      {screens[active]?.url ?? ''}
                    </span>
                  </div>
                  <div className="hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-navy/55 sm:flex">
                    <span>Live preview</span>
                    <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
                  </div>
                </div>

                {/* The stacked frames — fills remaining height */}
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  {screens.map((screen, i) => (
                    <PhaseFrame
                      key={screen.title}
                      index={i}
                      total={total}
                      progress={smoothProgress}
                      screen={screen}
                    />
                  ))}
                </div>

                {/* Active title + description BELOW the frame — compact */}
                <div className="relative mt-3 min-h-[52px]">
                  {screens.map((s, i) => (
                    <PhaseCaption
                      key={s.title}
                      index={i}
                      total={total}
                      progress={smoothProgress}
                      title={s.title}
                      description={s.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Filled rail behind the stepper that grows as you scroll            */
/* ------------------------------------------------------------------ */

function FilledRail({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1])
  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleY, transformOrigin: 'top' }}
      className="pointer-events-none absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-brand-emerald via-brand-emerald/70 to-brand-emerald/30"
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Left rail stepper item — clickable to jump to that phase          */
/* ------------------------------------------------------------------ */

function StepperItem({
  index,
  total,
  progress,
  title,
  isActive,
  container,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  title: string
  isActive: boolean
  container: React.RefObject<HTMLDivElement | null>
}) {
  const start = index / total
  const end = (index + 1) / total
  const dotOpacity = useTransform(
    progress,
    [start - 0.04, start, end, end + 0.04],
    [0.45, 1, 1, 0.55],
  )
  const dotScale = useTransform(
    progress,
    [start - 0.04, start, end, end + 0.04],
    [0.85, 1.2, 1.05, 0.95],
  )

  const handleJump = () => {
    const el = container.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const target =
      window.scrollY +
      rect.top +
      (rect.height * (index + 0.5)) / total -
      window.innerHeight / 2
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <li className="relative">
      <button
        type="button"
        onClick={handleJump}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Jump to ${title}`}
        className="group relative flex w-full items-start gap-4 py-2.5 pl-6 pr-2 text-left"
      >
        {/* Stepper dot */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: dotOpacity, scale: dotScale }}
          className={`absolute left-[1px] top-[14px] size-3 rounded-full ring-4 ring-brand-navy ${
            isActive ? 'bg-brand-emerald' : 'bg-white/30'
          }`}
        />

        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-baseline gap-2">
            <span
              className={`font-mono text-[10px] tabular-nums ${
                isActive ? 'text-brand-gold' : 'text-white/40'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`font-display text-[15px] font-normal leading-tight transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-white/65 group-hover:text-white'
              }`}
            >
              {title}
            </span>
          </span>
        </span>

        <ChevronRight
          className={`mt-1 size-3.5 shrink-0 transition-all ${
            isActive
              ? 'translate-x-0 text-brand-emerald opacity-100'
              : '-translate-x-1 text-white/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
          }`}
          aria-hidden="true"
        />
      </button>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/*  Right stage phase — fades + lifts a BrowserFrame as you scroll     */
/* ------------------------------------------------------------------ */

function PhaseFrame({
  index,
  total,
  progress,
  screen,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  screen: Screen
}) {
  const slice = 1 / total
  const start = index * slice
  const end = (index + 1) * slice
  const fadeIn = start + slice * 0.25
  const fadeOut = end - slice * 0.25

  const isLast = index === total - 1
  // Clamp transforms so spring overshoot can't drive opacity negative or
  // scale weirdly past the slice boundaries — fixes the empty-right-pane
  // glitch on the final phase.
  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, isLast ? 1 : 0],
    { clamp: true },
  )
  const y = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [28, 0, 0, isLast ? 0 : -20],
    { clamp: true },
  )
  const scale = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0.97, 1, 1, isLast ? 1 : 0.98],
    { clamp: true },
  )

  return (
    <motion.div
      style={{ opacity, y, scale, willChange: 'transform, opacity' }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative h-full max-h-full w-full max-w-full overflow-hidden rounded-2xl drop-shadow-[0_30px_60px_-20px_rgba(11,29,58,0.25)] [&>*]:!max-w-full [&>*]:!h-full">
        {screen.frame}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Active phase caption rendered BELOW the frame                      */
/* ------------------------------------------------------------------ */

function PhaseCaption({
  index,
  total,
  progress,
  title,
  description,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  title: string
  description: string
}) {
  const slice = 1 / total
  const start = index * slice
  const end = (index + 1) * slice
  const fadeIn = start + slice * 0.25
  const fadeOut = end - slice * 0.25

  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  )

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-0 top-0"
      aria-hidden={index !== 0}
    >
      <p className="font-display text-lg font-normal text-brand-navy">
        {title}
        <span aria-hidden="true" className="text-brand-gold">.</span>
      </p>
      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Static stacked fallback (mobile + reduced-motion)                  */
/* ------------------------------------------------------------------ */

function StackedFallback({ screens }: { screens: Screen[] }) {
  return (
    <section
      id="portal-screens"
      className="relative bg-gradient-to-b from-[#FBFAF6] via-white to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Inside The Portal
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
            See what your{' '}
            <span className="font-display italic text-brand-emerald">
              owner portal
            </span>{' '}
            looks like
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Seven real screens. The same views your leasing manager sees, with
            owner-scoped permissions.
          </p>
        </div>

        <ol className="mx-auto mt-12 max-w-3xl space-y-14 sm:space-y-16">
          {screens.map((screen, i) => (
            <li key={screen.title}>
              <div className="mb-5 flex items-baseline gap-3">
                <span className="font-display text-2xl italic text-brand-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-normal text-brand-navy sm:text-3xl">
                {screen.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                {screen.description}
              </p>
              <div className="relative mt-6">
                <div
                  aria-hidden="true"
                  className="absolute -inset-x-4 -inset-y-3 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-50/60 via-white to-emerald-50/30 blur-2xl"
                />
                {screen.frame}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
