"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  CreditCard,
  ReceiptText,
  Send,
  UserPlus,
  Wallet
} from "lucide-react"
import * as React from "react"

/* =========================
   STEP VISUAL (SHARED)
========================= */

function StepVisual({ index }: { index: number }) {
  // STEP 01 — Setup / Input
  if (index === 0) {
    return (
      <div className="relative h-24 w-full overflow-hidden rounded-lg border bg-muted">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-4 h-2 w-1/2 rounded-full bg-border" />
        <div className="absolute top-1/2 left-4 right-4 h-2 rounded-full bg-border" />
        <div className="absolute bottom-4 right-4 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-background shadow-lg">
          ✓
        </div>
      </div>
    )
  }

  // STEP 02 — Wallet / Amount
  if (index === 1) {
    return (
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-lg border bg-muted">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="h-10 w-16 translate-x-3 rotate-[-12deg] rounded bg-border shadow-sm" />
        <div className="flex h-10 w-16 -translate-x-3 rotate-[12deg] items-center justify-center rounded bg-primary text-sm font-bold text-background shadow-md">
          +
        </div>
      </div>
    )
  }

  // STEP 03 — Transfer / Action
  return (
    <div className="flex h-24 w-full items-center justify-center gap-4 rounded-lg border bg-muted">
      <div className="size-8 rounded-full bg-border" />
      <div className="relative h-0.5 w-10 bg-primary">
        <ArrowRight className="absolute -right-3 -top-2 size-4 text-primary" />
      </div>
      <div className="size-8 rounded-full bg-border" />
    </div>
  )
}

/* =========================
   STEPS GRID
========================= */

function StepsGrid({
  steps
}: {
  steps: {
    step: string
    title: string
    description: string
    icon: React.ElementType
  }[]
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 md:px-10">
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
        {steps.map((item, index) => (
          <Card
            key={item.step}
            className="relative group text-center border transition-all hover:shadow-xl flex flex-col"
          >
            {/* Step Badge */}
            <Badge
              variant="outline"
              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 py-1 text-xs font-bold"
            >
              Step {item.step}
            </Badge>

            {/* Card Content */}
            <CardContent className="flex flex-col flex-1">
              {/* TOP CONTENT */}
              <div className="flex flex-col items-center flex-1">
                <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <item.icon className="size-7" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-center">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground text-center max-w-[260px]">
                  {item.description}
                </p>
              </div>

              {/* BOTTOM VISUAL (LOCKED BASELINE) */}
              <div className="mt-6">
                <StepVisual index={index} />
              </div>
            </CardContent>
          </Card>

        ))}
      </div>
    </div>
  )
}

/* =========================
   MAIN COMPONENT
========================= */

export function FinancialSteps() {
  return (
    <section className="w-full" id="howItWork">
      {/* Header */}
      <div className="px-4 pt-20 pb-8 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          Financial Freedom in <span className="text-primary">3 Steps</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl sm:text-lg text-muted-foreground">
          Experience the easiest way to manage your finances. We have streamlined
          the process to get you moving money in minutes.
        </p>

        {/* Tabs */}
        <Tabs defaultValue="send" className="w-full ">
          <div className="flex justify-center">
            <TabsList className="relative flex justify-center gap-1 rounded-full border bg-background p-1.5 shadow-lg">
              <TabsTrigger
                value="send"
                className="
        relative cursor-pointer rounded-full px-6 py-2.5 font-bold
        text-muted-foreground
        data-[state=active]:bg-primary
        data-[state=active]:text-background!
        transition-all
      "
              >
                Send Money
              </TabsTrigger>

              <TabsTrigger
                value="cashout"
                className="
        relative cursor-pointer rounded-full px-6 py-2.5 font-bold
        text-muted-foreground
        data-[state=active]:bg-primary
        data-[state=active]:text-background!
        transition-all
      "
              >
                Cash Out
              </TabsTrigger>

              <TabsTrigger
                value="bill"
                className="
        relative cursor-pointer rounded-full px-6 py-2.5 font-bold
        text-muted-foreground
        data-[state=active]:bg-primary
        data-[state=active]:text-background!
        transition-all
      "
              >
                Pay Bill
              </TabsTrigger>
            </TabsList>

          </div>
          {/* SEND MONEY */}
          <TabsContent value="send">
            <StepsGrid
              steps={[
                {
                  step: "01",
                  title: "Create Account",
                  description:
                    "Sign up in seconds using your mobile number. Simple, secure, and free.",
                  icon: UserPlus
                },
                {
                  step: "02",
                  title: "Add Funds",
                  description:
                    "Instantly load funds from your bank or card into your wallet.",
                  icon: Wallet
                },
                {
                  step: "03",
                  title: "Send Instantly",
                  description:
                    "Transfer money to anyone with a single tap.",
                  icon: Send
                }
              ]}
            />
          </TabsContent>

          {/* CASH OUT */}
          <TabsContent value="cashout">
            <StepsGrid
              steps={[
                {
                  step: "01",
                  title: "Verify Identity",
                  description:
                    "Complete quick verification to enable withdrawals.",
                  icon: UserPlus
                },
                {
                  step: "02",
                  title: "Select Amount",
                  description:
                    "Choose how much you want to withdraw from your wallet.",
                  icon: Wallet
                },
                {
                  step: "03",
                  title: "Withdraw Securely",
                  description:
                    "Receive funds instantly to your linked account.",
                  icon: CreditCard
                }
              ]}
            />
          </TabsContent>

          {/* PAY BILL */}
          <TabsContent value="bill">
            <StepsGrid
              steps={[
                {
                  step: "01",
                  title: "Choose Provider",
                  description:
                    "Select electricity, internet, or mobile recharge.",
                  icon: ReceiptText
                },
                {
                  step: "02",
                  title: "Confirm Details",
                  description:
                    "Verify bill details before payment.",
                  icon: Wallet
                },
                {
                  step: "03",
                  title: "Pay Instantly",
                  description:
                    "Bills paid instantly with digital receipts.",
                  icon: ArrowRight
                }
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
