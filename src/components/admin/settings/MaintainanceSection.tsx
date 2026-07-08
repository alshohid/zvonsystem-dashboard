"use client";

import React from "react";
import Switch from "../../ui/switch/Switch";

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

interface MaintainanceSectionProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const Maintainance: React.FC<MaintainanceSectionProps> = ({ settings, setSettings }) => {
    return (
        <section className="flex flex-col items-start gap-4 w-full rounded-xl border border-[#26344B] bg-[#18222A] p-4 sm:p-6">
            <h3 className="text-white font-semibold text-lg">
                Maintenance Mode
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full rounded-xl bg-[#080E1E99] p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-white">
                        Maintenance Mode
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed">
                        Temporarily disable access for all users. Users will see a
                        maintenance notice.
                    </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                    <Switch 
                        checked={settings.maintenance || false} 
                        onCheckedChange={(v) => setSettings((p) => ({ ...p, maintenance: !!v }))} 
                    />
                </div>
            </div>
        </section>
    );
};

export default Maintainance;

