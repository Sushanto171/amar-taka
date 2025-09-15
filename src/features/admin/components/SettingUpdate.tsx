"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ISettings } from "@/types/settings.types";
import { useForm } from "react-hook-form";

const defaultValues = {
  deposit: { min: 5000, feePct: 2, sysPct: 25, agentPct: 75 },
  withdraw: { min: 0, feePct: 2, sysPct: 50, agentPct: 50 },
  sendMoney: { perThousandFee: 500, min: 2000 },
  user: { welcomeBonus: 5000, dailyLimit: 2500000, monthlyLimit: 5000000 },
  agent: { initBal: 1000000, dailyLimit: 5000000, monthlyLimit: 20000000 },
  sysFund: 1000000000,
};
const toTaka = (paisa: number) => paisa / 100;
const toPaisa = (taka: number) => taka * 100;

export default function AdminConfigTabs() {
  const form = useForm<ISettings>({ defaultValues });
  const { handleSubmit, control } = form;

  const onSubmit = (data: ISettings) => {
    console.log("Updated Config:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="deposit" className="space-y-4">
          <TabsList>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="sendMoney">Send Money</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="agent">Agent</TabsTrigger>
            <TabsTrigger value="sysFund">System Fund</TabsTrigger>
          </TabsList>

          {/* Deposit Tab */}
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Deposit Configuration</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name="deposit.min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)} // display in Taka
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          } // convert back to paisa
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="deposit.feePct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee %</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="deposit.sysPct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System %</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="deposit.agentPct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent %</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Configuration</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name="withdraw.min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="withdraw.feePct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee %</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="withdraw.sysPct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System %</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="withdraw.agentPct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent %</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Send Money Tab */}
          <TabsContent value="sendMoney">
            <Card>
              <CardHeader>
                <CardTitle>Send Money Configuration</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name="sendMoney.perThousandFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Per Thousand Fee </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="sendMoney.min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Tab */}
          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle>User Configuration</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name="user.welcomeBonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Bonus</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="user.dailyLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="user.monthlyLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agent Tab */}
          <TabsContent value="agent">
            <Card>
              <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name="agent.initBal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Balance</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="agent.dailyLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="agent.monthlyLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Fund Tab */}
          <TabsContent value="sysFund">
            <Card>
              <CardHeader>
                <CardTitle>System Fund Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={control}
                  name="sysFund"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Fund</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={toTaka(field.value)}
                          onChange={(e) =>
                            field.onChange(toPaisa(Number(e.target.value)))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
