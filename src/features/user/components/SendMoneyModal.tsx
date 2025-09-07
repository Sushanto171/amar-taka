/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightIcon, MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

import SearchPhone from "@/components/SearchPhone";
import { Summary } from "@/components/Summary";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { role } from "@/constant/role";
import PasswordFiled from "@/features/auth/components/PasswordFiled";
import { cn } from "@/lib/utils";
import { useInitTransactionMutation } from "@/redux/features/transaction/transaction.api";
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import type { ITransactionInit } from "@/types/transaction.types";
import { convertPaisa } from "@/utils/convertPaisa";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

const formSchema = z.object({
  phone: z
    .string({
      error: "Phone number is required",
    })
    .regex(bdPhoneRegex, { message: "Invalid Bangladesh phone number format" }),
  amount: z
    .string({ error: "Amount must be required" })
    .min(1, { error: "Minimum send money amount 20 tk" }),
  reference: z.string().optional(),
  password: z
    .string({
      error: "Password is required",
    })
    .regex(/^\d{6}$/, { message: "Password must be 6 digits." }),
});

export type FormValues = z.infer<typeof formSchema>;

const totalSteps = 2;
export default function SendMoneyModal() {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [step, setStep] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initTransaction] = useInitTransactionMutation();
  const [sendMoney] = useSendMoneyMutation();
  const { data: usersData, isLoading } = useGetAllUserQuery({
    role: role.user,
    field: "phone",
    limit: 10000,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      password: "",
      phone: "",
      reference: "",
    },
  });
  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleSendMoney = async (data: FormValues) => {
    const transactionData: ITransactionInit = {
      phone: data.phone,
      type: "P2P_TRANSFER",
      amount: convertPaisa(data.amount),
      reference: data.reference,
    };
    const toastId = toast.loading("Sending Money");
    try {
      const res = await initTransaction(transactionData).unwrap();
      if (res.success) {
        const sendMoneyData = {
          transactionId: res.data._id,
          password: data.password,
        };
        setDisable(true);
        const sendRes = await sendMoney(sendMoneyData).unwrap();
        const params = new URLSearchParams(searchParams);
        toast.success(sendRes.message, { id: toastId });
        params.delete("action");
        setSearchParams(params);
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    } finally {
      setDisable(false);
    }
  };

  useEffect(() => {
    form.reset();
    if (open) {
      setStep(1);
    } else {
      setSearchParams("");
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => [
            setSearchParams({ action: "send-money" }),
            setOpen(true),
          ]}
          variant="secondary"
          className="flex-1 hover:bg-primary"
        >
          Send Money
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <DialogTitle className="text-center font-semibold text-lg mt-2">
            Send Money
          </DialogTitle>
          <DialogDescription className="sr-only">
            This is send money box
          </DialogDescription>
        </div>
        <div className="space-y-6 px-6 pt-3 pb-6">
          <Form {...form}>
            <form
              id="sendMoneyForm"
              onSubmit={form.handleSubmit(handleSendMoney)}
              className="space-y-4"
            >
              {step === 1 && (
                <React.Fragment key={step}>
                  {/* Phone */}
                  {!isLoading && usersData && (
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <SearchPhone
                              userData={usersData}
                              onChange={field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* amount */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="type amount" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* reference */}
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference</FormLabel>
                        <FormControl>
                          <Input placeholder="reference here.." {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              )}
              {step === 2 && (
                <React.Fragment key={step}>
                  <Summary form={form} />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordFiled field={field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              )}
            </form>
          </Form>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {Array.from({ length: step }).map((_, index) => (
                <div
                  key={`step-${index}`}
                  className={cn(
                    "bg-primary size-1.5 rounded-full",
                    0 + 1 === step ? "bg-primary" : "opacity-20"
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              {step > 1 ? (
                <div>
                  <Button
                    onClick={() => setStep((prev) => prev - 1)}
                    variant="outline"
                    className="opacity-70"
                  >
                    <MoveLeft />
                    Back
                  </Button>
                </div>
              ) : (
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="opacity-70"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              )}
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  disabled={
                    !form.formState.dirtyFields.phone ||
                    !form.formState.dirtyFields.amount
                  }
                  onClick={handleContinue}
                >
                  Continue
                  <ArrowRightIcon
                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <>
                  <Button
                    disabled={disable || !form.formState.dirtyFields.password}
                    variant={disable ? "destructive" : "default"}
                    className="disabled:cursor-not-allowed"
                    form="sendMoneyForm"
                    type="submit"
                  >
                    Send Money
                  </Button>
                </>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
