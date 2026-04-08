'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EMERALD = '#10B981'
const GOLD = '#D4A853'

// Line chart data points (x, y) within a 220×80 viewport
const LINE_POINTS = [
  [0, 70], [30, 58], [60, 62], [90, 44], [120, 38], [150, 24], [180, 18], [210, 8],
] as const

function buildLinePath(pts: readonly (readonly [number, number])[]): string {
  return pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ')
}

function buildAreaPath(pts: readonly (readonly [number, number])[]): string {
  const line = buildLinePath(pts)
  const lastX = pts[pts.length - 1][0]
  return `${line} L ${lastX} 80 L 0 80 Z`
}

// Monthly bar data (normalised heights out of 40px)
const BAR_HEIGHTS = [22, 28, 18, 32, 26, 38, 30, 40, 34, 36, 38, 42]
const BAR_MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

// Donut: circumference for r=26
const DONUT_R = 26
const DONUT_C = 2 * Math.PI * DONUT_R // ≈ 163.4
const OCCUPANCY = 0.98
const DASH_ON = DONUT_C * OCCUPANCY
const DASH_OFF = DONUT_C - DASH_ON

export function HeroDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const linePath = buildLinePath(LINE_POINTS)
  const areaPath = buildAreaPath(LINE_POINTS)
  // total path length approximate for a draw animation
  const PATH_LEN = 380

  return (
    <>
      <style>{`
        @keyframes dash-draw {
          from { stroke-dashoffset: ${PATH_LEN}; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes dash-flow {
          from { stroke-dashoffset: 20; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes donut-fill {
          from { stroke-dasharray: 0 ${DONUT_C}; }
          to   { stroke-dasharray: ${DASH_ON} ${DASH_OFF}; }
        }
        @keyframes bar-rise {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        .chart-line {
          stroke-dasharray: ${PATH_LEN};
          stroke-dashoffset: ${PATH_LEN};
          animation: dash-draw 1.6s cubic-bezier(0.4,0,0.2,1) 0.6s forwards;
        }
        .chart-line-active {
          stroke-dashoffset: 0;
        }
        .donut-ring {
          stroke-dasharray: 0 ${DONUT_C};
          animation: donut-fill 1.4s cubic-bezier(0.4,0,0.2,1) 0.8s forwards;
        }
        .donut-ring-active {
          stroke-dasharray: ${DASH_ON} ${DASH_OFF};
        }
        .bar-animated {
          transform-origin: bottom;
          transform: scaleY(0);
          animation: bar-rise 0.6s ease-out forwards;
        }
      `}</style>

      <motion.div
        ref={ref}
        className="w-full select-none"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        {/* Dashboard card */}
        <div
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{
            background: 'linear-gradient(160deg, #0f2545 0%, #0B1D3A 60%, #081628 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* ── Browser chrome ── */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div
              className="rounded-md px-3 py-0.5 text-[10px] font-medium tracking-wide text-white/30"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              movesmart.ca/dashboard
            </div>
            <div className="w-14" />
          </div>

          {/* ── App body: sidebar + main ── */}
          <div className="flex" style={{ minHeight: 320 }}>
            {/* Sidebar */}
            <div
              className="flex w-[110px] shrink-0 flex-col gap-0.5 px-2 py-4"
              style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Logo mark */}
              <div className="mb-4 flex items-center gap-1.5 px-2">
                <div
                  className="flex h-5 w-5 items-center justify-center rounded"
                  style={{ background: EMERALD }}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                    <path d="M2 10 L6 3 L10 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 10 L4 7 L8 7 L8 10" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-white/80">MoveSmart</span>
              </div>

              {/* Nav items */}
              {[
                { label: 'Dashboard', icon: 'M3 3h6v4H3zM3 9h3v3H3zM8 9h3v3H8z', active: true },
                { label: 'Properties', icon: 'M2 10V5l4-3 4 3v5M5 10V7h4v3', active: false },
                { label: 'Tenants', icon: 'M6 5a2 2 0 100-4 2 2 0 000 4zM2 11a4 4 0 018 0', active: false },
                { label: 'Finances', icon: 'M2 8h8M6 4v8M4 6l2-2 2 2', active: false },
              ].map(({ label, icon, active }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                  style={{
                    background: active ? `${EMERALD}18` : 'transparent',
                    borderLeft: active ? `2px solid ${EMERALD}` : '2px solid transparent',
                  }}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" fill="none" stroke={active ? EMERALD : 'rgba(255,255,255,0.35)'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon} />
                  </svg>
                  <span className="text-[9px] font-medium" style={{ color: active ? EMERALD : 'rgba(255,255,255,0.4)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col gap-3 p-3">
              {/* Stat cards row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Properties', value: '12', icon: 'M2 10V5l4-3 4 3v5', color: GOLD },
                  { label: 'Occupancy', value: '98%', icon: 'M6 2a4 4 0 100 8 4 4 0 000-8zM3 10a5 5 0 0110 0', color: EMERALD },
                  { label: 'Revenue', value: '$24.8K', icon: 'M6 1v10M3 3h6M3 8h6', color: '#60A5FA' },
                ].map(({ label, value, icon, color }, idx) => (
                  <motion.div
                    key={label}
                    className="rounded-xl p-2.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[9px] font-medium text-white/40">{label}</span>
                      <div className="flex h-4 w-4 items-center justify-center rounded" style={{ background: `${color}18` }}>
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={icon} />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-white">{value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-5 gap-2">
                {/* Line chart — col span 3 */}
                <div
                  className="col-span-3 rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[9px] font-semibold text-white/60">Rental Income</p>
                    <span className="rounded px-1.5 py-0.5 text-[8px] font-medium" style={{ background: `${EMERALD}18`, color: EMERALD }}>
                      +18.4%
                    </span>
                  </div>
                  <svg viewBox="0 0 220 80" className="w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={EMERALD} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={EMERALD} stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[20, 40, 60].map(y => (
                      <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    ))}
                    {/* Area fill */}
                    <path d={areaPath} fill="url(#areaGrad)" />
                    {/* Line */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke={EMERALD}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={inView ? 'chart-line chart-line-active' : 'chart-line'}
                      style={inView ? { strokeDasharray: PATH_LEN, strokeDashoffset: 0, animation: 'dash-draw 1.6s cubic-bezier(0.4,0,0.2,1) 0.6s both' } : {}}
                    />
                    {/* End dot */}
                    {inView && (
                      <motion.circle
                        cx={LINE_POINTS[LINE_POINTS.length - 1][0]}
                        cy={LINE_POINTS[LINE_POINTS.length - 1][1]}
                        r="3"
                        fill={EMERALD}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 2.1, duration: 0.3 }}
                      />
                    )}
                  </svg>
                </div>

                {/* Donut chart — col span 2 */}
                <div
                  className="col-span-2 flex flex-col items-center justify-center rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p className="mb-2 text-[9px] font-semibold text-white/60">Occupancy Rate</p>
                  <div className="relative flex items-center justify-center">
                    <svg viewBox="0 0 70 70" className="h-16 w-16 -rotate-90">
                      {/* Track */}
                      <circle
                        cx="35" cy="35" r={DONUT_R}
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="6"
                      />
                      {/* Fill */}
                      <circle
                        cx="35" cy="35" r={DONUT_R}
                        fill="none"
                        stroke={EMERALD}
                        strokeWidth="6"
                        strokeLinecap="round"
                        className={inView ? 'donut-ring' : ''}
                        style={inView ? { animation: 'donut-fill 1.4s cubic-bezier(0.4,0,0.2,1) 0.8s both' } : { strokeDasharray: `0 ${DONUT_C}` }}
                      />
                      {/* Gold accent tip */}
                      <circle
                        cx="35" cy="35" r={DONUT_R}
                        fill="none"
                        stroke={GOLD}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`4 ${DONUT_C - 4}`}
                        strokeDashoffset={-(DASH_ON - 2)}
                        opacity={inView ? 1 : 0}
                        style={{ transition: 'opacity 0.3s 2.2s' }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-sm font-bold text-white">98%</span>
                      <span className="text-[7px] text-white/40">filled</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini bar chart */}
              <div
                className="rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p className="mb-2 text-[9px] font-semibold text-white/60">Monthly Rent Collection</p>
                <div className="flex items-end gap-[3px]" style={{ height: 44 }}>
                  {BAR_HEIGHTS.map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                      <motion.div
                        className="w-full rounded-sm"
                        style={{
                          height: h,
                          background: i === BAR_HEIGHTS.length - 1
                            ? EMERALD
                            : i === BAR_HEIGHTS.length - 2
                            ? `${EMERALD}99`
                            : `${EMERALD}44`,
                          transformOrigin: 'bottom',
                          scaleY: 0,
                        }}
                        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
                      />
                      <span className="text-[6px] text-white/25">{BAR_MONTHS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
