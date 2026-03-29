/**
 * seed-rich-content.ts
 *
 * Seeds rich content into Sanity cityService and city documents from
 * the batch files in ./city-content/
 *
 * Usage:  npx tsx scripts/seed-rich-content.ts
 *
 * Prerequisites:
 *   - seed-ontario-cities.ts must have been run first
 *   - SANITY_API_WRITE_TOKEN set in .env.local
 *   - Batch files in ./city-content/batch-1 through batch-4
 *
 * Idempotent: uses .patch().set() so re-running is safe.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { randomUUID } from 'crypto'

// Static imports for all batch files
import * as batch1 from './city-content/batch-1'
import * as batch2 from './city-content/batch-2'
import * as batch3 from './city-content/batch-3'
import * as batch4 from './city-content/batch-4'

// Additional cities not in batch-1 data (Brampton, Hamilton, Ottawa)
import * as brampton from './city-content/brampton'
import * as hamilton from './city-content/hamilton'
import * as ottawa from './city-content/ottawa'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// ---------------------------------------------------------------------------
// Validate environment
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error(
    '\n  ERROR: SANITY_API_WRITE_TOKEN is not set.\n\n' +
      '  To create a write token:\n' +
      '    1. Go to https://www.sanity.io/manage\n' +
      '    2. Select your project\n' +
      '    3. Navigate to API > Tokens\n' +
      '    4. Create a new token with "Editor" permissions\n' +
      '    5. Add it to .env.local:\n' +
      '       SANITY_API_WRITE_TOKEN=sk...\n'
  )
  process.exit(1)
}

if (!projectId || !dataset) {
  console.error(
    'ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set in .env.local'
  )
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Sanity client
// ---------------------------------------------------------------------------

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// ---------------------------------------------------------------------------
// Types matching batch file exports
// ---------------------------------------------------------------------------

interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: 'normal'
  children: PortableTextSpan[]
  markDefs: never[]
}

interface PainPoint {
  _key: string
  problem: string
  solution: string
}

interface Benefit {
  _key: string
  title: string
  description: string
  icon?: string
}

interface HowItWorksStep {
  _key: string
  stepNumber: number
  title: string
  description: string
}

interface Testimonial {
  _key: string
  name: string
  city: string
  quote: string
  outcome?: string
}

interface FaqItem {
  _key: string
  question: string
  answer: string
}

export interface CityServiceContent {
  citySlug: string
  serviceSlug: string
  heroHeadline: string
  heroSubheadline: string
  localBody?: string[]
  localBodyParagraphs?: string[]
  painPoints: Array<{ problem: string; solution: string }>
  benefits: Array<{ title: string; description: string; icon?: string }>
  howItWorks: Array<{ stepNumber: number; title: string; description: string }>
  testimonial: { name: string; city: string; quote: string; outcome?: string }
  faq: Array<{ question: string; answer: string }>
}

export interface CityDescription {
  citySlug: string
  descriptionParagraphs: string[]
  transitInfo: string
  neighbourhoods: string[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toPortableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text) => {
    const blockKey = randomUUID().replace(/-/g, '').slice(0, 12)
    const spanKey = randomUUID().replace(/-/g, '').slice(0, 12)
    return {
      _type: 'block' as const,
      _key: blockKey,
      style: 'normal' as const,
      children: [
        {
          _type: 'span' as const,
          _key: spanKey,
          text,
          marks: [],
        },
      ],
      markDefs: [] as never[],
    }
  })
}

function withKeys<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({
    ...item,
    _key: randomUUID().replace(/-/g, '').slice(0, 12),
  }))
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ---------------------------------------------------------------------------
// Batch file loader (graceful — skip missing batches)
// ---------------------------------------------------------------------------

interface BatchModule {
  cityServiceContent?: CityServiceContent[]
  cityDescriptions?: CityDescription[]
}

async function loadBatch(batchNum: number): Promise<BatchModule> {
  const batchPath = `./city-content/batch-${batchNum}`
  try {
    // Dynamic import resolves relative to this file's location
    const mod = await import(batchPath) as BatchModule
    return mod
  } catch {
    console.warn(`  ⚠  Batch ${batchNum} not found at ${batchPath} — skipping`)
    return {}
  }
}

// ---------------------------------------------------------------------------
// Service slug remapping (our content slugs → actual Sanity slugs)
// ---------------------------------------------------------------------------

const SERVICE_SLUG_MAP: Record<string, string> = {
  // New city files (batch 2-4) slugs
  'tenant-placement':    'tenant-placement',
  'tenant-screening':    'tenant-screening',
  'property-management': 'rental-preparation',
  'rent-collection':     'rent-guarantee',
  'maintenance-repair':  'portal-technology',
  'lease-management':    'leasing-services',
  'financial-reporting': 'pricing',
  'eviction-services':   'rental-marketing',
  // Batch-1 (Toronto/Mississauga) variant slugs
  'maintenance-repairs': 'portal-technology',
  'lease-renewals':      'leasing-services',
  'vacancy-marketing':   'rental-marketing',
}

// Batch-1 slugs with no Sanity target (skip silently)
const SKIP_SLUGS = new Set(['eviction-support'])

function remapServiceSlug(slug: string): string {
  return SERVICE_SLUG_MAP[slug] ?? slug
}

// ---------------------------------------------------------------------------
// Patch runners
// ---------------------------------------------------------------------------

async function patchCityServiceDocuments(
  entries: CityServiceContent[]
): Promise<void> {
  const BATCH_SIZE = 10

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const chunk = entries.slice(i, i + BATCH_SIZE)

    await Promise.all(
      chunk.map(async (entry) => {
        if (SKIP_SLUGS.has(entry.serviceSlug)) {
          console.log(`  ⏭ Skipped ${entry.citySlug}/${entry.serviceSlug} (no Sanity target)`)
          return
        }
        const sanitySlug = remapServiceSlug(entry.serviceSlug)
        const docId = `cityservice-${entry.citySlug}-${sanitySlug}`

        const localBody = toPortableText(entry.localBodyParagraphs ?? entry.localBody ?? [])
        const painPoints: PainPoint[] = withKeys(entry.painPoints)
        const benefits: Benefit[] = withKeys(entry.benefits)
        const howItWorks: HowItWorksStep[] = withKeys(entry.howItWorks)
        const testimonials: Testimonial[] = withKeys([entry.testimonial])
        const faq: FaqItem[] = withKeys(entry.faq)

        try {
          await client
            .patch(docId)
            .set({
              heroHeadline: entry.heroHeadline,
              heroSubheadline: entry.heroSubheadline,
              localBody,
              painPoints,
              benefits,
              howItWorks,
              testimonials,
              faq,
            })
            .commit()

          console.log(`  ✓ Patched ${docId}`)
        } catch (err) {
          console.error(`  ✗ Failed ${docId}:`, err)
        }
      })
    )

    if (i + BATCH_SIZE < entries.length) {
      await sleep(500)
    }
  }
}

async function patchCityDocuments(
  entries: CityDescription[]
): Promise<void> {
  const BATCH_SIZE = 10

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const chunk = entries.slice(i, i + BATCH_SIZE)

    await Promise.all(
      chunk.map(async (entry) => {
        const docId = `city-${entry.citySlug}`

        const description = toPortableText(entry.descriptionParagraphs ?? [])

        try {
          await client
            .patch(docId)
            .set({
              description,
              transitInfo: entry.transitInfo,
              neighbourhoods: entry.neighbourhoods,
            })
            .commit()

          console.log(`  ✓ Patched ${docId}`)
        } catch (err) {
          console.error(`  ✗ Failed ${docId}:`, err)
        }
      })
    )

    if (i + BATCH_SIZE < entries.length) {
      await sleep(500)
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('\n🌱 seed-rich-content.ts — starting\n')

  // Combine cityServiceContent from all batches + extra cities
  const allServiceContent: CityServiceContent[] = [
    ...(batch1.cityServiceContent ?? []),
    ...(batch2.cityServiceContent ?? []),
    ...(batch3.cityServiceContent ?? []),
    ...(batch4.cityServiceContent ?? []),
    ...(brampton.cityServiceContent ?? []),
    ...(hamilton.cityServiceContent ?? []),
    ...(ottawa.cityServiceContent ?? []),
  ]

  // Combine cityDescriptions from all batches + extra cities
  const allCityDescriptions: CityDescription[] = [
    ...(batch1.cityDescriptions ?? []),
    ...(batch2.cityDescriptions ?? []),
    ...(batch3.cityDescriptions ?? []),
    ...(batch4.cityDescriptions ?? []),
    ...(brampton.cityDescriptions ?? []),
    ...(hamilton.cityDescriptions ?? []),
    ...(ottawa.cityDescriptions ?? []),
  ]

  console.log(
    `  Found ${allServiceContent.length} cityService entries across all batches`
  )
  console.log(
    `  Found ${allCityDescriptions.length} city description entries across all batches\n`
  )

  // Patch cityService documents
  if (allServiceContent.length > 0) {
    console.log('--- Patching cityService documents ---')
    await patchCityServiceDocuments(allServiceContent)
    console.log()
  }

  // Patch city documents
  if (allCityDescriptions.length > 0) {
    console.log('--- Patching city documents ---')
    await patchCityDocuments(allCityDescriptions)
    console.log()
  }

  console.log('✅ seed-rich-content.ts — complete\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
