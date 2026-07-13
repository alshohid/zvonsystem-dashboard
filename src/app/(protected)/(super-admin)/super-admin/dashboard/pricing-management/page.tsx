import { Suspense } from "react";
import PaymentControlContainer from "@/src/components/superAdmin/pricingManagement/PaymentControlContainer";

export default function PricingManagementPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentControlContainer />
        </Suspense>
    );
}
