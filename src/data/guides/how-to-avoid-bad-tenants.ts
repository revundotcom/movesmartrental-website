import type { GuideContent } from './index'

export const HOW_TO_AVOID_BAD_TENANTS: GuideContent = {
  slug: 'how-to-avoid-bad-tenants',
  title: 'How to Avoid Bad Tenants: The 12-Point Due-Diligence Checklist',
  seoTitle: 'How to Avoid Bad Tenants - 12-Point Checklist (Ontario)',
  metaDescription:
    'A 12-point due-diligence checklist Ontario landlords can use to hedge against bad-tenant risk - credit floors, income multipliers, fraud patterns, and legal guardrails.',
  category: 'landlord',
  audience: 'Ontario landlords hedging against bad-tenant risk at the application stage',
  primaryKeyword: 'how to avoid bad tenants',
  secondaryKeywords: [
    'bad tenant red flags',
    'tenant screening checklist Ontario',
    'landlord due diligence',
    'tenant vetting Ontario',
  ],
  readTimeMinutes: 13,
  publishDate: '2026-04-14',
  author: 'MoveSmart Editorial',
  hero: {
    eyebrow: 'Landlord Due Diligence',
    headline: 'How to Avoid Bad Tenants - A 12-Point Checklist',
    lede:
      'A bad placement in Ontario is not a minor setback - it is months of lost rent, a Landlord and Tenant Board calendar that rarely moves quickly, and a damage repair bill that routinely dwarfs any fee a landlord saves by self-screening. This checklist lays out the twelve signals we verify on every file before a lease is signed, inside the Ontario Human Rights Code and the Residential Tenancies Act.',
  },
  tableOfContents: [
    { id: 'why-this-checklist', label: 'Why a checklist beats instinct' },
    { id: 'legal-guardrails', label: 'Legal guardrails - what you cannot ask' },
    { id: 'the-12-points', label: 'The 12 due-diligence points' },
    { id: 'fraud-detection', label: 'Document fraud detection' },
    { id: 'red-green-flags', label: 'Red flag / green flag summary' },
    { id: 'how-movesmart-applies-it', label: 'How MoveSmart applies the checklist' },
  ],
  sections: [
    {
      id: 'why-this-checklist',
      heading: 'Why a checklist beats instinct',
      body: `Landlords rarely lose money on the tenant they spent a week screening. They lose money on the applicant who "seemed fine at the showing," who "had a good job," whose pay stub "looked real enough." Bad placements almost always share the same post-mortem: one or two signals that were never independently verified.

The practical exposure of a single bad tenancy in Ontario routinely runs into the tens of thousands of dollars once unpaid rent, legal costs, damage remediation, and re-marketing vacancy are added together. Against that exposure, a structured twelve-point checklist - applied uniformly, documented in writing - is the cheapest risk mitigation a landlord will ever buy.

A checklist also does something subtler: it protects the landlord legally. A decision grounded in documented, neutral, job-related criteria applied equally to every applicant is the decision least likely to draw a Human Rights Tribunal complaint. Instinct does not produce a paper trail. A checklist does.`,
      callout: {
        label: 'What this guide is not',
        body:
          'This is an editorial framework, not legal advice. Landlords facing a marginal decision - particularly where a prohibited ground under the Ontario Human Rights Code is anywhere near the facts - should review the file with a paralegal or lawyer before issuing a decline.',
      },
    },
    {
      id: 'legal-guardrails',
      heading: 'Legal guardrails - what you cannot ask or decide on',
      body: `Before the checklist, the guardrails. Every screening decision in Ontario operates inside two statutes: the **Residential Tenancies Act, 2006** and the **Ontario Human Rights Code**. The Code lists prohibited grounds of discrimination in housing - race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, gender expression, age, marital status, family status, disability, and the receipt of public assistance.

That framing is concrete, not abstract:

- Income **source** is not a valid decline reason (an applicant on ODSP or Ontario Works cannot be declined for that reason); income **amount and stability** can be.
- "Adults only" or "no children" policies are discriminatory on the basis of family status and are not permitted.
- Section 14 of the RTA voids "no pets" clauses in residential leases - an application cannot be declined solely because the applicant has a pet.
- Asking about an applicant's religion, country of origin, or family composition is impermissible at the screening stage.

Everything in the twelve-point checklist below operates inside these guardrails. Each signal is tied to the neutral, job-related question of whether the applicant can reliably pay rent and maintain the unit.`,
    },
    {
      id: 'the-12-points',
      heading: 'The 12 due-diligence points',
      body: `Each point below is a distinct signal. No single point decides the file - the decision is pattern-based across all twelve. Applied uniformly, this is the framework the MoveSmart team runs on every applicant before a file reaches the owner.`,
      subsections: [
        {
          heading: '1. Credit score floor - typically mid-600s',
          body: `Most Ontario landlords set an internal credit floor in the mid-600s as a first filter. That is a useful threshold but not a decision on its own. Read the full file: a 720 score with three recent collections is a worse signal than a 640 score with a thin file and no derogatory markers. Newcomers and recent graduates often have short histories rather than bad histories - treat those cases with substituted documentation, not auto-declines.`,
        },
        {
          heading: '2. Income multiplier - 2.5x to 3x gross monthly rent',
          body: `Gross household income should sit at or above 2.5x to 3x the monthly rent, verified across at least two independent sources. For traditional employees: the three most recent pay stubs, the most recent T4, and a recent Notice of Assessment from CRA. For self-employed applicants: the NOA is the anchor (harder to falsify than a T4 or pay stub), paired with two years of T1 Generals, three to six months of business bank statements, and - for incorporated applicants - an accountant letter confirming draws or distributions.`,
        },
        {
          heading: '3. Employment tenure - 6 months minimum at current employer',
          body: `A baseline of six months at the current employer gives the income signal a track record. Shorter tenure is not disqualifying - a recent promotion, interprovincial relocation, or industry move is normal - but it shifts the documentation weight to the offer letter, probationary status, and any severance/guarantee terms. Contract and gig applicants should be documented across at least two prior engagements showing continuity of work.`,
        },
        {
          heading: '4. Rental history continuity',
          body: `Two to three previous tenancies with addresses, dates, and stated reasons for leaving. Unexplained gaps of six months or more are a prompt to ask, not a prompt to decline - applicants may have lived with family, been posted abroad, or owned rather than rented. A pattern of short tenancies (multiple addresses inside 18 months) with vague reasons is the stronger red flag.`,
        },
        {
          heading: '5. Landlord references - verify the reference is the landlord',
          body: `This is the highest-signal reference and the one most often gamed. Before taking any statement at face value, confirm the reference actually owns or manages the address given. Municipal property tax rolls, MPAC lookups, and condominium-corporation records are all accessible - and a five-minute check separates a real past-landlord reference from a cousin or sublet contact. Ask open-ended questions: walk me through how the tenancy ended, what notice was given, and the condition on move-out.`,
        },
        {
          heading: '6. Employer references - confirm role, tenure, and range',
          body: `Contact the employer via a phone number or email independently sourced from the company's public records, not from the number written on the application. Confirm role title, tenure, and - where HR policy permits - employment status (permanent, contract, probationary). Many HR departments will not confirm salary; that is policy, not a red flag, and the pay stub plus NOA already anchor the income figure.`,
        },
        {
          heading: '7. Application completeness',
          body: `Incomplete applications are the single most underrated predictor of downstream problems. Missing dates, missing prior addresses, missing references, missing consent signatures, and blanks where employment history should be - all of these correlate with tenancies that go sideways. Our internal rule at MoveSmart is that an incomplete application is returned for completion rather than evaluated as submitted. An applicant who cannot complete the paperwork rarely completes a condition inspection report either.`,
        },
        {
          heading: '8. Online presence sanity check - within legal limits',
          body: `A brief cross-check of publicly visible professional profiles (LinkedIn in particular) can confirm the employer, the role, and the tenure the applicant listed. The hard rule: you are confirming identity and employment only. You are not looking at photos, political content, religious indicators, or anything that brushes a prohibited ground. Any search that strays past employment verification has stopped being screening and has started being a Human Rights Code exposure.`,
        },
        {
          heading: '9. In-person behaviour at the showing',
          body: `Punctuality, basic courtesy toward the current occupant, and the questions the applicant asks during the showing are all legitimate observations - all of them map to neutral, tenancy-relevant behaviour. What is not legitimate is an assessment of how the applicant "fits the building" or whether they "seem like the type who belongs here." The former is a data point; the latter is a Human Rights Code problem waiting to happen.`,
        },
        {
          heading: '10. Pet management - documentation, not exclusion',
          body: `"No pets" clauses are void under Section 14 of the Residential Tenancies Act, so a pet cannot be a decline reason in a residential tenancy. What a landlord can do is document the pets on the application - species, breed, size, age - ask for a photo, and ask for a reference from the applicant's veterinarian confirming the pets are healthy and house-trained. That documentation protects both the owner and the tenant if a dispute arises later.`,
        },
        {
          heading: '11. Cosigner or guarantor for thin or borderline files',
          body: `Where an applicant is thin-file (newcomer, recent graduate) or slightly below the income multiplier, a guarantor is a useful tool. A guarantor must be screened to the same standard as a primary applicant - credit, income (at a higher multiple since the guarantor is already carrying their own housing costs), employment, and identity. An unscreened guarantor is not a risk mitigant; it is theatre. A guarantor who lives outside Ontario or outside Canada introduces enforcement friction and should be assessed with that in mind.`,
        },
        {
          heading: '12. Document fraud detection',
          body: `Falsified pay stubs, doctored Notices of Assessment, and fabricated employer letters are now the most common forms of application fraud we see. Signals to check: fonts that change mid-document, year-to-date totals that do not reconcile with the pay-period math, employer logos that are slightly off from the current corporate identity, NOAs that reference prior tax-year formats, Social Insurance Numbers that do not follow the expected Canadian issuance pattern, and pay stub "net" amounts that do not reconcile against the applicant's bank deposits. The fastest single check is to ask the applicant for two months of bank statements and reconcile the net deposits against the claimed pay-stub net - a real pay stub and a real bank statement will match within a few dollars.`,
        },
      ],
    },
    {
      id: 'fraud-detection',
      heading: 'Document fraud - common patterns and fast checks',
      body: `Application fraud has moved from rare to routine, driven by widely available document-editing tools. The four patterns we see most often:

**Altered pay stubs.** Gross, net, and year-to-date figures that do not reconcile. The math on a real pay stub is arithmetic; on a falsified one, the numbers are often round and the YTD column will not match the implied pay-period total. Ask for two consecutive stubs - the YTD progression will expose the mismatch.

**Outdated Notice of Assessment formats.** CRA updates the NOA template periodically. An applicant presenting a current-year NOA in a format that has not been issued for several years is presenting a template, not a document.

**Fabricated employer letters.** Phone numbers that route to a personal mobile rather than a company switchboard; email domains that are close-but-not-exact matches of the employer's real domain; signatures from "HR managers" who do not appear on the company's LinkedIn. The independent-sourcing rule from Point 6 catches most of these.

**Bank statement / pay stub mismatch.** The highest-signal single check. A real pay stub's net amount appears on the applicant's bank statement within a day or two of the pay date. A falsified pay stub rarely reconciles cleanly against real bank deposits.

None of these are absolute proofs. Each one is a prompt to ask for additional verification - a second document, a direct HR contact, a branch-stamped bank statement - before the file advances.`,
    },
    {
      id: 'red-green-flags',
      heading: 'Red flag / green flag summary',
      body: `After twelve points, the decision is rarely about any single signal. It is about the **shape** of the file - the pattern across all twelve points read together.

**Red-flag patterns - any one prompts investigation; two or more usually trigger a decline or a conditional approval:**

- Unexplained rental gaps of six months or more with no credible narrative
- Recent collections, judgments, or utility defaults on the credit file
- Employer contact details that do not match the company's public records
- Income documentation that cannot be independently verified across sources
- A pattern of short tenancies (multiple addresses inside 18 months) with vague exit reasons
- Reluctance or refusal to sign the credit-check consent form
- Pressure to waive standard verification in exchange for rent pre-payment
- Bank deposits that do not reconcile against claimed pay-stub net
- A proposed guarantor who refuses to be screened to the same standard

**Green-flag patterns - individually modest, powerful in combination:**

- A past-landlord reference that is specific, detailed, and independently verifiable
- Income documentation that triangulates across three sources (pay stub, T4, NOA)
- Credit history showing long-standing trade lines with on-time payment
- A clear, credible reason for the move - relocation, lease end, household change
- Willingness to provide additional documentation on request rather than pushback
- Complete, legible application with no missing fields and all consents signed

A perfect applicant is rare. A **consistently documented** applicant is common, and consistent documentation is the real goal of the twelve-point checklist.`,
    },
    {
      id: 'how-movesmart-applies-it',
      heading: 'How MoveSmart applies the checklist',
      body: `MoveSmart is a leasing brokerage, not a property management firm - our success fee only earns out if the tenancy performs, so our interests and the landlord's interests are structurally aligned at the screening stage. Every file we put in front of an owner has already been through the twelve points above.

The workflow is linear: portal-based application intake with written consent, credit file pull with full-history review, income documentation against a documented multiplier, independent employer verification using contact details we source ourselves, past-landlord verification including a title-roll check that the reference is real, and a written file summary delivered to the owner with a documented recommendation.

The owner makes the final call - we do not sign leases on anyone's behalf. But by the time a file reaches the owner, the verification work is done, the fraud checks are complete, and the decision is as defensible as it can reasonably be under the Ontario Human Rights Code.

For the full screening scope, see our [Tenant Screening service](/services/tenant-screening/). For a bundled placement engagement that includes screening end-to-end, see [Leasing Services](/services/leasing-services/). Where a guarantor is the right answer for a thin-file applicant, the [Tenant Guarantor service](/services/tenant-guarantor/) runs the guarantor through the same documented framework.`,
    },
  ],
  faqItems: [
    {
      question: 'What is the fastest way to spot a bad tenant at the application stage?',
      answer:
        'There is no single fastest check - bad-tenant patterns show up across multiple signals, not a single one. That said, the highest-yield single check is to reconcile the net pay-stub figure against the applicant\'s bank statements. A real pay stub and a real bank statement match within a few dollars on the pay date; a falsified pay stub rarely reconciles. If the numbers do not match, every other document on the file should be re-verified before the application advances.',
    },
    {
      question: 'Can I decline an applicant because they have pets or children?',
      answer:
        'No. Section 14 of the Residential Tenancies Act, 2006 voids "no pets" clauses in residential leases - a pet cannot be a decline reason. Family status (including the presence of children) is a prohibited ground under the Ontario Human Rights Code, so "no children" or "adults only" screening policies are not permitted. A landlord can document the pets on the application (species, breed, size, veterinarian reference) and can apply neutral fit-for-unit criteria (bedroom occupancy limits set by municipal bylaw, for example), but the application cannot turn on pet ownership or family composition.',
    },
    {
      question: 'How much income should an applicant have relative to the rent?',
      answer:
        'The Ontario market standard is gross monthly household income of 2.5x to 3x the monthly rent. A $3,000/month unit therefore typically requires $7,500 to $9,000 in verified gross monthly income across the household. Some landlords run lower multiples for premium units (where the applicant pool skews higher-income) and higher multiples for tight-margin units. Whatever the multiple, it should be documented in advance and applied uniformly to every applicant - a floating multiplier is both poor underwriting and a potential Human Rights Code exposure.',
    },
    {
      question: 'What counts as document fraud, and what should I do about it?',
      answer:
        'Document fraud at the screening stage typically means altered pay stubs, doctored Notices of Assessment, fabricated employer letters, or employer phone numbers that route to a personal mobile rather than the company. The correct response is not to confront the applicant - it is to quietly ask for additional verification (a second pay stub, a direct HR contact, a branch-stamped bank statement). Where the fraud is clear after additional verification, the applicant can be declined on the neutral ground that the documentation does not meet the screening standard, with a written rationale retained for the file.',
    },
    {
      question: 'Is it legal to look at an applicant\'s social media during screening?',
      answer:
        'Legal, but narrow. A brief cross-check of publicly visible professional profiles (primarily LinkedIn) to confirm the employer, role, and tenure the applicant listed is within the bounds of employment verification. What is not legal in effect - even if technically accessible - is any search that looks at photos, political or religious content, family status, or anything else that brushes a prohibited ground under the Ontario Human Rights Code. A screening decision that turns on what a landlord saw on an applicant\'s personal social media is a Human Rights Tribunal complaint waiting to happen.',
    },
    {
      question: 'Does a guarantor actually protect me against a bad tenant?',
      answer:
        'A guarantor helps in specific circumstances and fails in others. Where the underlying concern is thin Canadian credit history (newcomer, recent graduate) or a slight income-multiplier shortfall, a properly screened guarantor adds a real second source of recourse. Where the underlying concern is income instability or a history of arrears, a guarantor only gives the landlord a second person to chase - it does not prevent missed rent. The guarantor must be screened to the same documented framework as the primary applicant (credit, income at a higher multiple, employment, identity) and should ideally live in Ontario for enforcement reasons.',
    },
    {
      question: 'What should I say when I decline an applicant in Ontario?',
      answer:
        'Nothing in the Residential Tenancies Act compels a landlord to issue a written decline with reasons, and many landlords simply advise the applicant that the unit has been rented. Where a written decline is issued, the reasoning should map cleanly to the neutral screening criteria - income below threshold, incomplete documentation, references not independently verifiable, credit history outside the documented standard - and must not touch a prohibited ground under the Ontario Human Rights Code. A useful template: "Based on the total documented income, verified employment, credit history, and landlord references, this application does not meet our documented screening standard."',
    },
  ],
  relatedGuides: [
    'tenant-screening-ontario',
    'rent-guarantee-101',
    'how-to-price-your-rental',
  ],
  relatedServices: ['tenant-screening', 'tenant-placement', 'tenant-guarantor', 'rent-guarantee'],
  downloadOffer: {
    label: 'The 12-Point Bad-Tenant Screening Checklist',
    description:
      'A one-page field reference for landlords covering the 12 due-diligence points, the document-fraud fast checks, and the red flag / green flag summary - formatted to sit beside an open application.',
    ctaLabel: 'Request the checklist',
    ctaHref: '/contact/?type=owner&intent=download-bad-tenant-checklist',
  },
}

export default HOW_TO_AVOID_BAD_TENANTS
