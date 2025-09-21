import { lazy } from "react";

const Wallet = lazy(() => import("@/features/dashboard/commonPages/Wallet"));
const Commission = lazy(() => import("../../dashboard/commonPages/Commission"));

import Activities from "@/features/dashboard/commonPages/Activities";
import Profile from "@/features/dashboard/commonPages/Profile";
import type { ISidebarItems } from "@/types/global.types";

import Transactions from "@/features/dashboard/commonPages/Transactions";
import AgentAnalytics from "./AgentAnalytics";

export const AgentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: <span id="agent-analytics-route">Analytics</span>,
        url: "/agent/analytics",
        Component: AgentAnalytics,
      },
      {
        title: <span id="agent-wallet-route">Wallet</span>,
        url: "/agent/my-wallet",
        Component: Wallet,
      },
      {
        title: <span id="agent-transactions-route">Transactions</span>,
        url: "/agent/transactions",
        Component: Transactions,
      },
      {
        title: <span id="agent-commission-route">Commission</span>,
        url: "/agent/commission",
        Component: Commission,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: <span id="agent-profile-route">Profile</span>,
        url: "/agent/profile",
        Component: Profile,
      },
      {
        title: <span id="agent-activities-route">Activities</span>,
        url: "/agent/activities",
        Component: Activities,
      },
    ],
  },
];
