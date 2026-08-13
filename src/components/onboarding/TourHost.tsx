"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Driver } from "driver.js";
import type { DashboardRole } from "@/src/lib/sidebarConfig";
import type { TourKey } from "@/src/types/onboarding";
import { createTourDriver } from "@/src/lib/onboarding/driver";
import {
  getTourDefinition,
  resolveSegmentIndexForPath,
} from "@/src/lib/onboarding/registry";
import {
  clearActiveTourSession,
  clearCompletedTour,
  clearPendingTour,
  getActiveTourSession,
  getPendingTour,
  hasCompletedTour,
  markTourCompleted,
  saveActiveTourSession,
  setPendingTour,
} from "@/src/lib/onboarding/storage";

const ROLE_TO_TOUR: Partial<Record<DashboardRole, TourKey>> = {
  admin: "admin",
  "super-admin": "super-admin",
};

type TourHostProps = {
  role: DashboardRole;
};


export default function TourHost({ role }: TourHostProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const driverRef = useRef<Driver | null>(null);
  const navigatingRef = useRef(false);
  const [refreshToken, setRefreshToken] = useState(0)
  const [isRunning, setIsRunning] = useState(false);

  const tourKey = ROLE_TO_TOUR[role];

  const stopDriver = useCallback(() => {
    if (!driverRef.current) return;
    navigatingRef.current = true;
    driverRef.current.destroy();
    navigatingRef.current = false;
    driverRef.current = null;
  }, []);

  useEffect(() => {
    if (!tourKey) return;
    if (hasCompletedTour(tourKey)) {
      clearActiveTourSession();
      clearPendingTour();
      return;
    }

    const definition = getTourDefinition(tourKey);

    if (!definition) return;

    if (driverRef.current?.isActive()) return;

    const pending = getPendingTour();
    const session = getActiveTourSession();
    const sessionNextIndex =
      session && session.tourKey === tourKey ? session.nextSegmentIndex : -1;
    const resumeFromSession = sessionNextIndex >= 0;
    const isOnStartRoute = pathname === definition.startRoute;

    const shouldStart =
      pending === tourKey || resumeFromSession || isOnStartRoute;

    if (!shouldStart) return;

    const segmentIndex =
      resumeFromSession && !isOnStartRoute
        ? sessionNextIndex
        : resolveSegmentIndexForPath(definition, pathname);

    const segment = definition.segments[segmentIndex];

    if (!segment) {
      clearActiveTourSession();
      clearPendingTour();
      return;
    }

    if (pathname !== segment.route && !pathname.startsWith(`${segment.route}/`)) {
      return;
    }

    const driverObj = createTourDriver({
      steps: segment.steps,
      onStart: () => setIsRunning(true),
      onNavigate: (nextRoute) => {
        const nextSegmentIndex = resolveSegmentIndexForPath(definition, nextRoute);

        if (nextSegmentIndex < 0) {
          navigatingRef.current = true;
          driverObj.destroy();
          navigatingRef.current = false;
          driverRef.current = null;
          setIsRunning(false);
          markTourCompleted(tourKey);
          clearActiveTourSession();
          router.push(nextRoute);
          return;
        }

        saveActiveTourSession({
          tourKey,
          nextSegmentIndex,
          startedAt: Date.now(),
        });

        navigatingRef.current = true;
        driverObj.destroy();
        navigatingRef.current = false;
        driverRef.current = null;
        setIsRunning(false);

        router.push(nextRoute);
      },
      onComplete: () => {
        driverRef.current = null;
        setIsRunning(false);

        if (navigatingRef.current) return;

        markTourCompleted(tourKey);
        clearActiveTourSession();
      },
    });

    driverRef.current = driverObj;
    driverObj.drive();


    clearPendingTour();
  }, [pathname, refreshToken, router, tourKey]);

  useEffect(() => {
    return stopDriver;
  }, [stopDriver]);

  useEffect(() => {
    const onTrigger = () => setRefreshToken((token) => token + 1);
    window.addEventListener("zvn:tour-trigger", onTrigger);
    return () => window.removeEventListener("zvn:tour-trigger", onTrigger);
  }, []);

  const handleResume = useCallback(() => {
    if (!tourKey) return;

    clearCompletedTour(tourKey);

    const definition = getTourDefinition(tourKey);
    if (!definition) return;

    const session = getActiveTourSession();

    if (
      session &&
      session.tourKey === tourKey &&
      session.nextSegmentIndex >= 0 &&
      session.nextSegmentIndex < definition.segments.length
    ) {
      const segment = definition.segments[session.nextSegmentIndex];
      if (segment && pathname !== segment.route) {
        router.replace(segment.route);
        return;
      }
    } else {
      clearActiveTourSession();
      saveActiveTourSession({
        tourKey,
        nextSegmentIndex: 0,
        startedAt: Date.now(),
      });
      if (pathname !== definition.startRoute) {
        router.replace(definition.startRoute);
        return;
      }
    }

    setPendingTour(tourKey);
    window.dispatchEvent(new CustomEvent("zvn:tour-trigger"));
  }, [tourKey, router, pathname]);

  if (!tourKey) return null;

  const showResume = !isRunning;

  return (
    <>
      {showResume && (
        <button
          type="button"
          onClick={handleResume}
          className="fixed items-center bottom-1 right-5 z-[900] inline-flex items-center gap-2 rounded-full bg-[#3d415d] px-[.67rem] py-[.4rem] text-xs font-semibold text-white shadow-lg transition hover:bg-[#535875]"
          aria-label="Resume onboarding tour"
        >
          <span aria-hidden className="text-xs w-3 h-3 ">🚀</span> Resume tour
        </button>
      )}
    </>
  );
}
