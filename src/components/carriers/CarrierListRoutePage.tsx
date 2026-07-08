import { Suspense } from "react";
import CarriersPageMainComponent from "@/src/components/dispatcher/CarriersPageMainComponent";
import type { DashboardRole } from "@/src/lib/sidebarConfig";

type CarrierListRoutePageProps = {
  role: DashboardRole;
};

export default function CarrierListRoutePage({ role }: CarrierListRoutePageProps) {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <CarriersPageMainComponent role={role} />
    </Suspense>
  );
}
