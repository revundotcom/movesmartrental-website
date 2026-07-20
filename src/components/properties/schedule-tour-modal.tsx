import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber, type Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useShowingSlots, type SlotData, type ShowingDate } from './use-showing-slots';

interface ScheduleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: string;
  initialSelectedDate?: string;
  prefetchedDates?: ShowingDate[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefetchedSlots?: Record<string, any>;
}

export function ScheduleTourModal({
  isOpen,
  onClose,
  unitId,
  initialSelectedDate,
  prefetchedDates,
  prefetchedSlots
}: ScheduleTourModalProps) {
  const { dynamicDates, isLoading: isLoadingSlots, getSlotsForDate, refreshSlots } = useShowingSlots(unitId, isOpen, prefetchedDates, prefetchedSlots);

  // Fallback dates in case API returns empty
  const fallbackDates = useMemo(() => {
    const dates = []
    const current = new Date()
    current.setHours(12, 0, 0, 0)
    let added = 0
    while (added < 5) {
      current.setDate(current.getDate() + 1)
      const day = current.getDay()
      if (day !== 0 && day !== 6) {
        const yyyy = current.getFullYear()
        const mm = String(current.getMonth() + 1).padStart(2, '0')
        const dd = String(current.getDate()).padStart(2, '0')
        const dateKey = `${yyyy}-${mm}-${dd}`

        const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).formatToParts(current);
        const dayName = formatter.find(p => p.type === 'weekday')?.value.toUpperCase() || '';
        const dayNum = formatter.find(p => p.type === 'day')?.value || '';
        const month = formatter.find(p => p.type === 'month')?.value || '';

        dates.push({ date: dateKey, dayName, dayNum, month })
        added++
      }
    }
    return dates
  }, [])

  const displayDates = dynamicDates.length > 0 ? dynamicDates : fallbackDates;

  const [fakeLoading, setFakeLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(initialSelectedDate || '');
  const [selectedSlot, setSelectedSlot] = useState<SlotData | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SlotData[]>([]);
  const [customTime, setCustomTime] = useState<string>('');

  // Update selectedDate if initialSelectedDate changes or displayDates load
  useEffect(() => {
    if (initialSelectedDate && !selectedDate) {
      setSelectedDate(initialSelectedDate);
    } else if (!selectedDate && displayDates.length > 0) {
      setSelectedDate(displayDates[0].date);
    }
  }, [initialSelectedDate, displayDates, selectedDate]);

  const [phone, setPhone] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('CA');
  const [expectedMoveIn, setExpectedMoveIn] = useState<Date | null>(() => {
    const today = new Date();
    if (today.getDate() === 1) {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    return new Date(today.getFullYear(), today.getMonth() + 1, 1);
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Drag to scroll refs and state
  const dateScrollRef = useRef<HTMLDivElement>(null);
  const slotsScrollRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };
  const handleMouseLeave = () => { isDragging.current = false; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  // Native wheel event to allow horizontal scrolling with mouse wheel 
  // and prevent vertical page scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).scrollLeft += e.deltaY;
      }
    };

    const dateEl = dateScrollRef.current;
    const slotsEl = slotsScrollRef.current;

    if (dateEl) dateEl.addEventListener('wheel', handleWheel, { passive: false });
    if (slotsEl) slotsEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (dateEl) dateEl.removeEventListener('wheel', handleWheel);
      if (slotsEl) slotsEl.removeEventListener('wheel', handleWheel);
    };
  }, [availableSlots, isOpen, fakeLoading, isLoadingSlots]);

  // Fetch Country Code
  useEffect(() => {
    setMounted(true);
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setCountryCode(data.country_code);
        }
      })
      .catch(() => { });
  }, []);

  // Extract slots for selected date
  useEffect(() => {
    if (!isOpen || !selectedDate) {
      setAvailableSlots([]);
      setFakeLoading(false);
      return;
    }

    const slots = getSlotsForDate(selectedDate);
    setAvailableSlots(slots);

    if (slots.length === 0 && !isLoadingSlots) {
      setFakeLoading(true);
      const timer = setTimeout(() => setFakeLoading(false), 600 + Math.random() * 400);
      return () => clearTimeout(timer);
    } else {
      setFakeLoading(false);
    }

    // Try to keep same time selected if available in new date
    setSelectedSlot(prev => {
      if (!prev) return null;
      const stillAvailable = slots.find(s => s.time === prev.time);
      return stillAvailable || null;
    });
  }, [selectedDate, isOpen, getSlotsForDate, isLoadingSlots]);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Fallback for iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    const timeToSubmit = availableSlots.length > 0 ? selectedSlot?.time : customTime;
    const agentToSubmit = availableSlots.length > 0 ? selectedSlot?.agent_id : 0;

    if (!timeToSubmit) return;

    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      move_in_date: expectedMoveIn ? expectedMoveIn.toISOString().split('T')[0] : '',
      showing_date: selectedDate,
      showing_time: timeToSubmit,
      unit_id: unitId,
      ...(availableSlots.length > 0 && { agent_id: agentToSubmit }) // Only include agent_id for real slots
    };

    const apiUrl = availableSlots.length === 0
      ? 'https://portal.revun.com/api/v1/showing/submit-lead'
      : 'https://portal.revun.com/api/v1/showing/store';

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          refreshSlots();
        }
        throw new Error(data.message || data.error || 'Something went wrong while booking the tour.');
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      const error = err as Error;
      setSubmitError(error.message || 'Failed to submit the request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;
  if (!isOpen) return null;

  const hasTimeSelected = availableSlots.length > 0 ? !!selectedSlot : !!customTime;
  const isFormValid = selectedDate && hasTimeSelected && firstName && lastName && email && phone && isValidPhoneNumber(phone) && expectedMoveIn;

  const isFallback = !isLoadingSlots && availableSlots.length === 0;
  const titleText = isFallback ? "Request a Tour" : "Schedule a Tour";
  const successTitleText = isFallback ? "Tour Requested Successfully!" : "Tour Scheduled Successfully!";
  const submitText = isFallback ? "Request Tour" : "Schedule Tour";

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center bg-black/60 sm:backdrop-blur-sm p-0 sm:p-6">
      <style dangerouslySetInnerHTML={{
        __html: `
          .PhoneInput { display: flex; align-items: center; }
          .PhoneInputInput { flex: 1; border: none; background: transparent; outline: none; padding: 0.5rem; font-size: 16px; }
          .PhoneInputCountry { display: flex; align-items: center; margin-right: 0.5rem; }
          .PhoneInputCountryIcon { width: 1.5rem; height: 1rem; }
          .PhoneInputCountryIcon--square { width: 1rem; }
          .PhoneInputCountryIcon--border { border: 1px solid rgba(0,0,0,0.2); box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
          .PhoneInputCountryIconImg { display: block; width: 100%; height: 100%; }
          input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
          input[type=number] { -moz-appearance: textfield; }
          .react-datepicker-wrapper { width: 100%; }
          .react-datepicker__input-container input { width: 100%; padding: 0.5rem 0.75rem; border-radius: 0.5rem; border: 1px solid #e2e8f0; font-size: 16px; color: #334155; outline: none; transition: all 0.2s; }
          .react-datepicker__input-container input:focus { border-color: #0f2540; box-shadow: 0 0 0 1px #0f2540; }
          .react-datepicker { font-family: inherit; border-color: #e2e8f0; border-radius: 0.75rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
          .react-datepicker__header { background-color: #f8fafc; border-bottom-color: #e2e8f0; border-top-left-radius: 0.75rem !important; border-top-right-radius: 0.75rem !important; }
        `
      }} />

      <div className="w-full h-[100dvh] sm:h-auto max-w-2xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:max-h-[90vh] transition-all">
        {/* Header */}
        <div className="bg-[#10B981] px-5 py-4 text-white flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold">{titleText}</h2>
            {!submitSuccess && (
              <p className="text-blue-100 text-xs mt-1">Select a date and time to book your unit tour.</p>
            )}
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center flex-1">
            <CheckCircle2 className="w-16 h-16 text-[#10B981] mb-4" />
            <h3 className="text-2xl font-bold text-[#0B1D3A]">{successTitleText}</h3>
            <p className="text-slate-600 mt-2 max-w-md">
              Thank you for requesting a tour. We have received your request for <span className="font-semibold">{selectedDate}</span> at <span className="font-semibold">{availableSlots.length > 0 ? selectedSlot?.time : customTime}</span>. {isFallback ? 'We will contact you shortly.' : 'You will receive a confirmation shortly.'}
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-[#10B981] text-white font-semibold rounded-lg shadow-md hover:bg-[#059669] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
              {/* Step 1: Date & Time Selection */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-slate-800 mb-3">
                  Choose Date & Time
                </h3>

                <div className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-2">Showing Date <span className="text-red-500">*</span></label>
                    <div
                      ref={dateScrollRef}
                      onMouseDown={(e) => handleMouseDown(e, dateScrollRef)}
                      onMouseLeave={handleMouseLeave}
                      onMouseUp={handleMouseUp}
                      onMouseMove={(e) => handleMouseMove(e, dateScrollRef)}
                      className="flex gap-2.5 overflow-x-auto pb-2 snap-x hide-scrollbar cursor-grab active:cursor-grabbing"
                    >
                      {displayDates.map((d) => {
                        const isSelected = selectedDate === d.date;
                        return (
                          <button
                            key={d.date}
                            onClick={() => setSelectedDate(d.date)}
                            className={cn(
                              "snap-start flex-[1_0_5rem] flex flex-col items-center justify-center h-24 border rounded-xl transition-all duration-200",
                              isSelected
                                ? "border-[#0f2540] bg-[#0f2540]/5 ring-1 ring-[#0f2540]/20 shadow-sm"
                                : "border-slate-200 hover:border-[#0f2540]/50 hover:bg-slate-50"
                            )}
                          >
                            <span className={cn("text-[10px] font-bold tracking-wider", isSelected ? "text-[#0f2540]" : "text-slate-500")}>
                              {d.dayName}
                            </span>
                            <span className={cn("text-2xl font-bold my-0.5", isSelected ? "text-[#0f2540]" : "text-slate-800")}>
                              {d.dayNum}
                            </span>
                            <span className={cn("text-xs font-medium", isSelected ? "text-[#0f2540]" : "text-slate-500")}>
                              {d.month}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots or Fallback Time Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-2">Showing Time <span className="text-red-500">*</span></label>

                    {isLoadingSlots || fakeLoading ? (
                      <div className="flex items-center justify-center p-6 border border-slate-100 rounded-xl bg-slate-50/50">
                        <Loader2 className="w-6 h-6 animate-spin text-[#0f2540] mr-2" />
                        <span className="text-sm font-medium text-slate-600">Loading available timeslots...</span>
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div
                        ref={slotsScrollRef}
                        onMouseDown={(e) => handleMouseDown(e, slotsScrollRef)}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={(e) => handleMouseMove(e, slotsScrollRef)}
                        className="flex gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar cursor-grab active:cursor-grabbing"
                      >
                        {availableSlots.map((slot, i) => {
                          const isSelected = selectedSlot?.time === slot.time;
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedSlot(slot)}
                              className={cn(
                                "snap-start flex-shrink-0 py-2 px-3.5 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap",
                                isSelected
                                  ? "border-[#0f2540] bg-[#0f2540] text-white shadow-md"
                                  : "border-slate-200 text-slate-700 hover:border-[#0f2540]/50 hover:bg-slate-50 bg-white"
                              )}
                            >
                              {isSelected && <Clock className="w-3.5 h-3.5" />}
                              {slot.time.split(' - ')[0]}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        ref={slotsScrollRef}
                        onMouseDown={(e) => handleMouseDown(e, slotsScrollRef)}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={(e) => handleMouseMove(e, slotsScrollRef)}
                        className="flex gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar cursor-grab active:cursor-grabbing"
                      >
                        {[
                          "10:00 AM - 10:20 AM", "10:20 AM - 10:40 AM", "10:40 AM - 11:00 AM",
                          "11:00 AM - 11:20 AM", "11:20 AM - 11:40 AM", "11:40 AM - 12:00 PM",
                          "12:00 PM - 12:20 PM", "12:20 PM - 12:40 PM", "12:40 PM - 01:00 PM",
                          "01:00 PM - 01:20 PM", "01:20 PM - 01:40 PM", "01:40 PM - 02:00 PM",
                          "02:00 PM - 02:20 PM", "02:20 PM - 02:40 PM", "02:40 PM - 03:00 PM",
                          "03:00 PM - 03:20 PM", "03:20 PM - 03:40 PM", "03:40 PM - 04:00 PM",
                          "04:00 PM - 04:20 PM", "04:20 PM - 04:40 PM", "04:40 PM - 05:00 PM",
                          "05:00 PM - 05:20 PM", "05:20 PM - 05:40 PM", "05:40 PM - 06:00 PM"
                        ].map((time, i) => {
                          const isSelected = customTime === time;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setCustomTime(time)}
                              className={cn(
                                "snap-start flex-shrink-0 py-2 px-3.5 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap",
                                isSelected
                                  ? "border-[#0f2540] bg-[#0f2540] text-white shadow-md"
                                  : "border-slate-200 text-slate-700 hover:border-[#0f2540]/50 hover:bg-slate-50 bg-white"
                              )}
                            >
                              {isSelected && <Clock className="w-3.5 h-3.5" />}
                              {time.split(' - ')[0]}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <hr className="border-slate-100 mb-6" />

              {/* Step 2: User Details */}
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-4">
                  Your Information
                </h3>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#0f2540] focus:ring-1 focus:ring-[#0f2540] outline-none transition-all text-base"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#0f2540] focus:ring-1 focus:ring-[#0f2540] outline-none transition-all text-base"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourmail@email.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#0f2540] focus:ring-1 focus:ring-[#0f2540] outline-none transition-all text-base"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-1">
                    <label className="text-xs font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                    <div className="flex w-full overflow-hidden rounded-lg border border-slate-200 bg-white px-3 focus-within:ring-1 focus-within:ring-[#0f2540] focus-within:border-[#0f2540]">
                      <PhoneInput
                        international
                        defaultCountry={countryCode as Country}
                        value={phone}
                        onChange={(val) => {
                          if (val) {
                            // Specific override for India: STRICT 10 digit national limit (2 country code + 10 mobile)
                            if (val.startsWith('+91') && val.replace(/\D/g, '').length > 12) {
                              return;
                            }

                            if (phone && val.length > phone.length) {
                              // Universal validation:
                              // If the current number is perfectly valid (button enabled),
                              // and the user types an extra digit making it invalid, block it!
                              if (isValidPhoneNumber(phone) && !isValidPhoneNumber(val)) {
                                return;
                              }
                            }
                          }
                          setPhone(val || '');
                        }}
                        limitMaxLength={true}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Expected Move-in Date */}
                  <div className="space-y-1 md:col-span-1">
                    <label className="text-xs font-medium text-slate-700">Expected Move-in Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <DatePicker
                        selected={expectedMoveIn}
                        onChange={(date: Date | null) => setExpectedMoveIn(date)}
                        minDate={selectedDate ? new Date(selectedDate + 'T12:00:00Z') : new Date()}
                        placeholderText="Select move-in date"
                        dateFormat="MMM d, yyyy"
                        wrapperClassName="w-full"
                        showPopperArrow={false}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </form>

                {submitError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                    {submitError}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5 sm:pb-5 bg-white sm:bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0 sm:rounded-b-2xl">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-[#10B981] hover:bg-[#059669] flex items-center justify-center text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  submitText
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
