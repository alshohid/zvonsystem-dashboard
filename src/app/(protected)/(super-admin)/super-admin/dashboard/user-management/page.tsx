import { Suspense } from "react";
import UserManagementContainer from "@/src/components/superAdmin/userManagement/UserManagementContainer";

export default function UserManagementPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserManagementContainer />
        </Suspense>
    );
}
