import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SidebarProvider } from "@/src/context/SidebarContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
// import { TwScreenSize } from "../components/TwScreenSize";
import ReduxProvider from "@/src/redux/ReduxProvider";
import { LanguageProvider } from "../context/LanguageContext";



export const metadata: Metadata = {
  title: "ZvonSystems Dashboard",
  description: "ZvonSystems design mode dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased bg-gray-50 text-gray-900`}
      >
        <div id="google_translate_element" className="google-hide"></div>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              console.log("Google Translate Init Running...");
              new google.translate.TranslateElement(
                {
                  pageLanguage: "en",
                  includedLanguages: "en,es,fr,de,hi,zh,ja,ru"
                },
                "google_translate_element"
              );
            }
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <LanguageProvider>
          <ReduxProvider>
            <ThemeProvider>
              <SidebarProvider>
                <div suppressHydrationWarning className="contents">
                  {children}
                </div>
                <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
              </SidebarProvider>
            </ThemeProvider>
          </ReduxProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
