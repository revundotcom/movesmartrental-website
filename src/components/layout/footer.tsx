import Link from 'next/link'

const FOOTER_SECTIONS = [
  {
    title: 'Services',
    links: [
      { label: 'Tenant Placement', href: '/services/tenant-placement/' },
      { label: 'Tenant Screening', href: '/services/tenant-screening/' },
      { label: 'Rent Guarantee', href: '/services/rent-guarantee/' },
      { label: 'Rental Preparation', href: '/services/rental-preparation/' },
      { label: 'Rental Marketing', href: '/services/rental-marketing/' },
      { label: 'Leasing Services', href: '/services/leasing-services/' },
      { label: 'Portal Technology', href: '/services/portal-technology/' },
      { label: 'Pricing', href: '/pricing/' },
    ],
  },
  {
    title: 'For Owners',
    links: [
      { label: 'Owner Hub', href: '/owners/' },
      { label: 'Create Free Account', href: '/contact/' },
      { label: 'Book a Call', href: '/contact/' },
      { label: 'Submit Property', href: '/contact/' },
    ],
  },
  {
    title: 'For Tenants',
    links: [
      { label: 'Tenant Hub', href: '/tenants/' },
      { label: 'Search Rentals', href: '/locations/' },
      { label: 'Tenant FAQ', href: '/resources/tenant-faq/' },
      { label: 'Apply Now', href: '/contact/' },
    ],
  },
  {
    title: 'Locations',
    links: [
      { label: 'Ontario', href: '/ca/ontario/' },
      { label: 'Toronto', href: '/ca/ontario/toronto/' },
      { label: 'Mississauga', href: '/ca/ontario/mississauga/' },
      { label: 'Ottawa', href: '/ca/ontario/ottawa/' },
      { label: 'All Locations', href: '/locations/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Franchising', href: '/franchising/' },
      { label: 'Blog', href: '/resources/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Service', href: '/terms/' },
    ],
  },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Link columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {currentYear} MoveSmart Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
