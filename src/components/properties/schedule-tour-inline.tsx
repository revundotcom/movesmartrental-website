'use client'

import React, { useState, useMemo } from 'react'
import { ScheduleTourModal } from './schedule-tour-modal'
import { useShowingSlots } from './use-showing-slots'

export function ScheduleTourInline({
  unitId,
}: {
  unitId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')

  const { dynamicDates, allSlots, isLoading } = useShowingSlots(unitId);

  // Compute next 5 working days (excluding today, Sat, Sun) as fallback
  const fallbackDates = useMemo(() => {
    const dates = []
    let current = new Date()
    current.setHours(12, 0, 0, 0)
    let added = 0
    while (added < 5) {
      current.setDate(current.getDate() + 1)
      const day = current.getDay()
      if (day !== 0 && day !== 6) { // Not Sunday and Not Saturday
        const yyyy = current.getFullYear()
        const mm = String(current.getMonth() + 1).padStart(2, '0')
        const dd = String(current.getDate()).padStart(2, '0')
        const dateKey = `${yyyy}-${mm}-${dd}`
        
        const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).formatToParts(current);
        const dayName = formatter.find(p => p.type === 'weekday')?.value.toUpperCase() || '';
        const dayNum = formatter.find(p => p.type === 'day')?.value || '';
        const month = formatter.find(p => p.type === 'month')?.value || '';
        
        dates.push({
          date: dateKey,
          dayName,
          dayNum,
          month
        })
        added++
      }
    }
    return dates
  }, [])

  const isFallback = dynamicDates.length === 0 && !isLoading;
  const displayDates = dynamicDates.length > 0 ? dynamicDates : fallbackDates;
  const headingText = isFallback ? "Request a Tour" : "Schedule a Tour";

  const handleDateClick = (dateValue: string) => {
    setSelectedDate(dateValue)
    setIsOpen(true)
  }

  return (
    <div className="w-full">
      <h2 className="font-display text-2xl text-[#0B1D3A] mb-4">
        {headingText}
      </h2>

      {isLoading ? (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-2 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-shrink-0 w-16 h-20 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-3 snap-x hide-scrollbar mb-2">
          {displayDates.map((d) => (
            <button
              key={d.date}
              onClick={() => handleDateClick(d.date)}
              className="snap-start flex-[1_0_4rem] flex flex-col items-center justify-center h-20 border border-slate-200 rounded-xl transition-all duration-200 hover:border-[#0f2540]/50 hover:bg-slate-50 bg-white"
            >
              <span className="text-[10px] font-bold tracking-wider text-slate-500">
                {d.dayName}
              </span>
              <span className="text-xl font-bold my-0.5 text-slate-800">
                {d.dayNum}
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                {d.month}
              </span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <ScheduleTourModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          unitId={unitId}
          initialSelectedDate={selectedDate || displayDates[0].date}
          prefetchedDates={displayDates}
          prefetchedSlots={allSlots || undefined}
        />
      )}
    </div>
  )
}
