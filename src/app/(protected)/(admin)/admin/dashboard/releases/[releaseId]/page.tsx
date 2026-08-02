import { Suspense } from 'react';
import ReleaseDetailsContainer from '@/src/components/admin/releases/ReleaseDetailsContainer';
import ReleaseDetailsSkeleton from '@/src/components/admin/releases/ReleaseDetailsSkeleton';

export default async function AdminReleaseDetailsPage({
  params,
}: {
  params: Promise<{ releaseId: string }>;
}) {
  const { releaseId } = await params;

  return (
    <Suspense fallback={<ReleaseDetailsSkeleton />}>
      <ReleaseDetailsContainer releaseId={releaseId} />
    </Suspense>
  );
}
