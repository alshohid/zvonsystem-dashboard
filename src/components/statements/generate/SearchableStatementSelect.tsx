"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { StatementRecipientOption } from "../statementTypes";

type SearchableStatementSelectProps = {
    label: string;
    placeholder: string;
    value: string;
    options: StatementRecipientOption[];
    error?: string;
    onChange: (value: string) => void;
};

export default function SearchableStatementSelect({
    label,
    placeholder,
    value,
    options,
    error,
    onChange,
}: SearchableStatementSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const selectedOption = options.find((option) => option.value === value);
    const filteredOptions = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return options;
        }

        return options.filter((option) =>
            option.label.toLowerCase().includes(normalizedQuery),
        );
    }, [options, query]);

    return (
        <div className="relative">
            <label className="text-base font-semibold text-[#101828]">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className={[
                    "mt-2 flex h-14 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-lg transition",
                    error ? "border-[#F04438]" : "border-[#D7DDE8]",
                    selectedOption ? "text-[#101828]" : "text-[#98A2B3]",
                ].join(" ")}
            >
                <span className="truncate">{selectedOption?.label ?? placeholder}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-[#667085]" />
            </button>
            {error ? <p className="mt-2 text-sm text-[#D92D20]">{error}</p> : null}

            {isOpen ? (
                <div className="absolute left-0 right-0 top-full z-30 mt-3 rounded-xl border border-[#EAECF0] bg-white p-4 shadow-[0_18px_50px_rgba(16,24,40,0.18)]">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search..."
                            className="h-12 w-full rounded-lg border border-[#D7DDE8] bg-[#F8FAFB] pl-11 pr-4 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0] focus:bg-white"
                        />
                    </div>

                    <div className="mt-3 max-h-[220px] overflow-y-auto">
                        {filteredOptions.map((option) => {
                            const isSelected = option.value === value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setQuery("");
                                    }}
                                    className="flex w-full items-center gap-3 border-b border-[#EAECF0] px-1 py-3 text-left last:border-b-0 hover:bg-[#F8FAFC]"
                                >
                                    <span
                                        className={[
                                            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                                            isSelected
                                                ? "border-[#252E78] bg-[#252E78] text-white"
                                                : "border-[#D0D5DD] bg-white text-transparent",
                                        ].join(" ")}
                                    >
                                        <Check className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="text-base font-medium text-[#101828]">
                                        {option.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
