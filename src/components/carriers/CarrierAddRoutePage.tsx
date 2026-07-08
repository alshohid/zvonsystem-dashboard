import { Suspense } from "react";
import AddCarrierPageMainComponent from "@/src/components/dispatcher/AddCarrierPageMainComponent";
import type { DashboardRole } from "@/src/lib/sidebarConfig";

type CarrierAddRoutePageProps = {
  role: DashboardRole;
};

export default function CarrierAddRoutePage({ role }: CarrierAddRoutePageProps) {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <AddCarrierPageMainComponent role={role} />
    </Suspense>
  );
}
