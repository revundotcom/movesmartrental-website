import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'

export const metadata: Metadata = {
  title: 'Privacy Policy | MoveSmart Rentals',
  description:
    'MoveSmart Rentals privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy/',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy', href: '/privacy/' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-white/70">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <p>
              MoveSmart Rentals, operated by Revun (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;), is committed to protecting the privacy of visitors
              to movesmartrentals.com (the &quot;Site&quot;). This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our Site or use our services.
            </p>

            {/* 1 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                1. Information We Collect
              </h2>
              <p className="mt-3">
                We may collect the following types of information:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, mailing address, and other details you provide
                  when filling out forms, requesting a consultation, or
                  contacting us.
                </li>
                <li>
                  <strong>Property Information:</strong> Details about rental
                  properties you submit for a leasing evaluation or rental
                  pricing analysis.
                </li>
                <li>
                  <strong>Usage Data:</strong> IP address, browser type, pages
                  visited, time spent on pages, referring URLs, and other
                  analytics data collected automatically.
                </li>
                <li>
                  <strong>Device Information:</strong> Device type, operating
                  system, and unique device identifiers.
                </li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                2. Use of Information
              </h2>
              <p className="mt-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  To provide, operate, and deliver our white-glove leasing
                  brokerage services, including strategic rental pricing,
                  marketing, showings, offer management, applicant
                  qualification, rent protection (via partner), lease
                  execution, move-in coordination, and institutional
                  lease-up engagements.
                </li>
                <li>To respond to inquiries, process requests, and communicate with you.</li>
                <li>To send marketing communications (with your consent) about our services, promotions, and market insights.</li>
                <li>To improve our Site, services, and user experience through analytics.</li>
                <li>To comply with legal obligations and enforce our terms.</li>
                <li>To detect, prevent, and address fraud or technical issues.</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                3. Information Sharing
              </h2>
              <p className="mt-3">
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Service Providers:</strong> Trusted third-party
                  vendors who assist us in operating our Site, conducting our
                  business, or servicing you (e.g., payment processors, CRM
                  platforms, email services).
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, regulation,
                  legal process, or governmental request.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger,
                  acquisition, or sale of all or a portion of our assets.
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you have given us explicit
                  permission to share your information for a specific purpose.
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                4. Data Security
              </h2>
              <p className="mt-3">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="mt-3">
                Our Site uses cookies and similar tracking technologies to
                enhance your browsing experience. Cookies are small data files
                stored on your device. We use:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Essential Cookies:</strong> Required for the Site to
                  function properly.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors interact with our Site (e.g., Google Analytics).
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant
                  advertisements and track campaign performance.
                </li>
              </ul>
              <p className="mt-2">
                You can manage cookie preferences through your browser settings.
                Disabling certain cookies may affect Site functionality.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                6. Third-Party Services
              </h2>
              <p className="mt-3">
                Our Site may contain links to third-party websites or integrate
                with third-party services (e.g., Google Analytics, payment
                processors, social media platforms). We are not responsible for
                the privacy practices of these external services. We encourage
                you to review their privacy policies before providing personal
                information.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                7. Children&apos;s Privacy
              </h2>
              <p className="mt-3">
                Our services are not directed to individuals under the age of 18.
                We do not knowingly collect personal information from children.
                If we become aware that we have collected personal information
                from a child without parental consent, we will take steps to
                delete that information promptly.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                8. Your Rights
              </h2>
              <p className="mt-3">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Access, correct, or delete your personal information.</li>
                <li>Withdraw consent for marketing communications at any time.</li>
                <li>Request a copy of the data we hold about you.</li>
                <li>Lodge a complaint with a supervisory authority.</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us using the
                information below.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                9. Changes to This Policy
              </h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. Changes will
                be posted on this page with an updated &quot;Last updated&quot;
                date. We encourage you to review this page periodically for the
                latest information on our privacy practices.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                10. Contact Information
              </h2>
              <p className="mt-3">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us:
              </p>
              <ul className="mt-2 list-none space-y-1 pl-0">
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:contact@movesmartrentals.com"
                    className="text-brand-emerald underline hover:no-underline"
                  >
                    contact@movesmartrentals.com
                  </a>
                </li>
                <li>
                  <strong>Website:</strong>{' '}
                  <a
                    href="https://movesmartrentals.com"
                    className="text-brand-emerald underline hover:no-underline"
                  >
                    movesmartrentals.com
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                For general inquiries, visit our{' '}
                <Link
                  href="/contact/"
                  className="text-brand-emerald underline hover:no-underline"
                >
                  Contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
