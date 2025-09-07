import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

import SearchPhone from "@/components/SearchPhone";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import z from "zod";

const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

const formSchema = z.object({
  phone: z.string({
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
  const [step, setStep] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
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

  const handleSendMoney = (data: FormValues) => {
    console.log(params);
    console.log(data.amount, form.getValues());
  };
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setSearchParams({ action: "send-money" })}
          variant="secondary"
          className="flex-1 hover:bg-red-400"
        >
          Send Money
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <DialogTitle>Send Money</DialogTitle>
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
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <SearchPhone onChange={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Phone */}

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
                        <FormDescription>
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="******" {...field} />
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
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
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
                  <Button form="sendMoneyForm" type="submit">
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
