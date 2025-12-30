/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightIcon, Download, MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

import ButtonLoader from "@/components/ButtonLoader";
import QuickActionButton from "@/components/QuickActionButton";
import SearchPhone from "@/components/SearchPhone";
import { Summary } from "@/components/Summary";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter
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
import { totalSteps } from "@/constant/trasactionForm";
import PasswordFiled from "@/features/auth/components/PasswordFiled";
import { cn } from "@/lib/utils";
import { useInitTransactionMutation } from "@/redux/features/transaction/transaction.api";
import {
  useGetAllUserQuery,
  useGetMeQuery,
} from "@/redux/features/user/user.api";
import { useCashInMutation } from "@/redux/features/wallet/wallet.api";
import type { ITransactionInit } from "@/types/transaction.types";
import { formSchema, type FormValues } from "@/types/transactionForm.types";
import { convertPaisa } from "@/utils/convertPaisa";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export default function CashInModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initTransaction, { isLoading: tnxLoading }] =
    useInitTransactionMutation();
  const [cashIn, { isLoading: cashInLoading }] = useCashInMutation();
  const { data: me } = useGetMeQuery(undefined);
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

  const handleCashIn = async (data: FormValues) => {
    const transactionData: ITransactionInit = {
      receiver: data.phone,
      sender: me!.phone,
      type: "CASH_IN",
      amount: convertPaisa(data.amount),
      reference: data.reference,
    };

    const toastId = toast.loading("Cash in.");

    try {
      const res = await initTransaction(transactionData).unwrap();
      if (res.success) {
        const cashInData = {
          transactionId: res.data._id,
          password: data.password,
        };
        const sendRes = await cashIn(cashInData).unwrap();
        const params = new URLSearchParams(searchParams);
        toast.success(sendRes.message, { id: toastId });
        params.delete("action");
        setSearchParams(params);
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
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

      <QuickActionButton
        title="Cash In"
        description="Add funds via agent or bank transfer."
        icon={Download}
        action="cash-in"
        setOpen={setOpen}
        setSearchParams={setSearchParams}
      />


      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <DialogTitle className="text-center font-semibold text-lg mt-2">
            Cash In
          </DialogTitle>
          <DialogDescription className="sr-only">
            This is send money box
          </DialogDescription>
        </div>
        <div className="space-y-6 px-6 pt-3 pb-6">
          <Form {...form}>
            <form
              id="cashInForm"
              onSubmit={form.handleSubmit(handleCashIn)}
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
                              placeholder="User"
                              userData={usersData.data}
                              onChange={field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
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
                        <FormMessage className="text-red-400" />
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
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              )}
              {step === 2 && (
                <React.Fragment key={step}>
                  <Summary form={form} />
                  {/* password */}
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
                        <FormMessage className="text-red-400" />
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
                  className="group text-background!"
                  type="button"
                  disabled={
                    !form.formState.dirtyFields.phone ||
                    !form.formState.dirtyFields.amount ||
                    tnxLoading
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
                    disabled={
                      !form.formState.dirtyFields.password || cashInLoading
                    }
                    variant={cashInLoading ? "destructive" : "default"}
                    className={cn("disabled:cursor-not-allowed text-background!", !form.formState.dirtyFields.password || cashInLoading? "bg-muted cursor-not-allowed!":"")}
                    form="cashInForm"
                    type="submit"
                  >
                    <ButtonLoader spin={cashInLoading || tnxLoading} />
                    Cash In
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
