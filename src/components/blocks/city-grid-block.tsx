import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      {province && (
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {province}
        </h2>
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
            <Card className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
              {city.heroImageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={city.heroImageUrl}
                    alt={city.heroImageAlt ?? `${city.title} skyline`}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{city.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {city.population != null && (
                    <span>Pop. {formatPopulation(city.population)}</span>
                  )}
                  {city.medianRent != null && (
                    <span>Median Rent {formatCurrency(city.medianRent)}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
