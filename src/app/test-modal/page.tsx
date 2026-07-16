'use client';

import React, { useState } from 'react';
import { ScheduleTourModal } from '@/components/properties/schedule-tour-modal';

export default function TestModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialDate, setInitialDate] = useState('2026-07-16');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-8">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">Test Schedule Tour Modal</h1>
        <p className="text-slate-600">
          This is a dummy page to test the UI of the Schedule Tour Modal. 
          You can change the initial date passed from the "Unit Details Page" below.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Simulate Selected Date from Unit Page
          </label>
          <select 
            value={initialDate}
            onChange={(e) => setInitialDate(e.target.value)}
            className="w-full mb-6 p-2 border rounded-md"
          >
            <option value="2026-07-16">July 16, 2026 (Has slots)</option>
            <option value="2026-07-17">July 17, 2026 (Has slots)</option>
            <option value="2026-07-18">July 18, 2026 (Has slots)</option>
            <option value="2026-07-19">July 19, 2026 (NO slots)</option>
            <option value="2026-07-20">July 20, 2026 (Has slots)</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#0f2540] hover:bg-[#1a385e] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Open Modal
          </button>
        </div>
      </div>

      <ScheduleTourModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        unitId="dummy-unit-123"
        initialSelectedDate={initialDate}
      />
    </div>
  );
}
