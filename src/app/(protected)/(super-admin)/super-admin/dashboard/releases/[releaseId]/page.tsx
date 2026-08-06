import { Suspense } from "react";
import ReleaseDetailsContainer from "@/src/components/admin/releases/ReleaseDetailsContainer";
import ReleaseDetailsSkeleton from "@/src/components/admin/releases/ReleaseDetailsSkeleton";

export default async function SuperAdminReleaseDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ releaseId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { releaseId } = await params;
  const { tab } = await searchParams;

  const backPath =
    tab === "approved" || tab === "rejected"
      ? `/super-admin/dashboard?tab=${tab}`
      : "/super-admin/dashboard";

  return (
    <Suspense fallback={<ReleaseDetailsSkeleton />}>
      <ReleaseDetailsContainer releaseId={releaseId} backPath={backPath} />
    </Suspense>
  );
}
