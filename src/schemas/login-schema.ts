import { z } from "zod";

export const loginRequestSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Must be at least 6 characters long"),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const monkProfileSchema = z.object({
  id: z.number(),
  userId: z.number(),
  monasteryName: z.string(),
  monasteryAddress: z.string(),
});

export const loginUserSchema = z.object({
  id: z.number(),
  phone: z.string().min(1, "Phone number is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email().nullable(),
  userType: z.enum(["User", "Monk"]),
  createdAt: z.string().optional(),
  contactPhone: z.string().nullable(),
  monkProfile: monkProfileSchema.nullable().optional(),
});

export const loginSessionSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().min(1, "Refresh token is required"),
  user: loginUserSchema,
});

export const loginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: loginSessionSchema,
});

export type LoginUser = z.infer<typeof loginUserSchema>;
export type LoginSession = z.infer<typeof loginSessionSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
