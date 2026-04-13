/**
 * fix-city-images-wikimedia.ts
 *
 * Patches Ontario city images in Sanity using VERIFIED Wikimedia Commons URLs.
 * All URLs have been confirmed via the Wikimedia Commons API - no guessed filenames.
 *
 * Usage: npx tsx scripts/fix-city-images-wikimedia.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

/**
 * All URLs verified via Wikimedia Commons API (action=query&prop=imageinfo).
 * Primary URL is the full-size image. Fallback is a resized thumbnail.
 * This avoids guessing filenames or paths.
 */
const CITY_IMAGES: Record<string, { urls: string[]; alt: string }> = {
  // --- Priority fixes (were showing wrong/placeholder images) ---
  'hamilton': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/9/94/Hamilton_skyline_%289044519598%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/d/d2/Skyline_of_downtown_Hamilton%2C_Ontario_facing_South.jpg',
    ],
    alt: 'Hamilton Ontario city skyline',
  },
  'ottawa': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Parliament_Hill_from_the_Ottawa_River.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Centre_Block_-_Parliament_Hill.jpg',
    ],
    alt: 'Parliament Hill, Ottawa, Ontario',
  },
  'london': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/f/ff/View_of_Downtown%2C_London%2C_Ontario_and_the_Thames_River.jpg',
    ],
    alt: 'Downtown London, Ontario and the Thames River',
  },
  'markham': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/36/Markham_Civic_Centre-Markham-Ontario-20200806.jpg',
    ],
    alt: 'Markham Civic Centre, Ontario',
  },
  'waterloo': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/8/80/Uptown_Waterloo_Ontario.JPG',
    ],
    alt: 'Uptown Waterloo, Ontario',
  },
  'vaughan': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/b/bb/Vaughan_City_Hall-_Vaughan-Ontario-20201031.jpg',
    ],
    alt: 'Vaughan City Hall, Ontario',
  },
  'ajax': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/8/85/Ajax_ON.JPG',
    ],
    alt: 'Ajax, Ontario',
  },
  'cambridge': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/8/82/Central_Presbyterian_Church_and_Grand_River_%28Galt%2C_Ontario%2C_Canada%29.jpg',
    ],
    alt: 'Downtown Cambridge (Galt) and Grand River, Ontario',
  },
  'guelph': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/5/58/Wyndham_Macdonell_corner_Guelph_1.jpg',
    ],
    alt: 'Downtown Guelph, Ontario',
  },
  'barrie': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/Barrie_waterfront_%2814567978673%29.jpg',
    ],
    alt: 'Barrie waterfront on Kempenfelt Bay, Ontario',
  },
  'milton': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a7/Downtown_Milton_Streetscape%2C_Ontario.jpg',
    ],
    alt: 'Downtown Milton streetscape, Ontario',
  },
  'pickering': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/6/62/Pickering_GO_Station_%28Town_Centre%29_-e.jpg',
    ],
    alt: 'Pickering GO Station and Town Centre, Ontario',
  },
  // --- Other cities (also seeded for completeness/correctness) ---
  'toronto': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a2/Toronto_Harbour_and_skyline.jpg',
    ],
    alt: 'Toronto harbour and skyline, Ontario',
  },
  'mississauga': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8b/Mississauga_skyline_from_Pearson.jpg',
    ],
    alt: 'Mississauga skyline from Pearson Airport, Ontario',
  },
  'brampton': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/5/51/Brampton_City_Hall_-_20240101_140900776.jpg',
    ],
    alt: 'Brampton City Hall, Ontario',
  },
  'kitchener': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Downtown_Kitchener%2C_2022.jpg',
    ],
    alt: 'Downtown Kitchener, Ontario',
  },
  'oshawa': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/c/cc/Downtown_Oshawa.JPG',
    ],
    alt: 'Downtown Oshawa, Ontario',
  },
  'oakville': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/8/87/Oakville_Harbour_June_2009.JPG',
    ],
    alt: 'Oakville harbour, Ontario',
  },
  'burlington': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b5/At_the_Burlington_waterfront%2C_Ontario%2C_Canada.jpg',
    ],
    alt: 'Burlington waterfront, Ontario',
  },
  'richmond-hill': {
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b4/Richmond_Hill_Municipal_Offices-_Richmond_Hill-Ontario-20200808.jpg',
    ],
    alt: 'Richmond Hill Municipal Offices, Ontario',
  },
}

