import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
import {
  US_STATES,
  getStateBySlug,
  type CityFeature,
  type StateData,
} from '@/data/geo-market-data'
import type { FaqItem } from '@/types/blocks'
import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

import { StateCityGrid } from './_state-city-grid'
import { StateProcessTimeline } from './_state-process-timeline'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const data = getStateBySlug(state)
  const title = data?.name ?? state

  return generatePageMetadata({
    path: `/us/${state}`,
    fallbackTitle: `Leasing Platform in ${title}`,
    fallbackDescription: `Full-service leasing across ${title}: strategic pricing, multi-channel marketing, state-compliant tenant qualification, and lease execution. Zero upfront cost, success-fee on placement.`,
  })
}

// ---------------------------------------------------------------------------
// State-specific copy (value-prop bullets + FAQs)
// ---------------------------------------------------------------------------

interface ValueProp {
  title: string
  description: string
}

const VALUE_PROPS: Record<string, ValueProp[]> = {
  florida: [
    {
      title: 'HOA-compliant marketing',
      description:
        'Listings respect every Florida association rule on signage, showings, and tenant approvals so placements survive board review.',
    },
    {
      title: 'Snowbird-aware pricing',
      description:
        'Seasonal lease structures and furnished-rate models calibrated to November–April demand from out-of-state renters.',
    },
    {
      title: 'Furnished vs. unfurnished playbook',
      description:
        'We model both scenarios on every property so owners pick the configuration that yields the strongest net annualised rent.',
    },
  ],
  texas: [
    {
      title: 'TREC-licensed partner brokerage',
      description:
        'Every Texas placement runs through a TREC-licensed broker on TAR/TREC forms, with disclosures and IABS handled correctly.',
    },
    {
      title: 'Build-to-rent lease-up capacity',
      description:
        'Lease-up workflows built for the DFW and Austin BTR pipeline — from pre-marketing to staggered move-in coordination.',
    },
    {
      title: 'No state income tax appeal',
      description:
        'We position your listing for the relocation demand actually arriving in Texas — corporate transferees and remote workers from higher-tax states.',
    },
  ],
  california: [
    {
      title: 'AB 1482 & local rent-control aware',
      description:
        'Statewide AB 1482 caps and stricter local ordinances (LA RSO, San Francisco, Oakland, San Jose) are checked before every rent recommendation.',
    },
    {
      title: 'Tenant Protection Act compliant leases',
      description:
        'Just-cause language, mandatory disclosures, and the current security-deposit cap are baked into every lease we sign.',
    },
    {
      title: 'Earthquake and natural-hazard disclosure handled',
      description:
        'Required NHD reports, lead, mold, bedbug, and Megan’s Law notices included on every California placement so owners stay compliant.',
    },
  ],
  'new-york': [
    {
      title: 'HSTPA-compliant workflows',
      description:
        'Application fees, security-deposit caps, and renewal notices follow the 2019 Housing Stability and Tenant Protection Act exactly.',
    },
    {
      title: 'Co-op board package coordination',
      description:
        'For Manhattan and Brooklyn co-ops we assemble the full board package and shepherd tenants through the interview.',
    },
    {
      title: 'Five-borough plus upstate coverage',
      description:
        'Same playbook across NYC, Westchester, Long Island, the Hudson Valley, Albany, and Buffalo — one team, one standard.',
    },
  ],
  illinois: [
    {
      title: 'CRLTO-aware Chicago leasing',
      description:
        'Chicago’s Residential Landlord & Tenant Ordinance, deposit-interest rules, and the RLTO summary attachment are built into every lease.',
    },
    {
      title: 'Chicagoland SFH portfolios',
      description:
        'Single-family rental playbooks for the collar counties — Naperville, Schaumburg, Oak Park, Evanston — with suburban-tenant qualification.',
    },
    {
      title: 'Cook-County-specific disclosures',
      description:
        'The Cook County Residential Tenant Landlord Ordinance (RTLO) and just-cause requirements are applied where they govern.',
    },
  ],
  georgia: [
    {
      title: 'Intown condo + suburban SFH',
      description:
        'Distinct strategies for Midtown / Buckhead high-rise condos and Cobb / Gwinnett / Forsyth single-family rentals.',
    },
    {
      title: 'Quick-turn turnover',
      description:
        'In-house make-ready coordination — paint, clean, HVAC — keeps Georgia properties leased again within 21 days of vacancy on average.',
    },
    {
      title: 'Institutional-ready lease-ups',
      description:
        'Built-to-rent and SFR portfolio lease-up support for the institutional owners now active across Metro Atlanta.',
    },
  ],
  'north-carolina': [
    {
      title: 'Triangle + Charlotte coverage',
      description:
        'Local teams in Raleigh-Durham-Chapel Hill and across the Charlotte MSA — two of the strongest in-migration markets in the country.',
    },
    {
      title: 'Tech-corridor professionals',
      description:
        'Tenant qualification calibrated to Research Triangle Park, the Charlotte fintech corridor, and the relocation flows they generate.',
    },
    {
      title: 'NC GS 42 compliant leases',
      description:
        'North Carolina General Statutes Chapter 42 — late-fee caps, security-deposit limits, and notice periods — applied to every placement.',
    },
  ],
  arizona: [
    {
      title: 'Phoenix MSA + Tucson',
      description:
        'Coverage from Scottsdale and Tempe through Mesa, Chandler, Gilbert, and into Tucson — one in-market team across the state.',
    },
    {
      title: 'Seasonal pricing',
      description:
        'Snowbird and winter-visitor demand modelled into pricing, with furnished-rental structures available for the November–April window.',
    },
    {
      title: 'ARS Title 33 compliant leases',
      description:
        'Arizona Revised Statutes Title 33 governs every disclosure, deposit cap, and notice period we use on Arizona placements.',
    },
  ],
  colorado: [
    {
      title: 'Denver MSA + ski markets',
      description:
        'Same standard across Denver, Boulder, and Fort Collins as in the resort markets — Vail, Aspen, Breckenridge, Steamboat.',
    },
    {
      title: 'Mountain-corridor turnover',
      description:
        'Seasonal-staff housing and resort-employee leases handled with the cadence those markets actually need.',
    },
    {
      title: 'Local-housing-ordinance aware',
      description:
        'Denver short-term-rental rules, Boulder occupancy limits, and mountain-county licensing checked before every listing.',
    },
  ],
  'new-jersey': [
    {
      title: 'Hudson + Newark + Edison',
      description:
        'Deep coverage from Jersey City and Hoboken through Newark and into the Edison / Middlesex corridor — the strongest rental submarkets in NJ.',
    },
    {
      title: 'Anti-Eviction Act compliant',
      description:
        'New Jersey’s Anti-Eviction Act limits the grounds you can use to recover possession. Every lease we sign is structured around it.',
    },
    {
      title: 'Strong rental demand',
      description:
        'NYC commuter overflow plus pharma, financial-services, and Newark Airport employment keep NJ vacancy in the low single digits.',
    },
  ],
}

