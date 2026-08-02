import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SidebarProvider } from "@/src/context/SidebarContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
// import { TwScreenSize } from "../components/TwScreenSize";
import ReduxProvider from "@/src/redux/ReduxProvider";



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
        <ReduxProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            {/* <TwScreenSize /> */}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
