import AllReleasesContainer from "@/src/components/admin/releases/AllRealseContainer";
import { Suspense } from "react";

export default function AdminAllReleasesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllReleasesContainer />
    </Suspense>
  );
}
