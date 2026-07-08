"use client";

import React from "react";
import {
  Activity,
  Briefcase,
  LayoutDashboard,
  Receipt,
  Settings,
  ShieldEllipsis,
  UserCog,
  Users,
} from "lucide-react";
import { CarriesIcon, CommunicationsIcon, DashboardIconForDispacher, DocumentsIcon, DriversIcon, InvoicesIcon, LoadsIcon, ReportsIcon, StatementsIcon, SupportIcon } from "../icons";
import { getCarrierRouteConfig } from "./carrierRoutes";
import type { DashboardRole } from "./dashboardRoles";

export type { DashboardRole } from "./dashboardRoles";

export type NavItem = {
  section: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; icon: React.ReactNode }[];
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

export const dispatcherSidebarConfig: SidebarConfig = {
  subtitle: '',
  navItems: [
    {
      section: 'Main Menu',
      icon: <DashboardIconForDispacher />,
      name: 'Dashboard',
      path: '/dispatcher/dashboard',
    },
    {
      section: 'Main Menu',
      icon: <ReportsIcon />,
      name: 'Reports',
      path: '/dispatcher/dashboard/reports',
    },
    {
      section: 'Management',
      icon: <CarriesIcon />,
      name: 'Carriers',
      path: getCarrierRouteConfig('dispatcher').listPath,
    },
    {
      section: 'Management',
      icon: <DriversIcon />,
      name: 'Drivers',
      path: '/dispatcher/dashboard/drivers',
    },
    {
      section: 'Operations',
      icon: <LoadsIcon />,
      name: 'Loads',
      path: '/dispatcher/dashboard/loads',
    },
    {
      section: 'Operations',
      icon: <CommunicationsIcon />,
      name: 'Communications',
      path: '/dispatcher/dashboard/communications',
    },
    {
      section: 'Operations',
      icon: <DocumentsIcon />,
      name: 'Documents',
      path: '/dispatcher/dashboard/documents',
    },
    {
      section: 'Finance',
      icon: <InvoicesIcon />,
      name: 'Invoices',
      path: '/dispatcher/dashboard/invoices',
    },
    {
      section: 'Finance',
      icon: <StatementsIcon />,
      name: 'Statements',
      path: '/dispatcher/dashboard/statements',
    },

    {
      section: 'Settings',
      icon: <Settings size={18} />,
      name: 'Settings',
      path: '/dispatcher/dashboard/settings',
    },
    {
      section: 'Settings',
      icon: <SupportIcon />,
      name: 'Supports',
      path: '/dispatcher/dashboard/supports',
    },
  ],
  quickLinks: [],
};

export const adminSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: [
    {
      section: "Overview",
      icon: <LayoutDashboard size={18} />,
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      section: "Management",
      icon: <Users size={18} />,
      name: "User Management",
      path: "/admin/dashboard/user-management",
    },
    {
      section: "Management",
      icon: <UserCog size={18} />,
      name: "Dispatchers",
      path: "/admin/dashboard/dispatchers",
    },
    {
      section: "Management",
      icon: <Activity />,
      name: "Performance ",
      path: "/admin/dashboard/performance",
    },
    {
      section: 'Management',
      icon: <CarriesIcon />,
      name: 'Carriers',
      path: getCarrierRouteConfig('admin').listPath,
    },
    {
      section: "Operations",
      icon: <DocumentsIcon />,
      name: "Documents",
      path: "/admin/dashboard/documents",
    },
    {
      section: "Operations",
      icon: <SupportIcon />,
      name: "Support",
      path: "/admin/dashboard/support",
    },
    {
      section: "Finance",
      icon: <InvoicesIcon />,
      name: "Invoices",
      path: "/admin/dashboard/invoices",
    },
    {
      section: "Finance",
      icon: <StatementsIcon />,
      name: "Statements",
      path: "/admin/dashboard/statements",
    },
    {
      section: "Finance",
      icon: <Receipt size={18} />,
      name: "Pricing & Plan",
      path: "/admin/dashboard/pricing-plan",
    },
    {
      section: "Settings",
      icon: <Settings size={18} />,
      name: "Settings",
      path: "/admin/dashboard/settings",
    },
  ],
  quickLinks: [],
};

export const superAdminSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: [
    {
      section: "Overview",
      icon: <LayoutDashboard size={18} />,
      name: "Dashboard",
      path: "/super-admin/dashboard",
    },
    {
      section: "Management",
      icon: <ShieldEllipsis size={18} />,
      name: "User Management",
      path: "/super-admin/dashboard/user-management",
    },
    {
      section: "Management",
      icon: <Briefcase size={18} />,
      name: "Organizations",
      path: "/super-admin/dashboard/organizations",
    },

    {
      section: "Management",
      icon: <UserCog size={18} />,
      name: "Dispatcher",
      path: "/super-admin/dashboard/dispatcher-management",
    },
    {
      section: "Management",
      icon: <Activity />,
      name: "Performance",
      path: "/super-admin/dashboard/performance",
    },
    {
      section: 'Operations',
      icon: <DocumentsIcon />,
      name: 'Documents',
      path: '/super-admin/dashboard/documents',
    },
    {
      section: 'Management',
      icon: <CarriesIcon />,
      name: 'Carriers',
      path: getCarrierRouteConfig('super-admin').listPath,
    },
    {
      section: 'Operations',
      icon: <SupportIcon />,
      name: 'Support',
      path: '/super-admin/dashboard/support',
    },

    {
      section: "Finance",
      icon: <InvoicesIcon />,
      name: "Invoices",
      path: "/super-admin/dashboard/invoices",
    },
    {
      section: "Finance",
      icon: <StatementsIcon />,
      name: "Statements",
      path: "/super-admin/dashboard/statements",
    },
    {
      section: "Finance",
      icon: <Receipt size={18} />,
      name: "Pricing & Plan",
      path: "/super-admin/dashboard/pricing-plan",
    },
    {
      section: "Settings",
      icon: <Settings size={18} />,
      name: "Settings",
      path: "/super-admin/dashboard/settings",
    },
  ],
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
