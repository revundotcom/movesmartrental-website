import { NextResponse } from 'next/server'
import { sanityFetch } from '@/sanity/fetch'
import { groq } from 'next-sanity'

// Public-facing analytics summary (no auth required -- returns only aggregate counts)
// This endpoint returns CMS content counts, not user analytics (those are in GA4/Looker Studio)

const CONTENT_COUNTS_QUERY = groq`{
  "cities": count(*[_type == "city"]),
  "provinces": count(*[_type == "province"]),
  "services": count(*[_type == "service"]),
  "cityServices": count(*[_type == "cityService"]),
  "blogGuides": count(*[_type == "blogGuide"]),
  "propertyCategories": count(*[_type == "propertyCategory"]),
  "propertyListings": count(*[_type == "propertyListing"]),
  "comparisons": count(*[_type == "comparison"]),
  "caseStudies": count(*[_type == "caseStudy"]),
  "canadianCities": count(*[_type == "city" && province->country == "ca"]),
  "usCities": count(*[_type == "city" && province->country == "us"]),
  "totalPages": count(*[_type in ["city", "province", "cityService", "blogGuide", "propertyCategory", "propertyListing", "comparison", "caseStudy"]])
}`

export async function GET() {
  try {
    const counts = await sanityFetch<Record<string, number>>({
      query: CONTENT_COUNTS_QUERY,
      tags: ['city', 'province', 'service', 'cityService', 'blogGuide'],
    })

    return NextResponse.json({
      status: 'healthy',
      content: counts,
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch content counts' },
      { status: 500 }
    )
  }
}
