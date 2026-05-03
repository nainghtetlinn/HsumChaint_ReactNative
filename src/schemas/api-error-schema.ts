import { z } from "zod";

export const apiErrorDetailSchema = z.object({
  path: z.string(),
  message: z.string(),
});

export const apiErrorResponseSchema = z.object({
  status: z.string().optional(),
  success: z.boolean().optional(),
  error: z
    .union([
      z.string(),
      z.object({
        statusCode: z.number().optional(),
        isOperational: z.boolean().optional(),
        stack: z.string().optional(),
      }),
    ])
    .optional(),
  message: z.string().nullable().optional(),
  detail: z.array(apiErrorDetailSchema).optional(),
});

export type ApiErrorDetail = z.infer<typeof apiErrorDetailSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
