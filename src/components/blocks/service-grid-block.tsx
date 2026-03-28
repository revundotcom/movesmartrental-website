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
  showHeading = true,
}: ServiceGridBlockProps) {
  if (services.length === 0) return null

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {showHeading && (
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
              Our Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${COLUMN_CLASSES[columns] ?? 'lg:grid-cols-3'}`}
        >
          {services.map((service) => {
            const Icon = service.icon ? ICON_MAP[service.icon] : null

            return (
              <Link
                key={service.slug}
                href={basePath ? `${basePath}/${service.slug}/` : `/services/${service.slug}/`}
                className="group cursor-pointer"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-[#0B1D3A]/8 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#0B1D3A]/8">
                  {/* Top emerald accent bar on hover */}
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-t-xl bg-gradient-to-r from-[#10B981] to-[#34D399] transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />

                  {Icon && (
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-sm shadow-emerald-200/50 transition-all duration-300 group-hover:from-emerald-100 group-hover:to-emerald-200">
                      <Icon className="size-6 text-emerald-600" aria-hidden="true" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#0B1D3A] transition-colors duration-200 group-hover:text-emerald-700">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {service.shortDescription}
                  </p>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#10B981] transition-all duration-200 group-hover:gap-2 group-hover:text-[#059669]">
                      Learn more
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
