import StatementContainer from "@/src/components/statements/StatementContainer";
import { adminStatementDataset } from "@/src/components/statements/statementMockData";

export default function SuperAdminStatementsPage() {
    return (
        <StatementContainer
            dataset={adminStatementDataset}
            generateHref="/super-admin/dashboard/statements/generate"
        />
    );
}
