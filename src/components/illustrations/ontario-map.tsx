'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Geographically accurate simplified Ontario outline.
 *
 * Coordinate space: 0 0 500 560 (width x height)
 * Derived from real Ontario boundary landmarks:
 *  - Far NW corner (Manitoba border + Hudson Bay):  ~(30, 30)
 *  - Hudson Bay coast sweeps NE to ~(390, 60)
 *  - James Bay south coast: ~(390,60) → (310, 200)
 *  - Quebec border runs south: ~(310,200) → (340, 340)
 *  - St. Lawrence / Quebec SE corner: ~(340, 340) → (310, 380)
 *  - Ontario-Quebec south: ~(310, 380) → (280, 400)
 *  - Lake Ontario north shore (east): ~(280,400) → (220,410)
 *  - Niagara peninsula: ~(220,410) → (210,430) → (195,435)
 *  - Lake Erie north shore: ~(195,435) → (120,420)
 *  - Lake Huron east shore (Georgian Bay): complex indent
 *  - North shore of Lake Huron → Lake Superior → NW corner
 *
 * Cities are mapped proportionally onto this 500×560 viewBox.
 */

// Ontario province outline - ~50 anchor points
const ONTARIO_PATH = `
  M 30,52
  L 60,40
  L 100,32
  L 150,28
  L 200,26
  L 250,28
  L 290,34
  L 330,44
  L 370,58
  L 395,72
  L 390,100
  L 375,130
  L 355,160
  L 330,185
  L 315,210
  L 320,240
  L 330,270
  L 338,310
  L 342,348
  L 330,372
  L 310,390
  L 285,402
  L 258,408
  L 238,412
  L 222,415
  L 210,428
  L 198,438
  L 182,436
  L 162,428
  L 142,422
  L 122,418
  L 105,410
  C 98,400 90,388 88,375
  C 86,360 92,348 98,336
  L 110,318
  C 118,305 120,292 116,278
  C 112,264 102,255 90,248
  L 72,238
  C 58,230 46,218 40,204
  C 34,190 34,174 38,160
  L 44,142
  C 50,126 52,110 48,94
  L 40,72
  Z
`

// City pins - (x, y) in the 500×560 viewBox
const CITIES = [
  { id: 'toronto',    label: 'Toronto',    x: 232, y: 408, size: 'lg',  color: '#D4A853', delay: 0.2 },
  { id: 'ottawa',     label: 'Ottawa',     x: 310, y: 375, size: 'md',  color: '#10B981', delay: 0.5 },
  { id: 'mississauga',label: 'Mississauga',x: 218, y: 416, size: 'md',  color: '#10B981', delay: 0.8 },
  { id: 'hamilton',   label: 'Hamilton',   x: 208, y: 426, size: 'sm',  color: '#10B981', delay: 1.0 },
  { id: 'brampton',   label: 'Brampton',   x: 222, y: 410, size: 'sm',  color: '#10B981', delay: 1.2 },
  { id: 'london',     label: 'London',     x: 170, y: 418, size: 'sm',  color: '#10B981', delay: 1.4 },
  { id: 'kitchener',  label: 'Kitchener',  x: 193, y: 418, size: 'sm',  color: '#10B981', delay: 1.6 },
]

// Connection lines between key city pairs [fromId, toId]
const CONNECTIONS: [string, string][] = [
  ['toronto', 'ottawa'],
  ['toronto', 'mississauga'],
  ['toronto', 'hamilton'],
  ['toronto', 'brampton'],
  ['mississauga', 'brampton'],
  ['london', 'kitchener'],
  ['kitchener', 'mississauga'],
]

const SIZE_MAP = {
  lg: { r: 7, ring: 18 },
  md: { r: 5, ring: 14 },
  sm: { r: 4, ring: 11 },
}

function getCityById(id: string) {
  return CITIES.find(c => c.id === id)!
}

export function OntarioMap({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <svg
      ref={ref}
      viewBox="0 0 500 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ontario province map showing 20+ cities served"
    >
      <defs>
        <linearGradient id="ontario-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0B1D3A" stopOpacity="0.08" />
        </linearGradient>

        <filter id="pin-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>{`
          @keyframes dash-flow {
            from { stroke-dashoffset: 40; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes soft-ping {
            0%   { transform: scale(1);   opacity: 0.7; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .connection-line {
            animation: dash-flow 1.8s linear infinite;
          }
          .city-ring {
            transform-box: fill-box;
            transform-origin: center;
            animation: soft-ping 2s ease-out infinite;
          }
        `}</style>
      </defs>

      {/* Province outline */}
      <motion.path
        d={ONTARIO_PATH}
        fill="url(#ontario-fill)"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      {/* Connection lines */}
      {CONNECTIONS.map(([fromId, toId]) => {
        const from = getCityById(fromId)
        const to   = getCityById(toId)
        const lineDelay = Math.max(from.delay, to.delay) + 0.15
        return (
          <motion.line
            key={`${fromId}-${toId}`}
            x1={from.x} y1={from.y}
            x2={to.x}   y2={to.y}
            stroke="#10B981"
            strokeWidth="0.8"
            strokeOpacity="0.45"
            strokeDasharray="4 4"
            className="connection-line"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: lineDelay, duration: 0.4 }}
          />
        )
      })}

      {/* City pins */}
      {CITIES.map((city) => {
        const { r, ring } = SIZE_MAP[city.size as keyof typeof SIZE_MAP]
        const isGold = city.color === '#D4A853'
        return (
          <motion.g
            key={city.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: city.delay, duration: 0.35, type: 'spring', stiffness: 260, damping: 18 }}
            style={{ transformBox: 'fill-box', transformOrigin: `${city.x}px ${city.y}px` }}
          >
            {/* Pulsing ring */}
            <circle
              cx={city.x}
              cy={city.y}
              r={ring}
              fill="none"
              stroke={city.color}
              strokeWidth="1.2"
              className="city-ring"
              style={{ animationDelay: `${city.delay * 0.4}s` }}
            />

            {/* Pin dot */}
            <circle
              cx={city.x}
              cy={city.y}
              r={r}
              fill={city.color}
              filter="url(#pin-glow)"
            />

            {/* Inner highlight */}
            <circle
              cx={city.x - r * 0.3}
              cy={city.y - r * 0.3}
              r={r * 0.4}
              fill="white"
              fillOpacity="0.55"
            />

            {/* Label */}
            <text
              x={city.x + r + 4}
              y={city.y + 3.5}
              fontSize={isGold ? '8.5' : '7'}
              fontFamily="system-ui, sans-serif"
              fontWeight={isGold ? '700' : '500'}
              fill={city.color}
              fillOpacity="0.9"
            >
              {city.label}
            </text>
          </motion.g>
        )
      })}

      {/* "20+ Cities" badge - fades in after all pins */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.1, duration: 0.5 }}
      >
        <rect x="18" y="455" width="96" height="26" rx="6" fill="#D4A853" fillOpacity="0.15" stroke="#D4A853" strokeWidth="1" strokeOpacity="0.6" />
        <text
          x="66"
          y="472"
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          fill="#D4A853"
          letterSpacing="0.5"
        >
          20+ CITIES COVERED
        </text>
      </motion.g>

      {/* Province label */}
      <motion.text
        x="160"
        y="300"
        textAnchor="middle"
        fontSize="11"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fill="white"
        fillOpacity="0.18"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        ONTARIO
      </motion.text>
    </svg>
  )
}
