jest.mock("@/lib/api-instance", () => ({
  apiInstance: {
    post: jest.fn(),
  },
}));

import { apiInstance } from "@/lib/api-instance";
import { login } from "./login";

describe("login service", () => {
  it("posts the login payload and returns parsed response data", async () => {
    const mockJson = jest.fn().mockResolvedValue({
      success: true,
      message: "Login successful",
      data: {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: {
          id: 12,
          phone: "09123456789",
          username: "testUser",
          email: null,
          userType: "Monk",
          contactPhone: null,
          monkProfile: null,
        },
      },
    });

    (apiInstance.post as jest.Mock).mockReturnValue({
      json: mockJson,
    });

    const request = {
      phone: "+959123456789",
      password: "password123",
    };

    const result = await login(request);

    expect(apiInstance.post).toHaveBeenCalledWith("auth/login", {
      json: request,
    });
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(result.message).toBe("Login successful");
  });
});
