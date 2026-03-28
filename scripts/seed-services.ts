/**
 * seed-services.ts
 *
 * Seeds the Sanity Content Lake with:
 *   - 1 Province document (Ontario)
 *   - 8 Service documents (owner-focused services)
 *
 * Usage:  npx tsx scripts/seed-services.ts
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 * Idempotent: uses createOrReplace with deterministic _id values.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

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
// Portable Text helper
// ---------------------------------------------------------------------------

function textBlock(text: string): {
  _type: 'block'
  _key: string
  style: 'normal'
  children: Array<{ _type: 'span'; _key: string; text: string }>
  markDefs: never[]
} {
  const key = Math.random().toString(36).slice(2, 10)
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    children: [{ _type: 'span', _key: `${key}s`, text }],
    markDefs: [],
  }
}

// ---------------------------------------------------------------------------
// Province: Ontario
// ---------------------------------------------------------------------------

const ontarioProvince = {
  _id: 'province-ontario',
  _type: 'province',
  title: 'Ontario',
  slug: { _type: 'slug', current: 'ontario' },
  country: 'ca' as const,
  abbreviation: 'ON',
  description:
    "Ontario is Canada's most populous province, home to over 15 million residents across diverse urban centres from the Greater Toronto Area to Ottawa. The province accounts for nearly 40% of Canada's GDP and hosts the country's largest rental market, with strong demand driven by immigration, post-secondary institutions, and a robust technology sector.",
  seo: {
    metaTitle: 'Ontario Property Management | MoveSmart Rentals',
    metaDescription:
      'Professional property management services across Ontario. Expert tenant placement, leasing, and rental marketing for property owners in Toronto, Ottawa, and 18 more cities.',
    keywords: [
      'ontario property management',
      'ontario rental management',
      'ontario landlord services',
      'ontario tenant placement',
    ],
  },
  publishing: {
    noindex: false,
    includedInSitemap: true,
  },
}

// ---------------------------------------------------------------------------
// 8 Owner Services
// ---------------------------------------------------------------------------

interface ServiceSeed {
  slug: string
  title: string
  shortDescription: string
  icon: string
  audience: 'owner' | 'tenant' | 'both'
  order: number
  body: ReturnType<typeof textBlock>[]
  faq: Array<{ question: string; answer: string }>
  seo: { metaTitle: string; metaDescription: string }
}

const services: ServiceSeed[] = [
  {
    slug: 'tenant-placement',
    title: 'Tenant Placement',
    shortDescription:
      'Fast, professional tenant placement with MLS distribution and targeted marketing',
    icon: 'users',
    audience: 'owner',
    order: 1,
    body: [
      textBlock(
        'Our tenant placement service connects property owners with qualified, pre-screened tenants through a multi-channel marketing strategy. We syndicate your listing across MLS, major rental portals, social media, and our own database of vetted renters to minimize vacancy days.'
      ),
      textBlock(
        'Every applicant goes through our rigorous screening pipeline before a showing is scheduled. We coordinate viewings, handle all applicant communications, and present you with a shortlist of the strongest candidates -- complete with credit reports, employment verification, and landlord references.'
      ),
      textBlock(
        'From listing preparation to lease signing, our team manages every step so you never have to field midnight showing requests or chase down references yourself. Average placement time across Ontario: 14 days.'
      ),
    ],
    faq: [
      {
        question: 'How long does tenant placement typically take?',
        answer:
          'Our average placement time is 14 days from listing to lease signing. In high-demand markets like Toronto and Ottawa, placements can close in under 10 days. We optimize listing timing and marketing channels to minimize your vacancy period.',
      },
      {
        question: 'What happens if the tenant you place breaks the lease early?',
        answer:
          'If a tenant we place breaks the lease within the first 12 months, we will re-place the unit at no additional fee. Our thorough screening process keeps early break rates below 3% across our portfolio.',
      },
      {
        question: 'Do I get to approve the final tenant selection?',
        answer:
          'Absolutely. We present a shortlist of the top 2-3 qualified applicants with full screening reports. You make the final decision -- we handle everything else.',
      },
    ],
    seo: {
      metaTitle: 'Tenant Placement Services | MoveSmart Rentals',
      metaDescription:
        'Professional tenant placement with MLS distribution and rigorous screening. Average 14-day placement across Ontario. Find qualified tenants fast.',
    },
  },
  {
    slug: 'leasing-services',
    title: 'Leasing Services',
    shortDescription:
      'End-to-end lease management from application to signing',
    icon: 'file-text',
    audience: 'owner',
    order: 2,
    body: [
      textBlock(
        'Our leasing services handle every administrative detail of the rental agreement lifecycle. We draft Ontario-compliant lease agreements using the standard Ontario lease form, incorporate your specific property rules, and ensure both parties understand their obligations under the Residential Tenancies Act.'
      ),
      textBlock(
        'Beyond the initial lease, we manage renewals, rent increase notices (calculated per CMHC guidelines), and any amendments. Our digital-first process means tenants can review and sign electronically, reducing turnaround from weeks to hours.'
      ),
      textBlock(
        'Every lease includes a detailed condition report with timestamped photos, protecting you from deposit disputes. We keep copies on file and provide both parties with immediate digital access through our owner portal.'
      ),
    ],
    faq: [
      {
        question: 'Are your leases compliant with Ontario rental law?',
        answer:
          'Yes. We use the Ontario Standard Lease form as required by the Residential Tenancies Act, 2006, with additional schedules for property-specific rules. Our legal team reviews all lease templates quarterly to reflect any legislative changes.',
      },
      {
        question: 'How do you handle lease renewals?',
        answer:
          'We contact tenants 90 days before lease expiry to discuss renewal terms. If a rent increase applies, we calculate the guideline amount and serve the required N1 notice. Everything is documented and tracked in your owner portal.',
      },
      {
        question: 'Can I customize the lease terms for my property?',
        answer:
          'Yes. While the standard lease form is mandatory in Ontario, you can add lawful schedules covering pet policies, parking, storage, and maintenance responsibilities. We help you draft these additions to ensure enforceability.',
      },
    ],
    seo: {
      metaTitle: 'Leasing Services for Landlords | MoveSmart',
      metaDescription:
        'End-to-end lease management in Ontario. RTA-compliant agreements, electronic signing, renewal tracking, and condition reports for property owners.',
    },
  },
  {
    slug: 'tenant-screening',
    title: 'Tenant Screening',
    shortDescription:
      'Comprehensive credit, employment, and reference verification',
    icon: 'shield-check',
    audience: 'owner',
    order: 3,
    body: [
      textBlock(
        'Our tenant screening process goes far beyond a basic credit check. We run a five-point verification covering credit history (Equifax), employment and income confirmation, previous landlord references, identity verification, and public records including eviction history through the Landlord and Tenant Board.'
      ),
      textBlock(
        'Each screening generates a standardized report card that scores applicants across all five categories. We flag any concerns and provide clear recommendations so you can make informed decisions without wading through raw data.'
      ),
      textBlock(
        'Screening is completed within 24-48 hours of application. We comply fully with the Ontario Human Rights Code and federal privacy legislation, ensuring your screening process is both thorough and legally defensible.'
      ),
    ],
    faq: [
      {
        question: 'What does the tenant screening include?',
        answer:
          'Our five-point screening includes: Equifax credit check, employment and income verification, two previous landlord references, government ID verification, and LTB eviction history search. Results are compiled into a single report card.',
      },
      {
        question: 'How long does screening take?',
        answer:
          'Most screenings are completed within 24-48 hours. Delays can occur if a previous landlord is unresponsive, in which case we use alternative verification methods and keep you updated on progress.',
      },
      {
        question: 'Is the screening process compliant with privacy laws?',
        answer:
          'Yes. We collect applicant consent before every check, comply with PIPEDA (federal privacy law) and the Ontario Human Rights Code, and never use prohibited grounds such as race, family status, or receipt of public assistance in our evaluations.',
      },
    ],
    seo: {
      metaTitle: 'Tenant Screening Services | MoveSmart',
      metaDescription:
        'Five-point tenant screening: credit, employment, references, ID, and eviction history. Results in 24-48 hours. PIPEDA and OHRC compliant.',
    },
  },
  {
    slug: 'rent-guarantee',
    title: 'Rent Guarantee',
    shortDescription:
      'Income protection with guaranteed rent payments every month',
    icon: 'banknote',
    audience: 'owner',
    order: 4,
    body: [
      textBlock(
        'Our rent guarantee program eliminates the financial uncertainty of rental ownership. When you enroll, we guarantee your monthly rent payment regardless of tenant payment behaviour. If a tenant misses rent, we cover it -- you receive your deposit on schedule, every time.'
      ),
      textBlock(
        "The program is backed by our internal reserve fund, not third-party insurance, which means faster payouts and no claim filing process. We absorb the collection risk and pursue arrears recovery on your behalf, including filing at Ontario's Landlord and Tenant Board when necessary."
      ),
      textBlock(
        'Eligibility requires tenants to pass our enhanced screening tier. Properties enrolled in the rent guarantee program see average annual returns increase by 4-6% compared to self-managed units, once vacancy and arrears losses are factored out.'
      ),
    ],
    faq: [
      {
        question: 'How does the rent guarantee work?',
        answer:
          'Once enrolled, we deposit your full monthly rent into your account on the agreed date regardless of whether the tenant has paid. If arrears occur, our team handles collections and LTB filings. You receive rent without interruption.',
      },
      {
        question: 'Is there a cap on the guarantee amount?',
        answer:
          'The guarantee covers up to the full lease amount for units with tenants who pass our enhanced screening. There is no per-month cap. Coverage details are outlined in your service agreement.',
      },
      {
        question: 'What if the tenant stops paying altogether?',
        answer:
          'We continue paying your guaranteed rent while pursuing arrears through the LTB process. If eviction is required, our team handles the entire legal process. Your income stream is protected throughout.',
      },
    ],
    seo: {
      metaTitle: 'Rent Guarantee Program | MoveSmart Rentals',
      metaDescription:
        'Guaranteed monthly rent payments for Ontario landlords. No claim forms, no delays. We cover missed rent and handle LTB collections on your behalf.',
    },
  },
  {
    slug: 'rental-preparation',
    title: 'Rental Preparation',
    shortDescription:
      'Professional cleaning, staging, and photography before listing',
    icon: 'paintbrush',
    audience: 'owner',
    order: 5,
    body: [
      textBlock(
        'First impressions drive rental decisions. Our rental preparation service transforms vacant or tired units into move-in-ready showpieces through professional deep cleaning, minor repairs, and strategic staging. Properties prepared by our team rent 23% faster and command 8-12% higher monthly rents on average.'
      ),
      textBlock(
        'We coordinate trusted trades for painting, fixture updates, and appliance servicing. Our staging team uses a curated inventory of modern furnishings designed for rental photography -- no personal items, no clutter, just clean lines that photograph well and appeal to the broadest tenant pool.'
      ),
      textBlock(
        'Professional photography is included with every preparation package. Our photographers use wide-angle lenses, HDR processing, and twilight exterior shots for premium listings. The result: more clicks, more showings, and faster placements.'
      ),
    ],
    faq: [
      {
        question: 'What does the rental preparation package include?',
        answer:
          'The standard package covers professional deep cleaning, minor repairs (patching, paint touch-ups), staging with our furnishing inventory, and professional photography (15-25 photos plus a virtual tour). Premium packages add painting, fixture upgrades, and twilight photography.',
      },
      {
        question: 'How long does preparation take?',
        answer:
          'Standard preparation takes 3-5 business days from initial walkthrough to photo-ready unit. Rush service (2 days) is available for an additional fee. We schedule around tenant move-out dates to minimize vacancy.',
      },
      {
        question: 'Do I need to purchase furniture for staging?',
        answer:
          'No. We use our own staging inventory on a loan basis for the listing period. Furniture is removed once a tenant is placed. There is no purchase or rental fee -- it is included in the preparation package.',
      },
    ],
    seo: {
      metaTitle: 'Rental Preparation & Staging | MoveSmart',
      metaDescription:
        'Professional cleaning, staging, and photography for rental properties. Rent 23% faster and command higher monthly rents with move-in-ready presentation.',
    },
  },
  {
    slug: 'rental-marketing',
    title: 'Rental Marketing',
    shortDescription:
      'Multi-channel listing distribution across MLS, portals, and social media',
    icon: 'megaphone',
    audience: 'owner',
    order: 6,
    body: [
      textBlock(
        'Our rental marketing engine distributes your listing across 30+ channels simultaneously: MLS (via TRREB, OREB, and regional boards), Kijiji, Facebook Marketplace, Zumper, PadMapper, Rentals.ca, and targeted Instagram and Google ads. We do not rely on a single portal -- we blanket every channel where Ontario renters search.'
      ),
      textBlock(
        'Each listing is copywritten by our team with SEO-optimized descriptions, neighbourhood context, and commute-time callouts. We A/B test listing headlines and update photos weekly until the unit is leased. Our analytics dashboard shows you real-time impression, inquiry, and showing data.'
      ),
      textBlock(
        'For premium properties, we deploy video walkthroughs, 3D Matterport tours, and geo-targeted social media campaigns. Our average cost-per-lead across Ontario is 60% lower than owner-run listings because of our bulk media buying and established portal partnerships.'
      ),
    ],
    faq: [
      {
        question: 'Which listing platforms do you use?',
        answer:
          'We syndicate across 30+ platforms including MLS (TRREB, OREB), Kijiji, Facebook Marketplace, Zumper, PadMapper, Rentals.ca, Realtor.ca, and our own website. Premium listings also receive targeted Instagram and Google Display ads.',
      },
      {
        question: 'Can I see how my listing is performing?',
        answer:
          'Yes. Your owner portal includes a real-time marketing dashboard showing impressions, inquiries, showings booked, and applicant pipeline status across all channels. We send weekly performance summaries by email.',
      },
      {
        question: 'Do you handle all tenant inquiries?',
        answer:
          'We handle 100% of inbound inquiries. Our team responds within 2 hours during business hours (9am-9pm, 7 days). We pre-qualify applicants by phone before scheduling any showings, saving you time and ensuring only serious candidates view your property.',
      },
    ],
    seo: {
      metaTitle: 'Rental Marketing Services | MoveSmart',
      metaDescription:
        'Multi-channel rental marketing across 30+ platforms. MLS, Kijiji, social media, and targeted ads. 60% lower cost-per-lead than owner-run listings.',
    },
  },
  {
    slug: 'portal-technology',
    title: 'Portal Technology',
    shortDescription:
      'Self-serve online portal for property management and tenant communication',
    icon: 'monitor',
    audience: 'both',
    order: 7,
    body: [
      textBlock(
        'Our owner and tenant portal provides 24/7 self-serve access to everything you need. Owners can view real-time financial reports, track maintenance requests, approve tenant applications, and download tax-ready statements. Tenants submit maintenance requests, pay rent online, and communicate with management -- all in one place.'
      ),
      textBlock(
        'The portal is built on enterprise-grade infrastructure with bank-level encryption, two-factor authentication, and role-based access controls. Document storage keeps leases, inspection reports, and receipts organized and accessible from any device.'
      ),
      textBlock(
        'Automated notifications keep everyone informed: rent reminders, maintenance updates, lease renewal alerts, and financial summaries are sent via email and in-app push notifications. Our average owner login rate is 3.2 times per week -- the portal becomes your central command for property management.'
      ),
    ],
    faq: [
      {
        question: 'Is the portal included with all service plans?',
        answer:
          'Yes. Every property owner and tenant receives full portal access at no additional cost. The portal is available on web and mobile (iOS and Android) and includes all features: financials, maintenance tracking, document storage, and communications.',
      },
      {
        question: 'Can tenants pay rent through the portal?',
        answer:
          'Yes. Tenants can set up automatic monthly payments via bank transfer (pre-authorized debit) or pay manually each month. Payment confirmations are generated automatically and visible to both tenant and owner.',
      },
      {
        question: 'How is my financial data protected?',
        answer:
          'We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. The portal supports two-factor authentication and session timeout controls. We are SOC 2 compliant and undergo annual third-party security audits.',
      },
    ],
    seo: {
      metaTitle: 'Owner & Tenant Portal | MoveSmart',
      metaDescription:
        'Self-serve property management portal with real-time financials, maintenance tracking, and secure tenant communication. Access anywhere, anytime.',
    },
  },
  {
    slug: 'pricing',
    title: 'Pricing',
    shortDescription:
      'Transparent, success-based pricing with zero upfront cost',
    icon: 'calculator',
    audience: 'owner',
    order: 8,
    body: [
      textBlock(
        "Our pricing model is built on a simple principle: we succeed when you succeed. There are no upfront fees, no listing charges, and no monthly retainers. You pay a single success fee when we place a qualified tenant. If we don't place a tenant, you don't pay."
      ),
      textBlock(
        'The success fee is calculated as a percentage of the first month\'s rent, varying by service tier and market. All fees are disclosed upfront in your service agreement before any work begins. There are no hidden charges for photography, marketing, or screening -- everything is included in one transparent fee.'
      ),
      textBlock(
        "For multi-unit owners and portfolio clients, we offer volume discounts and annual management agreements with predictable monthly costs. Contact our team for a custom quote tailored to your portfolio size and service requirements. Every plan includes full portal access, marketing, and screening."
      ),
    ],
    faq: [
      {
        question: 'Do I pay anything upfront?',
        answer:
          'No. Our success-based model means you pay nothing until we place a qualified tenant. There are no listing fees, marketing fees, or retainers. The success fee is charged only after a lease is signed.',
      },
      {
        question: 'What is included in the success fee?',
        answer:
          'Everything: professional photography, multi-channel marketing, tenant screening, lease preparation, and portal access. There are no add-on charges. The fee is a percentage of the first month\'s rent, disclosed before we begin.',
      },
      {
        question: 'Are there discounts for multiple properties?',
        answer:
          'Yes. We offer tiered volume pricing for owners with 2+ units. Portfolio clients with 10+ units qualify for custom annual management agreements. Contact us for a tailored quote.',
      },
    ],
    seo: {
      metaTitle: 'Pricing | MoveSmart Rentals',
      metaDescription:
        'Transparent, success-based pricing for property management. Zero upfront cost, no hidden fees. Pay only when we place a qualified tenant.',
    },
  },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Seeding Ontario province and 8 owner services...\n')

  // Seed province
  await client.createOrReplace(ontarioProvince)
  console.log('Created province: Ontario')

  // Seed services
  for (const svc of services) {
    const doc = {
      _id: `service-${svc.slug}`,
      _type: 'service',
      title: svc.title,
      slug: { _type: 'slug', current: svc.slug },
      shortDescription: svc.shortDescription,
      icon: svc.icon,
      audience: svc.audience,
      order: svc.order,
      body: svc.body,
      faq: svc.faq,
      seo: svc.seo,
      publishing: {
        noindex: false,
        includedInSitemap: true,
      },
    }

    await client.createOrReplace(doc)
    console.log(`Created service: ${svc.title}`)
  }

  console.log(`\nDone. Created 1 province + ${services.length} services.`)
}

main().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
