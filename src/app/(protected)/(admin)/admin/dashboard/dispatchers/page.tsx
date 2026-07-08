import DispatchersManagementContainer from "@/src/components/admin/dispatchers-management/DispatchersManagementContainer";



export default function AdminDispatchersPage() {
  return (
    <div className="w-full">
      <DispatchersManagementContainer detailBaseHref="/admin/dashboard/dispatchers" />
    </div>
  );
}
