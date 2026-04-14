'use client'

import { memo, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

import type { ServiceCardData } from '@/types/blocks'

/**
 * Homepage "Our Services" showcase. Sticky scroll-linked layout: left panel
 * morphs to whichever service entry is active in the viewport. Not a card grid.
 */

// Shared easing curve (expo-out-ish). Used across all motion transitions here.
const EASE = [0.22, 1, 0.36, 1] as const

interface HomeServicesShowcaseProps {
  services: ServiceCardData[]
  basePath?: string
}

type ServiceMeta = {
  bullets: [string, string, string]
  metric: { value: string; label: string }
}

const SERVICE_META: ServiceMeta[] = [
  {
    bullets: ['Live comparables in 20+ Canadian markets', 'Vacancy-trend modelling', 'Pricing locked before listing goes live'],
    metric: { value: '0.4%', label: 'Avg gap to market' },
  },
  {
    bullets: ['Professional photography and floor plans', 'MLS plus 50+ syndicated portals', 'Targeted paid social spend'],
    metric: { value: '50+', label: 'Listing portals' },
  },
  {
    bullets: ['Agent-led private showings', 'Saturday open houses', 'Developer and bulk-tour coordination'],
    metric: { value: '14d', label: 'Avg time to keys' },
  },
  {
    bullets: ['Standardized application intake', 'Counter-offers handled in writing', 'Owner approval before any signature'],
    metric: { value: '100%', label: 'Owner-approved' },
  },
  {
    bullets: ['Credit, employment, and reference checks', 'AML and ID verification', 'Audit-ready documentation per file'],
    metric: { value: '760', label: 'Avg credit score placed' },
  },
  {
    bullets: ['Optional rental income guarantee', 'Tenant insurance coordination', 'Pre-funded deposit protocols'],
    metric: { value: '12mo', label: 'Coverage available' },
  },
  {
    bullets: ['Provincial standard lease forms', 'Digital signature with audit trail', 'LMR and pet deposits collected at signing'],
    metric: { value: 'e-Sign', label: 'Audit-trail logged' },
  },
  {
    bullets: ['Utility transfer coordination', 'Key release logged with photo proof', 'Move-in condition report countersigned'],
    metric: { value: '38pt', label: 'Condition checklist' },
  },
  {
    bullets: ['Bulk-unit campaign strategy', 'On-site leasing team deployment', 'Real-time absorption dashboards'],
    metric: { value: '50+', label: 'Units per cycle' },
  },
]

/**
 * Visual panel.
 * - variant="full": sticky desktop panel with morphing AnimatePresence layers.
 * - variant="compact": inline mobile panel with one static visual. No morphing
 *   needed (each mobile entry renders its own instance with a fixed idx) and
 *   no big number/progress dots (already shown in the entry header).
 */
function ShowcaseVisual({
  activeIdx,
  variant = 'full',
}: {
  activeIdx: number
  variant?: 'full' | 'compact'
}) {
  const meta = SERVICE_META[activeIdx]
  const isFull = variant === 'full'

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#071228] via-[#0B1D3A] to-[#040b18] shadow-[0_30px_60px_-20px_rgba(11,29,58,0.4)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-emerald to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 -top-20 size-[280px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.20) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 size-[280px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {isFull && (
        <div className="absolute left-6 top-6 z-20 flex flex-col gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIdx ? 'w-7 bg-brand-emerald' : 'w-3 bg-white/15'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 z-10 flex items-center justify-center pb-16">
        {isFull ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full px-8"
            >
              <ServiceVisual idx={activeIdx} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full px-8">
            <ServiceVisual idx={activeIdx} />
          </div>
        )}
      </div>

      <div className="absolute right-6 top-6 z-20">
        {isFull ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-black leading-none text-brand-emerald">{meta?.metric.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/50">{meta?.metric.label}</p>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-3 backdrop-blur-sm">
            <p className="font-display text-2xl font-black leading-none text-brand-emerald">{meta?.metric.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/50">{meta?.metric.label}</p>
          </div>
        )}
      </div>

    </div>
  )
}

function ServiceVisual({ idx }: { idx: number }) {
  switch (idx) {
    case 0: return <PricingVisual />
    case 1: return <MarketingVisual />
    case 2: return <ShowingVisual />
    case 3: return <OfferVisual />
    case 4: return <ScreeningVisual />
    case 5: return <ProtectionVisual />
    case 6: return <LeaseVisual />
    case 7: return <MoveInVisual />
    case 8: return <InstitutionalVisual />
    default: return null
  }
}

