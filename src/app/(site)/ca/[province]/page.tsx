import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { generatePageMetadata } from '@/lib/metadata'
import {
  CANADA_PROVINCES,
  getProvinceBySlug,
  type ProvinceData,
} from '@/data/geo-market-data'
import { getFallbackProvince } from '@/lib/static-fallbacks'

import { EditorialBanner, HowItWorksTimeline } from './province-client-parts'

const slugSchema = z.string().regex(/^[a-z0-9-]+$/).max(100)

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  return CANADA_PROVINCES.map((p) => ({ province: p.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>
}): Promise<Metadata> {
  const { province } = await params
  const data = getProvinceBySlug(province) ?? null
  const fallback = data ? null : getFallbackProvince(province)
  const provinceName = data?.name ?? fallback?.title ?? province

  return generatePageMetadata({
    path: `/ca/${province}`,
    fallbackTitle: `Leasing Brokerage in ${provinceName}`,
    fallbackDescription: `Full-service leasing across ${provinceName}: tenant placement, screening, lease execution, and move-in coordination with zero upfront cost.`,
  })
}

// ---------------------------------------------------------------------------
// Province-specific copy (value props, how-it-works, FAQs)
// ---------------------------------------------------------------------------

interface ValueProp {
  icon: 'shield' | 'users' | 'sparkles' | 'pin'
  title: string
  description: string
}

interface ProvinceCopy {
  valueProps: [ValueProp, ValueProp, ValueProp]
  howItWorks: [
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string },
  ]
  faqs: Array<{ question: string; answer: string }>
}

