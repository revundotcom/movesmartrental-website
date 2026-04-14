import type { GuideContent } from './index'

export const TENANT_SCREENING_ONTARIO: GuideContent = {
  slug: 'tenant-screening-ontario',
  title: 'Tenant Screening in Ontario: The Landlord\'s Playbook',
  seoTitle: 'Tenant Screening Ontario: A Landlord\'s 2026 Playbook',
  metaDescription:
    'A strategic tenant screening playbook for Ontario landlords - the 6-point framework, Human Rights Code guardrails, credit and income thresholds, and red flags.',
  category: 'landlord',
  audience: 'Ontario landlords evaluating prospective tenants for a rental unit',
  primaryKeyword: 'tenant screening Ontario',
  secondaryKeywords: [
    'tenant screening checklist Ontario',
    'how to screen tenants Ontario',
    'Ontario landlord screening guide',
    'tenant credit check Ontario',
    'Ontario Human Rights Code rental',
  ],
  readTimeMinutes: 14,
  publishDate: '2026-04-14',
  author: 'MoveSmart Editorial',
  hero: {
    eyebrow: 'Tenant Screening',
    headline: 'Tenant Screening in Ontario - A Structured Playbook',
    lede:
      'Screening is the single most consequential decision a landlord makes in a tenancy, yet it is routinely compressed into a credit-check-plus-gut-feel exercise. This playbook lays out a defensible, rights-compliant framework Ontario landlords can apply to every applicant - the same framework MoveSmart runs for our clients before any lease is signed.',
  },
  tableOfContents: [
    { id: 'why-screening-matters', label: 'Why structured screening matters' },
    { id: 'six-point-framework', label: 'The 6-point screening framework' },
    { id: 'legal-guardrails', label: 'Legal guardrails in Ontario' },
    { id: 'credit-realities', label: 'Credit check realities' },
    { id: 'income-verification', label: 'Income and employment verification' },
    { id: 'references', label: 'References - landlord and employer' },
    { id: 'red-green-flags', label: 'Red flags and green flags' },
    { id: 'guarantor', label: 'When a guarantor makes sense' },
    { id: 'how-movesmart-runs-it', label: 'How MoveSmart structures this' },
  ],
  sections: [
    {
      id: 'why-screening-matters',
      heading: 'Why structured screening matters',
      body: `A poorly screened tenant is not a rounding error. Once a lease is signed in Ontario, removing a tenant who stops paying or damages the unit runs through the Landlord and Tenant Board (LTB) - and that calendar does not move quickly. Landlords routinely wait several months for a first hearing, often longer before an order is enforced. During that window, rent is unpaid, carrying costs continue, and a second placement cannot begin.

The practical cost of a single bad placement in Ontario can climb into the tens of thousands once you add lost rent, legal fees, damage remediation, and vacancy costs between tenancies. Against that exposure, a structured screening process that takes a few extra business days is the highest-leverage hour a landlord will spend on the asset all year.

The core mistake we see from landlords in Ontario is treating screening as a pass/fail moment built around a single credit number. A defensible screen is a **layered decision** - multiple signals, each verified against an independent source, with a written rationale for the final accept or decline. That layered structure is what holds up if the tenancy deteriorates and what keeps the decision inside the Ontario Human Rights Code.`,
      callout: {
        label: 'Why we publish our process',
        body:
          'The detailed screening sequence MoveSmart uses is unusual to publish in a leasing market where "we vet tenants carefully" is the standard marketing line. We publish it because landlords deserve to see what a defensible process actually looks like - and because clients who understand the process sign off on decisions faster.',
      },
    },
    {
      id: 'six-point-framework',
      heading: 'The 6-point screening framework',
      body: `A complete screen in Ontario covers six distinct signals. Each one answers a different question and no single signal should override the others - the decision is pattern-based, not score-based.`,
      subsections: [
        {
          heading: '1. Credit check',
          body: `A pulled credit file from Equifax or TransUnion (with the applicant\'s written consent) showing score, payment history, open trades, collections, and any bankruptcy/consumer-proposal markers. The score is one input; the **history** is the more useful part.`,
        },
        {
          heading: '2. Income verification',
          body: `Documented proof of income at or above the multiple the landlord requires - typically a 2.5x to 3x gross-rent multiplier in Ontario. Documentation means pay stubs, a recent Notice of Assessment, T4s, or a signed employer letter, not screenshots or redacted PDFs.`,
        },
        {
          heading: '3. Employment verification',
          body: `A direct call or email to the employer using contact details independently verified (company website, LinkedIn) - not the number the applicant writes on the form. Confirms tenure, employment type, and - where the employer allows - income range.`,
        },
        {
          heading: '4. Reference verification',
          body: `Past-landlord and personal-character references, where the past-landlord reference is the higher-signal of the two. Always verify the person is in fact the landlord of the prior address - title search or property-tax roll lookup if in doubt.`,
        },
        {
          heading: '5. Rental history',
          body: `Two to three previous tenancies ideally, with addresses, dates, and reason for leaving. A gap between claimed residences is not automatically disqualifying, but it is a prompt to ask.`,
        },
        {
          heading: '6. Identity and compliance',
          body: `Government-issued photo ID matched against the name on the application, and a check of LTB public records for any prior eviction orders. Public LTB decisions are searchable online for cases that proceeded to a written order.`,
        },
      ],
    },
    {
      id: 'legal-guardrails',
      heading: 'Legal guardrails in Ontario - what you can and cannot ask',
      body: `Every screening decision in Ontario lives inside two statutes: the **Residential Tenancies Act, 2006** and the **Ontario Human Rights Code**. The Code lists prohibited grounds of discrimination in housing, which include race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, gender expression, age, marital status, family status, disability, and the receipt of public assistance. Screening questions cannot ask about these grounds and screening decisions cannot turn on them.

That framing has practical consequences:

- Landlords in Ontario **can** ask for credit information, income information, and rental history with the applicant\'s written consent.
- Landlords in Ontario **cannot** refuse an applicant because they are receiving ODSP, Ontario Works, or a disability-related benefit. Income source is not a valid decline reason; the **amount and stability** of income is.
- A "no children" or "adults only" policy in a residential tenancy is discriminatory on the basis of family status and is not permitted.
- The RTA also provides that "no pets" clauses in residential leases are void; a landlord cannot decline on the basis that the applicant has a pet (condominium rules and certain species-specific bylaws are the narrow exceptions).

The safest formulation of a screening decision is: *"Based on the total documented income, verified employment, credit history, and landlord references, this application does not meet our documented screening standard."* The rationale is tied to neutral, job-related criteria applied uniformly to every applicant - which is both the legal standard and good practice.`,
      callout: {
        label: 'What this guide is not',
        body:
          'This is an editorial overview, not legal advice. Landlords with a marginal or sensitive decision should review it with a paralegal or lawyer familiar with Ontario residential tenancy law before issuing a decline.',
      },
    },
    {
      id: 'credit-realities',
      heading: 'Credit check realities - what the number actually tells you',
      body: `Most landlords in Ontario set a minimum credit threshold somewhere in the **mid-600s**. That is a useful floor, but it is not a substitute for reading the file. A 720 score with three collections in the last 12 months is a worse signal than a 640 score with a thin file and no derogatory markers.

Three patterns are worth calling out:

**Thin-file applicants.** Newcomers to Canada, recent graduates, and applicants who have historically rented rather than borrowed will often have a short or absent credit history. A low or missing score here does not mean bad credit - it means not enough data. The correct response is to lean harder on income documentation, employer verification, and (where available) international credit references or a guarantor, not to auto-decline.

**Recent derogatory markers.** A collection or charge-off inside the last six months is a much stronger negative signal than the same marker three years ago. Landlords should read dates, not just totals.

**Utilisation vs missed payments.** A high credit-card utilisation ratio is not the same signal as a pattern of missed payments. Utilisation tracks cash flow tightness; missed payments track discipline. Both matter, but they matter differently.

A defensible approach is to set a documented minimum score as an initial filter, and then require any applicant below that floor to either clear a secondary review (stronger income, guarantor, additional deposits where legally permitted) or receive a decline with written, neutral rationale.`,
    },
    {
      id: 'income-verification',
      heading: 'Income and employment verification',
      body: `The standard Ontario market heuristic is that gross monthly household income should be at least **2.5x to 3x the monthly rent**. A $3,000/month unit therefore typically requires $7,500 to $9,000 in verified gross monthly income across the household. Some landlords run a lower multiple for premium units (where the applicant pool skews higher-income) and a higher multiple for tight-margin units where a small shock to the household budget is likely to land as missed rent.

**Traditional employees** are the cleanest case: two recent pay stubs, plus a T4 or employer letter, plus a phone or email verification from HR. The verification step is where fraud gets caught - fabricated pay stubs are now easy to produce, fabricated HR departments with real phone numbers are much harder.

**Self-employed, contract, and gig applicants** require a different set of documents:

- A recent **Notice of Assessment (NOA)** from CRA as the anchor - it is the hardest document to falsify
- Two years of T1 General filings to show income stability across tax years
- Business bank statements for the last three to six months to show cash-flow consistency
- For incorporated applicants, an accountant letter confirming distributions or draws

The T4 tells you what an employer paid; the NOA tells you what the applicant actually reported and what the CRA accepted. For self-employed applicants, the NOA is the more defensible anchor.

Landlords should also pressure-test **income stability**, not just income amount. A high-earning contractor between contracts carries a different risk profile than a lower-earning permanent employee with five years of tenure. Neither is disqualifying on its own, but the two cases call for different documentation depth.`,
    },
    {
      id: 'references',
      heading: 'References - landlord and employer',
      body: `Reference checks are the screening step most often skipped and most often gamed. Three disciplines separate a real reference check from a box-ticking exercise.

**Verify that the reference is who they claim to be.** A "previous landlord" on the application should be cross-referenced against the property records for the address provided - municipal tax rolls, MPAC, and condo-board records are all publicly or semi-publicly accessible. If the named landlord does not appear on title, the reference is either a relative, a friend, or a sublet-chain contact. Any of those is a prompt to ask directly.

**Ask open-ended questions, not yes/no questions.** The question "did they pay rent on time?" will be answered "yes" by nearly every reference. The question "walk me through how the tenancy ended and what notice they gave" produces a narrative that reveals the texture of the tenancy - notice-period behaviour, condition at move-out, reasons for leaving.

**Ask the employer only what the employer can answer.** Most HR departments will confirm employment status and tenure; many will not confirm salary. A landlord who asks for a salary confirmation and is refused should not escalate - that response is policy, not a red flag. Use the pay stub and NOA as the income anchor; use the employer as the tenure anchor.

A useful sequence is: past landlord first (highest signal), employer second (tenure confirmation), personal reference last (character context, lowest decision weight).`,
    },
    {
      id: 'red-green-flags',
      heading: 'Red flags and green flags - reading the whole file',
      body: `Individual signals are noisy. Patterns are not. When we review a file at MoveSmart, we are looking at the shape of the whole application, not any single line.

**Red-flag patterns** - any one is a prompt to investigate; two or more in combination usually triggers a decline or a conditional approval:

- Unexplained gaps in rental history of six months or more
- Recent collections or judgments on the credit file, particularly from previous landlords or utilities
- Employer contact details that do not match the company\'s public records
- Income documentation that cannot be independently verified (no NOA, no employer confirmation, no business bank statements)
- A pattern of short tenancies (multiple addresses inside 18 months) with vague reasons for leaving
- Reluctance or refusal to sign a consent form for a credit check
- An application rushed, pressured, or accompanied by offers of significant rent pre-payment in lieu of screening

**Green-flag patterns** - individually modest, powerfully reassuring in combination:

- A past landlord reference that is specific, detailed, and easy to verify
- Income documentation that triangulates across three sources (pay stub, T4, NOA)
- Credit history showing long-standing trade lines with on-time payment
- A clear, credible reason for the move - relocation, lease end, household change
- A willingness to provide additional documentation on request rather than pushback

The goal is not to find the "perfect" applicant - that applicant is rare. The goal is to confirm that the applicant the landlord chooses is the applicant the landlord believes they are choosing.`,
    },
    {
      id: 'guarantor',
      heading: 'When a guarantor makes sense - and when it does not',
      body: `A guarantor (sometimes called a co-signer) is a third party who agrees in writing to be jointly liable for the tenant\'s obligations under the lease. In Ontario, a guarantor is a useful tool in specific circumstances and a weak tool in others.

**Guarantors add real value when:**

- The applicant is a newcomer to Canada with strong income but a thin Canadian credit file
- The applicant is a student or recent graduate with a credible income path but limited history
- The applicant\'s income meets most but not all of the landlord\'s multiple (e.g. 2.3x instead of 3x)
- A specific soft red flag (a single dated collection, a short employment tenure in an otherwise strong file) benefits from an extra layer

**Guarantors are a weaker tool when:**

- The underlying concern is income stability - a guarantor does not prevent missed rent, it only provides a second person to chase
- The applicant has a documented recent eviction or recent significant arrears - the guarantor is insurance against a risk that has already crystallised once
- The proposed guarantor lives outside Ontario or outside Canada - enforcement becomes meaningfully harder

A guarantor should be screened against the same framework as a primary applicant - credit, income at a higher multiple (typically 5x the rent, since the guarantor is carrying their own housing costs plus a contingent obligation), employment, and identity. A guarantor agreement that is not independently screened is theatre.

MoveSmart offers **Tenant Guarantor Services** as a dedicated track for applicants who need a documented guarantor solution, including guarantor screening and the drafting of a compliant joint-liability addendum. See our [guarantor service](/services/tenant-guarantor/) for the full scope.`,
    },
    {
      id: 'how-movesmart-runs-it',
      heading: 'How MoveSmart structures this for clients',
      body: `MoveSmart is a leasing brokerage, not a property management firm. We screen applicants because the screening decision is inseparable from the placement decision - our success fee only earns out if the tenancy performs, so our interests and the landlord\'s interests are structurally aligned.

The MoveSmart screening workflow runs every applicant through the same documented sequence:

1. **Application intake** via secured portal with written consent for credit and reference checks
2. **Credit file pull** from Equifax/TransUnion with full history review, not just the score
3. **Income documentation review** against a 2.5x-3x gross-rent multiple, with NOA as the anchor for self-employed applicants
4. **Independent employer verification** - contact details sourced from the employer\'s own records, not the application
5. **Past-landlord verification** including title-roll confirmation that the reference is the actual landlord
6. **File summary** delivered to the owner with a clear recommendation and documented rationale
7. **Decline letters** drafted on request, on neutral grounds, for unsuccessful applicants

The landlord makes the final call - we do not sign leases on the owner\'s behalf. But by the time a file reaches the owner, the verification work is done and the decision is as clean as it can reasonably be.

For the complete service scope, pricing, and turnaround times, see our [Tenant Screening service page](/services/tenant-screening/). For owners who want screening combined with full placement, [Leasing Services](/services/leasing-services/) bundles screening into the end-to-end workflow from pricing to key handover.`,
    },
  ],
  faqItems: [
    {
      question: 'What credit score is considered the minimum for tenant screening in Ontario?',
      answer:
        'Most landlords in Ontario set an internal floor in the mid-600s, but the score is only one input. A higher score with recent derogatory markers can be a worse signal than a moderate score with a clean payment history. The correct approach is a documented minimum, with a secondary review track for applicants below it who have offsetting strengths (stronger income, a guarantor, or thin-file context such as newcomer status).',
    },
    {
      question: 'Can an Ontario landlord refuse an applicant because they have pets?',
      answer:
        'Generally no. Section 14 of the Residential Tenancies Act, 2006 voids "no pets" provisions in residential leases, so a landlord cannot decline an application solely because the applicant has a pet. There are narrow carve-outs - condominium corporation rules, serious allergy claims, and some species-specific municipal bylaws - but a blanket no-pets screening policy is not defensible. Pets can still factor into deposit conversations (damage deposits beyond the last-month\'s-rent deposit are not permitted in Ontario) and fit-for-unit discussions, but not into the accept/decline decision.',
    },
    {
      question: 'Can I ask an applicant about past evictions, and are LTB records public?',
      answer:
        'You can ask, and many landlords do. Separately, Landlord and Tenant Board decisions that result in written orders are published on CanLII and searchable online. That said, a prior LTB matter is not an automatic disqualification - the context matters, and the Ontario Human Rights Code still governs the final decision. A pattern of unpaid-rent orders is materially different from a single mutual-termination order, and both should be weighed alongside the rest of the file.',
    },
    {
      question: 'What if a tenant refuses to provide a credit check?',
      answer:
        'An applicant is not required to provide a credit check, but a landlord is not required to accept the application without one. A refusal is a legitimate reason to discontinue the application on neutral grounds - the screening standard applies equally to every applicant, and that standard includes verified credit information. Occasionally, an applicant in a strong position (high income, excellent references, short-term tenancy) will ask to substitute bank statements and a larger last-month\'s-rent deposit. That is a business decision for the landlord, with the caveat that Ontario only permits a last-month\'s-rent deposit, not a separate damage deposit.',
    },
    {
      question: 'How long does a professional tenant screening take?',
      answer:
        'A complete screen - credit, income, employment, past-landlord, personal, and identity - typically takes two to four business days once the applicant has submitted complete documentation. The bottleneck is usually the past-landlord reference, since it depends on the prior landlord returning a call. Rush-screens that compress this into 24 hours are possible for straightforward files but trade depth for speed; any applicant with a thin file, self-employment income, or a complex rental history should not be rushed.',
    },
    {
      question: 'What should I do with an applicant who has no Canadian credit history?',
      answer:
        'Newcomers to Canada frequently have strong underlying finances but no Canadian credit file. The correct response is not to decline - it is to substitute alternative documentation. That typically means: a letter of employment from the Canadian employer confirming tenure and income; two to three months of Canadian bank statements showing salary deposits; an international credit report where available (Nova Credit aggregates several foreign bureaus for applicants from specific countries); and, where the applicant has family or an employer willing to co-sign, a Canadian guarantor screened to the same standard. Refusing to consider a file solely because it lacks Canadian history risks a Human Rights Code complaint on grounds of place of origin and is poor underwriting besides - the file is not empty, it is just sourced differently.',
    },
    {
      question: 'Do I have to give a reason when I decline an applicant in Ontario?',
      answer:
        'Nothing in the Residential Tenancies Act compels a landlord to issue a written decline with reasons, and many landlords simply advise the applicant that the unit has been rented. That approach is defensible provided the underlying decision is based on neutral, documented screening criteria applied uniformly. Where a landlord does issue written reasons, those reasons should map to the screening criteria - income below threshold, incomplete documentation, references not verifiable - and must not touch a prohibited ground under the Ontario Human Rights Code.',
    },
  ],
  relatedGuides: [
    'how-to-price-your-rental',
    'rent-guarantee-101',
    'ontario-lease-agreement-essentials',
  ],
  relatedServices: ['tenant-screening', 'leasing-services', 'tenant-guarantor'],
  downloadOffer: {
    label: 'The MoveSmart Ontario Screening Checklist',
    description:
      'A one-page reference for landlords covering the 6-point framework, the Human Rights Code guardrails, and the documentation list we use on every file.',
    ctaLabel: 'Request the checklist',
    ctaHref: '/contact/?type=owner&intent=download-screening-guide',
  },
}
