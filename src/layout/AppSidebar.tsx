"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import { useSidebar } from "@/src/context/SidebarContext";
import { authRoutes } from "@/src/lib/auth/config";
import {
  getSidebarConfig,
  type DashboardRole,
} from "@/src/lib/sidebarConfig";
import { useAuth } from "@/src/redux/features/auth/hooks";
import Image from "next/image";
import { LayoutRightArrow } from "../icons";
import { tourElementId } from "@/src/lib/onboarding/ids";

interface AppSidebarProps {
  role?: DashboardRole;
}

const ACTIVE_ITEM_CLASSES =
  "bg-[#E7FCE4] text-[#1D1F2C] font-semibold border border-transparent border-l-[3px] border-l-[#4CFC0F] rounded-xl";

const INACTIVE_ITEM_CLASSES =
  "border border-transparent text-gray-600 hover:bg-gray-50 rounded-xl";
const ACTIVE_ACCENT_BAR =
  "before:absolute before:content-[''] before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:my-auto before:h-6 before:rounded-xl before:bg-[#4CFC0F]";

const AppSidebar = ({ role = "admin" }: AppSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isExpanded,
    isMobileOpen,
    toggleMobileSidebar,
    toggleSidebar,
    openSubmenu,
    toggleSubmenu,
  } = useSidebar();
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

  const isPathMatch = (path?: string) => {
    if (!path) {
      return false;
    }

    const isDashboardRoot =
      path === authRoutes.adminDashboard ||
      path === authRoutes.superAdminDashboard;

    return pathname === path || (!isDashboardRoot && pathname.startsWith(`${path}/`));
  };

  // Nested routes (e.g. "/releases" and "/releases/create") can both match the
  // current pathname as a prefix. Only the most specific (longest) match should
  // ever be treated as active, so exactly one item lights up at a time.
  const activePath = config.navItems
    .flatMap((item) => [item.path, ...(item.subItems?.map((sub) => sub.path) ?? [])])
    .filter((path): path is string => !!path && isPathMatch(path))
    .reduce<string | undefined>(
      (longest, candidate) =>
        !longest || candidate.length > longest.length ? candidate : longest,
      undefined,
    );

  const isActive = (path?: string) => !!path && path === activePath;

  // Auto-expand a submenu group when the active route lives inside it.
  useEffect(() => {
    config.navItems.forEach((item) => {
      const isGroupActive = item.subItems?.some((sub) => isActive(sub.path));

      if (isGroupActive && openSubmenu !== item.name) {
        toggleSubmenu(item.name);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-[600] flex h-[100dvh] flex-col overflow-hidden border-r border-[#EEF2ED] bg-[#FDFDFD] px-3 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)] transition-all duration-300 ease-in-out lg:px-3.5",
        sidebarWidth,
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 pb-4">
        <Link
          href={
            role === "super-admin"
              ? authRoutes.superAdminDashboard
              : authRoutes.adminDashboard
          }
          className="flex min-w-0 items-center gap-2.5"
          onClick={handleItemClick}
        >


          {showExpandedContent && (
            <div className="min-w-0">
              <div onClick={toggleSidebar} className="flex h-full w-full shrink-0 items-center justify-center">
                <Image src="/images/website_logo.png" alt="Logo" width={150} height={100} className="w-full h-auto object-cover" />
              </div>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden h-9 w-9 items-center justify-center rounded-[0.95rem] text-[#818898] transition hover:bg-[#F5F7F5] hover:text-[#101828] lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          <LayoutRightArrow />
        </button>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-0.5 no-scrollbar">
        <div className="space-y-4">
          {groups.map((group) => (
            <section key={group.section || "root"}>
              {showExpandedContent && group.section && (
                <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#98A2B3]">
                  {group.section}
                </p>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const hasSubItems = !!item.subItems?.length;
                  const isGroupOpen = openSubmenu === item.name;
                  const active = hasSubItems
                    ? !!item.subItems?.some((sub) => isActive(sub.path))
                    : isActive(item.path);

                  const itemClasses = [
                    "group relative flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] font-medium transition",
                    showExpandedContent ? "justify-start" : "justify-center",
                    active ? ACTIVE_ITEM_CLASSES : INACTIVE_ITEM_CLASSES,
                  ].join(" ");

                  // Collapsed rail with a submenu: jump straight to the first sub-route.
                  if (hasSubItems && !showExpandedContent) {
                    const fallbackPath = item.subItems?.[0]?.path ?? "#";

                    return (
                      <Link
                        key={item.name}
                        href={fallbackPath}
                        onClick={handleItemClick}
                        data-tour={tourElementId(fallbackPath)}
                        className={itemClasses}
                      >
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                          {item.icon}
                        </span>
                      </Link>
                    );
                  }

                  if (hasSubItems) {
                    return (
                      <div key={item.name}>
                        <button
                          type="button"
                          onClick={() => toggleSubmenu(item.name)}
                          data-tour={tourElementId(
                            item.path ?? item.subItems?.[0]?.path ?? "",
                          )}
                          className={itemClasses}
                        >
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                            {item.icon}
                          </span>

                          <span className="flex-1 truncate text-left">{item.name}</span>

                          <ChevronDown
                            size={16}
                            className={[
                              "shrink-0 text-[#98A2B3] transition-transform",
                              isGroupOpen ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>

                        {isGroupOpen && (
                          <div className="mt-0.5 ml-[1.15rem] space-y-0.5 border-l border-[#EEF2ED] pl-3">
                            {item.subItems?.map((sub) => {
                              const subActive = isActive(sub.path);

                              return (
                                <Link
                                  key={sub.path}
                                  href={sub.path}
                                  onClick={handleItemClick}
                                  data-tour={tourElementId(sub.path)}
                                  className={[
                                    "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.875rem] font-medium transition",
                                    subActive
                                      ? ACTIVE_ITEM_CLASSES
                                      : INACTIVE_ITEM_CLASSES,
                                    subActive ? ACTIVE_ACCENT_BAR : "",
                                  ].join(" ")}
                                >
                                  <span className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center">
                                    {sub.icon}
                                  </span>
                                  <span className="truncate">{sub.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.path ?? "#"}
                      onClick={handleItemClick}
                      data-tour={item.path ? tourElementId(item.path) : undefined}
                      className={itemClasses}
                    >
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
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

      <div className="mt-4 border-t border-[#EEF2ED] pt-3">
        <button
          type="button"
          onClick={handleLogout}
          className={[
            "flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition",
            showExpandedContent ? "justify-start gap-3" : "justify-center",
            "text-[#667085] hover:bg-[#F5F7F5] hover:text-[#101828]",
          ].join(" ")}
        >
          <span className="inline-flex text-red-500 h-5 w-5 shrink-0 items-center justify-center">
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
