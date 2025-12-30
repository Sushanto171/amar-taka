"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  CreditCard,
  PiggyBank,
  QrCode,
  Receipt,
  Send,
  ShieldCheck,
  Smartphone,
  Store,
  Vault,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceItem = {
  icon: React.ElementType;
  title: string;
  color: {
    bg: string;
    text: string;
  };
};

const personalBanking: ServiceItem[] = [
  { icon: Send, title: "Send & Receive", color: { bg: "bg-blue-100/10", text: "text-blue-600" } },
  { icon: Receipt, title: "Bill Payments", color: { bg: "bg-purple-100/10", text: "text-purple-600" } },
  { icon: Smartphone, title: "Mobile Top-up", color: { bg: "bg-indigo-100/10", text: "text-indigo-600" } },
  { icon: Vault, title: "Bank Transfers", color: { bg: "bg-red-100/10", text: "text-red-600" } },
  { icon: PiggyBank, title: "Smart Savings", color: { bg: "bg-green-100/10", text: "text-green-600" } },
  { icon: QrCode, title: "Scan & Pay", color: { bg: "bg-yellow-100/10", text: "text-yellow-600" } },
];

const merchantSolutions: ServiceItem[] = [
  { icon: Store, title: "Merchant Wallet", color: { bg: "bg-orange-100/10", text: "text-orange-600" } },
  { icon: QrCode, title: "QR Payments", color: { bg: "bg-emerald-100/10", text: "text-emerald-600" } },
  { icon: CreditCard, title: "Bulk Payouts", color: { bg: "bg-cyan-100/10", text: "text-cyan-600" } },
  { icon: BarChart3, title: "Business Analytics", color: { bg: "bg-violet-100/10", text: "text-violet-600" } },
  { icon: ShieldCheck, title: "Fraud Protection", color: { bg: "bg-rose-100/10", text: "text-rose-600" } },
];

export function ServicesSectionTabs() {
  return (
    <section className="py-24 border-y bg-muted/30">
      <div className="">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-bold mb-3">
            Banking Built for Every Use Case
          </h2>
          <p className="text-muted-foreground">
            Whether you’re managing personal finances or running a business,
            our platform adapts to your needs.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-transparent border-b border-border rounded-none gap-8">
              <TabsTrigger
                value="personal"
                className="text-sm cursor-pointer font-bold uppercase rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
              >
                Personal Banking
              </TabsTrigger>
              <TabsTrigger
                value="merchant"
                className="text-sm cursor-pointer font-bold uppercase rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
              >
                Merchant Solutions
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Personal Banking */}
          <TabsContent value="personal">
            <div className="flex flex-wrap justify-center gap-6">
              {personalBanking.map(({ icon: Icon, title, color }, idx) => (
                <Card
                  key={idx}
                  className="sm:min-w-[180px] flex-1 shrink-0 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
                >
                  <CardContent className=" text-center">
                    <div
                      className={cn(
                        "size-10 mx-auto mb-4 rounded-full flex items-center justify-center",
                        color.bg,
                        color.text
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Merchant Solutions */}
          <TabsContent value="merchant">
            <div className="flex flex-wrap justify-center gap-6">
              {merchantSolutions.map(({ icon: Icon, title, color }, idx) => (
                <Card
                  key={idx}
                  className="min-w-[180px] hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
                >
                  <CardContent className="text-center">
                    <div
                      className={cn(
                        "size-10 mx-auto mb-4 rounded-full flex items-center justify-center",
                        color.bg,
                        color.text
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
