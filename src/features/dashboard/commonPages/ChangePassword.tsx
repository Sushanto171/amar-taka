/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import ButtonLoader from "@/components/ButtonLoader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import PasswordFiled from "@/features/auth/components/PasswordFiled";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { PassChangeOtp } from "./PassChangeOtp";

// ✅ Step 1 schema
const passwordSchema = z.object({
  currentPassword: z
    .string({
      error: "Current Password is required",
    })
    .regex(/^\d{6}$/, { message: "Password must be 6 digits." }),
  newPassword: z
    .string({
      error: "New Password is required",
    })
    .regex(/^\d{6}$/, { message: "Password must be 6 digits." }),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function SecurityTab() {
  const [step, setStep] = useState<"password" | "otp">("password");
  const [getOTP, { isLoading }] = useChangePasswordMutation();

  // ✅ Form 1: Change password
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  // ✅ Handle first step
  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    const toastId = toast.loading("Sending OTP...");

    try {
      const res = await getOTP(values).unwrap();
      toast.success(res.message, { id: toastId });
      setStep("otp"); // move to OTP UI
    } catch (err: any) {
      toast.error(err.data.message, { id: toastId });
    }
  };

  return (
    <TabsContent value="security" className="flex justify-center w-full py-7">
      <div className="max-w-lg w-full space-y-6 ">
        <div>
          <h3 className="text-lg font-medium">Security</h3>
          <p className="text-sm text-muted-foreground">
            {step === "password"
              ? "Change your account password."
              : "Enter the OTP sent to your phone/email."}
          </p>
        </div>

        {/* Password Step */}
        {step === "password" ? (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="space-y-4 max-w-md"
            >
              {/* Current Password */}
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordFiled field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordFiled field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button type="submit" disabled={isLoading}>
                  <ButtonLoader spin={isLoading} />
                  {isLoading ? "Sending OTP..." : "Continue"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          // OTP Step
          <PassChangeOtp step={step} onStepChange={setStep} />
        )}
      </div>
    </TabsContent>
  );
}
