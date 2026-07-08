"use client";

import { SessionIcon } from "@/src/icons";
import SelectField from "../../ui/input/searchInput/SelectField";


const timeOptions = [
    { label: "15 minutes", value: "15" },
    { label: "30 minutes", value: "30" },
    { label: "1 hour", value: "60" },
    { label: "2 hours", value: "120" },
];

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const SessionManagementSection = ({ value, onChange }: Props) => {
    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-[#18222A] px-6 py-6 sm:px-10">
            {/* Header */}
            <div className="flex items-start gap-3">
                    <SessionIcon/>
                <div className="space-y-0.5">
                    <p className="text-sm font-medium text-white">
                        Session Management
                    </p>
                    <p className="text-xs text-white/50">
                        Control how long admin sessions remain active.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mt-4 rounded-lg border border-[#252528] bg-[rgba(8,14,30,0.6)] p-4 sm:p-6">
                <SelectField
                    label="Session Timeout (minutes)"
                    options={timeOptions}
                    placeholder="30 minutes"
                    value={value}
                    onChange={onChange}
                    wrapperClassName="w-full"
                    selectClassName="h-11 w-full bg-transparent border border-[#3A3A40] text-white"
                />

                <p className="mt-2 text-xs text-white/50">
                    Admins will be automatically logged out after this period of inactivity.
                </p>
            </div>
        </section>
    );
};

export default SessionManagementSection;
