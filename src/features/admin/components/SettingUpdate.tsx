/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useUpdateSettingsMutation } from "@/redux/features/settings/settings.api";
import type { ISettings } from "@/types/settings.types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const toTaka = (paisa: number) => paisa / 100;
const toPaisa = (taka: number) => taka * 100;

export default function AdminConfigTabs({
  defaultValues,
}: {
  defaultValues: ISettings;
}) {
  const form = useForm<ISettings>({ defaultValues });
  const { handleSubmit, control } = form;
  const [updateSettings] = useUpdateSettingsMutation();

  const onSubmit = async (data: ISettings) => {
    try {
      delete data._id;
      const res = await updateSettings({
        id: defaultValues._id as string,
        data,
      }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
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
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
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
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
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
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                        <Input
                          {...field}
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
                  name="withdraw.feePct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee %</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
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
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
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
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
