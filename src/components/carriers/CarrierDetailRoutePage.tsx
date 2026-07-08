import CarrierProfileDetailMainComponent from "@/src/components/dispatcher/carrier/CarrierProfileDetailMainComponent";
import type { DashboardRole } from "@/src/lib/sidebarConfig";

type CarrierDetailRoutePageProps = {
  role: DashboardRole;
};

export default function CarrierDetailRoutePage({ role }: CarrierDetailRoutePageProps) {
  return <CarrierProfileDetailMainComponent role={role} />;
}
