/* ------------------------------------------------------------------ */
/*  Shared navigation data used by Header, Footer, and MobileNav      */
/*                                                                    */
/*  Brand positioning: full-service leasing and tenant placement      */
/*  company delivering end-to-end leasing execution for landlords,    */
/*  property managers, and institutional rental operators.            */
/* ------------------------------------------------------------------ */

import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

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
    ],
  },
  {
    label: 'Tenants',
    items: [
      { title: 'Tenant Hub', href: '/tenants/', description: 'Everything renters need in one place' },
      { title: 'Browse Properties', href: '/properties/', description: 'Available homes, condos & townhouses' },
      { title: 'Tenant FAQ', href: '/faq/', description: 'Answers for renters and applicants' },
    ],
  },
  {
    label: 'Properties',
    items: [
      { title: 'Browse Properties', href: '/properties/', description: 'Current verified rental listings across Canada and the US' },
    ],
  },
  {
    label: 'Services',
    items: [
      { title: 'All Services', href: '/services/', description: 'Browse the full leasing services menu' },
      { title: 'Tenant Placement', href: '/services/tenant-placement/', description: 'Marketing, showings, and lease signing' },
      { title: 'Lease Execution', href: '/services/lease-execution/', description: 'Drafting, signing, deposit collection' },
      { title: 'Rental Pricing and Market Analysis', href: '/services/rental-pricing-and-market-analysis/', description: 'Data driven rent recommendations' },
      { title: 'Property Marketing and Listings', href: '/services/property-marketing-and-listings/', description: 'Photos, copy, syndication' },
      { title: 'Tenant Screening', href: '/services/tenant-screening/', description: 'Multi step applicant verification' },
      { title: 'Property Showings', href: '/services/property-showings/', description: 'In person and virtual tours' },
      { title: 'Move In Coordination', href: '/services/move-in-coordination/', description: 'Smooth lease to keys handoff' },
      { title: 'Institutional Lease Up', href: '/services/institutional-lease-up/', description: 'High volume lease up for new builds' },
    ],
  },
  {
    label: 'Industries',
    items: [
      { title: 'All Industries', href: '/industries/', description: 'See how we work with every owner profile' },
      { title: 'Individual Landlords', href: '/industries/individual-landlords/', description: 'Single property and small portfolio owners' },
      { title: 'Portfolio Owners', href: '/industries/portfolio-owners/', description: 'Owners with 5 to 100 units' },
      { title: 'Developers', href: '/industries/developers/', description: 'New build lease up and pre leasing' },
      { title: 'Real Estate Investors', href: '/industries/real-estate-investors/', description: 'Active investors and BRRRR operators' },
      { title: 'Condo Owners', href: '/industries/condo-owners/', description: 'High rise and low rise condo specifics' },
      { title: 'Multi Family Operators', href: '/industries/multi-family-operators/', description: 'Large operators and REITs' },
    ],
  },
  {
    label: 'Locations',
    items: [
      { title: 'All Locations', href: '/locations/', description: 'See every market we serve' },
      { title: 'Toronto, ON', href: '/locations/toronto/', description: 'GTA core market' },
      { title: 'Mississauga, ON', href: '/locations/mississauga/', description: 'Square One, Port Credit, Streetsville' },
      { title: 'Vaughan, ON', href: '/locations/vaughan/', description: 'VMC, Woodbridge, Maple, Thornhill' },
      { title: 'Markham, ON', href: '/locations/markham/', description: 'Unionville, Cathedraltown, Cornell' },
      { title: 'Brampton, ON', href: '/locations/brampton/', description: 'Mount Pleasant, Springdale, Bramalea' },
      { title: 'Hamilton, ON', href: '/locations/hamilton/', description: 'Westdale, Durand, Stoney Creek' },
      { title: 'Ottawa, ON', href: '/locations/ottawa/', description: 'National Capital Region' },
      { title: 'Miami, FL', href: '/locations/miami/', description: 'Brickell, Wynwood, Coral Gables' },
      { title: 'Phoenix, AZ', href: '/locations/phoenix/', description: 'Scottsdale, Tempe, Chandler' },
      { title: 'Houston, TX', href: '/locations/houston/', description: 'The Heights, Memorial, Sugar Land' },
      { title: 'Austin, TX', href: '/locations/austin/', description: 'Downtown, East Austin, Mueller' },
      { title: 'Dallas, TX', href: '/locations/dallas/', description: 'Uptown, Frisco, Plano' },
      { title: 'Atlanta, GA', href: '/locations/atlanta/', description: 'Midtown, Buckhead, Decatur' },
      { title: 'Charlotte, NC', href: '/locations/charlotte/', description: 'Uptown, South End, Ballantyne' },
      { title: 'New York, NY', href: '/locations/nyc/', description: 'Manhattan, Brooklyn, Queens, LIC' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { title: 'Resource Hub', href: '/resources/', description: 'All landlord and tenant resources' },
      { title: 'Blog', href: '/resources/blog/', description: 'Leasing tips and market commentary' },
      { title: 'Landlord Guides', href: '/resources/landlord-guides/', description: 'Step by step playbooks for owners' },
      { title: 'Market Reports', href: '/resources/market-reports/', description: 'Quarterly market intelligence' },
      { title: 'Screening Checklist', href: '/resources/screening-checklist/', description: 'Free tenant screening checklist' },
      { title: 'Lease Templates', href: '/resources/lease-templates/', description: 'Statutory compliant lease templates' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { title: 'Developers', href: '/developers/', description: 'Lease-up campaigns, end-to-end execution, on-site leasing teams.' },
      { title: 'Property Managers', href: '/property-managers/', description: 'Outsource leasing without losing operational control.' },
      { title: 'Institutional Lease-Up', href: '/institutional-lease-up/', description: 'Pilot-ready leasing for institutional landlords and asset managers.' },
    ],
  },
  {
    label: 'Pricing',
    items: [
      { title: 'Pricing & Plans', href: '/pricing/', description: 'Transparent leasing fees, no lock-in' },
    ],
  },
  {
    label: 'Franchising',
    items: [
      { title: 'Franchising', href: '/franchising/', description: 'Build a leasing brokerage with MoveSmart' },
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
      { label: 'Tenant Insurance', href: '/services/tenant-insurance/' },
      { label: 'Tenant Guarantor', href: '/services/tenant-guarantor/' },
      { label: 'Rental Preparation', href: '/services/rental-preparation/' },
      { label: 'Portal & Technology', href: '/portal-and-technology/' },
      { label: 'Institutional Lease-Up', href: '/institutional-lease-up/' },
    ],
  },
  {
    title: 'Canada',
    links: [
      { label: 'Ontario', href: '/ca/ontario/' },
      { label: 'Quebec', href: '/ca/quebec/' },
      { label: 'British Columbia', href: '/ca/british-columbia/' },
      { label: 'Alberta', href: '/ca/alberta/' },
      { label: 'Manitoba', href: '/ca/manitoba/' },
      { label: 'Nova Scotia', href: '/ca/nova-scotia/' },
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
    title: 'Owner Resources',
    links: [
      { label: 'Owner Hub', href: '/owners/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'Owner FAQ', href: '/faq/' },
      { label: 'List my property', href: PORTAL_OWNER_SIGNUP_URL },
    ],
  },
  {
    title: 'Tenant Resources',
    links: [
      { label: 'Tenant Hub', href: '/tenants/' },
      { label: 'Browse Properties', href: '/properties/' },
      { label: 'Tenant FAQ', href: '/faq/' },
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
