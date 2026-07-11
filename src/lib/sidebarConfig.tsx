"use client";

import React from "react";
import {
  LayoutGrid,
  Upload,
  ListChecks,
  RotateCcw,
  List,
  FileText,
  Clock,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Bell,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { DashboardRole } from "./dashboardRoles";

export type { DashboardRole } from "./dashboardRoles";

export type NavSubItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export type NavItem = {
  section: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: NavSubItem[];
};

export type QuickLink = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
  href?: string;
  action?: "edit-profile" | "wallet-modal" | "download-app";
};

export type SidebarConfig = {
  subtitle: string;
  navItems: NavItem[];
  quickLinks: QuickLink[];
};

const buildSuperAdminOnlyNavItems = (root: string, isSuperAdmin: boolean): NavItem[] => [
  {
    section: "Admin",
    icon: <ShieldCheck size={18} />,
    name: "Admin Panel",
    path: `${root}/admin-panel`,
  },
  {
    section: "Admin",
    icon: <ShieldCheck size={18} />,
    name: "Pricing Management",
    path: `${root}/pricing-management`,
  },
];

const buildNavItems = (root: string, isSuperAdmin: boolean): NavItem[] => [
  {
    section: "",
    icon: <LayoutGrid size={18} />,
    name: "Dashboard",
    path: root,
  },
  {
    section: "Releases",
    icon: <Upload size={18} />,
    name: "Create New Release",
    path: `${root}/releases/create`,
  },
  {
    section: "Releases",
    icon: <ListChecks size={18} />,
    name: "Manage Release",
    subItems: [
      {
        name: "Your Releases",
        path: `${root}/releases/your-releases`,
        icon: <RotateCcw size={16} />,
      },
      {
        name: "All Releases",
        path: `${root}/releases`,
        icon: <List size={16} />,
      },
      {
        name: "Drafts",
        path: `${root}/releases/drafts`,
        icon: <FileText size={16} />,
      },
      {
        name: "Moderation",
        path: `${root}/releases/moderation`,
        icon: <Clock size={16} />,
      },
      {
        name: "Changes",
        path: `${root}/releases/changes`,
        icon: <AlertCircle size={16} />,
      },
    ],
  },
  {
    section: "General",
    icon: <TrendingUp size={18} />,
    name: "Analytics",
    path: `${root}/analytics`,
  },
  {
    section: "General",
    icon: <BookOpen size={18} />,
    name: "Guide",
    path: `${root}/guide`,
  },
  {
    section: "General",
    icon: <Bell size={18} />,
    name: "Notifications",
    path: `${root}/notifications`,
  },
  {
    section: "General",
    icon: <Settings size={18} />,
    name: "Settings",
    path: `${root}/settings`,
  },
  // ...(isSuperAdmin ? buildSuperAdminOnlyNavItems(root) : []),
];

export const dispatcherSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: buildNavItems("/dispatcher/dashboard", false),
  quickLinks: [],
};

export const adminSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: buildNavItems("/admin/dashboard", false),
  quickLinks: [],
};

export const superAdminSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: buildSuperAdminOnlyNavItems("/super-admin/dashboard", true),
  quickLinks: [],
};

export const getSidebarConfig = (
  role: DashboardRole = "admin",
): SidebarConfig => {
  if (role === "dispatcher") {
    return dispatcherSidebarConfig;
  }

  if (role === "super-admin") {
    return superAdminSidebarConfig;
  }

  return adminSidebarConfig;
};
