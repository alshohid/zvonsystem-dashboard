"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TopTabs, { type TabItem } from "@/src/components/common/TopTabs";
import DispatcherCarriersTab from "./DispatcherCarriersTab";
import DispatcherInfoTab from "./DispatcherInfoTab";
import DispatcherLoadsRevenueTab from "./DispatcherLoadsRevenueTab";
import { getDispatcherDetailsById } from "./dispatcherDetailsMockData";
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";

type DispatcherDetailsContainerProps = {
    dispatcherId: string;
    backHref: string;
};

type TabKey = "dispatcher-info" | "carriers" | "loads-revenue";
const tabs: TabItem<TabKey>[] = [
    { key: "dispatcher-info", label: "Dispatcher Info" },
    { key: "carriers", label: "Carriers" },
    { key: "loads-revenue", label: "Loads and Revenue" },
];
export default function DispatcherDetailsContainer({
    dispatcherId,
    backHref,
}: DispatcherDetailsContainerProps) {
    const dispatcher = getDispatcherDetailsById(dispatcherId);
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "dispatcher-info");

    return (
        <main className="rounded-lg border border-[#DCE2EA] bg-white p-4 text-[#101828] sm:p-5">
            <div className="mb-4">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#344054] transition hover:text-[#2E3A83]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to dispatchers
                </Link>
            </div>

            <h1 className="text-xl font-semibold leading-7 text-[#101828]">
                Dispatcher Details #ID_{dispatcher.id}
            </h1>

            <div className="mt-4">
                <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />
            </div>

            {tab === "dispatcher-info" ? (
                <div className="mt-4">
                    <DispatcherInfoTab dispatcher={dispatcher} />
                </div>
            ) : null}

            {tab === "carriers" ? (
                <div className="mt-4">
                    <DispatcherCarriersTab carriers={dispatcher.carriers} />
                </div>
            ) : null}

            {tab === "loads-revenue" ? (
                <DispatcherLoadsRevenueTab dispatcher={dispatcher} />
            ) : null}
        </main>
    );
}
