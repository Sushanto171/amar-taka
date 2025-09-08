import type { ISidebarItems } from "@/types/global.types";
import { lazy } from "react";

const Profile = lazy(() => import("@/features/dashboard/pages/Profile"));
const Transactions = lazy(
  () => import("@/features/dashboard/pages/Transactions")
);
const Wallet = lazy(() => import("@/features/dashboard/pages/Wallet"));
const BillPay = lazy(() => import("@/features/user/page/BillPay"));

export const UserSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Wallet",
        url: "/user/my-wallet",
        Component: Wallet,
      },
      {
        title: "Transactions",
        url: "/user/transactions",
        Component: Transactions,
      },

      {
        title: "Bill Pay",
        url: "/user/bill-pay",
        Component: BillPay,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        Component: Profile,
      },
    ],
  },
];
