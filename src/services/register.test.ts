jest.mock("@/lib/api-instance", () => ({
  apiInstance: {
    post: jest.fn(),
  },
}));

import { apiInstance } from "@/lib/api-instance";
import { register } from "./register";

describe("register service", () => {
  it("posts the monk registration payload and returns parsed response data", async () => {
    const mockJson = jest.fn().mockResolvedValue({
      success: true,
      message: "Register successful",
      data: {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: {
          id: 12,
          phone: "09123456789",
          username: "testUser",
          email: null,
          userType: "Monk",
          createdAt: "2026-04-15T15:00:23.094Z",
          contactPhone: null,
        },
        monkProfile: {
          id: 8,
          userId: 12,
          monasteryName: "ဆုတောင်းပြည့်",
          monasteryAddress: "somewhere",
        },
      },
    });

    (apiInstance.post as jest.Mock).mockReturnValue({
      json: mockJson,
    });

    const request = {
      phone: "+959123456789",
      password: "password123",
      username: "testUser",
      userType: "Monk" as const,
      monasteryName: "ဆုတောင်းပြည့်",
      monasteryAddress: "somewhere",
    };

    const result = await register(request);

    expect(apiInstance.post).toHaveBeenCalledWith("auth/register", {
      json: request,
    });
    expect(result.message).toBe("Register successful");
  });
});
