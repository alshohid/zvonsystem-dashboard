"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { TourKey } from "@/src/types/onboarding";
import { getTourDefinition } from "@/src/lib/onboarding/registry";
import {
  clearActiveTourSession,
  hasCompletedTour,
  markTourCompleted,
  saveActiveTourSession,
  setPendingTour,
} from "@/src/lib/onboarding/storage";

export const useOnboardingTour = (tourKey: TourKey) => {
  const router = useRouter();

  const completed = hasCompletedTour(tourKey);

  const startTour = useCallback(() => {
    const definition = getTourDefinition(tourKey);

    if (!definition) return;

    clearActiveTourSession();
    saveActiveTourSession({
      tourKey,
      nextSegmentIndex: 0,
      startedAt: Date.now(),
    });

    setPendingTour(tourKey);
    window.dispatchEvent(new CustomEvent("zvn:tour-trigger"));

    if (window.location.pathname !== definition.startRoute) {
      router.replace(definition.startRoute);
    }
  }, [router, tourKey]);

  const skipTour = useCallback(() => {
    markTourCompleted(tourKey);
    clearActiveTourSession();
  }, [tourKey]);

  return {
    completed,
    canResume: !completed,
    startTour,
    skipTour,
  };
};
