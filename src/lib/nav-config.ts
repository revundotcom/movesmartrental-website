/* ------------------------------------------------------------------ */
/*  Shared navigation data used by Header, Footer, and MobileNav      */
/*                                                                    */
/*  Brand positioning: white-glove rental brokerage delivering        */
/*  full-cycle leasing execution for landlords, property managers,    */
/*  and institutional rental operators.                                */
/* ------------------------------------------------------------------ */

/* ---- Header nav groups (contract §7.1 & §20.5) ----
 *
 * Required top-nav order:
 *   Home · Owners · Tenants · Services · Locations · Pricing ·
 *   Resources · Franchising · About · Contact
 *
 * "Home" is rendered as a standalone link by the Header component.
 * Each remaining slot is a NAV_GROUPS entry. Single-link groups
 * render as direct links; multi-link groups render as dropdowns.
 *
 * TODO(phase-2): build dedicated /locations/ and /resources/ hubs.
 * For now those slots fall back to /ca/ontario/ and /faq/ to
 * avoid 404s while preserving the contracted nav order.
 */

export const NAV_GROUPS = [
  {
    label: 'Owners',
    items: [
      { title: 'Owner Hub', href: '/owners/', description: 'Landlord and operator command centre' },
      { title: 'Pricing', href: '/pricing/', description: 'Transparent leasing fees, no monthly lock-in' },
      { title: 'Portal & Technology', href: '/portal-and-technology/', description: 'Owner portal and reporting tools' },
      { title: 'Reviews', href: '/reviews/', description: 'See what landlords say about MoveSmart' },
      { title: 'Create a Free Account', href: '/contact/?type=owner', description: 'Get started with a free account' },
    ],
  },
  {
    label: 'Tenants',
    items: [
      { title: 'Tenant Hub', href: '/tenants/', description: 'Everything renters need in one place' },
      { title: 'Apply', href: '/contact/?type=tenant', description: 'Submit a rental application' },
      { title: 'Tenant FAQ', href: '/faq/', description: 'Answers for renters and applicants' },
    ],
  },
  {
    label: 'Services',
    items: [
      { title: 'All Services', href: '/services/', description: 'Full-cycle leasing execution overview' },
      { title: 'Tenant Placement', href: '/services/tenant-placement/', description: 'Marketing, showings, and lease signing' },
      { title: 'Leasing Services', href: '/services/leasing-services/', description: 'White-glove leasing for owners' },
      { title: 'Tenant Screening', href: '/services/tenant-screening/', description: 'Multi-step applicant verification' },
      { title: 'Rent Guarantee', href: '/services/rent-guarantee/', description: 'Protection against missed payments' },
      { title: 'Tenant Insurance', href: '/services/tenant-insurance/', description: 'Coverage for renters and units' },
      { title: 'Tenant Guarantor', href: '/services/tenant-guarantor/', description: 'Co-signer support for applicants' },
      { title: 'Rental Preparation', href: '/services/rental-preparation/', description: 'Staging, photography, listing prep' },
      { title: 'Institutional Lease-Up', href: '/services/institutional-lease-up/', description: 'Bulk lease-up for new builds' },
    ],
  },
  {
    label: 'Locations',
    // TODO(phase-2): build dedicated /locations/ hub. Until then we
    // surface the existing Ontario index plus tier-1 city links.
    items: [
      { title: 'All Ontario Locations', href: '/ca/ontario/', description: 'Browse every Ontario city we serve' },
      { title: 'Toronto', href: '/ca/ontario/toronto/', description: 'Downtown core to the suburbs' },
      { title: 'Mississauga', href: '/ca/ontario/mississauga/', description: 'Square One and Port Credit' },
      { title: 'Brampton', href: '/ca/ontario/brampton/', description: 'Heart Lake to Mount Pleasant' },
      { title: 'Hamilton', href: '/ca/ontario/hamilton/', description: 'Westdale to Stoney Creek' },
      { title: 'Ottawa', href: '/ca/ontario/ottawa/', description: 'Centretown, Westboro, Kanata' },
      { title: 'Vaughan', href: '/ca/ontario/vaughan/', description: 'Woodbridge, Maple, Thornhill' },
      { title: 'Markham', href: '/ca/ontario/markham/', description: 'Unionville and Cornell' },
    ],
  },
  {
    label: 'Pricing',
    items: [
      { title: 'Pricing & Plans', href: '/pricing/', description: 'Transparent leasing fees, no lock-in' },
    ],
  },
  {
    label: 'Resources',
    // TODO(phase-2): build dedicated /resources/ hub. For now this
    // points at the FAQ which is the closest existing resource page.
    items: [
      { title: 'FAQ', href: '/faq/', description: 'Answers for owners, operators, and renters' },
      { title: 'Reviews', href: '/reviews/', description: 'Verified client outcomes' },
      { title: 'Tenant Hub', href: '/tenants/', description: 'Renter-focused guides and tools' },
      { title: 'Owner Hub', href: '/owners/', description: 'Landlord-focused guides and tools' },
    ],
  },
  {
    label: 'Franchising',
    items: [
      { title: 'Franchising', href: '/franchising/', description: 'Build a leasing brokerage with MoveSmart' },
    ],
  },
  {
    label: 'About',
    items: [
      { title: 'About Us', href: '/about/', description: 'Our story, mission, and team' },
      { title: 'Reviews', href: '/reviews/', description: 'See what clients say about us' },
    ],
  },
  {
    label: 'Contact',
    items: [
      { title: 'Contact', href: '/contact/', description: 'Get in touch with our team' },
    ],
  },
] as const

