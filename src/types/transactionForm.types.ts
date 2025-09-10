import z from "zod";

const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

export const formSchema = z.object({
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
