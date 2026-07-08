import DispatcherDetailsContainer from "@/src/components/admin/dispatchers-management/DispatcherDetailsContainer";

type DispatcherManagementDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function DispatcherManagementDetailPage({
    params,
}: DispatcherManagementDetailPageProps) {
    const { id } = await params;

    return (
        <DispatcherDetailsContainer
            dispatcherId={id}
            backHref="/super-admin/dashboard/dispatcher-management"
        />
    );
}
