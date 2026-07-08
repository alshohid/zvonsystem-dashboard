"use client";

import { useState } from "react";
import TextInputField from "@/src/components/ui/input/TextInputField";

type CommunicationSettingsForm = {
  fromName: string;
  fromEmailAddress: string;
  smtpHost: string;
  smtpPort: string;
  username: string;
  passwordOrApiKey: string;
};

const initialSettings: CommunicationSettingsForm = {
  fromName: "",
  fromEmailAddress: "",
  smtpHost: "",
  smtpPort: "",
  username: "",
  passwordOrApiKey: "",
};

const textFieldClassName =
  "h-12 rounded-[12px] border border-[#D0D5DD] bg-white px-4 text-[1rem] text-[#101828]! placeholder:text-[#98A2B3] focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10";

export default function CommunicationSettingContentSection() {
  const [settings, setSettings] =
    useState<CommunicationSettingsForm>(initialSettings);

  const handleFieldChange =
    (field: keyof CommunicationSettingsForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSettings((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <section className="rounded-[1.75rem] border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
      <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
        Edit Configuration
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <TextInputField
          label="From Name"
          placeholder="From Name"
          value={settings.fromName}
          onChange={handleFieldChange("fromName")}
          inputClassName={textFieldClassName}
        />

        <TextInputField
          label="From Email Address"
          placeholder="From Email Address"
          value={settings.fromEmailAddress}
          onChange={handleFieldChange("fromEmailAddress")}
          inputClassName={textFieldClassName}
        />

        <TextInputField
          label="SMTP Host"
          placeholder="SMTP Host"
          value={settings.smtpHost}
          onChange={handleFieldChange("smtpHost")}
          inputClassName={textFieldClassName}
        />

        <TextInputField
          label="SMTP Port"
          placeholder="SMTP Port"
          value={settings.smtpPort}
          onChange={handleFieldChange("smtpPort")}
          inputClassName={textFieldClassName}
        />

        <TextInputField
          label="Username"
          placeholder="Username"
          value={settings.username}
          onChange={handleFieldChange("username")}
          inputClassName={textFieldClassName}
        />

        <TextInputField
          label="Password / API Key"
          type="password"
          placeholder="Password / API Key"
          value={settings.passwordOrApiKey}
          onChange={handleFieldChange("passwordOrApiKey")}
          inputClassName={textFieldClassName}
        />
      </div>
    </section>
  );
}
