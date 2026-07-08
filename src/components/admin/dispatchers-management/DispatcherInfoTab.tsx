import Image from "next/image";
import type { DispatcherDetailsRecord } from "./dispatcherDetailsTypes";

type DispatcherInfoTabProps = {
    dispatcher: DispatcherDetailsRecord;
};

const statusClasses = {
    Active: "border-[#22C55E] bg-[#F0FDF4] text-[#16A34A]",
    Suspended: "border-[#F87171] bg-[#FFF1F2] text-[#DC2626]",
};

export default function DispatcherInfoTab({ dispatcher }: DispatcherInfoTabProps) {
    const infoItems = [
        { label: "Email", value: dispatcher.email },
        { label: "Phone", value: dispatcher.phone },
        { label: "Address", value: dispatcher.address },
        { label: "Joined", value: dispatcher.joinedAt },
        { label: "Carriers", value: String(dispatcher.totalCarriers) },
        { label: "Completed Loads", value: String(dispatcher.totalCompletedLoads) },
    ];

    return (
        <section className="rounded-lg bg-[#F8FAFC] p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
                <div className="rounded-lg border border-[#E4E7EC] bg-white p-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-[#EEF2FF]">
                        <Image
                            src={dispatcher.avatarUrl}
                            alt={dispatcher.name}
                            fill
                            sizes="260px"
                            className="object-cover"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-semibold text-[#101828]">
                                {dispatcher.name}
                            </h2>
                            <span
                                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses[dispatcher.status]}`}
                            >
                                {dispatcher.status}
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-[#667085]">{dispatcher.role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {infoItems.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-lg border border-[#E4E7EC] bg-white p-4"
                        >
                            <p className="text-sm text-[#667085]">{item.label}</p>
                            <p className="mt-2 break-words text-base font-semibold text-[#101828]">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
