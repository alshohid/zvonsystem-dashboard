"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GenerateStatementStepper from "./GenerateStatementStepper";
import GeneratedStatementReport from "./GeneratedStatementReport";
import StatementLoadSelectionStep from "./StatementLoadSelectionStep";
import StatementPeriodStep from "./StatementPeriodStep";
import StatementReviewStep from "./StatementReviewStep";
import StatementTypeStep from "./StatementTypeStep";
import { dispatcherStatementDataset } from "../statementMockData";
import {
    StatementDataset,
    StatementGenerationFormState,
    StatementGenerationStep,
    StatementLoadOption,
    StatementType,
} from "../statementTypes";
import {
    downloadStatementTextFile,
    formatStatementCurrency,
} from "../statementUtils";

type StatementGenerateContainerProps = {
    dataset?: StatementDataset;
    backHref: string;
    onStepSubmit?: (
        step: StatementGenerationStep,
        values: StatementGenerationFormState,
    ) => Promise<void> | void;
    onGenerateStatement?: (
        values: StatementGenerationFormState,
        selectedLoads: StatementLoadOption[],
    ) => Promise<void> | void;
};

type FieldErrors = Partial<Record<
    "general" | "carrierId" | "driverId" | "startDate" | "endDate" | "selectedLoadIds",
    string
>>;

const stepValues: StatementGenerationStep[] = [1, 2, 3, 4];

function getStepFromParam(stepParam: string | null): StatementGenerationStep {
    const parsedStep = Number(stepParam);

    return stepValues.includes(parsedStep as StatementGenerationStep)
        ? (parsedStep as StatementGenerationStep)
        : 1;
}

function getLoadsFromParam(loadsParam: string | null) {
    if (!loadsParam || loadsParam === "none") {
        return [];
    }

    return loadsParam.split(",").filter(Boolean);
}

function serializeLoadIds(loadIds: string[]) {
    return loadIds.length > 0 ? loadIds.join(",") : "none";
}

function getPeriodParts(period?: string) {
    if (!period) {
        return ["", ""];
    }

    const [startDate = "", endDate = ""] = period.split(" - ");
    return [startDate, endDate];
}

function toIsoDate(value?: string | null) {
    if (!value) {
        return "";
    }

    const trimmedValue = value.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
        return trimmedValue;
    }

    const slashParts = trimmedValue.split("/");

    if (slashParts.length === 3) {
        const [firstPart, secondPart, yearPart] = slashParts;
        const firstNumber = Number(firstPart);
        const secondNumber = Number(secondPart);
        const yearNumber = Number(yearPart);

        if (
            Number.isInteger(firstNumber)
            && Number.isInteger(secondNumber)
            && Number.isInteger(yearNumber)
        ) {
            const isMonthFirst = secondNumber > 12;
            const month = isMonthFirst ? firstNumber : secondNumber;
            const day = isMonthFirst ? secondNumber : firstNumber;

            return [
                String(yearNumber).padStart(4, "0"),
                String(month).padStart(2, "0"),
                String(day).padStart(2, "0"),
            ].join("-");
        }
    }

    return trimmedValue;
}

function isValidIsoDate(value: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const [year, month, day] = value.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    return (
        parsedDate.getFullYear() === year
        && parsedDate.getMonth() === month - 1
        && parsedDate.getDate() === day
    );
}

