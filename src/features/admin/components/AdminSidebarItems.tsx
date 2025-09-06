import type { ISidebarItems } from "@/types/global.types";
import { lazy } from "react";

// lazy imports
const Analytics = lazy(() => import("@/features/dashboard/pages/Analytics"));
const Settings = lazy(() => import("@/features/dashboard/pages/Settings"));
const Transactions = lazy(
  () => import("@/features/dashboard/pages/Transactions")
);
const AuditLogs = lazy(() => import("../page/AuditLogs"));
const SystemSettings = lazy(() => import("../page/SystemSettings"));
const Users = lazy(() => import("../page/Users"));
const Wallets = lazy(() => import("../page/Wallets"));

export const AdminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
      },
      {
        title: "Users",
        url: "/admin/users",
        Component: Users,
      },
      {
        title: "Agents",
        url: "/admin/agents",
        Component: Wallets,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        Component: Transactions,
      },
      {
        title: "Audit Logs",
        url: "/admin/audit-logs",
        Component: AuditLogs,
      },
      {
        title: "System Settings",
        url: "/admin/system-settings",
        Component: SystemSettings,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        Component: Settings,
      },
    ],
  },
];
