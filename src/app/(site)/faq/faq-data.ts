/* ------------------------------------------------------------------ */
/*  FAQ data - organized by the six top-level categories that map to  */
/*  the /faq page reading experience. Content preserved verbatim from */
/*  the original audience-tabbed data set; groupings regrouped for    */
/*  the new Stripe Docs / Intercom Help editorial layout.             */
/* ------------------------------------------------------------------ */

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqCategory {
  /** Stable anchor id, e.g. "owners" - used by the in-page nav strip */
  id: string
  /** Short label in the nav strip */
  label: string
  /** Human heading shown above the Q&A block */
  heading: string
  /** Single-line deck/standfirst, editorial feel */
  deck: string
  questions: FaqItem[]
}

/* ------------------------------------------------------------------ */
/*  1. For Owners - everything an owner asks before signing.          */
/* ------------------------------------------------------------------ */
const ownersQuestions: FaqItem[] = [
  {
    question: 'How does MoveSmart Rentals work for property owners?',
    answer:
      'We are a white-glove leasing brokerage. We run the leasing lifecycle end to end - strategic pricing, professional marketing, showings, applicant qualification, lease execution, and a documented move-in. You pay nothing upfront. A one-time success fee is charged only once a qualified tenant signs the lease. We are not an ongoing property manager.',
  },
  {
    question: 'How long does it take to find a tenant?',
    answer:
      'Our average placement time is 14-21 days from go-live to signed lease. This varies by city and property type, but our multi-channel marketing (40+ listing platforms), live market pricing, and large applicant database keep placements fast and qualified.',
  },
  {
    question: 'Can I approve the final tenant selection?',
    answer:
      'Yes. You have final say on tenant selection. We present you with our top qualified candidates along with full application packages, credit reports, and our written risk summary. You approve before any lease is signed.',
  },
  {
    question: 'What does the tenant qualification process include?',
    answer:
      'Our 7-point qualification covers: (1) government ID verification, (2) full credit report with score, (3) employment letter and pay stubs, (4) prior landlord reference check, (5) public record scan, (6) PIPEDA-compliant data handling, and (7) a written risk summary with provincial compliance flags.',
  },
  {
    question: 'What is rental protection and how does it work?',
    answer:
      'Rental Protection is an optional partner pathway, not an in-house insurance product. We coordinate guaranteed-rent insurance through vetted carriers and validate your applicant against partner underwriting standards. Coverage, premiums, and claim mechanics sit with the carrier - we explain coverage in plain English before you opt in.',
  },
  {
    question: 'What if I live outside the province or outside Canada?',
    answer:
      'We regularly work with non-resident owners. The owner portal, secure remote e-signing, and trust-accounted deposit handling are designed for out-of-province and overseas owners. For ongoing operations after move-in we maintain a referral network of trusted property management partners.',
  },
  {
    question: 'Are there discounts for multiple properties or portfolios?',
    answer:
      'Yes. Owners with 3 or more units qualify for portfolio leasing pricing. Reach out to our team to discuss per-unit success fees and bulk lease-up engagements.',
  },
  {
    question: 'Can I cancel the leasing engagement if it is not working out?',
    answer:
      'Yes. Engagements end on 30-day written notice from either party. There is no exit fee, and no clawback on a placement already earned. We hand off all applicant records and signed documents within seven days.',
  },
  {
    question: 'What does the owner portal show me?',
    answer:
      'Your owner portal shows real-time listing analytics: views, inquiries, showing bookings, conversion rates, applicant pipeline, qualification status, and lease execution status - all updated daily. We also send weekly placement status emails until the unit is leased.',
  },
  {
    question: 'Do I get a clean placement record at year-end?',
    answer:
      'Yes. Owners receive a year-end placement summary - signed lease, deposit trust accounting, HST disclosures, and the move-in inspection report - packaged for your accountant. We do not file taxes on your behalf; the statements are designed so your CPA has everything required for a T776 line by line.',
  },
]