function PricingVisual() {
  return (
    <svg viewBox="0 0 320 200" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Axis */}
      <line x1="20" y1="170" x2="300" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="20" y1="20" x2="20" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Comparable dots */}
      {[
        { x: 60, y: 120, color: 'rgba(255,255,255,0.25)' },
        { x: 100, y: 90, color: 'rgba(255,255,255,0.25)' },
        { x: 140, y: 110, color: 'rgba(255,255,255,0.25)' },
        { x: 180, y: 70, color: 'rgba(255,255,255,0.25)' },
        { x: 220, y: 85, color: 'rgba(255,255,255,0.25)' },
      ].map((p) => (
        <circle key={`${p.x}`} cx={p.x} cy={p.y} r="3.5" fill={p.color} />
      ))}
      {/* Recommended price line */}
      <motion.path
        d="M 20 130 L 60 110 L 100 95 L 140 85 L 180 70 L 220 60 L 260 55 L 300 50"
        fill="none"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      {/* Recommended price marker */}
      <circle cx="260" cy="55" r="6" fill="#10B981" />
      <circle cx="260" cy="55" r="11" fill="#10B981" fillOpacity="0.18" />
      <text x="270" y="40" fill="#10B981" fontSize="11" fontWeight="800">$2,850</text>
      <text x="270" y="52" fill="rgba(255,255,255,0.5)" fontSize="8">recommended</text>
      {/* Y-axis ticks */}
      {['$3.2k', '$2.8k', '$2.4k', '$2.0k'].map((t, i) => (
        <text key={t} x="2" y={40 + i * 40} fill="rgba(255,255,255,0.3)" fontSize="7">{t}</text>
      ))}
    </svg>
  )
}

function MarketingVisual() {
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Listing card */}
      <rect x="20" y="30" width="180" height="160" rx="10" fill="#132D54" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />
      {/* Photo area */}
      <rect x="28" y="38" width="164" height="78" rx="6" fill="rgba(16,185,129,0.10)" />
      {/* House silhouette */}
      <path d="M 60 96 L 110 60 L 160 96 L 160 110 L 60 110 Z" fill="#10B981" fillOpacity="0.35" />
      <rect x="100" y="84" width="20" height="26" fill="#0B1D3A" />
      {/* Photo dots */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={50 + i * 28} y="120" width="20" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
        ))}
      </g>
      <text x="32" y="148" fill="white" fontSize="9" fontWeight="700">2 BR · King West</text>
      <text x="32" y="162" fill="#10B981" fontSize="11" fontWeight="800">$2,850/mo</text>
      <text x="32" y="178" fill="rgba(255,255,255,0.4)" fontSize="7">MLS · Listed today</text>

      {/* Syndication nodes */}
      {[
        { x: 240, y: 60, label: 'MLS' },
        { x: 290, y: 90, label: 'Kijiji' },
        { x: 250, y: 130, label: 'FB' },
        { x: 295, y: 160, label: 'IG' },
      ].map((n, i) => (
        <g key={n.label}>
          <motion.line
            x1="200" y1="110" x2={n.x} y2={n.y}
            stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
          />
          <circle cx={n.x} cy={n.y} r="14" fill="#10B981" fillOpacity="0.15" />
          <circle cx={n.x} cy={n.y} r="10" fill="#0B1D3A" stroke="#10B981" strokeWidth="1.5" />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fill="#10B981" fontSize="6" fontWeight="700">{n.label}</text>
        </g>
      ))}
      {/* Center pulse */}
      <circle cx="200" cy="110" r="4" fill="#D4A853" />
    </svg>
  )
}

