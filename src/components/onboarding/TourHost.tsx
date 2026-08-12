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
  clearPendingTour,
  getActiveTourSession,
  getPendingTour,
  hasCompletedTour,
  markTourCompleted,
  saveActiveTourSession,
  setPendingTour,
} from "@/src/lib/onboarding/storage";

/**
 * Maps each dashboard role to the tour it should run. Roles without an
 * onboarding tour simply map to nothing.
 */
const ROLE_TO_TOUR: Partial<Record<DashboardRole, TourKey>> = {
  admin: "admin",
  "super-admin": "super-admin",
};

type TourHostProps = {
  role: DashboardRole;
};

/**
 * Mounts inside `RoleDashboardShell`, which lives in the `(admin)` /
 * `(super-admin)` route group layouts. Because Next.js keeps the layout (and
 * therefore this component) mounted while you navigate between pages, it can
 * run one segment per route and hand off to the next page — a true multi-page
 * tour.
 */
export default function TourHost({ role }: TourHostProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "";

  const driverRef = useRef<Driver | null>(null);
  /** True while we are destroying the driver to navigate to another page. */
  const navigatingRef = useRef(false);

  // A state token that forces the effect to re-run on demand (e.g. the
  // "Resume tour" button when you're already on the start route).
  const [refreshToken, setRefreshToken] = useState(0);
  // Tracks whether a driver is on screen — used to hide the Resume button.
  const [isRunning, setIsRunning] = useState(false);

  const tourKey = ROLE_TO_TOUR[role];

  const stopDriver = useCallback(() => {
    if (!driverRef.current) return;
    // Suppress the completion callback: tearing down because the shell is
    // unmounting (e.g. logout) should not mark the tour as "completed".
    navigatingRef.current = true;
    driverRef.current.destroy();
    navigatingRef.current = false;
    driverRef.current = null;
  }, []);

  useEffect(() => {
    if (!tourKey) return;

    // Already finished (or explicitly skipped) — never bother this user again.
    if (hasCompletedTour(tourKey)) {
      clearActiveTourSession();
      clearPendingTour();
      return;
    }

    const definition = getTourDefinition(tourKey);

    if (!definition) return;

    // A driver is already on screen; don't double-start on re-renders.
    if (driverRef.current?.isActive()) return;

    // Decide whether this route should start (or resume) the tour.
    // The tour auto-shows on its own start route for anyone who hasn't
    // finished it yet, on a fresh login (pending flag), or when a multi-page
    // session is mid-flight.
    const pending = getPendingTour();
    const session = getActiveTourSession();
    const sessionNextIndex =
      session && session.tourKey === tourKey ? session.nextSegmentIndex : -1;
    const resumeFromSession = sessionNextIndex >= 0;
    const isOnStartRoute = pathname === definition.startRoute;

    const shouldStart =
      pending === tourKey || resumeFromSession || isOnStartRoute;

    if (!shouldStart) return;

    // On the start route (fresh login or visiting again) always begin at the
    // segment that belongs to the current page; otherwise continue a multi-page
    // tour exactly where it left off.
    const segmentIndex =
      resumeFromSession && !isOnStartRoute
        ? sessionNextIndex
        : resolveSegmentIndexForPath(definition, pathname);

    const segment = definition.segments[segmentIndex];

    if (!segment) {
      // Current page is not part of the tour — drop stale flags and wait.
      clearActiveTourSession();
      clearPendingTour();
      return;
    }

    // Only run a segment on its own route (wait for navigation first).
    if (pathname !== segment.route && !pathname.startsWith(`${segment.route}/`)) {
      return;
    }

    const driverObj = createTourDriver({
      steps: segment.steps,
      onStart: () => setIsRunning(true),
      onNavigate: (nextRoute) => {
        const nextSegmentIndex = resolveSegmentIndexForPath(definition, nextRoute);

        if (nextSegmentIndex < 0) {
          // The "next" target isn't part of this tour — finish the tour and
          // still take the user to the requested page.
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

        // Destroy before navigating; guard so completion isn't double-counted.
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

        // We destroyed this driver purely to jump to the next page — the tour
        // is still alive, so don't mark it completed here.
        if (navigatingRef.current) return;

        markTourCompleted(tourKey);
        clearActiveTourSession();
      },
    });

    driverRef.current = driverObj;
    driverObj.drive();

    // The pending flag is consumed the moment the tour actually starts.
    clearPendingTour();
  }, [pathname, refreshToken, router, tourKey]);

  // Clean up the driver if the shell ever unmounts.
  useEffect(() => {
    return stopDriver;
  }, [stopDriver]);

  // `useOnboardingTour` (and the resume button) dispatch this event to force
  // the effect to re-run even when the pathname hasn't changed.
  useEffect(() => {
    const onTrigger = () => setRefreshToken((token) => token + 1);
    window.addEventListener("zvn:tour-trigger", onTrigger);
    return () => window.removeEventListener("zvn:tour-trigger", onTrigger);
  }, []);

  const handleResume = useCallback(() => {
    if (!tourKey || hasCompletedTour(tourKey)) return;

    // Ensure the effect's start condition holds on this route, then kick it.
    setPendingTour(tourKey);
    window.dispatchEvent(new CustomEvent("zvn:tour-trigger"));
  }, [tourKey]);

  if (!tourKey) return null;

  const showResume = !hasCompletedTour(tourKey) && !isRunning;

  return (
    <>
      {showResume && (
        <button
          type="button"
          onClick={handleResume}
          className="fixed bottom-5 right-5 z-[900] inline-flex items-center gap-2 rounded-full bg-[#2E3A83] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#24306C]"
          aria-label="Resume onboarding tour"
        >
          <span aria-hidden>🚀</span> Resume tour
        </button>
      )}
    </>
  );
}
