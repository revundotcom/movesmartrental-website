import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface AlsoAvailableCity {
  cityName: string
  citySlug: string
  provinceSlug: string
}

interface AlsoAvailableInProps {
  cities: AlsoAvailableCity[]
  serviceName: string
  serviceSlug: string
  country?: 'ca' | 'us'
}

export function AlsoAvailableIn({ cities, serviceName, serviceSlug, country = 'ca' }: AlsoAvailableInProps) {
  if (cities.length === 0) return null

  return (
    <section className="border-t border-slate-100 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold text-slate-500">
          {serviceName} also available in:
        </p>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city.citySlug}
              href={`/${country}/${city.provinceSlug}/${city.citySlug}/${serviceSlug}/`}
              className="group inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {city.cityName}
              <ArrowRight className="size-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