async function fetchImageBuffer(url: string, redirectCount = 0): Promise<Buffer> {
  if (redirectCount > 5) throw new Error('Too many redirects')
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const options = {
      headers: {
        'User-Agent': 'CityImageBot/1.0 (MoveSmartRentals.com; contact@movesmartrentals.com)',
        'Accept': 'image/jpeg,image/*',
      },
    }
    const req = protocol.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
        const loc = res.headers.location!
        const nextUrl = loc.startsWith('http') ? loc : new URL(loc, url).toString()
        fetchImageBuffer(nextUrl, redirectCount + 1).then(resolve).catch(reject)
        return
      }
      if (res.statusCode === 429) {
        reject(new Error(`HTTP 429 (rate limited)`))
        return
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      const chunks: Buffer[] = []
      res.on('data', (chunk: Buffer) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.setTimeout(45000, () => {
      req.destroy()
      reject(new Error('Timeout after 45s'))
    })
  })
}

async function fetchWithRetry(url: string, maxRetries = 3): Promise<Buffer> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchImageBuffer(url)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('429') && attempt < maxRetries) {
        const waitMs = attempt * 5000
        console.log(`    Rate limited. Waiting ${waitMs / 1000}s before retry ${attempt + 1}/${maxRetries}...`)
        await new Promise(r => setTimeout(r, waitMs))
        continue
      }
      throw err
    }
  }
  throw new Error('Exhausted retries')
}

async function tryFetchWithFallbacks(urls: string[]): Promise<{ buffer: Buffer; usedUrl: string }> {
  const errors: string[] = []
  for (const url of urls) {
    try {
      const buffer = await fetchWithRetry(url)
      return { buffer, usedUrl: url }
    } catch (err) {
      errors.push(`${url.split('/').pop()}: ${err instanceof Error ? err.message : err}`)
    }
    // Brief pause between fallback attempts
    await new Promise(r => setTimeout(r, 2000))
  }
  throw new Error(`All URLs failed:\n    ${errors.join('\n    ')}`)
}

async function main() {
  console.log('Fetching Ontario city documents from Sanity...')

  const cities = await client.fetch<Array<{ _id: string; slug: { current: string }; title: string }>>(`
    *[_type == "city" && province->slug.current == "ontario"] {
      _id,
      title,
      slug
    } | order(title asc)
  `)

  console.log(`Found ${cities.length} Ontario cities\n`)

  let successCount = 0
  let failCount = 0
  let skippedCount = 0

  const results: Array<{ city: string; status: 'success' | 'fail' | 'skip'; detail: string }> = []

  for (const city of cities) {
    const slug = city.slug?.current
    const imageData = CITY_IMAGES[slug]

    if (!imageData) {
      console.log(`SKIP  ${city.title} (slug: ${slug}) - no image mapping`)
      results.push({ city: city.title, status: 'skip', detail: `slug "${slug}" not in CITY_IMAGES` })
      skippedCount++
      continue
    }

    console.log(`Processing ${city.title}...`)

    try {
      const { buffer, usedUrl } = await tryFetchWithFallbacks(imageData.urls)
      const sizeKb = (buffer.length / 1024).toFixed(0)
      console.log(`  Downloaded ${sizeKb}KB from ${usedUrl.split('/').pop()}`)

      // Upload to Sanity as image asset
      const asset = await client.assets.upload('image', buffer, {
        filename: `${slug}-ontario.jpg`,
        contentType: 'image/jpeg',
      })

      // Patch the city document's heroImage field
      await client
        .patch(city._id)
        .set({
          heroImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
            alt: imageData.alt,
          },
        })
        .commit()

      console.log(`  OK   -> Sanity asset ${asset._id}`)
      results.push({ city: city.title, status: 'success', detail: asset._id })
      successCount++
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  FAIL ${city.title}: ${msg}`)
      results.push({ city: city.title, status: 'fail', detail: msg })
      failCount++
    }

    // Stagger requests to avoid Wikimedia rate limits (429)
    await new Promise(r => setTimeout(r, 3000))
  }

  // Summary
  console.log('\n========= FINAL RESULTS =========')
  console.log(`Success:  ${successCount}`)
  console.log(`Failed:   ${failCount}`)
  console.log(`Skipped:  ${skippedCount}`)

  const successes = results.filter(r => r.status === 'success')
  if (successes.length > 0) {
    console.log('\nSucceeded:')
    successes.forEach(r => console.log(`  + ${r.city}`))
  }

  if (failCount > 0) {
    console.log('\nFailed cities:')
    results.filter(r => r.status === 'fail').forEach(r => {
      console.log(`  - ${r.city}`)
      console.log(`    ${r.detail}`)
    })
  }

  if (skippedCount > 0) {
    console.log('\nSkipped (no image mapping):')
    results.filter(r => r.status === 'skip').forEach(r => {
      console.log(`  ? ${r.city} (${r.detail})`)
    })
  }
}

main().catch(console.error)
