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
}: CityGridBlockProps) {
  if (cities.length === 0) return null

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {province && (
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
              className="group"
            >
              <div className="relative h-full overflow-hidden rounded-xl shadow-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
                {/* Image area */}
                {city.heroImageUrl ? (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={city.heroImageUrl}
                      alt={city.heroImageAlt ?? `${city.title} skyline`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Navy gradient overlay at bottom for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0B1D3A] to-transparent" />
                  </div>
                ) : (
                  <div className="relative flex h-56 w-full items-end bg-gradient-to-br from-[#0B1D3A] to-[#132B4F]">
                    <MapPin className="absolute right-4 top-4 size-8 text-white/10" />
                  </div>
                )}

                {/* Text overlay on bottom of image */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-bold text-white">
                    {city.title}
                  </h3>

                  {/* Data badges */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {city.population != null && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <Users className="size-3" />
                        Pop. {formatPopulation(city.population)}
                      </span>
                    )}
                    {city.medianRent != null && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <DollarSign className="size-3" />
                        Median Rent {formatCurrency(city.medianRent)}
                      </span>
                    )}
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
