/**
 * reseed-city-buildings.ts
 *
 * Reseeds ALL 20 Ontario cities with building-focused Pexels photos.
 * Ensures every city shows urban/architectural content suitable for a real estate site.
 *
 * Usage: npx tsx scripts/reseed-city-buildings.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const PEXELS_API_KEY = 'wQ0WSqwM9hSoPwMvgOzvmvMKcywRLlBSSADsj692V6zGU5vg2pHTDIiH'
const PEXELS_SEARCH_URL = 'https://api.pexels.com/v1/search'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity env vars')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface PexelsPhoto {
  id: number
  src: { large2x: string; large: string; original: string }
  photographer: string
}

interface PexelsResponse {
  photos: PexelsPhoto[]
  total_results: number
}

const CITIES = [
  { slug: 'toronto', queries: ['Toronto CN Tower skyline buildings', 'Toronto downtown skyscrapers', 'Toronto financial district'], alt: 'Toronto downtown skyline with CN Tower, Ontario' },
  { slug: 'mississauga', queries: ['Mississauga Absolute World towers', 'Mississauga city centre buildings', 'Mississauga skyline towers'], alt: 'Mississauga city skyline with Absolute World towers, Ontario' },
  { slug: 'brampton', queries: ['Brampton Ontario city buildings', 'Brampton downtown architecture', 'Ontario suburban city buildings'], alt: 'Brampton downtown, Ontario' },
  { slug: 'hamilton', queries: ['Hamilton Ontario city skyline buildings', 'Hamilton Ontario downtown buildings', 'Ontario industrial city skyline'], alt: 'Hamilton city skyline, Ontario' },
  { slug: 'ottawa', queries: ['Ottawa Parliament buildings', 'Ottawa city architecture', 'Ottawa downtown buildings Canada'], alt: 'Ottawa Parliament Hill and downtown, Ontario' },
  { slug: 'london', queries: ['London Ontario downtown buildings', 'Ontario city downtown architecture', 'Canada city downtown skyline'], alt: 'Downtown London, Ontario' },
  { slug: 'vaughan', queries: ['Vaughan Ontario city buildings', 'Toronto suburbs high rise buildings', 'Ontario city apartment buildings'], alt: 'Vaughan city centre buildings, Ontario' },
  { slug: 'markham', queries: ['Markham Ontario urban buildings', 'Ontario tech city buildings', 'Markham city centre architecture'], alt: 'Markham downtown, Ontario' },
  { slug: 'richmond-hill', queries: ['Richmond Hill Ontario buildings', 'Ontario suburban city skyline buildings', 'Toronto suburb city buildings'], alt: 'Richmond Hill, Ontario' },
  { slug: 'oakville', queries: ['Oakville Ontario buildings downtown', 'Ontario lakeside town buildings', 'Canada small city downtown architecture'], alt: 'Downtown Oakville, Ontario' },
  { slug: 'burlington', queries: ['Burlington Ontario city buildings downtown', 'Ontario city downtown architecture buildings', 'Hamilton Burlington Ontario urban'], alt: 'Downtown Burlington, Ontario' },
  { slug: 'kitchener', queries: ['Kitchener Ontario downtown city buildings', 'Kitchener Waterloo skyline', 'Ontario tech hub city buildings'], alt: 'Downtown Kitchener, Ontario' },
  { slug: 'waterloo', queries: ['Waterloo Ontario university buildings', 'Waterloo Ontario city downtown', 'Ontario university town buildings'], alt: 'Uptown Waterloo, Ontario' },
  { slug: 'cambridge', queries: ['Cambridge Ontario downtown architecture', 'Ontario historic downtown buildings', 'Canada historic city architecture'], alt: 'Downtown Cambridge, Ontario' },
  { slug: 'guelph', queries: ['Guelph Ontario city hall buildings', 'Guelph Ontario downtown architecture', 'Ontario city historic buildings'], alt: 'Downtown Guelph, Ontario' },
  { slug: 'barrie', queries: ['Barrie Ontario city buildings downtown', 'Ontario waterfront city buildings', 'Canada city downtown buildings skyline'], alt: 'Downtown Barrie, Ontario' },
  { slug: 'milton', queries: ['Milton Ontario city buildings', 'Ontario growing city buildings', 'Canada suburban city architecture'], alt: 'Milton, Ontario' },
  { slug: 'oshawa', queries: ['Oshawa Ontario downtown buildings', 'Ontario city downtown architecture', 'Canada automotive city buildings'], alt: 'Downtown Oshawa, Ontario' },
  { slug: 'ajax', queries: ['Ajax Ontario city buildings', 'Ontario suburban town buildings', 'Durham Region Ontario city buildings'], alt: 'Ajax, Ontario' },
  { slug: 'pickering', queries: ['Pickering Ontario city buildings', 'Durham Region Ontario buildings', 'Ontario lakeside city buildings'], alt: 'Pickering, Ontario' },
]

// Track used photo IDs globally to avoid duplicates
const usedPhotoIds = new Set<number>()

async function fetchUrl(url: string, headers: Record<string, string> = {}): Promise<{ status: number; data: string }> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, { headers }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchUrl(res.headers.location!, headers).then(resolve).catch(reject)
        return
      }
      let data = ''
      res.on('data', (chunk: string) => (data += chunk))
      res.on('end', () => resolve({ status: res.statusCode ?? 0, data }))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

async function fetchBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchBuffer(res.headers.location!).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return }
      const chunks: Buffer[] = []
      res.on('data', (chunk: Buffer) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.setTimeout(60000, () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

async function searchPexels(query: string, perPage = 15): Promise<PexelsPhoto[]> {
  const url = `${PEXELS_SEARCH_URL}?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`
  const result = await fetchUrl(url, { Authorization: PEXELS_API_KEY })
  if (result.status !== 200) throw new Error(`Pexels HTTP ${result.status}`)
  const json: PexelsResponse = JSON.parse(result.data)
  return json.photos ?? []
}

async function main() {
  console.log('Reseeding Ontario cities with building-focused photos...\n')

  // Fetch all Ontario cities from Sanity
  const cities = await client.fetch<Array<{ _id: string; slug: { current: string }; title: string }>>(`
    *[_type == "city" && province->slug.current == "ontario"] {
      _id, title, slug
    }
  `)

  const cityMap = new Map(cities.map(c => [c.slug.current, c]))
  console.log(`Found ${cities.length} Ontario cities in Sanity\n`)

  let successCount = 0
  let failCount = 0

  for (const cityDef of CITIES) {
    const sanityCity = cityMap.get(cityDef.slug)
    if (!sanityCity) {
      console.log(`SKIP  ${cityDef.slug} not found in Sanity`)
      continue
    }

    console.log(`[${sanityCity.title}]`)
    let photo: PexelsPhoto | null = null

    // Try each query until we find a unique photo
    for (const query of cityDef.queries) {
      try {
        const photos = await searchPexels(query, 15)
        const unique = photos.find(p => !usedPhotoIds.has(p.id))
        if (unique) {
          photo = unique
          console.log(`  Query: "${query}"`)
          console.log(`  Photo #${photo.id} by ${photo.photographer}`)
          break
        } else {
          console.log(`  Query: "${query}" -> no unique photo (all used), trying next...`)
        }
      } catch (err) {
        console.log(`  Query "${query}" failed: ${err instanceof Error ? err.message : err}`)
      }
      await new Promise(r => setTimeout(r, 300))
    }

    if (!photo) {
      console.log(`  FAIL  No unique photo found for ${sanityCity.title}`)
      failCount++
      continue
    }

    try {
      usedPhotoIds.add(photo.id)
      const imageUrl = photo.src.large2x || photo.src.large
      const buffer = await fetchBuffer(imageUrl)
      console.log(`  Downloaded: ${(buffer.length / 1024).toFixed(0)}KB`)

      const asset = await client.assets.upload('image', buffer, {
        filename: `${cityDef.slug}-ontario-buildings.jpg`,
        contentType: 'image/jpeg',
      })

      await client.patch(sanityCity._id).set({
        heroImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: cityDef.alt,
        },
      }).commit()

      console.log(`  OK    ${sanityCity.title} updated`)
      successCount++
    } catch (err) {
      console.log(`  FAIL  Upload/patch failed: ${err instanceof Error ? err.message : err}`)
      failCount++
    }

    // Rate limit respect
    await new Promise(r => setTimeout(r, 800))
  }

  console.log(`\n========= RESULTS =========`)
  console.log(`Success: ${successCount} / ${CITIES.length}`)
  console.log(`Failed:  ${failCount}`)
}

main().catch(console.error)
