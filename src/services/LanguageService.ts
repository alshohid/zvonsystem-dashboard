
export type LanguageCode = "en" | "es" | "fr" | "de" | "hi" | "zh" | "ja" | "ru";

export class LanguageService {
    private static STORAGE_KEY = "app_language";

    static getLanguage(): LanguageCode {
        if (typeof window === "undefined") return "en";
        return (localStorage.getItem(this.STORAGE_KEY) as LanguageCode) || "en";
    }

    static setLanguage(lang: LanguageCode) {
        if (typeof window === "undefined") return;
        localStorage.setItem(this.STORAGE_KEY, lang);
    }
}
