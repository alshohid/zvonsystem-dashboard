import ReportsPageMainComponent from '@/src/components/dispatcher/ReportsPageMainComponent';
import { Suspense } from 'react'

export default function ReportsPage() {
  return <Suspense fallback={<div className="p-4">Loading...</div>}>
    <ReportsPageMainComponent/>
  </Suspense>;
}
