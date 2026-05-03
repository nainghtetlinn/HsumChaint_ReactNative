import { endpoints } from "@/constants/config";
import { apiInstance } from "@/lib/api-instance";
import {
  type ForgotPasswordForm,
  forgotPasswordResponseSchema,
} from "@/schemas/forgot-password-schema";

export const forgotPassword = async (request: ForgotPasswordForm) => {
  return await apiInstance
    .post(endpoints.forgotPassword, {
      json: {
        phone: request.phoneNo,
      },
    })
    .json(forgotPasswordResponseSchema);
};
