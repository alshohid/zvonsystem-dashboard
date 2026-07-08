import { User, Lock, Bell, Trash2 } from "lucide-react";

export const settingsNav = [
    { label: "Profile", href: "/user/dashboard/all-settings/profile", icon: User },
    { label: "Change Password", href: "/user/dashboard/all-settings/change-password", icon: Lock },
    { label: "Notification", href: "/user/dashboard/all-settings/notification", icon: Bell },
    { label: "Delete Account", href: "/user/dashboard/all-settings/delete-account", icon: Trash2, danger: true },
];
