/**
 * seed-city-images-v2.ts
 *
 * Fetches UNIQUE skyline photos for 20 Ontario cities from Pexels API.
 * Tracks used Pexels photo IDs across all cities to prevent duplicates.
 * Falls back to Wikimedia Commons URLs when no unique Pexels photo is found.
 *
 * Usage: npx tsx scripts/seed-city-images-v2.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PEXELS_API_KEY = 'wQ0WSqwM9hSoPwMvgOzvmvMKcywRLlBSSADsj692V6zGU5vg2pHTDIiH'
const PEXELS_SEARCH_URL = 'https://api.pexels.com/v1/search'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    'Missing Sanity env vars. Check .env.local for NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN'
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ---------------------------------------------------------------------------
// City definitions with ordered query lists
// ---------------------------------------------------------------------------

interface CityDef {
  slug: string
  name: string
  queries: string[]
  wikimediaFallback: string
}

const CITIES: CityDef[] = [
  {
    slug: 'toronto',
    name: 'Toronto',
    queries: [
      'Toronto CN Tower skyline',
      'Toronto waterfront skyline',
      'Toronto downtown',
      'Toronto Ontario city',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Toronto_-_ON_-_Toronto_Harbourfront7.jpg/1280px-Toronto_-_ON_-_Toronto_Harbourfront7.jpg',
  },
  {
    slug: 'mississauga',
    name: 'Mississauga',
    queries: [
      'Mississauga Absolute towers',
      'Mississauga Ontario skyline',
      'Mississauga city hall',
      'Mississauga buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mississauga_ON.jpg/1280px-Mississauga_ON.jpg',
  },
  {
    slug: 'brampton',
    name: 'Brampton',
    queries: [
      'Brampton Ontario city',
      'Brampton city hall Ontario',
      'Brampton downtown',
      'Brampton Canada',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Brampton_city_hall.jpg/1280px-Brampton_city_hall.jpg',
  },
  {
    slug: 'hamilton',
    name: 'Hamilton',
    queries: [
      'Hamilton Ontario escarpment',
      'Hamilton Ontario steel city',
      'Hamilton downtown Ontario',
      'Hamilton Canada city',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hamilton_escarpment_brow.jpg/1280px-Hamilton_escarpment_brow.jpg',
  },
  {
    slug: 'ottawa',
    name: 'Ottawa',
    queries: [
      'Ottawa Parliament Hill',
      'Ottawa Ontario parliament',
      'Ottawa city skyline',
      'Ottawa Canada',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Parliament_Ottawa_HDR.jpg/1280px-Parliament_Ottawa_HDR.jpg',
  },
  {
    slug: 'london',
    name: 'London',
    queries: [
      'London Ontario downtown',
      'London Ontario city hall',
      'London Canada Ontario city',
      'London Ontario buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/London_Ontario_Downtown.jpg/1280px-London_Ontario_Downtown.jpg',
  },
  {
    slug: 'vaughan',
    name: 'Vaughan',
    queries: [
      'Vaughan Ontario city',
      'Vaughan Mills area Ontario',
      'Vaughan Canada buildings',
      'Vaughan Ontario skyline',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Vaughan_Mills_entrance.jpg/1280px-Vaughan_Mills_entrance.jpg',
  },
  {
    slug: 'markham',
    name: 'Markham',
    queries: [
      'Markham Ontario city',
      'Markham downtown Ontario',
      'Markham Canada city',
      'Markham Ontario buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Markham_Civic_Centre.jpg/1280px-Markham_Civic_Centre.jpg',
  },
  {
    slug: 'richmond-hill',
    name: 'Richmond Hill',
    queries: [
      'Richmond Hill Ontario',
      'Richmond Hill city Canada',
      'Richmond Hill suburban Ontario',
      'Richmond Hill buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Richmond_Hill_Ontario.jpg/1280px-Richmond_Hill_Ontario.jpg',
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    queries: [
      'Oakville Ontario harbour',
      'Oakville Ontario waterfront',
      'Oakville downtown Ontario',
      'Oakville Canada',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Oakville_Ontario_harbour.jpg/1280px-Oakville_Ontario_harbour.jpg',
  },
  {
    slug: 'burlington',
    name: 'Burlington',
    queries: [
      'Burlington Ontario waterfront',
      'Burlington Ontario pier',
      'Burlington Canada city',
      'Burlington Ontario downtown',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Burlington_Ontario_waterfront.jpg/1280px-Burlington_Ontario_waterfront.jpg',
  },
  {
    slug: 'kitchener',
    name: 'Kitchener',
    queries: [
      'Kitchener Ontario city',
      'Kitchener downtown Ontario',
      'Kitchener Waterloo Ontario',
      'Kitchener Canada',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Kitchener_Ontario_Canada.jpg/1280px-Kitchener_Ontario_Canada.jpg',
  },
  {
    slug: 'waterloo',
    name: 'Waterloo',
    queries: [
      'Waterloo Ontario university',
      'Waterloo Canada city',
      'Waterloo Ontario downtown',
      'Waterloo buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Waterloo_Ontario.jpg/1280px-Waterloo_Ontario.jpg',
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    queries: [
      'Cambridge Ontario city',
      'Cambridge Ontario downtown',
      'Cambridge Canada Ontario',
      'Cambridge Ontario buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Cambridge_Ontario.jpg/1280px-Cambridge_Ontario.jpg',
  },
  {
    slug: 'guelph',
    name: 'Guelph',
    queries: [
      'Guelph Ontario city',
      'Guelph downtown Ontario',
      'Guelph Canada city',
      'Guelph Ontario buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Guelph_Ontario.jpg/1280px-Guelph_Ontario.jpg',
  },
  {
    slug: 'barrie',
    name: 'Barrie',
    queries: [
      'Barrie Ontario waterfront',
      'Barrie Ontario city',
      'Barrie Canada city',
      'Barrie Ontario downtown',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Barrie_Ontario.jpg/1280px-Barrie_Ontario.jpg',
  },
  {
    slug: 'milton',
    name: 'Milton',
    queries: [
      'Milton Ontario city',
      'Milton Ontario downtown',
      'Milton Canada Ontario',
      'Milton Ontario buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Milton_Ontario.jpg/1280px-Milton_Ontario.jpg',
  },
  {
    slug: 'oshawa',
    name: 'Oshawa',
    queries: [
      'Oshawa Ontario city',
      'Oshawa downtown Ontario',
      'Oshawa Canada city',
      'Oshawa Ontario buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Oshawa_Ontario.jpg/1280px-Oshawa_Ontario.jpg',
  },
  {
    slug: 'ajax',
    name: 'Ajax',
    queries: [
      'Ajax Ontario city',
      'Ajax Ontario waterfront',
      'Ajax Canada Ontario',
      'Ajax Ontario suburb',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ajax_Ontario.jpg/1280px-Ajax_Ontario.jpg',
  },
  {
    slug: 'pickering',
    name: 'Pickering',
    queries: [
      'Pickering Ontario city',
      'Pickering Ontario waterfront',
      'Pickering Canada Ontario',
      'Pickering Ontario buildings',
    ],
    wikimediaFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pickering_Ontario.jpg/1280px-Pickering_Ontario.jpg',
  },
]

// ---------------------------------------------------------------------------
// Pexels types
// ---------------------------------------------------------------------------

interface PexelsPhoto {
  id: number
  width: number
  height: number
  photographer: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
  }
}

interface PexelsResponse {
  photos: PexelsPhoto[]
  total_results: number
}

// ---------------------------------------------------------------------------
// Result tracking
// ---------------------------------------------------------------------------

type PhotoSource = 'pexels' | 'wikimedia' | 'failed'

interface CityResult {
  city: string
  slug: string
  status: 'success' | 'failed'
  source: PhotoSource
  detail: string
  pexelsId?: number
  photographer?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function searchPexels(query: string): Promise<PexelsPhoto[]> {
  const url = `${PEXELS_SEARCH_URL}?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  })
  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status} ${res.statusText}`)
  }
  const data = (await res.json()) as PexelsResponse
  return data.photos || []
}

/**
 * Try each query in order. For each query's results, pick the widest photo
 * that has NOT been used yet. Returns { photo, query } or null.
 */
