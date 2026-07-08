import CreateNewLoadPage from '@/src/components/dispatcher/loads/CreateNewLoadPage'
import React, { Suspense } from 'react'

export default function NewLoadPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <CreateNewLoadPage />
    </Suspense>
  );
}
