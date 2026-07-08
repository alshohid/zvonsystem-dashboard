"use client";

import { Check } from "lucide-react";
import { StatementGenerationStep } from "../statementTypes";

type GenerateStatementStepperProps = {
    currentStep: StatementGenerationStep;
};

const steps: StatementGenerationStep[] = [1, 2, 3, 4];

export default function GenerateStatementStepper({ currentStep }: GenerateStatementStepperProps) {
    return (
        <div className="mx-auto flex w-full max-w-[420px] items-center justify-center">
            {steps.map((step, index) => {
                const isCompleted = step < currentStep;
                const isActive = step === currentStep;

                return (
                    <div key={step} className="flex flex-1 items-center last:flex-none">
                        <div
                            className={[
                                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition",
                                isCompleted ? "bg-[#16A34A] text-white" : "",
                                isActive ? "bg-[#252E78] text-white" : "",
                                !isCompleted && !isActive ? "bg-[#E4E7EC] text-[#667085]" : "",
                            ].join(" ")}
                        >
                            {isCompleted ? <Check className="h-4 w-4" /> : step}
                        </div>
                        {index < steps.length - 1 ? (
                            <div
                                className={[
                                    "h-[2px] flex-1 transition",
                                    step < currentStep ? "bg-[#16A34A]" : "bg-[#E4E7EC]",
                                ].join(" ")}
                            />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
