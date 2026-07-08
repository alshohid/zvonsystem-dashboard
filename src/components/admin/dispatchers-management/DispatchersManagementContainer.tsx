"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PendingInvitation, {
    type PendingInvitationRecord,
} from "./PendingInvitation";
import DispatchersTableSection, {
    type DispatcherRecord,
} from "./DispatchersTableSection";
import InviteDispatcherModal from "./InviteDispatcherModal";
import { useModal } from "@/src/hooks/useModal";

const PAGE_SIZE = 6;

const INITIAL_PENDING_INVITATIONS: PendingInvitationRecord[] = [
    {
        id: "invite-1",
        email: "demo@gmail.com",
        sentAtLabel: "Sent 7 April, 2026",
        inviteUrl: "https://reedsexpress.com/invite/dispatcher/invite-1",
    },
    {
        id: "invite-2",
        email: "demo@gmail.com",
        sentAtLabel: "Sent 7 April, 2026",
        inviteUrl: "https://reedsexpress.com/invite/dispatcher/invite-2",
    },
    {
        id: "invite-3",
        email: "demo@gmail.com",
        sentAtLabel: "Sent 7 April, 2026",
        inviteUrl: "https://reedsexpress.com/invite/dispatcher/invite-3",
    },
];

const DISPATCHERS: DispatcherRecord[] = [
    {
        id: "02",
        name: "James Clark",
        email: "yourmail@gmail.com",
        carriers: 8,
        revenue: "$2544",
        status: "Active",
    },
    {
        id: "03",
        name: "Rodrigue",
        email: "yourmail@gmail.com",
        carriers: 4,
        revenue: "$2544",
        status: "Active",
    },
    {
        id: "04",
        name: "Ronaldo",
        email: "yourmail@gmail.com",
        carriers: 2,
        revenue: "$2544",
        status: "Active",
    },
    {
        id: "05",
        name: "Sophia Turner",
        email: "yourmail@gmail.com",
        carriers: 7,
        revenue: "$2544",
        status: "Suspended",
    },
    {
        id: "06",
        name: "Liam Johnson",
        email: "yourmail@gmail.com",
        carriers: 5,
        revenue: "$2544",
        status: "Active",
    },
    {
        id: "07",
        name: "Olivia Smith",
        email: "yourmail@gmail.com",
        carriers: 3,
        revenue: "$2544",
        status: "Suspended",
    },
    {
        id: "08",
        name: "Ethan Walker",
        email: "ops.dispatch@gmail.com",
        carriers: 6,
        revenue: "$3210",
        status: "Active",
    },
    {
        id: "09",
        name: "Harper Reed",
        email: "support.dispatch@gmail.com",
        carriers: 4,
        revenue: "$2890",
        status: "Active",
    },
    {
        id: "10",
        name: "Noah Carter",
        email: "alerts.dispatch@gmail.com",
        carriers: 9,
        revenue: "$4180",
        status: "Suspended",
    },
    {
        id: "11",
        name: "Emma Davis",
        email: "emma.dispatch@gmail.com",
        carriers: 1,
        revenue: "$980",
        status: "Active",
    },
    {
        id: "12",
        name: "Lucas Brown",
        email: "lucas.dispatch@gmail.com",
        carriers: 11,
        revenue: "$5024",
        status: "Active",
    },
    {
        id: "13",
        name: "Mia Wilson",
        email: "mia.dispatch@gmail.com",
        carriers: 2,
        revenue: "$1440",
        status: "Suspended",
    },
];

function formatSentAtLabel(date: Date) {
    const parts = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).formatToParts(date);

    const day = parts.find((part) => part.type === "day")?.value ?? "";
    const month = parts.find((part) => part.type === "month")?.value ?? "";
    const year = parts.find((part) => part.type === "year")?.value ?? "";

    return `Sent ${day} ${month}, ${year}`;
}

type DispatchersManagementContainerProps = {
    detailBaseHref?: string;
};

export default function DispatchersManagementContainer({
    detailBaseHref,
}: DispatchersManagementContainerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [pendingInvitations, setPendingInvitations] = useState(
        INITIAL_PENDING_INVITATIONS,
    );
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const deferredQuery = useDeferredValue(query);
    const { isOpen, openModal, closeModal } = useModal(false);

    const normalizedQuery = deferredQuery.trim().toLowerCase();
    const resolvedDetailBaseHref = detailBaseHref
        ?? (pathname.startsWith("/super-admin")
            ? "/super-admin/dashboard/dispatcher-management"
            : "/admin/dashboard/dispatchers");

    const filteredDispatchers = useMemo(() => {
        return DISPATCHERS.filter((dispatcher) => {
            return (
                normalizedQuery.length === 0 ||
                dispatcher.name.toLowerCase().includes(normalizedQuery) ||
                dispatcher.email.toLowerCase().includes(normalizedQuery)
            );
        });
    }, [normalizedQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredDispatchers.length / PAGE_SIZE),
    );
    const currentPage = Math.min(page, totalPages);
    const paginatedDispatchers = filteredDispatchers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    );

    const handleDeleteInvitation = (invitationId: string) => {
        setPendingInvitations((currentInvitations) =>
            currentInvitations.filter(
                (invitation) => invitation.id !== invitationId,
            ),
        );
    };

    const handleInviteDispatcher = (email: string) => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            return;
        }

        setPendingInvitations((currentInvitations) => {
            const alreadyExists = currentInvitations.some(
                (invitation) => invitation.email.toLowerCase() === normalizedEmail,
            );

            if (alreadyExists) {
                return currentInvitations;
            }

            return [
                {
                    id: `invite-${Date.now()}`,
                    email: normalizedEmail,
                    sentAtLabel: formatSentAtLabel(new Date()),
                    inviteUrl: `https://reedsexpress.com/invite/dispatcher/${encodeURIComponent(
                        normalizedEmail,
                    )}`,
                },
                ...currentInvitations,
            ];
        });

        closeModal();
    };

    const handleViewDispatcher = (dispatcher: DispatcherRecord) => {
        router.push(`${resolvedDetailBaseHref}/${encodeURIComponent(dispatcher.id)}`);
    };

    return (
        <>
            <div className="flex flex-col gap-6">
                <PendingInvitation
                    invitations={pendingInvitations}
                    onDelete={handleDeleteInvitation}
                />

                <DispatchersTableSection
                    items={paginatedDispatchers}
                    query={query}
                    onQueryChange={(value) => {
                        setQuery(value);
                        setPage(1);
                    }}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredDispatchers.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={setPage}
                    onAddDispatcher={openModal}
                    onViewDispatcher={handleViewDispatcher}
                />
            </div>

            <InviteDispatcherModal
                isOpen={isOpen}
                onClose={closeModal}
                onInvite={handleInviteDispatcher}
            />
        </>
    );
}