/* ------------------------------------------------------------------ */
/*  2. For Tenants - application, life-in-the-home, and moving out.   */
/* ------------------------------------------------------------------ */
const tenantsQuestions: FaqItem[] = [
  {
    question: 'How do I apply for a rental?',
    answer:
      'Browse available listings at movesmartrentals.com/locations, select a property, and click "Apply Now." Our online application takes 10-15 minutes. You will hear back within 48 hours of submitting a complete application.',
  },
  {
    question: 'What do I need for a tenant application?',
    answer:
      'You will need: (1) valid government-issued photo ID, (2) proof of income - 3 months recent pay stubs or employment letter, (3) previous landlord reference contact, (4) consent for a credit check. Self-employed applicants can submit 2 years of NOA (Notice of Assessment) instead of pay stubs.',
  },
  {
    question: 'Is MoveSmart Rentals free for tenants?',
    answer:
      'Yes. Tenants pay zero fees to MoveSmart at any point - not for applications, not for lease signing, not for portal access. We are funded by owners through our success-based leasing fee.',
  },
  {
    question: 'How are deposits and last-month\'s rent handled?',
    answer:
      'In Ontario, the only deposit a landlord may collect is last month\'s rent (LMR), which is applied to your final month - not refunded as cash. Interest on the LMR deposit accrues annually at the provincial rent increase guideline rate and is credited to you each year.',
  },
  {
    question: 'Who do I contact for maintenance once I move in?',
    answer:
      'MoveSmart Rentals handles the leasing engagement only - pricing, marketing, qualification, lease execution, and the documented move-in. After move-in, your day-to-day maintenance contact is the landlord or the property management partner the owner has engaged. You will receive that contact information in your move-in welcome packet.',
  },
  {
    question: 'What lease term do you offer, and can I renew?',
    answer:
      'Most of our leases are 12-month fixed terms using the Ontario Standard Lease. At the end of the fixed term, the tenancy automatically becomes month-to-month under Ontario law - you do not have to sign anything. We send renewal reminders 90 days before lease end and can negotiate a new fixed term if you or the owner prefer.',
  },
  {
    question: 'Can I end my lease early or change roommates mid-term?',
    answer:
      'Early termination requires landlord consent and typically involves assignment or sublet under s.95 of the RTA. We work with tenants in good standing to find replacement tenants or negotiate a fair exit. Roommate changes follow the same process - we cannot add or remove names from a lease without a formal update.',
  },
  {
    question: 'What is the annual rent increase, and when can it happen?',
    answer:
      'For rent-controlled units in Ontario, the 2025 rent increase guideline is 2.5%. Increases require 90 days written notice on form N1 and cannot happen more than once every 12 months. Units first occupied after November 15, 2018 are exempt from guideline limits. We notify affected tenants well in advance.',
  },
]

/* ------------------------------------------------------------------ */
/*  3. Pricing - fees, who pays, what is included.                    */
/* ------------------------------------------------------------------ */
const pricingQuestions: FaqItem[] = [
  {
    question: 'Do I pay any setup fee or upfront costs?',
    answer:
      'No. There are zero upfront costs. Our leasing success fee is only collected once a qualified tenant signs a lease. Owner portal access, photography, and listing distribution are included at no extra charge during the leasing engagement.',
  },
  {
    question: 'When is the leasing success fee paid?',
    answer:
      'The leasing fee is a one-time success fee charged only when a qualified tenant is placed and the lease is signed. The exact amount is based on monthly rent and service level - the full breakdown is provided before you sign anything and there are no hidden charges.',
  },
  {
    question: 'What is included in the success fee?',
    answer:
      'The success fee covers all nine pillars of our leasing service: strategic pricing, professional photography and copy, listing on 40+ platforms, showing coordination, full applicant qualification (credit, employment, income, references), offer management, lease preparation compliant with provincial rental law, deposit collection in trust, and a documented move-in inspection.',
  },
  {
    question: 'Do you mark up vendor or pre-listing prep invoices?',
    answer:
      'No. Vendor invoices for one-time pre-listing prep (paint touch-ups, deep clean, light handyman, landscaping refresh) are passed through at cost. You see the original invoice in your owner portal. We earn money through our leasing success fee - not through hidden markups.',
  },
  {
    question: 'Is there a cancellation fee, and is GST/HST included?',
    answer:
      'No cancellation fee - you can terminate the leasing engagement with 30 days notice. Fees quoted to Canadian owners are exclusive of GST/HST, which is added on the invoice as required. An itemised receipt is provided for every charge.',
  },
]

/* ------------------------------------------------------------------ */
/*  4. Services - what we do, where we do it, and at what scale.      */
/* ------------------------------------------------------------------ */
const servicesQuestions: FaqItem[] = [
  {
    question: 'Can I book services à la carte, or only as a full package?',
    answer:
      'For individual landlords the nine leasing services run as one continuous workflow - they are designed to interlock from pricing through move-in. For institutional engagements we scope modular packages: marketing-only, qualification-only, or full lease-up. We are not a property management firm, so we do not provide ongoing rent collection or post-move-in operations.',
  },
  {
    question: 'What is included in the end-to-end leasing engagement?',
    answer:
      'The nine pillars: strategic pricing, professional marketing execution, showing coordination, offer management, tenant qualification, optional rental protection, lease execution, move-in coordination, and (for builders/PMCs) institutional lease-up. After the documented move-in the engagement is complete unless you specifically engage us for a separate scope.',
  },
  {
    question: 'Do you lease multi-unit buildings and small portfolios?',
    answer:
      'Yes. We lease individual condos, houses, duplexes, triplexes, small apartment buildings, and portfolios of 3-50 units. For buildings over 50 units our Institutional Lease-Up practice deploys a dedicated leasing team and reports live against pro-forma. Contact us for bespoke portfolio pricing.',
  },
  {
    question: 'Which cities and provinces do you cover?',
    answer:
      'We currently operate across 20+ Canadian cities - heavy concentration in Ontario (Toronto, Mississauga, Brampton, Hamilton, Ottawa, London, Kitchener, Waterloo, Guelph, Barrie, Oshawa, Ajax, Whitby, Oakville, Burlington, Milton, Cambridge, Markham, Vaughan, Richmond Hill) with active expansion into other provinces. If your city is not listed, ask - we may already have capacity.',
  },
]

