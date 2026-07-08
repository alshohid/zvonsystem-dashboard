import React from "react";
import FormField from "../../ui/input/FormField";

interface Settings {
    adminName: string;
    accountType: string;
    email: string;
    phone: string;
    siteTitle: string;
    supportEmail: string;
    timezone: string;
    dateFormat: string;
    maintenance: boolean;
}

interface SiteIdentitySectionProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const SiteIdentitySection: React.FC<SiteIdentitySectionProps> = ({ settings, setSettings }) => {
    return (
        <section className="rounded-2xl bg-gray-500 dark:bg-[#18222A] border border-white/10 p-6 md:p-8">
            <h3 className="text-white font-semibold text-lg mb-6">
                Site Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-gradient-to-b from-[#080E1E99] to-[#0d152b99]  p-4">
                    <FormField
                        name="siteTitle"
                        label="Site Title"
                        placeholder="Site title"
                        value={settings.siteTitle}
                        onChange={(e) => setSettings((p) => ({ ...p, siteTitle: e.target.value }))}
                        hint="Displayed in browser tabs."
                    />
                </div>

                <div className="rounded-xl bg-gradient-to-b  from-[#080E1E99] to-[#0d152b99]  p-4">
                    <FormField
                        name="supportEmail"
                        type="email"
                        label="Support Email"
                        placeholder="Support email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings((p) => ({ ...p, supportEmail: e.target.value }))}
                        hint="Used for system alerts and user support."
                    />
                </div>
            </div>
        </section>
    );
};

export default SiteIdentitySection;
