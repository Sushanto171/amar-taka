import { lazy } from "react";
// lazy imports
const CashOut = lazy(() => import("@/features/auth/page/CashOut"));
const Analytics = lazy(() => import("@/features/dashboard/pages/Analytics"));
const Settings = lazy(() => import("@/features/dashboard/pages/Settings"));
const Transactions = lazy(
  () => import("@/features/dashboard/pages/Transactions")
);
const Wallet = lazy(() => import("@/features/dashboard/pages/Wallet"));
const Commission = lazy(() => import("../../dashboard/pages/Commission"));
const CashIn = lazy(() => import("../pages/CashIn"));

import type { ISidebarItems } from "@/types/global.types";

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
        title: "Cash In",
        url: "/agent/cash-in",
        Component: CashIn,
      },
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        Component: CashOut,
      },
      {
        title: "Commission",
        url: "/agent/commission",
        Component: Commission,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "Settings",
        url: "/agent/settings",
        Component: Settings,
      },
    ],
  },
];
