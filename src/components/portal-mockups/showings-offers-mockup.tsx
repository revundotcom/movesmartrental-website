import { Calendar } from 'lucide-react'

const SHOWING_TABS = ['All', 'Scheduled', 'Completed', 'Cancelled']
const OFFER_TABS = ['All', 'Pending', 'Approved', 'Declined']

const SHOWINGS = [
  {
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-emerald-700',
    date: 'May 14, 2026',
    moveIn: 'June 01, 2026',
    address: '29-86 Chandler Drive, Toronto, ON',
    ref: 'REF #SH-4821',
    gradient: 'from-brand-navy via-slate-700 to-slate-500',
  },
  {
    status: 'Scheduled',
    statusColor: 'bg-sky-100 text-sky-700',
    date: 'May 28, 2026',
    moveIn: 'July 01, 2026',
    address: '50 Stone Road East, Guelph, ON',
    ref: 'REF #SH-4847',
    gradient: 'from-slate-700 via-slate-600 to-slate-400',
  },
]

const OFFERS = [
  {
    status: 'Countered',
    statusColor: 'bg-orange-100 text-orange-700',
    date: 'May 01, 2026',
    moveIn: 'June 15, 2026',
    address: '30-86 Chandler Drive, Toronto, ON',
    amount: '$2,650 / month',
    gradient: 'from-brand-emerald via-emerald-700 to-slate-600',
  },
  {
    status: 'Declined',
    statusColor: 'bg-rose-100 text-rose-700',
    date: 'May 05, 2026',
    moveIn: 'June 30, 2026',
    address: '28-86 Chandler Drive, Toronto, ON',
    amount: '$2,400 / month',
    gradient: 'from-slate-700 via-slate-600 to-slate-400',
  },
]

function Card({
  item,
  amountLabel,
}: {
  item: (typeof SHOWINGS)[number] | (typeof OFFERS)[number]
  amountLabel: string
}) {
  const value = 'ref' in item ? item.ref : item.amount
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div
        className={`relative h-24 bg-gradient-to-br ${item.gradient}`}
        aria-hidden="true"
      >
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.statusColor}`}
        >
          {item.status}
        </span>
        <span className="absolute right-2 top-2 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
          {item.date}
        </span>
      </div>
      <div className="p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Move-in Date
        </p>
        <p className="text-xs font-semibold text-brand-navy">{item.moveIn}</p>
        <p className="mt-2 truncate text-sm font-semibold text-brand-navy">
          {item.address}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[11px] font-mono text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-slate-400">
              {amountLabel}:
            </span>{' '}
            {value}
          </p>
          <button
            type="button"
            className="rounded-md bg-brand-navy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

function Column({
  title,
  count,
  tabs,
  items,
  amountLabel,
}: {
  title: string
  count: number
  tabs: string[]
  items: typeof SHOWINGS | typeof OFFERS
  amountLabel: string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-lg font-medium text-brand-navy">
            {title}
          </h3>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {count} Total
          </span>
        </div>
        <Calendar className="size-3.5 text-slate-400" aria-hidden="true" />
      </div>

      {/* Tabs */}
      <div className="mt-2 flex gap-1 overflow-x-auto border-b border-slate-200">
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            className={`whitespace-nowrap border-b-2 px-2 pb-1.5 text-[11px] font-semibold ${
              i === 0
                ? 'border-brand-emerald text-brand-emerald'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {items.map((it, i) => (
          <Card key={i} item={it} amountLabel={amountLabel} />
        ))}
      </div>
    </div>
  )
}

export function ShowingsOffersMockup() {
  return (
    <div className="min-h-[520px] w-full bg-slate-50 p-4 text-slate-800 sm:p-6">
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Leasing Activity
        </p>
        <h3 className="font-display text-xl font-medium text-brand-navy sm:text-2xl">
          Showings &amp; Offers
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <Column
          title="Showings"
          count={7}
          tabs={SHOWING_TABS}
          items={SHOWINGS}
          amountLabel="REF"
        />
        <Column
          title="Offers"
          count={4}
          tabs={OFFER_TABS}
          items={OFFERS}
          amountLabel="Offer"
        />
      </div>
    </div>
  )
}
