import { Suspense } from "react";
import SuperAdminDashboardContainer from "@/src/components/superAdmin/dashboard/SuperAdminDashboardContainer";

export default function SuperAdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperAdminDashboardContainer />
    </Suspense>
  );
}
