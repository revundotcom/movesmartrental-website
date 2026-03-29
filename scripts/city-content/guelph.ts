import type { CityServiceContent, CityDescription } from './batch-1'

export const cityDescriptions: CityDescription[] = [
  {
    citySlug: 'guelph',
    descriptionParagraphs: [
      "Guelph is one of Ontario's most supply-constrained rental markets — and structurally, it cannot fix that. The city is encircled by the provincial Greenbelt and protected agricultural land on all sides, leaving intensification as the only growth pathway. The result: vacancy has held below 2% for years, earning Guelph a national ranking among the tightest rental markets in Canada. One-bedroom units averaged $1,971/month as of July 2025, with some indexes placing Guelph as high as 8th nationally at $2,251/month. Two-bedroom units run approximately $2,384 and three-bedrooms range from $2,600 to $3,000 depending on neighbourhood and vintage.",
      "The University of Guelph's 30,000+ enrolled students — concentrated in agriculture, veterinary science, biotech, and engineering — anchor the northwest end of the market. Unlike many Ontario university cities, U of G is less reliant on international students and therefore less exposed to the 2024 federal study permit caps. The Ontario Veterinary College (OVC) on campus generates a distinct high-income renter cohort: veterinary students and early-career veterinary professionals with professional-grade income and exceptional credit history. Beyond the university, Guelph's industrial economy anchors the east and south: Linamar Corporation's global headquarters employs 32,000+ worldwide with six divisional facilities in Guelph; Boehringer Ingelheim Canada operates a major animal health biotech campus; and the Hanlon Creek Business Park continues expanding as a light industrial and tech employment node.",
      "The Guelph GO (Kitchener line) connects downtown Guelph to Union Station in approximately 60 minutes — a key commuter infrastructure asset for landlords in the downtown and South Guelph corridors. Key neighbourhoods span a meaningful price range: Old University and Gordon Street (near campus, $1,700–$2,200), Downtown Guelph around the Speed River waterfront ($1,700–$2,200), Kortright and Westminster Woods in the south ($2,000–$2,500 for larger family units), Parkwood Gardens and Willow West in the northwest ($1,600–$2,000), and the Hanlon Creek and South Guelph employment corridor ($1,700–$2,100). As of December 1, 2023, Guelph operates an STR bylaw requiring a principal-residence licence and inspection — unlicensed operators face $615 fines. There is no general residential rental licensing, though council discussions have been persistent.",
    ],
    transitInfo: 'Guelph Transit 15+ fixed routes citywide. Guelph Central GO Station (Kitchener GO line) — Union Station ~60 minutes by train. Highway 6, Highway 7, Highway 24, and Hanlon Expressway (Highway 6 bypass) for automotive access. No direct highway to Toronto — GO Train is the primary Toronto commuter route.',
    neighbourhoods: ['Old University / Gordon Street', 'Downtown Guelph / Speed River', 'Kortright / Westminster Woods', 'Parkwood Gardens / Willow West', 'Hanlon Creek / South Guelph', 'Stone Road Mall Corridor'],
  },
]

