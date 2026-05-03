jest.mock("@/lib/api-instance", () => ({
  apiInstance: {
    post: jest.fn(),
  },
}));

import { apiInstance } from "@/lib/api-instance";
import { forgotPassword } from "./forgot-password";

describe("forgotPassword service", () => {
  it("posts the phone number and returns the raw reset token", async () => {
    const mockJson = jest.fn().mockResolvedValue({
      success: true,
      message: "Reset Token generated successfully",
      data: {
        rawResetToken: "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
      },
    });

    (apiInstance.post as jest.Mock).mockReturnValue({
      json: mockJson,
    });

    const result = await forgotPassword({
      phoneNo: "+959123456789",
    });

    expect(apiInstance.post).toHaveBeenCalledWith("auth/forgot-password", {
      json: {
        phone: "+959123456789",
      },
    });
    expect(result.data.rawResetToken).toBe(
      "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
    );
  });
});
