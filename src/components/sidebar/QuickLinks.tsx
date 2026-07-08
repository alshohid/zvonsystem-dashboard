"use client";
import React from "react";
import { useRouter } from "next/navigation";
import type { QuickLink } from "@/src/lib/sidebarConfig";

interface QuickLinksProps {
  links: QuickLink[];
  onLinkClick?: (link: QuickLink) => void;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ links, onLinkClick }) => {
  const router = useRouter();

  return (
    <div className="px-3 pb-4">
      <div className="pt-4">
        <h3 className="px-3 mb-3 text-xs font-semibold text-gray-600 dark:text-[#98A2B3] uppercase tracking-wider">
          Quick Links
        </h3>

        <div className="space-y-2">
          {links.map((link, index) => (
            <button
              key={index}
              type="button"
              className="w-full p-3 rounded-lg bg-white dark:bg-[#2C2F3F] hover:bg-gray-100 dark:hover:bg-[#5952FF] transition-colors text-left border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none"
              onClick={() => {
                if (link.path) return router.push(link.path);
                onLinkClick?.(link);
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.iconBgColor === "gradient-green"
                      ? "bg-gradient-to-br from-[#00C950] to-[#009966]"
                      : link.iconBgColor === "gradient-pink"
                        ? "bg-gradient-to-br from-[#AD46FF] to-[#E60076]"
                        : link.iconBgColor
                    }`}
                >
                  <span className={link.iconColor}>{link.icon}</span>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{link.title}</p>
                  <p className="text-xs text-gray-600 dark:text-[#98A2B3]">{link.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
