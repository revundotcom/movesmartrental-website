import type { CityServiceContent, CityDescription } from './batch-1'

export const cityDescriptions: CityDescription[] = [
  {
    citySlug: 'waterloo',
    descriptionParagraphs: [
      "Waterloo is Ontario's most educationally dense rental market — the University of Waterloo (40,000 undergrad + 7,000 graduate students) and Wilfrid Laurier University (19,000 enrolled) sit within a 10-minute walk of each other along the University Ave and Lester Street corridor, creating a permanent undersupply of off-campus housing that would be straightforward to manage if not for UW's co-op program. Co-op rotation sends thousands of UW students to work placements across Canada and the United States every four months, creating vacancy cycles that no other Canadian city replicates. Average 1BR rents sit at $1,923/month as of June 2025 — approximately $140/month above neighbouring Kitchener despite a YoY decline of 1.8% driven by the federal international student permit cap.",
      "The competitive landscape shifted materially in 2024–2025. Purpose-built student housing towers — IQON, The Forge, and The Hub — added thousands of fully furnished beds with building amenities (gyms, study rooms, rooftop terraces, concierge) directly competing with individual landlords' houses and older low-rises near campus. These PBSA towers can sign leases by September for the following year and offer international students the certainty of a licensed, professionally managed building. Individual landlords who don't differentiate on service quality, co-op lease flexibility, or price are losing the best tenants to institutional operators. Per-room rents in shared student houses range $625–$900/room depending on proximity to UW or WLU and the September signing window.",
      "The regulatory calendar is shifting. Waterloo's Rental Housing Licensing Bylaw, approved June 23, 2025 and effective July 1, 2026, expands licensing requirements to ALL rental housing operators — not just student landlords — with enhanced inspection standards. Short-term rental operators already face January 2025 requirements including a municipal licence, principal residence restriction, annual gas and heating inspection, and criminal record check every five years. On the economic side, Sun Life Financial, Perimeter Institute for Theoretical Physics, BlackBerry QNX, and the broader Communitech-anchored tech cluster employ thousands of young professionals in Waterloo who represent the most stable non-student tenant demographic. The ION LRT connects University Ave and Waterloo Public Square stations through Uptown Waterloo south to Downtown Kitchener, providing a transit spine that landlords can use to market units to tech workers commuting between the two cities.",
    ],
    transitInfo: 'ION LRT: University Ave / Waterloo Public Square stations (Waterloo end) → Uptown Waterloo → Downtown Kitchener (22 stations total). GRT bus routes across campus corridors, University Ave, Columbia St, and Erb St. GO Bus Route 25 Waterloo–Toronto (~2 hrs). Hwy 85 / Conestoga Pkwy for regional car access.',
    neighbourhoods: ['University Ave / Lester St Corridor', 'Uptown Waterloo', 'Laurel Creek / Westmount', 'Columbia Hills / Beechwood', 'Westvale', 'Vista Hills'],
  },
]