function ShowingVisual() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const booked: Array<[number, number]> = [[0, 1], [1, 0], [2, 2], [3, 1], [4, 0], [5, 1], [5, 2], [6, 0]]
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Day headers */}
      {days.map((d, i) => (
        <text key={`d${i}`} x={28 + i * 42} y="28" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="700">{d}</text>
      ))}
      {/* Slots grid 7 cols × 3 rows */}
      {Array.from({ length: 3 }).map((_, row) =>
        days.map((_, col) => {
          const isBooked = booked.some(([c, r]) => c === col && r === row)
          return (
            <motion.rect
              key={`s${row}-${col}`}
              x={14 + col * 42}
              y={42 + row * 42}
              width="32"
              height="32"
              rx="6"
              fill={isBooked ? '#10B981' : 'rgba(255,255,255,0.05)'}
              fillOpacity={isBooked ? 0.85 : 1}
              stroke={isBooked ? '#10B981' : 'rgba(255,255,255,0.1)'}
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * (row * 7 + col) }}
            />
          )
        })
      )}
      {/* Time labels */}
      {['10am', '2pm', '6pm'].map((t, i) => (
        <text key={t} x="306" y={62 + i * 42} fill="rgba(255,255,255,0.3)" fontSize="8">{t}</text>
      ))}
      {/* Bottom badge */}
      <g transform="translate(20, 188)">
        <rect x="0" y="0" width="120" height="22" rx="6" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
        <circle cx="11" cy="11" r="3" fill="#10B981" />
        <text x="22" y="15" fill="#10B981" fontSize="9" fontWeight="700">8 showings booked</text>
      </g>
    </svg>
  )
}

function OfferVisual() {
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Stacked offers */}
      {[
        { x: 60, y: 30, opacity: 0.4, label: 'Offer 03' },
        { x: 50, y: 50, opacity: 0.65, label: 'Offer 02' },
        { x: 40, y: 70, opacity: 1, label: 'Offer 01' },
      ].map((o, i) => (
        <g key={o.label} opacity={o.opacity}>
          <rect x={o.x} y={o.y} width="160" height="100" rx="8" fill="#132D54" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
          <text x={o.x + 12} y={o.y + 22} fill="white" fontSize="9" fontWeight="700">{o.label}</text>
          <text x={o.x + 12} y={o.y + 40} fill="rgba(255,255,255,0.5)" fontSize="7">Applicant · Verified</text>
          {i === 2 && (
            <>
              <text x={o.x + 12} y={o.y + 64} fill="#10B981" fontSize="14" fontWeight="800">$2,900/mo</text>
              <text x={o.x + 12} y={o.y + 82} fill="rgba(255,255,255,0.4)" fontSize="7">12-month term · LMR ready</text>
            </>
          )}
        </g>
      ))}
      {/* Arrow */}
      <motion.path
        d="M 215 120 L 250 120"
        stroke="#10B981" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <path d="M 244 114 L 252 120 L 244 126" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Owner approval card */}
      <g>
        <rect x="255" y="80" width="76" height="80" rx="10" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeWidth="1.5" />
        <circle cx="293" cy="105" r="14" fill="#10B981" fillOpacity="0.25" />
        <path d="M 286 105 L 291 110 L 300 100" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="293" y="135" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">Approved</text>
        <text x="293" y="148" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6">by owner</text>
      </g>

      {/* Bottom strip */}
      <rect x="20" y="190" width="200" height="3" rx="1.5" fill="rgba(16,185,129,0.2)" />
      <motion.rect
        x="20" y="190" height="3" rx="1.5" fill="#10B981"
        initial={{ width: 0 }}
        animate={{ width: 140 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </svg>
  )
}

function ScreeningVisual() {
  const r = 60
  const cx = 110
  const cy = 110
  const score = 760
  const pct = (score - 300) / (850 - 300)
  const sweep = Math.PI
  const angle = pct * sweep - Math.PI
  const nx = cx + r * Math.cos(angle)
  const ny = cy + r * Math.sin(angle)
  const dash = Math.PI * r
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Gauge track */}
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} stroke="rgba(255,255,255,0.1)" strokeWidth="10" strokeLinecap="round" fill="none" />
      <motion.path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke="#10B981" strokeWidth="10" strokeLinecap="round" fill="none"
        strokeDasharray={dash}
        initial={{ strokeDashoffset: dash }}
        animate={{ strokeDashoffset: dash * (1 - pct) }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      {/* Needle */}
      <motion.line
        x1={cx} y1={cy} x2={nx} y2={ny}
        stroke="#D4A853" strokeWidth="3" strokeLinecap="round"
        initial={{ x2: cx - r, y2: cy }}
        animate={{ x2: nx, y2: ny }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <circle cx={cx} cy={cy} r="6" fill="#0B1D3A" stroke="#D4A853" strokeWidth="2" />
      {/* Score */}
      <text x={cx} y={cy + 30} textAnchor="middle" fill="white" fontSize="22" fontWeight="900">{score}</text>
      <text x={cx} y={cy + 44} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Credit · placed avg</text>

      {/* Check list */}
      {['Employment', 'References', 'ID + AML', 'Rental history'].map((item, i) => (
        <g key={item} transform={`translate(220, ${50 + i * 30})`}>
          <circle cx="0" cy="0" r="8" fill="rgba(16,185,129,0.15)" />
          <path d="M -3 0 L -1 2 L 4 -3" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="14" y="3" fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="600">{item}</text>
        </g>
      ))}
    </svg>
  )
}

