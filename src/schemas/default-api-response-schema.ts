import { z } from "zod";

export const defaultApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.unknown().optional(),
});

export type DefaultApiResponse = z.infer<typeof defaultApiResponseSchema>;
