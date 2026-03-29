import type { CityServiceContent, CityDescription } from './batch-1'

export const cityDescriptions: CityDescription[] = [
  {
    citySlug: 'markham',
    descriptionParagraphs: [
      "Markham made headlines in July 2025 when its average one-bedroom rent — ranging from $2,262 to $2,369/month — surpassed Downtown Toronto's average of $2,127, a milestone that reframed the city's investment narrative entirely. At $2.91/sq ft (August 2025), Markham commands premium pricing driven by the densest concentration of corporate head offices outside downtown Toronto: 650+, including IBM Canada HQ, AMD, Qualcomm, Huawei Canada, Tesla, Honda Canada HQ, and over 1,500 life science companies. The employment base creates a tenant pool of senior engineers, directors, and corporate transferees who treat housing as a professional amenity rather than a cost to minimize.",
      "Forty percent of Markham's 350,000 residents are Chinese-Canadian — the highest proportion of any Canadian municipality — with 82.1% visible minorities overall. This demographic reality transforms how rental marketing works: WeChat housing groups, Chinese-language property listings, and Mandarin/Cantonese outreach are not supplementary channels but primary ones. Corporate relocatees from Shanghai, Shenzhen, and Tokyo arrive with employer housing packages, no Canadian credit history, and high monthly budgets. They decide within 48 hours, expect EV charging confirmed in writing, require documented internet speeds, and choose landlords who understand how corporate leases and foreign income verification actually work. Standard Canadian screening frameworks applied without modification will systematically reject the best tenants in the market.",
      "Short-term rentals are entirely prohibited in Markham — there is no Airbnb fallback, no STR licence pathway, and no exception process. Every investor unit must be structured for long-term tenancy from acquisition. This regulatory environment, paradoxically, creates a more professional landlord class: owners who entered expecting STR income have converted to LTR and discovered the corporate lease market rewards quality presentation and responsive management with multi-year tenancies at premium rents. Post-November 2018 units are exempt from rent control, enabling N2 increases on annual renewal. School catchment premiums add a second demand layer: families pay a documented rent premium for specific catchment boundaries, creating seasonal demand spikes in July–August as school-year placements are confirmed.",
    ],
    transitInfo: 'Unionville GO Station (Stouffville line, ~50 min to Union Station). YRT/VIVA Bus Rapid Transit on Highway 7 corridor. Highway 407 ETR (east-west toll expressway) and Highway 404 (DVP extension northbound). Markham Centre is walkable; Cornell and Berczy are car-dependent without BRT access.',
    neighbourhoods: ['Markham Centre/Downtown', 'Unionville', 'Cornell', 'Milliken/Pacific Mall', 'Buttonville/Angus Glen', 'Berczy Village'],
  },
]

