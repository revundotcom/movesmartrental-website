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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  const gridCols = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>

        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${gridCols[columns]}`}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
              ? ICON_MAP[benefit.icon] || Star
              : Star

            return (
              <Card
                key={index}
                className="transition-shadow duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <IconComponent className="mb-2 size-8 text-primary" />
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
