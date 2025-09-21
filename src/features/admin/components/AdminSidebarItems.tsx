import Activities from "@/features/dashboard/commonPages/Activities";
import Analytics from "@/features/dashboard/commonPages/Analytics";
import Profile from "@/features/dashboard/commonPages/Profile";
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
        title: <span id="dashboard-route">Analytics</span>,
        url: "/admin/analytics",
        Component: Analytics,
      },
      {
        title: <span id="users-route">Users</span>,
        url: "/admin/users",
        Component: Users,
      },
      {
        title: <span id="agents-route">Agents</span>,
        url: "/admin/agents",
        Component: Agents,
      },
      {
        title: <span id="transactions-route">Transactions</span>,
        url: "/admin/transactions",
        Component: Transactions,
      },
      {
        title: <span id="auditLogs-route">Audit Logs</span>,
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
        title: <span id="activities-route">Activities</span>,
        url: "/admin/activities",
        Component: Activities,
      },
      {
        title: <span id="profile-route">Profile</span>,
        url: "/admin/profile",
        Component: Profile,
      },
      {
        title: <span id="systemSettings-route">System Settings</span>,
        url: "/admin/system-settings",
        Component: SystemSettings,
      },
    ],
  },
];
