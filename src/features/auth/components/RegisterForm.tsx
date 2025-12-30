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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import ButtonLoader from "@/components/ButtonLoader";
import { useRegisterMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "./../../../../node_modules/@hookform/resolvers/zod/src/zod";
import PasswordFiled from "./PasswordFiled";

// Bangladesh phone regex: +8801XXXXXXXXX, 8801XXXXXXXXX, 01XXXXXXXXX
const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

const formSchema = z.object({
  name: z.string({ error: "Name must be required." }).min(1),
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", password: "" },
  });

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await register(data).unwrap();
      toast.success(res.message);
      if (res.success) {
        navigate("/verify", { state: { phone: data.phone, password: data.password }, });
      }
    } catch (error: any) {

      toast.error(error.data.message);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border border-white/10 backdrop-blur-xl shadow-xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-">
            Registration is Free
          </CardTitle>
          <CardDescription className="">
            Create your account using your phone number
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitHandler)}
              className="space-y-6"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        className="h-10 dark:bg-[#1c271f] border-[#3b5443]! dark:text-white placeholder:text-[#9db9a6]"
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Your full legal name
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+8801XXXXXXXXX"
                        className="h-10 dark:bg-[#1c271f] border-[#3b5443]! dark:text-white placeholder:text-[#9db9a6]"
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Your verified phone number
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Password</FormLabel>
                    <FormControl>
                      <PasswordFiled field={field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Choose a strong password
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-bold bg-primary text-[#111813] hover:bg-[#0fd650] transition-all"
              >
                <ButtonLoader spin={isLoading} />
                Create Account
              </Button>

              {/* Footer */}
              <p className="text-center text-sm text-[#9db9a6]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
