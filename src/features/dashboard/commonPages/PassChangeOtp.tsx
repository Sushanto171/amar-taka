/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/features/auth/hook/useToast";
import { useChangePasswordOtpVerifyMutation } from "@/redux/features/auth/auth.api";
import { Dispatch, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// ✅ schema (OTP)
const otpSchema = z.object({
  otp: z
    .string({
      error: "OTP is required",
    })
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;
interface IProps {
  onStepChange: Dispatch<React.SetStateAction<"password" | "otp">>;
  step: "password" | "otp";
}

export function PassChangeOtp({ onStepChange, step }: IProps) {
  const [verifyOTP, { isLoading }] = useChangePasswordOtpVerifyMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  // ✅ Form 1: OTP
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // ✅ Handle OTP submit
  const handleOtpSubmit = async (values: OtpFormValues) => {
    const toastId = toast.loading("Verifying OTP...");

    try {
      const res = await verifyOTP(values).unwrap();
      toast.success(res.message, { id: toastId });
      navigate("/login"); // redirect after success
    } catch (err: any) {
      toast.error(err.data.message, { id: toastId });
    }
  };

  useEffect(() => {
    if (step === "otp") {
      showToast("Use Default OPT: 123456");
    }
    return;
  }, [step]);

  return (
    <TabsContent
      value="security"
      className="space-y-6 min-h-[calc(100vh-400px)]"
    >
      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
          className="space-y-4 "
        >
          {/* OTP Input */}
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex gap-2 w-full">
                      <InputOTPSlot className="rounded-lg" index={0} />
                      <InputOTPSlot className="rounded-lg" index={1} />
                      <InputOTPSlot className="rounded-lg" index={2} />
                      <InputOTPSlot className="rounded-lg" index={3} />
                      <InputOTPSlot className="rounded-lg" index={4} />
                      <InputOTPSlot className="rounded-lg" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onStepChange("password")}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button type="submit" disabled={isLoading}>
              <ButtonLoader spin={isLoading} />
              {"Verify & Change"}
            </Button>
          </div>
        </form>
      </Form>
    </TabsContent>
  );
}
