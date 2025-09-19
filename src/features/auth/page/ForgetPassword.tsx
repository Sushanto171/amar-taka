/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import ButtonLoader from "@/components/ButtonLoader";
import { bdPhoneRegex } from "@/constant/phoneRegex";
import {
  useGetForgetPasswordOtpMutation,
  useVerifyResetPasswordOtpMutation,
} from "@/redux/features/auth/auth.api";
import { IForgetPassword } from "@/types/ChangePass.types";
import { Fingerprint, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import PasswordFiled from "../components/PasswordFiled";
import { useToast } from "../hook/useToast";

// Schemas
const phoneSchema = z.object({
  phone: z
    .string({
      error: "Phone number is required",
    })
    .regex(bdPhoneRegex, { message: "Invalid Bangladesh phone number format" }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

const passwordSchema = z.object({
  password: z
    .string({
      error: "Password is required",
    })
    .regex(/^\d{6}$/, { message: "Password must be 6 digits." }),
});

// Steps
type Step = "phone" | "otp" | "reset";

export default function ForgetPassword() {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [data, setData] = useState<IForgetPassword>({
    password: "",
    otp: "",
    phone: searchParams.get("phone") || "",
  });
  const [getOTP, { isLoading }] = useGetForgetPasswordOtpMutation();
  const [resetPassword, { isLoading: resetLoading }] =
    useVerifyResetPasswordOtpMutation();

  // Forms
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: searchParams.get("phone") || "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const resetForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  });

  // Handlers
  const handlePhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    try {
      const res = await getOTP(values).unwrap();
      toast.success(res.message);
      setData({ ...data, phone: values.phone });
      setStep("otp");
    } catch (error: any) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  const handleOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    if (values.otp === "123456") {
      setData({ ...data, otp: values.otp });
      toast.success("OTP verified!");
      setStep("reset");
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleResetSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setData({ ...data, password: values.password });
      const resetData = { ...data, password: values.password };
      const res = await resetPassword(resetData).unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (error: any) {
      toast.success(error.data.message);
    }
  };

  useEffect(() => {
    if (step === "otp") {
      showToast("Use Default OPT: 123456");
    }
  }, [step]);
  return (
    <div className="min-h-screen grid place-content-center">
      {step === "phone" && (
        <Card className="min-w-xs max-w-md shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your phone number to reset password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...phoneForm}>
              <form
                onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+8801XXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <ButtonLoader spin={isLoading} />
                  Send OTP
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {step === "otp" && (
        <Card className="min-w-xs max-w-md shadow-lg rounded-3xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5" />
              <CardTitle>Verify OTP</CardTitle>
            </div>
            <CardDescription>
              Enter the OTP sent to {data.phone}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="flex gap-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot
                                key={i}
                                className="rounded-lg"
                                index={i}
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Verify OTP
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {step === "reset" && (
        <Card className="min-w-xs max-w-md shadow-lg rounded-3xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <CardTitle>Set New Password</CardTitle>
            </div>
            <CardDescription>
              Enter a strong new password to secure your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(handleResetSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={resetForm.control}
                  name="password"
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
                <Button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full"
                >
                  <ButtonLoader spin={resetLoading} />
                  Reset Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
