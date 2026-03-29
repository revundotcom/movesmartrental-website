import type { CityServiceContent, CityDescription } from './batch-1'

export const cityDescriptions: CityDescription[] = [
  {
    citySlug: 'london',
    descriptionParagraphs: [
      "London is Ontario's most affordable major rental market, with 1BR units averaging $1,504–$1,637/month — the lowest among large Ontario cities. That affordability hasn't protected it from disruption: London recorded Ontario's highest purpose-built rental vacancy rate of 4.0% in 2025, driven by a collapse in international student enrollment at Western University (38,000 enrolled) and Fanshawe College (24,000). Over 2,500 new purpose-built units completed between January and September 2025 alone, flooding the market with supply that older properties must now compete against on price and amenity.",
      "London's economic backbone is healthcare and education. London Health Sciences Centre and St. Joseph's Health Care combined employ over 15,000 workers across two major campuses — creating year-round rental demand from nurses, technicians, and administrative staff that buffers seasonal academic swings. Western University adds 5,000+ direct employees. The manufacturing sector — 3M Canada HQ, General Dynamics, Trojan Technologies along the Highway 401 corridor — provides stable blue-collar rental demand in South and East London. These professional cohorts are London's most reliable tenants.",
      "The student market that defined London's rental dynamics for decades has fundamentally shifted. Western's Off-Campus Housing office has formally documented a rise in fraudulent listings and predatory landlord practices, creating tenant skepticism toward private landlords. Academic-year leases (September–August) still dominate near campus but are harder to fill than any point since 2018. Landlords who adapt — targeting healthcare workers, marketing professionally, timing lease renewals correctly — are outperforming those still relying on a student pipeline that no longer flows reliably.",
    ],
    transitInfo: 'LTC 26 bus routes. No rapid transit yet (BRT under EA review). VIA Rail: London to Toronto Union ~2 hours (major hub on Toronto-Windsor corridor). No GO service — London is outside the GO network. Car: 2 hours to Toronto via Highway 401.',
    neighbourhoods: ['Old North / Western', 'Downtown London', 'Fanshawe College Area (NE)', 'Masonville / North London', 'White Oaks / South London', 'Lambeth / Byron'],
  },
]

