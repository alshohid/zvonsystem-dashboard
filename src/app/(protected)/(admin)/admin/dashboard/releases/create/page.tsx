import CreateReleaseContainer from "@/src/components/admin/releases/CreateReleaseContainer";
import { Suspense } from "react";

export default function AdminCreateReleasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateReleaseContainer releasesListPath="/admin/dashboard/releases" />
    </Suspense>
  );
}
