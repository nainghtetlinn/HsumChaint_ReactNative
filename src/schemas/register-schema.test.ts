import {
  mapRegisterResponseToSession,
  mapSignUpFormToRegisterRequest,
  registerResponseSchema,
} from "./register-schema";

describe("register schema", () => {
  it("maps monk sign-up form data to the API request shape", () => {
    const request = mapSignUpFormToRegisterRequest({
      role: "monk",
      phoneNo: "+959123456789",
      password: "password123",
      confirmPassword: "password123",
      username: "testUser",
      email: undefined,
      contactPhoneNo: undefined,
      monasteryName: "ဆုတောင်းပြည့်",
      monasteryAddress: "somewhere",
    });

    expect(request).toEqual({
      phone: "+959123456789",
      password: "password123",
      username: "testUser",
      userType: "Monk",
      email: undefined,
      contactPhone: undefined,
      monasteryName: "ဆုတောင်းပြည့်",
      monasteryAddress: "somewhere",
    });
  });

  it("parses the register response and normalizes it into the auth session", () => {
    const response = registerResponseSchema.parse({
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

    const session = mapRegisterResponseToSession(response);

    expect(session.accessToken).toBe("access-token");
    expect(session.user.userType).toBe("Monk");
    expect(session.user.monkProfile?.monasteryName).toBe("ဆုတောင်းပြည့်");
  });
});
