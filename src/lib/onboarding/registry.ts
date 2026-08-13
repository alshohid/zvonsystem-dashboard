import type { TourDefinition, TourKey } from "@/src/types/onboarding";
import { adminTour } from "@/src/components/onboarding/tours/adminTour";
import { superAdminTour } from "@/src/components/onboarding/tours/superAdminTour";

export const tourRegistry: Record<TourKey, TourDefinition> = {
  admin: adminTour,
  "super-admin": superAdminTour,
};

export const getTourDefinition = (key: TourKey): TourDefinition | undefined =>
  tourRegistry[key];

export const resolveSegmentIndexForPath = (
  definition: TourDefinition,
  pathname: string,
): number => {
  const matches = definition.segments
    .map((segment, index) => ({ segment, index }))
    .filter(
      ({ segment }) =>
        pathname === segment.route || pathname.startsWith(`${segment.route}/`),
    )
    .sort((a, b) => b.segment.route.length - a.segment.route.length);

  return matches[0]?.index ?? -1;
};