/* ---- Footer columns (contract §7.1) ----
 *
 * Includes: nine core services, owner resources, tenant resources,
 * Ontario tier-1 cities, US state landing pages (some are phase-2),
 * franchising, blog/resources, support, and legal.
 *
 * TODO(phase-2): replace placeholder fallbacks once dedicated
 * /locations/, /resources/, /blog/, /us/{state}/, and individual
 * service hub pages are live.
 */

export const FOOTER_COLUMNS = [
  {
    title: 'Core Services',
    links: [
      { label: 'Tenant Placement', href: '/services/tenant-placement/' },
      { label: 'Leasing Services', href: '/services/leasing-services/' },
      { label: 'Tenant Screening', href: '/services/tenant-screening/' },
      { label: 'Rent Guarantee', href: '/services/rent-guarantee/' },
      // TODO(phase-2): real /services/tenant-insurance/
      { label: 'Tenant Insurance', href: '/services/' },
      // TODO(phase-2): real /services/tenant-guarantor/
      { label: 'Tenant Guarantor', href: '/services/' },
      { label: 'Rental Preparation', href: '/services/rental-preparation/' },
      // TODO(phase-2): real /services/portal-and-technology/
      { label: 'Portal & Technology', href: '/portal-and-technology/' },
      // TODO(phase-2): real /services/institutional-lease-up/
      { label: 'Institutional Lease-Up', href: '/services/' },
    ],
  },
  {
    title: 'Owner Resources',
    links: [
      { label: 'Owner Hub', href: '/owners/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'Owner FAQ', href: '/faq/' },
      { label: 'Create a Free Account', href: '/contact/?type=owner' },
    ],
  },
  {
    title: 'Tenant Resources',
    links: [
      { label: 'Tenant Hub', href: '/tenants/' },
      { label: 'Apply', href: '/contact/?type=tenant' },
      { label: 'Tenant FAQ', href: '/faq/' },
    ],
  },
  {
    title: 'Ontario',
    links: [
      { label: 'Toronto', href: '/ca/ontario/toronto/' },
      { label: 'Mississauga', href: '/ca/ontario/mississauga/' },
      { label: 'Brampton', href: '/ca/ontario/brampton/' },
      { label: 'Hamilton', href: '/ca/ontario/hamilton/' },
      { label: 'Ottawa', href: '/ca/ontario/ottawa/' },
      { label: 'London', href: '/ca/ontario/london/' },
      { label: 'Vaughan', href: '/ca/ontario/vaughan/' },
      { label: 'Markham', href: '/ca/ontario/markham/' },
      { label: 'Richmond Hill', href: '/ca/ontario/richmond-hill/' },
      { label: 'Oakville', href: '/ca/ontario/oakville/' },
      { label: 'Burlington', href: '/ca/ontario/burlington/' },
      { label: 'Kitchener', href: '/ca/ontario/kitchener/' },
      { label: 'Waterloo', href: '/ca/ontario/waterloo/' },
      { label: 'Cambridge', href: '/ca/ontario/cambridge/' },
      { label: 'Guelph', href: '/ca/ontario/guelph/' },
    ],
  },
  {
    title: 'United States',
    links: [
      // TODO(phase-2): build /us/{state}/ landing pages. Links are
      // placed now to lock in IA and crawl paths.
      { label: 'Florida', href: '/us/florida/' },
      { label: 'Texas', href: '/us/texas/' },
      { label: 'California', href: '/us/california/' },
      { label: 'New York', href: '/us/new-york/' },
      { label: 'Illinois', href: '/us/illinois/' },
      { label: 'Georgia', href: '/us/georgia/' },
      { label: 'North Carolina', href: '/us/north-carolina/' },
      { label: 'Arizona', href: '/us/arizona/' },
      { label: 'Colorado', href: '/us/colorado/' },
      { label: 'New Jersey', href: '/us/new-jersey/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Franchising', href: '/franchising/' },
      { label: 'Reviews', href: '/reviews/' },
      // TODO(phase-2): real /blog/ - falling back to FAQ for now.
      { label: 'Blog & Resources', href: '/faq/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
] as const

/* ---- Legal links (footer bottom bar) ---- */

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
] as const
