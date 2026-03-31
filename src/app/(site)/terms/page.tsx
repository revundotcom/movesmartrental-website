import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'

export const metadata: Metadata = {
  title: 'Terms of Service | MoveSmart Rentals',
  description:
    'Terms of Service for MoveSmart Rentals. Read our terms and conditions for using our property management services and website.',
  alternates: {
    canonical: '/terms/',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function TermsOfServicePage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Service', href: '/terms/' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-white/70">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <p>
              Welcome to movesmartrentals.com (the &quot;Site&quot;), operated by
              MoveSmart Rentals, a service of Revun (&quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;). By accessing or using this
              Site and our services, you agree to be bound by these Terms of
              Service (&quot;Terms&quot;). If you do not agree with these Terms,
              please do not use the Site.
            </p>

            {/* 1 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3">
                By accessing, browsing, or using our Site or services, you
                acknowledge that you have read, understood, and agree to be
                bound by these Terms and our{' '}
                <Link
                  href="/privacy/"
                  className="text-brand-emerald underline hover:no-underline"
                >
                  Privacy Policy
                </Link>
                . These Terms apply to all visitors, users, property owners,
                tenants, and others who access or use the Site.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                2. Services Description
              </h2>
              <p className="mt-3">
                MoveSmart Rentals provides property management services
                including, but not limited to: tenant placement and screening,
                rent collection and protection, property maintenance
                coordination, lease management, and landlord consultation. Our
                services are available primarily in Ontario, Canada, with
                additional markets as indicated on the Site.
              </p>
              <p className="mt-2">
                We reserve the right to modify, suspend, or discontinue any
                aspect of our services at any time without prior notice.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                3. User Accounts
              </h2>
              <p className="mt-3">
                Certain features of our services may require you to create an
                account. You are responsible for maintaining the confidentiality
                of your account credentials and for all activities that occur
                under your account. You agree to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Provide accurate and complete information during registration.</li>
                <li>Update your information promptly if it changes.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
                <li>Not share your account credentials with any third party.</li>
              </ul>
              <p className="mt-2">
                We reserve the right to suspend or terminate accounts that
                violate these Terms or engage in fraudulent activity.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                4. Property Listings
              </h2>
              <p className="mt-3">
                Property information displayed on the Site is provided for
                informational purposes. While we strive to ensure accuracy, we
                do not guarantee that all listing details (including
                availability, pricing, photos, and descriptions) are complete,
                current, or error-free. Property owners are responsible for the
                accuracy of information they provide.
              </p>
              <p className="mt-2">
                MoveSmart Rentals reserves the right to remove or modify any
                listing that violates applicable laws, our policies, or these
                Terms.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                5. Fees and Payment
              </h2>
              <p className="mt-3">
                Fees for our property management services are outlined in
                individual service agreements between MoveSmart Rentals and
                property owners. General pricing information on the Site is
                provided for reference and may not reflect all applicable fees,
                taxes, or charges.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>All fees are in Canadian Dollars (CAD) unless otherwise stated.</li>
                <li>Payment terms are governed by your individual service agreement.</li>
                <li>Late payments may be subject to additional charges as specified in your agreement.</li>
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                6. Intellectual Property
              </h2>
              <p className="mt-3">
                All content on the Site, including text, graphics, logos,
                images, videos, software, and design elements, is the property
                of MoveSmart Rentals or its licensors and is protected by
                Canadian and international copyright, trademark, and
                intellectual property laws.
              </p>
              <p className="mt-2">
                You may not reproduce, distribute, modify, create derivative
                works from, publicly display, or otherwise use any content from
                the Site without our prior written consent.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                7. Limitation of Liability
              </h2>
              <p className="mt-3">
                To the fullest extent permitted by applicable law, MoveSmart
                Rentals, its directors, officers, employees, and affiliates
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from or related to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Your use of or inability to use the Site or our services.</li>
                <li>Any errors, inaccuracies, or omissions in Site content.</li>
                <li>Unauthorized access to or alteration of your data.</li>
                <li>Any third-party conduct or content on the Site.</li>
              </ul>
              <p className="mt-2">
                Our total liability for any claim arising under these Terms
                shall not exceed the amount you have paid to us in the twelve
                (12) months preceding the claim.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                8. Indemnification
              </h2>
              <p className="mt-3">
                You agree to indemnify, defend, and hold harmless MoveSmart
                Rentals, its affiliates, officers, directors, employees, and
                agents from and against any claims, liabilities, damages,
                losses, costs, and expenses (including reasonable legal fees)
                arising from:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Your use of the Site or services.</li>
                <li>Your violation of these Terms.</li>
                <li>Your violation of any applicable law or regulation.</li>
                <li>Any information or content you submit through the Site.</li>
              </ul>
            </div>

            {/* 9 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                9. Governing Law
              </h2>
              <p className="mt-3">
                These Terms shall be governed by and construed in accordance
                with the laws of the Province of Ontario and the federal laws of
                Canada applicable therein, without regard to conflict of law
                principles. Any disputes arising under these Terms shall be
                subject to the exclusive jurisdiction of the courts located in
                Ontario, Canada.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                10. Changes to Terms
              </h2>
              <p className="mt-3">
                We reserve the right to update or modify these Terms at any
                time. Changes will be effective immediately upon posting to the
                Site. Your continued use of the Site after changes are posted
                constitutes acceptance of the revised Terms. We encourage you to
                review these Terms periodically.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                11. Severability
              </h2>
              <p className="mt-3">
                If any provision of these Terms is found to be invalid or
                unenforceable, the remaining provisions shall continue in full
                force and effect.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                12. Contact Information
              </h2>
              <p className="mt-3">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <ul className="mt-2 list-none space-y-1 pl-0">
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:info@movesmartrentals.com"
                    className="text-brand-emerald underline hover:no-underline"
                  >
                    info@movesmartrentals.com
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
