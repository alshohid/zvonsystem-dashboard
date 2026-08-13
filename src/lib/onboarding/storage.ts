import type { ActiveTourSession, TourKey } from "@/src/types/onboarding";

/**
 * Small, framework-agnostic persistence layer for tour state.
 *
 * - `completed` lives in **localStorage**, so it survives full restarts and
 *   prevents the tour from auto-starting again. It can be cleared on demand
 *   (e.g. via the "Resume tour" button) to let the user re-watch the tour.
 * - `pending` lives in **sessionStorage**, so a hard refresh keeps it (tour
 *   survives a refresh right after login) but a fresh browser session clears
 *   it automatically.
 * - the in-progress `active session` lives in **localStorage** so a multi-page
 *   tour keeps its place across page navigations and refreshes.
 */

const COMPLETED_PREFIX = "zvn-tour-completed";
const ACTIVE_SESSION_KEY = "zvn-tour-active";
const PENDING_KEY = "zvn-tour-pending";

const isBrowser = () => typeof window !== "undefined";

/** True once the user finished or explicitly skipped this tour. */
export const hasCompletedTour = (tourKey: TourKey): boolean =>
  isBrowser() &&
  window.localStorage.getItem(`${COMPLETED_PREFIX}:${tourKey}`) === "true";

export const markTourCompleted = (tourKey: TourKey): void => {
  if (!isBrowser()) return;
  window.localStorage.setItem(`${COMPLETED_PREFIX}:${tourKey}`, "true");
};

/** Clears the "completed" flag so the tour can be re-watched on demand. */
export const clearCompletedTour = (tourKey: TourKey): void => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(`${COMPLETED_PREFIX}:${tourKey}`);
};

export const getActiveTourSession = (): ActiveTourSession | null => {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(ACTIVE_SESSION_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw) as ActiveTourSession;

    if (!parsed?.tourKey || typeof parsed.nextSegmentIndex !== "number") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const saveActiveTourSession = (session: ActiveTourSession): void => {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
};

export const clearActiveTourSession = (): void => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACTIVE_SESSION_KEY);
};

/**
 * A "pending" flag is set right after a successful login and tells the tour
 * host to begin the matching tour on the landing page.
 */
export const getPendingTour = (): TourKey | null => {
  if (!isBrowser()) return null;

  const value = window.sessionStorage.getItem(PENDING_KEY);

  return value === "admin" || value === "super-admin" ? value : null;
};

export const setPendingTour = (tourKey: TourKey): void => {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(PENDING_KEY, tourKey);
};

export const clearPendingTour = (): void => {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(PENDING_KEY);
};
