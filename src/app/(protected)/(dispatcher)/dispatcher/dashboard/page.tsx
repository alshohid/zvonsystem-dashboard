import { ActiveLoads } from '@/src/components/dispatcher/ActiveLoads';
import LoadsPageMainComponent from '@/src/components/dispatcher/LoadsPageMainComponent';
import { StatsCards } from '@/src/components/dispatcher/StatCards';
import React, { Suspense } from 'react'

export default function DispatcherDashboardPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
    <div className="mx-auto flex  flex-col gap-5">
      <StatsCards />
      <LoadsPageMainComponent/>
    </div>
    </Suspense>
  );
}
