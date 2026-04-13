import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  /** Gradient variant. Default 'brand' */
  variant?: 'brand' | 'emerald' | 'animated'
}

const variantClasses: Record<string, string> = {
  brand: 'text-gradient-brand',
  emerald: 'text-gradient-emerald',
  animated: 'text-gradient-animated',
}

export function GradientText({ children, className, variant = 'brand' }: GradientTextProps) {
  return (
    <span className={cn(variantClasses[variant], className)}>
      {children}
    </span>
  )
}
