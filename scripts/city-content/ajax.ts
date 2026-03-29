import type { CityServiceContent, CityDescription } from './batch-1'

export const cityDescriptions: CityDescription[] = [
  {
    citySlug: 'ajax',
    descriptionParagraphs: [
      "Ajax sits at the western edge of Durham Region, 35 kilometres east of downtown Toronto, with a rental market that held up better than almost anywhere else in Ontario during late 2025. One-bedroom units average $1,841/month (March 2025), down just 2.9% year-over-year — one of the smallest declines recorded nationally in that data period. Two-bedroom units average $2,192 (December 2025), running below comparable Pickering units to the west and above Oshawa to the east. The price softening is not an oversupply story — vacancy remains low — it is an income stress story: tenants are negotiating harder because their own wage growth has not kept pace with cumulative rent increases from 2020 to 2023. Ajax landlords still pricing at 2022 peaks are sitting vacant while identical units priced 5% lower lease quickly.",
      "Ajax GO station on the Lakeshore East line delivers Union Station in approximately 50 minutes on multiple daily trains, making Ajax the furthest affordable point on the Lakeshore East corridor for GTA commuters priced out of Scarborough and Pickering. Ajax rents run 20–30% below Toronto for equivalent unit types — the core value proposition for the city's dominant tenant demographic: dual-income GTA commuter households. The planned Lakeshore East GO extension to Bowmanville will, over the next five to seven years, add investment value to the entire eastern Durham corridor. Ajax-Pickering Hospital (Rouge Valley Health System) and the Bayly Street/Kingston Road industrial and commercial corridor anchor local employment, alongside the newer Audley Road Employment Area in northeast Ajax, a growing logistics hub. These three employer clusters — healthcare, industrial/commercial, and logistics — sustain rental demand across all economic cycles.",
      "Ajax's five distinct rental neighbourhoods price across a roughly $500/month range. Northeast Ajax/Duffins Heights commands the highest rents ($1,900–$2,300) as Ajax's newest construction zone with top-rated Durham schools — the neighbourhood favoured by families. Downtown Ajax/Harwood Ave ($1,700–$2,100) captures the GO transit premium with mid-rise condos and direct station access. South Ajax ($1,700–$2,100) attracts lifestyle renters seeking Lake Ontario waterfront access. Salem/Riverside ($1,700–$2,000) and Westney Heights ($1,600–$1,900) serve more price-sensitive tenants. Ajax's tenant base skews toward South Asian, Filipino, and Caribbean newcomer communities alongside established manufacturing and healthcare workers — a diverse demographic requiring culturally informed marketing and tenant communication.",
    ],
    transitInfo: 'Ajax GO Station (Lakeshore East line) — Union Station ~50 min, multiple daily trains. Durham Region Transit bus network connecting all Ajax neighbourhoods. Highway 401 east-west corridor. Planned Lakeshore East GO extension east to Bowmanville adds long-term value to Durham corridor.',
    neighbourhoods: ['Downtown Ajax / Harwood Ave', 'Northeast Ajax / Duffins Heights', 'Salem / Riverside', 'South Ajax / Waterfront', 'Westney Heights'],
  },
]