export const cityServiceContent: CityServiceContent[] = [
  {
    citySlug: 'london',
    serviceSlug: 'tenant-placement',
    heroHeadline: 'Fill Your London Rental Months Before the September Rush',
    heroSubheadline: 'Academic-calendar lease scheduling means your Old North or Masonville property has a confirmed tenant while competitors scramble in August.',
    localBodyParagraphs: [
      "London's rental market runs on an academic clock. Western University and Fanshawe College students sign leases for September move-in between February and April — the most competitive applications arrive months before summer. Landlords who wait until July to list find themselves competing against hundreds of units with no urgency from tenants. The window to attract top-tier applicants is narrow, and missing it means 8–10 months of vacancy.",
      "The 2025 enrollment decline at Western changed the calculus further. With 2,500+ new purpose-built units entering the market, London's purpose-built vacancy climbed to 4.0% — Ontario's highest. New supply skews toward modern finishes and in-suite laundry. Older properties near campus or in Old North must compete on timing, pricing, and professional presentation or lose qualified tenants to newer stock at similar price points.",
      "The most resilient tenant pool in London is not students — it's healthcare workers. London Health Sciences Centre and St. Joseph's combined employ 15,000+ people who need year-round housing, have stable employment income, and don't leave annually. Targeting LHSC nurses, respiratory therapists, and Masonville-area hospital staff generates the most durable occupancy London landlords can achieve in today's market.",
    ],
    painPoints: [
      {
        problem: "Western University's international enrollment collapsed post-2024, leaving investor units near campus vacant through summer — the student pipeline that drove near-zero vacancy in 2019–2022 no longer reliably fills units.",
        solution: 'MoveSmart pivots London listings toward LHSC and St. Joseph\'s healthcare workers and Western/Fanshawe staff — stable year-round tenants unaffected by enrollment swings.',
      },
      {
        problem: '2,500+ new purpose-built units flooded London in 2025, each offering modern finishes, in-suite laundry, and first-month-free incentives — older properties cannot compete on amenity alone.',
        solution: 'Strategic pricing and early-cycle listing (February for September availability) captures qualified applicants before they choose new-build alternatives.',
      },
      {
        problem: "London's annual September lease cycle means landlords who miss the April signing window face an 8–10 month wait until the next viable tenant demand cycle begins.",
        solution: 'MoveSmart begins listing for September occupancy in February, securing qualified tenants 5–6 months in advance — the same strategy institutional London landlords use.',
      },
    ],
    benefits: [
      { title: 'Academic Calendar Expertise', description: 'February listing for September occupancy — securing qualified tenants before London\'s competitive summer rush begins.', icon: 'clock' },
      { title: 'Healthcare Worker Pipeline', description: 'Targeting LHSC and St. Joseph\'s employees: stable income, year-round housing need, and multi-year lease intent.', icon: 'users' },
      { title: 'Supply-Aware Pricing', description: 'Real-time benchmarking against new purpose-built completions so your unit isn\'t overpriced in a 4% vacancy market.', icon: 'chart' },
      { title: 'OHRC-Compliant Screening', description: 'Objective criteria protecting London landlords from human rights complaints while selecting the strongest applicants.', icon: 'shield' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'February Listing Launch', description: 'We photograph and list your property in February, targeting the academic-calendar demand window before April competition peaks.' },
      { stepNumber: 2, title: 'Multi-Channel Marketing', description: "Western's official off-campus housing registry, LHSC employee bulletin boards, Kijiji, and Facebook Marketplace — local reach, not generic posting." },
      { stepNumber: 3, title: 'Full Applicant Screening', description: 'Equifax/TransUnion credit reports, employment verification, and reference checks completed within 48 hours — thorough and fast.' },
      { stepNumber: 4, title: 'Lease Execution', description: 'Ontario Standard Lease with London-specific provisions, move-in inspection documented, and first rent collected before key handover.' },
    ],
    testimonial: {
      name: 'David Fontaine',
      city: 'London',
      quote: 'Listed our Old North property ourselves for 2 months with no takers. MoveSmart repackaged it, targeted LHSC nurses, and tenanted it in 8 days at $2,200/mo.',
      outcome: '8-day placement at $2,200/mo targeting healthcare workers instead of students',
    },
    faq: [
      { question: 'When is the best time to list a rental near Western University?', answer: 'February through April. London\'s academic lease cycle means students and young professionals searching for September occupancy lock in housing 5–6 months early. Units listed in June compete against dozens of others with no urgency.' },
      { question: 'Can I still fill my London unit if I missed the spring listing window?', answer: 'Yes, by pivoting to non-student tenants. Healthcare workers at LHSC and St. Joseph\'s, Western University staff, and downtown professionals move year-round. MoveSmart targets these cohorts regardless of season.' },
      { question: "How does London's 4% vacancy rate affect my pricing strategy?", answer: 'It means you cannot price at 2022–2023 levels without extended vacancy. MoveSmart benchmarks against current completions — including new purpose-built units offering incentives — and prices your unit to attract qualified applicants quickly.' },
      { question: 'What makes London tenants different from GTA tenants?', answer: "London's dominant renter cohorts are students and healthcare workers, not corporate professionals. Screening criteria, lease structures (academic-year terms), and marketing channels are different from a Toronto condo investor's approach." },
    ],
  },
  {
    citySlug: 'london',
    serviceSlug: 'property-management',
    heroHeadline: 'London Property Management That Keeps Tenants Through Soft Markets',
    heroSubheadline: "When new purpose-built rentals offer first-month free, your management quality determines whether tenants renew or leave.",
    localBodyParagraphs: [
      "London's surplus rental supply — 2,500+ units delivered in 2025 — created a new reality: tenants have options. A tenant who experiences slow maintenance responses or unclear lease terms can now move to a professionally-managed new-build at a comparable price. Management quality is now a tenant retention tool, not just a compliance requirement.",
      "London's student housing carries legacy risk. Annual turnovers mean move-out inspections must be thorough and documented — without professional inspection and deposit reconciliation, landlords absorb damage costs or end up in LTB proceedings over undocumented pre-existing conditions. Western's Off-Campus Housing office has flagged a rise in predatory landlord practices, meaning tenants arrive legally informed and ready to file complaints.",
      'For non-student properties, London\'s financial management requirements are growing. Rising operating costs — maintenance on aging pre-1990s stock, property tax increases, insurance growth — are squeezing margins while achievable rents decline. Financial performance monitoring and proactive vendor management are the difference between positive cash flow and a loss on a London rental property in 2025.',
    ],
    painPoints: [
      {
        problem: "London's 2,500+ new purpose-built units offer modern amenities and incentives — older properties that don't compete on management quality and responsiveness lose tenants at renewal to buildings offering better service.",
        solution: "MoveSmart's maintenance response SLAs and proactive tenant communication create retention advantages that keep vacancy low even in a soft London market.",
      },
      {
        problem: 'Annual student lease turnovers without professional move-out inspections lead to damage disputes, deposit withholding applications, and LTB proceedings that cost more than the repair itself.',
        solution: 'Documented move-in/move-out inspections, photographic evidence, and proper deposit reconciliation prevent every London student-housing dispute before it starts.',
      },
      {
        problem: "London's operating costs are rising while rents decline — landlords who aren't tracking maintenance spend and vacancy-adjusted NOI have no visibility into whether their property is actually performing.",
        solution: 'Monthly financial reporting with income, expense, and vacancy metrics gives London landlords the data to make informed management decisions.',
      },
    ],
    benefits: [
      { title: 'Tenant Retention Focus', description: "Proactive communication and fast maintenance response — the key differentiators when tenants can choose new purpose-built London alternatives at similar rents.", icon: 'star' },
      { title: 'Annual Turnover Management', description: 'Student lease cycle expertise: spring inspection scheduling, deposit reconciliation, and rapid unit-readiness turnaround between academic tenancies.', icon: 'home' },
      { title: 'Vendor Cost Control', description: "London contractor network keeping maintenance costs competitive — critical when rents are declining and operating margins are tight.", icon: 'chart' },
      { title: 'Full Compliance Documentation', description: 'RTA-compliant notices, rent increase tracking, and lease records maintained to standard — protecting against LTB applications.', icon: 'document' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Property Audit', description: 'We inspect your unit, document current condition, and identify maintenance items that affect tenant retention or create bylaw exposure.' },
      { stepNumber: 2, title: 'Tenant Onboarding', description: 'Move-in inspection, photographic documentation, utility transfer coordination, and lease orientation for every new tenancy.' },
      { stepNumber: 3, title: 'Ongoing Management', description: 'Maintenance dispatch, rent collection, tenant communication, and compliance tracking handled month-to-month.' },
      { stepNumber: 4, title: 'Annual Review', description: 'Financial performance report, rent increase analysis (guideline vs. exempt), and lease renewal strategy aligned with London market conditions.' },
    ],
    testimonial: {
      name: 'Priya Sharma',
      city: 'London',
      quote: 'Our Masonville condo had two student damage disputes in two years. MoveSmart implemented proper move-in inspections and we have not had a single deposit dispute since.',
      outcome: 'Zero deposit disputes after implementing documented inspection protocol across two academic year turnovers',
    },
    faq: [
      { question: "How does London's student rental turnover affect management costs?", answer: 'Annual turnovers mean 1–2 weeks of vacancy plus cleaning, minor repairs, and re-listing costs. MoveSmart minimizes these with pre-move-out inspections, deposit management, and pre-signed replacement leases before the current tenant vacates.' },
      { question: 'Is London\'s older housing stock harder to manage than newer condos?', answer: 'Older properties have higher maintenance frequency but lower condo fee costs. The key is having a contractor network that responds quickly to plumbing, electrical, and heating issues common in pre-1990s London housing stock.' },
      { question: 'What happens if my London tenant stops paying rent?', answer: 'We serve an N4 notice (7-day cure period under Bill 60) immediately upon arrears confirmation, document all communications, and file an L1 application at the LTB within 1 week of the N4 deadline if rent is not received.' },
    ],
  },
  {
    citySlug: 'london',
    serviceSlug: 'rent-collection',
    heroHeadline: 'Automated Rent Collection for London Rentals — Zero Missed Payments',
    heroSubheadline: "London's student and young professional tenant base responds to digital payment — paper cheques and informal transfers create arrears risk.",
    localBodyParagraphs: [
      "London's dominant tenant cohort — students and early-career professionals — uses digital banking as default. Tenants who pay by pre-authorized debit or digital payment are statistically less likely to have arrears than those on informal cheque arrangements. MoveSmart standardizes payment methods from lease signing, eliminating the friction that produces missed payments in student-heavy rental markets.",
      "In a 4% vacancy market, tenant turnover is already a financial burden. The second financial leak is undocumented rent collection: informal cash payments, missed receipts, and undocumented arrears arrangements create legal exposure the moment a tenant files an LTB application claiming they paid. Digital collection with timestamped records eliminates this risk entirely.",
    ],
    painPoints: [
      {
        problem: 'London students frequently pay rent by cheque or informal e-transfer with no tracking — when arrears develop, there is no payment history to document for an LTB L1 application.',
        solution: 'MoveSmart implements pre-authorized digital payment from lease signing, creating a complete timestamped payment record admissible at the LTB.',
      },
      {
        problem: 'Student tenants sometimes attempt to use their last-month rent deposit as their final month\'s payment — a common misunderstanding that leaves London landlords in arrears without recourse.',
        solution: 'We track LMR separately and communicate clearly at lease signing that LMR is not a final-month payment, serving proper N4 notices if this occurs.',
      },
      {
        problem: "London's academic lease year means August is simultaneously last-month and move-out — without systematic tracking, August rent collection creates confusion and missed payments.",
        solution: 'Automated August rent collection with lease expiry flagging ensures rent and deposit reconciliation are handled simultaneously at academic year-end.',
      },
    ],
    benefits: [
      { title: 'Digital-First Collection', description: 'Pre-authorized debit from day one — no cheques, no informal transfers, no missed tracking in London student rentals.', icon: 'check' },
      { title: 'Complete Payment History', description: 'Timestamped records of every payment, LMR tracking, and arrears documentation ready for LTB filing if needed.', icon: 'document' },
      { title: 'Academic Year Cycle Management', description: 'August lease-end rent and deposit reconciliation handled systematically — no confusion between LMR and damage deposits.', icon: 'clock' },
      { title: 'Arrears Response Protocol', description: 'N4 notice served within 1 business day of missed payment — 7-day cure period tracked and L1 filed promptly if unresolved.', icon: 'shield' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Payment Setup at Lease Signing', description: 'Pre-authorized debit established before keys are handed over — no cash, no cheques.' },
      { stepNumber: 2, title: 'Monthly Automated Collection', description: 'Rent debited on the 1st of each month, receipts auto-generated, and payment logs updated in your owner portal.' },
      { stepNumber: 3, title: 'Arrears Monitoring', description: 'NSF and failed payment notifications trigger N4 notice workflow within 24 hours — no delays in protecting your income.' },
      { stepNumber: 4, title: 'LMR and Deposit Reconciliation', description: 'Last month\'s rent tracked separately; at lease end, reconciled against any outstanding charges with proper documentation.' },
    ],
    testimonial: {
      name: 'Claire Beaumont',
      city: 'London',
      quote: 'A Western student short-paid rent in October and I had no idea what to do. MoveSmart had the N4 out in a day and the full amount collected by November. No LTB needed.',
      outcome: 'Arrears resolved via N4 protocol without LTB application required',
    },
    faq: [
      { question: 'Can London student tenants pay rent digitally?', answer: 'Yes — most London student tenants use digital banking and prefer e-transfer or pre-authorized debit. MoveSmart standardizes payment method at lease signing.' },
      { question: 'What happens if my tenant tries to use their LMR deposit as last month\'s rent?', answer: 'We communicate upfront at lease signing that LMR is held separately. If a tenant refuses to pay final-month rent, we serve an N4 immediately and file an L1 if unresolved within 7 days.' },
      { question: 'How quickly do you act on missed rent in London?', answer: 'Within 1 business day. Under Bill 60, N4 notices now have a 7-day cure period (reduced from 15). We serve immediately and track the deadline.' },
    ],
  },
  {
    citySlug: 'london',
    serviceSlug: 'maintenance-repair',
    heroHeadline: 'Fast-Response Maintenance for London Rentals — Old Stock, New Standards',
    heroSubheadline: "London's pre-1990s rental housing dominates — proactive maintenance is the difference between retaining tenants and losing them to new-build alternatives.",
    localBodyParagraphs: [
      "London's rental stock skews older than most Ontario cities. Pre-1990s construction is common in Old North, Byron, and East London — these properties have excellent bones but require proactive HVAC servicing, plumbing monitoring, and electrical panel awareness. A furnace failure in February costs the same as a full year of professional maintenance management and destroys tenant trust in one event.",
      "In a 4% vacancy market, maintenance responsiveness is a retention tool. London tenants who experience 48-hour repair responses are far less likely to explore new-build alternatives at lease renewal. The reverse is equally true — a tenant in an older London property who waits two weeks for a repair call-back is motivated to leave, triggering the vacancy costs London landlords can least afford right now.",
    ],
    painPoints: [
      {
        problem: "London's pre-1990s rental stock has aging plumbing and HVAC systems — reactive maintenance means emergency repairs at premium costs, tenant complaints, and potential bylaw officer involvement.",
        solution: "MoveSmart's seasonal HVAC service schedule, annual plumbing inspection, and pre-winter furnace servicing prevent the emergency calls that cost 3x routine maintenance.",
      },
      {
        problem: "In a 4% vacancy market, a 2-week maintenance response drives London tenants to new-build alternatives at lease renewal — even if the unit is otherwise fine.",
        solution: '24-hour response SLA for urgent issues, 72-hour for non-urgent — communicated to tenants at move-in so expectations are set correctly.',
      },
      {
        problem: 'Student tenants in London routinely perform minor repairs themselves without notifying the landlord, voiding warranties and creating undocumented property changes.',
        solution: 'Lease schedule clearly defines tenant vs. landlord maintenance responsibilities, with a simple reporting process that makes it easy for tenants to notify rather than fix themselves.',
      },
    ],
    benefits: [
      { title: 'Pre-1990s Property Expertise', description: 'Contractor network experienced with older London housing stock — not sending general handymen to investigate knob-and-tube concerns.', icon: 'home' },
      { title: '24-Hour Urgent Response', description: 'Emergency line active for heating failure, water intrusion, and security issues — protecting tenant safety and your legal obligations.', icon: 'clock' },
      { title: 'Proactive Seasonal Servicing', description: 'Pre-winter furnace checks, spring plumbing inspections, and annual smoke/CO detector testing — before problems become emergencies.', icon: 'check' },
      { title: 'Documented Repair Records', description: 'Every work order dated, scoped, photographed, and recorded — essential evidence for deposit disputes and LTB proceedings.', icon: 'document' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Property Condition Assessment', description: 'Initial walkthrough identifying deferred maintenance items, safety compliance gaps, and priority repair sequence.' },
      { stepNumber: 2, title: 'Seasonal Maintenance Schedule', description: 'Pre-winter HVAC servicing, spring plumbing inspection, and summer exterior review booked automatically each year.' },
      { stepNumber: 3, title: 'Tenant-Reported Issue Triage', description: 'Tenants submit maintenance requests via portal or phone; triaged by urgency and dispatched within SLA timeframes.' },
      { stepNumber: 4, title: 'Vendor Dispatch and Documentation', description: 'Licensed London contractors dispatched, work orders issued, completion photos taken, and costs reported to owner monthly.' },
    ],
    testimonial: {
      name: 'James Whitmore',
      city: 'London',
      quote: 'Our furnace failed in December and our old property manager took 4 days to respond. MoveSmart had an HVAC tech on site in 6 hours and the tenant never even complained about inconvenience.',
      outcome: '6-hour emergency HVAC response preventing tenant complaint and bylaw investigation',
    },
    faq: [
      { question: "Is London's older housing stock more expensive to maintain?", answer: 'Per-year costs are higher than new condos, but well-maintained older properties in Old North or Byron command above-average rents for their size. Proactive maintenance is an investment, not just a cost.' },
      { question: 'What are London landlords legally required to maintain?', answer: 'Ontario landlords must maintain rental units in good repair — including heating (minimum 20°C from Sep 15 to Jun 1), working plumbing, pest-free condition, and functional smoke and CO detectors.' },
      { question: 'What happens if a tenant damages the unit and claims it was pre-existing?', answer: "MoveSmart's documented move-in inspection with photographs is the landlord's evidence. Without move-in documentation, LTB adjudicators frequently side with tenants on damage disputes." },
    ],
  },
  {
    citySlug: 'london',
    serviceSlug: 'tenant-screening',
    heroHeadline: 'Screen London Tenants Rigorously — Even With Multiple Applications',
    heroSubheadline: 'A 4% vacancy market still produces bad tenant decisions when landlords rush screening in the competitive February window.',
    localBodyParagraphs: [
      "London's student rental market has a counterintuitive screening challenge: during peak demand season (February–April), units receive multiple applications quickly, creating pressure to select the first plausible-looking applicant. This is exactly how London landlords end up with tenants who don't pay, damage units, or file LTB applications to stay past lease end. Speed and rigor are not mutually exclusive — MoveSmart completes full credit, employment, and reference checks within 48 hours.",
      "Western University's Off-Campus Housing office has documented a growing population of tenant applicants who are legally informed and aware of their rights. This is not a threat to good landlords — it's an advantage. Tenants who understand the RTA follow proper processes, pay on time, and give proper notice. The screening process needs to identify these tenants, not filter them out through discriminatory questions.",
    ],
    painPoints: [
      {
        problem: 'London receives multiple applications simultaneously in February–April, pushing landlords to skip reference checks to secure the tenant quickly — the most common path to problem tenancies.',
        solution: 'MoveSmart completes full Equifax/TransUnion credit reports, employment verification calls, and prior landlord references within 48 hours — thorough and fast.',
      },
      {
        problem: "London's student applicant pool includes applicants with no Canadian rental history, no credit profile, and parents as guarantors — standard screening rejects qualified first-time renters unfairly.",
        solution: 'Guarantor assessment protocol: verifying parental income, employment, and credit as co-applicants — enabling first-time renters to qualify on guarantor strength.',
      },
      {
        problem: "London's OHRC requires landlords to avoid discriminatory screening (source of income, family status) — individual landlords unfamiliar with prohibited questions face human rights complaints.",
        solution: 'OHRC-compliant screening criteria — income-to-rent ratio, credit score, rental history — applied uniformly to all applicants with no prohibited questions.',
      },
    ],
    benefits: [
      { title: '48-Hour Full Screening', description: 'Credit report, employment verification, and reference checks completed within 48 hours — fast enough for London\'s spring demand window.', icon: 'clock' },
      { title: 'Guarantor Assessment', description: 'Parent and co-signer evaluation for first-time renter applications — enabling qualified students to rent with proper financial backing.', icon: 'users' },
      { title: 'OHRC Compliance', description: 'Screening criteria apply uniformly. No prohibited questions, no income source discrimination, no family status screening.', icon: 'shield' },
      { title: 'Risk Scoring', description: 'Applicant risk summary provided to owners — income ratio, credit tier, rental history score — for informed selection decisions.', icon: 'chart' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Application Collection', description: 'Standardized rental application capturing employment, income, rental history, and references — consistent across all applicants.' },
      { stepNumber: 2, title: 'Credit and Background Check', description: 'Equifax or TransUnion report pulled with applicant consent, reviewed for payment history, collections, and debt load.' },
      { stepNumber: 3, title: 'Employment and Income Verification', description: 'Call-verification with employer or review of pay stubs, NOA, and bank statements — income-to-rent ratio calculated.' },
      { stepNumber: 4, title: 'Applicant Summary and Recommendation', description: 'Owner receives screening summary with recommendation — final selection decision remains with owner, supported by documented evidence.' },
    ],
    testimonial: {
      name: 'Angela Morrison',
      city: 'London',
      quote: 'I picked the wrong tenant twice on my own — both Western students with no credit history who stopped paying in April. MoveSmart\'s guarantor screening has worked perfectly for 3 leases straight.',
      outcome: '3 consecutive tenancies with zero arrears using guarantor screening protocol',
    },
    faq: [
      { question: 'How do I screen a first-year Western University student with no credit history?', answer: "Through guarantor assessment. MoveSmart screens the parent or co-signer — their credit report, employment income, and financial capacity to cover rent if the student defaults. This is standard in London's student rental market." },
      { question: 'Can I reject a tenant receiving ODSP or Ontario Works?', answer: 'No. OHRC prohibits discrimination based on source of income. You can assess financial capacity (income-to-rent ratio) but cannot reject applicants because their income source is a government benefit.' },
      { question: 'How quickly can MoveSmart screen a London applicant?', answer: 'Full screening — credit report, employment verification, and reference check — within 48 hours of application submission. Sufficient to keep pace with London\'s spring demand window.' },
    ],
  },
  {
    citySlug: 'london',
    serviceSlug: 'lease-management',
    heroHeadline: 'London Lease Management Built for the Academic Year Rental Cycle',
    heroSubheadline: 'September–August leases, roommate agreements, and guarantor provisions — London rental leases are more complex than standard Ontario forms.',
    localBodyParagraphs: [
      "London's rental market has a lease structure not found in other Ontario cities: the academic year lease. September 1 to August 31, with co-tenants (roommates), guarantors (parents), and sometimes mid-year sublet provisions for co-op terms. The Ontario Standard Lease does not natively accommodate all these provisions — addenda must be carefully drafted to be enforceable and OHRC-compliant.",
      "One of London's most costly lease errors is the roommate arrangement. When multiple students sign a single lease as co-tenants, the RTA treats them as a single tenancy — meaning one roommate moving out doesn't end the lease, and remaining roommates have no obligation to absorb the departed tenant's share. Without clear co-tenant liability clauses and documented communication protocols, London multi-tenant leases create collection nightmares.",
    ],
    painPoints: [
      {
        problem: 'Academic-year leases with roommates and guarantors require addenda that most individual London landlords draft informally — unenforceable clauses create LTB exposure if payment disputes arise.',
        solution: 'MoveSmart drafts London lease packages including co-tenant liability clauses, guarantor agreements, and sublet provisions using RTA-compliant language.',
      },
      {
        problem: "When a London student roommate moves out mid-lease, remaining tenants often pressure landlords to let them find their own replacement — creating unauthorized subletting without proper documentation.",
        solution: 'Sublet and assignment protocols: written landlord consent required, new co-tenant screening completed, and lease schedule amended — all done within RTA Section 97 timelines.',
      },
      {
        problem: "London landlords often don't send N1/N2 rent increase notices correctly — using wrong forms, wrong timing, or forgetting that post-November 2018 units are exempt but still require 90-day notice.",
        solution: "MoveSmart tracks each unit's construction date, exemption status, and 12-month rent increase eligibility — generating correct notices on schedule with no errors.",
      },
    ],
    benefits: [
      { title: 'Academic Lease Expertise', description: 'September–August lease packages with co-tenant liability, guarantor agreements, and sublet provisions — built for London\'s student market.', icon: 'document' },
      { title: 'Roommate Change Protocol', description: 'Documented sublet/assignment process preventing unauthorized occupancy changes in multi-tenant London student rentals.', icon: 'users' },
      { title: 'Rent Increase Compliance', description: 'Construction-date tracking, exemption status, and N1/N2 notice generation — no missed increases, no incorrect form filing.', icon: 'check' },
      { title: 'Lease Renewal Management', description: 'Early renewal outreach (90 days before expiry), market-rate analysis, and N1 drafting if increase applies — no surprises at year-end.', icon: 'clock' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Lease Package Preparation', description: 'Ontario Standard Lease plus London-specific addenda: co-tenant clauses, guarantor agreement, maintenance responsibilities schedule.' },
      { stepNumber: 2, title: 'Execution and Documentation', description: 'Digital or in-person signing, ID verification, and co-tenant/guarantor signature collection before key handover.' },
      { stepNumber: 3, title: 'Mid-Tenancy Changes', description: 'Roommate changes, sublet requests, and mid-lease modifications handled through documented RTA-compliant processes.' },
      { stepNumber: 4, title: 'Renewal or Termination', description: '90-day renewal outreach, market rent analysis, N1/N2 drafting if applicable, or mutual termination documentation if tenant is departing.' },
    ],
    testimonial: {
      name: 'Peter Halliwell',
      city: 'London',
      quote: 'My Western rental had a roommate situation go sideways and I had no idea who was responsible for rent. MoveSmart had co-tenant liability clauses in place — the remaining tenants covered the full amount.',
      outcome: 'Co-tenant liability clause enforced covering full rent from departing roommate\'s share',
    },
    faq: [
      { question: 'Can I use a fixed-term lease for a London student rental?', answer: 'Yes. A September–August (12-month) academic year fixed-term lease is standard near campus. The tenancy continues month-to-month after the fixed term ends unless an N11 is signed or the tenant gives 60 days\' notice.' },
      { question: 'Can I charge a London student tenant\'s parents if rent isn\'t paid?', answer: 'Only if the parents signed a guarantor agreement at lease signing. A verbal promise from parents is not enforceable. MoveSmart includes a formal guarantor agreement in every student lease package.' },
      { question: 'How do I increase rent on my London rental unit?', answer: 'You must serve an N1 (for non-exempt units, up to the 2.1% guideline in 2026) or N2 (for rent-control-exempt units) with 90 days\' written notice. You can only increase once every 12 months.' },
    ],
  },
  {
    citySlug: 'london',
    serviceSlug: 'financial-reporting',
    heroHeadline: 'London Rental Financial Reporting — Track Performance in a Soft Market',
    heroSubheadline: 'With rents declining and new supply competing, London landlords need more visibility into property performance, not less.',
    localBodyParagraphs: [
      "London's investment math has changed since 2022. Achievable rents declined, new purpose-built supply increased operating competition, and vacancy costs for properties that miss the February–April leasing window now average 2–3 months of lost income. Landlords who are not actively monitoring their net operating income, vacancy rate, and maintenance spend have no early warning when a property shifts from positive to negative cash flow.",
      "CRA's adoption of AI data-matching for rental income — cross-referencing bank deposits against Airbnb listings, property registries, and income declarations — makes accurate T776 reporting a legal compliance requirement. London landlords with student houses or multi-unit properties often have complex income streams (multiple rent payments, damage deposit returns, utility reimbursements) that require organized reporting to file accurately.",
    ],
    painPoints: [
      {
        problem: "London's declining rent environment means properties underperforming vs. 2022 acquisition assumptions — without clear NOI tracking, landlords don't see the deterioration until a refinancing or sale surprises them.",
        solution: 'Monthly financial statements tracking gross rent, vacancy losses, maintenance spend, and NOI — providing 12-month trend visibility on property performance.',
      },
      {
        problem: 'Student housing often involves multiple simultaneous rent payments, partial LMR deposits, and damage deductions — unorganized income records make CRA T776 filing error-prone.',
        solution: 'Organized income ledger with per-tenant payment records, LMR tracking, and damage reconciliation — ready for CRA T776 filing without reconstruction effort.',
      },
      {
        problem: 'London landlords with house-share or multi-unit properties sometimes underestimate maintenance costs — failing to track spend by category means budget overruns aren\'t visible until year-end.',
        solution: 'Category-level maintenance spend reporting (plumbing, HVAC, electrical, cosmetic) flagging trends before they become cash flow problems.',
      },
    ],
    benefits: [
      { title: 'Monthly NOI Reports', description: 'Gross rent, vacancy, maintenance spend, and net operating income — one report, consistent format, every month.', icon: 'chart' },
      { title: 'CRA-Ready Ledger', description: 'Income and expense records organized by property and tax category — T776 preparation simplified at year-end.', icon: 'document' },
      { title: 'Vacancy Cost Tracking', description: 'Vacancy periods tracked with market-day benchmarks — early warning when your London property is underperforming.', icon: 'clock' },
      { title: 'Annual Performance Summary', description: 'Year-over-year comparison of income, expenses, and ROI — the document your accountant needs for year-end planning.', icon: 'star' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Income Ledger Setup', description: "Each tenant's rent, LMR, and payment records structured in a property-level financial ledger from day one." },
      { stepNumber: 2, title: 'Expense Categorization', description: 'Every maintenance invoice, management fee, and operating cost coded by category and property.' },
      { stepNumber: 3, title: 'Monthly Report Generation', description: 'Owner portal updated monthly with income statement, expense breakdown, and vacancy metrics.' },
      { stepNumber: 4, title: 'Annual Tax Package', description: 'Year-end summary prepared for your accountant: gross income, allowable deductions, net rental income — T776 ready.' },
    ],
    testimonial: {
      name: 'Yusuf Kazemi',
      city: 'London',
      quote: "I had three students in a house and had no idea what my actual cash flow was after maintenance and vacancy. MoveSmart's monthly reports showed I was actually cash-flow positive — I just couldn't see it without the data.",
      outcome: 'Owner discovered positive cash flow obscured by unorganized records — avoided unnecessary property sale',
    },
    faq: [
      { question: 'Do I need to report rental income from a London student house?', answer: 'Yes. All rental income must be reported on CRA Form T776. CRA now uses AI data-matching against bank deposits and property records — failure to report carries significant penalties.' },
      { question: 'What expenses can I deduct against London rental income?', answer: 'Mortgage interest, property taxes, insurance, maintenance costs, management fees, advertising, and capital cost allowance. Your accountant determines CCA strategy.' },
      { question: 'How do I track partial rent payments and LMR deposits for tax purposes?', answer: "LMR deposits are not income when received — they become income when applied to the last month's rent. MoveSmart tracks this separately to ensure your T776 is filed correctly." },
    ],
  },
  {
    citySlug: 'london',
    serviceSlug: 'eviction-services',
    heroHeadline: 'London LTB Applications Handled Correctly — Student Arrears to Lease Disputes',
    heroSubheadline: 'Western student arrears, roommate co-tenancy disputes, and academic year-end holdovers require a different approach than a standard GTA eviction.',
    localBodyParagraphs: [
      "London's LTB caseload is dominated by two scenarios: student tenant arrears (particularly in May when academic year ends and income disappears), and fixed-term lease end disputes where tenants refuse to vacate. Under Bill 60, the N4 notice period was shortened to 7 days — but only if the notice is correctly drafted with the right amounts, the right dates, and proper termination language. A defective N4 restarts the clock and extends the problem by weeks.",
      "Student tenant evictions in London have a unique complexity: when multiple roommates are on a lease and one stops paying, the remaining roommates are jointly liable under a co-tenancy but may resist becoming responsible for a departing roommate's share. Property managers who drafted proper co-tenant clauses at lease signing can enforce arrears recovery against all parties — not just the one who left.",
    ],
    painPoints: [
      {
        problem: 'Student tenants in London commonly enter arrears at lease-end — May–August — when academic income stops and they\'re already planning to leave anyway. Standard eviction timelines don\'t protect London landlords.',
        solution: 'MoveSmart serves N4 notices immediately at arrears onset, monitors cure period compliance, and files L1 applications promptly — even if the tenant is "leaving anyway."',
      },
      {
        problem: 'London landlords with room-rental houses sometimes have one tenant stop paying while others remain — attempting to evict one co-tenant under a shared lease creates procedural complexity.',
        solution: 'Application strategy customized to tenancy structure: single lease co-tenancy vs. individual room agreements determine the correct L-form application and process.',
      },
      {
        problem: 'Fixed-term lease holders who refuse to vacate at academic year-end claim the tenancy converted to month-to-month — legally accurate under the RTA, but not the arrangement the landlord intended.',
        solution: 'Proper lease renewal/non-renewal communications served 60+ days before expiry and L-form applications filed where applicable if holdover occurs.',
      },
    ],
    benefits: [
      { title: 'Bill 60 N4 Expertise', description: '7-day N4 notices drafted correctly — right amounts, right dates — ensuring the LTB application timeline is not restarted by technical errors.', icon: 'document' },
      { title: 'Co-Tenant Application Strategy', description: "Enforcement approach customized for London's roommate-heavy student leases — individual vs. co-tenant liability determined before filing.", icon: 'users' },
      { title: 'Lease-End Dispute Resolution', description: 'Fixed-term lease expiry communication and holdover application management — protecting London landlords when students do not vacate.', icon: 'shield' },
      { title: 'Full Hearing Preparation', description: 'N-form drafting, LTB application filing, and hearing documentation — handled correctly without landlord needing to navigate the process.', icon: 'check' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Arrears Assessment', description: 'Confirm arrears amount, identify all parties liable (co-tenants, guarantors), and select correct notice type.' },
      { stepNumber: 2, title: 'N4 Notice Service', description: 'N4 drafted with precise arrears amount and termination date, served by documented method within 1 business day.' },
      { stepNumber: 3, title: 'Cure Period Monitoring', description: '7-day period tracked; if rent not received, L1 application prepared and filed immediately — no delays.' },
      { stepNumber: 4, title: 'Hearing Preparation', description: 'All documentation organized: lease, payment records, N4, communications — presented clearly at LTB hearing.' },
    ],
    testimonial: {
      name: 'Robert Chisholm',
      city: 'London',
      quote: 'My Western student stopped paying in April and I had no idea how to proceed with two other roommates still in the unit. MoveSmart sorted the co-tenant structure and recovered full arrears without a hearing.',
      outcome: 'Full arrears recovered from co-tenant application without LTB hearing required',
    },
    faq: [
      { question: 'How long does an LTB eviction take in London?', answer: 'For non-payment (L1 application), approximately 3 months from N4 service to hearing under current 2025–2026 scheduling. Bill 60 shortened the N4 notice period to 7 days, but LTB scheduling remains the main timeline constraint.' },
      { question: 'Can I evict a London student tenant at the end of their fixed-term lease?', answer: 'Fixed-term leases automatically continue as month-to-month under the RTA — you cannot require a tenant to leave just because a fixed-term ends. You must serve an N12 (personal use) or the tenant gives 60-day notice.' },
      { question: 'What happens if my London student has a guarantor who also won\'t pay?', answer: 'Guarantor enforcement is through Small Claims Court, not the LTB. The LTB handles the tenancy; guarantor liability is a separate civil claim.' },
    ],
  },
]
