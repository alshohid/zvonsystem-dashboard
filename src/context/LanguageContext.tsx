/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { LanguageCode, LanguageService } from "../services/LanguageService";
import { LanguageDetector } from "../services/LanguageDetector";
import { smoothTranslate } from "../lib/googleTranslate";

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguageState] = useState<LanguageCode>("en");

    useEffect(() => {
        const savedLang = LanguageService.getLanguage();

        if (savedLang) {
            setLanguageState(savedLang);
            if (savedLang !== "en") smoothTranslate(savedLang);
            return;
        }

        const browserLang: any = LanguageDetector.detectBrowserLanguage();
        setLanguageState(browserLang);
        LanguageService.setLanguage(browserLang);

        if (browserLang !== "en") smoothTranslate(browserLang);
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        LanguageService.setLanguage(lang);
        setLanguageState(lang);
        smoothTranslate(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
};
