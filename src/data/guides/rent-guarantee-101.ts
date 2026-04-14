import type { GuideContent } from './index'

export const RENT_GUARANTEE_101: GuideContent = {
  slug: 'rent-guarantee-101',
  title: 'Rent Guarantee 101 - What It Actually Covers in Ontario',
  seoTitle: 'Rent Guarantee Ontario: What It Covers in 2026',
  metaDescription:
    'A plain-English guide to rent guarantee in Ontario - what it covers, what it excludes, how underwriting works, what it costs, and whether it fits your portfolio.',
  category: 'landlord',
  audience: 'Ontario landlords considering rent guarantee or rent protection coverage',
  primaryKeyword: 'rent guarantee Ontario',
  secondaryKeywords: [
    'rent protection insurance Ontario',
    'landlord rent guarantee Canada',
    'rent insurance Ontario',
    'eviction cost coverage Ontario',
    'landlord insurance vs rent guarantee',
  ],
  readTimeMinutes: 11,
  publishDate: '2026-04-14',
  author: 'MoveSmart Editorial',
  hero: {
    eyebrow: 'Rent Guarantee',
    headline: 'Rent Guarantee 101 - What It Actually Covers',
    lede:
      'Rent guarantee is one of the most misunderstood products in the Canadian landlord market. It is not a handshake promise, it is not a replacement for screening, and it is not the same as landlord insurance. This guide explains what rent guarantee actually covers in Ontario, how underwriting works, what it costs, and whether it makes sense for a given portfolio.',
  },
  tableOfContents: [
    { id: 'what-it-is', label: 'What rent guarantee actually is' },
    { id: 'what-it-covers', label: 'What it typically covers' },
    { id: 'what-it-excludes', label: 'What it typically excludes' },
    { id: 'underwriting', label: 'How underwriting works' },
    { id: 'cost-structure', label: 'Cost structure' },
    { id: 'who-its-for', label: 'Who it\'s right for (and not)' },
    { id: 'how-to-qualify', label: 'How to qualify a tenant' },
    { id: 'movesmart-pathway', label: 'The MoveSmart pathway' },
    { id: 'when-to-bind', label: 'When to bind a policy' },
  ],
  sections: [
    {
      id: 'what-it-is',
      heading: 'What rent guarantee actually is',
      body: `Rent guarantee is a **partner-underwritten insurance product** that compensates a landlord for specified losses when a tenant defaults - unpaid rent, legal costs of recovering possession, and in some policies damages beyond the last-month\'s-rent deposit. It is issued by licensed insurers, it is priced on risk, and the terms are set out in a written policy.

It is not a guarantee in the colloquial sense ("we guarantee you\'ll get paid"), and any provider marketing it that way is either simplifying aggressively or describing a different product.

Two common sources of confusion to clear upfront:

**Rent guarantee is not landlord insurance.** Landlord insurance (also called rental property insurance) covers the property itself - fire, water damage, liability, and in some policies lost rent after an insured peril. Rent guarantee covers tenant default specifically. Most landlords need both; neither replaces the other.

**Rent guarantee is not the Last Month\'s Rent (LMR) deposit.** The LMR deposit in Ontario is the one-month payment a landlord collects at lease signing that is applied to the final month of the tenancy. It is regulated by the Residential Tenancies Act and accrues interest payable to the tenant. Rent guarantee sits on top of the LMR and activates in a different scenario - when the tenant stops paying before the final month, the LMR is typically already applied or unavailable to cover the gap.`,
      callout: {
        label: 'A note on vocabulary',
        body:
          'Different providers use different names for the same product family - rent guarantee, rent protection, tenant default insurance, landlord protection, lease insurance. The cover sheet matters less than the policy wording. Always read the policy, not the brochure.',
      },
    },
    {
      id: 'what-it-covers',
      heading: 'What it typically covers',
      body: `Coverage varies by insurer and by the specific policy tier selected. The broad components of a standard rent guarantee product in the Ontario market generally include:

**Missed rent.** Monthly rent payments missed by the tenant, from a defined waiting period (commonly 30 days after a missed payment) up to a policy cap - typically six to twelve months of rent, subject to the insurer\'s maximum.

**Legal fees and LTB costs.** The paralegal or lawyer costs of bringing an application to the Landlord and Tenant Board to recover possession, plus filing fees. Some policies pay these costs directly to approved legal providers; others reimburse the landlord on presentation of invoices.

**Damage beyond the deposit.** Some - not all - rent guarantee policies extend to property damage caused by the insured tenant that exceeds the LMR deposit. Where this coverage exists, it is usually capped and requires documentation (move-in and move-out condition reports, photos, contractor invoices).

**Post-eviction relocation / vacancy coverage.** A small number of policies continue to pay a reduced benefit for a defined period after the tenant vacates, to cover the re-lease window. Where available, this benefit is typically capped at one to three months.

**Court orders and enforcement.** Some policies include the sheriff\'s enforcement fees required to give effect to an LTB eviction order.

Two points worth emphasising. First, the **policy cap** matters as much as what is covered. A policy that covers missed rent but caps the payout at six months of rent does not extend to month nine of a prolonged dispute. Second, most rent guarantee policies require the landlord to actively pursue recovery - the insurer is usually subrogated to the landlord\'s claim against the tenant after paying out, meaning the insurer steps into the landlord\'s shoes to recover the debt.`,
    },
    {
      id: 'what-it-excludes',
      heading: 'What it typically excludes',
      body: `The exclusion list is where rent guarantee policies differ most sharply from landlord expectations. Common exclusions in the Ontario market include:

**Pre-existing arrears.** Rent that was already unpaid at the time the policy was bound is not covered. This is why most insurers require the policy to be bound before or at move-in, and why binding a policy mid-tenancy on a tenant already showing distress is generally not possible.

**Tenants not approved by the insurer\'s underwriting.** If the landlord substitutes a tenant, adds an occupant, or consents to a lease assignment without notifying the insurer, the coverage may lapse for that tenancy. Sublets and assignments are a common gotcha.

**Collusion and fraud.** Any pattern the insurer considers collusive - the landlord and tenant coordinating to file a claim, fabricated leases, shell applicants - voids coverage. Standard fare, but worth naming.

**Claims arising from breach of the policy conditions.** Policies typically require the landlord to notify the insurer within a short window (often 14-30 days) after a missed payment and to start the LTB process within a further defined window. Missing those windows can reduce or eliminate the payout.

**Tenancies outside Ontario, or tenancies at non-residential units.** Most Ontario-marketed rent guarantee products cover Ontario residential tenancies specifically. Commercial tenancies, short-term rentals, and owner-occupied rooming arrangements are typically not covered without a specialised product.

**Certain risk-elevated tenant profiles at underwriting.** Applicants with active collections, prior LTB orders, or incomes below the insurer\'s minimum multiple are often declined at underwriting rather than covered with a higher premium - the product is priced for a screened-in pool, not a priced-for-risk one.

**Voluntary rent concessions.** If the landlord grants a rent reduction or a deferral in writing, the claim the insurer will cover is typically the reduced amount, not the original amount. Deferrals negotiated without the insurer\'s knowledge can also void subsequent claims.`,
    },
    {
      id: 'underwriting',
      heading: 'How underwriting works',
      body: `Underwriting for a rent guarantee policy runs at two layers: **the property** and **the tenant**.

**Property-level underwriting** is usually light. The insurer typically wants to confirm that the unit is a legally rentable residential tenancy in Ontario, that landlord property insurance is in force, and that the lease is on the standard Ontario Standard Lease form (or close equivalent). Off-the-books tenancies, units in contravention of local zoning, and lease terms that fall outside the RTA are not eligible.

**Tenant-level underwriting** is where the real work happens. A typical rent guarantee underwriter in Ontario will require:

- A pulled credit file on each adult tenant (Equifax or TransUnion)
- Income documentation meeting a minimum multiple (commonly 2.5x-3x gross monthly rent)
- Verified employment or self-employment income (NOA for self-employed)
- Past-landlord reference confirmation
- Government-issued photo ID
- A signed Ontario Standard Lease at the quoted rent

An applicant who fails one element is often declinable; an applicant who fails two is almost always declined. This is why **the screening discipline a landlord runs before applying for a policy matters enormously** - if the landlord\'s screening standard is already aligned with the insurer\'s, policy binding is mostly a formality. If the screening has been loose, the application gets declined and the landlord is either stuck with an uninsurable tenant or has to decline the applicant and re-list.

The underwriting pool of insurers in the Ontario market includes several partner underwriters - MoveSmart coordinates with these partners on behalf of clients rather than underwriting directly, and we do not endorse any single carrier. Landlords should compare policy terms (cap, waiting period, exclusions) rather than simply price.`,
    },
    {
      id: 'cost-structure',
      heading: 'Cost structure - what the premium looks like',
      body: `Rent guarantee pricing in the Ontario market typically falls in a **range of roughly 2% to 4% of monthly rent**, paid as an annual premium, with exact pricing driven by:

- The monthly rent (premium scales with rent)
- The tenant\'s credit and income profile (stronger profiles price closer to the lower end of the range)
- The selected policy cap (higher caps and longer coverage windows price higher)
- Whether damage coverage is included
- The insurer\'s appetite at the time of binding

Worked example (illustrative, not a quote): a $3,000/month unit with a well-screened tenant, a 6-month policy cap, and no damage rider might price in the range of $700-$1,200 for the annual premium. The same unit with damage coverage and a 12-month cap might land closer to $1,500-$2,000 annually.

**Who pays the premium?** Typically the landlord. Some landlords pass a portion of the cost through the rent, which is permissible where the rent amount itself is within guideline constraints. Passing the cost through as a separate "rent guarantee fee" on the invoice is not permissible in Ontario - the RTA does not allow ancillary rental fees of that nature.

**Renewal dynamics.** Rent guarantee policies are typically annual. On renewal, the insurer re-prices based on the tenancy\'s claim history (a clean year at one rate; a tenancy that has triggered a claim may be non-renewed or repriced materially higher). Landlords budgeting for rent guarantee should think of it as an annual expense tied to the tenancy, not a one-time purchase.`,
      callout: {
        label: 'How to think about the math',
        body:
          'A $1,000 annual premium against a single-month missed-rent exposure of $3,000 is a break-even at roughly a 33% probability of one month of default in a given year. For a well-screened tenant that probability is low; for a marginally screened tenant it can be meaningfully higher. The product is most valuable precisely where the underwriter is most skeptical.',
      },
    },
    {
      id: 'who-its-for',
      heading: 'Who rent guarantee is right for - and who it is not',
      body: `Rent guarantee is not a universal product. It is well-matched to specific landlord profiles and meaningfully less useful for others.

**Good fit:**

- **Single-asset owners** where a single missed-rent event is materially disruptive to household cash flow. For a landlord whose investment property is one-of-one, six months of unpaid rent is a significant financial shock - the premium is effectively cash-flow insurance.
- **Highly leveraged investors.** Owners carrying tight debt-service coverage ratios on a rental property benefit directly: a rent-default event that eats into reserves can cascade into mortgage arrears, which is a meaningfully worse outcome than the premium cost.
- **Non-resident landlords.** Ontario landlords living outside the province or outside Canada face practical and logistical challenges in pursuing an LTB matter directly. Rent guarantee policies with integrated legal coverage materially reduce that friction.
- **First-time landlords.** Owners renting out their first unit often lack the reserves and the procedural experience to handle a difficult tenancy. The policy pays both for the default and for the process.

**Weaker fit:**

- **Cash-rich multi-asset portfolios.** A landlord with twenty units and healthy reserves is effectively self-insuring already; the expected loss across the portfolio is smooth, and the premium-as-a-percentage-of-rent cost compounds across every unit.
- **Units where the risk has already crystallised.** A tenant already missing payments cannot be insured after the fact. The product is a forward-looking risk transfer, not a recovery tool.
- **Marginal applicants the insurer will decline.** If the underwriting will not approve the tenant, the product is unavailable - period. The right path in that case is to tighten screening and find an applicant who does pass underwriting, not to negotiate with the insurer.`,
    },
    {
      id: 'how-to-qualify',
      heading: 'How to qualify a tenant so they pass underwriting',
      body: `Because tenant-level underwriting is the gate, landlords who want the option of binding rent guarantee on a placement should run their screening to insurer standards by default. That discipline costs nothing extra and preserves optionality.

A practical underwriting-ready file includes:

1. **A pulled credit report** on every adult tenant with a clear score and clean recent history. Mid-600s is a common floor; low-700s makes life easy. Recent derogatory markers (collections inside 12 months, active bankruptcies, recent consumer proposals) typically fail underwriting.

2. **Gross household income at 2.5x-3x the rent**, documented with pay stubs plus T4 or NOA. Self-employed applicants should produce two years of NOAs and recent business bank statements.

3. **Verified employment** - insurer-eligible files typically include a direct confirmation from the employer using independently verified contact details.

4. **A past-landlord reference** verified against property records for the prior address (the reference is, in fact, the landlord).

5. **Government-issued photo ID** matched to the applicant\'s name on the lease.

6. **A signed Ontario Standard Lease** at the quoted rent, start date, and tenant composition.

7. **No documented soft-red-flag patterns** - short or unexplained rental-history gaps, rushed applications, pressure to skip screening steps, or reluctance to provide written consent for a credit check.

A landlord or brokerage that runs this process as a default - whether or not rent guarantee is ultimately bound - ends up with both a better screened tenancy and a bindable insurance file. The work is the work; the policy is the option.`,
    },
    {
      id: 'movesmart-pathway',
      heading: 'The MoveSmart pathway - how we handle rent guarantee for clients',
      body: `MoveSmart is a leasing brokerage. We do not underwrite rent guarantee policies directly - that is the role of licensed insurance partners. What we do is make sure the screening process we run on every placement produces a file that is audit-ready against the standards insurers want to see.

In practice that means:

- Our Tenant Screening workflow is deliberately calibrated to the intersection of legal compliance (Ontario Human Rights Code, RTA) and insurer underwriting criteria - so a file that passes our screen is almost always a file that passes an insurer\'s underwriting
- At the owner\'s request, we coordinate directly with partner underwriters on policy quotes and binding, providing the screening documentation the insurer needs
- We maintain a current view of partner policy terms - caps, waiting periods, exclusions - so owners can compare on substance rather than on marketing copy
- We do not accept referral compensation for directing owners to a specific insurer; our role is neutral coordination, and the owner selects the policy

For owners who want the full end-to-end service - pricing, marketing, screening, and placement with an optional rent guarantee pathway at move-in - see [Leasing Services](/services/leasing-services/). For owners who want screening alone, run to the same standard, see [Tenant Screening](/services/tenant-screening/). For the specific rent-guarantee coordination service, see [Rent Guarantee](/services/rent-guarantee/).`,
    },
    {
      id: 'when-to-bind',
      heading: 'When to bind a policy - timing and mechanics',
      body: `Rent guarantee policies in the Ontario market are almost always bound **before or on the tenant\'s move-in date**. Binding after move-in is sometimes possible with a short no-claim period but is materially restricted by most insurers.

**Why pre-move-in binding is the standard:**

- The insurer\'s risk assessment is built from the screening data that existed at the point of lease signing; binding mid-tenancy requires re-verifying that data
- A tenancy that has already exhibited payment issues is effectively uninsurable - rent guarantee is a forward-looking risk transfer, not a recovery tool
- The policy effective date needs to align with the first rent payment due date so that a missed payment can be claim-eligible under the waiting-period structure

**Practical sequence for a new placement:**

1. Lease signed on the Ontario Standard Lease form
2. Last month\'s rent deposit and first month\'s rent collected
3. Screening file assembled and submitted to the insurer\'s underwriting
4. Policy quote returned; landlord reviews and accepts
5. Premium paid; policy bound with an effective date on or before the move-in date
6. Tenant moves in under an active policy

**A narrow exception: binding mid-tenancy on a performing tenant.** Where a landlord inherits a tenancy on acquisition or simply did not buy coverage at move-in, some insurers will accept a mid-tenancy application provided the tenant has a documented clean payment history (typically 12+ months) and re-passes underwriting. A waiting period of 30-90 days before claims are eligible is common in those cases.

The short version: if a rent guarantee policy is in the plan for a placement, the decision should be made at the listing stage, not at move-in minus two days. Coordinating screening against insurer criteria from day one is what makes the pathway clean.`,
    },
  ],
  faqItems: [
    {
      question: 'Is rent guarantee the same as rent insurance?',
      answer:
        'The terms are often used interchangeably in the Canadian market, but they both refer to the same underlying product family: a partner-underwritten insurance policy that compensates a landlord for tenant-default losses, typically including missed rent and legal costs, sometimes including damage beyond the deposit. Different providers use different brand names (rent guarantee, rent protection, tenant default insurance, landlord protection, lease insurance). What matters is the policy wording - the cap, the waiting period, the exclusions, and the required landlord procedures - not the marketing name.',
    },
    {
      question: 'Does rent guarantee replace the last month\'s rent deposit?',
      answer:
        'No. The Last Month\'s Rent (LMR) deposit is a separate instrument regulated by the Residential Tenancies Act - the one-month payment a landlord collects at lease signing, which must be applied to the last month of the tenancy and which accrues interest payable to the tenant each year. Rent guarantee sits on top of the LMR and activates in a different scenario (typically when the tenant stops paying before the final month, at which point the LMR is often already committed or unavailable to bridge the gap). A landlord collecting LMR and buying rent guarantee is stacking two different protections, not paying for the same coverage twice.',
    },
    {
      question: 'What happens if my tenant passes underwriting but then loses their job?',
      answer:
        'The policy remains in force. Rent guarantee insures the landlord against missed rent from the insured tenancy - it does not require the tenant\'s original financial circumstances to persist. If the tenant loses their job and subsequently misses payments, the landlord follows the policy\'s claim procedures (notifying the insurer within the required window, starting LTB process within a further window) and the insurer pays out according to the policy terms. The one thing the landlord must not do is quietly grant a rent concession or deferral without notifying the insurer - that can limit or void the subsequent claim.',
    },
    {
      question: 'Can I bind a rent guarantee policy in the middle of an existing tenancy?',
      answer:
        'Sometimes, but with significant restrictions. Most Ontario rent guarantee policies require binding at or before move-in, because the product is priced as a forward-looking risk transfer based on the tenant\'s screening data at lease signing. Mid-tenancy binding is occasionally available - particularly where a landlord acquires the property with a tenant in place, or where a first-time landlord simply did not buy coverage at the outset - but typically requires the tenant to re-pass underwriting, a documented clean payment history of 12 months or more, and a no-claim waiting period of 30-90 days before the policy will pay out on a default. A tenancy already showing payment issues is generally uninsurable after the fact.',
    },
    {
      question: 'Is rent guarantee available outside Ontario?',
      answer:
        'Partially. Rent guarantee products are available in several Canadian provinces, but the specific policy terms, the pool of partner underwriters, and the availability for specific tenancy types vary by province because the underlying landlord-tenant legislation differs. A policy marketed in Ontario is calibrated to the Residential Tenancies Act and LTB process; the equivalent policy in British Columbia, Alberta, or Quebec is structured for that province\'s tenancy regime. MoveSmart\'s scope is Ontario-focused for rent guarantee coordination; clients with non-Ontario properties are typically best served by a provincial insurance broker or brokerage with direct presence in the relevant market.',
    },
    {
      question: 'Does rent guarantee cover damage to the property?',
      answer:
        'Some policies do; some do not; and where coverage exists it is usually capped. A base rent guarantee policy generally covers missed rent and legal costs; damage coverage is often available as an add-on or as a higher-tier version of the product, priced at a higher premium. Where the policy does include damage coverage, it typically applies only to damage beyond the LMR deposit, requires documentation (move-in and move-out condition reports, photos, contractor invoices), and caps the payout at a defined amount. Landlords who want comprehensive damage protection should also confirm that their landlord insurance policy covers tenant-caused damage - the two products overlap only partially.',
    },
    {
      question: 'Does the tenant need to know the landlord has rent guarantee?',
      answer:
        'Typically no. Rent guarantee is a contract between the landlord and the insurer; the tenant is not a party to it and does not sign the policy. In practice the tenant is aware that screening documentation is being collected for underwriting review, but the specific fact of a rent guarantee policy being in place is not usually disclosed unless and until a claim process begins. The policy does not change the tenant\'s obligations under the lease - they owe the rent to the landlord, not to the insurer - and does not change the landlord\'s obligations under the Residential Tenancies Act.',
    },
  ],
  relatedGuides: [
    'tenant-screening-ontario',
    'how-to-price-your-rental',
    'ontario-landlord-insurance-vs-rent-guarantee',
  ],
  relatedServices: ['rent-guarantee', 'tenant-screening', 'leasing-services'],
  downloadOffer: {
    label: 'The MoveSmart Rent Guarantee Readiness Checklist',
    description:
      'A one-page list of the screening documentation, lease components, and landlord records insurers look for on a bindable rent guarantee application.',
    ctaLabel: 'Request the checklist',
    ctaHref: '/contact/?type=owner&intent=download-rent-guarantee-checklist',
  },
}
