import { Suspense } from "react";
import RevenueAnalyticsContainer from "@/src/components/superAdmin/revenueAnalytics/RevenueAnalyticsContainer";

export default function RevenueAnalyticsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RevenueAnalyticsContainer />
        </Suspense>
    );
}
