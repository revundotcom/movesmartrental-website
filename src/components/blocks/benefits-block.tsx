import {
  Home,
  Users,
  Shield,
  Paintbrush,
  Megaphone,
  FileText,
  Monitor,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Heart,
  Zap,
  Award,
  type LucideIcon,
} from 'lucide-react'
import type { BenefitsBlockProps } from '@/types/blocks'

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  shield: Shield,
  paintbrush: Paintbrush,
  megaphone: Megaphone,
  'file-text': FileText,
  monitor: Monitor,
  'dollar-sign': DollarSign,
  star: Star,
  'check-circle': CheckCircle,
  clock: Clock,
  'trending-up': TrendingUp,
  heart: Heart,
  zap: Zap,
  award: Award,
}

export function BenefitsBlock({
  benefits,
  title = 'Benefits',
  columns = 3,
}: BenefitsBlockProps) {
  if (!benefits || benefits.length === 0) return null

  const gridCols: Record<number, string> = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section heading with emerald underline */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
        </div>

        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${gridCols[columns]}`}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
              ? ICON_MAP[benefit.icon] || Star
              : Star

            return (
              <div
                key={index}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-100">
                  <IconComponent className="size-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1D3A]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
