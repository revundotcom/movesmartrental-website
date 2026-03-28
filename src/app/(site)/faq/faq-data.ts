export interface FaqCategory {
  id: string
  label: string
  icon: string
  questions: { question: string; answer: string }[]
}

export interface FaqTab {
  id: string
  label: string
  description: string
  categories: FaqCategory[]
}

export const FAQ_TABS: FaqTab[] = [
  {
    id: 'owners',
    label: 'For Owners',
    description: 'Everything property owners need to know about our services',
    categories: [
      {
        id: 'getting-started',
        label: 'Getting Started',
        icon: '🚀',
        questions: [
          {
            question: 'How does MoveSmart Rentals work for property owners?',
            answer:
              'We handle everything from listing your property and screening tenants to lease signing and ongoing support. You pay nothing upfront — our success-based fee is only charged after a qualified tenant is placed. Once placed, we continue managing the tenancy through our owner portal.',
          },
          {
            question: 'What areas does MoveSmart Rentals serve?',
            answer:
              'MoveSmart Rentals currently serves 20+ cities across Ontario, including Toronto, Mississauga, Brampton, Hamilton, Ottawa, London, Kitchener-Waterloo, Guelph, Barrie, Oshawa, and more. We are continuously expanding into new markets.',
          },
          {
            question: 'Do I pay anything upfront?',
            answer:
              'No. There are zero upfront costs. Our leasing fee is only collected once a qualified tenant signs a lease. Ongoing portal and management tools are included at no extra charge during the tenancy.',
          },
          {
            question: 'How long does it take to find a tenant?',
            answer:
              'Our average tenant placement time is 14–21 days. This varies by city and property type, but our multi-channel marketing (30+ listing platforms), AI-assisted pricing, and large applicant database ensure fast, quality placements.',
          },
          {
            question: 'Can I approve the final tenant selection?',
            answer:
              'Yes. You have final say on tenant selection. We present you with our top screened candidates along with full application packages, credit reports, and our recommendation. You approve before any lease is signed.',
          },
          {
            question: 'What if I live outside Canada?',
            answer:
              'We regularly work with non-resident property owners. We manage all landlord-tenant communication, maintenance coordination, and compliance on your behalf. We also advise on Section 216 withholding tax requirements for non-resident owners.',
          },
        ],
      },
      {
        id: 'pricing',
        label: 'Fees & Pricing',
        icon: '💰',
        questions: [
          {
            question: 'What is the leasing success fee?',
            answer:
              'Our leasing fee is a one-time success fee charged only when a qualified tenant is placed. The exact amount is based on the monthly rent and service level. Contact us for a custom quote — there are no hidden fees and the full breakdown is provided before you sign anything.',
          },
          {
            question: 'Are there discounts for multiple properties?',
            answer:
              'Yes. Property owners with 3 or more units qualify for our portfolio pricing. Reach out to our team to discuss multi-property rates and custom management agreements.',
          },
          {
            question: 'What is included in the success fee?',
            answer:
              'The success fee covers: professional photography, listing on 30+ platforms, all tenant inquiries and showings, full screening (credit, employment, references), lease preparation compliant with Ontario RTA, and lease signing coordination.',
          },
          {
            question: 'Is there a fee if the tenant you place breaks the lease early?',
            answer:
              'If a tenant placed by us vacates before 12 months, we will re-place a new qualified tenant at a reduced re-lease fee. Your rent guarantee (if enrolled) continues to cover lost rent during the re-placement period.',
          },
          {
            question: 'What is the rent guarantee and how does it work?',
            answer:
              'Our Rent Guarantee program covers up to 12 months of lost rent if the placed tenant stops paying. It activates after an LTB non-payment notice is filed and continues until the unit is re-rented. This is a first-party service — not third-party insurance.',
          },
        ],
      },
      {
        id: 'screening',
        label: 'Tenant Screening',
        icon: '🔍',
        questions: [
          {
            question: 'What does the tenant screening process include?',
            answer:
              'Our 7-point screening covers: (1) government ID verification, (2) full credit report with score, (3) employment letter and pay stubs, (4) landlord reference check, (5) social media and public record scan, (6) PIPEDA-compliant data handling, and (7) our internal risk scoring algorithm.',
          },
          {
            question: 'How long does tenant screening take?',
            answer:
              'Standard screening is completed within 24–48 hours of receiving a complete application. We do not cut corners on verification — thorough screening upfront prevents costly issues later.',
          },
          {
            question: 'Is the screening process compliant with Ontario privacy laws?',
            answer:
              'Yes. Our screening process is fully compliant with PIPEDA and Ontario\'s Human Rights Code. We only collect information relevant to tenancy, obtain written consent, and never use protected grounds (race, gender, religion, source of income from ODSP/OW) as screening criteria.',
          },
          {
            question: 'Can you screen for condo corporation rules?',
            answer:
              'Yes. For condo units, we obtain the condo corporation\'s rules upfront and include relevant clauses (pet restrictions, move-in procedures, parking rules) in the screening questionnaire and lease addendum.',
          },
        ],
      },
      {
        id: 'legal',
        label: 'Leases & Legal',
        icon: '📋',
        questions: [
          {
            question: 'Are your leases compliant with Ontario rental law?',
            answer:
              'Yes. We use the Ontario Standard Lease (Form 2229E) as required by the Residential Tenancies Act, supplemented with a detailed Schedule A addendum covering property-specific rules, appliance conditions, and local bylaw requirements.',
          },
          {
            question: 'How do you handle lease renewals?',
            answer:
              'We send renewal reminders 90 days before lease end. If both parties agree to continue, the tenancy automatically becomes month-to-month under Ontario law (no re-signing required). We can negotiate a new fixed term if the owner prefers.',
          },
          {
            question: 'What happens if a tenant stops paying rent?',
            answer:
              'We initiate the LTB process immediately: serving the N4 (Notice to Terminate for Non-Payment) on day 1 of non-payment, filing the L1 application within 14 days, and representing you at the hearing. Rent guarantee clients receive covered payments from day 1 of non-payment.',
          },
          {
            question: 'How long does an LTB eviction take in Ontario?',
            answer:
              'LTB timelines vary by region and reason. Non-payment (L1) hearings currently take 3–5 months in major Ontario markets. We file early, document everything thoroughly, and keep owners updated at every stage. Rent guarantee clients are protected throughout the entire process.',
          },
          {
            question: 'Can I evict a tenant for owner use (N12)?',
            answer:
              'Yes, under the RTA you can serve an N12 (Notice for Owner Use) requiring the tenant to vacate for yourself, a family member, or a purchaser. One month\'s rent compensation is required. The tenant has 60 days notice. We handle the full N12 process and coordinate with LTB if the tenant disputes.',
          },
          {
            question: 'What is the 2025/2026 Ontario rent increase guideline?',
            answer:
              'The 2025 Ontario rent increase guideline is 2.5%. For 2026, the guideline has not yet been announced (typically released in August). Units first occupied after November 15, 2018 are exempt from guideline limits. We track annual guideline updates and notify all affected owners proactively.',
          },
        ],
      },
    ],
  },
  {
    id: 'tenants',
    label: 'For Tenants',
    description: 'Everything tenants need to know about renting with us',
    categories: [
      {
        id: 'applying',
        label: 'Applying',
        icon: '📝',
        questions: [
          {
            question: 'How do I apply for a rental?',
            answer:
              'Browse available listings at movesmartrentals.com/locations, select a property, and click "Apply Now." Our online application takes 10–15 minutes. You will hear back within 48 hours of submitting a complete application.',
          },
          {
            question: 'What do I need for a tenant application?',
            answer:
              'You will need: (1) valid government-issued photo ID, (2) proof of income — 3 months recent pay stubs or employment letter, (3) previous landlord reference contact, (4) consent for a credit check. Self-employed applicants can submit 2 years of NOA (Notice of Assessment) instead of pay stubs.',
          },
          {
            question: 'Is there an application fee?',
            answer:
              'No. MoveSmart Rentals never charges tenants any application, processing, or placement fees. Our services are funded entirely by property owners.',
          },
          {
            question: 'What credit score do I need?',
            answer:
              'We review the full application holistically — there is no hard minimum score. A strong employment history, stable income, and good landlord references can offset a lower score. We will let you know quickly if we need additional documentation.',
          },
          {
            question: 'Can I apply if I receive ODSP or Ontario Works?',
            answer:
              'Yes. Under Ontario\'s Human Rights Code, source of income is a protected ground. We cannot and do not discriminate based on ODSP, OW, or any other legal income source. Eligibility is based on income-to-rent ratio, not income type.',
          },
        ],
      },
      {
        id: 'renting',
        label: 'Renting',
        icon: '🏠',
        questions: [
          {
            question: 'Is MoveSmart Rentals free for tenants?',
            answer:
              'Yes. Tenants pay zero fees to MoveSmart at any point — not for applications, not for lease signing, not for portal access. We are funded by owners through our success-based leasing fee.',
          },
          {
            question: 'Can I pay rent online?',
            answer:
              'Yes. All tenants get access to our tenant portal where you can pay rent by Visa Debit, Mastercard Debit, bank transfer, or e-transfer. Pre-authorized monthly payments are also available so you never miss a due date.',
          },
          {
            question: 'How do I submit a maintenance request?',
            answer:
              'Log into your tenant portal, click "Maintenance," describe the issue, and attach photos if helpful. Urgent matters (no heat, water leak, security issue) are escalated immediately. Non-urgent requests are typically addressed within 3–5 business days.',
          },
          {
            question: 'What is the minimum heat temperature in Ontario rentals?',
            answer:
              'Ontario law requires landlords to maintain indoor temperatures of at least 20°C between September 1 and June 15. If your unit falls below this, submit an urgent maintenance request in the portal and we will act immediately.',
          },
          {
            question: 'Can tenants withhold rent for maintenance issues?',
            answer:
              'Under the RTA, tenants cannot unilaterally withhold rent. However, if a landlord fails to maintain the unit in a good state of repair, tenants can file a T6 application with the LTB for rent abatement. Always report maintenance issues through the portal first — this creates a documented record.',
          },
        ],
      },
      {
        id: 'moving-out',
        label: 'Moving Out',
        icon: '📦',
        questions: [
          {
            question: 'How much notice do I need to give to move out?',
            answer:
              'For a fixed-term lease ending on its natural end date, no notice is required but it is courteous to confirm 60 days prior. For a month-to-month tenancy, 60 days written notice is required on the N9 form, effective on the last day of a rental month.',
          },
          {
            question: 'When do I get my last month\'s rent deposit back?',
            answer:
              'The last month\'s rent (LMR) deposit is applied to your final month — you do not receive it as a cash refund. If you paid more than one month as deposit, the excess is returned. Interest on the LMR deposit accrues annually at the Ontario rent increase guideline rate.',
          },
          {
            question: 'What is the move-out inspection process?',
            answer:
              'We conduct a move-out inspection with you present (if you choose). We compare the unit\'s condition against the move-in inspection report. Normal wear and tear is not chargeable. Damage beyond normal wear and tear may be deducted from any owed amounts.',
          },
        ],
      },
    ],
  },
  {
    id: 'general',
    label: 'About Us',
    description: 'About MoveSmart Rentals, our technology, and how to reach us',
    categories: [
      {
        id: 'company',
        label: 'Company',
        icon: '🏢',
        questions: [
          {
            question: 'What is MoveSmart Rentals?',
            answer:
              'MoveSmart Rentals is an Ontario-based property management and tenant placement company. We combine technology with local expertise to make renting simpler, safer, and smarter — for both property owners and tenants.',
          },
          {
            question: 'What cities does MoveSmart Rentals serve?',
            answer:
              'We currently operate across 20+ Ontario cities: Toronto, Mississauga, Brampton, Hamilton, Ottawa, London, Kitchener, Waterloo, Guelph, Barrie, Oshawa, Ajax, Whitby, Oakville, Burlington, Milton, Cambridge, Markham, Vaughan, and Richmond Hill. We are actively expanding.',
          },
          {
            question: 'How do I contact MoveSmart Rentals?',
            answer:
              'Phone: +1 (437) 295-7688 | Email: info@movesmartrentals.com | Or fill out the contact form at movesmartrentals.com/contact. Our team responds within 24 hours on business days.',
          },
          {
            question: 'Does MoveSmart Rentals offer franchising?',
            answer:
              'Yes. We offer territory-based franchising for property professionals who want to operate under the MoveSmart brand and technology platform. Visit movesmartrentals.com/franchising for details on available markets and investment requirements.',
          },
        ],
      },
      {
        id: 'technology',
        label: 'Technology',
        icon: '💻',
        questions: [
          {
            question: 'What is the owner/tenant portal?',
            answer:
              'Our portal is a web-based platform for both owners and tenants. Owners can view financial reports, approve maintenance work, and track lease status. Tenants can pay rent, submit maintenance requests, and access documents. It is included at no extra cost for all active clients.',
          },
          {
            question: 'Is my financial data secure?',
            answer:
              'Yes. All financial data is encrypted in transit (TLS 1.3) and at rest (AES-256). We do not store full payment card numbers. Our infrastructure is hosted on SOC 2 Type II certified servers with 99.9% uptime.',
          },
          {
            question: 'Which listing platforms do you use?',
            answer:
              'We list on 30+ platforms including Realtor.ca, Kijiji, Facebook Marketplace, Rentals.ca, Padmapper, Zumper, Craigslist, and targeted social media ad campaigns. Premium listings are boosted in the first 48 hours to maximize early visibility.',
          },
          {
            question: 'Can I see how my listing is performing?',
            answer:
              'Yes. Your owner portal shows real-time listing analytics: views, inquiries, showing bookings, and conversion rates — all updated daily. We also provide weekly placement status emails until the unit is rented.',
          },
        ],
      },
    ],
  },
]

/* Build flat list for JSON-LD schema */