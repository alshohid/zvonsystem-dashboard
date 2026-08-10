export class LanguageDetector {
  static supported: string[] = ["en", "ru"];

  static detectBrowserLanguage(): string {
    if (typeof window === "undefined") return "en";

    const browserLang = navigator.language.split("-")[0];

    return this.supported.includes(browserLang) ? browserLang : "en";
  }
}
