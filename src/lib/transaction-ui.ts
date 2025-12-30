// utils/transaction-ui.ts
import {
  Gift,
  Send,
  Download,
  Upload,
  CreditCard,
} from "lucide-react";

export const transactionMeta = {
  BONUS: {
    icon: Gift,
    color: "text-primary bg-primary/10",
    label: "Bonus",
  },
  SEND_MONEY: {
    icon: Send,
    color: "text-blue-500 bg-blue-500/10",
    label: "Send Money",
  },
  CASH_OUT: {
    icon: Upload,
    color: "text-red-500 bg-red-500/10",
    label: "Cash Out",
  },
  CASH_IN: {
    icon: Download,
    color: "text-green-500 bg-green-500/10",
    label: "Cash In",
  },
  BILL_PAY: {
    icon: CreditCard,
    color: "text-orange-500 bg-orange-500/10",
    label: "Bill Pay",
  },
};
