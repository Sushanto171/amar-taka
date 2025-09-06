import Settings from "@/features/dashboard/pages/Settings";
import Transactions from "@/features/dashboard/pages/Transactions";
import Wallet from "@/features/dashboard/pages/Wallet";
import BillPay from "@/features/user/page/BillPay";
import CashOut from "@/features/user/page/CashOut";
import SendMoney from "@/features/user/page/SendMoney";
import type { ISidebarItems } from "@/types/global.types";

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
        title: "Send Money",
        url: "/user/send-money",
        Component: SendMoney,
      },
      {
        title: "Cash Out",
        url: "/user/cash-out",
        Component: CashOut,
      },
      {
        title: "Bill Pay",
        url: "/user/bill-pay",
        Component: BillPay,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "Settings",
        url: "/user/settings",
        Component: Settings,
      },
    ],
  },
];
