import { endpoints } from "@/constants/config";
import { apiInstance } from "@/lib/api-instance";
import { type RegisterRequest, registerResponseSchema } from "@/schemas/register-schema";

export const register = async (request: RegisterRequest) => {
  return await apiInstance.post(endpoints.register, { json: request }).json(registerResponseSchema);
};