export const cityServiceContent: CityServiceContent[] = [
  // ============================================================
  // AJAX × 8 SERVICES
  // ============================================================
  {
    citySlug: 'ajax',
    serviceSlug: 'tenant-placement',
    heroHeadline: 'Ajax Tenant Placement — Fill Your Unit with GO-Commuter Professionals',
    heroSubheadline: "Ajax GO's Lakeshore East access is your strongest leasing asset — and most landlords aren't marketing it to the GTA commuters it attracts.",
    localBodyParagraphs: [
      "Ajax's dominant tenant demographic is GTA commuters priced out of Scarborough and Pickering — dual-income professional households who understand that Ajax GO delivers Union Station in 50 minutes and Ajax rents run 20–30% below Toronto equivalents. This is the tenant willing to pay Northeast Ajax or Harwood Ave asking prices. Targeting this demographic requires placement marketing that leads with transit commute times and neighbourhood quality, not just square footage and price. Ajax landlords who list generically compete on price alone against every other Durham unit. Landlords who market the GO corridor advantage compete in a smaller, more qualified pool.",
      "The current Ajax market dynamic is nuanced: vacancy is low, but rents are softening slightly because tenants are negotiating harder. Units on Harwood Ave within walking distance of Ajax GO are being priced anywhere from $1,700 to $2,100 for a one-bedroom — a $400 range for essentially the same product. The landlords filling units in under two weeks are priced accurately against current comps, not against what a neighbour fetched in 2022. MoveSmart's Ajax placement process begins with a market pricing analysis using current active and recently leased Durham comparables — not GTA-wide averages that consistently distort Ajax pricing.",
      "Ajax's newcomer communities — South Asian, Filipino, Caribbean — represent a significant share of the qualified applicant pool and are most effectively reached through community-specific digital channels, multilingual listings, and culturally attuned communication. Ajax-Pickering Hospital and the Bayly St industrial corridor also generate a stable base of healthcare and manufacturing worker applicants with regular income and genuine housing need. A placement process that reaches all three tenant segments — GTA commuters, healthcare/industrial workers, and newcomer families — fills Ajax units fastest across all seasons.",
    ],
    painPoints: [
      { problem: "Ajax landlords pricing at 2022 peak rents sit vacant while identical units priced 5% lower lease in under two weeks — the softening is tenant income stress, not oversupply, and it requires accurate current pricing, not historical benchmarks.", solution: "MoveSmart prices every Ajax listing against current active and recently leased Durham Region comparables — identifying the clearing price that generates qualified applicants without leaving rent on the table." },
      { problem: "Most Ajax landlords list generically on Kijiji and miss the GTA commuter demographic that drives highest-quality tenancies — this tenant is actively searching for Lakeshore East GO access at below-Scarborough prices and needs to be reached through targeted channels.", solution: "Ajax placement marketing leads with Ajax GO commute times (50 min to Union), neighbourhood school ratings for Duffins Heights, and waterfront access for South Ajax — targeting the specific tenant types willing to pay Ajax asking prices." },
      { problem: "Ajax's diverse tenant pool — South Asian, Filipino, Caribbean newcomers alongside healthcare and industrial workers — is partially invisible to landlords using only English-language general platforms, leaving a significant portion of qualified applicants unreached.", solution: "Multilingual listing distribution and community-channel outreach targeting Ajax's newcomer communities — expanding the qualified applicant pool beyond GTA-commuter professionals to include the full Ajax demographic." },
    ],
    benefits: [
      { title: 'GO-Commuter Targeted Marketing', description: "Listings leading with Ajax GO's 50-minute Union Station commute time — capturing the GTA commuter demographic willing to pay Harwood Ave and Duffins Heights asking prices.", icon: 'users' },
      { title: 'Current Ajax Pricing Analysis', description: 'Durham Region-specific comparable analysis using active and recently leased Ajax data — accurate pricing that fills units in under two weeks rather than sitting at 2022 peaks.', icon: 'chart' },
      { title: 'Multicultural Tenant Reach', description: "Multilingual listings and community-channel distribution reaching Ajax's South Asian, Filipino, and Caribbean newcomer communities — the qualified applicants most platforms miss.", icon: 'star' },
      { title: 'OHRC-Compliant Screening', description: "Full credit and employment verification with documented objective criteria — essential protection in a market where Durham Region tenants know their rights under the Human Rights Code.", icon: 'shield' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Market Pricing Analysis', description: 'Durham Region comparable analysis benchmarking your Ajax unit against current active and recently leased properties — by neighbourhood, unit type, and amenity level.' },
      { stepNumber: 2, title: 'Professional Listing Creation', description: 'Photography, floor plan, commute-time documentation (Ajax GO distance/walk time), and school proximity for Duffins Heights units — all included.' },
      { stepNumber: 3, title: 'Multi-Channel Distribution', description: 'Kijiji, Realtor.ca, Facebook Marketplace, multicultural community platforms, and targeted GO-commuter social groups — full Ajax market coverage.' },
      { stepNumber: 4, title: 'Screening and Lease Execution', description: "Full credit, employment, and reference verification; OHRC-compliant documentation; lease executed with all required Ontario Standard Lease disclosures." },
    ],
    testimonial: {
      name: 'Ramesh Patel',
      city: 'Ajax',
      quote: "Our AGI application for capital improvements recovered $4,800 over 12 months — we had no idea we could pursue that. The same PM who placed our tenant also handled the filing.",
      outcome: '$4,800 AGI recovery over 12 months on capital improvements the landlord had already made',
    },
    faq: [
      { question: 'How important is Ajax GO proximity for rental pricing?', answer: "Very important. Units within walking distance of Ajax GO on Harwood Ave command 10–15% higher rents than car-dependent Ajax properties. The Lakeshore East commuter demographic — Ajax's most financially stable tenant pool — prioritizes GO access above all other location factors." },
      { question: 'Is the Ajax rental market soft right now?', answer: "Rents declined 2.9% year-over-year as of early 2025, but vacancy remains low. The softening is driven by tenant income stress, not oversupply. Units priced accurately against current comps lease quickly; units priced at 2022 peaks sit vacant. Correct pricing is the most important placement variable in today's Ajax market." },
      { question: 'What tenant types should I target in Ajax?', answer: "Three primary segments: GTA commuters priced out of Scarborough and Pickering (highest income, prefer GO-adjacent units), healthcare and industrial workers at Ajax-Pickering Hospital and Bayly St corridor (stable income, year-round demand), and newcomer families in South Asian, Filipino, and Caribbean communities (strong housing need, often underreached by standard listings)." },
    ],
  },
  {
    citySlug: 'ajax',
    serviceSlug: 'property-management',
    heroHeadline: 'Ajax Property Management — Durham Market Expertise, Margin Protection, Full Compliance',
    heroSubheadline: "Ajax landlords face margin pressure from both sides — property tax and insurance increases outpacing guideline-capped rents. Professional management protects your returns.",
    localBodyParagraphs: [
      "Ajax property management in 2025 is a margin protection exercise as much as a tenant relations exercise. Property taxes run 1.1–1.3% of assessed value and insurance premiums rose 15–30% over the past two years — while the 2026 rent increase guideline sits at 2.1%. For Harwood Ave condo investors and Duffins Heights townhouse landlords alike, this math means every dollar of unnecessary vacancy, every unrecovered AGI opportunity, and every above-market maintenance call directly erodes cash flow. Professional management is not a convenience — it is a financial discipline.",
      "Condo properties on Harwood Ave and in Ajax's mid-rise corridors carry building-specific compliance requirements. Each condo corporation has its own declaration governing rental subleasing rules, tenant approval processes, and parking arrangements. A landlord who does not know their specific condo corp declaration before executing a lease has already created the conditions for a mid-tenancy dispute. MoveSmart reviews every condo declaration before management begins — confirming rental permissions, identifying any board approval requirements, and ensuring the lease addendum reflects current building rules.",
      "Ajax's position between Pickering (slightly more expensive, casino employment anchor) and Oshawa (cheaper, more students) means it cannot compete on price alone in either direction. The management strategy that retains Ajax tenants is quality: fast maintenance, professional communication, and proactive renewal outreach at 90 days. Ajax tenants who leave at renewal typically cite a poor maintenance experience or a rent increase that felt arbitrary rather than clearly explained. Both are preventable with professional management.",
    ],
    painPoints: [
      { problem: "Ajax landlords face a margin squeeze from both sides: property taxes up 1.1–1.3% of assessed value and insurance up 15–30%, while guideline-capped rents on pre-2018 units can only increase 2.1% — unmanaged vacancies and missed AGI opportunities directly erode cash flow.", solution: "MoveSmart tracks AGI eligibility for every capital improvement made to Ajax properties and files applications proactively — recovering costs that individual landlords don't know they can pursue under the RTA." },
      { problem: "Harwood Ave condo units have building-specific subleasing and rental rules in their condo corporation declarations — landlords who don't know these rules before execution create the conditions for LTB disputes over improperly structured tenancies.", solution: "Condo declaration review before every Ajax tenancy begins — rental permissions confirmed, board approval requirements identified, and lease addendum drafted to comply with current building rules." },
      { problem: "Ajax competes with Pickering to the west and Oshawa to the east — tenants who experience below-standard management have credible alternatives at renewal, and the thin margin between Ajax and competitor pricing makes retention essential.", solution: "Proactive 90-day renewal outreach, transparent rent increase communication, and fast maintenance response — tenant retention strategy aligned with Ajax's competitive position in the Durham market." },
    ],
    benefits: [
      { title: 'AGI Application Management', description: "Active identification and filing of Above-Guideline Increase applications for Ajax capital improvements — recovering costs most landlords don't know they can pursue.", icon: 'chart' },
      { title: 'Condo Declaration Compliance', description: "Declaration review before every Harwood Ave and Ajax mid-rise tenancy — rental permissions confirmed, building rules reflected in lease addendum from day one.", icon: 'document' },
      { title: 'Margin Protection Reporting', description: 'Monthly NOI statements tracking rent, taxes, insurance, maintenance, and net income — visibility into margin compression before it becomes a crisis.', icon: 'shield' },
      { title: 'Renewal Retention System', description: '90-day renewal outreach, market rent analysis, and transparent increase communication — retaining Ajax tenants who have Pickering and Oshawa alternatives.', icon: 'star' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Property and Compliance Audit', description: "Review of condo declaration (if applicable), current lease, rent increase history, AGI eligibility, and unit condition before management begins." },
      { stepNumber: 2, title: 'Tenant Onboarding', description: 'Move-in inspection, building rule disclosure, utility transfer, and lease orientation — documented from day one.' },
      { stepNumber: 3, title: 'Ongoing Management', description: 'Maintenance dispatch, rent collection, condo corp communication monitoring, AGI tracking, and monthly financial reporting.' },
      { stepNumber: 4, title: 'Annual Performance Review', description: 'NOI performance report, rent increase opportunity analysis, insurance and tax cost review, and renewal strategy aligned with current Ajax market conditions.' },
    ],
    testimonial: {
      name: 'Anita Sharma',
      city: 'Ajax',
      quote: "Harwood Ave condo had specific building rules about rental subleasing — PM knew the condo corp declaration and had our lease comply from day one. No disputes, no surprises.",
      outcome: 'Zero mid-tenancy compliance issues by addressing condo corp declaration requirements before lease execution',
    },
    faq: [
      { question: "Why do Ajax condo buildings have rental compliance rules that individual landlords often miss?", answer: "Each Ajax condo corporation operates under its own declaration, which can include rental restrictions, board approval requirements for tenants, parking assignment rules, and subleasing limitations. These are building-specific, not province-wide, and change without notification. MoveSmart reviews each declaration before management begins." },
      { question: 'What is an AGI application and how does it apply to Ajax properties?', answer: "An Above-Guideline Increase (AGI) application allows landlords to apply to the LTB for a rent increase above the annual guideline when they have made qualifying capital expenditures. Ajax landlords who have upgraded HVAC systems, replaced roofing, or completed other capital work may be eligible — MoveSmart identifies and files these applications proactively." },
      { question: 'How does Ajax compete with Pickering and Oshawa for tenants?', answer: "Ajax cannot win on price — Oshawa is cheaper. It cannot match Pickering's casino employment anchor. Ajax's competitive positioning is transit access (GO Lakeshore East), newer Durham housing stock, and waterfront lifestyle at below-Scarborough pricing. Management quality that matches this positioning retains tenants who have credible alternatives on both flanks." },
    ],
  },
  {
    citySlug: 'ajax',
    serviceSlug: 'rent-collection',
    heroHeadline: 'Ajax Rent Collection — Catch Tenant Income Stress Early, Before Arrears Compound',
    heroSubheadline: "Ajax's rent softening is driven by tenant income stress, not oversupply — early payment monitoring is your first line of financial protection.",
    localBodyParagraphs: [
      "The single most important rent collection insight in Ajax in 2025 is that the market's modest rent decline is not a vacancy problem — it is a tenant income stress problem. Renters at Bayly St warehouse jobs, contract healthcare positions at Ajax-Pickering Hospital, and logistics roles in the Audley Road Employment Area face income volatility. When income drops, Ajax tenants — who know their rights in Durham Region's increasingly sophisticated rental market — often reduce payment before they communicate a problem. Landlords who catch the pattern in month two rather than month four preserve far more options.",
      "Under Bill 60's 7-day N4 cure period, the timeline from missed payment to enforceable N4 is compressed significantly from the old 15-day standard. This tighter window actually benefits landlords who use automated payment monitoring — a failed pre-authorized debit on the 1st triggers an N4 workflow by the 2nd, the cure period runs to the 9th, and if unpaid, an L1 application can be filed immediately. Landlords who discover missed payments by checking their bank account on the 15th have already consumed half the month before the legal process begins.",
      "Ajax's newcomer tenant communities — South Asian, Filipino, Caribbean — often include household members with non-traditional income sources: self-employment, international transfers, multiple earners contributing to a single rent payment. Payment structures for these tenancies require clear documentation from day one: which household member pays, from which account, and by which method. Ambiguous payment arrangements are the precursor to the arrears disputes that take months to resolve at the LTB.",
    ],
    painPoints: [
      { problem: "Ajax tenants facing income stress from Bayly St warehouse layoffs or reduced healthcare shifts often reduce payment before communicating — landlords who discover this in month three rather than month two face significantly larger arrears and weaker N4 positions.", solution: "Automated payment monitoring flags any failed payment within 24 hours — N4 notice workflow initiated immediately, catching Ajax income stress patterns in month two rather than month four." },
      { problem: "Ajax newcomer households with multiple earners and non-traditional income sources create informal payment arrangements that leave no documented record — when disputes arise, there is no clean evidence trail for the LTB.", solution: "Pre-authorized debit standardized at lease signing regardless of income source — every Ajax payment timestamped, documented, and traceable from day one of the tenancy." },
      { problem: "Ajax landlords who accept partial rent after serving an N4 inadvertently void the notice — the most common procedural error in Ontario rent arrears proceedings, restarting the entire 7-day cure period.", solution: "MoveSmart does not accept partial rent after N4 service without documented written agreement — protecting the notice timeline and preserving the L1 filing position at every step." },
    ],
    benefits: [
      { title: 'Same-Day Arrears Detection', description: "Failed payment flagged within 24 hours — N4 workflow initiated before Ajax income stress becomes a multi-month arrears problem.", icon: 'clock' },
      { title: 'Pre-Authorized Debit Standard', description: 'Digital payment from lease signing — every Ajax tenancy has complete timestamped payment records from day one, regardless of income source type.', icon: 'check' },
      { title: 'Strict N4 Protocol', description: "No partial rent accepted post-N4 without documented agreement — protecting Ajax landlords' LTB application position through correct procedure.", icon: 'shield' },
      { title: 'Owner Payment Portal', description: "Real-time rent received visibility and monthly income statements — know your Ajax unit's payment status from your phone.", icon: 'chart' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Payment Setup at Lease Signing', description: 'Pre-authorized debit or digital payment established before keys are handed over — payer, account, and method documented in lease addendum.' },
      { stepNumber: 2, title: 'Monthly Automated Collection', description: 'Rent debited on the 1st, receipts generated, portal updated — no manual follow-up required for compliant Ajax tenants.' },
      { stepNumber: 3, title: 'Arrears Response', description: 'Failed payment triggers N4 workflow by next business day — 7-day cure period tracked precisely under Bill 60.' },
      { stepNumber: 4, title: 'Year-End Income Summary', description: 'Annual payment history with all collections and LMR disposition — CRA T776-ready documentation.' },
    ],
    testimonial: {
      name: 'Kevin Marchetti',
      city: 'Ajax',
      quote: "Tenant's income dropped after being laid off from a Kingston Rd warehouse — PM caught the pattern in month 2 and served N4 before arrears exceeded one month. Resolved without LTB.",
      outcome: 'Early detection limited arrears to under one month; resolved without LTB filing',
    },
    faq: [
      { question: "How does Bill 60's 7-day N4 rule change rent collection in Ajax?", answer: "Bill 60 reduced the N4 cure period from 15 days to 7. If rent is not paid within 7 days of the N4 termination date, you can immediately file an L1 application. For Ajax landlords with automated payment monitoring, this means a missed payment on the 1st can result in an N4 served by the 2nd and an L1 ready to file by the 9th — significantly faster than the old timeline." },
      { question: "My Ajax tenant works shifts at the hospital and sometimes pays a few days late — is that a problem?", answer: "Inconsistent payment dates are a documentation problem even when amounts are correct. Every late payment should be tracked. After a pattern of 3+ late payments, a formal Notice to End Tenancy for Repeated Late Payment (N8) becomes an option. Pre-authorized debit eliminates the issue entirely for shift workers with regular employment income." },
      { question: 'What happens if I accept partial rent after serving an N4 in Ajax?', answer: "Accepting partial rent voids the N4 and restarts the cure period from zero. This is the most common procedural error in Ontario arrears proceedings. MoveSmart never accepts partial rent after N4 service without a written partial payment agreement that explicitly preserves the notice — protecting your LTB position." },
    ],
  },
  {
    citySlug: 'ajax',
    serviceSlug: 'maintenance-repair',
    heroHeadline: 'Ajax Maintenance — Waterfront Humidity, Aging Stock, High-Expectation Tenants',
    heroSubheadline: "South Ajax's Lake Ontario exposure creates specific maintenance risks that standard GTA contractors don't anticipate — proactive management prevents the expensive failures.",
    localBodyParagraphs: [
      "Ajax's geographic diversity creates distinct maintenance profiles by neighbourhood. South Ajax waterfront properties face elevated humidity from Lake Ontario exposure — a condition that accelerates mould growth in poorly ventilated bathrooms and closets, degrades window seals faster than inland properties, and demands annual HVAC inspection to prevent moisture infiltration into forced-air systems. A landlord who does not know their South Ajax property sits in a high-humidity microclimate is managing reactively against a predictable and preventable problem.",
      "Northeast Ajax — the Duffins Heights neighbourhood where new construction dominates — has a different maintenance profile: modern mechanical systems that are lower-maintenance but under full builder warranty for the first few years. Landlords in Duffins Heights need a property manager who knows how to navigate builder warranty claims (often ignored by owners who don't realize coverage exists) before calling a contractor at full cost. The maintenance savings from a single properly pursued warranty claim can offset a year of management fees.",
      "Ajax-Pickering Hospital and the Bayly St industrial corridor generate a tenant demographic — healthcare workers, manufacturing supervisors, logistics managers — with professional workplace standards and high expectations for maintenance response. A tenant paying $2,100/month for a Northeast Ajax townhouse and managing a team at work does not accept a week-long delay on a broken dishwasher without forming a renewal decision. Fast, documented maintenance response is tenant retention strategy in Ajax, where Pickering alternatives are 10 minutes west.",
    ],
    painPoints: [
      { problem: "South Ajax waterfront properties experience elevated humidity from Lake Ontario exposure, accelerating mould in bathrooms and closets and degrading HVAC systems — landlords without neighbourhood-specific maintenance schedules react to expensive problems that could have been prevented.", solution: "Annual HVAC inspection and humidity assessment for all South Ajax properties — proactive schedule targeting the specific moisture risks of Lake Ontario proximity before they become remediation events." },
      { problem: "Ajax's Duffins Heights new construction is under builder warranty — but most landlord-investors don't pursue warranty claims, paying full contractor rates for repairs that the builder is obligated to cover.", solution: "MoveSmart tracks warranty periods for all Duffins Heights properties under management and files builder warranty claims before contractor dispatch — recovering repair costs that most Ajax landlords leave unclaimed." },
      { problem: "Ajax tenants paying $2,000–$2,300/month in Harwood Ave condos or Duffins Heights townhouses have high maintenance expectations — slow response accelerates non-renewals to Pickering alternatives available 10 minutes west.", solution: "24-hour urgent response SLA and 72-hour non-urgent SLA communicated at move-in — maintaining the maintenance quality that retains Ajax professional tenants against Pickering competition at renewal." },
    ],
    benefits: [
      { title: 'South Ajax Humidity Management', description: "Annual HVAC inspection and moisture assessment for Lake Ontario-adjacent properties — preventing the mould and window degradation specific to Ajax's waterfront microclimate.", icon: 'home' },
      { title: 'Builder Warranty Recovery', description: 'Duffins Heights new construction warranty claims pursued before contractor dispatch — recovering repair costs from builders that most Ajax landlords leave unclaimed.', icon: 'chart' },
      { title: '24-Hour Urgent Response', description: 'Heating failure, water intrusion, and security issues handled within 24 hours for Ajax professional tenants who have Pickering alternatives at renewal.', icon: 'clock' },
      { title: 'Documented Work Orders', description: 'Every Ajax repair photographed, scoped, and recorded — essential for deposit disputes, insurance claims, and LTB maintenance defenses.', icon: 'document' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Property Assessment', description: 'Inspection identifying deferred maintenance, neighbourhood-specific risks (South Ajax humidity, Duffins Heights warranty status), and any outstanding issues.' },
      { stepNumber: 2, title: 'Proactive Maintenance Schedule', description: 'Annual HVAC service, smoke/CO testing, humidity check (waterfront units), and warranty calendar established from day one.' },
      { stepNumber: 3, title: 'Request Triage and Dispatch', description: 'Tenant requests triaged by urgency — warranty claim, routine contractor, or emergency dispatch — within SLA timeframes.' },
      { stepNumber: 4, title: 'Documentation and Reporting', description: 'Work orders completed, photos taken, invoices processed, costs reported in monthly owner statement.' },
    ],
    testimonial: {
      name: 'Diane Kowalski',
      city: 'Ajax',
      quote: "Ajax waterfront property had high humidity issues from Lake Ontario exposure — PM proactively scheduled annual HVAC inspections and prevented a major mould problem we didn't know we were heading toward.",
      outcome: 'Proactive HVAC schedule prevented mould remediation event on South Ajax waterfront property',
    },
    faq: [
      { question: 'Why do South Ajax properties need special maintenance attention compared to other Ajax neighbourhoods?', answer: "South Ajax sits adjacent to Lake Ontario, creating higher ambient humidity than inland Ajax neighbourhoods. This accelerates mould growth in poorly ventilated bathrooms, degrades window seals faster, and puts greater stress on HVAC systems. Annual inspections targeting moisture infiltration are standard practice for waterfront-adjacent properties." },
      { question: 'How do builder warranties work for Ajax Duffins Heights rental properties?', answer: "New construction in Duffins Heights is covered under Tarion warranty: 1 year for workmanship and materials defects, 2 years for mechanical systems (HVAC, plumbing, electrical), and 7 years for major structural defects. Landlord-investors who don't know their property is still under warranty pay contractor rates for covered repairs. MoveSmart tracks warranty periods and files claims before dispatching contractors." },
      { question: "What maintenance response time should I expect from my Ajax property manager?", answer: "Ajax's professional tenant demographic expects urgency-based response: 24 hours for heating failures, water intrusion, and security issues; 72 hours for non-urgent repairs. These timelines should be communicated in writing at move-in — setting expectations that prevent the slow-maintenance dissatisfaction driving non-renewals to Pickering alternatives." },
    ],
  },
  {
    citySlug: 'ajax',
    serviceSlug: 'tenant-screening',
    heroHeadline: 'Ajax Tenant Screening — Durham Region Tenants Know Their Rights',
    heroSubheadline: "Ajax's increasingly sophisticated rental market demands documented, objective screening criteria — a rejected applicant who files a Human Rights inquiry is a preventable problem.",
    localBodyParagraphs: [
      "Durham Region's rental market has matured significantly over the past five years. Ajax tenants — particularly those with prior GTA rental experience or professional employment — are familiar with the Residential Tenancies Act, the Ontario Human Rights Code's income source protections, and the standard screening process. A landlord who uses informal, undocumented, or inconsistently applied criteria is not just exposing themselves to an OHRC complaint from a rejected applicant — they are likely making worse selection decisions than a systematic process would produce.",
      "Ajax's three primary applicant segments each require slightly different verification approaches. GTA commuter professionals are the easiest to screen: T4 employment income, Canadian credit history, and prior rental references from GTA landlords — straightforward verification. Healthcare and industrial worker applicants from Ajax-Pickering Hospital and the Bayly St corridor often have shift-based or unionized income that looks non-standard on pay stubs but is highly reliable — verifiable through employment letters and union contract documentation. Newcomer applicants — the South Asian, Filipino, and Caribbean households who represent a growing share of Ajax's qualified applicant pool — often lack Canadian credit history but have strong employment income and genuine housing need. Standard credit-score-only screening rejects these applicants incorrectly.",
      "The income-to-rent ratio benchmark for Ajax is consistent with Ontario standard: gross monthly household income should be at least three times monthly rent. For a $2,100/month Duffins Heights townhouse, that means verifying at least $6,300/month gross household income. This benchmark, applied uniformly across all Ajax applicants regardless of background, is both an effective financial filter and OHRC-compliant evidence of non-discriminatory criteria if a rejected applicant escalates a complaint.",
    ],
    painPoints: [
      { problem: "Ajax's sophisticated rental market includes applicants who know their OHRC rights — a landlord who rejects a South Asian or Caribbean applicant without documented objective criteria faces a human rights inquiry that can cost tens of thousands in settlements.", solution: "MoveSmart applies three documented objective criteria to every Ajax applicant: income-to-rent ratio, credit score, and verified rental history — every rejection documented on these criteria, no prohibited grounds." },
      { problem: "Newcomer applicants in Ajax — a significant share of the qualified pool — often lack Canadian credit history but have strong employment income. Screening that relies exclusively on credit scores incorrectly rejects these applicants and shrinks the qualified applicant pool.", solution: "Employment letter verification, employer income call, and international reference assessment substituting for absent Canadian credit history — correctly evaluating newcomer applicants who represent some of Ajax's most stable tenancies." },
      { problem: "Ajax healthcare and industrial workers often have shift-based income that appears inconsistent on pay stubs — landlords unfamiliar with union wage structures or hospital employment letters misread reliable income as marginal income.", solution: "Income verification adapted to Ajax's employment profile: union contract wage confirmation, hospital employment letter review, and shift premium documentation — accurately assessing the stable income sources that standard screening tools misclassify." },
    ],
    benefits: [
      { title: 'OHRC-Compliant Documented Criteria', description: "Three objective criteria applied uniformly to every Ajax applicant — income ratio, credit score, rental history — with full documentation for OHRC defense if needed.", icon: 'shield' },
      { title: 'Newcomer Income Verification', description: "Employment letter and employer call verification substituting for absent Canadian credit history — correctly evaluating Ajax's growing newcomer applicant pool.", icon: 'users' },
      { title: 'Healthcare and Industrial Income Assessment', description: "Shift-based income, union wage confirmation, and hospital employment letter review — accurately screening Ajax's healthcare and industrial worker applicants.", icon: 'check' },
      { title: '48-Hour Full Screening', description: 'Complete credit, employment, and reference checks within 48 hours — thoroughness without sacrificing speed in Ajax\'s competitive qualified applicant market.', icon: 'clock' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Application Collection', description: 'Standardized application capturing employment type, income documentation, rental history, and three references.' },
      { stepNumber: 2, title: 'Credit and Income Check', description: 'Equifax or TransUnion report, income-to-rent ratio calculation, and employment documentation review.' },
      { stepNumber: 3, title: 'Employment Verification', description: "Employer call, union wage confirmation, hospital employment letter review, or newcomer income documentation — adapted to Ajax's employment profile." },
      { stepNumber: 4, title: 'Owner Summary and Selection', description: 'Screening summary with recommendation — owner makes final selection with full documented evidence file for OHRC defense if needed.' },
    ],
    testimonial: {
      name: 'Grace Okonkwo',
      city: 'Ajax',
      quote: "Durham Region tenants are sophisticated — PM's documented screening criteria was essential when a rejected applicant contacted us about a human rights inquiry. The file was clean and the inquiry went nowhere.",
      outcome: 'Human rights inquiry resolved without proceedings due to fully documented objective screening criteria',
    },
    faq: [
      { question: "Can I reject an Ajax applicant who doesn't have Canadian credit history?", answer: "You can decline an applicant who does not meet income and rental history criteria regardless of credit history origin. However, rejecting a newcomer applicant solely for lacking Canadian credit history — when their employment income meets your ratio requirement — risks an OHRC complaint. MoveSmart substitutes employment verification and international reference assessment for absent Canadian credit history, correctly evaluating the full qualified applicant pool." },
      { question: 'What income documentation should I require for Ajax hospital and industrial workers?', answer: "For Ajax-Pickering Hospital employees, an employment letter from Human Resources confirming full-time status and annual salary is more reliable than pay stubs, which reflect shift premiums inconsistently. For Bayly St industrial and union workers, a union contract wage confirmation alongside the employment letter provides the most accurate income picture." },
      { question: 'What is the income-to-rent ratio benchmark for Ajax units?', answer: "The standard is gross monthly household income ≥3x monthly rent. For a $1,841/month Ajax 1BR, that means ≥$5,523/month gross income. For a $2,192/month 2BR, ≥$6,576/month. Applied uniformly to all applicants, this ratio is both an effective filter and OHRC-compliant documentation that financial criteria — not prohibited grounds — drove every selection decision." },
    ],
  },
  {
    citySlug: 'ajax',
    serviceSlug: 'lease-management',
    heroHeadline: 'Ajax Lease Management — Guideline Increases, Condo Rules, and N1 Compliance',
    heroSubheadline: "Ajax's mix of pre-2018 and newer units requires tracking each property's rent control status — missing the 90-day N1 window costs you a full year of eligible rent.",
    localBodyParagraphs: [
      "Ajax's rental housing stock spans a wide construction date range — from 1970s and 1980s stock in Westney Heights and West Ajax to post-2018 Duffins Heights construction. This matters financially: units first occupied before November 15, 2018 are subject to Ontario's annual rent increase guideline (2.1% for 2026) and require N1 notices served with exactly 90 days' advance notice. Units first occupied after that date are exempt from guideline control — landlords can increase by any amount with 90 days' proper N2 notice. Ajax landlords who don't know which tier their property falls in are either leaving legitimate increases uncollected or applying the wrong notice form.",
      "Harwood Ave condo units require a lease package that includes more than the Ontario Standard Lease. Each condo corporation has building-specific rules — visitor parking limits, pet weight restrictions, elevator booking procedures, smoking policies — that become lease terms the moment a tenant acknowledges them at signing. Without a condo-specific addendum, any of these rules is a liability: the tenant can claim they were never disclosed. An addendum signed at lease execution, updated whenever the condo corp amends its rules, eliminates this exposure entirely.",
      "Ajax's lease renewal process is a retention opportunity that most landlords approach as a paperwork exercise. At the 90-day mark before renewal, the correct question is not just 'how much can I increase rent?' but 'what would it cost to replace this tenant?' — factoring in vacancy, placement fees, and the risk of a worse tenancy. For a Duffins Heights townhouse at $2,300/month, two weeks of vacancy costs $1,150. A thoughtful renewal conversation that delivers a fair, clearly explained increase retains the tenant and prevents that cost. MoveSmart initiates renewal outreach at 90 days with a market analysis that supports the conversation.",
    ],
    painPoints: [
      { problem: "Ajax landlords who own pre-2018 units frequently miss the 90-day N1 deadline — serving notices at 60 or 75 days — voiding the increase and losing a full year of eligible rent against a 2.1% guideline.", solution: "Automated rent increase tracking from the lease start date: construction date, guideline vs. exempt status, last increase date, and 90-day notice deadline — N1 or N2 generated on schedule without any landlord action required." },
      { problem: "Harwood Ave and Ajax mid-rise condo leases without current building-rules addenda expose landlords to disputes when condo corporations enforce policies the tenant was never told about at signing.", solution: "Condo declaration review before every Ajax condo tenancy — current rules addendum drafted, signed by tenant, and updated whenever the condo corp amends its policies." },
      { problem: "Ajax tenants with pre-2018 leases understand guideline rent control and will formally challenge any N1 that contains a calculation error, wrong effective date, or incorrect construction date classification.", solution: "Every Ajax N1 drafted from verified unit construction records, current guideline rate, and precise 90-day notice calculation — LTB-defensible documentation that withstands challenge from informed Ajax tenants." },
    ],
    benefits: [
      { title: 'Automated N1/N2 Tracking', description: 'Construction date, exemption status, and 12-month eligibility tracked for every Ajax unit — correct notice generated on schedule with no missed deadlines.', icon: 'clock' },
      { title: 'Condo Lease Addendum Package', description: "Current building rules addendum drafted and signed at every Harwood Ave and mid-rise Ajax tenancy — no mid-tenancy surprises from undisclosed condo corp policies.", icon: 'document' },
      { title: 'LTB-Defensible Rent Increase Notices', description: 'Every Ajax N1 drafted from verified construction records and current guideline — withstands challenge from sophisticated Durham Region tenants.', icon: 'shield' },
      { title: '90-Day Renewal Outreach', description: "Market analysis-supported renewal conversations initiated at 90 days — Ajax tenant retention strategy that prevents the vacancy cost most landlords don't factor into renewal decisions.", icon: 'star' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Lease Package Preparation', description: 'Ontario Standard Lease plus condo addendum (if applicable) drafted before listing goes live — construction date and exemption status confirmed.' },
      { stepNumber: 2, title: 'Execution and Documentation', description: 'Digital signing, ID verification, LMR collection, and condo corp tenant disclosure documentation.' },
      { stepNumber: 3, title: 'Mid-Tenancy Compliance', description: 'Building rule updates reflected in addenda; sublet and assignment requests handled through documented RTA-compliant processes; AGI eligibility tracked.' },
      { stepNumber: 4, title: 'Renewal or Termination', description: '90-day renewal outreach with market analysis, N1/N2 drafting, and renewal negotiation — or mutual termination documentation if tenant is departing.' },
    ],
    testimonial: {
      name: 'Mohammed Al-Hassan',
      city: 'Ajax',
      quote: "Our pre-2018 Ajax unit required specific N1 rent increase procedures — PM filed correctly and we took the full 2.1% guideline increase without any tenant dispute. First time in three years we got the full increase.",
      outcome: 'Full 2.1% guideline increase collected without dispute using correct N1 procedure on pre-2018 Ajax unit',
    },
    faq: [
      { question: 'How do I know if my Ajax unit is subject to rent control?', answer: "Units first occupied as a residential rental before November 15, 2018 are subject to the annual rent increase guideline (2.1% for 2026). Units first occupied after that date are exempt and can be increased by any amount with 90 days' N2 notice. The key date is the first date the unit was occupied as a rental — not the building construction date. MoveSmart verifies this for every Ajax unit under management." },
      { question: 'What is the penalty for serving an N1 with fewer than 90 days notice in Ajax?', answer: "An N1 served with fewer than 90 days notice is technically invalid — the rent increase cannot take effect on the stated date. The landlord must start the 90-day notice period over, delaying the increase by months. In a 2.1% guideline year on a $2,100/month Ajax unit, that is approximately $44/month lost for every month of delay." },
      { question: "Do I need to update my Ajax condo lease when the building's rules change?", answer: "Not immediately mandatory, but strongly recommended. If the condo corporation amends its rules after your lease was signed and you do not notify the tenant, they can argue the rules don't apply to their tenancy. MoveSmart issues written rule change notifications to Ajax condo tenants and maintains an updated addendum — a simple step that prevents disputes over newly-enforced policies." },
    ],
  },
  {
    citySlug: 'ajax',
    serviceSlug: 'financial-reporting',
    heroHeadline: 'Ajax Rental Financial Reporting — Know Your True Returns in a Margin-Compressed Market',
    heroSubheadline: "Ajax investors face guideline-capped revenue and rising cost inputs — monthly financial reporting is the only way to see margin compression before it becomes a cash flow crisis.",
    localBodyParagraphs: [
      "Ajax's rental investment math in 2025 is under pressure from two directions simultaneously: revenue is declining modestly (rents down 2.9% YoY) while costs are increasing materially (property taxes up 1.1–1.3% of assessed value, insurance premiums up 15–30%). For pre-2018 units where rent increases are capped at the 2.1% guideline, this creates a structural margin squeeze. Without monthly NOI tracking that separates gross rent, vacancy losses, operating costs, and net income, Ajax landlords are navigating a margin compression story using only their bank account balance — too imprecise to make informed decisions about rent increases, capital investments, or property repositioning.",
      "The competitive positioning insight from accurate financial reporting is often the most immediately actionable output. When a monthly report shows that an Ajax GO corridor condo is generating $95/month below what comparable Pickering GO corridor units are commanding, the management response is clear: the property is being under-positioned on its transit narrative and needs to be repositioned at next lease renewal. This is not a hypothetical — it is exactly the type of market intelligence that Move Smart's financial reports surface for Ajax investors.",
      "CRA's rental income enforcement has intensified significantly. The CRA's data-matching systems cross-reference T776 declarations against property registry records, bank deposits, and prior STR platform income. Ajax landlords with multiple units, recent STR-to-long-term-rental conversions, or capital improvement histories need organized records that correctly categorize all income and allowable deductions. An above-guideline increase recovery, a builder warranty reimbursement, and a maintenance capital expenditure all have different tax treatment — mixing them incorrectly creates CRA exposure that a well-organized reporting system prevents.",
    ],
    painPoints: [
      { problem: "Ajax investors facing simultaneous rent softening and cost escalation (taxes, insurance) cannot see their true margin compression without monthly NOI reporting — discovering the problem at year-end tax filing means a full year of suboptimal decisions.", solution: "Monthly NOI statements tracking gross rent, vacancy, property taxes, insurance, maintenance, and management costs — 12-month trend visibility that surfaces margin compression when it begins, not a year later." },
      { problem: "Ajax GO corridor units priced below the Pickering GO corridor equivalent generate lower returns than the market supports — without comparable-market financial analysis, landlords don't know they are underperforming and don't make the repositioning decisions that would close the gap.", solution: "Annual performance analysis benchmarking Ajax unit returns against Durham Region comparables — identifying rent positioning gaps (like the Ajax-vs-Pickering corridor differential) that inform renewal and marketing strategy." },
      { problem: "Ajax landlords with capital improvements, AGI recoveries, and builder warranty reimbursements have complex income and expense records that require correct categorization for CRA T776 accuracy — bank statement approximation creates audit exposure.", solution: "CRA-ready income and expense ledger with proper categorization of all allowable deductions, capital cost categories, and AGI recovery income — T776 preparation simplified and defensible at audit." },
    ],
    benefits: [
      { title: 'Monthly NOI Statements', description: 'Gross rent, vacancy, taxes, insurance, maintenance, and net operating income — one Ajax-specific report, every month, with 12-month trend tracking.', icon: 'chart' },
      { title: 'Durham Corridor Benchmarking', description: 'Annual performance analysis comparing Ajax unit returns against Pickering and Oshawa GO corridor comparables — surfacing positioning gaps that drive renewal and repositioning decisions.', icon: 'star' },
      { title: 'AGI and Capital Recovery Tracking', description: 'Above-guideline increase recoveries and builder warranty reimbursements correctly categorized alongside routine expenses — accurate CRA treatment for all Ajax income types.', icon: 'document' },
      { title: 'Year-End Tax Package', description: 'Organized income and expense summary with CRA deduction categorization — T776 filing simplified for single or multi-unit Ajax investors.', icon: 'check' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Ledger Setup', description: 'Income and expense categories established from day one — rent, vacancy, taxes, insurance, maintenance, AGI recoveries, and management costs.' },
      { stepNumber: 2, title: 'Monthly Reporting', description: 'Owner portal updated monthly with income statement, vacancy metrics, cost breakdown, and 3-month and 12-month trend.' },
      { stepNumber: 3, title: 'Annual Performance Analysis', description: 'Year-over-year NOI comparison, Durham corridor benchmarking, maintenance cost analysis, and rent increase opportunity assessment.' },
      { stepNumber: 4, title: 'Tax Package', description: 'Year-end income and expense summary with CRA deduction categorization — ready for T776 filing or accountant handoff.' },
    ],
    testimonial: {
      name: 'Linda Castillo',
      city: 'Ajax',
      quote: "Reports showed our Ajax GO condo was $95/month below what Pickering GO corridor units fetched — PM repositioned with better transit narrative and raised rent at renewal. Closed the gap completely.",
      outcome: '$95/month rent increase at renewal by repositioning Ajax GO unit against Pickering corridor comparables',
    },
    faq: [
      { question: 'What expenses can I deduct against my Ajax rental income?', answer: "Mortgage interest, property taxes, condo fees, insurance, maintenance and repairs, management fees, and advertising are all fully deductible. Capital improvements (roof replacement, HVAC installation) must be depreciated via Capital Cost Allowance rather than expensed in the year incurred. AGI recovery amounts received from tenants are taxable income. MoveSmart categorizes all of these correctly." },
      { question: "How does Ajax's property tax rate compare to other Durham Region cities for rental properties?", answer: "Ajax's property tax rate runs approximately 1.1–1.3% of assessed value — comparable to Pickering and slightly below Oshawa. For an Ajax condo assessed at $500,000, that is $5,500–$6,500 annually in property taxes. With insurance premiums also rising 15–30%, accurate expense tracking is essential — these two cost lines alone can determine whether an Ajax investment is cash-flow positive or negative." },
      { question: "I converted my Ajax unit from STR to long-term rental in 2024 — does that create CRA complexity?", answer: "Yes. The conversion from STR to long-term rental triggers a change-in-use under CRA rules, potentially creating a deemed disposition at fair market value. Historical STR income must be correctly reported and reconciled against current long-term rental income. MoveSmart's reporting system tracks the transition year separately, ensuring correct T776 treatment and minimizing audit exposure." },
    ],
  },
  {
    citySlug: 'ajax',
    serviceSlug: 'eviction-services',
    heroHeadline: 'Ajax LTB Applications — Documentation That Wins When Durham Tenants Know Their Rights',
    heroSubheadline: "Ajax tenants are increasingly sophisticated about LTB procedure — a technically flawed notice can restart the clock and delay resolution by weeks.",
    localBodyParagraphs: [
      "Ajax's rental market tenant sophistication is a product of its demographic composition. GTA commuters with professional employment bring their workplace problem-solving approach to tenancy disputes. Healthcare workers at Ajax-Pickering Hospital know institutional processes. Newcomer communities share legal information within tight social networks. The result is an Ajax tenant cohort where a meaningful percentage of tenants who receive an N4 or N12 notice will review it against the RTA requirements before responding. Any technical error — wrong outstanding amount, incorrect termination date calculation, improper service method — will be identified and used to delay the proceeding.",
      "The most common Ajax eviction proceeding errors occur in three places: the N4 notice itself (incorrect outstanding amount or termination date), the service method documentation (no proof that notice was left in the correct manner), and the post-N4 period (accepting partial rent without a written agreement, which voids the notice entirely). Each of these errors restarts the clock in a market where the LTB queue already stretches months for contested hearings. The testimony attached to this service — an order issued in 47 days — represents what correct documentation achieves: a straightforward hearing with no procedural challenges.",
      "Ajax's diversity creates one eviction-specific complexity that standard LTB templates don't address: multi-occupant newcomer households where multiple family members or co-tenants are on the lease. An N4 served to one leaseholder when multiple are named may be challenged as improperly served. An L2 application filed without naming all tenants on the original lease creates a fatal error that dismisses the application. MoveSmart verifies every named party on every Ajax lease before any notice is prepared — a step that most individual landlords skip and later regret.",
    ],
    painPoints: [
      { problem: "Ajax tenants who receive N4 notices review them against RTA requirements before responding — a calculation error on the outstanding amount or a wrong termination date is identified immediately and used to delay the entire proceeding.", solution: "N4 drafted from verified Ajax rent ledger with precise outstanding amount, correctly calculated 7-day termination date, and service by documented method — no technical errors that restart the clock." },
      { problem: "Ajax newcomer households often have multiple named tenants on the lease — an N4 or L1 application that omits a named tenant is fatally defective and will be dismissed at the LTB hearing.", solution: "Every Ajax notice verified against the original lease for all named parties — every tenant on the Ajax lease served and named in every LTB application, with service documentation for each." },
      { problem: "Ajax landlords who accept partial rent after serving an N4 — often under pressure from a sympathetic tenant situation — void the notice and restart the entire process, extending the arrears period by weeks.", solution: "MoveSmart maintains strict post-N4 payment protocol: no partial rent accepted without a documented written partial payment agreement that explicitly preserves the notice — protecting the L1 filing position." },
    ],
    benefits: [
      { title: 'LTB-Compliant Notice Drafting', description: "N4 drafted from verified rent ledger with precise amounts, correct termination date, and documented service — withstands technical challenge from Ajax's informed tenant population.", icon: 'document' },
      { title: 'Multi-Tenant Service Protocol', description: "All named tenants on Ajax leases identified and served before any LTB filing — no fatally defective applications from missed parties on newcomer household leases.", icon: 'users' },
      { title: 'Post-N4 Payment Discipline', description: 'No partial rent accepted without written agreement preserving the notice — protecting the L1 filing timeline at every step of the Ajax eviction process.', icon: 'shield' },
      { title: 'Complete LTB Package', description: 'N4, L1, disclosure documents, and evidence file prepared and filed promptly — no delays in the LTB queue from incomplete applications.', icon: 'clock' },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Arrears Verification', description: 'Rent ledger reviewed and outstanding amount confirmed from documented payment records before any notice is drafted.' },
      { stepNumber: 2, title: 'N4 Notice Preparation', description: 'Precise amount, 7-day termination date, all named tenants identified, and service method selected — drafted to LTB-compliant standard.' },
      { stepNumber: 3, title: 'Cure Period Monitoring', description: "7-day cure period tracked precisely — payment received in full closes the file; non-payment triggers immediate L1 preparation." },
      { stepNumber: 4, title: 'L1 Filing and Hearing', description: 'L1 application filed with complete evidence package; MoveSmart prepares all documentation for LTB hearing and coordinates owner participation.' },
    ],
    testimonial: {
      name: 'Frank Messina',
      city: 'Ajax',
      quote: "Tenant claimed our written notices were void due to a technical error — PM's LTB-compliant documentation made the hearing straightforward. Order issued in 47 days.",
      outcome: 'LTB possession order issued in 47 days despite tenant procedural challenge; documentation was clean',
    },
    faq: [
      { question: 'How long does an LTB eviction proceeding take in Ajax (Durham Region)?', answer: "For uncontested non-payment hearings under Bill 60, timelines have improved — a clean N4 and L1 with no procedural errors can result in a hearing within 6–10 weeks. Contested hearings or those challenged on technical grounds take significantly longer. The 47-day outcome referenced above represents best-case timing with perfect documentation. Most Ajax non-payment proceedings resolve in 8–14 weeks." },
      { question: "What happens if I served an N4 to only one tenant when multiple people are on my Ajax lease?", answer: "An LTB application that fails to name all tenants listed on the lease is fatally defective — it will be dismissed at the hearing. You must re-serve all named tenants and refile, restarting the entire timeline. MoveSmart verifies every named party on every Ajax lease before preparing any notice." },
      { question: 'Can an Ajax tenant file a T6 maintenance application to delay my eviction proceeding?', answer: "Yes, and Ajax tenants do this strategically. A T6 (maintenance application) can be filed by a tenant at any time, including after receiving an N4. At the LTB hearing, the adjudicator may consider unresolved maintenance complaints as context. The best defense is a documented maintenance record showing all requests were acknowledged and addressed — exactly what MoveSmart maintains from day one of every Ajax tenancy." },
    ],
  },
]
