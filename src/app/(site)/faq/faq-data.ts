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
      'We handle everything from listing your property and screening tenants to lease signing and ongoing support. You pay nothing upfront - our success-based fee is only charged after a qualified tenant is placed. Once placed, we continue managing the tenancy through our owner portal.',
  },
  {
    question: 'How long does it take to find a tenant?',
    answer:
      'Our average tenant placement time is 14-21 days. This varies by city and property type, but our multi-channel marketing (30+ listing platforms), AI-assisted pricing, and large applicant database ensure fast, quality placements.',
  },
  {
    question: 'Can I approve the final tenant selection?',
    answer:
      'Yes. You have final say on tenant selection. We present you with our top screened candidates along with full application packages, credit reports, and our recommendation. You approve before any lease is signed.',
  },
  {
    question: 'What does the tenant screening process include?',
    answer:
      'Our 7-point screening covers: (1) government ID verification, (2) full credit report with score, (3) employment letter and pay stubs, (4) landlord reference check, (5) social media and public record scan, (6) PIPEDA-compliant data handling, and (7) our internal risk scoring algorithm.',
  },
  {
    question: 'What is the rent guarantee and how does it work?',
    answer:
      'Our Rent Guarantee program covers up to 12 months of lost rent if the placed tenant stops paying. It activates after an LTB non-payment notice is filed and continues until the unit is re-rented. This is a first-party service - not third-party insurance.',
  },
  {
    question: 'What if I live outside the province or outside Canada?',
    answer:
      'We regularly work with non-resident property owners. We manage all landlord-tenant communication, maintenance coordination, and compliance on your behalf. We also advise on Section 216 withholding tax requirements for non-resident owners.',
  },
  {
    question: 'Are there discounts for multiple properties or portfolios?',
    answer:
      'Yes. Property owners with 3 or more units qualify for our portfolio pricing. Reach out to our team to discuss multi-property rates and custom management agreements.',
  },
  {
    question: 'Can I cancel the management agreement if it is not working out?',
    answer:
      'Yes. Our management agreements include a 30-day termination clause with no long-term lock-in. We believe good service - not paperwork - should be what keeps the relationship going.',
  },
  {
    question: 'What does the owner portal show me?',
    answer:
      'Your owner portal shows real-time listing analytics: views, inquiries, showing bookings, conversion rates, live financial reports, maintenance approvals, and lease status - all updated daily. We also provide weekly placement status emails until the unit is rented.',
  },
  {
    question: 'Do I get tax-ready statements at year-end?',
    answer:
      'Yes. Owners receive year-end income and expense summaries formatted for Canadian tax filing (including T776 support for rental income). Statements are available for download in the owner portal and emailed in January.',
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
    question: 'How do I submit a maintenance request?',
    answer:
      'Log into your tenant portal, click "Maintenance," describe the issue, and attach photos if helpful. Urgent matters (no heat, water leak, security issue) are escalated immediately. Non-urgent requests are typically addressed within 3-5 business days.',
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
      'No. There are zero upfront costs. Our leasing fee is only collected once a qualified tenant signs a lease. Ongoing portal and management tools are included at no extra charge during the tenancy.',
  },
  {
    question: 'When is the leasing success fee paid?',
    answer:
      'The leasing fee is a one-time success fee charged only when a qualified tenant is placed and the lease is signed. The exact amount is based on monthly rent and service level - the full breakdown is provided before you sign anything and there are no hidden charges.',
  },
  {
    question: 'What is included in the success fee?',
    answer:
      'The success fee covers: professional photography, listing on 30+ platforms, all tenant inquiries and showings, full screening (credit, employment, references), lease preparation compliant with provincial rental law, and lease signing coordination.',
  },
  {
    question: 'Do you mark up vendor or maintenance invoices?',
    answer:
      'No. Vendor invoices for repairs and maintenance are passed through at cost. You see the original invoice in your owner portal. We earn money through our leasing and management fees - not through hidden markups.',
  },
  {
    question: 'Is there a cancellation fee, and is GST/HST included?',
    answer:
      'No cancellation fee - you can terminate with 30 days notice. Fees quoted to Canadian owners are exclusive of GST/HST, which is added on the invoice as required. An itemised receipt is provided for every charge.',
  },
]

