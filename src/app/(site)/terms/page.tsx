import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'

export const metadata: Metadata = {
  title: 'Terms of Service | MoveSmart Rentals',
  description:
    'Terms of Service for MoveSmart Rentals, a multi-jurisdictional leasing platform. Read the terms governing your use of our website and services.',
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

      <PageHeroBlock
        kicker="Legal"
        eyebrow="Terms & Conditions"
        headline="Terms of Service"
        accentLastWord={false}
        lede="Effective: May 18, 2026. These Terms govern your access to and use of movesmartrentals.com and the leasing services we provide across Canada and select US states."
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Legal lease agreement and signing pen"
      />

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <p>
              These Terms of Service (the &quot;Terms&quot;) are a binding
              agreement between you and MoveSmart Rentals (&quot;MoveSmart,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). They cover
              your use of movesmartrentals.com (the &quot;Site&quot;), any
              connected portals or applications, and the leasing services we
              market through this Site. Please read them carefully. If you do
              not agree, do not use the Site.
            </p>

            {/* 1 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3">
                By accessing the Site, creating an account, submitting a form,
                booking a consultation, or otherwise using our services, you
                confirm that you have read, understood, and agreed to these
                Terms and to our{' '}
                <Link
                  href="/privacy/"
                  className="text-brand-emerald underline hover:no-underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="mt-2">
                These Terms apply to all visitors, prospective tenants,
                landlords, property owners, real-estate professionals, and
                institutional clients who interact with the Site.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                2. Description of Service
              </h2>
              <p className="mt-3">
                MoveSmart Rentals is a leasing-focused real-estate brokerage. We
                provide full-service tenant placement and leasing services,
                including:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Strategic rental pricing and market analysis</li>
                <li>Listing syndication to MLS systems and rental portals</li>
                <li>Photography, marketing, and showings coordination</li>
                <li>Tenant qualification, screening, and reference checks</li>
                <li>Offer management and lease execution</li>
                <li>Move-in coordination and key handover</li>
                <li>
                  Institutional and multi-unit lease-up engagements for
                  developers and asset managers
                </li>
              </ul>
              <p className="mt-2">
                MoveSmart Rentals does <strong>not</strong> provide ongoing
                property-management services such as rent collection,
                maintenance dispatch, or accounting once a tenancy is in place,
                unless a separate written agreement specifies otherwise.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                3. Brokerage Relationship
              </h2>
              <p className="mt-3">
                In Canada, MoveSmart Rentals operates under{' '}
                <strong>Valery Real Estate Inc., Brokerage</strong>, which
                serves as our licensed brokerage of record. In the United
                States, we operate through licensed brokerage partners in each
                state where we transact. The applicable licensed brokerage for
                any given transaction will be disclosed in the service
                agreement and on related documents.
              </p>
              <p className="mt-2">
                This Site is informational and marketing in nature. Browsing the
                Site, downloading a guide, or requesting a consultation does
                not, by itself, create an agency, fiduciary, or
                client-brokerage relationship.
              </p>
              <p className="mt-2">
                Any actual leasing engagement, representation, or agency
                relationship is established only through a separate written
                agreement signed by both you and the applicable licensed
                brokerage.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                4. User Accounts
              </h2>
              <p className="mt-3">
                Some features of the Site, including landlord portals and
                tenant application tracking, require an account.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Eligibility.</strong> You must be at least 18 years
                  old and have the legal capacity to enter into a binding
                  contract in your jurisdiction.
                </li>
                <li>
                  <strong>Accuracy of information.</strong> You agree to
                  provide accurate, current, and complete information, and to
                  keep it updated.
                </li>
                <li>
                  <strong>Account security.</strong> You are responsible for
                  safeguarding your credentials and for all activity under your
                  account. Notify us promptly at{' '}
                  <a
                    href="mailto:security@movesmartrentals.com"
                    className="text-brand-emerald underline hover:no-underline"
                  >
                    security@movesmartrentals.com
                  </a>{' '}
                  if you suspect unauthorized access.
                </li>
                <li>
                  <strong>Termination.</strong> We may suspend or terminate any
                  account that violates these Terms, is suspected of fraud, or
                  is inactive for an extended period, with or without notice.
                </li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                5. Listing Information & IDX Data
              </h2>
              <p className="mt-3">
                Property listings displayed on the Site may be sourced from
                multiple feeds, including the Toronto Regional Real Estate
                Board (TRREB) and other Canadian Real Estate Association
                (CREA) MLS systems via IDX, US MLS feeds licensed by our
                partner brokerages, and listings directly uploaded by
                MoveSmart clients.
              </p>
              <p className="mt-2">
                Listing data is provided for personal, non-commercial use and is{' '}
                <em>deemed reliable but not guaranteed</em>. Availability,
                price, square footage, photos, and unit descriptions may
                change without notice. You should independently verify every
                detail with the listing brokerage or your MoveSmart
                representative before relying on it for any decision.
              </p>
              <p className="mt-2">
                The trademarks REALTOR&reg;, REALTORS&reg;, and the REALTOR&reg; logo
                are controlled by The Canadian Real Estate Association (CREA)
                and identify real-estate professionals who are members of
                CREA. Trademarks MLS&reg;, Multiple Listing Service&reg;, and the
                associated logos are owned by CREA and identify the quality of
                services provided by real-estate professionals who are members
                of CREA.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                6. User Conduct
              </h2>
              <p className="mt-3">When using the Site, you agree not to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Scrape, crawl, index, or otherwise extract listing data,
                  contact information, or content by automated means without
                  our prior written consent.
                </li>
                <li>
                  Use bots, scripts, or other automated tools to access the
                  Site, submit forms, or interact with agents.
                </li>
                <li>
                  Misrepresent your identity, employment, income, credit, or
                  any other material fact in an application or inquiry.
                </li>
                <li>
                  Harass, intimidate, or discriminate against other users,
                  landlords, tenants, or MoveSmart agents.
                </li>
                <li>
                  Post or transmit content that is unlawful, defamatory,
                  obscene, infringing, or that violates fair-housing or
                  human-rights laws.
                </li>
                <li>
                  Interfere with, probe, or attempt to disrupt the Site&apos;s
                  infrastructure, security, or availability.
                </li>
              </ul>
            </div>

            {/* 7 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                7. Tenant Applications
              </h2>
              <p className="mt-3">
                Submitting a rental application through the Site is an
                expression of interest, not an offer of tenancy and not a
                guarantee that you will be approved.
              </p>
              <p className="mt-2">
                Final approval rests with the landlord or their authorized
                representative, who may consider credit, income, references,
                rental history, and other lawful criteria. All decisions are
                made in accordance with applicable fair-housing, human-rights,
                and anti-discrimination laws in the jurisdiction where the
                property is located.
              </p>
              <p className="mt-2">
                Application fees, if any, are governed by local law and the
                listing terms; MoveSmart does not charge tenants a fee to
                apply through our Site.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                8. Property Listings (Landlords)
              </h2>
              <p className="mt-3">
                If you list a property with us, you represent and warrant
                that:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  You are the legal owner of the property or have express
                  written authority from the owner to market and lease it.
                </li>
                <li>
                  All information you provide, including unit description,
                  amenities, rent, deposits, and availability, is accurate and
                  not misleading.
                </li>
                <li>
                  The property is in compliance with applicable zoning,
                  building, fire, and short-term-rental regulations.
                </li>
                <li>
                  You will respond to applicant inquiries and decisions
                  promptly and lawfully.
                </li>
              </ul>
              <p className="mt-2">
                We reserve the right to refuse, modify, or remove any listing
                that we believe violates these Terms, applicable law, or our
                fair-housing policy.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                9. Rent Payments
              </h2>
              <p className="mt-3">
                Where rent collection or deposit handling is offered through
                the Site, payment processing is performed by third-party
                providers (such as licensed payment processors and trust
                accounts maintained by the licensed brokerage). MoveSmart
                Rentals is <strong>not</strong> a bank, money transmitter,
                escrow agent, or trust company.
              </p>
              <p className="mt-2">
                Funds are subject to the policies and timing of the underlying
                processor and to applicable real-estate trust-account rules in
                the jurisdiction of the transaction.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                10. Fees and Charges
              </h2>
              <p className="mt-3">
                MoveSmart operates on a success-fee model for standard tenant
                placement:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Landlords pay <strong>no upfront cost</strong> to list a
                  rental with us. Our placement fee is earned only when a
                  qualified tenant signs a lease.
                </li>
                <li>
                  Tenants pay <strong>no fee</strong> to apply through
                  MoveSmart.
                </li>
                <li>
                  Institutional, lease-up, and add-on services (e.g.,
                  professional photography upgrades, retainer engagements,
                  consulting) are quoted separately and governed by a written
                  agreement.
                </li>
                <li>
                  Unless otherwise stated, fees are quoted in Canadian Dollars
                  for Canadian transactions and in US Dollars for US
                  transactions.
                </li>
              </ul>
            </div>

            {/* 11 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                11. Intellectual Property
              </h2>
              <p className="mt-3">
                The Site, including its software, text, graphics, photography,
                video, logos, brand marks, and underlying code, is owned by
                MoveSmart Rentals or its licensors and is protected by
                copyright, trademark, and other intellectual-property laws.
              </p>
              <p className="mt-2">
                Subject to your compliance with these Terms, we grant you a
                limited, non-exclusive, non-transferable, revocable license to
                access and use the Site for personal, non-commercial purposes
                related to leasing a property. All other rights are reserved.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                12. Disclaimers and Limitation of Liability
              </h2>
              <p className="mt-3">
                The Site and its content are provided{' '}
                <strong>&quot;as is&quot;</strong> and{' '}
                <strong>&quot;as available&quot;</strong>, without warranties
                of any kind, whether express or implied. To the fullest extent
                permitted by law, we disclaim all warranties of
                merchantability, fitness for a particular purpose,
                non-infringement, and any warranty regarding the accuracy,
                completeness, or timeliness of listing data.
              </p>
              <p className="mt-2">
                To the maximum extent permitted by applicable law:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  MoveSmart will not be liable for any indirect, incidental,
                  special, consequential, exemplary, or punitive damages,
                  including loss of profits, data, goodwill, or rental income.
                </li>
                <li>
                  Our aggregate liability for any claim arising out of or
                  relating to these Terms or the Site is capped at the{' '}
                  <strong>greater of (a) the total fees you have paid to
                  MoveSmart in the twelve (12) months preceding the claim, or
                  (b) one hundred Canadian dollars (CAD $100)</strong>.
                </li>
              </ul>
              <p className="mt-2">
                Some jurisdictions do not allow certain limitations of
                liability, in which case the limitations above apply only to
                the extent permitted.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                13. Indemnification
              </h2>
              <p className="mt-3">
                You agree to indemnify, defend, and hold harmless MoveSmart
                Rentals, Valery Real Estate Inc., Brokerage, our US partner
                brokerages, and our respective directors, officers, employees,
                and agents from any claims, liabilities, damages, losses, and
                expenses (including reasonable legal fees) arising from your
                breach of these Terms, your misuse of the Site, your violation
                of any law, or any content you submit through the Site.
              </p>
            </div>

            {/* 14 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                14. Privacy
              </h2>
              <p className="mt-3">
                Our collection and use of personal information is described in
                our{' '}
                <Link
                  href="/privacy/"
                  className="text-brand-emerald underline hover:no-underline"
                >
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference. By
                using the Site, you also consent to the privacy practices
                described there.
              </p>
            </div>

            {/* 15 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                15. Cookies and Tracking
              </h2>
              <p className="mt-3">
                The Site uses cookies, pixels, and similar technologies for
                essential functionality, analytics, and marketing. Details on
                the categories of cookies we use, how to manage them, and
                applicable opt-out mechanisms are set out in our{' '}
                <Link
                  href="/privacy/"
                  className="text-brand-emerald underline hover:no-underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* 16 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                16. Governing Law
              </h2>
              <p className="mt-3">
                These Terms are governed by the laws of the Province of
                Ontario and the federal laws of Canada applicable therein,
                without regard to conflict-of-law principles.
              </p>
              <p className="mt-2">
                For users in the United States, any matter that, as a matter
                of law, must be governed by the law of your US state of
                residence or the state where the subject property is located
                (for example, fair-housing or consumer-protection rules) will
                be governed by that state&apos;s law to the extent legally
                required. All other matters remain governed by Ontario law.
              </p>
            </div>

            {/* 17 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                17. Dispute Resolution
              </h2>
              <p className="mt-3">
                If a dispute arises out of or relates to these Terms or the
                Site, the parties will first attempt in good faith to resolve
                it through informal negotiation. Either party may initiate
                negotiation by giving written notice describing the dispute.
              </p>
              <p className="mt-2">
                If the dispute is not resolved within thirty (30) days of that
                notice, the parties agree to submit the dispute to{' '}
                <strong>binding arbitration in Toronto, Ontario</strong>,
                under the rules of the{' '}
                <strong>ADR Institute of Canada, Inc.</strong> The arbitration
                will be conducted in English by a single arbitrator. Judgment
                on the award may be entered in any court of competent
                jurisdiction.
              </p>
              <p className="mt-2">
                Nothing in this section prevents either party from seeking
                injunctive or equitable relief in a court of competent
                jurisdiction to protect intellectual-property rights or
                confidential information.
              </p>
            </div>

            {/* 18 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                18. Changes to Terms
              </h2>
              <p className="mt-3">
                We may revise these Terms from time to time to reflect changes
                in our services, technology, or applicable law. Updated Terms
                are effective when posted, with the new effective date shown
                at the top of the page.
              </p>
              <p className="mt-2">
                Your continued use of the Site after an update constitutes
                acceptance of the revised Terms. If a change is material, we
                will use reasonable efforts to notify account holders by
                email.
              </p>
            </div>

            {/* 19 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                19. Severability
              </h2>
              <p className="mt-3">
                If any provision of these Terms is held invalid, illegal, or
                unenforceable by a court or arbitrator of competent
                jurisdiction, that provision will be modified to the minimum
                extent necessary or, if it cannot be modified, severed. The
                remaining provisions will continue in full force and effect.
              </p>
            </div>

            {/* 20 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                20. Entire Agreement
              </h2>
              <p className="mt-3">
                These Terms, together with our{' '}
                <Link
                  href="/privacy/"
                  className="text-brand-emerald underline hover:no-underline"
                >
                  Privacy Policy
                </Link>{' '}
                and any signed service agreements (such as a leasing
                representation agreement, listing agreement, or institutional
                engagement letter), constitute the entire agreement between
                you and MoveSmart Rentals concerning your use of the Site and
                our services. They supersede any prior or contemporaneous
                communications on the same subject matter.
              </p>
            </div>

            {/* 21 */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">
                21. Contact
              </h2>
              <p className="mt-3">
                Questions about these Terms can be sent to our legal team:
              </p>
              <ul className="mt-2 list-none space-y-1 pl-0">
                <li>
                  <strong>Legal:</strong>{' '}
                  <a
                    href="mailto:legal@movesmartrentals.com"
                    className="text-brand-emerald underline hover:no-underline"
                  >
                    legal@movesmartrentals.com
                  </a>
                </li>
                <li>
                  <strong>General:</strong>{' '}
                  <a
                    href="mailto:contact@movesmartrentals.com"
                    className="text-brand-emerald underline hover:no-underline"
                  >
                    contact@movesmartrentals.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{' '}
                  <a
                    href="tel:+14165551234"
                    className="text-brand-emerald underline hover:no-underline"
                  >
                    +1 (416) 555-1234
                  </a>
                </li>
                <li>
                  <strong>Mailing address:</strong> MoveSmart Rentals, c/o
                  Valery Real Estate Inc., Brokerage, Toronto, Ontario, Canada
                </li>
              </ul>
              <p className="mt-4">
                For non-legal inquiries, visit our{' '}
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
