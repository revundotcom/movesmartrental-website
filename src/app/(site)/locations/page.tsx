import type { Metadata } from 'next'

import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { CityGridBlock } from '@/components/blocks/city-grid-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { sanityFetch } from '@/sanity/fetch'
import { PROVINCES_WITH_CITIES_QUERY } from '@/sanity/queries/province'
import type { CityCardData } from '@/types/blocks'

export const metadata: Metadata = {
  title: 'Property Management Locations Ontario | 20+ Cities Served',
  description:
    'MoveSmart Rentals serves 20+ Ontario cities including Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, Kitchener, Waterloo, Barrie, and Oakville. Find your city.',
  alternates: {
    canonical: '/locations/',
  },
  openGraph: {
    title: 'Property Management Locations Ontario | MoveSmart Rentals',
    description:
      'MoveSmart Rentals serves 20+ Ontario cities. Find professional property management in Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, and more.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management Locations Ontario | MoveSmart Rentals',
    description:
      'MoveSmart Rentals serves 20+ Ontario cities. Find professional property management in Toronto, Ottawa, Mississauga, Hamilton, Brampton, London, and more.',
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
