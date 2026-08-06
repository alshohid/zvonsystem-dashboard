import SettingsContainer from "@/src/components/admin/settings/SettingsContainer";
import { ProfileSettingsSkeleton } from "@/src/components/admin/settings/SettingsSkeletons";
import { Suspense } from "react";

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={<ProfileSettingsSkeleton />}>
      <SettingsContainer />
    </Suspense>
  );
}
