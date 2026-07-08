import AdminDocumentsContainer from "@/src/components/admin/documents/AdminDocumentsContainer";
import { Suspense } from "react";

export default function SuperAdminDocumentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDocumentsContainer />
    </Suspense>
  );
}
