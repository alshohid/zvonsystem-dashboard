let isTranslating = false;

export function smoothTranslate(lang: string) {
  const tryTranslate = (attempt = 0) => {
    if (isTranslating) {
      setTimeout(() => tryTranslate(attempt), 150);
      return;
    }

    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (!combo) {
      setTimeout(() => tryTranslate(attempt), 200);
      return;
    }

    // If combo already has the target value, no need to translate again
    if (combo.value === lang && attempt > 0) {
      return;
    }

    isTranslating = true;
    document.body.classList.add("translating");
    
    // Small delay to ensure combo is fully ready for language switch
    setTimeout(() => {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
      
      // Wait and verify the value actually changed
      setTimeout(() => {
        if (combo.value === lang) {
          // Success - keep translating class for a bit longer for visual feedback
          setTimeout(() => {
            document.body.classList.remove("translating");
            isTranslating = false;
          }, 500);
          return;
        }

        // Value didn't stick, retry a few times
        if (attempt >= 4) {
          document.body.classList.remove("translating");
          isTranslating = false;
          return;
        }

        isTranslating = false;
        setTimeout(() => tryTranslate(attempt + 1), 200);
      }, 300);
    }, 100);
  };

  tryTranslate();
}
