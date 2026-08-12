import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { TourDriveStep } from "@/src/types/onboarding";

/**
 * Shared Driver.js factory.
 *
 * Every tour runs through here so all the common configuration — progress
 * text, button labels, animation, overlay, the "Skip tour" control and the
 * multi-page navigation hook — live in exactly one place.
 */

const SKIP_BUTTON_CLASS = "zvn-tour-skip";

type CreateTourDriverParams = {
  steps: TourDriveStep[];
  /** Called when the user presses "Next" on a step that has `nextRoute`. */
  onNavigate: (nextRoute: string) => void;
  /** Called when the driver is destroyed (finished, skipped or closed). */
  onComplete: () => void;
  /** Called the moment the first step becomes visible (used to sync UI state). */
  onStart?: () => void;
};

export const createTourDriver = ({
  steps,
  onNavigate,
  onComplete,
  onStart,
}: CreateTourDriverParams): Driver => {
  const driverObj = driver({
    showProgress: true,
    progressText: "{{current}} of {{total}}",
    animate: true,
    duration: 350,
    smoothScroll: true,
    overlayOpacity: 0.7,
    allowClose: false,
    allowKeyboardControl: true,
    popoverClass: "zvn-tour-popover",
    nextBtnText: "Next →",
    prevBtnText: "← Back",
    doneBtnText: "Finish",

    // Fires the moment a step is highlighted — lets consumers sync external
    // UI (e.g. hide the "Resume" button) without calling setState in an effect.
    onHighlightStarted: () => onStart?.(),

    // Intercept "Next" clicks. NOTE: supplying a config-level `onNextClick`
    // replaces Driver.js's built-in advance handler, so for every normal step
    // we must advance manually with `moveNext()`. Only a step tagged with
    // `nextRoute` breaks out to navigate to another page instead (multipage).
    onNextClick: () => {
      const index = driverObj.getActiveIndex();
      const step = index != null ? steps[index] : undefined;

      if (step?.nextRoute) {
        onNavigate(step.nextRoute);
        return;
      }

      driverObj.moveNext();
    },

    // Inject a "Skip tour" button into every popover's footer.
    onPopoverRender: (popover) => {
      if (popover.footer.querySelector(`.${SKIP_BUTTON_CLASS}`)) {
        return;
      }

      const skipButton = document.createElement("button");
      skipButton.type = "button";
      skipButton.textContent = "Skip tour";
      skipButton.className = SKIP_BUTTON_CLASS;
      skipButton.addEventListener("click", () => {
        driverObj.destroy();
      });

      popover.footer.prepend(skipButton);
    },

    onDestroyed: onComplete,

    steps,
  });

  return driverObj;
};
