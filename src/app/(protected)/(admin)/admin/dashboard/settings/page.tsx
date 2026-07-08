import SettingsContainer from "@/src/components/admin/settings/SettingsContainer";
import { Suspense } from "react";

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContainer />
    </Suspense>
  );
}
