import YourReleasesContainer from '@/src/components/admin/releases/YourReleasesContainer';
import { Suspense } from 'react';

export default function AdminYourReleasesPage() {
  return <Suspense fallback={<div>Loading...</div>}>
    <YourReleasesContainer />
  </Suspense>;
}