const PROVINCE_COPY: Record<string, ProvinceCopy> = {
  ontario: {
    valueProps: [
      {
        icon: 'shield',
        title: 'RTA 2006 compliant',
        description:
          'Every lease is executed against the Ontario Residential Tenancies Act, with notice forms (N4, N12, N13) prepared correctly the first time.',
      },
      {
        icon: 'users',
        title: 'RECO-licensed brokerage',
        description:
          'All showings, offers, and lease negotiations are handled by a brokerage registered with the Real Estate Council of Ontario — not unlicensed leasing agents.',
      },
      {
        icon: 'sparkles',
        title: 'Standard Form 2229E ready',
        description:
          'We default to the Ontario Standard Lease Form 2229E required for residential leases signed on or after April 30, 2018 — with city-specific schedules pre-built.',
      },
    ],
    howItWorks: [
      {
        title: 'Strategic pricing for the Ontario market',
        description:
          'CMHC rent comparables, MLS-pulled actuals, and the rent-control guideline together set a defensible asking rent for your sub-market.',
      },
      {
        title: 'Marketing + MLS syndication',
        description:
          'Professional photo and floorplan capture, then full distribution across Realtor.ca, Kijiji, Zumper, Rentals.ca, Facebook Marketplace, and our agent network.',
      },
      {
        title: 'Tenant qualification with Ontario compliance',
        description:
          'Credit, employment, and reference checks under HRTO-compliant criteria. We cannot ask for what Ontario prohibits — and we know exactly what we can.',
      },
      {
        title: 'Lease signing on Form 2229E + move-in',
        description:
          'Standard Lease Form 2229E e-signed with your custom schedule, last-month deposit held in trust, and a documented move-in inspection on day one.',
      },
    ],
    faqs: [
      {
        question: 'Do you use the Ontario Standard Lease (Form 2229E)?',
        answer:
          'Yes. The Ontario Standard Lease (Residential Tenancy Agreement Form 2229E) is required for most residential tenancies signed on or after April 30, 2018. We default to it on every Ontario placement and attach a customized Schedule A with property rules, parking, and utility allocations.',
      },
      {
        question: 'How does the Ontario rent increase guideline work?',
        answer:
          'For most units first occupied before November 15, 2018, annual rent increases are capped at the provincial guideline (1.7% in 2024, 2.5% in 2025) and require 90 days written notice via Form N1. Units first occupied on or after November 15, 2018 are exempt from the guideline but still require the notice form and timing.',
      },
      {
        question: 'Can the landlord collect last-month rent as a deposit?',
        answer:
          'Yes. Ontario landlords may collect a rent deposit equal to one month\'s rent at lease signing, which must be applied to the last month of tenancy. Landlords must pay 1.7% interest on the deposit each year (the same rate as the rent-increase guideline). Security deposits beyond last-month rent are not permitted.',
      },
      {
        question: 'What eviction notices does Ontario require?',
        answer:
          'Termination notices follow set forms: N4 for non-payment of rent (14-day notice), N5 for substantial interference (20-day cure period), N12 for landlord/purchaser own use, and N13 for demolition/conversion/major repair. Filing at the Landlord and Tenant Board (LTB) is required if the tenant does not vacate.',
      },
      {
        question: 'Do condo boards need to approve my tenant?',
        answer:
          'Most Ontario condo corporations require unit owners to submit the lease, tenant information, and a "Summary of Lease" within 30 days. Some require status certificate review and a tenant indemnity form. We coordinate the condo declaration paperwork as part of every condo placement.',
      },
      {
        question: 'How long does a typical Ontario placement take?',
        answer:
          'In the GTA we average 10-18 days from listing to lease signing. Secondary Ontario markets (Ottawa, London, Kitchener-Waterloo) average 14-25 days. We track days-on-market by sub-market and report weekly with pricing recommendations if absorption slows.',
      },
    ],
  },
  quebec: {
    valueProps: [
      {
        icon: 'shield',
        title: 'Bilingual lease execution per the TAL',
        description:
          'Every lease uses the Tribunal administratif du logement (TAL) mandatory Form F, prepared in French and English with Section G rent disclosure completed correctly.',
      },
      {
        icon: 'users',
        title: 'Régie ready documentation',
        description:
          'Notice templates, rent-fixing applications, and Form RL-31 tax slips are filed on the schedules the TAL expects — not improvised.',
      },
      {
        icon: 'sparkles',
        title: 'French-fluent advisors',
        description:
          'Showings, tenant interviews, and signing meetings happen in French or English at the tenant\'s preference, with all communications archived bilingually.',
      },
    ],
    howItWorks: [
      {
        title: 'Strategic pricing for the Quebec market',
        description:
          'Section G past-rent disclosure plus TAL comparable data gives us a defensible asking rent — critical for any future rent-fixing application.',
      },
      {
        title: 'Marketing + Centris syndication',
        description:
          'Bilingual listings on Centris, Kijiji, LesPAC, Realtor.ca, Facebook Marketplace, and our Quebec broker network — captioned in French and English.',
      },
      {
        title: 'Tenant qualification with TAL-compliant screening',
        description:
          'Credit and reference checks within Charter of Human Rights bounds. We document the screening rationale so any TAL challenge is defensible.',
      },
      {
        title: 'Lease signing on TAL Form F + move-in',
        description:
          'Mandatory Form F lease e-signed bilingually with Section G rent history disclosed, plus a documented move-in inspection and RL-31 setup for tax season.',
      },
    ],
    faqs: [
      {
        question: 'Is the TAL mandatory lease form required?',
        answer:
          'Yes. Quebec residential leases must use the Tribunal administratif du logement (TAL) mandatory lease form (Form F / "Bail de logement"). Signing a custom-drafted lease in place of the TAL form is not enforceable for most residential tenancies in Quebec.',
      },
      {
        question: 'What is Section G and why does it matter?',
        answer:
          'Section G of the TAL lease requires the landlord to disclose the lowest rent paid in the previous 12 months. This figure becomes the baseline for any future tenant rent-fixing application at the TAL. Misstating or omitting Section G exposes the landlord to retroactive rent reductions.',
      },
      {
        question: 'Are leases automatically renewed in Quebec?',
        answer:
          'Yes. Quebec residential leases renew automatically under the same terms unless the landlord serves a notice of modification (rent increase, term change) within the prescribed window — generally 3 to 6 months before lease end, depending on lease length. The tenant may refuse the modification, which sends the parties to the TAL.',
      },
      {
        question: 'Can I evict a tenant to take back the unit?',
        answer:
          'Repossession ("reprise de logement") is available to a landlord who owns the unit personally and needs it for themselves, a parent, or a child. Strict notice timing applies (6 months before lease end for 12-month leases) and compensation may be owed. Corporate-owned units cannot be repossessed for personal use.',
      },
      {
        question: 'Do I need to provide tenants with RL-31 tax slips?',
        answer:
          'Yes. Quebec landlords must issue an RL-31 to every tenant by the last day of February each year for the previous tax year, so tenants can claim the Solidarity Tax Credit. We prepare and distribute RL-31s as part of every Quebec placement we manage.',
      },
      {
        question: 'Is bilingual lease documentation actually required?',
        answer:
          'A French version of the lease must be provided unless both parties expressly agree in writing to an English-only lease. In practice we prepare every lease bilingually so there is never a Charter-of-the-French-Language issue, and so the document is enforceable regardless of which version a tenant signed.',
      },
    ],
  },
  'british-columbia': {
    valueProps: [
      {
        icon: 'shield',
        title: 'RTB-compliant lease execution',
        description:
          'Every lease is executed under the BC Residential Tenancy Act with the RTB-1 standard agreement and proper Notice forms (10-day, 1-month, 2-month) when needed.',
      },
      {
        icon: 'users',
        title: 'Local BC market advisors',
        description:
          'In-market teams in Metro Vancouver, Victoria, Kelowna, and the Fraser Valley — not a Toronto call centre running BC placements remotely.',
      },
      {
        icon: 'sparkles',
        title: 'Security + pet deposit handled correctly',
        description:
          'Security deposits capped at half a month\'s rent, separate pet deposit (also half a month), and both held with required documentation under BC RTA rules.',
      },
    ],
    howItWorks: [
      {
        title: 'Strategic pricing for the BC market',
        description:
          'Vacancy and rent data from CMHC, BC Stats, and our own placement history set a defensible price that respects BC\'s annual rent-increase cap.',
      },
      {
        title: 'Marketing + MLS syndication',
        description:
          'Listings syndicated across Realtor.ca, Craigslist, Kijiji, Zumper, PadMapper, Facebook Marketplace, and the local broker network.',
      },
      {
        title: 'Tenant qualification with BC compliance',
        description:
          'BC Human Rights Code-compliant screening: credit, employment, references, and previous-landlord verification with documented decision criteria.',
      },
      {
        title: 'Lease signing on RTB-1 + move-in',
        description:
          'Standard RTB-1 tenancy agreement e-signed, security and pet deposits collected and held, plus a documented Condition Inspection Report on move-in day.',
      },
    ],
    faqs: [
      {
        question: 'What is the maximum security deposit allowed in BC?',
        answer:
          'British Columbia caps the security deposit at half a month\'s rent. Landlords may also collect a separate pet damage deposit of up to half a month\'s rent if a pet is permitted. Both must be held by the landlord and returned within 15 days of move-out unless the tenant agrees in writing to a deduction.',
      },
      {
        question: 'How does the BC rent-increase cap work?',
        answer:
          'British Columbia sets an annual rent-increase cap published each fall (3.0% for 2025). Landlords may only raise rent once every 12 months and must serve 3 months written notice using the Notice of Rent Increase (form RTB-7). Increases above the cap are generally not permitted.',
      },
      {
        question: 'Can I refuse a tenant with pets?',
        answer:
          'A landlord may include a "no pets" clause in the tenancy agreement (with exceptions for service animals under the BC Human Rights Code). If pets are permitted, the landlord may charge a one-time pet damage deposit of up to half a month\'s rent. Strata bylaws may impose additional pet restrictions.',
      },
      {
        question: 'Is smoking restricted in BC rentals?',
        answer:
          'BC tenancy agreements may include a no-smoking clause covering both tobacco and cannabis. Strata corporations frequently extend smoking bans to balconies and common areas. We default every BC lease to a no-smoking-indoors clause unless the owner specifically opts out.',
      },
      {
        question: 'What notice is required to end a tenancy in BC?',
        answer:
          'Standard notice forms include the 10 Day Notice for non-payment of rent, the 1 Month Notice for cause (including repeated late rent or property damage), and the 4 Month Notice for landlord/purchaser use or major renovation. All must be served via the prescribed RTB forms — improperly served notices are routinely overturned.',
      },
      {
        question: 'How long does a typical BC placement take?',
        answer:
          'Metro Vancouver placements typically close in 10-21 days. Victoria and Kelowna average 14-28 days depending on season — September turnover and summer-relocation cycles dominate. We share weekly absorption reports and recommend price adjustments if a unit lingers past the sub-market average.',
      },
    ],
  },
  alberta: {
    valueProps: [
      {
        icon: 'shield',
        title: 'Alberta RTA compliant',
        description:
          'Leases executed under the Alberta Residential Tenancies Act with proper notice forms (14-day, termination for cause, end-of-fixed-term) prepared correctly.',
      },
      {
        icon: 'users',
        title: 'Local Alberta market advisors',
        description:
          'In-market teams in Calgary, Edmonton, Red Deer, and Lethbridge — agents who actually understand the local employer mix and the Alberta tenant pool.',
      },
      {
        icon: 'sparkles',
        title: 'Security deposit handled correctly',
        description:
          'Security deposit capped at one month\'s rent, held in a trust account with required interest paid annually, and returned within 10 days of move-out per RTA rules.',
      },
    ],
    howItWorks: [
      {
        title: 'Strategic pricing for the Alberta market',
        description:
          'No rent control in Alberta — pricing reflects real-time supply, comparable lease velocity, and the local employment cycle without artificial guidelines.',
      },
      {
        title: 'Marketing + MLS syndication',
        description:
          'Distribution across Realtor.ca, Kijiji, RentFaster, Zumper, Facebook Marketplace, and the regional Alberta broker network with floor-plan and 3D-tour assets.',
      },
      {
        title: 'Tenant qualification with Alberta compliance',
        description:
          'Credit, employment, and reference screening within Alberta Human Rights Act limits. Source-of-income protections are documented and applied uniformly.',
      },
      {
        title: 'Lease signing on the AB RTA template + move-in',
        description:
          'Standard residential tenancy agreement e-signed, security deposit collected to a trust account, and an inspection report completed within one week of move-in.',
      },
    ],
    faqs: [
      {
        question: 'Does Alberta have rent control?',
        answer:
          'No. Alberta does not impose a rent-increase cap. However, rent may only be increased once every 12 months and requires 90 days written notice for a periodic (month-to-month) tenancy. Fixed-term leases can only be increased at renewal, not mid-term.',
      },
      {
        question: 'What is the maximum security deposit in Alberta?',
        answer:
          'Alberta caps the security deposit at one month\'s rent. The deposit must be held in an interest-bearing trust account, and annual interest is payable to the tenant at the rate set by the Alberta government (currently 0%). The deposit must be returned within 10 days of move-out, less documented deductions.',
      },
      {
        question: 'Are inspection reports mandatory in Alberta?',
        answer:
          'Yes. Alberta requires a written inspection report at both move-in and move-out, signed by both landlord and tenant. Failure to complete a proper move-in inspection forfeits the landlord\'s right to withhold any portion of the security deposit for damages, regardless of how severe.',
      },
      {
        question: 'How do I end a tenancy in Alberta?',
        answer:
          'Periodic tenancies require 3 months notice from the landlord to end without cause. For cause (substantial breach, non-payment), the landlord may issue a 14-day notice. Fixed-term leases end on the date specified — no notice required unless the lease itself requires one.',
      },
      {
        question: 'Can I evict for non-payment of rent in Alberta?',
        answer:
          'Yes. Alberta allows a 14-day Notice to Terminate for non-payment of rent. If the tenant pays the full overdue amount within the notice period, the notice is void. If not, the landlord may apply to the Residential Tenancy Dispute Resolution Service (RTDRS) or the Court of King\'s Bench for possession.',
      },
      {
        question: 'How long does a typical Alberta placement take?',
        answer:
          'Calgary and Edmonton placements typically close in 10-21 days. Resource-sector market cycles (energy hiring) can compress or extend that window significantly. We share weekly market reports and recommend pricing adjustments if absorption slows past the local sub-market average.',
      },
    ],
  },
  manitoba: {
    valueProps: [
      {
        icon: 'shield',
        title: 'RTB Manitoba compliant',
        description:
          'Leases prepared under the Manitoba Residential Tenancies Act with the Residential Tenancies Branch (RTB) tenancy agreement and notice forms used correctly.',
      },
      {
        icon: 'users',
        title: 'Local Manitoba advisors',
        description:
          'In-market teams in Winnipeg, Brandon, and Steinbach — agents who understand local sub-market pricing and the Manitoba tenant pool.',
      },
      {
        icon: 'sparkles',
        title: 'Rent-guideline aware pricing',
        description:
          'Pricing reflects the annual Manitoba rent-increase guideline (3.0% for 2025) and the exemptions that apply to newer construction.',
      },
    ],
    howItWorks: [
      {
        title: 'Strategic pricing for the Manitoba market',
        description:
          'RTB rent-history data, CMHC comparables, and the annual rent-increase guideline set a defensible asking rent for the Winnipeg or Brandon sub-market.',
      },
      {
        title: 'Marketing + MLS syndication',
        description:
          'Distribution across Realtor.ca, Kijiji, Rent Winnipeg, Zumper, Facebook Marketplace, and the regional broker network with full photo + floor-plan capture.',
      },
      {
        title: 'Tenant qualification with Manitoba compliance',
        description:
          'Credit, employment, and reference screening within Manitoba Human Rights Code limits with documented, uniform decision criteria.',
      },
      {
        title: 'Lease signing on the RTB tenancy agreement + move-in',
        description:
          'Standard RTB residential tenancy agreement e-signed, security deposit collected within the RTB cap, and a documented move-in inspection report.',
      },
    ],
    faqs: [
      {
        question: 'How does the Manitoba rent-increase guideline work?',
        answer:
          'Manitoba publishes an annual rent-increase guideline (3.0% for 2025). Landlords must give 3 months written notice to raise rent and may only raise rent once every 12 months. Buildings first occupied within the last 20 years are generally exempt from the guideline.',
      },
      {
        question: 'What is the maximum security deposit in Manitoba?',
        answer:
          'Manitoba caps the security deposit at half a month\'s rent. A pet damage deposit of an additional half month is permitted if the lease allows pets. Both must be returned (with interest at the prescribed rate) within 14 days of move-out unless deductions are claimed and documented.',
      },
      {
        question: 'Can I raise rent above the Manitoba guideline?',
        answer:
          'Only by applying to the Residential Tenancies Branch (RTB) for an above-guideline increase, typically justified by documented capital improvements, large operating cost increases, or financial loss. The RTB reviews applications on a per-building basis and approval is not guaranteed.',
      },
      {
        question: 'How do I end a tenancy in Manitoba?',
        answer:
          'A fixed-term tenancy ends on the date specified unless renewed. For periodic tenancies, the landlord may end the tenancy only for specific cause (non-payment, breach, owner use, major renovation) under the prescribed RTB notice form. Tenants always have the right to dispute at the RTB within the notice period.',
      },
      {
        question: 'Is there rent registration in Manitoba?',
        answer:
          'Manitoba does not require formal rent registration, but the Residential Tenancies Branch keeps rent-history records on units that have been the subject of past applications. Setting rent without reference to those records exposes the landlord to retroactive challenges from new tenants.',
      },
      {
        question: 'How long does a typical Manitoba placement take?',
        answer:
          'Winnipeg placements typically close in 14-28 days. Brandon and smaller markets can extend to 21-35 days depending on season — university cycles drive a strong August / September turnover spike. We share weekly absorption data and recommend pricing changes if a unit lingers.',
      },
    ],
  },
  'nova-scotia': {
    valueProps: [
      {
        icon: 'shield',
        title: 'NS Residential Tenancies compliant',
        description:
          'Leases prepared under the Nova Scotia Residential Tenancies Act with the prescribed Standard Form of Lease and proper notice forms.',
      },
      {
        icon: 'users',
        title: 'Local Atlantic advisors',
        description:
          'In-market teams in Halifax and the surrounding Halifax Regional Municipality — agents who understand the Atlantic Canada tenant pool and seasonal cycles.',
      },
      {
        icon: 'sparkles',
        title: 'Rent-cap aware pricing',
        description:
          'Pricing reflects the current 5% Nova Scotia rent-cap (in force until December 31, 2027) and the documented exemptions that apply at unit turnover.',
      },
    ],
    howItWorks: [
      {
        title: 'Strategic pricing for the Nova Scotia market',
        description:
          'Halifax sub-market comparables plus the active 5% rent cap set a defensible asking rent that minimizes risk of a successful tenant dispute.',
      },
      {
        title: 'Marketing + MLS syndication',
        description:
          'Distribution across Realtor.ca, Kijiji, Zumper, Facebook Marketplace, and the regional Atlantic broker network with full photo + floor-plan capture.',
      },
      {
        title: 'Tenant qualification with NS compliance',
        description:
          'Credit, employment, and reference screening within Nova Scotia Human Rights Code limits with documented, uniform decision criteria.',
      },
      {
        title: 'Lease signing on the NS Standard Form + move-in',
        description:
          'Standard Form of Lease e-signed, security deposit collected within the legislated cap, and a documented move-in inspection report.',
      },
    ],
    faqs: [
      {
        question: 'What is the Nova Scotia rent cap?',
        answer:
          'Nova Scotia\'s rent cap limits annual rent increases on existing tenancies to 5%, in force until December 31, 2027. The cap does not apply to a new tenancy when a unit is re-rented to a new tenant, but it does apply to renewals and ongoing periodic tenancies regardless of the unit\'s vacancy history.',
      },
      {
        question: 'What is the maximum security deposit in Nova Scotia?',
        answer:
          'Nova Scotia caps the security deposit at half a month\'s rent. The deposit must be held in trust and returned (with interest at the prescribed rate) within 10 days of move-out unless the landlord applies to the Director of Residential Tenancies to retain all or part of it.',
      },
      {
        question: 'How much notice do I need to raise rent in Nova Scotia?',
        answer:
          'Landlords must give 4 months written notice to raise rent, and may only raise rent once every 12 months. The notice must use the prescribed form and respect the active 5% rent cap. Improperly served notices are routinely overturned by the Residential Tenancies Program.',
      },
      {
        question: 'How do I end a tenancy in Nova Scotia?',
        answer:
          'For year-to-year tenancies, the landlord must give 3 months notice to end the tenancy at the end of the lease year for limited statutory reasons. Periodic month-to-month tenancies generally cannot be ended without cause. Notice for non-payment of rent is 15 days, with the tenant\'s right to remedy on payment.',
      },
      {
        question: 'Is there a fixed-term lease loophole in Nova Scotia?',
        answer:
          'No. Nova Scotia closed the fixed-term lease loophole in 2022: a fixed-term lease does not end automatically and the tenant generally has the right to renew. Landlords cannot use fixed-term leases to circumvent the rent cap or the tenant\'s right of renewal.',
      },
      {
        question: 'How long does a typical Halifax placement take?',
        answer:
          'Halifax placements typically close in 14-28 days. The market tightens significantly each August / September with the Dalhousie / SMU / MSVU student cycle. We share weekly absorption data and recommend pricing changes if a unit lingers past the local sub-market average.',
      },
    ],
  },
}

