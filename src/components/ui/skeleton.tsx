import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  /** Width. Default '100%' */
  width?: string | number
  /** Height. Default '1rem' */
  height?: string | number
  /** Border radius. Default 'md' */
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const roundedMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

export function Skeleton({ className, width = '100%', height = '1rem', rounded = 'md' }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', roundedMap[rounded], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

/** Card-shaped skeleton with title, lines, and footer */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4 p-6', className)}>
      <Skeleton height="1.5rem" width="60%" />
      <div className="space-y-2">
        <Skeleton height="0.875rem" width="100%" />
        <Skeleton height="0.875rem" width="90%" />
        <Skeleton height="0.875rem" width="75%" />
      </div>
      <Skeleton height="2.5rem" width="40%" rounded="lg" />
    </div>
  )
}
