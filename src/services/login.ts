import { endpoints } from "@/constants/config";
import { apiInstance } from "@/lib/api-instance";
import { type LoginRequest, loginResponseSchema } from "@/schemas/login-schema";

export const login = async (request: LoginRequest) => {
  return await apiInstance.post(endpoints.login, { json: request }).json(loginResponseSchema);
};
