import { Suspense } from "react";
import RevenueAnalyticsContainer from "@/src/components/superAdmin/revenueAnalytics/RevenueAnalyticsContainer";
import RevenueAnalyticsSkeleton from "@/src/components/superAdmin/revenueAnalytics/RevenueAnalyticsSkeleton";

export default function RevenueAnalyticsPage() {
    return (
        <Suspense fallback={<RevenueAnalyticsSkeleton />}>
            <RevenueAnalyticsContainer />
        </Suspense>
    );
}
