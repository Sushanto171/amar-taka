import Activities from "@/features/dashboard/commonPages/Activities";
import Profile from "@/features/dashboard/commonPages/Profile";
import Transactions from "@/features/dashboard/commonPages/Transactions";
import Wallet from "@/features/dashboard/commonPages/Wallet";
import type { ISidebarItems } from "@/types/global.types";
import ApplyForAgent from "../page/ApplyForAgent";
import BillPay from "../page/BillPay";

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
