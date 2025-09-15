import { lazy } from "react";


const Wallet = lazy(() => import("@/features/dashboard/commonPages/Wallet"));
const Commission = lazy(() => import("../../dashboard/commonPages/Commission"));

import Activities from "@/features/dashboard/commonPages/Activities";
import Profile from "@/features/dashboard/commonPages/Profile";
import type { ISidebarItems } from "@/types/global.types";
import Analytics from "@/features/dashboard/commonPages/Analytics";
import Transactions from "@/features/dashboard/commonPages/Transactions";

export const AgentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        Component: Analytics,
      },
      {
        title: "Wallet",
        url: "/agent/my-wallet",
        Component: Wallet,
      },
      {
        title: "Transactions",
        url: "/agent/transactions",
        Component: Transactions,
      },

      {
        title: "Commission",
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
        title: "Profile",
        url: "/agent/profile",
        Component: Profile,
      },
      {
        title: "Activities",
        url: "/agent/activities",
        Component: Activities,
      },
    ],
  },
];