function getProvinceCopy(slug: string, provinceName: string): ProvinceCopy {
  if (PROVINCE_COPY[slug]) return PROVINCE_COPY[slug]

  // Generic fallback for any province slug not pre-written
  return {
    valueProps: [
      {
        icon: 'shield',
        title: 'Provincial-RTA compliant',
        description: `Every lease executed under the ${provinceName} Residential Tenancies Act with the correct notice forms and prescribed lease documentation.`,
      },
      {
        icon: 'users',
        title: 'Local market advisors',
        description: `In-market teams across ${provinceName} — not a remote call centre. The same agents who price your unit show it and screen the tenants.`,
      },
      {
        icon: 'sparkles',
        title: 'On-the-ground showings',
        description: `Showings handled by ${provinceName} agents within 24 hours of every qualified enquiry, with documented feedback after every tour.`,
      },
    ],
    howItWorks: [
      {
        title: `Strategic pricing for the ${provinceName} market`,
        description: `CMHC, MLS, and our own placement data set a defensible asking rent for your ${provinceName} sub-market.`,
      },
      {
        title: 'Marketing + MLS syndication',
        description:
          'Distribution across Realtor.ca, Kijiji, Zumper, Facebook Marketplace, and the regional broker network with photo + floor-plan assets.',
      },
      {
        title: `Tenant qualification with ${provinceName}-specific compliance`,
        description: `Credit, employment, and reference screening within ${provinceName} Human Rights Code limits with uniform decision criteria.`,
      },
      {
        title: `Lease signing on the ${provinceName} prescribed form + move-in`,
        description: `Prescribed ${provinceName} lease e-signed, security deposit handled per provincial rules, and a documented move-in inspection report.`,
      },
    ],
    faqs: [
      {
        question: `Are leases in ${provinceName} executed under the provincial RTA?`,
        answer: `Yes. Every lease is prepared and executed under the ${provinceName} Residential Tenancies Act, using the prescribed standard lease form (where applicable) and the correct notice forms for rent increases and tenancy termination.`,
      },
      {
        question: `How long does a typical ${provinceName} placement take?`,
        answer: `Most ${provinceName} placements close in 14-28 days from listing to lease signing. We track days-on-market weekly and recommend pricing adjustments if absorption is slower than the local sub-market average.`,
      },
      {
        question: `What kind of tenant screening do you perform in ${provinceName}?`,
        answer: `Credit checks, employment and income verification, previous-landlord references, and identity verification — applied uniformly to every applicant within the limits of the ${provinceName} Human Rights Code.`,
      },
      {
        question: `What is the cost to use MoveSmart in ${provinceName}?`,
        answer: `Zero upfront cost. Marketing, photography, showings, screening, and lease execution are all included. We charge a success-fee on placement — no commitment, no monthly retainer.`,
      },
      {
        question: `Do you handle move-in inspections in ${provinceName}?`,
        answer: `Yes. A documented move-in inspection with photographs is completed on the day of possession, signed by the tenant, and archived in the owner portal. This is the foundation of any future deposit-deduction claim.`,
      },
      {
        question: `Can I list properties across multiple ${provinceName} cities with one account?`,
        answer: `Yes. A single MoveSmart account covers every ${provinceName} sub-market we serve. The same dashboard reports placements, days-on-market, and tenant communications across every property in your portfolio.`,
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pickBannerImage(province: ProvinceData): { url: string; alt: string } {
  // Use the SECOND city's imageUrl (first city often duplicates the hero).
  // Falls back through the list if anything's missing.
  const second = province.topCities[1]
  if (second) return { url: second.imageUrl, alt: second.imageAlt }
  const first = province.topCities[0]
  if (first) return { url: first.imageUrl, alt: first.imageAlt }
  return { url: province.heroImageUrl, alt: province.heroImageAlt }
}

const VALUE_PROP_ICONS = {
  shield: ShieldCheck,
  users: Users,
  sparkles: Sparkles,
  pin: MapPin,
} as const

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ province: string }>
}) {
  const { province } = await params

  if (!slugSchema.safeParse(province).success) {
    notFound()
  }

  const data = getProvinceBySlug(province)

  if (!data) {
    notFound()
  }

  const copy = getProvinceCopy(province, data.name)
  const banner = pickBannerImage(data)

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  return (
    <main>
      {/* JSON-LD breadcrumb */}
      <JsonLd
        data={buildBreadcrumbListSchema({
          crumbs: [
            { name: 'Home', url: siteUrl },
            { name: 'Canada', url: `${siteUrl}/ca/` },
            { name: data.name, url: `${siteUrl}/ca/${province}/` },
          ],
        })}
      />

      {/* 1. Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Canada', href: '/ca/' },
            { label: data.name, href: `/ca/${province}/` },
          ]}
        />
      </div>

      {/* 2. Editorial hero */}
      <PageHeroBlock
        kicker="Canada"
        eyebrow={`${data.name} · Full-Service Leasing`}
        headline={`Leasing across ${data.name}`}
        lede={data.market.intro}
        cta1={{ label: 'List my property', href: '/contact/' }}
        cta2={{ label: 'See pricing', href: '/pricing/' }}
        theme="dark"
        backgroundImageUrl={data.heroImageUrl}
        backgroundImageAlt={data.heroImageAlt}
      />

      {/* City grid */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Service areas
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Cities we serve in{' '}
              <span className="font-display italic text-brand-emerald">
                {data.name}
              </span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Local expertise in every major market — from tenant placement to
              institutional lease-up, executed by the same in-market team.
            </p>
          </div>

          <div className="mt-12">
            <RevealOnScroll
              variant="slideUp"
              stagger={0.08}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.topCities.map((city) => (
                <CityCard
                  key={city.slug}
                  city={city}
                  href={`/ca/${province}/${city.slug}/`}
                />
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 5. Why MoveSmart in [Province] */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Why MoveSmart
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Why MoveSmart in{' '}
              <span className="font-display italic text-brand-emerald">
                {data.name}
              </span>
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
          </div>

          <div className="mt-12">
            <RevealOnScroll
              variant="slideUp"
              stagger={0.1}
              className="grid gap-6 md:grid-cols-3"
            >
              {copy.valueProps.map((vp) => {
                const Icon = VALUE_PROP_ICONS[vp.icon]
                return (
                  <article
                    key={vp.title}
                    className="rounded-2xl border border-slate-200 bg-[#FBFAF6] p-7 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-emerald-muted text-brand-emerald-dark">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-normal tracking-tight text-brand-navy">
                      {vp.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {vp.description}
                    </p>
                  </article>
                )
              })}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 6. Editorial banner */}
      <EditorialBanner
        imageUrl={banner.url}
        imageAlt={banner.alt}
        caption={`${data.name}, leased properly`}
      />

      {/* 7. How leasing in [Province] works */}
      <section className="bg-[#FBFAF6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">
              Our process
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              How leasing in{' '}
              <span className="font-display italic text-brand-emerald">
                {data.name}
              </span>{' '}
              works
              <span aria-hidden="true" className="text-brand-gold">.</span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Four stages, every placement — from strategic pricing to
              documented move-in.
            </p>
          </div>

          <div className="mt-14">
            <HowItWorksTimeline steps={copy.howItWorks} provinceName={data.name} />
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <FAQBlock
        questions={copy.faqs}
        title={`Frequently asked — leasing in ${data.name}`}
        showQuestionsCta={false}
      />

      {/* 9. CTA Banner */}
      <CTABannerBlock
        headline={`Lease your property in ${data.name}`}
        description={`Zero upfront cost. Success-fee on placement. Full-service leasing across every major ${data.name} market.`}
        primaryCta={{ label: 'List my property', href: '/contact/' }}
        secondaryCta={{
          label: `Browse rentals across ${data.name}`,
          href: `/ca/${province}/`,
        }}
      />

      {/* Lightweight bottom CTA strip — the CTABannerBlock is intentionally
          a no-op component (see src/components/blocks/cta-banner-block.tsx),
          so we render an editorial closer in-place to preserve the contracted
          two-CTA outcome. */}
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald-light">
            Ready when you are
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl">
            Lease your property in{' '}
            <span className="font-display italic text-brand-emerald-light">
              {data.name}
            </span>
            <span aria-hidden="true" className="text-brand-gold">.</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Zero upfront cost. Success-fee on placement. Full-service leasing
            across every major {data.name} market.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full bg-brand-emerald px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-emerald-hover"
            >
              List my property
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={`/ca/${province}/`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              Browse rentals across {data.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Server-rendered helper components
// ---------------------------------------------------------------------------

function CityCard({
  city,
  href,
}: {
  city: ProvinceData['topCities'][number]
  href: string
}) {
  const chips = city.neighborhoods.slice(0, 5)

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:shadow-lg"
    >
      {/* Photo header (16:10) */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={city.imageUrl}
          alt={city.imageAlt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-navy backdrop-blur">
          <MapPin className="h-3 w-3 text-brand-emerald" aria-hidden="true" />
          {city.name}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-normal tracking-tight text-brand-navy">
          {city.name}
          <span aria-hidden="true" className="text-brand-gold">.</span>
        </h3>

        {/* Neighborhood chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((n) => (
            <span
              key={n}
              className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
            >
              {n}
            </span>
          ))}
        </div>

        {/* Stat chips */}
        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-md bg-brand-emerald-muted px-2 py-1 font-semibold text-brand-emerald-dark">
            Pop · {city.population}
          </span>
          <span className="rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-800">
            Median · {city.medianRent}
          </span>
          {city.vacancy && (
            <span className="rounded-md bg-sky-50 px-2 py-1 font-semibold text-sky-800">
              Vacancy · {city.vacancy}
            </span>
          )}
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
          {city.whyHere}
        </p>
      </div>
    </Link>
  )
}
