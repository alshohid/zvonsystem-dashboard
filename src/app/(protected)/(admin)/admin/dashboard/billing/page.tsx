import { Suspense } from "react";
import BillingContainer from "@/src/components/admin/billing/BillingContainer";

export default function BillingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BillingContainer />
        </Suspense>
    );
}
