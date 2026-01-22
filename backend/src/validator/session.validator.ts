import z from "zod";

export const createSessionSchema = z.object({
  mentorId: z.string(),
  learnerId: z.string(),
  skillId: z.string(),
  from: z.string(),
  to: z.string(),
  // weekday: z.string(),
  timezone: z.string(),
  date: z.string(),
});

export type CreateBodyType = z.infer<typeof createSessionSchema>;
