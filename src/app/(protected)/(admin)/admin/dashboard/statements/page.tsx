import StatementContainer from "@/src/components/statements/StatementContainer";
import { adminStatementDataset } from "@/src/components/statements/statementMockData";

export default function AdminStatementsPage() {
    return (
        <StatementContainer
            dataset={adminStatementDataset}
            generateHref="/admin/dashboard/statements/generate"
        />
    );
}