/* ------------------------------------------------------------------ */
/*  4. Services - what we do, where we do it, and at what scale.      */
/* ------------------------------------------------------------------ */
const servicesQuestions: FaqItem[] = [
  {
    question: 'Can I book services à la carte, or only as a full package?',
    answer:
      'Both. Owners can choose tenant placement only (one-time success fee) or a full-service management plan that includes placement plus ongoing rent collection, maintenance coordination, inspections, and year-end reporting. Mix and match - we will quote transparently.',
  },
  {
    question: 'What is included in full-service management?',
    answer:
      'Full-service management covers: marketing and placement, rent collection via the portal, maintenance coordination with vetted vendors, semi-annual inspections, renewal negotiations, LTB handling where needed, and monthly + annual owner statements. Rent guarantee is an optional add-on.',
  },
  {
    question: 'Do you manage multi-unit buildings and small portfolios?',
    answer:
      'Yes. We work with individual condos, houses, duplexes, triplexes, small apartment buildings, and portfolios of 3-50 doors. For buildings over 50 units we structure a dedicated account team. Contact us for bespoke portfolio pricing.',
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
      'The portal is a responsive web app that works equally well on desktop, tablet, and mobile browsers - no app download required. Push-style notifications are sent by email and SMS for rent receipts, maintenance updates, and lease events.',
  },
  {
    question: 'Can I give my accountant or bookkeeper access to my owner portal?',
    answer:
      'Yes. Owners can invite a read-only accountant user from the portal settings page. The accountant receives their own secure login and can download statements, invoices, and year-end reports without seeing tenant contact details.',
  },
  {
    question: 'How do I download tax documents and financial statements?',
    answer:
      'Every monthly statement, vendor invoice, and year-end summary (including T776-formatted income reports) is available as a PDF download in the "Documents" section of the owner portal. Bulk ZIP download is available at year-end.',
  },
  {
    question: 'Can I manage multiple properties from one account, and is my data encrypted?',
    answer:
      'Yes. A single owner account can hold unlimited properties, each with its own financials, tenants, and documents. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Payment card numbers are never stored on our servers, and infrastructure is hosted on SOC 2 Type II certified platforms with 99.9% uptime.',
  },
]

/* ------------------------------------------------------------------ */
/*  6. Legal & Compliance - LTB, deposits, tax, condo-board liaison.  */
/* ------------------------------------------------------------------ */
const legalQuestions: FaqItem[] = [
  {
    question: 'How do you handle LTB applications if a tenant stops paying?',
    answer:
      'We initiate the LTB process immediately: serving the N4 (Notice to Terminate for Non-Payment) on day 1 of non-payment, filing the L1 application within 14 days, and representing you at the hearing. Non-payment hearings currently take 3-5 months in major Ontario markets. Rent guarantee clients receive covered payments from day 1 of non-payment.',
  },
  {
    question: 'How are deposits, LMR, and interest handled under provincial law?',
    answer:
      'In Ontario, only last month\'s rent (LMR) may be collected as a deposit - no damage deposits are permitted. Interest on the LMR accrues annually at the provincial rent increase guideline rate and must be credited to the tenant each year. We track and pay this automatically through the portal.',
  },
  {
    question: 'Do you help with T776 and year-end tax filing?',
    answer:
      'Yes. Our year-end owner package is formatted to drop directly into a T776 - Statement of Real Estate Rentals - line by line. Your accountant can import or reference the PDF summary. We do not file taxes on your behalf, but the statements are designed so no bookkeeping is required.',
  },
  {
    question: 'Can you liaise with the condo board, HOA, or building management?',
    answer:
      'Yes. For condo and HOA-governed units we obtain the corporation\'s rules upfront, register your tenant with the building manager as required, coordinate move-in/move-out bookings, and handle any violation notices on your behalf - keeping you informed without the back-and-forth.',
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
    deck: 'How MoveSmart works if you own one door or a hundred - from listing night one to year-end statements.',
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
    deck: 'À la carte or full-service, single condo or fifty-unit portfolio, in-province or out - what we do and where.',
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
    deck: 'LTB matters, deposit rules, tax forms, and condo-board coordination - the unglamorous work we handle so you do not have to.',
    questions: legalQuestions,
  },
]

/** Flat list of all questions - used for FAQPage JSON-LD. */
export const ALL_FAQ_ITEMS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.questions)