const FAQS: Record<string, FaqItem[]> = {
  florida: [
    {
      question: 'Do you handle HOA rental approval?',
      answer:
        'Yes. We submit the association application on the owner’s behalf, coordinate the screening fee, and shepherd the prospective tenant through the HOA interview where one is required. We never sign a lease before approval comes back.',
    },
    {
      question: 'How are short-term snowbird rentals handled?',
      answer:
        'Florida treats most rentals under six months as transient — that triggers state and county tourist development tax. We can run a seasonal furnished structure or a standard 12-month lease; the right answer depends on the city’s short-term-rental rules and the HOA. We model both before recommending.',
    },
    {
      question: 'What about hurricane-zone disclosures?',
      answer:
        'Properties in coastal counties require flood-zone and windstorm disclosures. We attach the required documentation and confirm the tenant has acknowledged it before the lease is signed.',
    },
    {
      question: 'What is the security deposit limit in Florida?',
      answer:
        'Florida does not cap the security deposit by statute, but landlords must follow the deposit-handling rules in Florida Statutes Chapter 83 — separate account or surety bond, and a written notice to the tenant within 30 days of receipt.',
    },
    {
      question: 'How does lease termination work in Florida?',
      answer:
        'For a month-to-month lease, either party gives 15 days’ written notice before the end of a monthly period. For a fixed-term lease, termination follows the lease itself, with the statutory non-renewal and early-termination grounds in Chapter 83.',
    },
    {
      question: 'Are tenants screened against the Florida Sex Offender Registry?',
      answer:
        'Yes. Our screening includes the Florida Department of Law Enforcement sex-offender database alongside national criminal history, credit, eviction, and income verification.',
    },
  ],
  texas: [
    {
      question: 'Do you work through a TREC-licensed broker?',
      answer:
        'Yes. Every Texas placement runs through a TREC-licensed broker on Texas Association of Realtors / TREC-promulgated forms. The Information About Brokerage Services (IABS) notice is provided at first substantive contact.',
    },
    {
      question: 'Does Texas have rent control?',
      answer:
        'No. Texas state law prohibits municipal rent control, so rents are set by the market. We use live comps on every listing to anchor pricing to where deals are actually closing.',
    },
    {
      question: 'How fast does the security deposit get returned?',
      answer:
        'Texas Property Code Section 92.103 requires the deposit (or an itemized list of deductions) to be returned within 30 days of the tenant surrendering possession and providing a forwarding address. We coordinate the move-out inspection so this timeline is met.',
    },
    {
      question: 'Which lease forms do you use in Texas?',
      answer:
        'We use the standard TAR Residential Lease (TXR-2001) for residential placements through licensed agents, with addenda for pets, lead-based paint, propane, parking, and any property-specific rules.',
    },
    {
      question: 'What disclosures are required on a Texas lease?',
      answer:
        'Required disclosures include lead-based paint (pre-1978), parties liable for the lease, special flood-hazard area where applicable, the management/owner contact (Section 92.201), and the IABS form.',
    },
    {
      question: 'Do you handle build-to-rent lease-ups?',
      answer:
        'Yes. We run lease-up workflows for the DFW and Austin BTR pipeline — pre-marketing, model-home staffing protocols, staggered move-ins, and weekly absorption reporting to ownership.',
    },
  ],
  california: [
    {
      question: 'How does AB 1482 affect rent increases?',
      answer:
        'AB 1482 caps annual rent increases on covered units at 5% plus regional CPI, with a 10% maximum. Many California cities (Los Angeles, San Francisco, Oakland, San Jose, Berkeley, and others) have stricter local rent-control ordinances that take precedence. We check the strictest applicable rule before recommending a renewal rate.',
    },
    {
      question: 'What is the security deposit limit in California?',
      answer:
        'As of July 1, 2024, the California security-deposit cap is one month’s rent for both furnished and unfurnished units, under AB 12. A narrow exception allows small landlords (two or fewer units) to collect up to two months. We default to the one-month cap on every placement.',
    },
    {
      question: 'How does the eviction process work under just-cause?',
      answer:
        'AB 1482 requires just cause to terminate covered tenancies after 12 months. At-fault grounds (non-payment, lease violation) allow standard notice; no-fault grounds (owner move-in, withdrawal from rental market) require relocation assistance equal to one month’s rent. Local just-cause ordinances may be stricter.',
    },
    {
      question: 'What disclosures are required on a California lease?',
      answer:
        'Required disclosures include lead-based paint (pre-1978), Megan’s Law database notice, mold, bedbug, Proposition 65, demolition notices where applicable, and a Natural Hazard Disclosure (NHD) report for flood, fire, earthquake, and seismic-fault zones.',
    },
    {
      question: 'How are tenant screening fees handled?',
      answer:
        'California caps the application screening fee (Civil Code Section 1950.6) at a statutory maximum that adjusts annually with CPI. We collect only the documented out-of-pocket cost of the screening and provide a receipt itemising it.',
    },
    {
      question: 'Do you handle earthquake disclosure and seismic-retrofit notices?',
      answer:
        'Yes. The NHD report covers earthquake-fault zones and seismic-hazard zones. For properties in soft-story retrofit jurisdictions (Los Angeles, San Francisco), we confirm retrofit status and include the required notice.',
    },
  ],
  'new-york': [
    {
      question: 'How does HSTPA change the leasing process?',
      answer:
        'The 2019 Housing Stability and Tenant Protection Act caps application fees at $20, caps security deposits at one month’s rent, lengthens notice periods for non-renewal, and limits late fees to 5% of monthly rent or $50, whichever is less. These apply statewide on most market-rate units.',
    },
    {
      question: 'Do you handle NYC rent-stabilised units?',
      answer:
        'Yes, where applicable. We follow the current DHCR rent-stabilisation rules, including the Rent Guidelines Board annual adjustments, preferential-rent treatment, and the lease-rider requirements. Most market-rate units in newer buildings are not rent-stabilised.',
    },
    {
      question: 'Who pays the broker fee in New York?',
      answer:
        'New York City’s FARE Act, effective June 11, 2025, generally requires landlords to pay broker fees when the broker is hired by the landlord. We disclose fee responsibility before any showing and never collect a tenant-paid fee where the FARE Act prohibits it.',
    },
    {
      question: 'What does the implied warranty of habitability require?',
      answer:
        'New York Real Property Law Section 235-b implies a warranty of habitability into every residential lease. Owners must keep the unit fit for human habitation, with working heat, hot water, plumbing, and structural integrity. We coordinate with property managers and maintenance vendors to keep this satisfied.',
    },
    {
      question: 'How long is the notice period for non-renewal?',
      answer:
        'HSTPA requires 30 days’ notice for tenancies under one year, 60 days for tenancies of one to two years, and 90 days for tenancies of more than two years. We track each tenant’s start date and trigger notice on time.',
    },
    {
      question: 'Do you cover upstate New York?',
      answer:
        'Yes. We run the same workflow across all five boroughs, Westchester, Long Island, the Hudson Valley, the Capital Region (Albany, Saratoga), and Buffalo / Rochester.',
    },
  ],
  illinois: [
    {
      question: 'Does the Chicago RLTO apply to my property?',
      answer:
        'The Chicago Residential Landlord & Tenant Ordinance (CRLTO) applies to most rental units inside city limits, with limited exemptions for owner-occupied buildings of six units or fewer. Outside Chicago, the Illinois Landlord and Tenant Act applies, and Cook County now has its own RTLO. We apply whichever rules govern the specific property.',
    },
    {
      question: 'Do I have to pay security-deposit interest in Chicago?',
      answer:
        'Yes — landlords who hold a CRLTO-covered deposit for more than six months must pay interest at the rate published annually by the City of Chicago. The deposit must be held in an Illinois-chartered financial institution and disclosed in writing to the tenant.',
    },
    {
      question: 'What notice periods does Illinois require?',
      answer:
        'For month-to-month tenancies under the Illinois statute, 30 days’ written notice is required from either party. The Chicago RLTO requires 30, 60, or 120 days depending on tenancy length for non-renewal. We trigger the right notice for each property.',
    },
    {
      question: 'Is there rent control in Illinois?',
      answer:
        'No. The Rent Control Preemption Act prohibits local rent control statewide. Rents are set by the market, and we use live comps to price every listing.',
    },
    {
      question: 'What disclosures are required on an Illinois lease?',
      answer:
        'Statewide: lead-based paint (pre-1978) and radon. Chicago adds the RLTO summary attachment, the bedbug disclosure, the Heat Disclosure form for tenant-paid utilities, and the security-deposit summary. We attach all of them to every lease.',
    },
    {
      question: 'Do you cover the Chicago collar counties?',
      answer:
        'Yes — we serve Cook, DuPage, Lake, Kane, McHenry, and Will counties with the same in-market team. The compliance overlay shifts (RLTO inside Chicago, Cook County RTLO in unincorporated Cook, Illinois Landlord and Tenant Act elsewhere) but the placement workflow is consistent.',
    },
  ],
  georgia: [
    {
      question: 'How much notice is required to end a Georgia lease?',
      answer:
        'For a month-to-month tenancy, the landlord must give 60 days’ written notice and the tenant must give 30 days. For a fixed-term lease, termination follows the lease itself.',
    },
    {
      question: 'What is the security deposit rule under the Georgia Security Deposit Act?',
      answer:
        'For owners of more than ten units (or who use a property manager), the deposit must be held in an escrow account at a state or federal institution. The deposit (or an itemized list of deductions) must be returned within one month after the tenant moves out, with proper notice rules followed.',
    },
    {
      question: 'Does Georgia have rent control?',
      answer:
        'No. Georgia law prohibits local rent control, so rents are set by the market. We price every listing against live Atlanta MSA comps.',
    },
    {
      question: 'What fair-housing rules do you follow?',
      answer:
        'We follow the federal Fair Housing Act and the Georgia Fair Housing Law on every placement — no protected-class screening, no steering, and uniform written criteria applied to every applicant.',
    },
    {
      question: 'Do you handle institutional SFR lease-ups?',
      answer:
        'Yes. We have lease-up capacity for the SFR and BTR portfolios active across Metro Atlanta, including model-home staffing, weekly absorption reporting, and pre-marketing while construction completes.',
    },
    {
      question: 'How fast can you place a tenant in Atlanta?',
      answer:
        'In Metro Atlanta our average days-on-market is in the high teens at strategic pricing. We pre-market the property roughly 30 days ahead of the move-out date so the next placement closes inside the standard make-ready window.',
    },
  ],
  'north-carolina': [
    {
      question: 'What does NC General Statutes Chapter 42 require?',
      answer:
        'Chapter 42 of the North Carolina General Statutes governs residential landlord–tenant law: security deposits, late fees, the warranty of habitability, eviction process, and the notice periods we follow.',
    },
    {
      question: 'How are late fees capped in North Carolina?',
      answer:
        'NC GS 42-46 caps the late fee at the greater of $15 or 5% of the rental payment, charged no earlier than the fifth day after rent is due. We bake the cap directly into every NC lease.',
    },
    {
      question: 'What is the security deposit limit?',
      answer:
        'NC GS 42-51 caps the security deposit based on tenancy length: up to 1.5 months’ rent for month-to-month, up to two months’ rent for terms longer than a month. The deposit must be held in a NC trust account or covered by a bond.',
    },
    {
      question: 'How quickly must the deposit be returned?',
      answer:
        'Within 30 days after termination of the tenancy. If full accounting is not yet possible, a partial accounting with the balance returned within 60 days is permitted by statute.',
    },
    {
      question: 'Do you handle the Research Triangle market?',
      answer:
        'Yes. We have a dedicated team covering Raleigh-Durham-Chapel Hill / RTP, with tenant qualification calibrated to relocation traffic from the major tech, pharma, and university employers in the Triangle.',
    },
    {
      question: 'What about Charlotte coverage?',
      answer:
        'We cover the full Charlotte MSA — Mecklenburg, Cabarrus, Union, Iredell, and across the SC line into York — with the same workflow used in the Triangle.',
    },
  ],
  arizona: [
    {
      question: 'What does ARS Title 33 cover?',
      answer:
        'Arizona Revised Statutes Title 33, Chapter 10 — the Arizona Residential Landlord and Tenant Act — governs every residential lease in the state: deposits, disclosures, repair obligations, and the eviction process.',
    },
    {
      question: 'What is the security deposit limit in Arizona?',
      answer:
        'ARS 33-1321 caps the deposit at 1.5 months’ rent. Any prepaid rent or non-refundable fee must be designated as such in writing. The deposit must be returned, with itemised deductions, within 14 business days after move-out.',
    },
    {
      question: 'How do pet rules work in Arizona?',
      answer:
        'Service and emotional-support animals are protected under federal Fair Housing rules regardless of pet policy. For non-protected pets, we work with the owner to set deposit, monthly pet rent, and breed/weight criteria — all uniformly applied to every applicant.',
    },
    {
      question: 'How is seasonal demand handled?',
      answer:
        'Greater Phoenix and Tucson see significant November–April demand from winter visitors. We can structure furnished short-term placements with the correct transaction-privilege tax registration, or hold for a standard 12-month tenant — whichever yields the strongest annualised return.',
    },
    {
      question: 'Does Arizona have rent control?',
      answer:
        'No. ARS 33-1329 prohibits local rent control, so rents are set by the market across the state.',
    },
    {
      question: 'What disclosures are required?',
      answer:
        'Required disclosures include lead-based paint (pre-1978), the Landlord and Tenant Act notice, the name and address of the person authorised to manage the property and receive notices, and the bedbug disclosure where applicable.',
    },
  ],
  colorado: [
    {
      question: 'What does Colorado Revised Statutes Title 38 require?',
      answer:
        'CRS Title 38, Article 12 covers Colorado’s residential landlord–tenant rules: warranty of habitability, security-deposit handling, mandatory disclosures, and the eviction process.',
    },
    {
      question: 'How quickly must the security deposit be returned in Colorado?',
      answer:
        'Within one month of termination by default, or up to 60 days if the lease so provides. The owner must provide an itemised written statement for any deductions. We coordinate the move-out inspection so the statutory window is met.',
    },
    {
      question: 'Is rent control allowed in Colorado?',
      answer:
        'No. Colorado prohibits municipal rent control statewide. Rents are set by the market, and we price against live Front Range and resort-market comps.',
    },
    {
      question: 'How do Denver short-term rental rules work?',
      answer:
        'Denver requires a short-term rental license tied to the owner’s primary residence. Most investor-owned properties in Denver are leased on a standard 12-month basis. We confirm the licensing status before marketing.',
    },
    {
      question: 'Do you cover the mountain resort markets?',
      answer:
        'Yes — Vail, Aspen, Breckenridge, Steamboat, Telluride, and Crested Butte. We run seasonal-staff housing, long-term-employee leases, and owner-secondary placements with the cadence those markets need.',
    },
    {
      question: 'What disclosures are required on a Colorado lease?',
      answer:
        'Statewide: lead-based paint (pre-1978), the methamphetamine-disclosure obligation, the radon disclosure, and the bedbug disclosure where applicable. Some cities (Denver, Boulder) add local notices that we attach automatically.',
    },
  ],
  'new-jersey': [
    {
      question: 'How does the Anti-Eviction Act change leasing?',
      answer:
        'New Jersey’s Anti-Eviction Act (NJSA 2A:18-61.1) limits the grounds on which a landlord can recover possession to a specific statutory list. Owners cannot simply refuse to renew. Every lease and every renewal we structure is built around the Act.',
    },
    {
      question: 'What is the security deposit limit?',
      answer:
        'New Jersey caps the security deposit at 1.5 months’ rent. The deposit must be held in a separate interest-bearing account at a NJ-chartered institution and disclosed to the tenant in writing within 30 days.',
    },
    {
      question: 'What does the Truth-in-Renting Act require?',
      answer:
        'For multiple-dwelling buildings (three units or more), landlords must distribute the Truth-in-Renting statement to every tenant at lease signing. We attach it automatically on covered properties.',
    },
    {
      question: 'Do you cover the entire state?',
      answer:
        'Yes. Hudson County (Jersey City, Hoboken), Essex / Newark, Bergen, Middlesex (Edison), Mercer (Princeton), Monmouth, Ocean, and across South Jersey to Camden / Cherry Hill. Same workflow statewide.',
    },
    {
      question: 'How are rent increases handled?',
      answer:
        'New Jersey has no statewide rent cap, but many municipalities have local rent-control ordinances (Jersey City, Newark, Hoboken, Elizabeth, and others). We check the local rule before recommending any renewal rate.',
    },
    {
      question: 'What disclosures are required?',
      answer:
        'Lead-based paint (pre-1978), the Truth-in-Renting statement on covered properties, flood-zone disclosure for properties in FEMA flood zones, and the lead-paint inspection certification under the 2022 law for pre-1978 single-family / two-family rentals.',
    },
  ],
}

