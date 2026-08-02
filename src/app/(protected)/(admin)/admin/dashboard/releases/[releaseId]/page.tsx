import { Suspense } from 'react';
import ReleaseDetailsContainer from '@/src/components/admin/releases/ReleaseDetailsContainer';

export default async function AdminReleaseDetailsPage({
  params,
}: {
  params: Promise<{ releaseId: string }>;
}) {
  const { releaseId } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReleaseDetailsContainer releaseId={releaseId} />
    </Suspense>
  );
}
