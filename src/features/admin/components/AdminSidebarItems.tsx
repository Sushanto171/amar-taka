import Activities from "@/features/dashboard/commonPages/Activities";
import Analytics from "@/features/dashboard/commonPages/Analytics";
import Transactions from "@/features/dashboard/commonPages/Transactions";
import type { ISidebarItems } from "@/types/global.types";
import Agents from "../page/Agents";
import AuditLogs from "../page/AuditLogs";
import SystemSettings from "../page/SystemSettings";
import Users from "../page/Users";

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
