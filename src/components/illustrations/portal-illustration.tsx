'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ListTodo,
  Users,
  DollarSign,
  BarChart3,
} from 'lucide-react'

/**
 * PortalIllustration
 * A live-feeling SaaS dashboard illustration for the Portal + Technology section.
 * Renders as HTML/CSS (not SVG) so it reads like a real app window.
 * Only small accents (chart bars) use SVG-like primitives.
 */
export function PortalIllustration({ className = '' }: { className?: string }) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Listings', icon: ListTodo, active: false },
    { label: 'Applicants', icon: Users, active: false },
    { label: 'Payments', icon: DollarSign, active: false },
    { label: 'Reports', icon: BarChart3, active: false },
  ]

  const kpis = [
    { label: 'Properties', value: '12', trend: '+2' },
    { label: 'Occupied', value: '11', trend: '+1' },
    { label: 'Revenue', value: '$18,400', trend: '+8.4%' },
  ]

  // Natural-looking monthly revenue heights (0-100 scale), Jan-Dec
  const bars = [42, 55, 48, 62, 58, 70, 66, 74, 68, 82, 76, 88]
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  const currentMonthIndex = 11 // highlight December (current month bar)

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B1D3A] shadow-2xl shadow-emerald-500/10 ${className}`}
      role="img"
      aria-label="MoveSmart operations portal dashboard preview"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#132D54] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="mx-auto flex max-w-[60%] flex-1 items-center justify-center">
          <div className="w-full truncate rounded-md bg-white/5 px-3 py-1 text-center text-[10px] font-medium text-white/50">
            app.movesmartrentals.com
          </div>
        </div>
        <div className="h-2.5 w-10" aria-hidden />
      </div>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[22%] min-w-[110px] border-r border-white/5 bg-white/[0.02] p-2.5">
          <div className="mb-3 flex items-center gap-1.5 px-1.5">
            <span className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600" />
            <span className="text-[10px] font-bold tracking-wide text-white/80">
              MoveSmart
            </span>
          </div>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${
                    item.active
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'text-white/45 hover:bg-white/5'
                  }`}
                >
                  <Icon
                    className={`h-3 w-3 ${
                      item.active ? 'text-emerald-400' : 'text-white/40'
                    }`}
                    strokeWidth={2.2}
                  />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-3 p-4">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2.5">
            {kpis.map((kpi, i) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
              >
                <div className="flex items-baseline justify-between">
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: '-80px', once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 18,
                      delay: 0.1 + i * 0.08,
                    }}
                    className="text-lg font-extrabold leading-none text-emerald-300"
                  >
                    {kpi.value}
                  </motion.span>
                  <span className="flex items-center gap-0.5 text-[9px] font-semibold text-emerald-400">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 8 L6 4 L10 8" />
                    </svg>
                    {kpi.trend}
                  </span>
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-wider text-white/40">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">
                Monthly Revenue
              </span>
              <span className="text-[9px] font-medium text-emerald-400">
                +12.4% YoY
              </span>
            </div>
            <div className="flex h-16 items-end gap-1.5">
              {bars.map((h, i) => {
                const isCurrent = i === currentMonthIndex
                return (
                  <div
                    key={months[i] + i}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ margin: '-80px', once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.05 * i,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`w-full rounded-sm ${
                        isCurrent
                          ? 'bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.45)]'
                          : 'bg-emerald-500/25'
                      }`}
                      style={{ minHeight: 2 }}
                    />
                    <span
                      className={`text-[7px] font-medium ${
                        isCurrent ? 'text-emerald-300' : 'text-white/30'
                      }`}
                    >
                      {months[i]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Activity row */}
          <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
            <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[10px] font-semibold text-white/85">
                Rent received, Unit 4B, $2,400
              </div>
              <div className="text-[8px] text-white/40">2 hours ago</div>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-300">
              Live
            </span>
          </div>
        </main>
      </div>
    </div>
  )
}
