import Activities from "@/features/dashboard/commonPages/Activities";
import type { ISidebarItems } from "@/types/global.types";
import { lazy } from "react";
import ApplyForAgent from "../page/ApplyForAgent";

const Profile = lazy(() => import("@/features/dashboard/commonPages/Profile"));
const Transactions = lazy(
  () => import("@/features/dashboard/commonPages/Transactions")
);
const Wallet = lazy(() => import("@/features/dashboard/commonPages/Wallet"));
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
      {
        title: "Activities",
        url: "/user/activities",
        Component: Activities,
      },
      {
        title: "Apply For Agent",
        url: "/user/apply-for-agent",
        Component: ApplyForAgent,
      },
    ],
  },
];
