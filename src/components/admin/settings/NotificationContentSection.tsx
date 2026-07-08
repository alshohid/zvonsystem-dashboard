import { useState } from "react";
import MaintenanceToggleCard from "./MaintenanceToggleCard";

export default function NotificationContentSection() {
    const [registrationSettings, setRegistrationSetting] = useState(false);
    const [withdrawalRequests, setWithdrawalRequests] = useState(true);
    const [roomStatusUpdates, setRoomStatusUpdates] = useState(true);
    const [platformAnnouncements, setPlatformAnnouncements] = useState(false);

    return (
        <div className="space-y-6 w-full">
            <div className="dark:bg-[#18222A] p-6 md:p-10 flex flex-col gap-6 rounded-md">
                <MaintenanceToggleCard
                    title="Registration Disabled"
                    description="Receive a notification every time a new player joins the arena."
                    checked={registrationSettings}
                    onChange={(v) => setRegistrationSetting(v)}
                />
                <MaintenanceToggleCard
                    title="Withdrawal Requests"
                    description="Receive a notification every withdrawal requests."
                    checked={withdrawalRequests}
                    onChange={(v) => setWithdrawalRequests(v)}
                />
                <MaintenanceToggleCard
                    title="Room Status Updates"
                    description="Notify about new game room creation."
                    checked={roomStatusUpdates}
                    onChange={(v) => setRoomStatusUpdates(v)}
                />
                <MaintenanceToggleCard
                    title="Platform Announcements"
                    description="Notify about maintenance, updates, or important notices."
                    checked={platformAnnouncements}
                    onChange={(v) => setPlatformAnnouncements(v)}
                />
            </div>
        </div>
    );
}