import { AnalyticsEvent } from '@/lib/analytics-events'

interface EventRow {
  /** The constant name exposed on AnalyticsEvent, e.g. ACCOUNT_CREATION_CLICK */
  constantName: keyof typeof AnalyticsEvent
  /** Human-readable description of when + why this event fires */
  description: string
  /** Component(s) that fire the event */
  firedBy: string[]
  /** Key payload fields forwarded to the dataLayer (beyond `event` + `timestamp`) */
  payload: string[]
}

const EVENT_ROWS: EventRow[] = [
  {
    constantName: 'ACCOUNT_CREATION_CLICK',
    description:
      'Fired when a visitor clicks a primary "Create account" / sign-up CTA anywhere on the site. Primary conversion signal for owner acquisition.',
    firedBy: ['cta-tracker.tsx'],
    payload: ['page', 'city?', 'service?', 'section?', 'cta_label?'],
  },
  {
    constantName: 'BOOK_A_CALL_CLICK',
    description:
      'Fired when a visitor clicks a "Book a call" / consultation CTA. Mid-funnel engagement signal captured across page heroes, banners, and contact blocks.',
    firedBy: ['cta-tracker.tsx'],
    payload: ['page', 'city?', 'service?', 'section?', 'cta_label?'],
  },
  {
    constantName: 'CONTACT_FORM_SUBMIT',
    description:
      'Fired on successful POST of the multi-step contact form. Tagged with inquiry type (owner / tenant / franchise / other).',
    firedBy: ['contact-form.tsx'],
    payload: ['form_type', 'page', 'inquiry_type'],
  },
  {
    constantName: 'SCROLL_DEPTH',
    description:
      'Fires at 25 / 50 / 75 / 100 percent milestones, each at most once per page load. Mounted globally in the root layout.',
    firedBy: ['scroll-depth-tracker.tsx'],
    payload: ['page', 'depth_pct', 'milestone'],
  },
  {
    constantName: 'OUTBOUND_PARTNER_CLICK',
    description:
      'Delegated click handler fires when a visitor clicks an external link to a non-movesmartrentals.com host. Used for partner / portal attribution.',
    firedBy: ['link-tracker.tsx'],
    payload: ['href', 'partner_domain', 'partner_name?', 'page'],
  },
  {
    constantName: 'PHONE_CLICK',
    description:
      'Fires on any click of a tel: link. Captures header phone, sticky CTA, and inline contact blocks without per-component wiring.',
    firedBy: ['link-tracker.tsx'],
    payload: ['phone_number', 'page', 'section?'],
  },
  {
    constantName: 'EMAIL_CLICK',
    description:
      'Fires on any click of a mailto: link. Covers footer, about page, and any inline contact anchors.',
    firedBy: ['link-tracker.tsx'],
    payload: ['email_address', 'page', 'section?'],
  },
  {
    constantName: 'CITY_TO_SERVICE_CTR',
    description:
      'Fires when a visitor on a city landing page clicks through to a service page. Measures local SEO → service page CTR per the contract §17.5 custom funnel.',
    firedBy: ['link-tracker.tsx'],
    payload: ['source_city', 'source_province', 'target_service', 'page'],
  },
  {
    constantName: 'SERVICE_TO_ACCOUNT_CONVERSION',
    description:
      'Derived funnel event: auto-emitted alongside ACCOUNT_CREATION_CLICK whenever the click originates on a service page. Ties service intent to owner sign-ups.',
    firedBy: ['cta-tracker.tsx (via trackCTA auto-emit)'],
    payload: ['page', 'service?', 'city?'],
  },
]

// Defensive: surface at build time if analytics-events.ts adds or removes an
// event so the reference table cannot silently drift from the source of truth.
const REGISTERED_EVENTS = Object.keys(AnalyticsEvent) as Array<
  keyof typeof AnalyticsEvent
>
const DOCUMENTED_EVENTS = new Set(EVENT_ROWS.map((r) => r.constantName))
const MISSING_DOCS = REGISTERED_EVENTS.filter((e) => !DOCUMENTED_EVENTS.has(e))

export function TrackedEventsTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-brand-navy/10">
      {MISSING_DOCS.length > 0 && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          <strong className="font-semibold">Docs out of sync:</strong>{' '}
          {MISSING_DOCS.join(', ')} registered in{' '}
          <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-[11px]">
            src/lib/analytics-events.ts
          </code>{' '}
          but not documented in this reference table.
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-brand-navy/10 bg-[#FBFAF6]">
              <th
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/70"
              >
                Event constant
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/70"
              >
                dataLayer string
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/70"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/70"
              >
                Payload shape
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/70"
              >
                Fired by
              </th>
            </tr>
          </thead>
          <tbody>
            {EVENT_ROWS.map((row, i) => {
              const dataLayerString = AnalyticsEvent[row.constantName]
              return (
                <tr
                  key={row.constantName}
                  className={
                    i % 2 === 0
                      ? 'bg-white transition-colors hover:bg-emerald-50/40'
                      : 'bg-[#FBFAF6]/50 transition-colors hover:bg-emerald-50/40'
                  }
                >
                  <td className="px-4 py-4 align-top">
                    <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 font-mono text-[12px] font-semibold text-brand-navy">
                      {row.constantName}
                    </code>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <code className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[12px] text-emerald-700">
                      {dataLayerString}
                    </code>
                  </td>
                  <td className="max-w-[22rem] px-4 py-4 align-top text-[13px] leading-relaxed text-slate-600">
                    {row.description}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <ul className="space-y-1">
                      {row.payload.map((field) => (
                        <li
                          key={field}
                          className="font-mono text-[11px] text-brand-navy/75"
                        >
                          {field}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <ul className="space-y-1">
                      {row.firedBy.map((comp) => (
                        <li
                          key={comp}
                          className="font-mono text-[11px] text-slate-600"
                        >
                          {comp}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
