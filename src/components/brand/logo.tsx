import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoSize = 'sm' | 'md' | 'lg'

interface LogoProps {
  /** 'default' uses the original navy + emerald artwork (for light backgrounds).
   *  'white' inverts the artwork to a monochrome white mark (for dark backgrounds). */
  variant?: 'default' | 'white'
  /** sm=140px, md=190px, lg=260px */
  size?: LogoSize
  className?: string
}

/**
 * Rendered dimensions for the full wordmark.
 * Source artwork is 520.97 × 196.74 - ratio ≈ 2.65.
 */
const WORDMARK_SIZES: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 140, height: 53 },
  md: { width: 180, height: 68 },
  lg: { width: 240, height: 91 },
}

/**
 * MoveSmart Rentals - Full brand wordmark.
 *
 * Uses the official logo artwork (public/logo.svg).
 * - variant="default" → navy + emerald (for light backgrounds)
 * - variant="white"   → monochrome white (for dark backgrounds, via CSS filter)
 */
export function Logo({ variant = 'default', size = 'md', className }: LogoProps) {
  const s = WORDMARK_SIZES[size]

  return (
    <Link
      href="/"
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label="MoveSmart Rentals - Home"
    >
      <Image
        src="/logo.png"
        alt="MoveSmart Rentals"
        width={s.width}
        height={s.height}
        priority
        sizes={`${s.width}px`}
        className={cn(
          'block h-auto w-auto object-contain',
          variant === 'white' && 'brightness-0 invert',
        )}
        style={{ maxHeight: s.height, maxWidth: s.width }}
      />
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
 * MoveSmart - Icon-only mark.
 *
 * Stylized "M" with emerald accent bar. Use where the full wordmark
 * doesn't fit (favicons, mobile overlays, avatars).
 */
export function LogoIcon({
  size = 'md',
  variant = 'default',
  className,
}: LogoProps) {
  const s = ICON_SIZES[size]
  const stroke = variant === 'white' ? '#FFFFFF' : '#001E57'
  const accent = variant === 'white' ? '#FFFFFF' : '#009966'

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

      {/* Right leg extension - forward motion */}
      <path
        d="M20 26h6"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Emerald accent bar at baseline */}
      <rect x="4" y="29" width="10" height="2.5" rx="1.25" fill={accent} />
    </svg>
  )
}
