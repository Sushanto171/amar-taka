"use client";

import RecentTransactions from "@/components/RecentTransactions";
import { Badge } from "@/components/ui/badge";
import { WalletSkeleton } from "@/components/WalletSkeleton";
import { role } from "@/constant/role";
import CashInModal from "@/features/agent/components/CashInModal";
import CashOutModal from "@/features/user/components/CashOutModal";
import SendMoneyModal from "@/features/user/components/SendMoneyModal";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { convertTaka } from "@/utils/convertTaka";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Wallet() {
  const { data: wallet, isLoading } = useGetMyWalletQuery(undefined);
  const { data: user } = useGetMeQuery(undefined);
  const [showBalance, setShowBalance] = useState(false);
  const { data: transactionsData, isLoading: tnxLoading } = useGetMyTransactionsQuery({ limit: 3 });

  if (isLoading || tnxLoading) return <WalletSkeleton />;
  if (!wallet || !user) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 scroll-smooth">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* ===================== HEADER ===================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Good Morning,  <span className="text-primary">
                {user.name.split(" ")[0]}
              </span>
            </h2>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your wallet today.
            </p>
          </div>
        </div>

        {/* ===================== TOP ROW ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ===== BALANCE CARD ===== */}
          <div className="lg:col-span-2 relative rounded-xl p-6 lg:p-8 bg-[#1a2c22] border border-[#2e4537] overflow-hidden group">

            {/* Glow */}
            <div className="absolute -right-20 -top-20 size-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

            <div className="relative z-10 flex flex-col justify-between h-full gap-6">

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#9db9a6] text-sm font-medium uppercase tracking-wider">
                    Total Balance
                  </p>

                  <div className="flex items-baseline gap-2 mt-1">
                    <h3
                      className={`text-4xl lg:text-5xl font-bold tracking-tight text-white transition-all ${showBalance ? "" : "blur-sm select-none"
                        }`}
                    >
                      {convertTaka(wallet.balance)}
                    </h3>
                    <span className="text-2xl text-gray-400 font-medium">
                      {wallet.currency}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBalance((p) => !p)}
                  className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                >
                  {showBalance ? (
                    <EyeOff className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-primary font-bold text-sm">+2.5%</span>
                  <span className="text-primary/70 text-xs">
                    vs last month
                  </span>
                </div>

                <Badge
                  variant={wallet.isBlock ? "destructive" : "default"}
                  className={`uppercase text-background`}
                >
                  {wallet.isBlock ? "Blocked" : "Active"}
                </Badge>
              </div>
            </div>
          </div>

          {/* ===== INCOME MINI CARD ===== */}
          <div className="rounded-xl p-6 bg-surface-dark border border-[#28392e] flex flex-col justify-between">
            <h4 className="font-bold text-lg mb-4">Income</h4>

            <div className="flex items-end gap-1 h-32 w-full px-2">
              {[40, 60, 30, 80, 95, 55, 45].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-full rounded-t-sm transition-all ${h === 95
                    ? "bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"
                    : "bg-primary/20 hover:bg-primary/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===================== QUICK ACTIONS ===================== */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SendMoneyModal />
            <CashOutModal />
            {user.role === role.agent && <CashInModal />}
          </div>
        </div>

        {
          transactionsData && transactionsData?.data?.length && <RecentTransactions transactions={transactionsData.data || []} role={user?.role} />
        }

        {/* ===================== FOOTER ===================== */}
        <footer className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Amar Taka. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
