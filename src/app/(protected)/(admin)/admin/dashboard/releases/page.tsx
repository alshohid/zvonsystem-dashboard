import AllReleasesContainer from "@/src/components/admin/releases/AllRealseContainer";
import ReleaseListPageSkeleton from "@/src/components/admin/releases/ReleaseListPageSkeleton";
import { Suspense } from "react";

export default function AdminAllReleasesPage() {
  return (
    <Suspense fallback={<ReleaseListPageSkeleton />}>
      <AllReleasesContainer />
    </Suspense>
  );
}
