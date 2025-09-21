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
        title: <span id="wallet-route">Wallet</span>,
        url: "/user/my-wallet",
        Component: Wallet,
      },
      {
        title: <span id="transactions-route">Transactions</span>,
        url: "/user/transactions",
        Component: Transactions,
      },
      {
        title: <span id="billPay-route">Bill Pay</span>,
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
        title: <span id="profile-route">Profile</span>,
        url: "/user/profile",
        Component: Profile,
      },
      {
        title: <span id="activities-route">Activities</span>,
        url: "/user/activities",
        Component: Activities,
      },
      {
        title: <span id="apply-agent-route">Apply For Agent</span>,
        url: "/user/apply-for-agent",
        Component: ApplyForAgent,
      },
    ],
  },
];
