'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Globe, MapPin } from 'lucide-react'

/**
 * NorthAmericaShowcase
 *
 * A "digital feature map" of MoveSmart's North-American footprint.
 * SVG outline of Canada + US with animated glowing city nodes.
 */

interface CityNode {
  name: string
  region: string
  country: 'CA' | 'US'
  /** Position in the 1000 x 600 viewBox space */
  x: number
  y: number
  featured?: boolean
}

const CITY_NODES: CityNode[] = [
  // Canada (north band, ~y 200-280)
  { name: 'Vancouver', region: 'BC',  country: 'CA', x: 120, y: 245, featured: true },
  { name: 'Calgary',   region: 'AB',  country: 'CA', x: 220, y: 245 },
  { name: 'Edmonton',  region: 'AB',  country: 'CA', x: 232, y: 220 },
  { name: 'Winnipeg',  region: 'MB',  country: 'CA', x: 380, y: 270 },
  { name: 'Toronto',   region: 'ON',  country: 'CA', x: 545, y: 295, featured: true },
  { name: 'Ottawa',    region: 'ON',  country: 'CA', x: 600, y: 270 },
  { name: 'Montreal',  region: 'QC',  country: 'CA', x: 635, y: 260 },
  { name: 'Halifax',   region: 'NS',  country: 'CA', x: 760, y: 290 },

  // USA (mid+south band, ~y 320-510)
  { name: 'Seattle',     region: 'WA', country: 'US', x: 120, y: 330 },
  { name: 'San Francisco', region: 'CA', country: 'US', x: 120, y: 410 },
  { name: 'Los Angeles', region: 'CA', country: 'US', x: 160, y: 460, featured: true },
  { name: 'Phoenix',     region: 'AZ', country: 'US', x: 215, y: 470 },
  { name: 'Denver',      region: 'CO', country: 'US', x: 290, y: 420 },
  { name: 'Dallas',      region: 'TX', country: 'US', x: 400, y: 490 },
  { name: 'Houston',     region: 'TX', country: 'US', x: 430, y: 520 },
  { name: 'Austin',      region: 'TX', country: 'US', x: 405, y: 510 },
  { name: 'Chicago',     region: 'IL', country: 'US', x: 470, y: 380 },
  { name: 'Atlanta',     region: 'GA', country: 'US', x: 555, y: 470 },
  { name: 'Charlotte',   region: 'NC', country: 'US', x: 600, y: 440 },
  { name: 'Miami',       region: 'FL', country: 'US', x: 625, y: 540, featured: true },
  { name: 'New York',    region: 'NY', country: 'US', x: 660, y: 370, featured: true },
  { name: 'Jersey City', region: 'NJ', country: 'US', x: 655, y: 378 },
  { name: 'Boston',      region: 'MA', country: 'US', x: 695, y: 350 },
]

const TOTAL_CITIES = CITY_NODES.length
const FEATURED_CITIES = CITY_NODES.filter((c) => c.featured)

