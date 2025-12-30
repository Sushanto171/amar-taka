import {
  Activity,
  ArrowLeftRight,
  BarChart3,
  User,
  Wallet as WalletIcon
} from "lucide-react";
import { lazy } from "react";

import type { ISidebarItems } from "@/types/global.types";

const Wallet = lazy(() => import("@/features/dashboard/commonPages/Wallet"));
// const Commission = lazy(() => import("../../dashboard/commonPages/Commission"));

import Activities from "@/features/dashboard/commonPages/Activities";
import Profile from "@/features/dashboard/commonPages/Profile";
import Transactions from "@/features/dashboard/commonPages/Transactions";
import AgentAnalytics from "./AgentAnalytics";

export const AgentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: <span id="agent-wallet-route">Wallet</span>,
        url: "/agent/my-wallet",
        icon: <WalletIcon className="w-5 h-5 mr-2" />,
        Component: Wallet,
      },
      {
        title: <span id="agent-analytics-route">Analytics</span>,
        url: "/agent/analytics",
        icon: <BarChart3 className="w-5 h-5 mr-2" />,
        Component: AgentAnalytics,
      },
      {
        title: <span id="agent-transactions-route">Transactions</span>,
        url: "/agent/transactions",
        icon: <ArrowLeftRight className="w-5 h-5 mr-2" />,
        Component: Transactions,
      },
      // {
      //   title: <span id="agent-commission-route">Commission</span>,
      //   url: "/agent/commission",
      //   icon: <Percent className="w-5 h-5 mr-2" />,
      //   Component: Commission,
      // },
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: <span id="agent-profile-route">Profile</span>,
        url: "/agent/profile",
        icon: <User className="w-5 h-5 mr-2" />,
        Component: Profile,
      },
      {
        title: <span id="agent-activities-route">Activities</span>,
        url: "/agent/activities",
        icon: < Activity className="w-5 h-5 mr-2" />,
        Component: Activities,
      },
    ],
  },
];
