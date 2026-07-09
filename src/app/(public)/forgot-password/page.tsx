import ForgotPassword from "@/src/sharedComponents/auth/forgot-password";
import { Suspense } from "react";

const ForgotPasswordFallback = () => {
  return (
    <div className="box-border h-[100dvh] overflow-hidden bg-[#eef8f2] px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto flex h-full w-full flex-col overflow-hidden rounded-[30px] p-3 sm:p-4 lg:p-5">
        <div className="grid h-full min-h-0 flex-1 gap-4">
          <section className="flex min-h-0 items-center justify-center rounded-[26px] px-6 py-8 sm:px-8 lg:px-10">
            <div className="w-full space-y-7">
              <div className="mx-auto h-12 w-24 rounded-xl bg-[#d9efe4]" />
              <div className="space-y-3">
                <div className="mx-auto h-6 w-44 rounded-full bg-[#d9efe2]" />
                <div className="mx-auto h-4 w-64 rounded-full bg-[#e3f2ea]" />
                <div className="mx-auto h-4 w-48 rounded-full bg-[#e3f2e7]" />
              </div>
              <div className="space-y-4">
                <div className="h-[50px] rounded-[12px] bg-white" />
                <div className="h-[52px] rounded-[14px] bg-[#ace097]" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordFallback />}>
      <ForgotPassword />
    </Suspense>
  );
}
