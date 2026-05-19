import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'

export const metadata: Metadata = {
  title: 'Privacy Policy | MoveSmart Rentals',
  description:
    'How MoveSmart Rentals collects, uses, shares, and protects personal information across our Canadian leasing brokerage operations and US service areas.',
  alternates: {
    canonical: '/privacy/',
  },
  robots: {
    index: false,
    follow: true,
  },
}

const LAST_UPDATED = 'May 18, 2026'

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

      <PageHeroBlock
        kicker="Trust & Transparency"
        eyebrow="Privacy Policy"
        headline="Your data, handled with care"
        lede={`We process personal, financial, and identification information so we can lease your home, place qualified tenants, and collect rent. This page explains exactly what we hold, why we hold it, and the rights you have over it.`}
        meta={[
          { label: 'Last updated', value: LAST_UPDATED },
          { label: 'Regulator', value: 'OPC Canada' },
          { label: 'Brokerage', value: 'Valerie Real Estate' },
          { label: 'Privacy officer', value: 'On staff' },
        ]}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="Secure data infrastructure protecting tenant and landlord information"
      />

      {/* Content */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <article className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-h2:mt-12 prose-h2:text-3xl prose-h2:font-semibold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-semibold prose-h3:text-brand-navy prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-brand-navy prose-a:text-brand-emerald hover:prose-a:no-underline">
            {/* 1. Introduction */}
            <h2 id="introduction">1. Introduction</h2>
            <p>
              MoveSmart Rentals (&quot;<strong>MoveSmart</strong>,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) is a full-service residential leasing
              brokerage operating across Canada and in select United States markets.
              In Canada, all real estate trades are conducted through our licensed
              brokerage partner, <strong>Valerie Real Estate Inc., Brokerage</strong>,
              which is registered under the Real Estate Council of Ontario (RECO) and
              the equivalent provincial regulators where we operate.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, retain, and
              protect personal information when you visit{' '}
              <a href="https://movesmartrentals.com">movesmartrentals.com</a>, complete
              a rental application, list a property with us, or otherwise interact
              with our services. It is written for the people who actually use
              MoveSmart, so we have skipped most of the legalese.
            </p>
            <p>
              <strong>Last updated:</strong> {LAST_UPDATED}.
            </p>
            <p>
              Our Privacy Officer is responsible for our compliance with the federal
              Personal Information Protection and Electronic Documents Act (PIPEDA)
              and provincial privacy statutes. You can reach the Privacy Officer at{' '}
              <a href="mailto:privacy@movesmartrentals.com">privacy@movesmartrentals.com</a>{' '}
              or by mail at the address in Section 12.
            </p>

            {/* 2. Information We Collect */}
            <h2 id="information-we-collect">2. Information We Collect</h2>
            <p>
              The information we hold depends on whether you are a prospective tenant,
              a current tenant, a property owner, a vendor, or simply a visitor to our
              website. We try to collect only what we actually need to deliver the
              service you have asked for.
            </p>

            <h3>Personal identification</h3>
            <ul>
              <li>Full legal name, preferred name, and date of birth</li>
              <li>Email address, mobile and home phone numbers</li>
              <li>Current and previous home addresses</li>
              <li>Emergency contact details (where you provide them)</li>
            </ul>

            <h3>Government-issued identification</h3>
            <p>
              For tenant qualification, anti-money-laundering checks under FINTRAC
              rules, and identity verification required by RECO, we may collect a
              clear copy of a government-issued photo ID such as a driver&apos;s
              licence, provincial ID card, or passport. ID images are stored
              encrypted and access is restricted to authorized staff.
            </p>

            <h3>Financial information</h3>
            <ul>
              <li>Credit history and credit score (pulled via Equifax or TransUnion with your consent)</li>
              <li>Employment status, employer name, position, and length of employment</li>
              <li>Self-reported and verified income, including pay stubs, T4s, or notices of assessment</li>
              <li>Banking details (institution, transit, account number) for pre-authorized rent payments and owner disbursements</li>
              <li>Co-signer or guarantor information when applicable</li>
            </ul>

            <h3>Property information (owners and landlords)</h3>
            <ul>
              <li>Property address, legal description, and ownership documents</li>
              <li>Mortgage or condo corporation details where relevant to lease terms</li>
              <li>Photos, floor plans, and feature lists used to market the unit</li>
              <li>Insurance policy details required for tenancy</li>
            </ul>

            <h3>Application and tenancy history</h3>
            <p>
              We retain your full rental application, references from previous
              landlords, lease agreements, addenda, move-in and move-out inspection
              reports, maintenance requests, payment history, and any communications
              relating to your tenancy.
            </p>

            <h3>Communication records</h3>
            <p>
              We may record incoming and outgoing phone calls, retain email and SMS
              threads, and log messages sent through our owner and tenant portals.
              Calls are recorded for quality assurance, training, dispute resolution,
              and compliance with provincial real estate regulations. You will hear a
              notification at the start of any recorded call.
            </p>

            <h3>Cookies and technical data</h3>
            <p>
              When you visit our website we automatically collect IP address, browser
              type and version, device type and operating system, referring URL, the
              pages you view, and timestamps. See Section 8 for cookie details.
            </p>

            {/* 3. How We Use Your Information */}
            <h2 id="how-we-use">3. How We Use Your Information</h2>
            <p>
              We only use personal information for the purposes we have told you about
              or that are reasonably obvious from the context in which you provided it.
              Specifically:
            </p>
            <ul>
              <li>
                <strong>Tenant qualification and screening.</strong> Verifying
                identity, running credit checks, confirming income and employment,
                contacting previous landlords, and assessing applications against the
                owner&apos;s tenant criteria.
              </li>
              <li>
                <strong>Lease execution and rent collection.</strong> Drafting and
                signing the residential tenancy agreement, setting up
                pre-authorized debits, processing monthly rent, issuing receipts,
                and disbursing funds to property owners.
              </li>
              <li>
                <strong>Marketing your property.</strong> Listing eligible
                properties on the Multiple Listing Service (MLS), Realtor.ca, and
                more than twenty syndication platforms including Zillow, Kijiji,
                Facebook Marketplace, and other major rental portals.
              </li>
              <li>
                <strong>Communication and customer support.</strong> Responding to
                inquiries, scheduling showings, coordinating move-ins, sending
                statements, and handling maintenance requests.
              </li>
              <li>
                <strong>Legal and regulatory compliance.</strong> Meeting our
                obligations under RECO, the Real Estate and Business Brokers Act
                (REBBA), provincial Residential Tenancies Acts, FINTRAC
                anti-money-laundering rules, the federal and Ontario Human Rights
                Codes (fair-housing), and applicable US state laws where we operate.
              </li>
              <li>
                <strong>Service improvement and analytics.</strong> Understanding
                how our website is used, improving our application workflow,
                training staff, and reporting aggregate, de-identified results to
                owners.
              </li>
            </ul>

            {/* 4. Sharing With Third Parties */}
            <h2 id="sharing">4. Sharing With Third Parties</h2>
            <p>
              We never sell personal information. We share it only with the parties
              listed below, and only the minimum amount needed for the stated purpose.
            </p>

            <h3>Our brokerage of record</h3>
            <p>
              In Canada, all trades in real estate, lease executions, and trust
              account transactions flow through{' '}
              <strong>Valerie Real Estate Inc., Brokerage</strong>, our licensed
              brokerage partner. Valerie Real Estate accesses application and
              tenancy records as required by RECO and provincial regulations.
            </p>

            <h3>Credit reporting agencies</h3>
            <p>
              With your written consent, we request credit reports from{' '}
              <strong>Equifax Canada</strong> and <strong>TransUnion Canada</strong>{' '}
              (or the equivalent US agencies for cross-border applications). These
              agencies receive the personal identifiers needed to retrieve your file.
            </p>

            <h3>Background-check providers</h3>
            <p>
              We use vetted third-party screening vendors to verify identity, search
              public eviction records where lawful, and confirm employment. These
              vendors are contractually bound to PIPEDA-equivalent privacy standards.
            </p>

            <h3>Listing and syndication platforms</h3>
            <p>
              When marketing a property we publish address, photos, and feature data
              to MLS, Realtor.ca, Zillow, Kijiji, Facebook Marketplace, and other
              rental portals. Tenant personal information is never published on any
              listing.
            </p>

            <h3>Payment processors and financial partners</h3>
            <p>
              Pre-authorized debits, electronic funds transfers, and owner
              disbursements are handled by Canadian-regulated payment processors. They
              receive only the banking details and amounts required to complete each
              transaction.
            </p>

            <h3>Legal, regulatory, and law enforcement</h3>
            <p>
              We may disclose information when required by a court order, subpoena,
              search warrant, or written request from a regulator such as RECO,
              FINTRAC, the Landlord and Tenant Board, or an equivalent US authority.
            </p>

            <h3>Successor entities</h3>
            <p>
              If MoveSmart is involved in a merger, acquisition, financing, or sale of
              all or part of our business, personal information may be transferred to
              the successor entity, subject to the same protections set out in this
              policy.
            </p>

            {/* 5. Data Retention */}
            <h2 id="retention">5. Data Retention</h2>
            <p>
              We retain personal information only as long as we have a legitimate
              business or legal reason to hold it. Typical retention periods are:
            </p>
            <ul>
              <li>
                <strong>Financial records (rent payments, trust ledger entries,
                disbursements, T5s):</strong> minimum seven (7) years, in line with
                Canada Revenue Agency record-keeping rules.
              </li>
              <li>
                <strong>Tenancy records (applications, leases, inspection reports,
                correspondence):</strong> minimum six (6) years after the tenancy
                ends, or longer where a provincial Residential Tenancies Act
                requires it.
              </li>
              <li>
                <strong>Brokerage trade records (offers, deposits, identification
                copies):</strong> minimum six (6) years per RECO recordkeeping
                rules, or longer where required by FINTRAC.
              </li>
              <li>
                <strong>Unsuccessful applicant data:</strong> retained for up to
                twelve (12) months in case of complaint or re-application, then
                securely deleted.
              </li>
              <li>
                <strong>Marketing and website analytics:</strong> retained for up to
                twenty-six (26) months unless you opt out earlier.
              </li>
            </ul>
            <p>
              Once a retention period expires, records are either securely deleted or
              de-identified so they can no longer be linked to you.
            </p>

            {/* 6. Your Rights */}
            <h2 id="rights">6. Your Rights</h2>
            <p>
              You have meaningful control over the personal information we hold about
              you. To exercise any of these rights, email{' '}
              <a href="mailto:privacy@movesmartrentals.com">privacy@movesmartrentals.com</a>{' '}
              with enough detail to identify your file. We respond within thirty (30)
              days.
            </p>
            <ul>
              <li>
                <strong>Access.</strong> Request a copy of the personal information
                we hold about you, along with a description of how it is used and
                with whom it has been shared.
              </li>
              <li>
                <strong>Correction.</strong> Ask us to correct information that is
                inaccurate or incomplete. Where we cannot agree, we will note the
                disputed information in your file.
              </li>
              <li>
                <strong>Deletion.</strong> Ask us to delete information about you.
                We will comply unless we are required by law (for example, the
                seven-year financial records rule) to retain it.
              </li>
              <li>
                <strong>Withdrawal of consent.</strong> Withdraw your consent to
                certain uses, such as marketing emails or optional analytics. Some
                processing is required to deliver service - withdrawing consent for
                credit checks, for instance, would end an active application.
              </li>
              <li>
                <strong>Complaint.</strong> If you are not satisfied with our
                response, you may file a complaint with the{' '}
                <a
                  href="https://www.priv.gc.ca/en/report-a-concern/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office of the Privacy Commissioner of Canada
                </a>
                , the Information and Privacy Commissioner of Ontario, the Office of
                the Information and Privacy Commissioner for British Columbia, or the
                equivalent authority in your jurisdiction.
              </li>
            </ul>

            {/* 7. Security */}
            <h2 id="security">7. Security</h2>
            <p>
              We use technical, administrative, and physical safeguards designed to
              protect personal information against loss, theft, and unauthorized
              access, copying, use, modification, or disclosure.
            </p>
            <ul>
              <li>
                <strong>Encryption.</strong> All traffic to and from our website and
                portals is encrypted with TLS 1.2 or higher. Sensitive data,
                including ID images and banking details, is encrypted at rest.
              </li>
              <li>
                <strong>Access controls.</strong> Personal information is restricted
                to staff with a job-related need to know. We use role-based access
                control, multi-factor authentication, and detailed audit logs.
              </li>
              <li>
                <strong>Vendor management.</strong> Third parties handling personal
                information sign data-processing agreements obliging them to
                PIPEDA-equivalent standards.
              </li>
              <li>
                <strong>Employee training.</strong> All staff complete privacy and
                fair-housing training at hire and annually thereafter.
              </li>
              <li>
                <strong>Breach response.</strong> In the unlikely event of a
                privacy breach that poses a real risk of significant harm, we will
                notify affected individuals and report to the Office of the Privacy
                Commissioner of Canada as required by PIPEDA&apos;s mandatory breach
                reporting rules.
              </li>
            </ul>

            {/* 8. Cookies */}
            <h2 id="cookies">8. Cookies</h2>
            <p>
              Our website uses cookies and similar technologies to keep you signed in,
              remember preferences, and measure how the site performs. We group
              cookies into the following categories:
            </p>
            <ul>
              <li>
                <strong>Strictly necessary cookies.</strong> Required for the site
                to function - for example, session cookies that keep you signed
                in to the owner or tenant portal. These cannot be disabled.
              </li>
              <li>
                <strong>Analytics cookies.</strong> We use Google Analytics 4 to
                understand aggregate visitor behaviour. IP addresses are
                anonymized. You can opt out by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Analytics opt-out browser add-on
                </a>
                .
              </li>
              <li>
                <strong>Preference cookies.</strong> Remember settings such as your
                preferred city or display preferences.
              </li>
            </ul>
            <p>
              You can disable analytics and preference cookies through your browser
              settings or our cookie banner. Disabling strictly necessary cookies will
              break sign-in and portal functionality.
            </p>

            {/* 9. Cross-Border Transfers */}
            <h2 id="cross-border">9. Cross-Border Transfers</h2>
            <p>
              MoveSmart operates in Canada and in select United States markets. To
              support our US operations, certain personal information may be stored
              or processed by service providers located in the United States,
              including cloud hosting, email, and customer support platforms.
            </p>
            <p>
              When personal information is transferred outside of Canada, it may be
              accessible to courts, law enforcement, or national security authorities
              in the receiving jurisdiction. We comply with PIPEDA&apos;s
              cross-border transfer requirements by maintaining contractual
              safeguards with our service providers that are comparable to the
              protections you would have in Canada.
            </p>

            {/* 10. Children's Privacy */}
            <h2 id="children">10. Children&apos;s Privacy</h2>
            <p>
              Our services are intended for adults of legal age to enter into a
              residential tenancy agreement, generally eighteen (18) or older. We do
              not knowingly collect personal information from children. If you
              believe we have inadvertently collected information from a child,
              please contact the Privacy Officer and we will delete it promptly.
            </p>

            {/* 11. Changes */}
            <h2 id="changes">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes
              in our practices, services, or the law. The current version is always
              posted at this URL with the &quot;Last updated&quot; date at the top.
              If we make a material change that affects how we use information you
              have already provided, we will notify you by email or through your
              portal account before the change takes effect.
            </p>

            {/* 12. Contact */}
            <h2 id="contact">12. Contact</h2>
            <p>
              Questions, access requests, complaints, or anything else
              privacy-related should go to our Privacy Officer:
            </p>
            <ul className="list-none pl-0">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@movesmartrentals.com">
                  privacy@movesmartrentals.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href="tel:+18005959755">+1 800-595-9755</a>
              </li>
              <li>
                <strong>Mail:</strong> Privacy Officer, MoveSmart Rentals, 1 King St
                W, Suite 4801, Toronto, ON M5H 1A1, Canada
              </li>
            </ul>
            <p>
              For general inquiries about our services, visit our{' '}
              <Link href="/contact/">Contact page</Link>.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
