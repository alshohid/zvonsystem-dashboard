import { useMemo, useState } from "react";
import NotificationPreferences, { PrefItem, PrefKey } from "../../admin/settings/NotificationPreference";

export default function EmailPreference() {
    const items: PrefItem[] = useMemo(
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
        console.log("submit");
    }
    const handleChange = (key: PrefKey, value: boolean) => {
        setPrefs(prev => ({ ...prev, [key]: value }))
    }
    return (
        <div>
            <NotificationPreferences
                items={items}
                value={prefs}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Update"
            />
        </div>
    );
}
