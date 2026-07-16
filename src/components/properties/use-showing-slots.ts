import { useState, useEffect } from 'react';

export interface SlotData {
  time: string;
  agent_id: number;
}

export interface ShowingDate {
  date: string;
  dayName: string;
  dayNum: string;
  month: string;
}

export function useShowingSlots(unitId: string, fetchCondition: boolean = true, initialDates?: ShowingDate[], initialSlots?: Record<string, any>) {
  const [dynamicDates, setDynamicDates] = useState<ShowingDate[]>(initialDates || []);
  const [allSlots, setAllSlots] = useState<Record<string, any> | null>(initialSlots || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialDates || !initialSlots);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // If we already have initial data and it's not a refresh, don't fetch
    if (initialDates && initialSlots && refreshKey === 0) {
       setDynamicDates(initialDates);
       setAllSlots(initialSlots);
       setIsLoading(false);
       return;
    }

    if (!fetchCondition || !unitId) return;

    let isMounted = true;
    setIsLoading(true);

    const fetchSlots = async () => {
      try {
        const res = await fetch(`https://portal.revun.com/api/v1/showing/slots/${unitId}`);
        if (!res.ok) throw new Error('Failed to fetch slots');
        const json = await res.json();
        
        if (isMounted) {
          setAllSlots(json);

          const availableDates: ShowingDate[] = [];
          if (json && typeof json === 'object' && !Array.isArray(json) && !json.data) {
            for (const dateKey of Object.keys(json)) {
              const dateData = json[dateKey];
              if (dateData && Array.isArray(dateData.slots) && dateData.slots.length > 0) {
                 const [yyyy, mm, dd] = dateKey.split('-');
                 const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd), 12, 0, 0); 
                 
                 const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).formatToParts(d);
                 const dayName = formatter.find(p => p.type === 'weekday')?.value.toUpperCase() || '';
                 const dayNum = formatter.find(p => p.type === 'day')?.value || '';
                 const month = formatter.find(p => p.type === 'month')?.value || '';
                 
                 availableDates.push({
                   date: dateKey,
                   dayName,
                   dayNum,
                   month
                 });
              }
            }
          }
          
          // Sort dates just in case API returns them out of order
          availableDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          setDynamicDates(availableDates);
        }
      } catch (err) {
        console.error('Failed to fetch slots:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    fetchSlots();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId, fetchCondition, refreshKey]);

  const getSlotsForDate = (date: string): SlotData[] => {
    if (!allSlots || !date) return [];
    
    let slots: SlotData[] = [];
    const json = allSlots;
    if (json && typeof json === 'object' && !Array.isArray(json) && !json.data) {
       const dateData = json[date];
       if (dateData && Array.isArray(dateData.slots)) {
          slots = dateData.slots.map((s: Record<string, any>) => ({
             time: s.time || s.showing_time || s.raw_time || '',
             agent_id: (s.agents && s.agents.length > 0) ? s.agents[0] : (s.agent_id || 0)
          }));
       }
    }
    return slots;
  };

  const refreshSlots = () => {
    setRefreshKey(prev => prev + 1);
  };

  return { dynamicDates, allSlots, isLoading, getSlotsForDate, refreshSlots };
}
