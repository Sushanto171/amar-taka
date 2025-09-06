import Analytics from "@/features/dashboard/pages/Analytics";
import Settings from "@/features/dashboard/pages/Settings";
import Transactions from "@/features/dashboard/pages/Transactions";
import type { ISidebarItems } from "@/types/global.types";
import AuditLogs from "../page/AuditLogs";
import SystemSettings from "../page/SystemSettings";
import Users from "../page/Users";
import Wallets from "../page/Wallets";

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
