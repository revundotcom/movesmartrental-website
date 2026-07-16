'use client'

import React, { useState } from 'react'
import { ScheduleTourModal } from './schedule-tour-modal'
import { cn } from '@/lib/utils'

import { useShowingSlots } from './use-showing-slots'

export function ScheduleTourInline({
  unitId,
}: {
  unitId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')
  
  const { dynamicDates, allSlots, isLoading } = useShowingSlots(unitId);

  const handleDateClick = (dateValue: string) => {
    setSelectedDate(dateValue)
    setIsOpen(true)
  }

  return (
    <div className="w-full">
      <h2 className="font-display text-2xl text-[#0B1D3A] mb-4">
        Request a Tour
      </h2>
      
      {isLoading ? (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-2 animate-pulse">
          {[1,2,3,4].map(i => (
             <div key={i} className="flex-shrink-0 w-16 h-20 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
      ) : dynamicDates.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto pb-3 snap-x hide-scrollbar mb-2">
          {dynamicDates.map((d) => (
            <button
              key={d.date}
              onClick={() => handleDateClick(d.date)}
              className="snap-start flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 border border-slate-200 rounded-xl transition-all duration-200 hover:border-[#0f2540]/50 hover:bg-slate-50 bg-white"
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
      ) : (
        <div className="p-4 border border-dashed border-slate-300 rounded-xl text-center bg-slate-50 mb-4">
          <span className="text-slate-500 text-sm font-medium">No available showing dates at this time.</span>
        </div>
      )}

      {isOpen && (
        <ScheduleTourModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          unitId={unitId}
          initialSelectedDate={selectedDate || (dynamicDates.length > 0 ? dynamicDates[0].date : '')}
          prefetchedDates={dynamicDates}
          prefetchedSlots={allSlots}
        />
      )}
    </div>
  )
}