/* ------------------------------------------------------------------ */
/*  5. Portal & Technology - the software owners and tenants touch.   */
/* ------------------------------------------------------------------ */
const portalQuestions: FaqItem[] = [
  {
    question: 'Is there a mobile app, or is the portal web-only?',
    answer:
      'The portal is a responsive web app that works equally well on desktop, tablet, and mobile browsers - no app download required. Push-style notifications are sent by email and SMS for applicant pipeline updates, qualification status, and lease execution events.',
  },
  {
    question: 'Can I give my accountant or bookkeeper access to my owner portal?',
    answer:
      'Yes. Owners can invite a read-only accountant user from the portal settings page. The accountant receives their own secure login and can download placement summaries, success-fee invoices, and deposit trust records without seeing applicant contact details.',
  },
  {
    question: 'How do I download placement summaries and lease records?',
    answer:
      'Every signed lease, applicant decision record, success-fee invoice, deposit trust statement, and move-in inspection report is available as a PDF download in the "Documents" section of the owner portal. A bulk ZIP download is available at year-end for your accountant.',
  },
  {
    question: 'Can I track multiple properties from one account, and is my data encrypted?',
    answer:
      'Yes. A single owner account can hold unlimited properties, each with its own leasing pipeline, applicants, and documents. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Payment card numbers are never stored on our servers, and infrastructure is hosted on SOC 2 Type II certified platforms with 99.9% uptime.',
  },
]

/* ------------------------------------------------------------------ */
/*  6. Legal & Compliance - LTB, deposits, tax, condo-board liaison.  */
/* ------------------------------------------------------------------ */
const legalQuestions: FaqItem[] = [
  {
    question: 'Do you handle LTB filings or evictions if a tenant stops paying?',
    answer:
      'No. LTB filings, evictions, and ongoing rent collection sit outside the leasing-execution scope. We focus exclusively on placing the right tenant on the right lease - so the asset is set up cleanly. For ongoing operations and LTB representation we maintain a referral list of trusted property management partners and paralegals.',
  },
  {
    question: 'How are deposits and interest handled at lease execution?',
    answer:
      'In Ontario, only last month\'s rent (LMR) may be collected as a deposit - no damage deposits are permitted. We collect the LMR at lease execution and hold it in a designated trust account; interest accrues per RTA s.106 and is credited at lease end. Province-specific rules apply elsewhere - we follow the local statute.',
  },
  {
    question: 'Will my accountant get clean records for T776 filing?',
    answer:
      'Yes. Our placement summary is formatted so a CPA can drop the success-fee invoice, HST disclosure, and deposit trust ledger directly into a T776 - Statement of Real Estate Rentals. We do not file taxes on your behalf, and we do not run ongoing bookkeeping (we are a leasing brokerage, not a property manager) - but the leasing-engagement records are clean and audit-ready.',
  },
  {
    question: 'Can you liaise with the condo board, HOA, or building management at move-in?',
    answer:
      'Yes - during the leasing engagement. For condo and HOA-governed units we obtain the corporation\'s rules upfront, register the incoming tenant with the building manager as required, and coordinate move-in elevator bookings. After the documented move-in, ongoing condo-board liaison passes back to the owner or their property management partner.',
  },
]

/* ------------------------------------------------------------------ */
/*  Exported category array - order matters; drives the nav + anchors */
/* ------------------------------------------------------------------ */

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'owners',
    label: 'For Owners',
    heading: 'For owners',
    deck: 'How MoveSmart works if you own one unit or a hundred - from listing night one to a documented move-in.',
    questions: ownersQuestions,
  },
  {
    id: 'tenants',
    label: 'For Tenants',
    heading: 'For tenants',
    deck: 'Applying, living in the home, and moving out - the rules, the process, and your rights under provincial law.',
    questions: tenantsQuestions,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    heading: 'Pricing',
    deck: 'How we charge, who pays, and what is - and is not - included in the number we quote.',
    questions: pricingQuestions,
  },
  {
    id: 'services',
    label: 'Services',
    heading: 'Services',
    deck: 'Nine interlocking leasing services, single condo or fifty-unit portfolio, in-province or out - what we do and where.',
    questions: servicesQuestions,
  },
  {
    id: 'portal',
    label: 'Portal',
    heading: 'Portal & technology',
    deck: 'The platform owners and tenants actually use - access, apps, documents, and the security behind the login screen.',
    questions: portalQuestions,
  },
  {
    id: 'legal',
    label: 'Legal & Compliance',
    heading: 'Legal & compliance',
    deck: 'Deposit rules, condo-board coordination at move-in, and where the leasing engagement ends - the unglamorous work we handle so you do not have to.',
    questions: legalQuestions,
  },
]

/** Flat list of all questions - used for FAQPage JSON-LD. */
export const ALL_FAQ_ITEMS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.questions)
