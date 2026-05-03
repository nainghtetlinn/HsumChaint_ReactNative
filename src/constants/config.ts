export const apiUrl = process.env.EXPO_PUBLIC_API_URL || "api url";

export const apiPrefix = "api";

export const apiVersion = "v1";

export const endpoints = {
  login: "auth/login",
  register: "auth/register",
  forgotPassword: "auth/forgot-password",
  resetPassword: "auth/reset-password",
};
