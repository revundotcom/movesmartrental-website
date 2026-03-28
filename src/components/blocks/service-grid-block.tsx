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

/* Unique decorative SVG per card index */
function CardDecor({ index }: { index: number }) {
  const patterns = [
    /* Concentric circles */
    <svg key="0" viewBox="0 0 80 80" fill="none" className="absolute -right-4 -top-4 size-20 text-brand-emerald/10" aria-hidden="true">
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1" />
      <circle cx="40" cy="40" r="24" stroke="currentColor" strokeWidth="1" />
      <circle cx="40" cy="40" r="12" stroke="currentColor" strokeWidth="1" />
    </svg>,
    /* Diagonal lines */
    <svg key="1" viewBox="0 0 80 80" fill="none" className="absolute -right-4 -top-4 size-20 text-brand-navy/6" aria-hidden="true">
      <line x1="0" y1="0" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="0" x2="80" y2="60" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="0" x2="80" y2="40" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="0" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
    </svg>,
    /* Dots */
    <svg key="2" viewBox="0 0 80 80" fill="none" className="absolute -right-2 -top-2 size-20 text-brand-emerald/10" aria-hidden="true">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle key={`${row}-${col}`} cx={8 + col * 22} cy={8 + row * 22} r="2.5" fill="currentColor" />
        ))
      )}
    </svg>,
    /* Grid */
    <svg key="3" viewBox="0 0 80 80" fill="none" className="absolute -right-4 -top-4 size-20 text-brand-navy/5" aria-hidden="true">
      <line x1="0" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="0" x2="20" y2="80" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="0" x2="40" y2="80" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="0" x2="60" y2="80" stroke="currentColor" strokeWidth="1" />
    </svg>,
    /* Arrow cluster */
    <svg key="4" viewBox="0 0 80 80" fill="none" className="absolute -right-4 -top-4 size-20 text-brand-emerald/10" aria-hidden="true">
      <path d="M20 60 L40 40 L60 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 50 L30 30 L50 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M55 18 L60 20 L58 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    /* Hex-ish */
    <svg key="5" viewBox="0 0 80 80" fill="none" className="absolute -right-4 -top-4 size-20 text-brand-navy/5" aria-hidden="true">
      <polygon points="40,5 70,22 70,58 40,75 10,58 10,22" stroke="currentColor" strokeWidth="1" fill="none" />
      <polygon points="40,20 58,30 58,50 40,60 22,50 22,30" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>,
    /* Wave */
    <svg key="6" viewBox="0 0 80 80" fill="none" className="absolute -right-0 -top-0 size-20 text-brand-emerald/10" aria-hidden="true">
      <path d="M0 40 Q20 20 40 40 Q60 60 80 40" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M0 55 Q20 35 40 55 Q60 75 80 55" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.5" />
      <path d="M0 25 Q20 5 40 25 Q60 45 80 25" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.5" />
    </svg>,
    /* Star burst */
    <svg key="7" viewBox="0 0 80 80" fill="none" className="absolute -right-4 -top-4 size-20 text-brand-navy/6" aria-hidden="true">
      {[0, 45, 90, 135].map((angle) => (
        <line
          key={angle}
          x1={40 + Math.cos((angle * Math.PI) / 180) * 35}
          y1={40 + Math.sin((angle * Math.PI) / 180) * 35}
          x2={40 - Math.cos((angle * Math.PI) / 180) * 35}
          y2={40 - Math.sin((angle * Math.PI) / 180) * 35}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
      <circle cx="40" cy="40" r="5" fill="currentColor" fillOpacity="0.3" />
    </svg>,
  ]
  return patterns[index % patterns.length] ?? null
}

const COLUMN_CLASSES: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

/* Gradient per card — cycles through 4 variants */
const ICON_GRADIENTS = [
  'from-emerald-50 to-teal-100',
  'from-blue-50 to-indigo-100',
  'from-amber-50 to-yellow-100',
  'from-emerald-50 to-green-100',
]
const ICON_COLORS = ['text-emerald-600', 'text-indigo-600', 'text-amber-600', 'text-emerald-700']

export function ServiceGridBlock({
  services,
  columns = 3,
  basePath,
  showHeading = true,
}: ServiceGridBlockProps) {
  if (services.length === 0) return null

  return (
    <section className="bg-transparent pt-10">
      <div className="mx-auto max-w-7xl px-4 pb-12">
        {showHeading && (
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              Our Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-emerald" />
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${COLUMN_CLASSES[columns] ?? 'lg:grid-cols-3'}`}
        >
          {services.map((service, index) => {
            const Icon = service.icon ? ICON_MAP[service.icon] : null
            const gradClass = ICON_GRADIENTS[index % ICON_GRADIENTS.length]
            const iconColor = ICON_COLORS[index % ICON_COLORS.length]

            return (
              <Link
                key={service.slug}
                href={basePath ? `${basePath}/${service.slug}/` : `/services/${service.slug}/`}
                className="group cursor-pointer"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand-emerald/20 group-hover:shadow-xl group-hover:shadow-brand-navy/8">
                  {/* Decorative SVG per card */}
                  <CardDecor index={index} />

                  {/* Bottom gradient sweep on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-brand-emerald/0 to-brand-emerald/0 transition-all duration-500 group-hover:from-brand-emerald/3 group-hover:to-transparent"
                    aria-hidden="true"
                  />

                  {/* Top accent bar */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: 'linear-gradient(90deg, #10B981, #34D399)' }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-1 flex-col">
                    {Icon && (
                      <div className={`mb-5 flex size-13 items-center justify-center rounded-xl bg-gradient-to-br ${gradClass} shadow-sm transition-all duration-300 group-hover:scale-105`}>
                        <Icon className={`size-6 ${iconColor}`} aria-hidden="true" />
                      </div>
                    )}
                    <h3 className="text-base font-bold text-brand-navy transition-colors duration-200 group-hover:text-brand-emerald">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                      {service.shortDescription}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5">
                      <span className="text-sm font-bold text-brand-emerald transition-all duration-200 group-hover:text-brand-emerald-dark">
                        Learn more
                      </span>
                      <svg
                        className="size-4 text-brand-emerald transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
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
