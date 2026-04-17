import type { GuideContent } from './index'

export const HOW_TO_PRICE_YOUR_RENTAL: GuideContent = {
  slug: 'how-to-price-your-rental',
  title: 'How to Price Your Rental - The 2026 Ontario Edition',
  seoTitle: 'How to Price Your Rental in Ontario (2026 Guide)',
  metaDescription:
    'A strategic framework for pricing an Ontario rental in 2026 - real comps, income-approach triangulation, Ontario Rent Guideline rules, seasonality, and when to reposition.',
  category: 'landlord',
  audience: 'Ontario landlords pricing a new listing or a renewal in 2026',
  primaryKeyword: 'how to price your rental',
  secondaryKeywords: [
    'rental pricing Ontario',
    'rent pricing strategy Ontario',
    'Ontario rent guideline 2026',
    'how to price a rental Toronto',
    'rental comps Ontario',
  ],
  readTimeMinutes: 12,
  publishDate: '2026-04-14',
  author: 'MoveSmart Editorial',
  hero: {
    eyebrow: 'Rental Pricing',
    headline: 'How to Price Your Rental - A 2026 Ontario Framework',
    lede:
      'Most landlords price by gut - they check two listings on Kijiji and split the difference. That approach costs real money, either as extended vacancy or as rent left on the table for the full duration of a multi-year tenancy. This guide walks through the pricing framework MoveSmart runs for clients in Ontario: real comps, income-approach triangulation, rent-guideline constraints, and the repositioning signals that say a listing is mispriced.',
  },
  tableOfContents: [
    { id: 'cost-of-mispricing', label: 'The cost of mispricing' },
    { id: 'comparable-approach', label: 'The comparable approach' },
    { id: 'income-approach', label: 'Income-approach triangulation' },
    { id: 'ontario-constraints', label: 'Ontario-specific pricing constraints' },
    { id: 'feature-adjustments', label: 'Feature-adjustment toolkit' },
    { id: 'seasonality', label: 'Seasonality in the Ontario market' },
    { id: 'when-to-reposition', label: 'When to reposition a listing' },
    { id: 'how-movesmart-prices', label: 'How MoveSmart prices' },
  ],
  sections: [
    {
      id: 'cost-of-mispricing',
      heading: 'The cost of mispricing - both directions',
      body: `Pricing a rental is a two-sided error. Overprice and the unit sits. Underprice and the owner leaves money on the table for the duration of the tenancy.

Ontario landlords tend to over-weight the downside of underpricing ("I\'m leaving $100/month on the table") and under-weight the downside of overpricing (an extra month of vacancy). The math runs the other direction for most owners.

Consider a $3,000/month unit. Overpricing by $100/month typically translates into a listing that sits an extra three to six weeks versus the correctly priced comparable. Four extra weeks of vacancy on a $3,000 unit costs roughly $2,800 in direct lost rent alone - before carrying costs, showing costs, and the compounding effect of listing into a softer window.

Underpricing by $100/month on the same unit costs $1,200/year - but because Ontario\'s rent-control regime caps annual increases on sitting tenants, that $100 shortfall can compound over a multi-year tenancy. On a three-year tenancy with modest guideline increases, that is roughly $3,600 to $4,000 in aggregate shortfall.

Neither number is catastrophic in isolation. Both are avoidable with a structured pricing process.`,
      callout: {
        label: 'The rule of thumb',
        body:
          'A correctly priced Ontario rental typically secures a qualified applicant within 18 to 28 days of listing. A listing that crosses 28 days without a qualified offer is a pricing or presentation signal, not a market signal.',
      },
    },
    {
      id: 'comparable-approach',
      heading: 'The comparable approach - finding real comps',
      body: `The comparable ("comp") approach asks a single question: what are materially identical units actually renting for right now?

The word **actually** does a lot of work in that sentence. Landlords routinely pull the five most recent listings for their neighbourhood and assume the listed price is the market price. It is not. The listed price is an asking price; the rent figure a tenant actually signs for - after any negotiation, any concessions, and any correction that followed a stale listing - is the market price.

**Where to source Ontario comps in 2026:**

- **MLS (through a broker or agent)** is the highest-quality source because it publishes *leased* prices alongside listing prices. This is where the real market clears.
- **Realtor.ca** shows currently listed rentals but not leased prices. Useful for asking-price context only.
- **Kijiji and Facebook Marketplace** are wide coverage but noisy - many listings are stale, some are duplicates, and there is no verification that a given unit actually rented at the posted price.
- **Zumper, Padmapper, and Liv.rent** aggregate from multiple sources and are useful for broad ranges but should not be the anchor.
- **Purpose-built rental buildings in the same submarket** publish their current availability online and are an important reference point - they set the floor/ceiling for comparable units.

Five solid comps beat fifteen shallow ones. A useful comp set is: same municipality or immediate submarket, same building type (condo, purpose-built, low-rise apartment, basement suite, etc.), within ~15% of the target unit\'s square footage, same bedroom count, rented within the last 60 days. If you cannot find five that match on all of those dimensions, widen one criterion at a time and note the adjustment.`,
    },
    {
      id: 'income-approach',
      heading: 'Income-approach triangulation - a sanity check, not a primary method',
      body: `The income approach asks whether the rent the comparable set suggests is consistent with the unit\'s value as an investment. It is a **sanity check** on the comp number, not a replacement for it - the rental market clears on comparables, not cap rates, so the comp number wins when they disagree.

Two quick tools:

**The gross rent multiplier (GRM).** Divide the property\'s current value by the annual gross rent. In Ontario in 2026, typical GRMs for condo rentals in the GTA fall in a broad range - roughly the high teens to the mid-20s - depending on submarket, building age, and unit mix. A GRM materially above or below that range is either a pricing flag or an asset-quality flag.

**The cap rate sanity check.** Net operating income (rent minus vacancy minus operating costs - not including mortgage) divided by property value. Ontario investment condos in 2026 generally clear in the low-single-digit cap rate range - a rent that produces a materially higher implied cap rate than local comparables is probably priced too high (the tenant is subsidising the owner\'s yield and will say no at lease-up); a materially lower cap rate suggests the rent is below market.

The goal here is not to set the rent - the comp approach does that. The goal is to catch a case where the comp set is noisy (thin market, stale data, outlier comps) and the income math is suggesting something different. Two independent methods pointing at the same number is a high-confidence signal.`,
    },
    {
      id: 'ontario-constraints',
      heading: 'Ontario-specific pricing constraints - the two worlds',
      body: `Ontario has two rental markets stacked on top of each other, and a landlord has to know which one a given unit sits in before a price can be set.

**Vacant-unit pricing is market-unconstrained.** When a unit is empty and being listed to a new tenant, the Ontario Rent Guideline does not apply - the landlord sets the price at whatever the market will clear. This is the number the comp approach is answering.

**Sitting-tenant renewals are capped.** Once a tenant is in place, annual rent increases are controlled in most cases by the Ontario Rent Guideline, which is set by the government each year. The 2026 guideline is published by the Ministry of Municipal Affairs and Housing - landlords should check the current year\'s figure on the ministry\'s site rather than assuming. Over the last decade the guideline has generally fallen in the low single-digit percent range.

**The November 2018 exemption.** Units in buildings first occupied after November 15, 2018 are exempt from the annual rent guideline - landlords of qualifying units can set renewal increases without the guideline cap. This is a material planning point for owners of new-build condos in the GTA.

**Above-Guideline Increases (AGIs).** An AGI is a landlord-initiated application to the Landlord and Tenant Board for an increase above the annual guideline, typically tied to major capital expenditures, security costs, or extraordinary tax/utility increases. AGIs are subject to a cap and a documented process - they are not a routine pricing tool.

**Practical takeaway:** a landlord listing a vacant unit in 2026 is playing the comp game and has pricing freedom. A landlord renewing a sitting tenant is playing the guideline game and has to work inside the published percentage unless the unit is post-Nov-2018 exempt. Confusing the two is the most common pricing error we see.`,
      callout: {
        label: 'Check the live guideline',
        body:
          'The Ontario Rent Guideline changes each calendar year. Always confirm the current percentage on the Ministry of Municipal Affairs and Housing\'s website before notifying a renewal increase - using last year\'s number is a documented breach of the RTA.',
      },
    },
    {
      id: 'feature-adjustments',
      heading: 'Feature-adjustment toolkit - tuning the comp number',
      body: `Once a baseline comp number is set, the unit\'s specific feature set should move the final rent up or down. The magnitudes below are broad Ontario ranges, not guarantees - the exact adjustment depends on submarket, unit type, and buyer pool.

**Parking.** A dedicated parking stall in a downtown Toronto condo typically adds a meaningful premium - often in the low-to-mid hundreds of dollars per month at the top of the market. In suburban submarkets where street parking is easy, the premium compresses.

**In-suite laundry.** A genuine differentiator in older buildings without shared laundry at all. Typically worth a modest premium in condo submarkets and a larger one in purpose-built low-rises.

**Utilities included.** Including heat, water, and/or hydro in the rent shifts the listing\'s competitive position more than it shifts total tenant cost - but some applicant pools strongly prefer an all-in number. Landlords should price utilities-included listings at the comparable gross-rent level (i.e. market rent plus estimated utility cost), not at the market rent level.

**Pet policy.** Ontario voids blanket "no pets" clauses in residential leases, but landlords can still position around pets. A pet-welcoming unit has access to a larger applicant pool, which typically means faster lease-up at the target price rather than a higher absolute rent. Condo corporation rules may still restrict specific breeds or sizes.

**Balcony, in-suite storage, view, floor level.** Each contributes modestly in isolation and meaningfully in aggregate. A high-floor corner unit with a city view will clear above a mid-floor interior unit in the same building even if the square footage is identical.

**Finish level.** Recent renovations (in the last 3-5 years) in the kitchen, bathroom, and flooring are the highest-ROI contributors to rent. A unit presented "move-in perfect" clears materially faster and at a modestly higher rent than a tenanted-tired comparable.

A good practice is to build the feature-adjustment table for the specific unit, apply it transparently, and show the math to the owner before the listing goes live. If an adjustment cannot be defended against the comp set, it should not be taken.`,
    },
    {
      id: 'seasonality',
      heading: 'Seasonality - the Ontario rental calendar',
      body: `Ontario\'s rental market is meaningfully seasonal, and the seasonality has direct pricing consequences.

**Peak season: May through September.** Demand concentrates in late spring through early fall, driven by student moves in university submarkets, cross-country relocations timed to school years and fiscal calendars, and the fact that moving in Ontario winter is genuinely unpleasant. Listings priced aggressively during peak season lease quickly - applicant volumes are high enough to support firm pricing.

**Shoulder seasons: April and October.** Applicant volumes are still healthy and pricing is largely unchanged from peak. These are often the best months to list - demand is strong but competing listings are fewer than in the July-August peak-of-peak.

**Off-peak: November through February.** Applicant volumes drop materially. Listings in the off-peak take longer to rent and often require a modest pricing concession (a few percent off peak-season pricing) to clear in a comparable timeframe. Landlords with flexibility should align lease end dates so that re-lease events fall into April-September; those with a unit becoming vacant in December should plan for a longer marketing window or a price-sensitive strategy.

**March is transitional.** Often strong in major urban submarkets with heavy relocation traffic, softer in student-dominated submarkets waiting for the May cycle.

One planning consequence: when a new lease is being signed in off-peak, the owner should actively think about lease end-date selection. A 14-month lease that ends in peak season may leave money on the table this year but capture a better position for the next placement.`,
    },
    {
      id: 'when-to-reposition',
      heading: 'When to reposition a listing - the repricing signals',
      body: `A listing that does not clear in a reasonable window is sending a signal. The landlord\'s job is to read the signal correctly.

**Signal 1: The applicant volume signal.** A listing should be generating showing requests within 48-72 hours of going live on MLS and the major rental portals. If a week passes with fewer than a small handful of credible inquiries, the price (or the photography) is wrong. Price is usually the culprit - photography problems tend to produce *some* inquiries that ghost after seeing the listing in person.

**Signal 2: The applicant quality signal.** If showings are happening but applications are weak - incomplete income, thin references, credit issues - the unit is priced above its natural applicant pool. A price-correction moves the listing into a stronger applicant cohort.

**Signal 3: The time-on-market signal.** A listing crossing 28 days without a qualified offer has a pricing problem in almost every Ontario submarket. 45 days is decisive. Sitting longer than that without a repricing is a choice, not a strategy.

**Signal 4: The competing-listings signal.** When two or three directly comparable units list in the same building at lower prices, the landlord\'s listing is effectively repriced by the market whether they adjust or not. The choice is whether to match quickly or to wait for the competing listings to clear.

**The repricing move.** When a reprice is required, a single meaningful reduction clears the listing faster than a series of small adjustments. In Ontario submarkets, a 3-5% reduction is typically decisive; repeated reductions of 1-2% signal indecision and extend the vacancy.

There is also the occasional strategic move of listing **slightly below market** on a premium unit to generate multiple applications quickly. In a heated submarket this can produce a faster and higher-quality placement than listing at the top of the comp range - the applicant pool is broader, the best file wins, and the tenancy typically starts with higher goodwill. MoveSmart uses this strategy selectively in tight submarkets where multiple-offer dynamics are reliable.`,
    },
    {
      id: 'how-movesmart-prices',
      heading: 'How MoveSmart prices - strategic rental pricing as a service',
      body: `MoveSmart is a leasing brokerage. Pricing a unit correctly is not a value-add; it is a core part of the mandate.

Every new listing MoveSmart takes on goes through a documented pricing workflow:

1. **MLS comp pull** - five to ten recent *leased* comparables from the immediate submarket, not listed prices
2. **Secondary-source triangulation** - current Realtor.ca, Zumper, Liv.rent, and purpose-built building availability as range validation
3. **Feature adjustment** - documented line-by-line uplift/downward-adjustment for the specific unit
4. **Income-approach sanity check** - GRM and implied cap rate cross-checked against submarket norms
5. **Seasonality overlay** - recommendation adjusted for listing month and lease-end timing
6. **Owner briefing** - a one-page pricing memo with the recommendation, the comp set, and the repositioning triggers

The goal of the memo is to make the pricing decision legible. The owner sees the comps, sees the adjustments, and signs off on a documented number - not a broker\'s guess.

For owners who want pricing bundled with the full placement, see [Leasing Services](/services/leasing-services/) for the end-to-end workflow. For owners who want MoveSmart\'s tenant screening discipline applied to their own placement process, see [Tenant Screening](/services/tenant-screening/).`,
    },
  ],
  faqItems: [
    {
      question: 'What is the Ontario Rent Guideline for 2026?',
      answer:
        'The Ontario Rent Guideline is set annually by the Ministry of Municipal Affairs and Housing and is published on the ministry\'s website ahead of each calendar year. It caps the annual rent increase most landlords can charge sitting tenants in rent-controlled units. Because the figure changes each year, landlords should confirm the current percentage directly on the ministry\'s published list rather than relying on secondary sources - using last year\'s number on a renewal notice is a documented breach of the Residential Tenancies Act.',
    },
    {
      question: 'Can I raise the rent on an existing tenant whenever I want?',
      answer:
        'No. In Ontario, a landlord can generally raise the rent on a sitting tenant no more than once in any 12-month period, and the increase is typically capped at the Ontario Rent Guideline for the year the increase takes effect. Ninety days\' written notice of the increase is required, using the prescribed LTB form (N1 for a standard increase). There are narrow exceptions - units first occupied after November 15, 2018 are exempt from the guideline, and Above-Guideline Increases through the LTB are possible for qualifying capital work - but the baseline rule is: once per 12 months, at or below the guideline, with 90 days\' notice.',
    },
    {
      question: 'What is an AGI (Above-Guideline Increase)?',
      answer:
        'An Above-Guideline Increase is an application a landlord can make to the Landlord and Tenant Board for permission to raise rent above the annual guideline on a sitting tenant. AGIs are typically tied to eligible capital expenditures (major repairs or improvements), extraordinary increases in municipal taxes and utilities, or documented security cost increases. The increase is spread over one to three years, capped under regulation, and subject to LTB approval. AGIs are a specific legal process, not a routine pricing lever - a landlord considering one should work with an Ontario paralegal or lawyer familiar with the LTB.',
    },
    {
      question: 'How often should I reprice a listing that is not renting?',
      answer:
        'A listing that has crossed roughly 18 days without a qualified offer should trigger a review; a listing crossing 28 days without one should be repriced. When the adjustment comes, a single meaningful reduction (typically 3-5% in Ontario submarkets) clears the listing faster than a series of small cuts. Repeated 1-2% adjustments signal indecision to agents and applicants and extend total time-on-market, which costs more in lost rent than the correction would.',
    },
    {
      question: 'Should I list below market to generate multiple offers?',
      answer:
        'Sometimes, in specific conditions. In a tight submarket with reliable multiple-offer dynamics, listing a premium unit slightly below the comp range can produce a broader applicant pool, a faster close, and a stronger tenant file than listing at the top of the range. The strategy is less reliable in softer markets and in off-peak seasons - there, a below-market listing tends to simply rent at the below-market price rather than attracting competing offers. The decision should be made listing-by-listing, tied to the current applicant flow in the specific submarket, not applied as a default.',
    },
    {
      question: 'Do I price utilities-included differently than utilities-separate?',
      answer:
        'Yes. When utilities are included in the rent, the listed rent needs to equal the market net rent *plus* the average cost of the included utilities - otherwise the owner is effectively subsidising utilities out of pocket. For a typical one-bedroom Ontario condo in 2026, a full utilities-included offering adds roughly $100-$200 per month to the listing price versus the same unit marketed with utilities separate, depending on heating type and whether water and hydro are both included. Some applicant segments strongly prefer all-in pricing and will pay the premium; others shop on net rent only. The comp approach should compare like-for-like - utilities-included against utilities-included, not against net-rent comps.',
    },
    {
      question: 'How much does a parking stall actually add to rent in Toronto?',
      answer:
        'It depends on submarket. In downtown Toronto condo submarkets where street parking is unavailable and monthly parking is tight, a dedicated stall regularly adds a meaningful premium - often in the low-to-mid hundreds of dollars per month at the top of the market. In suburban submarkets where most units already come with one stall and street parking is easy, the premium compresses to a modest amount or disappears entirely. The right number is the number the comp set is clearing at, not a flat add-on - the pricing memo should cite specific comparable units with and without parking.',
    },
  ],
  relatedGuides: [
    'tenant-screening-ontario',
    'rent-guarantee-101',
    'ontario-rental-listing-marketing',
  ],
  relatedServices: ['leasing-services', 'tenant-placement', 'rental-preparation'],
  downloadOffer: {
    label: 'The MoveSmart Rental Pricing Memo Template',
    description:
      'The one-page template we use to document a pricing recommendation for every unit we list - comp set, feature adjustments, seasonality overlay, and repositioning triggers.',
    ctaLabel: 'Request the template',
    ctaHref: '/contact/?type=owner&intent=download-pricing-template',
  },
}
