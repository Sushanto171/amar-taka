/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import ButtonLoader from "@/components/ButtonLoader";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import PasswordFiled from "./PasswordFiled";

import { bdPhoneRegex } from "@/constant/phoneRegex";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";

/* ---------------------------------- */
/* Test Credentials */
/* ---------------------------------- */
const TEST_CREDENTIALS = [
  {
    role: "Admin",
    phone: "01791407583",
    password: "123456",
  },
  {
    role: "Agent",
    phone: "01791407574",
    password: "123456",
  },
  {
    role: "User",
    phone: "01791407573",
    password: "123456",
  },
] as const;

/* ---------------------------------- */
/* Validation Schema */
/* ---------------------------------- */
const formSchema = z.object({
  phone: z
    .string({ error: "Phone number is required" })
    .regex(bdPhoneRegex, { message: "Invalid Bangladesh phone number format" }),
  password: z
    .string({ error: "Password is required" })
    .regex(/^\d{6}$/, { message: "Password must be 6 digits." }),
});

export function LoginForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [execute, setExecute] = useState(false);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const { isLoading } = useGetMeQuery(undefined, { skip: !execute });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: state?.phone ?? "",
      password: state?.password ?? "",
    },
  });

  /* ---------------------------------- */
  /* Auto-fill Handler */
  /* ---------------------------------- */
  const fillCredentials = (phone: string, password: string) => {
    form.setValue("phone", phone, { shouldDirty: true });
    form.setValue("password", password, { shouldDirty: true });
  };

  /* ---------------------------------- */
  /* Submit */
  /* ---------------------------------- */
  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    setExecute(false);
    try {
      const res = await login(data).unwrap();
      toast.success(res.message);

      setExecute(true);

      if (!isLoading) {
        navigate(`/${res.data.user.role.toLowerCase()}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");

      if (
        error?.status === 400 &&
        error?.data?.message === "User isn't verified"
      ) {
        navigate("/verify", { state: { phone: data.phone } });
      }

      form.resetField("password");
    }
  };

  /* ---------------------------------- */
  /* Auto-submit when redirected */
  /* ---------------------------------- */
  useEffect(() => {
    if (state?.phone && state?.password) {
      submitHandler({
        phone: state.phone,
        password: state.password,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Card className={cn("flex flex-col gap-6", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Use your credentials to login</CardDescription>
      </CardHeader>

      <CardContent>
        {/* ---------------- Test Credentials ---------------- */}
        <div className="mb-6 rounded-lg border bg-muted/40 p-4">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Test Credentials (Click to Auto-Fill)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TEST_CREDENTIALS.map((cred) => (
              <Button
                key={cred.role}
                type="button"
                variant="ghost"
                className="flex flex-col  items-start gap-1 h-auto py-3"
                onClick={() =>
                  fillCredentials(cred.phone, cred.password)
                }
              >
                <span className="font-semibold">{cred.role}</span>
                <span className="text-xs text-muted-foreground">
                  {cred.phone}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* ---------------- Login Form ---------------- */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="grid gap-6">
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 bg-[#1c271f] border-[#3b5443] text-white placeholder:text-[#9db9a6]"
                        placeholder="+8801XXXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Phone number
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      <span>Password</span>
                      <Link
                        to={`/forget-password?phone=${form.getValues("phone")}`}
                        className="text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <PasswordFiled field={field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Password
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full text-background!"
                disabled={isLoginLoading}
              >
                <ButtonLoader spin={isLoginLoading} />
                Login
              </Button>
            </div>

            <div className="text-center text-sm mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="underline underline-offset-4 font-semibold"
              >
                Register
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
