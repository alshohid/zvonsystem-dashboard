"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/src/context/SidebarContext";
import { authRoutes } from "@/src/lib/auth/config";
import {
  getSidebarConfig,
  type DashboardRole,
} from "@/src/lib/sidebarConfig";
import { useAuth } from "@/src/redux/features/auth/hooks";
import Image from "next/image";
import { LayoutRightArrow } from "../icons";

interface AppSidebarProps {
  role?: DashboardRole;
}

const AppSidebar = ({ role = "admin" }: AppSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isExpanded, isMobileOpen, toggleMobileSidebar, toggleSidebar } =
    useSidebar();
  const { logOut, isLogoutLoading } = useAuth();

  const config = getSidebarConfig(role);

  const groups = config.navItems.reduce<
    Array<{ section: string; items: typeof config.navItems }>
  >((collection, item) => {
    const existingGroup = collection.find((group) => group.section === item.section);

    if (existingGroup) {
      existingGroup.items.push(item);
      return collection;
    }

    collection.push({
      section: item.section,
      items: [item],
    });

    return collection;
  }, []);

  const handleLogout = async () => {
    await logOut();
    router.replace(authRoutes.login);
  };

  const handleItemClick = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const showExpandedContent = isExpanded || isMobileOpen;

  const sidebarWidth = isMobileOpen
    ? "w-[min(18rem,calc(100vw-2rem))]"
    : isExpanded
      ? "w-[17.5rem]"
      : "w-[5.5rem]";

  const isActive = (path?: string) => {
    if (!path) {
      return false;
    }

    const isDashboardRoot =
      path === authRoutes.dispatcherDashboard ||
      path === authRoutes.adminDashboard ||
      path === authRoutes.superAdminDashboard;

    return pathname === path || (!isDashboardRoot && pathname.startsWith(`${path}/`));
  };

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-[600] flex h-[100dvh] flex-col overflow-hidden border-r border-[#E7EBF7] bg-[#F6F8FA] px-3 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 ease-in-out lg:px-3.5",
        sidebarWidth,
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#EEF2FB] pb-4">
        <Link
          href={
            role === "dispatcher"
              ? authRoutes.dispatcherDashboard
              : role === "super-admin"
                ? authRoutes.superAdminDashboard
                : authRoutes.adminDashboard
          }
          className="flex min-w-0 items-center gap-3"
          onClick={handleItemClick}
        >
          <div onClick={toggleSidebar} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] bg-[#EEF2FF] text-lg font-bold text-[#2E3A83]">
            <Image src="/images/auth/website_logo.png" alt="Logo" width={40} height={40} />
          </div>

          {showExpandedContent && (
            <div className="min-w-0">
              <p className="truncate text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111827]">
                FleetOS
              </p>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden h-9 w-9 items-center justify-center rounded-[0.95rem] text-[#667085] transition hover:bg-[#F8FAFF] hover:text-[#2E3A83] lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          {isExpanded ? <LayoutRightArrow /> : <LayoutRightArrow  />}
        </button>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-0.5 no-scrollbar">
        <div className="space-y-4">
          {groups.map((group) => (
            <section key={group.section}>
              {showExpandedContent && (
                <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#98A2B3]">
                  {group.section}
                </p>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.name}
                      href={item.path ?? "#"}
                      onClick={handleItemClick}
                      className={[
                        "group flex min-h-11 items-center gap-3 rounded-lg px-2.5 py-2.5 text-[0.95rem] font-medium transition",
                        showExpandedContent ? "justify-start" : "justify-center",
                        active
                          ? "bg-[#2E3A83] text-white shadow-[0_10px_26px_rgba(46,58,131,0.24)]"
                          : "text-[#344054] hover:bg-[#F7F8FE] hover:text-[#2E3A83]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "inline-flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-[0.9rem] transition",
                          active
                            ? "bg-white/14 text-white"
                            : "bg-[#F5F7FF] text-[#2E3A83] group-hover:bg-[#E8EEFF]",
                        ].join(" ")}
                      >
                        {item.icon}
                      </span>

                      {showExpandedContent && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-[#EEF2FB] pt-3">
        <button
          type="button"
          onClick={handleLogout}
          className={[
            "flex w-full items-center rounded-[1.15rem] px-2.5 py-2.5 text-sm font-medium transition",
            showExpandedContent ? "justify-start gap-3" : "justify-center",
            "text-[#344054] hover:bg-[#F7F8FE] hover:text-[#2E3A83]",
          ].join(" ")}
        >
          <span className="inline-flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-[0.9rem] bg-[#F5F7FF] text-[#2E3A83]">
            <LogOut size={18} />
          </span>
          {showExpandedContent && (
            <span>{isLogoutLoading ? "Signing out..." : "Logout"}</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
