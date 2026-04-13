/* ------------------------------------------------------------------ */
/*  Shared navigation data used by Header, Footer, and MobileNav      */
/* ------------------------------------------------------------------ */

/* ---- Header nav groups ---- */

export const NAV_GROUPS = [
  {
    label: 'For Owners',
    items: [
      { title: 'Owner Hub', href: '/owners/', description: 'Dashboard and resources for property owners' },
      { title: 'Services', href: '/services/', description: 'Full-service property management solutions' },
      { title: 'Pricing', href: '/pricing/', description: 'Transparent pricing with no hidden fees' },
      { title: 'Portal & Technology', href: '/portal-and-technology/', description: 'Owner portal and technology platform' },
      { title: 'Reviews', href: '/reviews/', description: 'See what our clients say about us' },
      { title: 'Franchising', href: '/franchising/', description: 'Grow with the MoveSmart brand' },
    ],
  },
  {
    label: 'For Tenants',
    items: [
      { title: 'Tenant Hub', href: '/tenants/', description: 'Everything tenants need in one place' },
      { title: 'Locations', href: '/locations/', description: 'Browse available rental properties' },
      { title: 'Resources', href: '/resources/', description: 'Guides, FAQs, and helpful articles' },
    ],
  },
  {
    label: 'About',
    items: [
      { title: 'About Us', href: '/about/', description: 'Our story, mission, and team' },
      { title: 'Contact', href: '/contact/', description: 'Get in touch with our team' },
      { title: 'FAQ', href: '/faq/', description: 'Answers to commonly asked questions' },
    ],
  },
] as const

/* ---- Footer columns ---- */

export const FOOTER_COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Tenant Placement', href: '/services/tenant-placement/' },
      { label: 'Tenant Screening', href: '/services/tenant-screening/' },
      { label: 'Rent Guarantee', href: '/services/rent-guarantee/' },
      { label: 'Rental Preparation', href: '/services/rental-preparation/' },
      { label: 'Leasing Services', href: '/services/leasing-services/' },
      { label: 'Portal & Technology', href: '/portal-and-technology/' },
      { label: 'Pricing', href: '/pricing/' },
    ],
  },
  {
    title: 'For Owners',
    links: [
      { label: 'Owner Hub', href: '/owners/' },
      { label: 'Create Free Account', href: '/contact/' },
      { label: 'Book a Call', href: '/contact/?intent=call' },
      { label: 'Reviews', href: '/reviews/' },
    ],
  },
  {
    title: 'For Tenants',
    links: [
      { label: 'Tenant Hub', href: '/tenants/' },
      { label: 'Search Rentals', href: '/locations/' },
      { label: 'Tenant FAQ', href: '/faq/' },
      { label: 'Apply Now', href: '/contact/' },
    ],
  },
  {
    title: 'Ontario',
    links: [
      { label: 'Toronto', href: '/ca/ontario/toronto/' },
      { label: 'Ottawa', href: '/ca/ontario/ottawa/' },
      { label: 'Mississauga', href: '/ca/ontario/mississauga/' },
      { label: 'Hamilton', href: '/ca/ontario/hamilton/' },
      { label: 'Brampton', href: '/ca/ontario/brampton/' },
      { label: 'London', href: '/ca/ontario/london/' },
      { label: 'Kitchener', href: '/ca/ontario/kitchener/' },
      { label: 'All Ontario Cities', href: '/ca/ontario/' },
    ],
  },
  {
    title: 'United States',
    links: [
      { label: 'Florida', href: '/us/florida/' },
      { label: 'Texas', href: '/us/texas/' },
      { label: 'California', href: '/us/california/' },
      { label: 'New York', href: '/us/new-york/' },
      { label: 'Illinois', href: '/us/illinois/' },
      { label: 'All US States', href: '/us/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Franchising', href: '/franchising/' },
      { label: 'Resources', href: '/resources/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
] as const

/* ---- Legal links (footer bottom bar) ---- */

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
] as const
