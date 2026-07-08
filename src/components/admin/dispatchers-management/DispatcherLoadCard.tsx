import type { DispatcherLoadRecord } from "./dispatcherDetailsTypes";

type DispatcherLoadCardProps = {
    load: DispatcherLoadRecord;
};

export default function DispatcherLoadCard({ load }: DispatcherLoadCardProps) {
    return (
        <article className="rounded-md border border-[#E4E7EC] bg-[#F8FAFC] p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="text-sm font-semibold text-[#101828]">{load.loadNumber}</h4>
                    <p className="mt-2 text-[11px] text-[#667085]">{load.dateRange}</p>
                    <p className="mt-1 text-xs font-semibold text-[#101828]">{load.route}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#101828]">{load.revenue}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-5">
                <LoadMeta label="Assigned to" value={`${load.assignedTo} ${load.assignedToPhone}`} />
                <LoadMeta label="Carrier" value={load.carrier} />
                <LoadMeta label="Dispatch Fee (%)" value={load.dispatchFeePercentage} />
                <LoadMeta label="Miles" value={load.miles} />
                <LoadMeta label="Dispatcher Earning" value={load.dispatcherEarning} />
            </div>
        </article>
    );
}

function LoadMeta({ label, value }: { label: string; value: string }) {
    return (
        <div className="min-w-0">
            <p className="text-[#667085]">{label}</p>
            <p className="mt-1 break-words font-semibold text-[#101828]">{value}</p>
        </div>
    );
}
