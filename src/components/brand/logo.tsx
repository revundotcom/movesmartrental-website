import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'default' | 'white'
  className?: string
}

export function Logo({ variant = 'default', className }: LogoProps) {
  const textColor =
    variant === 'white' ? 'text-white' : 'text-[#0B1D3A]'
  const accentColor =
    variant === 'white' ? 'text-emerald-400' : 'text-emerald-600'

  return (
    <Link
      href="/"
      className={cn('inline-flex items-baseline gap-0 text-xl font-bold tracking-tight', className)}
      aria-label="MoveSmart Rentals - Home"
    >
      <span className={textColor}>Move</span>
      <span className={accentColor}>Smart</span>
      <span className={cn(textColor, 'ml-1.5')}>Rentals</span>
    </Link>
  )
}