export const cityServiceContent: CityServiceContent[] = [
  // ============================================================
  // GUELPH × 8 SERVICES
  // ============================================================

  {
    citySlug: 'guelph',
    serviceSlug: 'tenant-placement',
    heroHeadline: 'Place the Right Tenant in Guelph\'s Sub-2% Vacancy Market — Without Skipping the Process',
    heroSubheadline: "Guelph's extreme tightness generates 10–15 applications per listing — landlords who rush to the first plausible applicant are making their most expensive mistake in a market that should work in their favour.",
    localBodyParagraphs: [
      "Guelph's vacancy rate has held below 2% for years — a condition structurally locked in by the Greenbelt and protected agricultural land that prevents outward expansion. When a well-priced unit lists near U of G or in the Kortright corridor, 10 to 15 applications in the first week are not unusual. The pressure this creates is counterintuitive: landlords in a seller's market over-accept the first plausible applicant out of anxiety, ignoring the red flags they'd scrutinize carefully if the market were softer. Tight vacancy does not reduce the risk of a bad placement — it masks it.",
      "Guelph's applicant pool spans four distinct demographics, each requiring a different screening lens. University of Guelph and OVC students need guarantor structures and co-signer verification when individual income is below threshold. OVC veterinary professionals and early-career researchers present strong income letters and international credentials. Linamar and Boehringer Ingelheim employees typically have T4 income and verifiable employer documentation — a straightforward profile. GO Transit commuters heading to Toronto represent a fourth cohort: usually dual-income households with strong qualifications but requiring transit proximity in their housing decision. Knowing which demographic your unit attracts determines which verification method applies.",
      "Guelph's Off-Campus Living office at U of G is one of the most active tenant-advocacy bodies in Ontario. It actively advises students on their rights under the RTA and flags landlords who use discriminatory screening practices. In a market where you may reject 12 applicants for every one you accept, OHRC-compliant documented screening criteria are not optional — they are the landlord's primary protection when any rejected applicant believes the refusal was improper.",
    ],
    painPoints: [
      {
        problem: "Guelph landlords receiving 11 applications rush to sign the first financially plausible one — skipping reference checks and employment verification out of competitive anxiety in a market that doesn't require that panic.",
        solution: "MoveSmart completes full credit, employment, and reference screening within 48 hours on all applicants — so thoroughness never costs speed, and the best-qualified tenant is placed, not the fastest-responding one.",
      },
      {
        problem: "Rejecting 10+ applicants in Guelph without OHRC-documented criteria exposes landlords to Human Rights complaints — U of G's Off-Campus Living office advises students on exactly this process.",
        solution: "Uniform written screening criteria applied identically to every applicant — documented decision rationale retained for each rejection — creating a defensible record for any OHRC or LTB challenge.",
      },
      {
        problem: "Gordon Street and Old University District units are consistently underpriced by landlords who haven't tracked Kortright's $2,000–$2,500 benchmark or the OVC professional renter premium that commands above-average rents.",
        solution: "Neighbourhood-specific comparable analysis benchmarking your unit against current Guelph listings in the same corridor — OVC proximity, Hanlon Creek employment access, and GO commute time all factored into pricing.",
      },
    ],
    benefits: [
      {
        title: 'Sub-48-Hour Full Screening',
        description: 'Complete credit, employment, and reference verification within 48 hours — no speed sacrifice for thoroughness in Guelph\'s high-volume application environment.',
        icon: 'clock',
      },
      {
        title: 'OHRC-Documented Decision Records',
        description: 'Written criteria and documented rejection rationale for every applicant — essential protection when Guelph\'s Off-Campus Living office advises tenants on Human Rights complaints.',
        icon: 'shield',
      },
      {
        title: 'OVC and U of G Applicant Expertise',
        description: 'Guarantor structures, co-signer verification, and professional income assessment for Guelph\'s university, veterinary, and biotech applicant profiles.',
        icon: 'users',
      },
      {
        title: 'Guelph Corridor Pricing',
        description: 'Comparable analysis by neighbourhood — Gordon Street, Kortright, Downtown, Hanlon Creek — not GTA averages that distort Guelph\'s differentiated market.',
        icon: 'chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Pricing and Listing',
        description: 'Neighbourhood-specific comparable analysis, professional photography, and listings on Kijiji, Realtor.ca, Facebook Marketplace, and U of G Off-Campus Housing portal.',
      },
      {
        stepNumber: 2,
        title: 'Application Collection',
        description: 'Standardized application capturing employment, income, rental history, guarantor details where applicable, and references.',
      },
      {
        stepNumber: 3,
        title: 'Documented Screening',
        description: 'Credit report, employment verification, landlord reference calls, and guarantor assessment — documented criteria applied uniformly to every Guelph applicant.',
      },
      {
        stepNumber: 4,
        title: 'Placement and Lease Execution',
        description: 'Owner receives ranked summary with full screening evidence; lease executed with Guelph-specific addenda covering any relevant STR bylaw disclosure and pet provisions.',
      },
    ],
    testimonial: {
      name: 'Priya Sundaram',
      city: 'Guelph',
      quote: "We had 11 applications for a 3-bedroom near campus within 5 days. MoveSmart screened every single one against the same criteria, presented the top 3 with full documentation, and we signed without a moment's worry about OHRC compliance. The tenant they recommended has been flawless for 14 months.",
      outcome: '11 applications screened to criteria; top-qualified tenant placed in under 2 weeks with full OHRC documentation',
    },
    faq: [
      {
        question: 'Why do I need formal screening criteria in Guelph when I can choose from so many applicants?',
        answer: "Because rejecting 10 applicants in Guelph without documented, uniform criteria exposes you to Human Rights complaints. U of G's Off-Campus Living office actively advises students on the OHRC process. A written scoring framework applied identically to every applicant is your primary protection — not a bureaucratic formality.",
      },
      {
        question: 'Should I accept a U of G student with a parent co-signer for a $2,100/month unit?',
        answer: "A co-signer can be appropriate if the parent\'s income and credit meet the threshold independently (typically 3x monthly rent). MoveSmart verifies both the student and the guarantor — if the guarantor qualifies, the placement is as solid as a working professional tenancy.",
      },
      {
        question: 'How is the OVC renter cohort different from standard U of G students?',
        answer: "Ontario Veterinary College students and early-career veterinary professionals are among Guelph\'s highest-income renters. Many have professional income levels, strong credit, and multi-year housing needs. They warrant no special leniency but also no unnecessary skepticism — their financial profile is typically straightforward to verify.",
      },
    ],
  },

  {
    citySlug: 'guelph',
    serviceSlug: 'property-management',
    heroHeadline: 'Guelph Property Management — Greenbelt Constraints, University Dynamics, and Industrial Employment',
    heroSubheadline: "Guelph's permanently tight supply means landlords can become complacent — but the tenant rights environment and Greenbelt intensification pressure make professional management more necessary, not less.",
    localBodyParagraphs: [
      "Guelph's sub-2% vacancy creates a management paradox: landlords who assume market tightness eliminates management risk are the ones most likely to encounter problems. Tenants at U of G are well-advised by the Off-Campus Living office on their maintenance rights, quiet enjoyment protections, and LTB filing procedures. A Linamar or Boehringer Ingelheim employee renting a Hanlon Creek unit at $2,100/month has income security and legal awareness — they will formally document maintenance failures if management is slow. The tight market protects occupancy, but it does not protect landlords who operate informally.",
      "Guelph's housing stock is diverse in ways that require building-specific management knowledge. The Downtown and Old University corridor contains Victorian-era stone houses — Guelph's famous limestone construction — that have specific heritage maintenance considerations and contractors who understand the material. The Kortright and Westminster Woods corridor is dominated by newer 2000s-era townhouses with standard builder finishes. Hanlon Creek has a mix of purpose-built rentals and newer investor condos. Each stock type has different maintenance profiles, different tenant expectations, and different appropriate rent levels.",
      "The City of Guelph's STR bylaw (effective December 1, 2023) added a regulatory layer for landlords managing properties that previously operated as short-term rentals. Principal-residence-only licensing, mandatory inspection, and $615 fines for unlicensed operation mean any property transitioning from STR to long-term rental requires careful compliance verification before the first long-term tenancy begins. City council continues periodic discussion of broader rental licensing — a development worth monitoring given the political pressure from Guelph's active tenant advocacy community.",
    ],
    painPoints: [
      {
        problem: "Guelph landlords in a sub-2% market become overconfident about informal management — tenants at U of G and OVC are among the most rights-aware in Ontario, and informal processes become LTB applications quickly.",
        solution: "Documented processes for every interaction: maintenance requests logged, response times recorded, communications retained — Guelph tenants with legal awareness get professional management that creates no opening for LTB applications.",
      },
      {
        problem: "Guelph's limestone heritage properties in the Downtown and Old University corridor require heritage-aware contractors for exterior work — general handymen who don't understand the material cause damage that triggers City of Guelph heritage compliance concerns.",
        solution: "MoveSmart's Guelph contractor network includes heritage-experienced tradespeople familiar with limestone construction and City of Guelph heritage protocols — the right contractor dispatched for the right property.",
      },
      {
        problem: "Properties transitioning from STR to long-term rental in Guelph need licence verification and inspection compliance before the first tenancy — landlords who skip this step risk the $615 fine and bylaw complications mid-tenancy.",
        solution: "STR-to-long-term-rental transition protocol: bylaw compliance review, licence cancellation documentation, and property inspection coordination before any tenancy begins.",
      },
    ],
    benefits: [
      {
        title: 'Rights-Aware Tenant Environment Management',
        description: 'Documented maintenance logs, response records, and communication trails — the foundation of professional management in Guelph\'s U of G and OVC tenant environment.',
        icon: 'shield',
      },
      {
        title: 'Heritage Property Expertise',
        description: 'Limestone-competent contractors for Downtown and Old University heritage properties — proper materials and City of Guelph heritage protocol compliance.',
        icon: 'home',
      },
      {
        title: 'STR Compliance Transition',
        description: 'Bylaw review, licence cancellation documentation, and inspection coordination for properties moving from short-term to long-term tenancy.',
        icon: 'document',
      },
      {
        title: 'Monthly Financial Reporting',
        description: 'Income, expenses, and NOI tracked monthly across Guelph\'s diverse property types — from Kortright townhouses to Gordon Street investment condos.',
        icon: 'chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Property and Compliance Audit',
        description: 'Unit condition assessment, STR bylaw status confirmation, and maintenance triage before management begins.',
      },
      {
        stepNumber: 2,
        title: 'Tenant Onboarding',
        description: 'Move-in inspection documentation, utility transfer, lease orientation, and rights-aware tenant communication from day one.',
      },
      {
        stepNumber: 3,
        title: 'Ongoing Management',
        description: 'Maintenance request logging and dispatch, rent collection, documented communications, and monthly owner reporting.',
      },
      {
        stepNumber: 4,
        title: 'Annual Review',
        description: 'Performance report, Guelph market rent analysis, renewal strategy, and upcoming maintenance cost forecasting.',
      },
    ],
    testimonial: {
      name: 'Derek Holloway',
      city: 'Guelph',
      quote: "U of G's Off-Campus Living office flagged our property for a maintenance backlog we didn't even know existed. MoveSmart had every item documented and rectified within 48 hours, sent the tenant a written summary, and we've had zero further issues in 18 months.",
      outcome: 'Full maintenance backlog resolved in 48 hours with documentation; no repeat LTB or Off-Campus Living issues',
    },
    faq: [
      {
        question: "Why is professional management more important in Guelph's tight market, not less?",
        answer: "Tight vacancy protects occupancy but not compliance. Guelph's tenant community — U of G students advised by Off-Campus Living, OVC professionals with legal awareness, Linamar employees with income security — is among Ontario's most rights-informed. Informal management processes create LTB exposure in a city where tenant advocacy resources are actively used.",
      },
      {
        question: 'Does the Guelph STR bylaw affect long-term rental properties?',
        answer: "The December 2023 bylaw restricts STRs to principal residences with a licence and inspection. It does not directly regulate long-term rentals. However, investors who previously operated short-term rentals need to formally cancel those licences and verify compliance before transitioning to long-term tenancy — commingling the two statuses creates bylaw exposure.",
      },
    ],
  },

  {
    citySlug: 'guelph',
    serviceSlug: 'rent-collection',
    heroHeadline: 'Guelph Rent Collection — Documented, Automated, and N4-Ready from Day One',
    heroSubheadline: "In Guelph's landlord-favoured market, informal payment arrangements create documentation gaps that tenants can exploit — digital collection removes that exposure entirely.",
    localBodyParagraphs: [
      "Guelph's tight rental market breeds a specific rent collection hazard: tenants who know they occupy one of the most in-demand units in Ontario sometimes test informal payment flexibility. A tenant who pays the 1st, then the 3rd, then the 7th — always eventually paying — can accumulate enough documentation gaps over 18 months that an N4 becomes difficult to cleanly support. Pre-authorized debit collection removes this drift before it starts, establishing a precise legal record from the first rent payment.",
      "The N4 process under Bill 60's 7-day cure period runs on tight timelines. An N4 served the day after the missed due date gives the tenant 7 days to pay all arrears. If the cure period expires without payment, an L1 application can be filed immediately. Guelph landlords who wait a week before issuing the N4 have already added a week to their timeline — in a city where hearing waitlists run months, every day of procedural delay is a real cost.",
      "University tenants and U of G students on academic schedules create a collection calendar consideration unique to Guelph. September and January — the semester start months — are when new leases activate and first payments come in. Summer leases and sublet arrangements add complexity. MoveSmart's collection system handles all payment types — direct deposit, pre-authorized debit, and formally documented sublet payment arrangements — under a single owner-facing portal with full transaction history.",
    ],
    painPoints: [
      {
        problem: "Guelph tenants in a sub-2% vacancy market know they hold negotiating leverage — informal payment arrangement requests ('I'll pay the 5th going forward') create undocumented deviations from the lease that undermine any future N4.",
        solution: "Pre-authorized debit from lease signing with zero informal payment arrangement acceptance — any rent date change documented in writing as a formal lease amendment, not a casual accommodation.",
      },
      {
        problem: "U of G students sometimes share units and pool payments informally, creating a patchwork of partial payment records that make it impossible to establish a clean arrears amount for LTB proceedings.",
        solution: "Single-party payment structure enforced from lease signing — all rent collected from the named lease signatory or guarantor, regardless of how tenants split costs internally.",
      },
      {
        problem: "Guelph landlords who wait 5–7 days after a missed payment to issue an N4 are extending their LTB timeline unnecessarily — in a city where hearing queues are long, first-day N4 issuance is a material financial benefit.",
        solution: "Automated payment monitoring triggers N4 workflow within 24 hours of a missed payment due date — 7-day cure period begins running immediately, LTB queue entry is earliest possible.",
      },
    ],
    benefits: [
      {
        title: 'Pre-Authorized Digital Collection',
        description: 'Rent debited automatically from day one — timestamped transaction records for every payment in every Guelph tenancy.',
        icon: 'check',
      },
      {
        title: 'Same-Day N4 Workflow',
        description: 'Missed payment triggers N4 drafting within 24 hours — 7-day cure period begins running immediately under Bill 60.',
        icon: 'clock',
      },
      {
        title: 'U of G Academic Calendar Management',
        description: 'September and January lease activations, summer sublet payment structures, and multi-tenant payment pooling — all handled under documented single-party collection.',
        icon: 'users',
      },
      {
        title: 'Owner Payment Portal',
        description: 'Real-time visibility into rent received, any arrears, LMR balance, and monthly income — accessible from anywhere.',
        icon: 'chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Payment Method Setup',
        description: 'Pre-authorized debit or digital payment established at lease signing — single named payer documented regardless of unit occupancy arrangement.',
      },
      {
        stepNumber: 2,
        title: 'Monthly Collection',
        description: 'Rent debited on the 1st, receipts generated, portal updated — no manual follow-up required from the landlord.',
      },
      {
        stepNumber: 3,
        title: 'Arrears Response',
        description: 'Failed payment triggers N4 notice workflow within 24 hours — 7-day cure period tracked with L1 filing prepared upon expiry.',
      },
      {
        stepNumber: 4,
        title: 'Year-End Reconciliation',
        description: 'Annual income summary, LMR disposition, and CRA T776-ready ledger delivered to every Guelph landlord.',
      },
    ],
    testimonial: {
      name: 'Maureen O\'Brien',
      city: 'Guelph',
      quote: "Guelph's tight market made our tenant think he could push payment dates whenever he wanted — he was never more than 10 days late but it was constant. MoveSmart's N4 process after the very first late payment set the right tone. In 16 months since, not one late payment.",
      outcome: 'Chronic informal late payment pattern eliminated immediately after first N4; 16 months of on-time payments',
    },
    faq: [
      {
        question: "Can I let a Guelph tenant pay on the 5th instead of the 1st without formal documentation?",
        answer: "You can change the payment date, but it must be documented as a formal lease amendment — not an informal accommodation. An undocumented date change means your N4, when you need to issue one, is based on a lease term that doesn't match actual practice, which can cause the notice to be challenged.",
      },
      {
        question: "How does the 7-day N4 cure period under Bill 60 change my timeline?",
        answer: "Under Bill 60, the cure period is 7 days from the N4 termination date (reduced from 15). If the tenant does not pay all arrears within 7 days, you can file an L1 immediately. MoveSmart issues N4s on Day 1 of non-payment — maximizing the benefit of this compressed timeline.",
      },
    ],
  },

  {
    citySlug: 'guelph',
    serviceSlug: 'maintenance-repair',
    heroHeadline: 'Guelph Maintenance — Heritage Stone Houses, Modern Townhouses, and a Tenant Base That Knows the RTA',
    heroSubheadline: "Guelph's diverse housing stock — from Victorian limestone to Kortright townhouses — requires contractors who know the difference, not a general handyman list.",
    localBodyParagraphs: [
      "Guelph's Downtown and Old University corridor contains some of Ontario's most distinctive rental housing stock: 19th-century limestone construction that predates the RTA by over a century. These heritage properties require specific maintenance expertise. Limestone repointing, heritage window repair, and period woodwork restoration cannot be handled by general contractors — and using the wrong tradespeople on a City of Guelph heritage-designated property can trigger compliance orders that are expensive and time-consuming to resolve. MoveSmart's Guelph contractor network includes tradespeople with verifiable heritage experience.",
      "The Kortright Hills and Westminster Woods corridor presents a completely different maintenance profile: 2000s-era townhouses with builder-grade finishes, post-tensioned slab foundations, and warranty-expired appliances approaching the 20-year mark. These units need proactive appliance lifecycle management — anticipating dishwasher, refrigerator, and washer/dryer replacements before they become emergency failures — and HVAC servicing to avoid the kind of heating system breakdowns that convert to LTB N1 applications from tenants who know their rights.",
      "Guelph tenants — particularly U of G students with Off-Campus Living advisors and OVC professionals with legal awareness — have notably high maintenance rights consciousness. A delayed repair response in Guelph does not just risk tenant dissatisfaction; it risks a T6 maintenance application or an N1 rent abatement claim. Documented maintenance response, photographic work records, and contractor invoice trails are standard operating procedure, not extra effort.",
    ],
    painPoints: [
      {
        problem: "Guelph's Victorian limestone rental properties in the Downtown and Old University corridor require heritage-experienced tradespeople — general contractors cause damage to the material and create City of Guelph heritage compliance exposure.",
        solution: "Heritage-specialist contractor network covering limestone repointing, heritage window repair, and period restoration work — with City of Guelph heritage protocol knowledge built in.",
      },
      {
        problem: "Kortright and Westminster Woods 2000s-era townhouses have appliances approaching end-of-life simultaneously — landlords without proactive replacement scheduling face clustered emergency repair costs.",
        solution: "Unit-level appliance lifecycle tracking with replacement budgeting — proactive scheduling before emergency failures, not reactive emergency dispatching at 2.5x the routine replacement cost.",
      },
      {
        problem: "U of G students advised by Off-Campus Living and OVC professionals will formally file T6 maintenance applications if documented response times are not maintained — informal 'we'll get to it' management creates LTB exposure.",
        solution: "Every maintenance request logged with timestamp, response committed within SLA, and completion photographed and documented — the paper trail that makes Guelph's rights-aware tenant base a non-issue.",
      },
    ],
    benefits: [
      {
        title: 'Heritage Property Contractor Network',
        description: 'Limestone-competent tradespeople with City of Guelph heritage protocol knowledge — no material damage, no compliance orders.',
        icon: 'home',
      },
      {
        title: 'Appliance Lifecycle Management',
        description: 'Unit-level appliance age tracking with proactive replacement scheduling — eliminating clustered emergency costs in Guelph\'s aging 2000s-era townhouse stock.',
        icon: 'clock',
      },
      {
        title: 'Documented Response SLA',
        description: '24-hour urgent and 72-hour non-urgent response commitments — logged and evidenced against T6 or N1 applications from Guelph\'s rights-aware tenant base.',
        icon: 'shield',
      },
      {
        title: 'Photographic Work Records',
        description: 'Every repair photographed before, during, and after — essential evidence for deposit disputes, insurance claims, and any LTB application.',
        icon: 'document',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Property Stock Assessment',
        description: 'Heritage designation status confirmed, appliance ages recorded, HVAC service history reviewed — before management begins.',
      },
      {
        stepNumber: 2,
        title: 'Proactive Maintenance Calendar',
        description: 'Annual HVAC service, appliance lifecycle review, and heritage element inspection scheduled and booked automatically each year.',
      },
      {
        stepNumber: 3,
        title: 'Request Triage and Dispatch',
        description: 'Tenant requests triaged by urgency and stock type; appropriate Guelph contractors dispatched within SLA with written confirmation to tenant.',
      },
      {
        stepNumber: 4,
        title: 'Documentation and Reporting',
        description: 'Work orders completed, photos taken, invoices processed, and costs itemized in monthly owner statement.',
      },
    ],
    testimonial: {
      name: 'Catherine Adebayo',
      city: 'Guelph',
      quote: "Our Victorian-era Guelph limestone house had specific heritage maintenance requirements we had no idea about. MoveSmart knew exactly which contractors understood the material and had the City's heritage protocols on file. The repointing was done correctly, no compliance issues, and our tenant was impressed by how professional the whole process was.",
      outcome: 'Heritage limestone repointing completed to City of Guelph standards with zero compliance issues',
    },
    faq: [
      {
        question: 'What makes Guelph limestone heritage properties different to maintain?',
        answer: "Guelph limestone is a soft, porous sedimentary stone that requires matching mortar compounds for repointing — standard concrete mortar causes accelerated erosion of the original stone. Heritage-designated properties also require City of Guelph approval for certain exterior alterations. Using contractors without limestone experience is a common and expensive mistake.",
      },
      {
        question: 'My Guelph tenants are U of G students — should I be more cautious about maintenance response times?',
        answer: "Yes. The Off-Campus Living office at U of G actively advises students on their maintenance rights under the RTA and the T6 application process. This is not theoretical — documented, timestamped maintenance response is your evidence if a student files a maintenance complaint. MoveSmart maintains written response records for every Guelph maintenance request.",
      },
    ],
  },

  {
    citySlug: 'guelph',
    serviceSlug: 'tenant-screening',
    heroHeadline: 'Screen Guelph Tenants Correctly When 9 Applicants Look Qualified',
    heroSubheadline: "Sub-2% vacancy generates 10–15 applications per Guelph unit — the challenge is not finding applicants, it's selecting correctly under pressure while maintaining OHRC compliance for every rejection.",
    localBodyParagraphs: [
      "Guelph's screening paradox is one of the most underappreciated risks in Ontario's rental market. When 10 or 12 or 15 applications arrive in the first week, landlords feel like they have unlimited choice. But under that abundance, the pressure to select quickly — before an applicant withdraws, before a competitor property accepts them — compresses the screening window dangerously. Corners get cut. Reference calls get skipped. Income verification gets replaced by 'they seem professional.' The tight market that should make landlords most selective makes many of them least careful.",
      "The OHRC risk in Guelph is specifically elevated because of the Off-Campus Living office's active role advising rejected U of G and OVC applicants. When a landlord rejects 10 applicants without documented, uniform criteria, any one of those rejected applicants has a viable OHRC complaint if they believe the rejection was based on a protected ground. Family status, source of income, ethnic origin, and disability are the most common protected grounds cited in Guelph rental complaints. Written scoring criteria applied identically to every applicant — before the first viewing — is the landlord's sole protection.",
      "Guelph's diverse applicant profiles require different verification approaches. Linamar and Boehringer Ingelheim employees provide T4 income and employer contact verification. Guelph General Hospital healthcare workers often present offer letters or paystubs. OVC graduate students may have stipends, research grants, or combination income sources requiring documentation review. GO Transit commuters with Toronto employment can verify via T4 and employer letters. International U of G graduate students may need guarantor structures. MoveSmart's screening protocols are built to handle all of these correctly — not default all non-T4 applicants to rejection.",
    ],
    painPoints: [
      {
        problem: "In Guelph's 10+ applicant environment, landlords skip reference calls on 'obviously qualified' applicants — the prior landlord reference is the highest-predictor check in the entire screening process and should never be skipped regardless of how strong the application looks on paper.",
        solution: "MoveSmart completes landlord reference calls on every shortlisted Guelph applicant — not just the apparent frontrunner — because prior landlord behaviour is the best predictor of the tenancy you're about to enter.",
      },
      {
        problem: "A Guelph landlord who rejected 9 applicants to accept the 10th has 9 potentially-adverse parties who could file OHRC complaints if any protected ground was involved in the decision — and without documented criteria, there is no defense.",
        solution: "Written scoring criteria established before the listing goes live — applied identically to all applicants — with documented rejection reasoning retained for every declined Guelph application.",
      },
      {
        problem: "Guelph General Hospital staff, OVC graduate researchers, and Boehringer Ingelheim biotech employees may have non-standard income documentation — landlords who default to 'must have T4 income' reject this qualified cohort and leave strong applicants on the table.",
        solution: "Non-standard income verification protocols: research stipend documentation review, offer letter income confirmation, and employer-certified income letters accepted as equivalent to T4 verification where appropriate.",
      },
    ],
    benefits: [
      {
        title: 'OHRC-Documented Screening Framework',
        description: 'Written criteria applied uniformly before listings go live — with documented rejection rationale for every Guelph applicant, not just the accepted one.',
        icon: 'shield',
      },
      {
        title: 'Mandatory Landlord Reference Calls',
        description: 'Prior landlord verification on every shortlisted Guelph applicant — the check most landlords skip in a tight market and most regret skipping later.',
        icon: 'users',
      },
      {
        title: 'Non-Standard Income Verification',
        description: 'Research stipends, employer offer letters, hospital paystubs, and OVC professional income — all verified under consistent protocols, not defaulted to rejection.',
        icon: 'document',
      },
      {
        title: '48-Hour Screening Completion',
        description: 'Full screening completed within 48 hours — speed and thoroughness maintained simultaneously in Guelph\'s competitive application environment.',
        icon: 'clock',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Criteria Established Pre-Listing',
        description: 'Written income threshold, credit benchmark, and reference requirements documented before the first Guelph applicant submits — uniform from the start.',
      },
      {
        stepNumber: 2,
        title: 'Application Collection',
        description: 'Standardized Guelph application capturing income documentation, rental history, employer contact, and references.',
      },
      {
        stepNumber: 3,
        title: 'Full Verification',
        description: 'Credit report, income verification, employer contact, and prior landlord reference call completed for every shortlisted applicant within 48 hours.',
      },
      {
        stepNumber: 4,
        title: 'Documented Decision Summary',
        description: 'Owner receives ranked applicant summary with full screening evidence and documented rationale — including rejection records for all declined applicants.',
      },
    ],
    testimonial: {
      name: 'Grant Fitzpatrick',
      city: 'Guelph',
      quote: "In Guelph's tight market we had 9 applicants who all looked qualified for one unit. MoveSmart's documented screening criteria protected us when one of the rejected applicants threatened a Human Rights complaint — we had written rationale for every single rejection decision. The complaint went nowhere.",
      outcome: 'OHRC complaint from rejected applicant dismissed because documented screening criteria were applied uniformly',
    },
    faq: [
      {
        question: 'Do I need to keep records of rejected applicants in Guelph?',
        answer: "Yes — and especially in Guelph's high-volume application market. The OHRC allows a rejected applicant to file a complaint claiming discrimination for up to 12 months after the rejection. Written screening criteria and documented rejection rationale are your evidence that the decision was based on legitimate, uniform factors — not a protected ground.",
      },
      {
        question: 'Can I require a guarantor for U of G student applicants?',
        answer: "You may require a guarantor when the applicant\'s income is insufficient to meet your stated threshold — but the threshold must be applied uniformly to all applicants, not just students. A 22-year-old professional with adequate income cannot be required to provide a guarantor just because they are young. The requirement must be income-based and consistently applied.",
      },
    ],
  },

  {
    citySlug: 'guelph',
    serviceSlug: 'lease-management',
    heroHeadline: 'Guelph Lease Management — Academic Schedules, Heritage Addenda, and Annual Rent Tracking',
    heroSubheadline: "Guelph's U of G academic calendar drives non-standard lease terms that standard Ontario leases don't address — and the rent increase tracking most landlords miss is worth hundreds of dollars annually.",
    localBodyParagraphs: [
      "Guelph's university-influenced rental market creates lease management requirements that distinguish it from purely professional tenant cities. Academic start dates (September and January), 8-month or 12-month lease options, and sublet provisions for the May-to-August period are all common requests from U of G tenants that require careful RTA-compliant drafting. An 8-month lease signed in September that ends in April does not automatically renew — it becomes month-to-month. If the landlord wants it to terminate in April, a proper N12 or mutual agreement in writing is required. These distinctions matter enormously in a market where April vacancy would persist through summer.",
      "Heritage properties in Guelph's Downtown and Old University corridor warrant a specific lease addendum. If the City of Guelph has a heritage designation on the property, certain alterations — exterior paint colours, window modifications, door replacements — require City approval. A tenant who alters a heritage element without authorization creates a compliance problem the landlord must resolve. A heritage addendum disclosing the designation, identifying restricted alterations, and requiring tenant acknowledgment is standard practice for heritage-designated Guelph rentals.",
      "Guelph's rent increase landscape follows Ontario's dual-tier system. Pre-November 2018 units are subject to the annual guideline (2.1% for 2026) — missing the 90-day N1 notice window means losing a full year's eligible increase. Post-November 2018 units are exempt and can be increased by any amount with proper 90-day N2 notice. Many Guelph landlords in the Kortright and Westminster Woods corridor own townhouses built in the 2000s that qualify for above-guideline increases but use the wrong notice form — an N1 on an exempt unit is void.",
    ],
    painPoints: [
      {
        problem: "Guelph U of G leases that end in April create summer vacancy risk if the termination procedure is not managed correctly — an improperly terminated 8-month lease becomes month-to-month when the landlord intended it to end.",
        solution: "Lease structure designed to match the intended term with proper RTA-compliant termination mechanisms — N11 mutual agreements, proper notice periods, and academic calendar timing built into the lease management workflow.",
      },
      {
        problem: "Heritage-designated properties in Guelph's Downtown and Old University corridors need lease addenda disclosing alteration restrictions — tenants who alter heritage elements without disclosure create City compliance problems the landlord must resolve.",
        solution: "Heritage property lease addendum identifying designation status, restricted exterior alterations, and City of Guelph approval requirements — signed by tenant before occupancy.",
      },
      {
        problem: "Kortright and Westminster Woods townhouse landlords regularly use N1 (guideline increase) notices on post-2018 exempt units — a void notice that must be re-served as N2 with 90 days' notice, delaying the increase by months.",
        solution: "Unit construction date and exemption status tracked in MoveSmart's system — correct form (N1 or N2) generated automatically with accurate amounts and properly calculated notice deadlines.",
      },
    ],
    benefits: [
      {
        title: 'Academic Calendar Lease Structuring',
        description: 'September and January term start leases, 8-month and 12-month options, and sublet provisions — drafted RTA-compliantly for Guelph\'s U of G rental context.',
        icon: 'document',
      },
      {
        title: 'Heritage Alteration Addendum',
        description: 'City of Guelph heritage designation disclosure, restricted alteration identification, and tenant acknowledgment — standard on every Downtown and Old University heritage property lease.',
        icon: 'home',
      },
      {
        title: 'Automated Rent Increase Tracking',
        description: 'Construction date, exemption status, and 12-month eligibility tracked — N1 or N2 generated on schedule with zero missed opportunities.',
        icon: 'clock',
      },
      {
        title: 'Renewal and Retention Management',
        description: '90-day renewal outreach, market rent analysis for Guelph corridors, and documentation — retaining Guelph\'s professional and graduate tenant base before they explore alternatives.',
        icon: 'star',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Lease Package Preparation',
        description: 'Ontario Standard Lease plus Guelph-specific addenda: heritage disclosure if applicable, pet protection provisions, academic term structure if relevant.',
      },
      {
        stepNumber: 2,
        title: 'Execution and Documentation',
        description: 'Digital signing, ID verification, LMR collection, and guarantor documentation for applicable U of G tenancies.',
      },
      {
        stepNumber: 3,
        title: 'Mid-Tenancy Compliance',
        description: 'Sublet and assignment requests handled through RTA-compliant process; heritage alteration requests reviewed against City of Guelph requirements.',
      },
      {
        stepNumber: 4,
        title: 'Renewal or Termination',
        description: '90-day renewal outreach, N1 or N2 drafting on schedule, and Guelph market rent repositioning at renewal.',
      },
    ],
    testimonial: {
      name: 'Roberta Sinclair',
      city: 'Guelph',
      quote: "Our lease had a standard pet clause but MoveSmart added specific provisions protecting our hardwood floors — pet deposit structure, cleaning requirements, and damage documentation. When the tenant moved out with a dog that had been in the unit, those provisions saved us $3,200 in a security deposit dispute.",
      outcome: '$3,200 in hardwood floor damage recovered through lease provisions that standard templates don\'t include',
    },
    faq: [
      {
        question: 'Can I offer an 8-month lease to a U of G student that ends in April?',
        answer: "Yes — a fixed-term lease of any length is permitted under the RTA. However, at the end of the fixed term the tenancy does not automatically end; it converts to month-to-month unless you have served proper notice or the tenant has given written notice to vacate. If you want the tenancy to end in April, a signed N11 or mutual termination agreement is required.",
      },
      {
        question: 'My Kortright townhouse was built in 2004 — am I subject to rent control?',
        answer: "No. Units first occupied after November 15, 2018 are exempt from the annual guideline. If your 2004 townhouse was already occupied before that date (which it almost certainly was), it is subject to the guideline — 2.1% for 2026. The determination is based on the first occupancy date of the specific unit, not the building construction date.",
      },
    ],
  },

  {
    citySlug: 'guelph',
    serviceSlug: 'financial-reporting',
    heroHeadline: 'Guelph Rental Financial Reporting — Track Your Returns in One of Ontario\'s Tightest Markets',
    heroSubheadline: "Guelph's sub-2% vacancy delivers consistent occupancy — but without detailed financial reporting, landlords don't know if Gordon Street and Kortright units are earning what the market should deliver.",
    localBodyParagraphs: [
      "Guelph's tight market creates a financial visibility paradox: consistent occupancy makes landlords feel their investment is performing well, even when rent is below the neighbourhood benchmark, maintenance costs are above average, and annual guideline increase opportunities are being missed. Monthly NOI reporting is the only way to confirm that a Guelph property is actually capturing what the market offers — not just keeping someone in the unit. MoveSmart's reporting specifically benchmarks reported rents against active Guelph corridor comparables at each annual review.",
      "Guelph's investment property landscape spans several distinct cost profiles. Downtown heritage limestone properties carry higher maintenance costs and specialized contractor rates. Kortright and Westminster Woods townhouses have lower maintenance per unit but higher Guelph Transit noise exposure affecting tenant retention in some blocks. Hanlon Creek investment properties tied to light industrial employment have a different vacancy risk profile than U of G-adjacent units. Each neighbourhood has its own NOI math — a single Guelph-wide average is not meaningful for any specific landlord.",
      "CRA's rental income audit activity has increased nationally, with particular attention to Guelph-area investors who previously operated properties as short-term rentals under Airbnb or VRBO and have since transitioned to long-term tenancy. Income from STR operations, LMR held across multiple years, and management fee deductions are all areas where clean, categorized annual records are the difference between a straightforward T776 filing and a prolonged CRA review.",
    ],
    painPoints: [
      {
        problem: "Guelph landlords with consistently occupied units assume they are performing at market — without rent benchmarking against Kortright or Gordon Street comparables, below-market rents can persist for years unnoticed.",
        solution: "Annual rent benchmarking against active Guelph corridor comparables built into MoveSmart's year-end financial review — identifying below-market rents and the renewal notice strategy to address them.",
      },
      {
        problem: "Guelph properties transitioning from STR to long-term rental have mixed income histories — STR earnings, LMR collection, and first long-term rent all in the same tax year — creating CRA T776 complexity without organized records.",
        solution: "Income categorized by type and date from the first transaction — STR income, LMR receipt, and long-term rent separately tracked and CRA-ready with appropriate deduction classifications.",
      },
      {
        problem: "Guelph heritage property maintenance costs — specialized limestone contractors, heritage window repair — run significantly above standard property benchmarks, and landlords without category-level cost tracking cannot see whether costs are on track or exceeding projections.",
        solution: "Category-level maintenance cost tracking (structural heritage, plumbing, HVAC, cosmetic) with year-over-year comparison — early visibility when Guelph heritage properties exceed maintenance budgets.",
      },
    ],
    benefits: [
      {
        title: 'Monthly NOI Statements',
        description: 'Gross rent, vacancy, maintenance, and net operating income — one report every month for every Guelph property.',
        icon: 'chart',
      },
      {
        title: 'Corridor Rent Benchmarking',
        description: 'Annual benchmarking against active Guelph listings by neighbourhood — Gordon Street, Kortright, Downtown, Hanlon Creek — not city-wide averages.',
        icon: 'star',
      },
      {
        title: 'Heritage Maintenance Cost Tracking',
        description: 'Category-level expense tracking for Guelph heritage properties — identifying specialized contractor costs versus standard maintenance spend.',
        icon: 'home',
      },
      {
        title: 'CRA-Ready Annual Ledger',
        description: 'Income and expenses organized by category and property — T776 preparation simplified at year-end, STR-to-long-term transitions cleanly documented.',
        icon: 'document',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Ledger Setup',
        description: 'Income and expense tracking established from first transaction — category structure aligned with CRA T776 deduction requirements.',
      },
      {
        stepNumber: 2,
        title: 'Monthly Reporting',
        description: 'Owner portal updated monthly with income statement, vacancy metric, and cost breakdown by category.',
      },
      {
        stepNumber: 3,
        title: 'Annual Performance Analysis',
        description: 'Year-over-year NOI comparison, corridor rent benchmarking, and rent increase opportunity identification.',
      },
      {
        stepNumber: 4,
        title: 'Tax Package',
        description: 'Year-end income and expense summary with CRA deduction categorization for T776 filing — STR income and LMR transitions separately documented.',
      },
    ],
    testimonial: {
      name: 'Andrew Kowalski',
      city: 'Guelph',
      quote: "MoveSmart's monthly reports showed our Gordon Street property was $200/month below what comparable Kortright units were achieving. We repositioned the rent at renewal with a proper N1, captured the difference, and the tenant stayed — they knew the market too and understood the increase was fair.",
      outcome: '$200/month below-market rent identified and corrected at renewal; tenant retained at benchmark rent',
    },
    faq: [
      {
        question: 'What Guelph-specific expenses can I deduct against rental income?',
        answer: "All standard allowable deductions: mortgage interest, property taxes, insurance, maintenance and repairs, management fees, and advertising costs. For Guelph heritage properties, specialized heritage contractor costs are fully deductible as repairs when they restore rather than improve the property. Consult your accountant on capital vs. current expense classification for heritage restoration projects.",
      },
      {
        question: 'How does a Guelph STR-to-long-term-rental transition affect my tax filing?',
        answer: "The year you transition from STR to long-term rental, you may have both STR income (business income, Schedule T2125) and long-term rental income (property income, T776) in the same year. These are reported on different CRA schedules. Clean records separating the two income streams from the transition date are essential — MoveSmart establishes this tracking at the point of transition.",
      },
    ],
  },

  {
    citySlug: 'guelph',
    serviceSlug: 'eviction-services',
    heroHeadline: 'Guelph LTB Applications — Perfect N4s in a Market Where Tenants Know Their Rights',
    heroSubheadline: "Guelph's U of G and OVC tenant base is Ontario's most rights-aware — when eviction proceedings are necessary, procedural precision is the difference between a resolved file and a years-long LTB delay.",
    localBodyParagraphs: [
      "Guelph's eviction risk profile is shaped by its tenant demographics. U of G students who default sometimes do so mid-academic year — March and April exam periods generate an unusual pattern of abandonment without formal notice, when students simply leave for the summer and stop paying. OVC students completing multi-year programs occasionally vacate before the program end when placements materialize elsewhere. These mid-tenancy departures require specific documentation procedures — abandonment confirmation, entry procedures, and LTB filing — to protect the landlord's ability to re-lease and claim any unpaid rent.",
      "The more legally complex Guelph eviction scenario involves the retaliatory application. When a landlord issues an N4 in a market where the tenant knows they can find another unit in 48 hours (sub-2% vacancy), some tenants file T6 maintenance applications or T2 right-of-entry applications in response — not because of genuine violations, but as procedural leverage to delay or complicate the eviction proceeding. A property manager with complete maintenance documentation, communication logs, and a clean RTA-compliant lease record is the most effective counter to this tactic.",
      "Guelph's LTB hearing queue, like all Ontario boards, runs months from filing to hearing. This makes procedural accuracy at every step — from correct N4 amounts to proper service documentation to L1 filing completeness — not a quality preference but a financial necessity. A rejected or dismissed N4 that must be re-served resets the clock entirely, extending the timeline by weeks in a city where re-listing after a resolved vacancy takes days, not months.",
    ],
    painPoints: [
      {
        problem: "U of G students who abandon Guelph units during exam periods (March–April) without formal notice create an ambiguous legal status — is the unit abandoned or has the tenant simply gone home for exams? Proceeding incorrectly in either direction creates liability.",
        solution: "Abandonment investigation protocol: documented follow-up attempts, entry procedure under RTA s.26, condition assessment, and abandoned-property documentation before any re-listing — creating the evidence record for any subsequent LTB arrears claim.",
      },
      {
        problem: "Guelph tenants who receive N4 notices sometimes file retaliatory T6 maintenance applications — landlords without documented maintenance response histories are poorly positioned to defend these proceedings at the LTB.",
        solution: "MoveSmart's maintenance logs, tenant communication records, and response SLA documentation provide a complete counter-evidence package for any retaliatory T6 application filed in response to a Guelph eviction notice.",
      },
      {
        problem: "Technical N4 errors — incorrect outstanding amounts, wrong termination date calculations, improper service methods — are the most common reason Guelph LTB applications are delayed, dismissed, or re-filed, adding months to an already-long hearing queue.",
        solution: "N4 drafted from verified rent ledger with precisely calculated outstanding amount, correct 7-day termination date, and documented service method — no technical errors that restart the Guelph LTB clock.",
      },
    ],
    benefits: [
      {
        title: 'Abandonment Investigation Protocol',
        description: 'Documented follow-up, RTA-compliant entry, condition assessment, and abandoned-property records — protecting re-listing and rent recovery after mid-year U of G departures.',
        icon: 'document',
      },
      {
        title: 'Retaliatory Application Defense',
        description: 'Complete maintenance records and communication logs countering T6 or T2 applications filed as leverage in response to Guelph eviction notices.',
        icon: 'shield',
      },
      {
        title: 'N4 Drafted Correctly First Time',
        description: 'Precise amounts, correct 7-day termination date, documented service — no technical errors that reset the LTB clock in Guelph\'s already-long hearing queue.',
        icon: 'check',
      },
      {
        title: 'Prompt L1 Filing',
        description: 'L1 application filed immediately upon N4 cure period expiry — earliest possible position in Guelph\'s LTB queue.',
        icon: 'clock',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Arrears Identification',
        description: 'Rent ledger verified, outstanding amount confirmed, and N4 drafted with precise figures before service.',
      },
      {
        stepNumber: 2,
        title: 'N4 Service',
        description: 'N4 served by documented method (personal, mail, or digital under RSLA rules); service date and method recorded.',
      },
      {
        stepNumber: 3,
        title: 'Cure Period Monitoring',
        description: '7-day cure period tracked daily; any partial payment documented; L1 application prepared for filing upon expiry without payment.',
      },
      {
        stepNumber: 4,
        title: 'LTB Filing and Hearing Preparation',
        description: 'L1 filed with complete evidence package; abandonment protocol initiated if applicable; hearing representation coordinated with Guelph LTB queue.',
      },
    ],
    testimonial: {
      name: 'Thomas Wetherspoon',
      city: 'Guelph',
      quote: "An OVC student abandoned the unit in March during exam period without any notice — just stopped paying and left. MoveSmart documented the abandonment correctly, filed all the right paperwork, re-listed, and had the unit filled in 8 days. We recovered most of the unpaid rent through the LTB claim.",
      outcome: 'OVC student abandonment resolved with correct documentation; unit re-listed and filled in 8 days',
    },
    faq: [
      {
        question: 'What do I do if a U of G student just stops responding and I think they\'ve abandoned the unit?',
        answer: "You cannot simply re-enter and re-let the unit. Under the RTA, you must follow the abandonment investigation procedure: document failed contact attempts, enter the unit under s.26 (after proper notice), assess the condition and belongings, and confirm the abandonment in writing before treating the tenancy as ended. MoveSmart follows this protocol precisely — skipping any step creates landlord liability.",
      },
      {
        question: 'Can I refuse to accept partial rent after I\'ve served an N4 in Guelph?',
        answer: "Accepting partial rent after N4 service voids the notice — you must re-serve with a corrected amount and the 7-day period restarts. MoveSmart does not accept partial rent after an N4 is served without explicit written documentation of how the partial payment is being treated. This is the most common procedural error that extends Guelph LTB timelines.",
      },
    ],
  },
]