function ProtectionVisual() {
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Shield */}
      <g transform="translate(60, 30)">
        <motion.path
          d="M 70 0 L 130 22 L 130 70 C 130 110 105 140 70 158 C 35 140 10 110 10 70 L 10 22 Z"
          fill="rgba(16,185,129,0.10)"
          stroke="#10B981"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
        {/* Inner shield */}
        <path d="M 70 18 L 116 36 L 116 72 C 116 102 96 124 70 138 C 44 124 24 102 24 72 L 24 36 Z" fill="rgba(16,185,129,0.12)" />
        {/* Big check */}
        <motion.path
          d="M 50 78 L 65 92 L 92 60"
          stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </g>
      {/* Coverage bar */}
      <g transform="translate(220, 60)">
        <text x="0" y="0" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="700">RENT GUARANTEE</text>
        <rect x="0" y="10" width="100" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <motion.rect
          x="0" y="10" height="6" rx="3" fill="#10B981"
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <text x="0" y="32" fill="white" fontSize="14" fontWeight="800">12 months</text>
        <text x="0" y="46" fill="rgba(255,255,255,0.5)" fontSize="8">covered if tenant defaults</text>

        <text x="0" y="76" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="700">TENANT INSURANCE</text>
        <rect x="0" y="86" width="100" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <motion.rect
          x="0" y="86" height="6" rx="3" fill="#D4A853"
          initial={{ width: 0 }}
          animate={{ width: 88 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <text x="0" y="108" fill="white" fontSize="13" fontWeight="800">$2M liability</text>
        <text x="0" y="122" fill="rgba(255,255,255,0.5)" fontSize="8">coordinated at signing</text>
      </g>
    </svg>
  )
}

function LeaseVisual() {
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Document */}
      <rect x="60" y="20" width="180" height="180" rx="8" fill="white" />
      <rect x="60" y="20" width="180" height="32" rx="8" fill="#0B1D3A" />
      <rect x="60" y="42" width="180" height="10" fill="#0B1D3A" />
      <text x="150" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">ONTARIO STANDARD LEASE</text>
      {/* Body lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="76" y={70 + i * 14} width={i % 2 === 0 ? 140 : 110} height="3" rx="1.5" fill="#E2E8F0" />
      ))}
      {/* Signature line */}
      <line x1="76" y1="160" x2="180" y2="160" stroke="#0B1D3A" strokeWidth="1" />
      <motion.path
        d="M 80 158 C 90 150 100 162 110 156 C 120 150 130 158 140 154 C 150 150 165 158 175 152"
        fill="none"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <text x="76" y="178" fill="rgba(11,29,58,0.5)" fontSize="7">Tenant signature · e-signed today</text>

      {/* e-Signed badge */}
      <g transform="translate(190, 170)">
        <rect x="0" y="0" width="44" height="22" rx="6" fill="#10B981" />
        <text x="22" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">e-Signed</text>
      </g>

      {/* Audit trail dots */}
      <g transform="translate(20, 30)">
        {['Sent', 'Viewed', 'Signed'].map((s, i) => (
          <g key={s} transform={`translate(0, ${i * 40})`}>
            <circle cx="6" cy="6" r="5" fill="#10B981" fillOpacity={0.3 + i * 0.2} />
            <text x="16" y="9" fill="rgba(255,255,255,0.6)" fontSize="7" fontWeight="600">{s}</text>
            <text x="16" y="19" fill="rgba(255,255,255,0.3)" fontSize="6">{i === 0 ? '9:14am' : i === 1 ? '11:03am' : '2:47pm'}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

function MoveInVisual() {
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Key */}
      <g transform="translate(40, 40)">
        <motion.g
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformOrigin: '50px 50px' }}
        >
          {/* Bow */}
          <circle cx="40" cy="50" r="22" fill="none" stroke="#D4A853" strokeWidth="6" />
          <circle cx="40" cy="50" r="8" fill="#0B1D3A" stroke="#D4A853" strokeWidth="3" />
          {/* Shaft */}
          <rect x="62" y="46" width="60" height="8" rx="2" fill="#D4A853" />
          {/* Teeth */}
          <rect x="100" y="54" width="6" height="10" fill="#D4A853" />
          <rect x="112" y="54" width="6" height="14" fill="#D4A853" />
        </motion.g>
        {/* Tag */}
        <g transform="translate(8, 100)">
          <rect x="0" y="0" width="64" height="22" rx="3" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" />
          <text x="32" y="14" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="800">UNIT 4B</text>
        </g>
      </g>

      {/* Checklist */}
      <g transform="translate(180, 30)">
        <text x="0" y="0" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="800">MOVE-IN CHECKLIST</text>
        {['Hydro transfer', 'Gas + water', 'Locks rotated', 'Photos archived', 'Report signed'].map((item, i) => (
          // Static <g> owns positioning; inner motion.g animates only opacity
          // so framer-motion doesn't overwrite our translate().
          <g key={item} transform={`translate(0, ${20 + i * 26})`}>
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
            >
              <circle cx="8" cy="8" r="8" fill="rgba(16,185,129,0.18)" />
              <path d="M 4 8 L 7 11 L 13 5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="22" y="11" fill="white" fontSize="9" fontWeight="600" opacity="0.85">{item}</text>
            </motion.g>
          </g>
        ))}
      </g>

      {/* Bottom completion bar */}
      <rect x="20" y="194" width="300" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      <motion.rect
        x="20" y="194" height="4" rx="2" fill="#10B981"
        initial={{ width: 0 }}
        animate={{ width: 300 }}
        transition={{ duration: 1.4, delay: 0.4 }}
      />
    </svg>
  )
}

