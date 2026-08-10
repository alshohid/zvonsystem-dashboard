"use client";

import { ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "ru", label: "Russian" },
  // { code: "es", label: "Spanish" },
  // { code: "fr", label: "French" },
  // { code: "de", label: "German" },
  // { code: "hi", label: "Hindi" },
  // { code: "zh", label: "Chinese" },
  // { code: "ja", label: "Japanese" },

] as const;

export default function UserProfileDropdown() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-full border border-[#E7EBF7] bg-[#FBFCFF] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#8FA17E]/15">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDFFE7] text-sm font-semibold text-[#2E3A83]">
          WR
        </div>
        <div className="hidden pr-2 sm:block">
          <p className="text-sm font-semibold text-[#101828]">Wisely Reed</p>
        </div>
        <ChevronDown size={14} className="hidden text-[#667085] sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border border-[#E5E7EB] bg-white p-1 shadow-lg"
      >
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Languages size={14} className="text-[#667085]" />
          <span className="notranslate text-xs font-medium text-[#667085]">Language</span>
        </div>

        {LANGUAGE_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onSelect={() => setLanguage(option.code)}
            className={`notranslate cursor-pointer rounded-lg px-2 py-2 text-[13px] ${language === option.code
              ? "bg-[#DCFCE7] font-medium text-[#101828]"
              : "text-[#344054]"
              }`}
          >
            {option.label}
            {language === option.code && (
              <span className="notranslate ml-auto text-[#16A34A]">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
