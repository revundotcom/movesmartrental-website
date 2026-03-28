import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoSize = 'sm' | 'md' | 'lg'

interface LogoProps {
  /** 'default' uses navy text, 'white' uses white text (for dark backgrounds) */
  variant?: 'default' | 'white'
  /** sm=140px, md=190px, lg=260px */
  size?: LogoSize
  className?: string
}

const WORDMARK_SIZES: Record<
  LogoSize,
  { width: number; height: number; fontSize: number; barWidth: number; barHeight: number }
> = {
  sm: { width: 140, height: 24, fontSize: 16, barWidth: 26, barHeight: 3 },
  md: { width: 190, height: 30, fontSize: 20, barWidth: 34, barHeight: 3.5 },
  lg: { width: 260, height: 40, fontSize: 28, barWidth: 46, barHeight: 4 },
}

/**
 * MoveSmart Rentals — Full wordmark with emerald accent bar.
 *
 * "MoveSmart" in bold + "Rentals" in light weight.
 * Small emerald accent bar beneath as the brand mark.
 * Wrapped in a <Link> to homepage for navigation use.
 */
export function Logo({ variant = 'default', size = 'md', className }: LogoProps) {
  const s = WORDMARK_SIZES[size]
  const fill = variant === 'white' ? '#FFFFFF' : '#0B1D3A'

  return (
    <Link
      href="/"
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label="MoveSmart Rentals - Home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${s.width} ${s.height}`}
        width={s.width}
        height={s.height}
        role="img"
        aria-hidden="true"
        className="block"
      >
        {/* "MoveSmart" — bold weight */}
        <text
          x="0"
          y={s.height * 0.68}
          fontFamily="'Plus Jakarta Sans', var(--font-heading), system-ui, sans-serif"
          fontSize={s.fontSize}
          fontWeight="700"
          fill={fill}
          letterSpacing="-0.02em"
        >
          MoveSmart
        </text>

        {/* "Rentals" — light weight, positioned after MoveSmart */}
        <text
          x={s.width * 0.6}
          y={s.height * 0.68}
          fontFamily="'Plus Jakarta Sans', var(--font-heading), system-ui, sans-serif"
          fontSize={s.fontSize}
          fontWeight="300"
          fill={fill}
          letterSpacing="-0.01em"
        >
          Rentals
        </text>

        {/* Emerald accent bar — brand mark */}
        <rect
          x="0"
          y={s.height - s.barHeight}
          width={s.barWidth}
          height={s.barHeight}
          rx={s.barHeight / 2}
          fill="#10B981"
        />
      </svg>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Icon-only mark                                                     */
/* ------------------------------------------------------------------ */

const ICON_SIZES: Record<LogoSize, number> = {
  sm: 24,
  md: 32,
  lg: 48,
}

/**
 * MoveSmart — Icon-only mark.
 *
 * Stylized "M" with emerald accent bar.
 * Use where the full wordmark doesn't fit (favicons, mobile, avatars).
 */
export function LogoIcon({
  size = 'md',
  variant = 'default',
  className,
}: LogoProps) {
  const s = ICON_SIZES[size]
  const stroke = variant === 'white' ? '#FFFFFF' : '#0B1D3A'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={s}
      height={s}
      role="img"
      aria-label="MoveSmart"
      className={cn('shrink-0', className)}
    >
      <title>MoveSmart</title>

      {/* Stylized M letterform */}
      <path
        d="M4 26V8l8 10 8-10v18"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right leg extension — forward motion */}
      <path
        d="M20 26h6"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Emerald accent bar at baseline */}
      <rect
        x="4"
        y="29"
        width="10"
        height="2.5"
        rx="1.25"
        fill="#10B981"
      />
    </svg>
  )
}
