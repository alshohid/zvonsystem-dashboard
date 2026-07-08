import { AllLoadsTable } from '@/src/components/dispatcher/loads/AllLoadsTable';
import { StatsCards } from '@/src/components/dispatcher/loads/StatsCards';
import React, { Suspense } from 'react'

export default function LoadsPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <div className=" mx-auto">
        <StatsCards />
        <AllLoadsTable />
      </div>
    </Suspense>
  );
}
