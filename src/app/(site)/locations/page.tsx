import type { Metadata } from 'next'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { sanityFetch } from '@/sanity/fetch'
import { PROVINCES_WITH_CITIES_QUERY } from '@/sanity/queries/province'
import type { CityCardData } from '@/types/blocks'

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'Professional property management across Ontario. Find MoveSmart Rentals services in your city.',
  alternates: {
    canonical: '/locations/',
  },
  openGraph: {
    title: 'Locations',
    description:
      'Professional property management across Ontario. Find MoveSmart Rentals services in your city.',
  },
}

interface ProvinceWithCities {
  _id: string
  title: string
  slug: string
  country: string
  cities: CityCardData[]
}

export default async function LocationsPage() {
  const provinces = await sanityFetch<ProvinceWithCities[]>({
    query: PROVINCES_WITH_CITIES_QUERY,
    tags: ['province', 'city'],
  })

  // Filter to provinces that have at least one city
  const provincesWithCities = provinces.filter(
    (p) => p.cities && p.cities.length > 0,
  )

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations/' },
          ]}
        />
      </div>

      {/* 1. Hero */}
      <HeroBlock
        headline="Find MoveSmart in Your City"
        subheadline="Professional property management across Ontario and expanding nationwide."
      />

      {/* 2. Province-grouped city grids */}
      {provincesWithCities.map((province) => (
        <CityGridBlock
          key={province._id}
          cities={province.cities}
          province={province.title}
          columns={3}
        />
      ))}

      {/* 3. CTA for unlisted cities */}
      <CTABannerBlock
        headline="Don't See Your City? We're Expanding"
        description="Contact us to learn about our expansion plans and how we can help manage your property."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}
