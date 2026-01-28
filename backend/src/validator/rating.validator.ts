import z from "zod";

export const ratingSchema = z.object({
  rating: z.number(),
  comment: z
    .string()
    .min(1, "At least one character")
    .max(300, "comment should be under 300 characters"),
});

export type RatingType = z.infer<typeof ratingSchema>;
