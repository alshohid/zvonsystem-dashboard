"use client";

import { useState } from "react";
import Switch from "../../ui/switch/Switch";


type NotificationKey =
    | "depositConfirmation"
    | "withdrawalApproved"
    | "transactionFailed"
    | "roomStatusUpdates"
    | "matchResult"
    | "newLiveRooms"
    | "roomFillingStatus"
    | "newLoginActivity"
    | "profileOrPasswordChanges"
    | "platformAnnouncements";

type NotificationSection = {
    title: string;
    items: {
        key: NotificationKey;
        title: string;
        description: string;
    }[];
};

type SettingsState = Record<NotificationKey, boolean>;

export default function NotificationSettingsSection() {
    const [settings, setSettings] = useState<SettingsState>({
        depositConfirmation: true,
        withdrawalApproved: true,
        transactionFailed: true,
        roomStatusUpdates: true,
        matchResult: true,
        newLiveRooms: true,
        roomFillingStatus: false,
        newLoginActivity: true,
        profileOrPasswordChanges: true,
        platformAnnouncements: true,
    });

    const sections: NotificationSection[] = [
        {
            title: "Wallet & Transactions",
            items: [
                {
                    key: "depositConfirmation",
                    title: "Deposit Confirmation",
                    description: "Notify me when a deposit is received or confirmed.",
                },
                {
                    key: "withdrawalApproved",
                    title: "Withdrawal Approved / Rejected",
                    description: "Notify me when my withdrawal request is approved or rejected.",
                },
                {
                    key: "transactionFailed",
                    title: "Transaction Failed",
                    description: "Notify me if a wallet transaction fails.",
                },
            ],
        },
        {
            title: "Game & Match Activity",
            items: [
                {
                    key: "roomStatusUpdates",
                    title: "Room Status Updates",
                    description: "Notify me if a room is cancelled, closed, or updated.",
                },
                {
                    key: "matchResult",
                    title: "Match Result",
                    description: "Notify me when I win or lose a match.",
                },
            ],
        },
        {
            title: "Game Rooms",
            items: [
                {
                    key: "newLiveRooms",
                    title: "New Live Rooms",
                    description: "Notify me when new game rooms are available.",
                },
                {
                    key: "roomFillingStatus",
                    title: "Room Filling Status",
                    description: "Notify me when a room is almost full.",
                },
            ],
        },
        {
            title: "Account & Security",
            items: [
                {
                    key: "newLoginActivity",
                    title: "New Login Activity",
                    description: "Notify me when my account is accessed from a new device.",
                },
                {
                    key: "profileOrPasswordChanges",
                    title: "Profile or Password Changes",
                    description: "Notify me when account settings are updated.",
                },
            ],
        },
        {
            title: "System Notifications",
            items: [
                {
                    key: "platformAnnouncements",
                    title: "Platform Announcements",
                    description: "Notify me about maintenance, updates, or important notices.",
                },
            ],
        },
    ];

    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-[#18222A] px-6 py-6 sm:px-10 sm:py-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-white">Notification</h2>
                <p className="text-sm text-white/50">Configure email and mobile app notifications.</p>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex flex-col gap-4">
                {sections.map((sec) => (
                    <div key={sec.title} className="w-full rounded-lg border border-[#26344B] bg-[#0B111B]/40 px-4 py-4 sm:px-5 sm:py-5">
                        <p className="text-xs font-medium text-white/60">{sec.title}</p>

                        <div className="mt-3 flex flex-col">
                            {sec.items.map((item, idx) => (
                                <div key={item.key} className={`flex items-start justify-between gap-4 py-3 ${idx !== 0 ? "border-t border-white/10" : ""}`}>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-white/90">{item.title}</p>
                                        <p className="mt-1 text-xs text-white/50">{item.description}</p>
                                    </div>

                                    <div className="flex items-center gap-3 self-start sm:self-center">
                                        <Switch
                                            checked={settings[item.key]}
                                            onCheckedChange={(v) => setSettings((p) => ({ ...p, [item.key]: !!v }))}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
