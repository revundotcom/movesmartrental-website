import {
  DollarSign,
  FileText,
  Home,
  Megaphone,
  Monitor,
  Paintbrush,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ServiceGridBlockProps } from '@/types/blocks'

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  shield: Shield,
  paintbrush: Paintbrush,
  megaphone: Megaphone,
  'file-text': FileText,
  monitor: Monitor,
  'dollar-sign': DollarSign,
}

const COLUMN_CLASSES: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

export function ServiceGridBlock({
  services,
  columns = 3,
}: ServiceGridBlockProps) {
  if (services.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${COLUMN_CLASSES[columns] ?? 'lg:grid-cols-3'}`}
      >
        {services.map((service) => {
          const Icon = service.icon ? ICON_MAP[service.icon] : null

          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="group"
            >
              <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                <CardHeader>
                  {Icon && (
                    <Icon className="mb-2 size-8 text-primary" aria-hidden="true" />
                  )}
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
