"use client";

import { useMemo } from "react";
import {
  formatTodayHeading,
  getGreetingPeriod,
} from "@/src/components/design/dashboard/dashboardFormat";

type GreetingHeaderProps = {
  ownerName: string;
};

export default function GreetingHeader({ ownerName }: GreetingHeaderProps) {
  const { weekday, full, period } = useMemo(() => {
    const now = new Date();
    return { ...formatTodayHeading(now), period: getGreetingPeriod(now) };
  }, []);

  return (
    <div>
      <p className="text-sm text-[#667085]">
        {weekday}, {full}
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
        Good {period}, {ownerName}
      </h1>
    </div>
  );
}
