import { NextResponse } from 'next/server'
import {
  getFallbackCityList,
  getFallbackServiceList,
} from '@/lib/static-fallbacks'
import { GUIDES } from '@/data/guides'

// Public-facing analytics summary (no auth required -- returns only aggregate counts)
// This endpoint returns content counts from local static data, not user analytics
// (those are in GA4 / Looker Studio).

// Ontario is the only CA province currently represented in static fallbacks;
// every other provinceSlug is a US state.
const CA_PROVINCE_SLUGS = new Set(['ontario'])

export function GET() {
  try {
    const cities = getFallbackCityList()
    const services = getFallbackServiceList()

    const canadianCities = cities.filter((c) =>
      CA_PROVINCE_SLUGS.has(c.provinceSlug),
    ).length
    const usCities = cities.length - canadianCities

    const blogGuides = Object.keys(GUIDES).length
    // 5 CA provinces + 10 US states per contract
    const provinces = 15

    const counts = {
      cities: cities.length,
      canadianCities,
      usCities,
      services: services.length,
      blogGuides,
      provinces,
      // The following are computed dynamically per city x service at request
      // time, and no static data exists for the rest.
      cityServices: 0,
      propertyCategories: 0,
      propertyListings: 0,
      comparisons: 0,
      caseStudies: 0,
      totalPages:
        cities.length + provinces + services.length + blogGuides,
    }

    return NextResponse.json({
      status: 'healthy',
      content: counts,
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Failed to compute content counts' },
      { status: 500 },
    )
  }
}
