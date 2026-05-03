import { ApiError, getApiErrorMessage, normalizeApiError } from "./api-error";

describe("api error helpers", () => {
  it("prefers the first validation detail message", async () => {
    const error = await normalizeApiError({
      status: "failed",
      message: "Validation Error",
      detail: [
        {
          path: "body.phone",
          message: "Phone number is required",
        },
      ],
    });

    expect(error).toBeInstanceOf(ApiError);
    expect(error.message).toBe("Phone number is required");
  });

  it("falls back to the top-level message when no detail exists", () => {
    const error = normalizeApiError({
      status: "failed",
      message: "Login failed",
    });

    expect(getApiErrorMessage(error)).toBe("Login failed");
  });

  it("uses the auth failure message from success-false responses", () => {
    const error = normalizeApiError(
      {
        success: false,
        message: "Invalid phone or password",
      },
      401,
    );

    expect(getApiErrorMessage(error)).toBe("Invalid phone or password");
  });

  it("uses the top-level message when the error field is an object", () => {
    const error = normalizeApiError(
      {
        success: false,
        message: "Invalid phone or password",
        error: {
          statusCode: 401,
          isOperational: true,
          stack: "Error: Invalid phone or password",
        },
      },
      401,
    );

    expect(getApiErrorMessage(error)).toBe("Invalid phone or password");
  });

  it("falls back to invalid phone or password for unparseable 401 payloads", () => {
    const error = normalizeApiError(
      {
        foo: "bar",
      },
      401,
    );

    expect(getApiErrorMessage(error)).toBe("Invalid phone or password");
  });
});
