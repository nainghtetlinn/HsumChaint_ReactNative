import {
  forgotPasswordResponseSchema,
  newPasswordSchema,
  resetPasswordResponseSchema,
} from "./forgot-password-schema";

describe("forgot password schema", () => {
  it("parses a forgot-password success response", () => {
    const result = forgotPasswordResponseSchema.parse({
      success: true,
      message: "Reset Token generated successfully",
      data: {
        rawResetToken: "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
      },
    });

    expect(result.data.rawResetToken).toBe(
      "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
    );
  });

  it("parses a reset-password success response", () => {
    const result = resetPasswordResponseSchema.parse({
      success: true,
      message: "Password reset successfully",
    });

    expect(result.message).toBe("Password reset successfully");
  });

  it("validates that confirmPassword matches password", () => {
    const result = newPasswordSchema.safeParse({
      password: "password236",
      confirmPassword: "password999",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Passwords do not match");
    }
  });
});
