import DispatcherDetailsContainer from "@/src/components/admin/dispatchers-management/DispatcherDetailsContainer";

type DispatcherDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function DispatcherDetailPage({
    params,
}: DispatcherDetailPageProps) {
    const { id } = await params;

    return (
        <DispatcherDetailsContainer
            dispatcherId={id}
            backHref="/admin/dashboard/dispatchers"
        />
    );
}
