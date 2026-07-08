"use client";

import AdminSupportChatProvider from "@/src/components/admin/support-chat/AdminSupportChatProvider";
import { useAdminSupportChat } from "@/src/hooks/useAdminSupportChat";
import DesktopCommunicationWorkspace from "./components/DesktopCommunicationWorkspace";
import MobileCommunicationWorkspace from "./components/MobileCommunicationWorkspace";

function DispatcherCommunicationWorkspace() {
    const communication = useAdminSupportChat();

    return (
        <>
            <DesktopCommunicationWorkspace {...communication} />
            <MobileCommunicationWorkspace {...communication} />
        </>
    );
}

export default function DispatcherCommunicationContainer() {
    return (
        <AdminSupportChatProvider>
            <DispatcherCommunicationWorkspace />
        </AdminSupportChatProvider>
    );
}