export function NorthAmericaShowcase() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="relative isolate overflow-hidden bg-brand-navy py-16 text-white md:py-24"
      aria-label="North America Footprint"
    >
      {/* Layered atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#06122a] via-[#0B1D3A] to-[#0a1e3d]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-1/3 size-[560px] -translate-y-1/2 rounded-full bg-brand-emerald/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-[480px] rounded-full bg-brand-gold/[0.07] blur-3xl" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
            <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
            <Globe className="size-3.5" aria-hidden="true" />
            North America Footprint
            <span aria-hidden="true" className="block h-px w-8 bg-brand-gold/60" />
          </p>
          <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
            One operator,{' '}
            <span className="font-display italic text-brand-emerald">
              two countries
            </span>
            <span aria-hidden="true" className="text-brand-gold">.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            MoveSmart Rentals is a leasing brokerage operating across Canada and
            the United States. Same disciplined playbook, same technology stack,
            same standard of execution — coast to coast, border to border.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="relative aspect-[1000/600] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] shadow-[0_60px_180px_-40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <svg
              viewBox="0 0 1000 600"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {/* Gradient defs */}
              <defs>
                <radialGradient id="nodePulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="nodePulseGold" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4A853" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#D4A853" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="connection" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                  <stop offset="50%" stopColor="#10B981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Stylised Canada + USA outline (simplified silhouette) */}
              <g
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(16,185,129,0.35)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              >
                {/* Canada outline (north) */}
                <path d="M 70 220 L 110 195 L 180 185 L 250 180 L 320 195 L 400 200 L 470 205 L 540 200 L 600 195 L 660 205 L 720 215 L 780 230 L 810 250 L 820 280 L 810 300 L 770 305 L 720 300 L 660 305 L 600 310 L 540 315 L 470 320 L 400 320 L 320 320 L 250 320 L 180 315 L 110 305 L 70 290 Z" />
                {/* USA outline (south, beneath the border line at ~y320) */}
                <path d="M 95 325 L 160 325 L 230 325 L 310 325 L 390 325 L 470 325 L 540 325 L 600 325 L 660 325 L 720 325 L 760 330 L 780 360 L 770 410 L 730 470 L 690 510 L 660 540 L 620 555 L 580 555 L 520 545 L 460 540 L 410 545 L 360 540 L 310 530 L 270 510 L 230 490 L 195 470 L 165 445 L 140 420 L 120 395 L 105 365 Z" />
              </g>

              {/* US-Canada border */}
              <line
                x1="95"
                y1="320"
                x2="780"
                y2="320"
                stroke="rgba(212,168,83,0.45)"
                strokeWidth="1"
                strokeDasharray="5 4"
              />

              {/* Subtle dotted lat/lon overlay */}
              <g stroke="rgba(255,255,255,0.05)" strokeDasharray="2 6">
                <line x1="0" y1="180" x2="1000" y2="180" />
                <line x1="0" y1="320" x2="1000" y2="320" />
                <line x1="0" y1="460" x2="1000" y2="460" />
                <line x1="200" y1="100" x2="200" y2="600" />
                <line x1="400" y1="100" x2="400" y2="600" />
                <line x1="600" y1="100" x2="600" y2="600" />
                <line x1="800" y1="100" x2="800" y2="600" />
              </g>

              {/* Animated arc connections between featured CA <-> US cities */}
              <g fill="none" strokeWidth="1" opacity="0.55">
                {/* Toronto → New York */}
                <path
                  d="M 545 295 Q 600 270 660 370"
                  stroke="url(#connection)"
                  strokeDasharray="4 6"
                >
                  {!prefersReducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-100"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>
                {/* Vancouver → Los Angeles */}
                <path
                  d="M 120 245 Q 80 360 160 460"
                  stroke="url(#connection)"
                  strokeDasharray="4 6"
                >
                  {!prefersReducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-100"
                      dur="7s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>
                {/* Toronto → Miami */}
                <path
                  d="M 545 295 Q 600 450 625 540"
                  stroke="url(#connection)"
                  strokeDasharray="4 6"
                >
                  {!prefersReducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-100"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>
              </g>

              {/* City nodes */}
              {CITY_NODES.map((city, i) => {
                const isFeatured = !!city.featured
                const pulseR = isFeatured ? 22 : 14
                const dotR = isFeatured ? 4 : 2.5
                const fill = city.country === 'CA' ? '#10B981' : '#D4A853'
                const pulseFill =
                  city.country === 'CA' ? 'url(#nodePulse)' : 'url(#nodePulseGold)'
                return (
                  <g key={city.name}>
                    {/* Soft outer pulse */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={pulseR}
                      fill={pulseFill}
                    >
                      {!prefersReducedMotion && (
                        <animate
                          attributeName="r"
                          values={`${pulseR};${pulseR + 6};${pulseR}`}
                          dur={isFeatured ? '2.4s' : '3.2s'}
                          begin={`${i * 0.18}s`}
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>
                    {/* Inner dot */}
                    <circle cx={city.x} cy={city.y} r={dotR} fill={fill} />
                    {/* Featured city label */}
                    {isFeatured && (
                      <g>
                        <rect
                          x={city.x + 10}
                          y={city.y - 16}
                          width="76"
                          height="22"
                          rx="11"
                          fill="rgba(11,29,58,0.85)"
                          stroke="rgba(16,185,129,0.4)"
                          strokeWidth="1"
                        />
                        <text
                          x={city.x + 48}
                          y={city.y - 1}
                          textAnchor="middle"
                          fill="#fff"
                          fontFamily="ui-sans-serif, system-ui, sans-serif"
                          fontSize="10"
                          fontWeight="600"
                          letterSpacing="0.5"
                        >
                          {city.name}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Country legend overlay */}
            <div className="pointer-events-none absolute left-5 top-5 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
                <span className="size-2 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Canada
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
                <span className="size-2 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(212,168,83,0.8)]" />
                United States
              </div>
            </div>

            {/* Live counter overlay */}
            <div className="pointer-events-none absolute right-5 top-5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-right backdrop-blur-md">
              <p className="font-display text-2xl font-normal tabular-nums text-white">
                {TOTAL_CITIES}+
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">
                Active markets
              </p>
            </div>

            {/* Coordinates HUD bottom-left */}
            <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              N · 49.2827° · W · 123.1207°
            </div>

            {/* Status pill bottom-right */}
            <div className="pointer-events-none absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand-emerald" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
                Live network
              </span>
            </div>
          </div>

          {/* Featured cities below the map */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {FEATURED_CITIES.map((city) => (
              <div
                key={city.name}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm transition-colors hover:border-brand-emerald/30 hover:bg-white/[0.06]"
              >
                <MapPin
                  className={`size-4 shrink-0 ${
                    city.country === 'CA' ? 'text-brand-emerald' : 'text-brand-gold'
                  }`}
                  aria-hidden="true"
                  strokeWidth={2}
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-normal text-white">
                    {city.name}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                    {city.region}, {city.country === 'CA' ? 'CAN' : 'USA'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
