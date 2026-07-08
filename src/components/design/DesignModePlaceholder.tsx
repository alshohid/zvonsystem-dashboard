"use client";

import Link from "next/link";
import { ArrowRight, LayoutTemplate, Layers3 } from "lucide-react";

type DesignModePlaceholderProps = {
  title: string;
  dashboardHref?: string;
};

export default function DesignModePlaceholder({
  title,
  dashboardHref = "/admin/dashboard",
}: DesignModePlaceholderProps) {
  return (
    <section className="rounded-[28px] border border-[#E3E8F7] bg-white p-6 shadow-[0_18px_50px_rgba(46,58,131,0.08)] sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D6DEFB] bg-[#F5F7FF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#2E3A83]">
            <Layers3 size={14} />
            Design Mode
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#111827] sm:text-[2rem]">
              {title}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#667085] sm:text-base">
              This screen is intentionally parked while API integration is
              disabled. The Redux and RTK Query setup remains in place, so your
              next project can plug in its own backend without reworking the app
              structure.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E7EBF8] bg-[#FAFBFF] p-4">
              <p className="text-sm font-semibold text-[#2E3A83]">
                Ready For New API Mapping
              </p>
              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Existing routes, layouts, Redux store, and RTK Query wiring are
                kept so new integrations can be dropped in cleanly.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7EBF8] bg-[#FAFBFF] p-4">
              <p className="text-sm font-semibold text-[#2E3A83]">
                Safe For UI Work
              </p>
              <p className="mt-2 text-sm leading-6 text-[#667085]">
                No live backend calls run here in design mode, so you can keep
                shaping pages without depending on any old environment.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#E3E8F7] bg-[linear-gradient(180deg,#FFFFFF_0%,#F6F8FF_100%)] p-5 shadow-[0_14px_40px_rgba(46,58,131,0.08)] lg:max-w-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#2E3A83]">
            <LayoutTemplate size={22} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-[#111827]">
            Continue With The New Dashboard
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Use the dashboard as the base visual system, then connect new pages
            one by one when your new backend contract is ready.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <Link
              href={dashboardHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2E3A83] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#24306C]"
            >
              Open Dashboard
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-[#D7DDF2] px-4 py-3 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F7F8FE]"
            >
              Back To Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
