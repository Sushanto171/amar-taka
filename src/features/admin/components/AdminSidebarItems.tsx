import Activities from "@/features/dashboard/commonPages/Activities";
import type { ISidebarItems } from "@/types/global.types";
import { lazy } from "react";

// lazy imports
const Analytics = lazy(
  () => import("@/features/dashboard/commonPages/Analytics")
);
const Transactions = lazy(
  () => import("@/features/dashboard/commonPages/Transactions")
);
const AuditLogs = lazy(() => import("../page/AuditLogs"));
const SystemSettings = lazy(() => import("../page/SystemSettings"));
const Users = lazy(() => import("../page/Users"));
const Agents = lazy(() => import("../page/Agents"));

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
        Component: Agents,
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
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: "Activities",
        url: "/admin/activities",
        Component: Activities,
      },
      {
        title: "System Settings",
        url: "/admin/system-settings",
        Component: SystemSettings,
      },
    ],
  },
];
