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
      { title: 'Tenant Placement', href: '/services/tenant-placement/', description: 'Marketing, showings, and lease signing' },
      { title: 'Leasing Services', href: '/services/leasing-services/', description: 'Full-service leasing for owners' },
      { title: 'Tenant Screening', href: '/services/tenant-screening/', description: 'Multi-step applicant verification' },
      { title: 'Rent Guarantee', href: '/services/rent-guarantee/', description: 'Protection against missed payments' },
      { title: 'Tenant Insurance', href: '/services/tenant-insurance/', description: 'Coverage for renters and units' },
      { title: 'Tenant Guarantor', href: '/services/tenant-guarantor/', description: 'Co-signer support for applicants' },
      { title: 'Rental Preparation', href: '/services/rental-preparation/', description: 'Staging, photography, listing prep' },
      { title: 'Institutional Lease-Up', href: '/institutional-lease-up/', description: 'Bulk lease-up for new builds' },
    ],
  },
  // ─────────────────────────────────────────────────────────────────
  //  Resources & Solutions are hidden from the header nav per client
  //  direction (June 2026). The underlying pages still exist by
  //  direct URL but are not surfaced in navigation or main sitemap.
  //  To restore: re-add the groups here AND re-add the matching
  //  sections in src/components/layout/mobile-nav.tsx AND re-add the
  //  `/resources/` static entry in src/app/sitemap.ts.
  // ─────────────────────────────────────────────────────────────────
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
    label: 'About',
    items: [
      { title: 'About Us', href: '/about/', description: 'Who we are, what we do, and our full leasing team' },
      { title: 'Meet the Team', href: '/meet-the-team/', description: 'The leasing operators behind every owner-file' },
      { title: 'Careers', href: '/careers/', description: 'Join the MoveSmart leasing team' },
      { title: 'Reviews', href: '/reviews/', description: 'What landlords say about MoveSmart' },
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
