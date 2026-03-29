import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!, token: process.env.SANITY_API_WRITE_TOKEN!, useCdn: false, apiVersion: '2024-01-01' })
async function main() {
  // Get full structure of one toronto doc to see all fields
  const doc = await client.fetch('*[_id == "cityservice-toronto-tenant-placement"][0]')
  console.log('Full doc structure:', JSON.stringify(doc, null, 2))
}
main().catch(console.error)
