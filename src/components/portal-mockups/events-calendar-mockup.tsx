import { MapPin, Clock, Calendar as CalendarIcon, Map } from 'lucide-react'

const EVENTS = [
  {
    title: 'Install Lockbox',
    address: '29-86 Chandler Drive, Toronto',
    date: 'May 18, 2026',
    time: '11:00 AM - 11:20 AM',
    color: 'bg-brand-emerald',
  },
  {
    title: 'Professional Photos/Assessment',
    address: '30-86 Chandler Drive, Toronto',
    date: 'May 19, 2026',
    time: '2:40 PM - 4:00 PM',
    color: 'bg-sky-500',
  },
  {
    title: 'Meet Owner for Key Collection',
    address: '50 Stone Road East, Guelph',
    date: 'May 21, 2026',
    time: '4:20 PM - 5:00 PM',
    color: 'bg-amber-500',
  },
  {
    title: 'Install Lockbox',
    address: '212 Front Street West, Toronto',
    date: 'May 22, 2026',
    time: '11:00 AM - 11:20 AM',
    color: 'bg-brand-emerald',
  },
  {
    title: 'Professional Photos/Assessment',
    address: '1101 Bay Street, Toronto',
    date: 'May 24, 2026',
    time: '2:40 PM - 4:00 PM',
    color: 'bg-sky-500',
  },
  {
    title: 'Meet Owner for Key Collection',
    address: '8 Royal Oak Drive, Oakville',
    date: 'May 27, 2026',
    time: '10:00 AM - 10:30 AM',
    color: 'bg-amber-500',
  },
]

// May 2026 starts on Friday (day 5)
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CALENDAR_EVENTS: Record<number, { time: string; title: string; color: string }[]> = {
  5: [{ time: '11:20a', title: 'Install Lockbox', color: 'bg-brand-emerald' }],
  8: [
    { time: '2:40p', title: 'Photos/Assessm…', color: 'bg-sky-500' },
  ],
  12: [{ time: '4:20p', title: 'Key Collection', color: 'bg-amber-500' }],
  18: [{ time: '11:20a', title: 'Install Lockbox', color: 'bg-brand-emerald' }],
  19: [{ time: '2:40p', title: 'Photos/Assessm…', color: 'bg-sky-500' }],
  21: [{ time: '4:20p', title: 'Key Collection', color: 'bg-amber-500' }],
  22: [{ time: '11:20a', title: 'Install Lockbox', color: 'bg-brand-emerald' }],
  24: [{ time: '2:40p', title: 'Photos', color: 'bg-sky-500' }],
  27: [{ time: '10:00a', title: 'Key Collection', color: 'bg-amber-500' }],
}

export function EventsCalendarMockup() {
  // Build 5 weeks of May 2026 (May 1, 2026 = Friday)
  // Grid: 35 cells. Day 1 sits at position 5 (Fri).
  const startOffset = 5
  const cells = Array.from({ length: 35 }, (_, i) => {
    const dayNum = i - startOffset + 1
    return dayNum >= 1 && dayNum <= 31 ? dayNum : null
  })

  return (
    <div className="min-h-[520px] w-full bg-slate-50 p-4 text-slate-800 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Schedule
          </p>
          <h3 className="font-display text-xl font-medium text-brand-navy sm:text-2xl">
            Events
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* M/W/D toggle */}
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
            {['Month', 'Week', 'Day'].map((v, i) => (
              <button
                key={v}
                type="button"
                className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                  i === 0
                    ? 'bg-brand-navy text-white'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {/* Calendar / Map view */}
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-brand-navy px-2 py-1 text-[10px] font-semibold text-white"
            >
              <CalendarIcon className="size-3" aria-hidden="true" /> Calendar View
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-slate-500"
            >
              <Map className="size-3" aria-hidden="true" /> Map View
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* My Events list */}
        <div className="lg:col-span-2">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            My Events
          </p>
          <div className="space-y-2">
            {EVENTS.map((e, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-brand-navy">
                    {e.title}
                  </p>
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                    Scheduled
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="size-3" aria-hidden="true" /> {e.address}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="size-3" aria-hidden="true" /> {e.date} ·{' '}
                  {e.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-base font-medium text-brand-navy">
              May 2026
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                className="flex size-6 items-center justify-center rounded border border-slate-200 bg-white text-xs text-slate-500"
              >
                ‹
              </button>
              <button
                type="button"
                className="flex size-6 items-center justify-center rounded border border-slate-200 bg-white text-xs text-slate-500"
              >
                ›
              </button>
            </div>
          </div>
          <div className="mt-2 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="px-1 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Cells */}
            <div className="grid grid-cols-7">
              {cells.map((c, i) => (
                <div
                  key={i}
                  className={`min-h-[60px] border-b border-r border-slate-100 p-1 ${
                    c ? '' : 'bg-slate-50/50'
                  }`}
                >
                  {c && (
                    <>
                      <p className="text-[10px] font-semibold text-slate-500">
                        {c}
                      </p>
                      {CALENDAR_EVENTS[c]?.map((ev, ei) => (
                        <div
                          key={ei}
                          className={`mt-0.5 truncate rounded px-1 py-0.5 text-[8px] font-semibold text-white ${ev.color}`}
                          title={`${ev.time} ${ev.title}`}
                        >
                          {ev.time} {ev.title}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
