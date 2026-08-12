import type { DriveStep } from "driver.js";

/**
 * Logical name of a multi-page onboarding tour. Keys match the "completed"
 * storage flag so each tour only ever runs until the user finishes or skips it.
 */
export type TourKey = "admin" | "super-admin";

/**
 * A single Driver.js step that may optionally jump to another route when the
 * "Next" button is pressed (instead of advancing to another step on the same
 * page). `nextRoute` is our own extension on top of Driver.js's `DriveStep`.
 */
export type TourDriveStep = DriveStep & {
  /**
   * When present, pressing "Next" navigates to this route and the tour
   * continues there (multipage tour). The step it's set on is treated as the
   * final step of its segment.
   */
  nextRoute?: string;
};

/**
 * A group of steps that run while the user is on a single route. This is what
 * lets us split one logical tour across several pages.
 */
export type TourSegment = {
  /** Route prefix this segment's steps are rendered on (e.g. "/admin/dashboard"). */
  route: string;
  steps: TourDriveStep[];
};

/** Full definition of one onboarding tour. */
export type TourDefinition = {
  key: TourKey;
  /** Route the tour begins on (the post-login landing page). */
  startRoute: string;
  segments: TourSegment[];
};

/**
 * Serializable record of an in-progress multi-page tour. Persisted to
 * localStorage so a hard refresh (or navigation) doesn't lose your place.
 */
export type ActiveTourSession = {
  tourKey: TourKey;
  /** Index into `TourDefinition.segments` of the segment we are about to run next. */
  nextSegmentIndex: number;
  startedAt: number;
};
