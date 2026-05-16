import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Building2,
  Car,
  Snowflake,
  Flame,
  PawPrint,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import {
  getProperty,
  portalReserveOfferUrl,
  portalShowingScheduleUrl,
  resolvePropertyImage,
} from '@/lib/portal-api'
import type { Property, PropertyMedia } from '@/types/property'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

// Per-slug pages refresh every 5 minutes via the lib's default revalidate.
export const revalidate = 300
// Allow on-demand rendering for slugs not in generateStaticParams (none).
export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const detail = await getProperty(slug)
  if (!detail) {
    return {
      title: 'Property not found',
      robots: { index: false, follow: false },
    }
  }

  const unit = detail.data.unit
  const title = `${unit.unit_name} | MoveSmart Rentals`
  const description =
    unit.description?.slice(0, 200) ||
    `${unit.number_of_bedrooms || unit.bedrooms || ''} bed, ${unit.number_of_bathrooms || unit.bathrooms || ''} bath ${
      unit.property_sub_type || 'rental'
    } at ${unit.unit_address}.`

  const image = resolvePropertyImage(unit.cover_image ?? unit.cover_thumb)

  return {
    title: unit.unit_name,
    description,
    alternates: { canonical: `/properties/${slug}/` },
    openGraph: {
      title,
      description,
      images: image ? [image] : ['/og-default.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : ['/og-default.png'],
    },
  }
}

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Contact for price'
  return `$${price.toLocaleString('en-CA')}`
}