const GENERIC_VALUE_PROPS: ValueProp[] = [
  {
    title: 'In-market leasing team',
    description:
      'Local agents who show, screen, and sign — not a call centre routing tenants through email queues.',
  },
  {
    title: 'State-compliant leases',
    description:
      'Every lease is drafted on the right form for the jurisdiction, with the required disclosures attached.',
  },
  {
    title: 'Zero upfront cost',
    description:
      'You pay nothing until a qualified tenant signs. Success-fee on placement, no monthly retainer.',
  },
]

const GENERIC_FAQS: FaqItem[] = [
  {
    question: 'How does MoveSmart price my rental?',
    answer:
      'We pull live closed-lease comps in your specific neighbourhood, layer in seasonality and inventory absorption, and recommend a range. You set the final number; we explain the trade-offs.',
  },
  {
    question: 'How long does placement typically take?',
    answer:
      'Most placements close within 14–28 days of going live, depending on market and pricing. We report weekly on showings, applications, and pricing posture so you can adjust if needed.',
  },
  {
    question: 'How do you screen tenants?',
    answer:
      'Credit, criminal background, eviction history, income verification (3× gross rent), and rental references. Uniform written criteria applied to every applicant — Fair Housing compliant.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Zero upfront. We charge a success fee only when a qualified tenant signs the lease. No monthly retainer, no setup fee, cancel anytime.',
  },
  {
    question: 'Do you handle the move-in inspection?',
    answer:
      'Yes. We document condition with photos and a signed condition report, collect first month’s rent and deposit, and coordinate keys / access.',
  },
  {
    question: 'Can you work with my existing property manager?',
    answer:
      'Yes. Many owners use MoveSmart purely for tenant placement and keep their existing manager for ongoing operations. We hand off cleanly at lease signing.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pick an editorial-banner image: prefer a city image that's NOT used as the hero. */
function pickEditorialBannerImage(data: StateData): { url: string; alt: string } {
  const candidate = data.topCities.find(
    (c) => c.imageUrl && c.imageUrl !== data.heroImageUrl,
  )
  if (candidate) {
    return { url: candidate.imageUrl, alt: candidate.imageAlt }
  }
  // Fallback to the hero if every city shares it (shouldn't happen with current data).
  return { url: data.heroImageUrl, alt: data.heroImageAlt }
}

function getValueProps(slug: string): ValueProp[] {
  return VALUE_PROPS[slug] ?? GENERIC_VALUE_PROPS
}

function getFaqs(slug: string): FaqItem[] {
  return FAQS[slug] ?? GENERIC_FAQS
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params

  if (!slugSchema.safeParse(state).success) {
    notFound()
  }

  const data: StateData | null = getStateBySlug(state)

  if (!data) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  const cities: CityFeature[] = data.topCities
  const valueProps = getValueProps(state)
  const faqs = getFaqs(state)
  const editorialBanner = pickEditorialBannerImage(data)

  const timelineSteps = [
    {
      title: 'Strategic pricing on live comps',
      description: `We pull active and recently-leased ${data.name} comparables, factor in seasonality, and recommend a defensible price range — not a guess.`,
    },
    {
      title: 'Marketing across every channel',
      description:
        'Listings syndicate to Zillow, Trulia, Realtor.com, the local MLS, Apartments.com, Facebook Marketplace, and every relevant state portal — with professional photography on every property.',
    },
    {
      title: `Tenant qualification with ${data.name} fair-housing compliance`,
      description:
        'Credit, criminal, eviction, income (3× rent), and rental references. Uniform written criteria applied to every applicant under federal and state fair-housing law.',
    },
    {
      title: `Lease signing on a ${data.name}-compliant lease`,
      description:
        'The right lease form for the jurisdiction with every required disclosure attached, executed digitally, plus a documented move-in inspection.',
    },
  ]

  return (
    <main>
      {/* JSON-LD */}
      <JsonLd
        data={buildBreadcrumbListSchema({
          crumbs: [
            { name: 'Home', url: siteUrl },
            { name: 'United States', url: `${siteUrl}/us/` },
            { name: data.name, url: `${siteUrl}/us/${state}/` },
          ],
        })}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'United States', href: '/us/' },
            { label: data.name, href: `/us/${state}/` },
          ]}
        />
      </div>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <PageHeroBlock
        kicker="United States"
        eyebrow={`${data.name} · Full-Service Leasing`}
        headline={`Leasing across ${data.name}`}
        lede={data.market.intro}
        cta1={{ label: 'Get a rental analysis', href: '/contact/' }}
        cta2={{ label: 'See pricing', href: '/pricing/' }}
        theme="dark"
        backgroundImageUrl={data.heroImageUrl}
        backgroundImageAlt={data.heroImageAlt}
        city={data.name}
      />

      {/* ── 2. City grid ────────────────────────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Cities we serve
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Leasing across{' '}
              <span className="font-display italic text-brand-emerald">{data.name}</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Local expertise in every major {data.name} market — tenant placement,
              screening, lease execution, and move-in coordination from the same
              in-market team.
            </p>
          </div>

          <div className="mt-12">
            <StateCityGrid cities={cities} stateName={data.name} stateSlug={state} />
          </div>
        </div>
      </section>

      {/* ── 4. Why MoveSmart in [State] ─────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Why MoveSmart
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Built for{' '}
              <span className="font-display italic text-brand-emerald">{data.name}</span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {valueProps.map((vp, i) => (
              <div
                key={vp.title}
                className="relative rounded-2xl border border-slate-200/70 bg-[#FBFAF6] p-7 transition-colors duration-300 hover:border-brand-emerald/30"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sm italic text-brand-gold"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-xl font-normal leading-snug tracking-tight text-brand-navy">
                  {vp.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {vp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Editorial banner ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-navy py-16 sm:py-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src={editorialBanner.url}
            alt={editorialBanner.alt}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/40" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
            On the ground in {data.name}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="font-display italic text-emerald-300">{data.name}</span>
            <span aria-hidden="true" className="text-brand-gold">
              ,
            </span>{' '}
            leased properly
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Live comps, the right lease form, full disclosure compliance, and a tenant
            in place — without the owner ever taking a showing.
          </p>
        </div>
      </section>

      {/* ── 6. How leasing in [State] works ─────────────────────────────── */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              How leasing in{' '}
              <span className="font-display italic text-brand-emerald">{data.name}</span>{' '}
              works
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              The same four-step workflow on every {data.name} placement — designed
              around the state&apos;s specific compliance overlay.
            </p>
          </div>

          <div className="mt-14">
            <StateProcessTimeline stateName={data.name} steps={timelineSteps} />
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────────── */}
      <FAQBlock
        questions={faqs}
        title={`${data.name} leasing, answered`}
        schemaEnabled
      />

      {/* ── 8. Closing CTA strip ────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-brand-navy via-brand-navy to-[#0E2B52] p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 size-72 rounded-full bg-brand-emerald/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-20 size-72 rounded-full bg-brand-gold/10 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Ready when you are
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl">
                  List your {data.name} property
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
                <p className="mt-3 text-base text-white/70">
                  Zero upfront cost. Success-fee on placement only. Cancel anytime.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <a
                  href={PORTAL_OWNER_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-px hover:bg-brand-emerald-hover hover:shadow-lg"
                >
                  List my property
                </a>
                <Link
                  href="/rentals/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
                >
                  Browse rentals across {data.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy no-op CTA banner kept for consistency; renders nothing. */}
      <CTABannerBlock
        headline=""
        description=""
        primaryCta={{ label: '', href: '/contact/' }}
      />
    </main>
  )
}
