import { Shield, Users as UsersIcon, UserCheck, CreditCard, FileText, Activity, Settings, User } from "lucide-react";

import Activities from "@/features/dashboard/commonPages/Activities";
import Analytics from "@/features/dashboard/commonPages/Analytics";
import Profile from "@/features/dashboard/commonPages/Profile";
import Transactions from "@/features/dashboard/commonPages/Transactions";
import Agents from "../page/Agents";
import AuditLogs from "../page/AuditLogs";
import SystemSettings from "../page/SystemSettings";
import Users from "../page/Users";
import type { ISidebarItems } from "@/types/global.types";

export const AdminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        icon: <Shield className="w-5 h-5 mr-2" />,
        url: "/admin/analytics",
        Component: Analytics,
      },
      {
        title: "Users",
        icon: <UsersIcon className="w-5 h-5 mr-2" />,
        url: "/admin/users",
        Component: Users,
      },
      {
        title: "Agents",
        icon: <UserCheck className="w-5 h-5 mr-2" />,
        url: "/admin/agents",
        Component: Agents,
      },
      {
        title: "Transactions",
        icon: <CreditCard className="w-5 h-5 mr-2" />,
        url: "/admin/transactions",
        Component: Transactions,
      },
      {
        title: "Audit Logs",
        icon: <FileText className="w-5 h-5 mr-2" />,
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
        icon: <Activity className="w-5 h-5 mr-2" />,
        url: "/admin/activities",
        Component: Activities,
      },
      {
        title: "Profile",
        icon: <User className="w-5 h-5 mr-2" />,
        url: "/admin/profile",
        Component: Profile,
      },
      {
        title: "System Settings",
        icon: <Settings className="w-5 h-5 mr-2" />,
        url: "/admin/system-settings",
        Component: SystemSettings,
      },
    ],
  },
];

/**
 * Helper function to determine active route
 * Usage: isActiveRoute("/admin/analytics", currentPathname)
 */
export const isActiveRoute = (route: string, currentPath: string) => route === currentPath;