function formatAvailableDate(value: string | null | undefined): string | null {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function MediaGallery({
  property,
}: {
  property: Property
}) {
  const cover = resolvePropertyImage(property.cover_image ?? property.cover_thumb)
  const media: PropertyMedia[] = Array.isArray(property.media) ? property.media : []
  const extraImages = media
    .map((m) => resolvePropertyImage(m))
    .filter((u): u is string => Boolean(u))
    .slice(0, 4)

  if (!cover && extraImages.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-slate-100">
        <div className="text-center text-slate-400">
          <MapPin className="mx-auto size-10" />
          <p className="mt-2 text-sm">No images available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2 md:grid-cols-4 md:gap-3">
      {cover && (
        <div className="relative col-span-4 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 md:col-span-3 md:row-span-2">
          <Image
            src={cover}
            alt={property.unit_name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            unoptimized
          />
        </div>
      )}
      {extraImages.map((url, i) => (
        <div
          key={`${url}-${i}`}
          className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 md:col-span-1"
        >
          <Image
            src={url}
            alt={`${property.unit_name} — photo ${i + 2}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 20vw"
            unoptimized
          />
        </div>
      ))}
    </div>
  )
}

function FeatureList({
  title,
  items,
  icon: Icon,
}: {
  title: string
  items: (string | null | undefined)[] | null | undefined
  icon: React.ComponentType<{ className?: string }>
}) {
  const visible = (items || []).filter(
    (v): v is string => Boolean(v) && v !== 'None',
  )
  if (visible.length === 0) return null
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-[#0B1D3A]">
        <Icon className="size-4 text-[#10B981]" />
        {title}
      </h3>
      <ul className="space-y-1.5">
        {visible.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10B981]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SimilarPropertyCard({ property }: { property: Property }) {
  const imageUrl = resolvePropertyImage(property.cover_image ?? property.cover_thumb)
  const beds = property.bedrooms ?? property.number_of_bedrooms ?? '—'
  const baths = property.bathrooms ?? property.number_of_bathrooms ?? '—'

  return (
    <Link
      href={`/properties/${property.slug}/`}
      className="group block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-video bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.unit_name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <MapPin className="size-8 text-slate-300" />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-[#10B981]">
          {property.website_price
            ? `$${property.website_price.toLocaleString('en-CA')}/mo`
            : 'Contact for price'}
        </p>
        <p className="mt-1 line-clamp-1 text-sm font-medium text-[#0B1D3A]">
          {property.unit_name}
        </p>
        <p className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Bed className="size-3.5" /> {beds}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="size-3.5" /> {baths}
          </span>
        </p>
      </div>
    </Link>
  )
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const detail = await getProperty(slug)

  if (!detail) {
    notFound()
  }

  const unit = detail.data.unit
  const similar = (detail.data.similar_properties || []).slice(0, 3)
  const building = unit.building
  const availableDate = formatAvailableDate(unit.available_date)
  const isAvailable =
    (unit.availability ?? '').toLowerCase() === 'available' ||
    (unit.status ?? '').toLowerCase() === 'available'

  // Portal deep links (User Action Flow §2 in the API doc).
  // Both buttons require unit.zcrm_id; when missing we fall back to the
  // contact form so the lead isn't dropped.
  const scheduleUrl = portalShowingScheduleUrl(unit.zcrm_id)
  const reserveUrl = portalReserveOfferUrl(unit.zcrm_id)

  // Schema.org for rental listing.
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: unit.unit_name,
    description: unit.description || undefined,
    url: `${SITE_URL}/properties/${slug}/`,
    numberOfBedrooms: unit.bedrooms ?? undefined,
    numberOfBathroomsTotal: unit.bathrooms ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: building?.street_number
        ? `${building.street_number} ${building.street_name || ''}`.trim()
        : undefined,
      addressLocality: building?.city || undefined,
      addressRegion: building?.province || undefined,
      postalCode: building?.postal_code || undefined,
      addressCountry: 'CA',
    },
    geo:
      unit.latitude && unit.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: unit.latitude,
            longitude: unit.longitude,
          }
        : undefined,
    offers: unit.website_price
      ? {
          '@type': 'Offer',
          price: unit.website_price,
          priceCurrency: 'CAD',
          availability: isAvailable
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        }
      : undefined,
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Properties', href: '/properties/' },
            { label: unit.unit_name, href: `/properties/${slug}/` },
          ]}
        />

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                isAvailable
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isAvailable ? 'Available' : unit.availability || 'Unavailable'}
            </span>
            {unit.property_sub_type && (
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                {unit.property_sub_type}
              </span>
            )}
            {unit.furnished && (
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                {unit.furnished}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl text-[#0B1D3A] md:text-4xl">
            {unit.unit_name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="size-4 text-slate-400" />
            {unit.unit_address}
          </p>
        </header>

        <section className="mt-6">
          <MediaGallery property={unit} />
        </section>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            <section
              className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-5"
              aria-label="Key details"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Monthly rent
                </p>
                <p className="font-display text-2xl text-[#10B981]">
                  {formatPrice(unit.website_price)}
                  {unit.website_price != null && (
                    <span className="text-base text-slate-500">/mo</span>
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#0B1D3A]">
                <span className="inline-flex items-center gap-1.5">
                  <Bed className="size-4 text-[#10B981]" />
                  {unit.number_of_bedrooms || unit.bedrooms || '—'} Beds
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Bath className="size-4 text-[#10B981]" />
                  {unit.number_of_bathrooms || unit.bathrooms || '—'} Baths
                </span>
                {(unit.approximate_square_footage ||
                  unit.above_grade_sqft) && (
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize className="size-4 text-[#10B981]" />
                    {unit.approximate_square_footage ||
                      `${unit.above_grade_sqft} sqft`}
                  </span>
                )}
                {unit.total_parking_spaces && (
                  <span className="inline-flex items-center gap-1.5">
                    <Car className="size-4 text-[#10B981]" />
                    {unit.total_parking_spaces} Parking
                  </span>
                )}
                {availableDate && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4 text-[#10B981]" />
                    Available {availableDate}
                  </span>
                )}
              </div>
            </section>

            {unit.description && (
              <section className="mt-8" aria-label="About this property">
                <h2 className="font-display text-2xl text-[#0B1D3A]">
                  About this property
                </h2>
                <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate-700">
                  {unit.description}
                </div>
              </section>
            )}

            <section className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FeatureList
                title="Interior features"
                items={unit.interior_features}
                icon={Building2}
              />
              <FeatureList
                title="Heating"
                items={unit.heating}
                icon={Flame}
              />
              <FeatureList
                title="Cooling"
                items={unit.cooling}
                icon={Snowflake}
              />
              <FeatureList
                title="Parking"
                items={unit.parking_type}
                icon={Car}
              />
              <FeatureList
                title="Included in lease cost"
                items={unit.included_in_lease_cost}
                icon={CheckCircle2}
              />
              <FeatureList
                title="Laundry"
                items={unit.laundry_features}
                icon={CheckCircle2}
              />
              <FeatureList
                title="Security"
                items={unit.security_features}
                icon={CheckCircle2}
              />
              <FeatureList
                title="Accessibility"
                items={unit.accessible_features}
                icon={CheckCircle2}
              />
            </section>

            {building && (
              <section className="mt-10" aria-label="Building information">
                <h2 className="font-display text-2xl text-[#0B1D3A]">
                  Building information
                </h2>
                <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                  {building.neighbourhood && (
                    <div>
                      <dt className="text-slate-500">Neighbourhood</dt>
                      <dd className="font-medium text-[#0B1D3A]">
                        {building.neighbourhood}
                      </dd>
                    </div>
                  )}
                  {building.cross_street && (
                    <div>
                      <dt className="text-slate-500">Cross street</dt>
                      <dd className="font-medium text-[#0B1D3A]">
                        {building.cross_street}
                      </dd>
                    </div>
                  )}
                  {building.year_built && (
                    <div>
                      <dt className="text-slate-500">Year built</dt>
                      <dd className="font-medium text-[#0B1D3A]">
                        {building.year_built}
                      </dd>
                    </div>
                  )}
                  {building.condo_level && (
                    <div>
                      <dt className="text-slate-500">Floor / level</dt>
                      <dd className="font-medium text-[#0B1D3A]">
                        {building.condo_level}
                      </dd>
                    </div>
                  )}
                  {building.pets_allowed && (
                    <div>
                      <dt className="text-slate-500">Pets</dt>
                      <dd className="inline-flex items-center gap-1 font-medium text-[#0B1D3A]">
                        <PawPrint className="size-4 text-[#10B981]" />
                        {building.pets_allowed}
                      </dd>
                    </div>
                  )}
                  {building.elementary_school && (
                    <div>
                      <dt className="text-slate-500">Elementary school</dt>
                      <dd className="font-medium text-[#0B1D3A]">
                        {building.elementary_school}
                      </dd>
                    </div>
                  )}
                  {building.high_school && (
                    <div>
                      <dt className="text-slate-500">High school</dt>
                      <dd className="font-medium text-[#0B1D3A]">
                        {building.high_school}
                      </dd>
                    </div>
                  )}
                </dl>

                {Array.isArray(building.condo_amenities) &&
                  building.condo_amenities.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#0B1D3A]">
                        Building amenities
                      </h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {building.condo_amenities.map((amenity) => (
                          <li
                            key={amenity}
                            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]"
                          >
                            <CheckCircle2 className="size-3.5 text-[#10B981]" />
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-display text-3xl text-[#0B1D3A]">
                {formatPrice(unit.website_price)}
                {unit.website_price != null && (
                  <span className="text-base font-normal text-slate-500">
                    /month
                  </span>
                )}
              </p>
              {availableDate && (
                <p className="mt-1 text-sm text-slate-500">
                  Available {availableDate}
                </p>
              )}

              <div className="my-5 border-t border-slate-100" />

              <p className="text-sm font-medium text-[#0B1D3A]">
                Interested in this property?
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Schedule a viewing or reserve this unit through the secure
                MoveSmart portal — sign in or create an account in seconds.
              </p>

              <div className="mt-4 space-y-2">
                {scheduleUrl ? (
                  <a
                    href={scheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
                  >
                    Schedule a Tour
                    <ArrowRight className="ml-1.5 size-4" />
                  </a>
                ) : (
                  <Link
                    href={`/contact/?type=tenant&property=${encodeURIComponent(slug)}`}
                    className="flex w-full items-center justify-center rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
                  >
                    Request a Viewing
                    <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                )}
                {reserveUrl && (
                  <a
                    href={reserveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg border border-[#0B1D3A] bg-[#0B1D3A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B1D3A]/90"
                  >
                    Reserve Offer
                  </a>
                )}
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                <p>
                  Listing managed by{' '}
                  <span className="font-semibold text-[#0B1D3A]">
                    MoveSmart Rentals
                  </span>
                  . Full-service leasing — screening, lease execution, and
                  move-in coordination are included.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-16" aria-label="Similar properties">
            <h2 className="font-display text-2xl text-[#0B1D3A] md:text-3xl">
              Similar properties
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <SimilarPropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
