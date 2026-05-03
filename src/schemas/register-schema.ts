import { z } from "zod";
import { type LoginSession, loginUserSchema, monkProfileSchema } from "./login-schema";
import type { SignUpForm } from "./sign-up-schema";

export const registerRequestSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Must be at least 6 characters long"),
  username: z.string().min(1, "Username is required"),
  userType: z.enum(["User", "Monk"]),
  email: z.string().email().optional(),
  contactPhone: z.string().optional(),
  monasteryName: z.string().optional(),
  monasteryAddress: z.string().optional(),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const registerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    accessToken: z.string().min(1, "Access token is required"),
    refreshToken: z.string().min(1, "Refresh token is required"),
    user: loginUserSchema,
    monkProfile: monkProfileSchema.nullable().optional(),
  }),
});

export type RegisterResponse = z.infer<typeof registerResponseSchema>;

export const mapSignUpFormToRegisterRequest = (data: SignUpForm): RegisterRequest => ({
  phone: data.phoneNo,
  password: data.password,
  username: data.username,
  userType: data.role === "monk" ? "Monk" : "User",
  email: data.email || undefined,
  contactPhone: data.contactPhoneNo || undefined,
  monasteryName: data.role === "monk" ? data.monasteryName || undefined : undefined,
  monasteryAddress: data.role === "monk" ? data.monasteryAddress || undefined : undefined,
});

export const mapRegisterResponseToSession = (response: RegisterResponse): LoginSession => ({
  accessToken: response.data.accessToken,
  refreshToken: response.data.refreshToken,
  user: {
    ...response.data.user,
    monkProfile: response.data.monkProfile ?? response.data.user.monkProfile ?? null,
  },
});
