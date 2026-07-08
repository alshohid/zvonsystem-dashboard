
"use client"
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../../common/TopTabs";
import NotificationPreferences, { PrefItem, PrefKey } from "./NotificationPreference";
import { useMemo, useState } from "react";
import GenereralSettingContentSection from "./GeneralSettingContentSection";
import CommunicationSettingContentSection from "./CommunicationSettingContentSection";

type TabKey = "general-setting" | "communication-setting" | "notification-setting";
const tabs: TabItem<TabKey>[] = [
    { key: "general-setting", label: "General" },
    { key: "communication-setting", label: "Communication Settings" },
    { key: "notification-setting", label: "Notification Settings" },
];

export default function SettingsContainer() {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "general-setting");
    const items = useMemo<PrefItem[]>(
        () => [
            { key: "emailNotifications", title: "Email Notification", desc: "Get notified by email when a new update is available." },
            { key: "inAppNotifications", title: "In App Notification", desc: "Receive alerts directly inside the dashboard." },
            { key: "completedLoad", title: "Completed Load", desc: "Get notified whenever a load is marked as completed." },
            { key: "documentVerification", title: "Document Verification", desc: "Receive alerts when submitted documents are verified." },
            { key: "adminDocumentUpload", title: "Admin Document Upload", desc: "Get notified when an admin uploads a new document." },
            { key: "DocumentCertificationExpirationAlert", title: "Document/Certification Expiration Alert", desc: "Receive reminders before documents or certifications expire." },
        ],
        []
    );
    const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
        emailNotifications: false,
        inAppNotifications: true,
        completedLoad: true,
        documentVerification: true,
        adminDocumentUpload: false,
        DocumentCertificationExpirationAlert: true,
    });
    const handleSubmit = () => {
        console.log("submit", prefs);
    }
    const handleChange = (key: PrefKey, value: boolean) => {
        setPrefs(prev => ({ ...prev, [key]: value }))
    }
    return (
        <div>
            <div className="w-full">
                <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />
            </div>
            <div className="mt-6">
                {tab === "general-setting" && <GenereralSettingContentSection />}
                {tab === "communication-setting" && <CommunicationSettingContentSection />}
                {tab === "notification-setting" && (
                    <NotificationPreferences
                        items={items}
                        value={prefs}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitLabel="Update"
                    />
                )}
            </div>
        </div>
    );
}




















// "use client"

// import { GeneralSettingsIcon, NotificationIcon, SecurityIcon } from "@/src/icons";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import PageBreadcrumb from "../../common/PageBreadCrumb";
// import GenereralSettingContentSection from "./GeneralSettingContentSection";
// import NotificationContentSection from "./NotificationContentSection";
// import SecuritySection from "./SecuritySection";

// type TabType = "general" | "notification" | "security";

// interface TabConfig {
//     label: string;
//     icon: React.ReactNode;
//     title: string;
//     description: string;
//     content: React.ReactNode;
// }
// const tabConfig: Record<TabType, TabConfig> = {
//     general: {
//         label: "General Settings",
//         icon: <GeneralSettingsIcon />,
//         title: "General Settings",
//         description: "Configure core platform identity, accessibility, and global rules.",
//         content: (
//             <div className="mt-6 space-y-6">
//                 <div className="bg-[#1a1d2d] rounded-lg p-6 border border-gray-700">
//                     <h3 className="text-lg font-semibold text-white mb-4">Platform Settings</h3>
//                     <p className="text-gray-400">Configure your general platform settings here.</p>
//                 </div>
//             </div>
//         ),
//     },
//     notification: {
//         label: "Notification Settings",
//         icon: <NotificationIcon />,
//         title: "Notification Settings",
//         description: "Manage your administrative alert preferences across the Game Arena platform.",
//         content: (
//             <div className="mt-6 space-y-6">
//                 <div className="bg-[#1a1d2d] rounded-lg p-6 border border-gray-700">
//                     <h3 className="text-lg font-semibold text-white mb-4">Alert Preferences</h3>
//                     <p className="text-gray-400">Manage your administrative alert preferences across the Game Arena platform.</p>
//                 </div>
//             </div>
//         ),
//     },
//     security: {
//         label: "Security Settings",
//         icon: <SecurityIcon />,
//         title: "Security Settings",
//         description: "Manage session timeouts, authentication protocols, and access controls for administrators.",
//         content: (
//             <div className="mt-6 space-y-6">
//                 <div className="bg-[#1a1d2d] rounded-lg p-6 border border-gray-700">
//                     <h3 className="text-lg font-semibold text-white mb-4">Security Configuration</h3>
//                     <p className="text-gray-400">Manage session timeouts, authentication protocols, and access controls for administrators.</p>
//                 </div>
//             </div>
//         ),
//     },
// };
// const SettingsContainer = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [activeTab, setActiveTab] = useState<TabType>("general");

//     useEffect(() => {
//         const tabParam = searchParams.get("tab") as TabType;
//         if (tabParam && ["general", "notification", "security"].includes(tabParam)) {
//             setActiveTab(tabParam);
//         }
//     }, [searchParams]);

//     const handleTabChange = (tab: TabType) => {
//         setActiveTab(tab);
//         router.push(`?tab=${tab}`, { scroll: false });
//     };
//     const currentTab = tabConfig[activeTab];

//     const getButtonStyle = (tab: TabType) => {
//         const isActive = activeTab === tab;
//         return isActive
//             ? { background:  "linear-gradient(47deg, rgba(89, 82, 255, 0.6) 0%, rgba(31, 68, 249, 0.2) 100%)" }
//             : { background: "rgba(26, 29, 45, 0.5)" };
//     };

//     return (
//         <div className="w-full space-y-4">
//             <div className="w-full">
//                 <div className="flex items-center gap-1 p-1 rounded-md bg-[#2E3340] w-full overflow-x-auto">
//                     {(Object.keys(tabConfig) as TabType[]).map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => handleTabChange(tab)}
//                             className={`flex items-center gap-2 px-2 sm:px-3 md:px-5 py-2 sm:py-3 rounded-md font-medium text-[10px] sm:text-xs md:text-sm uppercase tracking-wide transition-all duration-200 flex-1 justify-center min-w-max sm:min-w-0 ${
//                                 activeTab === tab
//                                     ? "text-white shadow-sm"
//                                     : "text-gray-400 hover:text-gray-300"
//                             }`}
//                             style={getButtonStyle(tab)}
//                         >
//                             {tabConfig[tab].icon}
//                             <span className="hidden sm:inline whitespace-nowrap">{tabConfig[tab].label}</span>
//                             <span className="sm:hidden text-[9px] whitespace-nowrap">
//                                 {tab === "general" ? "General" : tab === "notification" ? "Notification" : "Security"}
//                             </span>
//                         </button>
//                     ))}
//                 </div>
//                 <div className="pt-3 md:pt-10 ">
//                     <PageBreadcrumb
//                         hideBreadCrumpOption={true}
//                         pageTitle={currentTab.title}
//                         pageDescription={currentTab.description}
//                     />
//                 </div>
//                 <div>
//                     {activeTab === "general" && <GenereralSettingContentSection />}
//                     {activeTab === "notification" && <NotificationContentSection />}
//                     {activeTab === "security" && <SecuritySection />}
//                 </div>
//             </div>

//         </div>
//     )
// }
// export default SettingsContainer
