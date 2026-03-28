import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { PropertyCardBlockProps } from '@/types/blocks'

function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-CA')}/mo`
}

export function PropertyCardBlock({ listings }: PropertyCardBlockProps) {
  if (!listings || listings.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Link
            key={listing.slug}
            href={`/ca/${listing.provinceSlug}/${listing.citySlug}/rentals/${listing.slug}/`}
            className="group block"
          >
            <Card className="transition-shadow duration-300 group-hover:shadow-lg">
              {listing.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.imageAlt || listing.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardHeader>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(listing.price)}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bed className="size-4" />
                    {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="size-4" />
                    {listing.bathrooms}{' '}
                    {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
                  </span>
                  {listing.sqft && (
                    <span className="flex items-center gap-1">
                      <Maximize className="size-4" />
                      {listing.sqft.toLocaleString('en-CA')} sqft
                    </span>
                  )}
                </div>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {listing.address}
                </p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    listing.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {listing.available ? 'Available' : 'Not Available'}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
