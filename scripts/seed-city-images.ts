/**
 * seed-city-images.ts
 *
 * Fetches skyline/aerial photos for 20 Ontario cities from Pexels API,
 * uploads them to Sanity CMS, and patches each city document with heroImage.
 *
 * Usage: npx tsx scripts/seed-city-images.ts
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
  console.error('Missing Sanity env vars. Check .env.local for NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN')
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
// City definitions
// ---------------------------------------------------------------------------

const CITIES: { slug: string; name: string }[] = [
  { slug: 'toronto',       name: 'Toronto' },
  { slug: 'mississauga',   name: 'Mississauga' },
  { slug: 'brampton',      name: 'Brampton' },
  { slug: 'hamilton',      name: 'Hamilton' },
  { slug: 'ottawa',        name: 'Ottawa' },
  { slug: 'london',        name: 'London' },
  { slug: 'vaughan',       name: 'Vaughan' },
  { slug: 'markham',       name: 'Markham' },
  { slug: 'richmond-hill', name: 'Richmond Hill' },
  { slug: 'oakville',      name: 'Oakville' },
  { slug: 'burlington',    name: 'Burlington' },
  { slug: 'kitchener',     name: 'Kitchener' },
  { slug: 'waterloo',      name: 'Waterloo' },
  { slug: 'cambridge',     name: 'Cambridge' },
  { slug: 'guelph',        name: 'Guelph' },
  { slug: 'barrie',        name: 'Barrie' },
  { slug: 'milton',        name: 'Milton' },
  { slug: 'oshawa',        name: 'Oshawa' },
  { slug: 'ajax',          name: 'Ajax' },
  { slug: 'pickering',     name: 'Pickering' },
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
// Helpers
// ---------------------------------------------------------------------------

async function searchPexels(query: string): Promise<PexelsPhoto[]> {
  const url = `${PEXELS_SEARCH_URL}?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  })
  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status} ${res.statusText}`)
  }
  const data = (await res.json()) as PexelsResponse
  return data.photos || []
}

async function findPhotoForCity(city: { slug: string; name: string }): Promise<PexelsPhoto | null> {
  const queries = [
    `${city.name} Ontario skyline`,
    `${city.name} Ontario aerial`,
    `${city.name} Ontario city`,
  ]

  for (const query of queries) {
    const photos = await searchPexels(query)
    // Pick first landscape-oriented photo (width > height)
    const landscape = photos.find((p) => p.width > p.height)
    if (landscape) {
      return landscape
    }
    // Small delay between fallback queries
    await sleep(300)
  }

  return null
}

async function downloadPhotoBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to download photo: ${res.status} ${res.statusText}`)
  }
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\nSeeding hero images for ${CITIES.length} Ontario cities...\n`)

  const results: { city: string; status: 'success' | 'failed'; detail: string }[] = []

  for (let i = 0; i < CITIES.length; i++) {
    const city = CITIES[i]
    const docId = `city-${city.slug}`

    try {
      // 1. Find a photo from Pexels
      const photo = await findPhotoForCity(city)
      if (!photo) {
        throw new Error('No suitable photo found on Pexels (tried skyline, aerial, city queries)')
      }

      // 2. Download photo buffer - prefer large2x, fall back to large
      const imageUrl = photo.src.large2x || photo.src.large
      const buffer = await downloadPhotoBuffer(imageUrl)

      // 3. Upload to Sanity
      const assetDoc = await client.assets.upload('image', buffer, {
        filename: `${city.slug}.jpg`,
        contentType: 'image/jpeg',
      })

      // 4. Patch city document with heroImage
      await client
        .patch(docId)
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

      const detail = `asset ${assetDoc._id}, photo by ${photo.photographer} (Pexels ID: ${photo.id})`
      console.log(`  [${i + 1}/${CITIES.length}] ${city.name} - uploaded ${detail}`)
      results.push({ city: city.name, status: 'success', detail })

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  [${i + 1}/${CITIES.length}] ${city.name} - FAILED: ${msg}`)
      results.push({ city: city.name, status: 'failed', detail: msg })
    }

    // 1 second delay between cities to respect rate limits
    if (i < CITIES.length - 1) {
      await sleep(1000)
    }
  }

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  const succeeded = results.filter((r) => r.status === 'success')
  const failed = results.filter((r) => r.status === 'failed')

  console.log('\n----------------------------------------')
  console.log(`Done. ${succeeded.length} succeeded, ${failed.length} failed.`)

  if (failed.length > 0) {
    console.log('\nFailed cities:')
    for (const f of failed) {
      console.log(`  - ${f.city}: ${f.detail}`)
    }
  }

  if (succeeded.length > 0) {
    console.log('\nSucceeded cities:')
    for (const s of succeeded) {
      console.log(`  + ${s.city}: ${s.detail}`)
    }
  }

  console.log('----------------------------------------\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
