"use client";

import PageBreadcrumb from "../../common/PageBreadCrumb";
import SettingsSidebar from "./SettingsSidebar";


export default function SettingsShell({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full flex flex-col gap-6">
            <div>
                <PageBreadcrumb
                    pageTitle="Profile Settings"
                    pageDescription="Changes to your profile will apply to all of your workspaces."
                    breadcrumbs={[
                        { label: "Dashboard", href: "/user/dashboard" },
                        { label: "Settings", href: "/user/dashboard/settings" },
                        { label: "Profile" },
                    ]}
                />

            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-[230px_1fr] xl:grid-cols-[250px_1fr] gap-4 lg:gap-6">
                <SettingsSidebar />
                <div className="w-full rounded-xl">
                    {children}
                </div>
            </div>
        </section>
    );
}