function InstitutionalVisual() {
  return (
    <svg viewBox="0 0 340 220" className="mx-auto block w-full max-w-[340px]" aria-hidden="true">
      {/* Building */}
      <g transform="translate(30, 20)">
        <rect x="0" y="20" width="80" height="170" rx="3" fill="#132D54" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
        <rect x="0" y="20" width="80" height="10" fill="#0B1D3A" />
        {/* Window grid 4×7 */}
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => {
            const occupied = (row * 4 + col) < 22 // 22/28 occupied
            return (
              <motion.rect
                key={`w-${row}-${col}`}
                x={6 + col * 18}
                y={36 + row * 22}
                width="14"
                height="16"
                rx="2"
                fill={occupied ? '#10B981' : 'rgba(255,255,255,0.12)'}
                fillOpacity={occupied ? 0.7 : 1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.05 * (row * 4 + col) }}
              />
            )
          })
        )}
      </g>

      {/* Absorption stats */}
      <g transform="translate(140, 30)">
        <text x="0" y="0" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="800">ABSORPTION</text>
        <text x="0" y="32" fill="#10B981" fontSize="32" fontWeight="900">22<tspan fill="rgba(255,255,255,0.4)" fontSize="20">/28</tspan></text>
        <text x="0" y="50" fill="rgba(255,255,255,0.5)" fontSize="8">units leased · 60-day cycle</text>

        {/* Mini bar chart */}
        <g transform="translate(0, 70)">
          <text x="0" y="0" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="700">WEEKLY LEASES</text>
          {[3, 4, 5, 6, 4].map((h, i) => (
            <motion.rect
              key={i}
              x={i * 22}
              y={50 - h * 7}
              width="14"
              height={h * 7}
              rx="2"
              fill={i === 3 ? '#D4A853' : '#10B981'}
              fillOpacity={i === 3 ? 1 : 0.7}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              style={{ transformOrigin: `${i * 22 + 7}px 50px` }}
            />
          ))}
          <line x1="0" y1="52" x2="110" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>

        <g transform="translate(0, 140)">
          <rect x="0" y="0" width="140" height="22" rx="6" fill="rgba(212,168,83,0.15)" stroke="rgba(212,168,83,0.4)" strokeWidth="1" />
          <text x="10" y="14" fill="#D4A853" fontSize="9" fontWeight="700">On-site team deployed</text>
        </g>
      </g>
    </svg>
  )
}

interface ServiceEntryProps {
  service: ServiceCardData
  idx: number
  isActive: boolean
  meta: ServiceMeta
  href: string
  entryRef: (el: HTMLDivElement | null) => void
}

