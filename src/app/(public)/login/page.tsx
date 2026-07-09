import LoginFallback from "@/src/components/LoginFallback";
import Login from "@/src/sharedComponents/auth/login";
import { Suspense } from "react";



export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <Login />
    </Suspense>
  );
}
