import { Suspense } from "react";
import StatementGenerateContainer from "@/src/components/statements/generate/StatementGenerateContainer";
import { dispatcherStatementDataset } from "@/src/components/statements/statementMockData";

export default function GenerateDispatcherStatementPage() {
    return (
        <Suspense fallback={<div className="min-h-[calc(100vh-120px)] bg-[#F8FAFC]" />}>
            <StatementGenerateContainer
                dataset={dispatcherStatementDataset}
                backHref="/dispatcher/dashboard/statements"
            />
        </Suspense>
    );
}
