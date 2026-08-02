import ReleaseListPageSkeleton from '@/src/components/admin/releases/ReleaseListPageSkeleton';
import YourReleasesContainer from '@/src/components/admin/releases/YourReleasesContainer';
import { Suspense } from 'react';

export default function AdminYourReleasesPage() {
  return (
    <Suspense fallback={<ReleaseListPageSkeleton withTabs />}>
      <YourReleasesContainer />
    </Suspense>
  );
}
