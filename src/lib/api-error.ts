import { type ApiErrorDetail, apiErrorResponseSchema } from "@/schemas/api-error-schema";

export class ApiError extends Error {
  statusCode?: number;
  details?: ApiErrorDetail[];

  constructor(message: string, options?: { statusCode?: number; details?: ApiErrorDetail[] }) {
    super(message);
    this.name = "ApiError";
    this.statusCode = options?.statusCode;
    this.details = options?.details;
  }
}

export const normalizeApiError = (payload: unknown, statusCode?: number) => {
  const result = apiErrorResponseSchema.safeParse(payload);

  if (!result.success) {
    if (statusCode === 401) {
      return new ApiError("Invalid phone or password", { statusCode });
    }

    return new ApiError("Something went wrong. Please try again.", { statusCode });
  }

  const firstDetailMessage = result.data.detail?.[0]?.message;
  const topLevelMessage =
    result.data.message ?? (typeof result.data.error === "string" ? result.data.error : undefined);

  if (firstDetailMessage) {
    return new ApiError(firstDetailMessage, {
      statusCode,
      details: result.data.detail,
    });
  }

  if (topLevelMessage) {
    return new ApiError(topLevelMessage, {
      statusCode,
      details: result.data.detail,
    });
  }

  if (statusCode === 401) {
    return new ApiError("Invalid phone or password", {
      statusCode,
      details: result.data.detail,
    });
  }

  return new ApiError("Something went wrong. Please try again.", {
    statusCode,
    details: result.data.detail,
  });
};

export const getApiErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};
