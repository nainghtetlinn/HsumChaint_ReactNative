import z from "zod";

export const forgotPasswordSchema = z.object({
  phoneNo: z.string().min(1, "Phone no. is required"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordRequestSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
});

export const forgotPasswordResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    rawResetToken: z.string().min(1, "Reset token is required"),
  }),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPasswordForm = z.infer<typeof newPasswordSchema>;

export const resetPasswordRequestSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters long"),
  resetToken: z.string().min(1, "Reset token is required"),
});

export const resetPasswordResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
