import { apiErrorResponseSchema } from "./api-error-schema";
import { loginResponseSchema } from "./login-schema";

describe("login schema", () => {
  it("parses a valid login success payload", () => {
    const result = loginResponseSchema.parse({
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
          monkProfile: {
            id: 8,
            userId: 12,
            monasteryName: "ဆုတောင်းပြည့်",
            monasteryAddress: "somewhere",
          },
        },
      },
    });

    expect(result.data.user.userType).toBe("Monk");
    expect(result.data.user.monkProfile?.monasteryName).toBe("ဆုတောင်းပြည့်");
  });

  it("parses a validation error payload", () => {
    const result = apiErrorResponseSchema.parse({
      status: "failed",
      message: "Validation Error",
      detail: [
        {
          path: "body.phone",
          message: "Phone number is required",
        },
      ],
    });

    expect(result.detail?.[0]?.message).toBe("Phone number is required");
  });
});
