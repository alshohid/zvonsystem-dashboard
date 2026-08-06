import { Suspense } from "react";
import SuperAdminDashboardContainer from "@/src/components/superAdmin/dashboard/SuperAdminDashboardContainer";
import SuperAdminDashboardSkeleton from "@/src/components/superAdmin/dashboard/SuperAdminDashboardSkeleton";

export default function SuperAdminDashboardPage() {
  return (
    <Suspense fallback={<SuperAdminDashboardSkeleton />}>
      <SuperAdminDashboardContainer />
    </Suspense>
  );
}
