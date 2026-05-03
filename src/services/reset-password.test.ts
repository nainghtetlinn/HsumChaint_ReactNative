jest.mock("@/lib/api-instance", () => ({
  apiInstance: {
    post: jest.fn(),
  },
}));

import { apiInstance } from "@/lib/api-instance";
import { resetPassword } from "./reset-password";

describe("resetPassword service", () => {
  it("posts the new password with reset token and returns success response", async () => {
    const mockJson = jest.fn().mockResolvedValue({
      success: true,
      message: "Password reset successfully",
    });

    (apiInstance.post as jest.Mock).mockReturnValue({
      json: mockJson,
    });

    const result = await resetPassword({
      password: "password236",
      confirmPassword: "password236",
      resetToken: "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
    });

    expect(apiInstance.post).toHaveBeenCalledWith("auth/reset-password", {
      json: {
        password: "password236",
        resetToken: "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
      },
    });
    expect(result.message).toBe("Password reset successfully");
  });
});