async function findUniquePexelsPhoto(
  city: CityDef,
  usedPhotoIds: Set<number>
): Promise<{ photo: PexelsPhoto; query: string } | null> {
  for (const query of city.queries) {
    let photos: PexelsPhoto[]
    try {
      photos = await searchPexels(query)
    } catch (err) {
      console.warn(`    [warn] Pexels query "${query}" failed: ${err instanceof Error ? err.message : String(err)}`)
      await sleep(500)
      continue
    }

    // Sort by width descending so we prefer highest resolution unique photo
    const sorted = [...photos].sort((a, b) => b.width - a.width)

    for (const photo of sorted) {
      if (!usedPhotoIds.has(photo.id)) {
        return { photo, query }
      }
    }

    // Small pause between fallback queries
    await sleep(400)
  }

  return null
}

async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}`)
  }
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

async function uploadAndPatch(
  city: CityDef,
  buffer: Buffer,
  filename: string
): Promise<string> {
  const assetDoc = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })

  await client
    .patch(`city-${city.slug}`)
    .set({
      heroImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetDoc._id,
        },
        alt: `${city.name} skyline, Ontario`,
      },
    })
    .commit()

  return assetDoc._id
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n=== seed-city-images-v2 ===`)
  console.log(`Seeding UNIQUE hero images for ${CITIES.length} Ontario cities...\n`)

  const usedPhotoIds = new Set<number>()
  const results: CityResult[] = []

  for (let i = 0; i < CITIES.length; i++) {
    const city = CITIES[i]
    const idx = `[${String(i + 1).padStart(2, ' ')}/${CITIES.length}]`

    try {
      // -----------------------------------------------------------------------
      // 1. Try Pexels with duplicate detection
      // -----------------------------------------------------------------------
      const found = await findUniquePexelsPhoto(city, usedPhotoIds)

      if (found) {
        const { photo } = found
        usedPhotoIds.add(photo.id)

        const imageUrl = photo.src.large2x || photo.src.large
        const buffer = await downloadBuffer(imageUrl)
        const assetId = await uploadAndPatch(city, buffer, `${city.slug}.jpg`)

        const detail = `Pexels #${photo.id} by ${photo.photographer} — asset ${assetId}`
        console.log(`  ${idx} ✓ ${city.name} — Pexels #${photo.id} by ${photo.photographer}`)
        results.push({
          city: city.name,
          slug: city.slug,
          status: 'success',
          source: 'pexels',
          detail,
          pexelsId: photo.id,
          photographer: photo.photographer,
        })
      } else {
        // -----------------------------------------------------------------------
        // 2. Wikimedia fallback
        // -----------------------------------------------------------------------
        console.log(`  ${idx} ~ ${city.name} — no unique Pexels photo, trying Wikimedia fallback...`)

        let buffer: Buffer
        try {
          buffer = await downloadBuffer(city.wikimediaFallback)
        } catch (wikiErr) {
          const msg = wikiErr instanceof Error ? wikiErr.message : String(wikiErr)
          console.error(`  ${idx} ✗ ${city.name} — Wikimedia fallback FAILED: ${msg}`)
          results.push({
            city: city.name,
            slug: city.slug,
            status: 'failed',
            source: 'failed',
            detail: `Wikimedia 404 or error: ${msg}`,
          })
          if (i < CITIES.length - 1) await sleep(1500)
          continue
        }

        const assetId = await uploadAndPatch(city, buffer, `${city.slug}-wiki.jpg`)
        console.log(`  ${idx} ✓ ${city.name} — Wikimedia fallback — asset ${assetId}`)
        results.push({
          city: city.name,
          slug: city.slug,
          status: 'success',
          source: 'wikimedia',
          detail: `Wikimedia fallback — asset ${assetId}`,
        })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ${idx} ✗ ${city.name} — FAILED: ${msg}`)
      results.push({
        city: city.name,
        slug: city.slug,
        status: 'failed',
        source: 'failed',
        detail: msg,
      })
    }

    // 1.5 second delay between cities
    if (i < CITIES.length - 1) {
      await sleep(1500)
    }
  }

  // ---------------------------------------------------------------------------
  // Summary table
  // ---------------------------------------------------------------------------
  console.log('\n')
  console.log('='.repeat(80))
  console.log('FINAL SUMMARY')
  console.log('='.repeat(80))
  console.log(
    `${'#'.padEnd(4)} ${'City'.padEnd(16)} ${'Source'.padEnd(12)} ${'Detail'}`
  )
  console.log('-'.repeat(80))

  const usedIdsInResults = new Set<number>()
  const duplicates: string[] = []

  for (let i = 0; i < results.length; i++) {
    const r = results[i]
    const num = String(i + 1).padEnd(4)
    const cityCol = r.city.padEnd(16)
    const icon = r.status === 'success' ? '✓' : '✗'

    let sourceCol: string
    let detailCol: string

    if (r.source === 'pexels' && r.pexelsId !== undefined) {
      const dupFlag = usedIdsInResults.has(r.pexelsId) ? ' [DUPLICATE!]' : ''
      if (usedIdsInResults.has(r.pexelsId)) {
        duplicates.push(r.city)
      }
      usedIdsInResults.add(r.pexelsId)
      sourceCol = 'Pexels'.padEnd(12)
      detailCol = `#${r.pexelsId} by ${r.photographer}${dupFlag}`
    } else if (r.source === 'wikimedia') {
      sourceCol = 'Wikimedia'.padEnd(12)
      detailCol = 'fallback URL'
    } else {
      sourceCol = 'FAILED'.padEnd(12)
      detailCol = r.detail.slice(0, 60)
    }

    console.log(`${icon}  ${num}${cityCol}${sourceCol}${detailCol}`)
  }

  console.log('='.repeat(80))

  const succeeded = results.filter((r) => r.status === 'success')
  const failed = results.filter((r) => r.status === 'failed')
  const pexelsCities = results.filter((r) => r.source === 'pexels')
  const wikiCities = results.filter((r) => r.source === 'wikimedia')

  console.log(`\nResults: ${succeeded.length} succeeded, ${failed.length} failed`)
  console.log(`Sources: ${pexelsCities.length} from Pexels, ${wikiCities.length} from Wikimedia`)

  if (duplicates.length > 0) {
    console.log(`\nWARNING: ${duplicates.length} duplicate Pexels photo IDs detected: ${duplicates.join(', ')}`)
  } else {
    console.log(`\nNo duplicate photo IDs detected — all images are unique.`)
  }

  if (failed.length > 0) {
    console.log(`\nFailed cities:`)
    for (const f of failed) {
      console.log(`  ✗ ${f.city}: ${f.detail}`)
    }
  }

  console.log('='.repeat(80))
  console.log()
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
