import StatementContainer from "@/src/components/statements/StatementContainer";
import { dispatcherStatementDataset } from "@/src/components/statements/statementMockData";

export default function DispatcherStatementsPage() {
    return (
        <StatementContainer
            dataset={dispatcherStatementDataset}
            generateHref="/dispatcher/dashboard/statements/generate"
        />
    );
}
