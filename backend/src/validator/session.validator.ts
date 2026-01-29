import z from "zod";

export const createSessionSchema = z.object({
  mentorId: z.string(),
  learnerId: z.string(),
  skillId: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  // weekday: z.string(),
  timezone: z.string(),
  date: z.string(),
});

export const createAcceptRequestSchema = z.object({
  mentorId: z.string(),
  sessionId: z.string(),
  learnerId: z.string(),
  skillId: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  // weekday: z.string(),
  timezone: z.string(),
  date: z.string(),
});

export type CreateBodyType = z.infer<typeof createSessionSchema>;
export type CreateAcceptRequestBodyType = z.infer<typeof createAcceptRequestSchema>;
