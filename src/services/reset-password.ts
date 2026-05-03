import { endpoints } from "@/constants/config";
import { apiInstance } from "@/lib/api-instance";
import {
  type NewPasswordForm,
  resetPasswordResponseSchema,
} from "@/schemas/forgot-password-schema";

type ResetPasswordRequest = NewPasswordForm & {
  resetToken: string;
};

export const resetPassword = async ({ password, resetToken }: ResetPasswordRequest) => {
  return await apiInstance
    .post(endpoints.resetPassword, {
      json: {
        password,
        resetToken,
      },
    })
    .json(resetPasswordResponseSchema);
};
