import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { role } from "@/constant/role";
import CashOutModal from "@/features/user/components/CashOutModal";
import SendMoneyModal from "@/features/user/components/SendMoneyModal";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { convertTaka } from "@/utils/convertTaka";
import React, { useState } from "react";
import { Link } from "react-router";

export default function Wallet() {
  const { data: wallet, isLoading } = useGetMyWalletQuery(undefined);
  const [showBalance, setShowBalance] = useState(false);
  const { data: userData } = useGetMeQuery(undefined);

  return (
    <>
      {isLoading && (
        <>
          <Skeleton />
        </>
      )}
      {!isLoading && wallet && (
        <Card className="w-full h-full shadow-lg border rounded-xl overflow-hidden py-0 flex flex-col justify-between">
          {/* 1: Balance + Wallet Type Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">Available Balance</p>
                <button
                  onClick={() => setShowBalance((p) => !p)}
                  className=" w-full cursor-pointer"
                >
                  <span
                    className={` font-bold text-3xl transition-all ${
                      showBalance ? "blur-0" : "blur-sm select-none"
                    }`}
                  >
                    {convertTaka(wallet.balance)} {wallet.currency}
                  </span>
                  {/* {showBalance ? <EyeOff size={20} /> : <Eye size={20} />} */}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20">
                  {wallet.type}
                </Badge>
              </div>
            </div>
          </div>

          <CardContent className="space-y-4 p-6">
            {/* 2: User Info */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">User</span>
                <span className="font-medium">
                  {userData!.data.name.slice(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wallet ID</span>
                <span>{wallet._id.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={wallet.isBlock ? "destructive" : "default"}>
                  {wallet.isBlock ? "Blocked" : "Active"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(wallet.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* 3: Service Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild variant="secondary" className="flex-1 hover:bg-primary">
                <Link
                  className="w-full"
                  to={`/${userData?.data.role.toLowerCase()}/transactions`}
                >
                  View Transactions
                </Link>
              </Button>
              {userData?.data.role === role.agent ? (
                <>
                  <Button
                    variant="secondary"
                    className="flex-1 hover:bg-red-400"
                  >
                    Cash In
                  </Button>
                </>
              ) : (
                <React.Fragment>
                  <CashOutModal />
                  <SendMoneyModal />
                </React.Fragment>
              )}
            </div>
          </CardContent>

          {/* 4: Promotional Section */}
          <CardFooter className="bg-muted/40 p-4  flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">🎉 Special Offer</p>
              <p className="text-xs text-muted-foreground">
                Get 5% cashback on bill payments.
              </p>
            </div>
            <Button size="sm" variant="secondary">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