export const cityServiceContent: CityServiceContent[] = [
  // ============================================================
  // MARKHAM × 8 SERVICES
  // ============================================================

  // ----------------------------------------------------------
  // 1. TENANT PLACEMENT
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'tenant-placement',
    heroHeadline: 'Place Top-Tier Tech Tenants in Your Markham Unit Fast',
    heroSubheadline: 'We fill Markham vacancies through WeChat, Mandarin outreach, and corporate relocation networks — reaching IBM, Huawei, and Honda transferees before they find a competitor.',
    localBody: [
      "Markham's tenant pool is unlike any other GTA market. With 40% Chinese-Canadian residents and a constant flow of corporate transferees arriving from Shanghai, Shenzhen, Beijing, and Tokyo, the first place a qualified tenant looks for housing is not Kijiji or Realtor.ca — it is a WeChat housing group with thousands of active members. We list in these groups in Mandarin and Cantonese, with verified landlord credentials, unit photos formatted for mobile-first viewing, and price comparisons framed the way this audience actually evaluates value. The result is inquiries from tenants already employed at area tech firms within hours of listing.",
      "Corporate relocatees from IBM Canada HQ, Huawei Canada, AMD, Qualcomm, Tesla, and Honda Canada arrive with employer housing allowances ranging from $2,500 to $4,500/month and a mandate to settle within two business days of landing. They are the highest-quality tenants in the Markham market — strong income, employer-backed references, and multi-year tenure — but they require a landlord who responds within hours, not days. Our 48-hour response protocol, pre-screened unit availability confirmations, and corporate lease templates mean you capture this tenant before they move to the next listing on their shortlist.",
      "Beyond the corporate corridor, Markham families compete intensely for specific school catchment addresses, creating a second premium tenant tier. These tenants — often dual-income households with children enrolled at high-ranked Markham public and Catholic schools — sign 12–24 month leases aligned with the school calendar and renew reliably as long as their children remain in the catchment. We target this segment with school district maps integrated into listing descriptions, August listing timing to capture July–August school placement decisions, and lease start dates coordinated with September enrollment deadlines.",
    ],
    painPoints: [
      {
        problem: "Your Markham unit sits vacant for three weeks because your English-language listing on standard platforms never reached the WeChat groups where IBM, Huawei, and Honda transferees find housing within 48 hours of arriving.",
        solution: "We publish in active Markham WeChat housing groups in Mandarin and Cantonese, with employer-verified tenant referrals and a 48-hour response guarantee that matches how corporate relocatees make decisions.",
      },
      {
        problem: "Corporate relocatees from Asia arrive with no Canadian credit history, foreign pay stubs, and employment letters in Mandarin — and get rejected by landlords using standard Canadian screening, leaving your premium unit empty.",
        solution: "We verify income through employer letters from IBM, Huawei, and Honda Canada, cross-reference corporate relocation package amounts, and use OHRC-compliant alternative documentation protocols that correctly identify high-quality tenants.",
      },
      {
        problem: "You've priced your post-2018 Markham unit at $2,100/month, not knowing that the 1BR average surpassed Downtown Toronto at $2,287 in July 2025 — and you're leaving $200+ per month on the table every single lease cycle.",
        solution: "Our Markham-specific rent analysis — using current $/sq ft data, building amenities, EV charging availability, and suite-level comparables — sets the correct market rent before your first showing.",
      },
    ],
    benefits: [
      {
        title: 'WeChat-First Marketing',
        description: 'Mandarin and Cantonese listings distributed to active Markham housing WeChat groups, reaching 40% Chinese-Canadian resident base and incoming corporate relocatees.',
        icon: 'users',
      },
      {
        title: '48-Hour Corporate Response',
        description: 'Tech sector tenants from IBM, Huawei, and AMD make decisions in under 48 hours. Our rapid-response protocol ensures you never miss a premium corporate applicant.',
        icon: 'clock',
      },
      {
        title: 'School Catchment Targeting',
        description: 'Family tenants pay documented premiums for catchment addresses. We time listings to July–August school placement season and include catchment maps in every listing.',
        icon: 'home',
      },
      {
        title: 'OHRC-Compliant Screening',
        description: 'Foreign income verification, employer letters, and corporate package documentation processed correctly under Ontario Human Rights Code — no discrimination, no legal exposure.',
        icon: 'shield',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Market Analysis and Pricing',
        description: 'We pull current Markham $/sq ft data, EV charging premiums, and catchment comparables to set a rent that reflects the post-July 2025 market reality — not last year\'s numbers.',
      },
      {
        stepNumber: 2,
        title: 'Multi-Channel Listing Launch',
        description: 'Unit goes live on WeChat housing groups in Mandarin/Cantonese, MLS, corporate relocation platforms, and life sciences / tech company housing boards simultaneously.',
      },
      {
        stepNumber: 3,
        title: 'Rapid Applicant Response',
        description: 'All inquiries acknowledged within 4 hours, showings booked within 24 hours, and corporate relocatee applications processed with employer-letter income verification.',
      },
      {
        stepNumber: 4,
        title: 'Lease Execution and Handover',
        description: 'Signed Ontario Standard Lease with corporate addenda, first/last collected, keys transferred. Full documentation package provided for your CRA T776 records.',
      },
    ],
    testimonial: {
      name: 'Kevin Huang',
      city: 'Cornell, Markham',
      quote: 'I was an AMD senior engineer transferring from the Markham office — no Canadian credit history, employer pay stub in USD. The WeChat listing was the first one I saw that had Mandarin contact info and a landlord who responded the same afternoon. Signed in 12 days.',
      outcome: 'Cornell townhouse leased at $3,100/month to AMD senior engineer. 12-day placement from listing to signed lease.',
    },
    faq: [
      {
        question: 'How does WeChat listing work for my Markham rental?',
        answer: 'We have established presence in the major Markham and GTA Chinese-language housing WeChat groups. Listings are posted in Mandarin with verified landlord credentials, unit photos, and price context. Responses come from locally employed tenants and corporate relocatees before most English-language listings even receive their first view.',
      },
      {
        question: 'A corporate relocatee has no Canadian credit history. Can I still accept them?',
        answer: 'Yes, and you should — they are typically the strongest tenants in Markham. We verify income through corporate relocation package letters, employer reference contacts at IBM/Huawei/Honda Canada HR departments, and cross-check housing allowance amounts. OHRC requires income-source-neutral evaluation, and these tenants meet the bar.',
      },
      {
        question: 'When should I list my Markham unit to capture school catchment demand?',
        answer: 'List in early July for September move-ins. School placement confirmations arrive in June and families move urgently. A unit listed August 1 misses the peak window. We time your listing to the school calendar to maximize the catchment premium tenant pool.',
      },
      {
        question: 'What rent should I charge? I thought Markham was cheaper than Toronto.',
        answer: 'That changed in July 2025. Markham 1BR rents of $2,262–$2,369/month now exceed Downtown Toronto\'s $2,127 average. At $2.91/sq ft (August 2025), Markham commands GTA-leading rents for well-maintained, EV-charge-equipped units near GO stations and corporate campuses.',
      },
      {
        question: 'How quickly can you place a tenant in my vacant Markham unit?',
        answer: 'Average placement for priced-correctly Markham units is 10–18 days from listing launch. Corporate relocatee placements are faster — often 5–10 days — because applicants are pre-motivated and employer-resourced. School catchment family placements take slightly longer but result in 2–3 year tenancies.',
      },
    ],
  },

  // ----------------------------------------------------------
  // 2. PROPERTY MANAGEMENT
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'property-management',
    heroHeadline: "Markham's Corporate-Grade Property Management — No Airbnb, No Shortcuts",
    heroSubheadline: 'With STR entirely prohibited in Markham, every investment property requires professional long-term management built for the corporate tenant standard that $2,300+/month rents demand.',
    localBody: [
      "Markham's complete STR prohibition eliminates the Airbnb fallback that investors in other GTA cities use to offset vacancies or supplement income. Every unit in Markham must be managed as a long-term rental from day one. This is not a constraint — it is a competitive advantage for professional operators. Corporate tenants from IBM, Honda Canada, and the 650+ head offices clustered in Markham Centre, Unionville, and the Highway 7 / 404 corridor expect condo-grade management: responsive maintenance, documented building systems, clean common areas, and a landlord who answers within the business day.",
      "Post-2018 units in Markham are exempt from rent control, giving professional managers a tool that tenant-managed properties leave unused: annual N2 rent increases above the provincial guideline, structured at market rate rather than the 2.1% cap. We model each lease renewal against current Markham comparable data, advise on the correct N2 notice amount and timing, and execute increases that keep rents aligned to the market that now surpasses Downtown Toronto. Owners who self-manage often miss this window or apply it incorrectly, leaving thousands annually uncaptured.",
      "Family tenants in Markham's school catchment zones operate on an annual school-year cycle that smart property managers anticipate. June notices, July lease renewals, and August move-ins are clustered in a narrow window. Managing the maintenance queue to deliver a move-in-ready unit by August 1 — fresh paint, functional appliances, confirmed EV charging, and documented internet infrastructure — determines whether you retain your catchment-premium tenant or face a rushed August vacancy at your most competitive moment.",
    ],
    painPoints: [
      {
        problem: "You purchased a Markham condo expecting to list it on Airbnb during slow periods, then discovered STR is entirely prohibited — no licence, no exemption, no path. Your entire investment model depends on long-term management done right.",
        solution: "We convert your unit to a professionally managed LTR with corporate relocation targeting, correct lease structures, and rent levels that reflect Markham's above-Toronto rent premium — often $400–$600/month more than self-managed owners achieve.",
      },
      {
        problem: "Your corporate tenant pays $2,800/month and expects same-day maintenance response. A leaky faucet reported on Tuesday that isn't fixed by Wednesday creates a lease non-renewal and a WeChat review that reaches 10,000 Markham renters.",
        solution: "Our Markham maintenance network has licensed trades on 24-hour call with a 4-hour response SLA for urgent repairs. Every service call is documented with timestamped before/after photos and tenant satisfaction confirmation.",
      },
      {
        problem: "Your post-2018 unit is exempt from rent control, but you haven't served a single N2 notice in three years — leaving cumulative above-guideline increases uncaptured and your rent now $280/month below the current Markham market.",
        solution: "We audit your current rent against live Markham comparables, calculate the N2 increase schedule, serve notices at the legally required 90 days before increase date, and document every step for LTB compliance.",
      },
    ],
    benefits: [
      {
        title: 'STR-to-LTR Conversion Expertise',
        description: 'We restructure units from prohibited STR models to optimized corporate LTR operations, capturing Markham\'s above-Toronto rent levels with proper lease structures from day one.',
        icon: 'home',
      },
      {
        title: 'Rent Control Exemption Management',
        description: 'Post-2018 units qualify for above-guideline increases. We calculate, document, and serve N2 notices at the correct interval to capture full market rent every cycle.',
        icon: 'chart',
      },
      {
        title: 'Corporate Tenant Standard',
        description: 'IBM, Huawei, and Honda Canada employees expect professional-grade management. We deliver the response times and documentation that retain $2,300+/month tenants long-term.',
        icon: 'star',
      },
      {
        title: 'School Calendar Coordination',
        description: 'Family tenant renewals and move-ins cluster in July–August. We coordinate maintenance, inspection, and unit readiness to hit the August 1 school-year deadline every year.',
        icon: 'clock',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Property Onboarding and Audit',
        description: 'We inspect EV charging infrastructure, internet capacity, appliance condition, and rent control exemption status — building the baseline for corporate-grade management.',
      },
      {
        stepNumber: 2,
        title: 'Tenant Relations Takeover',
        description: 'All tenant communication transfers to our bilingual (English/Mandarin) team. Existing leases reviewed, N2 schedules calculated, maintenance SLAs established from day one.',
      },
      {
        stepNumber: 3,
        title: 'Ongoing Operations',
        description: 'Monthly owner statements, quarterly property inspections, 24-hour maintenance dispatch, and annual rent increase management — all coordinated without owner involvement.',
      },
      {
        stepNumber: 4,
        title: 'Performance Reporting',
        description: 'Monthly NOI statements benchmarked against current Markham rent data, with renewal strategy recommendations and market trend alerts tied to IBM/Huawei hiring cycles.',
      },
    ],
    testimonial: {
      name: 'Richard Chen',
      city: 'Markham Centre',
      quote: 'I bought a Markham condo planning to run STR when it wasn\'t rented. Found out STR is completely prohibited the week I got the keys. MoveSmartRentals converted it to a corporate LTR, placed an IBM transferee at $2,650/month, and served a proper N2 for 4.8% on renewal. I\'m actually making more than my STR projection.',
      outcome: 'STR-model condo converted to corporate LTR at $2,650/month. N2 increase of 4.8% on first renewal. Full occupancy maintained.',
    },
    faq: [
      {
        question: 'Is there any way to run a short-term rental in Markham?',
        answer: 'No. Markham prohibits STR entirely — there is no licence pathway and no exemption process. Any unit listed on Airbnb or VRBO in Markham is operating in violation of municipal bylaws and subject to enforcement action. Every investment property in Markham must be managed as a long-term rental.',
      },
      {
        question: 'My unit was built after November 2018. How does rent control exemption work?',
        answer: 'Post-November 15, 2018 units are exempt from the provincial rent increase guideline. You can increase rent above the 2.1% (2026) guideline by serving an N2 notice at least 90 days before the increase date. The increase amount must reflect the market — we calculate this against current Markham comparables and serve the notice correctly to prevent LTB challenges.',
      },
      {
        question: 'What do corporate tenants from IBM or Huawei actually expect from a landlord?',
        answer: 'Same-day response to maintenance requests, documented building systems (EV charging specs, internet speed, appliance age), professional lease documentation with corporate addenda, and a bilingual (English/Mandarin) point of contact. These tenants compare Markham units against Shanghai and Shenzhen corporate housing standards — the bar is high and the rent paid reflects it.',
      },
      {
        question: 'How do you handle the school-year tenant turnover cycle?',
        answer: 'We send renewal notice reminders in April (90 days before July 1 leases expire), confirm school catchment addresses in tenant marketing for July listings, schedule all maintenance and deep-cleaning for the June 15–July 31 window, and target August 1 move-in dates aligned with September enrollment.',
      },
    ],
  },

  // ----------------------------------------------------------
  // 3. RENT COLLECTION
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'rent-collection',
    heroHeadline: 'Automated Rent Collection Built for Markham\'s Corporate Tenant Base',
    heroSubheadline: 'IBM, Huawei, and Honda Canada employees pay digitally and on time — our collection systems match the tech-sector standard your $2,300+/month tenants expect.',
    localBody: [
      "Markham's corporate tenant base is among the most financially reliable in the GTA: senior engineers at IBM, AMD, Qualcomm, and the 650+ area head offices earn $120,000–$250,000 annually, often with housing allowances paid directly by their employer. These tenants don't write cheques — they pay via Interac e-Transfer, wire transfer, or corporate accounts, and they expect rent collection to match the digital infrastructure standard they use at work. A landlord who still accepts post-dated cheques signals an unprofessional operation that doesn't match what a $2,800/month unit should offer.",
      "Corporate relocation packages add a complexity layer standard collection tools miss. Transferees from IBM or Honda Canada often have housing allowances paid on a corporate reimbursement cycle — the employee pays rent, then claims the allowance. Some packages pay the landlord directly via corporate cheque on a net-30 basis. We structure collection to accommodate these corporate payment models, confirm payment mechanics before lease signing, and maintain receipts formatted for both CRA T776 reporting and the tenant's employer reimbursement documentation.",
      "When collection issues arise — rare with this tenant profile, but not impossible — Markham landlords operate under Bill 60's amended N4 procedures: seven days from delivery before the N4 is valid, with digital delivery accepted when the tenant has consented. The LTB hearing backlog in York Region means a non-payment situation that isn't addressed immediately can extend to four to five months from first missed payment to possession order. Early-intervention collection protocols, which we trigger at day three of non-payment, prevent the small problem from becoming the expensive one.",
    ],
    painPoints: [
      {
        problem: "Your Huawei Canada tenant has a corporate housing allowance paid on a 30-day reimbursement cycle — they receive the allowance after paying you, but your automated system flags payment as late because it arrives on day 32 rather than day 1.",
        solution: "We structure collection terms at lease signing to accommodate corporate reimbursement timelines, document the agreed payment schedule, and configure automated reminders that reflect the actual contractual arrangement rather than a generic first-of-month trigger.",
      },
      {
        problem: "Post-dated cheques from a $2,900/month tenant create a professional mismatch — they reflect poorly on your property and create a 6-business-day clearing delay before you know if the payment cleared.",
        solution: "We onboard all Markham tenants to Interac e-Transfer or pre-authorized digital debit at lease signing, with same-day payment confirmation and automated receipts formatted for the tenant\'s employer reimbursement and your CRA T776.",
      },
      {
        problem: "A missed payment from a corporate tenant mid-assignment sits for 12 days before you realize it wasn\'t an error — and now you\'re already behind the N4 timeline clock in a York Region LTB queue with a 4-month average wait.",
        solution: "Our day-3 non-payment alert protocol triggers a direct tenant call, email, and Mandarin WeChat message simultaneously. Most corporate payment issues are administrative errors resolved within 48 hours at this stage — before any N4 is needed.",
      },
    ],
    benefits: [
      {
        title: 'Digital-First Collection',
        description: 'Interac e-Transfer and pre-authorized debit setup at lease signing — matching the tech-sector standard that IBM, Huawei, and AMD employees expect from their landlord.',
        icon: 'check',
      },
      {
        title: 'Corporate Reimbursement Alignment',
        description: 'Collection structures accommodate employer housing allowance cycles. We confirm payment mechanics with corporate HR before lease execution to prevent false-late triggers.',
        icon: 'document',
      },
      {
        title: 'Day-3 Intervention Protocol',
        description: 'Bilingual (English/Mandarin) outreach triggered at day 3 of non-payment resolves most corporate administrative errors before any LTB process becomes necessary.',
        icon: 'clock',
      },
      {
        title: 'Bill 60 N4 Compliance',
        description: 'If escalation is required, we issue N4 notices with correct 7-day timing, digital delivery documentation, and LTB filing prepared from day one of the formal process.',
        icon: 'shield',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Payment Setup at Lease Signing',
        description: 'Every tenant onboarded to digital payment at signing. Corporate reimbursement timelines confirmed in writing. Pre-authorized debit authorization collected where applicable.',
      },
      {
        stepNumber: 2,
        title: 'Automated Monthly Collection',
        description: 'Payment requests sent 5 days before due date. Automated confirmation sent to owner and tenant on payment receipt. Receipts formatted for CRA T776 and employer reimbursement.',
      },
      {
        stepNumber: 3,
        title: 'Day-3 Non-Payment Response',
        description: 'Bilingual outreach via email, call, and WeChat initiated at day 3. Majority of corporate tenant payment gaps are administrative errors resolved at this stage.',
      },
      {
        stepNumber: 4,
        title: 'Formal Escalation if Required',
        description: 'N4 served at day 8 (post 7-day legal window) with digital delivery documentation. LTB application prepared and filed immediately upon N4 expiry if payment not received.',
      },
    ],
    testimonial: {
      name: 'Linda Wu',
      city: 'Markham Centre',
      quote: 'I transferred from IBM Beijing to IBM Canada HQ in Markham. My housing allowance reimbursement comes 30 days after I pay rent. My previous landlord charged me a late fee every month. MoveSmartRentals set the lease up to match my corporate cycle from day one. Two years, zero issues.',
      outcome: 'IBM transferee on 2-year corporate lease. Zero late payments. Corporate reimbursement cycle accommodated at lease structuring.',
    },
    faq: [
      {
        question: 'How do you handle tenants whose rent is paid through a corporate housing allowance?',
        answer: 'At lease signing, we document the exact payment mechanism — whether it\'s employer direct payment, employee reimbursement, or a split arrangement. We configure collection timing to match the corporate cycle and issue receipts in the format required by the employer\'s HR department for reimbursement claims.',
      },
      {
        question: 'What is the N4 notice period in Ontario under Bill 60?',
        answer: 'Under Bill 60, the N4 for non-payment of rent requires a minimum 7-day payment window before it becomes valid (reduced from 14 days under the prior regime for non-payment). We calculate the correct service date, document digital delivery where applicable, and track the 7-day window from confirmed receipt.',
      },
      {
        question: 'My Markham tenant is a senior engineer earning $200K. Why would they ever miss rent?',
        answer: 'Corporate payment issues are almost always administrative: a new bank account, a delayed corporate reimbursement, a payment sent to the wrong recipient. They are rarely a sign of financial distress. Our day-3 protocol resolves nearly all of them with a single message. The risk in Markham is not default — it is miscommunication that becomes a formal process unnecessarily.',
      },
      {
        question: 'Can tenants pay in USD if they\'re on a US-dollar corporate package?',
        answer: 'Leases in Ontario must be denominated in Canadian dollars. We set the lease in CAD, and if the tenant receives a USD corporate package, they convert and pay in CAD. We can provide monthly payment receipts with CAD/USD exchange rate documentation if the employer requires it for US payroll records.',
      },
    ],
  },

  // ----------------------------------------------------------
  // 4. MAINTENANCE & REPAIR
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'maintenance-repair',
    heroHeadline: 'Same-Day Maintenance for Markham\'s $2,300+/Month Corporate Tenants',
    heroSubheadline: 'When your Huawei or Honda Canada tenant reports a maintenance issue, same-day response is the standard — not the exception. We deliver it consistently.',
    localBody: [
      "A corporate tenant paying $2,800/month in Markham compares their housing experience to the corporate apartments their colleagues occupy in Shanghai, Shenzhen, and Tokyo. Maintenance response in those markets is same-day as a baseline. When a leaky faucet reported on Tuesday is still unfixed Friday, the tenant doesn't just complain — they post in the WeChat housing group that 8,000 Markham renters follow, they don't renew, and they tell the HR contact at IBM or Honda who routes the next six corporate relocatee referrals elsewhere. The cost of a slow maintenance response in Markham is far higher than the cost of the repair.",
      "EV charging infrastructure has become a non-negotiable for Markham's tech-sector tenant base. Engineers at Tesla, Qualcomm, and AMD arrive with Model 3s, Model Ys, and Ioniq 6s. A unit without confirmed EV charging capacity — or with a charging unit that develops a fault — triggers urgent maintenance requests and lease non-renewals. We manage EV charging infrastructure as a primary building system: preventive inspections quarterly, licensed electrician dispatch for any fault within 24 hours, and capacity upgrade consultation for strata units where the building is adding EVSE capacity.",
      "Modern appliance condition is the third maintenance priority that Markham's corporate tenant standard demands. Tenants earning $150,000+ annually will not accept a refrigerator from 2008 or a dishwasher that takes two cycles to clean a load. When an appliance reaches end of useful life in a Markham rental, we recommend replacement with current-generation equivalents — not repair of a failing unit. This approach reduces emergency call volume, eliminates repeated service visits, and maintains the professional presentation standard that justifies above-market rents.",
    ],
    painPoints: [
      {
        problem: "Your Markham condo's EV charging unit faults on a Saturday morning, and your Tesla-driving AMD engineer tenant reports it. Your handyman doesn't work weekends and doesn't handle electrical. The unit sits non-functional for 72 hours.",
        solution: "Our licensed electrician network provides 24/7 dispatch for EV charging faults, with a 4-hour response SLA on weekends. EV infrastructure is managed as a primary system — not an amenity — with quarterly preventive inspection to prevent Saturday failures.",
      },
      {
        problem: "Your IBM Canada tenant's dishwasher has failed twice in eight months. Each repair costs $180–$240, takes a week to schedule, and leaves the tenant without a functioning unit during that time — at a rent of $2,750/month.",
        solution: "After the second failure on a unit over 8 years old, we recommend replacement over repair. Current-generation dishwasher installation costs $650–$900 all-in, eliminates recurring call volume, and restores the appliance presentation standard that justifies the rent.",
      },
      {
        problem: "A Markham tenant reports a slow drain and mold smell in the bathroom. It\'s logged in your system but not dispatched because it seems non-urgent. Six weeks later it\'s a major mold remediation and an LTB maintenance application.",
        solution: "Our triage system flags water-related reports as urgent regardless of apparent severity. A plumber scopes the drain within 48 hours, documents findings with photos, and determines whether the repair is a $120 drain clear or a $1,800 pipe repair — before it becomes a $12,000 remediation.",
      },
    ],
    benefits: [
      {
        title: '4-Hour Urgent Response SLA',
        description: 'All urgent maintenance — HVAC, plumbing, EV charging, appliance failure — dispatched within 4 hours including evenings and weekends. Documented response times for every work order.',
        icon: 'clock',
      },
      {
        title: 'EV Infrastructure Management',
        description: 'Quarterly preventive inspections and licensed electrician dispatch for all EV charging systems. Capacity upgrade consultation for buildings adding new EVSE units.',
        icon: 'check',
      },
      {
        title: 'Appliance Replacement Advisory',
        description: 'We track appliance age and failure history. Units reaching end-of-life threshold receive replacement recommendations before they generate emergency calls at $2,800/month rents.',
        icon: 'home',
      },
      {
        title: 'Documented Work Orders',
        description: 'Every maintenance call produces a timestamped work order with before/after photos and tenant confirmation — protecting you at the LTB and satisfying corporate tenant documentation standards.',
        icon: 'document',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Maintenance Request Intake',
        description: 'Tenants report via bilingual (English/Mandarin) portal, WhatsApp, or WeChat. All requests triaged within 2 hours and urgency level assigned with estimated response time.',
      },
      {
        stepNumber: 2,
        title: 'Trade Dispatch',
        description: 'Appropriate licensed trade dispatched from our Markham network with access instructions. Tenant notified of technician name, estimated arrival window, and scope of work.',
      },
      {
        stepNumber: 3,
        title: 'Repair Execution and Documentation',
        description: 'Work completed, before/after photos taken, tenant sign-off collected. Work order closed with full documentation uploaded to owner portal same day.',
      },
      {
        stepNumber: 4,
        title: 'Owner Reporting and Cost Approval',
        description: 'Repairs under pre-approved threshold executed and reported. Repairs above threshold receive owner notification with quote, photo evidence, and recommended action within 24 hours.',
      },
    ],
    testimonial: {
      name: 'Jennifer Lee',
      city: 'Buttonville, Markham',
      quote: 'I\'m a Honda Canada executive and I travel constantly. My EV charger faulted on a Thursday night — I was in Tokyo. MoveSmartRentals had an electrician there Friday morning, the unit was fixed before I landed Saturday. That\'s the level of service I need from a property manager.',
      outcome: 'Buttonville furnished unit. EV charging fault resolved in 14 hours including overnight. Honda Canada executive tenant retained for 18-month renewal.',
    },
    faq: [
      {
        question: 'What maintenance response time can my Markham tenant expect?',
        answer: 'Urgent requests (no heat, no water, EV charging failure, appliance failure affecting habitability) are dispatched within 4 hours, 7 days a week. Non-urgent requests (slow drain, minor appliance issue, cosmetic) are scheduled within 48–72 hours with tenant confirmation of a convenient time.',
      },
      {
        question: 'Do you manage EV charging infrastructure specifically?',
        answer: 'Yes. EV charging is a primary system in Markham given the tech-sector tenant base. We conduct quarterly preventive inspections, maintain a licensed electrician on 24-hour call for faults, and advise on building EVSE capacity upgrades when strata buildings are adding new charging stations.',
      },
      {
        question: 'My Markham tenant submitted a maintenance request but I think it\'s their responsibility, not mine. How do you handle that?',
        answer: 'We triage ownership on every request before dispatching. Tenant-caused damage (accidental or intentional) is documented, the tenant notified of their liability, and the repair coordinated — with cost recovery from the security deposit or direct billing, depending on the lease terms and circumstances.',
      },
      {
        question: 'What happens if a repair costs more than expected?',
        answer: 'We have a pre-approved repair threshold (set by you at onboarding — typically $300–$500). Repairs below the threshold are executed and reported. Above the threshold, we send you a full quote with photos and a recommendation within 24 hours before any work proceeds.',
      },
    ],
  },

  // ----------------------------------------------------------
  // 5. TENANT SCREENING
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'tenant-screening',
    heroHeadline: 'OHRC-Compliant Screening That Finds Markham\'s Best Tenants — Not Just Local Ones',
    heroSubheadline: 'Forty percent of Markham renters are Chinese-Canadian. Corporate relocatees from Asia have no Canadian credit. Standard screening frameworks reject your best applicants.',
    localBody: [
      "Ontario Human Rights Code Section 2 prohibits discrimination based on race, ancestry, place of origin, and citizenship status in housing. Markham's 82.1% visible minority population and constant flow of new corporate transferees means every screening decision carries elevated OHRC exposure. A landlord who declines a Huawei Canada transferee because they have no Canadian credit history — without considering employment letters, housing allowance documentation, and corporate references — is not just making a business error; they are creating a potential HRTO application. We screen for financial reliability, not demographic proxies for it.",
      "Corporate relocatees from IBM, Huawei, Honda Canada, AMD, and Qualcomm often present unusual income documentation: T4s are missing because they haven't filed a Canadian return yet; pay stubs are in USD, RMB, or JPY; employment letters are written on letterhead from a foreign subsidiary. We verify these through direct employer contact with Canadian HR departments, cross-reference corporate housing allowance amounts against the unit's rent, and use the CMHC rent-to-income guideline applied to gross income — not net, not Canadian-only income. This approach correctly identifies six-figure earners who would be rejected by a standard equifax-only screen.",
      "Life sciences professionals from Markham's 1,500+ biotech and pharmaceutical companies, and the secondary population of Milliken/Pacific Mall area tenants, present a further screening dimension: self-employed income, partnership income, and small business owner income that requires NOA review, business financial statements, and multi-year income confirmation. We review CRA documentation, confirm income consistency, and evaluate business sector stability — distinguishing a profitable pharmacist with 10 years of practice from a startup founder with one year of variable income.",
    ],
    painPoints: [
      {
        problem: "A Honda Canada senior manager applies for your Markham unit: six-figure income, employer letter, corporate housing allowance — but no Canadian credit history. Your standard screening software auto-declines them. Your unit stays vacant another three weeks.",
        solution: "We screen corporate relocatees through direct employer HR contact, housing allowance verification, and employment contract review. No Canadian credit history is not a disqualifier when income documentation from a Fortune 500 employer is available and verified.",
      },
      {
        problem: "You declined a Chinese-Canadian applicant based on 'insufficient Canadian credit history' but accepted a Canadian-born applicant with a lower income and a 650 credit score. That's a pattern the HRTO investigates.",
        solution: "Our screening uses a documented, income-first evaluation framework applied identically to every applicant regardless of origin. Credit history is one data point among six — not a standalone qualifier — and the weighting is consistent and documented across every application.",
      },
      {
        problem: "A life sciences professional from Markham's biotech corridor is self-employed through their corporation. Their NOA shows $85,000 in personal income but their actual corporate revenue is $340,000. Standard screening rejects them as below the rent-to-income threshold.",
        solution: "We review T2 corporate returns, NOA, and corporate bank statements for self-employed applicants. Income evaluation reflects total financial capacity, not just the personal salary elected from a profitable professional corporation.",
      },
    ],
    benefits: [
      {
        title: 'OHRC-Compliant Framework',
        description: 'Documented screening criteria applied identically to every applicant. Income-first evaluation that correctly qualifies corporate relocatees without Canadian credit history.',
        icon: 'shield',
      },
      {
        title: 'Corporate Income Verification',
        description: 'Direct HR contact with IBM, Huawei, Honda Canada, and AMD. Housing allowance cross-referencing and employment contract review for all corporate applicants.',
        icon: 'document',
      },
      {
        title: 'Foreign Income Translation',
        description: 'USD, RMB, JPY, and EUR income verified through corporate confirmation and converted to CAD for rent-to-income analysis. No qualified applicant rejected due to documentation format.',
        icon: 'users',
      },
      {
        title: 'Self-Employed Income Analysis',
        description: 'Life sciences and tech entrepreneurs reviewed via T2 corporate returns and corporate financials — capturing Markham\'s substantial self-employed professional population.',
        icon: 'chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Application Collection',
        description: 'Bilingual (English/Mandarin) application form collects income source, employment status, and documentation type before Equifax pull — right-sizing the verification approach for each applicant.',
      },
      {
        stepNumber: 2,
        title: 'Income Verification',
        description: 'Employment income: T4 + employer letter + direct HR contact. Corporate relocatee: housing allowance letter + corporate HR call. Self-employed: NOA + T2 + corporate bank statement.',
      },
      {
        stepNumber: 3,
        title: 'Credit and Reference Review',
        description: 'Credit report reviewed in context of income and residency history. No-Canadian-credit applicants evaluated on employment documentation. References contacted — including previous corporate housing managers.',
      },
      {
        stepNumber: 4,
        title: 'Decision Documentation',
        description: 'Every acceptance and decline is documented with criteria applied, supporting evidence reviewed, and decision rationale. Full OHRC audit trail maintained for every application.',
      },
    ],
    testimonial: {
      name: 'David Wong',
      city: 'Milliken, Markham',
      quote: 'I\'m a life sciences professional incorporated through my own company. Every time I apply for a rental in Markham, landlords look at my personal NOA and say I don\'t earn enough. MoveSmartRentals reviewed my T2 and corporate bank statements, confirmed my income correctly, and approved me in 36 hours. First time that\'s happened in three years.',
      outcome: 'Milliken area unit leased to life sciences professional. Self-employed income correctly verified via T2 and corporate financials. 18-month tenancy with renewal.',
    },
    faq: [
      {
        question: 'Can I decline an applicant who has no Canadian credit history?',
        answer: 'You can decline based on insufficient income documentation — but not based on the absence of a Canadian credit file alone, particularly if the applicant is a recent arrival from abroad. No Canadian credit history is common among corporate relocatees from Asia who arrived within the last 12 months and does not indicate financial risk when verified employment income is present.',
      },
      {
        question: 'How do you verify income from a Chinese or Japanese employer?',
        answer: 'We contact the Canadian subsidiary HR department directly — IBM Canada, Huawei Canada, Honda Canada — and verify the employment letter, housing allowance amount, and salary range against the Canadian payroll record. We do not rely solely on documents provided by the applicant.',
      },
      {
        question: 'What rent-to-income threshold do you apply in Markham?',
        answer: 'We use the CMHC 30–35% gross income threshold applied to verified gross income, not take-home. For corporate relocatees with housing allowances, the allowance amount is treated as housing-designated income. A senior engineer with $220,000 gross and a $3,000/month allowance qualifies for any Markham rental with significant margin.',
      },
      {
        question: 'How long does the screening process take for a corporate relocatee?',
        answer: 'Typically 24–48 hours from application submission when the applicant provides complete documentation. Corporate relocatees with time-sensitive housing allowance windows get priority processing — we flag urgent corporate applications and complete the review within 24 hours of document receipt.',
      },
      {
        question: 'What if an applicant provides fraudulent documents?',
        answer: 'We verify directly with employers rather than relying on applicant-provided documents as the sole source. Pay stubs and employment letters are cross-referenced against direct HR confirmation. All verified documentation is retained in our records. Fraudulent applications are declined and flagged per our screening policy.',
      },
    ],
  },

  // ----------------------------------------------------------
  // 6. LEASE MANAGEMENT
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'lease-management',
    heroHeadline: 'Corporate Lease Structures for Markham\'s IBM, Huawei, and Honda Tenants',
    heroSubheadline: 'Standard Ontario leases don\'t accommodate COLA clauses, corporate early termination, or furnished-unit structures. Markham\'s corporate tenant base demands more — and so should your lease.',
    localBody: [
      "The Ontario Standard Lease (Form 2229E) provides the mandatory baseline for every residential tenancy in Markham. But for corporate tenants arriving with employer housing packages from IBM, Huawei, Honda Canada, and the 650+ head offices in the city, the standard form is a starting point — not an endpoint. Corporate relocatee leases commonly require addenda addressing cost-of-living adjustment provisions for multi-year terms, early termination rights tied to employment assignment end dates, furnished-unit inventory schedules with replacement value documentation, and receipt formats approved by the employer's HR and finance departments.",
      "Post-November 2018 units in Markham are exempt from rent control, which creates a lease management opportunity that many landlords leave unexercised. N2 rent increase notices — available only for exempt units — must be served a minimum of 90 days before the increase takes effect, with the correct prescribed form and proper documentation of the new amount. Landlords who serve N2 notices without the correct form, at the wrong interval, or with calculation errors face LTB challenges that can void the increase. We calculate, prepare, and serve every N2 with the full legal package attached.",
      "Furnished unit leases — in demand from corporate relocatees who arrive with only personal effects and expect a turnkey home — require a separate furniture inventory schedule, replacement value insurance provisions, and a clear restoration clause. These provisions, when drafted correctly, protect the landlord's furniture investment and clarify the tenant's obligations at move-out. Without a documented inventory at move-in with photographs and values, furniture disputes at the LTB are decided on the tenant's account of what condition items were in at arrival.",
    ],
    painPoints: [
      {
        problem: "Your Markham tenant's IBM assignment ends 14 months into a 24-month lease. There's no early termination clause in your standard lease — they vacate anyway, and you're pursuing an N8 application at the LTB while the unit sits empty.",
        solution: "Corporate leases in Markham should include a negotiated early termination provision: 60 days notice, forfeiture of last month's deposit, and a lease-break fee. Properly drafted, this is enforceable and eliminates LTB proceedings when corporate assignments end early.",
      },
      {
        problem: "You served an N2 rent increase notice on your post-2018 Markham unit but used the wrong form and served it 75 days before the increase date instead of 90. The tenant challenges it at the LTB and the increase is voided for the entire year.",
        solution: "We prepare every N2 using the current prescribed form, calculate the 90-day service deadline from the intended increase date, and deliver with documented proof of service. Every step of the N2 process is completed correctly the first time.",
      },
      {
        problem: "Your furnished Markham unit had a $1,400 dining table at move-in. Fourteen months later, the tenant claims it arrived scratched. You have no move-in inventory, no photos, and no documentation. The LTB adjudicator sides with the tenant.",
        solution: "Every furnished unit tenancy starts with a full inventory schedule: item-by-item description, condition notes, and photographic documentation signed by the tenant at move-in. The schedule is attached to the lease as a binding schedule with replacement value noted for each item.",
      },
    ],
    benefits: [
      {
        title: 'Corporate Lease Addenda',
        description: 'COLA clauses, assignment-linked early termination provisions, and corporate receipt formatting — all drafted as enforceable addenda to the Ontario Standard Lease.',
        icon: 'document',
      },
      {
        title: 'N2 Notice Precision',
        description: 'Post-2018 rent control exempt units managed with correctly calculated, properly served N2 notices at the full 90-day interval — capturing above-guideline increases without LTB challenge.',
        icon: 'check',
      },
      {
        title: 'Furnished Unit Inventory',
        description: 'Move-in inventory schedules with photographs and replacement values, signed by tenant, attached as binding lease schedule. Full protection at move-out dispute.',
        icon: 'home',
      },
      {
        title: 'Lease Renewal Strategy',
        description: 'Annual review of market rent vs. current rent, with renewal offer timing coordinated to July–August school catchment demand and corporate assignment cycle calendar.',
        icon: 'chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Lease Structuring',
        description: 'Ontario Standard Lease prepared with corporate addenda tailored to the specific tenant\'s employer, assignment length, furnished status, and payment arrangements.',
      },
      {
        stepNumber: 2,
        title: 'Move-In Documentation',
        description: 'Condition inspection completed, furnished inventory photographed and signed, digital lease execution via DocuSign with all parties. Copies filed to owner portal.',
      },
      {
        stepNumber: 3,
        title: 'Annual Renewal Management',
        description: 'Renewal analysis prepared 120 days before lease end: current market rent, N2 eligibility, tenant retention probability, and recommended renewal offer strategy.',
      },
      {
        stepNumber: 4,
        title: 'Amendment and Addenda Management',
        description: 'Any mid-term lease changes — assignment approval, subletting, term extension — documented with proper Ontario forms and bilateral signature, filed to the permanent tenancy record.',
      },
    ],
    testimonial: {
      name: 'Sarah Kim',
      city: 'Berczy Village, Markham',
      quote: 'We specifically chose our Berczy Village unit for the school catchment. The lease had the school district address confirmed in the tenancy addenda — our lawyer said that was unusually thorough. We\'ve been here three years and just renewed again. The lease management is completely hands-off for us.',
      outcome: 'Berczy Village family tenant. School catchment confirmed in lease addenda. Three-year tenancy with two renewals. N2 increase served correctly on post-2018 unit.',
    },
    faq: [
      {
        question: 'Can I include an early termination clause for corporate tenants in a standard Ontario lease?',
        answer: 'Yes. The Ontario Standard Lease permits additional terms in Section 15 (Additional Terms) as long as they don\'t violate the Residential Tenancies Act. A mutual early termination provision — specifying notice period, deposit forfeiture terms, and lease-break fee — is enforceable when agreed to by both parties at signing.',
      },
      {
        question: 'My Markham unit was built in 2022. Can I increase rent above the provincial guideline?',
        answer: 'Yes. Units first occupied for residential purposes after November 15, 2018 are exempt from the annual rent increase guideline. You can increase rent above the 2.1% (2026) guideline by serving an N2 notice at least 90 days before the effective increase date, using the current LTB-prescribed form.',
      },
      {
        question: 'What\'s a COLA clause and when should I include it in a Markham lease?',
        answer: 'A Cost-of-Living Adjustment clause links future rent increases to an index (typically CPI) rather than a fixed amount. For corporate tenants on 2–3 year leases, COLA clauses provide predictability for both parties and remove annual renegotiation friction. They must be structured carefully within RTA limits for exempt units or within guideline rates for controlled units.',
      },
      {
        question: 'Do I need a separate lease for a furnished unit?',
        answer: 'No — you use the Ontario Standard Lease with an attached furnished inventory schedule as an additional term. The schedule documents every item, its condition, and its replacement value, and is signed by both parties at move-in. This schedule is the critical document in any move-out furniture dispute.',
      },
    ],
  },

  // ----------------------------------------------------------
  // 7. FINANCIAL REPORTING
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'financial-reporting',
    heroHeadline: 'Markham Investment Reporting That Captures Above-Toronto Rent Performance',
    heroSubheadline: 'Markham\'s 1BR rents surpassed Downtown Toronto in July 2025. Your financial reporting should reflect the NOI strength — and the yield compression — that premium rents and high prices create.',
    localBody: [
      "Markham's premium rent levels — $2,262 to $2,369/month for 1BR units, surpassing Downtown Toronto's $2,127 average — create strong gross income numbers for investors. But the 2025 Markham purchase price environment, with condos in Markham Centre, Unionville, and Buttonville trading at $700,000–$1.1M, compresses cap rates to 3.5–4.5% for well-located units. Accurate financial reporting distinguishes between the gross rent story (strong) and the net yield reality (thin margins) — helping owners make informed decisions about hold strategies, rent increase timing, and refinancing.",
      "Corporate housing income in Markham has specific CRA documentation requirements that standard residential rental reporting overlooks. Tenants on corporate relocation packages often have their rent paid in two parts — a personal portion and an employer allowance portion — requiring separate receipt documentation for each source. Furnished unit income must be tracked with the furniture depreciation schedule. Where the employer pays the landlord directly, the payment structure must be documented to avoid GST/HST exposure on commercial arrangements inadvertently embedded in residential leases.",
      "Markham's strong NOI is best modelled with a 10-year hold projection incorporating realistic vacancy assumptions (1–3% for well-managed corporate units), N2 increase schedules for exempt units, and capital expenditure reserves for EV charging maintenance and appliance replacement cycles. The $2.91/sq ft rent rate creates strong in-place income, but CAPEX for a corporate-standard Markham unit — EV infrastructure maintenance, modern appliance upgrades, annual suite touch-ups — runs $3,000–$6,000 annually for a typical 2BR. Our reporting tracks actual vs. reserve to flag capital erosion before it affects tenant retention.",
    ],
    painPoints: [
      {
        problem: "Your IBM corporate tenant's employer pays $2,000/month directly to you and the tenant pays the remaining $800. You're issuing one receipt for $2,800 total. CRA considers the $2,000 direct employer payment a potential commercial arrangement — and your T776 doesn't reflect it correctly.",
        solution: "We structure receipt documentation to separate the personal-tenant portion from the employer-paid portion, confirm the residential lease character of the arrangement with the employer's legal department, and file the T776 with the correct income allocation and supporting documentation.",
      },
      {
        problem: "Your Markham condo gross rent is $2,650/month ($31,800/year) but your actual net return after condo fees, property tax, management, and maintenance is $14,200 — a 2.1% yield on your $670,000 purchase price. You don't know this because no one has modelled it.",
        solution: "Our annual financial report models NOI after all expenses, calculates yield on current purchase price and current estimated value, and benchmarks your Markham unit against current market cap rates — giving you the complete picture to make a rational hold or sell decision.",
      },
      {
        problem: "You've never claimed CCA on your Markham rental furniture because you didn't know you could. Three furnished units over four years — that's $8,000–$12,000 of unclaimed depreciation that reduces your taxable rental income.",
        solution: "We prepare an annual CCA schedule for all depreciable assets in your rental — furniture inventory, appliances, EV charging equipment — itemized by CRA class and optimized within the half-year rule to maximize allowable deductions in each tax year.",
      },
    ],
    benefits: [
      {
        title: 'True NOI Calculation',
        description: 'Gross rent minus condo fees, property tax, management, maintenance, and CAPEX reserves — yielding the actual return on your Markham investment, not the headline rent number.',
        icon: 'chart',
      },
      {
        title: 'CRA T776 Preparation',
        description: 'Annual rental income schedule prepared with correct income allocation, corporate payment documentation, CCA schedule, and expense categorization ready for your accountant.',
        icon: 'document',
      },
      {
        title: 'Furnished Unit Depreciation',
        description: 'CCA Schedule 8 and Class 10/8 depreciation calculated for all furniture and appliances. Half-year rule applied correctly to maximize deductions in the acquisition year.',
        icon: 'check',
      },
      {
        title: 'N2 Increase Impact Modelling',
        description: 'Annual rent increase scenarios modelled against current Markham comparables, showing the 5-year NOI impact of above-guideline increases on post-2018 exempt units.',
        icon: 'star',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Property Financial Onboarding',
        description: 'We collect purchase price, mortgage terms, condo fee schedule, and existing lease documentation to establish the baseline NOI model and CCA asset register.',
      },
      {
        stepNumber: 2,
        title: 'Monthly Income and Expense Tracking',
        description: 'All rent receipts, maintenance invoices, condo fee payments, and property tax installments logged in real-time. Owner portal updated monthly with variance reporting.',
      },
      {
        stepNumber: 3,
        title: 'Annual T776 Package',
        description: 'Complete T776 income and expense schedule with CCA calculations, corporate payment documentation, and supporting receipts — delivered to you and your accountant by March 1.',
      },
      {
        stepNumber: 4,
        title: 'Investment Performance Review',
        description: 'Annual yield analysis comparing current NOI to purchase price and estimated current value, with N2 increase schedule, capital reserve adequacy review, and hold/sell recommendation.',
      },
    ],
    testimonial: {
      name: 'Amy Zhang',
      city: 'Markham Centre',
      quote: 'I had two Markham condos and thought I was doing well because the rents were high. The financial report showed me my actual net yield was 2.3% after everything — and I was missing $9,400 in CCA from my furnishings over three years. That discovery paid for three years of management fees.',
      outcome: 'Two-unit Markham portfolio. $9,400 in unclaimed CCA recovered across three prior tax years. Annual NOI model established showing true 2.3% yield and N2 increase pathway to 3.1%.',
    },
    faq: [
      {
        question: 'Why is my Markham NOI lower than I expected given the strong rent levels?',
        answer: 'Markham condo purchase prices in the $700K–$1.1M range compress yields significantly. At $2,650/month gross rent on a $900K purchase, you\'re working with roughly 3.5% gross yield before expenses. After condo fees ($650–$900/month), property tax ($5,000–$7,000/year), management, and maintenance, net yields of 2–3% are common. Strong rents don\'t automatically produce strong returns when purchase prices are this high.',
      },
      {
        question: 'What is CCA and can I claim it on my Markham rental furnishings?',
        answer: 'Capital Cost Allowance (CCA) is the CRA mechanism for depreciating capital assets used in a rental business. Furniture (Class 8, 20%/year declining balance), appliances (Class 8), and certain building improvements are depreciable. The half-year rule limits CCA to 50% of the normal rate in the acquisition year. We prepare a full CCA schedule annually for all depreciable assets in your rental property.',
      },
      {
        question: 'My Markham tenant\'s employer pays part of the rent directly. Does this create a tax issue?',
        answer: 'Not inherently, but the payment structure must be documented correctly. If the employer pays the landlord directly and the lease is still residential in character (tenant occupies for personal living purposes), the income is T776 rental income. We document the arrangement, issue separate receipts for the employer and tenant portions, and confirm the residential character in writing with the employer to protect the income classification.',
      },
      {
        question: 'What expenses can I deduct against Markham rental income?',
        answer: 'Deductible expenses include: mortgage interest (not principal), property taxes, condo fees, property management fees, repairs and maintenance, advertising, professional fees (accounting, legal), insurance, and applicable CCA. Capital improvements (new EV charger installation, major renovation) must be capitalized and depreciated, not expensed in year one.',
      },
    ],
  },

  // ----------------------------------------------------------
  // 8. EVICTION SERVICES
  // ----------------------------------------------------------
  {
    citySlug: 'markham',
    serviceSlug: 'eviction-services',
    heroHeadline: 'Markham Eviction Rarely Needed — We Ensure It\'s Done Right When It Is',
    heroSubheadline: 'Corporate tenants at IBM, Huawei, and Honda Canada almost never default — but when a mid-assignment disruption occurs, Bill 60\'s N4 procedures must be executed precisely in York Region.',
    localBody: [
      "Markham's corporate tenant base — senior engineers, directors, and corporate transferees earning $120,000–$250,000 annually — has one of the lowest eviction rates in the GTA. The employment stability at IBM Canada HQ, Honda Canada, AMD, Qualcomm, and the 650+ area head offices provides an income floor that makes true financial default rare. When collection issues arise, they almost always stem from mid-corporate-assignment disruptions: an early assignment end, an unexpected transfer to another city, a corporate restructuring that moves a tenant out of the market before the lease expires. These situations require professional navigation of the RTA's mutual agreement to end tenancy (N11) provisions, not adversarial LTB proceedings.",
      "When formal N4 proceedings are required — a situation that occurs in perhaps 2–3% of Markham corporate tenancies — the Bill 60 amendments govern the process precisely. The N4 notice for non-payment requires a minimum 7-day payment window after service. Digital delivery is accepted where the tenant has consented to electronic service in the lease. LTB hearing timelines in York Region for non-payment cases currently average 10–14 weeks from application to hearing — significantly better than Toronto's 20+ week average, but still long enough that the N4 must be served immediately at the correct moment, not held for informal resolution attempts that delay the clock.",
      "The rare high-value Markham eviction — a corporate tenant whose employer has terminated their assignment and stopped paying the housing allowance — requires coordination with the employer's HR and legal departments, evaluation of guarantor provisions in the corporate lease addenda, and a clear-eyed assessment of whether the tenant's personal resources support continued tenancy pending the N4 and LTB process. We manage these situations with the same professional documentation standard that the corporate employer expects, reducing the likelihood of an opposed hearing and expediting the resolution.",
    ],
    painPoints: [
      {
        problem: "Your Huawei Canada tenant's assignment ended unexpectedly at month 10 of a 24-month lease. They stopped paying, citing the early termination clause you didn\'t include in the lease. Now you need an N4 and an LTB application in a York Region queue.",
        solution: "We serve the N4 immediately upon confirmed non-payment, file the LTB application on N4 expiry, and simultaneously pursue a negotiated N11 mutual agreement with the tenant and their former employer — often resolving the situation before the hearing date is even set.",
      },
      {
        problem: "Your Markham corporate tenant paid rent for 18 months without issue, then missed two payments without explanation. You don\'t want to damage the relationship by serving an N4, so you wait three weeks — and now you\'re 30 days further back in the LTB timeline.",
        solution: "Our day-3 non-payment intervention is designed for exactly this scenario — bilingual outreach that resolves administrative payment issues without adversarial escalation. If the issue is genuine non-payment rather than administrative error, the N4 is served at day 8, maintaining the LTB timeline from the earliest possible date.",
      },
      {
        problem: "You want to move into your Markham unit (N12) but your corporate tenant has a 2-year lease. You\'ve been advised by a friend to just not renew — but N12 applies to a fixed-term lease mid-term only in specific circumstances, and you\'re about to serve it incorrectly.",
        solution: "We review the lease terms, determine the correct application of N12 provisions, advise on the compensation requirements (1 month\'s rent minimum), confirm timing relative to lease end dates, and serve the N12 with correct documentation — protecting you from an LTB bad faith finding.",
      },
    ],
    benefits: [
      {
        title: 'Corporate Disruption Navigation',
        description: 'Mid-assignment corporate lease disruptions managed through N11 negotiation with tenants and employer HR — resolving most situations without LTB proceedings.',
        icon: 'users',
      },
      {
        title: 'Bill 60 N4 Precision',
        description: '7-day N4 properly served with digital delivery documentation. LTB application filed immediately upon expiry. York Region hearing timeline maintained from earliest possible date.',
        icon: 'document',
      },
      {
        title: 'Day-3 Intervention First',
        description: 'Bilingual outreach at day 3 of non-payment resolves corporate administrative errors before formal process. Formal escalation begins only when intervention fails.',
        icon: 'clock',
      },
      {
        title: 'LTB Representation',
        description: 'Paralegal representation at York Region LTB hearings with complete documentation package: lease, N4, delivery proof, payment history, and corporate employer communication record.',
        icon: 'shield',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Day-3 Intervention',
        description: 'Bilingual (English/Mandarin) outreach at day 3 of non-payment: direct call, email, and WeChat message. Most corporate administrative payment issues resolved at this stage within 48 hours.',
      },
      {
        stepNumber: 2,
        title: 'N4 Service at Day 8',
        description: 'If day-3 intervention does not produce confirmed payment, N4 served at day 8 (post 7-day window). Digital delivery where consented, physical delivery otherwise. Delivery documented.',
      },
      {
        stepNumber: 3,
        title: 'N11 Negotiation in Parallel',
        description: 'Where corporate assignment disruption is the cause, N11 mutual agreement negotiation pursued simultaneously with N4 process — often resolving before LTB hearing is required.',
      },
      {
        stepNumber: 4,
        title: 'LTB Application and Hearing',
        description: 'If N4 expires without payment or N11 agreement, LTB application filed immediately. Paralegal prepares full documentation package and represents at York Region hearing.',
      },
    ],
    testimonial: {
      name: 'Michael Zhao',
      city: 'Unionville, Markham',
      quote: 'My Huawei engineer tenant\'s assignment was cancelled mid-lease — completely unexpected. He stopped paying, I panicked. MoveSmartRentals served the N4 immediately, then simultaneously negotiated an N11 with him and got Huawei\'s HR to contribute to the lease-break cost. Resolved in 6 weeks, no LTB hearing needed.',
      outcome: 'Unionville unit. Mid-assignment corporate disruption resolved via N11 mutual agreement in 6 weeks. Employer-contributed lease-break payment. Unit re-tenanted within 14 days at higher rent.',
    },
    faq: [
      {
        question: 'How likely is my Markham corporate tenant to default on rent?',
        answer: 'Extremely unlikely. Corporate tenants at IBM, Huawei, Honda Canada, and similar employers in Markham have employer-backed income, often with housing allowances specifically designated for rent. True financial default in this tenant profile is rare — the more common issue is corporate assignment disruption (transfer, termination) that causes a lease-break situation rather than an inability to pay.',
      },
      {
        question: 'What\'s the difference between an N4 and an N11 in a mid-assignment corporate disruption?',
        answer: 'The N4 is a Notice to End Tenancy for Non-Payment of Rent — a unilateral notice served by the landlord when rent is overdue. The N11 is a mutual Agreement to End Tenancy — signed by both parties to terminate the lease on an agreed date. In corporate disruption scenarios, pursuing both simultaneously often produces an N11 resolution before the N4 LTB process concludes.',
      },
      {
        question: 'How long does an eviction take in York Region?',
        answer: 'Non-payment (N4) applications in York Region currently take 10–14 weeks from LTB application filing to hearing. This is significantly better than Toronto\'s 20+ week average. The clock starts from your LTB filing date — not from when the N4 was served — which is why we file immediately upon N4 expiry rather than waiting.',
      },
      {
        question: 'Can I evict my Markham tenant to sell the unit (N12)?',
        answer: 'Yes, under specific conditions. The N12 for landlord\'s own use or sale requires the landlord (or a qualifying buyer) to occupy the unit for at least 12 months, minimum 60-day notice, and compensation of 1 month\'s rent. For fixed-term leases, the N12 can only take effect at the end of the fixed term unless the tenant agrees otherwise. We review your specific situation before any N12 is served.',
      },
      {
        question: 'My Markham tenant has a guarantor from their employer. Can I pursue the guarantor if the tenant stops paying?',
        answer: 'If the lease includes a valid guarantor clause — a corporate employer guarantee or personal guarantee signed by the tenant\'s employer or a co-signer — the guarantee may be enforceable through Small Claims Court or civil action parallel to the LTB process. The LTB only has jurisdiction over the landlord-tenant relationship; guarantor enforcement is a separate proceeding. We coordinate both streams if your lease includes a guarantor provision.',
      },
    ],
  },
]
