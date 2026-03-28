import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, DollarSign } from 'lucide-react'

import type { CityGridBlockProps } from '@/types/blocks'

const COLUMN_CLASSES: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

function formatPopulation(population: number): string {
  return population.toLocaleString('en-CA')
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function CityGridBlock({
  cities,
  province,
  columns = 3,
  showHeading = true,
}: CityGridBlockProps) {
  if (cities.length === 0) return null

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {showHeading && province && (
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
              {province}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${COLUMN_CLASSES[columns] ?? 'lg:grid-cols-3'}`}
        >
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/ca/${city.provinceSlug}/${city.slug}/`}
              className="group cursor-pointer"
            >
              <div className="relative h-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#0B1D3A]/15">
                {/* Image area */}
                {city.heroImageUrl ? (
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={city.heroImageUrl}
                      alt={city.heroImageAlt ?? `${city.title} skyline`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-107"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Rich gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/90 via-[#0B1D3A]/20 to-transparent transition-all duration-300 group-hover:from-[#0B1D3A]/95" />
                  </div>
                ) : (
                  <div className="relative flex h-60 w-full items-end bg-gradient-to-br from-[#0B1D3A] to-[#132B4F]">
                    <MapPin className="absolute right-4 top-4 size-8 text-white/10" aria-hidden="true" />
                  </div>
                )}

                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-emerald-300">
                        {city.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {city.population != null && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            <Users className="size-3" aria-hidden="true" />
                            {formatPopulation(city.population)}
                          </span>
                        )}
                        {city.medianRent != null && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/25 px-2.5 py-1 text-xs font-medium text-emerald-200 backdrop-blur-sm">
                            <DollarSign className="size-3" aria-hidden="true" />
                            {formatCurrency(city.medianRent)}/mo
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/0 transition-all duration-300 group-hover:bg-emerald-500/20">
                      <svg className="size-4 -translate-x-0.5 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
