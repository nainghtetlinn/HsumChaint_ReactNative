import z from "zod";

export const signUpSchema = z
  .object({
    role: z.enum(["user", "monk"]),
    phoneNo: z.string().min(1, "Phone no. is required"),
    password: z.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters long"),
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address").optional(),
    contactPhoneNo: z.string().min(1, "Contact phone no. is required").optional(),
    monasteryName: z.string().optional(),
    monasteryAddress: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    if (val.role === "monk" && !val.monasteryName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Monastery name is required",
        path: ["monasteryName"],
      });
    }

    if (val.role === "monk" && !val.monasteryAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Monastery address is required",
        path: ["monasteryAddress"],
      });
    }
  });

export type SignUpForm = z.infer<typeof signUpSchema>;
