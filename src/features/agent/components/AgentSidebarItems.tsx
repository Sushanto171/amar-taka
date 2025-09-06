import CashOut from "@/features/auth/page/CashOut";
import Analytics from "@/features/dashboard/pages/Analytics";
import Settings from "@/features/dashboard/pages/Settings";
import Transactions from "@/features/dashboard/pages/Transactions";
import Wallet from "@/features/dashboard/pages/Wallet";
import type { ISidebarItems } from "@/types/global.types";
import Commission from "../../dashboard/pages/Commission";
import CashIn from "../pages/CashIn";

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