export default function StatementGenerateContainer({
    dataset = dispatcherStatementDataset,
    backHref,
    onStepSubmit,
    onGenerateStatement,
}: StatementGenerateContainerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentStep = getStepFromParam(searchParams.get("step"));
    const isPreview = searchParams.get("step") === "preview";
    const statementId = searchParams.get("statementId");
    const seedStatement = dataset.statements.find((statement) => statement.id === statementId);
    const [seedStartDate, seedEndDate] = getPeriodParts(seedStatement?.period);

    const carrierOptions = useMemo(
        () => dataset.recipientOptions.filter((option) => option.type === "carrier"),
        [dataset.recipientOptions],
    );
    const driverOptions = useMemo(
        () => dataset.recipientOptions.filter((option) => option.type === "driver"),
        [dataset.recipientOptions],
    );

    const form = useMemo<StatementGenerationFormState>(() => {
        const typeParam = searchParams.get("type");
        const seedStatementType = seedStatement?.recipientType ?? "carrier";
        const statementType: StatementType = typeParam === "driver" || typeParam === "carrier"
            ? typeParam
            : seedStatementType;

        return {
            statementType,
            carrierId: searchParams.get("carrier")
                ?? (seedStatement?.recipientType === "carrier" ? seedStatement.recipientId : ""),
            driverId: searchParams.get("driver")
                ?? (seedStatement?.recipientType === "driver" ? seedStatement.recipientId : ""),
            startDate: toIsoDate(searchParams.get("start") ?? seedStartDate),
            endDate: toIsoDate(searchParams.get("end") ?? seedEndDate),
            selectedLoadIds: getLoadsFromParam(searchParams.get("loads")),
        };
    }, [searchParams, seedEndDate, seedStartDate, seedStatement]);

    const selectedLoads = useMemo(
        () => dataset.loadOptions.filter((load) => form.selectedLoadIds.includes(load.id)),
        [dataset.loadOptions, form.selectedLoadIds],
    );
    const carrierName = carrierOptions.find((carrier) => carrier.value === form.carrierId)?.label ?? "";
    const driverName = driverOptions.find((driver) => driver.value === form.driverId)?.label ?? "";

    const setUrlForm = (
        nextForm: StatementGenerationFormState,
        nextStep: StatementGenerationStep | "preview" = currentStep,
        historyMode: "push" | "replace" = "replace",
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("step", String(nextStep));
        params.set("type", nextForm.statementType);

        if (nextForm.carrierId) {
            params.set("carrier", nextForm.carrierId);
        } else {
            params.delete("carrier");
        }

        if (nextForm.driverId) {
            params.set("driver", nextForm.driverId);
        } else {
            params.delete("driver");
        }

        if (nextForm.startDate) {
            params.set("start", nextForm.startDate);
        } else {
            params.delete("start");
        }

        if (nextForm.endDate) {
            params.set("end", nextForm.endDate);
        } else {
            params.delete("end");
        }

        if (nextForm.selectedLoadIds.length > 0 || params.has("loads")) {
            params.set("loads", serializeLoadIds(nextForm.selectedLoadIds));
        }

        const href = `${pathname}?${params.toString()}`;

        if (historyMode === "push") {
            router.push(href, { scroll: false });
            return;
        }

        router.replace(href, { scroll: false });
    };

    const updateForm = (nextForm: StatementGenerationFormState) => {
        setErrors({});
        setUrlForm(nextForm);
    };

    const validateStep = (
        step: StatementGenerationStep,
        values: StatementGenerationFormState,
    ): FieldErrors => {
        const nextErrors: FieldErrors = {};

        if (step >= 1) {
            if (!values.carrierId) {
                nextErrors.carrierId = "Select a carrier.";
            }

            if (values.statementType === "driver" && !values.driverId) {
                nextErrors.driverId = "Select a driver.";
            }
        }

        if (step >= 2) {
            if (!values.startDate.trim()) {
                nextErrors.startDate = "Start date is required.";
            } else if (!isValidIsoDate(values.startDate)) {
                nextErrors.startDate = "Select a valid start date.";
            }

            if (!values.endDate.trim()) {
                nextErrors.endDate = "End date is required.";
            } else if (!isValidIsoDate(values.endDate)) {
                nextErrors.endDate = "Select a valid end date.";
            }

            if (
                isValidIsoDate(values.startDate)
                && isValidIsoDate(values.endDate)
                && values.endDate < values.startDate
            ) {
                nextErrors.endDate = "End date must be after start date.";
            }
        }

        if (step >= 3 && values.selectedLoadIds.length === 0) {
            nextErrors.selectedLoadIds = "Select at least one load.";
        }

        return nextErrors;
    };

    const submitStep = async (step: StatementGenerationStep) => {
        const validationErrors = validateStep(step, form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const nextStep = (step + 1) as StatementGenerationStep;
        let nextForm = form;

        if (step === 2 && !searchParams.has("loads")) {
            nextForm = {
                ...form,
                selectedLoadIds: dataset.loadOptions.map((load) => load.id),
            };
        }

        try {
            setIsSubmitting(true);
            setErrors({});
            await onStepSubmit?.(step, nextForm);
            setUrlForm(nextForm, nextStep, "push");
        } catch {
            setErrors({ general: "This step could not be completed. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBack = () => {
        if (currentStep === 1) {
            router.push(backHref);
            return;
        }

        setUrlForm(form, (currentStep - 1) as StatementGenerationStep, "push");
    };

    const handleGenerate = async () => {
        const validationErrors = validateStep(4, form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            setErrors({});
            await onGenerateStatement?.(form, selectedLoads);
            setUrlForm(form, "preview", "push");
        } catch {
            setErrors({ general: "Statement generation failed. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleLoad = (loadId: string) => {
        const selectedLoadIds = form.selectedLoadIds.includes(loadId)
            ? form.selectedLoadIds.filter((selectedLoadId) => selectedLoadId !== loadId)
            : [...form.selectedLoadIds, loadId];

        updateForm({ ...form, selectedLoadIds });
    };

    const handleDownloadReport = () => {
        const totalRevenue = selectedLoads.reduce((total, load) => total + load.amount, 0);
        const lines = [
            "Weekly Statement",
            `Statement Type: ${form.statementType === "carrier" ? "Carrier" : "Driver"}`,
            `Carrier: ${carrierName || "N/A"}`,
            `Driver: ${driverName || "N/A"}`,
            `Period: ${form.startDate} - ${form.endDate}`,
            `Total Loads: ${selectedLoads.length}`,
            `Total Revenue: ${formatStatementCurrency(totalRevenue)}`,
            "",
            ...selectedLoads.map((load) =>
                `${load.id} | ${load.route} | ${load.dateRange} | ${formatStatementCurrency(load.amount)}`,
            ),
        ];

        downloadStatementTextFile("weekly-statement.txt", lines.join("\n"), "text/plain;charset=utf-8");
    };

    if (isPreview) {
        return (
            <div className="min-h-[calc(100vh-120px)] bg-[#F8FAFC] px-2 py-8">
                <GeneratedStatementReport
                    form={form}
                    selectedLoads={selectedLoads}
                    carrierName={carrierName}
                    driverName={driverName}
                    onClose={() => router.push(backHref)}
                    onDownload={handleDownloadReport}
                />
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#F8FAFC] px-2 py-8">
            <section className="w-full max-w-[860px] rounded-[22px] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,40,0.18)] sm:p-8">
                <h1 className="text-center text-2xl font-semibold tracking-[-0.02em] text-[#101828]">
                    Generate Statement
                </h1>
                <div className="mt-8">
                    <GenerateStatementStepper currentStep={currentStep} />
                </div>

                <div className="mt-8">
                    {currentStep === 1 ? (
                        <StatementTypeStep
                            form={form}
                            carrierOptions={carrierOptions}
                            driverOptions={driverOptions}
                            errors={errors}
                            onChange={updateForm}
                        />
                    ) : null}

                    {currentStep === 2 ? (
                        <StatementPeriodStep
                            form={form}
                            errors={errors}
                            onChange={updateForm}
                        />
                    ) : null}

                    {currentStep === 3 ? (
                        <StatementLoadSelectionStep
                            loads={dataset.loadOptions}
                            selectedLoadIds={form.selectedLoadIds}
                            error={errors.selectedLoadIds}
                            onSelectAll={() =>
                                updateForm({
                                    ...form,
                                    selectedLoadIds: dataset.loadOptions.map((load) => load.id),
                                })
                            }
                            onClearAll={() => updateForm({ ...form, selectedLoadIds: [] })}
                            onToggleLoad={toggleLoad}
                        />
                    ) : null}

                    {currentStep === 4 ? (
                        <StatementReviewStep
                            form={form}
                            selectedLoads={selectedLoads}
                            carrierName={carrierName}
                            driverName={driverName}
                        />
                    ) : null}
                </div>

                {errors.general ? (
                    <p className="mt-5 rounded-lg bg-[#FEF3F2] px-4 py-3 text-sm font-medium text-[#D92D20]">
                        {errors.general}
                    </p>
                ) : null}

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={goBack}
                            disabled={isSubmitting}
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-[#D7DDE8] bg-white px-5 text-base font-semibold text-[#252E78] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Back
                        </button>
                    ) : null}
                    <button
                        type="button"
                        onClick={() => {
                            if (currentStep === 4) {
                                void handleGenerate();
                                return;
                            }

                            void submitStep(currentStep);
                        }}
                        disabled={isSubmitting}
                        className={[
                            "inline-flex h-12 items-center justify-center rounded-lg bg-[#2E3A83] px-5 text-base font-semibold text-white transition hover:bg-[#25306F] disabled:cursor-not-allowed disabled:opacity-50",
                            currentStep === 1 ? "sm:col-span-2" : "",
                        ].join(" ")}
                    >
                        {currentStep === 4 ? "Generate Statement" : "Next"}
                    </button>
                </div>
            </section>
        </div>
    );
}