// Memoized so an activeIdx change in the parent doesn't re-render all 9 entries.
// Only entries whose `isActive` flag flipped will re-render.
const ServiceEntry = memo(function ServiceEntry({
  service,
  idx,
  isActive,
  meta,
  href,
  entryRef,
}: ServiceEntryProps) {
  return (
    <div ref={entryRef} data-idx={idx} className="relative py-10 lg:py-14">
      <div className="absolute left-0 top-0 h-full w-px bg-slate-200/80 lg:left-[-1px]" aria-hidden="true" />
      <motion.div
        className="absolute left-0 top-0 w-[2px] origin-top bg-brand-emerald lg:left-[-1px]"
        initial={false}
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        style={{ height: '100%' }}
        transition={{ duration: 0.5, ease: EASE }}
        aria-hidden="true"
      />

      <motion.div
        className="pl-7 lg:pl-10"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0.45 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="flex items-baseline gap-3">
          <span className={`font-display text-5xl font-black leading-none lg:text-6xl transition-colors duration-500 ${isActive ? 'text-brand-emerald' : 'text-brand-navy/15'}`}>
            {String(idx + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
          {service.title}
        </h3>

        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[17px]">
          {service.shortDescription}
        </p>

        <ul className="mt-6 space-y-2.5">
          {meta.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                <Check className="size-3 text-brand-emerald" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-[15px] leading-relaxed text-slate-700">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 lg:hidden">
          <ShowcaseVisual activeIdx={idx} variant="compact" />
        </div>

        <Link
          href={href}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-emerald hover:text-emerald-700"
        >
          <span>Explore {service.title.toLowerCase()}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  )
})

export function HomeServicesShowcase({ services, basePath }: HomeServicesShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  const list = useMemo(() => services.slice(0, 9), [services])
  const href = (slug: string) =>
    basePath ? `${basePath}/${slug}/` : `/services/${slug}/`

  // Single IntersectionObserver owns all 9 entries. On each batch of entries
  // we receive, we pick the topmost-visible entry and promote it to active.
  // This fixes the effect-ordering race that per-entry `useInView` causes
  // during fast scrolls (children can overwrite each other in wrong order).
  useEffect(() => {
    const els = entryRefs.current.filter((el): el is HTMLDivElement => el !== null)
    if (els.length === 0) return

    // Track which entries are currently in the center band.
    const inBand = new Set<HTMLDivElement>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target as HTMLDivElement)
          else inBand.delete(e.target as HTMLDivElement)
        }
        if (inBand.size === 0) return
        // Pick the topmost element still in the band (smallest top offset).
        let topmost: HTMLDivElement | null = null
        let topmostY = Infinity
        for (const el of inBand) {
          const y = el.getBoundingClientRect().top
          if (y < topmostY) { topmostY = y; topmost = el }
        }
        if (topmost) {
          const idx = Number(topmost.dataset.idx)
          if (!Number.isNaN(idx)) {
            setActiveIdx((prev) => (prev === idx ? prev : idx))
          }
        }
      },
      // Band roughly aligns with natural reading focus (upper third of viewport),
      // so the "active" entry tracks what the user is actually reading.
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 },
    )

    for (const el of els) observer.observe(el)
    return () => observer.disconnect()
  }, [list.length])

  const setEntryRef = (idx: number) => (el: HTMLDivElement | null) => {
    entryRefs.current[idx] = el
  }

  return (
    <MotionConfig reducedMotion="user">
    <section className="relative overflow-x-clip bg-white py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(#0B1D3A 1px, transparent 1px), linear-gradient(90deg, #0B1D3A 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-32 size-[400px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Our Services
          </p>
          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
            Full-Cycle Leasing,{' '}
            <span className="font-display italic text-brand-emerald">
              Executed With Discipline
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Nine concentrated leasing services. Listing to move-in. Nothing beyond. Scroll to see each one in motion.
          </p>
          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-brand-emerald to-transparent" />
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24">
              <div className="relative">
                <ShowcaseVisual activeIdx={activeIdx} />
                <div className="pointer-events-none absolute inset-x-5 bottom-5 z-30 rounded-2xl border border-white/8 bg-brand-navy/85 px-5 py-3.5 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-emerald/90">
                    Now Showing · {String(activeIdx + 1).padStart(2, '0')} of 09
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="mt-0.5 font-display text-xl font-normal text-white"
                    >
                      {list[activeIdx]?.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </aside>

          <div className="relative lg:col-span-6">
            {list.map((service, idx) => (
              <ServiceEntry
                key={`${service.slug}-${idx}`}
                service={service}
                idx={idx}
                isActive={activeIdx === idx}
                meta={SERVICE_META[idx] ?? SERVICE_META[0]}
                href={href(service.slug)}
                entryRef={setEntryRef(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  )
}
