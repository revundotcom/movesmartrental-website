import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface DashboardCardProps {
  /** Label e.g. "Organic Sessions" */
  label: string
  /** Display value. Omit when `placeholder` is true. */
  value?: string | number
  /** Small descriptive text, e.g. "Last 30 days · GA4 Reporting API" */
  subtext?: string
  /**
   * If true, the card renders in its placeholder state with a dashed border
   * and "Connect to populate" messaging instead of a numeric value.
   */
  placeholder?: boolean
  /** Optional external link; card becomes clickable. */
  href?: string
  /** Direction of the trend arrow. */
  trend?: 'up' | 'down' | 'neutral'
  /** Period-over-period change string, e.g. "+12.3%" */
  change?: string
  /** Optional lucide icon rendered in the top-right corner. */
  icon?: ReactNode
  /** Optional accent color override. */
  accent?: 'emerald' | 'gold' | 'navy'
}

const ACCENT_MAP = {
  emerald: {
    ring: 'ring-emerald-200/60',
    text: 'text-brand-emerald',
    bg: 'bg-emerald-50',
  },
  gold: {
    ring: 'ring-amber-200/60',
    text: 'text-brand-gold',
    bg: 'bg-amber-50',
  },
  navy: {
    ring: 'ring-slate-200',
    text: 'text-brand-navy',
    bg: 'bg-slate-50',
  },
} as const

function TrendIndicator({
  trend,
  change,
}: {
  trend?: 'up' | 'down' | 'neutral'
  change?: string
}) {
  if (!trend && !change) return null
  const Icon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const color =
    trend === 'up'
      ? 'text-emerald-600 bg-emerald-50'
      : trend === 'down'
        ? 'text-red-600 bg-red-50'
        : 'text-slate-500 bg-slate-100'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
        color,
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      {change ?? (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'flat')}
    </span>
  )
}

export function DashboardCard({
  label,
  value,
  subtext,
  placeholder = false,
  href,
  trend,
  change,
  icon,
  accent = 'emerald',
}: DashboardCardProps) {
  const accentStyles = ACCENT_MAP[accent]

  const body = (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 transition-all duration-300',
        placeholder
          ? 'border-2 border-dashed border-brand-navy/15'
          : `ring-1 ${accentStyles.ring} hover:-translate-y-0.5 hover:shadow-md`,
      )}
    >
      {/* Hairline gold top accent on populated cards */}
      {!placeholder && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon && (
            <span
              className={cn(
                'flex size-8 items-center justify-center rounded-lg',
                accentStyles.bg,
                accentStyles.text,
              )}
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60">
            {label}
          </span>
        </div>
        {href && (
          <ArrowUpRight
            className="size-4 text-brand-navy/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-navy"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="mt-4 flex-1">
        {placeholder ? (
          <div className="flex flex-col gap-1">
            <span className="font-display text-2xl font-normal italic text-brand-navy/40">
              Connect to populate
            </span>
            {subtext && (
              <span className="text-xs leading-relaxed text-slate-500">
                {subtext}
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-3">
              <span className="font-display text-3xl font-normal leading-none text-brand-navy">
                {value}
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </span>
              <TrendIndicator trend={trend} change={change} />
            </div>
            {subtext && (
              <span className="text-xs leading-relaxed text-slate-500">
                {subtext}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    const isExternal = /^https?:\/\//i.test(href)
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald/40 rounded-xl"
        >
          {body}
        </a>
      )
    }
    return (
      <Link
        href={href}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald/40 rounded-xl"
      >
        {body}
      </Link>
    )
  }

  return body
}