export const cityServiceContent: CityServiceContent[] = [
  // ============================================================
  // WATERLOO × 8 SERVICES
  // ============================================================

  // 1. TENANT PLACEMENT
  {
    citySlug: 'waterloo',
    serviceSlug: 'tenant-placement',
    heroHeadline: 'Fill Your Waterloo Rental Before Christmas — Not After Reading Week',
    heroSubheadline: "Waterloo's leasing peak runs December through March for September occupancy. Landlords who wait until spring are competing for the tenants PBSA towers already declined.",
    localBodyParagraphs: [
      "Waterloo's leasing cycle is inverted relative to every other Ontario market. UW and WLU students begin signing September leases in December, with the best off-campus houses fully committed by late January. A landlord who lists in April is competing for whoever IQON, The Hub, and The Forge have already turned down — typically applicants with affordability constraints or incomplete application packages. The only way to access the top-tier student and young professional pool is to list actively by December 1 and be ready to accept applications by the first week of January.",
      "The University Ave and Lester Street corridor commands the highest per-room rents in the city ($750–$900/room for 4-bed houses) and attracts the most competitive applicant pool — UW engineering, math, and co-op-enrolled students backed by family guarantors with Ontario income. Laurel Creek and Westmount attract WLU students and Conestoga College Waterloo campus students who prioritize LRT access and proximity to Uptown. Columbia Hills and Beechwood attract second-year and upper-year students plus young tech professionals who want larger 2BR and 3BR units away from the density of the campus corridor.",
      "PBSA tower competition is the defining pressure on individual Waterloo landlords. The Forge, IQON, and The Hub offer fully furnished suites, in-building gyms, study rooms, rooftop patios, and 24-hour staff — all marketed directly to international students months before individual landlords list. To compete effectively, individual landlords must differentiate: early listing (December), professional photography, transparent co-op sublet policies, responsive management, and unit condition that justifies the comparison. MoveSmart's Waterloo placement process is built around the December–January signing window and co-op lease structuring that PBSA towers cannot offer.",
    ],
    painPoints: [
      {
        problem: "Waterloo landlords who list in March or April for September occupancy miss the December–January peak signing window and are left with whoever the PBSA towers and faster-acting landlords have already passed on.",
        solution: "MoveSmart activates Waterloo listings by December 1, targeting the UW and WLU applicant pool during the primary signing window — when the best-qualified tenants are actively choosing.",
      },
      {
        problem: "UW co-op means the student who signs a 12-month lease in January may be away on work placement in Calgary or San Francisco from May to August — leaving the unit functionally vacant or triggering informal subletting that violates standard lease terms.",
        solution: "MoveSmart structures co-op-aware leases with lawful sublet provisions and approved-subtenant screening processes, so co-op departures don't create unauthorized occupancy or summer vacancy.",
      },
      {
        problem: "PBSA towers (IQON, The Forge, The Hub) are aggressively marketed to international students months before individual landlords list, capturing the best-funded applicants before off-campus options are even visible.",
        solution: "Early listing combined with professional photography, transparent co-op policies, and competitive unit condition closes the gap with PBSA towers — giving qualified tenants a real reason to choose an individual landlord.",
      },
    ],
    benefits: [
      {
        title: 'December Listing Launch',
        description: "Waterloo's leasing cycle peaks December–March. MoveSmart launches listings by December 1 to compete for the top applicant pool before PBSA towers absorb it.",
        icon: 'calendar',
      },
      {
        title: 'Co-op Lease Structuring',
        description: 'Standard leases fail Waterloo landlords. MoveSmart structures co-op-aware agreements with legal sublet provisions for 4-month work-term departures.',
        icon: 'document',
      },
      {
        title: 'Per-Room and Whole-Unit Pricing',
        description: 'Accurate pricing for both whole-unit and per-room leasing strategies across University Ave, Uptown, and Columbia Hills corridors.',
        icon: 'chart',
      },
      {
        title: 'PBSA-Competitive Marketing',
        description: 'Professional photography and listings on all major platforms, positioned to attract tenants comparing individual units against IQON, The Forge, and The Hub.',
        icon: 'star',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Market Analysis and Unit Positioning',
        description: 'Waterloo-specific pricing against University Ave, Uptown, and Columbia Hills comparables — per-room and whole-unit rates benchmarked against current competition including PBSA towers.',
      },
      {
        stepNumber: 2,
        title: 'December Listing Launch',
        description: 'Professional photography and multi-platform listing live by December 1, targeting UW and WLU students during the primary January signing window.',
      },
      {
        stepNumber: 3,
        title: 'Co-op Lease Preparation',
        description: 'Lease terms structured to accommodate UW co-op rotations legally — sublet provisions, approved-subtenant process, and co-op calendar built into the agreement.',
      },
      {
        stepNumber: 4,
        title: 'Screening and Placement',
        description: 'Credit, employment, guarantor, and reference verification for every applicant — distinguishing between verified co-op income, family guarantors, and applicants without adequate support.',
      },
    ],
    testimonial: {
      name: 'Patricia Ng',
      city: 'Waterloo',
      quote: "Had all four rooms in our University Ave house signed by January for September move-in — while every other landlord on our street was still deciding whether to list. MoveSmart launched us December 3 and we were done before Christmas break.",
      outcome: 'All 4 rooms signed by January; no spring competition with PBSA towers',
    },
    faq: [
      {
        question: 'When should I list my Waterloo rental for September occupancy?',
        answer: "By December 1. Waterloo's leasing cycle peaks December through March for September move-in — driven by UW and WLU students who plan 8–9 months ahead. Landlords who wait until April are competing for the applicants that PBSA towers and faster-acting landlords have already declined.",
      },
      {
        question: 'How does the UW co-op program affect my lease?',
        answer: "UW co-op sends students to work placements across Canada and the US every four months (January–April, May–August, September–December cycles). A tenant who signs a 12-month lease may leave for a 4-month work term, creating pressure to sublet informally. MoveSmart structures lawful sublet provisions into Waterloo leases so co-op departures don't create unauthorized occupancy or abandoned units.",
      },
      {
        question: 'Can I compete with IQON, The Forge, and The Hub for good tenants?',
        answer: "Yes — but only if you list early, present professionally, and offer what PBSA towers cannot: direct landlord responsiveness, flexible co-op sublet terms, and competitive per-room pricing in a house format. PBSA towers are marketed to international students. Early-listing individual landlords capture a different but equally strong applicant pool: domestic students with family guarantors and UW co-op-enrolled tenants with verified employment income.",
      },
    ],
  },

  // 2. PROPERTY MANAGEMENT
  {
    citySlug: 'waterloo',
    serviceSlug: 'property-management',
    heroHeadline: 'Waterloo Property Management Built Around the Co-op Calendar',
    heroSubheadline: "Managing a Waterloo rental isn't a 12-month steady state — it's four 4-month cycles, a July 2026 bylaw overhaul, and a PBSA tower on every competing block.",
    localBodyParagraphs: [
      "Waterloo property management requires a fundamentally different operating model than any other Ontario city. The UW co-op program creates up to three tenant turnover moments per year in student-heavy properties — not one. A standard Toronto-style 12-month management approach breaks down at the first co-op departure in May when the tenant's replacement subletter hasn't been screened, the lease hasn't been updated, and the property manager receives a phone call from a landlord who didn't know this was coming. Co-op calendar management — scheduling inspections, updating sublet approvals, and re-listing co-op vacancies on the right timeline — is a Waterloo-specific operational skill.",
      "The Rental Housing Licensing Bylaw overhaul effective July 1, 2026 extends licensing requirements to all Waterloo rental housing operators, not just the student house category previously targeted. Enhanced inspection standards, new documentation requirements, and compliance timelines will catch unprepared landlords in their first renewal cycle. Properties managed by MoveSmart are being reviewed against the new bylaw standards now — 18 months before enforcement begins — so July 2026 does not create surprise compliance costs.",
      "Beyond co-op and regulatory complexity, Waterloo's competitive landscape means tenant retention is an active strategy, not a passive outcome. PBSA towers actively market to renewal-eligible UW students offering new amenities and one-click renewal. Individual landlords who don't proactively communicate, respond to maintenance requests within 24 hours, and benchmark their rent at renewal against current market rates lose tenants they've already paid to find and onboard. MoveSmart's Waterloo property management tracks every co-op departure cycle, maintenance SLA, and renewal window to keep units occupied and tenants committed.",
    ],
    painPoints: [
      {
        problem: "UW co-op creates 4-month departure cycles that standard 12-month management models ignore — the result is unauthorized subletting, unscreened replacements, and landlords discovering strangers in their units.",
        solution: "MoveSmart tracks every co-op tenant's work term schedule, coordinates lawful sublet approvals with screened replacement occupants, and maintains unit security through each departure cycle.",
      },
      {
        problem: "The July 1, 2026 Rental Housing Licensing Bylaw overhaul applies to ALL Waterloo rental operators — landlords who haven't reviewed their current unit condition against new inspection standards face compliance costs and potential licence denial at first application.",
        solution: "MoveSmart begins bylaw compliance review 18 months before the July 2026 effective date, identifying required upgrades now rather than under enforcement pressure.",
      },
      {
        problem: "PBSA towers market directly to UW and WLU students at renewal time with new amenities and streamlined re-signing — individual landlords who don't proactively re-engage tenants at the 8-month mark lose occupied units they paid to fill.",
        solution: "MoveSmart initiates renewal conversations at month 8, benchmarks current rent against the Waterloo market, and identifies minor improvements that keep tenants from comparing PBSA alternatives.",
      },
    ],
    benefits: [
      {
        title: 'Co-op Calendar Management',
        description: 'Every UW co-op departure cycle tracked and coordinated — sublet approvals, replacement screening, and re-listing on the correct Waterloo timeline.',
        icon: 'calendar',
      },
      {
        title: 'July 2026 Bylaw Compliance',
        description: "Waterloo's new Rental Housing Licensing Bylaw requirements reviewed and addressed 18 months before enforcement — no surprise costs at first application.",
        icon: 'document',
      },
      {
        title: '24-Hour Maintenance Response',
        description: 'UW and WLU tenants compare landlord responsiveness directly against PBSA towers. 24-hour response SLA retains tenants who would otherwise choose institutional management.',
        icon: 'tool',
      },
      {
        title: 'Proactive Renewal Management',
        description: 'Renewal outreach at month 8 with market benchmarking — preventing PBSA poaching of occupied, paying tenants.',
        icon: 'star',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Co-op Calendar Intake',
        description: "At lease signing, MoveSmart records every tenant's co-op rotation schedule, setting calendar alerts for work-term departures and sublet coordination windows.",
      },
      {
        stepNumber: 2,
        title: 'Bylaw Compliance Review',
        description: "Property inspected against Waterloo's July 2026 Rental Housing Licensing Bylaw standards — gaps identified and remediation planned.",
      },
      {
        stepNumber: 3,
        title: 'Ongoing Operations',
        description: '24-hour maintenance response, monthly financial reporting, co-op sublet approvals, and PBSA-competitive tenant communication throughout each lease term.',
      },
      {
        stepNumber: 4,
        title: 'Renewal and Re-tenanting',
        description: 'Month-8 renewal benchmarking and outreach; if tenant vacates, December-ready re-listing for the following September cycle.',
      },
    ],
    testimonial: {
      name: 'David Korkmaz',
      city: 'Waterloo',
      quote: "MoveSmart restructured our lease to allow co-op sublets legally. Three years in, we've had zero unauthorized occupants and zero summer vacancies — something we never managed when we self-managed.",
      outcome: 'Zero unauthorized sublets; zero summer vacancies across three co-op cycles',
    },
    faq: [
      {
        question: 'What does co-op calendar management actually involve?',
        answer: "At lease signing, MoveSmart records every UW co-op tenant's work-term schedule. When a co-op departure approaches, we coordinate a lawful sublet process: advertising to the UW subletting network, screening the replacement occupant, updating occupancy documentation, and conducting a check-in inspection. The same process repeats every 4 months for each co-op tenant.",
      },
      {
        question: 'What changes under the July 2026 Rental Housing Licensing Bylaw?',
        answer: "The bylaw, approved June 23, 2025 and effective July 1, 2026, expands Waterloo's rental licensing requirement to all rental housing operators — not just student landlords. It introduces enhanced inspection standards, new documentation requirements, and annual compliance obligations. Properties managed by MoveSmart are reviewed against the new standards beginning in early 2025 so that no compliance gaps exist at the first application deadline.",
      },
      {
        question: 'How does management differ for student houses vs. professional units in Waterloo?',
        answer: "Student houses near UW and WLU require co-op departure coordination, per-room leasing, and December–January leasing cycles. Professional units in Uptown Waterloo, Columbia Hills, and Laurel Creek follow a more standard 12-month leasing model but still require July 2026 bylaw compliance preparation and ION LRT-aware marketing to Communitech and Sun Life employees. MoveSmart applies the appropriate operational model for each property type.",
      },
    ],
  },

  // 3. RENT COLLECTION
  {
    citySlug: 'waterloo',
    serviceSlug: 'rent-collection',
    heroHeadline: 'Rent Collection in Waterloo — Student Accounts, Co-op Sublets, and LTB Compliance',
    heroSubheadline: "Waterloo's mixed tenant base of students, guarantors, and young professionals requires a rent collection system that handles family payments, co-op sublet billing, and N4 escalation correctly.",
    localBodyParagraphs: [
      "Rent collection in Waterloo is structurally more complex than in purely professional rental markets. Student tenants often have rent paid by parents or family guarantors — not by the tenant directly — creating three-way payment chains where the bank account, the guarantor, and the lease are held by different people. When a payment fails, the failure may originate with a parent's account in a different province or country, an NSF from a guarantor who is themselves under financial pressure, or a co-op sublet occupant who assumed rent was included in their sublet arrangement. Each scenario requires a different resolution approach.",
      "Waterloo's LTB filing landscape is shaped by WLU and UW student tenants who are often legally sophisticated (or have access to UW's student legal services), making proper N4 notice documentation more important than in many other markets. A January non-payment event is particularly high-stakes: if the N4 is filed incorrectly and the application dismissed, the replacement tenant for September must be found in the summer market — the worst re-leasing window Waterloo offers, when co-op students have left and the next cohort hasn't started their search.",
      "For co-op sublet periods, rent collection requires maintaining the original tenant's legal responsibility while coordinating actual payment from the sublet occupant. MoveSmart manages this through structured sublet agreements that clarify payment obligation: the original tenant remains responsible for rent under the RTA, while the sublet arrangement is documented as a separate obligation between the primary tenant and their subtenant. This structure protects the landlord from payment ambiguity during every 4-month co-op window.",
    ],
    painPoints: [
      {
        problem: "Student tenant rent is often paid by family guarantors outside Ontario — when payments fail, Waterloo landlords don't know whether to pursue the tenant, the guarantor, or both, and delay costs them a month.",
        solution: "MoveSmart's guarantor lease structure clearly defines the payment chain, with automated arrears notifications triggering simultaneously to both tenant and guarantor — no ambiguity about who is responsible.",
      },
      {
        problem: "Incorrect N4 notices for Waterloo student tenants are challenged through UW student legal services, dismissed at the LTB, and reset the clock — leaving landlords without payment and unable to re-list for September.",
        solution: "MoveSmart files N4 notices that meet LTB technical requirements on first submission — correct rent amount, correct service method, correct void period — eliminating procedural challenges from legally-aware student tenants.",
      },
      {
        problem: "Co-op sublet periods create rent payment ambiguity: the sublet occupant may believe rent is part of their sublet fee, the original tenant believes the subtenant is paying, and the landlord receives nothing.",
        solution: "Structured sublet agreements specify that the primary tenant remains legally responsible for rent under the RTA, with payment logistics between primary and subtenant handled separately — protecting the landlord from co-op payment breakdowns.",
      },
    ],
    benefits: [
      {
        title: 'Guarantor Payment Integration',
        description: 'Automated payment systems accept guarantor payments from outside Ontario with simultaneous arrears notification to both tenant and guarantor.',
        icon: 'users',
      },
      {
        title: 'LTB-Compliant N4 Process',
        description: 'Technically correct N4 notices on first filing — protecting against procedural challenges from UW student legal services.',
        icon: 'document',
      },
      {
        title: 'Co-op Sublet Rent Clarity',
        description: 'Sublet agreements that maintain primary tenant rent responsibility while documenting subtenant payment arrangements — no ambiguity during 4-month co-op windows.',
        icon: 'calendar',
      },
      {
        title: 'Digital Payment Tracking',
        description: 'Monthly landlord statements showing payment status per tenant, per room, and per co-op period — complete visibility across complex multi-tenant Waterloo properties.',
        icon: 'chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Payment Chain Documentation',
        description: 'At lease signing, MoveSmart records the payment method and responsible party for each tenant — direct, guarantor, or co-op sublet arrangement.',
      },
      {
        stepNumber: 2,
        title: 'Automated Collection and Monitoring',
        description: 'Digital rent collection with automated payment date reminders sent to tenant and guarantor; real-time arrears monitoring across all units.',
      },
      {
        stepNumber: 3,
        title: 'Arrears Escalation',
        description: "If payment fails, MoveSmart contacts both tenant and guarantor within 24 hours. If unresolved by the void period, N4 notice is filed — technically correct and LTB-ready on first submission.",
      },
      {
        stepNumber: 4,
        title: 'Monthly Reporting',
        description: 'Landlord receives a monthly payment report per unit, per room, and per co-op period — full visibility into Waterloo property cash flow.',
      },
    ],
    testimonial: {
      name: 'Grace Abara',
      city: 'Waterloo',
      quote: "When a WLU student stopped paying in March, MoveSmart's N4 process was textbook — correct notice, correct amount, correct service date. Resolved in 3 weeks without a tribunal hearing. I didn't lose the September re-leasing window.",
      outcome: 'Non-payment resolved in 3 weeks; September leasing window preserved',
    },
    faq: [
      {
        question: 'Can I collect rent from a guarantor who lives outside Ontario?',
        answer: "Yes — MoveSmart's guarantor lease structure and digital payment systems accept payments from guarantors anywhere in Canada. When arrears occur, notifications go simultaneously to the tenant and guarantor. Legal enforceability of guarantor obligations under Ontario law is documented in the lease addendum.",
      },
      {
        question: 'What happens to rent collection when a UW student is on co-op?',
        answer: "The primary tenant remains legally responsible for rent under the RTA regardless of co-op departure. MoveSmart's sublet agreements clarify that any payment arrangement between the primary tenant and their co-op subtenant is separate from the landlord's rental relationship. The landlord collects from the primary tenant or their guarantor — not from the sublet occupant directly.",
      },
      {
        question: 'How quickly does MoveSmart escalate to an N4 if a Waterloo tenant misses rent?',
        answer: "Contact is made within 24 hours of a missed payment. If unresolved, the N4 is filed at the earliest eligible date under the RTA. For Waterloo student tenants who have access to legal resources, technical accuracy of the N4 is critical — MoveSmart files notices that meet all LTB requirements on first submission, preventing the dismissals and delays that reset the clock toward the September re-leasing deadline.",
      },
    ],
  },

  // 4. MAINTENANCE & REPAIR
  {
    citySlug: 'waterloo',
    serviceSlug: 'maintenance-repair',
    heroHeadline: 'Waterloo Maintenance — 24-Hour Response Because PBSA Towers Never Sleep',
    heroSubheadline: "UW and WLU tenants are comparing your unit against IQON and The Forge at renewal. Slow maintenance response is the most common reason qualified Waterloo tenants don't renew.",
    localBodyParagraphs: [
      "Waterloo's maintenance environment is defined by a specific competitive pressure that doesn't exist elsewhere in Ontario: PBSA towers offer 24/7 on-site staff, in-building repair teams, and digital maintenance request portals with tracked response times. Individual landlords whose tenants wait 48 hours for a response to a January heating failure aren't just dealing with a dissatisfied tenant — they're dealing with a tenant who is actively comparing their experience against what they could have had at The Forge or IQON two blocks away. Maintenance speed in Waterloo is directly connected to renewal probability.",
      "The University Ave and Lester Street student house corridor contains some of Waterloo's oldest rental stock — converted single-family homes from the 1950s and 1960s with aging electrical panels, plumbing stacks shared across multi-unit configurations, and heating systems that were not designed for the demands of 4–6 occupants. Preventive maintenance — annual furnace service, plumbing inspection before winter, electrical panel review — prevents the emergency situations that damage landlord-tenant relationships and trigger LTB maintenance applications. A heating failure in January that takes three days to resolve is a breach of the Residential Tenancies Act, not just a service inconvenience.",
      "The July 2026 Rental Housing Licensing Bylaw enhanced inspection standards make proactive maintenance documentation as important as the maintenance itself. Waterloo's new bylaw requires landlords to demonstrate ongoing compliance with property standards through inspection records. Properties with documented annual maintenance histories are licence-ready at first application; properties with undocumented deferred maintenance face remediation orders that require emergency repairs under enforcement deadline pressure — the most expensive maintenance scenario possible.",
    ],
    painPoints: [
      {
        problem: "UW and WLU tenants compare landlord maintenance response times against PBSA tower standards at renewal. A 48-72 hour response to a January heating issue is a common trigger for non-renewal in favour of purpose-built student housing.",
        solution: "MoveSmart's Waterloo maintenance network delivers 24-hour response for urgent requests — heating, plumbing, electrical — with a tracked SLA that individual landlords cannot match without professional management.",
      },
      {
        problem: "The University Ave and Lester Street corridor's older housing stock (1950s–1960s) accumulates deferred maintenance that creates emergency failures during peak occupancy — furnace breakdowns in January, plumbing failures during September move-in.",
        solution: "MoveSmart's preventive maintenance schedule includes annual furnace service before November, plumbing inspection in September, and electrical panel review every 36 months — preventing the failures that damage tenancies.",
      },
      {
        problem: "Waterloo's July 2026 bylaw requires documented maintenance records for licence compliance — landlords with no maintenance history face remediation orders and emergency repair costs under enforcement pressure.",
        solution: "All maintenance requests, completions, and inspection records are logged in MoveSmart's system — creating the documented compliance history required for July 2026 licence applications.",
      },
    ],
    benefits: [
      {
        title: '24-Hour Urgent Response',
        description: 'Heating, plumbing, and electrical emergencies responded to within 24 hours — matching the PBSA standard that Waterloo tenants use as their benchmark.',
        icon: 'tool',
      },
      {
        title: 'Preventive Maintenance Scheduling',
        description: 'Annual furnace, plumbing, and electrical servicing before peak occupancy seasons — preventing the January emergencies that end tenancies.',
        icon: 'calendar',
      },
      {
        title: 'Bylaw Compliance Documentation',
        description: "All maintenance and inspection records maintained in MoveSmart's system — ready for Waterloo's July 2026 Rental Housing Licensing Bylaw application.",
        icon: 'document',
      },
      {
        title: 'Older Stock Expertise',
        description: 'Specialized knowledge of University Ave corridor converted housing — aging electrical, shared plumbing stacks, and non-standard HVAC configurations.',
        icon: 'star',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Initial Property Assessment',
        description: 'Full inspection of heating, plumbing, electrical, and structural systems — identifying deferred maintenance before the first winter occupancy.',
      },
      {
        stepNumber: 2,
        title: 'Preventive Maintenance Schedule',
        description: 'Annual service schedule created for each property — furnace service by October, plumbing inspection by September, electrical review on a 36-month cycle.',
      },
      {
        stepNumber: 3,
        title: 'Tenant Request Management',
        description: "Digital maintenance request portal for tenants; 24-hour response for urgent issues, 72-hour response for non-urgent — all tracked and logged for bylaw compliance.",
      },
      {
        stepNumber: 4,
        title: 'Documentation and Reporting',
        description: "Every maintenance event — request date, response date, completion date, contractor, cost — logged permanently in MoveSmart's system for July 2026 bylaw compliance records.",
      },
    ],
    testimonial: {
      name: 'Robert Thiessen',
      city: 'Waterloo',
      quote: "24-hour response to a heating issue in January meant our UW tenants didn't break the lease and didn't go looking at IQON at renewal. That response time was the difference between keeping them for year two and re-listing in February.",
      outcome: 'Lease renewed for year two; avoided February re-listing in the worst leasing window',
    },
    faq: [
      {
        question: 'How does maintenance response time affect tenant renewal in Waterloo?',
        answer: "More directly than in most Ontario markets. UW and WLU tenants are surrounded by PBSA tower alternatives that advertise professional maintenance as a selling point. Tenants who experience slow responses — especially during January and February — begin evaluating IQON, The Forge, and The Hub before renewal conversations even start. MoveSmart's 24-hour urgent response SLA removes this comparison point and gives tenants a reason to renew.",
      },
      {
        question: 'What maintenance documentation do I need for the July 2026 bylaw?',
        answer: "The enhanced Waterloo Rental Housing Licensing Bylaw requires landlords to demonstrate ongoing property standards compliance through inspection and maintenance records. Properties with documented annual maintenance histories — service dates, contractors, completed work orders — are licence-ready at first application. MoveSmart logs all maintenance events from the start of management, building the compliance record in real time.",
      },
      {
        question: 'My University Ave student house is a converted 1960s home. What are the highest-risk maintenance issues?',
        answer: "Heating system failure (many converted homes have original or near-original furnaces), plumbing stack blockages from multi-tenant use, and electrical panels that haven't been updated to handle modern load. MoveSmart's preventive schedule targets all three: furnace service annually before November, plumbing camera inspection every 24 months, and electrical panel review on a 36-month cycle.",
      },
    ],
  },

  // 5. TENANT SCREENING
  {
    citySlug: 'waterloo',
    serviceSlug: 'tenant-screening',
    heroHeadline: 'Waterloo Tenant Screening — Co-op Income, Guarantors, and PBSA Rejects',
    heroSubheadline: "Waterloo applicants range from UW co-op students with verified tech salaries to international students with overseas guarantors to applicants that purpose-built towers have already declined. Knowing the difference is everything.",
    localBodyParagraphs: [
      "Waterloo's tenant screening challenge is uniquely bifurcated. The first tier of applicants — UW co-op students with confirmed employment placements at Google Waterloo, Shopify, or RIM, backed by Ontario-resident guarantors — represents some of the most creditworthy short-term tenants in Ontario. Co-op employment income is verifiable through offer letters and employer confirmation; it's often higher than permanent employment income for the age demographic. The screening challenge here is distinguishing between genuine co-op income and an unconfirmed placement a student is still pursuing.",
      "The second tier consists of international students who don't qualify for PBSA towers due to price or availability, domestic students without Canadian credit history, and applicants who have been declined by other landlords. This pool contains excellent tenants — international students with substantial overseas family support and genuine ability to pay — but also applicants with financial precarity, undisclosed prior tenancies, or misrepresented income. A screening process that uses credit score as a proxy for qualified international students will reject the former and approve domestic applicants with better scores but worse actual payment histories.",
      "A third consideration is specific to Waterloo: Sun Life Financial, Perimeter Institute, BlackBerry QNX, and the Communitech tech cluster generate a professional renter demographic that looks nothing like the student applicant pool. These tenants typically have verified employment income, no credit issues, and a preference for 2BR and 3BR units in Uptown Waterloo, Laurel Creek, or Columbia Hills. Mixing screening criteria between student and professional applications — applying student-style guarantor requirements to a Sun Life analyst, or approving a co-op applicant on professional criteria — is a common and costly Waterloo landlord error.",
    ],
    painPoints: [
      {
        problem: "Waterloo landlords using standard credit-score screening reject qualified international students with strong overseas family support while approving domestic applicants with Canadian credit history but weaker actual payment capacity.",
        solution: "MoveSmart uses income-to-rent ratio, guarantor income verification (including overseas income with documentation), and rental history as primary screening criteria — not credit score proxies that disadvantage international applicants.",
      },
      {
        problem: "UW co-op employment income is presented on applications as confirmed when the placement is still pending — landlords who don't verify actual co-op offer letters can approve applicants whose income disappears between signing and move-in.",
        solution: "MoveSmart verifies co-op placements through direct employer confirmation or official co-op offer documentation — not self-reported income that hasn't materialized.",
      },
      {
        problem: "PBSA tower overflow applicants — declined by IQON, The Forge, and The Hub — sometimes apply to individual landlords without disclosing prior application rejections or tenancy issues that disqualified them from institutional screening.",
        solution: "MoveSmart's reference verification includes direct contact with prior landlords and LTB judgment searches — identifying PBSA-declined applicants who would repeat the same pattern in an individual landlord's unit.",
      },
    ],
    benefits: [
      {
        title: 'Co-op Income Verification',
        description: 'Actual employer confirmation of UW co-op placements — not self-reported income that may not materialize.',
        icon: 'document',
      },
      {
        title: 'International Applicant Assessment',
        description: 'Overseas guarantor income verification and income-to-rent ratio analysis — qualifying international students on the correct criteria.',
        icon: 'users',
      },
      {
        title: 'LTB Judgment Search',
        description: 'Every Waterloo applicant screened against LTB judgment database — identifying prior evictions and order history before placement.',
        icon: 'star',
      },
      {
        title: 'Professional vs Student Criteria',
        description: 'Separate screening frameworks for Sun Life / Communitech professional applicants vs. student / co-op applicants — no cross-contamination of criteria.',
        icon: 'chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Application Type Classification',
        description: "Applicant classified as co-op student, domestic student, international student, or working professional — triggering the appropriate Waterloo screening criteria for each category.",
      },
      {
        stepNumber: 2,
        title: 'Income and Guarantor Verification',
        description: 'Co-op offer letters confirmed with employer; guarantor income verified with documentation; overseas guarantor income assessed with foreign income standards.',
      },
      {
        stepNumber: 3,
        title: 'Credit, Reference, and LTB Check',
        description: "Credit bureau report, direct prior landlord reference calls, and LTB judgment search — identifying red flags that don't appear in self-reported application materials.",
      },
      {
        stepNumber: 4,
        title: 'Comparative Recommendation',
        description: "When multiple applicants qualify, MoveSmart provides a comparative analysis — income stability, guarantor strength, prior landlord references — to support the landlord's final decision.",
      },
    ],
    testimonial: {
      name: 'Daniel Osei-Bonsu',
      city: 'Waterloo',
      quote: "MoveSmart identified two applicants — one with verified co-op employment income from a confirmed Google Waterloo placement, another with a family guarantor still being assessed. We chose the verified co-op income. No payment issues all year.",
      outcome: 'Verified co-op income tenant placed; zero payment issues across full lease term',
    },
    faq: [
      {
        question: 'How do you screen international students who have no Canadian credit history?',
        answer: "Credit score is not a useful criterion for recent international arrivals. MoveSmart assesses income-to-rent ratio using verified overseas guarantor income (with documentation), proof of enrollment and tuition payment capacity, and rental history from prior residences — including overseas residences where verifiable. This framework identifies qualified international students that credit-score screening incorrectly rejects.",
      },
      {
        question: 'How do you verify that a co-op placement income is actually confirmed?',
        answer: "UW co-op students apply for work term placements through WaterlooWorks and receive formal offer letters from employers. MoveSmart requires the actual offer letter — not a verbal confirmation or application status — and contacts the employer directly if needed to confirm start date and compensation. Unconfirmed placements are treated as no income for screening purposes.",
      },
      {
        question: "Can a PBSA tower rejection tell me something useful about an applicant?",
        answer: "PBSA towers like IQON and The Forge have institutional screening processes. An applicant who has been declined by multiple purpose-built buildings and is now applying to individual landlords has typically been declined for a reason — prior tenancy issues, insufficient income, or incomplete documentation. MoveSmart's reference and LTB search process identifies these patterns, which don't always appear on credit reports.",
      },
    ],
  },

  // 6. LEASE MANAGEMENT
  {
    citySlug: 'waterloo',
    serviceSlug: 'lease-management',
    heroHeadline: 'Waterloo Lease Management — Co-op Sublets, Bylaw Compliance, and Guarantor Structures',
    heroSubheadline: "A standard Ontario lease is a liability in Waterloo. Co-op rotations, July 2026 bylaw requirements, and student guarantor arrangements demand Waterloo-specific documentation.",
    localBodyParagraphs: [
      "The standard Ontario Standard Lease Form is a necessary starting point for any Waterloo tenancy — but it's not sufficient. Waterloo's unique conditions require addenda that address three categories: co-op sublet authorization (who may occupy during work terms, the screening process for replacement occupants, and the primary tenant's continued liability), guarantor obligations (income documentation, Ontario Human Rights Code-compliant guarantor acceptance criteria, and enforcement terms), and property-specific rules (parking allocation in multi-unit conversions, noise standards in student-dense corridors, and waste management in houses with multiple occupants).",
      "The July 2026 Rental Housing Licensing Bylaw creates a new lease management requirement that no Waterloo landlord should ignore: leases executed from July 1, 2026 onward must be consistent with the licensing standards that apply to that property. A lease that authorizes occupancy conditions inconsistent with the property's licence is a compliance problem at renewal. MoveSmart began reviewing Waterloo leases against the forthcoming bylaw standards in late 2025 — identifying clauses that need updating before July 2026, not after enforcement begins.",
      "Lease management across co-op departures requires specific documentation discipline. When a primary tenant departs for a work term and a sublet occupant moves in, the lease relationship doesn't change — but the occupancy documentation must. MoveSmart maintains a separate sublet file for each co-op rotation: sublet application, screening results, written approval, move-in condition report, and move-out condition report. This documentation protects the landlord if a sublet occupant causes damage and the primary tenant disputes responsibility, and it satisfies the documentation requirements that may be part of the July 2026 bylaw compliance review.",
    ],
    painPoints: [
      {
        problem: "Waterloo landlords using standard Ontario leases with no co-op sublet addendum have no legal framework for the 4-month co-op departures that are predictable from the day a UW student signs — the result is either unauthorized occupancy or empty units.",
        solution: "MoveSmart drafts co-op sublet addenda at lease signing that authorize lawful sublets on a pre-agreed process — protecting the landlord's occupancy continuity and legal position.",
      },
      {
        problem: "Leases executed before July 2026 that contain conditions inconsistent with the new Rental Housing Licensing Bylaw create compliance problems at first renewal — landlords discover this under enforcement pressure, not in advance.",
        solution: "MoveSmart reviews all Waterloo leases against the July 2026 bylaw standards 18 months before the effective date — identifying necessary updates before they become compliance issues.",
      },
      {
        problem: "Guarantor arrangements in student leases are often informal — a parent agrees verbally to cover rent, their name is on the lease, but the documentation doesn't survive an LTB application when payment fails.",
        solution: "MoveSmart's guarantor addenda document income, obligations, and enforcement terms in a format that is LTB-enforceable and complies with the Ontario Human Rights Code's income source protections.",
      },
    ],
    benefits: [
      {
        title: 'Co-op Sublet Addenda',
        description: 'Lease addenda drafted at signing that authorize lawful co-op sublets on a pre-agreed process — eliminating unauthorized occupancy across every 4-month rotation.',
        icon: 'document',
      },
      {
        title: 'July 2026 Bylaw Review',
        description: 'All Waterloo leases reviewed against forthcoming Rental Housing Licensing Bylaw standards — updates made before enforcement, not under it.',
        icon: 'calendar',
      },
      {
        title: 'LTB-Enforceable Guarantor Structures',
        description: 'Guarantor addenda that survive LTB scrutiny — income documented, obligations clear, HRC-compliant criteria applied.',
        icon: 'users',
      },
      {
        title: 'Co-op Occupancy Documentation',
        description: 'Separate sublet files for each co-op rotation — screening, approval, condition reports — protecting the landlord throughout every departure cycle.',
        icon: 'star',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Lease and Addenda Preparation',
        description: 'Standard Form Lease plus Waterloo-specific addenda: co-op sublet authorization, guarantor obligations, property rules — completed before listing goes live.',
      },
      {
        stepNumber: 2,
        title: 'Bylaw Compliance Review',
        description: "Lease reviewed against July 2026 Rental Housing Licensing Bylaw standards — any conditions that require updating are flagged and corrected at origination.",
      },
      {
        stepNumber: 3,
        title: 'Co-op Rotation Management',
        description: 'For each co-op departure: sublet application, screening, written approval, move-in and move-out condition reports — all filed in the property record.',
      },
      {
        stepNumber: 4,
        title: 'Renewal Review',
        description: 'At renewal, lease is re-benchmarked against current bylaw requirements and market rent — updated before signing.',
      },
    ],
    testimonial: {
      name: 'Susan Hartmann',
      city: 'Waterloo',
      quote: "MoveSmart reviewed our leases against the new July 2026 bylaw requirements 18 months early. We found three clauses that needed updating — small issues now, but compliance problems under enforcement. Done before it cost us anything.",
      outcome: '3 lease clauses updated 18 months before July 2026 enforcement; zero compliance exposure',
    },
    faq: [
      {
        question: 'What does a co-op sublet addendum actually say?',
        answer: "It authorizes the primary tenant to sublet the unit during work terms on a defined process: written sublet request to MoveSmart, screening of the proposed subtenant using standard criteria, written approval before occupancy, and a condition report at sublet move-in and move-out. The addendum explicitly confirms that the primary tenant remains responsible for rent and unit condition during the sublet period — the sublet does not transfer obligations to the replacement occupant.",
      },
      {
        question: 'What makes the July 2026 bylaw different from what already applies in Waterloo?',
        answer: "Prior to July 2026, Waterloo's Rental Housing Licensing focused primarily on student rental houses near UW and WLU. The new bylaw, approved June 23, 2025, expands to all rental housing operators and introduces enhanced inspection standards. Leases that were compliant under the old framework may contain conditions — occupancy limits, modification authorizations, or maintenance responsibility clauses — inconsistent with the new standards. An early review identifies and corrects these gaps.",
      },
      {
        question: 'Can I include a guarantor on a Waterloo student lease?',
        answer: "Yes — and in most student lease situations, you should. MoveSmart's guarantor addendum documents the guarantor's income, obligations, and enforcement terms in a format that is LTB-enforceable. One important constraint: under the Ontario Human Rights Code, you cannot refuse to rent solely because a tenant relies on a guarantor rather than personal income — the guarantor structure must be applied consistently across all applicants who request it, not used selectively.",
      },
    ],
  },

  // 7. FINANCIAL REPORTING
  {
    citySlug: 'waterloo',
    serviceSlug: 'financial-reporting',
    heroHeadline: 'Waterloo Investment Reporting — Co-op Vacancy Costs, Per-Room Analysis, and Bylaw Compliance Budget',
    heroSubheadline: "Waterloo's co-op cycles, PBSA competition, and July 2026 bylaw overhaul create financial variables that generic landlord software doesn't track.",
    localBodyParagraphs: [
      "Waterloo investment properties have a financial profile unlike any other Ontario market. A 4-bedroom student house near University Ave may generate $3,200–$3,600/month at full occupancy but experience 4-month co-op departure cycles where one or more rooms drop to sublet income or sit vacant. Tracking per-room performance across co-op rotations — not just annual gross rent — is the only way to identify which rooms carry more co-op vacancy risk and whether the whole-unit leasing model outperforms per-room leasing for a specific property.",
      "The Waterloo premium over Kitchener persists at approximately $140/month for comparable 1BR and 2BR units — but this premium narrows for specific unit types and neighbourhoods. Uptown Waterloo 1BRs priced against University Ave corridor units may appear cheaper while commanding the same ION LRT access and superior walkability to Sun Life and Communitech employers. Financial reporting that benchmarks Waterloo units against Waterloo-specific comparables — not Kitchener or regional averages — identifies the repricing and retenanting opportunities that generic reporting misses.",
      "The July 2026 Rental Housing Licensing Bylaw introduces a compliance budget dimension that doesn't exist in other Ontario markets. Properties that require remediation before licence application will face costs ranging from minor (documentation fees, minor repairs) to significant (major property standards upgrades). Understanding the projected compliance cost for each Waterloo property — in advance of the July 2026 deadline — allows investors to budget capital expenditure, factor compliance costs into acquisition analysis, and avoid the worst-case scenario: emergency remediation under an enforcement order with a licence denial consequence.",
    ],
    painPoints: [
      {
        problem: "Waterloo landlords reporting only annual gross rent miss the co-op vacancy cost embedded in their actual returns — a 4-bedroom house with 3-month summer vacancies per room isn't performing at the annual rate its headline rent suggests.",
        solution: "MoveSmart's Waterloo financial reports track per-room occupancy and revenue across each co-op rotation, showing actual return including vacancy periods — the number investors need to make re-tenanting and pricing decisions.",
      },
      {
        problem: "Landlords pricing Waterloo units against regional averages that include Kitchener are systematically underpricing — missing the $140/month Waterloo premium that exists for well-located units in the Uptown, University Ave, and Columbia Hills corridors.",
        solution: "MoveSmart benchmarks monthly reports against Waterloo-only comparables — identifying underpriced units and the specific repositioning opportunity available in the current market.",
      },
      {
        problem: "The July 2026 bylaw compliance cost is an unknown liability on every Waterloo investment property — landlords who don't assess it now face budget surprises at the worst time: under enforcement pressure.",
        solution: "MoveSmart includes a July 2026 compliance cost estimate in the annual Waterloo property financial report — quantifying known risks before they become emergency expenses.",
      },
    ],
    benefits: [
      {
        title: 'Per-Room Co-op Reporting',
        description: 'Room-level occupancy and revenue tracking across each co-op rotation — showing actual returns, not headline annual rent.',
        icon: 'chart',
      },
      {
        title: 'Waterloo-Only Benchmarking',
        description: 'Monthly market comparables drawn from Waterloo-specific data — not regional averages that dilute the Waterloo premium.',
        icon: 'star',
      },
      {
        title: 'July 2026 Compliance Budget',
        description: 'Annual report includes estimated bylaw compliance cost for each property — quantified in advance of enforcement.',
        icon: 'document',
      },
      {
        title: 'Neighbourhood-Level Analysis',
        description: "Separate performance benchmarks for University Ave corridor, Uptown Waterloo, Laurel Creek, and Columbia Hills — each neighbourhood has a distinct rent profile and tenant demographic.",
        icon: 'users',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Property Financial Setup',
        description: 'Per-room and per-unit income tracking established; co-op rotation calendar integrated; baseline Waterloo market comparable data set.',
      },
      {
        stepNumber: 2,
        title: 'Monthly Reporting',
        description: 'Rent collected vs. expected, per-room occupancy status, maintenance expenses, and Waterloo market comparable rent benchmarks — delivered monthly.',
      },
      {
        stepNumber: 3,
        title: 'Annual Performance Review',
        description: 'Full annual income statement, YoY comparison, co-op vacancy cost analysis, and July 2026 bylaw compliance cost estimate.',
      },
      {
        stepNumber: 4,
        title: 'Pricing Recommendations',
        description: "Quarterly pricing review against Waterloo comparables — identifying units priced below the Waterloo-Kitchener premium level and recommending repositioning.",
      },
    ],
    testimonial: {
      name: 'Parminder Sandhu',
      city: 'Waterloo',
      quote: "Monthly reports showed our Columbia Hills 2BR was priced $130/month below a comparable Uptown Waterloo unit. MoveSmart repositioned it during the December leasing window and we renewed at the higher rate. Numbers we never would have seen without the reporting.",
      outcome: '$130/month increase at renewal; repositioned using Waterloo-specific comparable data',
    },
    faq: [
      {
        question: 'How does MoveSmart track co-op vacancy in financial reports?',
        answer: "Each room in a Waterloo property is tracked separately. When a co-op student departs, that room's status is marked as co-op subletting (generating sublet income), vacant (co-op vacancy cost), or re-leased. The annual report shows the effective return per room including all vacancy periods — giving landlords the true co-op-adjusted yield, not the theoretical full-occupancy rate.",
      },
      {
        question: 'How does the Waterloo premium over Kitchener show up in financial reporting?',
        answer: "MoveSmart's monthly reports include Waterloo-specific comparables for each unit type and neighbourhood. When a unit's rent falls more than $50/month below the current Waterloo median for equivalent units, the report flags a repricing opportunity. The $140/month average Waterloo-Kitchener premium is not uniform — it varies by neighbourhood and unit type, and the report captures this granularity.",
      },
      {
        question: 'When should I start budgeting for July 2026 bylaw compliance costs?',
        answer: "Now. The July 2026 Rental Housing Licensing Bylaw enhanced standards were approved June 23, 2025, giving landlords 24 months to prepare. MoveSmart includes a compliance cost estimate in the annual Waterloo property report — identifying which properties need proactive remediation and which are already compliant. Planning the work now avoids the premium pricing and supply constraints that accompany enforcement deadline rush periods.",
      },
    ],
  },

  // 8. EVICTION SERVICES
  {
    citySlug: 'waterloo',
    serviceSlug: 'eviction-services',
    heroHeadline: 'Waterloo Eviction Services — Abandonments, Co-op No-Returns, and LTB Technicalities',
    heroSubheadline: "Waterloo's co-op program creates a unique eviction scenario — abandonment during work terms — that requires documentation Ontario LTBs rarely see from other cities.",
    localBodyParagraphs: [
      "Waterloo eviction proceedings have two categories that don't exist in standard Ontario markets. The first is co-op abandonment: a UW student departs for a work term and simply does not return, stops communicating, and leaves their belongings (or not) in the unit. This is not a standard N4 non-payment eviction — it may involve the abandonment process under the RTA, which requires specific documentation of the vacancy, the landlord's reasonable attempts to contact the tenant, and the determination that the unit has been abandoned rather than temporarily vacated. Filing the wrong application type for a co-op abandonment causes delays and potential LTB dismissal.",
      "The second category is notice-serving complexity involving student tenants with access to UW student legal services or the Legal Aid office at 180 King Street West. Waterloo LTB applications involving UW or WLU students are more likely to be contested on technical grounds — incorrect service method, wrong rent amount on the N4, or procedural timing issues — than eviction applications in purely professional rental markets. This doesn't mean evictions should be avoided; it means the documentation must be technically perfect from the first notice.",
      "The standard N12 personal use eviction and N13 renovation eviction categories exist in Waterloo as elsewhere in Ontario, but Waterloo's declining rent environment (1.8% YoY drop in 2025) combined with the July 2026 bylaw overhaul creates a specific N13 risk: a landlord who files an N13 for renovation, recovers the unit, and then discovers the renovations bring the property into bylaw compliance for July 2026, may be perceived as using the N13 to access a licence-compliant unit rather than for genuine renovation need. Waterloo LTB adjudicators are aware of this pattern, and documentation of good-faith renovation intent must be airtight.",
    ],
    painPoints: [
      {
        problem: "Co-op student abandonment — departure for work term with no return, no communication, belongings left or not — is not a standard non-payment situation and the wrong LTB application type causes delay and potential dismissal.",
        solution: "MoveSmart documents co-op abandonment under the correct RTA abandonment provisions: contact attempt records, unit access documentation, and the determination filing — resolving the unit correctly and quickly.",
      },
      {
        problem: "UW student tenants with access to legal services file procedural challenges to technically imperfect LTB notices — a wrong rent amount, wrong service method, or missed void period resets the clock in Waterloo's time-sensitive leasing environment.",
        solution: "MoveSmart's eviction process requires technical accuracy on every document before filing — correct amount, correct service, correct void period — eliminating the procedural vulnerabilities that experienced student legal services exploit.",
      },
      {
        problem: "N13 eviction for renovation in Waterloo creates a dual risk in 2025–2026: declining rents make the recovered unit harder to re-rent at a higher rate, and the July 2026 bylaw creates a bad-faith inference if the renovation happens to achieve licence compliance.",
        solution: "MoveSmart advises on the viability of N13 applications in the current Waterloo environment and ensures renovation documentation establishes genuine good-faith intent — not a bylaw-compliance workaround.",
      },
    ],
    benefits: [
      {
        title: 'Co-op Abandonment Expertise',
        description: 'Correct RTA abandonment documentation for co-op non-return situations — the application type that Waterloo LTBs see infrequently but handle correctly when filed properly.',
        icon: 'document',
      },
      {
        title: 'Technical LTB Accuracy',
        description: 'Every notice reviewed for amount, service method, and timing before filing — preventing the procedural challenges that student legal services are trained to identify.',
        icon: 'star',
      },
      {
        title: 'N4 to Resolution Pipeline',
        description: 'From first missed payment to void notice to LTB application to hearing — a documented, timeline-managed process that preserves the September re-leasing window.',
        icon: 'calendar',
      },
      {
        title: 'N13 Risk Assessment',
        description: "Pre-application analysis of N13 viability in Waterloo's current rent and bylaw environment — including bad-faith exposure from the July 2026 licence compliance context.",
        icon: 'users',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Situation Assessment',
        description: 'MoveSmart identifies the correct eviction pathway: non-payment (N4), abandonment (RTA s. 2 determination), personal use (N12), or renovation (N13) — and advises on viability before any notice is served.',
      },
      {
        stepNumber: 2,
        title: 'Notice Preparation and Service',
        description: 'Correct form, correct rent amount, correct service method, correct void period — every technical requirement confirmed before the notice leaves the office.',
      },
      {
        stepNumber: 3,
        title: 'LTB Application Filing',
        description: 'If the void period passes without resolution, the application is filed at the LTB with complete supporting documentation — ready for any procedural challenge from student legal services.',
      },
      {
        stepNumber: 4,
        title: 'Unit Recovery and Re-listing',
        description: 'Following LTB order or abandonment determination, unit condition documented, any required remediation completed, and Waterloo December listing launched to catch the next leasing cycle.',
      },
    ],
    testimonial: {
      name: 'Angela Ferreira',
      city: 'Waterloo',
      quote: "A UW co-op student abandoned the unit during their work term — belongings gone, no communication for six weeks. MoveSmart handled the abandonment documentation correctly under the RTA, re-listed within 10 days of recovering the unit, and had a new tenant signed for the next term.",
      outcome: 'Abandonment resolved under correct RTA provisions; unit re-listed within 10 days',
    },
    faq: [
      {
        question: 'What is the difference between a co-op abandonment and a standard non-payment eviction?',
        answer: "In a standard N4 non-payment eviction, the tenant is present but not paying. In a co-op abandonment, the tenant has departed for a work term and stopped communicating — there is no ongoing tenancy in a practical sense, but the lease has not been formally terminated. The RTA provides an abandonment determination process (section 2 definition, confirmed through contact attempts and unit access) that is distinct from the N4/L1 process. Filing an N4 for an abandoned unit is procedurally incorrect and creates delays. MoveSmart files the correct application type from the outset.",
      },
      {
        question: "Why are Waterloo eviction notices more likely to be challenged on technical grounds?",
        answer: "UW maintains a student legal services office that provides free legal advice and representation to enrolled students in LTB matters. WLU students have access to similar services. These offices are specifically trained in LTB procedural requirements — incorrect rent amounts, service deficiencies, and void period errors are common grounds for dismissal applications. MoveSmart's notice preparation process is designed with the assumption that every Waterloo notice may be reviewed by an experienced student legal advocate.",
      },
      {
        question: 'Should I consider an N13 eviction in Waterloo to bring my rental unit up to July 2026 bylaw standards?',
        answer: "This is a situation that requires careful advice before proceeding. A genuine renovation that happens to achieve bylaw compliance can support a legitimate N13 — but Waterloo LTB adjudicators are increasingly aware of bylaw-compliance motivated N13 applications. The documentation of good-faith renovation intent must be thorough and credible: detailed contractor quotes, building permit applications, and a clear scope of work that goes beyond the minimum required for bylaw compliance. MoveSmart assesses N13 viability in Waterloo's current environment before any notice is served.",
      },
    ],
  },
]
