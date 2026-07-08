import Login from "@/src/sharedComponents/auth/login";
import { Suspense } from "react";

const LoginFallback = () => {
  return (
    <div className="box-border h-[100dvh] overflow-hidden bg-[#EEF2F8] px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto grid h-full max-w-[1560px] gap-4 rounded-[30px] border border-[#DDE3F0] bg-white p-3 shadow-[0_30px_90px_rgba(46,58,131,0.16)] lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] sm:p-4 lg:p-5">
        <div className="flex min-h-0 items-center justify-center rounded-[26px] border border-[#EDF1F7] bg-white px-6 py-8 sm:px-8 lg:px-10">
          <div className="w-full max-w-[338px] space-y-5">
            <div className="mx-auto h-12 w-28 rounded-full bg-[#E8EEFF]" />
            <div className="space-y-3 text-center">
              <div className="mx-auto h-9 w-44 rounded-full bg-[#F1F4FC]" />
              <div className="mx-auto h-4 w-64 rounded-full bg-[#F6F8FD]" />
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-[76px] rounded-[18px] bg-[#F8FAFE]" />
              <div className="h-[76px] rounded-[18px] bg-[#F8FAFE]" />
              <div className="h-[52px] rounded-[14px] bg-[#D6DEFB]" />
              <div className="h-[50px] rounded-[14px] bg-[#EEF2FA]" />
            </div>
          </div>
        </div>

        <div className="hidden min-h-0 rounded-[26px] border border-[#DDE4F2] bg-[linear-gradient(180deg,#E5F8FF_0%,#A9DCF8_38%,#F7FBFF_100%)] lg:block" />
      </div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <Login />
    </Suspense>
  );
}
