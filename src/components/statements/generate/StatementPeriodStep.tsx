"use client";

import { CalendarDays } from "lucide-react";
import { StatementGenerationFormState } from "../statementTypes";

type StatementPeriodStepProps = {
    form: StatementGenerationFormState;
    errors: Partial<Record<"startDate" | "endDate", string>>;
    onChange: (nextForm: StatementGenerationFormState) => void;
};

function DateField({
    id,
    label,
    value,
    error,
    min,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    error?: string;
    min?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label htmlFor={id} className="text-base font-semibold text-[#101828]">
                {label}
            </label>
            <div className="relative mt-2">
                <input
                    id={id}
                    type="date"
                    value={value}
                    min={min}
                    onChange={(event) => onChange(event.target.value)}
                    className={[
                        "h-12 w-full rounded-lg border bg-white px-4 text-base text-[#101828] outline-none focus:border-[#C9D3E0]",
                        error ? "border-[#F04438]" : "border-[#D7DDE8]",
                    ].join(" ")}
                />
            </div>
            {error ? <p className="mt-2 text-sm text-[#D92D20]">{error}</p> : null}
        </div>
    );
}

function formatDisplayDate(value: string) {
    if (!value) {
        return "";
    }

    const [year, month, day] = value.split("-");

    if (!year || !month || !day) {
        return value;
    }

    return `${day}/${month}/${year}`;
}

export default function StatementPeriodStep({
    form,
    errors,
    onChange,
}: StatementPeriodStepProps) {
    const hasPeriod = Boolean(form.startDate && form.endDate);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DateField
                    id="statement-start-date"
                    label="Start Date"
                    value={form.startDate}
                    error={errors.startDate}
                    onChange={(startDate) => onChange({ ...form, startDate })}
                />
                <DateField
                    id="statement-end-date"
                    label="End Date"
                    value={form.endDate}
                    error={errors.endDate}
                    min={form.startDate}
                    onChange={(endDate) => onChange({ ...form, endDate })}
                />
            </div>

            {hasPeriod ? (
                <div className="flex items-start gap-3 rounded-lg border border-[#BBD7FF] bg-[#EFF6FF] px-4 py-4">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />
                    <div>
                        <p className="text-sm font-semibold text-[#2563EB]">
                            Period: {formatDisplayDate(form.startDate)} - {formatDisplayDate(form.endDate)}
                        </p>
                        <p className="mt-1 text-xs text-[#2563EB]">30 days</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
