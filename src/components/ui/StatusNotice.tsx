"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";

type StatusNoticeProps = {
  variant: "success" | "error";
  message: string;
  title?: string;
  className?: string;
};

export default function StatusNotice({
  variant,
  message,
  title,
  className = "",
}: StatusNoticeProps) {
  const isSuccess = variant === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertTriangle;

  return (
    <div
      className={[
        "overflow-hidden rounded-[16px] border px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]",
        isSuccess
          ? "border-[#D5E8C7] bg-[linear-gradient(180deg,#F7FCF1_0%,#EEF8E4_100%)]"
          : "border-[#F0D2D2] bg-[linear-gradient(180deg,#FFF8F8_0%,#FFF1F1_100%)]",
        className,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
            isSuccess ? "bg-[#E1F2D0] text-[#355724]" : "bg-[#FFE2E2] text-[#B53636]",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={[
              "text-[13px] font-semibold uppercase tracking-[0.16em]",
              isSuccess ? "text-[#557043]" : "text-[#AE5A5A]",
            ].join(" ")}
          >
            {title || (isSuccess ? "Success" : "Something went wrong")}
          </p>
          <p className="mt-1 text-[14px] leading-6 text-[#374034]">{message}</p>
        </div>
      </div>
    </div>
  );
}
