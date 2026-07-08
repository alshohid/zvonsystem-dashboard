
import DriverInfoTable from '@/src/components/dispatcher/driver/DriverInfoTable'
import React, { Suspense } from 'react'

export default function DriverPage() {
  return (
     <Suspense fallback={<div className="p-4">Loading...</div>}>

       <DriverInfoTable/>
     </Suspense>
    
  )
}
