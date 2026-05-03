import ky, { type HTTPError, isHTTPError } from "ky";
import { apiPrefix, apiUrl, apiVersion } from "@/constants/config";
import { ApiError, normalizeApiError } from "@/lib/api-error";

const apiPrefixUrl = [apiUrl.replace(/\/$/, ""), apiPrefix, apiVersion].join("/");

const buildApiError = async (error: HTTPError) => {
  try {
    const payload = await error.response.clone().json();
    return await normalizeApiError(payload, error.response.status);
  } catch {
    try {
      const text = await error.response.clone().text();
      return new ApiError(text || error.message, { statusCode: error.response.status });
    } catch {
      return new ApiError(error.message, { statusCode: error.response.status });
    }
  }
};

export const apiInstance = ky.create({
  prefix: apiPrefixUrl,
  hooks: {
    beforeRequest: [],
    afterResponse: [],
    beforeError: [
      async ({ error }) => {
        if (isHTTPError(error)) {
          return await buildApiError(error);
        }

        return error;
      },
    ],
  },
});
