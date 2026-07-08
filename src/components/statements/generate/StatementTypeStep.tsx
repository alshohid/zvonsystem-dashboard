"use client";

import { Building2, UserRound } from "lucide-react";
import { StatementGenerationFormState, StatementRecipientOption, StatementType } from "../statementTypes";
import SearchableStatementSelect from "./SearchableStatementSelect";

type StatementTypeStepProps = {
    form: StatementGenerationFormState;
    carrierOptions: StatementRecipientOption[];
    driverOptions: StatementRecipientOption[];
    errors: Partial<Record<"carrierId" | "driverId", string>>;
    onChange: (nextForm: StatementGenerationFormState) => void;
};

function StatementTypeCard({
    type,
    label,
    active,
    onClick,
}: {
    type: StatementType;
    label: string;
    active: boolean;
    onClick: (type: StatementType) => void;
}) {
    const Icon = type === "carrier" ? Building2 : UserRound;

    return (
        <button
            type="button"
            onClick={() => onClick(type)}
            className={[
                "flex min-h-[126px] flex-col items-center justify-center gap-4 rounded-xl border-2 px-5 text-lg font-medium transition",
                active
                    ? "border-[#252E78] bg-[#EEF2FF] text-[#252E78]"
                    : "border-[#E4E7EC] bg-white text-[#344054] hover:border-[#C9D3E0]",
            ].join(" ")}
        >
            <Icon className="h-7 w-7" />
            {label}
        </button>
    );
}

export default function StatementTypeStep({
    form,
    carrierOptions,
    driverOptions,
    errors,
    onChange,
}: StatementTypeStepProps) {
    const handleTypeChange = (statementType: StatementType) => {
        onChange({
            ...form,
            statementType,
            driverId: statementType === "carrier" ? "" : form.driverId,
        });
    };

    return (
        <div className="space-y-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <StatementTypeCard
                    type="carrier"
                    label="Carrier"
                    active={form.statementType === "carrier"}
                    onClick={handleTypeChange}
                />
                <StatementTypeCard
                    type="driver"
                    label="Driver"
                    active={form.statementType === "driver"}
                    onClick={handleTypeChange}
                />
            </div>

            <SearchableStatementSelect
                label="Select Carrier"
                placeholder="Select Carrier"
                value={form.carrierId}
                options={carrierOptions}
                error={errors.carrierId}
                onChange={(carrierId) => onChange({ ...form, carrierId })}
            />

            {form.statementType === "driver" ? (
                <SearchableStatementSelect
                    label="Select Driver"
                    placeholder="Select Driver"
                    value={form.driverId}
                    options={driverOptions}
                    error={errors.driverId}
                    onChange={(driverId) => onChange({ ...form, driverId })}
                />
            ) : null}
        </div>
    );
}
