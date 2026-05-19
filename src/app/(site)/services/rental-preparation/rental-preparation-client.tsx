'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * RevealRow — generic stagger-up wrapper used for content sections.
 * ──────────────────────────────────────────────────────────────────────── */
export function RevealRow({
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
 * BeforeAfterSlider — interactive draggable comparison slider.
 * The "before" image sits on top with a horizontally clipped width
 * controlled by a drag handle. Pointer events update the clip and
 * handle position in tandem. Falls back to a 50/50 static reveal if
 * JavaScript is disabled (no JS = no clip change, you still see both).
 * ──────────────────────────────────────────────────────────────────────── */
export function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  beforeSrc: string
  beforeAlt: string
  afterSrc: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const [pos, setPos] = useState(52)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = (clientX: number) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const raw = ((clientX - rect.left) / rect.width) * 100
    const clamped = Math.max(4, Math.min(96, raw))
    setPos(clamped)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setPos((p) => Math.max(4, p - 4))
      e.preventDefault()
    } else if (e.key === 'ArrowRight') {
      setPos((p) => Math.min(96, p + 4))
      e.preventDefault()
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative aspect-square w-full select-none overflow-hidden rounded-3xl border border-amber-200/70 bg-amber-50 shadow-xl shadow-brand-navy/10"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* After photo (bottom layer, fully visible) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 600px"
        className="object-cover"
      />

      {/* Before photo (top layer, clipped to `pos`) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />
        {/* Slight warm tint over the "before" side to underline the work-tone */}
        <div aria-hidden="true" className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />
      </div>

      {/* Label pills */}
      <span className="pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-amber-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-50 backdrop-blur-sm">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-200" />
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-brand-emerald/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-100" />
        {afterLabel}
      </span>

      {/* Drag handle — vertical line + circle grip */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 z-10 w-px bg-white/95 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${pos}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Drag to compare ${beforeLabel} and ${afterLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={handleKey}
        className="absolute top-1/2 z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-brand-navy/85 text-white shadow-xl shadow-brand-navy/40 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald focus-visible:ring-offset-2"
        style={{ left: `${pos}%` }}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18-6-6 6-6" />
          <path d="m15 6 6 6-6 6" />
        </svg>
      </div>
    </div>
  )
}
