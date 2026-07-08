"use client";



export type PrefKey =
    | "emailNotifications"
    | "inAppNotifications"
    | "completedLoad"
    | "documentVerification"
    | "adminDocumentUpload"
    | "DocumentCertificationExpirationAlert";

export type PrefItem<K extends string = PrefKey> = {
    key: K;
    title: string;
    desc: string;
};

type NotificationPreferencesProps<K extends string = PrefKey> = {
    title?: string;
    items: PrefItem<K>[];
    value: Record<K, boolean>;
    onChange: (key: K, value: boolean) => void;

    onSubmit?: () => void;
    submitLabel?: string;
    className?: string;
    maxWidthClassName?: string; // default: max-w-[860px]
    showDescriptions?: boolean;
};

export default function NotificationPreferences<K extends string = PrefKey>({
    title = "Notification Settings",
    items,
    value,
    onChange,
    onSubmit,
    submitLabel = "Update",
    className = "",
    maxWidthClassName = "max-w-none",
    showDescriptions = false,
}: NotificationPreferencesProps<K>) {
    return (
        <section
            className={[
                "w-full rounded-[1.75rem] border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6",
                className,
            ].join(" ")}
        >
            <h2 className="text-[1rem] md:text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
                {title}
            </h2>

            <div className={["mt-6 w-full", maxWidthClassName].join(" ")}>
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className="flex items-center justify-between gap-4 rounded-[14px] border border-[#D9E2EC] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.02)] sm:px-5 sm:py-4"
                        >
                            <div className="min-w-0" title={item.desc}>
                                <p className="text-[1rem] md:text-[1.125rem] font-medium text-[#101828]">
                                    {item.title}
                                </p>
                                {showDescriptions ? (
                                    <p className="mt-1 text-sm leading-6 text-[#98A2B3]">
                                        {item.desc}
                                    </p>
                                ) : null}
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={Boolean(value[item.key])}
                                aria-label={item.desc ? `${item.title}. ${item.desc}` : item.title}
                                onClick={() => onChange(item.key, !Boolean(value[item.key]))}
                                className={[
                                    "relative inline-flex h-7 md:h-9 w-12 md:w-16 shrink-0 items-center rounded-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/20 focus:ring-offset-2",
                                    Boolean(value[item.key])
                                        ? "border-[#2E3A83] bg-[#2E3A83]"
                                        : "border-[#D0D5DD] bg-[#EAECF0]",
                                ].join(" ")}
                            >
                                <span
                                    className={[
                                        "inline-block h-5 w-5 md:h-7 md:w-7 rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.16)] transition-transform duration-200",
                                        Boolean(value[item.key])
                                            ? "translate-x-[25px] md:translate-x-[33px]"
                                            : "translate-x-[3px]",
                                    ].join(" ")}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {onSubmit ? (
                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2E3A83] px-6 text-sm font-semibold text-white transition hover:bg-[#25306F]"
                        >
                            {submitLabel}
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
