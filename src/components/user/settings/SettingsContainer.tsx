"use client"
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../../common/TopTabs";
import Profile from "./Profile";
import SubscriptionTab from "./SubscriptionTab";
import EmailPreference from "./EmailPreference";
import Security from "./Security";
type TabKey = "profile" | "subscription" | "email-preference" | "security";
const tabs: TabItem<TabKey>[] = [
    { key: "profile", label: "Profile" },
    { key: "subscription", label: "Subscription & Billing" },
    { key: "email-preference", label: "Email Preferences" },
    { key: "security", label: "Security & Password" }

];
export default function SettingsContainer() {
    const [activeKey, setActiveKey] = useTabsQueryState<TabKey>("tab", "profile");
    return (
        <div className="space-y-6 w-full">
            <TopTabs tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />
            {activeKey === "profile" && <Profile />}
            {activeKey === "subscription" && <SubscriptionTab />}
            {activeKey === "email-preference" && <EmailPreference />}
            {activeKey === "security" && <Security />}
        </div>
    );
}