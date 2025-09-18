/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { useLoginMutation } from "../../../redux/features/auth/auth.api";
import { zodResolver } from "./../../../../node_modules/@hookform/resolvers/zod/src/zod";
import PasswordFiled from "./PasswordFiled";

// Bangladesh phone regex: +8801XXXXXXXXX, 8801XXXXXXXXX, 01XXXXXXXXX
const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

const formSchema = z.object({
  phone: z
    .string({
      error: "Phone number is required",
    })
    .regex(bdPhoneRegex, { message: "Invalid Bangladesh phone number format" }),

  password: z
    .string({
      error: "Password is required",
    })
    .regex(/^\d{6}$/, { message: "Password must be 6 digits." }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [execute, setExecute] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "01791407583", password: "123456" },
  });
  const { isLoading } = useGetMeQuery(undefined, { skip: !execute });

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
      toast.error(error.data.message);
      if (error.status === 400 && error.data.message === "User is't verified") {
        navigate("/verify", { state: data.phone });
      }
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Credential</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+8801XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your Phone Field.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        This is your Phone Field.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoginLoading}
                  type="submit"
                  className="w-full"
                >
                  Login
                </Button>
              </div>
              <div className="text-center text-sm mt-6">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
