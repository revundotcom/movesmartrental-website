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
  basePath,
}: ServiceGridBlockProps) {
  if (services.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading with emerald underline */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            Our Services
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
        </div>

        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${COLUMN_CLASSES[columns] ?? 'lg:grid-cols-3'}`}
        >
          {services.map((service) => {
            const Icon = service.icon ? ICON_MAP[service.icon] : null

            return (
              <Link
                key={service.slug}
                href={basePath ? `${basePath}/${service.slug}/` : `/services/${service.slug}/`}
                className="group"
              >
                <div className="flex h-full flex-col rounded-xl border border-[#0B1D3A]/10 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-t-2 group-hover:border-t-[#10B981] group-hover:shadow-lg">
                  {Icon && (
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-100">
                      <Icon className="size-6 text-emerald-600" aria-hidden="true" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#0B1D3A]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.shortDescription}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center text-sm font-medium text-[#10B981] transition-colors group-hover:text-[#059669]">
                      Learn more
                      <svg className="ml-1 size-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
