import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { TourDriveStep } from "@/src/types/onboarding";

const SKIP_BUTTON_CLASS = "zvn-tour-skip";

type CreateTourDriverParams = {
  steps: TourDriveStep[];
  onNavigate: (nextRoute: string) => void;
  onComplete: () => void;
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

    onHighlightStarted: () => onStart?.(),

    onNextClick: () => {
      const index = driverObj.getActiveIndex();
      const step = index != null ? steps[index] : undefined;

      if (step?.nextRoute) {
        onNavigate(step.nextRoute);
        return;
      }

      driverObj.moveNext();
    },

    onPrevClick: () => {
      const index = driverObj.getActiveIndex();
      const step = index != null ? steps[index] : undefined;

      if (step?.prevRoute) {
        onNavigate(step.prevRoute);
        return;
      }

      driverObj.movePrevious();
    },

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
