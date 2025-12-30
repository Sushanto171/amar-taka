import Activities from "@/features/dashboard/commonPages/Activities";
import Profile from "@/features/dashboard/commonPages/Profile";
import Transactions from "@/features/dashboard/commonPages/Transactions";
import WalletPage from "@/features/dashboard/commonPages/Wallet";
import type { ISidebarItems } from "@/types/global.types";
import ApplyForAgent from "../page/ApplyForAgent";
import BillPay from "../page/BillPay";

import {
  Activity,
  ArrowLeftRight,
  Receipt,
  User,
  UserPlus,
  Wallet,
} from "lucide-react";

export const UserSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: <span id="wallet-route">Wallet</span>,
        url: "/user/my-wallet",
        icon: < Wallet className="w-5 h-5 mr-2" />,
        Component: WalletPage,
      },
      {
        title: <span id="transactions-route">Transactions</span>,
        url: "/user/transactions",
        icon: < ArrowLeftRight className="w-5 h-5 mr-2" />,
        Component: Transactions,
      },
      {
        title: <span id="billPay-route">Bill Pay</span>,
        url: "/user/bill-pay",
        icon: < Receipt className="w-5 h-5 mr-2" />,
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
        icon: < User className="w-5 h-5 mr-2" />,
        Component: Profile,
      },
      {
        title: <span id="activities-route">Activities</span>,
        url: "/user/activities",
        icon: < Activity className="w-5 h-5 mr-2" />,
        Component: Activities,
      },
      {
        title: <span id="apply-agent-route">Apply For Agent</span>,
        url: "/user/apply-for-agent",
        icon: < UserPlus className="w-5 h-5 mr-2" />,
        Component: ApplyForAgent,
      },
    ],
  },
];
