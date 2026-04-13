/**
 * city-priority-matrix.ts
 *
 * Generates a city-priority matrix CSV from the Sanity Content Lake.
 * Ranks all cities by SEO opportunity using a weighted scoring model:
 *   - Tier weight: 40% (Tier 1 = 40pts, Tier 2 = 20pts, Tier 3 = 10pts)
 *   - Population weight: 30% (normalized against max population)
 *   - Service coverage: 30% (serviceCount / 8 target services)
 *
 * Usage:  npx tsx scripts/city-priority-matrix.ts
 *
 * Output: .planning/content/city-priority-matrix.csv
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   - No write token needed (read-only query)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// ---------------------------------------------------------------------------
// Load environment variables
// ---------------------------------------------------------------------------

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

if (!projectId) {
  console.error(
    '\n  ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.\n\n' +
      '  Set it in .env.local:\n' +
      '    NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id\n'
  )
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Sanity client (read-only, no write token needed)
// ---------------------------------------------------------------------------

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CityRow {
  title: string
  slug: string
  tier: number | null
  population: number | null
  medianRent: number | null
  vacancyRate: number | null
  province: string | null
  provinceSlug: string | null
  country: string | null
  serviceCount: number
  categoryCount: number
  listingCount: number
}

interface ScoredCity extends CityRow {
  rank: number
  priorityScore: number
  url: string
  status: 'complete' | 'partial' | 'stub'
}

// ---------------------------------------------------------------------------
// GROQ query
// ---------------------------------------------------------------------------

const CITY_QUERY = `*[_type == "city"] {
  title,
  "slug": slug.current,
  tier,
  population,
  medianRent,
  vacancyRate,
  "province": province->title,
  "provinceSlug": province->slug.current,
  "country": province->country,
  "serviceCount": count(*[_type == "cityService" && city._ref == ^._id]),
  "categoryCount": count(*[_type == "propertyCategory" && city._ref == ^._id]),
  "listingCount": count(*[_type == "propertyListing" && city._ref == ^._id])
} | order(tier asc, population desc)`

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

const TOTAL_SERVICES = 8
const TOTAL_CATEGORIES = 4

function getTierScore(tier: number | null): number {
  if (tier === 1) return 40
  if (tier === 2) return 20
  if (tier === 3) return 10
  return 5 // untiered cities get minimal tier score
}

function getStatus(
  serviceCount: number,
  categoryCount: number
): 'complete' | 'partial' | 'stub' {
  if (serviceCount >= TOTAL_SERVICES && categoryCount >= TOTAL_CATEGORIES) {
    return 'complete'
  }
  if (serviceCount > 0 || categoryCount > 0) {
    return 'partial'
  }
  return 'stub'
}

function buildUrl(
  country: string | null,
  provinceSlug: string | null,
  slug: string
): string {
  const prefix = country === 'US' ? '/us' : '/ca'
  return `${prefix}/${provinceSlug ?? 'unknown'}/${slug}/`
}

function scoreCities(cities: CityRow[]): ScoredCity[] {
  if (cities.length === 0) return []

  // Find max population for normalization
  const maxPopulation = Math.max(
    ...cities.map((c) => c.population ?? 0),
    1 // prevent division by zero
  )

  // Score each city
  const scored = cities.map((city) => {
    const tierScore = getTierScore(city.tier)
    const populationScore =
      ((city.population ?? 0) / maxPopulation) * 30
    const serviceScore =
      (Math.min(city.serviceCount, TOTAL_SERVICES) / TOTAL_SERVICES) * 30

    const priorityScore = Math.round(
      (tierScore + populationScore + serviceScore) * 10
    ) / 10

    return {
      ...city,
      rank: 0, // set after sorting
      priorityScore,
      url: buildUrl(city.country, city.provinceSlug, city.slug),
      status: getStatus(city.serviceCount, city.categoryCount),
    }
  })

  // Sort by priority score descending
  scored.sort((a, b) => b.priorityScore - a.priorityScore)

  // Assign ranks
  scored.forEach((city, index) => {
    city.rank = index + 1
  })

  return scored
}

// ---------------------------------------------------------------------------
// CSV generation
// ---------------------------------------------------------------------------

function escapeCSV(value: string | number | null | undefined): string {
  const str = String(value ?? '')
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function toCSV(cities: ScoredCity[]): string {
  const headers = [
    'rank',
    'city',
    'province_state',
    'country',
    'tier',
    'population',
    'slug',
    'provinceSlug',
    'url',
    'priorityScore',
    'servicePages',
    'categoryPages',
    'listingPages',
    'status',
  ]

  const rows = cities.map((c) =>
    [
      c.rank,
      escapeCSV(c.title),
      escapeCSV(c.province),
      escapeCSV(c.country ?? 'CA'),
      c.tier ?? '',
      c.population ?? '',
      escapeCSV(c.slug),
      escapeCSV(c.provinceSlug),
      escapeCSV(c.url),
      c.priorityScore,
      c.serviceCount,
      c.categoryCount,
      c.listingCount,
      c.status,
    ].join(',')
  )

  return [headers.join(','), ...rows].join('\n')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Fetching cities from Sanity...')
  console.log(`  Project: ${projectId}`)
  console.log(`  Dataset: ${dataset}`)

  const cities: CityRow[] = await client.fetch(CITY_QUERY)

  if (cities.length === 0) {
    console.warn(
      '\n  WARNING: No cities found in Sanity.\n' +
        '  Make sure seeding scripts have been run first.\n' +
        '  Generating empty matrix with headers only.\n'
    )
  }

  console.log(`\n  Found ${cities.length} cities`)

  // Score and rank
  const scored = scoreCities(cities)

  // Generate CSV
  const csv = toCSV(scored)

  // Write output
  const outputPath = path.resolve(
    process.cwd(),
    '.planning/content/city-priority-matrix.csv'
  )
  const outputDir = path.dirname(outputPath)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(outputPath, csv, 'utf-8')

  // Print summary
  console.log(`\n  Output: ${outputPath}`)
  console.log(`  Total cities: ${scored.length}`)

  const complete = scored.filter((c) => c.status === 'complete').length
  const partial = scored.filter((c) => c.status === 'partial').length
  const stub = scored.filter((c) => c.status === 'stub').length

  console.log(`  Complete: ${complete}`)
  console.log(`  Partial:  ${partial}`)
  console.log(`  Stub:     ${stub}`)

  if (scored.length > 0) {
    console.log('\n  Top 10 by priority score:')
    scored.slice(0, 10).forEach((c) => {
      console.log(
        `    ${c.rank}. ${c.title} (${c.province}) - score: ${c.priorityScore}, status: ${c.status}`
      )
    })
  }

  console.log('\n  Done.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
