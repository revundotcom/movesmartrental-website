import type { GuideContent } from './index'

export const INSTITUTIONAL_RFP_TEMPLATE: GuideContent = {
  slug: 'institutional-rfp-template',
  title: 'Institutional Lease-Up RFP Template: Selecting a Leasing Partner',
  seoTitle: 'Institutional Lease-Up RFP Template - Builder\'s Guide',
  metaDescription:
    'A structured RFP template for builders, developers, and PMCs selecting a leasing partner for a purpose-built rental lease-up - scope, capabilities, fees, and evaluation criteria.',
  category: 'institutional',
  audience:
    'Builders, developers, property management companies, and purpose-built rental operators selecting a leasing partner for a new delivery',
  primaryKeyword: 'institutional lease-up RFP template',
  secondaryKeywords: [
    'purpose-built rental lease-up',
    'builder leasing partner selection',
    'PBSA lease-up',
    'institutional rental RFP',
  ],
  readTimeMinutes: 16,
  publishDate: '2026-04-14',
  author: 'MoveSmart Editorial',
  hero: {
    eyebrow: 'Institutional Lease-Up',
    headline: 'The Institutional Lease-Up RFP - A Structured Template',
    lede:
      'A purpose-built rental lease-up is the highest-consequence leasing engagement any operator runs - months of delivery schedule, hundreds of units, and an absorption curve that drives the pro forma directly. Selecting the leasing partner through an ad-hoc conversation is how absorption slips and carry costs compound. This template lays out the structured RFP we recommend for selecting a leasing partner on any delivery of 100 units or more.',
  },
  tableOfContents: [
    { id: 'why-structured-rfps', label: 'Why structured RFPs matter' },
    { id: 'scope-definition', label: 'Scope definition' },
    { id: 'required-capabilities', label: 'Required capabilities to specify' },
    { id: 'evaluation-criteria', label: 'Evaluation criteria' },
    { id: 'fee-structures', label: 'Fee structures in institutional lease-up' },
    { id: 'timeline-expectations', label: 'Timeline expectations' },
    { id: 'mandatory-deliverables', label: 'Mandatory deliverables from the partner' },
    { id: 'risk-mitigation', label: 'Risk mitigation clauses' },
    { id: 'movesmart-approach', label: 'The MoveSmart institutional approach' },
  ],
  sections: [
    {
      id: 'why-structured-rfps',
      heading: 'Why structured RFPs matter for lease-up',
      body: `An institutional lease-up is not a scaled-up version of a single-unit placement. The delivery schedule is the pro forma; absorption is the pro forma. A 250-unit purpose-built rental delivered into a market where the assumed absorption is 30 units per month but actual absorption delivers at 18 is not a 40% operational variance - it is a hole in the carry-cost column large enough to compress the first-year IRR by one to three points depending on the capital stack.

Selecting a leasing partner through the informal, relationship-driven channels that work for a single-asset landlord is the single most common source of that kind of slippage. Ad-hoc selection produces ad-hoc scoping. Ad-hoc scoping produces mismatched expectations on reporting cadence, onsite resourcing, campaign spend, tenant qualification standards, and escalation paths. By the time the mismatches surface - typically three to five months in - the absorption curve has already bent.

A structured RFP fixes this at the front end. Three things change when the partner selection runs through a written RFP:

1. **The scope is defined before the price.** Every submission is priced against the same unit count, the same delivery schedule, the same target absorption curve, and the same reporting standard. Comparisons are apples-to-apples.

2. **The capabilities are documented.** A leasing partner that claims onsite team deployment, CRM reporting, integrated campaign management, and underwriter-standard tenant qualification has committed to those capabilities in writing - and the engagement can reference that commitment.

3. **The escalation path is agreed in advance.** Lease-up performance will underperform the target in some months. The question is whether the response is in the contract or invented on the call. Structured RFPs answer the question up front.

Our research into the Canadian leasing market for 2026 consistently finds that the largest operators run structured RFPs for any delivery above 100 units - and that the leasing partners who respond most thoroughly to those RFPs are also the ones who deliver most consistently on absorption.`,
      callout: {
        label: 'A note on market white space',
        body:
          'Our competitive scan of Canadian leasing firms found that very few bridge the individual-owner market and the institutional market with a single documented process. A structured institutional RFP not only tightens the selection for your delivery - it also sorts out, quickly, which firms actually operate at institutional scale and which are scaled-up single-asset shops pitching a product they have not systematised.',
      },
    },
    {
      id: 'scope-definition',
      heading: 'Scope definition - the first section of the RFP',
      body: `The scope section defines the delivery for the leasing partner, in the same terms the partner will be held to in month six. Every number in this section should be accurate to your current pro forma - not aspirational - because the partner will be bidding against it.

**Delivery parameters to specify:**

- **Unit count** by bedroom tier (studios, one-bedroom, two-bedroom, three-bedroom, penthouse tier) and by specific unit type if the mix is relevant (corner units, balcony units, accessible units)
- **Delivery schedule** - phased occupancy is materially different from single-delivery occupancy; partners scope resourcing differently for each
- **Occupancy date(s)** including any construction-risk clauses you want the partner to price against
- **Target absorption curve** - typically expressed as "X% leased within Y months of first occupancy" (for example, 90% leased within 8 months for a 250-unit building is a common industry-standard benchmark for a well-located urban delivery)
- **Target rent range** by unit type - the pro forma rent; the partner will indicate in the response whether they can hit it or whether the market will require adjustments
- **Amenity program** and any amenities still in construction at soft launch (this affects the campaign narrative materially)
- **Parking and storage inventory** and whether they are bundled or priced separately
- **Tenant-mix preferences** if any (this is a legal exposure and must be framed in neutral terms - "family-oriented unit mix" rather than "no students," which is both discriminatory and counterproductive)

**Site parameters to specify:**

- Location and transit access
- Comparables in the immediate submarket (the five to ten nearest purpose-built rental buildings and their current asking rents and occupancy where known)
- Any soft-launch constraints - model suite status, amenity completion, construction staging
- Onsite leasing office availability - is there a dedicated space in the building, a nearby temporary, or a fully offsite operation?

The RFP respondent will use this section to size their resourcing, scope their campaign, and bid their fee. Vague scope produces wide-range bids; precise scope produces tight, comparable bids.`,
    },
    {
      id: 'required-capabilities',
      heading: 'Required capabilities to specify',
      body: `The capabilities section is where the RFP distinguishes operators from agents. Every respondent will claim most of these capabilities. The RFP should require documented evidence for each.

**Team deployment.** How many dedicated leasing agents will be assigned to the project at each stage (pre-launch, soft launch, grand opening, steady-state absorption)? What are their individual lease-up track records? Are they full-time on the project or shared with other engagements?

**Onsite leasing office.** Can the partner staff an onsite leasing office during weekday business hours, weekends, and extended hours during the grand-opening window? What is the model-suite operating plan? Who covers after-hours enquiries?

**Campaign integration.** What channels does the partner operate across - MLS, paid search, paid social (Meta, TikTok where relevant to the unit mix), organic social, rental listing portals (Realtor.ca, Zumper, Rentals.ca, Kijiji, Facebook Marketplace), local partnerships (relocation firms, corporate housing, brokers), and any referral network? Is the partner managing creative in-house or subcontracting?

**CRM and reporting infrastructure.** What CRM is used for applicant intake? What reporting frequency is standard (weekly is the institutional norm; anything less frequent is inadequate for a lease-up)? Can the client get dashboard access with real-time applicant pipeline visibility, or are reports periodic? What does a weekly report contain at minimum - leads generated, tours booked, tours completed, applications submitted, applications approved, leases signed, week-over-week and cumulative trends, channel attribution?

**Tenant qualification standard.** The lease-up qualification standard must match the underwriter's expectations for the asset - if the pro forma assumes an income-to-rent multiplier of 2.8x and a credit-score floor of 680, the leasing partner must be qualifying to that standard, not to a looser single-asset landlord standard. The RFP should require the partner to document their standard screening workflow.

**Move-in coordination at scale.** A single-unit placement ends at lease signature. An institutional lease-up has a move-in coordination layer - elevator bookings, condition inspections, key packages, orientation sessions - that must operate for potentially dozens of move-ins per week at peak. The RFP should ask how this is staffed and documented.

**Handoff to ongoing operations.** At the end of lease-up, the building transitions to stabilised operations. The handoff - applicant data, documented screening files, lease archives, tenant orientation materials, any ongoing renewal schedules - must be specified before the engagement begins.`,
    },
    {
      id: 'evaluation-criteria',
      heading: 'Evaluation criteria - how to score the responses',
      body: `Evaluation criteria should be weighted and transparent. Publishing the weightings inside the RFP produces more focused responses and reduces the post-submission debate.

**Past lease-up experience.** How many comparable buildings (unit count, urbanity, asset class) has the partner completed? What was the per-month absorption achieved? What were the final leased-up occupancies and rent premiums (or concessions) versus the original pro forma? Request specific building references with permission to contact the client.

**Documented screening process.** Request a written description of the partner's standard screening workflow, including the signals verified, the consent protocols, the fraud-detection approach, and the decision-documentation format. Firms that have published their screening process (on their website, in public guides, or in RFP materials) have scaled that process; firms that cannot produce a documented version on request have not.

**CRM and reporting infrastructure.** Request a sample weekly report from a prior lease-up (redacted as needed). The quality of the sample report is the single strongest leading indicator of the reporting quality during the engagement.

**Team quality.** Resumes of the specific individuals who would be assigned, with their individual lease-up track records. Avoid firms that pitch with senior leadership and staff the engagement with junior agents the client has never spoken to.

**Financial stability.** For a lease-up spanning 6 to 12 months, the partner's financial stability matters. A financial statement or summary, evidence of professional liability insurance, and references from other institutional clients are reasonable asks.

**Reference check methodology.** The RFP should reserve the right to contact prior clients directly and to ask open-ended questions about the engagement - not yes/no questions. "Walk me through how the absorption curve bent in month four and what the partner did about it" produces more signal than "were you satisfied with the service?"

A weighted scoring framework might run: past experience 25%, documented process 20%, team quality 20%, reporting infrastructure 15%, financial and commercial terms 15%, cultural and communication fit 5%. The exact weights vary by client and by asset.`,
    },
    {
      id: 'fee-structures',
      heading: 'Fee structures common in institutional lease-up',
      body: `Institutional lease-up engagements are rarely priced as simple single-unit placements. Four fee structures are common in the Canadian market, each with its own alignment profile.

**Per-placement success fee.** A per-lease fee, typically expressed as a percentage of first-year rent or as a flat per-unit amount. Simple and aligned - the partner only earns on completed placements - but can produce campaign-spend compression in weak months when the partner is reluctant to invest ahead of uncertain lease revenue.

**Blended engagement allowance plus per-placement.** A fixed monthly allowance (to cover dedicated team resourcing, onsite office costs, and committed marketing spend) plus a reduced per-placement success fee. Aligns the partner on sustained resourcing rather than month-to-month opportunism. Common structure for 200+ unit buildings where the resourcing commitment is meaningful.

**Tiered absorption bonuses.** A base fee (per-placement or blended) plus bonus payments triggered by hitting or exceeding absorption milestones (for example, a bonus if 60% leased by month 4, a larger bonus if 90% leased by month 8). Aligns the partner on pace rather than just count. Requires careful definition of what counts as "leased" - executed lease, move-in, first-month rent received, or occupancy certificate issued.

**Retainer plus success fee hybrid.** A monthly retainer that covers minimum resourcing, plus a per-placement success fee. Common where the engagement begins 60 to 90 days before first occupancy and the retainer covers pre-marketing work that precedes any leases.

**Principles to apply across any structure:**

- The structure should align the partner to the absorption curve, not just to lease count
- Marketing spend should be specified - either carried by the partner, passed through at cost, or managed against a disclosed budget - so the client is not surprised
- Concession authority should be specified - how much concession (one month free, reduced rent, waived parking) can the partner grant without client approval, versus what requires approval
- Exit and extension terms should be specified - what happens if absorption lags, what happens if delivery is delayed, what the handoff-to-stabilised-operations fee arrangement is

Avoid fee structures that pay the partner equally well for a six-month absorption and an eleven-month absorption. The structure should hurt both sides if the absorption curve bends.`,
    },
    {
      id: 'timeline-expectations',
      heading: 'Timeline expectations across the lease-up',
      body: `The lease-up timeline is not a single window. It is a sequence of phases, each with its own resourcing profile and success metric.

**Pre-marketing window - 60 to 90 days before first occupancy.** Campaign creative production, channel setup, landing page and virtual tour build, MLS setup, CRM configuration, interest-list capture from the building's existing marketing (if any), comparables pricing review, agent training on the specific building. Success metric: a qualified interest list large enough to produce soft-launch applicant volume.

**Soft launch - first occupancy through first 30 days.** Controlled applicant flow, model suite fully operational, onsite leasing office open during published hours, first condition inspections and move-ins executed, reporting cadence begins. Success metric: operational readiness and early-absorption velocity calibrated against the target curve.

**Grand opening - typically 30 to 60 days after first occupancy.** Full campaign activation, peak paid-media spend, extended onsite hours, broker and relocation partnerships activated, any building-warming events executed. Success metric: monthly absorption at or above the pro forma pace, typically the single highest-absorption month of the engagement.

**Steady-state absorption - months 3 through 8 or 9.** Sustained campaign spend, consistent weekly reporting, escalation protocols active on any month that underperforms target, concession authority exercised carefully (every concession granted is a concession the next applicant expects). Success metric: cumulative leased percentage tracking the pro forma curve within a documented variance band.

**Stabilisation - last 10-15% of units leased.** Typically the slowest absorption phase, often the units that are less desirable (specific floor plans, specific exposures). Campaign focus narrows; targeted broker outreach and referral incentives frequently play a larger role. Success metric: achieving the stabilised occupancy target within the planned window without excessive rent erosion.

**Handoff to stabilised operations.** Documented transfer of tenant files, renewal schedules, vendor contacts, and any ongoing campaign assets to the property management team.

Lease-up windows commonly run 6 to 9 months for well-located urban deliveries in the 150-to-300-unit range; larger buildings, less-established submarkets, and less-differentiated products run longer. Industry-standard benchmarks are a starting point, not a commitment - the leasing partner should be willing to discuss how your specific delivery compares.`,
    },
    {
      id: 'mandatory-deliverables',
      heading: 'Mandatory deliverables from the partner',
      body: `The RFP should specify the deliverables that are non-negotiable, independent of how the partner organises their internal workflow. This protects the client from a partner who performs well operationally but under-delivers on communication.

**Weekly reports.** Standard format, submitted the same day each week, covering: leads generated by channel, tours booked and completed, applications received and processed, leases signed, move-ins executed, week-over-week changes, cumulative-versus-target absorption, and any material variance notes. A report that consistently arrives late or in changing formats is a signal about the rest of the engagement.

**Dashboard access.** Real-time visibility into the applicant pipeline, not just periodic reports. The client should be able to see - without asking - how many applicants are in which stage and what the week's conversion rates look like. Firms that claim modern CRM capabilities can provide this; firms that cannot are running on spreadsheets behind the scenes.

**Escalation SLAs.** Response times for urgent client queries (typically same business day for standard queries, same-hour for material issues like a building operations problem or a media query). A named senior contact at the partner for escalations beyond the leasing team lead.

**Post-lease-up handoff package.** The deliverable that closes the engagement. A documented handoff that includes tenant file archive, signed lease archive, screening decision documentation on every unit, outstanding applicant pipeline for renewal-stage leads, vendor contacts established during the lease-up, and any campaign assets transferred to the management team. A partner who cannot specify this in the RFP is a partner who will assemble it in the final two weeks of the engagement, badly.

**Documented screening files.** Every approved applicant's screening file retained to a standard that supports an LTB matter, a mortgage refinancing due-diligence request, or a transaction-stage buyer review. The file retention standard should be specified in the engagement letter - at minimum the full tenancy term plus seven years.`,
    },
    {
      id: 'risk-mitigation',
      heading: 'Risk mitigation - what happens if the curve bends',
      body: `Every lease-up underperforms its target curve in some month. A mature RFP anticipates the scenarios and specifies the response.

**Absorption underperforms target by more than the variance band.** The RFP should specify the variance band (often 10% to 15% below target cumulative absorption) beyond which a formal review is triggered. The review should cover: market conditions versus original assumptions, campaign performance versus plan, tenant qualification standard versus market pool, and pricing versus current comparables. The review output is either a revised plan (campaign spend increase, pricing adjustment, concession program, target extension) or a formal performance remediation.

**Delivery delays.** Construction schedules slip. The RFP should specify how a delivery delay affects the engagement fee (partial retainer during delay, campaign pause protocols, resource-reassignment options) and how the re-launch sequence is staged when the new occupancy date is confirmed.

**Scope extensions.** A lease-up that extends beyond its target window costs the partner more to deliver. The RFP should specify how extensions are priced - continuation of the fee structure at standard rates, transition to a reduced-intensity retainer, or a negotiated extension with a capped window.

**Performance review gates.** A monthly or quarterly performance review gate with the partner's senior leadership present (not just the leasing team lead). Gates should be formal, minuted, and tied to the evaluation criteria from the RFP - the partner is being held to the same standards they bid against.

**Termination provisions.** Under what circumstances can either party exit, on what notice, and with what transition obligations? Termination should not be the first lever pulled, but it should be the final backstop for material breach.

Risk mitigation is the section of the RFP that distinguishes institutional-grade partners from ones pitching at the edge of their capability. A partner who engages substantively with this section - proposes specific variance bands, specific review gates, specific escalation protocols - is a partner who has been through a lease-up that bent and is not afraid to discuss it. Firms that give light, generic responses to risk-mitigation questions have either not been through a difficult lease-up or prefer not to discuss the ones they have.`,
    },
    {
      id: 'movesmart-approach',
      heading: 'The MoveSmart institutional approach',
      body: `MoveSmart's institutional lease-up practice is built on one observation we kept encountering when we scanned the Canadian leasing market: very few firms bridge the individual-owner and institutional segments with a single documented process. Most institutional firms treat the single-owner market as too small to scope formally; most single-owner brokerages scale informally into institutional work that exposes their lack of process when a delivery stretches past 100 units.

We operate differently. The same documented screening workflow we publish on [Tenant Screening](/services/tenant-screening/) is the screening workflow we run on an institutional lease-up file. The same pricing discipline we describe on [Rental Preparation](/services/rental-preparation/) informs our pricing analysis on a 250-unit building. The same portal infrastructure we provide on [Portal & Technology](/services/portal-and-technology/) for a single-owner engagement is the CRM and reporting layer we run on a lease-up.

What changes for institutional work is the resourcing shape, not the process. A dedicated leasing team staffed against the delivery schedule, a weekly reporting cadence surfaced through a client-accessible dashboard, campaign spend integrated against a disclosed budget, absorption-tied fee structures, and formal performance review gates - these are the institutional-scale elements layered over the same documented foundation.

The [Institutional Lease-Up service](/services/institutional-lease-up/) page details our specific scope, team structure, and engagement options. We respond to structured RFPs in the format described in this guide, and we are willing to publish our responses (redacted) as references for clients considering an engagement. One firm, two audiences, one documented process - that is the positioning, and the structured RFP is the format that proves it.`,
    },
  ],
  faqItems: [
    {
      question: 'How large does a delivery need to be to justify a structured RFP?',
      answer:
        'Our recommendation is any delivery of 100 units or more, and any engagement expected to run longer than 90 days. Below that threshold, a structured engagement letter with clearly specified capabilities, reporting, and fees is usually adequate. Above that threshold, the consequence of an ad-hoc selection - mismatched expectations on reporting, resourcing, or tenant qualification surfacing three to five months into a 6-to-9-month engagement - outweighs the modest time cost of running a structured RFP upfront.',
    },
    {
      question: 'What absorption pace should I expect for a purpose-built rental lease-up in Canada?',
      answer:
        'Industry-standard benchmarks for a well-located urban delivery in the 150-to-300-unit range typically run 6 to 9 months to stabilised occupancy. That is a starting point, not a commitment - actual pace varies materially with submarket, unit mix, rent positioning relative to comparables, amenity completion status at soft launch, and the campaign intensity the engagement supports. A leasing partner responding to a structured RFP should be willing to discuss how your specific delivery compares to the benchmark and where they see the realistic absorption curve landing.',
    },
    {
      question: 'What should a weekly lease-up report contain?',
      answer:
        'At minimum: leads generated by channel, tours booked and tours completed, applications received and applications approved, leases signed, move-ins executed, week-over-week changes, and cumulative-versus-target absorption. More mature reports add channel attribution (cost per lead, cost per application, cost per lease by channel), concession tracking, rent-versus-pro-forma variance, and any material notes on market conditions or operational issues. The report should arrive the same day each week in the same format - inconsistent reporting format is a leading indicator of inconsistent operations behind the reports.',
    },
    {
      question: 'Which fee structure is best for institutional lease-up?',
      answer:
        'It depends on the engagement shape. For deliveries under 150 units with a predictable absorption curve, a per-placement success fee is often simplest and well-aligned. For deliveries of 200 units or more with meaningful dedicated-team commitments, a blended engagement allowance plus reduced per-placement success fee aligns the partner better on sustained resourcing. Tiered absorption bonuses work well when the pro forma is sensitive to absorption pace rather than just count. The key principle across any structure: the partner\'s economics should move with the absorption curve, not run independently of it.',
    },
    {
      question: 'How should I evaluate a leasing partner\'s past lease-up experience?',
      answer:
        'Three questions on each prior engagement: what was the unit count and asset class, what was the achieved per-month absorption versus the original pro forma, and what happened in any month where absorption underperformed target. Ask for specific building references with permission to contact the client. Contact at least two references with open-ended questions - "walk me through how the absorption curve bent in month four and what the partner did about it" produces more signal than a yes/no satisfaction score. A partner who can discuss a difficult lease-up candidly and specifically is a partner who has been through one; a partner whose references all describe effortless engagements has either not been through a difficult one or has coached the references.',
    },
    {
      question: 'What happens if delivery is delayed and the leasing partner is already engaged?',
      answer:
        'This should be specified in the engagement letter before any work begins. Typical provisions include: a reduced retainer during the delay period to hold key team members and maintain campaign infrastructure; protocols for pausing and restarting the applicant pipeline (applicants in flight at the delay point are the most perishable asset in the engagement); and a documented re-launch sequence when the revised occupancy date is confirmed. A leasing partner whose engagement letter is silent on delivery-delay scenarios is a partner who will be renegotiating terms during the delay rather than executing agreed provisions.',
    },
    {
      question: 'Does MoveSmart respond to institutional RFPs?',
      answer:
        'Yes, and we recommend the structured RFP format this guide describes. Our institutional practice operates on the same documented process as our single-owner engagements - the resourcing shape changes, the process does not. We can supply redacted prior responses, prior weekly report samples, and specific references on request. The downloadable RFP template linked from this guide is the format we respond to most efficiently; clients using a different internal template are welcome to share it and we will map our response to their structure.',
    },
  ],
  relatedGuides: [
    'tenant-screening-ontario',
    'how-to-price-your-rental',
    'rent-guarantee-101',
  ],
  relatedServices: [
    'institutional-lease-up',
    'tenant-screening',
    'leasing-services',
    'portal-and-technology',
    'rental-preparation',
  ],
  downloadOffer: {
    label: 'The Institutional Lease-Up RFP Template',
    description:
      'A structured RFP template for builders, developers, and PMCs selecting a leasing partner - scope definition, required capabilities, evaluation criteria, fee-structure framework, and risk-mitigation clauses, ready to adapt to your delivery.',
    ctaLabel: 'Request the RFP template',
    ctaHref: '/contact/?type=institutional&intent=rfp-template',
  },
}

export default INSTITUTIONAL_RFP_TEMPLATE
